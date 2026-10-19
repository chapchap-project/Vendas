import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { ComponentProps, ReactNode } from "react";
import {
  AnimatePresence, motion, motionValue, useInView, useMotionValue, useMotionValueEvent,
  useReducedMotion, useScroll, useSpring,
} from "motion/react";
import type { MotionValue } from "motion/react";
import { Check, KeyRound, MapPin, MessageCircle, Plus, ShoppingBag } from "lucide-react";
import homepageScreenshot from "@/imports/homepage.jpeg";

// ─── Phone screens ───────────────────────────────────────────────────────────
// To use a real screenshot: drop the image in src/imports, import it above and
// set it as `src`. Screens without a `src` render a placeholder.
export const SCREENS = {
  home: { src: homepageScreenshot as string | undefined, label: "Home feed", icon: ShoppingBag },
  university: { src: undefined as string | undefined, label: "Choose your university", icon: MapPin },
  checkout: { src: undefined as string | undefined, label: "Checkout & your 6-digit code", icon: KeyRound },
  chat: { src: undefined as string | undefined, label: "Chat with a seller", icon: MessageCircle },
};
export type ScreenId = keyof typeof SCREENS;
const SCREEN_IDS = Object.keys(SCREENS) as ScreenId[];

const EASE = [0.22, 1, 0.36, 1] as const;
const PHONE_W = 280;
const PHONE_H = 580;

function PhoneScreen({ id }: { id: ScreenId }) {
  const { src, label, icon: Icon } = SCREENS[id];
  if (src) {
    return <img src={src} alt={`Vendas app — ${label}`} className="w-full h-full object-cover object-top" draggable={false} />;
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 px-6 text-center"
      style={{ background: "linear-gradient(160deg, #eef7f2 0%, #d7e3d3 100%)" }}>
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "rgba(47,118,87,0.12)", color: "#2f7657" }}>
        <Icon className="w-7 h-7" />
      </div>
      <p className="text-sm font-bold" style={{ color: "#19352a" }}>{label}</p>
      <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "#7a8c80" }}>Screenshot placeholder</p>
    </div>
  );
}

/** Phone shell. Children are the screen layers stacked inside it. */
function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full h-full select-none">
      <div className="absolute inset-0 -z-10 blur-3xl opacity-30"
        style={{ background: "radial-gradient(ellipse at center, #4d8a68 0%, transparent 70%)" }} />
      <div className="relative w-full h-full border-2 overflow-hidden shadow-2xl"
        style={{ background: "#19352a", borderColor: "rgba(25,53,42,0.14)", borderRadius: "15.7% / 7.6%" }}>
        {children}
      </div>
    </div>
  );
}

// ─── Media query ─────────────────────────────────────────────────────────────
function useMediaQuery(query: string) {
  const subscribe = useCallback((cb: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", cb);
    return () => mql.removeEventListener("change", cb);
  }, [query]);
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}

// ─── Phone slots ─────────────────────────────────────────────────────────────
/**
 * Marks where the phone sits in a section. Below `lg` it renders its own phone
 * that slides in; on `lg`+ it is an invisible landing spot for the travelling
 * phone, which matches its exact position, size and tilt.
 */
export function PhoneSlot({ screen, rotate = 0, desktopOnly = false, className = "" }: {
  screen: ScreenId; rotate?: number; desktopOnly?: boolean; className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div data-phone-slot={screen} data-phone-rotate={rotate}
      className={`relative shrink-0 ${desktopOnly ? "hidden lg:block" : ""} ${reduce ? "" : "lg:invisible"} ${className}`}>
      <motion.div className="w-full h-full"
        initial={{ opacity: 0, y: 48, rotate: 0 }}
        whileInView={{ opacity: 1, y: 0, rotate }}
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        transition={{ duration: 0.8, ease: EASE }}>
        <PhoneShell><PhoneScreen id={screen} /></PhoneShell>
      </motion.div>
    </div>
  );
}

/** Where the travelling phone slips off-screen (sections without a phone). */
export function PhoneExit() {
  return <div data-phone-exit aria-hidden className="hidden lg:block h-0" />;
}

