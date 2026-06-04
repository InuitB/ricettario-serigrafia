// shared5.jsx — WalletProto v3 — FINAL refinements
// Tutti i fix:
// - Ink count assoluto top-right (non si sposta tra peek e expanded)
// - Search bar e filter pill totalmente stondate
// - Nomi inchiostri e grammature più grandi
// - "U" del codice in Nebulica (esplicito, weight 400)
// - Lista scrollabile con dataset reale (~25 cards)
// - Mask fade al top del container: le card svaniscono prima di toccare la search bar

const PHONE_H = 780;
const STACK_TOP = 210;      // top of stack area (clear below search)
const STACK_BOTTOM_INSET = 108;  // clear above nav
const STACK_H = PHONE_H - STACK_TOP - STACK_BOTTOM_INSET;  // 462

function ensureBlobKeyframesV3() {
  if (document.getElementById('wp3-blob-kf')) return;
  const s = document.createElement('style');
  s.id = 'wp3-blob-kf';
  s.textContent = `
    @keyframes wp3blob1 { 0%{transform:translate(0,0) scale(1);} 50%{transform:translate(50px,-25px) scale(1.15);} 100%{transform:translate(0,0) scale(1);} }
    @keyframes wp3blob2 { 0%{transform:translate(0,0) scale(1);} 50%{transform:translate(-40px,35px) scale(1.1);} 100%{transform:translate(0,0) scale(1);} }
    @keyframes wp3blob3 { 0%{transform:translate(0,0) scale(0.95);} 50%{transform:translate(25px,45px) scale(1.12);} 100%{transform:translate(0,0) scale(0.95);} }
  `;
  document.head.appendChild(s);
}

// ─── Card v3 ────────────────────────────────────────────────────────────────
function WalletCardV3({ pantone, expanded }) {
  const fg = textOn4(pantone.hex);
  return (
    <div style={{
      width: '100%', height: '100%',
      borderRadius: 22, background: pantone.hex,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Ink count — FIXED top-right (never moves) */}
      <div style={{
        position: 'absolute', top: 14, right: 18,
        fontFamily: 'Nebulica', fontSize: 11, fontWeight: 600,
        color: fg, opacity: 0.78,
        display: 'inline-flex', alignItems: 'center', gap: 5,
      }}>
        <span style={{ width: 5, height: 5, borderRadius: 99, background: fg, opacity: 0.5 }}/>
        {pantone.ink} ink
      </div>

      {/* Code — BIG, top-left (visible in peek) */}
      <div style={{
        position: 'absolute', top: 12, left: 18, right: 18,
        fontFamily: 'Nebulica', fontWeight: 700,
        fontSize: expanded ? 66 : 38,
        lineHeight: 0.85,
        letterSpacing: expanded ? -2.3 : -1.3,
        color: fg,
        transition: 'font-size .35s, letter-spacing .35s',
        whiteSpace: 'nowrap',
      }}>
        {pantone.code.replace(' U','').replace('Black','BLACK')}
        {pantone.code.includes(' U') && (
          <span style={{
            fontFamily: 'Nebulica',
            fontWeight: 400,
            opacity: 0.7,
            letterSpacing: expanded ? -1.2 : -0.6,
          }}> U</span>
        )}
      </div>

      {/* Bottom — NAME + PAG/COER, visible when expanded */}
      <div style={{
        position: 'absolute', left: 18, right: 18, bottom: 14,
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12,
        opacity: expanded ? 1 : 0, transition: 'opacity .25s',
      }}>
        <span style={{
          fontFamily: 'Nebulica', fontSize: 15, fontWeight: 500,
          color: fg, opacity: 0.9, whiteSpace: 'nowrap',
          overflow: 'hidden', textOverflow: 'ellipsis', flex: 1,
        }}>{pantone.name}</span>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
          color: fg, opacity: 0.6, letterSpacing: 0.6,
          whiteSpace: 'nowrap',
        }}>PAG.{pantone.page} · COER {pantone.coherence}%</span>
      </div>
    </div>
  );
}

