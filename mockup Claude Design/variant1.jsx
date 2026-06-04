// variant1.jsx — Editorial Bold · Nebulica all the way · cream BG, big numbers, minimal rules
// Vibe: la versione "amplificata" dell'attuale — meno carta, più tipografia.

function V1List() {
  const bg = '#EFEBE2';
  return (
    <Phone bg={bg}>
      <div style={{ padding: '64px 24px 0', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>

        {/* Header — tight tipografica */}
        <div style={{ marginTop: 10 }}>
          <div style={{
            fontFamily: 'Nebulica', fontWeight: 700, fontSize: 38, lineHeight: 0.92,
            color: '#0B0B0B', letterSpacing: -1.2,
          }}>
            Ricettario
          </div>
          <div style={{
            fontFamily: 'Nebulica', fontWeight: 400, fontSize: 38, lineHeight: 0.92,
            color: '#0B0B0B', letterSpacing: -1.2, fontStyle: 'italic',
            opacity: 0.55, marginTop: 2,
          }}>
            serigrafia.
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            marginTop: 16, paddingBottom: 12,
            borderBottom: '1.5px solid #0B0B0B',
          }}>
            <span style={{ fontFamily: 'Nebulica', fontWeight: 700, fontSize: 11, letterSpacing: 1.5 }}>
              INCHIOSTRI SICO · PANTONE
            </span>
            <span style={{ fontFamily: 'Nebulica', fontWeight: 700, fontSize: 11, letterSpacing: 1.5 }}>
              247
            </span>
          </div>
        </div>

        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginTop: 18,
        }}>
          <div style={{
            flex: 1, height: 46, borderRadius: 99, background: '#fff',
            display: 'flex', alignItems: 'center', padding: '0 18px', gap: 10,
            border: '1px solid rgba(0,0,0,0.08)',
          }}>
            <IconSearch color="#0B0B0B"/>
            <span style={{
              fontFamily: 'Nebulica', fontSize: 16, color: 'rgba(0,0,0,0.35)',
            }}>cerca pantone…</span>
          </div>
          <FilterPill border="rgba(0,0,0,0.15)"/>
        </div>

        {/* List */}
        <div style={{ marginTop: 22, flex: 1, overflow: 'hidden' }}>
          {PANTONES.slice(0, 6).map((p, i) => (
            <div key={p.code} style={{
              display: 'grid', gridTemplateColumns: '54px 1fr auto',
              alignItems: 'center', gap: 14,
              padding: '14px 0',
              borderTop: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.08)',
            }}>
              <div style={{
                width: 54, height: 54, borderRadius: 4, background: p.hex,
                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)',
              }}/>
              <div>
                <div style={{
                  fontFamily: 'Nebulica', fontWeight: 700, fontSize: 28,
                  lineHeight: 1, letterSpacing: -1, color: '#0B0B0B',
                }}>{p.code}</div>
                <div style={{
                  fontFamily: 'Nebulica', fontSize: 12, color: 'rgba(0,0,0,0.5)',
                  marginTop: 4, letterSpacing: 0.2,
                }}>{p.name}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontFamily: 'Nebulica', fontWeight: 700, fontSize: 22, color: '#0B0B0B',
                  lineHeight: 1, letterSpacing: -0.8,
                }}>{p.ink}</div>
                <div style={{
                  fontFamily: 'Nebulica', fontSize: 9, color: 'rgba(0,0,0,0.5)',
                  letterSpacing: 1.2, marginTop: 4, textTransform: 'uppercase',
                }}>inchiostri</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active={0} accent="#0033FF" restColor="#0B0B0B" bg={bg}/>
    </Phone>
  );
}

