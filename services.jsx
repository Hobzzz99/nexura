/* global React, ReactDOM, Nav, Footer, PageHeader, StripedTile, FadeIn, COLORS, DISPLAY, BODY, MONO */
const { useState } = React;

const SERVICES = [
  {
    n: "1",
    title: "Website Design",
    kicker: "Marketing · Editorial · Identity",
    lines: [
      "Brand sites that feel like brochures, not templates.",
      "Art direction, typography, bespoke layout systems.",
      "From a single landing page to a full content architecture.",
    ],
    deliverables: ["Art direction", "Figma system", "Copy support", "Launch QA"],
  },
  {
    n: "2",
    title: "Web Development",
    kicker: "React · Next · TypeScript",
    lines: [
      "We build what we design — no throwing it over a wall.",
      "Performance, accessibility, and craft as features, not afterthoughts.",
      "Integrated with your CMS, e-commerce, or product stack.",
    ],
    deliverables: ["Next.js, React build", "CMS integration", "Analytics", "A11y audit"],
  },
  {
    n: "3",
    title: "App Development",
    kicker: "iOS · Android · React Native",
    lines: [
      "Mobile-native experiences that feel deliberate, not ported.",
      "Bespoke components, considered motion, haptics that matter.",
      "Ship-ready codebases and App Store / Play launch support.",
    ],
    deliverables: ["iOS + Android", "Native patterns", "Motion + haptics", "Store launch"],
  },
];

function ServiceRow({ service, open, onClick }) {
  return (
    <div
      onClick={onClick}
      className="nx-service-row"
      style={{
        borderTop: `1px solid ${COLORS.line}`,
        padding: "36px 0",
        cursor: "pointer",
        display: "grid",
        gridTemplateColumns: "80px 1fr auto",
        gap: 32,
        alignItems: "start",
        transition: "padding 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
        paddingBottom: open ? 56 : 36,
      }}
    >
      <div className="nx-mobile-hide" style={{ ...MONO, color: COLORS.muted, paddingTop: 18 }}>{service.n}</div>
      <div>
        <div className="nx-mobile-h2" style={{ ...DISPLAY, fontSize: 72, color: open ? COLORS.primary : COLORS.ink, transition: "color 0.3s" }}>
          {service.title}
        </div>
        <div style={{ ...MONO, color: COLORS.muted, marginTop: 10 }}>{service.kicker}</div>
        <div style={{
          overflow: "hidden",
          maxHeight: open ? 400 : 0,
          opacity: open ? 1 : 0,
          transition: "max-height 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s",
          marginTop: open ? 32 : 0,
        }}>
          <div className="nx-mobile-stack" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 48, paddingTop: 8 }}>
            <div>
              {service.lines.map((l, i) => (
                <p key={i} style={{ ...BODY, fontSize: 17, lineHeight: 1.55, margin: "0 0 10px", color: COLORS.ink, maxWidth: 560 }}>{l}</p>
              ))}
            </div>
            <div>
              <div style={{ ...MONO, color: COLORS.muted, marginBottom: 12 }}>Deliverables</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {service.deliverables.map((d, i) => (
                  <li key={i} style={{ ...BODY, fontSize: 14, padding: "8px 0", borderTop: `1px dashed ${COLORS.line}`, color: COLORS.ink }}>— {d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div style={{
        ...MONO, color: COLORS.ink, paddingTop: 22,
        transform: open ? "rotate(45deg)" : "rotate(0deg)",
        transition: "transform 0.3s",
        fontSize: 20, lineHeight: 1,
      }}>+</div>
    </div>
  );
}

function AIPhotoshootCallout() {
  const [studioHov, setStudioHov] = useState(false);
  return (
    <FadeIn>
      <div className="nx-mobile-stack nx-mobile-padding" style={{
        marginTop: 80, padding: 48, background: COLORS.ink, color: COLORS.bg, borderRadius: 2,
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center",
      }}>
        <div>
          <div style={{ ...MONO, color: COLORS.accent }}>Studio only</div>
          <h3 className="nx-mobile-h2" style={{ ...DISPLAY, fontSize: 64, margin: "16px 0 24px", color: COLORS.bg, lineHeight: 1 }}>
            AI <em style={{ fontStyle: "italic", color: COLORS.accent }}>Photoshoots</em>
          </h3>
          <p style={{ ...BODY, fontSize: 16, lineHeight: 1.55, color: "#C8BED6", maxWidth: 480 }}>
            Editorial imagery, made in a digital studio. Product, lookbook, campaign and portrait work — directed like a shoot, delivered at studio resolution. Lives on its own page.
          </p>
          <a href="Nexura Studio.html"
            onMouseEnter={() => setStudioHov(true)}
            onMouseLeave={() => setStudioHov(false)}
            style={{
              ...MONO, fontWeight: 500, textDecoration: "none", color: COLORS.ink,
              background: COLORS.accent, border: "none", padding: "14px 20px", borderRadius: 999,
              marginTop: 28, display: "inline-block",
              transform: studioHov ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.25s cubic-bezier(0.2,0.8,0.2,1)",
            }}>Visit the studio →</a>
        </div>
        <div className="nx-mobile-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            { label: "1 · Portrait", tone: "primary" },
            { label: "2 · Product", tone: "accent" },
            { label: "3 · Campaign", tone: "accent" },
            { label: "4 · Lookbook", tone: "primary" },
          ].map((s) => (
            <StripedTile key={s.label} ratio={1} label={s.label} tone={s.tone} />
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

function Services() {
  const [open, setOpen] = useState("01");
  return (
    <>
      <Nav current="services" />
      <PageHeader
        section="01"
        eyebrow="Three lines of work, plus one"
        title="What we"
        italic="make."
        description="Four services held under one roof. Three belong to the web. One belongs to the studio — it has its own page, its own rhythm, and its own rules."
      />
      <section className="nx-mobile-padding" style={{ padding: "80px 48px 120px" }}>
        <FadeIn><div style={{ ...MONO, color: COLORS.muted, marginBottom: 32 }}>Core services</div></FadeIn>
        {SERVICES.map((s) => (
          <ServiceRow key={s.n} service={s} open={open === s.n} onClick={() => setOpen(open === s.n ? null : s.n)} />
        ))}
        <div style={{ borderTop: `1px solid ${COLORS.line}` }} />
        <AIPhotoshootCallout />
      </section>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Services />);
