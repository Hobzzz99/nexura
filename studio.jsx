/* global React, ReactDOM, Nav, Footer, PageHeader, StripedTile, LineN, FadeIn, COLORS, DISPLAY, BODY, MONO */
const { useState } = React;

// Studio page — AI Photoshoots

const SHOOT_TYPES = [
{ n: "01", title: "Portrait", note: "Founder, team, editorial — at desk or on set." },
{ n: "02", title: "Product", note: "E-commerce grids, hero shots, lifestyle." },
{ n: "03", title: "Campaign", note: "Seasonal, art-directed, launch-ready." },
{ n: "04", title: "Lookbook", note: "Apparel, interiors, multi-frame stories." }];


const PROCESS = [
{ n: "i", label: "Brief", body: "Reference board, moodboard, shot list. We agree the aesthetic before any frame is rendered." },
{ n: "ii", label: "Set", body: "We build the set in a digital studio — light, surface, wardrobe, props. All directed." },
{ n: "iii", label: "Shoot", body: "Generation runs, culled to the best 20 frames. You approve before retouch." },
{ n: "iv", label: "Retouch", body: "Hand retouching for skin, edges, light. Delivered at print-ready resolution." },
{ n: "v", label: "License", body: "Brand-safe usage, indemnified, with clear provenance notes for your records." }];


function Grid4() {
  const [tileHov, setTileHov] = useState(null);
  return (
    <section className="nx-mobile-padding" style={{ padding: "80px 48px", borderTop: `1px solid ${COLORS.line}` }}>
      <FadeIn>
        <div className="nx-mobile-stack" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 48, alignItems: "baseline", marginBottom: 48 }}>
          <div className="nx-mobile-hide" style={{ ...MONO, color: COLORS.muted }}>§ 02 · Frame types</div>
          <h2 className="nx-mobile-h2" style={{ ...DISPLAY, fontSize: 64, margin: 0, color: COLORS.ink }}>
            Four <em style={{ fontStyle: "italic", color: COLORS.secondary }}>rooms</em> in one studio.
          </h2>
        </div>
      </FadeIn>
      <div className="nx-grid-4col" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {SHOOT_TYPES.map((t, i) =>
        <FadeIn key={t.n} delay={i * 80}>
          <div
            onMouseEnter={() => setTileHov(t.n)}
            onMouseLeave={() => setTileHov(null)}
            style={{
              transform: tileHov === t.n ? "translateY(-6px)" : "translateY(0)",
              transition: "transform 0.35s cubic-bezier(0.2,0.8,0.2,1)",
            }}>
            <StripedTile ratio={0.75} label={`${t.n} · ${t.title}`} tone={i % 2 === 0 ? "primary" : "accent"} />
            <div style={{ paddingTop: 18 }}>
              <div style={{ ...DISPLAY, fontSize: 32, color: tileHov === t.n ? COLORS.primary : COLORS.ink, transition: "color 0.3s" }}>{t.title}</div>
              <div style={{ ...BODY, fontSize: 13, lineHeight: 1.55, color: COLORS.muted, marginTop: 6 }}>{t.note}</div>
            </div>
          </div>
        </FadeIn>
        )}
      </div>
    </section>);

}

