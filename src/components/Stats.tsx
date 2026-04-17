import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "@/lib/data";

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="py-20 lg:py-28 bg-gradient-to-br from-hero-gradient-start to-hero-gradient-end">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-primary-foreground">
            Our Track Record of <span className="text-accent-warm">Excellence</span>
          </h2>
          <p className="mt-4 text-primary-foreground/70 max-w-xl mx-auto">
            Numbers that reflect our commitment to nurturing future leaders in
            medicine and engineering.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center bg-primary-foreground/5 backdrop-blur border border-primary-foreground/10 rounded-2xl p-8"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-primary-foreground">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm text-primary-foreground/60 font-medium">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
