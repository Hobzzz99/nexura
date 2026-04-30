/* global React, ReactDOM, Nav, Footer, LineN, FadeIn, COLORS, DISPLAY, BODY, MONO */
const { useState, useEffect } = React;

function Hero() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  const [btn1Hov, setBtn1Hov] = useState(false);
  const [btn2Hov, setBtn2Hov] = useState(false);

  return (
    <section style={{ padding: "52px 48px 64px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: -60, top: 40, width: 520, height: 620, opacity: 0.08, pointerEvents: "none" }}>
        <LineN color={COLORS.primary} stroke={0.9} />
      </div>
      <FadeIn delay={100}>
        <h1 style={{ ...DISPLAY, fontSize: "clamp(80px, 12vw, 200px)", margin: 0, color: COLORS.ink }}>
          A studio for the<br />
          <em style={{ fontStyle: "italic", color: COLORS.secondary }}>considered</em> web.
        </h1>
      </FadeIn>
      <FadeIn delay={220}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 48, marginTop: 40, alignItems: "start" }}>
          <div style={{ ...MONO, color: COLORS.muted, paddingTop: 6 }}> &nbsp;·&nbsp;</div>
          <div>
            <p style={{ ...BODY, fontSize: 20, lineHeight: 1.5, margin: 0, color: COLORS.ink, maxWidth: 680 }}>
              Nexura is a small studio of designers and engineers making websites, web apps, mobile products, and editorial imagery for teams who care how things feel. We favour the long look over the loud pitch — the kind of work that ages well because it was <em style={{ ...DISPLAY, fontSize: 22, color: COLORS.secondary }}>drawn</em>, not generated.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 36 }}>
              <a href="Nexura Contact.html"
                onMouseEnter={() => setBtn1Hov(true)}
                onMouseLeave={() => setBtn1Hov(false)}
                style={{
                  ...MONO, fontWeight: 500, textDecoration: "none",
                  background: btn1Hov ? COLORS.secondary : COLORS.primary,
                  color: COLORS.bg,
                  border: "none", padding: "16px 22px", borderRadius: 999,
                  transform: btn1Hov ? "scale(1.04)" : "scale(1)",
                  transition: "all 0.25s cubic-bezier(0.2,0.8,0.2,1)",
                }}>Begin a conversation →</a>
              <a href="Nexura Services.html"
                onMouseEnter={() => setBtn2Hov(true)}
                onMouseLeave={() => setBtn2Hov(false)}
                style={{
                  ...MONO, color: btn2Hov ? COLORS.primary : COLORS.ink, textDecoration: "none",
                  background: "transparent", border: `1px solid ${btn2Hov ? COLORS.primary : COLORS.ink}`,
                  padding: "16px 22px", borderRadius: 999,
                  transform: btn2Hov ? "scale(1.04)" : "scale(1)",
                  transition: "all 0.25s cubic-bezier(0.2,0.8,0.2,1)",
                }}>See what we make</a>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

// Index teasers to the four subpages
const TEASERS = [
  { n: "1", title: "Services", italic: "four lines of work", body: "Website design, web development, app development, and AI photoshoots — held under one roof.", h: "Nexura Services.html" },
  { n: "2", title: "Studio", italic: "where images are made", body: "A digital studio for editorial imagery — directed, lit, and retouched without leaving the desk.", h: "Nexura Studio.html" },
  { n: "3", title: "Approach", italic: "five movements, in order", body: "How a project moves from a first conversation through a considered, careful launch.", h: "Nexura Approach.html" },
];

function IndexGrid() {
  const [hover, setHover] = useState(null);
  return (
    <section style={{ padding: "120px 48px", borderTop: `1px solid ${COLORS.line}` }}>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 48, alignItems: "baseline", marginBottom: 64 }}>
        <div style={{ ...MONO, color: COLORS.muted }}></div>
        <h2 style={{ ...DISPLAY, fontSize: 80, margin: 0, color: COLORS.ink }}>
          A short <em style={{ fontStyle: "italic", color: COLORS.secondary }}>table of contents.</em>
        </h2>
      </div>
      <div>
        {TEASERS.map((t) => (
          <a
            key={t.n}
            href={t.h}
            onMouseEnter={() => setHover(t.n)}
            onMouseLeave={() => setHover(null)}
            style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 1.5fr 60px",
              gap: 32,
              alignItems: "baseline",
              padding: "40px 0",
              borderTop: `1px solid ${COLORS.line}`,
              textDecoration: "none",
              color: COLORS.ink,
              transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), padding 0.3s",
              transform: hover === t.n ? "translateX(12px)" : "translateX(0)",
              paddingLeft: hover === t.n ? 12 : 0,
            }}
          >
            <div style={{ ...MONO, color: COLORS.muted }}>{t.n}</div>
            <div style={{ ...DISPLAY, fontSize: 72, color: hover === t.n ? COLORS.primary : COLORS.ink, transition: "color 0.3s" }}>
              {t.title} <em style={{ fontStyle: "italic", color: COLORS.secondary, fontSize: 48 }}>{t.italic}</em>
            </div>
            <div style={{ ...BODY, fontSize: 15, lineHeight: 1.55, color: COLORS.muted, paddingTop: 18, maxWidth: 440 }}>
              {t.body}
            </div>
            <div style={{ ...MONO, color: COLORS.ink, textAlign: "right", paddingTop: 18, fontSize: 18 }}>
              {hover === t.n ? "→" : "↘"}
            </div>
          </a>
        ))}
        <div style={{ borderTop: `1px solid ${COLORS.line}` }} />
      </div>
    </section>
  );
}

function Quote() {
  return (
    <section style={{ padding: "140px 48px", borderTop: `1px solid ${COLORS.line}`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: -40, top: 40, width: 420, height: 500, opacity: 0.06 }}>
        <LineN color={COLORS.primary} stroke={0.8} />
      </div>
      <FadeIn>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div style={{ ...MONO, color: COLORS.muted, marginBottom: 32 }}>A studio note — 04.26</div>
          <blockquote style={{ ...DISPLAY, fontSize: "clamp(48px, 6vw, 96px)", margin: 0, color: COLORS.ink, lineHeight: 1.05 }}>
            The <em style={{ fontStyle: "italic", color: COLORS.secondary }}>hand</em> still matters — even, especially, on the web.
          </blockquote>
          <div style={{ ...MONO, color: COLORS.muted, marginTop: 32 }}>— Nexura, principle 01</div>
        </div>
      </FadeIn>
    </section>
  );
}

function App() {
  return (
    <>
      <Nav current="home" />
      <Hero />
      <IndexGrid />
      <Quote />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
