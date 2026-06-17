/* global React */
// Nexura shared design system — Lavender Paper × Couture

// Page-load CSS + global micro-interactions + mobile-first overrides
; (() => {
  const s = document.createElement("style");
  s.textContent = `
    #root { animation: nx-load 0.6s cubic-bezier(0.2,0.8,0.2,1) both; }
    @keyframes nx-load { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
    @keyframes nx-pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }

    /* Responsive Grid and Typography Overrides */
    @media (max-width: 768px) {
      .nx-mobile-stack {
        display: flex !important;
        flex-direction: column !important;
        grid-template-columns: 1fr !important;
        gap: 24px !important;
      }
      .nx-mobile-grid-1col {
        grid-template-columns: 1fr !important;
        gap: 24px !important;
      }
      .nx-mobile-padding {
        padding: 36px 20px 48px !important;
      }
      .nx-mobile-padding-x {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
      .nx-mobile-padding-y {
        padding-top: 36px !important;
        padding-bottom: 36px !important;
      }
      .nx-mobile-h1 {
        font-size: clamp(38px, 9vw, 56px) !important;
        line-height: 1.05 !important;
      }
      .nx-mobile-h2 {
        font-size: clamp(32px, 8vw, 44px) !important;
        line-height: 1.1 !important;
      }
      .nx-mobile-h3 {
        font-size: 24px !important;
      }
      .nx-mobile-body {
        font-size: 16px !important;
        line-height: 1.45 !important;
        margin-top: 24px !important;
      }
      .nx-mobile-hide {
        display: none !important;
      }
      
      /* Nav layout mobile overrides */
      .nx-nav {
        grid-template-columns: 1fr auto !important;
        padding: 16px 20px !important;
        gap: 16px !important;
      }
      .nx-nav-logo {
        justify-self: start !important;
      }
      .nx-nav-logo img {
        margin-left: 0 !important;
        height: 28px !important;
      }
      .nx-nav-links {
        grid-column: 1 / span 2;
        justify-content: center;
        gap: 18px !important;
        width: 100%;
      }
      .nx-nav-cta {
        display: none !important;
      }

      /* Footer layout mobile overrides */
      .nx-footer-grid {
        grid-template-columns: 1fr !important;
        gap: 32px !important;
        padding: 48px 24px !important;
      }
      .nx-footer-bar {
        grid-template-columns: 1fr !important;
        text-align: center;
        gap: 16px !important;
      }
      .nx-footer-bar > div {
        text-align: center !important;
      }
      .nx-service-row {
        grid-template-columns: 1fr auto !important;
        gap: 16px !important;
      }
      .nx-projects-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    @media (max-width: 992px) {
      .nx-projects-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 48px 32px !important;
      }
    }
    @media (max-width: 600px) {
      .nx-projects-grid {
        grid-template-columns: 1fr !important;
        gap: 48px !important;
      }
    }
    .nx-movements-grid {
      grid-template-columns: repeat(5, 1fr);
    }
    @media (max-width: 1024px) {
      .nx-movements-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }
    @media (max-width: 600px) {
      .nx-movements-grid {
        grid-template-columns: 1fr !important;
      }
    }
    .nx-grid-4col {
      grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 992px) {
      .nx-grid-4col {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }
    @media (max-width: 480px) {
      .nx-grid-4col {
        grid-template-columns: 1fr !important;
      }
    }
    .nx-before-after-container {
      height: 480px;
    }
    @media (max-width: 600px) {
      .nx-before-after-container {
        height: 280px !important;
      }
    }

    /* Mood Board Page Mobile Overrides */
    @media (max-width: 768px) {
      #root > div > section {
        padding: 36px 20px !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 32px !important;
      }
      #root > div > section > div {
        grid-template-columns: 1fr !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 24px !important;
        margin-top: 24px !important;
      }
      #root > div > section h1 {
        font-size: clamp(48px, 12vw, 80px) !important;
      }
      #root > div > footer {
        padding: 36px 20px !important;
        grid-template-columns: 1fr !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 24px !important;
      }
      #root > div > header {
        padding: 20px !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 12px !important;
        text-align: center !important;
      }
      #root > div > header > div {
        text-align: center !important;
      }
    }
  `;
  document.head.appendChild(s);
})();

function useFadeIn(threshold) {
  threshold = threshold || 0.12;
  const ref = React.useRef(null);
  const [vis, setVis] = React.useState(false);
  React.useEffect(function () {
    var el = ref.current;
    if (!el) return;
    var obs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: threshold });
    obs.observe(el);
    return function () { obs.disconnect(); };
  }, []);
  return [ref, vis];
}

