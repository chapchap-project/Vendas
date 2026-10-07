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

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-semibold pt-3" style={{ color: "#19352a" }}>{children}</h3>;
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-6 space-y-1">
      {items.map(item => <li key={item}>{item}</li>)}
    </ul>
  );
}

export default function PrivacyPolicy() {
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

      {/* ── POLICY ── */}
      <main className="max-w-3xl mx-auto px-5 sm:px-6 py-12 sm:py-16 leading-relaxed" style={{ color: "#3d5147" }}>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3" style={{ fontFamily: "var(--font-display)", color: "#19352a" }}>
          Privacy Policy for Vendas
        </h1>
        <p className="mb-10" style={{ color: "#607268" }}>
          <strong>Last Updated:</strong> April 16, 2026
        </p>

        <Section title="1. Introduction">
          <p>
            Vendas ("we", "our", or "us") operates a mobile application that allows users to browse, purchase, and manage products online. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.
          </p>
          <p>By using Vendas, you agree to the collection and use of information in accordance with this policy.</p>
        </Section>

        <Section title="2. Information We Collect">
          <SubHeading>a) Personal Information</SubHeading>
          <p>We may collect personally identifiable information, including but not limited to:</p>
          <List items={["Full name", "Email address", "Phone number", "Shipping and billing address"]} />

          <SubHeading>b) Payment Information</SubHeading>
          <p>Payments made through Vendas are processed securely by third-party payment providers. We do not store or have direct access to your full card details.</p>

          <SubHeading>c) Device and Usage Information</SubHeading>
          <p>We may automatically collect certain information when you use the app, including:</p>
          <List items={["Device type and operating system", "App usage data and interactions", "IP address", "Log data"]} />

          <SubHeading>d) Advertising ID</SubHeading>
          <p>Our application may use the Advertising ID provided by <strong>Google</strong> to:</p>
          <List items={["Deliver relevant advertisements", "Measure ad performance", "Improve user experience"]} />
          <p>Users can reset or disable their Advertising ID through their device settings.</p>
        </Section>

        <Section title="3. How We Use Your Information">
          <p>We use the information we collect to:</p>
          <List items={[
            "Create and manage your account",
            "Process and fulfill orders",
            "Communicate with you (order updates, support)",
            "Improve our services and user experience",
            "Detect and prevent fraud or abuse",
            "Analyze app performance and usage trends",
            "Provide personalized content and advertisements (if applicable)",
          ]} />
        </Section>

        <Section title="4. Sharing Your Information">
          <p>We may share your information with:</p>
          <List items={[
            "Payment processors (to complete transactions)",
            "Hosting and cloud service providers",
            "Analytics providers",
            "Delivery or logistics partners (where applicable)",
          ]} />
          <p>We do not sell your personal data to third parties.</p>
        </Section>

        <Section title="5. Data Security">
          <p>We implement reasonable administrative, technical, and physical security measures to protect your personal data. However, no method of transmission over the internet or electronic storage is 100% secure.</p>
        </Section>

        <Section title="6. Data Retention">
          <p>We retain your personal information only for as long as necessary to:</p>
          <List items={["Provide our services", "Comply with legal obligations", "Resolve disputes", "Enforce our agreements"]} />
        </Section>

        <Section title="7. Your Rights">
          <p>Depending on your location, you may have the right to:</p>
          <List items={[
            "Access the personal data we hold about you",
            "Request correction of inaccurate data",
            "Request deletion of your data",
          ]} />
          <p>To exercise these rights, please contact us using the details below.</p>
        </Section>

        <Section title="8. Children's Privacy">
          <p>Vendas is not intended for use by children under the age of 13. We do not knowingly collect personal data from children.</p>
        </Section>

        <Section title="9. Changes to This Privacy Policy">
          <p>We may update this Privacy Policy from time to time. We will notify users of any significant changes by updating the "Last Updated" date.</p>
        </Section>

        <Section title="10. Contact Us">
          <p>If you have any questions about this Privacy Policy, you can contact us at:</p>
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
