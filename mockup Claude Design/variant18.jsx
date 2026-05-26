// variant18.jsx — Wallet evoluto · interazione corretta
// LIST: stack stile Apple Wallet (bordi stondati, layout V16 con PANTONE label in alto, codice grosso).
// CLICK card → quella sale in posizione "hero" (dove era il titolo in V14), le altre escono.
// Sotto appare un foglio bianco con quantità + formula. Lo sfondo diventa un blob animato del colore Pantone.

function V18Wallet() {
  const cards = PANTONES.slice(0, 7);
  const [selectedIdx, setSelectedIdx] = React.useState(null);
  const isDetail = selectedIdx !== null;
  const selected = isDetail ? cards[selectedIdx] : null;
  const bg = '#F4EFE2';

  // inject blob keyframes
  React.useEffect(() => {
    if (document.getElementById('v18-blob-kf')) return;
    const s = document.createElement('style');
    s.id = 'v18-blob-kf';
    s.textContent = `
      @keyframes v18blob1 { 0%{transform:translate(0,0) scale(1);} 50%{transform:translate(60px,-30px) scale(1.18);} 100%{transform:translate(0,0) scale(1);} }
      @keyframes v18blob2 { 0%{transform:translate(0,0) scale(1);} 50%{transform:translate(-50px,40px) scale(1.1);} 100%{transform:translate(0,0) scale(1);} }
      @keyframes v18blob3 { 0%{transform:translate(0,0) scale(0.95);} 50%{transform:translate(30px,60px) scale(1.15);} 100%{transform:translate(0,0) scale(0.95);} }
    `;
    document.head.appendChild(s);
  }, []);

  return (
    <Phone bg={bg}>
      {/* Animated Pantone-colored blob bg — only visible in detail */}
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0,
        opacity: isDetail ? 1 : 0, transition: 'opacity .5s',
      }}>
        {selected && (
          <React.Fragment>
            <div style={{
              position: 'absolute', top: '20%', left: '-25%',
              width: 380, height: 380, borderRadius: '50%',
              background: selected.hex, filter: 'blur(70px)', opacity: 0.55,
              animation: 'v18blob1 14s ease-in-out infinite',
            }}/>
            <div style={{
              position: 'absolute', bottom: '-10%', right: '-20%',
              width: 360, height: 360, borderRadius: '50%',
              background: selected.hex, filter: 'blur(70px)', opacity: 0.7,
              animation: 'v18blob2 18s ease-in-out infinite',
            }}/>
            <div style={{
              position: 'absolute', top: '50%', right: '20%',
              width: 220, height: 220, borderRadius: '50%',
              background: selected.hex, filter: 'blur(50px)', opacity: 0.45,
              animation: 'v18blob3 11s ease-in-out infinite',
            }}/>
          </React.Fragment>
        )}
      </div>

      {/* Subtle paper grain — always on */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12, mixBlendMode: 'multiply', pointerEvents: 'none', zIndex: 1 }}>
        <filter id="v18-grain">
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" stitchTiles="stitch"/>
          <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.3  0 0 0 0 0.25  0 0 0 0 0.4 0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#v18-grain)"/>
      </svg>

      {/* Top chrome — list state shows title+search, detail state shows back pill */}
      <div style={{
        position: 'absolute', top: 56, left: 0, right: 0, zIndex: 5,
        padding: '8px 18px',
      }}>
        {/* LIST chrome */}
        <div style={{
          opacity: isDetail ? 0 : 1, transform: isDetail ? 'translateY(-10px)' : 'none',
          transition: 'opacity .35s, transform .35s', pointerEvents: isDetail ? 'none' : 'auto',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4,
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
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
            }}>
              <IconSearch color="#0B0B0B"/>
              <span style={{
                fontFamily: 'Nebulica', fontSize: 14, color: 'rgba(0,0,0,0.4)',
              }}>cerca pantone…</span>
            </div>
            <div style={{
              width: 42, height: 42, borderRadius: 14, background: '#fff',
              border: '1px solid rgba(0,0,0,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <IconFilter color="#0B0B0B"/>
            </div>
          </div>
        </div>

        {/* DETAIL chrome — back + edit pills */}
        <div style={{
          position: 'absolute', top: 8, left: 18, right: 18,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          opacity: isDetail ? 1 : 0, transform: isDetail ? 'none' : 'translateY(-10px)',
          transition: 'opacity .35s .12s, transform .35s .12s', pointerEvents: isDetail ? 'auto' : 'none',
        }}>
          <div
            onClick={() => setSelectedIdx(null)}
            style={{
              height: 38, padding: '0 14px 0 10px', borderRadius: 99,
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,255,255,0.8)',
              fontFamily: 'Nebulica', fontSize: 14, fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            }}>
            <IconBack color="#0B0B0B"/> Ricette
          </div>
          <div style={{
            width: 38, height: 38, borderRadius: 99,
            background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
          }}>
            <IconEdit color="#0B0B0B"/>
          </div>
        </div>
      </div>

      {/* Cards stack — absolutely positioned, animate via top/opacity */}
      <div style={{
        position: 'absolute', top: 0, left: 18, right: 18, bottom: 0, zIndex: 4,
        pointerEvents: 'none',
      }}>
        {cards.map((p, i) => {
          const pos = computePos(i, selectedIdx, cards.length);
          return (
            <div
              key={p.code}
              onClick={() => {
                if (isDetail) return; // only click in list mode
                setSelectedIdx(i);
              }}
              style={{
                position: 'absolute', left: 0, right: 0,
                top: pos.top,
                height: pos.height,
                opacity: pos.opacity,
                zIndex: pos.z,
                pointerEvents: pos.opacity > 0.2 ? 'auto' : 'none',
                cursor: isDetail ? 'default' : 'pointer',
                transition: 'top .5s cubic-bezier(.2,.8,.2,1), height .5s cubic-bezier(.2,.8,.2,1), opacity .35s',
                filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.14))',
              }}
            >
              <V18Card pantone={p} expanded={pos.height >= 150}/>
            </div>
          );
        })}
      </div>

      {/* Recipe sheet — appears in detail */}
      <div style={{
        position: 'absolute', left: 18, right: 18, bottom: 100,
        zIndex: 6, pointerEvents: isDetail ? 'auto' : 'none',
        opacity: isDetail ? 1 : 0,
        transform: isDetail ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity .4s .15s, transform .45s .15s cubic-bezier(.2,.8,.2,1)',
      }}>
        {selected && <RecipeSheet pantone={selected}/>}
      </div>

      {/* Hint when in list mode (canvas only) */}
      <div style={{
        position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center', zIndex: 3,
        fontFamily: 'Nebulica', fontSize: 9, letterSpacing: 1.4, fontWeight: 700,
        color: 'rgba(0,0,0,0.4)',
        opacity: isDetail ? 0 : 1, transition: 'opacity .3s',
        pointerEvents: 'none',
      }}>
        ↑ CLICCA UNA CARD PER APRIRLA
      </div>

      <BottomNav active={0} accent="#0033FF" restColor="#0B0B0B" bg={bg}/>
    </Phone>
  );
}

