// Contact page — structured brief + direct channels.

const ContactPage = ({ onNavigate }) => {
  const { THEME, Reveal, CmdHeader } = window;
  const container = { maxWidth: 1280, margin: '0 auto', padding: '0 48px' };

  const [form, setForm] = React.useState({
    name: '', company: '', email: '', project: 'architecture.audit',
    budget: '€10–25k', when: 'Next 4 weeks', brief: '',
  });
  const [sent, setSent] = React.useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <>
      <section style={{ ...container, paddingTop: 100, paddingBottom: 60 }}>
        <Reveal>
          <CmdHeader cmd="nc -l contact --keep-open" />
          <h1 style={{
            fontFamily: THEME.sans, fontSize: 80, fontWeight: 500, margin: 0,
            letterSpacing: '-0.025em', color: THEME.fgStrong, marginBottom: 24, lineHeight: 0.98,
          }}>
            Let's talk about
            <br />
            <span style={{ fontFamily: THEME.serif, color: THEME.accent }}>what you're building</span>.
          </h1>
          <p style={{ fontFamily: THEME.sans, fontSize: 20, color: `${THEME.fg}CC`, maxWidth: 720, lineHeight: 1.55 }}>
            Fill in the brief below or email me directly. I read every message and reply within 48 hours.
          </p>
        </Reveal>
      </section>

      <section style={{ ...container, paddingBottom: 120 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, alignItems: 'start' }}>
          {/* FORM */}
          <div style={{ border: `1px solid ${THEME.borderStrong}`, padding: 40 }}>
            {!sent ? (
              <form onSubmit={submit}>
                <div style={{ color: THEME.accent, fontFamily: THEME.mono, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 24 }}>
                  // brief.json
                </div>

                <Field label="name" value={form.name} onChange={set('name')} placeholder="Your name" required />
                <Field label="company" value={form.company} onChange={set('company')} placeholder="Company (optional)" />
                <Field label="email" value={form.email} onChange={set('email')} placeholder="you@company.com" type="email" required />

                <Select label="project" value={form.project} onChange={set('project')} options={[
                  'architecture.audit',
                  'frontend.scale',
                  'llm.production',
                  'techLead.fractional',
                  'something else',
                ]} />

                <Select label="budget" value={form.budget} onChange={set('budget')} options={[
                  '< €10k',
                  '€10–25k',
                  '€25–50k',
                  '€50–100k',
                  '€100k+',
                  'not sure yet',
                ]} />

                <Select label="when" value={form.when} onChange={set('when')} options={[
                  'Next 4 weeks',
                  '1–3 months',
                  '3+ months',
                  'Just exploring',
                ]} />

                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16, padding: '16px 0', borderBottom: `1px solid ${THEME.border}`, alignItems: 'start' }}>
                  <label style={{ color: THEME.amber, fontFamily: THEME.mono, fontSize: 13, paddingTop: 6 }}>brief:</label>
                  <textarea
                    value={form.brief}
                    onChange={set('brief')}
                    placeholder="What are you building? What's the current situation? Where are you stuck?"
                    rows={6}
                    style={{
                      background: 'transparent', border: 'none', outline: 'none',
                      color: THEME.fg, fontFamily: THEME.mono, fontSize: 13,
                      width: '100%', resize: 'vertical', padding: 6,
                      borderLeft: `2px solid ${THEME.border}`,
                    }}
                  />
                </div>

                <button type="submit" style={{
                  marginTop: 32, padding: '16px 28px',
                  background: THEME.accent, color: THEME.bg, border: 'none',
                  fontFamily: THEME.mono, fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', width: '100%',
                }}>
                  → send()
                </button>

                <div style={{ marginTop: 16, color: THEME.dim, fontFamily: THEME.mono, fontSize: 11, textAlign: 'center' }}>
                  typical reply time: &lt; 48h
                </div>
              </form>
            ) : (
              <div style={{ padding: '60px 20px', textAlign: 'center' }}>
                <div style={{ fontFamily: THEME.mono, fontSize: 12, color: THEME.accent, marginBottom: 16 }}>
                  ✓ 200 OK · message.sent
                </div>
                <div style={{ fontFamily: THEME.sans, fontSize: 28, color: THEME.fgStrong, marginBottom: 12, letterSpacing: '-0.01em' }}>
                  Thanks, {form.name || 'you'}.
                </div>
                <p style={{ fontFamily: THEME.sans, fontSize: 15, color: `${THEME.fg}BB`, maxWidth: 440, margin: '0 auto', lineHeight: 1.6 }}>
                  I'll get back to you within 48 hours. If you prefer email, I'm at <span style={{ color: THEME.accent }}>alessandro.palazzesi@gmail.com</span>.
                </p>
              </div>
            )}
          </div>

          {/* SIDE */}
          <div>
            <div style={{ color: THEME.accent, fontFamily: THEME.mono, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 24 }}>
              // direct channels
            </div>

            {[
              { l: 'Email', v: 'alessandro.palazzesi@gmail.com', href: 'mailto:alessandro.palazzesi@gmail.com' },
              { l: 'LinkedIn', v: '/in/alessandropalazzesi', href: 'https://www.linkedin.com/in/alessandropalazzesi' },
              { l: 'Phone', v: '+39 348 573 8974', href: 'tel:+393485738974' },
            ].map((x, i) => (
              <a key={i} href={x.href} style={{
                display: 'block', padding: '24px 20px',
                border: `1px solid ${THEME.border}`, marginBottom: 12,
                textDecoration: 'none', color: 'inherit',
                transition: 'border-color .15s, background .15s',
              }}
                className="ch-card"
              >
                <div style={{ fontFamily: THEME.mono, fontSize: 11, color: THEME.dim, marginBottom: 6 }}>
                  {x.l}
                </div>
                <div style={{ fontFamily: THEME.sans, fontSize: 18, color: THEME.fgStrong }}>
                  {x.v}
                </div>
              </a>
            ))}

            <style>{`.ch-card:hover { border-color: ${THEME.accent}; background: ${THEME.bgAlt}; }`}</style>

            <div style={{ marginTop: 40, padding: 24, background: THEME.bgAlt, border: `1px solid ${THEME.border}` }}>
              <div style={{ color: THEME.amber, fontFamily: THEME.mono, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16 }}>
                current status
              </div>
              <div style={{ fontFamily: THEME.sans, fontSize: 15, color: THEME.fg, lineHeight: 1.6 }}>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ color: THEME.accent }}>●</span> Available for Q3 2026 engagements
                </div>
                <div style={{ marginBottom: 8, color: `${THEME.fg}AA` }}>
                  Taking 1–2 new clients this quarter
                </div>
                <div style={{ color: `${THEME.fg}AA` }}>
                  Based in Turin · remote-first · EU/US friendly
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Inline helpers
const Field = ({ label, value, onChange, placeholder, type = 'text', required }) => {
  const { THEME } = window;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16, padding: '16px 0', borderBottom: `1px solid ${THEME.border}`, alignItems: 'center' }}>
      <label style={{ color: THEME.amber, fontFamily: THEME.mono, fontSize: 13 }}>{label}:</label>
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder} required={required}
        style={{
          background: 'transparent', border: 'none', outline: 'none',
          color: THEME.fg, fontFamily: THEME.mono, fontSize: 13, padding: 6,
          borderLeft: `2px solid ${THEME.border}`,
        }}
      />
    </div>
  );
};

const Select = ({ label, value, onChange, options }) => {
  const { THEME } = window;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16, padding: '16px 0', borderBottom: `1px solid ${THEME.border}`, alignItems: 'center' }}>
      <label style={{ color: THEME.amber, fontFamily: THEME.mono, fontSize: 13 }}>{label}:</label>
      <select value={value} onChange={onChange} style={{
        background: 'transparent', border: 'none', outline: 'none',
        color: THEME.fg, fontFamily: THEME.mono, fontSize: 13, padding: 6,
        borderLeft: `2px solid ${THEME.border}`, cursor: 'pointer',
        appearance: 'none', WebkitAppearance: 'none',
      }}>
        {options.map(o => <option key={o} value={o} style={{ background: THEME.bg, color: THEME.fg }}>{o}</option>)}
      </select>
    </div>
  );
};

window.ContactPage = ContactPage;