// ─── Travelling phone ────────────────────────────────────────────────────────
type Pose = {
  stop: number;      // scrollY at which this pose is reached
  centerY: number;   // slot centre in page coordinates (for scrolling with the page)
  x: number; y: number; rotate: number; scale: number; opacity: number; chips: number;
  screen: ScreenId;
};

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function measurePoses(): Pose[] {
  const vh = window.innerHeight;
  const vw = document.documentElement.clientWidth;
  const sy = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - vh;
  const poses: Pose[] = [];

  document.querySelectorAll<HTMLElement>("[data-phone-slot],[data-phone-exit]").forEach((el) => {
    const r = el.getBoundingClientRect();
    const centerY = r.top + sy + r.height / 2;
    const stop = Math.max(0, Math.min(maxScroll, centerY - vh / 2));
    const prev = poses[poses.length - 1];
    if (el.dataset.phoneExit !== undefined) {
      if (!prev) return;
      // Already off-screen: stay there until this point.
      if (prev.opacity === 0) { poses.push({ ...prev, stop, centerY }); return; }
      // Slip out on whichever side the phone is already on.
      poses.push({ ...prev, stop, centerY, x: (prev.x < 0 ? -1 : 1) * (vw / 2 + PHONE_W), y: 0, scale: prev.scale * 0.85, rotate: prev.rotate + 8, opacity: 0, chips: 0 });
      return;
    }
    poses.push({
      stop, centerY,
      x: r.left + r.width / 2 - vw / 2,
      y: centerY - stop - vh / 2, // non-zero only when the stop was clamped
      rotate: Number(el.dataset.phoneRotate) || 0,
      scale: r.width / PHONE_W,
      opacity: 1,
      chips: poses.length === 0 ? 1 : 0,
      screen: el.dataset.phoneSlot as ScreenId,
    });
  });

  // Hold each landed pose for a while so the phone rests while its section scrolls.
  const keyframes: Pose[] = [];
  poses.forEach((p, i) => {
    const before = i > 0 ? p.stop - poses[i - 1].stop : Infinity;
    const after = i < poses.length - 1 ? poses[i + 1].stop - p.stop : Infinity;
    const isExit = p.opacity === 0;
    const holdBefore = i === 0 || isExit ? 0 : Math.min(160, before / 3);
    const holdAfter = i === poses.length - 1 || isExit ? 0 : Math.min(160, after / 3);
    if (holdBefore) keyframes.push({ ...p, stop: p.stop - holdBefore });
    keyframes.push(p);
    if (holdAfter) keyframes.push({ ...p, stop: p.stop + holdAfter });
  });
  return keyframes;
}

