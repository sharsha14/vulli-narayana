import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface-elevated/95 backdrop-blur-md shadow-lg shadow-primary/5"
          : "bg-surface-elevated"
      }`}
    >
      {/* Top bar */}
      <div className="hidden md:block bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between py-1.5 text-xs">
          <div className="flex items-center gap-4">
            <span>India's Leading Test Prep Institution</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:18001021301" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <Phone size={12} />
              1800-102-1301 (Toll Free)
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
            <div>
              <span className="font-heading text-xl font-bold text-foreground tracking-tight">
                Aakash
              </span>
              <span className="hidden sm:inline text-xs text-muted-foreground block -mt-1">
                BYJU'S
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href={link.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-md"
                >
                  {link.label}
                  {link.children && <ChevronDown size={14} className="opacity-50" />}
                </a>

                <AnimatePresence>
                  {link.children && openDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-52 bg-surface-elevated rounded-xl shadow-xl shadow-primary/10 border border-border p-2"
                    >
                      {link.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <motion.a
              href="#enroll"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:inline-flex items-center px-5 py-2.5 bg-accent-warm text-accent-warm-foreground text-sm font-semibold rounded-lg shadow-md shadow-accent-warm/25 hover:shadow-lg hover:shadow-accent-warm/30 transition-shadow"
            >
              Enroll Now
            </motion.a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-surface-elevated border-t border-border"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#enroll"
                className="block mt-3 px-5 py-3 text-center bg-accent-warm text-accent-warm-foreground text-sm font-semibold rounded-lg"
              >
                Enroll Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
