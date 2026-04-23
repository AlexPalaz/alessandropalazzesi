// Work list page — full case study index.

const WorkPage = ({ onNavigate }) => {
  const { THEME, Reveal, CmdHeader, CASE_STUDIES } = window;
  const container = { maxWidth: 1280, margin: '0 auto', padding: '0 48px' };

  const [filter, setFilter] = React.useState('all');
  const sectors = ['all', ...new Set(CASE_STUDIES.map(c => c.sector))];
  const filtered = filter === 'all' ? CASE_STUDIES : CASE_STUDIES.filter(c => c.sector === filter);

  return (
    <>
      <section style={{ ...container, paddingTop: 100, paddingBottom: 60 }}>
        <Reveal>
          <CmdHeader cmd='git log --all --author="alessandro" --since="2019"' />
          <h1 style={{
            fontFamily: THEME.sans, fontSize: 80, fontWeight: 500, margin: 0,
            letterSpacing: '-0.02em', color: THEME.fgStrong, marginBottom: 20,
          }}>
            Selected work,
            <br />
            <span style={{ fontFamily: THEME.serif, color: THEME.accent }}>2019 → 2026</span>.
          </h1>
          <p style={{ fontFamily: THEME.sans, fontSize: 18, color: `${THEME.fg}CC`, maxWidth: 620, lineHeight: 1.55 }}>
            {CASE_STUDIES.length} engagements, {new Set(CASE_STUDIES.map(c => c.sector)).size} sectors, one rule: ship things that outlast me on the team.
          </p>
        </Reveal>
      </section>

      {/* FILTERS */}
      <section style={{ ...container, paddingBottom: 32 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {sectors.map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{
              padding: '8px 16px',
              background: filter === s ? THEME.accent : 'transparent',
              color: filter === s ? THEME.bg : THEME.fg,
              border: `1px solid ${filter === s ? THEME.accent : THEME.border}`,
              fontFamily: THEME.mono,
              fontSize: 11,
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              {s}
            </button>
          ))}
        </div>
      </section>

      <section style={{ ...container, paddingBottom: 120 }}>
        <div style={{ borderTop: `1px solid ${THEME.border}` }}>
          {filtered.map((cs, i) => (
            <Reveal key={cs.slug} delay={i * 40}>
              <a
                href={`#/work/${cs.slug}`}
                onClick={() => onNavigate(`#/work/${cs.slug}`)}
                className="row-link"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '90px 70px 1fr 2fr 160px 40px',
                  gap: 24,
                  padding: '28px 12px',
                  borderBottom: `1px solid ${THEME.border}`,
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'background .15s, padding-left .15s',
                }}
              >
                <div style={{ color: THEME.amber, fontFamily: THEME.mono, fontSize: 12 }}>{cs.hash}</div>
                <div style={{ color: THEME.dim, fontFamily: THEME.mono, fontSize: 12 }}>{cs.year}</div>
                <div style={{ fontFamily: THEME.sans, fontSize: 22, fontWeight: 500, color: THEME.fgStrong }}>
                  {cs.company}
                </div>
                <div style={{ color: `${THEME.fg}AA`, fontSize: 14 }}>{cs.message}</div>
                <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.fg, textAlign: 'right' }}>
                  {cs.role}
                </div>
                <div style={{ color: THEME.accent, textAlign: 'right', fontSize: 16 }}>→</div>
              </a>
            </Reveal>
          ))}
        </div>
        <style>{`.row-link:hover { background: ${THEME.bgAlt}; padding-left: 24px !important; }`}</style>
      </section>
    </>
  );
};

window.WorkPage = WorkPage;
