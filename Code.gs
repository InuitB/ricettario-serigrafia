// ============================================================
// Ricettario Serigrafia — Google Apps Script
// Google Sheet: https://docs.google.com/spreadsheets/d/1uIirqJTLIu74AQo5VeaDVRcFNykF1q0oVp4jTihaUtw
// ============================================================

const SHEET_ID = '1uIirqJTLIu74AQo5VeaDVRcFNykF1q0oVp4jTihaUtw';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    let result;
    switch (data.action) {
      case 'addRicetta':              result = addRicetta(data);              break;
      case 'editRicetta':             result = editRicetta(data);             break;
      case 'addSperimentazione':      result = addSperimentazione(data);      break;
      case 'promuoviSperimentazione': result = promuoviSperimentazione(data); break;
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

// ── AGGIUNGI RICETTA ──────────────────────────────────────────────────────
function addRicetta(data) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const ricette = ss.getSheetByName('Ricette');
  const comp    = ss.getSheetByName('Componenti');

  ricette.appendRow([
    data.pantone_id,
    data.hex        || '',
    data.categoria  || '',
    data.temperatura|| '',
    data.copertura  || '',
    data.note       || '',
    data.pagina     || '',
    data.progetti   || ''
  ]);

  const componenti = data.componenti || [];
  componenti.forEach(c => {
    comp.appendRow([
      data.pantone_id,
      c.inchiostro,
      c['dose_40g'] || c.dose_40g || ''
    ]);
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
    if (String(rData[i][col['Pantone_ID']]) === String(data.pantone_id_originale)) {
      rowNum = i + 1; // 1-indexed per Apps Script
      break;
    }
  }
  if (rowNum === -1) return { error: 'Ricetta non trovata: ' + data.pantone_id_originale };

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
      logs.push([ts, data.pantone_id_originale, campo, vecchio, nuovo]);
    }
  }

  // Rinomina ID (aggiorna anche Componenti)
  const nuovoId = data.pantone_id_nuovo;
  if (nuovoId && nuovoId !== data.pantone_id_originale) {
    const vecchioId = String(oldRow[col['Pantone_ID']] || '');
    ricette.getRange(rowNum, col['Pantone_ID'] + 1).setValue(nuovoId);
    logs.push([ts, data.pantone_id_originale, 'Pantone_ID', vecchioId, nuovoId]);

    // Aggiorna Componenti
    const cHeaders = comp.getRange(1, 1, 1, comp.getLastColumn()).getValues()[0];
    const cData    = comp.getDataRange().getValues();
    const cIdCol   = cHeaders.indexOf('Pantone_ID');
    for (let i = 1; i < cData.length; i++) {
      if (String(cData[i][cIdCol]) === String(data.pantone_id_originale)) {
        comp.getRange(i + 1, cIdCol + 1).setValue(nuovoId);
      }
    }
  }

  // Aggiorna tutti i campi modificabili
  aggiorna('HEX',         data.hex);
  aggiorna('Categoria',   data.categoria);
  aggiorna('Temperatura', data.temperatura);
  aggiorna('Pagina',      data.pagina);
  aggiorna('Note',        data.note);
  aggiorna('Progetti',    data.progetti);

  // Scrivi righe di log
  if (logs.length > 0) {
    log.getRange(log.getLastRow() + 1, 1, logs.length, 5).setValues(logs);
  }

  return { ok: true, modifiche: logs.length };
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
      if (String(sData[i][sIdCol]) === String(data.sperim_id)) {
        sperim.getRange(i + 1, sStatoCol + 1).setValue('Promossa');
        sperim.getRange(i + 1, sPantoneCol + 1).setValue(data.pantone_id || '');
        break;
      }
    }
  }

  // Aggiungi ricetta
  ricette.appendRow([
    data.pantone_id     || '',
    data.hex            || '',
    data.categoria      || '',
    data.temperatura    || '',
    data.copertura      || '',
    data.note           || '',
    data.pagina         || '',
    data.progetti       || ''
  ]);

  // Aggiungi componenti
  const componenti = data.componenti || [];
  componenti.forEach(c => {
    comp.appendRow([
      data.pantone_id,
      c.inchiostro,
      c['dose_40g'] || c.dose_40g || ''
    ]);
  });

  return { ok: true };
}
