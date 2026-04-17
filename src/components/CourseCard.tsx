import { motion } from "framer-motion";
import {
  Stethoscope, Cpu, BookOpen, Trophy, Monitor, Zap, Clock, Users,
} from "lucide-react";

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Stethoscope, Cpu, BookOpen, Trophy, Monitor, Zap,
};

interface CourseCardProps {
  title: string;
  category: string;
  description: string;
  duration: string;
  students: string;
  icon: string;
  color: string;
  index: number;
}

export default function CourseCard({
  title, category, description, duration, students, icon, color, index,
}: CourseCardProps) {
  const Icon = iconMap[icon] ?? BookOpen;
  const isWarm = color === "accent-warm";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-xl hover:shadow-primary/8 transition-all duration-300"
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
          isWarm ? "bg-accent-warm/10 text-accent-warm" : "bg-primary/10 text-primary"
        }`}
      >
        <Icon size={24} />
      </div>

      <span
        className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3 ${
          isWarm
            ? "bg-accent-warm/10 text-accent-warm"
            : "bg-primary/10 text-primary"
        }`}
      >
        {category}
      </span>

      <h3 className="text-lg font-bold text-card-foreground group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock size={14} /> {duration}
        </span>
        <span className="flex items-center gap-1">
          <Users size={14} /> {students}
        </span>
      </div>

      <motion.a
        href="#"
        whileHover={{ x: 4 }}
        className={`inline-flex items-center gap-1 mt-5 text-sm font-semibold transition-colors ${
          isWarm ? "text-accent-warm" : "text-primary"
        }`}
      >
        Learn More →
      </motion.a>
    </motion.div>
  );
}
