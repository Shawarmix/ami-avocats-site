// ─── Splash Intro ───────────────────────────────────────────────────────────
const SplashIntro = ({ theme }) => {
  const [phase, setPhase] = React.useState('enter'); // enter | visible | fading | done
  React.useEffect(() => {
    const t1 = setTimeout(() => setPhase('visible'), 150);
    const t2 = setTimeout(() => setPhase('fading'), 2000);
    const t3 = setTimeout(() => setPhase('done'), 2850);
    return () => {clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);};
  }, []);
  if (phase === 'done') return null;
  const show = phase === 'visible';
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: theme.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: phase === 'fading' ? 0 : 1,
      transition: phase === 'fading' ? 'opacity 850ms cubic-bezier(.4,0,.2,1)' : 'none',
      pointerEvents: phase === 'fading' ? 'none' : 'all'
    }}>
      {/* Corner marks */}
      {[
      { top: 32, left: 32, borderTop: `1px solid ${theme.accent}`, borderLeft: `1px solid ${theme.accent}` },
      { top: 32, right: 32, borderTop: `1px solid ${theme.accent}`, borderRight: `1px solid ${theme.accent}` },
      { bottom: 32, left: 32, borderBottom: `1px solid ${theme.accent}`, borderLeft: `1px solid ${theme.accent}` },
      { bottom: 32, right: 32, borderBottom: `1px solid ${theme.accent}`, borderRight: `1px solid ${theme.accent}` }].
      map((s, i) =>
      <div key={i} style={{ position: 'absolute', width: 20, height: 20, opacity: 0.6, ...s }} />
      )}
      <div style={{ textAlign: 'center', userSelect: 'none' }}>
        <div style={{
          fontFamily: theme.mono, fontSize: 10, letterSpacing: 5, color: theme.accent,
          textTransform: 'uppercase', marginBottom: 36,
          opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 700ms, transform 700ms'
        }}>Cabinet d'avocats · Paris</div>
        <div style={{
          fontFamily: theme.serif, fontSize: 'clamp(96px, 22vw, 280px)',
          letterSpacing: '-0.04em', lineHeight: 0.9, color: theme.fg,
          opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 700ms, transform 700ms'
        }}>
          <span style={{ color: theme.fg }}>A</span>
          <span style={{ color: theme.fg }}>M</span>
          <span style={{ color: theme.fg }}>I</span>
        </div>
        <div style={{
          height: 1, background: theme.accent, margin: '24px auto', maxWidth: 280,
          transformOrigin: 'center',
          transform: show ? 'scaleX(1)' : 'scaleX(0)',
          transition: show ? 'transform 950ms cubic-bezier(.4,0,.2,1) 350ms' : 'none'
        }} />
        <div style={{
          fontFamily: theme.serif, fontStyle: 'italic',
          fontSize: 'clamp(22px, 3.5vw, 40px)', color: theme.accent,
          opacity: show ? 1 : 0,
          transition: show ? 'opacity 700ms 600ms' : 'none'
        }}>avocats</div>
      </div>
    </div>);

};

