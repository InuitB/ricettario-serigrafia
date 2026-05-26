// variant2.jsx — Full-bleed Pantone · ogni elemento è una slab di colore
// Lista: card colorate alte; Detail: top metà full-bleed Pantone-card style.

function V2List() {
  const bg = '#0E0E0E';
  return (
    <Phone bg={bg} dark>
      <div style={{ padding: '64px 0 0', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', position: 'relative' }}>

        {/* Header */}
        <div style={{ padding: '14px 22px 0' }}>
          <div style={{
            fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 2, fontWeight: 700,
            color: 'rgba(255,255,255,0.45)',
          }}>RICETTARIO / SERIGRAFIA</div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 8,
          }}>
            <div style={{
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 40, letterSpacing: -1.5, lineHeight: 0.9,
              color: '#fff',
            }}>Formule</div>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 13,
              color: 'rgba(255,255,255,0.5)',
            }}>247</div>
          </div>
        </div>

        {/* Search */}
        <div style={{ padding: '20px 22px 12px', display: 'flex', gap: 10 }}>
          <div style={{
            flex: 1, height: 48, borderRadius: 99,
            background: 'rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', padding: '0 18px', gap: 10,
            border: '1px solid rgba(255,255,255,0.12)',
          }}>
            <IconSearch color="rgba(255,255,255,0.9)"/>
            <span style={{
              fontFamily: 'Nebulica', fontSize: 16, color: 'rgba(255,255,255,0.45)',
            }}>cerca pantone…</span>
          </div>
          <FilterPill color="#fff" border="rgba(255,255,255,0.18)"/>
        </div>

        {/* List — full bleed colored slabs */}
        <div style={{ flex: 1, overflow: 'hidden', padding: '4px 0 140px' }}>
          {PANTONES.slice(0, 5).map((p) => {
            const fg = textOn(p.hex);
            return (
              <div key={p.code} style={{
                background: p.hex, padding: '20px 22px 18px',
                position: 'relative',
              }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                }}>
                  <div style={{
                    fontFamily: 'Nebulica', fontSize: 11, letterSpacing: 1.8, fontWeight: 700,
                    color: fg, opacity: 0.7,
                  }}>PANTONE</div>
                  <div style={{
                    fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
                    color: fg, opacity: 0.7,
                  }}>{p.ink} ink</div>
                </div>
                <div style={{
                  fontFamily: 'Nebulica', fontWeight: 700, fontSize: 56, lineHeight: 0.9,
                  letterSpacing: -2.2, color: fg, marginTop: 6,
                }}>{p.code.replace(' U','')}<span style={{ fontWeight: 400, opacity: 0.7 }}> U</span></div>
                <div style={{
                  marginTop: 6,
                  fontFamily: 'Nebulica', fontSize: 13, color: fg, opacity: 0.75,
                }}>{p.name}</div>
              </div>
            );
          })}
        </div>
      </div>
      <BottomNav active={0} accent="#fff" bg={bg} dark/>
    </Phone>
  );
}

function V2Detail() {
  const r = RECIPE_699;
  const fg = textOn(r.hex);
  const bg = '#0E0E0E';
  return (
    <Phone bg={bg} dark>
      {/* Top: full-bleed Pantone card */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 360,
        background: r.hex, padding: '64px 22px 0', boxSizing: 'border-box',
      }}>
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
          <div style={{
            height: 36, padding: '0 14px 0 10px', borderRadius: 99,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(0,0,0,0.08)', color: fg,
            fontFamily: 'Nebulica', fontSize: 14, fontWeight: 500,
          }}>
            <IconBack color={fg}/> Ricette
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: 99, background: 'rgba(0,0,0,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <IconEdit color={fg}/>
          </div>
        </div>

        {/* Pantone hero — classic card lockup */}
        <div style={{ marginTop: 60 }}>
          <div style={{
            fontFamily: 'Nebulica', fontSize: 11, letterSpacing: 2, fontWeight: 700,
            color: fg, opacity: 0.7,
          }}>PANTONE</div>
          <div style={{
            fontFamily: 'Nebulica', fontWeight: 700, fontSize: 86,
            lineHeight: 0.85, letterSpacing: -3.5, color: fg,
            marginTop: 6,
          }}>{r.code.replace(' U','')}<span style={{ fontWeight: 400, opacity: 0.6 }}> U</span></div>
          <div style={{
            marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          }}>
            <div style={{
              fontFamily: 'Nebulica', fontSize: 15, color: fg, opacity: 0.85,
            }}>{r.name}</div>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
              color: fg, opacity: 0.6, letterSpacing: 0.5,
            }}>PAG.{r.page} · COER {r.coherence}%</div>
          </div>
        </div>
      </div>

      {/* Bottom sheet content */}
      <div style={{
        position: 'absolute', top: 340, left: 0, right: 0, bottom: 0,
        background: bg, borderRadius: '28px 28px 0 0',
        padding: '24px 22px 120px', overflow: 'hidden',
      }}>
        {/* Quantità */}
        <div style={{
          fontFamily: 'Nebulica', fontSize: 11, letterSpacing: 1.6, fontWeight: 700,
          color: 'rgba(255,255,255,0.45)',
        }}>QUANTITÀ</div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 10,
        }}>
          {['100 g', '300 g', '500 g', '1 kg'].map((q, i) => (
            <div key={q} style={{
              padding: '12px 0', textAlign: 'center', borderRadius: 12,
              background: i === 0 ? r.hex : 'rgba(255,255,255,0.06)',
              color: i === 0 ? textOn(r.hex) : 'rgba(255,255,255,0.85)',
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 14,
              border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)',
            }}>{q}</div>
          ))}
        </div>

        {/* Formula */}
        <div style={{
          marginTop: 22,
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'Nebulica', fontSize: 11, letterSpacing: 1.6, fontWeight: 700,
          color: 'rgba(255,255,255,0.45)',
        }}>
          <span>FORMULA</span>
          <span>100.0 g</span>
        </div>
        <div style={{ marginTop: 10 }}>
          {r.inks.map((ink) => (
            <div key={ink.name} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 0', borderTop: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{
                fontFamily: 'Nebulica', fontWeight: 700, fontSize: 14,
                color: '#fff', width: 60,
              }}>{ink.name}</div>
              <div style={{ flex: 1, height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${ink.pct}%`, background: r.hex }}/>
              </div>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 13, fontWeight: 600,
                color: '#fff', minWidth: 64, textAlign: 'right',
              }}>{ink.grams.toFixed(2)}<span style={{ opacity: 0.5 }}> g</span></div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 22, padding: '14px 16px', borderRadius: 14,
          background: 'rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontFamily: 'Nebulica', fontSize: 14 }}>
            <IconPrinter color="#fff"/> Stampa etichetta
          </div>
          <div style={{
            fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1, fontWeight: 700,
            color: r.hex,
          }}>{r.project.toUpperCase()}</div>
        </div>
      </div>
    </Phone>
  );
}

// pick black or white text depending on color luminance
function textOn(hex) {
  const h = hex.replace('#','');
  const r = parseInt(h.substring(0,2),16);
  const g = parseInt(h.substring(2,4),16);
  const b = parseInt(h.substring(4,6),16);
  const L = (0.299*r + 0.587*g + 0.114*b) / 255;
  return L > 0.62 ? '#0B0B0B' : '#fff';
}

Object.assign(window, { V2List, V2Detail, textOn });
