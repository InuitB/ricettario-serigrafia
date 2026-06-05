// ============================================================
// Ricettario Serigrafia — Google Apps Script
// Google Sheet: https://docs.google.com/spreadsheets/d/1uIirqJTLIu74AQo5VeaDVRcFNykF1q0oVp4jTihaUtw
// ============================================================

const SHEET_ID = '1uIirqJTLIu74AQo5VeaDVRcFNykF1q0oVp4jTihaUtw';

// Forza la dose come numero JS — evita che Sheets interpreti "34.48" come orario
function toDose(v) { const s = String(v || '').replace(',', '.'); const n = parseFloat(s); return isNaN(n) ? (v || '') : n; }

function doGet(e) {
  try {
    const action = (e.parameter || {}).action;
    if (action === 'getFavoriti')   return getFavoriti();
    if (action === 'getInventario') return jsonResp(getInventario());
    return jsonResp({ error: 'Azione sconosciuta' });
  } catch(err) {
    return jsonResp({ error: err.message });
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    let result;
    switch (data.action) {
      case 'addRicetta':              result = addRicetta(data);              break;
      case 'editRicetta':             result = editRicetta(data);             break;
      case 'deleteRicetta':           result = deleteRicetta(data);           break;
      case 'addSperimentazione':      result = addSperimentazione(data);      break;
      case 'promuoviSperimentazione': result = promuoviSperimentazione(data); break;
      case 'togglePreferito':         result = togglePreferito(data);         break;
      case 'aggiungiCarico':          result = aggiungiCarico(data);          break;
      case 'registraMescola':         result = registraMescola(data);         break;
      case 'aggiornaStock':           result = aggiornaStock(data);           break;
      default: result = { error: 'Azione sconosciuta: ' + data.action };
    }
    return ContentService
      .createTextOutput(JSON.stringify(result || { ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function jsonResp(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── PREFERITI ────────────────────────────────────────────────────────────
function getFavoriti() {
  const ss      = SpreadsheetApp.openById(SHEET_ID);
  const ricette = ss.getSheetByName('Ricette');
  const headers = ricette.getRange(1, 1, 1, ricette.getLastColumn()).getValues()[0];
  const prefCol = headers.indexOf('Preferiti');
  if (prefCol === -1) {
    return ContentService.createTextOutput(JSON.stringify({ favoriti: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  const idCol = headers.indexOf('Pantone_ID');
  const data   = ricette.getDataRange().getValues();
  const favoriti = [];
  for (let i = 1; i < data.length; i++) {
    const val = data[i][prefCol];
    if (val === 1 || val === true || String(val) === 'TRUE' || String(val) === '1') {
      favoriti.push(String(data[i][idCol]));
    }
  }
  return ContentService.createTextOutput(JSON.stringify({ favoriti }))
    .setMimeType(ContentService.MimeType.JSON);
}

function togglePreferito(data) {
  const ss      = SpreadsheetApp.openById(SHEET_ID);
  const ricette = ss.getSheetByName('Ricette');
  let headers   = ricette.getRange(1, 1, 1, ricette.getLastColumn()).getValues()[0];
  let prefCol   = headers.indexOf('Preferiti');

  // Crea la colonna Preferiti se non esiste
  if (prefCol === -1) {
    const newCol = ricette.getLastColumn() + 1;
    ricette.getRange(1, newCol).setValue('Preferiti');
    prefCol = newCol - 1; // 0-based
    headers = [...headers, 'Preferiti'];
  }

  const idCol = headers.indexOf('Pantone_ID');
  const rData = ricette.getDataRange().getValues();
  for (let i = 1; i < rData.length; i++) {
    if (String(rData[i][idCol]) === String(data.Pantone_ID)) {
      const cur   = rData[i][prefCol];
      const isFav = cur === 1 || cur === true || String(cur) === 'TRUE' || String(cur) === '1';
      ricette.getRange(i + 1, prefCol + 1).setValue(isFav ? 0 : 1);
      return { ok: true, favorito: !isFav };
    }
  }
  return { error: 'Ricetta non trovata: ' + data.Pantone_ID };
}

// ── AGGIUNGI RICETTA ──────────────────────────────────────────────────────
function addRicetta(data) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const ricette = ss.getSheetByName('Ricette');
  const comp    = ss.getSheetByName('Componenti');

  // Write by column header order to survive any sheet column rearrangement
  const rHeaders = ricette.getRange(1, 1, 1, ricette.getLastColumn()).getValues()[0];
  const fieldMap = {
    'Pantone_ID': data.Pantone_ID || '',
    'HEX':        data.HEX        || '',
    'Categoria':  data.Categoria  || '',
    'Temperatura':data.Temperatura|| '',
    'Copertura':  data.Copertura  || '',
    'Note':       data.Note       || '',
    'Pagina':     data.Pagina     || '',
    'Progetti':   data.Progetti   || ''
  };
  ricette.appendRow(rHeaders.map(h => fieldMap.hasOwnProperty(h) ? fieldMap[h] : ''));

  const cHeaders = comp.getRange(1, 1, 1, comp.getLastColumn()).getValues()[0];
  const componenti = data.componenti || [];
  componenti.forEach(c => {
    const cMap = {
      'Pantone_ID':   data.Pantone_ID  || '',
      'Inchiostro':   c.Inchiostro     || '',
      'Dose_40g (g)': toDose(c['Dose_40g (g)'])
    };
    comp.appendRow(cHeaders.map(h => cMap.hasOwnProperty(h) ? cMap[h] : ''));
  });

  return { ok: true };
}

// ── MODIFICA RICETTA ──────────────────────────────────────────────────────
function editRicetta(data) {
  const ss      = SpreadsheetApp.openById(SHEET_ID);
  const ricette = ss.getSheetByName('Ricette');
  const comp    = ss.getSheetByName('Componenti');
  const log     = ss.getSheetByName('Log');

  const rHeaders = ricette.getRange(1, 1, 1, ricette.getLastColumn()).getValues()[0];
  const rData    = ricette.getDataRange().getValues();

  // Mappa nome colonna → indice (0-based)
  const col = {};
  rHeaders.forEach((h, i) => { col[h] = i; });

  // Trova la riga con l'ID originale
  let rowNum = -1;
  for (let i = 1; i < rData.length; i++) {
    if (String(rData[i][col['Pantone_ID']]) === String(data.Pantone_ID)) {
      rowNum = i + 1; // 1-indexed per Apps Script
      break;
    }
  }
  if (rowNum === -1) return { error: 'Ricetta non trovata: ' + data.Pantone_ID };

  const oldRow = rData[rowNum - 1];
  const ts     = data.timestamp || new Date().toISOString();
  const logs   = [];

  // Funzione helper: aggiorna cella e logga se il valore è cambiato
  function aggiorna(campo, nuovoValore) {
    if (nuovoValore === undefined || nuovoValore === null) return;
    const idx = col[campo];
    if (idx === undefined) return;
    const vecchio = String(oldRow[idx] || '');
    const nuovo   = String(nuovoValore);
    if (vecchio !== nuovo) {
      ricette.getRange(rowNum, idx + 1).setValue(nuovo);
      logs.push([ts, data.Pantone_ID, campo, vecchio, nuovo]);
    }
  }

  // Rinomina ID (aggiorna anche Componenti)
  const nuovoId = data.Pantone_ID_nuovo;
  if (nuovoId && nuovoId !== data.Pantone_ID) {
    const vecchioId = String(oldRow[col['Pantone_ID']] || '');
    ricette.getRange(rowNum, col['Pantone_ID'] + 1).setValue(nuovoId);
    logs.push([ts, data.Pantone_ID, 'Pantone_ID', vecchioId, nuovoId]);

    // Aggiorna Componenti
    const cHeaders = comp.getRange(1, 1, 1, comp.getLastColumn()).getValues()[0];
    const cData    = comp.getDataRange().getValues();
    const cIdCol   = cHeaders.indexOf('Pantone_ID');
    for (let i = 1; i < cData.length; i++) {
      if (String(cData[i][cIdCol]) === String(data.Pantone_ID)) {
        comp.getRange(i + 1, cIdCol + 1).setValue(nuovoId);
      }
    }
  }

  // Aggiorna tutti i campi modificabili
  aggiorna('HEX',         data.HEX);
  aggiorna('Categoria',   data.Categoria);
  aggiorna('Temperatura', data.Temperatura);
  aggiorna('Copertura',   data.Copertura);
  aggiorna('Pagina',      data.Pagina);
  aggiorna('Note',        data.Note);
  aggiorna('Progetti',    data.Progetti);

  // Aggiorna Componenti se forniti
  if (data.componenti && Array.isArray(data.componenti)) {
    const finalId = (nuovoId && nuovoId !== data.Pantone_ID) ? nuovoId : data.Pantone_ID;
    const compData = comp.getDataRange().getValues();
    const compHdr  = compData[0];
    const compIdCol = compHdr.indexOf('Pantone_ID');
    for (let i = compData.length - 1; i >= 1; i--) {
      if (String(compData[i][compIdCol]) === String(finalId)) {
        comp.deleteRow(i + 1);
      }
    }
    data.componenti.forEach(c => {
      comp.appendRow([finalId, c.Inchiostro, toDose(c['Dose_40g (g)'])]);
    });
  }

  // Scrivi righe di log
  if (logs.length > 0) {
    log.getRange(log.getLastRow() + 1, 1, logs.length, 5).setValues(logs);
  }

  return { ok: true, modifiche: logs.length };
}

// ── ELIMINA RICETTA ───────────────────────────────────────────────────────
function deleteRicetta(data) {
  const ss      = SpreadsheetApp.openById(SHEET_ID);
  const ricette = ss.getSheetByName('Ricette');
  const comp    = ss.getSheetByName('Componenti');
  const log     = ss.getSheetByName('Log');

  const ts = data.timestamp || new Date().toISOString();
  const id = String(data.Pantone_ID);

  // Elimina riga in Ricette (scansiona dal basso per indici stabili)
  const rData = ricette.getDataRange().getValues();
  const rHeaders = rData[0];
  const rIdCol = rHeaders.indexOf('Pantone_ID');
  for (let i = rData.length - 1; i >= 1; i--) {
    if (String(rData[i][rIdCol]) === id) {
      ricette.deleteRow(i + 1);
      break;
    }
  }

  // Elimina tutte le righe in Componenti (dal basso)
  const cData = comp.getDataRange().getValues();
  const cHeaders = cData[0];
  const cIdCol = cHeaders.indexOf('Pantone_ID');
  for (let i = cData.length - 1; i >= 1; i--) {
    if (String(cData[i][cIdCol]) === id) {
      comp.deleteRow(i + 1);
    }
  }

  // Logga l'eliminazione
  log.appendRow([ts, id, 'ELIMINATA', id, '']);

  return { ok: true };
}

// ── AGGIUNGI SPERIMENTAZIONE ──────────────────────────────────────────────
function addSperimentazione(data) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sperim = ss.getSheetByName('Sperimentazioni');

  // Crea il foglio se non esiste ancora
  if (!sperim) {
    sperim = ss.insertSheet('Sperimentazioni');
    sperim.appendRow([
      'Sperim_ID','Timestamp','Progetto','Note','Stato','Pantone_ID_assegnato',
      'Inchiostro_1','Inchiostro_2','Inchiostro_3','Inchiostro_4','Inchiostro_5','Inchiostro_6',
      'Dose_reale_1','Dose_reale_2','Dose_reale_3','Dose_reale_4','Dose_reale_5','Dose_reale_6',
      'Dose_40g_1','Dose_40g_2','Dose_40g_3','Dose_40g_4','Dose_40g_5','Dose_40g_6'
    ]);
  }

  const inchiostri  = data.inchiostri  || [];
  const doseReali   = data.dose_reali  || [];
  const dose40g     = data.dose_40g    || [];

  sperim.appendRow([
    data.sperim_id        || '',
    data.timestamp        || new Date().toISOString(),
    data.progetto         || '',
    data.note             || '',
    data.stato            || 'Aperta',
    data.pantone_id_assegnato || '',
    inchiostri[0] || '', inchiostri[1] || '', inchiostri[2] || '',
    inchiostri[3] || '', inchiostri[4] || '', inchiostri[5] || '',
    doseReali[0]  || '', doseReali[1]  || '', doseReali[2]  || '',
    doseReali[3]  || '', doseReali[4]  || '', doseReali[5]  || '',
    dose40g[0]    || '', dose40g[1]    || '', dose40g[2]    || '',
    dose40g[3]    || '', dose40g[4]    || '', dose40g[5]    || ''
  ]);

  return { ok: true };
}

// ── PROMUOVI SPERIMENTAZIONE → RICETTA PANTONE ───────────────────────────
function promuoviSperimentazione(data) {
  const ss      = SpreadsheetApp.openById(SHEET_ID);
  const sperim  = ss.getSheetByName('Sperimentazioni');
  const ricette = ss.getSheetByName('Ricette');
  const comp    = ss.getSheetByName('Componenti');

  // Aggiorna stato in Sperimentazioni
  if (sperim) {
    const sHeaders = sperim.getRange(1, 1, 1, sperim.getLastColumn()).getValues()[0];
    const sData    = sperim.getDataRange().getValues();
    const sIdCol   = sHeaders.indexOf('Sperim_ID');
    const sStatoCol= sHeaders.indexOf('Stato');
    const sPantoneCol = sHeaders.indexOf('Pantone_ID_assegnato');

    for (let i = 1; i < sData.length; i++) {
      if (String(sData[i][sIdCol]) === String(data.Sperim_ID)) {
        sperim.getRange(i + 1, sStatoCol + 1).setValue('Promossa');
        sperim.getRange(i + 1, sPantoneCol + 1).setValue(data.Pantone_ID || '');
        break;
      }
    }
  }

  // Aggiungi ricetta
  ricette.appendRow([
    data.Pantone_ID  || '',
    data.HEX         || '',
    data.Categoria   || '',
    data.Temperatura || '',
    data.Copertura   || '',
    data.Note        || '',
    data.Pagina      || '',
    data.Progetti    || ''
  ]);

  // Aggiungi componenti
  const componenti = data.componenti || [];
  componenti.forEach(c => {
    comp.appendRow([
      data.Pantone_ID,
      c.Inchiostro,
      toDose(c['Dose_40g (g)'])
    ]);
  });

  return { ok: true };
}

// ── MAGAZZINO ─────────────────────────────────────────────────────────────
function ensureMagazzinoSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sh = ss.getSheetByName('Magazzino');
  if (!sh) {
    sh = ss.insertSheet('Magazzino');
    sh.appendRow(['Inchiostro', 'Grammi_disponibili', 'Soglia_alert', 'Note']);
    sh.setFrozenRows(1);
  }
  return sh;
}

function ensureMovimentiSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sh = ss.getSheetByName('MovimentiMagazzino');
  if (!sh) {
    sh = ss.insertSheet('MovimentiMagazzino');
    sh.appendRow(['Timestamp', 'Tipo', 'Inchiostro', 'Grammi', 'Riferimento', 'Note']);
    sh.setFrozenRows(1);
  }
  return sh;
}

function getInventario() {
  const sh = ensureMagazzinoSheet();
  const data = sh.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1).map(r => {
    const o = {};
    headers.forEach((h, i) => { o[h] = r[i]; });
    return {
      inchiostro: String(o['Inchiostro'] || ''),
      grammi:     parseFloat(o['Grammi_disponibili']) || 0,
      soglia:     o['Soglia_alert'] !== '' ? parseFloat(o['Soglia_alert']) : null,
      note:       String(o['Note'] || ''),
    };
  }).filter(r => r.inchiostro);
  return { ok: true, inventario: rows };
}

function aggiungiCarico(data) {
  const sh  = ensureMagazzinoSheet();
  const mov = ensureMovimentiSheet();
  const rows    = sh.getDataRange().getValues();
  const headers = rows[0];
  const inkCol  = headers.indexOf('Inchiostro');
  const gramCol = headers.indexOf('Grammi_disponibili');
  const ts = new Date().toISOString();

  (data.carichi || []).forEach(c => {
    let found = false;
    for (let i = 1; i < rows.length; i++) {
      if (String(rows[i][inkCol]) === String(c.inchiostro)) {
        const cur = parseFloat(rows[i][gramCol]) || 0;
        sh.getRange(i + 1, gramCol + 1).setValue(cur + c.grammi);
        found = true;
        break;
      }
    }
    if (!found) {
      sh.appendRow([c.inchiostro, c.grammi, data.soglia || '', '']);
    }
    mov.appendRow([ts, 'carico', c.inchiostro, c.grammi, data.riferimento || '', data.note || '']);
  });

  return { ok: true };
}

function registraMescola(data) {
  const sh  = ensureMagazzinoSheet();
  const mov = ensureMovimentiSheet();
  const rows    = sh.getDataRange().getValues();
  const headers = rows[0];
  const inkCol  = headers.indexOf('Inchiostro');
  const gramCol = headers.indexOf('Grammi_disponibili');
  const ts = new Date().toISOString();

  (data.inks || []).forEach(c => {
    for (let i = 1; i < rows.length; i++) {
      if (String(rows[i][inkCol]) === String(c.inchiostro)) {
        const cur = parseFloat(rows[i][gramCol]) || 0;
        sh.getRange(i + 1, gramCol + 1).setValue(Math.max(0, cur - c.grammi));
        break;
      }
    }
    mov.appendRow([ts, 'mescola', c.inchiostro, -c.grammi, data.riferimento || data.pantone || '', data.note || '']);
  });

  return { ok: true };
}

function aggiornaStock(data) {
  const sh  = ensureMagazzinoSheet();
  const rows    = sh.getDataRange().getValues();
  const headers = rows[0];
  const inkCol  = headers.indexOf('Inchiostro');
  const gramCol = headers.indexOf('Grammi_disponibili');
  const sogliaCol = headers.indexOf('Soglia_alert');

  let found = false;
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][inkCol]) === String(data.inchiostro)) {
      sh.getRange(i + 1, gramCol + 1).setValue(data.grammi);
      if (data.soglia != null) sh.getRange(i + 1, sogliaCol + 1).setValue(data.soglia);
      found = true;
      break;
    }
  }
  if (!found) {
    sh.appendRow([data.inchiostro, data.grammi, data.soglia != null ? data.soglia : '', '']);
  }

  return { ok: true };
}
