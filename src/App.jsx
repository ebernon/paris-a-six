import { useState, useRef, useEffect } from "react";

const C = {
  cream: "#f5f0e8", ivory: "#faf7f2", gold: "#b8964a", goldL: "#d4b06a",
  dark: "#1a1710", charcoal: "#2d2a24", muted: "#7a7468",
  blush: "#d4967a", sage: "#7a9478", sky: "#6a8fa8",
};

// ── DATA ──────────────────────────────────────────────────────

const DAYS = [
  { date: "6", month: "May", weekday: "Wed", title: "Arrive in Paris! 🥂", who: ["all"], open: true,
    events: [
      { time: "Arrival", icon: "🚢", name: "Bateaux Mouches Seine River Cruise", detail: "Promenade cruise — Allen, Elizabeth, Lynn & Rick",
        metro: [{ stop: "Alma–Marceau", lines: [["9","#6ECA97","#000"]] }, { stop: "Pont de l'Alma (RER C)", lines: [["C","#F6B0CB","#000"]] }] },
      { time: "7:00 PM", icon: "🍽️", name: "Dinner — Chez Papa", detail: "138 Bd du Montparnasse, 75014 · Montparnasse Vavin", note: "✓ Reserved for 6 (Eric)",
        metro: [{ stop: "Vavin", lines: [["4","#009CDA","#fff"]] }, { stop: "Notre-Dame-des-Champs", lines: [["12","#E3051B","#fff"]] }] },
    ]
  },
  { date: "7", month: "May", weekday: "Thu", title: "Louvre · Printemps · Bon Marché", who: ["all"],
    events: [
      { time: "11:00 AM", icon: "🏛️", name: "The Louvre", detail: "Allen, Elizabeth, Lynn & Rick",
        metro: [{ stop: "Palais Royal–Musée du Louvre", lines: [["1","#FFBE00","#000"],["7","#F0A500","#000"]] }, { stop: "Louvre–Rivoli", lines: [["1","#FFBE00","#000"]] }] },
      { time: "Afternoon", icon: "🥂", name: "Printemps Haussmann — Rooftop Bar (Perruche)", detail: "Rooftop drinks · ~7 min Uber from Louvre",
        metro: [{ stop: "Havre-Caumartin", lines: [["3","#9F9825","#fff"],["9","#6ECA97","#000"]] }, { stop: "Saint-Lazare", lines: [["3","#9F9825","#fff"],["12","#E3051B","#fff"],["13","#9DC9E8","#000"],["14","#62259D","#fff"]] }] },
      { time: "Afternoon", icon: "🧺", name: "Le Grande Épicerie", detail: "Au Bon Marché lower level · 8:30 AM–9 PM",
        metro: [{ stop: "Sèvres-Babylone", lines: [["10","#6F4C9B","#fff"],["12","#E3051B","#fff"]] }, { stop: "Rue du Bac", lines: [["12","#E3051B","#fff"]] }] },
      { time: "Dinner", icon: "🍽️", name: "Dinner — Le Procope", detail: "Allen, Elizabeth, Lynn & Rick · Paris's oldest café",
        metro: [{ stop: "Odéon", lines: [["4","#009CDA","#fff"],["10","#6F4C9B","#fff"]] }, { stop: "Saint-Germain-des-Prés", lines: [["4","#009CDA","#fff"]] }] },
    ]
  },
  { date: "8", month: "May", weekday: "Fri", title: "Musée d'Orsay · Dinner à Six", who: ["all", "ec"],
    events: [
      { time: "10:30 AM", icon: "🎨", name: "Musée d'Orsay", detail: "Allen, Elizabeth, Lynn & Rick",
        metro: [{ stop: "Solférino", lines: [["12","#E3051B","#fff"]] }, { stop: "Musée d'Orsay (RER C)", lines: [["C","#F6B0CB","#000"]] }] },
      { time: "Lunch", icon: "🫒", name: "Lunch @ Remi & Cécile's — Le Vésinet", detail: "Eric & Candice · Private lunch",
        metro: [{ stop: "Le Vésinet–Centre (RER A)", lines: [["A","#F1471D","#fff"]] }, { stop: "Le Vésinet–Le Pecq (RER A)", lines: [["A","#F1471D","#fff"]] }] },
      { time: "7:30 PM", icon: "🍽️", name: "Dinner — Chez Walczak, Aux Sportifs Réunis", detail: "75 Rue Brancion, 75015 · €40/pp", note: "✓ Reserved for 6 (Eric)",
        metro: [{ stop: "Porte de Vanves", lines: [["13","#9DC9E8","#000"]] }, { stop: "Plaisance", lines: [["13","#9DC9E8","#000"]] }] },
    ]
  },
  { date: "9", month: "May", weekday: "Sat", title: "Montmartre · Le Marais · Tea", who: ["all"],
    events: [
      { time: "9:30 AM", icon: "⛪", name: "Meet @ Sacré-Cœur · Montmartre", detail: "Options: walk to Moulin Rouge or brunch with view",
        metro: [{ stop: "Abbesses", lines: [["12","#E3051B","#fff"]] }, { stop: "Anvers", lines: [["2","#003CA6","#fff"]] }] },
      { time: "Afternoon", icon: "🛍️", name: "Stroll & Shop — Le Marais", detail: "Lunch TBD",
        metro: [{ stop: "Saint-Paul", lines: [["1","#FFBE00","#000"]] }, { stop: "Hôtel de Ville", lines: [["1","#FFBE00","#000"],["11","#8D5E2A","#fff"]] }] },
      { time: "4:30 PM", icon: "🫖", name: "Tea @ Mariage Frères — Salon de Thé", detail: "30 Rue Du Bourg Tibourg", note: "⚠ Walk-in only",
        metro: [{ stop: "Hôtel de Ville", lines: [["1","#FFBE00","#000"],["11","#8D5E2A","#fff"]] }, { stop: "Rambuteau", lines: [["11","#8D5E2A","#fff"]] }] },
      { time: "Dinner", icon: "❓", name: "Dinner TBD" },
    ]
  },
  { date: "10", month: "May", weekday: "Sun", away: "🍾 Sunday May 10 — Champagne Region · Allen, Elizabeth, Rick & Lynn\nEric & Candice not available Sun–Tue" },
  { date: "11", month: "May", weekday: "Mon", away: "🍾 Monday May 11 — Champagne Region · All four away" },
  { date: "12", month: "May", weekday: "Tue", title: "Varying Plans", who: ["ec"],
    events: [
      { time: "Varying", icon: "🗺️", name: "Plans TBD for each couple" },
      { time: "Dinner", icon: "🍽️", name: "Dinner with Eugé & Diego", detail: "Eric & Candice" },
    ]
  },
  { date: "13", month: "May", weekday: "Wed", title: "Notre-Dame · Michelin Lunch", who: ["all"],
    events: [
      { time: "Morning", icon: "⛪", name: "Visit Notre-Dame Cathedral", detail: "Allen, Elizabeth, Lynn & Rick",
        metro: [{ stop: "Cité", lines: [["4","#009CDA","#fff"]] }, { stop: "Saint-Michel–Notre-Dame", lines: [["4","#009CDA","#fff"],["B","#447DB5","#fff"],["C","#F6B0CB","#000"]] }] },
      { time: "12:00 PM", icon: "⭐", name: "Lunch — L'Atelier Maître Albert", detail: "1 Rue Maître Albert, 75005 · Michelin Guide", note: "✓ Reserved for 6",
        metro: [{ stop: "Maubert-Mutualité", lines: [["10","#6F4C9B","#fff"]] }, { stop: "Cardinal Lemoine", lines: [["10","#6F4C9B","#fff"]] }] },
      { time: "Dinner", icon: "❓", name: "Dinner TBD" },
    ]
  },
  { date: "14", month: "May", weekday: "Thu", away: "✈️ Thursday May 14 — Morning departures · Au revoir Paris! 💔" },
];

const FORECASTS = [
  { date: "Wed 5/6", hi: 67, lo: 51, icon: "🌤", desc: "Partly cloudy" },
  { date: "Thu 5/7", hi: 70, lo: 52, icon: "☀️", desc: "Mostly sunny" },
  { date: "Fri 5/8", hi: 65, lo: 50, icon: "🌦", desc: "Light showers" },
  { date: "Sat 5/9", hi: 63, lo: 49, icon: "⛅", desc: "Partly cloudy" },
  { date: "Sun 5/10", hi: 68, lo: 51, icon: "☀️", desc: "Sunny" },
  { date: "Mon 5/11", hi: 71, lo: 53, icon: "🌤", desc: "Mostly sunny" },
  { date: "Tue 5/12", hi: 69, lo: 52, icon: "⛅", desc: "Partly cloudy" },
  { date: "Wed 5/13", hi: 66, lo: 50, icon: "🌦", desc: "PM showers" },
  { date: "Thu 5/14", hi: 64, lo: 49, icon: "🌥", desc: "Cloudy" },
];

const METRO_LINES = [
  { num: "1", color: "#FFBE00", text: "#000", name: "La Défense ↔ Château de Vincennes", desc: "Louvre-Rivoli, Châtelet, Champs-Élysées · The tourist spine of Paris" },
  { num: "4", color: "#009CDA", text: "#fff", name: "Clignancourt ↔ Montrouge", desc: "Montparnasse-Bienvenüe, Châtelet, Les Halles · Great north–south connector" },
  { num: "9", color: "#6ECA97", text: "#000", name: "Pont de Sèvres ↔ Mairie de Montreuil", desc: "Havre-Caumartin (Printemps/Galeries Lafayette), République" },
  { num: "10", color: "#6F4C9B", text: "#fff", name: "Boulogne ↔ Gare d'Austerlitz", desc: "Mabillon (Saint-Germain/Le Marais), Cluny–La Sorbonne" },
  { num: "12", color: "#E3051B", text: "#fff", name: "Aubervilliers ↔ Mairie d'Issy", desc: "Montmartre (Abbesses), Madeleine, Montparnasse-Bienvenüe" },
];

