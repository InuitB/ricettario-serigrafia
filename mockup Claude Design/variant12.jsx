// variant12.jsx — Compact Wallet Rows · ogni voce è una mini-card Pantone, scrollabile
// Funziona con 247 voci. Dettaglio: full-bleed + recipe sotto, stile V7.

function V12List() {
  const bg = '#F4EFE2';
  return (
    <Phone bg={bg}>
      {/* very subtle paper grain */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18, mixBlendMode: 'multiply', pointerEvents: 'none' }}>
        <filter id="paper-grain">
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" stitchTiles="stitch"/>
          <feColorMatrix values="0 0 0 0 0.4  0 0 0 0 0.35  0 0 0 0 0.3  0 0 0 0.4 0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#paper-grain)"/>
      </svg>

      <div style={{ padding: '64px 18px 0', height: '100%', boxSizing: 'border-box', position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6,
        }}>
          <div>
            <div style={{
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 30, lineHeight: 0.95,
              letterSpacing: -0.8, color: '#0B0B0B',
            }}>Ricettario</div>
            <div style={{
              fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1.4, fontWeight: 700,
              color: 'rgba(0,0,0,0.55)', marginTop: 2,
            }}>247 PANTONE · SICO</div>
          </div>
          <BGToggle active="cream"/>
        </div>

        {/* Search */}
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <div style={{
            flex: 1, height: 44, borderRadius: 14, background: '#fff',
            display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10,
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          }}>
            <IconSearch color="#0B0B0B"/>
            <span style={{
              fontFamily: 'Nebulica', fontSize: 15, color: 'rgba(0,0,0,0.45)',
            }}>cerca pantone…</span>
          </div>
          <div style={{
            width: 44, height: 44, borderRadius: 14, background: '#fff',
            border: '1px solid rgba(0,0,0,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <IconFilter color="#0B0B0B"/>
          </div>
        </div>

        {/* Compact wallet rows */}
        <div style={{
          marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10,
          paddingBottom: 110,
        }}>
          {PANTONES.slice(0, 6).map((p) => {
            const fg = textOn4(p.hex);
            return (
              <div key={p.code} style={{
                display: 'grid', gridTemplateColumns: '60% 40%',
                borderRadius: 16, overflow: 'hidden',
                boxShadow: '0 6px 14px rgba(0,0,0,0.08), 0 1px 0 rgba(0,0,0,0.04)',
                background: '#fff',
              }}>
                {/* color half */}
                <div style={{
                  background: p.hex, padding: '12px 14px',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  minHeight: 80,
                }}>
                  <span style={{
                    fontFamily: 'Nebulica', fontSize: 9, letterSpacing: 1.4, fontWeight: 700,
                    color: fg, opacity: 0.75,
                  }}>PANTONE</span>
                  <div>
                    <div style={{
                      fontFamily: 'Nebulica', fontWeight: 700, fontSize: 28,
                      lineHeight: 1, letterSpacing: -0.8, color: fg,
                    }}>{p.code.replace(' U','')}<span style={{ fontWeight: 400, opacity: 0.7 }}> U</span></div>
                  </div>
                </div>
                {/* info half */}
                <div style={{
                  padding: '12px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                }}>
                  <div>
                    <div style={{
                      fontFamily: 'Nebulica', fontWeight: 700, fontSize: 13, color: '#0B0B0B',
                      lineHeight: 1.1, letterSpacing: -0.2,
                    }}>{p.name}</div>
                    <div style={{
                      fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
                      color: 'rgba(0,0,0,0.5)', marginTop: 3, letterSpacing: 0.4,
                    }}>{p.hex.toUpperCase()}</div>
                  </div>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  }}>
                    <span style={{
                      fontFamily: 'Nebulica', fontWeight: 700, fontSize: 14, color: '#0B0B0B',
                      letterSpacing: -0.3,
                    }}>{p.ink}<span style={{
                      fontSize: 9, opacity: 0.55, fontWeight: 400, marginLeft: 3, letterSpacing: 0.8,
                    }}>INK</span></span>
                    <span style={{
                      fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
                      color: p.coherence > 85 ? '#00855C' : 'rgba(0,0,0,0.5)', fontWeight: 600,
                    }}>{p.coherence}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <BottomNav active={0} accent="#0033FF" restColor="#0B0B0B" bg={bg}/>
    </Phone>
  );
}

function V12Detail() {
  const r = RECIPE_699;
  const bg = '#F4EFE2';
  return (
    <Phone bg={bg}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18, mixBlendMode: 'multiply', pointerEvents: 'none' }}>
        <filter id="paper-grain2">
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" stitchTiles="stitch"/>
          <feColorMatrix values="0 0 0 0 0.4  0 0 0 0 0.35  0 0 0 0 0.3  0 0 0 0.4 0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#paper-grain2)"/>
      </svg>

      <FullBleedHero pantone={r} height={360}/>

      <div style={{
        position: 'absolute', top: 340, left: 0, right: 0, bottom: 0,
        background: bg, borderRadius: '28px 28px 0 0',
        padding: '22px 20px 110px', overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'Nebulica', fontSize: 11, letterSpacing: 1.4, fontWeight: 700,
          color: 'rgba(0,0,0,0.55)', marginBottom: 10,
        }}>
          <span>QUANTITÀ</span><span>seleziona</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
          {['100 g', '300 g', '500 g', '1 kg'].map((q, i) => (
            <div key={q} style={{
              padding: '11px 0', textAlign: 'center', borderRadius: 12,
              background: i === 0 ? '#0B0B0B' : '#fff',
              color: i === 0 ? bg : '#0B0B0B',
              boxShadow: i === 0 ? 'none' : '0 1px 2px rgba(0,0,0,0.04)',
              border: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.06)',
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 13,
            }}>{q}</div>
          ))}
        </div>

        {/* Formula */}
        <div style={{
          marginTop: 16, padding: '14px 16px',
          background: '#fff', borderRadius: 18,
          boxShadow: '0 6px 14px rgba(0,0,0,0.06), 0 1px 0 rgba(0,0,0,0.03)',
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
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '13px 0',
              borderTop: i === 0 ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(0,0,0,0.06)',
              marginTop: i === 0 ? 10 : 0,
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
                fontFamily: 'Nebulica', fontWeight: 700, fontSize: 16,
                color: '#0B0B0B', minWidth: 52, textAlign: 'right',
              }}>{ink.grams.toFixed(2)}<span style={{
                opacity: 0.45, fontWeight: 400, fontSize: 11, marginLeft: 2,
              }}>g</span></div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 12, padding: '14px 16px', borderRadius: 16,
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

Object.assign(window, { V12List, V12Detail });
