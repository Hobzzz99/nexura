/* global React, ReactDOM, TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakToggle */
const { useState, useEffect, useRef } = React;

// ---------- PALETTES ----------
const PALETTES = {
  midnight: {
    name: "Midnight Violet",
    bg: "#0E0B14",
    surface: "#17121F",
    ink: "#F4EEFF",
    muted: "#8A7FA0",
    line: "#2A2235",
    swatches: [
      { hex: "#0E0B14", name: "Ink Noir",       role: "Background"  },
      { hex: "#1B1428", name: "Vesper",         role: "Surface"     },
      { hex: "#402060", name: "Deep Amethyst",  role: "Primary"     },
      { hex: "#6B3EA0", name: "Regalia",        role: "Secondary"   },
      { hex: "#D9C2FF", name: "Lilac Mist",     role: "Accent"      },
      { hex: "#F4EEFF", name: "Moonlight",      role: "Foreground"  },
    ],
  },
  lavender: {
    name: "Lavender Paper",
    bg: "#F4EEFF",
    surface: "#FFFFFF",
    ink: "#1B1428",
    muted: "#6B5E80",
    line: "#E4D8F5",
    swatches: [
      { hex: "#F4EEFF", name: "Moonlight",      role: "Background"  },
      { hex: "#E4D8F5", name: "Veil",           role: "Surface"     },
      { hex: "#D9C2FF", name: "Lilac Mist",     role: "Accent"      },
      { hex: "#6B3EA0", name: "Regalia",        role: "Secondary"   },
      { hex: "#402060", name: "Deep Amethyst",  role: "Primary"     },
      { hex: "#1B1428", name: "Ink Noir",       role: "Foreground"  },
    ],
  },
  parchment: {
    name: "Atelier",
    bg: "#EEE7DB",
    surface: "#F6F1E7",
    ink: "#1B1428",
    muted: "#6B5E80",
    line: "#D9CFBE",
    swatches: [
      { hex: "#EEE7DB", name: "Parchment",      role: "Background"  },
      { hex: "#D9C2FF", name: "Lilac Mist",     role: "Accent"      },
      { hex: "#6B3EA0", name: "Regalia",        role: "Secondary"   },
      { hex: "#402060", name: "Deep Amethyst",  role: "Primary"     },
      { hex: "#2A1F1A", name: "Espresso",       role: "Neutral"     },
      { hex: "#1B1428", name: "Ink Noir",       role: "Foreground"  },
    ],
  },
};

// ---------- TYPE PAIRINGS ----------
const TYPE_PAIRS = {
  editorial: {
    name: "Editorial",
    display: { family: "'Fraunces', serif", weight: 300, letter: "-0.04em", feature: "'opsz' 144, 'SOFT' 100" },
    body:    { family: "'Instrument Sans', sans-serif", weight: 400, letter: "-0.01em" },
    mono:    { family: "'JetBrains Mono', monospace", weight: 400 },
    descriptor: "Serif display × contemporary sans · a gallery-catalog voice",
  },
  brutalist: {
    name: "Brutalist",
    display: { family: "'Space Grotesk', sans-serif", weight: 700, letter: "-0.05em", feature: "normal" },
    body:    { family: "'Space Grotesk', sans-serif", weight: 400, letter: "-0.01em" },
    mono:    { family: "'JetBrains Mono', monospace", weight: 400 },
    descriptor: "Single family, wide weight range · dense & architectural",
  },
  couture: {
    name: "Couture",
    display: { family: "'Cormorant Garamond', serif", weight: 300, letter: "0em", feature: "normal" },
    body:    { family: "'Manrope', sans-serif", weight: 400, letter: "0em" },
    mono:    { family: "'JetBrains Mono', monospace", weight: 400 },
    descriptor: "Thin high-contrast serif × humanist sans · refined & expensive",
  },
};

// ---------- KEYWORDS ----------
const KEYWORDS = [
  "Hand-drawn", "Considered", "Premium",
  "Editorial", "Artisan-tech", "Quiet luxury",
  "Layered", "Night-sky", "Made-by-people",
];

