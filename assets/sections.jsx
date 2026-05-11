// ─── Helpers ─────────────────────────────────────────────────────────────────
const SectionLabel = ({ theme, num, label }) =>
<div style={{
  fontFamily: theme.mono, fontSize: 11, letterSpacing: 3,
  color: theme.accent, textTransform: 'uppercase',
  marginBottom: 24, display: 'flex', gap: 20, alignItems: 'center'
}}>
    <span>── {num}</span>
    <span style={{ color: theme.fgSoft }}>{label}</span>
  </div>;


const SectionDivider = ({ theme }) =>
<div style={{
  height: 1,
  background: `linear-gradient(90deg, transparent, ${theme.accent}40 20%, ${theme.fg}20 50%, ${theme.accent}40 80%, transparent)`,
  opacity: 0.6
}} />;


const GridBackground = ({ theme }) =>
<div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="none">
      {[25, 50, 75].map((pct) =>
    <line key={pct} x1={`${pct}%`} y1="0" x2={`${pct}%`} y2="100%"
    stroke={theme.line} strokeWidth="0.3" opacity="0.08" />
    )}
    </svg>
  </div>;


// ─── Animated counter hook ────────────────────────────────────────────────────
const useCountUp = (target, duration = 1800) => {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const tick = (now) => {
        const elapsed = Math.min((now - start) / duration, 1);
        setCount(Math.round(ease(elapsed) * target));
        if (elapsed < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target, duration]);
  return [ref, count];
};

// ─── About ────────────────────────────────────────────────────────────────────
const About = ({ theme }) => {
  const stats = [
  { target: 8, suffix: '+', label: "Années d'expertise" },
  { target: 200, suffix: '+', label: 'Dossiers traités' },
  { target: 3, suffix: '', label: 'Avocats associés' }];


  const StatItem = ({ target, suffix, label }) => {
    const [ref, count] = useCountUp(target);
    return (
      <div ref={ref}>
        <div style={{ fontFamily: theme.serif, fontSize: 48, color: theme.accent, lineHeight: 1, marginBottom: 8 }}>
          {count}{suffix}
        </div>
        <div style={{ fontFamily: theme.mono, fontSize: 10, letterSpacing: 2, color: theme.fgSoft, textTransform: 'uppercase' }}>{label}</div>
      </div>);

  };

  return (
    <section id="apropos" data-screen-label="03 À propos" style={{ background: theme.bg, color: theme.fg, padding: '80px 48px', position: 'relative', overflow: 'hidden' }}>
        <GridBackground theme={theme} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}>
            <Reveal delay={100}>
              <h2 style={{ fontFamily: theme.serif, fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 1, margin: 0, fontWeight: 400, letterSpacing: -1.5 }}>
                Un engagement <span style={{ fontStyle: 'italic', color: theme.accent }}>sans faille</span>.
              </h2>
            </Reveal>
            <Reveal delay={250}>
              <div style={{ fontFamily: theme.sans, fontSize: 17, lineHeight: 1.7, color: theme.fg }}>
                <p style={{ margin: '0 0 24px' }}>
                  Le cabinet AMI accompagne entrepreneurs, investisseurs et promoteurs dans la réalisation de leurs projets — de la structuration initiale à la gestion des contentieux.
                </p>
                <p style={{ margin: '0 0 24px', color: theme.fgSoft }}>
                  Nous croyons en une approche personnalisée, fondée sur l'écoute et la compréhension fine des enjeux propres à chaque dossier. Chaque mandat est traité avec la même exigence de qualité.
                </p>
                <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, borderTop: `1px solid ${theme.line}22`, paddingTop: 32 }}>
                  {stats.map((s) => <StatItem key={s.label} {...s} />)}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>);



};