const METRO_STOPS = [
  { venue: "Chez Papa (Montparnasse)", stop: "Vavin", lines: [{ n: "4", c: "#009CDA", t: "#fff" }] },
  { venue: "The Louvre", stop: "Palais Royal–Musée du Louvre", lines: [{ n: "1", c: "#FFBE00", t: "#000" }] },
  { venue: "Printemps Haussmann", stop: "Havre-Caumartin", lines: [{ n: "9", c: "#6ECA97", t: "#000" }] },
  { venue: "Musée d'Orsay", stop: "Solférino (M) or Musée d'Orsay (RER C)", lines: [{ n: "12", c: "#E3051B", t: "#fff" }] },
  { venue: "Sacré-Cœur / Montmartre", stop: "Abbesses", lines: [{ n: "12", c: "#E3051B", t: "#fff" }] },
  { venue: "Mariage Frères / Le Marais", stop: "Hôtel de Ville", lines: [{ n: "1", c: "#FFBE00", t: "#000" }, { n: "11", c: "#8D5E2A", t: "#fff" }] },
  { venue: "Notre-Dame / L'Atelier Maître Albert", stop: "Maubert-Mutualité or Cité", lines: [{ n: "10", c: "#6F4C9B", t: "#fff" }] },
  { venue: "Le Procope / Saint-Germain", stop: "Odéon", lines: [{ n: "10", c: "#6F4C9B", t: "#fff" }] },
  { venue: "Chez Walczak (Brancion)", stop: "Convention", lines: [{ n: "12", c: "#E3051B", t: "#fff" }] },
  { venue: "La Tour d'Argent", stop: "Cardinal Lemoine", lines: [{ n: "10", c: "#6F4C9B", t: "#fff" }] },
  { venue: "Bar Hemingway / The Ritz", stop: "Opéra", lines: [{ n: "3", c: "#9F9825", t: "#fff" }, { n: "7", c: "#F0A500", t: "#000" }, { n: "8", c: "#C897C4", t: "#000" }] },
];

const PHRASES = [
  { cat: "essentials", fr: "Bonjour", pron: "bon-ZHOOR", en: "Hello / Good morning (use this FIRST, always)" },
  { cat: "essentials", fr: "Bonsoir", pron: "bon-SWAHR", en: "Good evening" },
  { cat: "essentials", fr: "Au revoir", pron: "oh ruh-VWAHR", en: "Goodbye" },
  { cat: "essentials", fr: "Merci beaucoup", pron: "mair-SEE boh-KOO", en: "Thank you very much" },
  { cat: "essentials", fr: "S'il vous plaît", pron: "seel voo PLAY", en: "Please" },
  { cat: "essentials", fr: "Excusez-moi", pron: "ex-kyoo-ZAY mwah", en: "Excuse me / Sorry" },
  { cat: "essentials", fr: "Pardon", pron: "par-DON", en: "Pardon me (to pass)" },
  { cat: "essentials", fr: "Oui / Non", pron: "WEE / NON", en: "Yes / No" },
  { cat: "essentials", fr: "Parlez-vous anglais?", pron: "par-LAY voo on-GLAY", en: "Do you speak English?" },
  { cat: "essentials", fr: "Je ne comprends pas", pron: "zhuh nuh kom-PRAHN pah", en: "I don't understand" },
  { cat: "essentials", fr: "Très bien, merci", pron: "tray BYAN, mair-SEE", en: "Very well, thank you" },
  { cat: "dining", fr: "Une table pour six", pron: "oon TAH-bluh poor sees", en: "A table for six" },
  { cat: "dining", fr: "La carte, s'il vous plaît", pron: "lah KART, seel voo play", en: "The menu, please" },
  { cat: "dining", fr: "Je voudrais…", pron: "zhuh voo-DRAY", en: "I would like…" },
  { cat: "dining", fr: "L'addition, s'il vous plaît", pron: "lad-ee-SYON, seel voo play", en: "The check, please" },
  { cat: "dining", fr: "C'est délicieux!", pron: "say day-lee-SYUH", en: "It's delicious!" },
  { cat: "dining", fr: "Un café crème", pron: "un kaf-AY krem", en: "Coffee with milk (like a latte)" },
  { cat: "dining", fr: "Une carafe d'eau", pron: "oon kah-RAF doh", en: "A carafe of tap water (free!)" },
  { cat: "dining", fr: "Santé!", pron: "son-TAY", en: "Cheers!" },
  { cat: "dining", fr: "Bon appétit!", pron: "bon ap-ay-TEE", en: "Enjoy your meal!" },
  { cat: "dining", fr: "Où sont les toilettes?", pron: "oo son lay twah-LET", en: "Where are the bathrooms?" },
  { cat: "directions", fr: "Où est…?", pron: "oo AY", en: "Where is…?" },
  { cat: "directions", fr: "À droite / À gauche", pron: "ah DRWAT / ah GOHSH", en: "To the right / To the left" },
  { cat: "directions", fr: "Tout droit", pron: "too DRWAH", en: "Straight ahead" },
  { cat: "directions", fr: "Correspondance", pron: "kor-es-pon-DONS", en: "Transfer / Connection (Métro)" },
  { cat: "directions", fr: "Sortie", pron: "sor-TEE", en: "Exit" },
  { cat: "directions", fr: "C'est loin?", pron: "say LWAN", en: "Is it far?" },
  { cat: "shopping", fr: "Combien ça coûte?", pron: "kom-BYAN sah KOOT", en: "How much does it cost?" },
  { cat: "shopping", fr: "Je regarde seulement", pron: "zhuh ruh-GARD sul-MON", en: "I'm just looking" },
  { cat: "shopping", fr: "Je le prends", pron: "zhuh luh PROHN", en: "I'll take it" },
  { cat: "shopping", fr: "Puis-je essayer?", pron: "pwee-zhuh es-AY-yay", en: "Can I try it on?" },
  { cat: "social", fr: "Enchanté(e)", pron: "on-shon-TAY", en: "Pleased to meet you" },
  { cat: "social", fr: "C'est magnifique!", pron: "say man-yee-FEEK", en: "It's magnificent!" },
  { cat: "social", fr: "J'adore Paris", pron: "zhad-OR pah-REE", en: "I love Paris" },
  { cat: "social", fr: "Santé! / À votre santé!", pron: "son-TAY / ah VOH-truh son-TAY", en: "Cheers! / To your health!" },
  { cat: "social", fr: "Joie de vivre", pron: "zhwah duh VEE-vruh", en: "Joy of living — your trip motto!" },
  { cat: "social", fr: "C'est la vie", pron: "say lah VEE", en: "Such is life" },
];

const WHO_COLORS = {
  all:  { bg: "rgba(184,150,74,0.15)", color: C.gold, label: "All Six" },
  ec:   { bg: "rgba(122,148,120,0.15)", color: C.sage, label: "E&C" },
  ae:   { bg: "rgba(106,143,168,0.15)", color: C.sky,  label: "A&E" },
  rl:   { bg: "rgba(212,150,122,0.15)", color: C.blush,label: "R&L" },
};

