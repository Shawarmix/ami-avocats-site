// 6 directions de logo. Chaque fonction prend { theme, size, mono } et rend un SVG.
// mono = si true, affiche en monochromie sur fond transparent

const LOGO_VARIANTS = [
{
  id: 'capitales-serif',
  name: 'Capitales sérif espacées',
  description: 'Sobre, intemporel, haut de gamme',
  render: ({ theme, size = 1 }) =>
  <svg viewBox="0 0 220 64" style={{ width: 220 * size, height: 64 * size, display: 'block' }}>
        <text x="110" y="34" fill={theme.fg} fontFamily={theme.serif} fontSize="30" fontWeight="400" textAnchor="middle" letterSpacing="6">AMI</text>
        <line x1="60" y1="44" x2="160" y2="44" stroke={theme.accent} strokeWidth="0.8" />
        <text x="110" y="56" fill={theme.fgSoft} fontFamily={theme.sans} fontSize="7" textAnchor="middle" letterSpacing="4">AVOCATS · PARIS</text>
      </svg>,

  compact: ({ theme, size = 1 }) =>
  <svg viewBox="0 0 90 40" style={{ width: 90 * size, height: 40 * size, display: 'block' }}>
        <text x="45" y="26" fill={theme.fg} fontFamily={theme.serif} fontSize="22" fontWeight="400" textAnchor="middle" letterSpacing="4">AMI</text>
      </svg>

},
{
  id: 'monogramme-cercle',
  name: 'Monogramme cerclé',
  description: 'Sceau institutionnel, héritage',
  render: ({ theme, size = 1 }) =>
  <svg viewBox="0 0 220 64" style={{ width: 220 * size, height: 64 * size, display: 'block' }}>
        <circle cx="32" cy="32" r="26" fill="none" stroke={theme.fg} strokeWidth="0.8" />
        <text x="32" y="40" fill={theme.fg} fontFamily={theme.serif} fontSize="22" fontStyle="italic" textAnchor="middle">A</text>
        <text x="74" y="30" fill={theme.fg} fontFamily={theme.serif} fontSize="22" fontWeight="400" letterSpacing="2">AMI</text>
        <text x="74" y="46" fill={theme.accent} fontFamily={theme.sans} fontSize="7" letterSpacing="3">AVOCATS</text>
      </svg>,

  compact: ({ theme, size = 1 }) =>
  <svg viewBox="0 0 64 64" style={{ width: 64 * size, height: 64 * size, display: 'block' }}>
        <circle cx="32" cy="32" r="26" fill="none" stroke={theme.fg} strokeWidth="0.8" />
        <text x="32" y="40" fill={theme.fg} fontFamily={theme.serif} fontSize="22" fontStyle="italic" textAnchor="middle">A</text>
      </svg>

},
{
  id: 'bloc-plein',
  name: 'Bloc plein',
  description: 'Fort, moderne, affirmé',
  render: ({ theme, size = 1 }) =>
  <svg viewBox="0 0 220 64" style={{ width: 220 * size, height: 64 * size, display: 'block' }}>
        <rect x="8" y="12" width="44" height="44" fill={theme.accent} />
        <text x="30" y="44" fill={theme.bg} fontFamily={theme.serif} fontSize="26" textAnchor="middle" fontWeight="500">A</text>
        <text x="62" y="34" fill={theme.fg} fontFamily={theme.sans} fontSize="18" fontWeight="600" letterSpacing="1">AMI</text>
        <text x="62" y="50" fill={theme.fgSoft} fontFamily={theme.sans} fontSize="8" letterSpacing="2">AVOCATS · PARIS</text>
      </svg>,

  compact: ({ theme, size = 1 }) =>
  <svg viewBox="0 0 44 44" style={{ width: 44 * size, height: 44 * size, display: 'block' }}>
        <rect x="0" y="0" width="44" height="44" fill={theme.accent} />
        <text x="22" y="31" fill={theme.bg} fontFamily={theme.serif} fontSize="24" textAnchor="middle" fontWeight="500">A</text>
      </svg>

},
{
  id: 'ligne-italique',
  name: 'Italique bas-de-casse',
  description: 'Humain, éditorial, proche',
  render: ({ theme, size = 1 }) =>
  <svg viewBox="0 0 220 64" style={{ width: 220 * size, height: 64 * size, display: 'block' }}>
        <text x="12" y="44" fill={theme.fg} fontFamily={theme.serif} fontSize="38" fontStyle="italic" fontWeight="400">ami</text>
        <circle cx="84" cy="42" r="1.8" fill={theme.accent} />
        <text x="94" y="30" fill={theme.fgSoft} fontFamily={theme.sans} fontSize="7" letterSpacing="3">CABINET D'AVOCATS</text>
        <text x="94" y="44" fill={theme.fgSoft} fontFamily={theme.sans} fontSize="7" letterSpacing="3">AFFAIRES · IMMOBILIER</text>
      </svg>,

  compact: ({ theme, size = 1 }) =>
  <svg viewBox="0 0 90 48" style={{ width: 90 * size, height: 48 * size, display: 'block' }}>
        <text x="10" y="36" fill={theme.fg} fontFamily={theme.serif} fontSize="32" fontStyle="italic">ami</text>
        <circle cx="72" cy="34" r="1.5" fill={theme.accent} />
      </svg>

},
{
  id: 'lignes-empilees',
  name: 'Empilement typographique',
  description: 'Architectural, éditorial, précis',
  render: ({ theme, size = 1 }) =>
  <svg viewBox="0 0 220 64" style={{ width: 220 * size, height: 64 * size, display: 'block' }}>
        <text x="12" y="28" fill={theme.fg} fontFamily={theme.serif} fontSize="22" fontWeight="500" letterSpacing="2">AMI</text>
        <text x="12" y="44" fill={theme.accent} fontFamily={theme.sans} fontSize="9" fontWeight="500" letterSpacing="3">AVOCATS</text>
        <line x1="12" y1="52" x2="80" y2="52" stroke={theme.fg} strokeWidth="0.4" />
        <text x="12" y="60" fill={theme.fgSoft} fontFamily={theme.mono} fontSize="6" letterSpacing="1">PARIS · EST. 2018</text>
      </svg>,

  compact: ({ theme, size = 1 }) =>
  <svg viewBox="0 0 80 48" style={{ width: 80 * size, height: 48 * size, display: 'block' }}>
        <text x="10" y="24" fill={theme.fg} fontFamily={theme.serif} fontSize="20" fontWeight="500" letterSpacing="2">AMI</text>
        <text x="10" y="38" fill={theme.accent} fontFamily={theme.sans} fontSize="8" fontWeight="500" letterSpacing="3">AVOCATS</text>
      </svg>

},
{
  id: 'lettres-geometriques',
  name: 'Lettres géométriques',
  description: 'Contemporain, confiant, distinctif',
  render: ({ theme, size = 1 }) =>
  <svg viewBox="0 0 220 64" style={{ width: 220 * size, height: 64 * size, display: 'block' }}>
        {/* A triangle */}
        <path d="M 14 50 L 26 14 L 38 50 M 20 38 L 32 38" stroke={theme.fg} strokeWidth="2.2" fill="none" strokeLinecap="square" strokeLinejoin="miter" />
        {/* M */}
        <path d="M 46 50 L 46 14 L 58 34 L 70 14 L 70 50" stroke={theme.fg} strokeWidth="2.2" fill="none" strokeLinecap="square" strokeLinejoin="miter" />
        {/* I */}
        <line x1="80" y1="14" x2="80" y2="50" stroke={theme.fg} strokeWidth="2.2" strokeLinecap="square" />
        <circle cx="80" cy="8" r="2" fill={theme.accent} />
        <text x="98" y="32" fill={theme.fgSoft} fontFamily={theme.sans} fontSize="8" letterSpacing="3">CABINET</text>
        <text x="98" y="46" fill={theme.fgSoft} fontFamily={theme.sans} fontSize="8" letterSpacing="3">D'AVOCATS</text>
      </svg>,

  compact: ({ theme, size = 1 }) =>
  <svg viewBox="0 0 90 60" style={{ width: 90 * size, height: 60 * size, display: 'block' }}>
        <path d="M 10 50 L 22 14 L 34 50 M 16 38 L 28 38" stroke={theme.fg} strokeWidth="2.2" fill="none" strokeLinejoin="miter" />
        <path d="M 42 50 L 42 14 L 54 34 L 66 14 L 66 50" stroke={theme.fg} strokeWidth="2.2" fill="none" strokeLinejoin="miter" />
        <line x1="76" y1="14" x2="76" y2="50" stroke={theme.fg} strokeWidth="2.2" />
        <circle cx="76" cy="8" r="2" fill={theme.accent} />
      </svg>

}];


