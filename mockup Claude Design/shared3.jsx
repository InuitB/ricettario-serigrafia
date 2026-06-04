// shared3.jsx — WalletProto, prototipo configurabile per V18+ varianti
// Parametri:
//   animation     : 'classic' | 'spring' | 'scaleRise' | 'fanOut' | 'softSnap'
//   pillBorders   : bordi neri attorno a pill (back, edit, quantità, stampa)
//   lowerHero     : card selezionata sta più in basso, vicino alla ricetta
//   inkColors     : pill inchiostro AS90/AS65/AS150 colorati come l'inchiostro
//   accentInk     : colore della barra progresso ingrediente (default: pantone.hex)
//   bg            : sfondo

// Inject blob keyframes once
function ensureBlobKeyframes() {
  if (document.getElementById('wp-blob-kf')) return;
  const s = document.createElement('style');
  s.id = 'wp-blob-kf';
  s.textContent = `
    @keyframes wpblob1 { 0%{transform:translate(0,0) scale(1);} 50%{transform:translate(50px,-25px) scale(1.15);} 100%{transform:translate(0,0) scale(1);} }
    @keyframes wpblob2 { 0%{transform:translate(0,0) scale(1);} 50%{transform:translate(-40px,35px) scale(1.1);} 100%{transform:translate(0,0) scale(1);} }
    @keyframes wpblob3 { 0%{transform:translate(0,0) scale(0.95);} 50%{transform:translate(25px,45px) scale(1.12);} 100%{transform:translate(0,0) scale(0.95);} }
    @keyframes wpRiseScale {
      0%   { transform: scale(1) translateY(0); }
      55%  { transform: scale(1.045) translateY(-2px); }
      100% { transform: scale(1) translateY(0); }
    }
  `;
  document.head.appendChild(s);
}

// Animation profiles — return CSS transition + extra transform string
function animProfile(name) {
  switch (name) {
    case 'spring':    return { dur: 620, ease: 'cubic-bezier(.34, 1.56, .64, 1)' };
    case 'scaleRise': return { dur: 480, ease: 'cubic-bezier(.2, .8, .2, 1)', useScaleAnim: true };
    case 'fanOut':    return { dur: 520, ease: 'cubic-bezier(.2, .85, .25, 1)', fanOut: true };
    case 'softSnap':  return { dur: 560, ease: 'cubic-bezier(.5, .05, .1, 1.05)' };
    case 'classic':
    default:          return { dur: 500, ease: 'cubic-bezier(.2, .8, .2, 1)' };
  }
}

// Card positions per state ----------------------------------------------------
function wpComputePos(i, selectedIdx, length, opts) {
  // ACTIVE card height (front), peek slice visible from each back card
  const PEEK_H        = 76;
  const ACTIVE_H      = 178;
  const STACK_BOTTOM  = 522;                 // top-y where i=0 (front, bottom) sits
  const DETAIL_TOP    = opts.lowerHero ? 220 : 122;
  const fan           = opts.fanOut;

  if (selectedIdx === null) {
    // LIST state — INVERTED: card 0 sits at bottom (front), others stack ABOVE going BACK
    return {
      top:    STACK_BOTTOM - i * PEEK_H,
      height: ACTIVE_H,                       // same height for all; overlap creates peek
      opacity: 1,
      z:       length - i,                    // i=0 (bottom/front) highest z
      tx:      0, ty: 0, scale: 1,
    };
  }

  if (i === selectedIdx) {
    return { top: DETAIL_TOP, height: ACTIVE_H, opacity: 1, z: 999, tx: 0, ty: 0, scale: 1 };
  }

  // Other cards fly away
  if (fan) {
    // alternate left/right/up/down
    const phase = (i - selectedIdx + length) % 4;
    const dirs = [
      { tx: -180, ty: -120 },   // up-left
      { tx:  180, ty: -120 },   // up-right
      { tx: -180, ty:  220 },   // down-left
      { tx:  180, ty:  220 },   // down-right
    ];
    const d = dirs[phase];
    return { top: 320, height: ACTIVE_H, opacity: 0, z: 1, tx: d.tx, ty: d.ty, scale: 0.88 };
  }
  return {
    top: i < selectedIdx ? -300 : 900,
    height: ACTIVE_H, opacity: 0, z: 1, tx: 0, ty: 0, scale: 1,
  };
}

// Color label inks based on the AS code (decorative example) -----------------
const INK_COLOR_MAP = {
  'AS 90':  { bg: '#FFFFFF', fg: '#0B0B0B', label: 'bianco',       border: '#0B0B0B' },
  'AS 65':  { bg: '#1F3FFF', fg: '#FFFFFF', label: 'blu',          border: '#1F3FFF' },
  'AS 150': { bg: 'rgba(255,255,255,0.4)', fg: '#0B0B0B', label: 'trasparente', border: 'rgba(0,0,0,0.35)', dashed: true },
};

