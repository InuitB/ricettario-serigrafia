// variant16.jsx — Full-bleed Pantone · variante CHIARA della V2
// Lista: slab di colore edge-to-edge alternate con sfondo chiaro. Detail: full-bleed in alto + cream sotto.

function V16List() {
  const bg = '#F4EFE2';
  return (
    <Phone bg={bg}>
      <div style={{ padding: '64px 0 0', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '14px 22px 0' }}>
          <div style={{
            fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 2, fontWeight: 700,
            color: 'rgba(0,0,0,0.55)',
          }}>RICETTARIO / SERIGRAFIA</div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 6,
          }}>
            <div style={{
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 38, letterSpacing: -1.4, lineHeight: 0.9,
              color: '#0B0B0B',
            }}>Formule</div>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
              color: 'rgba(0,0,0,0.55)',
            }}>247</div>
          </div>
        </div>

        {/* Search */}
        <div style={{ padding: '14px 22px 8px', display: 'flex', gap: 10 }}>
          <div style={{
            flex: 1, height: 46, borderRadius: 99,
            background: '#fff',
            border: '1px solid rgba(0,0,0,0.08)',
            display: 'flex', alignItems: 'center', padding: '0 18px', gap: 10,
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
          }}>
            <IconSearch color="#0B0B0B"/>
            <span style={{
              fontFamily: 'Nebulica', fontSize: 16, color: 'rgba(0,0,0,0.45)',
            }}>cerca pantone…</span>
          </div>
          <FilterPill border="rgba(0,0,0,0.12)" bg="#fff"/>
        </div>

        {/* Full-bleed color slabs */}
        <div style={{ flex: 1, overflow: 'hidden', padding: '6px 0 140px' }}>
          {PANTONES.slice(0, 5).map((p) => {
            const fg = textOn4(p.hex);
            return (
              <div key={p.code} style={{
                background: p.hex, padding: '18px 22px 16px',
              }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                }}>
                  <div style={{
                    fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1.8, fontWeight: 700,
                    color: fg, opacity: 0.7,
                  }}>PANTONE</div>
                  <div style={{
                    fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
                    color: fg, opacity: 0.7,
                  }}>{p.ink} ink · {p.hex.toUpperCase()}</div>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 4,
                }}>
                  <div style={{
                    fontFamily: 'Nebulica', fontWeight: 700, fontSize: 54, lineHeight: 0.9,
                    letterSpacing: -2, color: fg,
                  }}>{p.code.replace(' U','')}<span style={{ fontWeight: 400, opacity: 0.7 }}> U</span></div>
                  <div style={{
                    fontFamily: 'Nebulica', fontSize: 14, color: fg, opacity: 0.78,
                  }}>{p.name}</div>
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

function V16Detail() {
  const r = RECIPE_699;
  const bg = '#F4EFE2';
  return (
    <Phone bg={bg}>
      <FullBleedHero pantone={r} height={360}/>

      <div style={{
        position: 'absolute', top: 340, left: 0, right: 0, bottom: 0,
        background: bg, borderRadius: '28px 28px 0 0',
        padding: '22px 22px 110px', overflow: 'hidden',
      }}>
        <div style={{
          fontFamily: 'Nebulica', fontSize: 11, letterSpacing: 1.4, fontWeight: 700,
          color: 'rgba(0,0,0,0.55)', marginBottom: 8,
        }}>QUANTITÀ</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {['100 g', '300 g', '500 g', '1 kg'].map((q, i) => (
            <div key={q} style={{
              padding: '12px 0', textAlign: 'center', borderRadius: 12,
              background: i === 0 ? r.hex : '#fff',
              color: i === 0 ? textOn4(r.hex) : '#0B0B0B',
              border: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.06)',
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 13,
              boxShadow: i === 0 ? 'none' : '0 1px 2px rgba(0,0,0,0.03)',
            }}>{q}</div>
          ))}
        </div>

        <div style={{
          marginTop: 16,
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'Nebulica', fontSize: 11, letterSpacing: 1.4, fontWeight: 700,
          color: 'rgba(0,0,0,0.55)',
        }}>
          <span>FORMULA</span>
          <span>3 INK · 100.0 g</span>
        </div>
        <div style={{ marginTop: 8 }}>
          {r.inks.map((ink) => (
            <div key={ink.name} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '13px 0', borderTop: '1px solid rgba(0,0,0,0.1)',
            }}>
              <div style={{
                fontFamily: 'Nebulica', fontWeight: 700, fontSize: 15, color: '#0B0B0B', width: 56,
              }}>{ink.name}</div>
              <div style={{ flex: 1, height: 6, borderRadius: 99, background: 'rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${ink.pct}%`, background: r.hex }}/>
              </div>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 13, fontWeight: 600,
                color: '#0B0B0B', minWidth: 60, textAlign: 'right',
              }}>{ink.grams.toFixed(2)}<span style={{ opacity: 0.5 }}> g</span></div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 16, padding: '14px 16px', borderRadius: 14,
          background: '#fff',
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#0B0B0B', fontFamily: 'Nebulica', fontSize: 14 }}>
            <IconPrinter color="#0B0B0B"/> Stampa etichetta
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

Object.assign(window, { V16List, V16Detail });