// ─── Expertises (9 cartes) ────────────────────────────────────────────────────
const Expertises = ({ theme }) => {
  const catColor = (cat) => {
    if (cat === 'Affaires') return theme.accent;
    if (cat === 'Immobilier') return `${theme.fg}55`;
    return `${theme.fg}20`;
  };

  const cards = [
  { id: 'corporate', num: '01', cat: 'Affaires', title: 'Corporate & M&A', tags: ['M&A', 'Pactes', 'Gouvernance', 'Levées de fonds'] },
  { id: 'immo-dev', num: '02', cat: 'Immobilier', title: 'Développement immobilier', tags: ['VEFA', 'Urbanisme', 'Baux', 'Montages'] },
  { id: 'contentieux', num: '03', cat: 'Général', title: 'Contentieux', tags: ['Litiges', 'Arbitrage', 'Médiation', 'Plaidoirie'] },
  { id: 'baux', num: '04', cat: 'Immobilier', title: 'Baux & Asset Management', tags: ['Bail commercial', 'Asset Management', 'Gestion locative'] },
  { id: 'difficultes', num: '05', cat: 'Affaires', title: 'Entreprises en difficultés', tags: ['Prévention', 'Sauvegarde', 'Redressement', 'Liquidation'] },
  { id: 'immobilier2', num: '06', cat: 'Immobilier', title: 'Investissement immobilier', tags: ['Structuration', 'Due diligence', 'Financement', 'Cession'] }];


  const [hovered, setHovered] = React.useState(null);

  return (
    <section id="expertises" data-screen-label="01 Expertises" style={{ background: theme.bg, color: theme.fg, padding: '80px 48px', position: 'relative', overflow: 'hidden' }}>
        <GridBackground theme={theme} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Reveal delay={100}>
            <h2 style={{ fontFamily: theme.serif, fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 1, margin: '0 0 40px', fontWeight: 400, letterSpacing: -1.5, maxWidth: 800 }}>
              L'immobilier, <span style={{ fontStyle: 'italic', color: theme.accent }}>tout l'immobilier</span>.
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {cards.map((card, i) => {
            const isHov = hovered === i;
            const cc = catColor(card.cat);
            return (
              <Reveal key={card.id} delay={i * 60} y={20}>
                  <div
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    padding: '28px 24px 24px 28px',
                    background: isHov ? theme.fg : theme.card,
                    position: 'relative', overflow: 'hidden',
                    minHeight: 140,
                    display: 'flex', flexDirection: 'column', gap: 10,
                    transition: 'background 400ms cubic-bezier(.2,.7,.2,1)',
                    cursor: 'default'
                  }}>
                    
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: cc, opacity: isHov ? 0 : 1, transition: 'opacity 300ms' }} />
                    <h3 style={{
                    fontFamily: theme.serif,
                    fontSize: 'clamp(18px, 1.8vw, 26px)',
                    margin: 0, fontWeight: 400, lineHeight: 1.1,
                    color: isHov ? theme.bg : theme.fg,
                    transition: 'color 400ms'
                  }}>{card.title}</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {card.tags.map((t) =>
                    <span key={t} style={{
                      fontFamily: theme.mono, fontSize: 9, letterSpacing: 0.5,
                      padding: '2px 7px',
                      border: `1px solid ${isHov ? theme.bg + '40' : theme.line + '28'}`,
                      color: isHov ? `${theme.bg}cc` : theme.fgSoft,
                      textTransform: 'uppercase',
                      transition: 'border-color 400ms, color 400ms'
                    }}>{t}</span>
                    )}
                    </div>
                    <div style={{
                    position: 'absolute', bottom: 16, right: 20,
                    fontFamily: theme.serif, fontSize: 18,
                    color: isHov ? theme.accent : 'transparent',
                    transform: isHov ? 'translateX(0)' : 'translateX(-6px)',
                    transition: 'color 300ms, transform 300ms'
                  }}>→</div>
                  </div>
                </Reveal>);

          })}
          </div>
        </div>
      </section>);



};

