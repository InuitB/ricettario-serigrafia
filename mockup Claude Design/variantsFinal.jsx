// variantsFinal.jsx — VERSIONE FINALE
// V31 unico, raccoglie tutto il feedback:
// - exit: "shrinkBack" (Apple Watch stacks vibe: card si rimpiccioliscono e svaniscono dietro)
// - distanza card-codice ↔ ricetta: come V23 (più aria)
// - apertura ricetta: come V23 (rise + spring soft)
// - ritorno alla lista: come V26 (quick, ease-in, 300ms)

function V31() {
  return (
    <WalletProtoV3
      label="31 · VERSIONE FINALE · shrinkBack · ritorno rapido"
      exitMode="shrinkBack"
      recipeMode="rise"
      openDur={520}
      closeDur={300}
      openEase="cubic-bezier(.34, 1.42, .64, 1)"          /* V23 spring soft */
      closeEase="cubic-bezier(.55, .06, .68, .19)"        /* V26 ease-in */
      detailTop={148}                                      /* come V23 */
      recipeBottom={110}                                   /* come V23 */
      recipeRiseFrom={110}                                 /* come V23 */
      pillBorders
    />
  );
}

Object.assign(window, { V31 });