function TravellingPhoneLayer() {
  const keyframes = useRef<Pose[]>([]);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);
  const scale = useMotionValue(1);
  const opacity = useMotionValue(0);
  const chips = useMotionValue(0);
  const screens = useMemo(
    () => Object.fromEntries(SCREEN_IDS.map((id) => [id, motionValue(0)])) as Record<ScreenId, MotionValue<number>>,
    [],
  );
  const spring = { stiffness: 220, damping: 32, mass: 0.7 };
  const sx = useSpring(x, spring);
  const srotate = useSpring(rotate, spring);
  const sscale = useSpring(scale, spring);

  const update = useCallback(() => {
    const kf = keyframes.current;
    if (!kf.length) return;
    const s = window.scrollY;
    const vh = window.innerHeight;
    let a = kf[0], b = kf[0], t = 0, followY: number | null = null;
    if (s <= kf[0].stop) {
      followY = kf[0].centerY - s - vh / 2;
    } else if (s >= kf[kf.length - 1].stop) {
      a = b = kf[kf.length - 1];
      followY = a.centerY - s - vh / 2;
    } else {
      const i = kf.findIndex((k) => k.stop > s);
      a = kf[i - 1]; b = kf[i];
      t = easeInOut((s - a.stop) / (b.stop - a.stop || 1));
    }
    x.set(lerp(a.x, b.x, t));
    y.set(followY ?? lerp(a.y, b.y, t));
    rotate.set(lerp(a.rotate, b.rotate, t));
    scale.set(lerp(a.scale, b.scale, t));
    opacity.set(lerp(a.opacity, b.opacity, t));
    chips.set(lerp(a.chips, b.chips, Math.min(1, t * 2)));
    // Exits keep the previous screen, so only cross-fade between visible poses.
    for (const id of SCREEN_IDS) {
      screens[id].set(lerp(a.screen === id ? 1 : 0, b.screen === id ? 1 : 0, t));
    }
  }, [x, y, rotate, scale, opacity, chips, screens]);

  useLayoutEffect(() => {
    let first = true;
    const remeasure = () => {
      keyframes.current = measurePoses();
      update();
      if (first) {
        // Start exactly in place instead of springing in from the centre.
        sx.jump(x.get()); srotate.jump(rotate.get()); sscale.jump(scale.get());
        first = false;
      }
    };
    remeasure();
    const ro = new ResizeObserver(remeasure);
    ro.observe(document.body);
    window.addEventListener("resize", remeasure);
    window.addEventListener("load", remeasure);
    document.fonts?.ready.then(remeasure);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("load", remeasure);
      window.removeEventListener("scroll", update);
    };
  }, [update, sx, srotate, sscale, x, rotate, scale]);

  return (
    <div aria-hidden className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center">
      <motion.div style={{ x: sx, y, rotate: srotate, scale: sscale, opacity, width: PHONE_W, height: PHONE_H }} className="relative">
        <PhoneShell>
          {SCREEN_IDS.map((id) => (
            <motion.div key={id} className="absolute inset-0" style={{ opacity: screens[id] }}>
              <PhoneScreen id={id} />
            </motion.div>
          ))}
        </PhoneShell>
        <motion.div style={{ opacity: chips }}>
          <FloatingChip className="-left-14 top-[22%]" delay={0} style={{ background: "#d7e3d3", color: "#19352a" }}>
            <MapPin className="w-3.5 h-3.5" /> Your university
          </FloatingChip>
          <FloatingChip className="-right-6 top-[45%] border" delay={1.2} style={{ background: "#19352a", color: "#f8f6f0", borderColor: "rgba(255,255,255,0.1)" }}>
            <ShoppingBag className="w-3.5 h-3.5" /> Browse listings
          </FloatingChip>
          <FloatingChip className="-left-10 bottom-[28%]" delay={2.4} style={{ background: "#567c66", color: "#fff" }}>
            <Plus className="w-3.5 h-3.5" /> Add a listing
          </FloatingChip>
        </motion.div>
      </motion.div>
    </div>
  );
}

function FloatingChip({ className, style, delay, children }: {
  className: string; style: React.CSSProperties; delay: number; children: ReactNode;
}) {
  return (
    <motion.div className={`absolute flex items-center gap-2 px-3 py-2 rounded-2xl shadow-xl text-xs font-bold ${className}`}
      style={style}
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}>
      {children}
    </motion.div>
  );
}

/** One phone that follows the page on desktop, landing on each <PhoneSlot>. */
export function TravellingPhone() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduce = useReducedMotion();
  if (!isDesktop || reduce) return null;
  return <TravellingPhoneLayer />;
}

// ─── Reveal on scroll ────────────────────────────────────────────────────────
export function Reveal({ children, delay = 0, className, style, y = 24 }: {
  children: ReactNode; delay?: number; className?: string; style?: React.CSSProperties; y?: number;
}) {
  return (
    <motion.div className={className} style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

/** Headline whose words rise in one after another. */
export function StaggerWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
          <motion.span className="inline-block"
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: delay + i * 0.08, ease: EASE }}>
            {word}
          </motion.span>
          {i < text.split(" ").length - 1 && " "}
        </span>
      ))}
    </span>
  );
}