// ─── Recipe sheet v3 — bigger ink names + grams ─────────────────────────────
function RecipeSheetV4({ pantone, pillBorders }) {
  const r = RECIPE_699;
  return (
    <div style={{
      background: 'rgba(255,255,255,0.9)',
      backdropFilter: 'blur(20px) saturate(140%)',
      border: pillBorders ? '1.5px solid #0B0B0B' : '1px solid rgba(255,255,255,0.85)',
      borderRadius: 28, padding: '16px 18px 14px',
      boxShadow: pillBorders ? '0 18px 40px rgba(0,0,0,0.10)' : '0 18px 40px rgba(0,0,0,0.10), 0 1px 0 rgba(0,0,0,0.04)',
    }}>
      <div style={{
        fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1.4, fontWeight: 700,
        color: 'rgba(0,0,0,0.55)',
      }}>QUANTITÀ</div>
      <div style={{ marginTop: 7, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 7 }}>
        {['100 g', '300 g', '500 g', '1 kg'].map((q, i) => (
          <div key={q} style={{
            padding: '10px 0', textAlign: 'center', borderRadius: 99,
            background: i === 0 ? '#0B0B0B' : 'rgba(255,255,255,0.6)',
            color: i === 0 ? '#fff' : '#0B0B0B',
            border: pillBorders
              ? '1.5px solid #0B0B0B'
              : (i === 0 ? 'none' : '1px solid rgba(0,0,0,0.08)'),
            fontFamily: 'Nebulica', fontWeight: 700, fontSize: 13,
          }}>{q}</div>
        ))}
      </div>

      <div style={{
        marginTop: 14, display: 'flex', justifyContent: 'space-between',
        fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1.4, fontWeight: 700,
        color: 'rgba(0,0,0,0.55)',
      }}>
        <span>FORMULA · 3 INK</span><span>Σ 100.0 g</span>
      </div>
      <div style={{ marginTop: 4 }}>
        {r.inks.map((ink, i) => (
          <div key={ink.name} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 0',
            borderTop: '1px solid rgba(0,0,0,0.08)',
          }}>
            {/* INK NAME — bigger */}
            <div style={{
              padding: '6px 14px', borderRadius: 99,
              background: '#0B0B0B', color: '#fff',
              border: pillBorders ? '1.5px solid #0B0B0B' : 'none',
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 14,
              whiteSpace: 'nowrap', minWidth: 72, textAlign: 'center',
              letterSpacing: -0.2,
            }}>{ink.name}</div>
            <div style={{ flex: 1, height: 5, borderRadius: 99, background: 'rgba(0,0,0,0.08)' }}>
              <div style={{ height: '100%', width: `${ink.pct}%`, background: pantone.hex, borderRadius: 99 }}/>
            </div>
            {/* GRAMS — bigger */}
            <div style={{
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 20,
              color: '#0B0B0B', minWidth: 64, textAlign: 'right',
              letterSpacing: -0.5,
            }}>{ink.grams.toFixed(2)}<span style={{
              opacity: 0.45, fontWeight: 400, fontSize: 12, marginLeft: 2,
            }}>g</span></div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ marginTop: 12 }}>
        <div style={{
          height: 44, borderRadius: 99,
          background: '#fff',
          border: pillBorders ? '1.5px solid #0B0B0B' : '1px solid rgba(0,0,0,0.08)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          fontFamily: 'Nebulica', fontSize: 14, fontWeight: 700, color: '#0B0B0B',
          boxShadow: pillBorders ? 'none' : '0 1px 2px rgba(0,0,0,0.04)',
          width: '100%',
        }}>
          <IconPrinter color="#0B0B0B"/> Stampa etichetta
        </div>
      </div>
      <div style={{
        marginTop: 8, display: 'flex', justifyContent: 'space-between',
        fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1.4, fontWeight: 700,
        color: 'rgba(0,0,0,0.55)',
      }}>
        <span>PROGETTO</span>
        <span style={{ color: '#0B0B0B' }}>→ {r.project}</span>
      </div>
    </div>
  );
}

