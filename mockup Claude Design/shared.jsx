// shared.jsx — common data, phone frame, icons, mixed components used across variants

// ─────────────────────────────────────────────────────────────────────────────
// Sample Pantone data
// ─────────────────────────────────────────────────────────────────────────────
const PANTONES = [
  { code: '072 U',  name: 'Pantone Blue',  hex: '#10069F', family: 'blu',     ink: 2, page: 51, coherence: 92 },
  { code: '115 U',  name: 'Cream Gold',    hex: '#FCD757', family: 'giallo',  ink: 3, page: 28, coherence: 88 },
  { code: '116 U',  name: 'Amber',         hex: '#FFCD00', family: 'giallo',  ink: 4, page: 29, coherence: 95 },
  { code: '185 U',  name: 'Red',           hex: '#E4002B', family: 'rosso',   ink: 2, page: 84, coherence: 90 },
  { code: '366 U',  name: 'Citron',        hex: '#C1DE92', family: 'verde',   ink: 4, page: 158, coherence: 86 },
  { code: '699 U',  name: 'Pink Pastel',   hex: '#F5D0D3', family: 'rosa',    ink: 3, page: 51, coherence: 81 },
  { code: '3405 U', name: 'Vivid Teal',    hex: '#A2D9E7', family: 'azzurro', ink: 3, page: 112, coherence: 78 },
  { code: '802 U',  name: 'Neon Green',    hex: '#44D62C', family: 'verde',   ink: 2, page: 162, coherence: 94 },
];

// Recipe for the focus detail (699 U from screenshot)
const RECIPE_699 = {
  code: '699 U',
  name: 'Pink Pastel',
  hex: '#F5D0D3',
  page: 51, pageTotal: 3, pageIndex: 1, coherence: 81,
  inks: [
    { name: 'AS 90',  grams: 75.00, pct: 75.0 },
    { name: 'AS 65',  grams: 6.25,  pct: 6.25 },
    { name: 'AS 150', grams: 18.75, pct: 18.75 },
  ],
  total: 100.0,
  project: 'Risanamento 23',
};

