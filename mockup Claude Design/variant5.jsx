// variant5.jsx — Dark Tech · Nebulica + JetBrains Mono · fondo nero, neon
// Vibe: studio professionale, monitor da serigrafia industriale.

function V5List() {
  const bg = '#0B0B10';
  const neon = '#C9FF3D';
  const mono = '"JetBrains Mono", ui-monospace, monospace';
  return (
    <Phone bg={bg} dark>
      <div style={{ padding: '64px 22px 0', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div style={{ marginTop: 8 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontFamily: mono, fontSize: 10, letterSpacing: 0.6,
          }}>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>RIC_PANTONE.LAB</span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '3px 8px', borderRadius: 4,
              background: 'rgba(201,255,61,0.12)', color: neon,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 99, background: neon, boxShadow: `0 0 8px ${neon}` }}/>
              LIVE
            </span>
          </div>
          <div style={{
            fontFamily: 'Nebulica', fontWeight: 700, fontSize: 42, lineHeight: 0.92,
            letterSpacing: -1.4, color: '#fff', marginTop: 16,
          }}>Ricettario<br/><span style={{ color: neon }}>serigrafia/</span></div>
        </div>

        {/* Search */}
        <div style={{ marginTop: 22, display: 'flex', gap: 10 }}>
          <div style={{
            flex: 1, height: 46, borderRadius: 12,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10,
          }}>
            <IconSearch color="rgba(255,255,255,0.6)"/>
            <span style={{
              fontFamily: mono, fontSize: 13, color: 'rgba(255,255,255,0.35)',
            }}>cerca_pantone…</span>
          </div>
          <div style={{
            width: 46, height: 46, borderRadius: 12,
            background: neon, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <IconFilter color="#0B0B10"/>
          </div>
        </div>

        {/* Section bar */}
        <div style={{
          marginTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        }}>
          <div style={{
            fontFamily: mono, fontSize: 10, letterSpacing: 1.4, fontWeight: 700,
            color: 'rgba(255,255,255,0.4)',
          }}>FORMULE · 247</div>
          <div style={{
            fontFamily: mono, fontSize: 10, color: neon,
          }}>↓ recenti</div>
        </div>

        {/* List */}
        <div style={{ marginTop: 12, flex: 1, overflow: 'hidden' }}>
          {PANTONES.slice(0, 5).map((p, i) => (
            <div key={p.code} style={{
              display: 'grid', gridTemplateColumns: '48px 1fr auto', gap: 14,
              alignItems: 'center',
              padding: '14px 0',
              borderTop: i === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              {/* color swatch with glow */}
              <div style={{
                width: 48, height: 48, borderRadius: 8, background: p.hex,
                boxShadow: `0 0 18px ${hexToRGBA(p.hex, 0.35)}`,
              }}/>
              <div>
                <div style={{
                  fontFamily: 'Nebulica', fontWeight: 700, fontSize: 24, color: '#fff',
                  letterSpacing: -0.8, lineHeight: 1,
                }}>{p.code}</div>
                <div style={{
                  fontFamily: mono, fontSize: 10, color: 'rgba(255,255,255,0.4)',
                  marginTop: 4,
                }}>{p.hex.toUpperCase()} · {p.name}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontFamily: 'Nebulica', fontWeight: 700, fontSize: 18, color: neon,
                  letterSpacing: -0.4, lineHeight: 1,
                }}>{p.ink}</div>
                <div style={{
                  fontFamily: mono, fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: 0.8,
                  marginTop: 4,
                }}>INK</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active={0} accent={neon} bg={bg} dark/>
    </Phone>
  );
}

function V5Detail() {
  const r = RECIPE_699;
  const bg = '#0B0B10';
  const neon = '#C9FF3D';
  const mono = '"JetBrains Mono", ui-monospace, monospace';
  return (
    <Phone bg={bg} dark>
      <div style={{ padding: '60px 22px 0', height: '100%', boxSizing: 'border-box' }}>

        {/* Top bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6,
        }}>
          <div style={{
            height: 34, padding: '0 12px 0 8px', borderRadius: 8,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff', fontFamily: mono, fontSize: 12,
          }}>
            <IconBack color="#fff"/> RIC
          </div>
          <div style={{
            width: 34, height: 34, borderRadius: 8, background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <IconEdit color="#fff"/>
          </div>
        </div>

        {/* Hero */}
        <div style={{ marginTop: 22 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.12)',
          }}>
            <div>
              <div style={{
                fontFamily: mono, fontSize: 10, letterSpacing: 1.2,
                color: 'rgba(255,255,255,0.4)',
              }}>PMS · BOOK U</div>
              <div style={{
                fontFamily: 'Nebulica', fontWeight: 700, fontSize: 92, lineHeight: 0.85,
                letterSpacing: -3.5, color: '#fff', marginTop: 6,
              }}>699<span style={{ color: neon, fontWeight: 400 }}>U</span></div>
            </div>
            <div style={{
              width: 64, height: 64, borderRadius: 10, background: r.hex,
              boxShadow: `0 0 30px ${hexToRGBA(r.hex, 0.5)}`,
            }}/>
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontFamily: mono, fontSize: 10, color: 'rgba(255,255,255,0.45)',
            padding: '8px 0',
          }}>
            <span>{r.name} · {r.hex.toUpperCase()}</span>
            <span>PAG.{r.page} · COER <span style={{ color: neon }}>{r.coherence}%</span></span>
          </div>
        </div>

        {/* Quantità */}
        <div style={{ marginTop: 18 }}>
          <div style={{
            fontFamily: mono, fontSize: 10, letterSpacing: 1.2,
            color: 'rgba(255,255,255,0.4)', marginBottom: 8,
          }}>QUANTITÀ</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
            {['100', '300', '500', '1000'].map((g, i) => (
              <div key={g} style={{
                padding: '12px 0', textAlign: 'center', borderRadius: 10,
                background: i === 0 ? neon : 'rgba(255,255,255,0.06)',
                color: i === 0 ? '#0B0B10' : '#fff',
                border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.1)',
                fontFamily: 'Nebulica', fontWeight: 700, fontSize: 16,
                letterSpacing: -0.4,
              }}>{g}<span style={{
                fontFamily: mono, fontSize: 10, opacity: 0.6, marginLeft: 3, fontWeight: 400,
              }}>g</span></div>
            ))}
          </div>
        </div>

        {/* Formula — bar viz */}
        <div style={{ marginTop: 20 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontFamily: mono, fontSize: 10, letterSpacing: 1.2,
            color: 'rgba(255,255,255,0.4)', marginBottom: 10,
          }}>
            <span>FORMULA · {r.inks.length} INK</span>
            <span>Σ 100.00 g</span>
          </div>

          {/* stacked bar */}
          <div style={{
            display: 'flex', height: 14, borderRadius: 99, overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <div style={{ width: `${r.inks[0].pct}%`, background: '#5A6BFF' }}/>
            <div style={{ width: `${r.inks[1].pct}%`, background: neon }}/>
            <div style={{ width: `${r.inks[2].pct}%`, background: '#FF5C39' }}/>
          </div>

          <div style={{ marginTop: 14 }}>
            {r.inks.map((ink, i) => {
              const colors = ['#5A6BFF', neon, '#FF5C39'];
              return (
                <div key={ink.name} style={{
                  display: 'grid', gridTemplateColumns: '14px 1fr auto auto',
                  alignItems: 'center', gap: 12,
                  padding: '13px 0',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: colors[i] }}/>
                  <div style={{
                    fontFamily: 'Nebulica', fontWeight: 700, fontSize: 17, color: '#fff',
                    letterSpacing: -0.3,
                  }}>{ink.name}</div>
                  <div style={{
                    fontFamily: mono, fontSize: 11, color: 'rgba(255,255,255,0.45)',
                  }}>{ink.pct.toFixed(2)}%</div>
                  <div style={{
                    fontFamily: 'Nebulica', fontWeight: 700, fontSize: 18, color: '#fff',
                    minWidth: 70, textAlign: 'right', letterSpacing: -0.5,
                  }}>{ink.grams.toFixed(2)}<span style={{
                    fontFamily: mono, fontSize: 11, opacity: 0.5, fontWeight: 400,
                  }}> g</span></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action */}
        <div style={{
          marginTop: 18, display: 'flex', gap: 10, alignItems: 'center',
        }}>
          <div style={{
            flex: 1, padding: '14px 0', textAlign: 'center', borderRadius: 12,
            background: neon, color: '#0B0B10',
            fontFamily: 'Nebulica', fontSize: 14, fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <IconPrinter color="#0B0B10"/> Stampa etichetta
          </div>
          <div style={{
            padding: '0 12px', height: 46, display: 'flex', alignItems: 'center', borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.15)',
            fontFamily: mono, fontSize: 11, color: 'rgba(255,255,255,0.7)',
          }}>{r.project}</div>
        </div>
      </div>
    </Phone>
  );
}

Object.assign(window, { V5List, V5Detail });
