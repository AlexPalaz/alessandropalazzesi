// Shared theme tokens + common components for the terminal-themed site.

const THEME = {
  bg: '#0A0E0D',
  bgAlt: '#0E1312',
  fg: '#D4D2CB',
  fgStrong: '#F0EEE7',
  dim: '#6A6E6C',
  border: 'rgba(212, 210, 203, 0.12)',
  borderStrong: 'rgba(212, 210, 203, 0.22)',
  accent: 'oklch(0.68 0.13 240)', // deep trust blue — enterprise, senior, reliable
  amber: 'oklch(0.80 0.11 80)',
  red: 'oklch(0.72 0.18 25)',
  mono: '"JetBrains Mono", ui-monospace, monospace',
  sans: '"Inter Tight", system-ui, sans-serif',
  serif: '"Inter Tight", system-ui, sans-serif',
};

// Dotted grid background used across all pages
const GridBg = () => (
  <div style={{
    position: 'fixed',
    inset: 0,
    backgroundImage: `radial-gradient(circle, ${THEME.fg}0A 1px, transparent 1px)`,
    backgroundSize: '32px 32px',
    pointerEvents: 'none',
    zIndex: 0,
  }} />
);

// IDE-style top status bar (same everywhere)
const StatusBar = ({ path }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 24px',
    borderBottom: `1px solid ${THEME.border}`,
    fontFamily: THEME.mono,
    fontSize: 11,
    color: THEME.dim,
    background: THEME.bg,
    position: 'relative',
    zIndex: 10,
  }}>
    <div style={{ display: 'flex', gap: 20 }}>
      <span style={{ color: THEME.accent }}>● READY</span>
      <span>~/apalazzesi/portfolio{path}</span>
      <span>main</span>
    </div>
    <div style={{ display: 'flex', gap: 20 }}>
      <span>UTF-8</span>
      <span>TS</span>
      <span>LF</span>
      <span>Ln 1, Col 1</span>
    </div>
  </div>
);

