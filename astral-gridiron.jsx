import { useState, useMemo } from "react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
  AreaChart, Area, CartesianGrid,
  ResponsiveContainer
} from "recharts";

// ═══════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════

const PLAYERS = [
  {
    name: "Sam Darnold", team: "Seattle Seahawks", abbr: "SEA", number: 3,
    birthday: "June 5, 1997", zodiac: "Gemini", symbol: "♊",
    element: "Air", quality: "Mutable", planet: "Mercury",
    traits: "Adaptable · Quick-witted · Dual-natured",
    stats: { yards: 4319, tds: 35, ints: 12, comp: 66.2, rating: 102.5, ypa: 8.3 },
    cosmic: [4, 3, 3, 4, 4, 3],
    forecast: [62, 71, 78, 85, 79, 88, 92],
    reading: "Mercury stations direct in your third house of communication, igniting the dual-threat instincts that have defined Darnold's resurgence. The Gemini twins manifest on the gridiron as an uncanny ability to read and react — his 66.2% completion rate is the earthly expression of a mind that processes defensive schemes at mercurial speed. As Venus crosses into Aquarius midweek, expect the unexpected: improvised plays and audibles will catch opposing coordinators off-guard. His 35 touchdowns this season channel the Gemini gift for finding openings where others see walls. With the waning gibbous illuminating your seventh house of partnerships on game day, Darnold's connection with receivers enters a transcendent phase — watch for his 8.3 yards per attempt to push beyond 9.0 as celestial winds carry each spiral into deeper territory."
  },
  {
    name: "Drake Maye", team: "New England Patriots", abbr: "NE", number: 10,
    birthday: "August 30, 2002", zodiac: "Virgo", symbol: "♍",
    element: "Earth", quality: "Mutable", planet: "Mercury",
    traits: "Analytical · Precise · Methodical",
    stats: { yards: 2276, tds: 15, ints: 10, comp: 66.6, rating: 88.1, ypa: 6.7 },
    cosmic: [3, 3, 4, 2, 3, 3],
    forecast: [75, 68, 82, 77, 85, 80, 84],
    reading: "Saturn forms a harmonious trine with your natal Mercury, sharpening the Virgoan eye for detail to surgical precision. Maye's meticulous pre-snap reads — the purest Virgo energy in the NFL — reach peak clarity this week. Mars entering your sixth house of discipline translates extra film-study hours directly into on-field execution. While his 66.6% completion rate tells one chapter, the cosmic narrative reveals systematic mastery still unfolding. Jupiter's expansive transit through your tenth house of career signals a pivotal moment for a young arm. His 15 touchdowns, each precisely engineered with Virgoan exactitude, could see a significant addition. Watch for surgical red-zone precision as the stars align for Maye's most complete performance of the season."
  },
  {
    name: "Patrick Mahomes", team: "Kansas City Chiefs", abbr: "KC", number: 15,
    birthday: "September 17, 1995", zodiac: "Virgo", symbol: "♍",
    element: "Earth", quality: "Mutable", planet: "Mercury",
    traits: "Analytical · Precise · Methodical",
    stats: { yards: 3928, tds: 26, ints: 11, comp: 67.5, rating: 93.5, ypa: 7.0 },
    cosmic: [5, 5, 5, 5, 5, 5],
    forecast: [80, 75, 88, 82, 90, 85, 95],
    reading: "Saturn's trine with your natal Mercury fortifies the legendary Virgoan precision that has made Mahomes the standard-bearer of his generation. With 3,928 passing yards sculpted through meticulous defensive study, this week's cosmic architecture elevates his game further. Mars in your sixth house transforms preparation into prophecy — every pattern recognized in the film room becomes a touchdown on Sunday. His 67.5% completion rate approaches perfection under this transit. Jupiter in your tenth house of legacy means each game now writes history. Watch for his 26 touchdowns to grow as Virgo's analytical nature pairs with physical genius in perfect celestial harmony."
  },
  {
    name: "Josh Allen", team: "Buffalo Bills", abbr: "BUF", number: 17,
    birthday: "May 21, 1996", zodiac: "Gemini", symbol: "♊",
    element: "Air", quality: "Mutable", planet: "Mercury",
    traits: "Adaptable · Quick-witted · Dual-natured",
    stats: { yards: 3731, tds: 28, ints: 6, comp: 63.6, rating: 101.4, ypa: 7.6 },
    cosmic: [5, 4, 5, 4, 4, 4],
    forecast: [65, 78, 72, 88, 82, 91, 89],
    reading: "Mercury's direct station sends electric current through Allen's Gemini wiring, amplifying the duality that makes him the NFL's most dangerous quarterback. The twins speak through arm and legs alike — 3,731 passing yards alongside a devastating rushing threat present a Gemini paradox no defense can solve. Venus in Aquarius sparks midweek brilliance: expect scrambles and throws that defy physics. His remarkably low 6 interceptions reflect a Gemini mind maturing — mercurial energy now channeled with devastating precision. The game-day moon lights your adventure sector, meaning Allen's 7.6 yards per attempt climbs as bold decisions are rewarded by the cosmos."
  },
  {
    name: "Jalen Hurts", team: "Philadelphia Eagles", abbr: "PHI", number: 1,
    birthday: "August 7, 1998", zodiac: "Leo", symbol: "♌",
    element: "Fire", quality: "Fixed", planet: "Sun",
    traits: "Commanding · Dramatic · Magnetic",
    stats: { yards: 2903, tds: 18, ints: 5, comp: 68.7, rating: 103.7, ypa: 8.0 },
    cosmic: [3, 4, 5, 4, 3, 5],
    forecast: [70, 76, 80, 74, 86, 92, 95],
    reading: "The Sun, your ruling planet, blazes in conjunction with Jupiter through your fifth house of performance and self-expression. Hurts embodies Leo's regal command — every snap is a coronation, every touchdown a declaration. With 2,903 passing yards supplemented by devastating rushing, Hurts channels the lion's dual threat. His 68.7% completion rate — quiet precision beneath the dramatic exterior — reflects a Leo who has mastered craft without sacrificing spectacle. The full moon in Aquarius amplifies theatrical instinct. With only 5 interceptions, his 103.7 passer rating holds steady under the brightest lights when the cosmos demands its king perform."
  },
  {
    name: "Brock Purdy", team: "San Francisco 49ers", abbr: "SF", number: 13,
    birthday: "December 27, 1999", zodiac: "Capricorn", symbol: "♑",
    element: "Earth", quality: "Cardinal", planet: "Saturn",
    traits: "Disciplined · Strategic · Relentless",
    stats: { yards: 3864, tds: 20, ints: 12, comp: 66.0, rating: 96.1, ypa: 8.5 },
    cosmic: [3, 4, 2, 4, 4, 3],
    forecast: [78, 80, 76, 82, 84, 86, 88],
    reading: "Saturn forms a grand trine with Mercury and the Moon, constructing a cosmic architecture of discipline that mirrors Purdy's methodical approach. Capricorn quarterbacks build drives like cathedrals — each play a stone laid with precision. His 3,864 passing yards represent the mountain goat's patient, relentless ascent. Pluto's continued transit through your sign deepens transformative energy, suggesting Purdy will unlock a dimension of play that silences remaining doubt. With 20 touchdowns and a 66.0% completion rate, every throw carries the weight of Capricorn's quiet ambition. His 8.5 yards per attempt climbs as Saturn rewards preparation with ever-greater precision."
  }
];

