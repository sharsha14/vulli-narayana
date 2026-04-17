import { motion } from "framer-motion";
import {
  GraduationCap, Award, Laptop, FileText, ClipboardCheck, MessageCircle,
} from "lucide-react";
import { features } from "@/lib/data";

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  GraduationCap, Award, Laptop, FileText, ClipboardCheck, MessageCircle,
};

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-surface-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-semibold text-primary bg-primary/10 px-4 py-1 rounded-full mb-4">
            Why Choose Us
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground">
            What Makes Us <span className="text-primary">Different</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A holistic approach to competitive exam preparation that combines
            expert teaching, cutting-edge technology, and personalized guidance.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = iconMap[f.icon] ?? GraduationCap;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-card rounded-2xl border border-border p-7 shadow-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-card-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
