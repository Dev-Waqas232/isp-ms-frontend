import { useAuth } from "../context/useAuth"

const stats = [
  { label: "Customers", value: "0" },
  { label: "Payments", value: "PKR 0" },
  { label: "Expenses", value: "PKR 0" },
  { label: "Revenue", value: "PKR 0" },
]

export default function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <main className="min-h-screen bg-bg text-text">
      <header className="border-b border-border bg-surface px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Dashboard</p>
            <h1 className="font-heading text-2xl font-extrabold">ISP Management</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-muted">{user?.email}</span>
            <button onClick={logout} className="rounded-[10px] border border-border px-4 py-2 text-sm font-semibold text-text-muted hover:text-primary">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-6 py-8 md:grid-cols-4">
        {stats.map(stat => (
          <div key={stat.label} className="rounded-xl border border-border bg-surface p-5">
            <p className="text-sm text-text-muted">{stat.label}</p>
            <p className="mt-2 font-heading text-2xl font-extrabold">{stat.value}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
