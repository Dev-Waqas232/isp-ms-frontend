import { motion } from "framer-motion";
import FadeUp from "../shared/FadeUp";


const steps = [
  { step: "01", title: "Create your account", desc: "Register your ISP in under 2 minutes. Give it a name, set your preferences, and you're in." },
  { step: "02", title: "Add your customers", desc: "Import existing customers or add them one by one. Set their plan, due date, and contact details." },
  { step: "03", title: "Track everything", desc: "Log payments as they come in, see who's overdue, and watch your revenue grow month by month." },
]

export default function HowItWork() {
  return (
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
              <div className="font-black text-[72px] leading-none mb-4 select-none bg-linear-to-br from-primary to-violet-400 bg-clip-text text-transparent" style={{ fontFamily: "var(--font-heading)" }}>{item.step}</div>
              <h3 className="text-xl font-bold text-text mb-3" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