// Primary navigation — same layout on every page, highlights current route
const NavBar = ({ route, onNavigate }) => {
  const items = [
    { id: 'home', label: '~', route: '#/' },
    { id: 'work', label: 'work/', route: '#/work' },
    { id: 'services', label: 'services/', route: '#/services' },
    { id: 'process', label: 'process/', route: '#/process' },
    { id: 'about', label: 'about/', route: '#/about' },
    { id: 'contact', label: 'contact/', route: '#/contact' },
  ];

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 48px',
    borderBottom: `1px solid ${THEME.border}`,
    fontFamily: THEME.mono,
    fontSize: 13,
    background: `${THEME.bg}EE`,
    backdropFilter: 'blur(8px)',
    position: 'sticky',
    top: 0,
    zIndex: 20,
  };

  return (
    <nav style={navStyle}>
      <a href="#/" onClick={() => onNavigate('#/')} style={{
        color: THEME.fgStrong,
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <span style={{
          width: 10, height: 10, background: THEME.accent, display: 'inline-block',
        }} />
        <span>alessandro.palazzesi</span>
      </a>

      <div style={{ display: 'flex', gap: 28 }}>
        {items.map(i => {
          const active = route.startsWith(i.route) && (i.route !== '#/' || route === '#/');
          return (
            <a key={i.id} href={i.route} onClick={() => onNavigate(i.route)} style={{
              color: active ? THEME.accent : THEME.fg,
              textDecoration: 'none',
              transition: 'color .15s',
            }}
              onMouseEnter={e => !active && (e.currentTarget.style.color = THEME.fgStrong)}
              onMouseLeave={e => !active && (e.currentTarget.style.color = THEME.fg)}
            >
              {i.label}
            </a>
          );
        })}
      </div>

      <a
        href="#/contact"
        onClick={() => onNavigate('#/contact')}
        style={{
          padding: '10px 18px',
          background: THEME.accent,
          color: THEME.bg,
          textDecoration: 'none',
          fontSize: 12,
          fontWeight: 600,
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
        → schedule_call()
      </a>
    </nav>
  );
};

// Site footer
const Footer = () => (
  <footer style={{
    borderTop: `1px solid ${THEME.border}`,
    padding: '40px 48px',
    fontFamily: THEME.mono,
    fontSize: 11,
    color: THEME.dim,
    background: THEME.bg,
    position: 'relative',
    zIndex: 5,
  }}>
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, paddingBottom: 40, borderBottom: `1px solid ${THEME.border}` }}>
        <div>
          <div style={{ color: THEME.fgStrong, fontFamily: THEME.sans, fontSize: 16, fontWeight: 500, marginBottom: 14 }}>
            Alessandro Palazzesi
          </div>
          <div style={{ lineHeight: 1.8, maxWidth: 380 }}>
            Frontend Architect & Technical Lead.<br />
            Remote-friendly, based in Turin.<br />
            Available Q3 2026 for new engagements.
          </div>
        </div>
        <div>
          <div style={{ color: THEME.accent, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>sitemap</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href="#/work" style={{ color: THEME.fg, textDecoration: 'none' }}>work/</a>
            <a href="#/services" style={{ color: THEME.fg, textDecoration: 'none' }}>services/</a>
            <a href="#/process" style={{ color: THEME.fg, textDecoration: 'none' }}>process/</a>
            <a href="#/about" style={{ color: THEME.fg, textDecoration: 'none' }}>about/</a>
            <a href="#/contact" style={{ color: THEME.fg, textDecoration: 'none' }}>contact/</a>
          </div>
        </div>
        <div>
          <div style={{ color: THEME.accent, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>elsewhere</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href="https://www.linkedin.com/in/alessandropalazzesi" style={{ color: THEME.fg, textDecoration: 'none' }}>linkedin ↗</a>
            <a href="mailto:alessandro.palazzesi@gmail.com" style={{ color: THEME.fg, textDecoration: 'none' }}>email ↗</a>
            <a href="#" style={{ color: THEME.fg, textDecoration: 'none' }}>github ↗</a>
            <a href="#" style={{ color: THEME.fg, textDecoration: 'none' }}>cv.pdf ↗</a>
          </div>
        </div>
        <div>
          <div style={{ color: THEME.accent, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>colophon</div>
          <div style={{ lineHeight: 1.8 }}>
            Built with<br />
            React · TypeScript<br />
            Inter Tight, Instrument<br />
            Serif, JetBrains Mono
          </div>
        </div>
      </div>
      <div style={{ paddingTop: 24, display: 'flex', justifyContent: 'space-between' }}>
        <span>© 2026 · alessandro.palazzesi</span>
        <span>→ alessandro.palazzesi@gmail.com</span>
        <span>build a7f3d21 · turin/it</span>
      </div>
    </div>
  </footer>
);

// Shared section header with command prompt prefix
const CmdHeader = ({ cmd, children }) => (
  <div style={{
    fontFamily: THEME.mono,
    fontSize: 13,
    color: THEME.dim,
    marginBottom: 32,
  }}>
    <span style={{ color: THEME.accent }}>$</span> {cmd}
    {children && <div style={{ marginTop: 8 }}>{children}</div>}
  </div>
);

// Reveal-on-scroll wrapper (moderate motion: fade + tiny y translate)
const Reveal = ({ children, delay = 0 }) => {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => setShown(true), delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? 'translateY(0)' : 'translateY(12px)',
      transition: 'opacity .6s ease, transform .6s ease',
    }}>
      {children}
    </div>
  );
};

// Page wrapper — consistent padding + max width + z-index
const Page = ({ children }) => (
  <main style={{
    position: 'relative',
    zIndex: 5,
    background: THEME.bg,
    fontFamily: THEME.mono,
    color: THEME.fg,
    fontSize: 14,
    lineHeight: 1.6,
    minHeight: 'calc(100vh - 140px)',
  }}>
    {children}
  </main>
);

// Data: case studies (shared between list and detail pages)
const CASE_STUDIES = [
  {
    slug: 'presidenza',
    hash: 'a7f3d21',
    year: '2025',
    company: 'Presidenza del Consiglio',
    role: 'Software Engineer · Esperto',
    tag: 'ROME',
    message: 'feat(gov): public digital transformation platform',
    sector: 'Public sector',
    period: 'Mar 2025 — Present',
    stack: ['React', 'TypeScript', 'Next.js', 'Node.js', 'GOV design system'],
    summary: 'Engineering for Italy\'s Department for Digital Transformation — building public-facing platforms used by citizens and public administrations.',
    problem: 'Public digital services at national scale carry very different constraints from product work: accessibility, legal compliance, multi-tenant complexity, and a public obligation to get it right.',
    approach: [
      'Embedded inside cross-functional teams, contributing hands-on as a senior engineer.',
      'Focused on frontend architecture patterns that survive team turnover and scale across agencies.',
      'Balanced public-sector rigor (a11y, security) with modern product velocity.',
    ],
    outcomes: [
      { k: 'National', v: 'scale' },
      { k: 'WCAG AA', v: 'baseline' },
      { k: 'Ongoing', v: 'engagement' },
    ],
  },
  {
    slug: 'nuvem',
    hash: '4e1b8c0',
    year: '2024',
    company: 'Nuvem',
    role: 'Full Stack Engineer',
    tag: 'US-REMOTE',
    message: 'feat(pharma): 340B cloud platform for US pharmacies',
    sector: 'Healthcare SaaS',
    period: '2024 — Present',
    stack: ['React', 'TypeScript', '.NET', 'Azure', 'SQL Server'],
    summary: 'Cloud platform helping US pharmacies manage 340B compliance programs — a regulated, high-stakes vertical where errors translate directly to lost federal discounts.',
    problem: 'The existing platform was aging: inconsistent UX, slow data operations, brittle architecture. Clients included major pharmacy chains with zero tolerance for regressions.',
    approach: [
      'Refactored critical frontend modules while shipping continuously — no big-bang rewrite.',
      'Designed shared primitives that the team could reuse across five product surfaces.',
      'Owned vertical slices end-to-end: React UI, .NET API, data model, tests.',
    ],
    outcomes: [
      { k: '5+', v: 'surfaces unified' },
      { k: '40%', v: 'less duplication' },
      { k: '0', v: 'regressions shipped' },
    ],
  },
  {
    slug: 'illimity',
    hash: 'c92a176',
    year: '2023',
    company: 'Illimity Bank',
    role: 'Frontend Architect',
    tag: 'MILAN',
    message: 'feat(fintech): digital banking workflows at scale',
    sector: 'Digital banking',
    period: '2023',
    stack: ['React', 'TypeScript', 'Redux', 'Next.js', 'StyledComponents'],
    summary: 'An Italian digital-first bank where the product is the UI. I owned the architecture for complex financial workflows — account onboarding, lending flows, portfolio management.',
    problem: 'Financial workflows are state machines with ten branches and legal consequences on every transition. The team needed patterns they could replicate across twenty flows without reinventing each one.',
    approach: [
      'Introduced a reusable flow-builder abstraction so new journeys ship in days, not weeks.',
      'Defined the frontend-backend contract that reduced ambiguity in sprint planning.',
      'Reviewed every PR in the critical path for six months straight.',
    ],
    outcomes: [
      { k: '20+', v: 'flows on same engine' },
      { k: '3×', v: 'faster new-flow delivery' },
      { k: '0', v: 'production outages' },
    ],
  },
  {
    slug: 'juventus',
    hash: '8b05e3f',
    year: '2022',
    company: 'Juventus',
    role: 'Technical Lead',
    tag: 'TURIN',
    message: 'arch(cms): page builder rewrite — matchday content engine',
    sector: 'Sports media',
    period: '2022 — 2023',
    stack: ['React', 'Next.js', 'Node.js', 'CMS', 'CDN'],
    summary: 'Page builder and CMS powering matchday content for one of the world\'s largest football clubs. Editorial teams ship time-sensitive stories to millions in minutes.',
    problem: 'Editorial ops needed speed without developer tickets. Engineering needed content authors to stop breaking production. The old system made neither side happy.',
    approach: [
      'Led the rewrite of the page-builder core — component library, layout engine, preview.',
      'Shipped a CMS UX that let non-technical editors assemble complex pages safely.',
      'Ran the team: planning, code review, mentoring four engineers.',
    ],
    outcomes: [
      { k: '10M+', v: 'monthly page views' },
      { k: '<2min', v: 'story to live' },
      { k: '4', v: 'engineers led' },
    ],
  },
  {
    slug: 'olympics',
    hash: 'f1d9e4a',
    year: '2021',
    company: 'Tokyo Olympics 2021',
    role: 'Senior Frontend Developer',
    tag: 'TOKYO',
    message: 'perf(broadcast): front-of-house for global event',
    sector: 'Broadcast · sports tech',
    period: '2021',
    stack: ['React', 'TypeScript', 'Redux-Observable', 'RxJs'],
    summary: 'Broadcast-grade frontend interfaces for the Tokyo Olympics — tools used by global media partners during the event itself, with zero tolerance for downtime.',
    problem: 'Global event, live window, unforgiving audiences. The performance and reliability budgets weren\'t negotiable.',
    approach: [
      'Optimized render paths for sustained data streams (scores, standings, content feeds).',
      'Built robustness into every layer — retries, fallbacks, graceful degradation.',
      'Worked inside a platform engineering team at Deltatre.',
    ],
    outcomes: [
      { k: 'Live', v: '16 days, zero downtime' },
      { k: '200+', v: 'broadcast partners' },
      { k: 'Global', v: 'audience' },
    ],
  },
  {
    slug: 'mls',
    hash: '2a6c087',
    year: '2020',
    company: 'MLS Soccer',
    role: 'Senior Frontend Developer',
    tag: 'US-REMOTE',
    message: 'feat(ott): streaming & content platform',
    sector: 'OTT · sports media',
    period: '2020 — 2021',
    stack: ['React', 'Next.js', 'Node.js', 'CMS'],
    summary: 'OTT streaming and content platform for Major League Soccer — matchday coverage, on-demand video, editorial features for a North American audience.',
    problem: 'Sports media on the web is punishingly seasonal. The platform had to handle both quiet Tuesdays and Cup-final Sundays on the same codebase.',
    approach: [
      'Built content rendering flexible enough for editorial, robust enough for peak load.',
      'Pushed on performance — Core Web Vitals, bundle budgets, caching strategy.',
      'Collaborated closely with a US-based product org across time zones.',
    ],
    outcomes: [
      { k: '10×', v: 'peak traffic handled' },
      { k: 'AA', v: 'accessibility baseline' },
      { k: 'NA-wide', v: 'distribution' },
    ],
  },
  {
    slug: 'gewiss',
    hash: 'e3b4712',
    year: '2019',
    company: 'Gewiss E-Mobility',
    role: 'Senior Frontend Developer',
    tag: 'BERGAMO',
    message: 'feat(iot): React Native app for EV charging',
    sector: 'IoT · e-mobility',
    period: '2019 — 2020',
    stack: ['React Native', 'TypeScript', 'IoT', 'BLE'],
    summary: 'Mobile app for EV charging hardware — pairing, session management, billing, and fleet features for commercial users.',
    problem: 'Native apps talking to physical hardware over BLE introduce edge cases no backend API ever has. User expectations are high; forgiveness is low.',
    approach: [
      'Built resilient BLE connection flows with graceful retry and recovery.',
      'Shipped a cross-platform app that felt native on both iOS and Android.',
      'Integrated with fleet back-office for commercial fleet operators.',
    ],
    outcomes: [
      { k: 'iOS + Android', v: 'single codebase' },
      { k: 'Fleet', v: 'ready' },
      { k: '99%', v: 'pairing success rate' },
    ],
  },
];

Object.assign(window, {
  THEME, GridBg, StatusBar, NavBar, Footer, CmdHeader, Reveal, Page, CASE_STUDIES,
});
