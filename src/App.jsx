import React, { useState, useEffect, useRef } from "react";
import {
  Menu, X, Heart, GraduationCap, Stethoscope, Briefcase, LifeBuoy,
  Users, Leaf, ArrowRight, ArrowUpRight, ShieldCheck, FileText,
  Scale, Landmark, ChevronRight, MapPin, Mail, Phone, Facebook,
  Instagram, Linkedin, Youtube, CheckCircle2, Target
} from "lucide-react";

/* ============================================================
   DESIGN TOKENS
   Palette: forest #0F3D2E (primary), ink #1C1B18 (charcoal text),
   parchment #FAF5EA (warm off-white), paper #FFFFFF, gold #C7973E
   (amber accent), moss #DCE7DD (soft tint for cards/borders)
   Type: "Fraunces" (display serif, editorial/humanitarian warmth)
   + "Public Sans" (body, clean & legible) + "IBM Plex Mono" (data/eyebrows)
   Signature element: the "Ledger" — a hand-ruled accountability strip
   (thin gold rule + serif numerals) that recurs across impact figures,
   the process steps and transparency page, standing in for the NGO's
   promise to account for every taka and every outcome.
   ============================================================ */

const C = {
  forest: "#0F3D2E",
  forestDeep: "#0A2C21",
  ink: "#1C1B18",
  parchment: "#FAF5EA",
  paper: "#FFFFFF",
  gold: "#C7973E",
  goldSoft: "#E7D3A6",
  moss: "#DCE7DD",
  mossLine: "#BFD3C4",
  inkSoft: "#5B5A54",
};