const COSMIC_CATS = ["Arm Strength", "Decision Making", "Mobility", "Clutch Factor", "Field Vision", "Leadership"];
const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const STAT_LABELS = ["Pass Yards", "Touchdowns", "Interceptions", "Comp %", "Rating", "YPA"];
const STATS_SEASON = "2024 Regular Season";

const DAILY = {
  Gemini: [
    "Mercury squares Mars — restless energy demands channeling. Film study reveals hidden defensive tendencies. Short-game accuracy sharpens as the twins converge.",
    "The Moon glides into your communication sector. Rapport with receivers hits a weekly peak. Audibles and hand signals feel telepathic today.",
    "Venus trines Neptune, sparking creative vision. The playbook comes alive with possibility. Midweek magic — new route combinations crystallize from the ether.",
    "Sun conjuncts natal Mercury. Mental processing speed reaches its zenith. Read progressions accelerate. Every decision feels effortless and inevitable.",
    "Mars sextiles Jupiter. Physical recovery accelerates and the arm feels electric. Throwing velocity peaks. Trust the mechanics your body already knows.",
    "Moon enters Sagittarius, igniting your adventure axis. Deep-ball confidence surges with cosmic authority. The stars favor the bold — let the arm breathe.",
    "Game day under a Capricorn moon. Structure meets improvisation in perfect tension. Let the initial reads guide you, then let Gemini instinct take over. Peak alignment."
  ],
  Virgo: [
    "Mercury enters your analytical zone. Film study becomes meditation — patterns emerge that remain invisible to lesser minds. The details hold the key to everything.",
    "Moon opposes your Sun, stirring emotional undercurrents. Channel that intensity into physical preparation. The body remembers what the mind rehearses.",
    "Venus transits your sixth house. Routine becomes sacred ritual. Perfect the throwing mechanics — Virgo's devotion to craft reaches its purest expression today.",
    "Jupiter aspects natal Mercury. The macro view crystallizes with sudden clarity — see the whole field, not just the primary read. Expansion within precision.",
    "Mars energizes your physical sector. Pocket presence strengthens to an immovable point. Planting and delivering with Virgoan exactitude feels automatic.",
    "Saturn rewards this week's discipline with compound interest. Every rep becomes muscle memory. Trust the process — the mountain moves one stone at a time.",
    "Game day: Moon trines your Mercury. The analytical mind merges with athletic instinct in seamless union. Pre-snap reads become prophecy. Execute and the cosmos delivers."
  ],
  Leo: [
    "Sun sextiles natal Jupiter. Confidence reconstitutes after rest. Study the opponent's weakness — the lion finds vulnerability where others see only strength.",
    "Mars enters your performance house. Physical energy surges like solar flares across your nervous system. Channel this power with intention, not impulse.",
    "Moon visits your creative sector. Visualize each drive as a narrative arc — Leo's ability to manifest destiny is unmatched among all twelve signs.",
    "Mercury squares your Sun. Communication with the coaching staff demands conscious intention. Clarity of game plan prevents wasted solar energy.",
    "Venus harmonizes your leadership house. The locker room feels your gravitational pull today. Your confidence radiates outward and becomes everyone's confidence.",
    "Jupiter expands your fifth house of performance. The stage is set and the lights blaze. Dramatic, game-changing plays feel written in the stars.",
    "Full moon energy amplifies Leo's natural spotlight to blinding intensity. Every camera finds you, every moment carries weight. The king performs when the kingdom watches."
  ],
  Capricorn: [
    "Saturn stations in your discipline sector. The foundation built this week will outlast the season itself. Approach practice like an architect approaches a cathedral.",
    "Moon trines natal Saturn. Emotional equilibrium translates directly to pocket composure. Nothing shakes the mountain goat's ancient, steady stance.",
    "Mercury activates your strategy house. The game plan organizes itself in your mind like constellations forming. Pattern recognition reaches its weekly peak.",
    "Mars sextiles Pluto. Hidden reserves of endurance surface from Saturn's deep wells. Fourth-quarter stamina is written in the celestial architecture.",
    "Venus calms pre-game tension into productive, laser focus. Capricorn's legendary composure becomes a strategic weapon that opponents cannot match.",
    "Jupiter aspects your career house. Milestone performances approach on the horizon. The mountain goat sees the summit with perfect clarity now.",
    "Game day under harmonious aspects. Execute with the precision Saturn demands and the confidence Jupiter provides. The long climb reaches its peak."
  ]
};