// ---------- MOCK ASSETS ----------
function StripedTile({ ratio = 1, hue = 280, label, dark = true }) {
  const id = Math.random().toString(36).slice(2, 8);
  const fg = dark ? "rgba(217,194,255,0.22)" : "rgba(27,20,40,0.18)";
  const bg = dark ? "#1B1428" : "#E4D8F5";
  return (
    <div style={{ position: "relative", width: "100%", paddingTop: `${100/ratio}%`, background: bg, overflow: "hidden", borderRadius: 2 }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <pattern id={`s-${id}`} patternUnits="userSpaceOnUse" width="3" height="3" patternTransform="rotate(35)">
            <line x1="0" y1="0" x2="0" y2="3" stroke={fg} strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill={`url(#s-${id})`} />
      </svg>
      {label && (
        <div style={{
          position: "absolute", left: 10, bottom: 8,
          fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
          color: dark ? "#8A7FA0" : "#6B5E80", letterSpacing: "0.08em", textTransform: "uppercase",
        }}>{label}</div>
      )}
    </div>
  );
}

// Logo tile — uses the real logo asset
function LogoTile({ bg = "#0E0B14" }) {
  return (
    <div style={{
      position: "relative", width: "100%", paddingTop: "120%",
      background: bg, borderRadius: 2, overflow: "hidden",
    }}>
      <img src="assets/logo.svg?v=1777066072255" alt="Nexura"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", padding: "12%", filter: "contrast(1.05)" }} />
    </div>
  );
}

// Decorative line-art N inspired by the logo
function LineN({ color = "#D9C2FF", stroke = 1.2 }) {
  return (
    <svg viewBox="0 0 100 120" style={{ width: "100%", height: "100%" }}>
      <path d="M 20 15 L 20 105" stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round" />
      <path d="M 20 18 L 80 102" stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round" />
      <path d="M 80 15 L 80 105" stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round" />
      {/* offset shadow */}
      <path d="M 23 12 L 23 102" stroke={color} strokeWidth={stroke*0.6} fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M 23 15 L 83 99" stroke={color} strokeWidth={stroke*0.6} fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M 83 12 L 83 102" stroke={color} strokeWidth={stroke*0.6} fill="none" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

// Grain / noise overlay
function Grain() {
  return (
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.18, mixBlendMode: "overlay",
      backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
    }} />
  );
}

// ---------- MAIN ----------
function App() {
  const [tweaks, setTweaks] = useTweaks(/*EDITMODE-BEGIN*/{
    "palette": "lavender",
    "typePair": "couture",
    "showGrain": true,
    "accentIntensity": 1
  }/*EDITMODE-END*/);

  const P = PALETTES[tweaks.palette];
  const T = TYPE_PAIRS[tweaks.typePair];
  const isDark = tweaks.palette === "midnight";

  // Push CSS vars to document
  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty("--bg", P.bg);
    r.setProperty("--surface", P.surface);
    r.setProperty("--ink", P.ink);
    r.setProperty("--muted", P.muted);
    r.setProperty("--line", P.line);
    r.setProperty("--primary", "#402060");
    r.setProperty("--secondary", "#6B3EA0");
    r.setProperty("--accent", "#D9C2FF");
    r.setProperty("--display", T.display.family);
    r.setProperty("--body", T.body.family);
    r.setProperty("--mono", T.mono.family);
    document.body.style.background = P.bg;
    document.body.style.color = P.ink;
  }, [P, T]);

  const DisplayStyle = {
    fontFamily: T.display.family,
    fontWeight: T.display.weight,
    letterSpacing: T.display.letter,
    fontFeatureSettings: T.display.feature,
    lineHeight: 0.92,
  };
  const BodyStyle = {
    fontFamily: T.body.family,
    fontWeight: T.body.weight,
    letterSpacing: T.body.letter,
  };
  const MonoStyle = {
    fontFamily: T.mono.family,
    fontWeight: 400,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    fontSize: 10,
  };

  return (
    <div style={{ minHeight: "100vh", background: P.bg, color: P.ink, position: "relative" }}>
      {tweaks.showGrain && <Grain />}

      {/* ---------- MASTHEAD ---------- */}
      <header style={{
        padding: "48px 64px 32px",
        display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "baseline",
        borderBottom: `1px solid ${P.line}`,
      }}>
        <div style={{ ...MonoStyle, color: P.muted }}>
          Vol. 01 · Brand Atlas
        </div>
        <div style={{ ...MonoStyle, color: P.ink, fontWeight: 500, letterSpacing: "0.25em" }}>
          N · E · X · U · R · A
        </div>
        <div style={{ ...MonoStyle, color: P.muted, textAlign: "right" }}>
          MMXXVI / Mood Board №1
        </div>
      </header>

      {/* ---------- HERO ---------- */}
      <section style={{ padding: "80px 64px 64px", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 64, alignItems: "end", borderBottom: `1px solid ${P.line}` }}>
        <div>
          <div style={{ ...MonoStyle, color: P.muted, marginBottom: 24 }}>
            A studio for web, app & design
          </div>
          <h1 style={{ ...DisplayStyle, fontSize: 168, margin: 0 }}>
            Drawn<br />
            by hand,<br />
            <em style={{ fontStyle: "italic", color: "#6B3EA0" }}>built</em> by code.
          </h1>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <p style={{ ...BodyStyle, fontSize: 17, lineHeight: 1.55, margin: 0, color: P.ink, maxWidth: 420 }}>
            Nexura is an identity rooted in the mark — a layered, imperfect <em>N</em> sketched in deep amethyst and lilac. The mood: quietly premium, considered, made-by-people. Not another tech gradient.
          </p>
          <div style={{ display: "flex", gap: 24, marginTop: 16 }}>
            <div>
              <div style={{ ...MonoStyle, color: P.muted }}>Principle</div>
              <div style={{ ...BodyStyle, fontSize: 14, marginTop: 4 }}>Craft over chrome</div>
            </div>
            <div>
              <div style={{ ...MonoStyle, color: P.muted }}>Voice</div>
              <div style={{ ...BodyStyle, fontSize: 14, marginTop: 4 }}>Editorial, unhurried</div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- THE MARK ---------- */}
      <section style={{ padding: "64px", borderBottom: `1px solid ${P.line}` }}>
        <SectionHead number="01" title="The Mark" subtitle="Source of truth" mono={MonoStyle} display={DisplayStyle} muted={P.muted} ink={P.ink} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginTop: 40 }}>
          <div style={{ gridColumn: "span 1" }}>
            <LogoTile bg={isDark ? "#0E0B14" : "#F4EEFF"} />
            <Caption mono={MonoStyle} muted={P.muted}>001 · Primary · On {isDark ? "noir" : "moonlight"}</Caption>
          </div>
          <div>
            <LogoTile bg="#402060" />
            <Caption mono={MonoStyle} muted={P.muted}>002 · On amethyst</Caption>
          </div>
          <div>
            <LogoTile bg="#D9C2FF" />
            <Caption mono={MonoStyle} muted={P.muted}>003 · On lilac mist</Caption>
          </div>
          <div style={{ background: P.surface, display: "flex", alignItems: "center", justifyContent: "center", padding: 32, borderRadius: 2, position: "relative" }}>
            <div style={{ width: "70%" }}>
              <LineN color={P.ink} stroke={1.1} />
            </div>
            <div style={{ position: "absolute", left: 12, bottom: 10, ...MonoStyle, color: P.muted }}>004 · Geometry</div>
          </div>
        </div>
      </section>

      {/* ---------- PALETTE ---------- */}
      <section style={{ padding: "64px", borderBottom: `1px solid ${P.line}` }}>
        <SectionHead number="02" title="Palette" subtitle="Sampled from the mark" mono={MonoStyle} display={DisplayStyle} muted={P.muted} ink={P.ink} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 2, marginTop: 40 }}>
          {P.swatches.map((s) => (
            <Swatch key={s.hex} swatch={s} mono={MonoStyle} body={BodyStyle} P={P} />
          ))}
        </div>
        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32 }}>
          <Ratio bg="#0E0B14" fg="#F4EEFF" label="Noir × Moonlight" ratio="18.9:1" mono={MonoStyle} body={BodyStyle} />
          <Ratio bg="#402060" fg="#D9C2FF" label="Amethyst × Lilac" ratio="5.7:1" mono={MonoStyle} body={BodyStyle} />
          <Ratio bg="#D9C2FF" fg="#1B1428" label="Lilac × Ink"     ratio="11.2:1" mono={MonoStyle} body={BodyStyle} />
        </div>
      </section>

      {/* ---------- TYPOGRAPHY ---------- */}
      <section style={{ padding: "64px", borderBottom: `1px solid ${P.line}` }}>
        <SectionHead number="03" title="Typography" subtitle={T.descriptor} mono={MonoStyle} display={DisplayStyle} muted={P.muted} ink={P.ink} />

        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "auto 1fr", gap: 48, alignItems: "start", paddingBottom: 32, borderBottom: `1px dashed ${P.line}` }}>
          <div style={{ ...MonoStyle, color: P.muted, whiteSpace: "nowrap" }}>Display</div>
          <div>
            <div style={{ ...MonoStyle, color: P.muted, marginBottom: 12 }}>{T.display.family.replace(/'/g, "").split(",")[0]} · {T.display.weight}</div>
            <div style={{ ...DisplayStyle, fontSize: 140, lineHeight: 0.9 }}>
              Aa Bb <em style={{ fontStyle: "italic", color: "#6B3EA0" }}>Nn</em>
            </div>
            <div style={{ ...DisplayStyle, fontSize: 48, lineHeight: 1.05, marginTop: 24, color: P.ink }}>
              We build the quiet corners of the internet.
            </div>
          </div>
        </div>

        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "auto 1fr", gap: 48, alignItems: "start", paddingBottom: 32, borderBottom: `1px dashed ${P.line}` }}>
          <div style={{ ...MonoStyle, color: P.muted, whiteSpace: "nowrap" }}>Body</div>
          <div>
            <div style={{ ...MonoStyle, color: P.muted, marginBottom: 12 }}>{T.body.family.replace(/'/g, "").split(",")[0]} · 400 / 500</div>
            <p style={{ ...BodyStyle, fontSize: 18, lineHeight: 1.55, margin: 0, maxWidth: 640, color: P.ink }}>
              Nexura is a small studio of designers and engineers shipping websites, mobile apps, and bespoke interfaces. We favour the long look over the loud pitch — the kind of work that ages well because it was drawn, not generated.
            </p>
            <div style={{ display: "flex", gap: 40, marginTop: 20, ...BodyStyle, fontSize: 13, color: P.muted }}>
              <span>abcdefghijklmnopqrstuvwxyz</span>
              <span>0 1 2 3 4 5 6 7 8 9</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "auto 1fr", gap: 48, alignItems: "start" }}>
          <div style={{ ...MonoStyle, color: P.muted, whiteSpace: "nowrap" }}>Mono</div>
          <div>
            <div style={{ ...MonoStyle, color: P.muted, marginBottom: 12 }}>JetBrains Mono · 400</div>
            <div style={{ fontFamily: T.mono.family, fontSize: 14, lineHeight: 1.7, color: P.ink }}>
              [ 001 ] &nbsp; Website Design<br />
              [ 002 ] &nbsp; Web Development<br />
              [ 003 ] &nbsp; Mobile App Development<br />
              [ 004 ] &nbsp; Interaction & Motion
            </div>
          </div>
        </div>

        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16 }}>
          {[
            { size: 12, label: "012" },
            { size: 16, label: "016" },
            { size: 24, label: "024" },
            { size: 40, label: "040" },
            { size: 72, label: "072" },
            { size: 120, label: "120" },
          ].map((s) => (
            <div key={s.size} style={{ borderTop: `1px solid ${P.line}`, paddingTop: 12 }}>
              <div style={{ ...MonoStyle, color: P.muted }}>{s.label} / pt</div>
              <div style={{ ...DisplayStyle, fontSize: Math.min(s.size, 52), marginTop: 8 }}>Nn</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- MOOD GRID ---------- */}
      <section style={{ padding: "64px", borderBottom: `1px solid ${P.line}` }}>
        <SectionHead number="04" title="Mood" subtitle="Textures, feelings, reference" mono={MonoStyle} display={DisplayStyle} muted={P.muted} ink={P.ink} />

        <div style={{
          marginTop: 40,
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridAutoRows: "80px",
          gap: 16,
        }}>
          {/* Big quote card */}
          <div style={{ gridColumn: "span 5", gridRow: "span 4", background: P.surface, padding: 32, display: "flex", flexDirection: "column", justifyContent: "space-between", borderRadius: 2, position: "relative", overflow: "hidden" }}>
            <div style={{ ...MonoStyle, color: P.muted }}>Manifesto · fragment</div>
            <div style={{ ...DisplayStyle, fontSize: 40, lineHeight: 1.05, color: P.ink }}>
              “The <em style={{ fontStyle: "italic", color: "#6B3EA0" }}>hand</em> still matters. Even — especially — on the web.”
            </div>
            <div style={{ ...MonoStyle, color: P.muted }}>— Studio note, 04.26</div>
            <div style={{ position: "absolute", right: -40, bottom: -40, width: 220, height: 220, opacity: 0.08 }}>
              <LineN color={P.ink} stroke={2} />
            </div>
          </div>

          {/* Logo feature */}
          <div style={{ gridColumn: "span 3", gridRow: "span 4", background: "#0E0B14", padding: 24, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2, position: "relative" }}>
            <img src="assets/logo.svg?v=1777066072255" alt="Nexura" style={{ width: "70%", filter: "drop-shadow(0 20px 40px rgba(107,62,160,0.4))" }} />
            <div style={{ position: "absolute", left: 14, top: 14, ...MonoStyle, color: "#8A7FA0" }}>Primary mark</div>
          </div>

          {/* Texture 1 */}
          <div style={{ gridColumn: "span 4", gridRow: "span 2" }}>
            <StripedTile ratio={2} label="Texture · 01 Woven" dark={isDark} />
          </div>

          {/* Keyword stack */}
          <div style={{ gridColumn: "span 4", gridRow: "span 2", padding: 20, background: "#402060", color: "#F4EEFF", borderRadius: 2, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ ...MonoStyle, color: "#D9C2FF", marginBottom: 10 }}>Keywords</div>
            <div style={{ ...DisplayStyle, fontSize: 22, lineHeight: 1.15 }}>
              Hand-drawn · Considered · <em style={{ fontStyle: "italic" }}>Quiet luxury</em> · Made-by-people
            </div>
          </div>

          {/* Color chip */}
          <div style={{ gridColumn: "span 2", gridRow: "span 2", background: "#D9C2FF", color: "#1B1428", padding: 16, borderRadius: 2, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ ...MonoStyle }}>#D9C2FF</div>
            <div style={{ ...BodyStyle, fontSize: 13, fontWeight: 500 }}>Lilac<br/>Mist</div>
          </div>

          {/* N repetition */}
          <div style={{ gridColumn: "span 3", gridRow: "span 3", background: P.surface, borderRadius: 2, padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ ...MonoStyle, color: P.muted }}>Rhythm study</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 8, height: "70%" }}>
              {[1, 0.8, 0.6, 0.9, 0.5].map((s, i) => (
                <div key={i} style={{ width: `${18}%`, height: `${s * 100}%`, opacity: 0.3 + i * 0.15 }}>
                  <LineN color="#6B3EA0" stroke={1.4} />
                </div>
              ))}
            </div>
          </div>

          {/* Big image placeholder */}
          <div style={{ gridColumn: "span 5", gridRow: "span 3" }}>
            <StripedTile ratio={2.3} label="Imagery · product shot goes here" dark={isDark} />
          </div>

          {/* Services row */}
          <div style={{ gridColumn: "span 4", gridRow: "span 3", padding: 24, background: "#1B1428", color: "#F4EEFF", borderRadius: 2 }}>
            <div style={{ ...MonoStyle, color: "#8A7FA0", marginBottom: 18 }}>What we make</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { n: "01", label: "Websites",        note: "Marketing, editorial, identity" },
                { n: "02", label: "Web apps",        note: "Tools, dashboards, platforms" },
                { n: "03", label: "Mobile",          note: "iOS & Android, native-feeling" },
                { n: "04", label: "Design systems",  note: "From mark to shipped component" },
              ].map((row) => (
                <li key={row.n} style={{
                  display: "grid", gridTemplateColumns: "36px 1fr auto", alignItems: "baseline",
                  padding: "12px 0", borderTop: "1px solid #2A2235", gap: 12,
                }}>
                  <span style={{ ...MonoStyle, color: "#8A7FA0" }}>{row.n}</span>
                  <span style={{ ...DisplayStyle, fontSize: 22 }}>{row.label}</span>
                  <span style={{ ...BodyStyle, fontSize: 11, color: "#8A7FA0" }}>{row.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- UI SAMPLE ---------- */}
      <section style={{ padding: "64px", borderBottom: `1px solid ${P.line}` }}>
        <SectionHead number="05" title="In situ" subtitle="A glimpse of the site voice" mono={MonoStyle} display={DisplayStyle} muted={P.muted} ink={P.ink} />
        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Mini site preview */}
          <div style={{ background: "#0E0B14", color: "#F4EEFF", borderRadius: 2, padding: 32, minHeight: 380, position: "relative", overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <img src="assets/logo.svg?v=1777066072255" alt="" style={{ height: 28 }} />
                <span style={{ ...BodyStyle, fontWeight: 500, letterSpacing: "-0.01em", fontSize: 16 }}>Nexura</span>
              </div>
              <nav style={{ display: "flex", gap: 24, ...MonoStyle, color: "#8A7FA0" }}>
                <span>Work</span><span>Studio</span><span>Journal</span><span style={{ color: "#D9C2FF" }}>Contact</span>
              </nav>
            </div>
            <div style={{ marginTop: 60 }}>
              <div style={{ ...MonoStyle, color: "#8A7FA0" }}>Est. 2026 · Anywhere</div>
              <h2 style={{ ...DisplayStyle, fontSize: 76, margin: "16px 0 0", lineHeight: 0.95 }}>
                A studio<br />for the <em style={{ fontStyle: "italic", color: "#D9C2FF" }}>considered</em> web.
              </h2>
              <p style={{ ...BodyStyle, fontSize: 15, lineHeight: 1.55, marginTop: 20, maxWidth: 440, color: "#C8BED6" }}>
                Websites, apps, and design work for teams who care how things feel.
              </p>
              <button style={{
                marginTop: 28, padding: "14px 22px", border: "1px solid #6B3EA0",
                background: "transparent", color: "#F4EEFF", ...MonoStyle, fontSize: 11,
                cursor: "pointer", borderRadius: 999,
              }}>Start a project →</button>
            </div>
          </div>

          {/* App card */}
          <div style={{ background: P.surface, borderRadius: 2, padding: 32, minHeight: 380, border: `1px solid ${P.line}` }}>
            <div style={{ ...MonoStyle, color: P.muted }}>Case · 001</div>
            <h3 style={{ ...DisplayStyle, fontSize: 48, margin: "12px 0 24px", color: P.ink }}>
              Clarte<br/>
              <em style={{ fontStyle: "italic", color: "#6B3EA0", fontSize: 36 }}>a journalling app</em>
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <Metric label="Launch" value="Q3 '25" mono={MonoStyle} display={DisplayStyle} muted={P.muted} ink={P.ink} />
              <Metric label="Platforms" value="iOS · Web" mono={MonoStyle} display={DisplayStyle} muted={P.muted} ink={P.ink} />
              <Metric label="Scope" value="Brand → ship" mono={MonoStyle} display={DisplayStyle} muted={P.muted} ink={P.ink} />
              <Metric label="Rating" value="4.8 ★" mono={MonoStyle} display={DisplayStyle} muted={P.muted} ink={P.ink} />
            </div>
            <StripedTile ratio={3} label="Screenshot placeholder" dark={isDark} />
          </div>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer style={{ padding: "48px 64px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32 }}>
        <div>
          <img src="assets/logo.svg?v=1777066072255" alt="Nexura" style={{ height: 40, opacity: 0.8 }} />
        </div>
        <div style={{ ...BodyStyle, fontSize: 13, color: P.muted, lineHeight: 1.6 }}>
          Nexura — mood board №1.<br />
          Drawn in deep amethyst, set in {T.display.family.replace(/'/g, "").split(",")[0]}.
        </div>
        <div style={{ ...MonoStyle, color: P.muted, textAlign: "right", alignSelf: "end" }}>
          END · 05 / 05
        </div>
      </footer>

      {/* ---------- TWEAKS PANEL ---------- */}
      <TweaksPanel title="Tweaks">
        <TweakSection title="Palette">
          <TweakRadio
            value={tweaks.palette}
            onChange={(v) => setTweaks({ palette: v })}
            options={[
              { value: "midnight",   label: "Midnight Violet" },
              { value: "lavender",   label: "Lavender Paper" },
              { value: "parchment",  label: "Atelier" },
            ]}
          />
        </TweakSection>
        <TweakSection title="Type pairing">
          <TweakRadio
            value={tweaks.typePair}
            onChange={(v) => setTweaks({ typePair: v })}
            options={[
              { value: "editorial", label: "Editorial · Fraunces × Instrument Sans" },
              { value: "brutalist", label: "Brutalist · Space Grotesk" },
              { value: "couture",   label: "Couture · Cormorant × Manrope" },
            ]}
          />
        </TweakSection>
        <TweakSection title="Texture">
          <TweakToggle
            label="Film grain"
            value={tweaks.showGrain}
            onChange={(v) => setTweaks({ showGrain: v })}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

// ---------- HELPER COMPONENTS ----------
function SectionHead({ number, title, subtitle, mono, display, muted, ink }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 32, alignItems: "baseline" }}>
      <div style={{ ...mono, color: muted }}>§ {number}</div>
      <div style={{ ...display, fontSize: 56, color: ink }}>{title}</div>
      <div style={{ ...mono, color: muted, textAlign: "right" }}>{subtitle}</div>
    </div>
  );
}

function Swatch({ swatch, mono, body, P }) {
  const textColor = isLight(swatch.hex) ? "#1B1428" : "#F4EEFF";
  return (
    <div style={{ background: swatch.hex, color: textColor, padding: 18, height: 200, display: "flex", flexDirection: "column", justifyContent: "space-between", borderRadius: 2 }}>
      <div style={{ ...mono, opacity: 0.8 }}>{swatch.role}</div>
      <div>
        <div style={{ ...body, fontSize: 16, fontWeight: 500, letterSpacing: "-0.01em" }}>{swatch.name}</div>
        <div style={{ ...mono, opacity: 0.7, marginTop: 4 }}>{swatch.hex}</div>
      </div>
    </div>
  );
}

function Ratio({ bg, fg, label, ratio, mono, body }) {
  return (
    <div style={{ background: bg, color: fg, padding: 20, borderRadius: 2 }}>
      <div style={{ ...mono, opacity: 0.7 }}>Contrast</div>
      <div style={{ ...body, fontSize: 28, fontWeight: 400, marginTop: 10, letterSpacing: "-0.02em" }}>{ratio}</div>
      <div style={{ ...mono, opacity: 0.7, marginTop: 8 }}>{label}</div>
    </div>
  );
}

function Caption({ children, mono, muted }) {
  return <div style={{ ...mono, color: muted, marginTop: 10 }}>{children}</div>;
}

function Metric({ label, value, mono, display, muted, ink }) {
  return (
    <div>
      <div style={{ ...mono, color: muted }}>{label}</div>
      <div style={{ ...display, fontSize: 24, color: ink, marginTop: 4 }}>{value}</div>
    </div>
  );
}

function isLight(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const L = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return L > 0.6;
}

mountApp(<App />);
