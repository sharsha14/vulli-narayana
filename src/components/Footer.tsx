import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { footerLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-accent-warm flex items-center justify-center">
                <span className="text-accent-warm-foreground font-bold text-lg">A</span>
              </div>
              <span className="font-heading text-xl font-bold">Aakash</span>
            </div>
            <p className="text-sm text-background/60 leading-relaxed mb-6">
              India's most trusted test preparation institute empowering
              students since 1988.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-accent-warm transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-background/80">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-background/50 hover:text-accent-warm transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-sm text-background/50">
            <span className="flex items-center gap-1.5">
              <Phone size={14} /> 1800-102-1301
            </span>
            <span className="flex items-center gap-1.5">
              <Mail size={14} /> info@aakash.ac.in
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} /> New Delhi, India
            </span>
          </div>
          <p className="text-xs text-background/40">
            © 2025 Aakash Educational Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
