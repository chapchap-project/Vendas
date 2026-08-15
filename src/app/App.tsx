import { useState, useEffect } from "react";
import {
  ShoppingBag, Shield, Users, BookOpen, Laptop, Sofa,
  Star, ArrowRight, Check, MapPin, Menu, X, Tag,
  Zap, Lock, ChevronDown, MessageCircle, TrendingUp, Smartphone, Bell, Grid2X2, Heart, Home, Plus
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import vendaLogo from "@/imports/vendasicon.jpeg";
import homepageScreenshot from "@/imports/homepage.jpeg";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Categories", href: "#categories" },
  { label: "Launch", href: "#launch" },
];

const STARTER_BENEFITS = [
  { icon: ShoppingBag, title: "Buy smarter", desc: "Find student essentials closer to home." },
  { icon: Tag, title: "Sell simply", desc: "Give the things you no longer need a new life." },
  { icon: Users, title: "Build it together", desc: "Help create a better way to trade on campus." },
];

const STEPS = [
  {
    step: "01",
    title: "Sign up and choose your university",
    desc: "Create your profile with your email, then choose the university community you want to join.",
    icon: Users,
  },
  {
    step: "02",
    title: "Browse your university marketplace",
    desc: "See listings filtered for your selected university, or post something you no longer need.",
    icon: ShoppingBag,
  },
  {
    step: "03",
    title: "Meet & Trade on Campus",
    desc: "Message, agree on the details, and choose a public campus spot that works for you.",
    icon: Check,
  },
];

const FEATURES = [
  {
    icon: Shield,
    title: "Choose your university",
    desc: "Select your university when you join, so Vendas can tailor the marketplace to your campus.",
    highlight: true,
  },
  {
    icon: Zap,
    title: "Easy to list",
    desc: "Add a photo, set a price, and share what you have to offer.",
    highlight: false,
  },
  {
    icon: Lock,
    title: "Trade with care",
    desc: "Use messages to agree on a deal, then meet in a public place.",
    highlight: false,
  },
  {
    icon: MapPin,
    title: "Listings for your campus",
    desc: "Browse items filtered for your selected university and keep useful things circulating locally.",
    highlight: false,
  },
];

const CATEGORIES = [
  { icon: BookOpen, name: "Textbooks", count: "Study essentials", color: "#8fb69b", bg: "#8fb69b1f" },
  { icon: Laptop, name: "Electronics", count: "Tech for student life", color: "#78a7a2", bg: "#78a7a21f" },
  { icon: Sofa, name: "Furniture", count: "Room and home finds", color: "#c49a6c", bg: "#c49a6c1f" },
  { icon: Tag, name: "Clothing", count: "Fresh looks, less waste", color: "#b77d8c", bg: "#b77d8c1f" },
];

const LAUNCH_VALUES = [
  {
    icon: MapPin,
    title: "Start where you are",
    text: "Vendas is launching campus by campus. Your early listings help make it useful for everyone.",
  },
  {
    icon: TrendingUp,
    title: "Shape the marketplace",
    text: "What students buy, sell, and ask for now will shape what Vendas becomes next.",
  },
  {
    icon: MessageCircle,
    title: "Your feedback matters",
    text: "Try the app, tell us what works, and help us build a better way to trade on campus.",
  },
];

const MOCK_LISTINGS = [
  { name: "Flowers", price: "Ksh 1,500", badge: "Other", icon: Tag, iconColor: "#e36a7c", image: "linear-gradient(135deg, #f7c8cf, #e94f69)" },
  { name: "Thinkpad", price: "Ksh 20,000", badge: "Electronics", icon: Laptop, iconColor: "#607268", image: "linear-gradient(135deg, #26312d, #5d6f68)" },
  { name: "Game pad", price: "Ksh 10", badge: "Electronics", icon: Zap, iconColor: "#4e9791", image: "linear-gradient(135deg, #39a99b, #c54a61)" },
  { name: "Infinix", price: "Ksh 200", badge: "Electronics", icon: Smartphone, iconColor: "#747aa1", image: "linear-gradient(135deg, #30343c, #9298c7)" },
];

