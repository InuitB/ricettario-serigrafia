// variant6.jsx — Magazine Index · Instrument Serif + Nebulica · stile editoriale
// Vibe: indice di una rivista d'arte / catalogo di pigmenti. Numeri romani romantici.

function V6List() {
  const bg = '#F2EDE2';
  const ink = '#1A1612';
  return (
    <Phone bg={bg}>
      <div style={{ padding: '64px 24px 0', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>

        {/* Masthead */}
        <div style={{ marginTop: 8, paddingBottom: 12, borderBottom: '1px solid ' + ink }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 10, letterSpacing: 1.6, fontWeight: 600,
            color: ink, textTransform: 'uppercase',
          }}>
            <span style={{ whiteSpace: 'nowrap' }}>Vol. IV · Pantone</span>
            <span style={{ whiteSpace: 'nowrap' }}>Estate 26</span>
          </div>
          <div style={{
            fontFamily: '"Instrument Serif", "Times New Roman", serif',
            fontWeight: 400, fontSize: 56, lineHeight: 0.92,
            color: ink, marginTop: 6, letterSpacing: -1.5,
          }}>Ricettario,<br/><em style={{ fontStyle: 'italic' }}>serigrafia.</em></div>
        </div>

        {/* Search row */}
        <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
          <div style={{
            flex: 1, height: 44,
            borderBottom: '1.5px solid ' + ink,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <IconSearch color={ink}/>
            <span style={{
              fontFamily: '"Instrument Serif", serif', fontSize: 19, fontStyle: 'italic',
              color: 'rgba(0,0,0,0.45)',
            }}>cerca pantone…</span>
          </div>
          <div style={{
            width: 44, height: 44, borderRadius: 99,
            border: '1.5px solid ' + ink,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <IconFilter color={ink}/>
          </div>
        </div>

        {/* Section label */}
        <div style={{
          marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        }}>
          <div style={{
            fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 10, letterSpacing: 1.8, fontWeight: 700,
            color: ink, textTransform: 'uppercase',
          }}>Indice formule</div>
          <div style={{
            fontFamily: '"Instrument Serif", serif', fontSize: 16, fontStyle: 'italic', color: 'rgba(0,0,0,0.5)',
          }}>247 voci</div>
        </div>

        {/* Index list */}
        <div style={{ marginTop: 10, flex: 1, overflow: 'hidden' }}>
          {PANTONES.slice(0, 6).map((p, i) => (
            <div key={p.code} style={{
              display: 'grid', gridTemplateColumns: '22px 1fr auto',
              alignItems: 'baseline', columnGap: 14,
              padding: '14px 0', borderTop: '1px solid rgba(0,0,0,0.15)',
            }}>
              <div style={{
                fontFamily: '"Instrument Serif", serif', fontSize: 14,
                color: 'rgba(0,0,0,0.45)', fontStyle: 'italic',
              }}>{romanize(i + 1)}</div>
              <div style={{
                display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 12, alignItems: 'center',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 99, background: p.hex,
                  boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.15)',
                }}/>
                <div>
                  <div style={{
                    display: 'flex', alignItems: 'baseline', gap: 10,
                  }}>
                    <span style={{
                      fontFamily: 'Nebulica', fontWeight: 700, fontSize: 22, letterSpacing: -0.5,
                      color: ink, lineHeight: 1,
                    }}>{p.code}</span>
                    <span style={{
                      flex: 1, borderBottom: '1px dotted rgba(0,0,0,0.35)',
                      transform: 'translateY(-3px)',
                    }}/>
                  </div>
                  <div style={{
                    fontFamily: '"Instrument Serif", serif', fontSize: 14, fontStyle: 'italic',
                    color: 'rgba(0,0,0,0.55)', marginTop: 2,
                  }}>{p.name}</div>
                </div>
              </div>
              <div style={{
                textAlign: 'right', fontFamily: 'Nebulica', fontWeight: 700, fontSize: 18,
                color: ink, letterSpacing: -0.3, lineHeight: 1,
                alignSelf: 'center',
              }}>{p.ink}<span style={{
                fontFamily: '"Instrument Serif", serif', fontSize: 12, fontStyle: 'italic',
                opacity: 0.55, fontWeight: 400, marginLeft: 4,
              }}>ink</span></div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active={0} accent="#A02525" restColor={ink} bg={bg}/>
    </Phone>
  );
}

function V6Detail() {
  const r = RECIPE_699;
  const bg = '#F2EDE2';
  const ink = '#1A1612';
  const accent = '#A02525';
  return (
    <Phone bg={bg}>
      <div style={{ padding: '60px 24px 0', height: '100%', boxSizing: 'border-box' }}>

        {/* Top bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: 6,
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: '"Instrument Serif", serif', fontSize: 17, fontStyle: 'italic', color: ink,
          }}>
            <IconBack color={ink}/> ricette
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{
              fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 9, letterSpacing: 1.4, fontWeight: 700,
              color: ink, opacity: 0.6,
            }}>VOL.IV / N.{r.page}</span>
            <IconEdit color={ink}/>
          </div>
        </div>

        {/* Masthead */}
        <div style={{
          marginTop: 18, paddingBottom: 14, borderBottom: '1.5px solid ' + ink,
        }}>
          <div style={{
            fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 10, letterSpacing: 1.6, fontWeight: 700,
            color: 'rgba(0,0,0,0.5)',
          }}>PANTONE · UNCOATED</div>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 10, marginTop: 4,
          }}>
            <div style={{
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 84, lineHeight: 0.88,
              letterSpacing: -3, color: ink,
            }}>699 <span style={{
              fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontWeight: 400,
              color: accent,
            }}>U</span></div>
            <div style={{
              width: 60, height: 60, borderRadius: 999, background: r.hex,
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.15)',
            }}/>
          </div>
          <div style={{
            fontFamily: '"Instrument Serif", serif', fontSize: 22, fontStyle: 'italic',
            color: ink, marginTop: 4,
          }}>{r.name.toLowerCase()}<span style={{ color: 'rgba(0,0,0,0.4)' }}> — pag. {r.page} · coer. {r.coherence}%</span></div>
        </div>

        {/* Quantità */}
        <div style={{ marginTop: 16 }}>
          <div style={{
            fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 10, letterSpacing: 1.6, fontWeight: 700,
            color: 'rgba(0,0,0,0.5)', marginBottom: 8,
          }}>QUANTITÀ DA PRODURRE</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
            {[
              { v: '100', u: 'g', a: true },
              { v: '300', u: 'g', a: false },
              { v: '500', u: 'g', a: false },
              { v: '1', u: 'kg', a: false },
            ].map((q, i) => (
              <div key={i} style={{
                display: 'inline-flex', alignItems: 'baseline', gap: 3,
                borderBottom: q.a ? '2.5px solid ' + accent : '2.5px solid transparent',
                paddingBottom: 4,
              }}>
                <span style={{
                  fontFamily: 'Nebulica', fontWeight: 700, fontSize: 22,
                  letterSpacing: -0.5, color: q.a ? ink : 'rgba(0,0,0,0.4)',
                }}>{q.v}</span>
                <span style={{
                  fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 14,
                  color: q.a ? ink : 'rgba(0,0,0,0.4)',
                }}>{q.u}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Formula */}
        <div style={{ marginTop: 22 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            paddingBottom: 8, borderBottom: '1.5px solid ' + ink,
          }}>
            <span style={{
              fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 10, letterSpacing: 1.6, fontWeight: 700,
              color: ink,
            }}>FORMULA</span>
            <span style={{
              fontFamily: '"Instrument Serif", serif', fontSize: 16, fontStyle: 'italic',
              color: 'rgba(0,0,0,0.6)',
            }}>tre componenti</span>
          </div>

          {r.inks.map((ink_, i) => (
            <div key={ink_.name} style={{
              display: 'grid', gridTemplateColumns: '1fr auto',
              columnGap: 14, alignItems: 'baseline',
              padding: '14px 0',
              borderBottom: '1px solid rgba(0,0,0,0.12)',
            }}>
              <div style={{
                display: 'flex', alignItems: 'baseline', gap: 10,
              }}>
                <span style={{
                  fontFamily: '"Instrument Serif", serif', fontSize: 14, fontStyle: 'italic',
                  color: 'rgba(0,0,0,0.5)', minWidth: 18,
                }}>{romanize(i + 1)}.</span>
                <span style={{
                  fontFamily: 'Nebulica', fontWeight: 700, fontSize: 20, color: ink,
                  letterSpacing: -0.4,
                }}>{ink_.name}</span>
                <span style={{
                  flex: 1, borderBottom: '1px dotted rgba(0,0,0,0.35)', transform: 'translateY(-4px)',
                }}/>
              </div>
              <div style={{
                fontFamily: 'Nebulica', fontWeight: 700, fontSize: 24, color: ink,
                letterSpacing: -0.6,
              }}>{ink_.grams.toFixed(2)}<span style={{
                fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 15,
                opacity: 0.55, fontWeight: 400, marginLeft: 3,
              }}>g</span></div>
            </div>
          ))}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            padding: '12px 0',
          }}>
            <span style={{
              fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 10, letterSpacing: 1.6, fontWeight: 700,
              color: ink,
            }}>TOTALE</span>
            <span style={{
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 26, color: accent,
              letterSpacing: -0.5,
            }}>100.00<span style={{
              fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 16,
              opacity: 0.7, fontWeight: 400, marginLeft: 3,
            }}>g</span></span>
          </div>
        </div>

        {/* Action */}
        <div style={{
          marginTop: 8, display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 0', borderTop: '1.5px solid ' + ink,
        }}>
          <IconPrinter color={ink}/>
          <span style={{
            fontFamily: '"Instrument Serif", serif', fontSize: 20, fontStyle: 'italic', color: ink,
          }}>Stampa etichetta</span>
          <span style={{ flex: 1 }}/>
          <span style={{
            fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 10, letterSpacing: 1.6, fontWeight: 700,
            color: accent,
          }}>→ {r.project.toUpperCase()}</span>
        </div>
      </div>
    </Phone>
  );
}

function romanize(num) {
  const map = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  return map[num] || String(num);
}

Object.assign(window, { V6List, V6Detail, romanize });
