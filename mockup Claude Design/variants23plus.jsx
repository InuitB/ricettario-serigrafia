// variants23plus.jsx — Round 6
// V23 = V19 raffinato (raccomandata). V24 = scroll demo (lista lunga).
// V25/V26/V27 = 3 esplorazioni di animazione su 3 momenti (exit altre card / arrivo ricetta / ritorno alla lista).

// V23 — V19 raffinato con tutti i fix
function V23() {
  return (
    <WalletProtoV2
      label="23 · V19 raffinato · raccomandato"
      pillBorders={true}
      openDur={520} closeDur={360}
      openEase={EASE_OPEN_SPRING}        // apertura un po' bouncy
      closeEase={EASE_CLOSE_CALM}        // chiusura calma (no overshoot)
      exitMode="flyOff"
      recipeMode="rise"
      detailTop={148}                    // codice un filo più giù → vicino alla ricetta
      recipeBottom={110}
      recipeRiseFrom={110}               // salita più accentuata (parte 110px più sotto)
    />
  );
}

// V24 — Scroll su 25 cards (~ comportamento con 100+)
function V24() {
  return (
    <WalletProtoV2
      label="24 · scrollabile · 25 cards"
      cards={PANTONES_BIG}
      scroll
      pillBorders={true}
      openDur={520} closeDur={360}
      openEase={EASE_OPEN_SPRING}
      closeEase={EASE_CLOSE_CALM}
      exitMode="flyOff"
      recipeMode="rise"
      detailTop={148}
      recipeBottom={110}
      recipeRiseFrom={110}
    />
  );
}

// V25 — Le altre card SVANISCONO scalando + ricetta SCALA dalla card
function V25() {
  return (
    <WalletProtoV2
      label="25 · fade-scale · ricetta scala dalla card"
      pillBorders={true}
      openDur={520} closeDur={380}
      openEase={EASE_OPEN_SOFT}
      closeEase={EASE_CLOSE_CALM}
      exitMode="fadeScale"
      recipeMode="scaleFromCard"
      detailTop={148}
      recipeBottom={110}
      recipeRiseFrom={70}
    />
  );
}

// V26 — Fan-out 4 angoli + ricetta rise normale + chiusura quick
function V26() {
  return (
    <WalletProtoV2
      label="26 · fan-out · ritorno rapido"
      pillBorders={true}
      openDur={560} closeDur={300}
      openEase={EASE_OPEN_SNAPPY}
      closeEase={EASE_CLOSE_QUICK}
      exitMode="fanOut"
      recipeMode="rise"
      detailTop={148}
      recipeBottom={110}
      recipeRiseFrom={110}
    />
  );
}

// V27 — Le altre card SLIDE DOWN tutte insieme + ricetta normale + chiusura calma
function V27() {
  return (
    <WalletProtoV2
      label="27 · slide down · chiusura calma"
      pillBorders={true}
      openDur={540} closeDur={400}
      openEase={EASE_OPEN_SOFT}
      closeEase={EASE_CLOSE_CALM}
      exitMode="slideDown"
      recipeMode="rise"
      detailTop={148}
      recipeBottom={110}
      recipeRiseFrom={120}
    />
  );
}

Object.assign(window, { V23, V24, V25, V26, V27 });
