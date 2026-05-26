// variant8.jsx — Wallet Stack · stato GREY del toggle
// Stessa carta wallet, fondo grigio chiaro caldo. Detail con color full-bleed + recipe.

function V8List() {
  const bg = '#D9D6D0';
  const cards = PANTONES.slice(0, 6);
  return (
    <Phone bg={bg}>
      <div style={{ padding: '64px 20px 0', height: '100%', boxSizing: 'border-box' }}>
        <div style={{ marginTop: 6 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 32, lineHeight: 0.95,
              letterSpacing: -1, color: '#1A1A1A',
            }}>Ricettario</div>
            <BGToggle active="grey"/>
          </div>
          <div style={{
            fontFamily: 'Nebulica', fontSize: 11, letterSpacing: 1.4, fontWeight: 700,
            color: 'rgba(0,0,0,0.5)', marginTop: 4,
          }}>247 PANTONE · SICO</div>
        </div>

        {/* Search */}
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <div style={{
            flex: 1, height: 44, borderRadius: 14, background: 'rgba(255,255,255,0.6)',
            display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10,
            border: '1px solid rgba(0,0,0,0.08)',
            backdropFilter: 'blur(8px)',
          }}>
            <IconSearch color="#1A1A1A"/>
            <span style={{
              fontFamily: 'Nebulica', fontSize: 15, color: 'rgba(0,0,0,0.45)',
            }}>cerca pantone…</span>
          </div>
          <div style={{
            width: 44, height: 44, borderRadius: 14, background: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(0,0,0,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <IconFilter color="#1A1A1A"/>
          </div>
        </div>

        {/* Wallet stack — same layout but cards have softer shadow against the grey */}
        <div style={{
          marginTop: 22, position: 'relative', height: 540,
        }}>
          {cards.map((p, i) => {
            const isTop = i === 0;
            const peekStep = 64;
            const top = isTop ? 0 : (170 + (i - 1) * peekStep);
            return (
              <div key={p.code} style={{
                position: 'absolute', top, left: 0, right: 0,
                zIndex: cards.length - i,
                filter: 'drop-shadow(0 10px 24px rgba(0,0,0,0.10))',
              }}>
                <WalletCard pantone={p} h={isTop ? 180 : peekStep + 18} peeked={!isTop} peekHeight={peekStep + 18}/>
              </div>
            );
          })}
        </div>
      </div>
      <BottomNav active={0} accent="#0033FF" restColor="#1A1A1A" bg={bg}/>
    </Phone>
  );
}

function V8Detail() {
  const r = RECIPE_699;
  const bg = '#D9D6D0';
  return (
    <Phone bg={bg}>
      <FullBleedHero pantone={r} height={360}/>

      <div style={{
        position: 'absolute', top: 340, left: 0, right: 0, bottom: 0,
        background: bg, borderRadius: '28px 28px 0 0',
        padding: '22px 22px 110px', overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12,
        }}>
          <div style={{
            fontFamily: 'Nebulica', fontSize: 11, letterSpacing: 1.4, fontWeight: 700,
            color: 'rgba(0,0,0,0.55)',
          }}>QUANTITÀ</div>
          <BGToggle active="grey"/>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {['100 g', '300 g', '500 g', '1 kg'].map((q, i) => (
            <div key={q} style={{
              padding: '11px 0', textAlign: 'center', borderRadius: 99,
              background: i === 0 ? '#1A1A1A' : 'rgba(255,255,255,0.6)',
              color: i === 0 ? bg : '#1A1A1A',
              backdropFilter: i === 0 ? 'none' : 'blur(8px)',
              border: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.06)',
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 13,
            }}>{q}</div>
          ))}
        </div>

        {/* Formula card */}
        <div style={{
          marginTop: 18, padding: '14px 16px',
          background: 'rgba(255,255,255,0.65)', borderRadius: 20,
          backdropFilter: 'blur(8px)',
          boxShadow: '0 8px 22px rgba(0,0,0,0.06)',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontFamily: 'Nebulica', fontSize: 11, letterSpacing: 1.4, fontWeight: 700,
            color: 'rgba(0,0,0,0.55)',
          }}>
            <span>FORMULA</span>
            <span>100.0 g</span>
          </div>
          {r.inks.map((ink, i) => (
            <div key={ink.name} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 0',
              borderTop: i === 0 ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(0,0,0,0.06)',
              marginTop: i === 0 ? 10 : 0,
            }}>
              <div style={{
                padding: '4px 10px', borderRadius: 99,
                background: '#1A1A1A', color: '#fff',
                fontFamily: 'Nebulica', fontWeight: 700, fontSize: 11,
              }}>{ink.name}</div>
              <div style={{ flex: 1, height: 4, borderRadius: 99, background: 'rgba(0,0,0,0.1)' }}>
                <div style={{ height: '100%', width: `${ink.pct}%`, background: r.hex, borderRadius: 99 }}/>
              </div>
              <div style={{
                fontFamily: 'Nebulica', fontWeight: 700, fontSize: 17,
                color: '#1A1A1A', minWidth: 56, textAlign: 'right',
              }}>{ink.grams.toFixed(2)}<span style={{
                opacity: 0.5, fontWeight: 400, fontSize: 11, marginLeft: 2,
              }}>g</span></div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 14, padding: '14px 16px', borderRadius: 16,
          background: '#1A1A1A', color: '#fff',
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

Object.assign(window, { V8List, V8Detail });
