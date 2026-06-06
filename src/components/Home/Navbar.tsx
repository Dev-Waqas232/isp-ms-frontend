import { useEffect, useState } from "react"
import { Link } from "react-router"
import { Wifi } from "lucide-react"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return <nav className={`fixed top-0 left-0 right-0 z-50 px-8 transition-all duration-300 ${scrolled ? "bg-bg/90 backdrop-blur-md border-b border-border" : ""}`}>
    <div className="max-w-6xl mx-auto flex items-center justify-between h-17">
      <Link to="/" className="flex items-center gap-2.5 no-underline">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Wifi size={17} color="white" />
        </div>
        <span className="text-lg font-extrabold text-text" style={{ fontFamily: "var(--font-heading)" }}>NetFlow</span>
      </Link>
      <div className="hidden md:flex items-center gap-8">
        {["Features", "About"].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`}
            className="text-sm font-medium text-text-muted hover:text-primary transition-colors">
            {item}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Link to="/login" className="text-sm font-medium text-text-muted hover:text-text transition-colors px-4 py-2">Sign in</Link>
        <Link to="/onboarding"
          className="text-sm hidden md:block font-bold text-white bg-primary hover:bg-primary-dark px-4 py-2 md:px-5 md:py-2.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25">
          <span className="hidden md:inline">Get started free</span>
          <span className="md:hidden">Get started</span>
        </Link>
      </div>
    </div>
  </nav>
}