// --- Main component ----------------------------------------------------------
function WalletProto({
  animation = 'classic',
  pillBorders = false,
  lowerHero   = false,
  inkColors   = false,
  bg          = '#F4EFE2',
  label       = '',     // optional caption for the canvas
}) {
  ensureBlobKeyframes();
  const cards = PANTONES.slice(0, 6);
  const [selectedIdx, setSelectedIdx] = React.useState(null);
  const [pulse,       setPulse]       = React.useState(0);    // re-triggers scale anim
  const isDetail = selectedIdx !== null;
  const selected = isDetail ? cards[selectedIdx] : null;
  const opts = { animation, lowerHero, fanOut: animProfile(animation).fanOut };
  const anim = animProfile(animation);

  const onCardClick = (i) => {
    if (isDetail) return;
    setSelectedIdx(i);
    setPulse(p => p + 1);
  };
  const onBack = () => setSelectedIdx(null);

  // pill style helpers
  const pillBase = (extra = {}) => ({
    background: 'rgba(255,255,255,0.7)',
    backdropFilter: 'blur(14px)',
    border: pillBorders ? '1.5px solid #0B0B0B' : '1px solid rgba(255,255,255,0.85)',
    color: '#0B0B0B',
    boxShadow: pillBorders ? 'none' : '0 4px 12px rgba(0,0,0,0.06)',
    ...extra,
  });

  return (
    <Phone bg={bg}>
      {/* Animated Pantone blob bg — visible only in detail */}
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0,
        opacity: isDetail ? 1 : 0, transition: 'opacity .5s',
      }}>
        {selected && (
          <React.Fragment>
            <div style={{
              position: 'absolute', top: '15%', left: '-25%',
              width: 380, height: 380, borderRadius: '50%',
              background: selected.hex, filter: 'blur(70px)', opacity: 0.55,
              animation: 'wpblob1 14s ease-in-out infinite',
            }}/>
            <div style={{
              position: 'absolute', bottom: '-10%', right: '-20%',
              width: 360, height: 360, borderRadius: '50%',
              background: selected.hex, filter: 'blur(70px)', opacity: 0.7,
              animation: 'wpblob2 18s ease-in-out infinite',
            }}/>
            <div style={{
              position: 'absolute', top: '55%', right: '10%',
              width: 220, height: 220, borderRadius: '50%',
              background: selected.hex, filter: 'blur(50px)', opacity: 0.4,
              animation: 'wpblob3 11s ease-in-out infinite',
            }}/>
          </React.Fragment>
        )}
      </div>

      {/* Paper grain — always on */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1, mixBlendMode: 'multiply', pointerEvents: 'none', zIndex: 1 }}>
        <filter id={`wp-grain-${pulse}`}>
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" stitchTiles="stitch"/>
          <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.3  0 0 0 0 0.25  0 0 0 0.4 0"/>
        </filter>
        <rect width="100%" height="100%" filter={`url(#wp-grain-${pulse})`}/>
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
            }}>247 PANTONE · SICO</div>
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
        position: 'absolute', top: 64, left: 18, right: 18, zIndex: 5,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        opacity: isDetail ? 1 : 0, transform: isDetail ? 'none' : 'translateY(-10px)',
        transition: 'opacity .35s .12s, transform .35s .12s', pointerEvents: isDetail ? 'auto' : 'none',
      }}>
        <div
          onClick={onBack}
          style={{
            height: 38, padding: '0 14px 0 10px', borderRadius: 99,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            ...pillBase(),
            fontFamily: 'Nebulica', fontSize: 14, fontWeight: 600,
            color: '#0B0B0B',  // FIX: explicitly dark
            cursor: 'pointer',
          }}>
          <IconBack color="#0B0B0B"/> <span style={{ color: '#0B0B0B' }}>Ricette</span>
        </div>
        <div style={{
          width: 38, height: 38, borderRadius: 99,
          ...pillBase(),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <IconEdit color="#0B0B0B"/>
        </div>
      </div>

      {/* Cards stack */}
      <div style={{
        position: 'absolute', top: 0, left: 18, right: 18, bottom: 0, zIndex: 4,
        pointerEvents: 'none',
      }}>
        {cards.map((p, i) => {
          const pos = wpComputePos(i, selectedIdx, cards.length, opts);
          const isSelected = selectedIdx === i;
          // For scaleRise: when becoming selected, run the keyframe animation
          const scaleAnim = isSelected && anim.useScaleAnim ? `wpRiseScale ${anim.dur}ms ${anim.ease}` : 'none';
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
                transform: `translate(${pos.tx}px, ${pos.ty}px) scale(${pos.scale})`,
                transformOrigin: '50% 50%',
                animation: scaleAnim,
                pointerEvents: pos.opacity > 0.2 ? 'auto' : 'none',
                cursor: isDetail ? 'default' : 'pointer',
                transition: `top ${anim.dur}ms ${anim.ease}, transform ${anim.dur}ms ${anim.ease}, opacity ${Math.round(anim.dur*0.7)}ms ease`,
                filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.14))',
              }}
            >
              <V18Card pantone={p} expanded/>
            </div>
          );
        })}
      </div>

      {/* Recipe sheet */}
      <div style={{
        position: 'absolute', left: 18, right: 18,
        bottom: lowerHero ? 86 : 100, zIndex: 6, pointerEvents: isDetail ? 'auto' : 'none',
        opacity: isDetail ? 1 : 0,
        transform: isDetail ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity .42s .15s, transform .5s .15s ${anim.ease}`,
      }}>
        {selected && <RecipeSheetV2 pantone={selected} pillBorders={pillBorders} inkColors={inkColors}/>}
      </div>

      {/* Caption (only on canvas) */}
      {label && (
        <div style={{
          position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
          zIndex: 60, padding: '4px 10px', borderRadius: 99,
          background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0,0,0,0.08)',
          fontFamily: 'Nebulica', fontSize: 9, letterSpacing: 1.2, fontWeight: 700,
          color: 'rgba(0,0,0,0.7)',
        }}>{label}</div>
      )}

      {/* Hint (list state) */}
      <div style={{
        position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center', zIndex: 3,
        fontFamily: 'Nebulica', fontSize: 9, letterSpacing: 1.4, fontWeight: 700,
        color: 'rgba(0,0,0,0.4)',
        opacity: isDetail ? 0 : 1, transition: 'opacity .3s',
        pointerEvents: 'none',
      }}>↑ CLICCA UNA CARD</div>

      <BottomNav active={0} accent="#0033FF" restColor="#0B0B0B" bg={bg}/>
    </Phone>
  );
}

// New recipe sheet — stampa etichetta come pill chiara, progetto fuori dal bottone
function RecipeSheetV2({ pantone, pillBorders, inkColors }) {
  const r = RECIPE_699;
  return (
    <div style={{
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(20px) saturate(140%)',
      border: pillBorders ? '1.5px solid #0B0B0B' : '1px solid rgba(255,255,255,0.85)',
      borderRadius: 24, padding: '14px 16px 14px',
      boxShadow: pillBorders ? '0 18px 40px rgba(0,0,0,0.10)' : '0 18px 40px rgba(0,0,0,0.10), 0 1px 0 rgba(0,0,0,0.04)',
    }}>
      {/* Top row: quantità label + page/coerenza */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1.4, fontWeight: 700,
        color: 'rgba(0,0,0,0.55)',
      }}>
        <span>QUANTITÀ</span><span>PAG.{r.page} · COER {r.coherence}%</span>
      </div>
      <div style={{ marginTop: 7, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
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

      {/* Formula */}
      <div style={{
        marginTop: 12, display: 'flex', justifyContent: 'space-between',
        fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1.4, fontWeight: 700,
        color: 'rgba(0,0,0,0.55)',
      }}>
        <span>FORMULA · 3 INK</span><span>Σ 100.0 g</span>
      </div>
      <div style={{ marginTop: 4 }}>
        {r.inks.map((ink, i) => {
          const cmap = inkColors ? INK_COLOR_MAP[ink.name] : null;
          return (
            <div key={ink.name} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 0',
              borderTop: '1px solid rgba(0,0,0,0.07)',
            }}>
              <div style={{
                padding: '4px 11px', borderRadius: 99,
                background: cmap ? cmap.bg : '#0B0B0B',
                color: cmap ? cmap.fg : '#fff',
                border: cmap
                  ? `1.5px ${cmap.dashed ? 'dashed' : 'solid'} ${cmap.border}`
                  : (pillBorders ? '1.5px solid #0B0B0B' : 'none'),
                fontFamily: 'Nebulica', fontWeight: 700, fontSize: 11,
                whiteSpace: 'nowrap',
              }}>{ink.name}{cmap && (
                <span style={{ opacity: 0.6, fontWeight: 400, marginLeft: 5, fontSize: 9, letterSpacing: 0.4 }}>
                  · {cmap.label}
                </span>
              )}</div>
              <div style={{ flex: 1, height: 4, borderRadius: 99, background: 'rgba(0,0,0,0.08)' }}>
                <div style={{ height: '100%', width: `${ink.pct}%`, background: pantone.hex, borderRadius: 99 }}/>
              </div>
              <div style={{
                fontFamily: 'Nebulica', fontWeight: 700, fontSize: 15,
                color: '#0B0B0B', minWidth: 48, textAlign: 'right',
              }}>{ink.grams.toFixed(2)}<span style={{
                opacity: 0.45, fontWeight: 400, fontSize: 10, marginLeft: 2,
              }}>g</span></div>
            </div>
          );
        })}
      </div>

      {/* CTA row: pill chiara + progetto FUORI */}
      <div style={{ marginTop: 10, display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{
          flex: 1, height: 42, borderRadius: 99,
          background: '#fff',
          border: pillBorders ? '1.5px solid #0B0B0B' : '1px solid rgba(0,0,0,0.08)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          fontFamily: 'Nebulica', fontSize: 14, fontWeight: 700, color: '#0B0B0B',
          boxShadow: pillBorders ? 'none' : '0 1px 2px rgba(0,0,0,0.04)',
        }}>
          <IconPrinter color="#0B0B0B"/> Stampa etichetta
        </div>
      </div>
      {/* Project label OUTSIDE the button */}
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

Object.assign(window, { WalletProto, RecipeSheetV2, wpComputePos, animProfile, INK_COLOR_MAP });
