/* global React, ReactDOM, Nav, Footer, PageHeader, FadeIn, COLORS, DISPLAY, BODY, MONO */
const { useState } = React;

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <div style={{ ...MONO, color: COLORS.muted, marginBottom: 10 }}>{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%", padding: "14px 0", border: "none",
          borderBottom: `1px solid ${COLORS.ink}`, background: "transparent",
          color: COLORS.ink, ...BODY, fontSize: 20, outline: "none"
        }} />
      
    </div>);

}

function Chip({ active, onClick, children }) {
  return (
    <button type="button" onClick={onClick} style={{
      ...MONO, fontWeight: 500,
      background: active ? COLORS.ink : "transparent",
      color: active ? COLORS.bg : COLORS.ink,
      border: `1px solid ${active ? COLORS.ink : COLORS.line}`,
      padding: "10px 14px", borderRadius: 999, cursor: "pointer",
      transition: "all 0.2s"
    }}>{children}</button>);

}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", project: "Website", budget: "25–50k", note: "" });
  const [sent, setSent] = useState(false);
  const [submitHov, setSubmitHov] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (!form.name || !form.email) return;
    const subject = encodeURIComponent("New project enquiry from " + form.name);
    const body = encodeURIComponent(
      "Name: " + form.name +
      "\nEmail: " + form.email +
      "\nProject type: " + form.project +
      "\nBudget: " + form.budget +
      "\n\n" + form.note
    );
    window.location.href = "mailto:hello@nexura.studio?subject=" + subject + "&body=" + body;
    setSent(true);
  }

  return (
    <>
      <Nav current="contact" />
      <PageHeader
        section="05"
        eyebrow="A first conversation"
        title="Let's"
        italic="begin."
        description="Tell us where you are and where you're going. A person reads every note — within 48 hours, you'll hear back from one." />
      

      <section className="nx-mobile-padding" style={{ padding: "80px 48px 120px" }}>
        <div className="nx-mobile-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 96 }}>
          <FadeIn delay={0}>
          <div>
            <div style={{ ...MONO, color: COLORS.muted, marginBottom: 32 }}>§ 02 · The quiet way</div>
            <a href="mailto:hello@nexura.studio" className="nx-mobile-h2" style={{ ...DISPLAY, fontSize: 40, color: COLORS.ink, textDecoration: "none", borderBottom: `1px solid ${COLORS.primary}`, paddingBottom: 4 }}>hello@nexura.studio</a>

            <div style={{ display: "grid", gap: 28, marginTop: 64 }}>
              <div>
                <div style={{ ...MONO, color: COLORS.muted }}>Response time</div>
                <div style={{ ...BODY, fontSize: 16, marginTop: 8 }}>Within 48 hours · from a person</div>
              </div>

            </div>
          </div>
          </FadeIn>

          <FadeIn delay={120}>
          <form onSubmit={submit} style={{ alignSelf: "start" }}>
            {sent ? <div style={{
              padding: 40, border: `1px solid ${COLORS.primary}`, borderRadius: 2,
              background: COLORS.accent
            }}>
                <div style={{ ...MONO, color: COLORS.primary }}>Received · 001</div>
                <div style={{ ...DISPLAY, fontSize: 48, marginTop: 16, color: COLORS.ink, lineHeight: 1 }}>
                  Thank you, {form.name.split(" ")[0] || "friend"}.
                </div>
                <p style={{ ...BODY, fontSize: 15, marginTop: 20, color: COLORS.ink, lineHeight: 1.5 }}>
                  We'll read it properly, not skim. Expect a reply within two working days — from a person, not a sequence.
                </p>
              </div> :

            <div style={{ display: "grid", gap: 28 }}>
                <Field label="01 · Your name"
              value={form.name} onChange={(v) => setForm({ ...form, name: v })}
              placeholder="Agnès Varda" />
                <Field label="02 · Email" type="email"
              value={form.email} onChange={(v) => setForm({ ...form, email: v })}
              placeholder="agnes@maison.fr" />

                <div>
                  <div style={{ ...MONO, color: COLORS.muted, marginBottom: 10 }}>03 · What we'd make</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["Website", "Web app", "Mobile app", "AI Photoshoot", "Brand + site", "Not sure yet"].map((o) =>
                  <Chip key={o} active={form.project === o} onClick={() => setForm({ ...form, project: o })}>{o}</Chip>
                  )}
                  </div>
                </div>

                <div>
                  <div style={{ ...MONO, color: COLORS.muted, marginBottom: 10 }}>04 · Budget</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["< 25k", "25–50k", "50–100k", "100k+", "TBD"].map((o) =>
                  <Chip key={o} active={form.budget === o} onClick={() => setForm({ ...form, budget: o })}>{o}</Chip>
                  )}
                  </div>
                </div>

                <div>
                  <div style={{ ...MONO, color: COLORS.muted, marginBottom: 10 }}>05 · A few lines about the work</div>
                  <textarea
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  rows={6}
                  placeholder="Where you are, where you're going, what's in the way…"
                  style={{
                    width: "100%", padding: 16, border: `1px solid ${COLORS.line}`,
                    background: COLORS.surface, color: COLORS.ink, resize: "vertical",
                    ...BODY, fontSize: 15, outline: "none", borderRadius: 2
                  }} />
                
                </div>

                <button type="submit"
                onMouseEnter={() => setSubmitHov(true)}
                onMouseLeave={() => setSubmitHov(false)}
                style={{
                ...MONO, fontWeight: 500,
                background: submitHov ? COLORS.secondary : COLORS.primary, color: COLORS.bg,
                border: "none", padding: "18px 24px", borderRadius: 999,
                cursor: "pointer", justifySelf: "start", marginTop: 8,
                transform: submitHov ? "scale(1.04)" : "scale(1)",
                transition: "all 0.25s cubic-bezier(0.2,0.8,0.2,1)",
              }}>Send the note →</button>
              </div>
            }
          </form>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<Contact />);