// ─── card position calculator ──────────────────────────────────
function computePos(i, selectedIdx, length) {
  const LIST_START = 200;     // y where the wallet stack starts (below header+search)
  const ACTIVE_H   = 174;     // expanded top card
  const PEEK_H     = 78;      // peek height (shows code + name)
  const DETAIL_TOP = 112;     // where selected card sits in detail

  if (selectedIdx === null) {
    // LIST state
    if (i === 0) {
      return { top: LIST_START, height: ACTIVE_H, opacity: 1, z: length - i };
    }
    return {
      top: LIST_START + ACTIVE_H + (i - 1) * (PEEK_H - 14),
      height: PEEK_H, opacity: 1, z: length - i,
    };
  }
  // DETAIL state
  if (i === selectedIdx) {
    return { top: DETAIL_TOP, height: ACTIVE_H, opacity: 1, z: 999 };
  }
  // other cards fly down + fade
  const dir = i < selectedIdx ? -1 : 1;
  return {
    top: dir < 0 ? -260 : 800,
    height: PEEK_H, opacity: 0, z: 1,
  };
}

// ─── wallet-style card (V16/Apple Wallet vocabulary) ──────────
function V18Card({ pantone, expanded }) {
  const fg = textOn4(pantone.hex);
  return (
    <div style={{
      width: '100%', height: '100%',
      borderRadius: 22, background: pantone.hex,
      position: 'relative', overflow: 'hidden',
      padding: '13px 18px 16px', boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      {/* TOP ROW — PANTONE label + ink count (Apple Wallet's brand row) */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{
          fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1.8, fontWeight: 700,
          color: fg, opacity: 0.75,
        }}>PANTONE</span>
        <span style={{
          fontFamily: 'Nebulica', fontSize: 11, fontWeight: 600,
          color: fg, opacity: 0.75,
          display: 'inline-flex', alignItems: 'center', gap: 4,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: 99, background: fg, opacity: 0.45 }}/>
          {pantone.ink} ink
        </span>
      </div>

      {/* BOTTOM ROW — code (big) + name */}
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12,
      }}>
        <span style={{
          fontFamily: 'Nebulica', fontWeight: 700,
          fontSize: expanded ? 50 : 32,
          lineHeight: 0.9, letterSpacing: expanded ? -1.8 : -1, color: fg,
          transition: 'font-size .35s, letter-spacing .35s',
          whiteSpace: 'nowrap',
        }}>{pantone.code.replace(' U','')}<span style={{ fontWeight: 400, opacity: 0.65 }}> U</span></span>
        <span style={{
          fontFamily: 'Nebulica', fontSize: expanded ? 13 : 12,
          color: fg, opacity: 0.78,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          minWidth: 0, textAlign: 'right',
        }}>{pantone.name}</span>
      </div>
    </div>
  );
}

