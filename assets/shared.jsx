// ─── Reveal on scroll ────────────────────────────────────────────────────────
const useReveal = () => {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    let cancelled = false;
    const reveal = () => { if (!cancelled) setVisible(true); };
    const safety = setTimeout(reveal, 400);
    const raf = requestAnimationFrame(() => {
      if (!ref.current || cancelled) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < vh && rect.bottom > 0) reveal();
    });
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { reveal(); io.disconnect(); }
    }, { threshold: 0 });
    io.observe(ref.current);
    return () => { cancelled = true; clearTimeout(safety); cancelAnimationFrame(raf); io.disconnect(); };
  }, []);
  return [ref, visible];
};

const Reveal = ({ children, delay = 0, y = 24, as: Tag = 'div', style, ...rest }) => {
  const [ref, visible] = useReveal();
  return (
    <Tag ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
      transition: `opacity 900ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 900ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      ...style,
    }} {...rest}>{children}</Tag>
  );
};

// ─── Portrait placeholder ────────────────────────────────────────────────────
const PortraitPlaceholder = ({ theme, name, label = 'portrait' }) => (
  <div style={{
    aspectRatio: '3/4', width: '100%',
    background: `repeating-linear-gradient(135deg, ${theme.bgAlt}, ${theme.bgAlt} 8px, ${theme.card} 8px, ${theme.card} 16px)`,
    border: `1px solid ${theme.line}22`,
    position: 'relative', overflow: 'hidden',
    display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start',
  }}>
    <div style={{ position: 'absolute', top: 16, left: 16, fontFamily: theme.mono, fontSize: 10, letterSpacing: 2, color: theme.fgSoft, textTransform: 'uppercase' }}>[{label}]</div>
    <div style={{ padding: 20, width: '100%', background: `linear-gradient(180deg, transparent, ${theme.card}f0)`, fontFamily: theme.serif, fontSize: 22, color: theme.fg }}>{name}</div>
  </div>
);

// ─── Custom cursor ───────────────────────────────────────────────────────────
const CustomCursor = ({ theme }) => {
  const dotRef   = React.useRef(null);
  const ringRef  = React.useRef(null);
  const posRef   = React.useRef({ x: -100, y: -100 });
  const ringPos  = React.useRef({ x: -100, y: -100 });
  const bigRef   = React.useRef(false);

  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = '* { cursor: none !important; }';
    document.head.appendChild(style);

    const onMove = e => { posRef.current = { x: e.clientX, y: e.clientY }; };
    const onEnter = e => {
      if (e.target.closest('a, button')) {
        bigRef.current = true;
        if (dotRef.current)  { dotRef.current.style.width = '14px'; dotRef.current.style.height = '14px'; dotRef.current.style.marginLeft = '-7px'; dotRef.current.style.marginTop = '-7px'; }
        if (ringRef.current) { ringRef.current.style.width = '56px'; ringRef.current.style.height = '56px'; ringRef.current.style.marginLeft = '-28px'; ringRef.current.style.marginTop = '-28px'; }
      }
    };
    const onLeave = e => {
      if (e.target.closest('a, button')) {
        bigRef.current = false;
        if (dotRef.current)  { dotRef.current.style.width = '8px'; dotRef.current.style.height = '8px'; dotRef.current.style.marginLeft = '-4px'; dotRef.current.style.marginTop = '-4px'; }
        if (ringRef.current) { ringRef.current.style.width = '32px'; ringRef.current.style.height = '32px'; ringRef.current.style.marginLeft = '-16px'; ringRef.current.style.marginTop = '-16px'; }
      }
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onEnter, { passive: true });
    document.addEventListener('mouseout',  onLeave, { passive: true });

    let raf;
    const tick = () => {
      const { x, y } = posRef.current;
      if (dotRef.current) { dotRef.current.style.left = x + 'px'; dotRef.current.style.top = y + 'px'; }
      // Ring lerp
      ringPos.current.x += (x - ringPos.current.x) * 0.12;
      ringPos.current.y += (y - ringPos.current.y) * 0.12;
      if (ringRef.current) { ringRef.current.style.left = ringPos.current.x + 'px'; ringRef.current.style.top = ringPos.current.y + 'px'; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      document.head.removeChild(style);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout',  onLeave);
      cancelAnimationFrame(raf);
    };
  }, [theme.accent]);

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', zIndex: 9997, pointerEvents: 'none',
        width: 6, height: 6, marginLeft: -3, marginTop: -3,
        background: theme.accent, borderRadius: '50%',
        transition: 'width 250ms, height 250ms, margin 250ms',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed', zIndex: 9996, pointerEvents: 'none',
        width: 18, height: 18, marginLeft: -9, marginTop: -9,
        border: `1px solid ${theme.accent}55`, borderRadius: '50%',
        transition: 'width 250ms, height 250ms, margin 250ms',
      }} />
    </>
  );
};

// ─── Scroll progress bar ─────────────────────────────────────────────────────
const ScrollProgress = ({ theme }) => {
  const [pct, setPct] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setPct(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, zIndex: 48,
      height: 2, background: theme.accent,
      width: `${pct}%`,
      transition: 'width 80ms linear',
      pointerEvents: 'none',
    }} />
  );
};

// ─── Section dots navigation ─────────────────────────────────────────────────
const SectionDots = ({ theme }) => {
  const sections = [
    { id: 'top',        label: 'Accueil' },
    { id: 'expertises', label: 'Expertises' },
    { id: 'equipe',     label: 'Équipe' },
    { id: 'apropos',    label: 'À propos' },
    { id: 'articles',   label: 'Articles' },
    { id: 'contact',    label: 'Contact' },
  ];
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const observers = sections.map(({ id }, i) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive(i);
      }, { threshold: 0.3 });
      io.observe(el);
      return io;
    });
    return () => observers.forEach(io => io && io.disconnect());
  }, []);

  return (
    <div style={{
      position: 'fixed', left: 20, top: '50%', transform: 'translateY(-50%)',
      zIndex: 30, display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      {sections.map(({ id, label }, i) => (
        <a key={id} href={`#${id}`} title={label} style={{ textDecoration: 'none' }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            border: `1px solid ${theme.fgSoft}`,
            background: active === i ? theme.accent : 'transparent',
            transform: active === i ? 'scale(1.4)' : 'scale(1)',
            transition: 'background 300ms, transform 300ms, border-color 300ms',
            borderColor: active === i ? theme.accent : theme.fgSoft,
          }} />
        </a>
      ))}
    </div>
  );
};

window.Reveal          = Reveal;
window.useReveal       = useReveal;
window.PortraitPlaceholder = PortraitPlaceholder;
window.CustomCursor    = CustomCursor;
window.ScrollProgress  = ScrollProgress;
window.SectionDots     = SectionDots;
