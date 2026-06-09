import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeDollarSign,
  ChevronRight,
  LayoutDashboard,
  Settings2,
  ShieldCheck,
  Users,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router";

import type { Store } from "../../types/api";

type DashboardSidebarProps = {
  adminEmail?: string;
  adminInitials: string;
  adminName: string;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  store: Store | null | undefined;
};

type NavItem = {
  description: string;
  icon: LucideIcon;
  label: string;
  to: string;
};

const navItems: NavItem[] = [
  {
    to: "/dashboard",
    label: "Dashboard",
    description: "Overview and daily pulse",
    icon: LayoutDashboard,
  },
  {
    to: "/dashboard#customers",
    label: "Customers",
    description: "Manage clients and installs",
    icon: Users,
  },
  {
    to: "/dashboard#payments",
    label: "Payments",
    description: "Track bills and collection",
    icon: BadgeDollarSign,
  },
  {
    to: "/dashboard#expenses",
    label: "Expenses",
    description: "Monitor operations spend",
    icon: Wallet,
  },
  {
    to: "/dashboard#settings",
    label: "Settings",
    description: "Tune access and brand",
    icon: Settings2,
  },
];

const API_ORIGIN = (
  import.meta.env.VITE_API_URL ?? "http://localhost:3000/api"
).replace(/\/api\/?$/, "");

function getStoreLogoUrl(logoUrl?: string | null) {
  if (!logoUrl) {
    return null;
  }

  if (/^https?:\/\//.test(logoUrl)) {
    return logoUrl;
  }

  return `${API_ORIGIN}/${logoUrl.replace(/^\/+/, "")}`;
}

export default function DashboardSidebar({
  adminEmail,
  adminInitials,
  adminName,
  isOpen,
  onClose,
  onLogout,
  store,
}: DashboardSidebarProps) {
  const location = useLocation();
  const storeName = store?.providerName ?? "Your ISP Store";
  const storeMeta =
    [store?.city, store?.contactNumber].filter(Boolean).join(" - ") ||
    "Store details loading";
  const logoUrl = getStoreLogoUrl(store?.logoUrl);

  return (
    <motion.aside
      className={`fixed inset-y-0 left-0 z-40 flex h-dvh w-[290px] flex-col overflow-hidden border-r border-border bg-surface/95 shadow-2xl shadow-text/5 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="shrink-0 border-b border-border px-5 py-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            {logoUrl ? (
              <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl border border-border bg-bg shadow-lg shadow-primary/10">
                <img
                  src={logoUrl}
                  alt={storeName}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-sm font-black text-white shadow-lg shadow-primary/25">
                {adminInitials}
              </div>
            )}

            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-text-muted">
                Store
              </p>
              <h2 className="truncate font-heading text-lg font-black">
                {storeName}
              </h2>
              <p className="truncate text-xs text-text-muted">{storeMeta}</p>
            </div>
          </div>

          <button
            type="button"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border text-text-muted transition hover:bg-bg hover:text-text lg:hidden"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <nav className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.to === "/dashboard"
              ? location.pathname === "/dashboard" && !location.hash
              : location.pathname + location.hash === item.to ||
                location.pathname === item.to;

          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={`group flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-300 ${isActive ? "border-primary/20 bg-primary/10 shadow-lg shadow-primary/10" : "border-transparent hover:border-border hover:bg-bg"}`}
            >
              <span
                className={`mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl transition ${isActive ? "bg-primary text-white" : "bg-bg text-text-muted group-hover:text-primary"}`}
              >
                <Icon size={18} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="font-semibold">{item.label}</span>
                  <ChevronRight
                    className={isActive ? "text-primary" : "text-text-muted"}
                    size={16}
                  />
                </span>
                <span className="mt-1 block text-xs leading-5 text-text-muted">
                  {item.description}
                </span>
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="shrink-0 space-y-3 border-t border-border px-5 py-5">
        <Link
          to="/dashboard/profile"
          onClick={onClose}
          className="group flex items-center gap-3 rounded-xl border border-border bg-bg px-4 py-3 transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-sm font-black text-white shadow-lg shadow-primary/20">
            {adminInitials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{adminName}</p>
            <p className="truncate text-xs text-text-muted">
              {adminEmail ?? "admin@netflow.local"}
            </p>
          </div>
          <ArrowRight
            className="shrink-0 text-text-muted transition group-hover:translate-x-1 group-hover:text-primary"
            size={18}
          />
        </Link>

        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary-dark"
        >
          <ShieldCheck size={18} />
          Sign out
        </button>
      </div>
    </motion.aside>
  );
}
