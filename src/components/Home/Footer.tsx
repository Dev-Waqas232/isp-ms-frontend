import { Wifi } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border py-10 px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:justify-between gap-4 text-center md:text-left">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Wifi size={14} color="white" />
          </div>
          <span className="font-extrabold text-base text-text" style={{ fontFamily: "var(--font-heading)" }}>NetFlow</span>
        </div>
        <div className="text-xs text-text-muted">© 2026 NetFlow. All rights reserved.</div>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Support"].map(link => (
            <a key={link} href="#" className="text-sm text-text-muted hover:text-primary transition-colors">{link}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
