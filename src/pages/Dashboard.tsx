import { motion } from "framer-motion"
import {
  BadgeDollarSign,
  ChevronRight,
  CircleGauge,
  MessageSquareMore,
  Users,
  Wallet,
} from "lucide-react"

import DashboardLayout from "../components/dashboard/DashboardLayout"

const dashboardStats = [
  { label: "Active customers", value: "248", delta: "+12 this week", icon: Users },
  { label: "Collected today", value: "PKR 84.2k", delta: "92% on time", icon: BadgeDollarSign },
  { label: "Open expenses", value: "PKR 31.5k", delta: "3 pending approvals", icon: Wallet },
  { label: "Network health", value: "98.7%", delta: "Last check 4m ago", icon: CircleGauge },
]

const customerRows = [
  { name: "Ali Raza", plan: "Fiber Pro 50", status: "Active", amount: "PKR 3,500" },
  { name: "Maha Khan", plan: "Fiber Max 100", status: "Due in 2 days", amount: "PKR 4,200" },
  { name: "Bilal Ahmed", plan: "Starter 20", status: "Suspended", amount: "PKR 2,000" },
]

const paymentHighlights = [
  { title: "Cash collected", value: "PKR 60,000", note: "6 transactions" },
  { title: "Online transfers", value: "PKR 24,200", note: "4 transactions" },
  { title: "Pending dues", value: "PKR 18,900", note: "11 customers" },
]

export default function Dashboard() {
  return (
    <DashboardLayout>
      <motion.section
        className="grid gap-5 xl:grid-cols-[1.35fr_0.85fr]"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
          },
        }}
      >
        <motion.div
          className="overflow-hidden rounded-2xl border border-border bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(219,234,254,0.65))] p-4 shadow-[0_20px_80px_rgba(15,23,42,0.08)] sm:p-6"
          variants={{ hidden: { y: 24, opacity: 0 }, show: { y: 0, opacity: 1 } }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Live overview</p>
              <h2 className="mt-2 font-heading text-2xl font-black sm:text-3xl">
                Keep the network moving without friction.
              </h2>
            </div>
            <div className="w-fit rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm">
              Dashboard in focus
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {dashboardStats.map(stat => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -4 }}
                  className="rounded-xl border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm text-text-muted">{stat.label}</p>
                      <p className="mt-2 break-words font-heading text-2xl font-black">{stat.value}</p>
                    </div>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Icon size={18} />
                    </span>
                  </div>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-success">{stat.delta}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          className="rounded-2xl border border-border bg-surface/95 p-4 shadow-[0_20px_80px_rgba(15,23,42,0.08)] sm:p-6"
          variants={{ hidden: { y: 24, opacity: 0 }, show: { y: 0, opacity: 1 } }}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Quick actions</p>
              <h3 className="mt-1 font-heading text-xl font-black">Everything in one glance</h3>
            </div>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-dark-bg text-white">
              <MessageSquareMore size={18} />
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {[
              "Send payment reminder",
              "Add new customer",
              "Record expense",
              "Update equipment stock",
            ].map(action => (
              <button
                key={action}
                type="button"
                className="flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-bg px-4 py-3 text-left text-sm font-semibold transition hover:-translate-y-0.5 hover:border-primary/25 hover:bg-white"
              >
                <span>{action}</span>
                <ChevronRight size={16} className="shrink-0 text-text-muted" />
              </button>
            ))}
          </div>
        </motion.div>
      </motion.section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_0.85fr]">
        <motion.div
          id="customers"
          className="rounded-2xl border border-border bg-surface p-4 shadow-[0_20px_80px_rgba(15,23,42,0.06)] sm:p-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Customers</p>
              <h3 className="mt-1 font-heading text-xl font-black">Recent connections</h3>
            </div>
            <button className="shrink-0 rounded-full border border-border px-4 py-2 text-sm font-semibold text-text-muted transition hover:border-primary/25 hover:text-primary" type="button">
              View all
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {customerRows.map(row => (
              <div key={row.name} className="flex flex-col gap-3 rounded-xl border border-border bg-bg px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="font-semibold">{row.name}</p>
                  <p className="text-sm text-text-muted">{row.plan}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                    {row.status}
                  </span>
                  <span className="font-heading text-lg font-black">{row.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="space-y-5">
          <motion.div
            id="payments"
            className="rounded-2xl border border-border bg-surface p-4 shadow-[0_20px_80px_rgba(15,23,42,0.06)] sm:p-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Payments</p>
            <h3 className="mt-1 font-heading text-xl font-black">Cash flow snapshot</h3>
            <div className="mt-5 space-y-3">
              {paymentHighlights.map(item => (
                <div key={item.title} className="rounded-xl border border-border bg-bg p-4">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                    <p className="font-semibold">{item.title}</p>
                    <p className="font-heading text-lg font-black">{item.value}</p>
                  </div>
                  <p className="mt-2 text-sm text-text-muted">{item.note}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            id="expenses"
            className="rounded-2xl border border-border bg-[linear-gradient(135deg,rgba(17,24,39,0.96),rgba(37,99,235,0.88))] p-4 text-white shadow-[0_20px_80px_rgba(15,23,42,0.16)] sm:p-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">Expenses</p>
                <h3 className="mt-1 font-heading text-xl font-black">Runway health</h3>
              </div>
              <Wallet size={22} className="shrink-0 text-white/90" />
            </div>

            <div className="mt-5 rounded-xl bg-white/10 p-4 backdrop-blur">
              <p className="text-sm text-white/75">Monthly burn</p>
              <p className="mt-2 break-words font-heading text-3xl font-black">PKR 112.4k</p>
              <p className="mt-2 text-sm text-white/80">Most spend is on equipment refresh and field operations.</p>
            </div>
          </motion.div>
        </div>
      </section>
      <span id="settings" className="block h-px" />
    </DashboardLayout>
  )
}
