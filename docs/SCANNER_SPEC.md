# Brief per Claude Code — Modulo scansione (lettore HID esterno + fotocamera iPhone/iPad)

Ricrea un modulo di scansione barcode **identico nel comportamento** a uno già collaudato in produzione
(app Next.js/React/TypeScript, usato su Mac + iPhone + iPad, anche dentro la WebView di Shopify).
Funziona con **due sorgenti**: (1) lettore barcode **HID esterno** (USB/Bluetooth, si comporta come tastiera),
(2) **fotocamera** del dispositivo (via zxing). Sotto trovi l'architettura, il codice dei blocchi fondamentali
e — soprattutto — le **regole/trappole già risolte**: rispettale, sono costate debugging reale.

> Stack di riferimento: React 18 + TypeScript, `motion/react` (Framer Motion) per le animazioni,
> `@zxing/browser` + `@zxing/library` per la fotocamera. Se la nuova app usa un altro framework,
> adatta i concetti ma **mantieni identiche le regole in maiuscolo**.

## Dipendenze
```
npm i @zxing/browser @zxing/library motion
```

## Architettura — 3 blocchi indipendenti + 1 componente UI
1. `playBeep(type)` — feedback sonoro (OK / warn / error / start / saved).
2. `useHidScanner({ enabled, onScan })` — lettore esterno.
3. `useCameraScanner({ enabled, onScan, videoRef })` — fotocamera.
4. `MorphScanner` (opzionale) — UI a due pulsanti (Fotocamera / Lettore) che si espande in-place.

I tre blocchi sono **disaccoppiati**: una pagina decide quale abilitare (`enabled`) e riceve i codici via `onScan`.

---

## REGOLE ASSOLUTE (trappole già risolte — non reintrodurle)

1. **BEEP = HTMLAudioElement con WAV generato a runtime, MAI Web Audio (`OscillatorNode`).**
   Su **Safari desktop** l'oscillatore Web Audio resta **muto** in questo contesto (anche con `ctx.resume()`),
   mentre l'`<audio>` HTML suona. Genera un breve WAV PCM 16-bit in memoria → data URI → `new Audio(dataUri)`.
   **Sblocca** gli elementi audio al **primo gesto utente** (`pointerdown`/`keydown`/`touchstart`, anche un tasto
   del lettore HID conta) con un `play()/pause()` a volume 0, altrimenti il primo beep non parte (autoplay policy).

2. **Fotocamera — dedup "una volta per codice finché è in campo".**
   Con zxing in modalità continua, se tieni il barcode inquadrato conta copie fantasma all'infinito.
   Regola: conta **una sola volta** per codice; **riconta lo stesso codice solo dopo che è USCITO dal campo**
   (nessuna lettura per `LEAVE_GAP ≈ 900ms` → azzera `lastCode`). NON usare un semplice cooldown a tempo fisso.

3. **Lettore HID = keydown su `document`, nessun input focalizzato.**
   Se metti il focus in un `<input>`, iOS mostra la tastiera software e/o "mangia" i tasti. Cattura i `keydown`
   direttamente sul `document`, **ignora** gli eventi se il target è INPUT/TEXTAREA/contentEditable, accumula i
   caratteri in un buffer, e su **Enter** (fine sequenza del lettore) emetti il codice. Timeout ~150ms azzera il
   buffer (una raffica <150ms = scanner; digitazione umana lenta = scartata). Lunghezza minima ~6 cifre.

4. **iOS nasconde la tastiera software quando c'è un lettore HID Bluetooth.**
   Se ti serve un input manuale/tastierino, prevedi un **tastierino in-app** attivabile quando rilevi un lettore
   (heuristica: `keydown` in capture su `document` senza campo focalizzato, oppure raffica <40ms tra i tasti).

5. **WebView: apri documenti/PDF con `<a href target="_blank">`, MAI `window.open()` dopo un `await`.**
   In WebView (browser in-app) `window.open('','_blank')` seguito da assegnazione di `location.href` dopo
   un'attesa NON naviga. Se il flusso di scansione porta ad aprire qualcosa, usa un vero `<a>` (gesto utente).

6. **Feedback OTTIMISTICO prima della scrittura.** Emetti beep + flash **PRIMA** di `setState` pesanti o fetch:
   l'audio deve partire subito. Le scritture di rete che nascono da una scansione vanno **serializzate/debounced**
   e **mai fire-and-forget** (controlla `res.ok`, ritenta) per non perdere conteggi in raffica.

7. **`facingMode: { ideal: 'environment' }`** per la camera posteriore; a `enabled=false` **rilascia gli stream**
   (`BrowserMultiFormatReader.releaseAllStreams()`), sia allo spegnimento sia nel cleanup dell'effetto.

