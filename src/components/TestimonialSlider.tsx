import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

// @ts-expect-error -- swiper CSS modules lack type declarations
import "swiper/css";
// @ts-expect-error -- swiper CSS modules lack type declarations
import "swiper/css/pagination";

export default function TestimonialSlider() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-semibold text-accent-warm bg-accent-warm/10 px-4 py-1 rounded-full mb-4">
            Student Stories
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground">
            Hear From Our <span className="text-accent-warm">Toppers</span>
          </h2>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="pb-12"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="bg-card rounded-2xl border border-border p-7 h-full flex flex-col">
                <Quote size={28} className="text-primary/20 mb-4" />
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  "{t.quote}"
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-card-foreground">{t.name}</div>
                    <div className="text-xs text-accent-warm font-medium">{t.rank}</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
