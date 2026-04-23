// Home page — hero + quick pitch + featured work + CTA.

const HomePage = ({ onNavigate }) => {
  const { THEME, Reveal, CmdHeader, CASE_STUDIES, COMPANIES } = window;

  const container = { maxWidth: 1280, margin: '0 auto', padding: '0 48px' };

  return (
    <>
      {/* HERO */}
      <section style={{ ...container, paddingTop: 100, paddingBottom: 100, position: 'relative' }}>
        <Reveal>
          <CmdHeader cmd="whoami --verbose" />
        </Reveal>

        <Reveal delay={80}>
          <h1 style={{
            fontFamily: THEME.sans,
            fontWeight: 500,
            letterSpacing: '-0.02em',
            fontSize: 96,
            margin: 0,
            marginBottom: 32,
            lineHeight: 0.95,
            color: THEME.fgStrong,
          }}>
            Alessandro Palazzesi,
            <br />
            <span style={{ fontFamily: THEME.serif, color: THEME.accent }}>
              Frontend Architect
            </span>
            <br />
            & Technical Lead.
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, marginTop: 60 }}>
            <div>
              <div style={{ color: THEME.dim, marginBottom: 16 }}>// role</div>
              <div style={{ fontFamily: THEME.mono, fontSize: 14, lineHeight: 1.9 }}>
                <span style={{ color: THEME.accent }}>const</span> work = {'{'}
                <div style={{ paddingLeft: 24 }}>
                  <span style={{ color: THEME.amber }}>focus</span>: <span>["frontend", "ai-products", "tech-lead"],</span>
                  <br />
                  <span style={{ color: THEME.amber }}>stack</span>: <span>["react", "typescript", "next", ".net"],</span>
                  <br />
                  <span style={{ color: THEME.amber }}>ai</span>: <span>["rag", "llms", "evaluation", "guardrails"],</span>
                  <br />
                  <span style={{ color: THEME.amber }}>years</span>: <span style={{ color: THEME.accent }}>9</span>,
                  <br />
                  <span style={{ color: THEME.amber }}>based</span>: <span>"Turin, IT"</span>,
                  <br />
                  <span style={{ color: THEME.amber }}>availability</span>: <span style={{ color: THEME.accent }}>"Q3 2026"</span>
                </div>
                {'}'};
              </div>
            </div>

            <div>
              <div style={{ color: THEME.dim, marginBottom: 16 }}>// summary</div>
              <p style={{ fontFamily: THEME.sans, fontSize: 17, lineHeight: 1.6, margin: 0, color: `${THEME.fg}D0` }}>
                I help product teams build web platforms that scale — and lately, the
                AI layer on top of them. I spend most of my time on the unsexy parts
                of AI products (evaluation, latency, cost, guardrails), because
                that's usually where they fail.
              </p>

              <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="#/contact" onClick={() => onNavigate('#/contact')} style={{
                  padding: '14px 24px', background: THEME.accent, color: THEME.bg,
                  textDecoration: 'none', fontSize: 13, fontWeight: 600,
                }}>→ schedule_call()</a>
                <a href="#/work" onClick={() => onNavigate('#/work')} style={{
                  padding: '14px 24px', border: `1px solid ${THEME.border}`, color: THEME.fg,
                  textDecoration: 'none', fontSize: 13,
                }}>cat selected_work.md</a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* COMPANIES TICKER */}
      <section style={{ borderTop: `1px solid ${THEME.border}`, borderBottom: `1px solid ${THEME.border}`, padding: '32px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 60, fontFamily: THEME.serif, fontSize: 30, color: `${THEME.fg}70`, whiteSpace: 'nowrap', animation: 'marquee 40s linear infinite' }}>
          {[...Array(2)].map((_, k) => (
            <React.Fragment key={k}>
              {['Presidenza del Consiglio', 'Deltatre', 'Nuvem', 'Enhancers — Tinexta Group', 'Illimity Bank', 'DM Group', 'Syncroweb'].map((n, i) => (
                <React.Fragment key={i}>
                  <span>{n}</span>
                  <span style={{ color: THEME.accent }}>✦</span>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </section>

      {/* COMPANIES — primary employers */}
      <section style={{ ...container, paddingTop: 100, paddingBottom: 100 }}>
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 60 }}>
            <div>
              <CmdHeader cmd='git log --author="alessandro" --format="%ae" | sort -u' />
              <h2 style={{ fontFamily: THEME.sans, fontSize: 48, fontWeight: 500, margin: 0, letterSpacing: '-0.02em', color: THEME.fgStrong }}>
                Where I've been.
              </h2>
            </div>
            <a href="#/work" onClick={() => onNavigate('#/work')} style={{ color: THEME.accent, textDecoration: 'none', fontSize: 13 }}>
              → full work history ({CASE_STUDIES.length})
            </a>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: THEME.border }}>
          {COMPANIES.map((co, i) => (
            <Reveal key={co.id} delay={i * 60}>
              <a
                href={co.href}
                onClick={() => onNavigate(co.href)}
                className="work-card"
                style={{
                  display: 'block',
                  background: THEME.bg,
                  padding: 40,
                  textDecoration: 'none',
                  color: 'inherit',
                  height: '100%',
                  transition: 'background .15s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: THEME.mono, fontSize: 11, color: THEME.dim, marginBottom: 24 }}>
                  <span style={{ color: THEME.amber }}>{co.role}</span>
                  <span>{co.period}</span>
                </div>
                <div style={{ fontFamily: THEME.sans, fontSize: 34, fontWeight: 500, letterSpacing: '-0.01em', color: THEME.fgStrong, marginBottom: 8 }}>
                  {co.name}
                </div>
                <div style={{ fontFamily: THEME.mono, fontSize: 12, color: THEME.dim, marginBottom: 24 }}>
                  {co.subtitle}
                </div>
                <div style={{ color: `${THEME.fg}AA`, fontSize: 14, marginBottom: 28, minHeight: 48 }}>
                  {co.blurb}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: THEME.mono, fontSize: 11 }}>
                  <span style={{ color: THEME.fg }}>{co.location}</span>
                  <span style={{ padding: '3px 10px', border: `1px solid ${THEME.accent}`, color: THEME.accent, letterSpacing: '0.1em' }}>
                    {co.tag}
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <style>{`.work-card:hover { background: ${THEME.bgAlt} !important; }`}</style>
      </section>

      {/* SERVICES TEASER */}
      <section style={{ borderTop: `1px solid ${THEME.border}`, background: THEME.bgAlt }}>
        <div style={{ ...container, paddingTop: 100, paddingBottom: 100 }}>
          <Reveal>
            <CmdHeader cmd="ls -la services/" />
            <h2 style={{ fontFamily: THEME.sans, fontSize: 48, fontWeight: 500, margin: 0, letterSpacing: '-0.02em', color: THEME.fgStrong, marginBottom: 60 }}>
              Four ways to work with me.
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: THEME.border }}>
            {[
              { sig: 'architecture.audit', meta: '~2 weeks · from €8k', tl: 'Read the code, write the honest memo.' },
              { sig: 'frontend.scale', meta: '~4–8 weeks · from €12k', tl: 'React, TypeScript, design systems that ship.' },
              { sig: 'llm.production', meta: '~4–6 weeks · from €18k', tl: 'RAG pipelines that survive real users.' },
              { sig: 'techLead.fractional', meta: 'retainer · 2–3 d/wk', tl: 'Senior voice in the room, hands on keyboard.' },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 60}>
                <div style={{ background: THEME.bgAlt, padding: 32, minHeight: 200, height: '100%' }}>
                  <div style={{ color: THEME.accent, fontFamily: THEME.mono, fontSize: 13, marginBottom: 10 }}>
                    ƒ {s.sig}
                  </div>
                  <div style={{ fontFamily: THEME.sans, fontSize: 18, color: THEME.fgStrong, marginBottom: 20 }}>
                    {s.tl}
                  </div>
                  <div style={{ color: THEME.amber, fontSize: 11, fontFamily: THEME.mono }}>
                    {s.meta}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ marginTop: 40, textAlign: 'right' }}>
            <a href="#/services" onClick={() => onNavigate('#/services')} style={{ color: THEME.accent, textDecoration: 'none', fontFamily: THEME.mono, fontSize: 13 }}>
              → full services breakdown
            </a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ ...container, paddingTop: 120, paddingBottom: 120 }}>
        <Reveal>
          <CmdHeader cmd="cat testimonials/*.md" />
          <h2 style={{ fontFamily: THEME.sans, fontSize: 48, fontWeight: 500, margin: 0, letterSpacing: '-0.02em', color: THEME.fgStrong, marginBottom: 60 }}>
            On record.
          </h2>
        </Reveal>

        <div style={{ borderTop: `1px solid ${THEME.border}` }}>
          {[
            {
              q: "I had the pleasure of working with Alessandro for several years. He consistently demonstrates exceptional technical skills, combined with a proactive and collaborative approach. Highly knowledgeable, reliable, and a truly valuable asset for any company operating in the tech industry.",
              name: 'Emanuele Tortolone',
              role: 'Engineering Manager @ F11',
              date: 'Apr 2025',
            },
            {
              q: "Alessandro is a real lead developer and it was an honor to work with such a good programmer. He is always focused on his job and always tries to develop the best solution.",
              name: 'Tomasz Grzonkowski',
              role: 'Senior Frontend Developer — worked in the same team',
              date: 'Feb 2025',
            },
            {
              q: "An exceptionally talented Software Engineer with a mastery of React that speaks for itself. His ability to craft elegant, high-performance frontends is truly impressive — and his drive to grow beyond his comfort zone raised the bar for the entire team.",
              name: 'Nico Campisano',
              role: 'Full Stack Developer — BNP Paribas',
              date: 'Feb 2025',
            },
          ].map((t, i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{
                borderBottom: `1px solid ${THEME.border}`,
                padding: '72px 0',
                display: 'grid',
                gridTemplateColumns: '220px 1fr',
                gap: 80,
                alignItems: 'start',
              }}>
                <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.dim, lineHeight: 1.7, textTransform: 'uppercase', letterSpacing: '0.08em', position: 'sticky', top: 100 }}>
                  <div style={{ color: THEME.accent, marginBottom: 12 }}>0{i + 1}</div>
                  <div style={{ color: THEME.fgStrong, fontSize: 12, marginBottom: 6, textTransform: 'none', letterSpacing: 0, fontFamily: THEME.sans, fontWeight: 500 }}>{t.name}</div>
                  <div style={{ textTransform: 'none', letterSpacing: 0, lineHeight: 1.5, color: THEME.dim }}>{t.role}</div>
                  <div style={{ marginTop: 16, fontSize: 10 }}>{t.date}</div>
                </div>
                <blockquote style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: 26,
                  lineHeight: 1.4,
                  margin: 0,
                  color: THEME.fgStrong,
                  letterSpacing: '0',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  textWrap: 'pretty',
                }}>
                  <span style={{ color: THEME.accent, fontStyle: 'normal', marginRight: 8 }}>&ldquo;</span>
                  {t.q}
                  <span style={{ color: THEME.accent, fontStyle: 'normal', marginLeft: 4 }}>&rdquo;</span>
                </blockquote>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: `1px solid ${THEME.border}`, background: THEME.bgAlt }}>
        <div style={{ ...container, paddingTop: 100, paddingBottom: 100, textAlign: 'center' }}>
          <Reveal>
            <h2 style={{
              fontFamily: THEME.sans, fontSize: 72, fontWeight: 500, margin: 0,
              letterSpacing: '-0.02em', color: THEME.fgStrong, lineHeight: 1.05,
            }}>
              Building between <span style={{ fontFamily: THEME.serif, color: THEME.accent }}>frontend</span>
              <br />and <span style={{ fontFamily: THEME.serif, color: THEME.accent }}>AI</span>? Write me.
            </h2>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 50 }}>
              <a href="#/contact" onClick={() => onNavigate('#/contact')} style={{
                padding: '16px 32px', background: THEME.accent, color: THEME.bg,
                textDecoration: 'none', fontFamily: THEME.mono, fontSize: 13, fontWeight: 600,
              }}>→ schedule_call()</a>
              <a href="mailto:alessandro.palazzesi@gmail.com" style={{
                padding: '16px 32px', border: `1px solid ${THEME.borderStrong}`, color: THEME.fg,
                textDecoration: 'none', fontFamily: THEME.mono, fontSize: 13,
              }}>email directly</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

window.HomePage = HomePage;
