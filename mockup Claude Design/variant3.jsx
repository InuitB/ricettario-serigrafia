// variant3.jsx — Grid 2-col card · Bricolage Grotesque (friendly grotesk) + Nebulica per i numeri
// Vibe: pantone come oggetti collezionabili. Cards.

function V3List() {
  const bg = '#FBF8F1';
  const accent = '#FF5C39';
  return (
    <Phone bg={bg}>
      <div style={{ padding: '64px 18px 0', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '10px 4px 0' }}>
          <div style={{
            fontFamily: '"Bricolage Grotesque", Nebulica', fontWeight: 800, fontSize: 38,
            lineHeight: 0.95, letterSpacing: -1.4, color: '#161616',
          }}>
            Tutte le<br/>formule.
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginTop: 14,
          }}>
            <div style={{
              fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 13,
              color: 'rgba(0,0,0,0.55)',
            }}>247 pantone · SICO inks</div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 10px', borderRadius: 99,
              background: '#161616', color: '#fff',
              fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 11, fontWeight: 600,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 99, background: accent }}/>
              ORDINA · COD ↑
            </div>
          </div>
        </div>

        {/* Search */}
        <div style={{ display: 'flex', gap: 10, marginTop: 18, padding: '0 4px' }}>
          <div style={{
            flex: 1, height: 46, borderRadius: 14, background: '#fff',
            display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10,
            border: '1.5px solid #161616',
          }}>
            <IconSearch color="#161616"/>
            <span style={{
              fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 15, color: 'rgba(0,0,0,0.4)',
            }}>cerca pantone…</span>
          </div>
          <div style={{
            width: 46, height: 46, borderRadius: 14,
            background: '#161616', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <IconFilter color="#fff"/>
          </div>
        </div>

        {/* Grid */}
        <div style={{
          marginTop: 16, flex: 1, overflow: 'hidden',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, alignContent: 'flex-start',
        }}>
          {PANTONES.slice(0, 6).map((p) => {
            const fg = textOn3(p.hex);
            return (
              <div key={p.code} style={{
                borderRadius: 18, overflow: 'hidden',
                border: '1.5px solid #161616', background: '#fff',
                display: 'flex', flexDirection: 'column',
              }}>
                {/* Color half */}
                <div style={{
                  height: 100, background: p.hex, padding: 10,
                  display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                }}>
                  <span style={{
                    fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 9, fontWeight: 700,
                    letterSpacing: 1.5, color: fg, opacity: 0.75,
                  }}>PANTONE</span>
                  <span style={{
                    fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 10, fontWeight: 600,
                    color: fg, opacity: 0.75,
                    padding: '2px 7px', borderRadius: 99, background: fg === '#fff' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)',
                  }}>{p.ink}</span>
                </div>
                {/* Info half */}
                <div style={{ padding: '10px 12px 12px', borderTop: '1.5px solid #161616' }}>
                  <div style={{
                    fontFamily: 'Nebulica', fontWeight: 700, fontSize: 22,
                    lineHeight: 1, letterSpacing: -0.7, color: '#161616',
                  }}>{p.code}</div>
                  <div style={{
                    fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 11,
                    color: 'rgba(0,0,0,0.5)', marginTop: 4,
                  }}>{p.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <BottomNav active={0} accent={accent} restColor="#161616" bg={bg}/>
    </Phone>
  );
}

function V3Detail() {
  const r = RECIPE_699;
  const bg = '#FBF8F1';
  return (
    <Phone bg={bg}>
      <div style={{ padding: '60px 18px 0', height: '100%', boxSizing: 'border-box' }}>
        {/* Top bar */}
        <div style={{
          padding: '0 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6,
        }}>
          <div style={{
            height: 38, padding: '0 14px 0 10px', borderRadius: 12,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            border: '1.5px solid #161616', background: '#fff',
            fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 14, fontWeight: 500,
          }}>
            <IconBack color="#161616"/> Ricette
          </div>
          <div style={{
            width: 38, height: 38, borderRadius: 12,
            border: '1.5px solid #161616', background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <IconEdit color="#161616"/>
          </div>
        </div>

        {/* Hero card */}
        <div style={{
          marginTop: 14, borderRadius: 22, overflow: 'hidden',
          border: '1.5px solid #161616',
        }}>
          <div style={{
            background: r.hex, padding: '18px 18px 18px',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{
                fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 10, letterSpacing: 1.6, fontWeight: 700,
                color: '#161616', opacity: 0.65,
              }}>PANTONE</span>
              <span style={{
                fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 10,
                color: '#161616', opacity: 0.6,
              }}>PAG. {r.page} · COER {r.coherence}%</span>
            </div>
            <div style={{
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 74,
              lineHeight: 0.9, letterSpacing: -3, color: '#161616',
              marginTop: 8,
            }}>{r.code.replace(' U','')}<span style={{ fontWeight: 400, opacity: 0.55 }}> U</span></div>
            <div style={{
              fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 13,
              color: '#161616', opacity: 0.75, marginTop: 6,
            }}>{r.name}</div>
          </div>

          {/* Quantità chips inside card */}
          <div style={{
            background: '#fff', borderTop: '1.5px solid #161616',
            padding: '12px',
          }}>
            <div style={{
              fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 10, letterSpacing: 1.6, fontWeight: 700,
              color: 'rgba(0,0,0,0.55)', marginBottom: 8,
            }}>QUANTITÀ</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {['100 g', '300 g', '500 g', '1 kg'].map((q, i) => (
                <div key={q} style={{
                  padding: '10px 0', textAlign: 'center', borderRadius: 99,
                  border: '1.5px solid #161616',
                  background: i === 0 ? '#161616' : '#fff',
                  color: i === 0 ? '#fff' : '#161616',
                  fontFamily: 'Nebulica', fontWeight: 700, fontSize: 13,
                }}>{q}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Formula list */}
        <div style={{
          marginTop: 16, borderRadius: 18, border: '1.5px solid #161616',
          background: '#fff', overflow: 'hidden',
        }}>
          <div style={{
            padding: '12px 14px', display: 'flex', justifyContent: 'space-between',
            background: '#FFF8E0', borderBottom: '1.5px solid #161616',
          }}>
            <span style={{
              fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 11, letterSpacing: 1.4, fontWeight: 700,
              color: '#161616',
            }}>FORMULA</span>
            <span style={{
              fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 11, fontWeight: 700,
              color: '#161616',
            }}>100.0 g totali</span>
          </div>
          {r.inks.map((ink, i) => (
            <div key={ink.name} style={{
              padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
              borderTop: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.06)',
            }}>
              <div style={{
                padding: '4px 10px', borderRadius: 99,
                background: '#161616', color: '#fff',
                fontFamily: 'Nebulica', fontWeight: 700, fontSize: 12,
              }}>{ink.name}</div>
              <div style={{ flex: 1, height: 4, borderRadius: 99, background: 'rgba(0,0,0,0.08)' }}>
                <div style={{ height: '100%', width: `${ink.pct}%`, background: '#161616', borderRadius: 99 }}/>
              </div>
              <div style={{
                fontFamily: 'Nebulica', fontWeight: 700, fontSize: 16, color: '#161616',
                minWidth: 56, textAlign: 'right',
              }}>{ink.grams.toFixed(2)}<span style={{ opacity: 0.45, fontWeight: 400, fontSize: 12 }}> g</span></div>
            </div>
          ))}
        </div>

        {/* Action row */}
        <div style={{
          marginTop: 14, display: 'flex', gap: 10,
        }}>
          <div style={{
            flex: 1, padding: '14px 0', textAlign: 'center', borderRadius: 14,
            background: '#161616', color: '#fff',
            fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 14, fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <IconPrinter color="#fff"/> Stampa etichetta
          </div>
          <div style={{
            padding: '0 14px', display: 'flex', alignItems: 'center', borderRadius: 14,
            border: '1.5px solid #161616', background: '#FFF8E0',
            fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 11, fontWeight: 600,
          }}>{r.project}</div>
        </div>
      </div>
    </Phone>
  );
}

function textOn3(hex) {
  const h = hex.replace('#','');
  const r = parseInt(h.substring(0,2),16);
  const g = parseInt(h.substring(2,4),16);
  const b = parseInt(h.substring(4,6),16);
  return (0.299*r + 0.587*g + 0.114*b)/255 > 0.62 ? '#161616' : '#fff';
}

Object.assign(window, { V3List, V3Detail });
