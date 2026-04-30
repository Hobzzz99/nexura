/* global React, ReactDOM, Nav, Footer, PageHeader, StripedTile, FadeIn, LineN, COLORS, DISPLAY, BODY, MONO */
const { useState } = React;

const PROJECTS = [
  {
    n: "1",
    title: "Alva Journal",
    category: "Web Design",
    type: "web",
    tags: ["Editorial", "Next.js", "CMS"],
    tone: "primary",
    body: "A quarterly arts publication redesigned from the editorial layer up — new type system, new grid, same devotion to the long read.",
    year: "2025",
  },
  {
    n: "2",
    title: "Forme Studio",
    category: "Web Design · Dev",
    type: "web",
    tags: ["Brand site", "Motion", "React"],
    tone: "accent",
    body: "A fashion studio's digital home. Bold typography, considered transitions, and a lookbook that loads like a magazine.",
    year: "2025",
  },
  {
    n: "3",
    title: "Kova Health",
    category: "App Development",
    type: "app",
    tags: ["iOS", "React Native", "Design system"],
    tone: "veil",
    body: "A patient-facing health companion. Minimal UI, gentle motion, and data-dense screens that never feel clinical.",
    year: "2026",
  },
  {
    n: "4",
    title: "Ordinals Market",
    category: "Web Development",
    type: "web",
    tags: ["Next.js", "TypeScript", "API"],
    tone: "ink",
    body: "A collector's marketplace built for speed and trust — real-time listings, provenance trails, and a dark canvas that makes the work the hero.",
    year: "2026",
  },
  {
    n: "5",
    title: "Carta Blanche",
    category: "Brand · Web Design",
    type: "brand",
    tags: ["Identity", "Brand site", "Copy"],
    tone: "accent",
    body: "Brand identity and site for a boutique creative agency — a system built to flex without losing its voice.",
    year: "2026",
  },
  {
    n: "6",
    title: "Rove App",
    category: "App Development",
    type: "app",
    tags: ["iOS · Android", "React Native", "Maps"],
    tone: "primary",
    body: "A travel companion for the unplanned — intelligent suggestions, offline maps, and a UI that disappears in the field.",
    year: "2026",
  },
];

const FILTERS = [
  { k: "all", l: "All work" },
  { k: "web", l: "Web" },
  { k: "app", l: "App" },
  { k: "brand", l: "Brand" },
];