// ─── recipe sheet that appears below the selected card ────────
function RecipeSheet({ pantone }) {
  const r = RECIPE_699;   // uses sample recipe but with the *selected* color for accents
  return (
    <div style={{
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(20px) saturate(140%)',
      border: '1px solid rgba(255,255,255,0.85)',
      borderRadius: 24, padding: '16px 18px',
      boxShadow: '0 18px 40px rgba(0,0,0,0.10), 0 1px 0 rgba(0,0,0,0.04)',
    }}>
      {/* Quantità row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1.4, fontWeight: 700,
        color: 'rgba(0,0,0,0.55)',
      }}>
        <span>QUANTITÀ</span><span>PAG.{r.page} · COER {r.coherence}%</span>
      </div>
      <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
        {['100 g', '300 g', '500 g', '1 kg'].map((q, i) => (
          <div key={q} style={{
            padding: '9px 0', textAlign: 'center', borderRadius: 99,
            background: i === 0 ? '#0B0B0B' : 'rgba(255,255,255,0.6)',
            color: i === 0 ? '#fff' : '#0B0B0B',
            border: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.06)',
            fontFamily: 'Nebulica', fontWeight: 700, fontSize: 12,
          }}>{q}</div>
        ))}
      </div>

      {/* Formula */}
      <div style={{
        marginTop: 14, display: 'flex', justifyContent: 'space-between',
        fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1.4, fontWeight: 700,
        color: 'rgba(0,0,0,0.55)',
      }}>
        <span>FORMULA · 3 INK</span><span>Σ 100.0 g</span>
      </div>
      <div style={{ marginTop: 6 }}>
        {r.inks.map((ink, i) => (
          <div key={ink.name} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 0',
            borderTop: '1px solid rgba(0,0,0,0.07)',
          }}>
            <div style={{
              padding: '3px 9px', borderRadius: 99,
              background: '#0B0B0B', color: '#fff',
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 11,
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

      {/* Action */}
      <div style={{
        marginTop: 8, padding: '11px 14px', borderRadius: 14,
        background: '#0B0B0B', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: 'Nebulica', fontSize: 13, fontWeight: 600,
        }}>
          <IconPrinter color="#fff"/> Stampa etichetta
        </span>
        <span style={{
          fontFamily: 'Nebulica', fontSize: 9, letterSpacing: 1.2, fontWeight: 700,
          color: pantone.hex,
        }}>{r.project.toUpperCase()}</span>
      </div>
    </div>
  );
}

Object.assign(window, { V18Wallet, V18Card, RecipeSheet });
