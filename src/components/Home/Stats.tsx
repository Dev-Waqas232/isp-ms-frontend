import FadeUp from "../shared/FadeUp"

const stats = [
  { value: "200+", label: "ISPs onboarded" },
  { value: "50k+", label: "Customers managed" },
  { value: "99.9%", label: "Uptime guarantee" },
  { value: "2 min", label: "Setup time" },
]

export default function Stats() {
  return (
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

  )
}
