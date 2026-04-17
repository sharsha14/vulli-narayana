import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-hero-gradient-start to-hero-gradient-end">
      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent-warm/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-primary-foreground/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary-foreground/5" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/15 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent-warm animate-pulse" />
              <span className="text-sm text-primary-foreground/90 font-medium">
                Admissions Open 2025-26
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight"
            >
              Your Path to{" "}
              <span className="text-accent-warm">Medical & Engineering</span>{" "}
              Excellence
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-primary-foreground/75 max-w-lg leading-relaxed"
            >
              Join India's most trusted coaching institute with 35+ years of
              excellence. Expert faculty, proven results, and personalized
              learning for NEET & JEE aspirants.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <motion.a
                href="#courses"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent-warm text-accent-warm-foreground font-semibold rounded-xl shadow-lg shadow-accent-warm/30 hover:shadow-xl hover:shadow-accent-warm/40 transition-shadow"
              >
                Explore Courses
                <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-foreground/10 text-primary-foreground font-semibold rounded-xl border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-colors"
              >
                <Play size={18} />
                Watch Video
              </motion.a>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 flex gap-8"
            >
              {[
                { value: "35+", label: "Years of Trust" },
                { value: "2.5L+", label: "Students" },
                { value: "315+", label: "Centers" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-primary-foreground">{s.value}</div>
                  <div className="text-xs text-primary-foreground/60">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <div className="w-80 h-80 rounded-3xl bg-primary-foreground/10 backdrop-blur border border-primary-foreground/10 flex items-center justify-center animate-float">
                <div className="text-center p-8">
                  <div className="text-6xl font-extrabold text-accent-warm mb-2">#1</div>
                  <div className="text-xl font-bold text-primary-foreground">Test Prep</div>
                  <div className="text-sm text-primary-foreground/60 mt-1">Institute in India</div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-2xl bg-accent-warm/20 backdrop-blur-sm border border-accent-warm/20 flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10 flex items-center justify-center">
                <span className="text-3xl">📚</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