// ── STYLES ────────────────────────────────────────────────────
const gf = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@300;400;500&display=swap');
@keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
@keyframes scrollPulse { 0%,100% { opacity:0.4; } 50% { opacity:1; } }
@keyframes typingBounce { 0%,60%,100% { opacity:0.4; transform:translateY(0); } 30% { opacity:1; transform:translateY(-3px); } }
@keyframes popIn { from { transform:scale(0.88) translateY(10px); opacity:0; } to { transform:scale(1) translateY(0); opacity:1; } }
@keyframes slideUp { from { transform:translateY(100%); } to { transform:translateY(0); } }
@keyframes logoIn { from { opacity:0; transform:scale(0.85); } to { opacity:1; transform:scale(1); } }
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:'Jost',sans-serif; background:${C.cream}; color:${C.charcoal}; }
::-webkit-scrollbar { width:4px; height:4px; }
::-webkit-scrollbar-track { background:transparent; }
::-webkit-scrollbar-thumb { background:rgba(184,150,74,0.25); border-radius:4px; }
`;

// ── COMPONENTS ────────────────────────────────────────────────

function WhoTag({ type }) {
  const s = WHO_COLORS[type];
  return <span style={{ fontSize:"0.6rem", letterSpacing:"0.1em", textTransform:"uppercase", padding:"0.2rem 0.6rem", borderRadius:2, fontWeight:500, background:s.bg, color:s.color, marginRight:4 }}>{s.label}</span>;
}

function DayCard({ day }) {
  const [open, setOpen] = useState(!!day.open);
  if (day.away) return (
    <div style={{ background:C.ivory, border:`1px solid rgba(184,150,74,0.15)`, borderRadius:4, padding:"1.5rem", textAlign:"center", marginBottom:"1rem", color:C.muted, fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:"1.05rem", whiteSpace:"pre-line" }}>{day.away}</div>
  );
  return (
    <div style={{ background:C.ivory, border:`1px solid rgba(184,150,74,0.15)`, borderRadius:4, marginBottom:"1rem", overflow:"hidden" }}>
      <div onClick={() => setOpen(!open)} style={{ display:"flex", alignItems:"center", gap:"1rem", padding:"1.1rem 1.2rem", cursor:"pointer" }}>
        <div style={{ minWidth:52, textAlign:"center" }}>
          <div style={{ fontSize:"0.58rem", letterSpacing:"0.2em", textTransform:"uppercase", color:C.gold, fontWeight:500 }}>{day.month}</div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.8rem", color:C.dark, lineHeight:1 }}>{day.date}</div>
          <div style={{ fontSize:"0.6rem", letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted }}>{day.weekday}</div>
        </div>
        <div style={{ width:1, height:44, background:"rgba(184,150,74,0.2)" }} />
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1rem", fontWeight:400, color:C.dark }}>{day.title}</div>
          <div style={{ marginTop:4 }}>{day.who?.map(w => <WhoTag key={w} type={w} />)}</div>
        </div>
        <span style={{ color:C.muted, transition:"transform 0.3s", transform:open?"rotate(180deg)":"none", fontSize:"1.1rem" }}>▾</span>
      </div>
      {open && (
        <div style={{ borderTop:`1px solid rgba(184,150,74,0.1)`, padding:"0 1.2rem 1.2rem" }}>
          {day.events?.map((ev, i) => (
            <div key={i} style={{ display:"flex", gap:"0.8rem", padding:"0.75rem 0", borderBottom: i < day.events.length-1 ? `1px solid rgba(184,150,74,0.08)` : "none" }}>
              <div style={{ minWidth:52, fontSize:"0.68rem", fontWeight:500, color:C.gold, paddingTop:2 }}>{ev.time}</div>
              <div style={{ fontSize:"1rem", minWidth:22, textAlign:"center" }}>{ev.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", color:C.dark }}>{ev.name}</div>
                {ev.detail && <div style={{ fontSize:"0.76rem", color:C.muted, marginTop:2, lineHeight:1.5 }}>{ev.detail}</div>}
                {ev.note && <div style={{ fontSize:"0.7rem", color:C.blush, marginTop:3, fontStyle:"italic" }}>{ev.note}</div>}
                {ev.metro && (
                  <div style={{ marginTop:6, display:"flex", flexDirection:"column", gap:3 }}>
                    {ev.metro.map((m, mi) => (
                      <div key={mi} style={{ display:"flex", alignItems:"center", gap:5, flexWrap:"wrap" }}>
                        <span style={{ fontSize:"0.68rem", color:C.muted }}>🚇 {m.stop}</span>
                        {m.lines.map(([n,bg,fg], li) => (
                          <span key={li} style={{ background:bg, color:fg, fontSize:"0.6rem", fontWeight:700, padding:"1px 5px", borderRadius:8, minWidth:14, textAlign:"center" }}>{n}</span>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SectionHeader({ num, title }) {
  return (
    <div style={{ display:"flex", alignItems:"baseline", gap:"1rem", marginBottom:"1.5rem", paddingBottom:"0.8rem", borderBottom:`1px solid rgba(184,150,74,0.2)` }}>
      <span style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:"2.5rem", color:C.goldL, opacity:0.4, lineHeight:1 }}>{num}</span>
      <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.5rem", fontWeight:400, color:C.dark }}>{title}</h2>
    </div>
  );
}

function RestaurantCard({ type, name, meta, badges, metro }) {
  return (
    <div style={{ background:C.ivory, border:`1px solid rgba(184,150,74,0.15)`, borderRadius:4, padding:"1.2rem" }}>
      <div style={{ fontSize:"0.6rem", letterSpacing:"0.2em", textTransform:"uppercase", color:C.gold, fontWeight:500, marginBottom:4 }}>{type}</div>
      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.05rem", fontWeight:400, color:C.dark, marginBottom:6 }}>{name}</div>
      <div style={{ fontSize:"0.76rem", color:C.muted, lineHeight:1.6 }} dangerouslySetInnerHTML={{ __html: meta }} />
      {metro && (
        <div style={{ marginTop:8, paddingTop:8, borderTop:`1px solid rgba(184,150,74,0.1)`, display:"flex", flexDirection:"column", gap:4 }}>
          {metro.map((m, mi) => (
            <div key={mi} style={{ display:"flex", alignItems:"center", gap:5, flexWrap:"wrap" }}>
              <span style={{ fontSize:"0.7rem", color:C.muted }}>🚇 {m.stop}</span>
              {m.lines.map(([n,bg,fg], li) => (
                <span key={li} style={{ background:bg, color:fg, fontSize:"0.6rem", fontWeight:700, padding:"1px 5px", borderRadius:8, minWidth:14, textAlign:"center" }}>{n}</span>
              ))}
            </div>
          ))}
        </div>
      )}
      {badges && <div style={{ marginTop:6 }}>{badges.map((b, i) => <span key={i} style={{ display:"inline-block", fontSize:"0.58rem", letterSpacing:"0.1em", textTransform:"uppercase", padding:"0.18rem 0.5rem", borderRadius:2, marginRight:4, marginTop:4, background:b.bg, color:b.color }}>{b.label}</span>)}</div>}
    </div>
  );
}

const BADGE = {
  reserved: { bg:"rgba(122,148,120,0.15)", color:C.sage, label:"✓ Reserved for 6" },
  michelin:  { bg:"rgba(184,150,74,0.15)", color:C.gold, label:"★ Michelin" },
  walkin:    { bg:"rgba(106,143,168,0.15)", color:C.sky,  label:"Walk-in Only" },
  tbd:       { bg:"rgba(212,150,122,0.15)", color:C.blush,label:"Reserve Ahead" },
};

// ── CHAT WIDGET ───────────────────────────────────────────────

// ── TABS ──────────────────────────────────────────────────────

function ItineraryTab() {
  return (
    <div>
      <SectionHeader num="01" title="Day by Day" />
      <div style={{ display:"flex", gap:"1.2rem", marginBottom:"1.5rem", padding:"0.9rem 1.2rem", background:C.ivory, border:`1px solid rgba(184,150,74,0.15)`, borderRadius:4, flexWrap:"wrap" }}>
        {Object.entries(WHO_COLORS).map(([k, v]) => (
          <div key={k} style={{ display:"flex", alignItems:"center", gap:"0.4rem", fontSize:"0.78rem" }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:v.color }} />
            <span>{k === "all" ? "All Six" : k === "ec" ? "Eric & Candice" : k === "ae" ? "Allen & Elizabeth" : "Rick & Lynn"}</span>
          </div>
        ))}
      </div>
      {DAYS.map((d, i) => <DayCard key={i} day={d} />)}
    </div>
  );
}

function RestaurantsTab() {
  return (
    <div>
      <SectionHeader num="02" title="Tables & Recommendations" />
      <h3 style={{ fontFamily:"'Playfair Display',serif", fontWeight:400, fontSize:"0.9rem", color:C.muted, marginBottom:"0.8rem", letterSpacing:"0.05em" }}>CONFIRMED RESERVATIONS</h3>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:"0.9rem", marginBottom:"2rem" }}>
        <RestaurantCard type="Dinner · Wed 5/6 · 7 PM" name="Chez Papa" meta="138 Bd du Montparnasse, 75014<br/><strong>Montparnasse Vavin</strong><br/>Classic French brasserie. First night together." badges={[BADGE.reserved]}
          metro={[{ stop: "Vavin", lines: [["4","#009CDA","#fff"]] }, { stop: "Notre-Dame-des-Champs", lines: [["12","#E3051B","#fff"]] }]} />
        <RestaurantCard type="Dinner · Fri 5/8 · 7:30 PM" name="Chez Walczak" meta="Aux Sportifs Réunis<br/>75 Rue Brancion, 75015<br/><strong>€40/pp</strong> incl. food & drink" badges={[BADGE.reserved]}
          metro={[{ stop: "Porte de Vanves", lines: [["13","#9DC9E8","#000"]] }, { stop: "Plaisance", lines: [["13","#9DC9E8","#000"]] }]} />
        <RestaurantCard type="Lunch · Wed 5/13 · Noon" name="L'Atelier Maître Albert" meta="1 Rue Maître Albert, 75005<br/><strong>Near Notre-Dame</strong><br/>Michelin Guide · Recommended by Tomas" badges={[BADGE.reserved, BADGE.michelin]}
          metro={[{ stop: "Maubert-Mutualité", lines: [["10","#6F4C9B","#fff"]] }, { stop: "Cardinal Lemoine", lines: [["10","#6F4C9B","#fff"]] }]} />
      </div>
      <h3 style={{ fontFamily:"'Playfair Display',serif", fontWeight:400, fontSize:"0.9rem", color:C.muted, marginBottom:"0.8rem", letterSpacing:"0.05em" }}>RECOMMENDATIONS TO CONSIDER</h3>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:"0.9rem", marginBottom:"2rem" }}>
        <RestaurantCard type="Fine Dining · Elizabeth/Bruce Rec" name="La Tour d'Argent" meta="<strong>1 Michelin Star · Jacket required</strong><br/>View of the Seine<br/><br/>Also: Rooftop bar 'Le Toit de la Tour' or Lounge 'Bar des Maillets d'Argent'<br/><br/>Groups 4+: contact@tourdargent.com<br/>📞 +33 1 40 46 71 39" badges={[BADGE.michelin, BADGE.tbd]}
          metro={[{ stop: "Cardinal Lemoine", lines: [["10","#6F4C9B","#fff"]] }, { stop: "Pont Marie", lines: [["7","#F0A500","#000"]] }]} />
        <RestaurantCard type="Iconic Bar · Elizabeth Rec" name="Bar Hemingway — The Ritz" meta="The Ritz Paris<br/><strong>Hours: 5:00 PM–Midnight</strong><br/>One of the world's most legendary hotel bars." badges={[BADGE.tbd]}
          metro={[{ stop: "Opéra", lines: [["3","#9F9825","#fff"],["7","#F0A500","#000"],["8","#C897C4","#000"]] }, { stop: "Madeleine", lines: [["8","#C897C4","#000"],["12","#E3051B","#fff"],["14","#62259D","#fff"]] }]} />
        <RestaurantCard type="Tea Room · Sat 5/9 · 4:30 PM" name="Mariage Frères" meta="Salon de Thé<br/>30 Rue Du Bourg Tibourg<br/><strong>Walk-in only</strong>" badges={[BADGE.walkin]}
          metro={[{ stop: "Hôtel de Ville", lines: [["1","#FFBE00","#000"],["11","#8D5E2A","#fff"]] }, { stop: "Rambuteau", lines: [["11","#8D5E2A","#fff"]] }]} />
        <RestaurantCard type="Dinner · Thu 5/7" name="Le Procope" meta="Paris's oldest café-restaurant (est. 1686)<br/>Allen, Elizabeth, Lynn & Rick" badges={[BADGE.tbd]}
          metro={[{ stop: "Odéon", lines: [["4","#009CDA","#fff"],["10","#6F4C9B","#fff"]] }, { stop: "Saint-Germain-des-Prés", lines: [["4","#009CDA","#fff"]] }]} />
      </div>
      <h3 style={{ fontFamily:"'Playfair Display',serif", fontWeight:400, fontSize:"0.9rem", color:C.muted, marginBottom:"0.8rem", letterSpacing:"0.05em" }}>GOURMET SHOPPING</h3>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:"0.9rem" }}>
        <RestaurantCard type="Food Hall · Thu 5/7" name="Le Grande Épicerie" meta="Lower level of Au Bon Marché<br/><strong>Hours: 8:30 AM–9:00 PM</strong><br/>~20 min Uber from Printemps · Perfect for edible souvenirs"
          metro={[{ stop: "Sèvres-Babylone", lines: [["10","#6F4C9B","#fff"],["12","#E3051B","#fff"]] }, { stop: "Rue du Bac", lines: [["12","#E3051B","#fff"]] }]} />
        <RestaurantCard type="Rooftop Bar · Thu 5/7" name="Printemps Haussmann — Perruche" meta="Rooftop bar & terrace<br/><strong>~7 min Uber from the Louvre</strong><br/>Stunning Haussmann rooftop views"
          metro={[{ stop: "Havre-Caumartin", lines: [["3","#9F9825","#fff"],["9","#6ECA97","#000"]] }, { stop: "Saint-Lazare", lines: [["3","#9F9825","#fff"],["12","#E3051B","#fff"],["13","#9DC9E8","#000"],["14","#62259D","#fff"]] }]} />
      </div>
    </div>
  );
}

function ExtrasTab() {
  const card = (title, children) => (
    <div style={{ background:C.ivory, border:`1px solid rgba(184,150,74,0.15)`, borderRadius:4, padding:"1.2rem" }}>
      <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"0.95rem", fontWeight:400, color:C.dark, marginBottom:"0.7rem" }}>{title}</h3>
      {children}
    </div>
  );
  const item = (content) => <div style={{ padding:"0.45rem 0", borderBottom:`1px solid rgba(184,150,74,0.08)`, fontSize:"0.8rem", color:C.charcoal, lineHeight:1.5 }}>{content}</div>;

  return (
    <div>
      <SectionHeader num="03" title="Extras & Tips" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.9rem" }}>
        {card("🚖 Getting Around",
          <>
            {item(<><strong>Uber</strong> — Works just like in the US · <a href="https://m.uber.com" target="_blank" style={{ color:C.gold, fontSize:"0.7rem" }}>m.uber.com →</a></>)}
            {item(<><strong>Bolt</strong> — Often cheaper than Uber in Paris · Download the app first</>)}
            {item(<><strong>FreeNow</strong> — Books official Parisian taxis · Most reliable backup</>)}
            {item(<><strong>G7 Taxi</strong> — For airport runs ✈️<br/><a href="tel:+33141275000" style={{ color:C.gold, fontSize:"0.75rem" }}>📞 +33 1 41 27 50 00</a> · <a href="https://www.g7.fr/en" target="_blank" style={{ color:C.gold, fontSize:"0.7rem" }}>g7.fr →</a></>)}
            {item(<><strong>Métro</strong> — Cheapest, fastest in central Paris · See Métro tab</>)}
            {item(<><strong>Vélib'</strong> — Bike share · 1.7M+ rides/month · App: Vélib' Métropole</>)}
          </>
        )}
        {card("✈️ To/From Airport (CDG)",
          <>
            {item(<><strong>Taxi flat rate:</strong> €56 (Right Bank) · €65 (Left Bank) · 45-60 min</>)}
            {item(<><strong>RER B</strong> — €12 train · 35 min direct from Châtelet · Watch belongings</>)}
            {item(<><strong>G7 Pre-book</strong> — Best for early flights, English drivers available</>)}
            {item(<><strong>Uber Black</strong> — Pre-schedulable, more reliable than UberX for airports</>)}
          </>
        )}
        {card("💳 Money Tips",
          <>
            {item(<><strong>Cards work everywhere</strong> — Apple Pay accepted at most places</>)}
            {item(<><strong>Cash useful for:</strong> Small cafés, markets, taxi tips</>)}
            {item(<><strong>ATMs (DAB)</strong> — Use bank ATMs (BNP, Société Générale) not Euronet</>)}
            {item(<><strong>Always pay in EUR</strong> — Decline "pay in USD" — it's a bad rate</>)}
            {item(<><strong>Tipping</strong> — Service included; round up or 5-10% for great service</>)}
          </>
        )}
        {card("📱 Phone & Wi-Fi",
          <>
            {item(<><strong>eSIM</strong> — Airalo or Holafly · Easiest, set up before leaving</>)}
            {item(<><strong>Free Wi-Fi</strong> — All cafés, museums, métro stations have it</>)}
            {item(<><strong>Verizon/AT&T Travel Pass</strong> — $10/day if you don't want eSIM hassle</>)}
            {item(<><strong>WhatsApp</strong> — How most Parisians text. Use it instead of SMS</>)}
          </>
        )}
        {card("🆘 Emergency Numbers",
          <>
            {item(<><strong>112</strong> — Universal emergency (works on any phone)</>)}
            {item(<><strong>17</strong> — Police</>)}
            {item(<><strong>15</strong> — SAMU (medical/ambulance)</>)}
            {item(<><strong>18</strong> — Pompiers (fire)</>)}
            {item(<><strong>3624</strong> — SOS Médecins (doctor house calls)</>)}
            {item(<><strong>US Embassy Paris:</strong> +33 1 43 12 22 22</>)}
          </>
        )}
        {card("🎭 Cabaret Options",
          <>
            {item(<><strong>Crazy Horse</strong> — Triangle d'Or · <a href="https://www.lecrazyhorseparis.com/en/" target="_blank" style={{ color:C.gold, fontSize:"0.7rem" }}>lecrazyhorseparis.com →</a></>)}
            {item(<><strong>Paradis Latin</strong> — Quartier Latin · <a href="https://www.paradislatin.com/en/" target="_blank" style={{ color:C.gold, fontSize:"0.7rem" }}>paradislatin.com →</a></>)}
            {item(<><strong>Moulin Rouge</strong> — Pigalle · <a href="https://www.moulinrouge.fr" target="_blank" style={{ color:C.gold, fontSize:"0.7rem" }}>moulinrouge.fr →</a></>)}
          </>
        )}
        {card("🕌 La Mosquée de Paris",
          <>
            {item(<><strong>Tea Room / Garden</strong><br/><span style={{ color:C.muted }}>Petit déjeuner, mint tea, pastries, crêpes · 9AM–11:30PM</span></>)}
            {item(<><strong>Restaurant</strong> — Tagine, couscous & more · 11:30AM–10:30PM</>)}
            {item(<><strong>Hammam</strong> — Spa & beauty services for women</>)}
          </>
        )}
        {card("🛒 Shopping Essentials",
          <>
            {item(<><strong>Monoprix</strong> — Grocery, clothes & pharmacy finds</>)}
            {item(<><strong>Pharmacy</strong> — La Roche-Posay, Bioderma, Embryolisse & more</>)}
            {item(<><strong>Picard</strong> — Frozen food only. Surprisingly wonderful, very French.</>)}
          </>
        )}
        {card("💡 Good to Know",
          <>
            {item(<>Mariage Frères: <strong>Walk-in only</strong> — arrive early Sat 4:30PM</>)}
            {item(<>La Tour d'Argent: <strong>Jacket required</strong>. Groups 4+, email or call ahead.</>)}
            {item(<>Bar Hemingway: <strong>5PM–midnight</strong> — perfect pre or post-dinner</>)}
            {item(<>Eric & Candice away <strong>Sun 5/10–Tue 5/12</strong></>)}
            {item(<>Service is included (service compris) — tip a few euros if you'd like</>)}
          </>
        )}
      </div>
      <div style={{ marginTop:"1rem", background:"linear-gradient(135deg,#2d2a24,#1a1710)", border:`1px solid rgba(184,150,74,0.3)`, borderRadius:4, padding:"1.3rem", textAlign:"center" }}>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:"1rem", color:C.goldL }}>🍾 Champagne Region · Sun May 10 – Mon May 11</p>
        <p style={{ marginTop:4, fontSize:"0.8rem", color:"rgba(245,240,232,0.5)" }}>Allen, Elizabeth, Rick & Lynn · A proper bubbly detour</p>
      </div>
    </div>
  );
}

function WeatherTab() {
  return (
    <div>
      <SectionHeader num="04" title="Paris Weather · May 2026" />
      <div style={{ background:C.ivory, border:`1px solid rgba(184,150,74,0.15)`, borderRadius:4, padding:"1.3rem", marginBottom:"1.2rem" }}>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:"1rem", color:C.charcoal, marginBottom:"1rem", lineHeight:1.6 }}>May is one of the loveliest months in Paris — warm but not hot, with long evenings and occasional showers. Pack a light layer and a compact umbrella.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", textAlign:"center" }}>
          {[["Avg High","68°F","20°C"], ["Avg Low","50°F","10°C"], ["Rain Days","~9","in May"]].map(([label, big, small]) => (
            <div key={label}>
              <div style={{ fontSize:"0.6rem", letterSpacing:"0.2em", textTransform:"uppercase", color:C.gold, fontWeight:500 }}>{label}</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"2rem", color:C.dark }}>{big}</div>
              <div style={{ fontSize:"0.72rem", color:C.muted }}>{small}</div>
            </div>
          ))}
        </div>
      </div>
      <h3 style={{ fontFamily:"'Playfair Display',serif", fontWeight:400, fontSize:"0.9rem", color:C.muted, marginBottom:"0.8rem", letterSpacing:"0.05em" }}>YOUR TRIP · DAY-BY-DAY</h3>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(95px,1fr))", gap:"0.6rem", marginBottom:"1.5rem" }}>
        {FORECASTS.map(f => (
          <div key={f.date} style={{ background:C.ivory, border:`1px solid rgba(184,150,74,0.15)`, borderRadius:4, padding:"0.8rem 0.4rem", textAlign:"center" }}>
            <div style={{ fontSize:"0.58rem", letterSpacing:"0.15em", textTransform:"uppercase", color:C.gold, fontWeight:500, marginBottom:3 }}>{f.date}</div>
            <div style={{ fontSize:"1.6rem", marginBottom:2 }}>{f.icon}</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.1rem", color:C.dark }}>{f.hi}°</div>
            <div style={{ fontSize:"0.68rem", color:C.muted }}>{f.lo}° low</div>
            <div style={{ fontSize:"0.64rem", color:C.muted, marginTop:2, lineHeight:1.3 }}>{f.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ background:C.ivory, border:`1px solid rgba(184,150,74,0.15)`, borderRadius:4, padding:"1.2rem", marginBottom:"1rem" }}>
        <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"0.95rem", fontWeight:400, color:C.dark, marginBottom:"0.7rem" }}>🌤 What to Pack</h3>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.4rem" }}>
          {["☂️ Compact umbrella","🧥 Light jacket or blazer","👟 Comfortable walking shoes","🕶️ Sunglasses","👔 Smart attire for dinners","🧣 Light scarf for evenings"].map(i => (
            <div key={i} style={{ fontSize:"0.78rem", color:C.charcoal, padding:"0.35rem 0", borderBottom:`1px solid rgba(184,150,74,0.08)` }}>{i}</div>
          ))}
        </div>
      </div>
      <div style={{ background:"linear-gradient(135deg,#2d2a24,#1a1710)", border:`1px solid rgba(184,150,74,0.3)`, borderRadius:4, padding:"1.1rem", textAlign:"center" }}>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:"0.9rem", color:C.goldL, marginBottom:"0.6rem" }}>Check live forecasts closer to departure</p>
        <div style={{ display:"flex", justifyContent:"center", gap:"1.5rem", flexWrap:"wrap" }}>
          {[["weather.com","https://weather.com/weather/tenday/l/Paris+France"],["Météo France","https://www.meteo.fr"],["AccuWeather","https://www.accuweather.com/en/fr/paris/623/may-weather/623"]].map(([label, url]) => (
            <a key={label} href={url} target="_blank" style={{ fontSize:"0.68rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(245,240,232,0.55)", textDecoration:"none" }}>{label} →</a>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetroTab() {
  return (
    <div>
      <SectionHeader num="05" title="Paris Métro Guide" />
      <div style={{ background:C.ivory, border:`1px solid rgba(184,150,74,0.15)`, borderRadius:4, padding:"1.2rem", marginBottom:"1.2rem" }}>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:"0.95rem", color:C.charcoal, lineHeight:1.6 }}>The Paris Métro has 16 lines, runs 5:30 AM–1:15 AM (until 2:15 AM Fri–Sat). A single ticket (t+) costs €2.15. A Navigo Easy card with 10 tickets saves money. Best apps: <strong>Citymapper</strong> or <strong>Bonjour RATP</strong>.</p>
      </div>
      <h3 style={{ fontFamily:"'Playfair Display',serif", fontWeight:400, fontSize:"0.9rem", color:C.muted, marginBottom:"0.8rem", letterSpacing:"0.05em" }}>KEY LINES FOR YOUR TRIP</h3>
      <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem", marginBottom:"1.5rem" }}>
        {METRO_LINES.map(l => (
          <div key={l.num} style={{ background:C.ivory, border:`1px solid rgba(184,150,74,0.15)`, borderRadius:4, padding:"0.9rem 1rem", display:"flex", gap:"0.8rem", alignItems:"center" }}>
            <div style={{ minWidth:34, height:34, borderRadius:"50%", background:l.color, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:"0.95rem", color:l.text }}>{l.num}</div>
            <div>
              <div style={{ fontWeight:500, fontSize:"0.85rem", color:C.dark }}>{l.name}</div>
              <div style={{ fontSize:"0.74rem", color:C.muted, marginTop:2 }}>{l.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <h3 style={{ fontFamily:"'Playfair Display',serif", fontWeight:400, fontSize:"0.9rem", color:C.muted, marginBottom:"0.8rem", letterSpacing:"0.05em" }}>NEAREST STOPS FOR YOUR VENUES</h3>
      <div style={{ background:C.ivory, border:`1px solid rgba(184,150,74,0.15)`, borderRadius:4, overflow:"hidden", marginBottom:"1rem" }}>
        {METRO_STOPS.map((s, i) => (
          <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr auto", gap:"0.5rem", padding:"0.6rem 1rem", borderBottom: i < METRO_STOPS.length-1 ? `1px solid rgba(184,150,74,0.08)` : "none", alignItems:"center" }}>
            <div style={{ fontSize:"0.78rem", color:C.charcoal }}>{s.venue}</div>
            <div style={{ fontSize:"0.74rem", color:C.muted }}>{s.stop}</div>
            <div style={{ display:"flex", gap:3, flexWrap:"wrap", justifyContent:"flex-end" }}>
              {s.lines.map((l, j) => <span key={j} style={{ background:l.c, color:l.t, padding:"0.12rem 0.45rem", borderRadius:10, fontSize:"0.65rem", fontWeight:700 }}>{l.n}</span>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign:"center", marginTop:"0.8rem" }}>
        <a href="https://www.ratp.fr/en/plans-lignes/metro" target="_blank" style={{ fontSize:"0.72rem", letterSpacing:"0.15em", textTransform:"uppercase", color:C.gold, textDecoration:"none" }}>View Official RATP Métro Map →</a>
      </div>
    </div>
  );
}

function FrenchTab() {
  const [cat, setCat] = useState("all");
  const cats = ["all","essentials","dining","directions","shopping","social"];
  const catLabels = { all:"All", essentials:"Essentials", dining:"Dining", directions:"Getting Around", shopping:"Shopping", social:"Social" };
  const filtered = cat === "all" ? PHRASES : PHRASES.filter(p => p.cat === cat);
  return (
    <div>
      <SectionHeader num="06" title="French 101" />
      <div style={{ background:C.ivory, border:`1px solid rgba(184,150,74,0.15)`, borderRadius:4, padding:"1.1rem", marginBottom:"1.2rem" }}>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:"0.95rem", color:C.charcoal, lineHeight:1.6 }}>The secret to Parisians warming up: always open with <em>"Bonjour"</em> first. Even a few words in French makes all the difference.</p>
      </div>
      <div style={{ display:"flex", gap:"0.4rem", flexWrap:"wrap", marginBottom:"1.2rem" }}>
        {cats.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{ background: cat===c ? C.gold : C.ivory, border:`1px solid ${cat===c ? C.gold : "rgba(184,150,74,0.25)"}`, borderRadius:2, padding:"0.3rem 0.8rem", fontSize:"0.68rem", letterSpacing:"0.1em", textTransform:"uppercase", color: cat===c ? C.dark : C.muted, cursor:"pointer", fontFamily:"'Jost',sans-serif" }}>
            {catLabels[c]}
          </button>
        ))}
      </div>
      <div style={{ background:C.ivory, border:`1px solid rgba(184,150,74,0.15)`, borderRadius:4, overflow:"hidden", marginBottom:"1.2rem" }}>
        {filtered.map((p, i) => (
          <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1.2fr", gap:"0.5rem", padding:"0.65rem 1rem", borderBottom: i < filtered.length-1 ? `1px solid rgba(184,150,74,0.08)` : "none" }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"0.98rem", color:C.dark }}>{p.fr}</div>
            <div style={{ fontSize:"0.72rem", color:C.gold, fontStyle:"italic", paddingTop:2 }}>{p.pron}</div>
            <div style={{ fontSize:"0.76rem", color:C.muted, paddingTop:2 }}>{p.en}</div>
          </div>
        ))}
      </div>
      <div style={{ background:"linear-gradient(135deg,#2d2a24,#1a1710)", border:`1px solid rgba(184,150,74,0.3)`, borderRadius:4, padding:"1.3rem" }}>
        <h3 style={{ fontFamily:"'Playfair Display',serif", fontWeight:400, fontSize:"0.95rem", color:C.goldL, marginBottom:"0.8rem" }}>🇫🇷 Cultural Tips</h3>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.6rem" }}>
          {[
            ["Always say Bonjour first.","Walking into any shop without it is considered rude."],
            ["Tap water is free.","Ask for 'une carafe d'eau' — no need to buy bottled."],
            ["Service is included.","Tipping appreciated but not expected — round up or leave a few euros."],
            ["Lunch is the big meal.","Even Michelin spots offer incredible prix-fixe lunch deals."],
            ["Bisou etiquette.","Two cheek kisses when greeting — left cheek first in Paris."],
            ["Pharmacies = green cross.","Pharmacists give excellent free advice on skincare & more."],
          ].map(([bold, rest]) => (
            <div key={bold} style={{ fontSize:"0.74rem", color:"rgba(245,240,232,0.7)", lineHeight:1.5, padding:"0.45rem", background:"rgba(255,255,255,0.04)", borderRadius:3 }}>
              <strong style={{ color:C.goldL }}>{bold}</strong> {rest}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── PHOTOS TAB ────────────────────────────────────────────────

const ALBUM_URL = "https://www.icloud.com/sharedalbum/#B1zJtdOXmV7jo9";

function PhotosTab() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [authorName, setAuthorName] = useState("");
  const [showNamePicker, setShowNamePicker] = useState(false);
  const [pendingPhoto, setPendingPhoto] = useState(null);
  const fileRef = useRef(null);

  const NAMES = ["Eric","Candice","Allen","Elizabeth","Rick","Lynn"];
  const NAME_COLORS = { Eric:C.sage, Candice:C.sage, Allen:C.sky, Elizabeth:C.sky, Rick:C.blush, Lynn:C.blush };

  // Load photos from storage - fixed key that never changes across deployments
  const PHOTO_KEY = "paris-a-six-2026";

  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get(PHOTO_KEY, true);
        if (result?.value) setPhotos(JSON.parse(result.value));
      } catch(e) {}
      setLoading(false);
    })();
  }, []);

  const savePhotos = async (newPhotos) => {
    try {
      await window.storage.set(PHOTO_KEY, JSON.stringify(newPhotos), true);
    } catch(e) {}
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPendingPhoto(ev.target.result);
      setShowNamePicker(true);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const confirmUpload = async () => {
    if (!pendingPhoto || !authorName) return;
    setUploading(true);
    setShowNamePicker(false);

    // Compress image
    const compressed = await compressImage(pendingPhoto, 400, 0.4);
    const newPhoto = {
      id: Date.now(),
      data: compressed,
      author: authorName,
      date: new Date().toLocaleDateString("en-US", { month:"short", day:"numeric" }),
    };
    const updated = [newPhoto, ...photos];
    setPhotos(updated);
    await savePhotos(updated);
    setPendingPhoto(null);
    setUploading(false);
  };

  const deletePhoto = async (id) => {
    const updated = photos.filter(p => p.id !== id);
    setPhotos(updated);
    await savePhotos(updated);
    setSelected(null);
  };

  const compressImage = (dataUrl, maxWidth, quality) => new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = Math.min(1, maxWidth / img.width);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.src = dataUrl;
  });

  return (
    <div>
      <SectionHeader num="09" title="Group Photos" />

      {/* Header row */}
      <div style={{ display:"flex", gap:"0.7rem", marginBottom:"1.2rem", alignItems:"center" }}>
        <button onClick={() => fileRef.current?.click()} disabled={uploading} style={{
          flex:1, padding:"0.85rem", borderRadius:8, border:"none", cursor:"pointer",
          background:`linear-gradient(135deg, ${C.gold}, ${C.goldL})`,
          fontFamily:"'Jost',sans-serif", fontWeight:500, fontSize:"0.85rem",
          color:C.dark, display:"flex", alignItems:"center", justifyContent:"center", gap:"0.5rem",
          boxShadow:`0 3px 12px rgba(184,150,74,0.35)`,
        }}>
          {uploading ? "⏳ Saving…" : "📷 Add Photo"}
        </button>
        <a href={ALBUM_URL} target="_blank" style={{
          padding:"0.85rem 1rem", borderRadius:8,
          background:C.ivory, border:`1px solid rgba(184,150,74,0.3)`,
          fontFamily:"'Jost',sans-serif", fontSize:"0.78rem", color:C.gold,
          textDecoration:"none", whiteSpace:"nowrap",
        }}>☁️ iCloud</a>
      </div>
      <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handleFileChange} style={{ display:"none" }} />

      {/* Name picker modal */}
      {showNamePicker && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:500, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
          <div style={{ background:C.ivory, borderRadius:"16px 16px 0 0", padding:"1.5rem", width:"100%", maxWidth:500 }}>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontWeight:400, fontSize:"1.1rem", color:C.dark, marginBottom:"0.4rem", textAlign:"center" }}>Who's adding this photo?</h3>
            {pendingPhoto && <img src={pendingPhoto} style={{ width:"100%", height:180, objectFit:"cover", borderRadius:8, marginBottom:"1rem" }} />}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"0.5rem", marginBottom:"1rem" }}>
              {NAMES.map(n => (
                <button key={n} onClick={() => setAuthorName(n)} style={{
                  padding:"0.7rem", borderRadius:8, border:`2px solid ${authorName===n ? NAME_COLORS[n] : "rgba(184,150,74,0.2)"}`,
                  background: authorName===n ? `${NAME_COLORS[n]}22` : C.ivory,
                  fontFamily:"'Jost',sans-serif", fontSize:"0.85rem", cursor:"pointer",
                  color: authorName===n ? NAME_COLORS[n] : C.charcoal, fontWeight: authorName===n ? 500 : 300,
                }}>{n}</button>
              ))}
            </div>
            <div style={{ display:"flex", gap:"0.6rem" }}>
              <button onClick={() => { setShowNamePicker(false); setPendingPhoto(null); setAuthorName(""); }} style={{ flex:1, padding:"0.75rem", borderRadius:8, border:`1px solid rgba(184,150,74,0.3)`, background:"none", cursor:"pointer", color:C.muted, fontFamily:"'Jost',sans-serif" }}>Cancel</button>
              <button onClick={confirmUpload} disabled={!authorName} style={{ flex:2, padding:"0.75rem", borderRadius:8, border:"none", cursor: authorName ? "pointer" : "not-allowed", background: authorName ? `linear-gradient(135deg,${C.gold},${C.goldL})` : "rgba(184,150,74,0.3)", color:C.dark, fontFamily:"'Jost',sans-serif", fontWeight:500 }}>Add to Gallery</button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen viewer */}
      {selected && (
        <div onClick={() => setSelected(null)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.92)", zIndex:500, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"1rem" }}>
          <img src={selected.data} style={{ maxWidth:"100%", maxHeight:"75vh", borderRadius:8, objectFit:"contain" }} onClick={e => e.stopPropagation()} />
          <div style={{ marginTop:"1rem", textAlign:"center" }}>
            <div style={{ color:C.cream, fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem" }}>Added by <strong style={{ color: NAME_COLORS[selected.author] || C.gold }}>{selected.author}</strong> · {selected.date}</div>
          </div>
          <div style={{ display:"flex", gap:"1rem", marginTop:"1rem" }}>
            <button onClick={(e) => { e.stopPropagation(); deletePhoto(selected.id); }} style={{ padding:"0.6rem 1.2rem", borderRadius:8, border:`1px solid rgba(212,150,122,0.4)`, background:"rgba(212,150,122,0.15)", color:C.blush, cursor:"pointer", fontFamily:"'Jost',sans-serif", fontSize:"0.8rem" }}>🗑 Delete</button>
            <button onClick={() => setSelected(null)} style={{ padding:"0.6rem 1.2rem", borderRadius:8, border:`1px solid rgba(184,150,74,0.3)`, background:"rgba(184,150,74,0.1)", color:C.gold, cursor:"pointer", fontFamily:"'Jost',sans-serif", fontSize:"0.8rem" }}>✕ Close</button>
          </div>
        </div>
      )}

      {/* Gallery grid */}
      {loading ? (
        <div style={{ textAlign:"center", padding:"3rem", color:C.muted, fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic" }}>Loading photos…</div>
      ) : photos.length === 0 ? (
        <div style={{ textAlign:"center", padding:"3rem 1rem", background:C.ivory, borderRadius:8, border:`1px solid rgba(184,150,74,0.15)` }}>
          <div style={{ fontSize:"3rem", marginBottom:"0.8rem" }}>📷</div>
          <p style={{ fontFamily:"'Playfair Display',serif", fontWeight:400, fontSize:"1.1rem", color:C.dark, marginBottom:"0.4rem" }}>No photos yet</p>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:"0.9rem", color:C.muted }}>Be the first to add a photo!</p>
        </div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"0.4rem" }}>
          {photos.map(p => (
            <div key={p.id} onClick={() => setSelected(p)} style={{ position:"relative", aspectRatio:"1", borderRadius:6, overflow:"hidden", cursor:"pointer" }}>
              <img src={p.data} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"0.3rem 0.4rem", background:"linear-gradient(transparent, rgba(0,0,0,0.6))" }}>
                <span style={{ fontSize:"0.6rem", color:"white", fontWeight:500 }}>{p.author}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop:"1rem", textAlign:"center", fontSize:"0.7rem", color:C.muted, fontStyle:"italic" }}>
        Photos are shared across all devices · Tap to view full size
      </div>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────

const CONTACTS = [
  { couple: "Eric & Candice", color: C.sage, people: [
    { name: "Eric Bernon",     phone: "(202) 802-5940", tel: "+12028025940" },
    { name: "Candice Dunston", phone: "(202) 431-7216", tel: "+12024317216" },
  ]},
  { couple: "Allen & Elizabeth", color: C.sky, people: [
    { name: "Allen Griffey",   phone: "(540) 379-9437", tel: "+15403799437" },
    { name: "Elizabeth",       phone: "(540) 846-4699", tel: "+15408464699" },
  ]},
  { couple: "Rick & Lynn", color: C.blush, people: [
    { name: "Rick Furnival",   phone: "(540) 229-5011", tel: "+15402295011" },
    { name: "Lynn Furnival",   phone: "(540) 229-3273", tel: "+15402293273" },
  ]},
];

function ContactsTab() {
  return (
    <div>
      <SectionHeader num="07" title="Group Contacts" />

      <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
        {CONTACTS.map(group => (
          <div key={group.couple} style={{ background:C.ivory, border:`1px solid rgba(184,150,74,0.15)`, borderRadius:4, overflow:"hidden" }}>
            {/* Couple header */}
            <div style={{ padding:"0.65rem 1.2rem", background:`rgba(184,150,74,0.06)`, borderBottom:`1px solid rgba(184,150,74,0.1)`, display:"flex", alignItems:"center", gap:"0.6rem" }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:group.color, flexShrink:0 }} />
              <span style={{ fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase", color:group.color, fontWeight:500 }}>{group.couple}</span>
            </div>

            {/* People */}
            {group.people.map((p, i) => (
              <div key={p.name} style={{ padding:"1rem 1.2rem", borderBottom: i < group.people.length-1 ? `1px solid rgba(184,150,74,0.08)` : "none" }}>
                {/* Name + number row */}
                <div style={{ display:"flex", alignItems:"center", gap:"0.8rem", marginBottom:"0.75rem" }}>
                  <div style={{ width:42, height:42, borderRadius:"50%", background:`linear-gradient(135deg, ${group.color}33, ${group.color}55)`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, border:`1px solid ${group.color}44` }}>
                    <span style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.1rem", color:group.color }}>{p.name[0]}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.05rem", color:C.dark }}>{p.name}</div>
                    <div style={{ fontSize:"0.8rem", color:C.muted, marginTop:1 }}>{p.phone}</div>
                  </div>
                </div>

                {/* Big tap-friendly buttons */}
                <div style={{ display:"flex", gap:"0.6rem" }}>
                  <a href={`tel:${p.tel}`} style={{
                    flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:"0.5rem",
                    padding:"0.75rem",
                    background:`linear-gradient(135deg, ${C.gold}, ${C.goldL})`,
                    borderRadius:8, textDecoration:"none",
                    boxShadow:`0 3px 12px rgba(184,150,74,0.35)`,
                  }}>
                    <span style={{ fontSize:"1.1rem" }}>📞</span>
                    <span style={{ fontSize:"0.8rem", fontWeight:500, color:C.dark, letterSpacing:"0.05em" }}>Call</span>
                  </a>
                  <a href={`sms:${p.tel}`} style={{
                    flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:"0.5rem",
                    padding:"0.75rem",
                    background:"rgba(184,150,74,0.1)",
                    border:`1px solid rgba(184,150,74,0.3)`,
                    borderRadius:8, textDecoration:"none",
                  }}>
                    <span style={{ fontSize:"1.1rem" }}>💬</span>
                    <span style={{ fontSize:"0.8rem", fontWeight:500, color:C.gold, letterSpacing:"0.05em" }}>Text</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Emergency / useful numbers */}
      <div style={{ marginTop:"1.5rem", background:"linear-gradient(135deg,#2d2a24,#1a1710)", border:`1px solid rgba(184,150,74,0.3)`, borderRadius:4, padding:"1.3rem" }}>
        <h3 style={{ fontFamily:"'Playfair Display',serif", fontWeight:400, fontSize:"0.95rem", color:C.goldL, marginBottom:"0.9rem" }}>🇫🇷 Useful Paris Numbers</h3>
        <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem" }}>
          {[
            { label:"Emergency (Police/Fire/Ambulance)", num:"112", tel:"112" },
            { label:"Police", num:"17", tel:"17" },
            { label:"SAMU (Medical Emergency)", num:"15", tel:"15" },
            { label:"La Tour d'Argent", num:"+33 1 40 46 71 39", tel:"+33140467139" },
          ].map(r => (
            <a key={r.label} href={`tel:${r.tel}`} style={{
              display:"flex", alignItems:"center", justifyContent:"space-between",
              padding:"0.75rem 0.9rem",
              background:"rgba(255,255,255,0.04)",
              borderRadius:6, textDecoration:"none",
              border:`1px solid rgba(184,150,74,0.1)`,
              marginBottom:"0.3rem",
            }}>
              <span style={{ fontSize:"0.78rem", color:"rgba(245,240,232,0.65)" }}>{r.label}</span>
              <span style={{ fontSize:"0.82rem", color:C.gold, fontWeight:500 }}>{r.num} 📞</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── MAP TAB ───────────────────────────────────────────────────

const VENUES = [
  { name:"Eric & Candice's Apartment",      emoji:"🏠", lat:48.8316, lng:2.2998, note:"5 bis Rue Chauvelot, 75015", stay:"ec" },
  { name:"Hôtel Duminy Vendôme",            emoji:"🏨", lat:48.8676, lng:2.3273, note:"Allen, Elizabeth, Rick & Lynn", stay:"others" },
  { name:"Eugénie & Diego",                emoji:"👋", lat:48.8208, lng:2.3411, note:"53 Rue de l'Amiral Mouchez, 75013 · Dinner Tue 5/12", stay:"friends" },
  { name:"Rémi & Cécile",                  emoji:"👋", lat:48.8941, lng:2.1349, note:"22 Ter Avenue de Lorraine, Le Vésinet · Lunch Fri 5/8", stay:"friends" },
  { name:"Chez Papa",               emoji:"🍽️", lat:48.8421, lng:2.3271, note:"Dinner Wed 5/6 · 7PM" },
  { name:"The Louvre",              emoji:"🏛️", lat:48.8606, lng:2.3376, note:"Thu 5/7 · 11AM" },
  { name:"Printemps Haussmann",     emoji:"🥂", lat:48.8753, lng:2.3308, note:"Rooftop bar Thu 5/7" },
  { name:"Le Grande Épicerie",      emoji:"🧺", lat:48.8511, lng:2.3224, note:"Food hall Thu 5/7" },
  { name:"Le Procope",              emoji:"🍽️", lat:48.8529, lng:2.3397, note:"Dinner Thu 5/7" },
  { name:"Musée d'Orsay",           emoji:"🎨", lat:48.8600, lng:2.3266, note:"Fri 5/8 · 10:30AM" },
  { name:"Chez Walczak",            emoji:"🍽️", lat:48.8373, lng:2.3085, note:"Dinner Fri 5/8 · 7:30PM" },
  { name:"Sacré-Cœur",              emoji:"⛪", lat:48.8867, lng:2.3431, note:"Sat 5/9 · 9:30AM" },
  { name:"Le Marais",               emoji:"🛍️", lat:48.8566, lng:2.3572, note:"Afternoon Sat 5/9" },
  { name:"Mariage Frères",          emoji:"🫖", lat:48.8553, lng:2.3541, note:"Tea Sat 5/9 · 4:30PM" },
  { name:"Notre-Dame",              emoji:"⛪", lat:48.8530, lng:2.3499, note:"Morning Wed 5/13" },
  { name:"L'Atelier Maître Albert", emoji:"⭐", lat:48.8519, lng:2.3511, note:"Lunch Wed 5/13 · Noon" },
  { name:"Bar Hemingway · The Ritz",emoji:"🍸", lat:48.8688, lng:2.3308, note:"5PM–Midnight" },
  { name:"La Tour d'Argent",        emoji:"⭐", lat:48.8510, lng:2.3519, note:"1 Michelin Star" },
  { name:"Moulin Rouge",            emoji:"🎭", lat:48.8841, lng:2.3323, note:"Cabaret · Pigalle" },
  { name:"La Mosquée de Paris",     emoji:"🕌", lat:48.8441, lng:2.3536, note:"Tea room & hammam" },
];

function MapTab() {
  const [userPos, setUserPos] = useState(null);
  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const mapRef = useRef(null);
  const mapObj = useRef(null);
  const markersRef = useRef([]);

  // Paris center
  const PARIS = { lat: 48.8566, lng: 2.3522 };

  const getLocation = () => {
    if (!navigator.geolocation) { setError("Geolocation not supported on this device."); return; }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      pos => {
        setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLoading(false);
        if (mapObj.current) {
          mapObj.current.setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          mapObj.current.setZoom(14);
        }
      },
      err => {
        setLoading(false);
        setError("Could not get location. Please allow location access and try again.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    if (mapObj.current || !mapRef.current) return;

    // Load Google Maps
    const existingScript = document.getElementById('gmaps-script');
    const initMap = () => {
      if (!window.google || !mapRef.current) return;
      const map = new window.google.maps.Map(mapRef.current, {
        center: PARIS,
        zoom: 13,
        styles: [
          { elementType:"geometry", stylers:[{ color:"#f5f0e8" }] },
          { elementType:"labels.text.fill", stylers:[{ color:"#2d2a24" }] },
          { featureType:"water", elementType:"geometry", stylers:[{ color:"#b8d4e8" }] },
          { featureType:"road", elementType:"geometry", stylers:[{ color:"#ffffff" }] },
          { featureType:"road.arterial", elementType:"geometry", stylers:[{ color:"#faf7f2" }] },
          { featureType:"park", elementType:"geometry", stylers:[{ color:"#d4e8d0" }] },
          { featureType:"poi", stylers:[{ visibility:"off" }] },
          { featureType:"transit", stylers:[{ visibility:"off" }] },
        ],
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
      });
      mapObj.current = map;

      // Add venue markers
      VENUES.forEach(v => {
        const marker = new window.google.maps.Marker({
          position: { lat: v.lat, lng: v.lng },
          map,
          title: v.name,
          label: { text: v.emoji, fontSize: "18px" },
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 18,
            fillColor: "#faf7f2",
            fillOpacity: 1,
            strokeColor: "#b8964a",
            strokeWeight: 2,
          },
        });
        marker.addListener("click", () => setSelected(v));
        markersRef.current.push(marker);
      });
    };

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'gmaps-script';
      // Using OpenStreetMap via Leaflet instead (no API key needed)
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
      script.onload = () => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
        document.head.appendChild(link);
        initLeaflet();
      };
      document.head.appendChild(script);
    } else {
      initLeaflet();
    }

    function initLeaflet() {
      if (!window.L || !mapRef.current || mapObj.current) return;
      const map = window.L.map(mapRef.current, { zoomControl: true }).setView([PARIS.lat, PARIS.lng], 13);
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);
      mapObj.current = map;

      // Venue markers
      VENUES.forEach(v => {
        // Accommodations and friends get larger markers with couple-colored borders
        const isStay = !!v.stay;
        const borderColor = v.stay === "ec" ? "#7a9478" : v.stay === "others" ? "#6a8fa8" : v.stay === "friends" ? "#d4967a" : "#b8964a";
        const size = isStay ? 44 : 36;
        const fontSize = isStay ? 20 : 16;
        const borderWidth = isStay ? 3 : 2;
        const ringHTML = isStay ? `box-shadow:0 0 0 4px ${borderColor}33, 0 2px 8px rgba(0,0,0,0.25);` : "box-shadow:0 2px 6px rgba(0,0,0,0.2);";

        const icon = window.L.divIcon({
          html: `<div style="background:#faf7f2;border:${borderWidth}px solid ${borderColor};border-radius:50%;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;font-size:${fontSize}px;${ringHTML}">${v.emoji}</div>`,
          className: '',
          iconSize: [size, size],
          iconAnchor: [size/2, size/2],
        });
        const marker = window.L.marker([v.lat, v.lng], { icon })
          .addTo(map)
          .bindPopup(`<strong>${v.name}</strong><br/><span style="font-size:0.8rem;color:#7a7468">${v.note}</span>`);
        marker.on('click', () => setSelected(v));
      });
    }
  }, []);

  // Add/update user location marker
  useEffect(() => {
    if (!userPos || !mapObj.current || !window.L) return;
    const icon = window.L.divIcon({
      html: `<div style="background:#b8964a;border:3px solid white;border-radius:50%;width:20px;height:20px;box-shadow:0 0 0 4px rgba(184,150,74,0.3)"></div>`,
      className: '',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
    window.L.marker([userPos.lat, userPos.lng], { icon })
      .addTo(mapObj.current)
      .bindPopup("<strong>📍 You are here</strong>");
    mapObj.current.setView([userPos.lat, userPos.lng], 15);
  }, [userPos]);

  return (
    <div>
      <SectionHeader num="08" title="Paris Map" />

      {/* Controls */}
      <div style={{ display:"flex", gap:"0.7rem", marginBottom:"1rem", flexWrap:"wrap" }}>
        <button onClick={getLocation} disabled={loading} style={{
          flex:1, padding:"0.8rem 1rem",
          background: loading ? "rgba(184,150,74,0.3)" : `linear-gradient(135deg, ${C.gold}, ${C.goldL})`,
          border:"none", borderRadius:8, cursor: loading ? "wait" : "pointer",
          fontFamily:"'Jost',sans-serif", fontSize:"0.82rem", fontWeight:500,
          color: C.dark, display:"flex", alignItems:"center", justifyContent:"center", gap:"0.5rem",
          boxShadow:"0 3px 12px rgba(184,150,74,0.3)",
        }}>
          {loading ? "📡 Getting location…" : userPos ? "📍 Update My Location" : "📍 Show My Location"}
        </button>
        {userPos && (
          <button onClick={() => mapObj.current?.setView([userPos.lat, userPos.lng], 15)} style={{
            padding:"0.8rem 1rem", background:C.ivory,
            border:`1px solid rgba(184,150,74,0.3)`, borderRadius:8, cursor:"pointer",
            fontFamily:"'Jost',sans-serif", fontSize:"0.82rem", color:C.gold,
          }}>🎯 Center on Me</button>
        )}
        <button onClick={() => mapObj.current?.setView([PARIS.lat, PARIS.lng], 13)} style={{
          padding:"0.8rem 1rem", background:C.ivory,
          border:`1px solid rgba(184,150,74,0.3)`, borderRadius:8, cursor:"pointer",
          fontFamily:"'Jost',sans-serif", fontSize:"0.82rem", color:C.gold,
        }}>🗺️ All Paris</button>
      </div>

      {error && (
        <div style={{ background:"rgba(212,150,122,0.15)", border:`1px solid rgba(212,150,122,0.3)`, borderRadius:8, padding:"0.8rem 1rem", marginBottom:"1rem", fontSize:"0.8rem", color:C.blush }}>{error}</div>
      )}

      {/* Selected venue info */}
      {selected && (
        <div style={{ background:C.ivory, border:`1px solid rgba(184,150,74,0.25)`, borderRadius:8, padding:"0.9rem 1rem", marginBottom:"0.8rem", display:"flex", alignItems:"center", gap:"0.8rem" }}>
          <span style={{ fontSize:"1.4rem" }}>{selected.emoji}</span>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", color:C.dark }}>{selected.name}</div>
            <div style={{ fontSize:"0.75rem", color:C.muted }}>{selected.note}</div>
          </div>
          <a href={`https://maps.apple.com/?q=${encodeURIComponent(selected.name)}&ll=${selected.lat},${selected.lng}`}
            target="_blank"
            style={{ padding:"0.45rem 0.8rem", background:`linear-gradient(135deg,${C.gold},${C.goldL})`, borderRadius:6, textDecoration:"none", fontSize:"0.72rem", color:C.dark, fontWeight:500, whiteSpace:"nowrap" }}>
            Open in Maps →
          </a>
          <button onClick={() => setSelected(null)} style={{ background:"none", border:"none", cursor:"pointer", color:C.muted, fontSize:"1rem", padding:"0.2rem" }}>✕</button>
        </div>
      )}

      {/* Map */}
      <div ref={mapRef} style={{ width:"100%", height:480, borderRadius:8, border:`1px solid rgba(184,150,74,0.2)`, overflow:"hidden", background:"#e8e0d5" }} />

      {/* Venue legend */}
      <div style={{ marginTop:"1rem", background:C.ivory, border:`1px solid rgba(184,150,74,0.15)`, borderRadius:4, padding:"1rem 1.2rem" }}>
        <div style={{ fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase", color:C.gold, fontWeight:500, marginBottom:"0.7rem" }}>All Venues on Map</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.4rem" }}>
          {VENUES.map(v => (
            <button key={v.name} onClick={() => { setSelected(v); mapObj.current?.setView([v.lat, v.lng], 16); }}
              style={{ display:"flex", alignItems:"center", gap:"0.4rem", padding:"0.4rem 0.5rem", background:"none", border:`1px solid rgba(184,150,74,0.1)`, borderRadius:4, cursor:"pointer", textAlign:"left" }}>
              <span style={{ fontSize:"0.9rem" }}>{v.emoji}</span>
              <span style={{ fontSize:"0.72rem", color:C.charcoal, lineHeight:1.3 }}>{v.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── SPLASH SCREEN ─────────────────────────────────────────────

function SplashScreen() {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1800);
    const hideTimer = setTimeout(() => setShow(false), 2400);
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, []);

  if (!show) return null;

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:9999,
      background:"#faf7f2",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      opacity: fadeOut ? 0 : 1,
      transition:"opacity 0.6s ease",
      pointerEvents: fadeOut ? "none" : "auto",
    }}>
      <img
        src="/logo.jpg"
        alt="Paris à Six"
        style={{
          width: 280, height: 280,
          objectFit: "contain",
          animation: "logoIn 1.2s cubic-bezier(.34,1.56,.64,1) both",
        }}
      />
    </div>
  );
}

