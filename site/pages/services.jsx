// Services page — full services catalog with detailed FAQ-style breakdown.

const ServicesPage = ({ onNavigate }) => {
  const { THEME, Reveal, CmdHeader } = window;
  const container = { maxWidth: 1280, margin: '0 auto', padding: '0 48px' };

  const services = [
    {
      sig: 'architecture.audit',
      args: '(codebase: MessyCodebase) => Memo',
      title: 'Architecture audit',
      desc: 'I read the code, talk to the team, write the honest memo.',
      long: 'Two weeks. One senior engineer living inside your repo. You get a written document: what\'s good, what\'s rotting, what you should fix first, what you can defer, and why. It\'s the kind of memo nobody on your team wants to write themselves — because politics.',
      deliverables: ['Architecture memo (10–20 pages)', 'Prioritized roadmap (3/6/12 months)', 'Live walkthrough with leadership', 'Follow-up Q&A for 2 weeks'],
      fit: ['You inherited a codebase', 'Velocity is slowing down quarter over quarter', 'You\'re planning a rewrite and want a second opinion first', 'New leadership wants ground truth'],
      meta: '~2 weeks · from €8k',
    },
    {
      sig: 'frontend.scale',
      args: '(team: ProductTeam) => DesignSystem',
      title: 'Frontend at scale',
      desc: 'React, TypeScript, Next.js, design systems, real performance work.',
      long: 'Hands-on architecture work. I come in, ship the foundations your product needs (component library, state patterns, routing, performance budgets, developer experience), and leave the team faster than I found it. Not an advisor — an engineer who happens to also advise.',
      deliverables: ['Production-ready code', 'Design system foundations', 'DX tooling & conventions', 'Written docs your team will actually read'],
      fit: ['Frontend is slowing product velocity', 'You\'re unifying multiple surfaces', 'You\'re scaling from 5 to 25 engineers', 'You need a senior to set the baseline'],
      meta: '~4–8 weeks · from €12k',
    },
    {
      sig: 'llm.production',
      args: '(demo: WorksOnMyMachine) => RAGPipeline',
      title: 'AI / LLM engineering',
      desc: 'Turn demo-ware into something that survives real users.',
      long: 'RAG pipelines, retrieval and chunking, prompt and context engineering, evaluation harnesses, latency budgets, cost ceilings, guardrails that actually work. I spend most of my time on the unsexy parts, because that\'s where AI products fail — not in the demo.',
      deliverables: ['Evaluated pipeline (Ragas/custom)', 'Latency & cost budgets', 'Guardrails & prompt library', 'Runbook for your team'],
      fit: ['Your AI demo is beautiful but the real thing hallucinates', 'You have a RAG pipeline that\'s slow or expensive', 'You\'re integrating LLMs into an existing product', 'You need someone who\'s seen this film before'],
      meta: '~4–6 weeks · from €18k',
    },
    {
      sig: 'techLead.fractional',
      args: '(company: Scaling) => TeamVelocity',
      title: 'Fractional Tech Lead',
      desc: 'Part-time Staff / Principal for teams that need one.',
      long: 'I split my week between your product and mine. I still write code, review PRs, mentor engineers, and make architecture calls. I attend the standups that matter. I skip the ones that don\'t. I am not a manager — I\'m the senior voice your team needs in the room.',
      deliverables: ['Weekly architectural reviews', 'Hands-on code contributions', '1:1 mentoring for senior engineers', 'Hiring loop support'],
      fit: ['You\'re between Head of Engineering hires', 'Your lead engineer just left', 'You need a senior voice but can\'t afford full-time', 'Your team is scaling fast and losing shape'],
      meta: 'monthly retainer · 2–3 d/wk · min 3 months',
    },
  ];

  return (
    <>
      <section style={{ ...container, paddingTop: 100, paddingBottom: 60 }}>
        <Reveal>
          <CmdHeader cmd="ls -la services/ --long" />
          <h1 style={{
            fontFamily: THEME.sans, fontSize: 80, fontWeight: 500, margin: 0,
            letterSpacing: '-0.025em', color: THEME.fgStrong, marginBottom: 24, lineHeight: 0.98,
          }}>
            Four ways to
            <br />
            <span style={{ fontFamily: THEME.serif, color: THEME.accent }}>work with me</span>.
          </h1>
          <p style={{ fontFamily: THEME.sans, fontSize: 20, color: `${THEME.fg}CC`, maxWidth: 720, lineHeight: 1.55 }}>
            Every engagement is scoped, timeboxed, and written down. I don't do open-ended retainers disguised as projects.
          </p>
        </Reveal>
      </section>

      <section style={{ ...container, paddingBottom: 120 }}>
        {services.map((s, i) => (
          <Reveal key={s.sig} delay={i * 40}>
            <article style={{
              borderTop: i === 0 ? `1px solid ${THEME.border}` : 'none',
              borderBottom: `1px solid ${THEME.border}`,
              padding: '60px 0',
              display: 'grid',
              gridTemplateColumns: '320px 1fr',
              gap: 60,
            }}>
              <div>
                <div style={{ color: THEME.accent, fontFamily: THEME.mono, fontSize: 14, marginBottom: 6 }}>
                  <span>ƒ </span>{s.sig}
                </div>
                <div style={{ color: THEME.dim, fontFamily: THEME.mono, fontSize: 11, marginBottom: 24 }}>
                  {s.args}
                </div>
                <h2 style={{ fontFamily: THEME.sans, fontSize: 42, fontWeight: 500, margin: 0, color: THEME.fgStrong, letterSpacing: '-0.02em', marginBottom: 20 }}>
                  {s.title}
                </h2>
                <div style={{ color: THEME.amber, fontFamily: THEME.mono, fontSize: 12, marginTop: 32 }}>
                  {s.meta}
                </div>
                <a href="#/contact" onClick={() => onNavigate('#/contact')} style={{
                  display: 'inline-block', marginTop: 24, padding: '12px 22px',
                  border: `1px solid ${THEME.accent}`, color: THEME.accent,
                  textDecoration: 'none', fontFamily: THEME.mono, fontSize: 12,
                }}>
                  → inquire about this
                </a>
              </div>

              <div>
                <p style={{ fontFamily: THEME.sans, fontSize: 20, color: THEME.fgStrong, lineHeight: 1.5, margin: 0, marginBottom: 16 }}>
                  {s.desc}
                </p>
                <p style={{ fontFamily: THEME.sans, fontSize: 16, color: `${THEME.fg}CC`, lineHeight: 1.65, margin: 0, marginBottom: 40 }}>
                  {s.long}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
                  <div>
                    <div style={{ color: THEME.accent, fontFamily: THEME.mono, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16 }}>
                      deliverables
                    </div>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {s.deliverables.map((d, j) => (
                        <li key={j} style={{ fontSize: 13, color: THEME.fg, paddingLeft: 16, position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: THEME.accent }}>→</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div style={{ color: THEME.accent, fontFamily: THEME.mono, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16 }}>
                      good fit if
                    </div>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {s.fit.map((d, j) => (
                        <li key={j} style={{ fontSize: 13, color: THEME.fg, paddingLeft: 16, position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: THEME.amber }}>→</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      {/* FAQ */}
      <section style={{ borderTop: `1px solid ${THEME.border}`, background: THEME.bgAlt }}>
        <div style={{ ...container, paddingTop: 100, paddingBottom: 100 }}>
          <CmdHeader cmd="cat FAQ.md" />
          <h2 style={{ fontFamily: THEME.sans, fontSize: 48, fontWeight: 500, margin: 0, letterSpacing: '-0.02em', color: THEME.fgStrong, marginBottom: 60 }}>
            Things clients ask.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            {[
              { q: 'Do you work on-site or remote?', a: 'Remote-first, based in Turin. I travel for kickoffs and key milestones if it helps. Most clients are North American or European.' },
              { q: 'Can you work through an agency or partner?', a: 'Yes. I sub-contract through agencies regularly, under their contracts and processes.' },
              { q: 'What\'s your notice period?', a: 'For new engagements, typically 2–4 weeks depending on scope. For urgent audits, I can start the following week.' },
              { q: 'Do you take equity?', a: 'Rarely. Cash is simpler for both of us. Happy to discuss for early-stage AI/infra plays where there\'s real alignment.' },
              { q: 'What if I just need a second opinion?', a: 'Book a call. Half an hour, no charge, no pitch. If I can answer your question in that call, I will.' },
              { q: 'Do you do fixed-price or time-and-materials?', a: 'Both. Audits and scoped deliverables are fixed-price. Fractional Tech Lead is T&M on a monthly retainer.' },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 50}>
                <div>
                  <div style={{ fontFamily: THEME.sans, fontSize: 20, fontWeight: 500, color: THEME.fgStrong, marginBottom: 12, letterSpacing: '-0.01em' }}>
                    {f.q}
                  </div>
                  <div style={{ fontFamily: THEME.sans, fontSize: 15, color: `${THEME.fg}BB`, lineHeight: 1.6 }}>
                    {f.a}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

window.ServicesPage = ServicesPage;