function FadeIn({ children, delay, style: extra }) {
  delay = delay || 0;
  var res = useFadeIn();
  var ref = res[0]; var vis = res[1];
  return (
    <div ref={ref} style={Object.assign({
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(22px)",
      transition: "opacity 0.75s cubic-bezier(0.2,0.8,0.2,1) " + delay + "ms, transform 0.75s cubic-bezier(0.2,0.8,0.2,1) " + delay + "ms"
    }, extra || {})}>{children}</div>
  );
}

window.COLORS = {
  bg: "#F4EEFF",
  surface: "#FFFFFF",
  veil: "#E4D8F5",
  accent: "#D9C2FF",
  secondary: "#6B3EA0",
  primary: "#402060",
  ink: "#1B1428",
  muted: "#6B5E80",
  line: "#E4D8F5"
};

window.DISPLAY = { fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, letterSpacing: "-0.01em", lineHeight: 0.98 };
window.BODY = { fontFamily: "'Manrope', sans-serif", fontWeight: 400, letterSpacing: "-0.005em" };
window.MONO = { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 400 };

function LineN({ color = COLORS.primary, stroke = 1.2, opacity = 1 }) {
  return (
    <svg viewBox="0 0 100 120" style={{ width: "100%", height: "100%", opacity }}>
      <path d="M 20 15 L 20 105" stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round" />
      <path d="M 20 18 L 80 102" stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round" />
      <path d="M 80 15 L 80 105" stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round" />
      <path d="M 24 12 L 24 102" stroke={color} strokeWidth={stroke * 0.6} fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M 24 15 L 84 99" stroke={color} strokeWidth={stroke * 0.6} fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M 84 12 L 84 102" stroke={color} strokeWidth={stroke * 0.6} fill="none" strokeLinecap="round" opacity="0.5" />
    </svg>);

}

function StripedTile({ ratio = 1, label, tone = "veil" }) {
  const id = Math.random().toString(36).slice(2, 8);
  const bg = tone === "ink" ? "#1B1428" : tone === "primary" ? "#402060" : tone === "accent" ? COLORS.accent : COLORS.veil;
  const fg = tone === "veil" || tone === "accent" ? "rgba(27,20,40,0.18)" : "rgba(217,194,255,0.22)";
  const labelColor = tone === "veil" || tone === "accent" ? COLORS.muted : "#8A7FA0";
  return (
    <div style={{ position: "relative", width: "100%", paddingTop: `${100 / ratio}%`, background: bg, overflow: "hidden" }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <pattern id={`h-${id}`} patternUnits="userSpaceOnUse" width="3" height="3" patternTransform="rotate(35)">
            <line x1="0" y1="0" x2="0" y2="3" stroke={fg} strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill={`url(#h-${id})`} />
      </svg>
      {label &&
        <div style={{ position: "absolute", left: 14, bottom: 12, ...MONO, color: labelColor }}>{label}</div>
      }
    </div>);

}

function Nav({ current }) {
  current = current || "home";
  const [hl, setHl] = React.useState(null);
  const [btnHov, setBtnHov] = React.useState(false);
  const [logoHov, setLogoHov] = React.useState(false);
  const items = [
    { l: "Home", h: "index.html", k: "home" },
    { l: "Services", h: "Nexura Services.html", k: "services" },
    { l: "Projects", h: "Nexura Projects.html", k: "projects" },
    { l: "Approach", h: "Nexura Approach.html", k: "approach" }];

  return (
    <nav className="nx-nav" style={{
      position: "sticky", top: 0, zIndex: 50,
      padding: "20px 24px", display: "grid",
      gridTemplateColumns: "1fr auto 1fr", alignItems: "center",
      background: "rgba(244, 238, 255, 0.85)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      borderBottom: `1px solid ${COLORS.line}`
    }}>
      <a className="nx-nav-logo" href="index.html"
        onMouseEnter={() => setLogoHov(true)}
        onMouseLeave={() => setLogoHov(false)}
        style={{
          display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: COLORS.ink, justifySelf: "start",
          transform: logoHov ? "scale(1.04)" : "scale(1)", transition: "transform 0.3s cubic-bezier(0.2,0.8,0.2,1)"
        }}>
        <img src="assets/logo.svg?v=1777066072255" alt="Nexura" style={{ height: "36px", marginLeft: "35px", opacity: "1", padding: "0px", objectFit: "contain" }} />
      </a>
      <div className="nx-nav-links" style={{ display: "flex", gap: 32 }}>
        {items.map((i) =>
          <a key={i.k} href={i.h}
            onMouseEnter={() => setHl(i.k)}
            onMouseLeave={() => setHl(null)}
            style={{
              ...MONO,
              color: current === i.k ? COLORS.primary : hl === i.k ? COLORS.secondary : COLORS.ink,
              textDecoration: "none",
              borderBottom: current === i.k ? `1px solid ${COLORS.primary}` : hl === i.k ? `1px solid ${COLORS.secondary}` : "1px solid transparent",
              paddingBottom: 3,
              transition: "color 0.22s, border-color 0.22s",
            }}>{i.l}</a>
        )}
      </div>
      <div className="nx-nav-cta" style={{ justifySelf: "end" }}>
        <a href="Nexura Contact.html"
          onMouseEnter={() => setBtnHov(true)}
          onMouseLeave={() => setBtnHov(false)}
          style={{
            ...MONO, fontWeight: 500, textDecoration: "none",
            background: btnHov ? COLORS.primary : "transparent",
            color: btnHov ? COLORS.bg : COLORS.ink,
            border: `1px solid ${COLORS.primary}`,
            padding: "10px 18px", borderRadius: 999,
            transform: btnHov ? "scale(1.04)" : "scale(1)",
            transition: "all 0.25s cubic-bezier(0.2,0.8,0.2,1)",
          }}>Start a project →</a>
      </div>
    </nav>);

}

function Footer() {
  return (
    <footer className="nx-mobile-padding-y" style={{ padding: "64px 48px 40px", background: COLORS.ink, color: COLORS.bg }}>
      <div className="nx-footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, paddingBottom: 64, borderBottom: "1px solid #2A2235" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <img src="assets/logo-footer.svg" alt="Nexura" style={{ height: 44 }} />
          </div>
          <p style={{ ...BODY, fontSize: 14, color: "#8A7FA0", lineHeight: 1.6, maxWidth: 360, margin: 0 }}>
            A small studio making websites, apps, and design work for teams who care how things feel.
          </p>
        </div>
        <FooterCol title="Pages" items={[
          { l: "Home", h: "index.html" },
          { l: "Services", h: "Nexura Services.html" },
          { l: "Studio", h: "Nexura Studio.html" },
          { l: "Approach", h: "Nexura Approach.html" },
          { l: "Contact", h: "Nexura Contact.html" }]
        } />
        <FooterCol title="Services" items={[
          { l: "Website Design", h: "Nexura Services.html" },
          { l: "Web Development", h: "Nexura Services.html" },
          { l: "App Development", h: "Nexura Services.html" },
          { l: "AI Photoshoots", h: "Nexura Studio.html" }]
        } />
        <FooterCol title="Elsewhere" items={[
          { l: "Instagram", h: "#" },
          { l: "Are.na", h: "#" },
          { l: "LinkedIn", h: "#" },
          { l: "Read.cv", h: "#" }]
        } />
      </div>
      <div className="nx-footer-bar" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 32, paddingTop: 28, alignItems: "center" }}>
        <div style={{ ...MONO, color: "#8A7FA0" }}>© 2026 Nexura Studio</div>
        <div style={{ ...MONO, color: "#8A7FA0", letterSpacing: "0.25em" }}>N · E · X · U · R · A</div>
        <div style={{ ...MONO, color: "#8A7FA0", textAlign: "right" }}>Drawn by hand · Built by code</div>
      </div>
    </footer>);

}

