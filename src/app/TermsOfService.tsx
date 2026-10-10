import { ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import vendaLogo from "@/imports/vendasicon.jpeg";

const CONTACT_EMAIL = "jilloerick6@gmail.com";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-8 border-t first:border-t-0 first:pt-0" style={{ borderColor: "rgba(25,53,42,0.12)" }}>
      <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-display)", color: "#19352a" }}>{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-6 space-y-1">
      {items.map(item => <li key={item}>{item}</li>)}
    </ul>
  );
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" style={{ fontFamily: "var(--font-body)" }}>

      {/* ── NAV ── */}
      <nav aria-label="Primary navigation" className="border-b" style={{ background: "rgba(238,241,235,0.94)", borderColor: "rgba(25,53,42,0.12)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <ImageWithFallback src={vendaLogo} alt="Vendas logo" className="w-9 h-9 rounded-xl object-contain" style={{ background: "#fff" }} />
            <span className="text-lg font-bold tracking-tight" style={{ fontFamily: "var(--font-display)", color: "#19352a" }}>Vendas</span>
          </a>
          <a href="/" className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70" style={{ color: "#2f7657" }}>
            <ArrowLeft className="w-4 h-4" /> Back to home
          </a>
        </div>
      </nav>

      {/* ── TERMS ── */}
      <main className="max-w-3xl mx-auto px-5 sm:px-6 py-12 sm:py-16 leading-relaxed" style={{ color: "#3d5147" }}>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3" style={{ fontFamily: "var(--font-display)", color: "#19352a" }}>
          Terms of Service
        </h1>
        <p className="mb-10" style={{ color: "#607268" }}>
          <strong>Last Updated:</strong> October 10, 2026
        </p>

        <Section title="1. Eligibility & Registration">
          <p>
            Vendas is a hyper-local marketplace designed for university students. You must possess a valid university email address (.edu or .ac.ke) to register. You are responsible for all activities that occur under your account.
          </p>
        </Section>

        <Section title="2. Safe-Trade System">
          <p>
            When a buyer initiates a payment via M-Pesa, funds are held by Vendas. Funds are only released to the seller once the seller enters the unique 6-digit Verification Code provided by the buyer upon physical receipt of the item.
          </p>
          <p>
            If a buyer does not receive their item within 24 hours of payment, the payment is refunded automatically. Refund processing may take additional time.
          </p>
        </Section>

        <Section title="3. Fees & Payouts">
          <p>
            A non-refundable 5% Safe-Trade fee (min Ksh 10) is deducted from the seller's payout once the transaction is verified. Buyers pay the exact listing price at checkout. Visibility Boosts and Urgent Badges are digital services consumed immediately and are non-refundable. Payouts are processed to the seller's M-Pesa number.
          </p>
        </Section>

        <Section title="4. Prohibited Items">
          <p>Users are strictly prohibited from listing:</p>
          <List items={[
            "Illegal drugs",
            "Weapons",
            "Counterfeit goods",
            "Academic dishonesty services (e.g., assignments)",
            "Adult content",
          ]} />
          <p>Violation results in an immediate and permanent ban.</p>
        </Section>

        <Section title="5. In-Person Safety">
          <p>
            Safety is our priority. Users are encouraged to meet in well-lit, public campus areas. Always verify the physical condition of the item before providing your 6-digit verification code to the seller.
          </p>
        </Section>

        <Section title="6. Privacy">
          <p>
            How we collect and use your information is described in our{" "}
            <a href="/privacy-policy/" className="font-medium underline" style={{ color: "#2f7657" }}>Privacy Policy</a>.
          </p>
        </Section>

        <Section title="7. Contact Us">
          <p>If you have any questions about these Terms, you can contact us at:</p>
          <p>
            Email:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium underline break-all" style={{ color: "#2f7657" }}>{CONTACT_EMAIL}</a>
          </p>
        </Section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="py-8 sm:py-10 border-t" style={{ background: "#12251d", borderColor: "rgba(248,246,240,0.10)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <p className="text-xs text-center" style={{ color: "#a8b9ac" }}>
            The campus marketplace for students, by students. &copy; {new Date().getFullYear()} Vendas. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
