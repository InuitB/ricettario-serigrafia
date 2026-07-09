# Ricettario Serigrafia — Contesto progetto per Claude Code

## ⚙️ Pannello Trasferimento — architettura Monday_ID (sessione 2026-07-08)

Il pannello trasferimento NON usa più matching fuzzy (formule/nomi). Il collegamento
Monday ⇄ ricetta è **esplicito e memorizzato**:

- Ogni ricetta ha un campo **`Monday_ID`** (colonna nel foglio Ricette) = id della formula
  Monday da cui nasce. Scritto da `addRicetta` al momento dell'import.
- `getMondayId(r)` legge `Monday_ID` dal foglio; se assente usa `MONDAY_BACKFILL`
  (mappa hardcoded Pantone_ID→id per le 34 ricette storiche, ricostruita dai Vecchio_Nome).
- `transferredMap[mondayId] = ricetta`. È l'unica verità: "confermato" = esiste una ricetta
  con quel Monday_ID. Conteggio trasferimento = conteggio wallet **per costruzione**.
- Categorie pannello: **Fatti** (transferredMap) · **Da importare** (todo) · **Scartati**
  (`tx_discarded` in localStorage — formule Monday superate/non volute).
- Rimossi: `matchMap`, `conflictMap`, `done`/`markDone`, `orphanIds`, txFindMatch scoring per
  categorizzazione (le funzioni txCompare/txFindMatch restano ma sono codice morto).
- **3 regole di unicità** all'import (`handleImport`): Pantone_ID duplicato → blocco;
  formula identica al 100% (`txFormulaIdentica`, ε=0.15) → blocco; HEX duplicato → blocco
  + 3 HEX vicini liberi (`hexAlternativesVicine`).
