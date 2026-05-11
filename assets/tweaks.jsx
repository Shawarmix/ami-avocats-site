// Tweaks panel — allows switching univers (logo + palette) live
const TweaksPanel = ({ themeIdx, setThemeIdx, logoIdx, setLogoIdx, visible, onClose }) => {
  if (!visible) return null;
  const themes = window.AMI_THEMES;
  const logos = window.LOGO_VARIANTS;

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 100,
      width: 340, background: '#0f0f0f', color: '#fff',
      border: '1px solid #333', borderRadius: 8,
      boxShadow: '0 24px 60px rgba(0,0,0,.4)',
      fontFamily: '"Inter Tight", sans-serif',
      maxHeight: '85vh', overflowY: 'auto',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 18px', borderBottom: '1px solid #222',
      }}>
        <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 500 }}>Tweaks</div>
        <button onClick={onClose} style={{
          background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: 16,
        }}>×</button>
      </div>

      <div style={{ padding: 18 }}>
        <div style={{ fontSize: 10, letterSpacing: 2, color: '#888', textTransform: 'uppercase', marginBottom: 12 }}>
          Univers visuel · {themeIdx + 1}/{themes.length}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 8 }}>
          {themes.map((t, i) => (
            <button key={t.id} onClick={() => setThemeIdx(i)} style={{
              padding: 10, background: t.bg, color: t.fg,
              border: themeIdx === i ? `2px solid ${t.accent}` : '2px solid transparent',
              borderRadius: 4, cursor: 'pointer', textAlign: 'left',
              fontFamily: 'inherit',
            }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
                <div style={{ width: 12, height: 12, background: t.accent, borderRadius: 2 }} />
                <div style={{ width: 12, height: 12, background: t.fg, borderRadius: 2 }} />
                <div style={{ width: 12, height: 12, background: t.bgAlt, borderRadius: 2, border: `1px solid ${t.line}22` }} />
              </div>
              <div style={{ fontSize: 10, fontWeight: 500 }}>{t.name}</div>
            </button>
          ))}
        </div>
        <div style={{ fontSize: 10, color: '#888', marginTop: 8, lineHeight: 1.4 }}>
          {themes[themeIdx].subtitle}
        </div>
      </div>

      <div style={{ padding: '0 18px 18px' }}>
        <div style={{ fontSize: 10, letterSpacing: 2, color: '#888', textTransform: 'uppercase', marginBottom: 12 }}>
          Logo · {logoIdx + 1}/{logos.length}
        </div>
        <div style={{ display: 'grid', gap: 6 }}>
          {logos.map((l, i) => (
            <button key={l.id} onClick={() => setLogoIdx(i)} style={{
              padding: '10px 12px',
              background: logoIdx === i ? '#1c1c1c' : 'transparent',
              color: '#fff',
              border: logoIdx === i ? `1px solid ${themes[themeIdx].accent}` : '1px solid #222',
              borderRadius: 4, cursor: 'pointer', textAlign: 'left',
              fontFamily: 'inherit',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500 }}>{l.name}</div>
                <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>{l.description}</div>
              </div>
              {logoIdx === i && <span style={{ color: themes[themeIdx].accent, fontSize: 14 }}>●</span>}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px 18px', borderTop: '1px solid #222', fontSize: 10, color: '#666', lineHeight: 1.5 }}>
        {themes.length} univers × {logos.length} logos · {themes.length * logos.length} combinaisons possibles. Shift + ← ↑ → ↓ pour naviguer.
      </div>
    </div>
  );
};

// Floating preview of all 6 logos for easy comparison
const LogoShowcase = ({ theme, logos, logoIdx, setLogoIdx, visible, onClose }) => {
  if (!visible) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,.85)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        maxWidth: 1100, width: '100%', background: theme.bg,
        padding: 48, borderRadius: 4,
        maxHeight: '90vh', overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <div style={{ fontFamily: theme.mono, fontSize: 11, letterSpacing: 3, color: theme.accent, textTransform: 'uppercase' }}>── Logos</div>
            <h3 style={{ fontFamily: theme.serif, fontSize: 40, margin: '8px 0 0', fontWeight: 400 }}>{logos.length} directions de marque</h3>
          </div>
          <button onClick={onClose} style={{
            background: 'transparent', border: `1px solid ${theme.line}44`, color: theme.fg,
            padding: '10px 18px', cursor: 'pointer', fontFamily: theme.mono, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
          }}>Fermer ×</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {logos.map((l, i) => (
            <div key={l.id} onClick={() => { setLogoIdx(i); onClose(); }} style={{
              padding: 32, background: theme.card,
              border: logoIdx === i ? `2px solid ${theme.accent}` : `1px solid ${theme.line}22`,
              cursor: 'pointer', transition: 'all 200ms',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                padding: 24, background: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                minHeight: 120, marginBottom: 16,
              }}>
                {l.render({ theme, size: 1 })}
              </div>
              <div style={{ fontFamily: theme.mono, fontSize: 10, letterSpacing: 2, color: theme.accent, textTransform: 'uppercase', marginBottom: 6 }}>Direction {String(i + 1).padStart(2, '0')}</div>
              <div style={{ fontFamily: theme.serif, fontSize: 20, color: theme.fg, marginBottom: 4 }}>{l.name}</div>
              <div style={{ fontFamily: theme.sans, fontSize: 13, color: theme.fgSoft }}>{l.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.TweaksPanel = TweaksPanel;
window.LogoShowcase = LogoShowcase;
