// variant7.jsx — Wallet Stack · classico iOS Wallet su cream
// Carte Pantone impilate, ogni card si vede dall'alto. Detail con color full-bleed.

function V7List() {
  const bg = '#F2EDE2';
  // visible cards: 1 full + several peeking from underneath
  const cards = PANTONES.slice(0, 6);
  return (
    <Phone bg={bg}>
      <div style={{ padding: '64px 20px 0', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ marginTop: 6 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 32, lineHeight: 0.95,
              letterSpacing: -1, color: '#0B0B0B',
            }}>Ricettario</div>
            <BGToggle active="cream"/>
          </div>
          <div style={{
            fontFamily: 'Nebulica', fontSize: 11, letterSpacing: 1.4, fontWeight: 700,
            color: 'rgba(0,0,0,0.5)', marginTop: 4,
          }}>247 PANTONE · SICO</div>
        </div>

        {/* Search */}
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <div style={{
            flex: 1, height: 44, borderRadius: 14, background: '#fff',
            display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10,
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
          }}>
            <IconSearch color="#0B0B0B"/>
            <span style={{
              fontFamily: 'Nebulica', fontSize: 15, color: 'rgba(0,0,0,0.4)',
            }}>cerca pantone…</span>
          </div>
          <div style={{
            width: 44, height: 44, borderRadius: 14, background: '#fff',
            border: '1px solid rgba(0,0,0,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
          }}>
            <IconFilter color="#0B0B0B"/>
          </div>
        </div>

        {/* Wallet stack */}
        <div style={{
          marginTop: 22, flex: 1, position: 'relative', paddingBottom: 110,
        }}>
          {cards.map((p, i) => {
            // first card is fully expanded; the rest are peek strips
            const isTop = i === 0;
            const peekStep = 64; // height of each peek
            const top = isTop ? 0 : (170 + (i - 1) * peekStep);
            return (
              <div key={p.code} style={{
                position: 'absolute', top, left: 0, right: 0,
                zIndex: cards.length - i,
              }}>
                <WalletCard pantone={p} h={isTop ? 180 : peekStep + 18} peeked={!isTop} peekHeight={peekStep + 18}/>
              </div>
            );
          })}
        </div>
      </div>
      <BottomNav active={0} accent="#0033FF" restColor="#0B0B0B" bg={bg}/>
    </Phone>
  );
}

function V7Detail() {
  const r = RECIPE_699;
  const bg = '#F2EDE2';
  return (
    <Phone bg={bg}>
      {/* full-bleed top hero */}
      <FullBleedHero pantone={r} height={360}/>

      {/* recipe panel */}
      <div style={{
        position: 'absolute', top: 340, left: 0, right: 0, bottom: 0,
        background: bg, borderRadius: '28px 28px 0 0',
        padding: '22px 22px 110px', overflow: 'hidden',
      }}>
        {/* Quantità segmented */}
        <div style={{
          fontFamily: 'Nebulica', fontSize: 11, letterSpacing: 1.4, fontWeight: 700,
          color: 'rgba(0,0,0,0.5)', marginBottom: 10,
        }}>QUANTITÀ</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {['100 g', '300 g', '500 g', '1 kg'].map((q, i) => (
            <div key={q} style={{
              padding: '11px 0', textAlign: 'center', borderRadius: 99,
              background: i === 0 ? '#0B0B0B' : '#fff',
              color: i === 0 ? bg : '#0B0B0B',
              boxShadow: i === 0 ? 'none' : '0 1px 2px rgba(0,0,0,0.04), inset 0 0 0 1px rgba(0,0,0,0.06)',
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 13,
            }}>{q}</div>
          ))}
        </div>

        {/* Formula card */}
        <div style={{
          marginTop: 18, padding: '14px 16px',
          background: '#fff', borderRadius: 20,
          boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 8px 22px rgba(0,0,0,0.06)',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontFamily: 'Nebulica', fontSize: 11, letterSpacing: 1.4, fontWeight: 700,
            color: 'rgba(0,0,0,0.5)',
          }}>
            <span>FORMULA</span>
            <span>100.0 g</span>
          </div>
          {r.inks.map((ink, i) => (
            <div key={ink.name} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 0',
              borderTop: i === 0 ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(0,0,0,0.06)',
              marginTop: i === 0 ? 10 : 0,
            }}>
              <div style={{
                padding: '4px 10px', borderRadius: 99,
                background: '#0B0B0B', color: '#fff',
                fontFamily: 'Nebulica', fontWeight: 700, fontSize: 11,
              }}>{ink.name}</div>
              <div style={{ flex: 1, height: 4, borderRadius: 99, background: 'rgba(0,0,0,0.08)' }}>
                <div style={{ height: '100%', width: `${ink.pct}%`, background: r.hex, borderRadius: 99 }}/>
              </div>
              <div style={{
                fontFamily: 'Nebulica', fontWeight: 700, fontSize: 17,
                color: '#0B0B0B', minWidth: 56, textAlign: 'right',
              }}>{ink.grams.toFixed(2)}<span style={{
                opacity: 0.45, fontWeight: 400, fontSize: 11, marginLeft: 2,
              }}>g</span></div>
            </div>
          ))}
        </div>

        {/* Action */}
        <div style={{
          marginTop: 14, padding: '14px 16px', borderRadius: 16,
          background: '#0B0B0B', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: 'Nebulica', fontSize: 14, fontWeight: 600,
          }}>
            <IconPrinter color="#fff"/> Stampa etichetta
          </span>
          <span style={{
            fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1.2, fontWeight: 700,
            color: r.hex,
          }}>{r.project.toUpperCase()}</span>
        </div>
      </div>
    </Phone>
  );
}

Object.assign(window, { V7List, V7Detail });
