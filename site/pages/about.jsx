// About page — bio, stack, numbers, stance.

const AboutPage = ({ onNavigate }) => {
  const { THEME, Reveal, CmdHeader } = window;
  const container = { maxWidth: 1080, margin: '0 auto', padding: '0 var(--page-pad)' };

  return (
    <>
      <section style={{ ...container, paddingTop: 100, paddingBottom: 80 }}>
        <Reveal>
          <CmdHeader cmd="cat ~/.about" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 60, alignItems: 'start' }}>
            <div>
              <h1 style={{
                fontFamily: THEME.sans, fontSize: 68, fontWeight: 500, margin: 0,
                letterSpacing: '-0.025em', color: THEME.fgStrong, lineHeight: 1, marginBottom: 32,
              }}>
                Nine years,
                <br />
                <span style={{ fontFamily: THEME.serif, color: THEME.accent }}>still writing code</span>.
              </h1>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: THEME.sans, fontSize: 18, color: `${THEME.fg}DD`, lineHeight: 1.65, maxWidth: 640 }}>
                <p style={{ margin: 0 }}>
                  I'm Alessandro. I'm a Frontend Architect and Technical Lead, based in Turin. I've spent nine years shipping software — from my first junior full-stack role at Syncroweb wiring up startup websites, through DM Group (L'Oréal, Lamborghini, and the rest of that roster), then five and a half years at Enhancers — Tinexta Group on projects like the Tokyo Olympics, MLS Soccer, Juventus.com and the Gewiss E-Mobility app — ending as Technical Lead.
                </p>
                <p style={{ margin: 0 }}>
                  Since late 2023 I've been working independently, mostly with international companies (Nuvem, Illimity Bank, Deltatre). In 2025 I joined the Italian Presidency of the Council of Ministers as Software Engineer / Esperto inside the Department for Digital Transformation. In parallel I help teams with the parts of frontend engineering that don't fit in a ticket — architecture, design systems, developer experience — and with bringing LLMs into real production workflows.
                </p>
                <p style={{ margin: 0 }}>
                  I care about teams more than stacks. I care about shipping more than framing. I still write code every day. I don't have a personal brand to maintain, a newsletter to grow, or a course to sell. I'm just trying to do the work well.
                </p>
              </div>
            </div>

            {/* Portrait placeholder */}
            <div>
              <div style={{
                width: '100%', aspectRatio: '3 / 4',
                background: THEME.bgAlt,
                border: `1px solid ${THEME.border}`,
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `repeating-linear-gradient(135deg, transparent 0 14px, ${THEME.fg}08 14px 28px)`,
                }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: THEME.mono, fontSize: 10, color: THEME.dim, letterSpacing: '0.2em', textTransform: 'uppercase',
                }}>
                  [ portrait ]
                </div>
              </div>
              <div style={{ marginTop: 14, fontFamily: THEME.mono, fontSize: 10, color: THEME.dim, textAlign: 'center', letterSpacing: '0.1em' }}>
                Alessandro Palazzesi<br />Turin · 45.07°N / 7.68°E
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* NUMBERS */}
      <section style={{ ...container, paddingBottom: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: `1px solid ${THEME.border}`, borderBottom: `1px solid ${THEME.border}` }}>
          {[
            { n: '09', l: 'years in production' },
            { n: '40+', l: 'engineers mentored' },
            { n: '03', l: 'olympic-grade platforms' },
            { n: '100%', l: 'clients via referral' },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 50}>
              <div style={{
                padding: 32,
                borderRight: i < 3 ? `1px solid ${THEME.border}` : 'none',
              }}>
                <div style={{ fontFamily: THEME.sans, fontSize: 72, fontWeight: 300, lineHeight: 1, color: THEME.accent, letterSpacing: '-0.03em' }}>
                  {s.n}
                </div>
                <div style={{ color: THEME.dim, fontFamily: THEME.mono, marginTop: 10, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  {s.l}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STACK */}
      <section style={{ ...container, paddingTop: 60, paddingBottom: 100 }}>
        <CmdHeader cmd="cat package.json | jq '.dependencies'" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: THEME.border, border: `1px solid ${THEME.border}` }}>
          {[
            { cat: 'frontend', items: ['React 18/19', 'TypeScript', 'Next.js 14+', 'Redux / Zustand', 'StyledComponents', 'Tailwind'] },
            { cat: 'ai / llm', items: ['LangChain', 'LlamaIndex', 'OpenAI / Anthropic', 'pgvector / Qdrant', 'RAG pipelines', 'Ragas / custom eval'] },
            { cat: 'backend', items: ['.NET / ASP.NET Core', 'C# / Blazor', 'Node / Nest.js', 'MongoDB · Postgres', 'Azure DevOps', 'Vercel'] },
            { cat: 'discipline', items: ['Design systems', 'Performance', 'DX tooling', 'Accessibility', 'Code review', 'Mentoring'] },
          ].map((g, i) => (
            <div key={i} style={{ background: THEME.bg, padding: 28 }}>
              <div style={{ color: THEME.accent, fontFamily: THEME.mono, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 18 }}>
                {g.cat}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {g.items.map((it, j) => (
                  <div key={j} style={{ fontFamily: THEME.mono, fontSize: 13, color: `${THEME.fg}CC` }}>
                    <span style={{ color: THEME.dim, marginRight: 8 }}>—</span>
                    {it}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ ...container, paddingBottom: 100 }}>
        <CmdHeader cmd="cat CHANGELOG.md" />
        <div style={{ borderTop: `1px solid ${THEME.border}` }}>
          {[
            { y: '2025', t: 'Presidenza del Consiglio — Software Engineer / Esperto (Dipartimento trasformazione digitale)' },
            { y: '2024', t: 'Freelance — Deltatre (sports tech) & Nuvem (340B healthcare SaaS)' },
            { y: '2023', t: 'Started full-time independent contracting — first clients: Illimity Bank, Nuvem' },
            { y: '2022', t: 'Technical Lead at Enhancers — Tinexta Group (Juventus.com page builder)' },
            { y: '2021', t: 'Enhancers — Senior Frontend on Tokyo Olympics 2021 broadcast frontends' },
            { y: '2020', t: 'Enhancers — Senior Frontend on MLS Soccer OTT platform' },
            { y: '2019', t: 'Enhancers — Senior Frontend on Gewiss E-Mobility (React Native, BLE)' },
            { y: '2018', t: 'Joined Enhancers as Senior Front-end Developer' },
            { y: '2017', t: 'DM Group — Mid-Level Full Stack (L\'Oréal, Vichy, Givenchy, Lamborghini…)' },
            { y: '2016', t: 'Syncroweb — Junior Full Stack, first commercial engineering role' },
          ].map((x, i) => (
            <Reveal key={i} delay={i * 30}>
              <div style={{
                display: 'grid', gridTemplateColumns: '90px 1fr',
                gap: 24, padding: '18px 12px',
                borderBottom: `1px solid ${THEME.border}`,
              }}>
                <div style={{ color: THEME.amber, fontFamily: THEME.mono, fontSize: 13 }}>{x.y}</div>
                <div style={{ fontFamily: THEME.sans, fontSize: 16, color: THEME.fg }}>{x.t}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LANGUAGES */}
      <section style={{ ...container, paddingBottom: 100 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
          <div>
            <CmdHeader cmd="locale" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: THEME.mono, fontSize: 14 }}>
              {[
                ['italiano', 'native'],
                ['english', 'professional working'],
                ['español', 'limited working'],
                ['lingua dei segni (LIS)', 'native / bilingual'],
              ].map(([l, lvl]) => (
                <div key={l} style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 16 }}>
                  <span style={{ color: THEME.fg }}>{l}</span>
                  <span style={{ color: THEME.dim }}>{lvl}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <CmdHeader cmd="echo $INTERESTS" />
            <div style={{ fontFamily: THEME.sans, fontSize: 15, color: `${THEME.fg}CC`, lineHeight: 1.65 }}>
              I'm particularly interested in the overlap between frontend engineering and AI: RAG retrieval quality, LLM-in-the-loop UX, agent workflows, and the developer tooling being built on top of model APIs. If you're working on something in this space, I'd love to hear about it.
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

window.AboutPage = AboutPage;
