// variant14.jsx — DETAIL v2 — DINAMICO
// Codice subito in alto (no spazio sprecato). Card formula al centro, pulita.
// Blob animato che riprende il COLORE del Pantone nella parte bassa.

function V14Detail() {
  const r = RECIPE_699;
  const bg = '#F4EFE2';

  // Inject blob keyframes once
  React.useEffect(() => {
    if (document.getElementById('p-blob-kf')) return;
    const s = document.createElement('style');
    s.id = 'p-blob-kf';
    s.textContent = `
      @keyframes pblob1 {
        0%   { transform: translate(0, 0)        scale(1); }
        50%  { transform: translate(40px, -20px) scale(1.12); }
        100% { transform: translate(0, 0)        scale(1); }
      }
      @keyframes pblob2 {
        0%   { transform: translate(0, 0)        scale(1); }
        50%  { transform: translate(-30px, -40px) scale(1.18); }
        100% { transform: translate(0, 0)        scale(1); }
      }
      @keyframes pblob3 {
        0%   { transform: translate(0, 0)        scale(0.95); }
        50%  { transform: translate(20px, 25px)   scale(1.08); }
        100% { transform: translate(0, 0)        scale(0.95); }
      }
    `;
    document.head.appendChild(s);
  }, []);

  return (
    <Phone bg={bg}>
      {/* Static base grain */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15, mixBlendMode: 'multiply', pointerEvents: 'none' }}>
        <filter id="v14-grain">
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" stitchTiles="stitch"/>
          <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.3  0 0 0 0 0.25  0 0 0 0.5 0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#v14-grain)"/>
      </svg>

      {/* Pantone-colored animated blob — bottom 60% */}
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0,
      }}>
        <div style={{
          position: 'absolute', bottom: -120, left: -60,
          width: 320, height: 320, borderRadius: '50%',
          background: r.hex, filter: 'blur(60px)',
          opacity: 0.85,
          animation: 'pblob1 14s ease-in-out infinite',
        }}/>
        <div style={{
          position: 'absolute', bottom: -80, right: -80,
          width: 280, height: 280, borderRadius: '50%',
          background: r.hex, filter: 'blur(70px)',
          opacity: 0.65,
          animation: 'pblob2 18s ease-in-out infinite',
        }}/>
        <div style={{
          position: 'absolute', bottom: 60, right: 20,
          width: 200, height: 200, borderRadius: '50%',
          background: r.hex, filter: 'blur(45px)',
          opacity: 0.5,
          animation: 'pblob3 11s ease-in-out infinite',
        }}/>
      </div>

      <div style={{
        position: 'relative', zIndex: 2,
        padding: '64px 22px 0', height: '100%', boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Top bar — chevron + edit */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4,
        }}>
          <div style={{
            height: 36, padding: '0 14px 0 10px', borderRadius: 99,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.7)',
            fontFamily: 'Nebulica', fontSize: 14, fontWeight: 500,
          }}>
            <IconBack color="#0B0B0B"/> Ricette
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: 99,
            background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <IconEdit color="#0B0B0B"/>
          </div>
        </div>

        {/* Codice — ALTO, subito dopo i pill */}
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
            marginTop: 8,
          }}>
            <span style={{
              fontFamily: 'Nebulica', fontSize: 16, color: '#0B0B0B', opacity: 0.75,
            }}>{r.name}</span>
            <span style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
              color: '#0B0B0B', opacity: 0.55, letterSpacing: 0.6,
            }}>{r.hex.toUpperCase()} · PAG.{r.page} · COER {r.coherence}%</span>
          </div>
        </div>

        {/* Quantità — pulite, ben staccate dal blob */}
        <div style={{ marginTop: 18 }}>
          <div style={{
            fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1.4, fontWeight: 700,
            color: 'rgba(0,0,0,0.55)', marginBottom: 8,
          }}>QUANTITÀ</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
            {['100 g', '300 g', '500 g', '1 kg'].map((q, i) => (
              <div key={q} style={{
                padding: '11px 0', textAlign: 'center', borderRadius: 99,
                background: i === 0 ? '#0B0B0B' : 'rgba(255,255,255,0.7)',
                color: i === 0 ? bg : '#0B0B0B',
                backdropFilter: i === 0 ? 'none' : 'blur(10px)',
                border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.85)',
                fontFamily: 'Nebulica', fontWeight: 700, fontSize: 12,
              }}>{q}</div>
            ))}
          </div>
        </div>

        {/* Formula card — solid white, well separated from blob */}
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
              borderTop: i === 0 ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(0,0,0,0.06)',
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

        {/* Action */}
        <div style={{
          marginTop: 14, padding: '14px 16px', borderRadius: 16,
          background: '#0B0B0B', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: 'Nebulica', fontSize: 14, fontWeight: 600,
          }}>
            <IconPrinter color="#fff"/> Stampa etichetta
          </span>
          <span style={{
            fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1.2, fontWeight: 700,
            color: r.hex,
          }}>{r.project.toUpperCase()}</span>
        </div>
      </div>
    </Phone>
  );
}

Object.assign(window, { V14Detail });