// ─── Nav (hamburger minimaliste) ─────────────────────────────────────────────
const Nav = ({ theme, logo }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu open
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {document.body.style.overflow = '';};
  }, [menuOpen]);

  const navLinks = ['À propos', 'Expertises', 'Équipe', 'Articles', 'Contact'];

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: scrolled ? '14px 48px' : '24px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'transparent',
        backdropFilter: 'none',
        borderBottom: '1px solid transparent',
        transition: 'padding 400ms cubic-bezier(.2,.7,.2,1)'
      }}>
        <a href="#top" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          {logo.compact({ theme, size: 0.75 })}
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            padding: 8, display: 'flex', flexDirection: 'column', gap: 5,
            alignItems: 'flex-end', zIndex: 51
          }}>
          
          <span style={{
            display: 'block', height: '1.2px', width: 22, background: menuOpen ? theme.fg : theme.fg,
            transform: menuOpen ? 'translateY(6.2px) rotate(45deg)' : 'none',
            transition: 'transform 300ms cubic-bezier(.4,0,.2,1)'
          }} />
          <span style={{
            display: 'block', height: '1.2px', width: 16, background: theme.fg,
            opacity: menuOpen ? 0 : 1, maxWidth: menuOpen ? 0 : 16,
            transition: 'opacity 200ms, max-width 200ms'
          }} />
          <span style={{
            display: 'block', height: '1.2px', width: 22, background: theme.fg,
            transform: menuOpen ? 'translateY(-6.2px) rotate(-45deg)' : 'none',
            transition: 'transform 300ms cubic-bezier(.4,0,.2,1)'
          }} />
        </button>
      </header>

      {/* Fullscreen overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 49,
        background: theme.bg,
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'all' : 'none',
        transition: 'opacity 400ms cubic-bezier(.4,0,.2,1)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
      }}>
        <nav style={{ textAlign: 'center' }}>
          {navLinks.map((item, i) =>
          <div key={item} style={{
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(24px)',
            transition: `opacity 400ms ${80 + i * 60}ms, transform 400ms ${80 + i * 60}ms`
          }}>
              <a
              href={`#${item.toLowerCase().replace(/[^a-z]/g, '')}`}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                fontFamily: theme.serif,
                fontSize: 'clamp(36px, 6vw, 72px)',
                color: theme.fg, textDecoration: 'none',
                lineHeight: 1.25, padding: '6px 0',
                fontStyle: 'normal',
                transition: 'color 200ms, font-style 200ms'
              }}
              onMouseEnter={(e) => {e.currentTarget.style.color = theme.accent;e.currentTarget.style.fontStyle = 'italic';}}
              onMouseLeave={(e) => {e.currentTarget.style.color = theme.fg;e.currentTarget.style.fontStyle = 'normal';}}>
              {item}</a>
            </div>
          )}
        </nav>
        <div style={{
          position: 'absolute', bottom: 40,
          fontFamily: theme.mono, fontSize: 10, letterSpacing: 2,
          color: theme.fgSoft, textTransform: 'uppercase',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 400ms 380ms'
        }}>
          contact@ami-avocats.fr <span style={{ color: theme.accent }}>·</span> Paris 8ᵉ
        </div>
      </div>
    </>);

};

// ─── Hero treatments ─────────────────────────────────────────────────────────
const DarkHero = ({ theme }) =>
<section id="top" data-screen-label="01 Hero" style={{
  minHeight: '100vh', background: theme.bg, color: theme.fg,
  padding: '140px 48px 80px',
  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center',
  position: 'relative'
}}>
    <div>
      <Reveal delay={100}>
        <div style={{ fontFamily: theme.mono, fontSize: 11, letterSpacing: 3, color: theme.accent, textTransform: 'uppercase', marginBottom: 32 }}>
          ── Cabinet d'avocats · Paris
        </div>
      </Reveal>
      <Reveal delay={200}>
        <h1 style={{ fontFamily: theme.serif, fontSize: 'clamp(48px, 6vw, 96px)', lineHeight: 0.98, margin: 0, fontWeight: 400, letterSpacing: -1 }}>
          Le droit,<br />
          <span style={{ fontStyle: 'italic', color: theme.accent }}>autrement</span><br />
          ambitieux.
        </h1>
      </Reveal>
      <Reveal delay={400}>
        <p style={{ fontFamily: theme.sans, fontSize: 17, lineHeight: 1.6, maxWidth: 480, marginTop: 36, color: theme.fgSoft }}>
          Cabinet dédié au droit des affaires et au droit immobilier. Nous accompagnons entrepreneurs et promoteurs avec rigueur, pragmatisme et vision long terme.
        </p>
      </Reveal>
      <Reveal delay={600}>
        <div style={{ marginTop: 40 }}>
          <a href="#expertises" style={{
          padding: '16px 28px', border: `1px solid ${theme.fg}50`, color: theme.fg,
          textDecoration: 'none', fontFamily: theme.sans, fontSize: 13, letterSpacing: 1.5,
          textTransform: 'uppercase', transition: 'border-color 200ms, color 200ms',
          display: 'inline-block'
        }}
        onMouseEnter={(e) => {e.currentTarget.style.borderColor = theme.accent;e.currentTarget.style.color = theme.accent;}}
        onMouseLeave={(e) => {e.currentTarget.style.borderColor = `${theme.fg}50`;e.currentTarget.style.color = theme.fg;}}>
          Nos expertises →</a>
        </div>
      </Reveal>
    </div>
    <Reveal delay={300} y={40}>
      <div style={{ position: 'relative', aspectRatio: '4/5' }}>
        <div style={{ position: 'absolute', inset: 0, background: `repeating-linear-gradient(135deg, ${theme.bgAlt}, ${theme.bgAlt} 12px, ${theme.card} 12px, ${theme.card} 24px)`, border: `1px solid ${theme.accent}40` }} />
        <div style={{ position: 'absolute', top: 24, left: 24, fontFamily: theme.mono, fontSize: 10, letterSpacing: 2, color: theme.accent }}>[ HERO · PHOTO CABINET OU PARIS ]</div>
        <div style={{ position: 'absolute', bottom: 24, right: 24, fontFamily: theme.serif, fontSize: 14, color: theme.fgSoft, fontStyle: 'italic' }}>à remplacer par une photo haut-de-gamme</div>
        <div style={{ position: 'absolute', bottom: -1, left: -1, width: 60, height: 60, borderLeft: `2px solid ${theme.accent}`, borderBottom: `2px solid ${theme.accent}` }} />
        <div style={{ position: 'absolute', top: -1, right: -1, width: 60, height: 60, borderRight: `2px solid ${theme.accent}`, borderTop: `2px solid ${theme.accent}` }} />
      </div>
    </Reveal>
    <div style={{ position: 'absolute', bottom: 32, left: 48, right: 48, display: 'flex', justifyContent: 'space-between', fontFamily: theme.mono, fontSize: 10, letterSpacing: 2, color: theme.fgSoft, textTransform: 'uppercase' }}>
      <span>EST. 2018</span>
      <span>Droit des affaires · Immobilier</span>
      <span>Paris 8ᵉ</span>
    </div>
  </section>;


const SplitHero = ({ theme }) =>
<section id="top" data-screen-label="01 Hero" style={{
  minHeight: '100vh', background: theme.bg, color: theme.fg,
  padding: '140px 48px 60px',
  display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 80, alignItems: 'center'
}}>
    <div>
      <Reveal delay={100}>
        <div style={{ fontFamily: theme.mono, fontSize: 11, letterSpacing: 3, color: theme.accent, textTransform: 'uppercase', marginBottom: 40 }}>
          Cabinet d'avocats · Paris
        </div>
      </Reveal>
      <Reveal delay={200}>
        <h1 style={{ fontFamily: theme.serif, fontSize: 'clamp(52px, 7vw, 120px)', lineHeight: 0.95, margin: 0, fontWeight: 400, letterSpacing: -2 }}>
          Avocats de ceux<br />
          qui <span style={{ fontStyle: 'italic', color: theme.accent }}>bâtissent</span>.
        </h1>
      </Reveal>
      <Reveal delay={400}>
        <p style={{ fontFamily: theme.sans, fontSize: 18, lineHeight: 1.6, maxWidth: 540, marginTop: 36, color: theme.fgSoft }}>
          Droit des affaires et immobilier, pour entrepreneurs et promoteurs qui veulent un partenaire juridique à la hauteur de leurs ambitions.
        </p>
      </Reveal>
      <Reveal delay={600}>
        <div style={{ marginTop: 48 }}>
          <a href="#expertises" style={{
          color: theme.fg, textDecoration: 'none', fontFamily: theme.sans,
          fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase',
          borderBottom: `1px solid ${theme.accent}`, paddingBottom: 4,
          transition: 'color 200ms'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = theme.accent}
        onMouseLeave={(e) => e.currentTarget.style.color = theme.fg}>
          Voir nos expertises →</a>
        </div>
      </Reveal>
    </div>
    <Reveal delay={300} y={40}>
      <div style={{ position: 'relative' }}>
        <div style={{ aspectRatio: '3/4', background: `repeating-linear-gradient(135deg, ${theme.bgAlt}, ${theme.bgAlt} 12px, ${theme.card} 12px, ${theme.card} 24px)`, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 24, left: 24, fontFamily: theme.mono, fontSize: 10, letterSpacing: 2, color: theme.fgSoft }}>[ PORTRAIT SIGNATURE ]</div>
        </div>
        <div style={{ position: 'absolute', bottom: -32, right: -32, background: theme.accent, color: theme.bg, padding: '24px 28px', fontFamily: theme.serif, fontSize: 14, lineHeight: 1.5, maxWidth: 220, fontStyle: 'italic' }}>
          « Transformer les défis juridiques en opportunités de développement. »
        </div>
      </div>
    </Reveal>
  </section>;


const EditorialHero = ({ theme }) => {
  const [parallaxY, setParallaxY] = React.useState(0);
  React.useEffect(() => {
    let raf;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const y = Math.min(Math.max(window.scrollY * 0.18, -60), 60);
        setParallaxY(y);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {window.removeEventListener('scroll', onScroll);cancelAnimationFrame(raf);};
  }, []);

  return (
    <section id="top" data-screen-label="01 Hero" style={{
        minHeight: '100vh', background: theme.bg, color: theme.fg,
        padding: '140px 48px 60px',
        position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
      }}>
      {/* Ruban lumineux */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-20%', left: '-10%', right: '-10%', height: 80,
          background: `linear-gradient(90deg, transparent 0%, ${theme.accent}00 10%, ${theme.accent}88 45%, ${theme.accent}cc 50%, ${theme.accent}88 55%, transparent 90%)`,
          transform: 'rotate(-8deg)', filter: 'blur(2px)',
          animation: 'ami-ribbon 9s cubic-bezier(.7,.1,.3,.9) infinite', mixBlendMode: 'multiply'
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-10%', right: '-10%', height: 40,
          background: `linear-gradient(90deg, transparent, ${theme.accentDeep}66 50%, transparent)`,
          transform: 'rotate(-4deg)', filter: 'blur(1px)',
          animation: 'ami-ribbon2 14s cubic-bezier(.5,.1,.5,.9) infinite', mixBlendMode: 'multiply'
        }} />
      </div>

      {/* Titre géant avec parallaxe — centré */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <Reveal delay={180}>
          <div style={{ willChange: 'transform', transform: `translateY(${parallaxY}px)` }}>
            <h1 style={{
              fontFamily: theme.serif, fontSize: 'clamp(88px, 18vw, 260px)',
              lineHeight: 0.95, fontWeight: 400, letterSpacing: '-0.03em', color: theme.fg, margin: 0
            }}>
              <span style={{ color: theme.fg }}>A</span>
              <span style={{ color: theme.fg }}>M</span>
              <span style={{ color: theme.fg }}>I</span>{' '}
              <span style={{ fontStyle: 'italic', color: theme.accent, fontSize: '0.7em', marginLeft: '0.05em' }}><span style={{ color: 'rgb(203, 72, 32)' }}>avocats</span></span>
            </h1>
          </div>
        </Reveal>
      </div>

      <style>{`
        @keyframes ami-ribbon {
          0%   { transform: translateX(-30%) rotate(-8deg); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateX(30%) rotate(-8deg); opacity: 0; }
        }
        @keyframes ami-ribbon2 {
          0%   { transform: translateX(30%) rotate(-4deg); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateX(-30%) rotate(-4deg); opacity: 0; }
        }
      `}</style>
    </section>);

};

// ─── Hero dispatcher ─────────────────────────────────────────────────────────
const Hero = ({ theme, logo }) => {
  const t = theme.heroTreatment;
  return (
    <>
      <SplashIntro theme={theme} />
      {t === 'dark-hero' && <DarkHero theme={theme} logo={logo} />}
      {t === 'split' && <SplitHero theme={theme} logo={logo} />}
      {(t === 'editorial' || !t) && <EditorialHero theme={theme} logo={logo} />}
    </>);

};

window.Nav = Nav;
window.Hero = Hero;