const COMPAT_MAP = {
  "Capricorn-Gemini": { score: 58, text: "The trickster versus the architect. Gemini's mercurial chaos against Capricorn's structural discipline creates a study in contrasts where game flow determines which philosophy prevails." },
  "Gemini-Gemini": { score: 85, text: "Mirror match. Both see the field through Mercury's quicksilver lens, creating an arms race of adaptability that rewards the quarterback who stays one thought ahead of his reflection." },
  "Gemini-Leo": { score: 78, text: "Air feeds Fire in a dynamic pairing. Gemini's versatility meets Leo's commanding presence — the lion has the edge in sheer willpower, but Gemini's unpredictability is the great equalizer." },
  "Gemini-Virgo": { score: 72, text: "Both ruled by Mercury, this creates a cerebral chess match of the highest order. Gemini's improvisation versus Virgo's preparation — the battle is won in the mind before the first snap." },
  "Capricorn-Leo": { score: 70, text: "Ambition meets discipline in a clash of titans. Leo's dramatic playmaking faces Capricorn's methodical execution — the showman versus the strategist in a battle of competing philosophies." },
  "Leo-Virgo": { score: 65, text: "Fire meets Earth in a friction-filled matchup. Leo's dramatic brilliance is methodically countered by Virgo's analytical precision, but raw talent can overwhelm even perfect preparation." },
  "Leo-Leo": { score: 90, text: "Two lions compete for the same spotlight in a spectacle that transcends the sport. Neither yields, both demand the stage. The crowd wins regardless of the final score." },
  "Virgo-Virgo": { score: 80, text: "Precision meets precision in a Virgoan masterclass. This matchup lives in the surgical margins — a chess match where every throw is a calculated, methodical decision." },
  "Capricorn-Virgo": { score: 82, text: "Earth signs unite in a battle of pure, uncompromising fundamentals. Both trust process over improvisation. This game was won in the film room long before the first snap." },
  "Capricorn-Capricorn": { score: 75, text: "Saturn's children clash in a masterclass of discipline and architecture. Every detail is contested, every yard hard-earned. A defensive coordinator's dream come to life." }
};