// ─── Main proto v3 ──────────────────────────────────────────────────────────
function WalletProtoV3({
  exitMode    = 'fadeScale',    // 'fadeScale' (V25) | 'fanOut' (V26) | 'slideDown' (V27)
  recipeMode  = 'rise',         // 'rise' | 'scaleFromCard'
  openDur     = 520,
  closeDur    = 380,
  openEase    = 'cubic-bezier(.34, 1.42, .64, 1)',
  closeEase   = 'cubic-bezier(.4, 0, .2, 1)',
  pillBorders = true,
  detailTop   = 138,
  recipeBottom= 110,
  recipeRiseFrom = 100,
  cards       = null,
  label       = '',
  bg          = '#F4EFE2',
}) {
  ensureBlobKeyframesV3();
  const list = cards || PANTONES_BIG;
  const PEEK_H = 76;
  const ACTIVE_H = 178;
  const innerStackH = Math.max(STACK_H, (list.length - 1) * PEEK_H + ACTIVE_H + 30);
  const maxScroll = Math.max(0, innerStackH - STACK_H);

  const [selectedIdx, setSelectedIdx] = React.useState(null);
  const [closing, setClosing]   = React.useState(false);
  const [scrollOffset, setScrollOffset] = React.useState(maxScroll); // start at bottom (front cards visible)
  const touchStartY = React.useRef(0);
  const touchStartOff = React.useRef(0);

  const isDetail = selectedIdx !== null;
  const selected = isDetail ? list[selectedIdx] : null;
  const dur  = closing ? closeDur : openDur;
  const ease = closing ? closeEase : openEase;

  const onCardClick = (i) => {
    if (isDetail) return;
    setClosing(false);
    setSelectedIdx(i);
  };
  const onBack = () => {
    setClosing(true);
    setTimeout(() => {
      setSelectedIdx(null);
      setClosing(false);
    }, closeDur);
  };

  // Scroll handlers
  const onWheel = (e) => {
    if (isDetail) return;
    e.preventDefault();
    e.stopPropagation();
    setScrollOffset(o => Math.max(0, Math.min(maxScroll, o + e.deltaY * 0.7)));
  };
  const onTouchStart = (e) => {
    if (isDetail) return;
    touchStartY.current = e.touches[0].clientY;
    touchStartOff.current = scrollOffset;
  };
  const onTouchMove = (e) => {
    if (isDetail) return;
    const dy = touchStartY.current - e.touches[0].clientY;
    setScrollOffset(Math.max(0, Math.min(maxScroll, touchStartOff.current + dy)));
  };

  // Compute card position in PHONE coords directly
  const computeCardPos = (i) => {
    const stackPosTop = (innerStackH - ACTIVE_H) - i * PEEK_H;  // pos in stack
    const listVisualTop = STACK_TOP + stackPosTop - scrollOffset;

    if (!isDetail) {
      return { top: listVisualTop, opacity: 1, z: list.length - i, tx: 0, ty: 0, scale: 1, rot: 0 };
    }
    if (i === selectedIdx) {
      return { top: detailTop, opacity: 1, z: 999, tx: 0, ty: 0, scale: 1, rot: 0 };
    }
    // Other cards exit
    switch (exitMode) {
      case 'shrinkBack': {
        // Apple Watch stacks vibe: cards recede toward a vanishing point above,
        // shrinking and fading at the same time.
        const VANISH_Y = 70;
        const ty = (VANISH_Y - listVisualTop) - 30; // converge toward phone-top area
        return { top: listVisualTop, opacity: 0, z: 1, tx: 0, ty, scale: 0.55, rot: 0 };
      }
      case 'fanOut': {
        const phase = (i - selectedIdx + 1000) % 4;
        const dirs = [
          { tx: -220, ty: -160, rot: -10 },
          { tx:  220, ty: -160, rot:  10 },
          { tx: -220, ty:  260, rot: -10 },
          { tx:  220, ty:  260, rot:  10 },
        ];
        const d = dirs[phase];
        return { top: listVisualTop, opacity: 0, z: 1, tx: d.tx, ty: d.ty, scale: 0.86, rot: d.rot };
      }
      case 'slideDown': {
        return { top: 900, opacity: 0, z: 1, tx: 0, ty: 0, scale: 1, rot: 0 };
      }
      case 'fadeScale':
      default: {
        return { top: listVisualTop, opacity: 0, z: 1, tx: 0, ty: 0, scale: 0.85, rot: 0 };
      }
    }
  };

  // Mask gradient (only in list mode)
  const mask = isDetail
    ? 'none'
    : 'linear-gradient(to bottom, transparent 0, black 28px, black calc(100% - 16px), transparent 100%)';

  const pillBase = () => ({
    background: 'rgba(255,255,255,0.78)',
    backdropFilter: 'blur(14px)',
    border: pillBorders ? '1.5px solid #0B0B0B' : '1px solid rgba(255,255,255,0.85)',
    boxShadow: pillBorders ? 'none' : '0 4px 12px rgba(0,0,0,0.06)',
  });

  return (
    <Phone bg={bg}>
      {/* Animated blob bg — only in detail */}
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0,
        opacity: isDetail && !closing ? 1 : 0, transition: 'opacity .5s',
      }}>
        {selected && (
          <React.Fragment>
            <div style={{
              position: 'absolute', top: '15%', left: '-25%',
              width: 380, height: 380, borderRadius: '50%',
              background: selected.hex, filter: 'blur(70px)', opacity: 0.55,
              animation: 'wp3blob1 14s ease-in-out infinite',
            }}/>
            <div style={{
              position: 'absolute', bottom: '-10%', right: '-20%',
              width: 360, height: 360, borderRadius: '50%',
              background: selected.hex, filter: 'blur(70px)', opacity: 0.7,
              animation: 'wp3blob2 18s ease-in-out infinite',
            }}/>
            <div style={{
              position: 'absolute', top: '55%', right: '10%',
              width: 220, height: 220, borderRadius: '50%',
              background: selected.hex, filter: 'blur(50px)', opacity: 0.4,
              animation: 'wp3blob3 11s ease-in-out infinite',
            }}/>
          </React.Fragment>
        )}
      </div>

      {/* paper grain */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1, mixBlendMode: 'multiply', pointerEvents: 'none', zIndex: 1 }}>
        <filter id="wp3-grain">
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" stitchTiles="stitch"/>
          <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.3  0 0 0 0 0.25  0 0 0 0.4 0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#wp3-grain)"/>
      </svg>

      {/* LIST chrome */}
      <div style={{
        position: 'absolute', top: 56, left: 18, right: 18, zIndex: 5,
        opacity: isDetail ? 0 : 1, transform: isDetail ? 'translateY(-10px)' : 'none',
        transition: 'opacity .35s, transform .35s', pointerEvents: isDetail ? 'none' : 'auto',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 28, lineHeight: 0.95,
              letterSpacing: -0.9, color: '#0B0B0B',
            }}>Ricettario</div>
            <div style={{
              fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1.4, fontWeight: 700,
              color: 'rgba(0,0,0,0.5)', marginTop: 2,
            }}>{list.length} PANTONE · SICO</div>
          </div>
          <BGToggle active="cream"/>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <div style={{
            flex: 1, height: 44, borderRadius: 99, background: '#fff',
            display: 'flex', alignItems: 'center', padding: '0 18px', gap: 10,
            border: pillBorders ? '1.5px solid #0B0B0B' : '1px solid rgba(0,0,0,0.08)',
            boxShadow: pillBorders ? 'none' : '0 1px 2px rgba(0,0,0,0.04)',
          }}>
            <IconSearch color="#0B0B0B"/>
            <span style={{
              fontFamily: 'Nebulica', fontSize: 14, color: 'rgba(0,0,0,0.4)',
            }}>cerca pantone…</span>
          </div>
          <div style={{
            width: 44, height: 44, borderRadius: 99, background: '#fff',
            border: pillBorders ? '1.5px solid #0B0B0B' : '1px solid rgba(0,0,0,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: pillBorders ? 'none' : '0 1px 2px rgba(0,0,0,0.04)',
          }}>
            <IconFilter color="#0B0B0B"/>
          </div>
        </div>
      </div>

      {/* DETAIL chrome */}
      <div style={{
        position: 'absolute', top: 64, left: 18, right: 18, zIndex: 7,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        opacity: isDetail && !closing ? 1 : 0,
        transform: isDetail && !closing ? 'none' : 'translateY(-10px)',
        transition: 'opacity .35s .1s, transform .35s .1s',
        pointerEvents: isDetail && !closing ? 'auto' : 'none',
      }}>
        <div
          onClick={onBack}
          style={{
            height: 40, padding: '0 16px 0 12px', borderRadius: 99,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            ...pillBase(),
            fontFamily: 'Nebulica', fontSize: 14, fontWeight: 600,
            color: '#0B0B0B',
            cursor: 'pointer',
          }}>
          <IconBack color="#0B0B0B"/> <span style={{ color: '#0B0B0B' }}>Ricette</span>
        </div>
        <div style={{
          width: 40, height: 40, borderRadius: 99,
          ...pillBase(),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <IconEdit color="#0B0B0B"/>
        </div>
      </div>

      {/* Cards stack — masked, scrollable via wheel/touch */}
      <div
        onWheel={onWheel}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        style={{
          position: 'absolute', top: STACK_TOP, left: 18, right: 18,
          height: STACK_H, zIndex: 4,
          overflow: isDetail ? 'visible' : 'hidden',
          WebkitMaskImage: mask, maskImage: mask,
          touchAction: 'none',
        }}>
        {list.map((p, i) => {
          const pos = computeCardPos(i);
          // top is in PHONE coords. We need to translate into container coords:
          const containerTop = pos.top - STACK_TOP;
          return (
            <div
              key={p.code}
              onClick={() => onCardClick(i)}
              style={{
                position: 'absolute', left: 0, right: 0,
                top: containerTop,
                height: ACTIVE_H,
                opacity: pos.opacity,
                zIndex: pos.z,
                transform: `translate(${pos.tx}px, ${pos.ty}px) scale(${pos.scale}) rotate(${pos.rot || 0}deg)`,
                transformOrigin: '50% 50%',
                pointerEvents: pos.opacity > 0.2 ? 'auto' : 'none',
                cursor: isDetail ? 'default' : 'pointer',
                transition: isDetail
                  ? `top ${dur}ms ${ease}, transform ${dur}ms ${ease}, opacity ${Math.round(dur*0.7)}ms ease`
                  : 'opacity .2s ease',  // no top transition while scrolling
                filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.14))',
              }}
            >
              <WalletCardV3 pantone={p} expanded={isDetail && i === selectedIdx}/>
            </div>
          );
        })}
      </div>

      {/* Recipe sheet */}
      <RecipeRiseV2
        visible={isDetail && !closing}
        bottom={recipeBottom}
        riseFrom={recipeRiseFrom}
        mode={recipeMode}
        dur={dur} ease={ease}
        selected={selected}
        pillBorders={pillBorders}
      />

      {/* Caption */}
      {label && (
        <div style={{
          position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
          zIndex: 60, padding: '4px 10px', borderRadius: 99,
          background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0,0,0,0.08)',
          fontFamily: 'Nebulica', fontSize: 9, letterSpacing: 1.2, fontWeight: 700,
          color: 'rgba(0,0,0,0.7)',
          maxWidth: 280, textAlign: 'center',
        }}>{label}</div>
      )}

      {/* Hint */}
      <div style={{
        position: 'absolute', bottom: 102, left: 0, right: 0, textAlign: 'center', zIndex: 3,
        fontFamily: 'Nebulica', fontSize: 9, letterSpacing: 1.4, fontWeight: 700,
        color: 'rgba(0,0,0,0.4)',
        opacity: isDetail ? 0 : 1, transition: 'opacity .3s',
        pointerEvents: 'none',
      }}>↑ CLICCA UNA CARD · SCROLLA PER ALTRE</div>

      <BottomNav active={0} accent="#0033FF" restColor="#0B0B0B" bg={bg}/>
    </Phone>
  );
}

function RecipeRiseV2({ visible, bottom, riseFrom, mode, dur, ease, selected, pillBorders }) {
  let initialTransform = `translateY(${riseFrom}px)`;
  let finalTransform   = 'translateY(0)';
  if (mode === 'scaleFromCard') {
    initialTransform = `translateY(${Math.max(60, riseFrom * 0.6)}px) scale(0.85)`;
    finalTransform   = 'translateY(0) scale(1)';
  }
  return (
    <div style={{
      position: 'absolute', left: 18, right: 18, bottom,
      zIndex: 6, pointerEvents: visible ? 'auto' : 'none',
      opacity: visible ? 1 : 0,
      transform: visible ? finalTransform : initialTransform,
      transition: `opacity ${Math.round(dur*0.8)}ms ${ease} ${visible ? Math.round(dur*0.22) : 0}ms, transform ${dur + 100}ms ${ease} ${visible ? Math.round(dur*0.18) : 0}ms`,
    }}>
      {selected && <RecipeSheetV4 pantone={selected} pillBorders={pillBorders}/>}
    </div>
  );
}

Object.assign(window, {
  WalletProtoV3, WalletCardV3, RecipeSheetV4, RecipeRiseV2,
});
