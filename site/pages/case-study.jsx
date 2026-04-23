// Individual case study detail page.

const CaseStudyPage = ({ slug, onNavigate }) => {
  const { THEME, Reveal, CmdHeader, CASE_STUDIES } = window;
  const container = { maxWidth: 1080, margin: '0 auto', padding: '0 48px' };

  const cs = CASE_STUDIES.find(c => c.slug === slug);
  if (!cs) {
    return (
      <section style={{ ...container, paddingTop: 160, paddingBottom: 160, textAlign: 'center' }}>
        <CmdHeader cmd={`find work/ -name "${slug}"`} />
        <h1 style={{ fontFamily: THEME.sans, fontSize: 48, color: THEME.fgStrong }}>404 — not found</h1>
        <a href="#/work" onClick={() => onNavigate('#/work')} style={{ color: THEME.accent, fontFamily: THEME.mono }}>
          ← back to work
        </a>
      </section>
    );
  }

  const idx = CASE_STUDIES.findIndex(c => c.slug === slug);
  const prev = CASE_STUDIES[(idx - 1 + CASE_STUDIES.length) % CASE_STUDIES.length];
  const next = CASE_STUDIES[(idx + 1) % CASE_STUDIES.length];

  return (
    <>
      {/* BREADCRUMB */}
      <section style={{ ...container, paddingTop: 48 }}>
        <div style={{ fontFamily: THEME.mono, fontSize: 12, color: THEME.dim }}>
          <a href="#/" onClick={() => onNavigate('#/')} style={{ color: THEME.dim, textDecoration: 'none' }}>~</a>
          {' / '}
          <a href="#/work" onClick={() => onNavigate('#/work')} style={{ color: THEME.dim, textDecoration: 'none' }}>work</a>
          {' / '}
          <span style={{ color: THEME.fg }}>{cs.slug}</span>
        </div>
      </section>

      {/* HEADER */}
      <section style={{ ...container, paddingTop: 60, paddingBottom: 80 }}>
        <Reveal>
          <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.dim, display: 'flex', gap: 16, marginBottom: 32 }}>
            <span style={{ color: THEME.amber }}>{cs.hash}</span>
            <span>{cs.period}</span>
            <span>·</span>
            <span>{cs.sector}</span>
            <span>·</span>
            <span style={{ padding: '2px 10px', border: `1px solid ${THEME.accent}`, color: THEME.accent, letterSpacing: '0.1em' }}>
              {cs.tag}
            </span>
          </div>

          <h1 style={{
            fontFamily: THEME.sans, fontSize: 88, fontWeight: 500, margin: 0,
            letterSpacing: '-0.025em', color: THEME.fgStrong, lineHeight: 0.95, marginBottom: 24,
          }}>
            {cs.company}
          </h1>

          <div style={{ fontFamily: THEME.serif, fontSize: 28, color: THEME.accent, marginBottom: 40 }}>
            {cs.role}
          </div>

          <p style={{ fontFamily: THEME.sans, fontSize: 22, lineHeight: 1.5, color: THEME.fgStrong, maxWidth: 820, margin: 0 }}>
            {cs.summary}
          </p>
        </Reveal>
      </section>

      {/* PLACEHOLDER VISUAL */}
      <section style={{ ...container, paddingBottom: 80 }}>
        <Reveal>
          <div style={{
            height: 480,
            background: THEME.bgAlt,
            border: `1px solid ${THEME.border}`,
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* diagonal stripes */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `repeating-linear-gradient(135deg, transparent 0 40px, ${THEME.fg}06 40px 80px)`,
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: THEME.mono, fontSize: 11, color: THEME.dim, letterSpacing: '0.2em', textTransform: 'uppercase',
            }}>
              [ project visual · {cs.slug}.png ]
            </div>
          </div>
        </Reveal>
      </section>

      {/* META GRID */}
      <section style={{ ...container, paddingBottom: 80 }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          borderTop: `1px solid ${THEME.border}`, borderBottom: `1px solid ${THEME.border}`,
        }}>
          {[
            { l: 'client', v: cs.company },
            { l: 'role', v: cs.role.split(' · ')[0] },
            { l: 'period', v: cs.period },
            { l: 'sector', v: cs.sector },
          ].map((x, i) => (
            <div key={i} style={{
              padding: '24px 20px',
              borderRight: i < 3 ? `1px solid ${THEME.border}` : 'none',
            }}>
              <div style={{ color: THEME.accent, fontFamily: THEME.mono, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>
                {x.l}
              </div>
              <div style={{ fontFamily: THEME.sans, fontSize: 16, color: THEME.fgStrong }}>
                {x.v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BODY */}
      <section style={{ ...container, paddingBottom: 80 }}>
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 48, marginBottom: 60 }}>
            <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.accent, textTransform: 'uppercase', letterSpacing: '0.15em', paddingTop: 8 }}>
              The problem
            </div>
            <p style={{ fontFamily: THEME.sans, fontSize: 19, lineHeight: 1.6, color: THEME.fg, margin: 0 }}>
              {cs.problem}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 48, marginBottom: 60 }}>
            <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.accent, textTransform: 'uppercase', letterSpacing: '0.15em', paddingTop: 8 }}>
              The approach
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 18 }}>
              {cs.approach.map((a, i) => (
                <li key={i} style={{ fontFamily: THEME.sans, fontSize: 17, lineHeight: 1.55, color: THEME.fg, paddingLeft: 28, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: 0, fontFamily: THEME.mono, color: THEME.amber, fontSize: 13 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 48, marginBottom: 60 }}>
            <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.accent, textTransform: 'uppercase', letterSpacing: '0.15em', paddingTop: 8 }}>
              Stack
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {cs.stack.map((s, i) => (
                <span key={i} style={{
                  padding: '6px 14px', border: `1px solid ${THEME.border}`, color: THEME.fg,
                  fontFamily: THEME.mono, fontSize: 12,
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* OUTCOMES */}
      <section style={{ borderTop: `1px solid ${THEME.border}`, background: THEME.bgAlt }}>
        <div style={{ ...container, paddingTop: 80, paddingBottom: 80 }}>
          <CmdHeader cmd="echo $OUTCOMES" />
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cs.outcomes.length}, 1fr)`, gap: 40, marginTop: 40 }}>
            {cs.outcomes.map((o, i) => (
              <Reveal key={i} delay={i * 60}>
                <div style={{ borderLeft: `2px solid ${THEME.accent}`, paddingLeft: 24 }}>
                  <div style={{ fontFamily: THEME.sans, fontSize: 64, fontWeight: 300, lineHeight: 1, color: THEME.fgStrong, letterSpacing: '-0.02em' }}>
                    {o.k}
                  </div>
                  <div style={{ color: THEME.dim, fontFamily: THEME.mono, marginTop: 10, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {o.v}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NAV */}
      <section style={{ ...container, paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          <a href={`#/work/${prev.slug}`} onClick={() => onNavigate(`#/work/${prev.slug}`)} className="pn-card" style={{
            padding: 32, border: `1px solid ${THEME.border}`, textDecoration: 'none', color: 'inherit',
            transition: 'border-color .15s, background .15s',
          }}>
            <div style={{ color: THEME.dim, fontFamily: THEME.mono, fontSize: 11, marginBottom: 12 }}>← previous</div>
            <div style={{ fontFamily: THEME.sans, fontSize: 22, color: THEME.fgStrong }}>{prev.company}</div>
            <div style={{ color: THEME.dim, fontFamily: THEME.mono, fontSize: 11, marginTop: 6 }}>{prev.year} · {prev.sector}</div>
          </a>
          <a href={`#/work/${next.slug}`} onClick={() => onNavigate(`#/work/${next.slug}`)} className="pn-card" style={{
            padding: 32, border: `1px solid ${THEME.border}`, textDecoration: 'none', color: 'inherit',
            textAlign: 'right', transition: 'border-color .15s, background .15s',
          }}>
            <div style={{ color: THEME.dim, fontFamily: THEME.mono, fontSize: 11, marginBottom: 12 }}>next →</div>
            <div style={{ fontFamily: THEME.sans, fontSize: 22, color: THEME.fgStrong }}>{next.company}</div>
            <div style={{ color: THEME.dim, fontFamily: THEME.mono, fontSize: 11, marginTop: 6 }}>{next.year} · {next.sector}</div>
          </a>
        </div>
        <style>{`.pn-card:hover { border-color: ${THEME.accent} !important; background: ${THEME.bgAlt}; }`}</style>
      </section>
    </>
  );
};

window.CaseStudyPage = CaseStudyPage;
