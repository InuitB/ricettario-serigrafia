// variant4.jsx — Mono Lab utility · JetBrains Mono + Nebulica display · white BG, tabular feel
// Vibe: terminale-da-laboratorio. Filtri visibili come categoria, perché qui ha senso.

function V4List() {
  const bg = '#FFFFFF';
  const accent = '#FF3500';
  const mono = '"JetBrains Mono", ui-monospace, monospace';
  return (
    <Phone bg={bg}>
      <div style={{ padding: '64px 0 0', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>

        {/* Header bar */}
        <div style={{ padding: '8px 22px 0' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontFamily: mono, fontSize: 10, letterSpacing: 0.6, color: '#888',
          }}>
            <span>RIC / SERIGRAFIA / V2.4</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: 99, background: '#00B167' }}/>
              SYNCED
            </span>
          </div>
          <div style={{
            fontFamily: 'Nebulica', fontWeight: 700, fontSize: 44, lineHeight: 0.92,
            letterSpacing: -1.6, color: '#0B0B0B', marginTop: 14,
          }}>Inchiostri<br/>Pantone<span style={{ color: accent }}>.</span></div>
        </div>

        {/* Stat strip */}
        <div style={{
          margin: '18px 22px 0',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          fontFamily: mono, fontSize: 10, color: '#0B0B0B',
          borderTop: '1px solid #0B0B0B', borderBottom: '1px solid #0B0B0B',
          padding: '10px 0',
        }}>
          <div>
            <div style={{ color: '#888' }}>TOTALE</div>
            <div style={{ fontFamily: 'Nebulica', fontWeight: 700, fontSize: 18, letterSpacing: -0.4, marginTop: 2 }}>247</div>
          </div>
          <div style={{ borderLeft: '1px solid rgba(0,0,0,0.1)', paddingLeft: 12 }}>
            <div style={{ color: '#888' }}>ATTIVE</div>
            <div style={{ fontFamily: 'Nebulica', fontWeight: 700, fontSize: 18, letterSpacing: -0.4, marginTop: 2 }}>198</div>
          </div>
          <div style={{ borderLeft: '1px solid rgba(0,0,0,0.1)', paddingLeft: 12 }}>
            <div style={{ color: '#888' }}>BOZZE</div>
            <div style={{ fontFamily: 'Nebulica', fontWeight: 700, fontSize: 18, letterSpacing: -0.4, marginTop: 2 }}>12</div>
          </div>
        </div>

        {/* Search row */}
        <div style={{ margin: '14px 22px 0', display: 'flex', gap: 10 }}>
          <div style={{
            flex: 1, height: 42,
            display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10,
            border: '1px solid #0B0B0B', borderRadius: 0,
          }}>
            <IconSearch color="#0B0B0B"/>
            <span style={{
              fontFamily: mono, fontSize: 13, color: 'rgba(0,0,0,0.4)',
            }}>cerca_pantone()</span>
          </div>
          <div style={{
            width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid #0B0B0B', background: '#0B0B0B',
          }}>
            <IconFilter color="#fff"/>
          </div>
        </div>

        {/* Filters strip — VISIBILE qui perché l'utente li ha attivati */}
        <div style={{
          margin: '10px 22px 0', display: 'flex', gap: 6, flexWrap: 'wrap',
        }}>
          {['tutti', 'azzurro', 'blu', 'giallo', 'rosa', 'rosso', 'verde'].map((f, i) => (
            <span key={f} style={{
              padding: '6px 10px',
              fontFamily: mono, fontSize: 11, fontWeight: 500,
              color: i === 0 ? '#fff' : '#0B0B0B',
              background: i === 0 ? '#0B0B0B' : 'transparent',
              border: '1px solid #0B0B0B',
            }}>{f}</span>
          ))}
        </div>

        {/* Table-style list */}
        <div style={{
          margin: '14px 22px 0', flex: 1, overflow: 'hidden',
          borderTop: '1px solid #0B0B0B',
        }}>
          {/* col headers */}
          <div style={{
            display: 'grid', gridTemplateColumns: '32px 1fr auto auto',
            fontFamily: mono, fontSize: 9, letterSpacing: 0.6, color: '#888',
            padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.1)',
            gap: 10,
          }}>
            <span>HEX</span>
            <span>PMS</span>
            <span style={{ textAlign: 'right' }}>INK</span>
            <span style={{ textAlign: 'right', minWidth: 36 }}>COER</span>
          </div>
          {PANTONES.slice(0, 6).map((p) => (
            <div key={p.code} style={{
              display: 'grid', gridTemplateColumns: '32px 1fr auto auto',
              alignItems: 'center', gap: 10,
              padding: '11px 0', borderBottom: '1px solid rgba(0,0,0,0.08)',
            }}>
              <div style={{ width: 28, height: 28, background: p.hex, border: '1px solid rgba(0,0,0,0.15)' }}/>
              <div>
                <div style={{
                  fontFamily: 'Nebulica', fontWeight: 700, fontSize: 19, color: '#0B0B0B',
                  letterSpacing: -0.6, lineHeight: 1,
                }}>{p.code}</div>
                <div style={{
                  fontFamily: mono, fontSize: 10, color: '#888', marginTop: 3,
                }}>{p.hex.toUpperCase()} · {p.name}</div>
              </div>
              <div style={{
                fontFamily: mono, fontSize: 13, color: '#0B0B0B', fontWeight: 600,
                textAlign: 'right',
              }}>{p.ink}</div>
              <div style={{
                fontFamily: mono, fontSize: 13, color: p.coherence > 85 ? '#00B167' : '#FF3500', fontWeight: 600,
                textAlign: 'right', minWidth: 36,
              }}>{p.coherence}%</div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active={0} accent={accent} restColor="#0B0B0B" bg={bg}/>
    </Phone>
  );
}

function V4Detail() {
  const r = RECIPE_699;
  const bg = '#FFFFFF';
  const accent = '#FF3500';
  const mono = '"JetBrains Mono", ui-monospace, monospace';
  return (
    <Phone bg={bg}>
      <div style={{ padding: '64px 22px 0', height: '100%', boxSizing: 'border-box' }}>

        {/* breadcrumb */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: mono, fontSize: 11, color: '#888',
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <IconBack color="#0B0B0B" sw={2.4}/>
            RIC / 699U
          </span>
          <IconEdit color="#0B0B0B"/>
        </div>

        {/* Hero */}
        <div style={{
          marginTop: 18, padding: '20px 0 20px',
          borderTop: '1.5px solid #0B0B0B',
          borderBottom: '1.5px solid #0B0B0B',
          display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'flex-end', gap: 16,
        }}>
          <div>
            <div style={{
              fontFamily: mono, fontSize: 10, color: '#888', letterSpacing: 0.6,
            }}>PANTONE · PMS</div>
            <div style={{
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 78, lineHeight: 0.85,
              letterSpacing: -3, color: '#0B0B0B', marginTop: 6,
            }}>699<span style={{ fontWeight: 400, opacity: 0.5 }}>U</span></div>
            <div style={{
              fontFamily: mono, fontSize: 11, color: '#0B0B0B', marginTop: 8,
            }}>{r.hex.toUpperCase()} · {r.name}</div>
          </div>
          <div style={{
            width: 84, height: 84, background: r.hex,
            border: '1.5px solid #0B0B0B',
          }}/>
        </div>

        {/* meta strip — small, low priority */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          fontFamily: mono, fontSize: 10, color: '#888',
          padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.1)',
        }}>
          <span>PAG. {r.page} · BOOK U</span>
          <span style={{ textAlign: 'right' }}>COERENZA <span style={{ color: '#00B167' }}>{r.coherence}%</span></span>
        </div>

        {/* Quantità — segmented */}
        <div style={{ marginTop: 16 }}>
          <div style={{
            fontFamily: mono, fontSize: 10, color: '#888', letterSpacing: 0.6, marginBottom: 8,
          }}>QUANTITÀ</div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            border: '1px solid #0B0B0B',
          }}>
            {['100 g', '300 g', '500 g', '1 kg'].map((q, i) => (
              <div key={q} style={{
                padding: '10px 0', textAlign: 'center',
                background: i === 0 ? '#0B0B0B' : '#fff',
                color: i === 0 ? '#fff' : '#0B0B0B',
                fontFamily: mono, fontSize: 13, fontWeight: 600,
                borderRight: i < 3 ? '1px solid #0B0B0B' : 'none',
              }}>{q}</div>
            ))}
          </div>
        </div>

        {/* Formula table */}
        <div style={{ marginTop: 18 }}>
          <div style={{
            fontFamily: mono, fontSize: 10, color: '#888', letterSpacing: 0.6,
            display: 'flex', justifyContent: 'space-between', marginBottom: 6,
          }}>
            <span>FORMULA · 3 INK</span><span>Σ 100.00 g</span>
          </div>
          <div style={{ border: '1px solid #0B0B0B' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '60px 1fr 70px',
              padding: '8px 12px', background: '#0B0B0B', color: '#fff',
              fontFamily: mono, fontSize: 10, letterSpacing: 0.6,
            }}>
              <span>NAME</span><span>RATIO</span><span style={{ textAlign: 'right' }}>GRAMS</span>
            </div>
            {r.inks.map((ink, i) => (
              <div key={ink.name} style={{
                display: 'grid', gridTemplateColumns: '60px 1fr 70px',
                alignItems: 'center', padding: '12px 12px',
                borderTop: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.1)',
                fontFamily: mono,
              }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#0B0B0B' }}>{ink.name}</span>
                <div style={{ height: 8, background: 'rgba(0,0,0,0.08)' }}>
                  <div style={{ height: '100%', background: accent, width: `${ink.pct}%` }}/>
                </div>
                <span style={{
                  fontFamily: 'Nebulica', fontWeight: 700, fontSize: 16, color: '#0B0B0B',
                  textAlign: 'right', letterSpacing: -0.3,
                }}>{ink.grams.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action */}
        <div style={{
          marginTop: 16, display: 'grid', gridTemplateColumns: '1fr auto', gap: 10,
        }}>
          <div style={{
            padding: '14px 0', textAlign: 'center', background: '#0B0B0B', color: '#fff',
            fontFamily: mono, fontSize: 12, fontWeight: 600, letterSpacing: 0.6,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <IconPrinter color="#fff"/> STAMPA_ETICHETTA()
          </div>
          <div style={{
            padding: '0 12px', display: 'flex', alignItems: 'center',
            border: '1px solid #0B0B0B',
            fontFamily: mono, fontSize: 11, color: '#0B0B0B',
            whiteSpace: 'nowrap', maxWidth: 110, overflow: 'hidden', textOverflow: 'ellipsis',
          }}>→ RIS.23</div>
        </div>
      </div>
    </Phone>
  );
}

Object.assign(window, { V4List, V4Detail });
