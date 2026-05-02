import { Link, useLocation } from "wouter";
import { Trophy, Home, Search, GitCompare } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <div className="hidden sm:block">
              <span className="text-foreground font-bold text-lg tracking-tight">IPL</span>
              <span className="text-primary font-bold text-lg tracking-tight ml-1">Explorer</span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  location === "/" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <Home className="w-4 h-4" />
                Teams
              </button>
            </Link>
            <Link href="/compare">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  location === "/compare" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <GitCompare className="w-4 h-4" />
                Compare
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-card/95 backdrop-blur-md px-4 pb-4 pt-2 flex flex-col gap-1">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors text-left">
              <Home className="w-4 h-4" /> Teams
            </button>
          </Link>
          <Link href="/compare" onClick={() => setMobileOpen(false)}>
            <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors text-left">
              <GitCompare className="w-4 h-4" /> Compare Players
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