function ProjectCard({ project, index }) {
  const [hov, setHov] = useState(false);
  return (
    <FadeIn delay={index * 80}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          transform: hov ? "translateY(-6px)" : "translateY(0)",
          transition: "transform 0.35s cubic-bezier(0.2,0.8,0.2,1)",
        }}>
        <StripedTile ratio={1.5} label={project.category} tone={project.tone} />
        <div style={{ paddingTop: 20, borderTop: `2px solid ${hov ? COLORS.primary : COLORS.line}`, transition: "border-color 0.25s" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
            <div style={{ ...MONO, color: COLORS.muted }}>{project.n} &nbsp;·&nbsp; {project.year}</div>
            <div style={{ ...MONO, color: hov ? COLORS.primary : COLORS.muted, transition: "color 0.25s" }}>↗</div>
          </div>
          <div style={{ ...DISPLAY, fontSize: 44, color: hov ? COLORS.primary : COLORS.ink, lineHeight: 1.02, marginBottom: 14, transition: "color 0.25s" }}>
            {project.title}
          </div>
          <p style={{ ...BODY, fontSize: 14, lineHeight: 1.6, color: COLORS.muted, margin: "0 0 18px" }}>
            {project.body}
          </p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {project.tags.map((t) => (
              <span key={t} style={{
                ...MONO, fontSize: 9,
                color: COLORS.muted,
                border: `1px solid ${COLORS.line}`,
                padding: "4px 10px", borderRadius: 999,
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function Projects() {
  const [filter, setFilter] = useState("all");
  const [filterHov, setFilterHov] = useState(null);
  const filtered = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.type === filter);

  return (
    <>
      <Nav current="projects" />
      <PageHeader
        section="02"
        eyebrow="Selected work, 2025 – 2026"
        title="Work we're"
        italic="proud of."
        description="A selection of websites, apps, and brand identities made with care. Each one started with a conversation — most of them led somewhere unexpected."
      />

      <section style={{ padding: "48px 48px 0", borderBottom: `1px solid ${COLORS.line}` }}>
        <FadeIn>
          <div style={{ display: "flex", gap: 6 }}>
            {FILTERS.map((f) => (
              <button
                key={f.k}
                onClick={() => setFilter(f.k)}
                onMouseEnter={() => setFilterHov(f.k)}
                onMouseLeave={() => setFilterHov(null)}
                style={{
                  ...MONO,
                  background: filter === f.k ? COLORS.primary : filterHov === f.k ? COLORS.veil : "transparent",
                  color: filter === f.k ? COLORS.bg : filterHov === f.k ? COLORS.primary : COLORS.muted,
                  border: `1px solid ${filter === f.k ? COLORS.primary : COLORS.line}`,
                  padding: "8px 18px", borderRadius: 999,
                  cursor: "pointer", marginBottom: 20,
                  transition: "all 0.22s cubic-bezier(0.2,0.8,0.2,1)",
                }}>{f.l}</button>
            ))}
          </div>
        </FadeIn>
      </section>

      <section style={{ padding: "80px 48px 120px" }}>
        <FadeIn>
          <div style={{ ...MONO, color: COLORS.muted, marginBottom: 56 }}>
            § 02 &nbsp;·&nbsp; {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "72px 40px" }}>
          {filtered.map((p, i) => (
            <ProjectCard key={p.n} project={p} index={i} />
          ))}
        </div>
      </section>

      <section style={{ padding: "0 48px 120px" }}>
        <FadeIn>
          <div style={{
            padding: 56, background: COLORS.ink, color: COLORS.bg, borderRadius: 2,
            display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 64, alignItems: "center",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", right: -40, top: 20, width: 360, height: 420, opacity: 0.06, pointerEvents: "none" }}>
              <LineN color={COLORS.accent} stroke={0.8} />
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ ...MONO, color: COLORS.accent }}>§ 03 · On process</div>
              <h3 style={{ ...DISPLAY, fontSize: 60, margin: "16px 0 24px", color: COLORS.bg, lineHeight: 1 }}>
                Every project starts with a <em style={{ fontStyle: "italic", color: COLORS.accent }}>conversation.</em>
              </h3>
              <p style={{ ...BODY, fontSize: 16, lineHeight: 1.6, color: "#C8BED6", maxWidth: 500, margin: "0 0 32px" }}>
                We don't take briefs. We take calls. Before a single frame is sketched, we spend an hour understanding what the work is really for — and who it's really for.
              </p>
              <a href="Nexura Approach.html" style={{
                ...MONO, fontWeight: 500, textDecoration: "none",
                background: "transparent", color: COLORS.bg,
                border: "1px solid #4A3A60",
                padding: "14px 20px", borderRadius: 999,
                display: "inline-block",
              }}>See how we work →</a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                { label: "01 · Listen", tone: "primary" },
                { label: "02 · Sketch", tone: "accent" },
                { label: "03 · Draw", tone: "accent" },
                { label: "04 · Build", tone: "primary" },
              ].map((s) => (
                <StripedTile key={s.label} ratio={1} label={s.label} tone={s.tone} />
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      <section style={{ padding: "120px 48px", textAlign: "center", borderTop: `1px solid ${COLORS.line}`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -40, top: 20, width: 360, height: 420, opacity: 0.06, pointerEvents: "none" }}>
          <LineN color={COLORS.primary} stroke={0.8} />
        </div>
        <FadeIn>
          <div style={{ ...MONO, color: COLORS.muted, marginBottom: 24 }}>§ 04 · Next project</div>
          <h2 style={{ ...DISPLAY, fontSize: "clamp(56px, 8vw, 112px)", margin: 0, color: COLORS.ink, position: "relative" }}>
            Yours could be<br /><em style={{ fontStyle: "italic", color: COLORS.secondary }}>among them.</em>
          </h2>
          <a href="Nexura Contact.html" style={{
            display: "inline-block", marginTop: 48,
            ...MONO, fontWeight: 500, textDecoration: "none",
            background: COLORS.primary, color: COLORS.bg,
            padding: "18px 26px", borderRadius: 999,
          }}>Start a conversation →</a>
        </FadeIn>
      </section>

      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Projects />);
