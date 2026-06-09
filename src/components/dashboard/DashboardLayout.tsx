import { useEffect, useMemo, useState, type ReactNode } from "react"
import { useQuery } from "@tanstack/react-query"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Menu } from "lucide-react"
import { Link } from "react-router"

import { useAuth } from "../../context/useAuth"
import { getAdminStore } from "../../services/store.service"
import DashboardSidebar from "./DashboardSidebar"

type DashboardLayoutProps = {
  children: ReactNode
  eyebrow?: string
  title?: string
}

function getInitials(firstName?: string, lastName?: string, fallback = "AD") {
  const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.trim()
  return initials ? initials.toUpperCase() : fallback
}

export default function DashboardLayout({ children, eyebrow = "Dashboard", title }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const storeQuery = useQuery({
    queryKey: ["stores", "admin-store"],
    queryFn: getAdminStore,
  })

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false)
      }
    }

    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const adminInitials = useMemo(() => getInitials(user?.firstName, user?.lastName), [user?.firstName, user?.lastName])
  const adminName = `${user?.firstName ?? "Admin"} ${user?.lastName ?? ""}`.trim()

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-bg text-text">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.12),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_28%),linear-gradient(180deg,_rgba(255,255,255,0.9),_rgba(247,247,249,1))]" />

      <AnimatePresence>
        {sidebarOpen && (
          <motion.button
            type="button"
            aria-label="Close sidebar"
            className="fixed inset-0 z-30 bg-text/40 backdrop-blur-[2px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <DashboardSidebar
        adminEmail={user?.email}
        adminInitials={adminInitials}
        adminName={adminName}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={logout}
        store={storeQuery.data}
      />

      <div className="relative min-h-screen lg:pl-[290px]">
        <motion.header
          className="sticky top-0 z-20 border-b border-border bg-surface/75 backdrop-blur-xl"
          initial={{ y: -18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex min-h-[76px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-bg text-text transition hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={18} />
              </button>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">{eyebrow}</p>
                <h1 className="truncate font-heading text-lg font-black sm:text-2xl">
                  {title ?? `Good to see you, ${user?.firstName ?? "Admin"}`}
                </h1>
              </div>
            </div>

            <Link
              to="/dashboard/profile"
              className="group flex shrink-0 items-center gap-2 rounded-full border border-border bg-bg p-1.5 pr-2 transition hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg sm:pr-3"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-black text-white shadow-lg shadow-primary/20">
                {adminInitials}
              </span>
              <span className="hidden text-sm font-semibold text-text-muted sm:inline">Profile</span>
              <ArrowRight className="hidden text-text-muted transition group-hover:translate-x-1 group-hover:text-primary sm:block" size={16} />
            </Link>
          </div>
        </motion.header>

        <div className="px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </div>
      </div>
    </main>
  )
}
