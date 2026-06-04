// variant17.jsx — Bordi neri · ogni elemento è racchiuso in rect/pill outline
// Vibe: stile illustrato/editoriale tipo "Memphis"/"flat outline".

function V17List() {
  const bg = '#FBF6E9';
  const STROKE = 2;
  const cards = PANTONES.slice(0, 6);
  return (
    <Phone bg={bg}>
      <div style={{ padding: '64px 20px 0', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        {/* Header inside an outlined frame */}
        <div style={{
          marginTop: 6,
          padding: '12px 16px',
          border: `${STROKE}px solid #0B0B0B`, borderRadius: 18, background: '#fff',
          boxShadow: '4px 4px 0 #0B0B0B',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 28, lineHeight: 0.9,
              letterSpacing: -0.8, color: '#0B0B0B',
            }}>Ricettario</div>
            <div style={{
              padding: '4px 10px', borderRadius: 99,
              border: `${STROKE}px solid #0B0B0B`, background: bg,
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 11, letterSpacing: 1,
            }}>247</div>
          </div>
          <div style={{
            fontFamily: 'Nebulica', fontSize: 11, letterSpacing: 1.4, fontWeight: 700,
            color: 'rgba(0,0,0,0.55)', marginTop: 2,
          }}>SICO INKS · PANTONE U</div>
        </div>

        {/* Search */}
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <div style={{
            flex: 1, height: 46, borderRadius: 99, background: '#fff',
            display: 'flex', alignItems: 'center', padding: '0 18px', gap: 10,
            border: `${STROKE}px solid #0B0B0B`,
          }}>
            <IconSearch color="#0B0B0B" sw={2.4}/>
            <span style={{
              fontFamily: 'Nebulica', fontSize: 15, color: 'rgba(0,0,0,0.45)',
            }}>cerca pantone…</span>
          </div>
          <div style={{
            width: 46, height: 46, borderRadius: 99,
            border: `${STROKE}px solid #0B0B0B`, background: '#0B0B0B',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <IconFilter color="#fff" sw={2.4}/>
          </div>
        </div>

        {/* Card list — each is an outlined rect */}
        <div style={{
          marginTop: 14, flex: 1, overflow: 'hidden',
          display: 'flex', flexDirection: 'column', gap: 10,
          paddingBottom: 110,
        }}>
          {cards.slice(0, 5).map((p) => {
            const fg = textOn4(p.hex);
            return (
              <div key={p.code} style={{
                display: 'grid', gridTemplateColumns: '94px 1fr auto',
                alignItems: 'stretch',
                border: `${STROKE}px solid #0B0B0B`,
                borderRadius: 18, background: '#fff', overflow: 'hidden',
                boxShadow: '3px 3px 0 #0B0B0B',
              }}>
                {/* color swatch (outlined) */}
                <div style={{
                  background: p.hex,
                  borderRight: `${STROKE}px solid #0B0B0B`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: 8,
                }}>
                  <div style={{
                    fontFamily: 'Nebulica', fontWeight: 700, fontSize: 11, letterSpacing: 1.4,
                    color: fg, opacity: 0.8,
                  }}>PMS</div>
                </div>
                {/* info */}
                <div style={{
                  padding: '10px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                }}>
                  <div style={{
                    fontFamily: 'Nebulica', fontWeight: 700, fontSize: 24, color: '#0B0B0B',
                    letterSpacing: -0.7, lineHeight: 1,
                  }}>{p.code}</div>
                  <div style={{
                    fontFamily: 'Nebulica', fontSize: 12, color: 'rgba(0,0,0,0.55)', marginTop: 3,
                  }}>{p.name}</div>
                </div>
                {/* ink count */}
                <div style={{
                  padding: '10px 14px', borderLeft: `${STROKE}px solid #0B0B0B`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  background: bg, minWidth: 56,
                }}>
                  <span style={{
                    fontFamily: 'Nebulica', fontWeight: 700, fontSize: 22, letterSpacing: -0.5,
                    color: '#0B0B0B', lineHeight: 1,
                  }}>{p.ink}</span>
                  <span style={{
                    fontFamily: 'Nebulica', fontSize: 9, letterSpacing: 1.2, fontWeight: 700,
                    color: 'rgba(0,0,0,0.55)', marginTop: 3,
                  }}>INK</span>
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

function V17Detail() {
  const r = RECIPE_699;
  const bg = '#FBF6E9';
  const STROKE = 2;
  return (
    <Phone bg={bg}>
      <div style={{ padding: '64px 20px 0', height: '100%', boxSizing: 'border-box' }}>
        {/* Top bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4,
        }}>
          <div style={{
            height: 38, padding: '0 14px 0 10px', borderRadius: 99,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            border: `${STROKE}px solid #0B0B0B`, background: '#fff',
            fontFamily: 'Nebulica', fontSize: 14, fontWeight: 600,
          }}>
            <IconBack color="#0B0B0B" sw={2.4}/> Ricette
          </div>
          <div style={{
            width: 38, height: 38, borderRadius: 99,
            border: `${STROKE}px solid #0B0B0B`, background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <IconEdit color="#0B0B0B" sw={2.4}/>
          </div>
        </div>

        {/* Hero — outlined card with color top + info bottom */}
        <div style={{
          marginTop: 12, borderRadius: 22, overflow: 'hidden',
          border: `${STROKE}px solid #0B0B0B`,
          boxShadow: '4px 4px 0 #0B0B0B',
        }}>
          <div style={{
            background: r.hex, padding: '20px 18px 22px',
            borderBottom: `${STROKE}px solid #0B0B0B`,
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{
                fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1.8, fontWeight: 700,
                color: '#0B0B0B', opacity: 0.65,
              }}>PANTONE</span>
              <span style={{
                padding: '3px 8px', borderRadius: 99,
                border: `${STROKE}px solid #0B0B0B`, background: '#fff',
                fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1, fontWeight: 700,
                color: '#0B0B0B',
              }}>PAG.{r.page} · COER {r.coherence}%</span>
            </div>
            <div style={{
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 78, lineHeight: 0.88,
              letterSpacing: -3, color: '#0B0B0B', marginTop: 10,
            }}>699<span style={{ fontWeight: 400, opacity: 0.55 }}> U</span></div>
            <div style={{
              fontFamily: 'Nebulica', fontSize: 14, color: '#0B0B0B', opacity: 0.78, marginTop: 4,
            }}>{r.name} · {r.hex.toUpperCase()}</div>
          </div>
          {/* Quantità segmented inside hero */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', background: '#fff' }}>
            {['100 g', '300 g', '500 g', '1 kg'].map((q, i) => (
              <div key={q} style={{
                padding: '12px 0', textAlign: 'center',
                background: i === 0 ? '#0B0B0B' : '#fff',
                color: i === 0 ? '#fff' : '#0B0B0B',
                borderRight: i < 3 ? `${STROKE}px solid #0B0B0B` : 'none',
                fontFamily: 'Nebulica', fontWeight: 700, fontSize: 14,
              }}>{q}</div>
            ))}
          </div>
        </div>

        {/* Formula card */}
        <div style={{
          marginTop: 12, borderRadius: 18, overflow: 'hidden',
          border: `${STROKE}px solid #0B0B0B`, background: '#fff',
          boxShadow: '3px 3px 0 #0B0B0B',
        }}>
          <div style={{
            padding: '10px 14px',
            display: 'flex', justifyContent: 'space-between',
            background: bg, borderBottom: `${STROKE}px solid #0B0B0B`,
            fontFamily: 'Nebulica', fontSize: 11, letterSpacing: 1.4, fontWeight: 700,
            color: '#0B0B0B',
          }}>
            <span>FORMULA</span><span>3 INK · 100.0 g</span>
          </div>
          {r.inks.map((ink, i) => (
            <div key={ink.name} style={{
              padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
              borderTop: i === 0 ? 'none' : `1.5px solid #0B0B0B`,
            }}>
              <div style={{
                padding: '4px 10px', borderRadius: 99,
                border: `${STROKE}px solid #0B0B0B`, background: bg,
                fontFamily: 'Nebulica', fontWeight: 700, fontSize: 12,
              }}>{ink.name}</div>
              <div style={{
                flex: 1, height: 8, borderRadius: 99,
                border: `1.5px solid #0B0B0B`, background: '#fff', overflow: 'hidden',
              }}>
                <div style={{ height: '100%', width: `${ink.pct}%`, background: r.hex }}/>
              </div>
              <div style={{
                fontFamily: 'Nebulica', fontWeight: 700, fontSize: 16, color: '#0B0B0B',
                minWidth: 56, textAlign: 'right',
              }}>{ink.grams.toFixed(2)}<span style={{
                opacity: 0.45, fontWeight: 400, fontSize: 11, marginLeft: 2,
              }}>g</span></div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <div style={{
            flex: 1, padding: '14px 0', textAlign: 'center', borderRadius: 14,
            border: `${STROKE}px solid #0B0B0B`, background: '#0B0B0B', color: '#fff',
            fontFamily: 'Nebulica', fontWeight: 700, fontSize: 14,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: '3px 3px 0 #0B0B0B',
          }}>
            <IconPrinter color="#fff" sw={2.2}/> Stampa etichetta
          </div>
          <div style={{
            padding: '0 14px', display: 'flex', alignItems: 'center',
            borderRadius: 14, border: `${STROKE}px solid #0B0B0B`, background: bg,
            fontFamily: 'Nebulica', fontWeight: 700, fontSize: 11, letterSpacing: 0.6,
          }}>RIS.23</div>
        </div>
      </div>
    </Phone>
  );
}

Object.assign(window, { V17List, V17Detail });