// ─────────────────────────────────────────────────────────────────────────────
// Phone frame — compact iPhone bezel, no internal scrolling (static)
// Content area provides background; status bar + home indicator are overlays
// ─────────────────────────────────────────────────────────────────────────────
function Phone({ children, w = 360, h = 780, bg = '#F2F0EA', dark = false, time = '19:06' }) {
  const fg = dark ? '#fff' : '#000';
  return (
    <div style={{
      width: w, height: h, borderRadius: 46, overflow: 'hidden',
      position: 'relative', background: bg,
      boxShadow: '0 28px 70px rgba(0,0,0,0.20), 0 0 0 1.5px rgba(0,0,0,0.18), inset 0 0 0 6px #0a0a0a',
      fontFamily: 'Nebulica, -apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased',
    }}>
      {/* dynamic island */}
      <div style={{
        position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
        width: 110, height: 32, borderRadius: 22, background: '#000', zIndex: 60,
      }} />
      {/* status bar overlay */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50,
        height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 28px', paddingTop: 18, color: fg, pointerEvents: 'none',
      }}>
        <span style={{ fontFamily: '-apple-system, "SF Pro", system-ui', fontWeight: 600, fontSize: 15, letterSpacing: -0.2 }}>{time}</span>
        <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          {/* signal */}
          <svg width="16" height="10" viewBox="0 0 16 10"><rect x="0" y="6" width="2.5" height="4" rx="0.5" fill={fg}/><rect x="4" y="4" width="2.5" height="6" rx="0.5" fill={fg}/><rect x="8" y="2" width="2.5" height="8" rx="0.5" fill={fg}/><rect x="12" y="0" width="2.5" height="10" rx="0.5" fill={fg}/></svg>
          {/* wifi */}
          <svg width="14" height="10" viewBox="0 0 14 10"><path d="M7 2.5C9 2.5 10.7 3.2 12 4.4l1-1C11.4 1.9 9.3 1 7 1S2.6 1.9 1 3.4l1 1C3.3 3.2 5 2.5 7 2.5z" fill={fg}/><path d="M7 5.5C8.2 5.5 9.2 5.9 10 6.7l1-1C9.9 4.6 8.5 4 7 4s-2.9.6-4 1.7l1 1c.8-.8 1.8-1.2 3-1.2z" fill={fg}/><circle cx="7" cy="8.5" r="1.2" fill={fg}/></svg>
          {/* battery */}
          <svg width="24" height="11" viewBox="0 0 24 11"><rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke={fg} strokeOpacity="0.4" fill="none"/><rect x="2" y="2" width="14" height="7" rx="1.5" fill={fg}/><path d="M22 3.5v4c.7-.2 1.2-.9 1.2-2s-.5-1.8-1.2-2z" fill={fg} fillOpacity="0.4"/></svg>
        </span>
      </div>
      {/* content */}
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>{children}</div>
      {/* home indicator */}
      <div style={{
        position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
        width: 122, height: 4.5, borderRadius: 99, zIndex: 60,
        background: dark ? 'rgba(255,255,255,0.78)' : 'rgba(0,0,0,0.32)',
      }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Icons — beaker (Ricette), folder (Progetti), pen-plus (Nuovo)
// Stroke icons; selected state grows them and changes color (no pill).
// ─────────────────────────────────────────────────────────────────────────────
function IconBeaker({ size = 28, color = 'currentColor', filled = false, sw = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M10 3h8M11 3v6.2L5.2 21.5a2.4 2.4 0 0 0 2.2 3.5h13.2a2.4 2.4 0 0 0 2.2-3.5L17 9.2V3"
        stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
        fill={filled ? color : 'none'} fillOpacity={filled ? 0.18 : 0}/>
      <path d="M8.5 16.5c2 .5 3.5-.8 5.5-.4s3 1.2 5.5.5"
        stroke={color} strokeWidth={sw} strokeLinecap="round" fill="none"/>
    </svg>
  );
}
function IconFolder({ size = 28, color = 'currentColor', filled = false, sw = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h4.6c.7 0 1.3.3 1.8.8L13.5 7H22.5A2.5 2.5 0 0 1 25 9.5v11A2.5 2.5 0 0 1 22.5 23H5.5A2.5 2.5 0 0 1 3 20.5v-13z"
        stroke={color} strokeWidth={sw} strokeLinejoin="round"
        fill={filled ? color : 'none'} fillOpacity={filled ? 0.18 : 0}/>
    </svg>
  );
}
function IconPenPlus({ size = 28, color = 'currentColor', filled = false, sw = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M17.5 4.3 22.8 9.6 11.5 20.9l-6.2.9.9-6.2L17.5 4.3z"
        stroke={color} strokeWidth={sw} strokeLinejoin="round"
        fill={filled ? color : 'none'} fillOpacity={filled ? 0.18 : 0}/>
      <path d="M15.8 6 21 11.3" stroke={color} strokeWidth={sw} strokeLinecap="round"/>
      <circle cx="22.5" cy="22.5" r="3.6" fill={dark2(color)} />
      <path d="M22.5 20.7v3.6M20.7 22.5h3.6" stroke="#fff" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  );
}
function dark2(c) { return c; }

function IconSearch({ size = 20, color = 'currentColor', sw = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <circle cx="9" cy="9" r="6.2" stroke={color} strokeWidth={sw}/>
      <path d="m13.6 13.6 3.4 3.4" stroke={color} strokeWidth={sw} strokeLinecap="round"/>
    </svg>
  );
}
function IconFilter({ size = 20, color = 'currentColor', sw = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M3 5h14M5.5 10h9M8.5 15h3" stroke={color} strokeWidth={sw} strokeLinecap="round"/>
    </svg>
  );
}
function IconBack({ size = 18, color = 'currentColor', sw = 2.2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <path d="M11 3 5 9l6 6" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconPrinter({ size = 18, color = 'currentColor', sw = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M5 8V3h10v5M5 14H3.5A1.5 1.5 0 0 1 2 12.5v-3A1.5 1.5 0 0 1 3.5 8h13A1.5 1.5 0 0 1 18 9.5v3a1.5 1.5 0 0 1-1.5 1.5H15M5 12h10v6H5z"
        stroke={color} strokeWidth={sw} strokeLinejoin="round" fill="none"/>
    </svg>
  );
}
function IconEdit({ size = 16, color = 'currentColor', sw = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <path d="M11 3.5 14.5 7 6.5 15l-4 .5.5-4L11 3.5z" stroke={color} strokeWidth={sw} strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Bottom nav — gradient/blur over content, NO pill container.
// Selected icon grows + changes to accent color.
// ─────────────────────────────────────────────────────────────────────────────
function BottomNav({
  active = 0, accent = '#0033FF', restColor = '#222',
  bg = '#F2F0EA', dark = false,
}) {
  // gradient that fades from bg color (opaque at bottom) to transparent at top
  // so content underneath blurs+fades naturally
  const isDark = dark;
  const c0 = isDark ? hexToRGBA('#0A0A0A', 0)   : hexToRGBA(bg, 0);
  const c1 = isDark ? hexToRGBA('#0A0A0A', 0.85): hexToRGBA(bg, 0.85);
  const c2 = isDark ? hexToRGBA('#0A0A0A', 1)   : hexToRGBA(bg, 1);
  const rest = isDark ? 'rgba(255,255,255,0.45)' : restColor;
  const items = [
    { Icon: IconBeaker, key: 'ricette' },
    { Icon: IconFolder, key: 'progetti' },
    { Icon: IconPenPlus, key: 'nuovo' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      paddingTop: 60, paddingBottom: 28, zIndex: 40,
      pointerEvents: 'none',
      background: `linear-gradient(to bottom, ${c0} 0%, ${c1} 55%, ${c2} 100%)`,
      backdropFilter: 'blur(0px)',
    }}>
      {/* second layer: only the bottom 60% is blurred */}
      <div style={{
        position: 'absolute', inset: 0,
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 45%)',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 45%)',
        backdropFilter: 'blur(14px) saturate(140%)',
        WebkitBackdropFilter: 'blur(14px) saturate(140%)',
      }} />
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        padding: '0 36px', pointerEvents: 'auto',
      }}>
        {items.map((it, i) => {
          const isActive = i === active;
          const color = isActive ? accent : rest;
          const size  = isActive ? 34 : 26;
          return (
            <div key={it.key} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'transform .25s cubic-bezier(.2,.7,.3,1)',
              transform: isActive ? 'translateY(-2px)' : 'none',
            }}>
              <it.Icon size={size} color={color} sw={isActive ? 2 : 1.7}/>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function hexToRGBA(hex, a) {
  const h = hex.replace('#','');
  const r = parseInt(h.substring(0,2),16);
  const g = parseInt(h.substring(2,4),16);
  const b = parseInt(h.substring(4,6),16);
  return `rgba(${r},${g},${b},${a})`;
}

// Compact filter "show on demand" trigger; not the filter chips themselves
function FilterPill({ active = false, color = '#111', bg = 'transparent', border = 'rgba(0,0,0,0.15)' }) {
  return (
    <div style={{
      width: 44, height: 44, borderRadius: 99, background: bg,
      border: `1px solid ${border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <IconFilter color={color}/>
    </div>
  );
}

Object.assign(window, {
  PANTONES, RECIPE_699, Phone, BottomNav,
  IconBeaker, IconFolder, IconPenPlus, IconSearch, IconFilter, IconBack, IconPrinter, IconEdit,
  FilterPill, hexToRGBA,
});
