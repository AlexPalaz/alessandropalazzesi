// Variant B — Monochrome Noir
// High-contrast black/white, subtle grain, oversized display serif, italic flourishes.
// Feels like a film poster. No color.

const NoirVariant = () => {
  const ink = '#050505';
  const paper = '#F4F1EB';
  const dim = '#7A756C';

  const wrap = {
    background: paper,
    color: ink,
    fontFamily: '"Inter Tight", sans-serif',
    minHeight: '100%',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  };

  // SVG grain overlay
  const grain = {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    opacity: 0.08,
    mixBlendMode: 'multiply',
    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
    zIndex: 50,
  };

  const display = {
    fontFamily: '"Instrument Serif", serif',
    fontWeight: 400,
    letterSpacing: '-0.015em',
    lineHeight: 0.92,
  };

  const mono = {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.22em',
  };

  const container = { maxWidth: 1320, margin: '0 auto', padding: '0 48px' };

  return (
    <div style={wrap}>
      <div style={grain} />

      {/* Top bar */}
      <div style={{
        ...container,
        padding: '24px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid ${ink}`,
      }}>
        <div style={{ ...mono }}>No. IX · MMXXVI</div>
        <div style={{ ...mono }}>Alessandro Palazzesi — Studio of One</div>
        <div style={{ ...mono }}>Turin · Remote</div>
      </div>

      {/* HERO — film poster */}
      <section style={{ position: 'relative', borderBottom: `1px solid ${ink}` }}>
        <div style={{ ...container, padding: '80px 48px 60px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 80, ...mono }}>
            <span>A Frontend Architect & Technical Lead</span>
            <span>Running time: 09 yrs</span>
            <span>Rated: Staff / Principal</span>
          </div>

          <h1 style={{
            ...display,
            fontSize: 220,
            margin: 0,
            textAlign: 'center',
            letterSpacing: '-0.03em',
          }}>
            THE <em style={{ fontStyle: 'italic' }}>architect</em>
          </h1>
          <div style={{ textAlign: 'center', ...display, fontSize: 96, marginTop: -20 }}>
            &nbsp;of the <em style={{ fontStyle: 'italic' }}>quiet</em> stack.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 60, marginTop: 100, alignItems: 'end' }}>
            <div style={{ ...mono, lineHeight: 1.8 }}>
              Directed by<br />
              <span style={{ ...display, fontSize: 22, letterSpacing: 0, textTransform: 'none' }}>
                Alessandro Palazzesi
              </span>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ ...display, fontSize: 42, fontStyle: 'italic' }}>"A feature film<br />on shipping software."</div>
              <div style={{ ...mono, marginTop: 20 }}>— The Client, 2025</div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{
                display: 'inline-block',
                padding: '18px 36px',
                background: ink,
                color: paper,
                ...mono,
                fontSize: 11,
              }}>
                Now booking · Q3 2026 →
              </div>
              <div style={{ ...mono, marginTop: 16 }}>alessandro.palazzesi@gmail.com</div>
            </div>
          </div>
        </div>
      </section>

      {/* STARRING — case studies */}
      <section style={{ borderBottom: `1px solid ${ink}` }}>
        <div style={{
          padding: '16px 48px',
          borderBottom: `1px solid ${ink}`,
          ...mono,
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <span>Starring</span>
          <span>— In order of appearance —</span>
          <span>09 chapters</span>
        </div>

        <div style={{ ...container, padding: '60px 48px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            borderLeft: `1px solid ${ink}`,
            borderTop: `1px solid ${ink}`,
          }}>
            {[
              { c: 'Juventus', y: '2022', r: 'Technical Lead', d: 'CMS & page builders — the engine behind matchday content at scale.' },
              { c: 'Tokyo Olympics 2021', y: '2021', r: 'Senior Frontend', d: 'Broadcast-grade interfaces for the world\'s biggest sporting event.' },
              { c: 'MLS Soccer', y: '2020', r: 'Senior Frontend', d: 'OTT streaming and content workflows for North American soccer.' },
              { c: 'Illimity Bank', y: '2023', r: 'Frontend Architect', d: 'Complex digital banking workflows. Money moves, and UX matters.' },
              { c: 'Nuvem', y: '2024', r: 'Full Stack Engineer', d: 'Cloud platform for US pharmacies running 340B programs.' },
              { c: 'Presidenza del Consiglio', y: '2025', r: 'Software Engineer', d: 'Italy\'s Department for Digital Transformation. Public code, public service.' },
            ].map((x, i) => (
              <div key={i} style={{
                padding: '40px 32px',
                borderRight: `1px solid ${ink}`,
                borderBottom: `1px solid ${ink}`,
                minHeight: 280,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ ...mono, color: dim, marginBottom: 20 }}>
                    CH. {String(i + 1).padStart(2, '0')} · {x.y}
                  </div>
                  <div style={{ ...display, fontSize: 40, marginBottom: 16, lineHeight: 1 }}>{x.c}</div>
                  <div style={{ fontSize: 14, color: `${ink}AA`, lineHeight: 1.5 }}>{x.d}</div>
                </div>
                <div style={{ ...mono, marginTop: 30, display: 'flex', justifyContent: 'space-between' }}>
                  <span>{x.r}</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES — scripted acts */}
      <section style={{ borderBottom: `1px solid ${ink}` }}>
        <div style={{ ...container, padding: '100px 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 60 }}>
            <div style={{ ...mono, writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              Three acts — Services for the enterprise
            </div>
            <div>
              <div style={{ ...display, fontSize: 140, lineHeight: 0.9 }}>
                <em style={{ fontStyle: 'italic' }}>Act I.</em>
              </div>
              <div style={{ ...display, fontSize: 52, marginTop: 20, lineHeight: 1.05, maxWidth: 900 }}>
                You have a frontend codebase that's getting heavier every sprint.
                I come in, read everything, and write the short memo nobody on
                your team wants to write themselves.
              </div>
              <div style={{ ...mono, marginTop: 40, color: dim }}>
                Architecture audit · 2 weeks · from €8k
              </div>

              <div style={{ height: 120 }} />

              <div style={{ ...display, fontSize: 140, lineHeight: 0.9 }}>
                <em style={{ fontStyle: 'italic' }}>Act II.</em>
              </div>
              <div style={{ ...display, fontSize: 52, marginTop: 20, lineHeight: 1.05, maxWidth: 900 }}>
                You're putting LLMs into your product and the demo is beautiful
                but the real thing is slow, expensive, and hallucinates. I've
                seen this film before. I know the ending.
              </div>
              <div style={{ ...mono, marginTop: 40, color: dim }}>
                RAG & LLM consulting · 4–6 weeks · from €18k
              </div>

              <div style={{ height: 120 }} />

              <div style={{ ...display, fontSize: 140, lineHeight: 0.9 }}>
                <em style={{ fontStyle: 'italic' }}>Act III.</em>
              </div>
              <div style={{ ...display, fontSize: 52, marginTop: 20, lineHeight: 1.05, maxWidth: 900 }}>
                You need someone senior in the room while you hire, ship, and
                scale. I still write code. I review PRs. I mentor engineers.
                I don't just run meetings.
              </div>
              <div style={{ ...mono, marginTop: 40, color: dim }}>
                Fractional Staff / Principal · monthly retainer
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NUMBERS */}
      <section style={{
        background: ink,
        color: paper,
        padding: '100px 48px',
        position: 'relative',
      }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div style={{ ...mono, marginBottom: 60 }}>— By the numbers —</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}>
            {[
              { n: 'IX', l: 'years shipping production code' },
              { n: '40+', l: 'engineers mentored or led' },
              { n: '3×', l: 'platforms at Olympic scale' },
              { n: '100%', l: 'of clients came by referral' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ ...display, fontSize: 140, lineHeight: 1, fontStyle: i === 0 ? 'italic' : 'normal' }}>
                  {s.n}
                </div>
                <div style={{ ...mono, marginTop: 12, color: `${paper}80` }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section style={{ borderBottom: `1px solid ${ink}`, padding: '120px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ ...mono, marginBottom: 40, color: dim }}>Praise</div>
          <blockquote style={{ ...display, fontSize: 64, margin: 0, lineHeight: 1.05 }}>
            "The team was faster six weeks after <em style={{ fontStyle: 'italic' }}>Alessandro</em> left
            than when he arrived. That's the whole review."
          </blockquote>
          <div style={{ ...mono, marginTop: 40, color: dim }}>
            VP Engineering · European fintech
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ borderBottom: `1px solid ${ink}` }}>
        <div style={{ ...container, padding: '80px 48px' }}>
          <div style={{ ...mono, marginBottom: 20 }}>— Screenplay —</div>
          <h2 style={{ ...display, fontSize: 80, margin: 0, marginBottom: 60 }}>
            How a <em style={{ fontStyle: 'italic' }}>four-week</em> engagement runs.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr 1fr 1fr' }}>
            <div style={{ ...mono, paddingTop: 20 }}>Timeline</div>
            {[
              { w: 'W00', t: 'Intro', d: 'Thirty minutes. No deck. We see if it\'s a fit.' },
              { w: 'W01', t: 'Read', d: 'Codebase, people, product. I write the memo.' },
              { w: 'W02–03', t: 'Build', d: 'Architecture, PRs, pairing. Real work.' },
              { w: 'W04', t: 'Handoff', d: 'Your team can run with it. Without me.' },
            ].map((p, i) => (
              <div key={i} style={{
                borderLeft: `1px solid ${ink}`,
                padding: '20px 24px',
                minHeight: 180,
              }}>
                <div style={{ ...mono, marginBottom: 16 }}>{p.w}</div>
                <div style={{ ...display, fontSize: 38, marginBottom: 12, fontStyle: 'italic' }}>{p.t}</div>
                <div style={{ fontSize: 13, lineHeight: 1.55, color: `${ink}AA` }}>{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section style={{
        background: ink,
        color: paper,
        padding: '160px 48px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ ...mono, color: `${paper}60`, marginBottom: 40 }}>— End credits —</div>
          <h2 style={{ ...display, fontSize: 140, margin: 0, lineHeight: 0.92 }}>
            Write me.<br />
            <em style={{ fontStyle: 'italic' }}>I read everything.</em>
          </h2>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 80, flexWrap: 'wrap' }}>
            {[
              { l: 'alessandro.palazzesi@gmail.com', primary: true },
              { l: 'Book a 30-min call' },
              { l: 'LinkedIn /in/alessandropalazzesi' },
            ].map((c, i) => (
              <div key={i} style={{
                padding: '20px 36px',
                border: `1px solid ${paper}`,
                background: c.primary ? paper : 'transparent',
                color: c.primary ? ink : paper,
                ...mono,
                fontSize: 11,
              }}>
                {c.l}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{
        ...container,
        padding: '30px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        ...mono,
      }}>
        <span>© MMXXVI</span>
        <span>Turin · Italy</span>
        <span>Fin.</span>
      </footer>
    </div>
  );
};

window.NoirVariant = NoirVariant;