8. **Formati zxing** da abilitare esplicitamente: EAN_13, EAN_8, CODE_128, CODE_39, UPC_A, UPC_E
   (EAN-13 per ISBN libri, CODE_128 per codici interni/SKU).

---

## Codice — blocco 1: playBeep (HTMLAudio + WAV runtime)
```tsx
export type BeepType = 'ok' | 'warn' | 'error' | 'start' | 'saved'
type ToneSeg = { freq: number; start: number; dur: number; vol: number; shape?: 'sine' | 'square' }

const BEEP_TONES: Record<BeepType, ToneSeg[]> = {
  ok:    [{ freq: 987.77, start: 0, dur: 0.08, vol: 0.34 }, { freq: 1318.51, start: 0.07, dur: 0.13, vol: 0.34 }],
  warn:  [{ freq: 740, start: 0, dur: 0.11, vol: 0.32 }, { freq: 740, start: 0.15, dur: 0.14, vol: 0.32 }],
  error: [{ freq: 330, start: 0, dur: 0.16, vol: 0.32, shape: 'square' }, { freq: 196, start: 0.17, dur: 0.28, vol: 0.32, shape: 'square' }],
  start: [{ freq: 659.25, start: 0, dur: 0.09, vol: 0.30 }, { freq: 987.77, start: 0.085, dur: 0.09, vol: 0.30 }, { freq: 1318.51, start: 0.17, dur: 0.18, vol: 0.32 }],
  saved: [{ freq: 1046.50, start: 0, dur: 0.10, vol: 0.30 }, { freq: 783.99, start: 0.10, dur: 0.26, vol: 0.30 }],
}

function buildBeepWav(tones: ToneSeg[]): string {
  const sr = 44100
  const total = Math.max(...tones.map(t => t.start + t.dur)) + 0.02
  const n = Math.ceil(sr * total)
  const samples = new Int16Array(n)
  const attack = 0.004
  for (let i = 0; i < n; i++) {
    const t = i / sr; let s = 0
    for (const seg of tones) {
      const lt = t - seg.start
      if (lt < 0 || lt >= seg.dur) continue
      const phase = 2 * Math.PI * seg.freq * lt
      const wave = seg.shape === 'square' ? (Math.sin(phase) >= 0 ? 1 : -1) : Math.sin(phase)
      const a = lt < attack ? lt / attack : 1
      const env = a * Math.pow(0.0008, lt / seg.dur)
      s += seg.vol * wave * env
    }
    s = Math.max(-1, Math.min(1, s)); samples[i] = s < 0 ? s * 0x8000 : s * 0x7fff
  }
  const buf = new ArrayBuffer(44 + samples.length * 2); const dv = new DataView(buf)
  const ws = (off: number, str: string) => { for (let i = 0; i < str.length; i++) dv.setUint8(off + i, str.charCodeAt(i)) }
  ws(0, 'RIFF'); dv.setUint32(4, 36 + samples.length * 2, true); ws(8, 'WAVE')
  ws(12, 'fmt '); dv.setUint32(16, 16, true); dv.setUint16(20, 1, true); dv.setUint16(22, 1, true)
  dv.setUint32(24, sr, true); dv.setUint32(28, sr * 2, true); dv.setUint16(32, 2, true); dv.setUint16(34, 16, true)
  ws(36, 'data'); dv.setUint32(40, samples.length * 2, true)
  for (let i = 0; i < samples.length; i++) dv.setInt16(44 + i * 2, samples[i], true)
  const bytes = new Uint8Array(buf); let bin = ''
  for (let i = 0; i < bytes.length; i += 0x2000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x2000))
  return 'data:audio/wav;base64,' + btoa(bin)
}

const _beepEls: Partial<Record<BeepType, HTMLAudioElement>> = {}
function getBeepEl(type: BeepType): HTMLAudioElement | null {
  if (typeof window === 'undefined' || typeof Audio === 'undefined') return null
  let el = _beepEls[type]
  if (!el) { el = new Audio(buildBeepWav(BEEP_TONES[type])); el.preload = 'auto'; _beepEls[type] = el }
  return el
}

// Sblocco al primo gesto (una sola volta)
if (typeof window !== 'undefined') {
  let unlocked = false
  const unlock = () => {
    if (unlocked) return; unlocked = true
    ;(['ok','warn','error','start','saved'] as BeepType[]).forEach(type => {
      const el = getBeepEl(type); if (!el) return
      const prev = el.volume; el.volume = 0
      const p = el.play()
      if (p) p.then(() => { el!.pause(); el!.currentTime = 0; el!.volume = prev }).catch(() => { el!.volume = prev })
      else el.volume = prev
    })
    window.removeEventListener('pointerdown', unlock); window.removeEventListener('keydown', unlock); window.removeEventListener('touchstart', unlock)
  }
  window.addEventListener('pointerdown', unlock, { passive: true })
  window.addEventListener('keydown', unlock, { passive: true })
  window.addEventListener('touchstart', unlock, { passive: true })
}

export function playBeep(type: BeepType = 'ok') {
  const el = getBeepEl(type); if (!el) return
  try { el.currentTime = 0; const p = el.play(); if (p) p.catch(() => {}) } catch { /* no-op */ }
}
```

