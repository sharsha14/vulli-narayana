import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

export default function CTA() {
  return (
    <section id="enroll" className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cta-gradient-start to-cta-gradient-end p-10 sm:p-16 text-center"
        >
          {/* Decorative */}
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-accent-warm/15 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-primary-foreground/5 blur-3xl" />

          <div className="relative z-10">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground leading-tight">
              Start Your Journey to{" "}
              <span className="text-accent-warm">Success</span> Today
            </h2>
            <p className="mt-5 text-primary-foreground/70 max-w-2xl mx-auto text-lg">
              Join lakhs of students who chose us to achieve their dream careers in
              medicine and engineering. Limited seats available for 2025-26.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent-warm text-accent-warm-foreground font-bold rounded-xl shadow-lg shadow-accent-warm/30 text-base"
              >
                Enroll Now
                <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="tel:18001021301"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-foreground/10 text-primary-foreground font-bold rounded-xl border border-primary-foreground/20 text-base"
              >
                <Phone size={18} />
                Talk to Counsellor
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
