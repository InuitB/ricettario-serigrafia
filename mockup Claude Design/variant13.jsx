// variant13.jsx — Wallet INTERATTIVO con nomi visibili.
// Ogni card peeka mostrando CODICE + NOME + ink count.
// Interazioni:
//   • Click su una card da sotto → quella card sale in cima con transizione fluida
//   • Drag / wheel verticale sulla stack → scorre il "focus" su/giù
//
// Si chiama "mo-cap" perché lo abbiamo discusso a parole — provalo davvero.

function V13List() {
  const bg = '#F2EDE2';
  const ACTIVE_H = 178;   // altezza card in cima
  const PEEK_H   = 80;    // altezza visibile di ogni peek
  const cards = PANTONES.slice(0, 8);

  const [topIdx, setTopIdx] = React.useState(0);
  const [dragY, setDragY]   = React.useState(0);
  const draggingRef = React.useRef(false);
  const startYRef   = React.useRef(0);

  // Drag handlers
  const startDrag = (clientY) => {
    draggingRef.current = true;
    startYRef.current = clientY;
    setDragY(0);
  };
  const moveDrag = (clientY) => {
    if (!draggingRef.current) return;
    setDragY(clientY - startYRef.current);
  };
  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    // snap: ogni PEEK_H drag = avanza/indietreggia di 1
    const delta = Math.round(-dragY / PEEK_H);
    const next = Math.max(0, Math.min(cards.length - 1, topIdx + delta));
    setTopIdx(next);
    setDragY(0);
  };

  // Wheel for desktop
  const onWheel = (e) => {
    e.preventDefault();
    if (e.deltaY > 30 && topIdx < cards.length - 1) setTopIdx(topIdx + 1);
    else if (e.deltaY < -30 && topIdx > 0) setTopIdx(topIdx - 1);
  };

  return (
    <Phone bg={bg}>
      <div style={{ padding: '64px 20px 0', height: '100%', boxSizing: 'border-box' }}>
        {/* Header */}
        <div style={{ marginTop: 6 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{
              fontFamily: 'Nebulica', fontWeight: 700, fontSize: 30, lineHeight: 0.95,
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

        {/* small "hint" — appears only on the canvas */}
        <div style={{
          marginTop: 10, fontFamily: 'Nebulica', fontSize: 9, letterSpacing: 1.2,
          color: 'rgba(0,0,0,0.45)', fontWeight: 700,
        }}>
          ↕ TRASCINA · TOCCA UNA CARD PER PORTARLA IN CIMA
        </div>

        {/* Stack */}
        <div
          style={{
            marginTop: 12, position: 'relative', height: 480,
            cursor: 'grab', touchAction: 'none',
            userSelect: 'none',
          }}
          onMouseDown={(e) => startDrag(e.clientY)}
          onMouseMove={(e) => moveDrag(e.clientY)}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onTouchStart={(e) => startDrag(e.touches[0].clientY)}
          onTouchMove={(e) => moveDrag(e.touches[0].clientY)}
          onTouchEnd={endDrag}
          onWheel={onWheel}
        >
          {cards.map((p, i) => {
            const rel = i - topIdx;
            // visible cards range: 0 (top) .. cards.length-topIdx-1
            // Cards before topIdx slide up out of view
            const inFront = rel === 0;
            let top;
            if (rel < 0) {
              top = rel * (ACTIVE_H + 8);  // off-screen above
            } else if (rel === 0) {
              top = 0;
            } else {
              top = ACTIVE_H + (rel - 1) * PEEK_H;
            }
            // soft drag preview
            const offset = draggingRef.current ? dragY * 0.4 : 0;

            return (
              <div
                key={p.code}
                onClick={(e) => {
                  if (Math.abs(dragY) > 6) return;
                  setTopIdx(i);
                }}
                style={{
                  position: 'absolute', left: 0, right: 0,
                  top: top + offset,
                  zIndex: 100 - Math.abs(rel),
                  transition: draggingRef.current ? 'none' : 'top .42s cubic-bezier(.2,.8,.2,1)',
                  filter: 'drop-shadow(0 10px 22px rgba(0,0,0,0.12))',
                }}
              >
                <V13Card pantone={p} expanded={inFront} h={inFront ? ACTIVE_H : PEEK_H + 14}/>
              </div>
            );
          })}
        </div>
      </div>
      <BottomNav active={0} accent="#0033FF" restColor="#0B0B0B" bg={bg}/>
    </Phone>
  );
}

// Card with names ALWAYS visible (also when peeked)
function V13Card({ pantone, expanded, h }) {
  const fg = textOn4(pantone.hex);
  return (
    <div style={{
      width: '100%', height: h,
      borderRadius: 22, background: pantone.hex,
      position: 'relative', overflow: 'hidden',
      padding: '14px 18px', boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column',
      justifyContent: expanded ? 'space-between' : 'center',
    }}>
      {/* top row — always present, but smaller in peek */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        opacity: expanded ? 1 : 0,
        transition: 'opacity .25s',
      }}>
        <span style={{
          fontFamily: 'Nebulica', fontSize: 10, letterSpacing: 1.6, fontWeight: 700,
          color: fg, opacity: 0.75,
        }}>PANTONE</span>
        <span style={{
          fontFamily: 'Nebulica', fontSize: 11, fontWeight: 600,
          color: fg, opacity: 0.75,
          display: 'inline-flex', alignItems: 'center', gap: 4,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 99, background: fg, opacity: 0.45 }}/>
          {pantone.ink} ink
        </span>
      </div>

      {/* main row */}
      <div style={{
        display: 'flex', alignItems: expanded ? 'flex-end' : 'center', justifyContent: 'space-between', gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0, flex: 1 }}>
          <span style={{
            fontFamily: 'Nebulica', fontWeight: 700,
            fontSize: expanded ? 52 : 28,
            lineHeight: 0.9, letterSpacing: expanded ? -1.8 : -0.9, color: fg,
            transition: 'font-size .25s, letter-spacing .25s',
            whiteSpace: 'nowrap',
          }}>{pantone.code.replace(' U','')}<span style={{ fontWeight: 400, opacity: 0.65 }}> U</span></span>
          <span style={{
            fontFamily: 'Nebulica', fontSize: expanded ? 14 : 13,
            color: fg, opacity: 0.78, whiteSpace: 'nowrap',
            overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0,
          }}>{pantone.name}</span>
        </div>
        {/* When peeked, ink count is on this row (since top row is hidden) */}
        {!expanded && (
          <span style={{
            fontFamily: 'Nebulica', fontSize: 11, fontWeight: 600,
            color: fg, opacity: 0.7, whiteSpace: 'nowrap',
            display: 'inline-flex', alignItems: 'center', gap: 4,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: 99, background: fg, opacity: 0.45 }}/>
            {pantone.ink} ink
          </span>
        )}
        {expanded && (
          <span style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
            color: fg, opacity: 0.55, letterSpacing: 0.6, whiteSpace: 'nowrap',
          }}>{pantone.hex.toUpperCase()}</span>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { V13List, V13Card });