const getCompat = (z1, z2) => {
  const key = [z1, z2].sort().join("-");
  return COMPAT_MAP[key] || { score: 70, text: "An intriguing cosmic pairing with balanced energies and unpredictable potential." };
};

// ═══════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════

const Stars = () => {
  const stars = useMemo(() =>
    Array.from({ length: 180 }, (_, i) => ({
      x: Math.random() * 100, y: Math.random() * 100,
      s: Math.random() * 1.8 + 0.4,
      d: Math.random() * 4, dur: Math.random() * 3 + 1.5
    })), []
  );
  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {stars.map((st, i) => (
        <div key={i} style={{
          position: "absolute", left: `${st.x}%`, top: `${st.y}%`,
          width: st.s, height: st.s, borderRadius: "50%", backgroundColor: "#fff",
          animation: `twinkle ${st.dur}s ease-in-out ${st.d}s infinite`
        }} />
      ))}
    </div>
  );
};

const formatStatValue = (value, statKey) => {
  if (value == null) return "—";
  if (statKey === "Comp %" || statKey === "Rating" || statKey === "YPA") return typeof value === "number" && value % 1 !== 0 ? value.toFixed(1) : value;
  return typeof value === "number" && value % 1 !== 0 ? value.toFixed(1) : value;
};

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  const hasRaw = row && ("p1Raw" in row || "p2Raw" in row);
  return (
    <div style={{ background: "#0a0a0a", border: "1px solid #333", padding: "10px 14px", fontSize: 12 }}>
      <p style={{ color: "#666", marginBottom: 4, textTransform: "uppercase", letterSpacing: 2, fontSize: 10 }}>{label}</p>
      {payload.map((p, i) => {
        const rawVal = hasRaw ? row[p.dataKey + "Raw"] : null;
        const display = rawVal != null ? formatStatValue(rawVal, label) : (typeof p.value === "number" && p.value % 1 !== 0 ? p.value.toFixed(1) : p.value);
        return (
          <p key={i} style={{ color: p.color, margin: "2px 0" }}>{p.name}: <strong>{display}</strong></p>
        );
      })}
    </div>
  );
};

const Divider = () => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 0" }}>
    <div style={{ flex: 1, height: 1, background: "#1a1a1a" }} />
    <span style={{ padding: "0 16px", color: "#333", fontSize: 10 }}>✦</span>
    <div style={{ flex: 1, height: 1, background: "#1a1a1a" }} />
  </div>
);

const Dots = ({ value, max = 5 }) => (
  <div style={{ display: "flex", gap: 6 }}>
    {Array.from({ length: max }, (_, i) => (
      <div key={i} style={{
        width: 8, height: 8, borderRadius: "50%",
        background: i < value ? "#fff" : "#222",
        transition: "background 0.3s ease"
      }} />
    ))}
  </div>
);

// ═══════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════

