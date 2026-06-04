// shared4.jsx — Wallet Proto v2 con tutti i fix richiesti
//
// Fixes:
// - Card design: codice grande in alto (visibile nel peek), "U" anch'essa Nebulica, no label "PANTONE"
// - Nome + PAG/COER restano sulla CARD (visibili quando espansa), non sulla ricetta
// - Più spazio fra search bar e prima card
// - Recipe sheet: rimossi PAG/COER, pill inchiostri tutti uguali, salita più accentuata
// - Stampa etichetta = pill chiara stondata, progetto fuori dal bottone
// - "Ricette" pill: testo scuro su bg chiaro
// - Easings separate per OPEN vs CLOSE: chiusura meno bouncy
// - Mode 'scroll': lista scrollabile per dataset grande

// Dataset esteso per la demo scrollabile
const PANTONES_BIG = [
  { code: '072 U', name: 'Pantone Blue',   hex: '#10069F', ink: 2, page: 51,  coherence: 92 },
  { code: '115 U', name: 'Cream Gold',     hex: '#FCD757', ink: 3, page: 28,  coherence: 88 },
  { code: '116 U', name: 'Amber',          hex: '#FFCD00', ink: 4, page: 29,  coherence: 95 },
  { code: '185 U', name: 'Red',            hex: '#E4002B', ink: 2, page: 84,  coherence: 90 },
  { code: '366 U', name: 'Citron',         hex: '#C1DE92', ink: 4, page: 158, coherence: 86 },
  { code: '699 U', name: 'Pink Pastel',    hex: '#F5D0D3', ink: 3, page: 51,  coherence: 81 },
  { code: '3405 U',name: 'Vivid Teal',     hex: '#A2D9E7', ink: 3, page: 112, coherence: 78 },
  { code: '802 U', name: 'Neon Green',     hex: '#44D62C', ink: 2, page: 162, coherence: 94 },
  { code: '021 U', name: 'Orange',         hex: '#FE5000', ink: 2, page: 70,  coherence: 89 },
  { code: '485 U', name: 'Brick',          hex: '#DA291C', ink: 3, page: 92,  coherence: 87 },
  { code: '109 U', name: 'Sunflower',      hex: '#FFD100', ink: 2, page: 30,  coherence: 91 },
  { code: '376 U', name: 'Lime',           hex: '#84BD00', ink: 3, page: 160, coherence: 83 },
  { code: '320 U', name: 'Aqua',           hex: '#009CA6', ink: 4, page: 124, coherence: 79 },
  { code: '286 U', name: 'Cobalt',         hex: '#0033A0', ink: 2, page: 52,  coherence: 93 },
  { code: '266 U', name: 'Violet',         hex: '#753BBD', ink: 3, page: 78,  coherence: 85 },
  { code: '512 U', name: 'Plum',           hex: '#7D2248', ink: 4, page: 81,  coherence: 76 },
  { code: '202 U', name: 'Garnet',         hex: '#862633', ink: 3, page: 95,  coherence: 88 },
  { code: '7499 U',name: 'Bone',           hex: '#F1E6B2', ink: 2, page: 22,  coherence: 92 },
  { code: '7527 U',name: 'Sand',           hex: '#D6D2C4', ink: 2, page: 24,  coherence: 90 },
  { code: '447 U', name: 'Graphite',       hex: '#3F4444', ink: 2, page: 18,  coherence: 96 },
  { code: 'Black',  name: 'Nero pieno',    hex: '#0D0D0D', ink: 1, page: 14,  coherence: 99 },
  { code: '1925 U',name: 'Magenta',        hex: '#E10098', ink: 3, page: 88,  coherence: 84 },
  { code: '7406 U',name: 'Mustard',        hex: '#F1B434', ink: 3, page: 33,  coherence: 87 },
  { code: '7626 U',name: 'Terracotta',     hex: '#A6431B', ink: 4, page: 74,  coherence: 80 },
  { code: '7541 U',name: 'Ice',            hex: '#D9E1E2', ink: 2, page: 116, coherence: 91 },
];

