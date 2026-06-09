import { motion } from "framer-motion"
import { Mail, MapPin, ShieldCheck, Sparkles, UserCircle2 } from "lucide-react"

import DashboardLayout from "../components/dashboard/DashboardLayout"
import { useAuth } from "../context/useAuth"

function getInitials(firstName?: string, lastName?: string, fallback = "AD") {
  const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.trim()
  return initials ? initials.toUpperCase() : fallback
}

export default function Profile() {
  const { user } = useAuth()
  const initials = getInitials(user?.firstName, user?.lastName)

  return (
    <DashboardLayout eyebrow="Profile" title="Admin profile">
      <motion.section
        className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_20px_80px_rgba(15,23,42,0.06)]"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="bg-[linear-gradient(135deg,rgba(37,99,235,0.12),rgba(16,185,129,0.08))] px-4 py-7 sm:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-primary text-xl font-black text-white shadow-lg shadow-primary/20 sm:h-20 sm:w-20 sm:text-2xl">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Admin profile</p>
                <h1 className="mt-2 truncate font-heading text-2xl font-black sm:text-3xl">
                  {user?.firstName ?? "Admin"} {user?.lastName ?? ""}
                </h1>
                <p className="mt-1 text-sm text-text-muted">Manage your account identity and access details.</p>
              </div>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-semibold">
              <Sparkles size={16} className="text-primary" />
              Profile quick view
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[1fr_0.95fr] lg:p-8">
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-bg p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <UserCircle2 size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">Name</p>
                  <p className="truncate text-sm text-text-muted">{user?.firstName ?? "Admin"} {user?.lastName ?? ""}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-bg p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-success/10 text-success">
                  <Mail size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">Email</p>
                  <p className="truncate text-sm text-text-muted">{user?.email ?? "admin@netflow.local"}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-bg p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-warning/10 text-warning">
                  <MapPin size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">Store role</p>
                  <p className="truncate text-sm text-text-muted">Primary admin</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-[linear-gradient(135deg,rgba(17,24,39,0.96),rgba(37,99,235,0.88))] p-5 text-white sm:p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/12 text-white">
                <ShieldCheck size={18} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">Access</p>
                <h2 className="mt-1 font-heading text-2xl font-black">Protected admin zone</h2>
              </div>
            </div>

            <p className="mt-5 max-w-xl text-sm leading-6 text-white/80">
              This profile surface stays inside the admin layout, so sidebar and topbar behavior remain consistent across pages.
            </p>
          </div>
        </div>
      </motion.section>
    </DashboardLayout>
  )
}