## Codice — blocco 2: useHidScanner (lettore esterno)
```tsx
export function useHidScanner({ enabled, onScan }: { enabled: boolean; onScan: (code: string) => void }) {
  const onScanRef = useRef(onScan); onScanRef.current = onScan
  useEffect(() => {
    if (!enabled) return
    let buf = ''; let timer: ReturnType<typeof setTimeout> | null = null
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable) return
      if (e.key === 'Enter') { if (buf.length >= 6) onScanRef.current(buf); buf = ''; if (timer) clearTimeout(timer); return }
      if (e.key.length === 1) { buf += e.key; if (timer) clearTimeout(timer); timer = setTimeout(() => { buf = '' }, 150) }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey); if (timer) clearTimeout(timer) }
  }, [enabled])
}
```

## Codice — blocco 3: useCameraScanner (fotocamera, con dedup)
```tsx
export function useCameraScanner({ enabled, onScan, videoRef }: {
  enabled: boolean; onScan: (code: string) => void; videoRef: React.RefObject<HTMLVideoElement | null>
}) {
  const [cameraLoading, setCameraLoading] = React.useState(false)
  const [cameraError, setCameraError] = React.useState('')
  const onScanRef = useRef(onScan); onScanRef.current = onScan
  useEffect(() => {
    if (!enabled) {
      setCameraLoading(false); setCameraError('')
      import('@zxing/browser').then(({ BrowserMultiFormatReader }) => BrowserMultiFormatReader.releaseAllStreams())
      return
    }
    let stopped = false; let lastCode: string | null = null; let lastSeen = 0
    const LEAVE_GAP = 900 // ms fuori campo prima di riconsentire lo stesso codice
    setCameraLoading(true); setCameraError('')
    const timer = setTimeout(async () => {
      if (stopped) return
      try {
        const [{ BrowserMultiFormatReader }, { BarcodeFormat, DecodeHintType, NotFoundException }] =
          await Promise.all([import('@zxing/browser'), import('@zxing/library')])
        if (stopped) return
        const hints = new Map()
        hints.set(DecodeHintType.POSSIBLE_FORMATS, [
          BarcodeFormat.EAN_13, BarcodeFormat.EAN_8, BarcodeFormat.CODE_128,
          BarcodeFormat.CODE_39, BarcodeFormat.UPC_A, BarcodeFormat.UPC_E,
        ])
        const reader = new BrowserMultiFormatReader(hints)
        if (stopped || !videoRef.current) return
        setCameraLoading(false)
        await reader.decodeFromConstraints(
          { video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } } },
          videoRef.current,
          (result, err) => {
            if (stopped) return
            const now = Date.now()
            if (result) {
              const code = result.getText(); lastSeen = now
              if (code === lastCode) return          // stesso codice ancora in campo → già contato
              lastCode = code; onScanRef.current(code)
            } else if (err && err instanceof NotFoundException) {
              if (lastCode !== null && now - lastSeen > LEAVE_GAP) lastCode = null  // uscito dal campo → riconta al rientro
            } else if (err) { console.error(err) }
          },
        )
      } catch (e) {
        if (!stopped) {
          const msg = e instanceof Error ? e.message : String(e)
          setCameraError(/permission|notallowed/i.test(msg)
            ? 'Accesso alla fotocamera negato. Controlla i permessi.' : 'Fotocamera non disponibile.')
          setCameraLoading(false)
        }
      }
    }, 120)
    return () => {
      stopped = true; clearTimeout(timer)
      import('@zxing/browser').then(({ BrowserMultiFormatReader }) => BrowserMultiFormatReader.releaseAllStreams())
    }
  }, [enabled, videoRef])
  return { cameraLoading, cameraError }
}
```