function ensureBlobKeyframesV2() {
  if (document.getElementById('wp2-blob-kf')) return;
  const s = document.createElement('style');
  s.id = 'wp2-blob-kf';
  s.textContent = `
    @keyframes wp2blob1 { 0%{transform:translate(0,0) scale(1);} 50%{transform:translate(50px,-25px) scale(1.15);} 100%{transform:translate(0,0) scale(1);} }
    @keyframes wp2blob2 { 0%{transform:translate(0,0) scale(1);} 50%{transform:translate(-40px,35px) scale(1.1);} 100%{transform:translate(0,0) scale(1);} }
    @keyframes wp2blob3 { 0%{transform:translate(0,0) scale(0.95);} 50%{transform:translate(25px,45px) scale(1.12);} 100%{transform:translate(0,0) scale(0.95);} }
  `;
  document.head.appendChild(s);
}

// ─── Card v2 ─────────────────────────────────────────────────────────────────
function WalletCardV2({ pantone, expanded }) {
  const fg = textOn4(pantone.hex);
  return (
    <div style={{
      width: '100%', height: '100%',
      borderRadius: 22, background: pantone.hex,
      position: 'relative', overflow: 'hidden',
      padding: '14px 18px 14px', boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      {/* TOP — code BIG (visible in peek). Ink count right. No "PANTONE" label. */}
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12,
      }}>
        <span style={{
          fontFamily: 'Nebulica', fontWeight: 700,
          fontSize: expanded ? 64 : 38,
          lineHeight: 0.85,
          letterSpacing: expanded ? -2.3 : -1.3,
          color: fg,
          transition: 'font-size .35s, letter-spacing .35s',
          whiteSpace: 'nowrap',
          // ensure "U" stays Nebulica
        }}>
          {pantone.code.replace(' U','').replace('Black','BLACK')}
          {pantone.code.includes(' U') && (
            <span style={{
              fontFamily: 'Nebulica',
              fontWeight: 400,
              opacity: 0.65,
              letterSpacing: expanded ? -1.2 : -0.6,
              marginLeft: expanded ? -4 : -2,
            }}> U</span>
          )}
        </span>
        <span style={{
          fontFamily: 'Nebulica', fontSize: 11, fontWeight: 600,
          color: fg, opacity: 0.78,
          display: 'inline-flex', alignItems: 'center', gap: 5,
          whiteSpace: 'nowrap',
          paddingBottom: 6,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: 99, background: fg, opacity: 0.5 }}/>
          {pantone.ink} ink
        </span>
      </div>

      {/* BOTTOM — visible only when expanded: NAME + PAG/COER */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        opacity: expanded ? 1 : 0, transition: 'opacity .25s',
      }}>
        <span style={{
          fontFamily: 'Nebulica', fontSize: 15, fontWeight: 500,
          color: fg, opacity: 0.88,
        }}>{pantone.name}</span>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
          color: fg, opacity: 0.6, letterSpacing: 0.6,
        }}>PAG.{pantone.page} · COER {pantone.coherence}%</span>
      </div>
    </div>
  );
}

