import { useState } from "react";
import { motion } from "framer-motion";
import { courses, courseCategories } from "@/lib/data";
import CourseCard from "./CourseCard";

export default function CourseSection() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? courses : courses.filter((c) => c.category === active);

  return (
    <section id="courses" className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block text-sm font-semibold text-primary bg-primary/10 px-4 py-1 rounded-full mb-4">
            Our Programs
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground">
            Explore Our <span className="text-primary">Courses</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Comprehensive coaching programs designed to help students excel in
            every major competitive examination.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {courseCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                active === cat
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c, i) => (
            <CourseCard key={c.id} {...c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