## Come si usa in una pagina (schema)
```tsx
function ScanPage() {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<'camera' | 'hid'>('hid')   // desktop: default 'hid'; mobile: 'camera'
  const [flash, setFlash] = useState<'ok' | 'warn' | null>(null)
  const [count, setCount] = useState(0)
  const [lastTitle, setLastTitle] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  function handleScan(raw: string) {
    const code = raw.trim().replace(/-/g, '')
    if (!/^\d{6,13}$/.test(code)) return
    // 1) FEEDBACK OTTIMISTICO PRIMA di tutto:
    playBeep('ok'); setFlash('ok'); setTimeout(() => setFlash(null), 650)
    setCount(c => c + 1); setLastTitle(/* … risolto in locale, non con una fetch per scan … */ code)
    // 2) POI la scrittura (serializzata/debounced, con res.ok + retry).
  }

  // HID sempre attivo a livello document; camera solo quando 'camera' && aperto
  useHidScanner({ enabled: mode === 'hid' || !open, onScan: handleScan })
  const { cameraLoading, cameraError } = useCameraScanner({ enabled: open && mode === 'camera', onScan: handleScan, videoRef })
  // …render del MorphScanner o UI propria…
}
```

## MorphScanner (UI, opzionale)
Componente a due pulsanti ("Fotocamera" / "Lettore") che si **espande in-place** (chiuso 52px → aperto ~290px):
riquadro camera 150px con mirino a 4 angoli + scanline animata, area di lettura con **numero grande** + ultimo
titolo (+ barra di avanzamento se passi `total`), input manuale in fondo, flash verde/arancio sulla scansione.
Props chiave: `open, mode, onOpen, onClose, cameraLoading, cameraError, inlineVideoRef, scanFlash, count,
total?, lastTitle, onManualScan, cameraEnabled`. Su **desktop** passa `cameraEnabled={false}` (matchMedia ≥768):
resta solo "Lettore esterno" a tutta larghezza (la fotocamera del Mac non serve). Lo stile è specifico dell'app,
quindi ricostruiscilo con il design system della nuova app — **la logica sopra resta invariata**.

## Checklist di collaudo (falla verificare a mano)
- [ ] Beep udibile su **Safari macOS desktop** (non solo Chrome/iPhone) → conferma HTMLAudio.
- [ ] Fotocamera: inquadrando fermo lo stesso codice conta **1**, non a raffica; esci e rientra → riconta.
- [ ] Lettore HID: nessuna tastiera iOS che appare; codici da 6–13 cifre; raffica <150ms.
- [ ] In WebView (se applicabile): niente `window.open` differito; documenti via `<a target="_blank">`.
- [ ] Nessun conteggio perso uscendo mentre si scansiona in raffica (scritture con res.ok + retry, flush su pagehide).
```
```

---

## Adattamento a QUESTO repo (ricettario-serigrafia)

Questo progetto **non** è Next.js/TypeScript/npm: è un **unico `index.html`**, **React 18 via Babel standalone**,
**senza build step**. La spec sopra resta la fonte di verità sul *comportamento*; qui sotto solo le differenze
di *implementazione* obbligate dall'ambiente. **Le 8 REGOLE ASSOLUTE restano identiche.**

1. **Niente `import('@zxing/browser')`.** Non c'è bundler. ZXing si carica da **CDN come globale UMD**:
   `<script src="https://unpkg.com/@zxing/library@0.19.1/umd/index.min.js"></script>` → espone `window.ZXing`
   con `BrowserMultiFormatReader`, `BarcodeFormat`, `DecodeHintType`, `NotFoundException`. Coerente con gli altri
   CDN dell'app (React/Babel da unpkg, jsPDF da cdnjs).
2. **Niente TypeScript.** Gli hook (`useHidScanner`, `useCameraScanner`) e `playBeep` vanno portati in **JS puro**
   dentro un blocco `type="text/babel"` (solo preset React). Nessuna annotazione di tipo.
3. **REGOLA 7 (rilascio stream) — equivalente in 0.19.x.** `BrowserMultiFormatReader.releaseAllStreams()` (statico)
   esiste in `@zxing/browser`, non nella UMD `@zxing/library`. Qui si onora la stessa regola così: si tiene il
   `reader` in un ref, e in cleanup/`enabled=false` si chiama `reader.reset()` **e** si fermano a mano le tracce
   (`video.srcObject.getTracks().forEach(t=>t.stop())`). Intento identico: nessuno stream lasciato aperto.
4. **File di collaudo:** `scanner-test.html` nella root (pagina isolata, pubblicata su GitHub Pages) —
   NON tocca `index.html`. Serve a collaudare lettore HID + fotocamera sull'iPhone prima dell'integrazione nel
   magazzino. Una volta validato, i tre blocchi si trapiantano dentro `index.html` (modalità magazzino).
5. **REGOLA 5 (WebView `window.open`)** non si applica alla pagina di prova (nessun PDF/nav). Resta valida quando
   il modulo verrà integrato nell'app.