// ─── Recipe sheet v2 ─────────────────────────────────────────────────────────
function RecipeSheetV3({ pantone, pillBorders }) {
  const r = RECIPE_699;
  return (
    <div style={{
      background: 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(20px) saturate(140%)',
      border: pillBorders ? '1.5px solid #0B0B0B' : '1px solid rgba(255,255,255,0.85)',
      borderRadius: 24, padding: '14px 16px 12px',
      boxShadow: pillBorders ? '0 18px 40px rgba(0,0,0,0.10)' : '0 18px 40px rgba(0,0,0,0.10), 0 1px 0 rgba(0,0,0,0.04)',
    }}>
      {/* Quantità label only (no PAG/COER here) */}
      <div style={{
        fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1.4, fontWeight: 700,
        color: 'rgba(0,0,0,0.55)',
      }}>QUANTITÀ</div>
      <div style={{ marginTop: 6, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
        {['100 g', '300 g', '500 g', '1 kg'].map((q, i) => (
          <div key={q} style={{
            padding: '9px 0', textAlign: 'center', borderRadius: 99,
            background: i === 0 ? '#0B0B0B' : 'rgba(255,255,255,0.55)',
            color: i === 0 ? '#fff' : '#0B0B0B',
            border: pillBorders
              ? '1.5px solid #0B0B0B'
              : (i === 0 ? 'none' : '1px solid rgba(0,0,0,0.08)'),
            fontFamily: 'Nebulica', fontWeight: 700, fontSize: 12,
          }}>{q}</div>
        ))}
      </div>

      {/* Formula header */}
      <div style={{
        marginTop: 12, display: 'flex', justifyContent: 'space-between',
        fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1.4, fontWeight: 700,
        color: 'rgba(0,0,0,0.55)',
      }}>
        <span>FORMULA · 3 INK</span><span>Σ 100.0 g</span>
      </div>
      <div style={{ marginTop: 2 }}>
        {r.inks.map((ink, i) => (
          <div key={ink.name} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '9px 0',
            borderTop: '1px solid rgba(0,0,0,0.07)',
          }}>
            {/* UNIFORM ink pills */}
            <div style={{
              padding: '4px 11px', borderRadius: 99,
              background: '#0B0B0B', color: '#fff',
              border: pillBorders ? '1.5px solid #0B0B0B' : 'none',
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 11,
              whiteSpace: 'nowrap', minWidth: 56, textAlign: 'center',
            }}>{ink.name}</div>
            <div style={{ flex: 1, height: 4, borderRadius: 99, background: 'rgba(0,0,0,0.08)' }}>
              <div style={{ height: '100%', width: `${ink.pct}%`, background: pantone.hex, borderRadius: 99 }}/>
            </div>
            <div style={{
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 15,
              color: '#0B0B0B', minWidth: 50, textAlign: 'right',
            }}>{ink.grams.toFixed(2)}<span style={{
              opacity: 0.45, fontWeight: 400, fontSize: 10, marginLeft: 2,
            }}>g</span></div>
          </div>
        ))}
      </div>

      {/* CTA: pill chiara, stondata, no progetto dentro */}
      <div style={{ marginTop: 10 }}>
        <div style={{
          height: 42, borderRadius: 99,
          background: '#fff',
          border: pillBorders ? '1.5px solid #0B0B0B' : '1px solid rgba(0,0,0,0.08)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          fontFamily: 'Nebulica', fontSize: 14, fontWeight: 700, color: '#0B0B0B',
          boxShadow: pillBorders ? 'none' : '0 1px 2px rgba(0,0,0,0.04)',
          width: '100%',
        }}>
          <IconPrinter color="#0B0B0B"/> Stampa etichetta
        </div>
      </div>
      <div style={{
        marginTop: 8, display: 'flex', justifyContent: 'space-between',
        fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1.4, fontWeight: 700,
        color: 'rgba(0,0,0,0.55)',
      }}>
        <span>PROGETTO</span>
        <span style={{ color: '#0B0B0B' }}>→ {r.project}</span>
      </div>
    </div>
  );
}

// ─── Easings ────────────────────────────────────────────────────────────────
const EASE_OPEN_SPRING   = 'cubic-bezier(.34, 1.42, .64, 1)';   // gentle overshoot
const EASE_OPEN_SOFT     = 'cubic-bezier(.2, .85, .25, 1)';     // smooth
const EASE_OPEN_SNAPPY   = 'cubic-bezier(.5, .05, .1, 1.05)';   // organic snap
const EASE_CLOSE_CALM    = 'cubic-bezier(.4, 0, .2, 1)';        // material-standard, NO overshoot
const EASE_CLOSE_QUICK   = 'cubic-bezier(.55, .06, .68, .19)';  // ease-in

