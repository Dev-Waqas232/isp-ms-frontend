import { motion, useInView } from "framer-motion"
import { useRef } from "react"

type FadeUpProps = {
  className?: string
  children: React.ReactNode
  delay?: number
}

export default function FadeUp({ className, children, delay = 0 }: FadeUpProps) {
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