// ——————————————————————————————————————————————
// Nouvelle série : explorations autour de A / AA
// ——————————————————————————————————————————————

LOGO_VARIANTS.push(
  {
    id: 'aa-miroir',
    name: 'AA miroir',
    description: 'Deux A en miroir — accord, alliance, dialogue',
    render: ({ theme, size = 1 }) =>
    <svg viewBox="0 0 240 64" style={{ width: 240 * size, height: 64 * size, display: 'block' }}>
        {/* A droit */}
        <path d="M 12 52 L 28 14 L 44 52 M 19 38 L 37 38" stroke={theme.fg} strokeWidth="1.6" fill="none" strokeLinejoin="miter" />
        {/* A inversé (miroir vertical) */}
        <path d="M 52 14 L 68 52 L 84 14 M 59 28 L 77 28" stroke={theme.accent} strokeWidth="1.6" fill="none" strokeLinejoin="miter" />
        <line x1="100" y1="20" x2="100" y2="48" stroke={theme.fg} strokeWidth="0.6" opacity="0.3" />
        <text x="112" y="30" fill={theme.fg} fontFamily={theme.serif} fontSize="18" letterSpacing="3">AMI</text>
        <text x="112" y="46" fill={theme.fgSoft} fontFamily={theme.sans} fontSize="7" letterSpacing="3">AVOCATS · PARIS</text>
      </svg>,

    compact: ({ theme, size = 1 }) =>
    <svg viewBox="0 0 88 64" style={{ width: 88 * size, height: 64 * size, display: 'block' }}>
        <path d="M 8 52 L 24 14 L 40 52 M 15 38 L 33 38" stroke={theme.fg} strokeWidth="1.6" fill="none" strokeLinejoin="miter" />
        <path d="M 48 14 L 64 52 L 80 14 M 55 28 L 73 28" stroke={theme.accent} strokeWidth="1.6" fill="none" strokeLinejoin="miter" />
      </svg>

  },
  {
    id: 'aa-ligatures',
    name: 'AA ligaturé',
    description: 'Double A fusionné — monogramme signature',
    render: ({ theme, size = 1 }) =>
    <svg viewBox="0 0 240 72" style={{ width: 240 * size, height: 72 * size, display: 'block' }}>
        {/* Deux A serif qui partagent la barre transversale */}
        <path d="M 10 58 L 30 10 L 50 58 M 30 10 L 50 58 L 70 10 L 90 58"
      stroke={theme.fg} strokeWidth="1.2" fill="none" strokeLinejoin="miter" />
        <line x1="18" y1="42" x2="82" y2="42" stroke={theme.accent} strokeWidth="1.2" />
        <text x="108" y="34" fill={theme.fg} fontFamily={theme.serif} fontSize="22" fontWeight="400" letterSpacing="4">AMI</text>
        <text x="108" y="50" fill={theme.fgSoft} fontFamily={theme.sans} fontSize="7" letterSpacing="3">AVOCATS ASSOCIÉS</text>
      </svg>,

    compact: ({ theme, size = 1 }) =>
    <svg viewBox="0 0 100 68" style={{ width: 100 * size, height: 68 * size, display: 'block' }}>
        <path d="M 6 58 L 26 10 L 46 58 M 26 10 L 46 58 L 66 10 L 86 58"
      stroke={theme.fg} strokeWidth="1.2" fill="none" strokeLinejoin="miter" />
        <line x1="14" y1="42" x2="78" y2="42" stroke={theme.accent} strokeWidth="1.2" />
      </svg>

  },
  {
    id: 'a-chevron',
    name: 'A — chevron',
    description: 'A stylisé en chevron — ascension, structure',
    render: ({ theme, size = 1 }) =>
    <svg viewBox="0 0 240 64" style={{ width: 240 * size, height: 64 * size, display: 'block' }}>
        {/* Chevron plein figurant un A sans barre */}
        <path d="M 14 54 L 34 12 L 54 54 L 46 54 L 34 28 L 22 54 Z" fill={theme.fg} />
        {/* Point orange = barre du A */}
        <rect x="27" y="38" width="14" height="2.2" fill={theme.accent} />
        <text x="68" y="34" fill={theme.fg} fontFamily={theme.sans} fontSize="20" fontWeight="600" letterSpacing="2">AMI</text>
        <text x="68" y="50" fill={theme.fgSoft} fontFamily={theme.mono} fontSize="7" letterSpacing="2">AVOCATS — PARIS</text>
      </svg>,

    compact: ({ theme, size = 1 }) =>
    <svg viewBox="0 0 68 64" style={{ width: 68 * size, height: 64 * size, display: 'block' }}>
        <path d="M 10 54 L 30 12 L 50 54 L 42 54 L 30 28 L 18 54 Z" fill={theme.fg} />
        <rect x="23" y="38" width="14" height="2.2" fill={theme.accent} />
      </svg>

  },
  {
    id: 'a-colonne',
    name: 'A — colonne',
    description: 'A architectural évoquant une colonne de justice',
    render: ({ theme, size = 1 }) =>
    <svg viewBox="0 0 240 72" style={{ width: 240 * size, height: 72 * size, display: 'block' }}>
        {/* Chapiteau */}
        <line x1="12" y1="10" x2="56" y2="10" stroke={theme.fg} strokeWidth="1.4" />
        <line x1="16" y1="14" x2="52" y2="14" stroke={theme.fg} strokeWidth="0.6" />
        {/* Fût du A */}
        <line x1="24" y1="18" x2="18" y2="58" stroke={theme.fg} strokeWidth="1.2" />
        <line x1="44" y1="18" x2="50" y2="58" stroke={theme.fg} strokeWidth="1.2" />
        {/* Cannelures */}
        <line x1="30" y1="20" x2="28" y2="56" stroke={theme.fgSoft} strokeWidth="0.4" />
        <line x1="34" y1="20" x2="34" y2="56" stroke={theme.fgSoft} strokeWidth="0.4" />
        <line x1="38" y1="20" x2="40" y2="56" stroke={theme.fgSoft} strokeWidth="0.4" />
        {/* Base */}
        <line x1="10" y1="62" x2="58" y2="62" stroke={theme.fg} strokeWidth="1.4" />
        {/* Barre centrale = accent */}
        <line x1="22" y1="40" x2="46" y2="40" stroke={theme.accent} strokeWidth="1.4" />

        <text x="80" y="36" fill={theme.fg} fontFamily={theme.serif} fontSize="22" fontWeight="400" letterSpacing="4">AMI</text>
        <text x="80" y="52" fill={theme.fgSoft} fontFamily={theme.sans} fontSize="7" letterSpacing="3">AVOCATS · PARIS</text>
      </svg>,

    compact: ({ theme, size = 1 }) =>
    <svg viewBox="0 0 68 72" style={{ width: 68 * size, height: 72 * size, display: 'block' }}>
        <line x1="10" y1="10" x2="54" y2="10" stroke={theme.fg} strokeWidth="1.4" />
        <line x1="22" y1="18" x2="16" y2="58" stroke={theme.fg} strokeWidth="1.2" />
        <line x1="42" y1="18" x2="48" y2="58" stroke={theme.fg} strokeWidth="1.2" />
        <line x1="8" y1="62" x2="56" y2="62" stroke={theme.fg} strokeWidth="1.4" />
        <line x1="20" y1="40" x2="44" y2="40" stroke={theme.accent} strokeWidth="1.4" />
      </svg>

  },
  {
    id: 'a-point-orange',
    name: 'A. — point éditorial',
    description: 'A serif suivi d\'un point accentué — signature brève',
    render: ({ theme, size = 1 }) =>
    <svg viewBox="0 0 240 64" style={{ width: 240 * size, height: 64 * size, display: 'block' }}>
        <text x="12" y="50" fill={theme.fg} fontFamily={theme.serif} fontSize="54" fontWeight="500">A</text>
        <circle cx="56" cy="46" r="4" fill={theme.accent} />
        <text x="78" y="30" fill={theme.fg} fontFamily={theme.sans} fontSize="13" fontWeight="500" letterSpacing="4">AMI AVOCATS</text>
        <line x1="78" y1="36" x2="180" y2="36" stroke={theme.fg} strokeWidth="0.4" opacity="0.4" />
        <text x="78" y="50" fill={theme.fgSoft} fontFamily={theme.mono} fontSize="7" letterSpacing="2">AFFAIRES · IMMOBILIER · CONTENTIEUX</text>
      </svg>,

    compact: ({ theme, size = 1 }) =>
    <svg viewBox="0 0 72 64" style={{ width: 72 * size, height: 64 * size, display: 'block' }}>
        <text x="8" y="50" fill={theme.fg} fontFamily={theme.serif} fontSize="54" fontWeight="500" style={{ opacity: "4" }}>A</text>
        <circle cx="52" cy="46" r="4" fill={theme.accent} style={{ fill: "rgb(203, 72, 32)" }} />
      </svg>

  },
  {
    id: 'aa-blason',
    name: 'AA — blason horizontal',
    description: 'AA encadré en plaque — sceau contemporain',
    render: ({ theme, size = 1 }) =>
    <svg viewBox="0 0 240 64" style={{ width: 240 * size, height: 64 * size, display: 'block' }}>
        {/* Plaque */}
        <rect x="6" y="10" width="82" height="44" fill="none" stroke={theme.fg} strokeWidth="0.8" />
        <rect x="10" y="14" width="74" height="36" fill="none" stroke={theme.fg} strokeWidth="0.4" opacity="0.4" />
        <text x="47" y="42" fill={theme.fg} fontFamily={theme.serif} fontSize="26" fontWeight="500" textAnchor="middle" letterSpacing="4">AA</text>
        {/* Marqueurs d'angle */}
        <line x1="6" y1="10" x2="12" y2="10" stroke={theme.accent} strokeWidth="1.4" />
        <line x1="6" y1="10" x2="6" y2="16" stroke={theme.accent} strokeWidth="1.4" />
        <line x1="82" y1="54" x2="88" y2="54" stroke={theme.accent} strokeWidth="1.4" />
        <line x1="88" y1="48" x2="88" y2="54" stroke={theme.accent} strokeWidth="1.4" />

        <text x="104" y="30" fill={theme.fg} fontFamily={theme.serif} fontSize="20" fontWeight="400" letterSpacing="3">AMI Avocats</text>
        <text x="104" y="46" fill={theme.fgSoft} fontFamily={theme.sans} fontSize="7" letterSpacing="3">ASSOCIÉS · PARIS</text>
      </svg>,

    compact: ({ theme, size = 1 }) =>
    <svg viewBox="0 0 96 64" style={{ width: 96 * size, height: 64 * size, display: 'block' }}>
        <rect x="6" y="10" width="82" height="44" fill="none" stroke={theme.fg} strokeWidth="0.8" />
        <text x="47" y="42" fill={theme.fg} fontFamily={theme.serif} fontSize="26" fontWeight="500" textAnchor="middle" letterSpacing="4">AA</text>
        <line x1="6" y1="10" x2="12" y2="10" stroke={theme.accent} strokeWidth="1.4" />
        <line x1="6" y1="10" x2="6" y2="16" stroke={theme.accent} strokeWidth="1.4" />
        <line x1="82" y1="54" x2="88" y2="54" stroke={theme.accent} strokeWidth="1.4" />
        <line x1="88" y1="48" x2="88" y2="54" stroke={theme.accent} strokeWidth="1.4" />
      </svg>

  },
  {
    id: 'a-dans-a',
    name: 'A dans A',
    description: 'A imbriqué au trait — double A, version affinée',
    render: ({ theme, size = 1 }) => {
      // Tout au trait fin. Grand A sérifé (empattements discrets) + petit A intérieur en accent.
      const stroke = theme.fg;
      const accent = theme.accent;
      return (
        <svg viewBox="0 0 260 90" style={{ width: 260 * size, height: 90 * size, display: 'block' }}>
          {/* Grand A — fin, avec empattements subtils */}
          <g stroke={stroke} strokeWidth="1.1" fill="none" strokeLinecap="butt">
            {/* Jambe gauche */}
            <line x1="40" y1="10" x2="10" y2="78" />
            {/* Jambe droite */}
            <line x1="40" y1="10" x2="70" y2="78" />
            {/* Empattements sérif (pieds) */}
            <line x1="4" y1="78" x2="20" y2="78" />
            <line x1="60" y1="78" x2="76" y2="78" />
            {/* Mini empattement sommet */}
            <line x1="36" y1="10" x2="44" y2="10" />
          </g>
          {/* Petit A intérieur — en accent, encore plus fin */}
          <g stroke={accent} strokeWidth="0.9" fill="none">
            <line x1="40" y1="34" x2="28" y2="62" />
            <line x1="40" y1="34" x2="52" y2="62" />
            {/* Barre du petit A */}
            <line x1="32.5" y1="52" x2="47.5" y2="52" />
          </g>
          {/* Barre du grand A (fine, accent, pour lier l'ensemble) */}
          <line x1="22" y1="62" x2="58" y2="62" stroke={stroke} strokeWidth="0.6" opacity="0.5" />

          {/* Wordmark */}
          <text x="96" y="42" fill={theme.fg} fontFamily={theme.serif} fontSize="26" fontWeight="400" letterSpacing="5">AMI</text>
          <line x1="96" y1="50" x2="220" y2="50" stroke={theme.fg} strokeWidth="0.3" opacity="0.35" />
          <text x="96" y="62" fill={theme.fgSoft} fontFamily={theme.sans} fontSize="7" letterSpacing="3">AVOCATS ASSOCIÉS · PARIS</text>
        </svg>);

    },
    compact: ({ theme, size = 1 }) => {
      const stroke = theme.fg;
      const accent = theme.accent;
      return (
        <svg viewBox="0 0 80 90" style={{ width: 80 * size, height: 90 * size, display: 'block' }}>
          <g stroke={stroke} strokeWidth="1.1" fill="none">
            <line x1="40" y1="10" x2="10" y2="78" />
            <line x1="40" y1="10" x2="70" y2="78" />
            <line x1="4" y1="78" x2="20" y2="78" />
            <line x1="60" y1="78" x2="76" y2="78" />
            <line x1="36" y1="10" x2="44" y2="10" />
          </g>
          <g stroke={accent} strokeWidth="0.9" fill="none">
            <line x1="40" y1="34" x2="28" y2="62" />
            <line x1="40" y1="34" x2="52" y2="62" />
            <line x1="32.5" y1="52" x2="47.5" y2="52" />
          </g>
          <line x1="22" y1="62" x2="58" y2="62" stroke={stroke} strokeWidth="0.6" opacity="0.5" />
        </svg>);

    }
  },
  {
    id: 'a-eiffel',
    name: 'A — Tour Eiffel',
    description: 'A parisien — silhouette Eiffel logée dans le A',
    render: ({ theme, size = 1 }) => {
      const stroke = theme.fg;
      const accent = theme.accent;
      return (
        <svg viewBox="0 0 260 96" style={{ width: 260 * size, height: 96 * size, display: 'block' }}>
          {/* Grand A au trait fin */}
          <g stroke={stroke} strokeWidth="1.1" fill="none" strokeLinecap="butt">
            <line x1="42" y1="10" x2="8" y2="84" />
            <line x1="42" y1="10" x2="76" y2="84" />
            <line x1="2" y1="84" x2="18" y2="84" />
            <line x1="66" y1="84" x2="82" y2="84" />
            <line x1="38" y1="10" x2="46" y2="10" />
          </g>
          {/* Tour Eiffel architecturale épurée */}
          <g stroke={accent} fill="none" strokeLinecap="round">
            <line x1="42" y1="24" x2="42" y2="31" strokeWidth="0.6" />
            <line x1="39.5" y1="31" x2="44.5" y2="31" strokeWidth="0.6" />
            <line x1="39.5" y1="31" x2="36" y2="48" strokeWidth="0.6" />
            <line x1="44.5" y1="31" x2="48" y2="48" strokeWidth="0.6" />
            <line x1="36" y1="48" x2="48" y2="48" strokeWidth="0.6" />
            <line x1="36" y1="48" x2="29" y2="68" strokeWidth="0.6" />
            <line x1="48" y1="48" x2="55" y2="68" strokeWidth="0.6" />
            <line x1="36" y1="48" x2="33.5" y2="68" strokeWidth="0.35" opacity="0.45" />
            <line x1="48" y1="48" x2="50.5" y2="68" strokeWidth="0.35" opacity="0.45" />
            <line x1="26" y1="68" x2="58" y2="68" strokeWidth="0.9" />
          </g>
          {/* Wordmark */}
          <text x="102" y="44" fill={theme.fg} fontFamily={theme.serif} fontSize="26" fontWeight="400" letterSpacing="5">AMI</text>
          <line x1="102" y1="52" x2="224" y2="52" stroke={theme.fg} strokeWidth="0.3" opacity="0.35" />
          <text x="102" y="64" fill={theme.fgSoft} fontFamily={theme.sans} fontSize="7" letterSpacing="3">AVOCATS · PARIS</text>
        </svg>);

    },
    compact: ({ theme, size = 1 }) => {
      const stroke = theme.fg;
      const accent = theme.accent;
      return (
        <svg viewBox="0 0 86 96" style={{ width: 86 * size, height: 96 * size, display: 'block' }}>
          <g stroke={stroke} strokeWidth="1.1" fill="none" strokeLinecap="butt">
            <line x1="42" y1="10" x2="8" y2="84" />
            <line x1="42" y1="10" x2="76" y2="84" />
            <line x1="2" y1="84" x2="18" y2="84" />
            <line x1="66" y1="84" x2="82" y2="84" />
            <line x1="38" y1="10" x2="46" y2="10" />
          </g>
          <g stroke={accent} fill="none" strokeLinecap="round">
            <line x1="42" y1="24" x2="42" y2="31" strokeWidth="0.6" />
            <line x1="39.5" y1="31" x2="44.5" y2="31" strokeWidth="0.6" />
            <line x1="39.5" y1="31" x2="36" y2="48" strokeWidth="0.6" />
            <line x1="44.5" y1="31" x2="48" y2="48" strokeWidth="0.6" />
            <line x1="36" y1="48" x2="48" y2="48" strokeWidth="0.6" />
            <line x1="36" y1="48" x2="29" y2="68" strokeWidth="0.6" />
            <line x1="48" y1="48" x2="55" y2="68" strokeWidth="0.6" />
            <line x1="36" y1="48" x2="33.5" y2="68" strokeWidth="0.35" opacity="0.45" />
            <line x1="48" y1="48" x2="50.5" y2="68" strokeWidth="0.35" opacity="0.45" />
            <line x1="26" y1="68" x2="58" y2="68" strokeWidth="0.9" />
          </g>
        </svg>);

    }
  }
);

