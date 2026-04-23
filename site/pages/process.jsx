// Process page — how an engagement runs, step by step.

const ProcessPage = ({ onNavigate }) => {
  const { THEME, Reveal, CmdHeader } = window;
  const container = { maxWidth: 1280, margin: '0 auto', padding: '0 var(--page-pad)' };

  const steps = [
    { n: '00', fn: 'intro()', t: '30-min call', d: 'No pitch deck, no sales script. Tell me about your situation. I tell you if I\'m the right person — and if I\'m not, who might be. Outcome: yes / no / maybe later.', time: 'day 0' },
    { n: '01', fn: 'scope()', t: 'Scope & proposal', d: 'If we\'re a fit, I write a one-page proposal: what I\'ll do, what I\'ll deliver, how long, how much. No novella SOWs. One page.', time: 'day 1–3' },
    { n: '02', fn: 'onboard()', t: 'Onboarding', d: 'Repo access, stack walkthrough, intros to the people I\'ll work with. I write down what I learn so you can see my mental model forming.', time: 'week 1' },
    { n: '03', fn: 'read()', t: 'Read everything', d: 'Code, docs, tickets, PRs, standups. I take notes in public — a shared doc your team can read and correct. The goal isn\'t to prove I\'m smart. It\'s to be useful.', time: 'week 1–2' },
    { n: '04', fn: 'build()', t: 'Hands on keyboard', d: 'Architecture decisions, real PRs, pairing with your engineers. I work the way your team works — your conventions, your workflow, your review process.', time: 'week 2–N' },
    { n: '05', fn: 'handoff()', t: 'Handoff', d: 'A written document your team can run with. Not a dependency on me. The best engagements end with your team saying "we\'ve got it from here."', time: 'final week' },
    { n: '06', fn: 'followUp()', t: 'Follow-up', d: 'Two weeks of email support, no charge, no time limit. You want another 30 minutes on Zoom six months later? Send an email.', time: 'ongoing' },
  ];

  return (
    <>
      <section style={{ ...container, paddingTop: 100, paddingBottom: 80 }}>
        <Reveal>
          <CmdHeader cmd="./process.sh --help" />
          <h1 style={{
            fontFamily: THEME.sans, fontSize: 80, fontWeight: 500, margin: 0,
            letterSpacing: '-0.025em', color: THEME.fgStrong, marginBottom: 24, lineHeight: 0.98,
          }}>
            How a project
            <br />
            <span style={{ fontFamily: THEME.serif, color: THEME.accent }}>actually runs</span>.
          </h1>
          <p style={{ fontFamily: THEME.sans, fontSize: 20, color: `${THEME.fg}CC`, maxWidth: 720, lineHeight: 1.55 }}>
            Seven steps. Most clients skip at least one. That's fine.
          </p>
        </Reveal>
      </section>

      {/* TIMELINE */}
      <section style={{ ...container, paddingBottom: 120 }}>
        <div style={{ position: 'relative' }}>
          {/* vertical spine */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, left: 60,
            width: 1, background: THEME.border,
          }} />

          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 40}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr',
                gap: 40,
                paddingBottom: 60,
                position: 'relative',
              }}>
                {/* node */}
                <div style={{ paddingTop: 4, position: 'relative' }}>
                  <div style={{
                    width: 12, height: 12, borderRadius: '50%',
                    background: THEME.accent, marginLeft: 55, marginTop: 6,
                    boxShadow: `0 0 0 4px ${THEME.bg}`,
                  }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: 24, paddingBottom: 20, borderBottom: `1px solid ${THEME.border}` }}>
                  <div>
                    <div style={{ fontFamily: THEME.mono, fontSize: 12, color: THEME.dim, marginBottom: 10, display: 'flex', gap: 14, alignItems: 'center' }}>
                      <span style={{ color: THEME.amber }}>step {s.n}</span>
                      <span>·</span>
                      <span style={{ color: THEME.accent }}>ƒ {s.fn}</span>
                    </div>
                    <h3 style={{
                      fontFamily: THEME.sans, fontSize: 32, fontWeight: 500, margin: 0,
                      letterSpacing: '-0.02em', color: THEME.fgStrong, marginBottom: 16,
                    }}>
                      {s.t}
                    </h3>
                    <p style={{ fontFamily: THEME.sans, fontSize: 16, color: `${THEME.fg}BB`, lineHeight: 1.6, margin: 0, maxWidth: 700 }}>
                      {s.d}
                    </p>
                  </div>
                  <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.dim, textAlign: 'right', textTransform: 'uppercase', letterSpacing: '0.1em', paddingTop: 36 }}>
                    {s.time}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRINCIPLES */}
      <section style={{ borderTop: `1px solid ${THEME.border}`, background: THEME.bgAlt }}>
        <div style={{ ...container, paddingTop: 100, paddingBottom: 100 }}>
          <CmdHeader cmd="cat principles.md" />
          <h2 style={{ fontFamily: THEME.sans, fontSize: 48, fontWeight: 500, margin: 0, letterSpacing: '-0.02em', color: THEME.fgStrong, marginBottom: 60 }}>
            Things I believe.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: THEME.border }}>
            {[
              { n: '01', t: 'Write things down', d: 'If it\'s not in a doc, it didn\'t happen. The memo is the deliverable. The code is the deliverable. Nothing important should live only in someone\'s head.' },
              { n: '02', t: 'Ship small, ship often', d: 'Big rewrites are usually a confession of process failure. I prefer dozens of small improvements that compound over one heroic rewrite.' },
              { n: '03', t: 'Honest over polite', d: 'I\'d rather tell you the uncomfortable thing now than the comfortable thing that stops being true in six months.' },
              { n: '04', t: 'Leave the team better', d: 'The best engagements end with your team faster and more confident than when I arrived. If I make myself indispensable, I\'ve failed.' },
              { n: '05', t: 'Code over slides', d: 'I\'ll prototype before I diagram. A running thing you can click is worth ten architecture slides.' },
              { n: '06', t: 'Humility about AI', d: 'LLMs are powerful and they fail weirdly. Evaluation, guardrails, and graceful degradation aren\'t optional. The demo is the easy part.' },
            ].map((p, i) => (
              <Reveal key={p.n} delay={i * 40}>
                <div style={{ background: THEME.bgAlt, padding: 32, minHeight: 220 }}>
                  <div style={{ color: THEME.accent, fontFamily: THEME.mono, fontSize: 12, marginBottom: 16 }}>
                    // {p.n}
                  </div>
                  <div style={{ fontFamily: THEME.sans, fontSize: 22, fontWeight: 500, color: THEME.fgStrong, marginBottom: 14, letterSpacing: '-0.01em' }}>
                    {p.t}
                  </div>
                  <div style={{ fontFamily: THEME.sans, fontSize: 14, color: `${THEME.fg}BB`, lineHeight: 1.6 }}>
                    {p.d}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ ...container, paddingTop: 100, paddingBottom: 100, textAlign: 'center' }}>
        <Reveal>
          <h2 style={{
            fontFamily: THEME.sans, fontSize: 56, fontWeight: 500, margin: 0,
            letterSpacing: '-0.02em', color: THEME.fgStrong, lineHeight: 1.05,
          }}>
            Ready to <span style={{ fontFamily: THEME.serif, color: THEME.accent }}>talk</span>?
          </h2>
          <div style={{ marginTop: 40 }}>
            <a href="#/contact" onClick={() => onNavigate('#/contact')} style={{
              padding: '16px 32px', background: THEME.accent, color: THEME.bg,
              textDecoration: 'none', fontFamily: THEME.mono, fontSize: 13, fontWeight: 600,
            }}>→ schedule_call()</a>
          </div>
        </Reveal>
      </section>
    </>
  );
};

window.ProcessPage = ProcessPage;