// ── INSTALL PROMPT ────────────────────────────────────────────

function InstallPrompt() {
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
    if (isStandalone) return;
    try { if (localStorage.getItem("install-prompt-dismissed")) return; } catch(e) {}
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(ios);
    const t = setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setShow(false);
    try { localStorage.setItem("install-prompt-dismissed", "1"); } catch(e) {}
  };

  if (!show) return null;

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", zIndex:1000, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
      <div style={{ background:C.ivory, borderRadius:"20px 20px 0 0", width:"100%", maxWidth:500, padding:"1.5rem", animation:"slideUp 0.35s cubic-bezier(.34,1.56,.64,1) both" }}>
        <div style={{ width:40, height:4, background:"rgba(184,150,74,0.3)", borderRadius:2, margin:"0 auto 1.2rem" }} />
        <div style={{ textAlign:"center", marginBottom:"1.2rem" }}>
          <div style={{ fontSize:"3rem", marginBottom:"0.5rem" }}>🗼</div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:400, fontSize:"1.4rem", color:C.dark, marginBottom:"0.4rem" }}>Add to Home Screen</h2>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:"0.95rem", color:C.muted }}>Get Paris à Six on your home screen for one-tap access</p>
        </div>
        {isIOS ? (
          <div style={{ background:"rgba(184,150,74,0.06)", border:`1px solid rgba(184,150,74,0.2)`, borderRadius:8, padding:"1rem", marginBottom:"1rem" }}>
            <div style={{ fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase", color:C.gold, fontWeight:500, marginBottom:"0.7rem" }}>iPhone Instructions</div>
            {[
              { num:"1", icon:"⬆️", text:"Tap the Share button at the bottom of Safari" },
              { num:"2", icon:"➕", text:'Scroll down and tap "Add to Home Screen"' },
              { num:"3", icon:"✓", text:'Tap "Add" in the top right' },
            ].map((s, i, arr) => (
              <div key={s.num} style={{ display:"flex", alignItems:"center", gap:"0.8rem", padding:"0.6rem 0", borderBottom: i < arr.length-1 ? `1px solid rgba(184,150,74,0.1)` : "none" }}>
                <div style={{ width:26, height:26, borderRadius:"50%", background:`linear-gradient(135deg,${C.gold},${C.goldL})`, display:"flex", alignItems:"center", justifyContent:"center", color:C.dark, fontSize:"0.75rem", fontWeight:600, flexShrink:0 }}>{s.num}</div>
                <span style={{ fontSize:"1.1rem" }}>{s.icon}</span>
                <span style={{ fontSize:"0.82rem", color:C.charcoal, flex:1 }}>{s.text}</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background:"rgba(184,150,74,0.06)", border:`1px solid rgba(184,150,74,0.2)`, borderRadius:8, padding:"1rem", marginBottom:"1rem" }}>
            <div style={{ fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase", color:C.gold, fontWeight:500, marginBottom:"0.7rem" }}>Android Instructions</div>
            {[
              { num:"1", text:"Tap the menu (⋮) in your browser" },
              { num:"2", text:'Tap "Add to Home screen" or "Install app"' },
              { num:"3", text:'Tap "Add" or "Install" to confirm' },
            ].map((s, i, arr) => (
              <div key={s.num} style={{ display:"flex", alignItems:"center", gap:"0.8rem", padding:"0.6rem 0", borderBottom: i < arr.length-1 ? `1px solid rgba(184,150,74,0.1)` : "none" }}>
                <div style={{ width:26, height:26, borderRadius:"50%", background:`linear-gradient(135deg,${C.gold},${C.goldL})`, display:"flex", alignItems:"center", justifyContent:"center", color:C.dark, fontSize:"0.75rem", fontWeight:600, flexShrink:0 }}>{s.num}</div>
                <span style={{ fontSize:"0.82rem", color:C.charcoal, flex:1 }}>{s.text}</span>
              </div>
            ))}
          </div>
        )}
        <button onClick={dismiss} style={{ width:"100%", padding:"0.85rem", borderRadius:8, border:"none", cursor:"pointer", background:`linear-gradient(135deg,${C.gold},${C.goldL})`, fontFamily:"'Jost',sans-serif", fontWeight:500, fontSize:"0.9rem", color:C.dark }}>Got it!</button>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("itinerary");
  const TABS = [
    { id:"itinerary",   label:"Itinerary",   icon:"📅" },
    { id:"restaurants", label:"Restaurants", icon:"🍽️" },
    { id:"extras",      label:"Extras",      icon:"✨" },
    { id:"weather",     label:"Weather",     icon:"🌤" },
    { id:"metro",       label:"Métro",       icon:"🚇" },
    { id:"french",      label:"French",      icon:"🇫🇷" },
    { id:"contacts",    label:"Contacts",    icon:"📞" },
    { id:"map",         label:"Map",         icon:"🗺️" },
    { id:"photos",      label:"Photos",      icon:"📸" },
  ];

  return (
    <div style={{ fontFamily:"'Jost',sans-serif", background:C.cream, minHeight:"100vh" }}>
      <style>{gf}</style>

      <SplashScreen />
      <InstallPrompt />

      {/* HERO - compact */}
      <div style={{ background:`linear-gradient(135deg, #2d2a24 0%, #1a1710 100%)`, padding:"2.5rem 1.5rem 2rem", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse at 50% 0%, rgba(184,150,74,0.18) 0%, transparent 70%)` }} />
        <p style={{ fontSize:"0.65rem", letterSpacing:"0.4em", textTransform:"uppercase", color:C.gold, marginBottom:"0.6rem", position:"relative" }}>May 2026</p>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"2.8rem", fontWeight:400, color:C.cream, lineHeight:1.1, position:"relative" }}>
          Paris <em style={{ fontStyle:"italic", color:C.goldL }}>à Six</em>
        </h1>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:"0.95rem", color:"rgba(245,240,232,0.55)", marginTop:"0.5rem", position:"relative" }}>Six friends · The City of Light · Joie de vivre</p>
        <div style={{ display:"flex", gap:"0.6rem", marginTop:"1rem", justifyContent:"center", flexWrap:"wrap", position:"relative" }}>
          {[{name:"Eric & Candice", color:C.sage},{name:"Allen & Elizabeth", color:C.sky},{name:"Rick & Lynn", color:C.blush}].map(c => (
            <div key={c.name} style={{ fontSize:"0.72rem", color:"rgba(245,240,232,0.7)", border:`1px solid ${c.color}55`, background:`${c.color}15`, padding:"0.25rem 0.75rem", borderRadius:20 }}>{c.name}</div>
          ))}
        </div>
      </div>

      {/* NAV */}
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(250,247,242,0.97)", backdropFilter:"blur(10px)", borderBottom:`1px solid rgba(184,150,74,0.2)` }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(3,1fr)" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              background:"none", border:"none", cursor:"pointer",
              padding:"0.6rem 0.3rem",
              display:"flex", flexDirection:"column", alignItems:"center", gap:"0.2rem",
              borderBottom: tab===t.id ? `2px solid ${C.gold}` : "2px solid transparent",
              transition:"all 0.2s",
            }}>
              <span style={{ fontSize:"1.1rem", lineHeight:1 }}>{t.icon}</span>
              <span style={{
                fontFamily:"'Jost',sans-serif", fontWeight: tab===t.id ? 500 : 300,
                fontSize:"0.6rem", letterSpacing:"0.08em", textTransform:"uppercase",
                color: tab===t.id ? C.gold : C.muted,
                transition:"color 0.2s",
              }}>{t.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* CONTENT */}
      <div style={{ maxWidth:900, margin:"0 auto", padding:"2.5rem 1.2rem 7rem" }}>
        {tab === "itinerary"   && <ItineraryTab />}
        {tab === "restaurants" && <RestaurantsTab />}
        {tab === "extras"      && <ExtrasTab />}
        {tab === "weather"     && <WeatherTab />}
        {tab === "metro"       && <MetroTab />}
        {tab === "french"      && <FrenchTab />}
        {tab === "contacts"    && <ContactsTab />}
        {tab === "map"         && <MapTab />}
        {tab === "photos"      && <PhotosTab />}
      </div>
    </div>
  );
}
