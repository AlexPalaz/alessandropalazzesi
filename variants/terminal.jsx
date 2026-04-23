// Variant C — Terminal / Dev-core
// Monospace-first. Teal accent. Feels like an IDE, a changelog, a README.
// For the enterprise CTO who trusts code over copy.

const TerminalVariant = () => {
  const bg = '#0A0E0D';
  const fg = '#D4D2CB';
  const dim = '#6A6E6C';
  const accent = 'oklch(0.78 0.12 175)'; // cool teal
  const amber = 'oklch(0.78 0.14 65)';

  const wrap = {
    background: bg,
    color: fg,
    fontFamily: '"JetBrains Mono", monospace',
    minHeight: '100%',
    width: '100%',
    fontSize: 14,
    lineHeight: 1.6,
    position: 'relative',
    overflow: 'hidden',
  };

  const container = { maxWidth: 1280, margin: '0 auto', padding: '0 48px' };
  const h = { fontFamily: '"Inter Tight", sans-serif', fontWeight: 500, letterSpacing: '-0.02em' };
  const display = { fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', letterSpacing: '-0.01em' };

  // subtle dotted grid
  const grid = {
    position: 'absolute',
    inset: 0,
    backgroundImage: `radial-gradient(circle, ${fg}08 1px, transparent 1px)`,
    backgroundSize: '32px 32px',
    pointerEvents: 'none',
  };

  return (
    <div style={wrap}>
      <div style={grid} />

      {/* TOP BAR — like an IDE status bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '14px 24px',
        borderBottom: `1px solid ${fg}12`,
        fontSize: 11,
        color: dim,
      }}>
        <div style={{ display: 'flex', gap: 20 }}>
          <span style={{ color: accent }}>● READY</span>
          <span>~/apalazzesi/portfolio</span>
          <span>main</span>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          <span>UTF-8</span>
          <span>TS</span>
          <span>LF</span>
          <span>Ln 1, Col 1</span>
        </div>
      </div>

      {/* HERO */}
      <section style={{ ...container, paddingTop: 100, paddingBottom: 100, position: 'relative' }}>
        <div style={{ color: dim, marginBottom: 32 }}>
          <span style={{ color: accent }}>$</span> whoami --verbose
        </div>

        <h1 style={{
          ...h,
          fontSize: 96,
          margin: 0,
          marginBottom: 32,
          lineHeight: 0.95,
          color: fg,
        }}>
          Alessandro Palazzesi,
          <br />
          <span style={{ ...display, color: accent }}>Frontend Architect</span>
          <br />
          & Technical Lead.
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, marginTop: 60 }}>
          <div>
            <div style={{ color: dim, marginBottom: 16 }}>// role</div>
            <div>
              <span style={{ color: accent }}>const</span> work = {'{'}
              <div style={{ paddingLeft: 24 }}>
                <span style={{ color: amber }}>focus</span>: <span>["frontend", "ai-products", "tech-lead"],</span>
                <br />
                <span style={{ color: amber }}>stack</span>: <span>["react", "typescript", "next", ".net"],</span>
                <br />
                <span style={{ color: amber }}>ai</span>: <span>["rag", "llms", "evaluation", "guardrails"],</span>
                <br />
                <span style={{ color: amber }}>years</span>: <span style={{ color: accent }}>9</span>,
                <br />
                <span style={{ color: amber }}>based</span>: <span>"Turin, IT"</span>,
                <br />
                <span style={{ color: amber }}>availability</span>: <span style={{ color: accent }}>"Q3 2026"</span>
              </div>
              {'}'};
            </div>
          </div>

          <div>
            <div style={{ color: dim, marginBottom: 16 }}>// summary</div>
            <p style={{ fontFamily: '"Inter Tight", sans-serif', fontSize: 17, lineHeight: 1.6, margin: 0, color: `${fg}D0` }}>
              I help product teams build web platforms that scale — and lately, the
              AI layer on top of them. I spend most of my time on the unsexy parts
              of AI products (evaluation, latency, cost, guardrails), because
              that's usually where they fail.
            </p>

            <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a style={{
                padding: '14px 24px',
                background: accent,
                color: bg,
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: 600,
              }}>→ schedule_call()</a>
              <a style={{
                padding: '14px 24px',
                border: `1px solid ${fg}30`,
                color: fg,
                textDecoration: 'none',
                fontSize: 13,
              }}>cat cv.pdf</a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES — as function signatures */}
      <section style={{ ...container, paddingTop: 60, paddingBottom: 100 }}>
        <div style={{ color: dim, marginBottom: 32 }}>
          <span style={{ color: accent }}>$</span> ls -la services/
        </div>

        <div style={{ border: `1px solid ${fg}15`, borderRadius: 2 }}>
          {[
            {
              sig: 'architecture.audit',
              args: '(codebase: MessyCodebase) => Memo',
              desc: 'Read the code. Talk to the team. Write the honest memo. Two weeks, one deliverable that won\'t politely lie.',
              meta: '~2 weeks · from €8k · deliverable: architecture memo + roadmap',
            },
            {
              sig: 'frontend.scale',
              args: '(team: ProductTeam) => DesignSystem',
              desc: 'React, TypeScript, Next.js, design systems, real performance work. I come in, ship the foundations, leave the team faster than I found it.',
              meta: '~4–8 weeks · from €12k · deliverable: production code + documentation',
            },
            {
              sig: 'llm.production',
              args: '(demo: WorksOnMyMachine) => RAGPipeline',
              desc: 'Turn demo-ware into something that survives real users. Retrieval, chunking, evaluation harness, latency budgets, cost ceilings, guardrails that actually work.',
              meta: '~4–6 weeks · from €18k · deliverable: evaluated pipeline + runbook',
            },
            {
              sig: 'techLead.fractional',
              args: '(company: Scaling) => TeamVelocity',
              desc: 'Part-time Staff / Principal engineer for teams that need one. Hands-on. I write code, review PRs, mentor engineers, unblock architecture. Not just meetings.',
              meta: 'monthly retainer · 2–3 days/week · min 3 months',
            },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '32px 40px',
              borderBottom: i < 3 ? `1px solid ${fg}15` : 'none',
              display: 'grid',
              gridTemplateColumns: '360px 1fr',
              gap: 40,
              alignItems: 'start',
            }}>
              <div>
                <div style={{ fontSize: 18 }}>
                  <span style={{ color: accent }}>ƒ </span>
                  <span style={{ color: fg, fontWeight: 600 }}>{s.sig}</span>
                </div>
                <div style={{ color: dim, fontSize: 12, marginTop: 8 }}>{s.args}</div>
                <div style={{ color: amber, fontSize: 11, marginTop: 20 }}>{s.meta}</div>
              </div>
              <div style={{ fontFamily: '"Inter Tight", sans-serif', fontSize: 16, lineHeight: 1.6, color: `${fg}CC` }}>
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CASE STUDIES — git log */}
      <section style={{ ...container, paddingTop: 60, paddingBottom: 100 }}>
        <div style={{ color: dim, marginBottom: 32 }}>
          <span style={{ color: accent }}>$</span> git log --oneline --author="alessandro" --since="2016"
        </div>

        <div style={{ fontSize: 14 }}>
          {[
            { h: 'a7f3d21', y: '2025', c: 'Presidenza del Consiglio', m: 'feat(gov): public digital transformation platform', tag: 'ROME' },
            { h: '4e1b8c0', y: '2024', c: 'Nuvem', m: 'feat(pharma): 340B cloud platform for US pharmacies', tag: 'US-REMOTE' },
            { h: 'c92a176', y: '2023', c: 'Illimity Bank', m: 'feat(fintech): digital banking workflows at scale', tag: 'MILAN' },
            { h: '8b05e3f', y: '2022', c: 'Juventus', m: 'arch(cms): page builder rewrite — matchday content engine', tag: 'TURIN' },
            { h: 'f1d9e4a', y: '2021', c: 'Tokyo Olympics', m: 'perf(broadcast): front-of-house for global event', tag: 'TOKYO' },
            { h: '2a6c087', y: '2020', c: 'MLS Soccer', m: 'feat(ott): streaming & content platform', tag: 'US-REMOTE' },
            { h: 'e3b4712', y: '2019', c: 'Gewiss E-Mobility', m: 'feat(iot): React Native app for EV charging', tag: 'BERGAMO' },
          ].map((x, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '90px 60px 200px 1fr 120px 40px',
              gap: 20,
              padding: '18px 16px',
              borderBottom: `1px solid ${fg}10`,
              alignItems: 'center',
              cursor: 'pointer',
            }}>
              <div style={{ color: amber }}>{x.h}</div>
              <div style={{ color: dim }}>{x.y}</div>
              <div style={{ fontFamily: '"Inter Tight", sans-serif', fontSize: 17, fontWeight: 500 }}>{x.c}</div>
              <div style={{ color: `${fg}AA`, fontSize: 13 }}>{x.m}</div>
              <div style={{
                padding: '3px 10px',
                border: `1px solid ${accent}`,
                color: accent,
                fontSize: 10,
                textAlign: 'center',
                letterSpacing: '0.1em',
              }}>{x.tag}</div>
              <div style={{ color: dim, textAlign: 'right' }}>→</div>
            </div>
          ))}
        </div>
      </section>

      {/* STACK */}
      <section style={{ ...container, paddingTop: 60, paddingBottom: 100 }}>
        <div style={{ color: dim, marginBottom: 32 }}>
          <span style={{ color: accent }}>$</span> cat package.json | jq '.dependencies'
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: `${fg}12` }}>
          {[
            { cat: 'frontend', items: ['React 18/19', 'TypeScript', 'Next.js 14+', 'Redux / Zustand', 'StyledComponents', 'Tailwind'] },
            { cat: 'ai / llm', items: ['LangChain', 'LlamaIndex', 'OpenAI / Anthropic', 'pgvector / Qdrant', 'RAG pipelines', 'Evaluation (Ragas)'] },
            { cat: 'backend', items: ['.NET / ASP.NET Core', 'C# / Blazor', 'Node / Nest.js', 'MongoDB · Postgres', 'Azure DevOps', 'Vercel'] },
            { cat: 'discipline', items: ['Design systems', 'Performance', 'Developer experience', 'Accessibility', 'Code review', 'Mentoring'] },
          ].map((g, i) => (
            <div key={i} style={{ background: bg, padding: 28 }}>
              <div style={{ color: accent, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 18 }}>
                {g.cat}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {g.items.map((it, j) => (
                  <div key={j} style={{ fontSize: 13, color: `${fg}CC` }}>
                    <span style={{ color: dim, marginRight: 8 }}>—</span>
                    {it}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL / NUMBERS */}
      <section style={{ borderTop: `1px solid ${fg}15`, borderBottom: `1px solid ${fg}15`, padding: '100px 0' }}>
        <div style={container}>
          <div style={{ color: dim, marginBottom: 32 }}>
            <span style={{ color: accent }}>$</span> cat testimonials/pinned.md
          </div>

          <blockquote style={{
            fontFamily: '"Instrument Serif", serif',
            fontStyle: 'italic',
            fontSize: 48,
            lineHeight: 1.15,
            margin: 0,
            maxWidth: 1000,
            color: fg,
            letterSpacing: '-0.01em',
          }}>
            "We onboarded Alessandro as a senior contractor. He rebuilt our
            architecture, rewrote how the team ships, and left six weeks later.
            Twelve months on, the frontend is still his."
          </blockquote>
          <div style={{ color: dim, marginTop: 32, fontSize: 12 }}>
            — Head of Engineering · sports-tech platform
          </div>

          <div style={{ marginTop: 80, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {[
              { n: '09', l: 'years in production' },
              { n: '40+', l: 'engineers mentored' },
              { n: '03', l: 'Olympic-grade platforms' },
              { n: '∞', l: 'PRs reviewed' },
            ].map((s, i) => (
              <div key={i} style={{ border: `1px solid ${fg}15`, padding: 28 }}>
                <div style={{ fontFamily: '"Inter Tight", sans-serif', fontSize: 64, fontWeight: 300, lineHeight: 1, color: accent }}>
                  {s.n}
                </div>
                <div style={{ color: dim, marginTop: 8, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ ...container, paddingTop: 100, paddingBottom: 100 }}>
        <div style={{ color: dim, marginBottom: 32 }}>
          <span style={{ color: accent }}>$</span> ./process.sh --dry-run
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: `${fg}15` }}>
          {[
            { n: '01', t: 'intro()', d: '30-min call. No pitch deck. We figure out if it\'s a fit.' },
            { n: '02', t: 'audit()', d: 'I read the code, talk to the team, ship a short written memo.' },
            { n: '03', t: 'build()', d: 'Hands on keyboard. Architecture, PRs, pairing with your people.' },
            { n: '04', t: 'handoff()', d: 'A document your team runs with. Not a dependency on me.' },
          ].map((p, i) => (
            <div key={i} style={{ background: bg, padding: 32, minHeight: 200 }}>
              <div style={{ color: accent, marginBottom: 20 }}>{p.n}</div>
              <div style={{ fontFamily: '"Inter Tight", sans-serif', fontSize: 26, fontWeight: 500, marginBottom: 12 }}>
                {p.t}
              </div>
              <div style={{ fontSize: 13, color: `${fg}AA`, lineHeight: 1.55 }}>
                {p.d}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section style={{ ...container, paddingTop: 60, paddingBottom: 120 }}>
        <div style={{ color: dim, marginBottom: 32 }}>
          <span style={{ color: accent }}>$</span> nc -l contact
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80, alignItems: 'start' }}>
          <div>
            <h2 style={{
              ...h,
              fontSize: 72,
              margin: 0,
              lineHeight: 0.98,
            }}>
              If you're building
              <br />
              between <span style={{ ...display, color: accent }}>frontend</span>
              <br />
              and <span style={{ ...display, color: accent }}>AI</span> — write me.
            </h2>
            <p style={{ fontFamily: '"Inter Tight", sans-serif', marginTop: 32, fontSize: 16, lineHeight: 1.6, color: `${fg}CC`, maxWidth: 460 }}>
              Or just send me a RAG pipeline that isn't working. I read every email
              and I reply within 48 hours.
            </p>
          </div>

          <div style={{ border: `1px solid ${fg}20`, padding: 32 }}>
            <div style={{ color: dim, fontSize: 11, marginBottom: 20 }}>// quick brief</div>
            {[
              ['name', 'Your name'],
              ['company', 'Company'],
              ['project', 'What you\'re working on'],
              ['budget', 'Budget range (optional)'],
              ['when', 'When you want to start'],
            ].map(([k, ph], i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                padding: '14px 0',
                borderBottom: `1px solid ${fg}12`,
                gap: 16,
                alignItems: 'center',
              }}>
                <span style={{ color: amber }}>{k}:</span>
                <span style={{ color: dim, fontSize: 13 }}>{ph}</span>
              </div>
            ))}
            <button style={{
              marginTop: 24,
              padding: '14px 28px',
              background: accent,
              color: bg,
              border: 'none',
              fontFamily: 'inherit',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              width: '100%',
            }}>
              → send()
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: `1px solid ${fg}15`,
        padding: '24px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 11,
        color: dim,
      }}>
        <span>© 2026 · alessandro.palazzesi</span>
        <span>→ alessandro.palazzesi@gmail.com</span>
        <span>build a7f3d21 · turin/it</span>
      </footer>
    </div>
  );
};

window.TerminalVariant = TerminalVariant;
