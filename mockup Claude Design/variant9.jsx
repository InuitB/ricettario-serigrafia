// variant9.jsx — Background a macchie globulari STATICHE + grana
// Card Pantone fluttuano sopra come rettangoli ben staccati (stile V3 detail).

function V9List() {
  return (
    <Phone bg="#F8F4EC">
      {/* Animated/Static blob bg */}
      <BlobBg animated={false} palette="pastel"/>
      <div style={{
        position: 'relative', zIndex: 2,
        padding: '64px 18px 0', height: '100%', boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{ marginTop: 6 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 30, lineHeight: 0.95,
              letterSpacing: -0.8, color: '#0B0B0B',
            }}>Ricettario</div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '5px 10px', borderRadius: 99,
              background: 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(10px)',
              fontFamily: 'Nebulica', fontSize: 10, fontWeight: 700, letterSpacing: 1,
              border: '1px solid rgba(255,255,255,0.8)',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 99, background: '#0033FF' }}/>
              247
            </div>
          </div>
        </div>

        {/* Search — glass */}
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <div style={{
            flex: 1, height: 46, borderRadius: 16,
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(14px) saturate(140%)',
            border: '1px solid rgba(255,255,255,0.8)',
            display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10,
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}>
            <IconSearch color="#0B0B0B"/>
            <span style={{
              fontFamily: 'Nebulica', fontSize: 15, color: 'rgba(0,0,0,0.45)',
            }}>cerca pantone…</span>
          </div>
          <div style={{
            width: 46, height: 46, borderRadius: 16,
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(14px) saturate(140%)',
            border: '1px solid rgba(255,255,255,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <IconFilter color="#0B0B0B"/>
          </div>
        </div>

        {/* Cards floating */}
        <div style={{
          marginTop: 18, flex: 1, overflow: 'hidden',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignContent: 'flex-start',
        }}>
          {PANTONES.slice(0, 6).map((p) => (
            <div key={p.code} style={{
              filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.12))',
            }}>
              <WalletCard pantone={p} h={156}/>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active={0} accent="#0033FF" restColor="#0B0B0B" bg="#F8F4EC"/>
    </Phone>
  );
}

function V9Detail() {
  const r = RECIPE_699;
  return (
    <Phone bg="#F8F4EC">
      <BlobBg animated={false} palette="pastel"/>
      <div style={{
        position: 'relative', zIndex: 2,
        padding: '64px 18px 0', height: '100%', boxSizing: 'border-box',
      }}>
        {/* Top bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6,
        }}>
          <div style={{
            height: 36, padding: '0 14px 0 10px', borderRadius: 99,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.8)',
            fontFamily: 'Nebulica', fontSize: 14, fontWeight: 500,
          }}>
            <IconBack color="#0B0B0B"/> Ricette
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: 99,
            background: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <IconEdit color="#0B0B0B"/>
          </div>
        </div>

        {/* Hero card — floats above the blobs */}
        <div style={{
          marginTop: 16, borderRadius: 28, overflow: 'hidden',
          filter: 'drop-shadow(0 14px 32px rgba(0,0,0,0.14))',
        }}>
          {/* Color half */}
          <div style={{
            background: r.hex, padding: '24px 22px 26px',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{
                fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1.8, fontWeight: 700,
                color: '#0B0B0B', opacity: 0.65,
              }}>PANTONE</span>
              <span style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
                color: '#0B0B0B', opacity: 0.6, letterSpacing: 0.5,
              }}>PAG.{r.page} · COER {r.coherence}%</span>
            </div>
            <div style={{
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 80, lineHeight: 0.88,
              letterSpacing: -3, color: '#0B0B0B', marginTop: 12,
            }}>699<span style={{ fontWeight: 400, opacity: 0.6 }}> U</span></div>
            <div style={{
              fontFamily: 'Nebulica', fontSize: 14, color: '#0B0B0B', opacity: 0.75,
              marginTop: 4,
            }}>{r.name}</div>
          </div>

          {/* Recipe half */}
          <div style={{
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(20px)',
            padding: '18px 22px',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              fontFamily: 'Nebulica', fontSize: 11, letterSpacing: 1.4, fontWeight: 700,
              color: 'rgba(0,0,0,0.55)', marginBottom: 12,
            }}>
              <span>FORMULA · QUANTITÀ 100 g</span>
              <span>3 INK</span>
            </div>
            {r.inks.map((ink, i) => (
              <div key={ink.name} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '12px 0',
                borderTop: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.06)',
              }}>
                <div style={{
                  padding: '3px 9px', borderRadius: 99,
                  background: '#0B0B0B', color: '#fff',
                  fontFamily: 'Nebulica', fontWeight: 700, fontSize: 11,
                }}>{ink.name}</div>
                <div style={{ flex: 1, height: 4, borderRadius: 99, background: 'rgba(0,0,0,0.08)' }}>
                  <div style={{ height: '100%', width: `${ink.pct}%`, background: r.hex, borderRadius: 99 }}/>
                </div>
                <div style={{
                  fontFamily: 'Nebulica', fontWeight: 700, fontSize: 16,
                  color: '#0B0B0B', minWidth: 52, textAlign: 'right',
                }}>{ink.grams.toFixed(2)}<span style={{
                  opacity: 0.5, fontWeight: 400, fontSize: 11, marginLeft: 2,
                }}>g</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* Quantità chips */}
        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {['100 g', '300 g', '500 g', '1 kg'].map((q, i) => (
            <div key={q} style={{
              padding: '10px 0', textAlign: 'center', borderRadius: 99,
              background: i === 0 ? '#0B0B0B' : 'rgba(255,255,255,0.6)',
              color: i === 0 ? '#F8F4EC' : '#0B0B0B',
              backdropFilter: i === 0 ? 'none' : 'blur(12px)',
              border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.8)',
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 12,
            }}>{q}</div>
          ))}
        </div>

        {/* Action */}
        <div style={{
          marginTop: 14, padding: '14px 16px', borderRadius: 16,
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(14px)',
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

Object.assign(window, { V9List, V9Detail });
