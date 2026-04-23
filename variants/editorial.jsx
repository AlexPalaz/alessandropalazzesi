// Variant A — Dark Editorial Serif
// Cormorant + Inter Tight + JetBrains Mono. Off-white on deep ink. Single warm amber accent.

const EditorialVariant = () => {
  const accent = 'oklch(0.78 0.14 65)'; // warm amber
  const ink = '#0B0B0C';
  const paper = '#EDE6D8';
  const dim = '#8A857A';

  const wrap = {
    background: ink,
    color: paper,
    fontFamily: '"Inter Tight", sans-serif',
    minHeight: '100%',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  };

  const display = {
    fontFamily: '"Cormorant Garamond", serif',
    fontWeight: 300,
    letterSpacing: '-0.02em',
    lineHeight: 0.95,
  };

  const mono = {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: dim,
  };

  const container = { maxWidth: 1280, margin: '0 auto', padding: '0 64px' };

  return (
    <div style={wrap}>
      {/* NAV */}
      <nav style={{
        ...container,
        padding: '32px 64px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid ${paper}12`,
      }}>
        <div style={{ ...mono, color: paper }}>A · P</div>
        <div style={{ display: 'flex', gap: 36, ...mono }}>
          <span>Work</span>
          <span>Services</span>
          <span>Process</span>
          <span>Writing</span>
          <span style={{ color: paper }}>Contact</span>
        </div>
        <div style={{ ...mono }}>Turin, IT · 45.07°N</div>
      </nav>

      {/* HERO */}
      <section style={{ ...container, paddingTop: 120, paddingBottom: 140, position: 'relative' }}>
        <div style={{ ...mono, marginBottom: 48, display: 'flex', gap: 20, alignItems: 'center' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: accent, display: 'inline-block' }} />
          <span>Available · Q3 2026 engagements</span>
          <span style={{ color: `${paper}30` }}>/</span>
          <span>Est. 2016</span>
        </div>

        <h1 style={{ ...display, fontSize: 132, margin: 0, marginBottom: 32 }}>
          Frontend<br />
          architecture,<br />
          <span style={{ fontStyle: 'italic', color: accent }}>quietly</span> shipped.
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, marginTop: 80 }}>
          <div>
            <p style={{ fontSize: 19, lineHeight: 1.55, maxWidth: 520, color: `${paper}D0`, margin: 0 }}>
              I'm Alessandro Palazzesi — a Technical Lead and Frontend Architect.
              I help product teams build web platforms that scale, and the AI layer on top of them.
              Nine years in, still writing code.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'flex-start' }}>
            <div style={{
              padding: '18px 28px',
              border: `1px solid ${paper}`,
              color: paper,
              fontSize: 14,
              letterSpacing: '0.06em',
              display: 'flex',
              gap: 14,
              alignItems: 'center',
            }}>
              Book a 30-min intro call
              <span>→</span>
            </div>
            <div style={{ ...mono, fontSize: 10 }}>
              alessandro.palazzesi@gmail.com  ·  +39 348 573 8974
            </div>
          </div>
        </div>

        {/* Thin rule + rotating marker */}
        <div style={{ position: 'absolute', top: 160, right: 64, ...mono, writingMode: 'vertical-rl', color: `${paper}50` }}>
          Portfolio / 2026 / Vol. IX
        </div>
      </section>

      {/* CLIENT MARQUEE */}
      <section style={{
        borderTop: `1px solid ${paper}15`,
        borderBottom: `1px solid ${paper}15`,
        padding: '28px 0',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex',
          gap: 80,
          ...display,
          fontSize: 34,
          color: `${paper}88`,
          whiteSpace: 'nowrap',
        }}>
          <span>Juventus</span>
          <span style={{ color: accent }}>✦</span>
          <span>MLS Soccer</span>
          <span style={{ color: accent }}>✦</span>
          <span>Tokyo Olympics 2021</span>
          <span style={{ color: accent }}>✦</span>
          <span>Illimity Bank</span>
          <span style={{ color: accent }}>✦</span>
          <span>Deltatre</span>
          <span style={{ color: accent }}>✦</span>
          <span>Nuvem</span>
          <span style={{ color: accent }}>✦</span>
          <span>Gewiss</span>
          <span style={{ color: accent }}>✦</span>
          <span>Presidenza del Consiglio</span>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ ...container, paddingTop: 140, paddingBottom: 140 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 80 }}>
          <div>
            <div style={{ ...mono, marginBottom: 20 }}>§ 01 — What I do</div>
            <h2 style={{ ...display, fontSize: 56, margin: 0 }}>
              Three ways<br />to work with me.
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              {
                n: '01',
                t: 'Frontend architecture',
                sub: 'React · TypeScript · Next.js · design systems',
                d: 'Clean up messy codebases. Make the right technical choices early. Ship design systems that engineering actually uses. Real performance work, not vanity metrics.',
                price: 'from €12k / 4 weeks',
              },
              {
                n: '02',
                t: 'AI product engineering',
                sub: 'RAG · LLMs · retrieval · prompt & context engineering',
                d: 'Bring LLMs into real production workflows. Design the UX so the features are useful, not demos. I spend a lot of time on the unsexy parts — evaluation, latency, cost, guardrails — because that\'s where AI products fail.',
                price: 'from €18k / 6 weeks',
              },
              {
                n: '03',
                t: 'Technical leadership',
                sub: 'Hands-on. I still write code and review PRs.',
                d: 'Staff / Principal-level engagements for product teams that need a senior voice in the room. Architecture decisions, hiring, mentoring, unblocking. I don\'t just run meetings.',
                price: 'monthly retainer',
              },
            ].map((s, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 180px',
                gap: 40,
                padding: '40px 0',
                borderTop: `1px solid ${paper}18`,
                alignItems: 'baseline',
              }}>
                <div style={{ ...mono, color: accent }}>{s.n}</div>
                <div>
                  <div style={{ ...display, fontSize: 34, marginBottom: 6 }}>{s.t}</div>
                  <div style={{ ...mono, marginBottom: 20 }}>{s.sub}</div>
                  <div style={{ fontSize: 16, lineHeight: 1.55, color: `${paper}BB`, maxWidth: 560 }}>{s.d}</div>
                </div>
                <div style={{ ...mono, color: paper, textAlign: 'right' }}>{s.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES — editorial list */}
      <section style={{ ...container, paddingBottom: 140 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 60 }}>
          <div>
            <div style={{ ...mono, marginBottom: 20 }}>§ 02 — Selected work</div>
            <h2 style={{ ...display, fontSize: 56, margin: 0 }}>
              Nine years, in seven lines.
            </h2>
          </div>
          <div style={{ ...mono }}>2016 — 2026</div>
        </div>

        <div style={{ borderTop: `1px solid ${paper}18` }}>
          {[
            { y: '2025', c: 'Presidenza del Consiglio', r: 'Software Engineer', t: 'Public digital transformation', st: 'Rome' },
            { y: '2024', c: 'Nuvem', r: 'Full Stack Engineer', t: 'Pharmacy 340B cloud platform', st: 'US · Remote' },
            { y: '2023', c: 'Illimity Bank', r: 'Frontend Architect', t: 'Digital banking workflows', st: 'Milan' },
            { y: '2022', c: 'Juventus', r: 'Technical Lead', t: 'CMS & page builders at scale', st: 'Turin' },
            { y: '2021', c: 'Tokyo Olympics', r: 'Senior Frontend', t: 'Broadcast front-of-house', st: 'Tokyo / Remote' },
            { y: '2020', c: 'MLS Soccer', r: 'Senior Frontend', t: 'OTT streaming & content', st: 'US · Remote' },
            { y: '2019', c: 'Gewiss', r: 'Frontend Developer', t: 'E-Mobility app', st: 'Bergamo' },
          ].map((x, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '80px 280px 1fr 200px 40px',
              padding: '28px 0',
              borderBottom: `1px solid ${paper}18`,
              alignItems: 'baseline',
              gap: 24,
            }}>
              <div style={{ ...mono }}>{x.y}</div>
              <div style={{ ...display, fontSize: 28 }}>{x.c}</div>
              <div style={{ fontSize: 16, color: `${paper}AA` }}>{x.t}</div>
              <div style={{ ...mono }}>{x.r}</div>
              <div style={{ textAlign: 'right', color: accent }}>→</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section style={{
        background: paper,
        color: ink,
        padding: '160px 64px',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ ...mono, color: `${ink}80`, marginBottom: 48 }}>§ 03 — On record</div>
          <blockquote style={{
            ...display,
            fontSize: 68,
            margin: 0,
            maxWidth: 1100,
            lineHeight: 1.05,
          }}>
            <span style={{ color: accent }}>"</span>
            Alessandro doesn't just ship features. He rewrites how your team thinks
            about the frontend — so the next six months are easier than the last six.
            <span style={{ color: accent }}>"</span>
          </blockquote>
          <div style={{ marginTop: 60, display: 'flex', gap: 40, ...mono, color: `${ink}80` }}>
            <span>Head of Engineering</span>
            <span>·</span>
            <span>B2B SaaS, Series C</span>
          </div>

          <div style={{ marginTop: 120, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 48, borderTop: `1px solid ${ink}15`, paddingTop: 60 }}>
            {[
              { n: '+9 yrs', l: 'shipping production' },
              { n: '40+', l: 'engineers mentored' },
              { n: '3×', l: 'Olympic-grade platforms' },
              { n: '€14M+', l: 'transacting through my UIs' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ ...display, fontSize: 64, lineHeight: 1 }}>{s.n}</div>
                <div style={{ ...mono, color: `${ink}80`, marginTop: 10 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ ...container, paddingTop: 140, paddingBottom: 140 }}>
        <div style={{ ...mono, marginBottom: 20 }}>§ 04 — How we'd work</div>
        <h2 style={{ ...display, fontSize: 56, margin: 0, marginBottom: 80 }}>A four-week rhythm.</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
          {[
            { w: 'Week 00', t: 'Intro call', d: 'Thirty minutes. We figure out if I\'m the right fit. No pitch deck.' },
            { w: 'Week 01', t: 'Audit', d: 'I read the codebase, talk to the team, write a short memo. Honest, not polite.' },
            { w: 'Week 02–03', t: 'Build', d: 'Hands on keyboard. Architecture decisions, real PRs, pairing with your engineers.' },
            { w: 'Week 04', t: 'Handoff', d: 'A document your team can run with. Not a dependency on me.' },
          ].map((p, i) => (
            <div key={i} style={{ borderTop: `1px solid ${paper}25`, paddingTop: 20 }}>
              <div style={{ ...mono, color: accent, marginBottom: 24 }}>{p.w}</div>
              <div style={{ ...display, fontSize: 30, marginBottom: 16 }}>{p.t}</div>
              <div style={{ fontSize: 14, lineHeight: 1.6, color: `${paper}AA` }}>{p.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section style={{
        ...container,
        paddingTop: 100,
        paddingBottom: 100,
        borderTop: `1px solid ${paper}15`,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <div>
            <div style={{ ...mono, marginBottom: 20 }}>§ 05 — Contact</div>
            <h2 style={{ ...display, fontSize: 96, margin: 0, lineHeight: 0.95 }}>
              If you're building<br />between <span style={{ fontStyle: 'italic', color: accent }}>frontend</span><br />and <span style={{ fontStyle: 'italic', color: accent }}>AI —</span>
            </h2>
            <p style={{ fontSize: 18, color: `${paper}CC`, marginTop: 32, maxWidth: 480, lineHeight: 1.55 }}>
              or you need a second opinion on a RAG pipeline that isn't working well,
              write me. I read every email.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 80 }}>
            {[
              { l: 'Tell me about your project', s: 'Structured brief · 5 min', primary: true },
              { l: 'Email me directly', s: 'alessandro.palazzesi@gmail.com' },
              { l: 'LinkedIn', s: '/in/alessandropalazzesi' },
              { l: 'Download CV', s: 'PDF · 180kb' },
            ].map((c, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '28px 32px',
                background: c.primary ? paper : 'transparent',
                color: c.primary ? ink : paper,
                border: c.primary ? 'none' : `1px solid ${paper}25`,
                cursor: 'pointer',
              }}>
                <div>
                  <div style={{ ...display, fontSize: 26, marginBottom: 4 }}>{c.l}</div>
                  <div style={{ ...mono, color: c.primary ? `${ink}80` : dim }}>{c.s}</div>
                </div>
                <span style={{ fontSize: 24 }}>→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        ...container,
        padding: '40px 64px',
        borderTop: `1px solid ${paper}15`,
        display: 'flex',
        justifyContent: 'space-between',
        ...mono,
      }}>
        <span>© MMXXVI · Alessandro Palazzesi</span>
        <span>Turin · 45.07°N / 7.68°E</span>
        <span>Site Vol. IX</span>
      </footer>
    </div>
  );
};

window.EditorialVariant = EditorialVariant;
