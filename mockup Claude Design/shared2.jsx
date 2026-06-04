// shared2.jsx — additions for variants 7+
// - WalletCard: Pantone card in iOS-Wallet style
// - BlobBg: globular gradient background (with grain), static or animated
// - BGToggle: cream ↔ grey background mode switch
// - FullBleedHero: full-width color slab for detail-screen tops

// ─────────────────────────────────────────────────────────────────────────────
// Wallet-style Pantone card. Front is the full color; bottom band carries the
// PMS code in Nebulica + name. Codice in alto a sx in piccolo, mark in alto a dx.
// ─────────────────────────────────────────────────────────────────────────────
function WalletCard({
  pantone, h = 168, peeked = false, peekHeight = 60,
  showRecipe = false,
}) {
  const fg = textOn4(pantone.hex);
  return (
    <div style={{
      width: '100%', height: peeked ? peekHeight : h,
      borderRadius: 22, background: pantone.hex,
      boxShadow: '0 8px 22px rgba(0,0,0,0.10), 0 1.5px 0 rgba(0,0,0,0.06)',
      position: 'relative', overflow: 'hidden',
      padding: '14px 18px 16px', boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      {/* top row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
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
          <span style={{
            width: 6, height: 6, borderRadius: 99,
            background: fg, opacity: 0.45,
          }}/>
          {pantone.ink} ink
        </span>
      </div>

      {/* code + name */}
      {!peeked && (
        <div>
          <div style={{
            fontFamily: 'Nebulica', fontWeight: 700, fontSize: 48,
            lineHeight: 0.88, letterSpacing: -1.8, color: fg,
          }}>{pantone.code.replace(' U','')}<span style={{ fontWeight: 400, opacity: 0.65 }}> U</span></div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            marginTop: 6,
          }}>
            <span style={{
              fontFamily: 'Nebulica', fontSize: 13, color: fg, opacity: 0.75,
            }}>{pantone.name}</span>
            <span style={{
              fontFamily: '"JetBrains Mono", ui-monospace, monospace', fontSize: 9,
              color: fg, opacity: 0.55, letterSpacing: 0.4,
            }}>{pantone.hex.toUpperCase()}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function textOn4(hex) {
  const h = hex.replace('#','');
  const r = parseInt(h.substring(0,2),16);
  const g = parseInt(h.substring(2,4),16);
  const b = parseInt(h.substring(4,6),16);
  return (0.299*r + 0.587*g + 0.114*b)/255 > 0.62 ? '#0B0B0B' : '#fff';
}

// ─────────────────────────────────────────────────────────────────────────────
// Blob background — globular soft gradients + grain overlay
// animated=true uses CSS keyframes to drift positions slowly
// ─────────────────────────────────────────────────────────────────────────────
function BlobBg({ animated = false, palette = 'pastel' }) {
  // Insert keyframes once
  React.useEffect(() => {
    if (document.getElementById('blob-kf')) return;
    const s = document.createElement('style');
    s.id = 'blob-kf';
    s.textContent = `
      @keyframes blobA {
        0%   { transform: translate(0, 0)        scale(1); }
        50%  { transform: translate(40px, -30px) scale(1.15); }
        100% { transform: translate(0, 0)        scale(1); }
      }
      @keyframes blobB {
        0%   { transform: translate(0, 0)        scale(1); }
        50%  { transform: translate(-50px, 40px) scale(1.08); }
        100% { transform: translate(0, 0)        scale(1); }
      }
      @keyframes blobC {
        0%   { transform: translate(0, 0)        scale(1); }
        50%  { transform: translate(30px, 50px)  scale(1.2); }
        100% { transform: translate(0, 0)        scale(1); }
      }
    `;
    document.head.appendChild(s);
  }, []);

  const palettes = {
    pastel:  ['#FFB8C7', '#FFE08A', '#B8D8FF', '#D5FFC9'],
    sunset:  ['#FF9F70', '#FFCB6B', '#FF7B9C', '#A8A4FF'],
    cool:    ['#A8D8FF', '#B8FFE0', '#CFB8FF', '#FFD3E5'],
  };
  const [c1, c2, c3, c4] = palettes[palette] || palettes.pastel;

  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      pointerEvents: 'none',
    }}>
      {/* Blob A */}
      <div style={{
        position: 'absolute', top: '8%', left: '-12%',
        width: 280, height: 280, borderRadius: '50%',
        background: c1, filter: 'blur(60px)',
        animation: animated ? 'blobA 14s ease-in-out infinite' : 'none',
        opacity: 0.85,
      }}/>
      {/* Blob B */}
      <div style={{
        position: 'absolute', top: '22%', right: '-15%',
        width: 260, height: 260, borderRadius: '50%',
        background: c2, filter: 'blur(70px)',
        animation: animated ? 'blobB 18s ease-in-out infinite' : 'none',
        opacity: 0.8,
      }}/>
      {/* Blob C */}
      <div style={{
        position: 'absolute', bottom: '12%', left: '20%',
        width: 320, height: 320, borderRadius: '50%',
        background: c3, filter: 'blur(80px)',
        animation: animated ? 'blobC 22s ease-in-out infinite' : 'none',
        opacity: 0.75,
      }}/>
      {/* Blob D */}
      <div style={{
        position: 'absolute', top: '55%', right: '10%',
        width: 200, height: 200, borderRadius: '50%',
        background: c4, filter: 'blur(55px)',
        animation: animated ? 'blobA 17s ease-in-out infinite reverse' : 'none',
        opacity: 0.7,
      }}/>
      {/* Grain overlay */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', mixBlendMode: 'overlay', opacity: 0.45 }}>
        <filter id="bg-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#bg-grain)"/>
      </svg>
      {/* slight overall warm wash */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(255,253,247,0.25), rgba(255,253,247,0.05))',
      }}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BG mode toggle — cream ↔ grey (visual only)
// ─────────────────────────────────────────────────────────────────────────────
function BGToggle({ active = 'cream', accent = '#0B0B0B' }) {
  return (
    <div style={{
      width: 64, height: 32, borderRadius: 99,
      background: 'rgba(0,0,0,0.08)', position: 'relative',
      display: 'flex', alignItems: 'center', padding: 3,
      border: '1px solid rgba(0,0,0,0.1)',
    }}>
      <div style={{
        position: 'absolute', top: 3, bottom: 3,
        left: active === 'cream' ? 3 : 33,
        width: 28, borderRadius: 99,
        background: active === 'cream' ? '#F4EFE2' : '#C7C5C0',
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.15)',
        transition: 'left .2s',
      }}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Full-bleed Pantone hero — the "color over the whole top" the user asked for.
// Renders the iconic Pantone-card lockup on a full-width color slab.
// ─────────────────────────────────────────────────────────────────────────────
function FullBleedHero({ pantone, height = 360, onBack, onEdit, rounded = false }) {
  const fg = textOn4(pantone.hex);
  return (
    <div style={{
      position: 'relative',
      background: pantone.hex,
      height,
      padding: '64px 22px 22px',
      boxSizing: 'border-box',
      borderRadius: rounded ? '0 0 32px 32px' : '0',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      {/* top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
        <div style={{
          height: 36, padding: '0 14px 0 10px', borderRadius: 99,
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: fg === '#fff' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)',
          color: fg,
          fontFamily: 'Nebulica', fontSize: 14, fontWeight: 500,
        }}>
          <IconBack color={fg}/> Ricette
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: 99,
          background: fg === '#fff' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <IconEdit color={fg}/>
        </div>
      </div>

      {/* pantone lockup — bottom-aligned */}
      <div>
        <div style={{
          fontFamily: 'Nebulica', fontSize: 11, letterSpacing: 2, fontWeight: 700,
          color: fg, opacity: 0.7,
        }}>PANTONE</div>
        <div style={{
          fontFamily: 'Nebulica', fontWeight: 700, fontSize: 92,
          lineHeight: 0.85, letterSpacing: -3.5, color: fg, marginTop: 6,
        }}>{pantone.code.replace(' U','')}<span style={{ fontWeight: 400, opacity: 0.65 }}> U</span></div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          marginTop: 10,
        }}>
          <span style={{
            fontFamily: 'Nebulica', fontSize: 15, color: fg, opacity: 0.8,
          }}>{pantone.name}</span>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
            color: fg, opacity: 0.55, letterSpacing: 0.6,
          }}>PAG.{pantone.page} · COER {pantone.coherence}%</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { WalletCard, BlobBg, BGToggle, FullBleedHero, textOn4 });
