// variants28plus.jsx — Round 7 — versione finale + 3 animazioni

// V28 — Animation FADE-SCALE (le altre card svaniscono scalando in place)
function V28() {
  return (
    <WalletProtoV3
      label="28 · fade-scale"
      exitMode="fadeScale"
      recipeMode="scaleFromCard"
      openDur={520} closeDur={380}
      openEase="cubic-bezier(.34, 1.42, .64, 1)"
      closeEase="cubic-bezier(.4, 0, .2, 1)"
      detailTop={138}
      recipeRiseFrom={90}
    />
  );
}

// V29 — Animation FAN-OUT (le altre card volano in 4 angoli)
function V29() {
  return (
    <WalletProtoV3
      label="29 · fan-out"
      exitMode="fanOut"
      recipeMode="rise"
      openDur={560} closeDur={320}
      openEase="cubic-bezier(.5, .05, .1, 1.05)"
      closeEase="cubic-bezier(.55, .06, .68, .19)"
      detailTop={138}
      recipeRiseFrom={110}
    />
  );
}

// V30 — Animation SLIDE-DOWN (tutte le altre card scendono insieme)
function V30() {
  return (
    <WalletProtoV3
      label="30 · slide-down"
      exitMode="slideDown"
      recipeMode="rise"
      openDur={540} closeDur={400}
      openEase="cubic-bezier(.34, 1.42, .64, 1)"
      closeEase="cubic-bezier(.4, 0, .2, 1)"
      detailTop={138}
      recipeRiseFrom={120}
    />
  );
}

Object.assign(window, { V28, V29, V30 });
