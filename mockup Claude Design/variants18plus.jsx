// variants18plus.jsx — V18 fixato + 4 variazioni con animazioni diverse + idee di stile

// V18 BASE — fixed: stack invertita (fronte in basso), "Ricette" scura, stampa etichetta pill chiara senza progetto dentro
function V18Base() {
  return <WalletProto animation="classic" label="18 · BASE · click fluido"/>;
}

// V19 — Spring overshoot + bordi neri attorno alle pill
function V19() {
  return <WalletProto animation="spring" pillBorders label="19 · SPRING · bordi neri pill"/>;
}

// V20 — Card scala leggermente in apertura + posizione più bassa (vicina alla ricetta)
function V20() {
  return <WalletProto animation="scaleRise" lowerHero label="20 · SCALE-RISE · card più bassa"/>;
}

// V21 — Fan-out: le altre card si sparpagliano + colori AS diversi per inchiostro
function V21() {
  return <WalletProto animation="fanOut" inkColors label="21 · FAN-OUT · colori inchiostro AS"/>;
}

// V22 — Soft snap (curva organica) + mix: card più bassa, bordi neri pill, colori AS
function V22() {
  return <WalletProto animation="softSnap" pillBorders lowerHero inkColors label="22 · SOFT SNAP · mix tutto"/>;
}

Object.assign(window, { V18Base, V19, V20, V21, V22 });