function PhoneMockup() {
  return (
    <div className="relative select-none">
      {/* Glow behind phone */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-30"
        style={{ background: "radial-gradient(ellipse at center, #4d8a68 0%, transparent 70%)" }} />

      {/* Phone shell */}
      <div className="w-[280px] h-[580px] rounded-[44px] border-2 overflow-hidden shadow-2xl flex flex-col"
        style={{ background: "#19352a", borderColor: "rgba(248,246,240,0.14)" }}>
        <img src={homepageScreenshot} alt="Vendas app home screen showing listings picked for the user" className="w-full h-full object-cover object-top" />

        <div className="hidden">
      <div className="flex items-center justify-between px-6 pt-4 pb-2" style={{ color: "#52655a" }}>
          <span className="text-[10px] font-bold">7:45 AM</span>
          <div className="w-20 h-5 rounded-full" style={{ background: "#19352a" }} />
          <span className="text-[9px] font-bold">5G&nbsp; ▰</span>
        </div>

        <div className="px-4 pt-4 pb-5 border-b" style={{ background: "#eef7f7", borderColor: "#dce9e7" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black tracking-wide" style={{ color: "#52655a" }}>WELCOME BACK</p>
              <p className="text-lg font-black mt-1" style={{ color: "#101714" }}>Erick!</p>
            </div>
            <div className="flex gap-3 items-center" style={{ color: "#101714" }}>
              <Bell className="w-6 h-6" strokeWidth={2.5} />
              <div className="relative"><ShoppingBag className="w-6 h-6" strokeWidth={2.5} /><span className="absolute -top-2 -right-2 w-4 h-4 text-[8px] rounded-full flex items-center justify-center text-white" style={{ background: "#ee4555" }}>1</span></div>
            </div>
          </div>
        </div>

        <div className="px-4 pt-4 pb-3 flex items-center gap-2" style={{ color: "#101714" }}>
          <Zap className="w-5 h-5" strokeWidth={2.5} />
          <p className="text-sm font-black">Picked For You</p>
        </div>

        <div className="flex-1 px-3 grid grid-cols-2 gap-3 overflow-hidden content-start">
          {MOCK_LISTINGS.map((item) => (
            <div key={item.name} className="rounded-2xl border p-2.5" style={{ background: "#fff", borderColor: "#d8dfda" }}>
              <div className="aspect-square rounded-xl mb-3 flex items-center justify-center" style={{ background: item.image }}>
                <item.icon className="w-8 h-8 text-white/90" strokeWidth={2} />
              </div>
              <p className="text-[11px] font-black truncate" style={{ color: "#101714" }}>{item.name}</p>
              <p className="text-[8px] font-bold uppercase tracking-wide mt-1" style={{ color: "#607268" }}>{item.badge}</p>
              <div className="flex items-center justify-between mt-3">
                <p className="text-[10px] font-black" style={{ color: "#101714" }}>{item.price}</p>
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#e8f0ea", color: "#19352a" }}><ShoppingBag className="w-3.5 h-3.5" /></div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t px-4 py-3 flex items-center justify-between" style={{ borderColor: "#d8dfda", background: "#fff" }}>
          <Home className="w-5 h-5" style={{ color: "#2f7657" }} />
          <Grid2X2 className="w-5 h-5" style={{ color: "#7a817d" }} />
          <div className="w-11 h-11 -mt-7 rounded-full border-4 flex items-center justify-center shadow-lg" style={{ background: "#217642", color: "#fff", borderColor: "#eaf3ec" }}><Plus className="w-6 h-6" strokeWidth={3} /></div>
          <Heart className="w-5 h-5" style={{ color: "#7a817d" }} />
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[8px] font-bold" style={{ background: "#e8f0ea", color: "#2f7657" }}>ER</div>
        </div>
        </div>
      </div>

      {/* Floating chips */}
      <div className="absolute -left-14 top-[22%] flex items-center gap-2 px-3 py-2 rounded-2xl shadow-xl text-xs font-bold"
        style={{ background: "#d7e3d3", color: "#19352a" }}>
        <MapPin className="w-3.5 h-3.5" /> Your university
      </div>
      <div className="absolute -right-12 top-[45%] flex items-center gap-2 px-3 py-2 rounded-2xl shadow-xl text-xs font-bold border"
        style={{ background: "#19352a", color: "#f8f6f0", borderColor: "rgba(255,255,255,0.1)" }}>
        <ShoppingBag className="w-3.5 h-3.5" /> Browse listings
      </div>
      <div className="absolute -left-10 bottom-[28%] flex items-center gap-1.5 px-3 py-2 rounded-2xl shadow-xl text-xs font-bold"
        style={{ background: "#567c66", color: "#fff" }}>
        <Plus className="w-3.5 h-3.5" /> Add a listing
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" style={{ fontFamily: "var(--font-body)" }}>

      {/* ── NAV ── */}
      <nav aria-label="Primary navigation" className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "border-b" : ""}`}
        style={{ background: scrolled ? "rgba(238,241,235,0.94)" : "transparent", borderColor: "rgba(25,53,42,0.12)", backdropFilter: scrolled ? "blur(16px)" : "none" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <ImageWithFallback src={vendaLogo} alt="Vendas logo" className="w-9 h-9 rounded-xl object-contain" style={{ background: "#fff" }} />
            <span className="text-lg font-bold tracking-tight" style={{ fontFamily: "var(--font-display)", color: "#19352a" }}>Vendas</span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href}
                className="text-sm font-medium transition-colors hover:text-white"
                style={{ color: "#607268" }}>
                {label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a href="https://play.google.com/store/apps/details?id=com.chapchap.vendas"
            target="_blank" rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:opacity-90 hover:scale-105 active:scale-95"
            style={{ background: "#2f7657", color: "#fff" }}>
            Get the App <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile menu toggle */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(v => !v)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close menu" : "Open menu"}>
            {menuOpen ? <X className="w-5 h-5" style={{ color: "#19352a" }} /> : <Menu className="w-5 h-5" style={{ color: "#19352a" }} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div id="mobile-navigation" className="md:hidden border-b px-6 py-5 flex flex-col gap-5"
            style={{ background: "rgba(238,241,235,0.98)", borderColor: "rgba(25,53,42,0.12)" }}>
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}
                className="font-medium transition-colors hover:text-white"
                style={{ color: "#607268" }}>
                {label}
              </a>
            ))}
            <a href="https://play.google.com/store/apps/details?id=com.chapchap.vendas"
              target="_blank" rel="noopener noreferrer"
              className="text-center py-3 rounded-full font-bold text-sm"
              style={{ background: "#2f7657", color: "#fff" }}>
              Download on Play Store
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-20 pb-24 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ background: "radial-gradient(circle, #4d8a68, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none opacity-10"
          style={{ background: "radial-gradient(circle, #c4d9bd, transparent 70%)" }} />
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-bold uppercase tracking-widest mb-8 shadow-sm"
              style={{ background: "#d7e3d3", borderColor: "rgba(47,118,87,0.28)", color: "#1d5a40" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#2f7657" }} />
              Now launching for students
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.02] mb-6"
              style={{ fontFamily: "var(--font-display)", color: "#19352a" }}>
              Trade Smart.<br />
              <span style={{ color: "#2f7657" }}>Study</span>{" "}
              <span className="relative inline-block">
                Hard.
                <span className="absolute -bottom-1 left-0 w-full h-1 rounded-full" style={{ background: "#2f7657" }} />
              </span>
            </h1>

            <p className="text-lg leading-relaxed mb-10 max-w-[440px]" style={{ color: "#607268" }}>
              Buy, sell, and discover student essentials in one place. Choose your university and explore items posted for your campus.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a href="https://play.google.com/store/apps/details?id=com.chapchap.vendas"
                target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl font-bold text-base transition-all hover:opacity-90 hover:scale-105 active:scale-95 shadow-lg"
                style={{ background: "#2f7657", color: "#fff", boxShadow: "0 12px 32px rgba(25,53,42,0.18)" }}>
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0" aria-hidden="true">
                  <path d="M3.18 23.76c.3.18.66.21.99.09l12.87-7.43-2.97-2.97-10.89 10.31zM.1 2.34C.04 2.55 0 2.78 0 3.03v17.94c0 .25.04.49.1.7l.07.07L10.07 12 .17 2.27l-.07.07zM20.55 10.17l-2.97-1.72-3.33 3.33 3.33 3.33 2.97-1.72c.85-.49.85-1.73 0-2.22zM4.17.15L17.04 7.58l-2.97 2.97L4.17.15z" />
                </svg>
                Download on Play Store
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-medium border transition-colors hover:border-white/20"
                style={{ borderColor: "rgba(25,53,42,0.18)", color: "#2f7657" }}>
                See how it works <ChevronDown className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#d7e3d3", color: "#2f7657" }}>
                <Users className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium" style={{ color: "#52655a" }}>
                Be among the first to build your campus marketplace.
              </p>
            </div>
          </div>

          {/* Right — phone */}
          <div className="flex justify-center md:justify-end">
            <PhoneMockup />
          </div>
        </div>

        {/* Scroll nudge */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5" style={{ color: "#607268" }}>
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
          <div className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5" style={{ borderColor: "rgba(25,53,42,0.20)" }}>
            <div className="w-1 h-1.5 rounded-full animate-bounce" style={{ background: "#607268" }} />
          </div>
        </div>
      </section>

      {/* ── STARTER BENEFITS ── */}
      <section className="py-14 border-y" style={{ background: "#dfe8dc", borderColor: "rgba(25,53,42,0.12)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {STARTER_BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start justify-center md:justify-start gap-4 text-center md:text-left">
                <div className="w-11 h-11 rounded-2xl shrink-0 flex items-center justify-center" style={{ background: "rgba(47,118,87,0.11)", color: "#2f7657" }}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold mb-1" style={{ color: "#19352a" }}>{title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#607268" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24" style={{ background: "#eef1eb" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#2f7657" }}>Simple Process</p>
            <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "var(--font-display)", color: "#19352a", lineHeight: 1.1 }}>
              Three steps to<br />your first deal
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connector */}
            <div className="hidden md:block absolute top-12 left-[36%] right-[36%] h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)" }} />

            {STEPS.map(({ step, title, desc, icon: Icon }, i) => (
              <div key={i} className="group p-8 rounded-3xl border transition-all hover:-translate-y-1 relative"
                style={{ background: "#f8f9f5", borderColor: "rgba(25,53,42,0.12)" }}>
                <div className="absolute top-6 right-6 font-black text-4xl" style={{ fontFamily: "var(--font-display)", color: "rgba(25,53,42,0.06)" }}>{step}</div>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:scale-110"
                  style={{ background: "rgba(47,118,87,0.10)", border: "1px solid rgba(47,118,87,0.20)" }}>
                  <Icon className="w-5 h-5" style={{ color: "#2f7657" }} />
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: "#19352a" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#607268" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 border-y" style={{ background: "#e5ebe2", borderColor: "rgba(25,53,42,0.12)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#2f7657" }}>Why Vendas</p>
              <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: "var(--font-display)", color: "#19352a", lineHeight: 1.1 }}>
                Built for trust.<br />Designed for speed.
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#607268" }}>
                We built Vendas because student commerce should feel like trading with a trusted classmate — not a stranger from the internet. Every feature exists to make that true.
              </p>
              <a href="https://play.google.com/store/apps/details?id=com.chapchap.vendas"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold text-sm transition-all hover:gap-3"
                style={{ color: "#2f7657" }}>
                Download Vendas <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {FEATURES.map(({ icon: Icon, title, desc, highlight }, i) => (
                <div key={i} className="p-6 rounded-3xl border transition-all hover:-translate-y-1"
                  style={{
                    background: highlight ? "#2f7657" : "#f8f9f5",
                    borderColor: highlight ? "transparent" : "rgba(25,53,42,0.12)",
                  }}>
                  <Icon className="w-6 h-6 mb-4" style={{ color: highlight ? "#fff" : "#2f7657" }} />
                  <h4 className="font-bold text-sm mb-2" style={{ color: highlight ? "#fff" : "#19352a" }}>{title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: highlight ? "rgba(255,255,255,0.75)" : "#607268" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section id="categories" className="py-24" style={{ background: "#eef1eb" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#2f7657" }}>Browse Everything</p>
            <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "var(--font-display)", color: "#19352a", lineHeight: 1.1 }}>
              Find what you need.<br />Sell what you don't.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map(({ icon: Icon, name, count, color, bg }, i) => (
              <div key={i} className="group p-7 rounded-3xl border transition-all hover:-translate-y-1"
                style={{ background: "#f8f9f5", borderColor: "rgba(25,53,42,0.12)" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                  style={{ background: bg }}>
                  <Icon className="w-7 h-7" style={{ color }} />
                </div>
                <h4 className="font-bold text-base mb-1" style={{ color: "#19352a" }}>{name}</h4>
                <p className="text-xs" style={{ color: "#607268" }}>{count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LAUNCH INVITATION ── */}
      <section id="launch" className="py-24 border-y" style={{ background: "#e5ebe2", borderColor: "rgba(25,53,42,0.12)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#2f7657" }}>Early access</p>
            <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "var(--font-display)", color: "#19352a", lineHeight: 1.1 }}>
              Help make campus<br />commerce better.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {LAUNCH_VALUES.map(({ icon: Icon, title, text }, i) => (
              <div key={i} className="group p-8 rounded-3xl border transition-all hover:-translate-y-1"
                style={{ background: "#f8f9f5", borderColor: "rgba(25,53,42,0.12)" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: "#dfe8dc", color: "#2f7657" }}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg mb-3" style={{ color: "#19352a" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#52655a" }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOWNLOAD CTA ── */}
      <section className="py-28 relative overflow-hidden border-y" style={{ background: "#d7e3d3", borderColor: "rgba(25,53,42,0.12)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: "#ECFDF3" }} />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-15" style={{ background: "#c4d9bd" }} />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-6" style={{ color: "#2f7657" }}>Ready to start trading?</p>
          <h2 className="text-5xl md:text-6xl font-black mb-6" style={{ fontFamily: "var(--font-display)", color: "#19352a", lineHeight: 1.05 }}>
            Join the first wave<br />on your campus.
          </h2>
          <p className="text-base mb-10 max-w-sm mx-auto" style={{ color: "#52655a" }}>
            Download Vendas, add your first listing, and help turn campus into a better place to buy and sell.
          </p>
          <a href="https://play.google.com/store/apps/details?id=com.chapchap.vendas"
            target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-5 rounded-2xl font-bold text-base transition-all hover:opacity-95 hover:scale-105 active:scale-95 shadow-2xl"
            style={{ background: "#2f7657", color: "#fff", boxShadow: "0 12px 36px rgba(25,53,42,0.18)" }}>
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current flex-shrink-0" aria-hidden="true">
              <path d="M3.18 23.76c.3.18.66.21.99.09l12.87-7.43-2.97-2.97-10.89 10.31zM.1 2.34C.04 2.55 0 2.78 0 3.03v17.94c0 .25.04.49.1.7l.07.07L10.07 12 .17 2.27l-.07.07zM20.55 10.17l-2.97-1.72-3.33 3.33 3.33 3.33 2.97-1.72c.85-.49.85-1.73 0-2.22zM4.17.15L17.04 7.58l-2.97 2.97L4.17.15z" />
            </svg>
            Download on Google Play
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <p className="mt-5 text-xs" style={{ color: "#607268" }}>Free to download · Available on Android</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 border-t" style={{ background: "#12251d", borderColor: "rgba(248,246,240,0.10)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <ImageWithFallback src={vendaLogo} alt="Vendas logo" className="w-9 h-9 rounded-xl object-contain" style={{ background: "#fff" }} />
              <span className="font-black text-lg tracking-tight" style={{ fontFamily: "var(--font-display)", color: "#f8f6f0" }}>Vendas</span>
            </div>
            <p className="text-xs text-center" style={{ color: "#a8b9ac" }}>
              The campus marketplace for students, by students. &copy; {new Date().getFullYear()} Vendas. All rights reserved.
            </p>
            <span className="text-xs" style={{ color: "#a8b9ac" }}>Built for campus life</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
