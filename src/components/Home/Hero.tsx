import { motion } from "framer-motion"
import { Zap, ArrowRight } from "lucide-react"
import { Link } from "react-router"

export default function Hero() {
  return (

    <section className="relative min-h-screen flex items-center justify-center px-8 pt-28 pb-20 overflow-hidden">
      {/* Blobs */}
      <motion.div
        style={{ position: "absolute", top: -160, right: -160, width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.35) 0%, rgba(37,99,235,0.12) 40%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }}
        animate={{ x: [0, 40, -20, 0], y: [0, -60, 40, 0], scale: [1, 1.1, 0.93, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{ position: "absolute", bottom: -80, left: -130, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.3) 0%, rgba(14,165,233,0.1) 45%, transparent 70%)", filter: "blur(70px)", pointerEvents: "none" }}
        animate={{ x: [0, -50, 60, 0], y: [0, 30, -40, 0], scale: [1, 1.07, 0.96, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{ position: "absolute", top: "35%", left: "30%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 65%)", filter: "blur(50px)", pointerEvents: "none" }}
        animate={{ x: [0, 60, -40, 20, 0], y: [0, -40, 60, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{ position: "absolute", top: "20%", left: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(147,197,253,0.2) 0%, transparent 65%)", filter: "blur(50px)", pointerEvents: "none" }}
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
          <span className="bg-linear-to-br from-primary to-info bg-clip-text text-transparent">
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
          <Link to="/onboarding"
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

  )
}