// ─── Compute card position ───────────────────────────────────────────────────
function wpv2ComputePos(i, selectedIdx, length, opts) {
  const PEEK_H        = opts.peekH || 76;
  const ACTIVE_H      = opts.activeH || 178;
  const STACK_BOTTOM  = opts.stackBottom || 562;   // y of i=0 (front, lowest)
  const DETAIL_TOP    = opts.detailTop || 130;     // selected card y in detail
  const exitMode      = opts.exitMode || 'flyOff';

  if (selectedIdx === null) {
    return {
      top:    STACK_BOTTOM - i * PEEK_H,
      height: ACTIVE_H,
      opacity: 1,
      z:       length - i,
      tx: 0, ty: 0, scale: 1, rot: 0,
    };
  }

  if (i === selectedIdx) {
    return { top: DETAIL_TOP, height: ACTIVE_H, opacity: 1, z: 999, tx: 0, ty: 0, scale: 1, rot: 0 };
  }

  // exit behavior
  switch (exitMode) {
    case 'fanOut': {
      const phase = (i - selectedIdx + length) % 4;
      const dirs = [
        { tx: -200, ty: -140, rot: -8 },
        { tx:  200, ty: -140, rot:  8 },
        { tx: -200, ty:  240, rot: -8 },
        { tx:  200, ty:  240, rot:  8 },
      ];
      const d = dirs[phase];
      return { top: 320, height: ACTIVE_H, opacity: 0, z: 1, tx: d.tx, ty: d.ty, scale: 0.88, rot: d.rot };
    }
    case 'fadeScale': {
      return { top: 320, height: ACTIVE_H, opacity: 0, z: 1, tx: 0, ty: 0, scale: 0.85, rot: 0 };
    }
    case 'slideDown': {
      return { top: 880, height: ACTIVE_H, opacity: 0, z: 1, tx: 0, ty: 0, scale: 1, rot: 0 };
    }
    case 'slideStack': {
      // dietro: scivolano via verso l'alto; davanti: via in basso
      const dir = i < selectedIdx ? -1 : 1;
      return { top: dir < 0 ? -300 : 900, height: ACTIVE_H, opacity: 0, z: 1, tx: 0, ty: 0, scale: 1, rot: 0 };
    }
    case 'flyOff':
    default: {
      const dir = i < selectedIdx ? -1 : 1;
      return { top: dir < 0 ? -300 : 900, height: ACTIVE_H, opacity: 0, z: 1, tx: 0, ty: 0, scale: 1, rot: 0 };
    }
  }
}