function Process() {
  const [stepHov, setStepHov] = useState(null);
  return (
    <section className="nx-mobile-padding" style={{ padding: "120px 48px", borderTop: `1px solid ${COLORS.line}`, background: COLORS.veil }}>
      <FadeIn>
        <div className="nx-mobile-stack" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 48, alignItems: "baseline", marginBottom: 64 }}>
          <div style={{ ...MONO, color: COLORS.muted }}>§ 03 · The shoot</div>
          <h2 className="nx-mobile-h2" style={{ ...DISPLAY, fontSize: 64, margin: 0, color: COLORS.ink }}>
            Directed like a <em style={{ fontStyle: "italic", color: COLORS.secondary }}>shoot</em>
          </h2>
        </div>
      </FadeIn>
      <div className="nx-movements-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
        {PROCESS.map((p, i) =>
        <FadeIn key={p.n} delay={i * 80}>
          <div
            onMouseEnter={() => setStepHov(p.n)}
            onMouseLeave={() => setStepHov(null)}
            style={{
              padding: "28px 20px 32px",
              borderTop: `2px solid ${stepHov === p.n ? COLORS.primary : COLORS.ink}`,
              background: stepHov === p.n ? COLORS.surface : COLORS.bg,
              minHeight: 240,
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              transform: stepHov === p.n ? "translateY(-4px)" : "translateY(0)",
              transition: "background 0.3s, border-color 0.3s, transform 0.3s cubic-bezier(0.2,0.8,0.2,1)",
            }}>
            <div>
              <div style={{ ...MONO, color: COLORS.muted }}>Step {p.n}</div>
              <div style={{ ...DISPLAY, fontSize: 40, marginTop: 10, color: stepHov === p.n ? COLORS.primary : COLORS.ink, transition: "color 0.3s" }}>{p.label}</div>
            </div>
            <p style={{ ...BODY, fontSize: 13, lineHeight: 1.55, color: COLORS.muted, margin: 0 }}>{p.body}</p>
          </div>
        </FadeIn>
        )}
      </div>
    </section>);

}

function BeforeAfter() {
  const [pos, setPos] = useState(50);
  return (
    <section className="nx-mobile-padding" style={{ padding: "120px 48px", borderTop: `1px solid ${COLORS.line}` }}>
      <div className="nx-mobile-stack" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 48, alignItems: "baseline", marginBottom: 48 }}>
        <div style={{ ...MONO, color: COLORS.muted }}>§ 04 · Treatment</div>
        <h2 className="nx-mobile-h2" style={{ ...DISPLAY, fontSize: 64, margin: 0, color: COLORS.ink }}>
          Generated, then <em style={{ fontStyle: "italic", color: COLORS.secondary }}>retouched.</em>
        </h2>
      </div>
      <div className="nx-before-after-container" style={{
        position: "relative", width: "100%", height: 480, overflow: "hidden",
        background: COLORS.ink, userSelect: "none"
      }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width * 100;
        setPos(Math.max(2, Math.min(98, x)));
      }}>
        
        {/* "After" = primary tone */}
        <div style={{ position: "absolute", inset: 0 }}>
          <StripedTile ratio={1920 / 480} label="After · retouched frame" tone="primary" />
        </div>
        {/* "Before" = accent, clipped */}
        <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <StripedTile ratio={1920 / 480} label="Before · raw generation" tone="accent" />
        </div>
        <div style={{
          position: "absolute", top: 0, bottom: 0, left: `${pos}%`,
          width: 2, background: COLORS.accent, pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", top: "50%", left: `${pos}%`,
          transform: "translate(-50%, -50%)",
          width: 44, height: 44, borderRadius: 999, background: COLORS.accent,
          display: "flex", alignItems: "center", justifyContent: "center",
          ...MONO, color: COLORS.ink, pointerEvents: "none"
        }}>↔</div>
      </div>
      <div style={{ ...MONO, color: COLORS.muted, textAlign: "center", marginTop: 16 }}>
        Move cursor horizontally · drag the divider
      </div>
    </section>);

}

function Studio() {
  return (
    <>
      <Nav current="studio" />
      <PageHeader
        section="04"
        eyebrow="AI Photoshoots"
        title="The"
        italic="studio."
        description="Editorial imagery made in a digital studio — no flights, no rentals, no lost day. We direct the light, set, and wardrobe; you get frames that feel shot, not generated. Studio-grade, brand-safe, ready to ship." />
      
      <Grid4 />
      <Process />
      <BeforeAfter />
      <Footer />
    </>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<Studio />);