function FooterCol({ title, items }) {
  return (
    <div>
      <div style={{ ...MONO, color: "#8A7FA0", marginBottom: 18 }}>{title}</div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
        {items.map((i) =>
          <li key={i.l}><a href={i.h} style={{ ...BODY, fontSize: 14, color: COLORS.bg, textDecoration: "none" }}>{i.l}</a></li>
        )}
      </ul>
    </div>);

}

function PageHeader({ section, eyebrow, title, italic, description }) {
  return (
    <section className="nx-mobile-padding" style={{ padding: "88px 48px 80px", position: "relative", overflow: "hidden", borderBottom: `1px solid ${COLORS.line}` }}>
      <div style={{ position: "absolute", right: -60, top: 20, width: 440, height: 520, opacity: 0.06, pointerEvents: "none" }}>
        <LineN color={COLORS.primary} stroke={0.9} />
      </div>
      <FadeIn delay={0}>

      </FadeIn>
      <FadeIn delay={80}>
        <h1 className="nx-mobile-h1" style={{ ...DISPLAY, fontSize: "clamp(72px, 10vw, 160px)", margin: 0, color: COLORS.ink, position: "relative" }}>
          {title} <em style={{ fontStyle: "italic", color: COLORS.secondary }}>{italic}</em>
        </h1>
      </FadeIn>
      {description &&
        <FadeIn delay={180}>
          <p className="nx-mobile-body" style={{ ...BODY, fontSize: 19, lineHeight: 1.55, margin: "40px 0 0", color: COLORS.ink, maxWidth: 680 }}>
            {description}
          </p>
        </FadeIn>
      }
    </section>);

}

function mountApp(App, delay) {
  delay = delay === undefined ? 1200 : delay; // 1.2 seconds delay
  setTimeout(() => {
    ReactDOM.createRoot(document.getElementById("root")).render(App);
  }, delay);
}

// expose
Object.assign(window, { LineN, StripedTile, Nav, Footer, FooterCol, PageHeader, FadeIn, useFadeIn, mountApp });