function V1Detail() {
  const r = RECIPE_699;
  const bg = '#EFEBE2';
  return (
    <Phone bg={bg}>
      <div style={{ padding: '64px 0 0', height: '100%', boxSizing: 'border-box', position: 'relative' }}>

        {/* Top bar */}
        <div style={{
          padding: '0 20px', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{
            height: 36, padding: '0 14px 0 10px', borderRadius: 99,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'transparent',
            fontFamily: 'Nebulica', fontSize: 15, fontWeight: 500,
          }}>
            <IconBack color="#0B0B0B"/> Ricette
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: 99, background: 'rgba(0,0,0,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <IconEdit color="#0B0B0B"/>
          </div>
        </div>

        {/* Hero — pantone code as the page hero */}
        <div style={{ padding: '24px 22px 0' }}>
          <div style={{
            fontFamily: 'Nebulica', fontSize: 11, letterSpacing: 1.4, fontWeight: 700,
            color: 'rgba(0,0,0,0.5)',
          }}>PANTONE</div>
          <div style={{
            fontFamily: 'Nebulica', fontWeight: 700, fontSize: 92, lineHeight: 0.85,
            letterSpacing: -4, color: '#0B0B0B', marginTop: 6,
          }}>699<span style={{ fontWeight: 400, opacity: 0.6 }}> U</span></div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            marginTop: 10, paddingBottom: 14, borderBottom: '1.5px solid #0B0B0B',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 18, height: 18, borderRadius: 2, background: r.hex,
                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.12)',
              }}/>
              <span style={{
                fontFamily: 'Nebulica', fontSize: 14, color: '#0B0B0B',
              }}>{r.name}</span>
            </div>
            <div style={{
              fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1.2, color: 'rgba(0,0,0,0.45)',
            }}>
              PAG. {r.page} · COER. {r.coherence}%
            </div>
          </div>
        </div>

        {/* Quantità presets — segmented, niente pill arrotondatissime */}
        <div style={{ padding: '18px 22px 0' }}>
          <div style={{
            fontFamily: 'Nebulica', fontSize: 11, letterSpacing: 1.4, fontWeight: 700,
            color: 'rgba(0,0,0,0.5)', marginBottom: 10,
          }}>QUANTITÀ</div>
          <div style={{ display: 'flex', gap: 0, border: '1.5px solid #0B0B0B', borderRadius: 99, overflow: 'hidden' }}>
            {['100 g', '300 g', '500 g', '1 kg'].map((q, i) => (
              <div key={q} style={{
                flex: 1, textAlign: 'center', padding: '12px 0',
                background: i === 0 ? '#0B0B0B' : 'transparent',
                color: i === 0 ? bg : '#0B0B0B',
                fontFamily: 'Nebulica', fontWeight: 700, fontSize: 15,
                borderLeft: i === 0 ? 'none' : '1.5px solid #0B0B0B',
              }}>{q}</div>
            ))}
          </div>
        </div>

        {/* Formula */}
        <div style={{ padding: '20px 22px 0' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            marginBottom: 10,
          }}>
            <div style={{
              fontFamily: 'Nebulica', fontSize: 11, letterSpacing: 1.4, fontWeight: 700,
              color: 'rgba(0,0,0,0.5)',
            }}>FORMULA</div>
            <div style={{
              fontFamily: 'Nebulica', fontSize: 11, letterSpacing: 1.4, fontWeight: 700,
              color: 'rgba(0,0,0,0.5)',
            }}>100.0 g</div>
          </div>

          {r.inks.map((ink, i) => (
            <div key={ink.name} style={{
              padding: '14px 0', borderTop: i === 0 ? '1.5px solid #0B0B0B' : '1px solid rgba(0,0,0,0.08)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{
                  fontFamily: 'Nebulica', fontWeight: 700, fontSize: 17, letterSpacing: -0.3,
                }}>{ink.name}</span>
                <span style={{
                  fontFamily: 'Nebulica', fontWeight: 700, fontSize: 22, letterSpacing: -0.5,
                }}>{ink.grams.toFixed(2)} <span style={{ opacity: 0.4, fontWeight: 400 }}>g</span></span>
              </div>
              <div style={{
                height: 3, marginTop: 8, background: 'rgba(0,0,0,0.08)', borderRadius: 99,
              }}>
                <div style={{
                  height: '100%', width: `${ink.pct}%`, background: '#0B0B0B', borderRadius: 99,
                }}/>
              </div>
            </div>
          ))}

          {/* Bottom CTAs */}
          <div style={{
            marginTop: 22, padding: '16px 0', borderTop: '1.5px solid #0B0B0B',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{
              fontFamily: 'Nebulica', fontSize: 11, letterSpacing: 1.4, fontWeight: 700,
            }}>PROGETTO · {r.project.toUpperCase()}</span>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 13,
            }}>
              <IconPrinter color="#0B0B0B"/> ETICHETTA
            </div>
          </div>
        </div>
      </div>
    </Phone>
  );
}

Object.assign(window, { V1List, V1Detail });
