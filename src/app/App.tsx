import { useState, useEffect } from "react";
import { MotionConfig, motion } from "motion/react";
import {
  ShoppingBag, Shield, Users, Footprints, Laptop, Sofa,
  ArrowRight, Check, MapPin, Menu, X, Tag,
  Zap, Lock, ChevronDown, MessageCircle, TrendingUp,
  Wallet, KeyRound, BadgeCheck, RotateCcw
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import vendaLogo from "@/imports/vendasicon.jpeg";
import {
  CodeDemo, MagneticLink, PhoneExit, PhoneSlot, Reveal, ScrollSteps, StaggerWords, TravellingPhone,
} from "@/app/components/landing-motion";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.chapchap.vendas";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Safe Pay", href: "#safe-pay" },
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
    title: "Protected payments",
    desc: "Your money is held safely until you have the item in your hands.",
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
  { icon: Footprints, name: "Shoes", count: "Fresh looks, less waste", color: "#4f8a63", bg: "#4f8a631f" },
  { icon: Laptop, name: "Electronics", count: "Tech for student life", color: "#3f7f7a", bg: "#3f7f7a1f" },
  { icon: Sofa, name: "Furniture", count: "Room and home finds", color: "#9a6a35", bg: "#9a6a351f" },
  { icon: Tag, name: "Clothing", count: "Fresh looks, less waste", color: "#9a5466", bg: "#9a54661f" },
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

