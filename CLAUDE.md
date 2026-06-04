# Ricettario Serigrafia — Contesto progetto per Claude Code

## Panoramica

App web mobile-first per la gestione delle formule di inchiostri serigrafia (SICO · Pantone).
Ospitata su GitHub Pages, usa Google Sheets come database tramite Apps Script.

**App live:** https://inuitb.github.io/ricettario-serigrafia
**GitHub:** https://github.com/InuitB/ricettario-serigrafia
**Google Sheet:** https://docs.google.com/spreadsheets/d/1uIirqJTLIu74AQo5VeaDVRcFNykF1q0oVp4jTihaUtw
**Apps Script URL:** https://script.google.com/macros/s/AKfycbx1LQGufzvgcs66YUVc0em1iY7DRrugIKI9fcheXzmbpSl8RHmyEeJ2fF2Ma_XD5_A/exec

---

## Stack tecnico

- **Frontend:** Single HTML file (`index.html`) — zero framework, vanilla JS + CSS
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
const PANTONE_NAMES = {...}     // dizionario 570 nomi Pantone (es. '166 U': 'Blaze Orange')
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
| `addSperimentazione` | `addSperimentazione(data)` | crea foglio Sperimentazioni se non esiste, aggiunge riga |
| `promuoviSperimentazione` | `promuoviSperimentazione(data)` | aggiorna stato in Sperimentazioni + copia in Ricette+Componenti |

Tutte le POST usano `mode: 'no-cors'` e `Content-Type: text/plain`.

**Convenzione nomi campo (CRITICO):** il frontend invia i campi in CamelCase esatto: `Pantone_ID`, `HEX`, `Categoria`, `Temperatura`, `Copertura`, `Note`, `Pagina`, `Progetti`. I componenti usano `Inchiostro` e `'Dose_40g (g)'`. `Code.gs` deve leggere i campi con questi nomi esatti — mai in minuscolo.

**Deployment clasp:**
```
clasp push --force           # carica Code.gs + appsscript.json (solo questi, vedi .claspignore)
clasp deploy --deploymentId AKfycbx1LQGufzvgcs66YUVc0em1iY7DRrugIKI9fcheXzmbpSl8RHmyEeJ2fF2Ma_XD5_A --description "descrizione v9+"
```
Versione attuale live: **@9**. Dopo ogni modifica a `Code.gs`: push + deploy con versione incrementata.

---

## Convenzioni CSS

- **Variabili:** `--font`, `--bg`, `--surface`, `--text`, `--text-2`, `--text-3`, `--border`, `--border-strong`, `--radius`
- **Font:** Nebulica per titoli/codici, Arial/system per testi minori
- **Colore sfondo app (wallet):** `#F4EFE2` (beige caldo)
- Le sheet (modifica, nuova, promuovi) salgono dal basso con `translateY(100%) → translateY(0)` + overlay blur
- Classi wallet con prefisso `wallet-` (card, stack, blob) e `wrs-` (wallet recipe sheet)

---

## App mobile — struttura React (index.html)

L'app rileva automaticamente mobile vs desktop. Su mobile (<768px o touch) usa `MobileApp` → `WalletProtoExtract`. Su desktop usa `DesktopApp` con 3 modalità (master, wallet, gallery).

### Componenti mobile principali
- `WalletProtoExtract` — lista card wallet + dettaglio formula. Props: `bg`, `accent`, `pillBorders`, `borderWidth`, `grain`, `blobAnim`, `blobShape`, `blobSpeed`, `onSettings`, `cardStyle`
- `MobileSettingsPanel` — pannello impostazioni che sale dal basso
- `MobileApp` — root mobile; gestisce settings state e passa `onSettings`

### Layout header mobile (valori correnti)
- Titolo "Ricettario": `top:48`
- TOP BAR (search + cerchi): `top: isDetail?58:88`
- `L_TOP=170` (punto di partenza stack card)
- Cerchio impostazioni: `left:0` (esterno alla pill, a sinistra)
- Cerchio filtro/modifica: `right:0` (esterno alla pill, a destra)
- Pill di ricerca: `left:46` in lista, `left:0` in dettaglio, sfondo = `bg`

---

## Cose da fare ancora (backlog)

- Sheet filtro (apre da cerchio filtro in alto, gruppi per Categoria / Copertura / Temperatura)
- Sezione "Da completare" (ricette con data al posto del Pantone ID, in cima alla lista)
- Fix overscroll iOS (colore body appare scrollando oltre il fondo del dettaglio)
- Inchiostri accessibili dal dettaglio toccando il codice inchiostro
- Scelta layout etichetta (E, F, G, H proposti) da implementare in stampaPDF
- Possibilità di modificare gli inchiostri di una ricetta esistente
