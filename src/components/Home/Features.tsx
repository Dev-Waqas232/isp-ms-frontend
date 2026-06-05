import { Globe } from "lucide-react"
import { motion } from "framer-motion"
import { Users, CreditCard, BarChart3, Bell, ShieldCheck, TrendingUp } from "lucide-react"

import FadeUp from "../shared/FadeUp"

const features = [
  { icon: Users, title: "Customer Management", desc: "Add, update, and track every customer. Store contact details, connection plans, and account status in one place." },
  { icon: CreditCard, title: "Payment Tracking", desc: "Log monthly payments, flag overdue accounts, and keep a full payment history per customer — automatically." },
  { icon: Bell, title: "Overdue Alerts", desc: "Know exactly who hasn't paid and when their due date passed. Never chase a customer blindly again." },
  { icon: BarChart3, title: "Expense & Savings", desc: "Log your monthly expenses, track revenue, and see your net savings computed automatically." },
  { icon: ShieldCheck, title: "Historical Records", desc: "Every payment, every change — stored forever. Audit anything, anytime, without digging through spreadsheets." },
  { icon: TrendingUp, title: "Revenue Insights", desc: "Monthly revenue trends, collection rates, and growth metrics so you can make smart decisions." },
]


export default function Features() {
  return (
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
  )
}