// ─── Magnetic button ─────────────────────────────────────────────────────────
/** A link that leans slightly toward the mouse cursor and presses on tap. */
export function MagneticLink({ children, strength = 0.25, ...props }: ComponentProps<typeof motion.a> & { strength?: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });
  return (
    <motion.a ref={ref} {...props}
      style={{ ...props.style, x, y }}
      whileTap={{ scale: 0.97 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.a>
  );
}

// ─── Safe Pay: steps light up as you scroll ──────────────────────────────────
export function ScrollSteps({ steps }: {
  steps: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }[];
}) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.45"] });
  const [active, setActive] = useState(reduce ? steps.length - 1 : -1);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    setActive(v <= 0 ? -1 : Math.min(steps.length - 1, Math.floor(v * steps.length)));
  });

  return (
    <ol ref={ref} className="relative flex flex-col gap-4">
      {/* Track + fill */}
      <div aria-hidden className="absolute left-6 top-6 bottom-6 w-0.5 -translate-x-1/2 rounded-full" style={{ background: "rgba(248,246,240,0.12)" }} />
      <motion.div aria-hidden className="absolute left-6 top-6 bottom-6 w-0.5 -translate-x-1/2 rounded-full origin-top"
        style={{ background: "#8fc4a5", scaleY: reduce ? 1 : scrollYProgress }} />

      {steps.map(({ icon: Icon, title, desc }, i) => {
        const on = i <= active;
        return (
          <li key={title} className="relative flex gap-5 items-start">
            <div className="relative z-10 w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center transition-all duration-500"
              style={{
                background: on ? "#8fc4a5" : "#203f32",
                color: on ? "#19352a" : "rgba(248,246,240,0.5)",
                boxShadow: on ? "0 0 0 6px rgba(143,196,165,0.15)" : "none",
              }}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 p-5 rounded-3xl border transition-all duration-500"
              style={{
                background: on ? "rgba(248,246,240,0.07)" : "rgba(248,246,240,0.02)",
                borderColor: on ? "rgba(143,196,165,0.35)" : "rgba(248,246,240,0.08)",
                opacity: on ? 1 : 0.55,
              }}>
              <span className="text-[10px] font-bold tracking-widest" style={{ color: on ? "#8fc4a5" : "rgba(248,246,240,0.4)" }}>STEP {i + 1}</span>
              <h3 className="font-bold text-lg mt-1 mb-1.5" style={{ color: "#f8f6f0" }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#b9cbbd" }}>{desc}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

// ─── Safe Pay: code entry demo ───────────────────────────────────────────────
const DEMO_CODE = "482916";

export function CodeDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (!inView) { setTyped(0); return; }
    if (reduce) { setTyped(DEMO_CODE.length + 1); return; }
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      setTyped(n);
      if (n > DEMO_CODE.length) clearInterval(id);
    }, 300);
    return () => clearInterval(id);
  }, [inView, reduce]);

  const released = typed > DEMO_CODE.length;

  return (
    <div ref={ref} className="p-6 rounded-3xl border" style={{ background: "rgba(248,246,240,0.05)", borderColor: "rgba(248,246,240,0.12)" }}>
      <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#8fc4a5" }}>Seller enters your code</p>
      <div className="flex gap-2 sm:gap-3" aria-label={`Example code ${DEMO_CODE}`}>
        {DEMO_CODE.split("").map((digit, i) => {
          const filled = i < typed;
          return (
            <div key={i} className="flex-1 max-w-12 aspect-[4/5] rounded-xl border-2 flex items-center justify-center text-xl sm:text-2xl font-black transition-colors duration-300"
              style={{
                fontFamily: "var(--font-display)",
                borderColor: released ? "#8fc4a5" : filled ? "rgba(248,246,240,0.5)" : "rgba(248,246,240,0.15)",
                background: released ? "rgba(143,196,165,0.15)" : "transparent",
                color: "#f8f6f0",
              }}>
              <AnimatePresence>
                {filled && (
                  <motion.span initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 500, damping: 22 }}>
                    {digit}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      <div className="h-8 mt-4">
        <AnimatePresence>
          {released && (
            <motion.div className="flex items-center gap-2 font-bold" style={{ color: "#8fc4a5" }}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <motion.span className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#8fc4a5", color: "#19352a" }}
                initial={{ scale: 0 }} animate={{ scale: [0, 1.25, 1] }} transition={{ duration: 0.5 }}>
                <Check className="w-4 h-4" strokeWidth={3} />
              </motion.span>
              Payment released to the seller
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
