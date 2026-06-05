import { useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Link } from "react-router"
import {
  Wifi, Users, CreditCard, BarChart3, Bell, ShieldCheck,
  ArrowRight, Zap, Globe, TrendingUp,
} from "lucide-react"

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const features = [
  { icon: Users, title: "Customer Management", desc: "Add, update, and track every customer. Store contact details, connection plans, and account status in one place." },
  { icon: CreditCard, title: "Payment Tracking", desc: "Log monthly payments, flag overdue accounts, and keep a full payment history per customer — automatically." },
  { icon: Bell, title: "Overdue Alerts", desc: "Know exactly who hasn't paid and when their due date passed. Never chase a customer blindly again." },
  { icon: BarChart3, title: "Expense & Savings", desc: "Log your monthly expenses, track revenue, and see your net savings computed automatically." },
  { icon: ShieldCheck, title: "Historical Records", desc: "Every payment, every change — stored forever. Audit anything, anytime, without digging through spreadsheets." },
  { icon: TrendingUp, title: "Revenue Insights", desc: "Monthly revenue trends, collection rates, and growth metrics so you can make smart decisions." },
]

const stats = [
  { value: "200+", label: "ISPs onboarded" },
  { value: "50k+", label: "Customers managed" },
  { value: "99.9%", label: "Uptime guarantee" },
  { value: "2 min", label: "Setup time" },
]