- `Vecchio_Nome` è SOLO informazione, non serve più al matching.
- Code.gs: `addRicetta` crea la colonna Monday_ID se manca e la scrive; azione
  `backfillMondayIds({map})` scrive i 34 collegamenti storici nel foglio (bottone "⛓ COLLEGA
  FOGLIO" nell'header del pannello — una tantum, opzionale: l'app funziona già con la mappa).

### Stato operativo (fine sessione 2026-07-09)
- **Code.gs È GIÀ STATO DEPLOYATO dall'utente** (con `backfillMondayIds` + Monday_ID in addRicetta).
  `clasp` è rotto (`invalid_grant`): deploy manuale obbligatorio da script.google.com.
- **Base storica = 34 ricette** nel foglio, tutte da Monday, mappate in `MONDAY_BACKFILL`
  (35 chiavi: incluso alias `'Pantone Reflex Blue U':15` oltre a `'Pantone Reflex Blue':15`).
  `getMondayId` normalizza spazi/maiuscolo (`_txNormPid`) per tollerare doppi spazi/nbsp.
- **`confirmed` è ordinato come il wallet** (indice in `allRicette` = ordine di approvazione),
  non più per id Monday.
- **Regola chiave wallet vs trasferimento**: il wallet conta TUTTE le ricette; il trasferimento
  conta SOLO quelle con Monday_ID (nate da una formula Monday). Un colore aggiunto via "Nuova
  formula" (flussi righe ~1333 e ~2562 — NON passano Monday_ID) o senza origine Monday sta nel
  wallet ma NON nel trasferimento. **Wallet > trasferimento è NORMALE e CORRETTO.**
  (Es. sessione: wallet 49 vs trasferimento 47 = 2 colori non-Monday nel wallet.)
- **3 colori mancanti** che l'utente credeva salvati (37 attesi, 34 reali): **7606, 2418, 3305**
  — mai arrivati nel foglio (vecchio bug di persistenza). `2418`→Monday id 43, `3305`→id 50
  (entrambi in "DA IMPORTARE"); `7606` non ha formula Monday corrispondente.
- Se wallet e trasferimento divergono più del previsto: i colori "extra" nel wallet sono quelli
  che NON compaiono in "GIÀ IN APP / FATTO" → o sono non-Monday (ok) o doppioni dello stesso
  Monday_ID importato due volte (da cancellare).
- Bug residuo innocuo: `salvaVerifica` (Code.gs) azzera la colonna `Done` quando il POST non manda
  `done` — ma il concetto `done` è stato RIMOSSO dal frontend, quindi è ininfluente.

## Panoramica

App web mobile-first per la gestione delle formule di inchiostri serigrafia (SICO · Pantone).
Ospitata su GitHub Pages, usa Google Sheets come database tramite Apps Script.

**App live:** https://inuitb.github.io/ricettario-serigrafia
**GitHub:** https://github.com/InuitB/ricettario-serigrafia
**Google Sheet:** https://docs.google.com/spreadsheets/d/1uIirqJTLIu74AQo5VeaDVRcFNykF1q0oVp4jTihaUtw
**Apps Script URL:** https://script.google.com/macros/s/AKfycbx1LQGufzvgcs66YUVc0em1iY7DRrugIKI9fcheXzmbpSl8RHmyEeJ2fF2Ma_XD5_A/exec

---

## Stack tecnico

- **Frontend:** Single HTML file (`index.html`) — **React 18 + Babel standalone** (`type="text/babel"`), no build step
- **Font:** Nebulica (Regular 400 + Bold 700) — embedded come base64 nel CSS
- **PDF:** jsPDF 2.5.1 (CDN cdnjs) — generazione etichette termiche lato client
- **Backend:** Google Apps Script (`Code.gs`) — esposto come Web App POST endpoint
- **Database:** Google Sheets (4 fogli: Ricette, Componenti, Inchiostri, Log + Sperimentazioni)
- **Deploy frontend:** GitHub Pages (branch `main`, file `index.html` nella root)
- **Deploy backend:** clasp — `clasp push && clasp deploy --deploymentId <ID> --description "..."` — credenziali in `~/.clasprc.json`, già funzionante nell'ambiente Claude Code web

> **⚠️ REGOLA DEPLOY — DA SEGUIRE SEMPRE:**
> La sessione Claude Code sviluppa su un branch separato (es. `claude/pantone-color-app-NZq5T`),
> ma GitHub Pages pubblica **solo `main`**. Dopo ogni push al branch di sviluppo, sincronizzare
> obbligatoriamente con:
> ```
> git push origin HEAD:main
> ```
> Senza questo passaggio le modifiche esistono nel repo ma **non sono visibili nell'app live**.

---

## Struttura Google Sheet

| Foglio | Colonne principali |
|--------|-------------------|
| `Ricette` | Pantone_ID, HEX, Categoria, Temperatura, Copertura, Note, Pagina, Progetti |
| `Componenti` | Pantone_ID, Inchiostro, Dose_40g (g) |
| `Inchiostri` | Codice, Nome_completo, Tipologia |
| `Log` | Timestamp, Pantone_ID, Campo, Valore_vecchio, Valore_nuovo |
| `Sperimentazioni` | Sperim_ID, Timestamp, Progetto, Note, Stato, Pantone_ID_assegnato, Inchiostro_1…6, Dose_reale_1…6, Dose_40g_1…6 |

**Nota campo dose:** il nome corretto è `'Dose_40g (g)'` (con spazio e parentesi). In JS va sempre scritto `c['Dose_40g (g)']`, mai `c.Dose_40g`.

---

## Struttura JS interna (index.html)

### Variabili globali principali
```js
const SCRIPT_URL = '...'       // Apps Script endpoint
let allRicette = []             // array oggetti dal foglio Ricette
let allComponenti = []          // array oggetti dal foglio Componenti
let allInchiostri = []          // array oggetti dal foglio Inchiostri
let allSperimentazioni = []     // array oggetti dal foglio Sperimentazioni
let activeId = null             // Pantone_ID della ricetta aperta
let activeSperimId = null       // Sperim_ID della sperimentazione aperta
let activeQty = 100             // quantità selezionata (g) per il calcolo dosi
let currentPanel = 'archivio'  // 'archivio' | 'sperim'
const PANTONE_NAMES = {...}     // dizionario 1707 nomi Pantone — 571 ufficiali + 1136 auto-generati via HSL
const PANTONE_OFFICIAL = new Set([...]) // 571 chiavi ufficiali — usato in transformData per appendere '*' ai nomi auto
const NEBULICA_B64 = '...'     // font Regular base64 per jsPDF
const NEBULICA_BOLD_B64 = '...' // font Bold base64 per jsPDF

// Wallet stack
const PEEK_H    = 76            // altezza visibile di una card in stack (px)
const ACTIVE_H  = 178           // altezza card a riposo (px)
const OPEN_DUR  = 560           // durata animazione apertura (ms)
const CLOSE_DUR = 320           // durata animazione chiusura (ms)
const OPEN_EASE  = 'cubic-bezier(.5,.05,.1,1.05)'
const CLOSE_EASE = 'cubic-bezier(.55,.06,.68,.19)'
let walletCards = []            // array ricette visualizzate nel wallet
let walletSelectedIdx = null    // indice card aperta (null = lista)
let walletClosing = false       // true durante animazione chiusura
let walletScrollOffset = 0      // offset scroll verticale dello stack
let walletStackTop = 0          // top px dello stack (sotto header)
let walletStackH = 0            // altezza disponibile per lo stack (px)
```

### Funzioni principali
```
loadData()                  → fetch Google Sheet (CSV pubblico), popola allRicette/Componenti/Inchiostri
loadSperimentazioni()       → fetch foglio Sperimentazioni
filterList()                → chiama walletSetupLayout() + renderWalletList() con ricette filtrate
showDetail(id)              → apre dettaglio ricetta (view-detail, usato dal vecchio flusso)
showList()                  → torna alla lista wallet (view-list)
switchPanel(panel)          → switcha Archivio ↔ Sperimentazione nel tab Nuova
openSperimSheet()           → apre sheet nuova sperimentazione
salvaSperimentazione()      → POST addSperimentazione → Apps Script
showSperimDetail(id)        → apre dettaglio sperimentazione
openPromuoviSheet()         → apre sheet promozione a ricetta Pantone
salvaPromozione()           → POST promuoviSperimentazione → Apps Script
stampaPDF()                 → genera PDF etichetta termica 57×25mm con jsPDF
openEditSheet()             → apre sheet modifica ricetta esistente
saveEdit()                  → POST editRicetta → Apps Script
salvaFormula()              → POST addRicetta → Apps Script

// Wallet stack
walletSetupLayout()         → calcola walletStackTop/H, posiziona sheet e hint
renderWalletList(filtered)  → genera HTML card + chiama walletApplyPositions()
walletApplyPositions(anim)  → applica transform a tutte le card (lista / fan-out / dettaglio)
selectWalletCard(idx)       → apre card: fan-out delle altre, sale color card, mostra formula sheet
walletClose()               → chiude con animazione, ripristina lista
walletResetToList()         → reset immediato senza animazione
walletShowRecipe(r)         → renderizza formula sheet per la ricetta r
walletSetQty(qty, el)       → aggiorna activeQty e ri-renderizza la formula sheet
walletFgColor(hex)          → restituisce '#0B0B0B' o '#ffffff' in base alla luminosità del colore
walletAttachScroll(stack)   → attacca eventi touch/wheel per scroll dello stack
walletUpdateScrollPositions() → aggiorna solo i top delle card (senza animazione, per scroll)
```

---

## Navigazione (view system)

L'app usa una navigazione a view: un solo `index.html`, le sezioni si mostrano/nascondono via `display`.

```
#view-list          → lista ricette WALLET (tab Ricette) — position:fixed, overflow:hidden
#view-detail        → dettaglio ricetta singola (usato ancora da showDetail)
#view-inks          → lista inchiostri
#view-ink-detail    → dettaglio inchiostro
#view-add           → tab Nuova Formula (contiene segmented control + panel-archivio-form / panel-sperim-form)
#view-progetti      → lista progetti
#view-proj-detail   → dettaglio progetto
#view-sperim-detail → dettaglio sperimentazione
```

`#view-list` non usa `hideAllViews()`: si mostra/nasconde con la classe `.active` (`display:block`).

### Navigazione bottom bar (3 tab)
- **Flask** (ricette) → `showList()`
- **Folder** (progetti) → `showProgetti()`
- **Pencil+circle** (nuova) → `showAdd()`

---

## Wallet Stack UI (view-list)

La lista ricette usa un sistema a "wallet" ispirato ad Apple Pay: card colorate impilate verticalmente, toccandone una le altre spariscono con fan-out a 4 angoli e compare la formula sheet.

### Struttura HTML
```
#view-list (position:fixed, background:#F4EFE2)
  #wallet-blob-bg          → sfondo blob animati (compare solo in dettaglio)
  #wallet-list-chrome      → header: count + search + categorie
  #wallet-stack            → contenitore card (position:absolute, scroll gestito via JS)
    .wallet-card × N       → singola card colorata (position:absolute, top gestito via JS)
  #wallet-recipe-sheet     → formula sheet (position:absolute, sale dal basso)
  #wallet-hint             → "↑ TOCCA UNA CARD"
  #wallet-detail-chrome    → header dettaglio (← Ricette + matita)
```

### Animazione card
- Le card sono `position:absolute` con `top` statico (mai animato — layout reflow).
- Il movimento usa esclusivamente `transform: translateY()` (GPU composited).
- **Lista:** tutte con `transform:none`, impilate con peek di 76px.
- **Dettaglio (card selezionata):** `translateY` calcolato per portarla a y=90px dal top viewport.
- **Fan-out (altre card):** 4 direzioni angolari, ciclo `(i - selectedIdx + 1000) % 4`.
- `will-change: transform, opacity` + `backface-visibility: hidden` per GPU layer promotion.
- **Importante iOS Safari:** usare `box-shadow` (non `filter: drop-shadow`) sulle card animate — `filter` disabilita il compositing GPU.

### Formula sheet (#wallet-recipe-sheet)
- `position:absolute`, `top` = 90 + 178 + 14 = **282px** dal top viewport.
- Nessun `max-height` né `overflow-y:scroll` — si allunga naturalmente con gli ingredienti.
- Appare con transizione `rising` (translateY 80px → 0, opacity 0 → 1).
- Contiene: selettore quantità (100g/300g/500g/1kg), righe formula con barre proporzionali, bottone Stampa etichetta.
- Le dosi si calcolano da `c['Dose_40g (g)']` (campo con spazio e parentesi — non `c.Dose_40g`).

### Blob background
- Tre `div.wallet-blob` con `filter:blur(70px)` del colore Pantone, visibili solo in modalità dettaglio.
- Il blob superiore parte da `top:22%` con animazione che non sale oltre -8px — per non sforare dietro la status bar iOS.

---

## Segmented control (Archivio / Sperimentazione)

Si trova nel **tab Nuova Formula** (`#view-add`).
- `switchPanel('archivio')` → mostra `#panel-archivio-form` (form aggiungi ricetta Pantone)
- `switchPanel('sperim')` → mostra `#panel-sperim-form` (lista + bottone nuova sperimentazione)

Il thumb `.seg-thumb` si anima con `transform: translateX(100%)` quando attivo su "Sperimentazione".

---

## Flusso Sperimentazione

```
[+ Nuova] → openSperimSheet()
  → ID generato automatico (es. "260526a" = ddmmyy + lettera progressiva)
  → inserisci inchiostri (2–6) con dosi REALI (es. 27.3g totali)
  → conversione live a 40g mostrata in tempo reale
  → salvaSperimentazione() → POST addSperimentazione

[lista sperimentazioni] → showSperimDetail(id)
  → mostra formula: dosi reali barrate + dosi convertite a 40g + barre proporzionali
  → [Promuovi a ricetta Pantone →] → openPromuoviSheet()
    → inserisci codice Pantone + HEX + categoria
    → salvaPromozione() → POST promuoviSperimentazione
      → aggiorna stato='Promossa' nel foglio Sperimentazioni
      → copia ricetta in foglio Ricette con dosi già a 40g
      → aggiunge componenti in foglio Componenti
```

---

## Etichetta termica PDF (stampaPDF)

- **Dimensioni:** 57×25mm (Zebra ZSB-12)
- **Layout:** codice Pantone grande (Nebulica Bold 21pt) + nome Pantone + pallini copertura + separatore + barre proporzionali con rx (stonate) + totale
- **Font:** Nebulica Regular + Bold embedded via `addFileToVFS` / `addFont` in jsPDF
- **Bordo:** `roundedRect` con inset 1mm, rx 2.5mm
- Il file si scarica come `etichetta_166_U.pdf`

---

## Apps Script (Code.gs) — azioni supportate

| action | funzione | descrizione |
|--------|----------|-------------|
| `addRicetta` | `addRicetta(data)` | aggiunge riga in Ricette + righe in Componenti |
| `editRicetta` | `editRicetta(data)` | aggiorna campi in Ricette, logga in Log |
| `deleteRicetta` | `deleteRicetta(data)` | elimina riga da Ricette e Componenti, logga in Log |
| `addSperimentazione` | `addSperimentazione(data)` | crea foglio Sperimentazioni se non esiste, aggiunge riga |
| `promuoviSperimentazione` | `promuoviSperimentazione(data)` | aggiorna stato in Sperimentazioni + copia in Ricette+Componenti |
| `togglePreferito` | `togglePreferito(data)` | toglie/mette 1 nella colonna Preferiti del foglio Ricette |

Le POST usano `mode: 'no-cors'` e `Content-Type: text/plain`.
Il `doGet?action=getFavoriti` è CORS-enabled e ritorna `{ favoriti: [id, ...] }` direttamente dal foglio (bypassa cache CSV).

**Convenzione nomi campo (CRITICO):** il frontend invia i campi in CamelCase esatto: `Pantone_ID`, `HEX`, `Categoria`, `Temperatura`, `Copertura`, `Note`, `Pagina`, `Progetti`. I componenti usano `Inchiostro` e `'Dose_40g (g)'`. `Code.gs` deve leggere i campi con questi nomi esatti — mai in minuscolo.

**toDose(v)** — helper in Code.gs che converte la dose in numero JS prima di scrivere nel foglio:
```js
function toDose(v) { const s = String(v || '').replace(',', '.'); const n = parseFloat(s); return isNaN(n) ? (v || '') : n; }
```
Usato in tutti e tre i punti dove si scrive `Dose_40g (g)` (addRicetta, editRicetta, promuoviSperimentazione).
Motivo: Google Sheets con locale italiano interpreta la stringa `"34.48"` come orario (34h 48m). Passando un numero JS, Sheets non può fraintenderlo. Accetta sia punto che virgola come separatore decimale.

**Deployment — clasp funziona dall'ambiente Claude Code web** (credenziali in `~/.clasprc.json`).
Deployment ID attivo: `AKfycbx1LQGufzvgcs66YUVc0em1iY7DRrugIKI9fcheXzmbpSl8RHmyEeJ2fF2Ma_XD5_A`
Script ID: `18aYhMDPjoAa7Rtf_B08YwejhTPXIqlbclEa9nWTnr1WND19c85hwuqiQ`

Procedura deploy da Claude Code:
```
clasp push && clasp deploy --deploymentId AKfycbx1LQGufzvgcs66YUVc0em1iY7DRrugIKI9fcheXzmbpSl8RHmyEeJ2fF2Ma_XD5_A --description "descrizione"
```

---

## Convenzioni CSS

- **Variabili:** `--font`, `--bg`, `--surface`, `--text`, `--text-2`, `--text-3`, `--border`, `--border-strong`, `--radius`
- **Font:** Nebulica per titoli/codici, Arial/system per testi minori
- **Colore sfondo app (wallet):** `#F4EFE2` (beige caldo)
- Le sheet (modifica, nuova, promuovi) salgono dal basso con `translateY(100%) → translateY(0)` + overlay blur
- Classi wallet con prefisso `wallet-` (card, stack, blob) e `wrs-` (wallet recipe sheet)

---

## App struttura React (index.html)

L'app rileva automaticamente mobile vs desktop. Su mobile (<768px o touch) usa `MobileApp` → `WalletProtoExtract`. Su desktop usa `DesktopApp` con 3 modalità (master, wallet, gallery).

### Architettura globali cross-component
- `window._bumpData()` → forza re-render dopo mutazione di allRicette/allComponenti
- `window._refreshData()` → ricarica dati da Google Sheet (delay 6s per attendere commit Apps Script)
- `window._selectCode(code)` → seleziona una ricetta nella MasterMode
- `newlySaved` (Set) → codici appena salvati, usati per animazione "new card"

### Componente MasterMode (desktop principale — ~riga 1240)
- **Header row** (h:88): Logo + SearchPill (w:600) + FilterButton + NuovaPill + spazio + ModeOrb
- **Detail column** (w:600): card con `borderRadius:34`, `margin:'0 10px'`, `position:'relative'`
- **Card header** (`position:'relative'`, `padding:'18px 34px 14px'`):
  - Bottoni ★ e ✏ → `position:'absolute', top:14, right:14` (nested-radius: card r=34, button r=20 → inset=14)
  - Name div → `paddingRight:100` per evitare overlap con i bottoni assoluti
- **Card body** (`padding:'18px 34px 22px'`): usa `bodyInnerRef.scrollHeight` per misura altezza
- **`useLayoutEffect`** deps: `[selected&&selected.code, anim, qty, theme.cardSurface, theme.display, theme.borders, theme.borderWidth]`

### iOS 26 nested-radius — principio applicato
- Card outer `borderRadius:34` → padding contenuto = 34px → nested element `borderRadius:20` → inset = 34-20 = **14px**
- Card ha `margin:'0 10px'` per "floating" visivo

### Componenti mobile principali
- `WalletProtoExtract` — lista card wallet + dettaglio formula. Props: `bg`, `accent`, `pillBorders`, `borderWidth`, `grain`, `blobAnim`, `blobShape`, `blobSpeed`, `onSettings`, `cardStyle`
- `MobileSettingsPanel` — pannello impostazioni che sale dal basso
- `MobileApp` — root mobile; gestisce settings state e passa `onSettings`

### Layout header mobile (valori correnti)
- Titolo "Ricettario": `top:48`
- TOP BAR (search + cerchi): `top: calc(env(safe-area-inset-top,44px) + 48px)`, `zIndex:1000`
- `L_TOP=170` (punto di partenza stack card)
- Cerchio impostazioni: `left:0` (esterno alla pill, a sinistra) — visibile solo in lista
- Cerchio stella ★ preferito: `right:46` — visibile solo in dettaglio, chiama `toggleFavorito(selected.code)`
- Cerchio filtro/modifica: `right:0` — filtro in lista, matita ✏ in dettaglio
- Pill di ricerca: `left:46` in lista, `left:0` in dettaglio (diventa "← Ricette"), sfondo = `bg`

### Z-index layering mobile
- TOP BAR: `zIndex:1000`
- NuovaSheet backdrop/panel: `zIndex:1010/1020` — sopra la top bar ✓
- EditSheet backdrop/panel: `zIndex:1010/1020` — sopra la top bar ✓
- MobileSettingsPanel (sale dal basso): `zIndex:900/910` — non interferisce con top bar

### transformData() — logica nomi
```js
const nameRaw = PANTONE_NAMES[code];
const name = nameRaw ? (PANTONE_OFFICIAL.has(code) ? nameRaw : nameRaw + '*') : code;
// '*' appeso ai 1136 nomi auto-generati (non ufficiali Pantone)
```

### EditSheet — ordine campi (riga ~791)
Pantone ID → HEX + Categoria → Pagina + Temperatura → Copertura → Formula (inchiostri/dosi) → Note + Progetti

---

## Cose da fare ancora (backlog)

- Sheet filtro (apre da cerchio filtro in alto, gruppi per Categoria / Copertura / Temperatura)
- Sezione "Da completare" (ricette con data al posto del Pantone ID, in cima alla lista)
- Fix overscroll iOS (colore body appare scrollando oltre il fondo del dettaglio)
- Inchiostri accessibili dal dettaglio toccando il codice inchiostro
- Scelta layout etichetta (E, F, G, H proposti) da implementare in stampaPDF
- Possibilità di modificare gli inchiostri di una ricetta esistente

## Ultime modifiche (sessione 2026-06-06)

### Magazzino inventory (desktop, 4ª modalità)
- Nuovo `MagazzinMode` — 4ª modalità desktop (icona scatola in ModeOrb)
- `CaricaSheet` — due modalità: **Pieni** (n barattoli × g standard) e **Pesati** (lordo − tara)
- `MescolaSheet` — conferma mescola, scala stock per inchiostro
- Pulsante "Mescola" nella card formula di MasterMode
- Sezione MAGAZZINO in SettingsPanel: slider tara (default 106g) e soglia alert (default 1000g)
- `DESK_DEFAULTS`: aggiunto `tare:106, alertThreshold:1000`
- `doLoad` chiama anche `loadInventario()` all'avvio

### Bug fix critici
- **Ricetta sparisce dopo salvataggio**: rimosso `_refreshData()` automatico 6s dopo save. Il cache gviz di Google non si aggiorna in tempo e sovrascriveva l'update ottimistico locale. L'aggiornamento locale (push in allRicette + allComponenti + transformData) è già completo e corretto.
- **POST ora leggibile**: sostituito `mode:'no-cors'` con helper `postGAS()` che legge la risposta JSON e mostra errori reali. Tutti i salvataggi critici (addRicetta ×2, editRicetta) usano `postGAS()`.
- **getInventario non crea più fogli**: `getInventario` in Code.gs restituisce `[]` se il foglio Magazzino non esiste, invece di crearlo. La creazione con side-effect su doGet stava bloccando l'autorizzazione Apps Script e impediva i salvataggi.

### Validazione duplicati
- Blocco salvataggio se Pantone ID già esiste in allRicette — messaggio: `⚠ "XXX U" esiste già — modifica la ricetta esistente o usa un codice diverso.`

### PANTONE_DB espanso
- Da 1882 a **1924 voci**: aggiunti 42 codici mancanti nella fascia 2381–2427 U
- Confermato 2418 U = #008759 (verde teal, fonte Google AI)

### Code.gs — stato attuale ⚠️
Il file `Code.gs` nel repository (468 righe) è aggiornato con:
- `postGAS()` helper pattern (no-cors rimosso)
- `getInventario` read-only (non crea fogli)
- Azioni magazzino: `aggiungiCarico`, `registraMescola`, `aggiornaStock`
- `doGet` gestisce `getInventario`
- Helper `jsonResp()`

**L'utente deve ancora incollare il Code.gs completo in Apps Script e fare Deploy → Nuova versione.**
Procedura: script.google.com → Cmd+A → incolla → Cmd+S → Deploy → Gestisci deployment → matita → Nuova versione → Distribuisci.
Il file ha 468 righe e inizia con `// ============================================================`.

### Apps Script (Code.gs) — azioni supportate (aggiornate)

| action | funzione | descrizione |
|--------|----------|-------------|
| `addRicetta` | `addRicetta(data)` | aggiunge riga in Ricette + righe in Componenti |
| `editRicetta` | `editRicetta(data)` | aggiorna campi in Ricette, logga in Log |
| `deleteRicetta` | `deleteRicetta(data)` | elimina riga da Ricette e Componenti, logga in Log |
| `addSperimentazione` | `addSperimentazione(data)` | crea foglio Sperimentazioni se non esiste, aggiunge riga |
| `promuoviSperimentazione` | `promuoviSperimentazione(data)` | aggiorna stato in Sperimentazioni + copia in Ricette+Componenti |
| `togglePreferito` | `togglePreferito(data)` | toglie/mette 1 nella colonna Preferiti del foglio Ricette |
| `aggiungiCarico` | `aggiungiCarico(data)` | aggiunge grammi a Magazzino + log in MovimentiMagazzino |
| `registraMescola` | `registraMescola(data)` | scala grammi da Magazzino per ogni inchiostro + log |
| `aggiornaStock` | `aggiornaStock(data)` | imposta valore assoluto grammi per un inchiostro |

doGet gestisce: `getFavoriti`, `getInventario`

**Nuovi fogli Google Sheet creati da Apps Script:**
- `Magazzino`: Inchiostro, Grammi_disponibili, Soglia_alert, Note
- `MovimentiMagazzino`: Timestamp, Tipo, Inchiostro, Grammi, Riferimento, Note

### POST helper (CRITICO — cambiamento architetturale)
```js
// NON usare più fetch con mode:'no-cors' per operazioni critiche
// Usare postGAS(payload) che legge la risposta e lancia errori visibili
async function postGAS(payload) {
  const resp = await fetch(SCRIPT_URL, {
    method: 'POST',
    headers: {'Content-Type': 'text/plain'},
    body: JSON.stringify(payload),
  });
  let d;
  try { d = await resp.json(); } catch(_) { return {ok:true}; }
  if (d && d.error) throw new Error(d.error);
  return d;
}
```
`togglePreferito` rimane fire-and-forget con `mode:'no-cors'` (non critico).

## Ultime modifiche (sessione 2026-06-05)

- **PANTONE_DB espanso** da 1707 a 1882 voci: aggiunti 175 codici mancanti nelle fasce 2125–2126, 2169–2304, 2306–2336, 2366–2371 U (sorgente: JSON PMS Uncoated da repo GitHub xzz2021/public). Il **2305 U = "Golden Harvest" #9BA747** rimane confermato dall'utente e NON è stato sovrascritto.
- **PANTONE_DB — nota qualità dati 2169–2336**: i codici in questa fascia sembrano mappare a colori già esistenti in altre serie (es. 2169 U = stesso RGB di 705 U). Probabilmente dati da un sistema Pantone-compatibile cinese, non lo standard internazionale. Usare con cautela.
- **InkSearchField — Enter avanza ai grammi**: premendo Invio sul campo inchiostro, se il dropdown è aperto seleziona il primo suggerimento e sposta il focus al campo dose; se chiuso, sposta direttamente il focus. Aggiunto prop `onConfirm` callback.
- **NuovaSheet — validazione 40g**: avviso morbido se il totale dose ≠ 40g (±0.15g). Prima pressione "Salva" mostra l'avviso; seconda pressione salva comunque.
- **Mobile scroll fluido — DOM diretto**: `WalletProtoExtract` aggiornato per bypassare React durante scroll/inerzia. Usa `scrollRef` (ref) + `cardRefs` (map idx→DOM) + `applyScrollDirect(sy)` che scrive `el.style.top/transform/opacity` direttamente. `setScrollY` (state) chiamato solo al termine del gesto (un solo re-render). `layoutClosed(i)` ora legge `scrollRef.current` invece di `scrollY` state. Inerzia: decay `0.92→0.97`, soglia stop `0.02→0.005` px/ms.

### WalletProtoExtract — scroll architecture (CRITICO)
```js
// Refs aggiunti per scroll ottimizzato:
const scrollRef = React.useRef(0);   // source of truth durante animazione
const cardRefs = React.useRef({});   // map i → DOM element delle card

// applyScrollDirect(sy): aggiorna top/transform/opacity direttamente sul DOM
// layoutClosed(i): legge scrollRef.current (non scrollY state)
// onAreaMove: aggiorna scrollRef.current + chiama applyScrollDirect (NO setScrollY)
// inertia step: aggiorna scrollRef.current + applyScrollDirect (NO setScrollY)
// fine gesto: setScrollY(scrollRef.current) → un solo re-render React
```