// ─── Main proto v2 ───────────────────────────────────────────────────────────
function WalletProtoV2({
  // animation control
  openDur     = 520,
  closeDur    = 380,
  openEase    = EASE_OPEN_SPRING,
  closeEase   = EASE_CLOSE_CALM,
  exitMode    = 'flyOff',         // 'flyOff' | 'fanOut' | 'fadeScale' | 'slideDown'
  recipeMode  = 'rise',           // 'rise' | 'springRise' | 'scaleFromCard'

  // layout
  detailTop   = 130,              // selected card y in detail
  recipeBottom = 110,             // distance from bottom in detail
  recipeRiseFrom = 80,            // px below final position before animating in

  // style
  pillBorders = true,             // V19 base default

  // dataset/mode
  cards       = null,
  scroll      = false,
  label       = '',
  bg          = '#F4EFE2',
}) {
  ensureBlobKeyframesV2();
  const list = cards || PANTONES.slice(0, 6);
  const [selectedIdx, setSelectedIdx] = React.useState(null);
  const [closing,     setClosing]     = React.useState(false);
  const [pulse,       setPulse]       = React.useState(0);

  const isDetail = selectedIdx !== null;
  const selected = isDetail ? list[selectedIdx] : null;
  const opts = { exitMode, detailTop };
  const dur  = closing ? closeDur : openDur;
  const ease = closing ? closeEase : openEase;

  const onCardClick = (i) => {
    if (isDetail) return;
    setClosing(false);
    setSelectedIdx(i);
    setPulse(p => p + 1);
  };
  const onBack = () => {
    setClosing(true);
    // wait then null
    setTimeout(() => {
      setSelectedIdx(null);
      setClosing(false);
    }, closeDur);
  };

  // Layout constants for spacing
  const SEARCH_BOTTOM = 168;      // y where the search ends
  const STACK_BOTTOM  = 562;      // front card y
  const PEEK_H        = 76;
  const ACTIVE_H      = 178;
  // For scroll mode, the stack is taller; the inner div scrolls.
  const innerStackH = (list.length - 1) * PEEK_H + ACTIVE_H + 24;

  // pill helper
  const pillBase = () => ({
    background: 'rgba(255,255,255,0.78)',
    backdropFilter: 'blur(14px)',
    border: pillBorders ? '1.5px solid #0B0B0B' : '1px solid rgba(255,255,255,0.85)',
    boxShadow: pillBorders ? 'none' : '0 4px 12px rgba(0,0,0,0.06)',
  });

  return (
    <Phone bg={bg}>
      {/* Animated blob bg */}
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0,
        opacity: isDetail && !closing ? 1 : 0, transition: 'opacity .45s',
      }}>
        {selected && (
          <React.Fragment>
            <div style={{
              position: 'absolute', top: '15%', left: '-25%',
              width: 380, height: 380, borderRadius: '50%',
              background: selected.hex, filter: 'blur(70px)', opacity: 0.55,
              animation: 'wp2blob1 14s ease-in-out infinite',
            }}/>
            <div style={{
              position: 'absolute', bottom: '-10%', right: '-20%',
              width: 360, height: 360, borderRadius: '50%',
              background: selected.hex, filter: 'blur(70px)', opacity: 0.7,
              animation: 'wp2blob2 18s ease-in-out infinite',
            }}/>
            <div style={{
              position: 'absolute', top: '55%', right: '10%',
              width: 220, height: 220, borderRadius: '50%',
              background: selected.hex, filter: 'blur(50px)', opacity: 0.4,
              animation: 'wp2blob3 11s ease-in-out infinite',
            }}/>
          </React.Fragment>
        )}
      </div>

      {/* paper grain */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1, mixBlendMode: 'multiply', pointerEvents: 'none', zIndex: 1 }}>
        <filter id={`wp2-grain-${pulse}`}>
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" stitchTiles="stitch"/>
          <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.3  0 0 0 0 0.25  0 0 0 0.4 0"/>
        </filter>
        <rect width="100%" height="100%" filter={`url(#wp2-grain-${pulse})`}/>
      </svg>

      {/* LIST chrome */}
      <div style={{
        position: 'absolute', top: 56, left: 18, right: 18, zIndex: 5,
        opacity: isDetail ? 0 : 1, transform: isDetail ? 'translateY(-10px)' : 'none',
        transition: 'opacity .35s, transform .35s', pointerEvents: isDetail ? 'none' : 'auto',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 28, lineHeight: 0.95,
              letterSpacing: -0.9, color: '#0B0B0B',
            }}>Ricettario</div>
            <div style={{
              fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1.4, fontWeight: 700,
              color: 'rgba(0,0,0,0.5)', marginTop: 2,
            }}>{list.length} PANTONE · SICO</div>
          </div>
          <BGToggle active="cream"/>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
          <div style={{
            flex: 1, height: 42, borderRadius: 14, background: '#fff',
            display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10,
            border: pillBorders ? '1.5px solid #0B0B0B' : '1px solid rgba(0,0,0,0.08)',
            boxShadow: pillBorders ? 'none' : '0 1px 2px rgba(0,0,0,0.04)',
          }}>
            <IconSearch color="#0B0B0B"/>
            <span style={{
              fontFamily: 'Nebulica', fontSize: 14, color: 'rgba(0,0,0,0.4)',
            }}>cerca pantone…</span>
          </div>
          <div style={{
            width: 42, height: 42, borderRadius: 14, background: '#fff',
            border: pillBorders ? '1.5px solid #0B0B0B' : '1px solid rgba(0,0,0,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: pillBorders ? 'none' : '0 1px 2px rgba(0,0,0,0.04)',
          }}>
            <IconFilter color="#0B0B0B"/>
          </div>
        </div>
      </div>

      {/* DETAIL chrome — back + edit */}
      <div style={{
        position: 'absolute', top: 64, left: 18, right: 18, zIndex: 7,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        opacity: isDetail && !closing ? 1 : 0,
        transform: isDetail && !closing ? 'none' : 'translateY(-10px)',
        transition: 'opacity .35s .1s, transform .35s .1s',
        pointerEvents: isDetail && !closing ? 'auto' : 'none',
      }}>
        <div
          onClick={onBack}
          style={{
            height: 38, padding: '0 14px 0 10px', borderRadius: 99,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            ...pillBase(),
            fontFamily: 'Nebulica', fontSize: 14, fontWeight: 600,
            color: '#0B0B0B',
            cursor: 'pointer',
          }}>
          <IconBack color="#0B0B0B"/>
          <span style={{ color: '#0B0B0B' }}>Ricette</span>
        </div>
        <div style={{
          width: 38, height: 38, borderRadius: 99,
          ...pillBase(),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <IconEdit color="#0B0B0B"/>
        </div>
      </div>

      {/* Cards stack — scrollable container if scroll mode */}
      <div style={{
        position: 'absolute', top: 0, left: 18, right: 18, bottom: 0, zIndex: 4,
        pointerEvents: 'none',
        overflowY: scroll && !isDetail ? 'auto' : 'hidden',
        overflowX: 'hidden',
      }}
      onScroll={() => {}}
      >
        <div style={{
          position: 'relative',
          width: '100%',
          height: scroll ? innerStackH : '100%',
          pointerEvents: 'none',
        }}>
          {list.map((p, i) => {
            const pos = scroll && !isDetail
              ? {
                  top: innerStackH - ACTIVE_H - 8 - i * PEEK_H,
                  height: ACTIVE_H, opacity: 1, z: list.length - i,
                  tx: 0, ty: 0, scale: 1, rot: 0,
                }
              : wpv2ComputePos(i, selectedIdx, list.length, opts);

            return (
              <div
                key={p.code + '-' + pulse}
                onClick={() => onCardClick(i)}
                style={{
                  position: 'absolute', left: 0, right: 0,
                  top: pos.top,
                  height: pos.height,
                  opacity: pos.opacity,
                  zIndex: pos.z,
                  transform: `translate(${pos.tx}px, ${pos.ty}px) scale(${pos.scale}) rotate(${pos.rot || 0}deg)`,
                  transformOrigin: '50% 50%',
                  pointerEvents: pos.opacity > 0.2 ? 'auto' : 'none',
                  cursor: isDetail ? 'default' : 'pointer',
                  transition: `top ${dur}ms ${ease}, transform ${dur}ms ${ease}, opacity ${Math.round(dur*0.7)}ms ease`,
                  filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.14))',
                }}
              >
                <WalletCardV2 pantone={p} expanded={pos.height >= 150 && (selectedIdx === i || selectedIdx === null && i === 0 && !scroll)}/>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recipe sheet */}
      <RecipeRise
        visible={isDetail && !closing}
        bottom={recipeBottom}
        riseFrom={recipeRiseFrom}
        mode={recipeMode}
        dur={dur} ease={ease}
        selected={selected}
        pillBorders={pillBorders}
      />

      {/* Caption */}
      {label && (
        <div style={{
          position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
          zIndex: 60, padding: '4px 10px', borderRadius: 99,
          background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0,0,0,0.08)',
          fontFamily: 'Nebulica', fontSize: 9, letterSpacing: 1.2, fontWeight: 700,
          color: 'rgba(0,0,0,0.7)',
          maxWidth: 260, textAlign: 'center',
        }}>{label}</div>
      )}

      {/* Hint */}
      <div style={{
        position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center', zIndex: 3,
        fontFamily: 'Nebulica', fontSize: 9, letterSpacing: 1.4, fontWeight: 700,
        color: 'rgba(0,0,0,0.4)',
        opacity: isDetail ? 0 : 1, transition: 'opacity .3s',
        pointerEvents: 'none',
      }}>↑ CLICCA UNA CARD{scroll ? ' · SCORRI PER ALTRE' : ''}</div>

      <BottomNav active={0} accent="#0033FF" restColor="#0B0B0B" bg={bg}/>
    </Phone>
  );
}

