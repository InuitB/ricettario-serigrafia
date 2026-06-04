// variant11.jsx — Editorial Wallet · masthead da rivista + wallet stack
// Mix di V6 (vocabolario editoriale) e V7 (carte wallet). Detail con full-bleed.

function V11List() {
  const bg = '#F1ECDF';
  const ink = '#1A1612';
  const cards = PANTONES.slice(0, 6);
  return (
    <Phone bg={bg}>
      <div style={{ padding: '64px 20px 0', height: '100%', boxSizing: 'border-box' }}>
        {/* Editorial masthead */}
        <div style={{
          marginTop: 6, paddingBottom: 12, borderBottom: '1px solid ' + ink,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        }}>
          <div>
            <div style={{
              fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 9, letterSpacing: 1.8, fontWeight: 700,
              color: ink, textTransform: 'uppercase',
            }}>VOL. IV · PANTONE U · SICO</div>
            <div style={{
              fontFamily: '"Instrument Serif", serif',
              fontWeight: 400, fontSize: 44, lineHeight: 0.9,
              color: ink, marginTop: 4, letterSpacing: -1,
            }}>Ricettario,<br/><em style={{ fontStyle: 'italic' }}>serigrafia.</em></div>
          </div>
          <BGToggle active="cream"/>
        </div>

        {/* Search */}
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <div style={{
            flex: 1, height: 44,
            borderBottom: '1.5px solid ' + ink,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <IconSearch color={ink}/>
            <span style={{
              fontFamily: '"Instrument Serif", serif', fontSize: 18, fontStyle: 'italic',
              color: 'rgba(0,0,0,0.45)',
            }}>cerca pantone…</span>
          </div>
          <div style={{
            width: 44, height: 44, borderRadius: 99, border: '1.5px solid ' + ink,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <IconFilter color={ink}/>
          </div>
        </div>

        {/* Section */}
        <div style={{
          marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        }}>
          <span style={{
            fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 10, letterSpacing: 1.6, fontWeight: 700,
            color: ink,
          }}>FORMULE — IN ARCHIVIO</span>
          <span style={{
            fontFamily: '"Instrument Serif", serif', fontSize: 14, fontStyle: 'italic',
            color: 'rgba(0,0,0,0.5)',
          }}>247 voci</span>
        </div>

        {/* Wallet stack — slightly less dense */}
        <div style={{
          marginTop: 12, position: 'relative', height: 480,
        }}>
          {cards.map((p, i) => {
            const isTop = i === 0;
            const peekStep = 58;
            const top = isTop ? 0 : (160 + (i - 1) * peekStep);
            return (
              <div key={p.code} style={{
                position: 'absolute', top, left: 0, right: 0,
                zIndex: cards.length - i,
                filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.10))',
              }}>
                <WalletCard pantone={p} h={isTop ? 170 : peekStep + 18} peeked={!isTop} peekHeight={peekStep + 18}/>
              </div>
            );
          })}
        </div>
      </div>
      <BottomNav active={0} accent="#A02525" restColor={ink} bg={bg}/>
    </Phone>
  );
}

function V11Detail() {
  const r = RECIPE_699;
  const bg = '#F1ECDF';
  const ink = '#1A1612';
  const accent = '#A02525';
  return (
    <Phone bg={bg}>
      <FullBleedHero pantone={r} height={340}/>

      <div style={{
        position: 'absolute', top: 320, left: 0, right: 0, bottom: 0,
        background: bg, borderRadius: '28px 28px 0 0',
        padding: '22px 22px 110px', overflow: 'hidden',
      }}>
        {/* Editorial section bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          paddingBottom: 10, borderBottom: '1.5px solid ' + ink,
        }}>
          <span style={{
            fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 10, letterSpacing: 1.6, fontWeight: 700,
            color: ink,
          }}>QUANTITÀ</span>
          <span style={{
            fontFamily: '"Instrument Serif", serif', fontSize: 15, fontStyle: 'italic',
            color: 'rgba(0,0,0,0.55)',
          }}>da produrre</span>
        </div>

        {/* Quantità as inline editorial choices */}
        <div style={{
          marginTop: 12, display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap',
        }}>
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

        {/* Formula */}
        <div style={{
          marginTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          paddingBottom: 8, borderBottom: '1.5px solid ' + ink,
        }}>
          <span style={{
            fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 10, letterSpacing: 1.6, fontWeight: 700,
            color: ink,
          }}>FORMULA</span>
          <span style={{
            fontFamily: '"Instrument Serif", serif', fontSize: 14, fontStyle: 'italic',
            color: 'rgba(0,0,0,0.55)',
          }}>tre componenti — totale 100 g</span>
        </div>

        {r.inks.map((ink_, i) => (
          <div key={ink_.name} style={{
            display: 'grid', gridTemplateColumns: '1fr auto',
            columnGap: 14, alignItems: 'baseline',
            padding: '12px 0', borderBottom: '1px solid rgba(0,0,0,0.12)',
          }}>
            <div style={{
              display: 'flex', alignItems: 'baseline', gap: 10,
            }}>
              <span style={{
                fontFamily: '"Instrument Serif", serif', fontSize: 13, fontStyle: 'italic',
                color: 'rgba(0,0,0,0.5)', minWidth: 16,
              }}>{romanize(i + 1)}.</span>
              <span style={{
                fontFamily: 'Nebulica', fontWeight: 700, fontSize: 18, color: ink,
                letterSpacing: -0.3,
              }}>{ink_.name}</span>
              <span style={{
                flex: 1, borderBottom: '1px dotted rgba(0,0,0,0.35)', transform: 'translateY(-4px)',
              }}/>
            </div>
            <div style={{
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 20, color: ink,
              letterSpacing: -0.4,
            }}>{ink_.grams.toFixed(2)}<span style={{
              fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 13,
              opacity: 0.55, fontWeight: 400, marginLeft: 3,
            }}>g</span></div>
          </div>
        ))}

        <div style={{
          marginTop: 10, display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 0',
        }}>
          <IconPrinter color={ink}/>
          <span style={{
            fontFamily: '"Instrument Serif", serif', fontSize: 18, fontStyle: 'italic', color: ink,
          }}>Stampa etichetta</span>
          <span style={{ flex: 1 }}/>
          <span style={{
            fontFamily: '"Bricolage Grotesque", Nebulica', fontSize: 10, letterSpacing: 1.4, fontWeight: 700,
            color: accent,
          }}>→ {r.project.toUpperCase()}</span>
        </div>
      </div>
    </Phone>
  );
}

Object.assign(window, { V11List, V11Detail });
