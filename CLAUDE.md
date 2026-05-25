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
- **Deploy:** GitHub Pages (branch main, file index.html nella root)

---

## Struttura Google Sheet

| Foglio | Colonne principali |
|--------|-------------------|
| `Ricette` | Pantone_ID, HEX, Categoria, Temperatura, Copertura, Note, Pagina, Progetti |
| `Componenti` | Pantone_ID, Inchiostro, Dose_40g (g) |
| `Inchiostri` | Codice, Nome_completo, Tipologia |
| `Log` | Timestamp, Pantone_ID, Campo, Valore_vecchio, Valore_nuovo |
| `Sperimentazioni` | Sperim_ID, Timestamp, Progetto, Note, Stato, Pantone_ID_assegnato, Inchiostro_1…6, Dose_reale_1…6, Dose_40g_1…6 |

---

## Struttura JS interna (index.html)

### Variabili globali principali
```js
const SCRIPT_URL = '...'     // Apps Script endpoint
let allRicette = []           // array oggetti dal foglio Ricette
let allComponenti = []        // array oggetti dal foglio Componenti
let allInchiostri = []        // array oggetti dal foglio Inchiostri
let allSperimentazioni = []   // array oggetti dal foglio Sperimentazioni
let activeId = null           // Pantone_ID della ricetta aperta
let activeSperimId = null     // Sperim_ID della sperimentazione aperta
let currentPanel = 'archivio' // 'archivio' | 'sperim'
const PANTONE_NAMES = {...}   // dizionario 570 nomi Pantone (es. '166 U': 'Blaze Orange')
const NEBULICA_B64 = '...'    // font Regular base64 per jsPDF
const NEBULICA_BOLD_B64 = '...' // font Bold base64 per jsPDF
```

### Funzioni principali
```
loadData()                  → fetch Google Sheet (CSV pubblico), popola allRicette/Componenti/Inchiostri
loadSperimentazioni()       → fetch foglio Sperimentazioni
filterList()                → filtra e renderizza lista ricette (ricerca + categoria)
showDetail(id)              → apre dettaglio ricetta
showList()                  → torna alla lista
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
```

---

## Navigazione (view system)

L'app usa una navigazione a view: un solo `index.html`, le sezioni si mostrano/nascondono via `display`.

```
#view-list          → lista ricette (tab Ricette)
#view-detail        → dettaglio ricetta singola
#view-inks          → lista inchiostri
#view-ink-detail    → dettaglio inchiostro
#view-add           → tab Nuova Formula (contiene segmented control + #panel-archivio-form / #panel-sperim-form)
#view-progetti      → lista progetti
#view-proj-detail   → dettaglio progetto
#view-sperim-detail → dettaglio sperimentazione
```

La funzione `hideAllViews()` nasconde tutte le view prima di mostrarne una.

### Navigazione bottom bar (3 tab)
- **Flask** (ricette) → `showList()`
- **Folder** (progetti) → `showProgetti()`
- **Pencil+circle** (nuova) → `showAdd()`

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

---

## Convenzioni CSS

- **Variabili:** `--font`, `--bg`, `--surface`, `--text`, `--text-2`, `--text-3`, `--border`, `--border-strong`, `--radius`
- **Font:** Nebulica per titoli/codici, Arial/system per testi minori
- **Colore sfondo app:** `#F2F1ED` (beige caldo)
- Le sheet (modifica, nuova, promuovi) salgono dal basso con `translateY(100%) → translateY(0)` + overlay blur

---

## Cose da fare ancora (backlog)

- Sheet filtro (apre da cerchio filtro in alto, gruppi per Categoria / Copertura / Temperatura)
- Sezione "Da completare" (ricette con data al posto del Pantone ID, in cima alla lista)
- Fix overscroll iOS (colore body appare scrollando oltre il fondo del dettaglio)
- Inchiostri accessibili dal dettaglio toccando il codice inchiostro
- Scelta layout etichetta (E, F, G, H proposti) da implementare in stampaPDF
- Possibilità di modificare gli inchiostri di una ricetta esistente