// ─── Recipe sheet rise wrapper ───────────────────────────────────────────────
function RecipeRise({ visible, bottom, riseFrom, mode, dur, ease, selected, pillBorders }) {
  let initialTransform = `translateY(${riseFrom}px)`;
  let finalTransform   = 'translateY(0)';

  if (mode === 'springRise') {
    // exaggerated: starts lower, overshoots slightly handled by ease
  } else if (mode === 'scaleFromCard') {
    initialTransform = 'translateY(60px) scale(0.85)';
    finalTransform   = 'translateY(0) scale(1)';
  }

  return (
    <div style={{
      position: 'absolute', left: 18, right: 18, bottom,
      zIndex: 6, pointerEvents: visible ? 'auto' : 'none',
      opacity: visible ? 1 : 0,
      transform: visible ? finalTransform : initialTransform,
      transition: `opacity ${Math.round(dur*0.8)}ms ${ease} ${visible ? Math.round(dur*0.25) : 0}ms, transform ${dur + 80}ms ${ease} ${visible ? Math.round(dur*0.2) : 0}ms`,
    }}>
      {selected && <RecipeSheetV3 pantone={selected} pillBorders={pillBorders}/>}
    </div>
  );
}

Object.assign(window, {
  WalletProtoV2, WalletCardV2, RecipeSheetV3, RecipeRise,
  PANTONES_BIG, wpv2ComputePos,
  EASE_OPEN_SPRING, EASE_OPEN_SOFT, EASE_OPEN_SNAPPY,
  EASE_CLOSE_CALM, EASE_CLOSE_QUICK,
});
