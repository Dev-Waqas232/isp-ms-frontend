import { Link } from "react-router"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import FadeUp from "../shared/FadeUp"


export default function CTA() {
  return (
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
  )
}
