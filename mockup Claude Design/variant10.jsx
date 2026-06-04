// variant10.jsx — Background a macchie globulari ANIMATE
// Stessa logica di V9 ma blob in movimento + wallet stack invece di grid.

function V10List() {
  const cards = PANTONES.slice(0, 6);
  return (
    <Phone bg="#FBF7EC">
      <BlobBg animated={true} palette="sunset"/>
      <div style={{
        position: 'relative', zIndex: 2,
        padding: '64px 20px 0', height: '100%', boxSizing: 'border-box',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6,
        }}>
          <div>
            <div style={{
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 30, lineHeight: 0.95,
              letterSpacing: -0.8, color: '#0B0B0B',
            }}>Ricettario</div>
            <div style={{
              fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1.4, fontWeight: 700,
              color: 'rgba(0,0,0,0.55)', marginTop: 2,
            }}>247 · SICO PANTONE</div>
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 10px', borderRadius: 99,
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.8)',
            fontFamily: '"JetBrains Mono", monospace', fontSize: 10, fontWeight: 600,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: '#0033FF', boxShadow: '0 0 6px #0033FF' }}/>
            LIVE
          </div>
        </div>

        {/* Search */}
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <div style={{
            flex: 1, height: 46, borderRadius: 16,
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(14px) saturate(140%)',
            border: '1px solid rgba(255,255,255,0.8)',
            display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10,
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

        {/* Wallet stack */}
        <div style={{
          marginTop: 20, position: 'relative', height: 520,
        }}>
          {cards.map((p, i) => {
            const isTop = i === 0;
            const peekStep = 56;
            const top = isTop ? 0 : (164 + (i - 1) * peekStep);
            return (
              <div key={p.code} style={{
                position: 'absolute', top, left: 0, right: 0,
                zIndex: cards.length - i,
                filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.14))',
              }}>
                <WalletCard pantone={p} h={isTop ? 174 : peekStep + 18} peeked={!isTop} peekHeight={peekStep + 18}/>
              </div>
            );
          })}
        </div>
      </div>
      <BottomNav active={0} accent="#0033FF" restColor="#0B0B0B" bg="#FBF7EC"/>
    </Phone>
  );
}

function V10Detail() {
  const r = RECIPE_699;
  return (
    <Phone bg="#FBF7EC">
      <BlobBg animated={true} palette="sunset"/>
      <div style={{
        position: 'relative', zIndex: 2,
        padding: 0, height: '100%', boxSizing: 'border-box',
      }}>
        {/* full-bleed top hero with rounded bottom */}
        <FullBleedHero pantone={r} height={340} rounded/>

        {/* Glass panel for recipe (raised slightly above the hero) */}
        <div style={{
          position: 'absolute', top: 312, left: 16, right: 16, bottom: 100,
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(20px) saturate(140%)',
          border: '1px solid rgba(255,255,255,0.85)',
          borderRadius: 26, padding: '18px 18px',
          boxShadow: '0 16px 36px rgba(0,0,0,0.10)',
          overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontFamily: 'Nebulica', fontSize: 11, letterSpacing: 1.4, fontWeight: 700,
            color: 'rgba(0,0,0,0.55)',
          }}>
            <span>QUANTITÀ</span><span>FORMULA · 3 ink</span>
          </div>
          <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
            {['100 g', '300 g', '500 g', '1 kg'].map((q, i) => (
              <div key={q} style={{
                padding: '10px 0', textAlign: 'center', borderRadius: 99,
                background: i === 0 ? '#0B0B0B' : 'rgba(255,255,255,0.7)',
                color: i === 0 ? '#FBF7EC' : '#0B0B0B',
                border: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.06)',
                fontFamily: 'Nebulica', fontWeight: 700, fontSize: 12,
              }}>{q}</div>
            ))}
          </div>
          <div style={{ marginTop: 12 }}>
            {r.inks.map((ink, i) => (
              <div key={ink.name} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 0',
                borderTop: '1px solid rgba(0,0,0,0.08)',
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
          <div style={{
            marginTop: 8, padding: '12px 14px', borderRadius: 14,
            background: '#0B0B0B', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: 'Nebulica', fontSize: 13, fontWeight: 600,
            }}>
              <IconPrinter color="#fff"/> Stampa etichetta
            </span>
            <span style={{
              fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1, fontWeight: 700,
              color: r.hex,
            }}>{r.project.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </Phone>
  );
}

Object.assign(window, { V10List, V10Detail });
