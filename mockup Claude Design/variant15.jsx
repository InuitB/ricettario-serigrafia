// variant15.jsx — DETAIL v2 — STATICO + sfondo chiaro neutro
// Codice in alto. Blob del colore Pantone solo in fondo (statico, soft).
// Sfondo molto chiaro neutro (off-white) per far risaltare il colore.

function V15Detail() {
  const r = RECIPE_699;
  const bg = '#F7F4ED';
  return (
    <Phone bg={bg}>
      {/* paper grain */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.13, mixBlendMode: 'multiply', pointerEvents: 'none' }}>
        <filter id="v15-grain">
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" stitchTiles="stitch"/>
          <feColorMatrix values="0 0 0 0 0.3  0 0 0 0 0.25  0 0 0 0 0.2  0 0 0 0.5 0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#v15-grain)"/>
      </svg>

      {/* Pantone-colored blob — only at bottom, static, single big soft blob */}
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0,
      }}>
        <div style={{
          position: 'absolute', bottom: -160, left: -40, right: -40,
          height: 380, borderRadius: '50%',
          background: r.hex, filter: 'blur(60px)',
          opacity: 0.78,
        }}/>
        <div style={{
          position: 'absolute', bottom: 100, left: -100,
          width: 220, height: 220, borderRadius: '50%',
          background: r.hex, filter: 'blur(60px)',
          opacity: 0.4,
        }}/>
      </div>

      <div style={{
        position: 'relative', zIndex: 2,
        padding: '64px 22px 0', height: '100%', boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Top bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4,
        }}>
          <div style={{
            height: 36, padding: '0 14px 0 10px', borderRadius: 99,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#fff',
            border: '1px solid rgba(0,0,0,0.06)',
            fontFamily: 'Nebulica', fontSize: 14, fontWeight: 500,
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
          }}>
            <IconBack color="#0B0B0B"/> Ricette
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: 99,
            background: '#fff',
            border: '1px solid rgba(0,0,0,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
          }}>
            <IconEdit color="#0B0B0B"/>
          </div>
        </div>

        {/* Codice in alto */}
        <div style={{ marginTop: 14 }}>
          <div style={{
            fontFamily: 'Nebulica', fontSize: 11, letterSpacing: 2, fontWeight: 700,
            color: 'rgba(0,0,0,0.55)',
          }}>PANTONE · BOOK U</div>
          <div style={{
            fontFamily: 'Nebulica', fontWeight: 700, fontSize: 96,
            lineHeight: 0.85, letterSpacing: -4, color: '#0B0B0B', marginTop: 4,
          }}>699<span style={{ fontWeight: 400, opacity: 0.55 }}> U</span></div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            marginTop: 6,
          }}>
            <span style={{
              fontFamily: 'Nebulica', fontSize: 16, color: '#0B0B0B', opacity: 0.78,
            }}>{r.name}</span>
            <span style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
              color: '#0B0B0B', opacity: 0.55, letterSpacing: 0.6,
            }}>{r.hex.toUpperCase()} · PAG.{r.page}</span>
          </div>
        </div>

        {/* Quantità */}
        <div style={{ marginTop: 18 }}>
          <div style={{
            fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1.4, fontWeight: 700,
            color: 'rgba(0,0,0,0.55)', marginBottom: 8,
          }}>QUANTITÀ</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
            {['100 g', '300 g', '500 g', '1 kg'].map((q, i) => (
              <div key={q} style={{
                padding: '11px 0', textAlign: 'center', borderRadius: 99,
                background: i === 0 ? '#0B0B0B' : '#fff',
                color: i === 0 ? bg : '#0B0B0B',
                boxShadow: i === 0 ? 'none' : '0 1px 2px rgba(0,0,0,0.04)',
                border: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.06)',
                fontFamily: 'Nebulica', fontWeight: 700, fontSize: 12,
              }}>{q}</div>
            ))}
          </div>
        </div>

        {/* Formula card */}
        <div style={{
          marginTop: 14, padding: '16px 18px',
          background: '#fff', borderRadius: 22,
          boxShadow: '0 16px 30px rgba(0,0,0,0.08), 0 1px 0 rgba(0,0,0,0.04)',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontFamily: 'Nebulica', fontSize: 11, letterSpacing: 1.4, fontWeight: 700,
            color: 'rgba(0,0,0,0.55)',
          }}>
            <span>FORMULA</span><span>3 INK · 100.0 g</span>
          </div>
          {r.inks.map((ink, i) => (
            <div key={ink.name} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '13px 0',
              borderTop: '1px solid rgba(0,0,0,0.06)',
              marginTop: i === 0 ? 8 : 0,
            }}>
              <div style={{
                padding: '4px 10px', borderRadius: 99,
                background: '#0B0B0B', color: '#fff',
                fontFamily: 'Nebulica', fontWeight: 700, fontSize: 11,
              }}>{ink.name}</div>
              <div style={{ flex: 1, height: 5, borderRadius: 99, background: 'rgba(0,0,0,0.08)' }}>
                <div style={{ height: '100%', width: `${ink.pct}%`, background: r.hex, borderRadius: 99 }}/>
              </div>
              <div style={{
                fontFamily: 'Nebulica', fontWeight: 700, fontSize: 17,
                color: '#0B0B0B', minWidth: 56, textAlign: 'right',
              }}>{ink.grams.toFixed(2)}<span style={{
                opacity: 0.45, fontWeight: 400, fontSize: 11, marginLeft: 2,
              }}>g</span></div>
            </div>
          ))}
        </div>

        {/* Action — sits over the blob */}
        <div style={{
          marginTop: 14, padding: '14px 16px', borderRadius: 16,
          background: 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(18px)',
          border: '1px solid rgba(255,255,255,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: 'Nebulica', fontSize: 14, fontWeight: 600,
          }}>
            <IconPrinter color="#0B0B0B"/> Stampa etichetta
          </span>
          <span style={{
            fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1.2, fontWeight: 700,
            color: 'rgba(0,0,0,0.6)',
          }}>{r.project.toUpperCase()}</span>
        </div>
      </div>
    </Phone>
  );
}

Object.assign(window, { V15Detail });
