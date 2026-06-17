/* global React, ReactDOM, Nav, Footer, PageHeader, LineN, FadeIn, COLORS, DISPLAY, BODY, MONO */

const APPROACH = [
  { n: "I", title: "Listen", body: "A short conversation — an hour, no slides — to find the shape of the work. We ask more than we pitch." },
  { n: "II", title: "Sketch", body: "Moodboards, directions, hand-drawn frames. We commit to an aesthetic before a pixel is pushed." },
  { n: "III", title: "Draw", body: "High-fidelity design in a system built for you. Typography, motion, tone — all considered." },
  { n: "IV", title: "Build", body: "Ship-ready code from the same team that designed it. No translation loss at the seam." },
  { n: "V", title: "Tend", body: "We stay on, lightly, as the work grows. Ongoing care, not a handover cliff." },
];

const PRINCIPLES = [
  { n: "01", line: "The hand still matters." },
  { n: "02", line: "We don’t rush. We refine." },
  { n: "03", line: "Make it worth keeping." },
  { n: "04", line: "Every detail in type communicates." },
  { n: "05", line: "Individual thought, incomparable design." },
];

function Approach() {
  const [cardHov, setCardHov] = React.useState(null);
  const [pHov, setPHov] = React.useState(null);
  return (
    <>
      <Nav current="approach" />
      <PageHeader
        section="03"
        eyebrow="How the work moves"
        title="Five"
        italic="movements."
        description="Every project runs through the same five beats — in order, without skipping. It is how we stay honest with clients and with ourselves."
      />

      <section className="nx-mobile-padding" style={{ padding: "80px 48px 120px" }}>
        <FadeIn>
          <div style={{ ...MONO, color: COLORS.muted, marginBottom: 48 }}>§ 02 · The movements</div>
        </FadeIn>
        <div className="nx-movements-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 24 }}>
          {APPROACH.map((a, i) => (
            <FadeIn key={a.n} delay={i * 90}>
              <div
                onMouseEnter={() => setCardHov(a.n)}
                onMouseLeave={() => setCardHov(null)}
                style={{
                  padding: "32px 24px 40px",
                  borderTop: `2px solid ${cardHov === a.n ? COLORS.primary : COLORS.ink}`,
                  minHeight: 300,
                  display: "flex", flexDirection: "column", justifyContent: "space-between",
                  background: cardHov === a.n ? COLORS.veil : "transparent",
                  transform: cardHov === a.n ? "translateY(-4px)" : "translateY(0)",
                  transition: "background 0.3s, border-color 0.3s, transform 0.3s cubic-bezier(0.2,0.8,0.2,1)",
                }}>
                <div>
                  <div style={{ ...MONO, color: COLORS.muted }}>Movement {a.n}</div>
                  <div style={{ ...DISPLAY, fontSize: 52, marginTop: 10, color: cardHov === a.n ? COLORS.primary : COLORS.ink, transition: "color 0.3s" }}>{a.title}</div>
                </div>
                <p style={{ ...BODY, fontSize: 14, lineHeight: 1.55, color: COLORS.muted, margin: 0 }}>{a.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="nx-mobile-padding" style={{ padding: "120px 48px", borderTop: `1px solid ${COLORS.line}`, background: COLORS.veil }}>
        <FadeIn>
          <div className="nx-mobile-stack" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 48, alignItems: "baseline", marginBottom: 64 }}>
            <div style={{ ...MONO, color: COLORS.muted }}>§ 03 · Principles</div>
            <h2 className="nx-mobile-h2" style={{ ...DISPLAY, fontSize: 72, margin: 0, color: COLORS.ink }}>
              Five things we <em style={{ fontStyle: "italic", color: COLORS.secondary }}>hold.</em>
            </h2>
          </div>
        </FadeIn>
        <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {PRINCIPLES.map((p, i) => (
            <FadeIn key={p.n} delay={i * 70}>
              <li
                onMouseEnter={() => setPHov(p.n)}
                onMouseLeave={() => setPHov(null)}
                className="nx-mobile-stack"
                style={{
                  display: "grid", gridTemplateColumns: "80px 1fr", gap: 32, alignItems: "baseline",
                  padding: "28px 0", borderTop: `1px solid ${COLORS.line}`,
                  transform: pHov === p.n ? "translateX(8px)" : "translateX(0)",
                  transition: "transform 0.3s cubic-bezier(0.2,0.8,0.2,1)",
                }}>
                <div style={{ ...MONO, color: COLORS.muted }}>{p.n}</div>
                <div className="nx-mobile-h3" style={{ ...DISPLAY, fontSize: 48, color: pHov === p.n ? COLORS.primary : COLORS.ink, transition: "color 0.3s" }}>{p.line}</div>
              </li>
            </FadeIn>
          ))}
          <div style={{ borderTop: `1px solid ${COLORS.line}` }} />
        </ol>
      </section>

      <section className="nx-mobile-padding" style={{ padding: "120px 48px", textAlign: "center", borderTop: `1px solid ${COLORS.line}`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -40, top: 20, width: 360, height: 420, opacity: 0.06 }}>
          <LineN color={COLORS.primary} stroke={0.8} />
        </div>
        <div style={{ ...MONO, color: COLORS.muted, marginBottom: 24 }}>§ 04 · Begin</div>
        <h2 className="nx-mobile-h2" style={{ ...DISPLAY, fontSize: "clamp(56px, 8vw, 112px)", margin: 0, color: COLORS.ink, position: "relative" }}>
          Ready for the<br /><em style={{ fontStyle: "italic", color: COLORS.secondary }}>first conversation?</em>
        </h2>
        <a href="Nexura Contact.html" style={{
          display: "inline-block", marginTop: 48,
          ...MONO, fontWeight: 500, textDecoration: "none",
          background: COLORS.primary, color: COLORS.bg,
          padding: "18px 26px", borderRadius: 999,
        }}>Send a note →</a>
      </section>

      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Approach />);