const steps = [
  { step: "01", title: "Create your account", desc: "Register your ISP in under 2 minutes. Give it a name, set your preferences, and you're in." },
  { step: "02", title: "Add your customers", desc: "Import existing customers or add them one by one. Set their plan, due date, and contact details." },
  { step: "03", title: "Track everything", desc: "Log payments as they come in, see who's overdue, and watch your revenue grow month by month." },
]

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <div className="bg-bg text-text overflow-x-hidden" style={{ fontFamily: "var(--font-sans)" }}>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-8 transition-all duration-300 ${scrolled ? "bg-bg/90 backdrop-blur-md border-b border-border" : ""}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between h-17">
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Wifi size={17} color="white" />
            </div>
            <span className="text-lg font-extrabold text-text" style={{ fontFamily: "var(--font-heading)" }}>NetFlow</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {["Features", "About"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-text-muted hover:text-primary transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link to="/login" className="text-sm font-medium text-text-muted hover:text-text transition-colors px-4 py-2">Sign in</Link>
            <Link to="/register"
              className="text-sm hidden md:block font-bold text-white bg-primary hover:bg-primary-dark px-4 py-2 md:px-5 md:py-2.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25">
              <span className="hidden md:inline">Get started free</span>
              <span className="md:hidden">Get started</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-8 pt-28 pb-20 overflow-hidden">
        {/* Blobs */}
        <motion.div
          style={{ position: "absolute", top: -160, right: -160, width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.35) 0%, rgba(124,58,237,0.12) 40%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }}
          animate={{ x: [0, 40, -20, 0], y: [0, -60, 40, 0], scale: [1, 1.1, 0.93, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{ position: "absolute", bottom: -80, left: -130, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.3) 0%, rgba(167,139,250,0.1) 45%, transparent 70%)", filter: "blur(70px)", pointerEvents: "none" }}
          animate={{ x: [0, -50, 60, 0], y: [0, 30, -40, 0], scale: [1, 1.07, 0.96, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{ position: "absolute", top: "35%", left: "30%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 65%)", filter: "blur(50px)", pointerEvents: "none" }}
          animate={{ x: [0, 60, -40, 20, 0], y: [0, -40, 60, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{ position: "absolute", top: "20%", left: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(196,181,253,0.2) 0%, transparent 65%)", filter: "blur(50px)", pointerEvents: "none" }}
          animate={{ x: [0, 30, -20, 0], y: [0, 50, -30, 0], scale: [1, 1.15, 0.9, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary-muted text-primary rounded-full px-4 py-1.5 text-[13px] font-bold mb-7"
          >
            <Zap size={13} />
            Built for ISP owners — not accountants
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.8rem,6vw,5rem)] font-extrabold leading-[1.08] text-text mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Run your ISP like a{" "}
            <span className="bg-gradient-to-br from-primary to-violet-400 bg-clip-text text-transparent">
              pro
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(1rem,2vw,1.2rem)] text-text-muted leading-relaxed max-w-xl mx-auto mb-10"
          >
            Manage customers, track payments, flag overdue accounts, and see your revenue — all from one clean dashboard. No spreadsheets. No chaos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            <Link to="/register"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-7 py-3.5 rounded-xl text-[15px] transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30">
              Set up your ISP for free <ArrowRight size={16} />
            </Link>
            <a href="#features"
              className="inline-flex items-center gap-2 bg-white text-text hover:text-primary font-semibold px-7 py-3.5 rounded-xl text-[15px] border border-border hover:border-primary transition-all">
              See how it works
            </a>
          </motion.div>

          {/* Floating trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-4 mt-8 flex-wrap"
          >
            {[
              { icon: "✓", text: "Free to start" },
              { icon: "✓", text: "No credit card required" },
              { icon: "✓", text: "Setup in 2 minutes" },
            ].map(b => (
              <div key={b.text} className="flex items-center gap-1.5 text-sm text-text-muted">
                <span className="text-primary font-bold">{b.icon}</span>
                {b.text}
              </div>
            ))}
          </motion.div>

          {/* Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 bg-white rounded-2xl border border-border overflow-hidden shadow-2xl shadow-black/8"
          >
            {/* Browser bar */}
            <div className="bg-bg border-b border-border px-5 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-danger" />
              <div className="w-3 h-3 rounded-full bg-warning" />
              <div className="w-3 h-3 rounded-full bg-success" />
              <div className="flex-1 mx-4 bg-white border border-border rounded-md px-3 py-1 text-xs text-text-muted">
                app.netflow.io/dashboard
              </div>
            </div>
            {/* Dashboard content */}
            <div className="p-7">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Total Customers", value: "248", color: "text-primary", bg: "bg-primary-muted" },
                  { label: "Collected This Month", value: "PKR 186,400", color: "text-success", bg: "bg-success/10" },
                  { label: "Overdue", value: "17", color: "text-danger", bg: "bg-danger/10" },
                  { label: "Net Savings", value: "PKR 42,000", color: "text-warning", bg: "bg-warning/10" },
                ].map(s => (
                  <div key={s.label} className={`${s.bg} rounded-xl p-4`}>
                    <div className={`text-[11px] font-bold uppercase tracking-wider ${s.color} mb-1.5`}>{s.label}</div>
                    <div className="text-xl font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</div>
                  </div>
                ))}
              </div>
              <div className="border border-border rounded-xl overflow-hidden">
                <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr] px-4 py-2.5 bg-bg border-b border-border">
                  {["Customer", "Plan", "Due Date", "Status"].map(h => (
                    <div key={h} className="text-[11px] font-bold text-text-muted uppercase tracking-wider">{h}</div>
                  ))}
                </div>
                {[
                  { name: "Ahmed Raza", plan: "10 Mbps", due: "Jun 1", status: "Paid", color: "text-success bg-success/10" },
                  { name: "Sara Malik", plan: "25 Mbps", due: "May 28", status: "Overdue", color: "text-danger bg-danger/10" },
                  { name: "Usman Tariq", plan: "50 Mbps", due: "Jun 5", status: "Pending", color: "text-warning bg-warning/10" },
                ].map((row, i) => (
                  <div key={i} className={`grid grid-cols-[2fr_1.5fr_1fr_1fr] px-4 py-3 items-center ${i < 2 ? "border-b border-border/50" : ""}`}>
                    <div className="text-sm font-medium">{row.name}</div>
                    <div className="text-sm text-text-muted">{row.plan}</div>
                    <div className="text-sm text-text-muted">{row.due}</div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full inline-block ${row.color}`}>{row.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-white border-y border-border">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-8">
          {stats.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.08}>
              <div className="text-4xl font-extrabold text-primary mb-1.5" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</div>
              <div className="text-sm font-medium text-text-muted">{s.label}</div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative py-24 px-8 overflow-hidden">
        <motion.div
          style={{ position: "absolute", top: -100, left: -100, width: 550, height: 550, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, rgba(124,58,237,0.06) 50%, transparent 70%)", filter: "blur(70px)", pointerEvents: "none" }}
          animate={{ x: [0, -50, 60, 0], y: [0, 30, -40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{ position: "absolute", bottom: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 65%)", filter: "blur(60px)", pointerEvents: "none" }}
          animate={{ x: [0, 40, -30, 0], y: [0, -50, 30, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeUp className="text-center mb-16">
            <div className="inline-flex items-center gap-1.5 bg-primary-muted text-primary rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-widest mb-4">
              <Globe size={12} /> Features
            </div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold text-text mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Everything you need to manage your ISP
            </h2>
            <p className="text-[17px] text-text-muted max-w-lg mx-auto leading-relaxed">
              Built specifically for small and mid-sized internet service providers. No bloat. No complexity.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FadeUp key={f.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(124,58,237,0.10)" }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border border-border rounded-2xl p-7 h-full cursor-default hover:border-primary transition-colors duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary-muted flex items-center justify-center mb-5">
                    <f.icon size={20} className="text-primary" color="var(--color-primary)" />
                  </div>
                  <h3 className="text-[17px] font-bold text-text mb-2.5" style={{ fontFamily: "var(--font-heading)" }}>{f.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{f.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="about" className="relative py-24 px-8 bg-white border-t border-border overflow-hidden">
        <motion.div
          style={{ position: "absolute", top: -60, left: -60, width: 450, height: 450, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 65%)", filter: "blur(65px)", pointerEvents: "none" }}
          animate={{ x: [0, 40, -20, 0], y: [0, 30, -40, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{ position: "absolute", bottom: -80, right: -80, width: 450, height: 450, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 65%)", filter: "blur(65px)", pointerEvents: "none" }}
          animate={{ x: [0, 30, -30, 0], y: [0, 50, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeUp className="text-center mb-16">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold text-text mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Up and running in minutes
            </h2>
            <p className="text-[17px] text-text-muted max-w-md mx-auto leading-relaxed">
              No technical setup. No long onboarding. Three steps and your ISP is live.
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item, i) => (
              <FadeUp key={item.step} delay={i * 0.12}>
                <div className="font-black text-[72px] leading-none mb-4 select-none bg-gradient-to-br from-primary to-violet-400 bg-clip-text text-transparent" style={{ fontFamily: "var(--font-heading)" }}>{item.step}</div>
                <h3 className="text-xl font-bold text-text mb-3" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <FadeUp>
          <div className="max-w-5xl mx-auto text-center bg-primary rounded-2xl md:rounded-3xl px-6 py-12 md:px-16 md:py-24 relative overflow-hidden">
            <motion.div
              className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5 pointer-events-none"
              animate={{ x: [0, 30, -20, 0], y: [0, -40, 30, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-white/4 pointer-events-none"
              animate={{ x: [0, -30, 40, 0], y: [0, 30, -20, 0] }}
              transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
            />
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-extrabold text-white mb-4 relative z-10" style={{ fontFamily: "var(--font-heading)" }}>
              Ready to take control of your ISP?
            </h2>
            <p className="text-[17px] text-white/75 mb-10 leading-relaxed relative z-10">
              Join hundreds of ISP owners who've replaced their spreadsheets with NetFlow. Set up in minutes, completely free.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3.5 rounded-xl text-base transition-all relative z-10 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Create your free account <ArrowRight size={17} />
            </Link>
          </div>
        </FadeUp>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-border py-10 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Wifi size={14} color="white" />
            </div>
            <span className="font-extrabold text-base text-text" style={{ fontFamily: "var(--font-heading)" }}>NetFlow</span>
          </div>
          <div className="text-xs text-text-muted">© 2026 NetFlow. All rights reserved.</div>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Support"].map(link => (
              <a key={link} href="#" className="text-sm text-text-muted hover:text-primary transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  )
}