function useFonts() {
  useEffect(() => {
    if (document.getElementById("mira-fonts")) return;
    const link = document.createElement("link");
    link.id = "mira-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Public+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);
}

const display = { fontFamily: "'Fraunces', serif" };
const body = { fontFamily: "'Public Sans', sans-serif" };
const mono = { fontFamily: "'IBM Plex Mono', monospace" };

/* ============================================================
   SMALL UTILITIES
   ============================================================ */

function Eyebrow({ children, dark }) {
  return (
    <div
      className="inline-flex items-center gap-2 mb-4"
      style={{ ...mono, fontSize: "12px", letterSpacing: "0.14em", color: dark ? C.goldSoft : C.gold, textTransform: "uppercase" }}
    >
      <span style={{ width: 22, height: 1, background: dark ? C.goldSoft : C.gold, display: "inline-block" }} />
      {children}
    </div>
  );
}

function SectionHeader({ eyebrow, title, sub, dark, align = "left" }) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} mb-12`}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2
        style={{ ...display, color: dark ? C.paper : C.ink, fontWeight: 500, lineHeight: 1.12 }}
        className="text-3xl sm:text-4xl md:text-[42px]"
      >
        {title}
      </h2>
      {sub && (
        <p style={{ ...body, color: dark ? "rgba(255,255,255,0.72)" : C.inkSoft }} className="mt-4 text-base sm:text-lg leading-relaxed">
          {sub}
        </p>
      )}
    </div>
  );
}

function GoldButton({ children, onClick, icon = true }) {
  return (
    <button
      onClick={onClick}
      style={{ background: C.gold, color: C.forestDeep, ...body }}
      className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
    >
      {children}
      {icon && <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />}
    </button>
  );
}

function GhostButton({ children, onClick, dark }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...body,
        color: dark ? C.paper : C.forest,
        borderColor: dark ? "rgba(255,255,255,0.4)" : C.forest,
      }}
      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm tracking-wide border transition-colors duration-200 hover:bg-black/5"
    >
      {children}
      <ChevronRight size={16} />
    </button>
  );
}

function Tag({ children }) {
  return (
    <span
      style={{ ...mono, color: C.forest, background: C.moss, fontSize: "11px", letterSpacing: "0.08em" }}
      className="inline-block px-2.5 py-1 rounded-full uppercase"
    >
      {children}
    </span>
  );
}

/* Reveal on scroll */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setShown(true)),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0px)" : "translateY(18px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* Animated counter */
function Counter({ to, suffix = "", label, sub }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            setStarted(true);
            const dur = 1400;
            const t0 = performance.now();
            const step = (t) => {
              const p = Math.min(1, (t - t0) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(Math.floor(eased * to));
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, started]);
  return (
    <div ref={ref} className="text-center px-3 py-2">
      <div style={{ ...display, color: C.paper, fontWeight: 500 }} className="text-4xl sm:text-5xl">
        {val.toLocaleString()}
        <span style={{ color: C.gold }}>{suffix}</span>
      </div>
      <div style={{ ...mono, color: "rgba(255,255,255,0.65)", fontSize: "11px", letterSpacing: "0.1em" }} className="mt-2 uppercase">
        {label}
      </div>
      {sub && (
        <div style={{ ...mono, color: C.gold, fontSize: "10px", letterSpacing: "0.1em" }} className="mt-1 uppercase">
          {sub}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   DATA
   ============================================================ */

const PROGRAMS = [
  {
    key: "education",
    icon: GraduationCap,
    title: "Education",
    blurb: "Scholarships, school supplies, digital education, vocational learning and career development.",
    detail:
      "We work to keep disadvantaged children and young people in school and moving toward a livelihood — through scholarships, learning materials, digital literacy sessions and guidance into vocational or higher study paths.",
    cta: "Explore Education",
  },
  {
    key: "healthcare",
    icon: Stethoscope,
    title: "Healthcare",
    blurb: "Medical camps, health awareness, screening and healthcare support.",
    detail:
      "Free medical camps, preventive health awareness sessions and basic screening bring care to communities that otherwise travel far, or go without, for a doctor's attention.",
    cta: "Explore Healthcare",
  },
  {
    key: "livelihoods",
    icon: Briefcase,
    title: "Livelihoods",
    blurb: "Skills training, employment pathways, entrepreneurship and income-generation programs.",
    detail:
      "Practical, market-linked skills training paired with pathways into employment or small enterprise — designed around what local employers actually need.",
    cta: "Explore Livelihoods",
  },
  {
    key: "relief",
    icon: LifeBuoy,
    title: "Humanitarian Relief",
    blurb: "Emergency food, water, clothing, disaster response and rehabilitation.",
    detail:
      "Rapid response to flood, cyclone and other emergencies — food, safe water, clothing and shelter support — followed by longer rehabilitation assistance.",
    cta: "Explore Relief",
  },
  {
    key: "social",
    icon: Users,
    title: "Social Protection",
    blurb: "Support for vulnerable families, elderly people, children, women and people with disabilities.",
    detail:
      "Targeted support for those most at risk of being left behind — elderly people, women, children and people with disabilities — through direct assistance and referral to services.",
    cta: "Explore Social Support",
  },
  {
    key: "environment",
    icon: Leaf,
    title: "Environment",
    blurb: "Tree plantation, waste management, recycling awareness, clean communities and climate action.",
    detail:
      "Community-led tree plantation, waste management and recycling awareness campaigns that build cleaner neighborhoods and local climate resilience.",
    cta: "Explore Environment",
  },
];

const PROJECTS = [
  {
    title: "Mira Scholarship Program",
    target: "Target: 100 students",
    desc: "Help disadvantaged students continue their education.",
    tag: "Education · 2026 Target",
  },
  {
    title: "Mira Skills & Employment Program",
    target: "Target: 500 trainees",
    desc: "Training → Certification → Employment → Income.",
    tag: "Livelihoods · 2026 Target",
  },
  {
    title: "Mira Free Medical Camps",
    target: "Target: 12 camps",
    desc: "Accessible healthcare and preventive health awareness.",
    tag: "Healthcare · 2026 Target",
  },
  {
    title: "Mira Green Bangladesh",
    target: "Target: 5,000 trees",
    desc: "Community-led environmental action.",
    tag: "Environment · 2026 Target",
  },
];

const NEWS = [
  { title: "Mira Welfare Foundation launches 2026 scholarship initiative", cat: "Education" },
  { title: "Community healthcare program announced", cat: "Healthcare" },
  { title: "Skills and employment initiative introduced", cat: "Livelihoods" },
  { title: "Green Bangladesh campaign planned", cat: "Environment" },
];

const NAV = [
  { key: "home", label: "Home" },
  { key: "about", label: "About" },
  { key: "programs", label: "Programs" },
  { key: "projects", label: "Projects" },
  { key: "transparency", label: "Transparency" },
  { key: "leadership", label: "Leadership" },
  { key: "contact", label: "Contact" },
];

/* ============================================================
   NAVBAR
   ============================================================ */

function Navbar({ page, go }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(250,245,234,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.mossLine}` : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
        <button onClick={() => go("home")} className="flex items-center gap-3">
          <div
            style={{ background: C.forest, color: C.gold, ...display }}
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold"
          >
            M
          </div>
          <div className="text-left leading-tight">
            <div style={{ ...display, color: C.ink, fontWeight: 600 }} className="text-[15px]">
              Mira Welfare Foundation
            </div>
            <div style={{ ...mono, color: C.inkSoft, fontSize: "10px", letterSpacing: "0.08em" }} className="uppercase">
              Bangladesh
            </div>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((n) => (
            <button
              key={n.key}
              onClick={() => go(n.key)}
              style={{ ...body, color: page === n.key ? C.forest : C.inkSoft }}
              className="text-sm font-medium relative pb-1 transition-colors hover:text-[#0F3D2E]"
            >
              {n.label}
              {page === n.key && (
                <span style={{ background: C.gold }} className="absolute left-0 -bottom-0.5 w-full h-[2px] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button onClick={() => go("volunteer")} style={{ ...body, color: C.forest }} className="text-sm font-semibold">
            Volunteer
          </button>
          <button
            onClick={() => go("donate")}
            style={{ background: C.forest, color: C.paper, ...body }}
            className="px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition"
          >
            <Heart size={14} fill={C.gold} color={C.gold} /> Donate
          </button>
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)} style={{ color: C.forest }}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div style={{ background: C.parchment, borderTop: `1px solid ${C.mossLine}` }} className="lg:hidden px-5 pb-6 pt-2 flex flex-col gap-1">
          {NAV.map((n) => (
            <button
              key={n.key}
              onClick={() => {
                go(n.key);
                setOpen(false);
              }}
              style={{ ...body, color: page === n.key ? C.forest : C.ink }}
              className="text-left py-3 text-base font-medium border-b"
            >
              {n.label}
            </button>
          ))}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => {
                go("volunteer");
                setOpen(false);
              }}
              style={{ borderColor: C.forest, color: C.forest, ...body }}
              className="flex-1 py-3 rounded-full border font-semibold text-sm"
            >
              Volunteer
            </button>
            <button
              onClick={() => {
                go("donate");
                setOpen(false);
              }}
              style={{ background: C.forest, color: C.paper, ...body }}
              className="flex-1 py-3 rounded-full font-semibold text-sm"
            >
              Donate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */

function Footer({ go }) {
  const cols = [
    { title: "Organization", items: [["About", "about"], ["Leadership", "leadership"], ["Programs", "programs"], ["Projects", "projects"], ["Contact", "contact"]] },
    { title: "Get Involved", items: [["Donate", "donate"], ["Volunteer", "volunteer"], ["Partner With Us", "partner"]] },
    { title: "Transparency", items: [["Registration", "transparency"], ["Annual Reports", "transparency"], ["Financial Accountability", "transparency"], ["Policies", "transparency"]] },
  ];
  return (
    <footer style={{ background: C.forestDeep }} className="pt-20 pb-8 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 pb-14" style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div style={{ background: C.gold, color: C.forestDeep, ...display }} className="w-10 h-10 rounded-full flex items-center justify-center font-semibold">
                M
              </div>
              <div style={{ ...display, color: C.paper }} className="text-lg font-medium">
                Mira Welfare Foundation
              </div>
            </div>
            <p style={{ ...body, color: "rgba(255,255,255,0.68)" }} className="text-sm leading-relaxed max-w-xs">
              Empowering People. Building Communities. A Bangladesh-registered society working across education, healthcare, livelihoods and humanitarian assistance.
            </p>
            <div className="flex gap-3 mt-6">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <div
                  key={i}
                  style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.8)" }}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition cursor-pointer"
                >
                  <Icon size={15} />
                </div>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div style={{ ...mono, color: C.gold, fontSize: "11px", letterSpacing: "0.1em" }} className="uppercase mb-5">
                {c.title}
              </div>
              <div className="flex flex-col gap-3">
                {c.items.map(([label, key]) => (
                  <button
                    key={label}
                    onClick={() => go(key)}
                    style={{ ...body, color: "rgba(255,255,255,0.72)" }}
                    className="text-left text-sm hover:text-white transition"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div style={{ ...mono, color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>
            © 2026 Mira Welfare Foundation. All Rights Reserved.
          </div>
          <div style={{ ...mono, color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>
            Registration No. S-15084/2026 · Societies Registration Act, 1860
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   SHARED: DEMO NOTICE STRIP
   ============================================================ */
function DemoNotice({ children }) {
  return (
    <div
      style={{ background: C.moss, border: `1px solid ${C.mossLine}`, color: C.forest, ...body }}
      className="rounded-2xl px-5 py-4 text-sm flex items-start gap-3"
    >
      <ShieldCheck size={18} className="shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  );
}

/* ============================================================
   HOME PAGE
   ============================================================ */

function Hero({ go }) {
  return (
    <div className="relative overflow-hidden" style={{ background: C.forest }}>
      <div className="absolute inset-0" style={{ opacity: 0.34 }}>
        <img
          src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=2400&auto=format&fit=crop"
          alt="Community members in Bangladesh"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(10,44,33,0.55), ${C.forest} 92%)` }} />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-28 sm:pt-28 sm:pb-36">
        <Reveal>
          <Eyebrow dark>Bangladesh · Registered Society No. S-15084/2026</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h1 style={{ ...display, color: C.paper, fontWeight: 500, lineHeight: 1.05 }} className="text-5xl sm:text-6xl md:text-7xl max-w-3xl">
            Empowering People.
            <br />
            Building Communities.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p style={{ ...body, color: "rgba(255,255,255,0.78)" }} className="mt-7 text-lg max-w-xl leading-relaxed">
            Mira Welfare Foundation works to create meaningful opportunities through education, healthcare, livelihoods, humanitarian assistance and sustainable community development.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap gap-4">
            <GoldButton onClick={() => go("donate")}>Support Our Mission</GoldButton>
            <GhostButton dark onClick={() => go("programs")}>
              Explore Our Programs
            </GhostButton>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function ImpactStrip() {
  const stats = [
    { to: 5000, suffix: "+", label: "People Targeted" },
    { to: 100, suffix: "", label: "Scholarships" },
    { to: 500, suffix: "", label: "Skills Trainees" },
    { to: 12, suffix: "", label: "Medical Camps" },
    { to: 5000, suffix: "", label: "Trees Targeted" },
  ];
  return (
    <div style={{ background: C.forestDeep }} className="py-4">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        <div style={{ ...mono, color: C.gold, fontSize: "11px", letterSpacing: "0.1em" }} className="text-center uppercase mb-6">
          — 2026 Targets, not completed achievements —
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-y-8">
          {stats.map((s) => (
            <Counter key={s.label} {...s} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutPreview({ go }) {
  const values = ["Integrity", "Compassion", "Accountability", "Dignity", "Equality", "Transparency", "Sustainability"];
  return (
    <div style={{ background: C.paper }} className="py-24 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-start">
        <Reveal>
          <Eyebrow>About the Foundation</Eyebrow>
          <h2 style={{ ...display, color: C.ink, fontWeight: 500, lineHeight: 1.14 }} className="text-3xl sm:text-4xl md:text-[42px]">
            Creating Opportunity. Restoring Dignity. Building a Better Future.
          </h2>
          <p style={{ ...body, color: C.inkSoft }} className="mt-6 text-base sm:text-lg leading-relaxed">
            Mira Welfare Foundation is a Bangladesh-registered society focused on social welfare and community development — working alongside communities in education, healthcare, livelihoods, humanitarian assistance and sustainable development.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {values.map((v) => (
              <Tag key={v}>{v}</Tag>
            ))}
          </div>
          <div className="mt-9">
            <GhostButton onClick={() => go("about")}>Learn About Our Mission</GhostButton>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div style={{ background: C.parchment, border: `1px solid ${C.mossLine}` }} className="rounded-3xl p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div style={{ background: C.forest }} className="w-11 h-11 rounded-full flex items-center justify-center">
                <ShieldCheck size={20} color={C.gold} />
              </div>
              <div style={{ ...display, color: C.ink, fontWeight: 600 }} className="text-lg">
                Registered Society
              </div>
            </div>
            <div className="space-y-4">
              <Row label="Registration No." value="S-15084/2026" />
              <Row label="Registered" value="19 July 2026" />
              <Row label="Legal Basis" value="Societies Registration Act, 1860" />
              <Row label="Location" value="Bangladesh" />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between py-3" style={{ borderBottom: `1px dashed ${C.mossLine}` }}>
      <span style={{ ...mono, color: C.inkSoft, fontSize: "12px", letterSpacing: "0.04em" }}>{label}</span>
      <span style={{ ...body, color: C.ink, fontWeight: 600 }} className="text-sm">
        {value}
      </span>
    </div>
  );
}

function ProgramsGrid({ go }) {
  return (
    <div style={{ background: C.parchment }} className="py-24 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="Where We Work" title="Six Program Areas" sub="Focused, practical programs that build toward a common goal: dignity and opportunity for every community we work with." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAMS.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.key} delay={i * 60}>
                <div
                  style={{ background: C.paper, border: `1px solid ${C.mossLine}` }}
                  className="group rounded-3xl p-8 h-full flex flex-col hover:shadow-xl transition-shadow duration-300"
                >
                  <div style={{ background: C.moss }} className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <Icon size={24} color={C.forest} />
                  </div>
                  <div style={{ ...display, color: C.ink, fontWeight: 600 }} className="text-xl mb-2">
                    {p.title}
                  </div>
                  <p style={{ ...body, color: C.inkSoft }} className="text-sm leading-relaxed flex-1">
                    {p.blurb}
                  </p>
                  <button
                    onClick={() => go("programs")}
                    style={{ ...body, color: C.forest }}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all"
                  >
                    {p.cta} <ArrowRight size={14} />
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FeaturedProjects({ go }) {
  const imgs = [
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1200&auto=format&fit=crop",
  ];
  return (
    <div style={{ background: C.paper }} className="py-24 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="Planned for 2026" title="Featured Projects" sub="Each project below is a planned 2026 initiative, shown with its target scale — not a completed program." />
        <div className="grid sm:grid-cols-2 gap-8">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div style={{ border: `1px solid ${C.mossLine}` }} className="rounded-3xl overflow-hidden group">
                <div className="relative h-56 overflow-hidden">
                  <img src={imgs[i]} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div style={{ background: C.gold, color: C.forestDeep, ...mono }} className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide">
                    {p.tag}
                  </div>
                </div>
                <div className="p-7">
                  <div style={{ ...display, color: C.ink, fontWeight: 600 }} className="text-xl mb-1">
                    {p.title}
                  </div>
                  <div style={{ ...mono, color: C.forest, fontSize: "12px" }} className="mb-3 flex items-center gap-1.5">
                    <Target size={13} /> {p.target}
                  </div>
                  <p style={{ ...body, color: C.inkSoft }} className="text-sm leading-relaxed mb-6">
                    {p.desc}
                  </p>
                  <div className="flex gap-3">
                    <button onClick={() => go("projects")} style={{ ...body, color: C.forest, border: `1px solid ${C.forest}` }} className="px-4 py-2 rounded-full text-xs font-semibold">
                      Learn More
                    </button>
                    <button onClick={() => go("donate")} style={{ ...body, background: C.forest, color: C.paper }} className="px-4 py-2 rounded-full text-xs font-semibold">
                      Support This Project
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillsProcess({ go }) {
  const steps = [
    { n: "01", t: "Identify", d: "Find people who need employment opportunities." },
    { n: "02", t: "Train", d: "Provide practical vocational and digital skills." },
    { n: "03", t: "Connect", d: "Connect qualified participants with employers and opportunities." },
    { n: "04", t: "Empower", d: "Help participants move toward sustainable income." },
  ];
  return (
    <div style={{ background: C.forest }} className="py-24 px-5 sm:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <SectionHeader dark eyebrow="Livelihoods" title="From Training to Opportunity" sub="A four-step pathway that moves a participant from need to sustainable income." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div style={{ borderTop: `2px solid ${C.gold}` }} className="pt-6">
                <div style={{ ...display, color: C.gold, fontWeight: 500 }} className="text-4xl mb-3">
                  {s.n}
                </div>
                <div style={{ ...display, color: C.paper, fontWeight: 600 }} className="text-lg mb-2">
                  {s.t}
                </div>
                <p style={{ ...body, color: "rgba(255,255,255,0.68)" }} className="text-sm leading-relaxed">
                  {s.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12">
          <GoldButton onClick={() => go("donate")}>Support Skills & Employment</GoldButton>
        </div>
      </div>
    </div>
  );
}

function ImpactProcess() {
  const steps = ["Identify Need", "Design Program", "Deliver", "Measure", "Improve", "Scale"];
  const metrics = [
    "Beneficiaries reached",
    "Program completion",
    "Employment outcomes",
    "Education outcomes",
    "Healthcare services delivered",
    "Resources distributed",
    "Long-term community impact",
  ];
  return (
    <div style={{ background: C.parchment }} className="py-24 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="Our Method" title="How We Create Impact" />
        <Reveal>
          <div className="flex flex-wrap items-center gap-3 mb-14">
            {steps.map((s, i) => (
              <React.Fragment key={s}>
                <div style={{ background: C.paper, border: `1px solid ${C.mossLine}`, ...body, color: C.ink }} className="px-5 py-3 rounded-full text-sm font-semibold">
                  {s}
                </div>
                {i < steps.length - 1 && <ArrowRight size={16} color={C.gold} />}
              </React.Fragment>
            ))}
          </div>
        </Reveal>
        <div className="grid lg:grid-cols-5 gap-10 items-center">
          <Reveal className="lg:col-span-2">
            <blockquote style={{ ...display, color: C.forest, fontWeight: 500, lineHeight: 1.3 }} className="text-2xl sm:text-3xl">
              "We don't measure success only by how much we give. We measure what changes because we gave."
            </blockquote>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-3">
            <div style={{ ...mono, color: C.inkSoft, fontSize: "11px", letterSpacing: "0.08em" }} className="uppercase mb-4">
              What we aim to measure
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {metrics.map((m) => (
                <div key={m} className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} color={C.gold} />
                  <span style={{ ...body, color: C.ink }} className="text-sm">
                    {m}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function TransparencyPreview({ go }) {
  const cards = [
    { icon: Landmark, title: "Our Registration", d: "Society registration information." },
    { icon: Users, title: "Our Governance", d: "Leadership and organizational structure." },
    { icon: FileText, title: "Our Reports", d: "Annual and project reports." },
    { icon: Scale, title: "Financial Accountability", d: "Financial reporting and audit information where applicable." },
    { icon: ShieldCheck, title: "Our Policies", d: "Governance, safeguarding, finance, procurement and ethical policies." },
  ];
  return (
    <div style={{ background: C.paper }} className="py-24 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="Accountability" title="Your Trust Matters" align="center" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delay={i * 70}>
                <div style={{ background: C.parchment, border: `1px solid ${C.mossLine}` }} className="rounded-2xl p-6 h-full hover:-translate-y-1 transition-transform">
                  <Icon size={22} color={C.forest} />
                  <div style={{ ...display, color: C.ink, fontWeight: 600 }} className="mt-4 text-base">
                    {c.title}
                  </div>
                  <p style={{ ...body, color: C.inkSoft }} className="mt-2 text-xs leading-relaxed">
                    {c.d}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <GhostButton onClick={() => go("transparency")}>Visit Transparency Center</GhostButton>
        </div>
      </div>
    </div>
  );
}

function NewsAndStories({ go }) {
  return (
    <div style={{ background: C.parchment }} className="py-24 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        <div>
          <Eyebrow>Newsroom</Eyebrow>
          <h3 style={{ ...display, color: C.ink, fontWeight: 500 }} className="text-2xl sm:text-3xl mb-2">
            News & Stories
          </h3>
          <div style={{ ...mono, color: C.inkSoft, fontSize: "11px" }} className="uppercase mb-8">
            Demo Content
          </div>
          <div className="space-y-5">
            {NEWS.map((n) => (
              <div key={n.title} style={{ borderBottom: `1px dashed ${C.mossLine}` }} className="pb-5 flex items-start justify-between gap-4">
                <div>
                  <Tag>{n.cat}</Tag>
                  <div style={{ ...body, color: C.ink }} className="mt-2 text-sm font-semibold leading-snug max-w-sm">
                    {n.title}
                  </div>
                </div>
                <ArrowUpRight size={16} color={C.forest} className="shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <Eyebrow>Voices</Eyebrow>
          <h3 style={{ ...display, color: C.ink, fontWeight: 500 }} className="text-2xl sm:text-3xl mb-2">
            Impact Stories
          </h3>
          <div style={{ ...mono, color: C.inkSoft, fontSize: "11px" }} className="uppercase mb-8">
            Sample Story — Demonstration Content
          </div>
          <div style={{ background: C.paper, border: `1px solid ${C.mossLine}` }} className="rounded-3xl overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1541692641319-981cc79ee10a?q=80&w=1200&auto=format&fit=crop" alt="Sample demonstration story" className="w-full h-full object-cover" />
            </div>
            <div className="p-7">
              <div style={{ ...body, color: C.ink }} className="text-sm font-semibold mb-3">
                A Path Back Into the Classroom
              </div>
              <div className="space-y-2 text-xs" style={{ ...body, color: C.inkSoft }}>
                <p><b style={{ color: C.forest }}>Challenge:</b> A family placeholder scenario in which a child's schooling is interrupted by financial hardship.</p>
                <p><b style={{ color: C.forest }}>Intervention:</b> Illustrative scholarship and school-supplies support.</p>
                <p><b style={{ color: C.forest }}>Outcome:</b> Illustrative return to consistent school attendance.</p>
              </div>
              <button onClick={() => go("about")} style={{ ...body, color: C.forest }} className="mt-5 text-sm font-semibold inline-flex items-center gap-1.5">
                Read More Stories <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CTASection({ go }) {
  return (
    <div style={{ background: C.forestDeep }} className="py-20 px-5 sm:px-8 relative overflow-hidden">
      <div style={{ background: C.gold, opacity: 0.08 }} className="absolute -right-24 -top-24 w-96 h-96 rounded-full" />
      <div className="max-w-4xl mx-auto text-center relative">
        <h2 style={{ ...display, color: C.paper, fontWeight: 500 }} className="text-3xl sm:text-4xl mb-5">
          Your support can create opportunity.
        </h2>
        <p style={{ ...body, color: "rgba(255,255,255,0.7)" }} className="mb-9 max-w-xl mx-auto">
          Whether through a gift, your time or a partnership, every contribution moves a community closer to dignity and opportunity.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <GoldButton onClick={() => go("donate")}>Support Our Mission</GoldButton>
          <GhostButton dark onClick={() => go("volunteer")}>
            Become a Volunteer
          </GhostButton>
        </div>
      </div>
    </div>
  );
}

function HomePage({ go }) {
  return (
    <>
      <Hero go={go} />
      <ImpactStrip />
      <AboutPreview go={go} />
      <ProgramsGrid go={go} />
      <FeaturedProjects go={go} />
      <SkillsProcess go={go} />
      <ImpactProcess />
      <TransparencyPreview go={go} />
      <NewsAndStories go={go} />
      <CTASection go={go} />
    </>
  );
}

/* ============================================================
   PAGE HEADER (for inner pages)
   ============================================================ */
function PageHead({ eyebrow, title, sub }) {
  return (
    <div style={{ background: C.forest }} className="pt-16 pb-20 px-5 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <Eyebrow dark>{eyebrow}</Eyebrow>
        <h1 style={{ ...display, color: C.paper, fontWeight: 500, lineHeight: 1.1 }} className="text-4xl sm:text-5xl">
          {title}
        </h1>
        {sub && (
          <p style={{ ...body, color: "rgba(255,255,255,0.72)" }} className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed">
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   ABOUT PAGE
   ============================================================ */
function AboutPage({ go }) {
  const values = [
    ["Integrity", "Doing what is right, especially when no one is watching."],
    ["Compassion", "Leading every program with empathy for the people it serves."],
    ["Accountability", "Owning our commitments and reporting honestly on progress."],
    ["Dignity", "Treating every person we serve as a partner, not a project."],
    ["Equality", "Fair access to opportunity, regardless of background."],
    ["Transparency", "Open about what we do, how, and with what resources."],
    ["Sustainability", "Building change that outlasts a single intervention."],
  ];
  return (
    <>
      <PageHead eyebrow="About Us" title="Creating Opportunity. Restoring Dignity. Building a Better Future." sub="Mira Welfare Foundation is a Bangladesh-registered society focused on social welfare and community development." />
      <div style={{ background: C.paper }} className="py-20 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8 mb-20">
          <Reveal className="lg:col-span-2">
            <div style={{ background: C.parchment, border: `1px solid ${C.mossLine}` }} className="rounded-3xl p-9 h-full">
              <div style={{ ...display, color: C.ink, fontWeight: 600 }} className="text-2xl mb-3">
                Our Vision
              </div>
              <p style={{ ...body, color: C.inkSoft }} className="leading-relaxed">
                A stronger Bangladesh where vulnerable people have access to education, healthcare, livelihoods, dignity and opportunity.
              </p>
              <div style={{ ...display, color: C.ink, fontWeight: 600 }} className="text-2xl mt-8 mb-3">
                Our Mission
              </div>
              <p style={{ ...body, color: C.inkSoft }} className="leading-relaxed">
                To empower disadvantaged communities through education, healthcare, skills development, livelihood creation, humanitarian assistance and sustainable community development.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ background: C.forest }} className="rounded-3xl p-9 h-full flex flex-col">
              <ShieldCheck size={26} color={C.gold} />
              <div style={{ ...display, color: C.paper, fontWeight: 600 }} className="text-xl mt-4 mb-5">
                Registered Society
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <div style={{ ...mono, color: "rgba(255,255,255,0.55)", fontSize: "11px" }} className="uppercase">Registration No.</div>
                  <div style={{ ...body, color: C.paper }} className="font-semibold">S-15084/2026</div>
                </div>
                <div>
                  <div style={{ ...mono, color: "rgba(255,255,255,0.55)", fontSize: "11px" }} className="uppercase">Registered</div>
                  <div style={{ ...body, color: C.paper }} className="font-semibold">19 July 2026</div>
                </div>
                <div>
                  <div style={{ ...mono, color: "rgba(255,255,255,0.55)", fontSize: "11px" }} className="uppercase">Legal Basis</div>
                  <div style={{ ...body, color: C.paper }} className="font-semibold">Societies Registration Act, 1860</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="max-w-6xl mx-auto">
          <SectionHeader eyebrow="What We Stand For" title="Our Values" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map(([t, d], i) => (
              <Reveal key={t} delay={i * 50}>
                <div style={{ border: `1px solid ${C.mossLine}` }} className="rounded-2xl p-6 h-full">
                  <div style={{ ...display, color: C.gold, fontWeight: 600 }} className="text-2xl mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div style={{ ...display, color: C.ink, fontWeight: 600 }} className="text-lg mb-1.5">
                    {t}
                  </div>
                  <p style={{ ...body, color: C.inkSoft }} className="text-sm leading-relaxed">
                    {d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <CTASection go={go} />
    </>
  );
}

/* ============================================================
   PROGRAMS PAGE
   ============================================================ */
function ProgramsPage({ go }) {
  return (
    <>
      <PageHead eyebrow="Our Work" title="Six Program Areas" sub="Every program is built around a practical pathway from need to sustained change." />
      <div style={{ background: C.paper }} className="py-20 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {PROGRAMS.map((p, i) => {
            const Icon = p.icon;
            const flip = i % 2 === 1;
            return (
              <Reveal key={p.key} delay={i * 60}>
                <div
                  style={{ background: C.parchment, border: `1px solid ${C.mossLine}` }}
                  className={`rounded-3xl p-9 grid md:grid-cols-3 gap-8 items-center ${flip ? "md:[direction:rtl]" : ""}`}
                >
                  <div style={{ direction: "ltr" }} className="md:col-span-2">
                    <div style={{ background: C.forest }} className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5">
                      <Icon size={24} color={C.gold} />
                    </div>
                    <div style={{ ...display, color: C.ink, fontWeight: 600 }} className="text-2xl mb-3">
                      {p.title}
                    </div>
                    <p style={{ ...body, color: C.inkSoft }} className="leading-relaxed mb-6">
                      {p.detail}
                    </p>
                    <GhostButton onClick={() => go("donate")}>{p.cta}</GhostButton>
                  </div>
                  <div style={{ direction: "ltr", background: C.moss }} className="rounded-2xl h-40 md:h-full flex items-center justify-center">
                    <Icon size={44} color={C.forest} strokeWidth={1.3} />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
      <CTASection go={go} />
    </>
  );
}

/* ============================================================
   PROJECTS PAGE
   ============================================================ */
function ProjectsPage({ go }) {
  const imgs = [
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1200&auto=format&fit=crop",
  ];
  return (
    <>
      <PageHead eyebrow="2026 Initiatives" title="Featured Projects" sub="Planned projects with clear targets — shown as targets, not completed results." />
      <div style={{ background: C.paper }} className="py-20 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-8">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div style={{ border: `1px solid ${C.mossLine}` }} className="rounded-3xl overflow-hidden group">
                <div className="relative h-60 overflow-hidden">
                  <img src={imgs[i]} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div style={{ background: C.gold, color: C.forestDeep, ...mono }} className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide">
                    {p.tag}
                  </div>
                </div>
                <div className="p-7">
                  <div style={{ ...display, color: C.ink, fontWeight: 600 }} className="text-xl mb-1">
                    {p.title}
                  </div>
                  <div style={{ ...mono, color: C.forest, fontSize: "12px" }} className="mb-3 flex items-center gap-1.5">
                    <Target size={13} /> {p.target}
                  </div>
                  <p style={{ ...body, color: C.inkSoft }} className="text-sm leading-relaxed mb-6">
                    {p.desc}
                  </p>
                  <div className="flex gap-3">
                    <button style={{ ...body, color: C.forest, border: `1px solid ${C.forest}` }} className="px-4 py-2 rounded-full text-xs font-semibold">
                      Learn More
                    </button>
                    <button onClick={() => go("donate")} style={{ ...body, background: C.forest, color: C.paper }} className="px-4 py-2 rounded-full text-xs font-semibold">
                      Support This Project
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <CTASection go={go} />
    </>
  );
}

/* ============================================================
   TRANSPARENCY PAGE
   ============================================================ */
function TransparencyPage() {
  const groups = [
    {
      title: "Legal & Registration",
      icon: Landmark,
      items: ["Society registration certificate — Coming Soon", "Registration No. S-15084/2026 (registered 19 July 2026)"],
    },
    {
      title: "Governance",
      icon: Users,
      items: ["Constitution — Coming Soon", "Executive Committee — Coming Soon", "Governance information — Coming Soon"],
    },
    {
      title: "Financial Accountability",
      icon: Scale,
      items: ["Annual reports — Coming Soon", "Audit reports — Coming Soon", "Project expenditure summaries — Coming Soon"],
    },
    {
      title: "Policies",
      icon: ShieldCheck,
      items: [
        "Finance Policy — Coming Soon",
        "Procurement Policy — Coming Soon",
        "Anti-Fraud Policy — Coming Soon",
        "Conflict of Interest Policy — Coming Soon",
        "Safeguarding Policy — Coming Soon",
        "Child Protection Policy — Coming Soon",
        "Whistleblower Policy — Coming Soon",
        "Data Privacy Policy — Coming Soon",
        "Code of Conduct — Coming Soon",
      ],
    },
  ];
  return (
    <>
      <PageHead eyebrow="Transparency Center" title="Your Trust Matters" sub="Documents are published as they become available. Where something has not yet been finalized, we label it clearly rather than leave the impression it exists." />
      <div style={{ background: C.paper }} className="py-20 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto mb-12">
          <DemoNotice>This is a demo transparency center. No audit reports, NGO Affairs Bureau registration, donor names or financial figures are represented here beyond the registration details supplied by the organization.</DemoNotice>
        </div>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-6">
          {groups.map((g, i) => {
            const Icon = g.icon;
            return (
              <Reveal key={g.title} delay={i * 70}>
                <div style={{ background: C.parchment, border: `1px solid ${C.mossLine}` }} className="rounded-3xl p-8 h-full">
                  <div style={{ background: C.forest }} className="w-12 h-12 rounded-xl flex items-center justify-center mb-5">
                    <Icon size={20} color={C.gold} />
                  </div>
                  <div style={{ ...display, color: C.ink, fontWeight: 600 }} className="text-xl mb-4">
                    {g.title}
                  </div>
                  <div className="space-y-2.5">
                    {g.items.map((it) => (
                      <div key={it} className="flex items-start gap-2.5">
                        <FileText size={14} color={C.gold} className="shrink-0 mt-0.5" />
                        <span style={{ ...body, color: C.inkSoft }} className="text-sm">
                          {it}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ============================================================
   DONATE PAGE
   ============================================================ */
function DonatePage() {
  const amounts = ["৳500", "৳1,000", "৳2,500", "৳5,000", "৳10,000"];
  const categories = ["Education", "Healthcare", "Livelihood", "Emergency Relief", "Environment", "Where Most Needed"];
  const [amt, setAmt] = useState("৳1,000");
  const [custom, setCustom] = useState("");
  const [cat, setCat] = useState("Where Most Needed");
  return (
    <>
      <PageHead eyebrow="Give" title="Your Support Can Create Opportunity" sub="Choose an amount and a program area — every contribution is directed toward a specific, measurable purpose." />
      <div style={{ background: C.paper }} className="py-20 px-5 sm:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <DemoNotice>Demo website — donation processing is not yet connected.</DemoNotice>
          </div>
          <div style={{ background: C.parchment, border: `1px solid ${C.mossLine}` }} className="rounded-3xl p-8 sm:p-10">
            <div style={{ ...mono, color: C.inkSoft, fontSize: "11px" }} className="uppercase mb-3">
              Choose amount
            </div>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {amounts.map((a) => (
                <button
                  key={a}
                  onClick={() => {
                    setAmt(a);
                    setCustom("");
                  }}
                  style={{
                    ...body,
                    background: amt === a ? C.forest : C.paper,
                    color: amt === a ? C.paper : C.ink,
                    border: `1px solid ${amt === a ? C.forest : C.mossLine}`,
                  }}
                  className="py-3 rounded-xl font-semibold text-sm transition"
                >
                  {a}
                </button>
              ))}
              <button
                onClick={() => setAmt("custom")}
                style={{
                  ...body,
                  background: amt === "custom" ? C.forest : C.paper,
                  color: amt === "custom" ? C.paper : C.ink,
                  border: `1px solid ${amt === "custom" ? C.forest : C.mossLine}`,
                }}
                className="py-3 rounded-xl font-semibold text-sm transition"
              >
                Custom
              </button>
            </div>
            {amt === "custom" && (
              <input
                value={custom}
                onChange={(e) => setCustom(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="Enter amount (৳)"
                style={{ ...body, border: `1px solid ${C.mossLine}` }}
                className="w-full mb-6 px-4 py-3 rounded-xl bg-white text-sm focus:outline-none"
              />
            )}

            <div style={{ ...mono, color: C.inkSoft, fontSize: "11px" }} className="uppercase mb-3 mt-6">
              Direct my gift to
            </div>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  style={{
                    ...body,
                    background: cat === c ? C.moss : C.paper,
                    color: C.ink,
                    border: `1px solid ${cat === c ? C.forest : C.mossLine}`,
                  }}
                  className="py-3 px-3 rounded-xl text-sm font-medium text-left flex items-center gap-2"
                >
                  {cat === c && <CheckCircle2 size={14} color={C.forest} />} {c}
                </button>
              ))}
            </div>

            <button
              style={{ background: C.gold, color: C.forestDeep, ...body }}
              className="w-full py-4 rounded-full font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Heart size={16} /> Donate {amt === "custom" ? (custom ? `৳${custom}` : "") : amt} — {cat}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   VOLUNTEER PAGE
   ============================================================ */
function Field({ label, ...props }) {
  return (
    <label className="block">
      <span style={{ ...mono, color: C.inkSoft, fontSize: "11px" }} className="uppercase">
        {label}
      </span>
      <input {...props} style={{ ...body, border: `1px solid ${C.mossLine}` }} className="mt-2 w-full px-4 py-3 rounded-xl bg-white text-sm focus:outline-none" />
    </label>
  );
}

function VolunteerPage() {
  const areas = ["Education", "Healthcare", "Disaster Relief", "Environment", "Digital/Technology", "Fundraising", "Events", "Community Outreach"];
  const [selected, setSelected] = useState([]);
  const [sent, setSent] = useState(false);
  const toggle = (a) => setSelected((s) => (s.includes(a) ? s.filter((x) => x !== a) : [...s, a]));
  return (
    <>
      <PageHead eyebrow="Get Involved" title="Give Your Time. Make a Difference." sub="Volunteers help deliver nearly every program at Mira Welfare Foundation. Tell us where your time and skills fit best." />
      <div style={{ background: C.paper }} className="py-20 px-5 sm:px-8">
        <div className="max-w-2xl mx-auto">
          {sent ? (
            <div style={{ background: C.moss, border: `1px solid ${C.mossLine}` }} className="rounded-3xl p-10 text-center">
              <CheckCircle2 size={32} color={C.forest} className="mx-auto mb-4" />
              <div style={{ ...display, color: C.ink, fontWeight: 600 }} className="text-xl mb-2">
                Thank you for registering
              </div>
              <p style={{ ...body, color: C.inkSoft }} className="text-sm">
                This is a demo form — your response was simulated locally and not sent anywhere.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              style={{ background: C.parchment, border: `1px solid ${C.mossLine}` }}
              className="rounded-3xl p-8 sm:p-10 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Full Name" required />
                <Field label="Email" type="email" required />
                <Field label="Phone" type="tel" />
                <Field label="District" />
              </div>
              <Field label="Skills" placeholder="e.g. Teaching, first aid, graphic design" />
              <div>
                <span style={{ ...mono, color: C.inkSoft, fontSize: "11px" }} className="uppercase">
                  Area of Interest
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {areas.map((a) => (
                    <button
                      type="button"
                      key={a}
                      onClick={() => toggle(a)}
                      style={{
                        ...body,
                        background: selected.includes(a) ? C.forest : C.paper,
                        color: selected.includes(a) ? C.paper : C.ink,
                        border: `1px solid ${selected.includes(a) ? C.forest : C.mossLine}`,
                      }}
                      className="px-3.5 py-2 rounded-full text-xs font-medium transition"
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
              <Field label="Availability" placeholder="e.g. Weekends, evenings" />
              <label className="block">
                <span style={{ ...mono, color: C.inkSoft, fontSize: "11px" }} className="uppercase">
                  Message
                </span>
                <textarea rows={4} style={{ ...body, border: `1px solid ${C.mossLine}` }} className="mt-2 w-full px-4 py-3 rounded-xl bg-white text-sm focus:outline-none" />
              </label>
              <button type="submit" style={{ background: C.gold, color: C.forestDeep, ...body }} className="w-full py-4 rounded-full font-semibold text-sm">
                Become a Volunteer
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

/* ============================================================
   PARTNER PAGE
   ============================================================ */
function PartnerPage({ go }) {
  const supports = ["Scholarships", "Medical camps", "Skills training", "Women's empowerment", "Youth employment", "Environmental programs", "Disaster response"];
  const cards = [
    { title: "Project Sponsor", d: "Support one specific program from start to finish, with visibility into its outcomes." },
    { title: "CSR Partner", d: "Build a long-term corporate social responsibility partnership across multiple program areas." },
    { title: "Strategic Partner", d: "Provide technical, institutional or financial support at a broader organizational level." },
  ];
  return (
    <>
      <PageHead eyebrow="Corporate Partnerships" title="Partner With Mira Welfare Foundation" sub="We work with companies who want their social impact to be specific, measurable and genuinely felt in the communities we serve." />
      <div style={{ background: C.paper }} className="py-20 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto mb-16">
          <div style={{ ...mono, color: C.inkSoft, fontSize: "11px" }} className="uppercase mb-4">
            Companies can support
          </div>
          <div className="flex flex-wrap gap-2">
            {supports.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        </div>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div style={{ background: C.parchment, border: `1px solid ${C.mossLine}` }} className="rounded-3xl p-8 h-full flex flex-col">
                <div style={{ ...display, color: C.gold, fontWeight: 600 }} className="text-2xl mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ ...display, color: C.ink, fontWeight: 600 }} className="text-xl mb-3">
                  {c.title}
                </div>
                <p style={{ ...body, color: C.inkSoft }} className="text-sm leading-relaxed flex-1">
                  {c.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="max-w-6xl mx-auto mt-14 text-center">
          <GoldButton onClick={() => go("contact")}>Become a Partner</GoldButton>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   LEADERSHIP PAGE
   ============================================================ */
function LeadershipPage() {
  const sections = ["Chairman / President", "Advisory Board", "Executive Director", "Executive Committee", "Management Team"];
  return (
    <>
      <PageHead eyebrow="People" title="Leadership" sub="Profiles are published as they are confirmed. We do not publish placeholder names or credentials." />
      <div style={{ background: C.paper }} className="py-20 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto space-y-14">
          {sections.map((s, i) => (
            <Reveal key={s} delay={i * 60}>
              <div>
                <div style={{ ...display, color: C.ink, fontWeight: 600 }} className="text-xl mb-5">
                  {s}
                </div>
                <div style={{ background: C.parchment, border: `1px dashed ${C.mossLine}` }} className="rounded-2xl p-8 flex items-center gap-5">
                  <div style={{ background: C.moss }} className="w-16 h-16 rounded-full flex items-center justify-center shrink-0">
                    <Users size={22} color={C.forest} />
                  </div>
                  <div>
                    <div style={{ ...body, color: C.ink }} className="font-semibold text-sm">
                      Profile Coming Soon
                    </div>
                    <div style={{ ...mono, color: C.inkSoft, fontSize: "11px" }} className="mt-1">
                      To be announced
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}

/* ============================================================
   CONTACT PAGE
   ============================================================ */
function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHead eyebrow="Reach Us" title="Contact Mira Welfare Foundation" sub="Bangladesh" />
      <div style={{ background: C.paper }} className="py-20 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {[
              { Icon: MapPin, label: "Address", v: "[Foundation Address]" },
              { Icon: Phone, label: "Phone", v: "[Official Phone]" },
              { Icon: Mail, label: "Email", v: "contact@mirawelfarefoundation.org"},
            ].map(({ Icon, label, v }) => (
              <div key={label} style={{ background: C.parchment, border: `1px solid ${C.mossLine}` }} className="rounded-2xl p-6 flex items-start gap-4">
                <div style={{ background: C.forest }} className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={17} color={C.gold} />
                </div>
                <div>
                  <div style={{ ...mono, color: C.inkSoft, fontSize: "11px" }} className="uppercase">
                    {label}
                  </div>
                  <div style={{ ...body, color: C.ink }} className="font-semibold text-sm mt-1">
                    {v}
                  </div>
                </div>
              </div>
            ))}
            <div style={{ background: C.moss }} className="rounded-2xl h-44 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={22} color={C.forest} className="mx-auto mb-2" />
                <div style={{ ...mono, color: C.forest, fontSize: "11px" }} className="uppercase">
                  Interactive map placeholder
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            {sent ? (
              <div style={{ background: C.moss, border: `1px solid ${C.mossLine}` }} className="rounded-3xl p-10 text-center h-full flex flex-col items-center justify-center">
                <CheckCircle2 size={32} color={C.forest} className="mb-4" />
                <div style={{ ...display, color: C.ink, fontWeight: 600 }} className="text-xl mb-2">
                  Message received
                </div>
                <p style={{ ...body, color: C.inkSoft }} className="text-sm">
                  Demo form — this submission was simulated locally.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                style={{ background: C.parchment, border: `1px solid ${C.mossLine}` }}
                className="rounded-3xl p-8 sm:p-10 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Name" required />
                  <Field label="Email" type="email" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Phone" type="tel" />
                  <Field label="Subject" />
                </div>
                <label className="block">
                  <span style={{ ...mono, color: C.inkSoft, fontSize: "11px" }} className="uppercase">
                    Message
                  </span>
                  <textarea rows={5} style={{ ...body, border: `1px solid ${C.mossLine}` }} className="mt-2 w-full px-4 py-3 rounded-xl bg-white text-sm focus:outline-none" />
                </label>
                <button type="submit" style={{ background: C.gold, color: C.forestDeep, ...body }} className="w-full py-4 rounded-full font-semibold text-sm">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   APP SHELL
   ============================================================ */

export default function App() {
  useFonts();
  const [page, setPage] = useState("home");
  const go = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pages = {
    home: <HomePage go={go} />,
    about: <AboutPage go={go} />,
    programs: <ProgramsPage go={go} />,
    projects: <ProjectsPage go={go} />,
    transparency: <TransparencyPage />,
    donate: <DonatePage />,
    volunteer: <VolunteerPage />,
    partner: <PartnerPage go={go} />,
    leadership: <LeadershipPage />,
    contact: <ContactPage />,
  };

  return (
    <div style={{ ...body, background: C.paper }} className="min-h-screen">
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
        button:focus-visible, input:focus-visible, textarea:focus-visible {
          outline: 2px solid ${C.gold};
          outline-offset: 2px;
        }
      `}</style>
      <Navbar page={page} go={go} />
      {pages[page]}
      <Footer go={go} />
    </div>
  );
}