// ─── Nouvelles directions ─────────────────────────────────────────────────────
LOGO_VARIANTS.push(
  {
    id: 'ami-initiales-stacked',
    name: 'A·M·I empilé',
    description: 'Trois initiales en colonne — monogramme vertical minimaliste',
    render: ({ theme, size = 1 }) =>
    <svg viewBox="0 0 240 80" style={{ width: 240 * size, height: 80 * size, display: 'block' }}>
        {/* Colonne A M I */}
        <text x="12" y="28" fill={theme.fg} fontFamily={theme.serif} fontSize="22" fontWeight="400" letterSpacing="1">A</text>
        <text x="12" y="52" fill={theme.accent} fontFamily={theme.serif} fontSize="22" fontWeight="400" letterSpacing="1">M</text>
        <text x="12" y="76" fill={theme.fg} fontFamily={theme.serif} fontSize="22" fontWeight="400" letterSpacing="1">I</text>
        {/* Ligne verticale séparatrice */}
        <line x1="44" y1="6" x2="44" y2="78" stroke={theme.line} strokeWidth="0.5" opacity="0.25" />
        {/* Wordmark à droite */}
        <text x="54" y="30" fill={theme.fg} fontFamily={theme.sans} fontSize="13" fontWeight="500" letterSpacing="4">AMI</text>
        <text x="54" y="47" fill={theme.accent} fontFamily={theme.sans} fontSize="10" letterSpacing="3">AVOCATS</text>
        <text x="54" y="62" fill={theme.fgSoft} fontFamily={theme.mono} fontSize="7" letterSpacing="2">PARIS</text>
      </svg>,

    compact: ({ theme, size = 1 }) =>
    <svg viewBox="0 0 32 80" style={{ width: 32 * size, height: 80 * size, display: 'block' }}>
        <text x="4" y="28" fill={theme.fg} fontFamily={theme.serif} fontSize="22" fontWeight="400">A</text>
        <text x="4" y="52" fill={theme.accent} fontFamily={theme.serif} fontSize="22" fontWeight="400">M</text>
        <text x="4" y="76" fill={theme.fg} fontFamily={theme.serif} fontSize="22" fontWeight="400">I</text>
      </svg>

  },
  {
    id: 'ami-souligne',
    name: 'AMI — soulignement',
    description: 'AMI en sérif léger, soulignement partiel orange accent',
    render: ({ theme, size = 1 }) =>
    <svg viewBox="0 0 240 72" style={{ width: 240 * size, height: 72 * size, display: 'block' }}>
        <text x="12" y="46" fill={theme.fg} fontFamily={theme.serif} fontSize="40" fontWeight="400" letterSpacing="8">AMI</text>
        {/* Soulignement partiel sous le M uniquement */}
        <line x1="42" y1="52" x2="78" y2="52" stroke={theme.accent} strokeWidth="2" />
        <text x="12" y="66" fill={theme.fgSoft} fontFamily={theme.sans} fontSize="8" letterSpacing="5">AVOCATS · PARIS</text>
      </svg>,

    compact: ({ theme, size = 1 }) =>
    <svg viewBox="0 0 100 56" style={{ width: 100 * size, height: 56 * size, display: 'block' }}>
        <text x="8" y="38" fill={theme.fg} fontFamily={theme.serif} fontSize="36" fontWeight="400" letterSpacing="6">AMI</text>
        <line x1="36" y1="44" x2="68" y2="44" stroke={theme.accent} strokeWidth="2" />
      </svg>

  },
  {
    id: 'a-hexagone',
    name: 'A hexagone',
    description: 'A dans un hexagone — structure, solidité, précision',
    render: ({ theme, size = 1 }) =>
    <svg viewBox="0 0 240 72" style={{ width: 240 * size, height: 72 * size, display: 'block' }}>
        {/* Hexagone */}
        <polygon points="36,6 58,6 70,28 58,50 36,50 24,28" fill="none" stroke={theme.fg} strokeWidth="1.1" />
        {/* A centré */}
        <text x="47" y="36" fill={theme.fg} fontFamily={theme.serif} fontSize="24" fontWeight="400" textAnchor="middle">A</text>
        {/* Accent : un côté en orange */}
        <line x1="36" y1="6" x2="58" y2="6" stroke={theme.accent} strokeWidth="2" />
        {/* Wordmark */}
        <text x="84" y="28" fill={theme.fg} fontFamily={theme.sans} fontSize="16" fontWeight="500" letterSpacing="4">AMI</text>
        <text x="84" y="44" fill={theme.fgSoft} fontFamily={theme.sans} fontSize="8" letterSpacing="3">AVOCATS · PARIS</text>
      </svg>,

    compact: ({ theme, size = 1 }) =>
    <svg viewBox="0 0 74 56" style={{ width: 74 * size, height: 56 * size, display: 'block' }}>
        <polygon points="36,4 58,4 70,28 58,52 36,52 24,28" fill="none" stroke={theme.fg} strokeWidth="1.1" />
        <text x="47" y="36" fill={theme.fg} fontFamily={theme.serif} fontSize="24" fontWeight="400" textAnchor="middle">A</text>
        <line x1="36" y1="4" x2="58" y2="4" stroke={theme.accent} strokeWidth="2" />
      </svg>

  },
  {
    id: 'ami-condensed',
    name: 'AMI condensé alt',
    description: 'AMI tout capitales condensées + filet accent — typographie de presse',
    render: ({ theme, size = 1 }) =>
    <svg viewBox="0 0 240 72" style={{ width: 240 * size, height: 72 * size, display: 'block' }}>
        {/* Filet haut */}
        <line x1="12" y1="10" x2="120" y2="10" stroke={theme.accent} strokeWidth="1.2" />
        <text x="12" y="44" fill={theme.fg} fontFamily={theme.serif} fontSize="46" fontWeight="500" letterSpacing="-1">AMI</text>
        {/* Filet bas */}
        <line x1="12" y1="52" x2="120" y2="52" stroke={theme.fg} strokeWidth="0.4" opacity="0.3" />
        <text x="12" y="64" fill={theme.fgSoft} fontFamily={theme.mono} fontSize="7" letterSpacing="4">AVOCATS — PARIS</text>
      </svg>,

    compact: ({ theme, size = 1 }) =>
    <svg viewBox="0 0 120 60" style={{ width: 120 * size, height: 60 * size, display: 'block' }}>
        <line x1="4" y1="8" x2="116" y2="8" stroke={theme.accent} strokeWidth="1.2" />
        <text x="4" y="46" fill={theme.fg} fontFamily={theme.serif} fontSize="46" fontWeight="500" letterSpacing="-1">AMI</text>
        <line x1="4" y1="54" x2="116" y2="54" stroke={theme.fg} strokeWidth="0.4" opacity="0.3" />
      </svg>

  },
  {
    id: 'ami-script',
    name: 'AMI script',
    description: 'AMI en italique libre — chaleureux, humain, accessible',
    render: ({ theme, size = 1 }) =>
    <svg viewBox="0 0 240 80" style={{ width: 240 * size, height: 80 * size, display: 'block' }}>
        <text x="10" y="58" fill={theme.fg} fontFamily={theme.serif} fontSize="56" fontStyle="italic" fontWeight="300" letterSpacing="-2">ami</text>
        {/* Petit rond orange comme ponctuation */}
        <circle cx="118" cy="52" r="4" fill={theme.accent} />
        <text x="130" y="40" fill={theme.fg} fontFamily={theme.sans} fontSize="11" fontWeight="500" letterSpacing="3">AMI</text>
        <text x="130" y="56" fill={theme.fgSoft} fontFamily={theme.sans} fontSize="8" letterSpacing="3">AVOCATS · PARIS</text>
      </svg>,

    compact: ({ theme, size = 1 }) =>
    <svg viewBox="0 0 130 70" style={{ width: 130 * size, height: 70 * size, display: 'block' }}>
        <text x="6" y="58" fill={theme.fg} fontFamily={theme.serif} fontSize="56" fontStyle="italic" fontWeight="300" letterSpacing="-2">ami</text>
        <circle cx="115" cy="52" r="4" fill={theme.accent} />
      </svg>

  }
);

window.LOGO_VARIANTS = LOGO_VARIANTS;