// ─── Team ─────────────────────────────────────────────────────────────────────
const Team = ({ theme }) => {
  const allMembers = [
  { name: 'Marwan Tahar', role: 'Avocat · Droit des affaires', bio: 'Spécialisé en opérations de M&A, structuration de sociétés et pactes d\'associés.' },
  { name: 'Thomas Sadaka', role: 'Avocat · Droit immobilier', bio: 'Expert en promotion immobilière, VEFA et montages complexes d\'investissement.' },
  { name: 'Simon Roumégoux', role: 'Avocat · Conseil stratégique', bio: 'Intervient en restructuration, transmission d\'entreprise et due diligence.' }];

  const members = React.useMemo(() => {
    const arr = [...allMembers];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  return (
    <section id="equipe" data-screen-label="02 Équipe" style={{ background: theme.bgAlt, color: theme.fg, padding: '80px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Reveal delay={100}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 80, gap: 40, flexWrap: 'wrap' }}>
              <h2 style={{ fontFamily: theme.serif, fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 1, margin: 0, fontWeight: 400, letterSpacing: -1.5 }}>
                <span style={{ fontStyle: 'italic', color: theme.accent }}>ÉQUIPE</span>
              </h2>
              <p style={{ fontFamily: theme.sans, fontSize: 16, color: theme.fgSoft, margin: 0, maxWidth: 400, lineHeight: 1.6 }}>
                Au-delà de l'avocat, nous sommes les partenaires juridiques des entrepreneurs et des investisseurs.
              </p>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
            {members.map((m, i) =>
          <Reveal key={m.name} delay={i * 150} y={40}>
                <div style={{ cursor: 'pointer' }}
            onMouseEnter={(e) => {const img = e.currentTarget.querySelector('.portrait');if (img) img.style.transform = 'scale(1.02)';}}
            onMouseLeave={(e) => {const img = e.currentTarget.querySelector('.portrait');if (img) img.style.transform = 'scale(1)';}}>
                
                  <div className="portrait" style={{ transition: 'transform 600ms cubic-bezier(.2,.7,.2,1)', marginBottom: 24 }}>
                    <PortraitPlaceholder theme={theme} name={m.name} label={`portrait ${m.name.split(' ')[0].toLowerCase()}`} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: theme.serif, fontSize: 28, margin: 0, fontWeight: 400 }}>{m.name}</h3>
                    <div style={{ fontFamily: theme.mono, fontSize: 11, letterSpacing: 2, color: theme.accent, textTransform: 'uppercase', marginTop: 8 }}>{m.role}</div>
                  </div>
                  <p style={{ fontFamily: theme.sans, fontSize: 15, color: theme.fgSoft, lineHeight: 1.6, marginTop: 16 }}>{m.bio}</p>
                </div>
              </Reveal>
          )}
          </div>
        </div>
      </section>);



};

// ─── Articles ─────────────────────────────────────────────────────────────────
const useClipReveal = () => {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {setVisible(true);io.disconnect();}
    }, { threshold: 0.2 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
};

const Articles = ({ theme }) => {
  const articles = [
  { cat: 'Droit des affaires', date: '1 MAR 2026', title: 'Créer son entreprise : les étapes juridiques essentielles', read: '6 min' },
  { cat: 'Immobilier', date: '15 FÉV 2026', title: 'Nouvelles obligations déclaratives pour les SCI', read: '4 min' },
  { cat: 'Immobilier', date: '20 JAN 2026', title: 'Guide pratique : le bail commercial en 2026', read: '8 min' }];


  const ArticleCard = ({ a, i }) => {
    const [ref, visible] = useClipReveal();
    return (
      <div ref={ref} style={{
        clipPath: visible ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
        transition: `clip-path 700ms cubic-bezier(.4,0,.2,1) ${i * 120}ms`
      }}>
        <a href="#" style={{ display: 'block', textDecoration: 'none', color: theme.fg, borderTop: `1px solid ${theme.line}`, paddingTop: 24, height: '100%' }}
        onMouseEnter={(e) => {e.currentTarget.style.borderTopColor = theme.accent;const t = e.currentTarget.querySelector('.arrow');if (t) t.style.transform = 'translateX(8px)';}}
        onMouseLeave={(e) => {e.currentTarget.style.borderTopColor = theme.line;const t = e.currentTarget.querySelector('.arrow');if (t) t.style.transform = 'translateX(0)';}}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: theme.mono, fontSize: 10, letterSpacing: 2, color: theme.fgSoft, textTransform: 'uppercase', marginBottom: 40 }}>
            <span>{a.cat}</span>
            <span>{a.date}</span>
          </div>
          <h3 style={{ fontFamily: theme.serif, fontSize: 26, lineHeight: 1.15, margin: 0, fontWeight: 400, minHeight: 90 }}>{a.title}</h3>
          <div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: theme.mono, fontSize: 10, letterSpacing: 2, color: theme.fgSoft, textTransform: 'uppercase' }}>
            <span>{a.read} lecture</span>
            <span className="arrow" style={{ color: theme.accent, fontSize: 14, transition: 'transform 300ms' }}>→</span>
          </div>
        </a>
      </div>);

  };

  return (
    <section id="articles" data-screen-label="04 Articles" style={{ background: theme.bgAlt, color: theme.fg, padding: '80px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Reveal delay={100}>
            <h2 style={{ fontFamily: theme.serif, fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 1, margin: '0 0 80px', fontWeight: 400, letterSpacing: -1.5 }}>
              Regards <span style={{ fontStyle: 'italic', color: theme.accent }}>juridiques</span>.
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {articles.map((a, i) => <ArticleCard key={i} a={a} i={i} />)}
          </div>
        </div>
      </section>);



};

// ─── Contact ──────────────────────────────────────────────────────────────────
const Contact = ({ theme }) => {
  const [sent, setSent] = React.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    e.target.reset();
  };

  return (
    <section id="contact" data-screen-label="05 Contact" style={{ background: theme.bg, color: theme.fg, padding: '48px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Reveal delay={100}>
            <h2 style={{ fontFamily: theme.serif, fontSize: 'clamp(28px, 3vw, 52px)', lineHeight: 0.95, margin: '0 0 32px', fontWeight: 400, letterSpacing: -1.5, maxWidth: 1100 }}>
              Parlons de votre <span style={{ fontStyle: 'italic', color: theme.accent }}>projet</span>.
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 48, alignItems: 'start' }}>
            <Reveal delay={200}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                {[
              { label: 'Email', value: 'contact@ami-avocats.fr', href: 'mailto:contact@ami-avocats.fr' },
              { label: 'Téléphone', value: '+33 1 23 45 67 89', href: 'tel:+33123456789' },
              { label: 'Adresse', value: '123 Avenue des Champs-Élysées\n75008 Paris, France' },
              { label: 'Horaires', value: 'Lun – Ven · 9h – 19h\nSur rendez-vous' }].
              map((info) =>
              <div key={info.label}>
                    <div style={{ fontFamily: theme.mono, fontSize: 10, letterSpacing: 2, color: theme.fgSoft, textTransform: 'uppercase', marginBottom: 6 }}>{info.label}</div>
                    {info.href ?
                <a href={info.href} style={{ fontFamily: theme.serif, fontSize: 22, color: theme.fg, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}` }}>{info.value}</a> :
                <div style={{ fontFamily: theme.serif, fontSize: 20, color: theme.fg, whiteSpace: 'pre-line', lineHeight: 1.4 }}>{info.value}</div>
                }
                  </div>
              )}
              </div>
            </Reveal>

            <Reveal delay={350}>
              <form onSubmit={handleSubmit} style={{ background: theme.card, padding: '28px 28px', border: `1px solid ${theme.line}22` }}>
                {sent &&
              <div style={{ marginBottom: 16, padding: '12px 16px', background: theme.accent, color: '#fff', fontFamily: theme.sans, fontSize: 13, letterSpacing: 0.5 }}>
                    ✓ Message envoyé — nous vous répondrons sous 24h.
                  </div>
              }
                <div style={{ display: 'grid', gap: 18 }}>
                  {[{ label: 'Nom', type: 'text', name: 'name' }, { label: 'Email', type: 'email', name: 'email' }, { label: 'Sujet', type: 'text', name: 'subject' }].map((f) =>
                <label key={f.name} style={{ display: 'block' }}>
                      <div style={{ fontFamily: theme.mono, fontSize: 10, letterSpacing: 2, color: theme.fgSoft, textTransform: 'uppercase', marginBottom: 6 }}>{f.label}</div>
                      <input type={f.type} name={f.name} required style={{ width: '100%', padding: '10px 0', border: 'none', borderBottom: `1px solid ${theme.line}44`, background: 'transparent', fontFamily: theme.sans, fontSize: 15, color: theme.fg, outline: 'none' }}
                  onFocus={(e) => e.target.style.borderBottomColor = theme.accent}
                  onBlur={(e) => e.target.style.borderBottomColor = `${theme.line}44`} />
                    </label>
                )}

                  <label style={{ display: 'block' }}>
                    <div style={{ fontFamily: theme.mono, fontSize: 10, letterSpacing: 2, color: theme.fgSoft, textTransform: 'uppercase', marginBottom: 6 }}>Type de demande</div>
                    <select name="type" style={{ width: '100%', padding: '10px 0', border: 'none', borderBottom: `1px solid ${theme.line}44`, background: 'transparent', fontFamily: theme.sans, fontSize: 15, color: theme.fg, outline: 'none', appearance: 'none' }}>
                      <option>Droit des affaires</option>
                      <option>Droit immobilier</option>
                      <option>Contentieux</option>
                      <option>Autre</option>
                    </select>
                  </label>

                  <label style={{ display: 'block' }}>
                    <div style={{ fontFamily: theme.mono, fontSize: 10, letterSpacing: 2, color: theme.fgSoft, textTransform: 'uppercase', marginBottom: 6 }}>Message</div>
                    <textarea rows={4} required style={{ width: '100%', padding: '10px 0', border: 'none', borderBottom: `1px solid ${theme.line}44`, background: 'transparent', fontFamily: theme.sans, fontSize: 15, color: theme.fg, outline: 'none', resize: 'vertical' }}
                  onFocus={(e) => e.target.style.borderBottomColor = theme.accent}
                  onBlur={(e) => e.target.style.borderBottomColor = `${theme.line}44`} />
                  </label>

                  <button type="submit" style={{ marginTop: 4, padding: '14px 24px', background: theme.fg, color: theme.bg, border: 'none', fontFamily: theme.sans, fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer', fontWeight: 500 }}>
                    Envoyer le message →
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </section>);



};

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = ({ theme, logo }) =>
<footer style={{ background: theme.bg, color: theme.fg, padding: '80px 48px 40px', borderTop: `1px solid ${theme.line}22` }}>
    <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 60, marginBottom: 80 }}>
        <div>
          {logo.render({ theme, size: 1 })}
          <p style={{ fontFamily: theme.sans, fontSize: 14, color: theme.fgSoft, marginTop: 24, lineHeight: 1.6, maxWidth: 360 }}>
            Cabinet d'avocats spécialisé en droit des affaires et en droit immobilier.
          </p>
        </div>
        {[
      { title: 'Navigation', items: ['À propos', 'Expertises', 'Équipe', 'Articles', 'Contact'] },
      { title: 'Contact', items: ['contact@ami-avocats.fr', '+33 1 23 45 67 89', '123 Avenue des Champs-Élysées', '75008 Paris'] },
      { title: 'Légal', items: ['Mentions légales', 'Politique de confidentialité', 'RGPD', 'Déontologie'] }].
      map((col) =>
      <div key={col.title}>
            <h4 style={{ fontFamily: theme.mono, fontSize: 10, letterSpacing: 2, color: theme.accent, textTransform: 'uppercase', margin: '0 0 20px' }}>{col.title}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {col.items.map((item) => <li key={item} style={{ fontFamily: theme.sans, fontSize: 14, color: theme.fgSoft }}>{item}</li>)}
            </ul>
          </div>
      )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24, borderTop: `1px solid ${theme.line}22`, fontFamily: theme.mono, fontSize: 10, letterSpacing: 2, color: theme.fgSoft, textTransform: 'uppercase' }}>
        <span>© 2026 AMI — Cabinet d'avocats</span>
        <span>Paris · Made with care</span>
      </div>
    </div>
  </footer>;


window.About = About;
window.Expertises = Expertises;
window.Team = Team;
window.Articles = Articles;
window.Contact = Contact;
window.Footer = Footer;
window.SectionDivider = SectionDivider;