export default function AstralGridiron() {
  const [p1i, setP1i] = useState(0);
  const [p2i, setP2i] = useState(1);
  const [day, setDay] = useState(6);

  const p1 = PLAYERS[p1i];
  const p2 = PLAYERS[p2i];
  const compat = getCompat(p1.zodiac, p2.zodiac);

  const radarData = useMemo(() => [
    { stat: "Pass Yds", p1: Math.round(p1.stats.yards / 50), p2: Math.round(p2.stats.yards / 50) },
    { stat: "TDs", p1: Math.round(p1.stats.tds * 2.5), p2: Math.round(p2.stats.tds * 2.5) },
    { stat: "Accuracy", p1: Math.round(p1.stats.comp), p2: Math.round(p2.stats.comp) },
    { stat: "Rating", p1: Math.round(p1.stats.rating * 0.83), p2: Math.round(p2.stats.rating * 0.83) },
    { stat: "Efficiency", p1: Math.round(p1.stats.ypa * 12), p2: Math.round(p2.stats.ypa * 12) },
    { stat: "Ball Security", p1: Math.round(100 - p1.stats.ints * 4), p2: Math.round(100 - p2.stats.ints * 4) },
  ], [p1, p2]);

  const barData = useMemo(() => {
    const rows = [
      { stat: "Pass Yards", p1Raw: p1.stats.yards, p2Raw: p2.stats.yards },
      { stat: "Touchdowns", p1Raw: p1.stats.tds, p2Raw: p2.stats.tds },
      { stat: "Comp %", p1Raw: p1.stats.comp, p2Raw: p2.stats.comp },
      { stat: "Rating", p1Raw: p1.stats.rating, p2Raw: p2.stats.rating },
      { stat: "YPA", p1Raw: p1.stats.ypa, p2Raw: p2.stats.ypa },
      { stat: "INTs", p1Raw: p1.stats.ints, p2Raw: p2.stats.ints },
    ];
    return rows.map(({ stat, p1Raw, p2Raw }) => {
      const maxVal = Math.max(p1Raw, p2Raw, 1);
      return {
        stat,
        p1: (p1Raw / maxVal) * 100,
        p2: (p2Raw / maxVal) * 100,
        p1Raw,
        p2Raw,
      };
    });
  }, [p1, p2]);

  const forecastData = useMemo(() =>
    DAYS.map((d, i) => ({ day: d, [p1.name]: p1.forecast[i], [p2.name]: p2.forecast[i] })),
    [p1, p2]
  );

  const sectionStyle = { maxWidth: 960, margin: "0 auto", padding: "0 20px" };
  const headerStyle = { fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#666", marginBottom: 20 };
  const cardStyle = {
    border: "1px solid #1a1a1a", padding: "32px 24px", flex: 1, minWidth: 0,
    transition: "border-color 0.3s ease", background: "rgba(255,255,255,0.01)"
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif", lineHeight: 1.6, WebkitFontSmoothing: "antialiased" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        @keyframes twinkle { 0%,100%{opacity:0.15} 50%{opacity:0.8} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        select { background:#000; color:#fff; border:1px solid #222; padding:10px 32px 10px 14px; font-size:13px; letter-spacing:0.08em; cursor:pointer; -webkit-appearance:none; -moz-appearance:none; appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 12px center; font-family:inherit; outline:none; transition:border-color 0.2s; }
        select:hover,select:focus { border-color:#444; }
        select option { background:#000; color:#fff; }
        .card:hover { border-color:#333 !important; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .legend-dot { display:inline-block; width:10px; height:2px; margin-right:8px; vertical-align:middle; }
        @media(max-width:767px) {
          .two-col { flex-direction:column !important; }
          .card-grid { flex-direction:column !important; }
          .rating-grid { grid-template-columns:1fr !important; }
          .day-tabs { overflow-x:auto; }
        }
      `}</style>

      <Stars />

      {/* ─── HEADER ─── */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <header style={{ textAlign: "center", padding: "80px 20px 40px" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.4em", color: "#444", marginBottom: 16, textTransform: "uppercase" }}>
            ✦ Where the cosmos meets the gridiron ✦
          </p>
          <h1 style={{ fontSize: "clamp(32px, 7vw, 64px)", fontWeight: 300, letterSpacing: "0.12em", textTransform: "uppercase", margin: 0, lineHeight: 1.1 }}>
            ASTRAL GRIDIRON
          </h1>
          <p style={{ fontSize: 13, color: "#555", marginTop: 16, fontWeight: 300, letterSpacing: "0.05em" }}>
            Celestial intelligence for the modern quarterback
          </p>
        </header>

        {/* ─── SELECTORS ─── */}
        <div style={{
          position: "sticky", top: 0, zIndex: 20, padding: "16px 20px",
          background: "rgba(0,0,0,0.85)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid #111"
        }}>
          <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }} className="two-col">
            <select value={p1i} onChange={e => setP1i(Number(e.target.value))} style={{ flex: "1 1 200px", maxWidth: 300 }}>
              {PLAYERS.map((p, i) => <option key={i} value={i}>{p.name} · {p.abbr} · {p.symbol}</option>)}
            </select>
            <span style={{ color: "#333", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>vs</span>
            <select value={p2i} onChange={e => setP2i(Number(e.target.value))} style={{ flex: "1 1 200px", maxWidth: 300 }}>
              {PLAYERS.map((p, i) => <option key={i} value={i}>{p.name} · {p.abbr} · {p.symbol}</option>)}
            </select>
          </div>
        </div>

        {/* ─── ZODIAC CARDS ─── */}
        <section style={{ ...sectionStyle, paddingTop: 56 }}>
          <div style={{ display: "flex", gap: 1 }} className="card-grid">
            {[p1, p2].map((p, idx) => (
              <div key={idx} className="card" style={{ ...cardStyle, animation: `fadeUp 0.6s ease ${idx * 0.15}s both` }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "clamp(48px, 10vw, 80px)", lineHeight: 1, marginBottom: 8, textShadow: "0 0 40px rgba(255,255,255,0.08)" }}>
                    {p.symbol}
                  </div>
                  <p style={{ fontSize: 10, letterSpacing: "0.35em", color: "#555", textTransform: "uppercase", marginBottom: 4 }}>
                    {p.zodiac}
                  </p>
                  <h2 style={{ fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 400, letterSpacing: "0.06em", marginBottom: 4 }}>
                    {p.name}
                  </h2>
                  <p style={{ fontSize: 12, color: "#555", letterSpacing: "0.1em" }}>
                    {p.abbr} · #{p.number} · QB
                  </p>
                </div>
                <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 20px" }}>
                  {[
                    ["Element", p.element],
                    ["Planet", p.planet],
                    ["Quality", p.quality],
                    ["Born", p.birthday.split(",")[0]]
                  ].map(([label, val]) => (
                    <div key={label}>
                      <p style={{ fontSize: 9, letterSpacing: "0.2em", color: "#444", textTransform: "uppercase" }}>{label}</p>
                      <p style={{ fontSize: 13, color: "#ccc", fontWeight: 300 }}>{val}</p>
                    </div>
                  ))}
                </div>
                <p style={{ marginTop: 20, fontSize: 11, color: "#444", letterSpacing: "0.08em", fontStyle: "italic" }}>
                  {p.traits}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ─── WEEKLY COSMIC READING ─── */}
        <section style={sectionStyle}>
          <p style={headerStyle}>This Week's Cosmic Reading</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {[p1, p2].map((p, idx) => (
              <div key={idx} style={{ animation: `fadeUp 0.6s ease ${idx * 0.2}s both` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 20 }}>{p.symbol}</span>
                  <span style={{ fontSize: 12, letterSpacing: "0.15em", color: "#666", textTransform: "uppercase" }}>{p.name}</span>
                </div>
                <p style={{ fontSize: 14, color: "#999", fontWeight: 300, lineHeight: 1.8 }}>
                  {p.reading}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ─── CELESTIAL POWER RATINGS ─── */}
        <section style={sectionStyle}>
          <p style={headerStyle}>Celestial Power Ratings</p>
          <div className="rating-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {[p1, p2].map((p, pi) => (
              <div key={pi}>
                <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "#555", textTransform: "uppercase", marginBottom: 16 }}>
                  {p.symbol} {p.name}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {COSMIC_CATS.map((cat, ci) => (
                    <div key={ci} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 11, color: "#666", letterSpacing: "0.08em", textTransform: "uppercase" }}>{cat}</span>
                      <Dots value={p.cosmic[ci]} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ─── STAT CONSTELLATION (RADAR) ─── */}
        <section style={sectionStyle}>
          <p style={headerStyle}>Stat Constellation</p>
          <p style={{ fontSize: 11, color: "#555", letterSpacing: "0.1em", marginBottom: 16 }}>{STATS_SEASON}</p>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <div style={{ display: "flex", gap: 24, fontSize: 11, color: "#555" }}>
              <span><span className="legend-dot" style={{ background: "#fff" }} />{p1.name}</span>
              <span><span className="legend-dot" style={{ background: "#555" }} />{p2.name}</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={340}>
            <RadarChart data={radarData} style={{ fontSize: 11 }}>
              <PolarGrid stroke="#1a1a1a" />
              <PolarAngleAxis dataKey="stat" tick={{ fill: "#555", fontSize: 10 }} />
              <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
              <Radar name={p1.name} dataKey="p1" stroke="#fff" fill="#fff" fillOpacity={0.08} strokeWidth={1.5} />
              <Radar name={p2.name} dataKey="p2" stroke="#555" fill="#555" fillOpacity={0.06} strokeWidth={1.5} />
              <Tooltip content={<Tip />} />
            </RadarChart>
          </ResponsiveContainer>
        </section>

        <Divider />

        {/* ─── BY THE NUMBERS (BAR CHART) ─── */}
        <section style={sectionStyle}>
          <p style={headerStyle}>By the Numbers</p>
          <p style={{ fontSize: 11, color: "#555", letterSpacing: "0.1em", marginBottom: 16 }}>{STATS_SEASON}</p>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <div style={{ display: "flex", gap: 24, fontSize: 11, color: "#555" }}>
              <span><span className="legend-dot" style={{ background: "#fff" }} />{p1.name}</span>
              <span><span className="legend-dot" style={{ background: "#444" }} />{p2.name}</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData} layout="vertical" barGap={2} barSize={8}>
              <CartesianGrid stroke="#111" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fill: "#444", fontSize: 10 }} axisLine={{ stroke: "#1a1a1a" }} />
              <YAxis type="category" dataKey="stat" tick={{ fill: "#666", fontSize: 10, letterSpacing: 1 }} width={80} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="p1" fill="#fff" name={p1.name} radius={[0, 2, 2, 0]} />
              <Bar dataKey="p2" fill="#444" name={p2.name} radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <Divider />

        {/* ─── WEEKLY FORECAST ─── */}
        <section style={sectionStyle}>
          <p style={headerStyle}>Weekly Cosmic Forecast</p>

          {/* Day Tabs */}
          <div className="day-tabs" style={{ display: "flex", justifyContent: "center", gap: 0, marginBottom: 32 }}>
            {DAYS.map((d, i) => (
              <button key={i} onClick={() => setDay(i)} style={{
                padding: "10px 14px", fontSize: 11, letterSpacing: "0.15em",
                background: day === i ? "#fff" : "transparent",
                color: day === i ? "#000" : "#555",
                border: "1px solid #1a1a1a", cursor: "pointer",
                fontFamily: "inherit", fontWeight: day === i ? 500 : 300,
                transition: "all 0.2s ease",
                marginLeft: i > 0 ? -1 : 0
              }}>
                {d}
              </button>
            ))}
          </div>

          {/* Daily Readings */}
          <div style={{ display: "flex", gap: 24, marginBottom: 32, flexWrap: "wrap" }} className="two-col">
            {[p1, p2].map((p, idx) => (
              <div key={idx} style={{ flex: "1 1 300px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 16 }}>{p.symbol}</span>
                  <span style={{ fontSize: 11, color: "#555", letterSpacing: "0.12em", textTransform: "uppercase" }}>{p.name}</span>
                </div>
                <p style={{ fontSize: 13, color: "#888", fontWeight: 300, lineHeight: 1.7 }}>
                  {DAILY[p.zodiac]?.[day] || "The stars are quiet today. Rest and prepare."}
                </p>
                <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 9, letterSpacing: "0.2em", color: "#444", textTransform: "uppercase" }}>Cosmic Alignment</span>
                  <div style={{ flex: 1, height: 2, background: "#111", borderRadius: 1, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", background: idx === 0 ? "#fff" : "#555",
                      width: `${p.forecast[day]}%`, transition: "width 0.5s ease", borderRadius: 1
                    }} />
                  </div>
                  <span style={{ fontSize: 12, color: idx === 0 ? "#fff" : "#555", fontWeight: 500, minWidth: 28, textAlign: "right" }}>
                    {p.forecast[day]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Forecast Chart */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <div style={{ display: "flex", gap: 24, fontSize: 11, color: "#555" }}>
              <span><span className="legend-dot" style={{ background: "#fff" }} />{p1.name}</span>
              <span><span className="legend-dot" style={{ background: "#555" }} />{p2.name}</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={forecastData}>
              <CartesianGrid stroke="#111" />
              <XAxis dataKey="day" tick={{ fill: "#555", fontSize: 10 }} axisLine={{ stroke: "#1a1a1a" }} />
              <YAxis tick={{ fill: "#333", fontSize: 10 }} domain={[40, 100]} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip />} />
              <Area type="monotone" dataKey={p1.name} stroke="#fff" fill="#fff" fillOpacity={0.04} strokeWidth={1.5} dot={{ r: 2, fill: "#fff" }} />
              <Area type="monotone" dataKey={p2.name} stroke="#555" fill="#555" fillOpacity={0.03} strokeWidth={1.5} dot={{ r: 2, fill: "#555" }} />
            </AreaChart>
          </ResponsiveContainer>
        </section>

        <Divider />

        {/* ─── COSMIC COMPATIBILITY ─── */}
        <section style={sectionStyle}>
          <p style={headerStyle}>Cosmic Compatibility</p>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 20 }}>
              <span style={{ fontSize: 36 }}>{p1.symbol}</span>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ fontSize: 28, fontWeight: 300, color: "#fff" }}>{compat.score}</span>
                <span style={{ fontSize: 9, letterSpacing: "0.2em", color: "#444", textTransform: "uppercase" }}>Alignment</span>
              </div>
              <span style={{ fontSize: 36 }}>{p2.symbol}</span>
            </div>
            <div style={{ maxWidth: 600, margin: "0 auto" }}>
              <p style={{ fontSize: 12, letterSpacing: "0.1em", color: "#555", textTransform: "uppercase", marginBottom: 8 }}>
                {p1.zodiac} × {p2.zodiac}
              </p>
              <p style={{ fontSize: 14, color: "#888", fontWeight: 300, lineHeight: 1.8 }}>
                {compat.text}
              </p>
            </div>
          </div>

          {/* Compatibility Breakdown */}
          <div style={{ maxWidth: 500, margin: "24px auto 0", display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              ["Mental Warfare", Math.min(100, compat.score + 8)],
              ["Physical Edge", Math.min(100, Math.abs(compat.score - 12) + 20)],
              ["Clutch Dynamics", Math.min(100, compat.score + 3)],
              ["Cosmic Synergy", compat.score]
            ].map(([label, val]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 10, letterSpacing: "0.12em", color: "#555", textTransform: "uppercase", width: 120, flexShrink: 0 }}>{label}</span>
                <div style={{ flex: 1, height: 1, background: "#111", borderRadius: 1, overflow: "hidden" }}>
                  <div style={{ height: "100%", background: "linear-gradient(90deg, #333, #fff)", width: `${val}%`, transition: "width 0.8s ease" }} />
                </div>
                <span style={{ fontSize: 11, color: "#555", minWidth: 24, textAlign: "right" }}>{val}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer style={{ textAlign: "center", padding: "80px 20px 48px" }}>
          <div style={{ height: 1, background: "#111", maxWidth: 200, margin: "0 auto 32px" }} />
          <p style={{ fontSize: 10, letterSpacing: "0.3em", color: "#333", textTransform: "uppercase", marginBottom: 8 }}>
            ✦ Astral Gridiron ✦
          </p>
          <p style={{ fontSize: 11, color: "#2a2a2a", fontWeight: 300, fontStyle: "italic" }}>
            Celestial data for entertainment purposes only. The stars reveal tendencies, not certainties.
          </p>
          <p style={{ fontSize: 10, color: "#333", marginTop: 8, letterSpacing: "0.08em" }}>
            Player performance stats: {STATS_SEASON}.
          </p>
        </footer>
      </div>
    </div>
  );
}