const SAFE_PAY_STEPS = [
  {
    icon: Wallet,
    title: "Pay in the app",
    desc: "Pay for the item with M-Pesa at checkout. You pay the listing price — nothing extra.",
  },
  {
    icon: Lock,
    title: "We hold the money",
    desc: "Your payment is held safely by Vendas. The seller can't touch it yet.",
  },
  {
    icon: MapPin,
    title: "Meet and check the item",
    desc: "Meet at a public campus spot and make sure the item is exactly what you paid for.",
  },
  {
    icon: KeyRound,
    title: "Share your code",
    desc: "Give the seller your 6-digit code. Only then is the money released to them.",
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
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
                className="text-sm font-medium transition-colors hover:text-[#19352a]"
                style={{ color: "#55675d" }}>
                {label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a href={PLAY_STORE_URL}
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
                className="font-medium transition-colors hover:text-[#19352a]"
                style={{ color: "#55675d" }}>
                {label}
              </a>
            ))}
            <a href={PLAY_STORE_URL}
              target="_blank" rel="noopener noreferrer"
              className="text-center py-3 rounded-full font-bold text-sm"
              style={{ background: "#2f7657", color: "#fff" }}>
              Download on Play Store
            </a>
          </div>
        )}
      </nav>

      {/* Desktop: one phone that travels between the <PhoneSlot>s below */}
      <TravellingPhone />

      {/* ── HERO ── */}
      <section className="relative md:min-h-screen flex items-center pt-28 md:pt-20 pb-16 md:pb-24 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ background: "radial-gradient(circle, #4d8a68, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none opacity-10"
          style={{ background: "radial-gradient(circle, #c4d9bd, transparent 70%)" }} />
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(25,53,42,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(25,53,42,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 grid md:grid-cols-2 lg:grid-cols-[1.35fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left copy */}
          <div className="min-w-0">
            <Reveal y={12}>
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full border text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] sm:tracking-widest mb-6 sm:mb-8 shadow-sm"
              style={{ background: "#d7e3d3", borderColor: "rgba(47,118,87,0.28)", color: "#1d5a40" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#2f7657" }} />
              Now launching for students
            </div>
            </Reveal>

            <h1 className="text-[2.2rem] min-[400px]:text-[2.5rem] sm:text-6xl lg:text-[4rem] xl:text-[4.25rem] font-extrabold leading-[1.06] mb-5 sm:mb-6"
              style={{ fontFamily: "var(--font-display)", color: "#19352a" }}>
              <StaggerWords text="Your campus." delay={0.1} /><br />
              <span style={{ color: "#2f7657" }}>
                <StaggerWords text="Your" delay={0.3} />{" "}
                <span className="relative inline-block">
                  <StaggerWords text="marketplace." delay={0.38} />
                  <motion.span className="absolute -bottom-1 left-0 w-full h-1 rounded-full origin-left" style={{ background: "#2f7657" }}
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }} />
                </span>
              </span>
            </h1>

            <Reveal delay={0.5}>
            <p className="text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-[440px]" style={{ color: "#55675d" }}>
              Buy, sell, and discover student essentials in one place. Choose your university and explore items posted for your campus.
            </p>
            </Reveal>

            <Reveal delay={0.65} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
              <MagneticLink href={PLAY_STORE_URL}
                target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl font-bold text-base transition-[opacity,box-shadow] hover:opacity-95 shadow-lg"
                style={{ background: "#2f7657", color: "#fff", boxShadow: "0 12px 32px rgba(25,53,42,0.18)" }}>
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0" aria-hidden="true">
                  <path d="M3.18 23.76c.3.18.66.21.99.09l12.87-7.43-2.97-2.97-10.89 10.31zM.1 2.34C.04 2.55 0 2.78 0 3.03v17.94c0 .25.04.49.1.7l.07.07L10.07 12 .17 2.27l-.07.07zM20.55 10.17l-2.97-1.72-3.33 3.33 3.33 3.33 2.97-1.72c.85-.49.85-1.73 0-2.22zM4.17.15L17.04 7.58l-2.97 2.97L4.17.15z" />
                </svg>
                Download on Play Store
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </MagneticLink>

              <a href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-medium border transition-colors hover:border-[#2f7657]/50 hover:bg-[#2f7657]/5"
                style={{ borderColor: "rgba(25,53,42,0.18)", color: "#2f7657" }}>
                See how it works <ChevronDown className="w-4 h-4" />
              </a>
            </Reveal>

            <Reveal delay={0.8} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#d7e3d3", color: "#2f7657" }}>
                <Users className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium" style={{ color: "#52655a" }}>
                Be among the first to build your campus marketplace.
              </p>
            </Reveal>
          </div>

          {/* Right — phone */}
          <div className="flex justify-center md:justify-end pt-2 sm:pt-0">
            <PhoneSlot screen="home" className="w-[238px] h-[495px] sm:w-[280px] sm:h-[580px]" />
          </div>
        </div>

        {/* Scroll nudge */}
        <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5" style={{ color: "#55675d" }}>
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
          <div className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5" style={{ borderColor: "rgba(25,53,42,0.20)" }}>
            <div className="w-1 h-1.5 rounded-full animate-bounce" style={{ background: "#55675d" }} />
          </div>
        </div>
      </section>

      {/* ── STARTER BENEFITS ── */}
      <section className="py-12 sm:py-14 border-y" style={{ background: "#e6ede1", borderColor: "rgba(25,53,42,0.12)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {STARTER_BENEFITS.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.1} className="flex items-start justify-center md:justify-start gap-4 text-center md:text-left">
                <div className="w-11 h-11 rounded-2xl shrink-0 flex items-center justify-center" style={{ background: "rgba(47,118,87,0.11)", color: "#2f7657" }}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold mb-1" style={{ color: "#19352a" }}>{title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#55675d" }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-16 md:py-24" style={{ background: "#eef1eb" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[auto_1fr] gap-12 lg:gap-20 items-center">
          <div className="order-last lg:order-first flex justify-center">
            <PhoneSlot screen="university" rotate={-6} className="w-[238px] h-[495px] lg:w-[260px] lg:h-[539px]" />
          </div>

          <div>
            <Reveal className="text-center lg:text-left mb-10 md:mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#2f7657" }}>Simple Process</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black" style={{ fontFamily: "var(--font-display)", color: "#19352a", lineHeight: 1.1 }}>
                Three steps to<br />your first deal
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-5">
              {STEPS.map(({ step, title, desc, icon: Icon }, i) => (
                <Reveal key={step} delay={i * 0.12}>
                  <div className="group h-full p-6 sm:p-7 rounded-3xl border transition-transform hover:-translate-y-1 relative lg:flex lg:items-start lg:gap-6"
                    style={{ background: "#f8f9f5", borderColor: "rgba(25,53,42,0.12)" }}>
                    <div className="absolute top-6 right-6 font-black text-4xl" style={{ fontFamily: "var(--font-display)", color: "rgba(25,53,42,0.06)" }}>{step}</div>
                    <div className="w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center mb-6 lg:mb-0 transition-transform group-hover:scale-110"
                      style={{ background: "rgba(47,118,87,0.10)", border: "1px solid rgba(47,118,87,0.20)" }}>
                      <Icon className="w-5 h-5" style={{ color: "#2f7657" }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2" style={{ color: "#19352a" }}>{title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "#55675d" }}>{desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SAFE PAY ── */}
      <section id="safe-pay" className="py-16 md:py-24" style={{ background: "#19352a" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">
          <div>
            <Reveal className="text-center lg:text-left mb-10 md:mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#8fc4a5" }}>Safe-Trade Payments</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-5" style={{ fontFamily: "var(--font-display)", color: "#f8f6f0", lineHeight: 1.1 }}>
                Your money is safe <br className="hidden sm:block" />until you get your item.
              </h2>
              <p className="text-base leading-relaxed max-w-xl mx-auto lg:mx-0" style={{ color: "#b9cbbd" }}>
                No more paying a stranger and hoping they show up. Vendas holds your payment and only releases it when you confirm you've received what you bought.
              </p>
            </Reveal>

            <ScrollSteps steps={SAFE_PAY_STEPS} />

            <Reveal className="mt-6 sm:mt-8">
              <CodeDemo />
            </Reveal>

            <div className="mt-4 sm:mt-5 grid md:grid-cols-2 gap-4 sm:gap-5">
              <Reveal className="flex items-start gap-4 p-6 rounded-3xl" style={{ background: "#2f7657" }}>
                <RotateCcw className="w-6 h-6 shrink-0 mt-0.5" style={{ color: "#fff" }} />
                <div>
                  <p className="font-bold mb-1" style={{ color: "#fff" }}>Didn't get your item? You get your money back.</p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>If you don't receive your item within 24 hours of paying, you're refunded automatically.</p>
                </div>
              </Reveal>
              <Reveal delay={0.1} className="flex items-start gap-4 p-6 rounded-3xl border" style={{ borderColor: "rgba(248,246,240,0.12)" }}>
                <BadgeCheck className="w-6 h-6 shrink-0 mt-0.5" style={{ color: "#8fc4a5" }} />
                <div>
                  <p className="font-bold mb-1" style={{ color: "#f8f6f0" }}>Simple, upfront pricing</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#b9cbbd" }}>Free for buyers. Sellers pay a 5% Safe-Trade fee (min Ksh 10), only when a sale is completed.</p>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="flex justify-center">
            <PhoneSlot screen="checkout" rotate={5} className="w-[238px] h-[495px] lg:w-[280px] lg:h-[580px]" />
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-16 md:py-24 border-y" style={{ background: "#e6ede1", borderColor: "rgba(25,53,42,0.12)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[auto_1fr] gap-12 lg:gap-20 items-center">
          <div className="order-last lg:order-first flex justify-center">
            <PhoneSlot screen="chat" rotate={-3} className="w-[238px] h-[495px] lg:w-[260px] lg:h-[539px]" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-10 items-center">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#2f7657" }}>Why Vendas</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: "var(--font-display)", color: "#19352a", lineHeight: 1.1 }}>
                Built for trust.<br />Designed for speed.
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#55675d" }}>
                We built Vendas because student commerce should feel like trading with a trusted classmate — not a stranger from the internet. Every feature exists to make that true.
              </p>
              <a href={PLAY_STORE_URL}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold text-sm transition-all hover:gap-3"
                style={{ color: "#2f7657" }}>
                Download Vendas <ArrowRight className="w-4 h-4" />
              </a>
            </Reveal>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {FEATURES.map(({ icon: Icon, title, desc, highlight }, i) => (
                <Reveal key={title} delay={i * 0.08}>
                  <div className="h-full p-4 sm:p-6 rounded-3xl border transition-transform hover:-translate-y-1"
                    style={{
                      background: highlight ? "#2f7657" : "#f8f9f5",
                      borderColor: highlight ? "transparent" : "rgba(25,53,42,0.12)",
                    }}>
                    <Icon className="w-6 h-6 mb-4" style={{ color: highlight ? "#fff" : "#2f7657" }} />
                    <h4 className="font-bold text-sm mb-2" style={{ color: highlight ? "#fff" : "#19352a" }}>{title}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: highlight ? "rgba(255,255,255,0.92)" : "#55675d" }}>{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section id="categories" className="py-16 md:py-24" style={{ background: "#eef1eb" }}>
        <PhoneExit />
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <Reveal className="text-center mb-10 md:mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#2f7657" }}>Browse Everything</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black" style={{ fontFamily: "var(--font-display)", color: "#19352a", lineHeight: 1.1 }}>
              Find what you need.<br />Sell what you don't.
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {CATEGORIES.map(({ icon: Icon, name, count, color, bg }, i) => (
              <Reveal key={name} delay={i * 0.08}>
                <div className="group h-full p-4 sm:p-7 rounded-3xl border transition-transform hover:-translate-y-1"
                  style={{ background: "#f8f9f5", borderColor: "rgba(25,53,42,0.12)" }}>
                  <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 transition-transform group-hover:scale-110"
                    style={{ background: bg }}>
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7" style={{ color }} />
                  </div>
                  <h4 className="font-bold text-base mb-1" style={{ color: "#19352a" }}>{name}</h4>
                  <p className="text-xs" style={{ color: "#55675d" }}>{count}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LAUNCH INVITATION ── */}
      <section id="launch" className="py-16 md:py-24 border-y" style={{ background: "#e6ede1", borderColor: "rgba(25,53,42,0.12)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <Reveal className="text-center mb-10 md:mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#2f7657" }}>Early access</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black" style={{ fontFamily: "var(--font-display)", color: "#19352a", lineHeight: 1.1 }}>
              Help make campus<br />commerce better.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {LAUNCH_VALUES.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="group h-full p-6 sm:p-8 rounded-3xl border transition-transform hover:-translate-y-1"
                  style={{ background: "#f8f9f5", borderColor: "rgba(25,53,42,0.12)" }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: "#dfe8dc", color: "#2f7657" }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg mb-3" style={{ color: "#19352a" }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#52655a" }}>{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOWNLOAD CTA ── */}
      <section className="py-20 md:py-28 relative overflow-hidden border-y" style={{ background: "#2f7657", borderColor: "rgba(25,53,42,0.12)" }}>
        {/* Keep the travelling phone off-screen until the launch section has scrolled past */}
        <PhoneExit />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: "#8fc4a5" }} />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: "#19352a" }} />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-24 items-center">
          <Reveal className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-6" style={{ color: "#e3f2e8" }}>Ready to start trading?</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6" style={{ fontFamily: "var(--font-display)", color: "#fff", lineHeight: 1.05 }}>
              Join the first wave<br />on your campus.
            </h2>
            <p className="text-base mb-10 max-w-sm mx-auto lg:mx-0" style={{ color: "rgba(255,255,255,0.92)" }}>
              Download Vendas, add your first listing, and help turn campus into a better place to buy and sell.
            </p>
            <MagneticLink href={PLAY_STORE_URL}
              target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-5 rounded-2xl font-bold text-base transition-[opacity,box-shadow] hover:opacity-95 shadow-2xl"
              style={{ background: "#fff", color: "#19352a", boxShadow: "0 12px 36px rgba(15,35,27,0.35)" }}>
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current flex-shrink-0" aria-hidden="true">
                <path d="M3.18 23.76c.3.18.66.21.99.09l12.87-7.43-2.97-2.97-10.89 10.31zM.1 2.34C.04 2.55 0 2.78 0 3.03v17.94c0 .25.04.49.1.7l.07.07L10.07 12 .17 2.27l-.07.07zM20.55 10.17l-2.97-1.72-3.33 3.33 3.33 3.33 2.97-1.72c.85-.49.85-1.73 0-2.22zM4.17.15L17.04 7.58l-2.97 2.97L4.17.15z" />
              </svg>
              Download on Google Play
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </MagneticLink>
            <p className="mt-5 text-xs" style={{ color: "#e3f2e8" }}>Free to download · Available on Android</p>
          </Reveal>

          <PhoneSlot screen="home" rotate={-4} desktopOnly className="w-[240px] h-[497px]" />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 sm:py-10 border-t" style={{ background: "#12251d", borderColor: "rgba(248,246,240,0.10)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <ImageWithFallback src={vendaLogo} alt="Vendas logo" className="w-9 h-9 rounded-xl object-contain" style={{ background: "#fff" }} />
              <span className="font-black text-lg tracking-tight" style={{ fontFamily: "var(--font-display)", color: "#f8f6f0" }}>Vendas</span>
            </div>
            <p className="text-xs text-center" style={{ color: "#a8b9ac" }}>
              The campus marketplace for students, by students. &copy; {new Date().getFullYear()} Vendas. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs" style={{ color: "#a8b9ac" }}>
              <a href="/privacy-policy/" className="underline-offset-4 transition-colors hover:underline hover:text-white">Privacy Policy</a>
              <a href="/terms/" className="underline-offset-4 transition-colors hover:underline hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </MotionConfig>
  );
}
