# HANDOFF — passaggio di sessione

> Nota per Claude: questo file è il passaggio di consegne da una sessione Claude Code
> girata nel terminale sul Mac di Marco il **2026-05-26**. Leggi anche `CLAUDE.md`
> (contesto completo del progetto). Rispondi in **italiano**.

## Come collaborare con Marco
- Scrivi e rispondi **in italiano**.
- Marco è **esperto di serigrafia** (Pantone, dosi inchiostri, etichette termiche) — quello è il suo dominio.
- È **alle prime armi con gli strumenti da sviluppatore** (git, GitHub, terminale): spiega i passaggi tecnici in modo semplice, senza gergo non spiegato, e proponi sempre la via più semplice e affidabile.

## Stato del progetto (a fine sessione Mac)
- L'app è il singolo file `index.html`, pubblicata via **GitHub Pages** dal repo `InuitB/ricettario-serigrafia` (live: https://inuitb.github.io/ricettario-serigrafia).
- **Nessuna modifica al codice dell'app** è stata fatta in questa sessione. `index.html` è invariato.
- Lavoro svolto oggi: collegata la cartella locale del Mac al repo GitHub e verificato che il push funziona (autenticazione via token già presente sul Mac). Questo riguarda solo il setup del Mac — sull'iPhone non serve.

## Come pubblicare le modifiche
- Le modifiche diventano live solo dopo **commit + push** sul branch `main`; poi GitHub Pages aggiorna l'app live in 1-2 minuti.
- Quando crei un commit, aggiungi i file in modo esplicito (es. `index.html`). NON usare `git add .` per evitare di includere file locali di servizio.

## Backlog / possibili prossimi lavori (da CLAUDE.md)
- Sheet **filtro** (apre dal cerchio filtro in alto; gruppi per Categoria / Copertura / Temperatura)
- Sezione **"Da completare"** (ricette con data al posto del Pantone ID, in cima alla lista)
- Fix **overscroll iOS** (colore body che appare scrollando oltre il fondo del dettaglio)
- Inchiostri **cliccabili dal dettaglio** (toccando il codice inchiostro)
- **Scelta layout etichetta** (E, F, G, H) da implementare in `stampaPDF()`
- Possibilità di **modificare gli inchiostri** di una ricetta esistente

## Da chiedere a Marco
- Su quale di questi (o altro) vuole lavorare adesso.
