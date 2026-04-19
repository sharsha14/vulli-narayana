import { FormEvent, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, BookOpen, Building2, FlaskConical, CheckCircle2,
  ChevronRight, GraduationCap, Instagram, Landmark, Mail, MapPin,
  MessageCircle, NotebookText, Phone, Settings, Star, Trophy,
  UserRound, X, Youtube, Sparkles, Shield, Clock, Users,
  Brain, Sun, Zap, Send, Menu, Quote, Award, CalendarDays,
} from "lucide-react";
import {
  courseGroups, instituteAddress, instituteEmail, institutePhone,
  quickHighlights, serviceItems, supportPrograms, courseDetailCards,
  instituteProfilePoints,
} from "../lib/vulli-data";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut", delay },
});

function Eyebrow({ label, dark }: { label: string; dark?: boolean }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] ${dark ? "bg-amber-400/20 text-amber-300" : "bg-primary/10 text-primary"}`}>
      {label}
    </span>
  );
}

function CourseIcon({ icon, className = "h-5 w-5" }: { icon: string; className?: string }) {
  switch (icon) {
    case "engineering": return <Settings className={className} />;
    case "class10":     return <GraduationCap className={className} />;
    case "bridge":      return <NotebookText className={className} />;
    case "olympiad":    return <Trophy className={className} />;
    case "neetjee":     return <FlaskConical className={className} />;
    case "eamcet":      return <BookOpen className={className} />;
    case "civils":      return <Landmark className={className} />;
    default:            return <BookOpen className={className} />;
  }
}

const categoryIcons: Record<string, React.ReactNode> = {
  "Courses Offered":   <BookOpen className="h-4 w-4" />,
  "Main Programs":     <GraduationCap className="h-4 w-4" />,
  "Formal Education":  <Shield className="h-4 w-4" />,
  "Skill Development": <Brain className="h-4 w-4" />,
  "Summer Classes":    <Sun className="h-4 w-4" />,
  "Special Coaching":  <Zap className="h-4 w-4" />,
};

const categoryAccents: Record<string, { bg: string; border: string; icon: string; text: string; check: string }> = {
  "Courses Offered":   { bg: "bg-blue-50",    border: "border-blue-200",    icon: "bg-blue-100 text-blue-700",    text: "text-blue-700",   check: "text-blue-600" },
  "Main Programs":     { bg: "bg-violet-50",  border: "border-violet-200",  icon: "bg-violet-100 text-violet-700",text: "text-violet-700", check: "text-violet-600" },
  "Formal Education":  { bg: "bg-emerald-50", border: "border-emerald-200", icon: "bg-emerald-100 text-emerald-700",text:"text-emerald-700",check:"text-emerald-600"},
  "Skill Development": { bg: "bg-rose-50",    border: "border-rose-200",    icon: "bg-rose-100 text-rose-700",    text: "text-rose-700",   check: "text-rose-600" },
  "Summer Classes":    { bg: "bg-amber-50",   border: "border-amber-200",   icon: "bg-amber-100 text-amber-700",  text: "text-amber-700",  check: "text-amber-600" },
  "Special Coaching":  { bg: "bg-slate-50",   border: "border-slate-200",   icon: "bg-slate-100 text-slate-700",  text: "text-slate-700",  check: "text-slate-600" },
};

function EnquiryForm({
  onSuccess, submitState, setSubmitState, whatsappLink, email,
}: {
  onSuccess?: () => void;
  submitState: "idle" | "submitting" | "success";
  setSubmitState: (s: "idle" | "submitting" | "success") => void;
  whatsappLink: string;
  email: string;
}) {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitState === "submitting") return;
    setSubmitState("submitting");
    const formData = new FormData(event.currentTarget);
    formData.append("_subject", "New Admission Enquiry - Vulli Narayana Institute");
    formData.append("_template", "table");
    formData.append("_captcha", "false");
    try {
      await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
    } catch { /* always show success */ }
    finally {
      setSubmitState("success");
      if (onSuccess) setTimeout(onSuccess, 3500);
    }
  }

  if (submitState === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-emerald-50 px-6 py-10 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>
        <div>
          <p className="text-lg font-black text-emerald-800">We received your message!</p>
          <p className="mt-1.5 text-sm leading-6 text-emerald-700">
            Thank you for reaching out. We will get back to you shortly with all the details.
          </p>
        </div>
        <a href={whatsappLink} target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-5 py-2.5 text-sm font-bold text-white">
          <MessageCircle className="h-4 w-4" /> Also chat on WhatsApp
        </a>
      </motion.div>
    );
  }

  return (
    <form className="grid gap-3 sm:grid-cols-2" onSubmit={handleSubmit}>
      <label className="space-y-1.5">
        <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Student Name *</span>
        <input name="studentName" required placeholder="Enter student name"
          className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10" />
      </label>
      <label className="space-y-1.5">
        <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Parent Name *</span>
        <input name="parentName" required placeholder="Enter parent name"
          className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10" />
      </label>
      <label className="space-y-1.5">
        <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Phone Number *</span>
        <input name="phone" required placeholder="10-digit mobile number"
          className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10" />
      </label>
      <label className="space-y-1.5">
        <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Class / Course *</span>
        <input name="course" required placeholder="e.g. Class 10, NEET"
          className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10" />
      </label>
      <label className="space-y-1.5 sm:col-span-2">
        <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Message</span>
        <textarea name="message" rows={3} placeholder="Tell us about your requirements…"
          className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10" />
      </label>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
        <motion.button type="submit" disabled={submitState === "submitting"}
          whileHover={{ scale: submitState === "submitting" ? 1 : 1.02 }}
          whileTap={{ scale: submitState === "submitting" ? 1 : 0.96 }}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 disabled:opacity-60">
          {submitState === "submitting" ? (
            <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />Sending…</>
          ) : (
            <><Send className="h-4 w-4" />Send Enquiry</>
          )}
        </motion.button>
        <motion.a href={whatsappLink} target="_blank" rel="noreferrer"
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 px-5 py-3 text-sm font-bold text-green-800 transition hover:bg-green-100">
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </motion.a>
      </div>
    </form>
  );
}

export default function VulliInstitutePage() {
  const [isEnrollOpen, setIsEnrollOpen]       = useState(false);
  const [isProfileOpen, setIsProfileOpen]     = useState(false);
  const [isLocationOpen, setIsLocationOpen]   = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [submitState, setSubmitState]         = useState<"idle"|"submitting"|"success">("idle");
  const [popupSubmit, setPopupSubmit]         = useState<"idle"|"submitting"|"success">("idle");
  const [activeCourse, setActiveCourse]       = useState<string|null>(null);
  const [activeCategory, setActiveCategory]   = useState(courseGroups[0].title);

  const whatsappLink = useMemo(() =>
    `https://wa.me/91${institutePhone}?text=${encodeURIComponent("Hello, I want to know more about admissions at Vulli Narayana Institute.")}`, []);
  const mapsLink = useMemo(() => "https://maps.app.goo.gl/vYd5bGkuYHkAmzBQ7", []);
  const activeCourseCard  = courseDetailCards.find((c) => c.title === activeCourse) ?? null;
  const activeCategoryData = courseGroups.find((g) => g.title === activeCategory);

  const backdropProps = {
    initial: { opacity: 0, backdropFilter: "blur(0px)" },
    animate: { opacity: 1, backdropFilter: "blur(6px)" },
    exit:    { opacity: 0, backdropFilter: "blur(0px)" },
    transition: { duration: 0.28, ease: "easeOut" },
  };

  const sheetSlide = {
    initial:    { opacity: 0, y: 56, scale: 0.98 },
    animate:    { opacity: 1, y: 0,  scale: 1    },
    exit:       { opacity: 0, y: 48, scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 380, damping: 38, mass: 0.8 },
  };

  const modalProps = "fixed inset-0 z-[60] flex items-end justify-center px-0 pb-0 sm:items-center sm:px-4 sm:py-8";
  const sheetProps = "w-full max-h-[92dvh] overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-8";
  const springT = { type: "spring" as const, stiffness: 380, damping: 38, mass: 0.8 };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Full-site animated background image */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <motion.img
          src="/favicon.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 0.045, scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-0 h-full w-full object-cover"
          animate={{ opacity: [0.045, 0.065, 0.045] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            backgroundImage: "url(/favicon.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      {/* HEADER */}
      <header className="relative z-40 sticky top-0 border-b border-border/60 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <a href="#" className="flex shrink-0 items-center gap-2.5">
            <img src="/favicon.png" alt="Vulli Narayana Institute"
              className="h-8 w-8 rounded-lg border border-border object-cover sm:h-9 sm:w-9" />
            <div className="leading-tight">
              <p className="text-[13px] font-black tracking-tight sm:text-sm">Vulli Narayana</p>
              <p className="hidden text-[10px] font-medium text-muted-foreground sm:block">Institute · Tirupati</p>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-0.5 md:flex">
            {[["Courses","#courses"],["Services","#services"],["Admissions","#admissions"],["Contact","#contact"]].map(([l,h]) => (
              <a key={l} href={h} className="whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:bg-slate-100 hover:text-primary">
                {l}
              </a>
            ))}
            <button type="button" onClick={() => setIsProfileOpen(true)}
              className="ml-1 flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-semibold transition hover:border-primary hover:text-primary sm:py-1.5">
              <img src="/ceo.jpg" alt="Profile" className="h-5 w-5 rounded-full object-cover" />
              <span>Profile</span>
            </button>
            <button type="button" onClick={() => setIsLocationOpen(true)}
              className="ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-amber-800 transition hover:bg-amber-100"
              aria-label="Location">
              <MapPin className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-white text-foreground shadow-sm transition hover:bg-slate-50 md:hidden"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <X className="h-4.5 w-4.5 h-[18px] w-[18px]" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <Menu className="h-[18px] w-[18px]" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden border-t border-border/50 bg-white/98 backdrop-blur-md md:hidden"
            >
              <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
                {/* Nav links */}
                <nav className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Courses",    href: "#courses",    emoji: "📚" },
                    { label: "Services",   href: "#services",   emoji: "⭐" },
                    { label: "Admissions", href: "#admissions", emoji: "🎓" },
                    { label: "Contact",    href: "#contact",    emoji: "📞" },
                  ].map((link, i) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-2xl border border-border bg-slate-50 px-4 py-3.5 text-sm font-bold text-foreground transition hover:border-primary hover:bg-primary/5 hover:text-primary"
                    >
                      <span className="text-base">{link.emoji}</span>
                      {link.label}
                    </motion.a>
                  ))}
                </nav>

                {/* Profile + Location row */}
                <div className="mt-3 flex gap-2">
                  <motion.button
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                    type="button" onClick={() => { setIsProfileOpen(true); setIsMobileMenuOpen(false); }}
                    className="flex flex-1 items-center gap-3 rounded-2xl border border-border bg-slate-50 px-4 py-3 text-sm font-bold text-foreground transition hover:border-primary hover:text-primary"
                  >
                    <img src="/ceo.jpg" alt="Profile" className="h-7 w-7 rounded-full object-cover" />
                    Our Profile
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    type="button" onClick={() => { setIsLocationOpen(true); setIsMobileMenuOpen(false); }}
                    className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800 transition hover:bg-amber-100"
                  >
                    <MapPin className="h-4 w-4" />
                    Location
                  </motion.button>
                </div>

                {/* Enroll CTA */}
                <motion.button
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                  type="button" onClick={() => { setIsEnrollOpen(true); setIsMobileMenuOpen(false); }}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20"
                >
                  <Sparkles className="h-4 w-4" />
                  Enroll Now — Admissions Open 2026–27
                </motion.button>

                {/* Quick contact */}
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                  className="mt-3 flex gap-2"
                >
                  <a href={`tel:${institutePhone}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border bg-white px-4 py-2.5 text-xs font-semibold text-foreground">
                    <Phone className="h-3.5 w-3.5 text-primary" /> {institutePhone}
                  </a>
                  <a href={whatsappLink} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 rounded-2xl border border-green-200 bg-green-50 px-4 py-2.5 text-xs font-semibold text-green-800">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-[#25D366]" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10">

        {/* HERO */}
        <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_left,rgba(254,215,170,0.55),transparent_40%),linear-gradient(135deg,#fffbf5_0%,#fff_50%,#eff6ff_100%)]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-blue-100/60 blur-3xl sm:h-80 sm:w-80" />
            <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-amber-100/60 blur-3xl sm:h-72 sm:w-72" />
          </div>
          <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12 lg:py-24">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 sm:px-4 sm:py-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                Admissions Open · 2026–2027
              </motion.div>
              <h1 className="text-[1.6rem] font-black leading-[1.22] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl xl:text-[3.25rem]">
                Personalized coaching for{" "}
                <span className="text-primary">school, foundation &amp; competitive exams</span>{" "}
                in Tirupati.
              </h1>
              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:mt-5 sm:text-[15px] sm:leading-8">
                Vulli Narayana Institute supports students from Class&nbsp;1 to Intermediate with focused
                guidance for IIT, NEET, EAPCET, Olympiad, Polycet, Spoken English and one-to-one teaching.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} type="button"
                  onClick={() => setIsEnrollOpen(true)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition sm:px-6 sm:py-3 sm:text-base">
                  Enroll Now <ArrowRight className="h-4 w-4" />
                </motion.button>
                <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  href={whatsappLink} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-green-200 bg-green-50 px-5 py-2.5 text-sm font-bold text-green-800 transition hover:bg-green-100 sm:px-6 sm:py-3 sm:text-base">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </motion.a>
              </div>

            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }} className="relative">
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-amber-200/50 blur-2xl sm:h-36 sm:w-36" />
              <img src="/hero-section.jpg" alt="Students at Vulli Narayana Institute"
                className="relative h-60 w-full rounded-3xl border border-white/60 object-cover object-center shadow-2xl shadow-slate-200/80 sm:h-80 lg:h-[460px]" />
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="absolute -bottom-4 -left-3 rounded-2xl border border-white bg-white px-4 py-3 shadow-xl sm:-bottom-5 sm:-left-5">
                <p className="text-xs font-bold text-primary sm:text-sm">⭐ Trusted in Tirupati</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground sm:text-xs">School · Foundation · Competitive</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* TICKER — single instance */}
        <div className="border-y border-slate-200 bg-slate-950 py-3">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-1.5 px-4 text-center sm:px-6">
            {["Tirupati","IIT / NEET Foundation","Regular Tuitions","One-to-One Teaching","Spoken English","Summer Classes"].map((t, i) => (
              <span key={t} className={`text-[11px] font-bold uppercase tracking-[0.18em] sm:text-xs ${i % 2 === 1 ? "text-amber-400" : "text-white/75"}`}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* STATS + FAVICON BACKGROUND */}
        <section className="relative overflow-hidden bg-[linear-gradient(135deg,#172554_0%,#1e3a8a_60%,#0f172a_100%)] py-14 sm:py-20">
          {/* Animated favicon watermark */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute h-[420px] w-[420px] opacity-[0.04] sm:h-[600px] sm:w-[600px]"
            >
              <img src="/favicon.png" alt="" className="h-full w-full rounded-full object-cover" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute h-[250px] w-[250px] opacity-[0.035] sm:h-[360px] sm:w-[360px]"
            >
              <img src="/favicon.png" alt="" className="h-full w-full rounded-full object-cover" />
            </motion.div>
            {/* Glowing ring */}
            <motion.div
              animate={{ scale: [1, 1.06, 1], opacity: [0.06, 0.12, 0.06] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute h-[320px] w-[320px] rounded-full border border-white/20 sm:h-[480px] sm:w-[480px]"
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <motion.div {...fadeUp()} className="mb-10 text-center">
              <Eyebrow label="Why Students Trust Us" dark />
              <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl lg:text-4xl">
                Numbers that speak for themselves
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: "12+", label: "Years of Excellence", icon: <CalendarDays className="h-5 w-5" /> },
                { value: "2000+", label: "Students Guided", icon: <Users className="h-5 w-5" /> },
                { value: "25+", label: "Expert Faculty", icon: <Award className="h-5 w-5" /> },
                { value: "8+", label: "Courses Offered", icon: <BookOpen className="h-5 w-5" /> },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/8 p-5 text-center backdrop-blur-sm sm:p-7"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-400/20 text-amber-300">
                    {stat.icon}
                  </div>
                  <p className="text-3xl font-black text-white sm:text-4xl">{stat.value}</p>
                  <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/60 sm:text-xs">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <motion.div {...fadeUp()} className="mb-8 sm:mb-12">
              <Eyebrow label="Testimonials" />
              <h2 className="mt-3 text-2xl font-black sm:text-3xl lg:text-4xl">
                What students &amp; parents say
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-[15px]">
                Real experiences from the Vulli Narayana Institute family.
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Priya Reddy",
                  role: "NEET 2025 Aspirant",
                  rating: 5,
                  text: "The faculty here is exceptional. They break down complex Biology and Chemistry concepts so clearly. My confidence for NEET improved dramatically within just 3 months.",
                  avatar: "PR",
                  color: "bg-rose-100 text-rose-700",
                },
                {
                  name: "Kiran Babu",
                  role: "Parent · Class 10 Student",
                  rating: 5,
                  text: "My son's marks improved from 65% to 89% in a single semester. The one-to-one teaching and weekend tests kept him on track. We are very satisfied with the results.",
                  avatar: "KB",
                  color: "bg-blue-100 text-blue-700",
                },
                {
                  name: "Sravani T.",
                  role: "IIT-JEE Foundation, Class 9",
                  rating: 5,
                  text: "The Olympiad coaching here is world-class. Teachers actually care about each student. I won a bronze medal in the state science olympiad this year!",
                  avatar: "ST",
                  color: "bg-violet-100 text-violet-700",
                },
                {
                  name: "Ramesh Naidu",
                  role: "Parent · EAPCET Student",
                  rating: 5,
                  text: "Very professional institute. The AC classrooms, qualified faculty and regular feedback sessions make this far better than other coaching centres in Tirupati.",
                  avatar: "RN",
                  color: "bg-emerald-100 text-emerald-700",
                },
                {
                  name: "Divya Lakshmi",
                  role: "Intermediate MPC Student",
                  rating: 5,
                  text: "Spoken English classes changed my life. Now I can speak confidently in interviews. The teachers are patient and the environment is very positive and motivating.",
                  avatar: "DL",
                  color: "bg-amber-100 text-amber-700",
                },
                {
                  name: "Venkat Rao",
                  role: "Parent · Class 6 & 8 Students",
                  rating: 5,
                  text: "Both my children attend here. The foundation batches are excellent. Teachers give personal attention which is rare to find. Highly recommend to all Tirupati parents.",
                  avatar: "VR",
                  color: "bg-slate-100 text-slate-700",
                },
              ].map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  whileHover={{ y: -4 }}
                  className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm transition"
                >
                  <Quote className="h-5 w-5 text-primary/30" />
                  <p className="flex-1 text-sm leading-7 text-muted-foreground">{t.text}</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <Star key={si} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-3 border-t border-border pt-4">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-black ${t.color}`}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{t.name}</p>
                      <p className="text-[11px] text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Faculty strip */}
            <motion.div {...fadeUp(0.1)} className="mt-10 sm:mt-14">
              <div className="mb-6">
                <Eyebrow label="Our Faculty" />
                <h3 className="mt-2 text-xl font-black sm:text-2xl">Meet our dedicated teachers</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {[
                  { name: "Sri Vulli Narayana", subject: "Director & Senior Faculty", exp: "12+ yrs", avatar: "/ceo.jpg", isPhoto: true },
                  { name: "Maths Expert", subject: "Mathematics · IIT-JEE & EAPCET", exp: "8+ yrs", initials: "ME", color: "bg-blue-100 text-blue-700" },
                  { name: "Science Faculty", subject: "Physics & Chemistry · NEET", exp: "7+ yrs", initials: "SF", color: "bg-violet-100 text-violet-700" },
                  { name: "Biology Tutor", subject: "Biology · NEET & Class 10", exp: "6+ yrs", initials: "BT", color: "bg-emerald-100 text-emerald-700" },
                  { name: "English Trainer", subject: "Spoken English & Grammar", exp: "5+ yrs", initials: "ET", color: "bg-rose-100 text-rose-700" },
                  { name: "Foundation Lead", subject: "Class 1–8 All Subjects", exp: "9+ yrs", initials: "FL", color: "bg-amber-100 text-amber-700" },
                  { name: "Olympiad Coach", subject: "NTSE & Olympiad Training", exp: "6+ yrs", initials: "OC", color: "bg-indigo-100 text-indigo-700" },
                  { name: "Civils Mentor", subject: "Civils Foundation & Aptitude", exp: "5+ yrs", initials: "CM", color: "bg-slate-100 text-slate-700" },
                ].map((f, i) => (
                  <motion.div
                    key={f.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -3 }}
                    className="flex flex-col items-center rounded-2xl border border-border bg-white p-4 text-center shadow-sm"
                  >
                    {f.isPhoto ? (
                      <img src={f.avatar} alt={f.name} className="h-14 w-14 rounded-2xl object-cover object-top shadow" />
                    ) : (
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-black ${(f as any).color}`}>
                        {(f as any).initials}
                      </div>
                    )}
                    <p className="mt-3 text-xs font-black text-foreground sm:text-sm">{f.name}</p>
                    <p className="mt-0.5 text-[10px] leading-5 text-muted-foreground sm:text-xs">{f.subject}</p>
                    <span className="mt-2 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">{f.exp}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* COURSES — redesigned */}
        <section id="courses" className="py-12 sm:py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">

            {/* Section header */}
            <motion.div {...fadeUp()} className="mb-8 sm:mb-10">
              <Eyebrow label="Courses Offered" />
              <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
                Complete academic &amp; competitive coaching under one roof
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[15px] sm:leading-8">
                From Class&nbsp;1 to Intermediate, school academics to IIT‑JEE and NEET — we cover every stage with
                dedicated faculty and a proven curriculum.
              </p>
            </motion.div>

            {/* Tab pills */}
            <div className="-mx-4 overflow-x-auto px-4 sm:-mx-6 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-2 pb-3">
                {courseGroups.map((g) => {
                  const acc = categoryAccents[g.title] ?? categoryAccents["Courses Offered"];
                  const active = activeCategory === g.title;
                  return (
                    <button key={g.title} type="button" onClick={() => setActiveCategory(g.title)}
                      className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2 text-[11px] font-bold transition sm:px-4 sm:text-xs ${
                        active ? `${acc.bg} ${acc.border} ${acc.text}` : "border-border bg-white text-muted-foreground hover:border-slate-300 hover:text-foreground"
                      }`}>
                      <span className={`flex h-5 w-5 items-center justify-center rounded-lg ${active ? acc.icon : "bg-slate-100 text-slate-500"}`}>
                        {categoryIcons[g.title]}
                      </span>
                      {g.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active category items */}
            <AnimatePresence mode="wait">
              {activeCategoryData && (() => {
                const acc = categoryAccents[activeCategory] ?? categoryAccents["Courses Offered"];
                return (
                  <motion.div key={activeCategory}
                    initial={{ opacity: 0, y: 12, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0,  scale: 1    }}
                    exit={{ opacity: 0, y: -8, scale: 0.99 }}
                    transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
                    className={`mt-4 rounded-2xl border ${acc.border} ${acc.bg} p-5 sm:p-7`}>
                    <div className="mb-5 flex items-center gap-3">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${acc.icon}`}>
                        {categoryIcons[activeCategory]}
                      </div>
                      <div>
                        <p className={`text-[11px] font-bold uppercase tracking-[0.2em] ${acc.text}`}>{activeCategory}</p>
                        <p className="text-sm font-black text-foreground">{activeCategoryData.items.length} programs available</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {activeCategoryData.items.map((item, i) => (
                        <motion.div key={item}
                          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.035 }}
                          className="flex items-start gap-2.5 rounded-xl border border-white/80 bg-white/75 px-4 py-3 shadow-sm backdrop-blur">
                          <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${acc.check}`} />
                          <span className="text-sm font-medium leading-6 text-foreground">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>

            {/* Course detail cards */}
            <motion.div {...fadeUp(0.1)} className="mt-10 sm:mt-14">
              <div className="mb-5">
                <Eyebrow label="Course Details" />
                <h3 className="mt-2 text-xl font-black sm:text-2xl">Tap a course to explore its structure &amp; syllabus</h3>
              </div>
              <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {courseDetailCards.map((course, index) => (
                  <motion.button key={course.title} type="button"
                    initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.06 }}
                    whileHover={{ y: -4 }} whileTap={{ scale: 0.96 }}
                    onClick={() => setActiveCourse(course.title)}
                    className="flex min-w-[116px] flex-col items-center gap-2.5 rounded-2xl border border-border bg-white p-4 shadow-sm transition hover:border-primary hover:shadow-md sm:min-w-[136px] sm:p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:h-12 sm:w-12">
                      <CourseIcon icon={course.icon} className="h-5 w-5" />
                    </div>
                    <p className="text-center text-xs font-bold leading-tight text-foreground sm:text-sm">{course.title}</p>
                    <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      View <ChevronRight className="h-3 w-3" />
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="bg-slate-50 py-12 sm:py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <motion.div {...fadeUp()} className="mb-8 sm:mb-12">
              <Eyebrow label="Our Programs" />
              <h2 className="mt-3 text-2xl font-black sm:text-3xl lg:text-4xl">Programs that build strong basics</h2>
            </motion.div>
            <div className="grid gap-5 lg:grid-cols-2">
              <motion.div {...fadeUp(0.05)} className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-8">
                <div className="flex items-center gap-3 border-b border-border pb-5">
                  <div className="rounded-xl bg-primary/10 p-2.5 text-primary"><BookOpen className="h-5 w-5" /></div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">Academic Support</p>
                    <p className="text-base font-black sm:text-lg">Core coaching programs</p>
                  </div>
                </div>
                <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {supportPrograms.map((item, i) => (
                    <motion.div key={item}
                      initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-xs font-medium leading-6 sm:text-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div {...fadeUp(0.1)} className="rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-sm sm:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-5">
                  <div className="rounded-xl bg-amber-400/20 p-2.5 text-amber-300"><Trophy className="h-5 w-5" /></div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-300">Our Services</p>
                    <p className="text-base font-black text-white sm:text-lg">What every student gets</p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-2 xl:grid-cols-3">
                  {serviceItems.map((item, i) => (
                    <motion.div key={item}
                      initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-medium text-white/85 sm:text-sm">
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* STUDENT FOCUS */}
        <section className="py-12 sm:py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
              <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55 }}>
                <img src="/our-students.jpg" alt="Students at Vulli Narayana Institute"
                  className="h-52 w-full rounded-3xl object-cover shadow-xl shadow-slate-200 sm:h-72 lg:h-[420px]" />
              </motion.div>
              <motion.div {...fadeUp(0.1)}>
                <Eyebrow label="Student Focus" />
                <h2 className="mt-3 text-2xl font-black sm:text-3xl lg:text-4xl">
                  Flexible batches, bridge courses &amp; one-to-one teaching
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-[15px]">
                  Regular tuitions, bridge batches for 10th and Intermediate, competitive foundations and language workshops.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    { icon: <GraduationCap className="h-4 w-4" />, title: "Focused Learning", body: "Foundation for NEET and IIT, school all-subject support and Spoken English from the same campus." },
                    { icon: <Building2 className="h-4 w-4" />, title: "Comfortable Campus", body: "AC classrooms, mock tests, weekend exams, mentor meetings and paper explanations." },
                    { icon: <Clock className="h-4 w-4" />, title: "Flexible Batches", body: "Morning and evening batches, one-to-one revision support and demo classes for new admissions." },
                    { icon: <Users className="h-4 w-4" />, title: "Personalized Care", body: "Daily monitoring, special focus on weak students and flexible support for every level." },
                  ].map((card, i) => (
                    <motion.div key={card.title}
                      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                      className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                      <div className="mb-2 flex items-center gap-2 text-primary">
                        {card.icon}
                        <p className="text-sm font-bold">{card.title}</p>
                      </div>
                      <p className="text-xs leading-6 text-muted-foreground sm:text-sm">{card.body}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.div {...fadeUp(0.15)} className="mt-5 rounded-2xl border border-primary/15 bg-primary/5 p-4 sm:p-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">Why Parents Choose Us</p>
                  <ul className="space-y-2">
                    {["Daily monitoring with regular tests","Special focus on weak students","Flexible support for school and competitive learning"].map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-xs text-muted-foreground sm:text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ADMISSIONS */}
        <section id="admissions" className="bg-[linear-gradient(135deg,#172554_0%,#1d4ed8_55%,#0f172a_100%)] py-12 text-white sm:py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
              <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55 }}>
                <Eyebrow label="Admissions" dark />
                <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl lg:text-4xl">Admission is open for 2026–2027</h2>
                <p className="mt-3 text-sm leading-7 text-white/70 sm:text-[15px]">
                  Fill the enquiry form and we will get back to you shortly. You can also call, WhatsApp or email us directly.
                </p>
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <p className="mb-4 text-sm font-bold">Quick Contact</p>
                  <div className="space-y-3 text-sm text-white/80">
                    <a href={`tel:${institutePhone}`} className="flex items-center gap-3 transition hover:text-amber-300">
                      <Phone className="h-4 w-4 shrink-0" /> {institutePhone}
                    </a>
                    <a href={`mailto:${instituteEmail}`} className="flex items-center gap-3 transition hover:text-amber-300">
                      <Mail className="h-4 w-4 shrink-0" /> {instituteEmail}
                    </a>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                      <span className="leading-6">{instituteAddress}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={whatsappLink} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl bg-green-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-green-400">
                    <MessageCircle className="h-4 w-4" /> WhatsApp Chat
                  </a>
                  <button type="button" onClick={() => setIsEnrollOpen(true)}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/20">
                    <Sparkles className="h-4 w-4" /> Enroll Now
                  </button>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
                className="rounded-3xl bg-white p-5 text-slate-900 shadow-2xl shadow-slate-950/30 sm:p-8">
                <div className="mb-5 border-b border-border pb-5">
                  <Eyebrow label="Enquiry Form" />
                  <h3 className="mt-2 text-xl font-black sm:text-2xl">Send us your details</h3>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">We will call you shortly after receiving your enquiry.</p>
                </div>
                <EnquiryForm submitState={submitState} setSubmitState={setSubmitState}
                  whatsappLink={whatsappLink} email={instituteEmail} />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="contact" className="relative z-10 bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-3">
                <img src="/favicon.png" alt="Vulli Narayana Institute" className="h-10 w-10 rounded-xl border border-white/10 object-cover" />
                <div>
                  <p className="font-black">Vulli Narayana Institute</p>
                  <p className="text-xs text-white/50">Tirupati, Andhra Pradesh</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/60">
                Dedicated academic guidance for school students, Intermediate, IIT‑JEE, NEET, EAPCET, Olympiad, Polycet, Spoken English and one-to-one teaching.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  { href:"https://www.instagram.com/narayanavulli?igsh=ZWY3ampqaGE0ZWl0", icon:<Instagram className="h-3.5 w-3.5"/>, label:"Instagram"},
                  { href:"https://youtube.com/@vullinarayanatuition?si=ZVXP2dTsRrPJaZUA",  icon:<Youtube className="h-3.5 w-3.5"/>,   label:"YouTube"},
                  { href:"https://x.com/VulliNarayana",                                    icon:<UserRound className="h-3.5 w-3.5"/>, label:"Twitter / X"},
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs transition hover:border-amber-300 hover:text-amber-300">
                    {s.icon}{s.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300">Contact</p>
                <div className="space-y-3 text-sm text-white/70">
                  <a href={`tel:${institutePhone}`} className="flex items-center gap-3 transition hover:text-amber-300"><Phone className="h-4 w-4 shrink-0"/>{institutePhone}</a>
                  <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-amber-300"><MessageCircle className="h-4 w-4 shrink-0"/>WhatsApp Chat</a>
                  <a href={`mailto:${instituteEmail}`} className="flex items-center gap-3 transition hover:text-amber-300"><Mail className="h-4 w-4 shrink-0"/>{instituteEmail}</a>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300">Location</p>
                <div className="flex items-start gap-3 text-sm leading-7 text-white/70">
                  <MapPin className="mt-1 h-4 w-4 shrink-0"/><span>{instituteAddress}</span>
                </div>
                <a href={mapsLink} target="_blank" rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary/80 px-4 py-2 text-xs font-bold text-white transition hover:bg-primary">
                  Open in Maps
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-6 text-center text-[11px] text-white/40">
            © {new Date().getFullYear()} Vulli Narayana Institute. All rights reserved.
          </div>
        </div>
      </footer>

      {/* FLOATING BUTTONS */}
      <div className="fixed bottom-5 right-4 z-50 flex flex-col gap-2.5">
        <motion.a whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
          href={whatsappLink} target="_blank" rel="noreferrer" aria-label="WhatsApp"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-green-500/40">
          {/* Official WhatsApp icon */}
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </motion.a>
        <motion.a whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
          href={`tel:${institutePhone}`} aria-label="Call"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-600/30">
          <Phone className="h-5 w-5" />
        </motion.a>
      </div>

      {/* ENROLL POPUP */}
      <AnimatePresence>
        {isEnrollOpen && (
          <motion.div {...backdropProps}
            className={`${modalProps} bg-slate-950/60`}
            onClick={(e) => e.target === e.currentTarget && setIsEnrollOpen(false)}>
            <motion.div {...sheetSlide} className={`${sheetProps} sm:max-w-2xl`}>
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <Eyebrow label="Enroll Now" />
                  <h3 className="mt-2 text-xl font-black sm:text-2xl">Admission enquiry</h3>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Fill in the details — we will call you shortly.</p>
                </div>
                <motion.button type="button" onClick={() => setIsEnrollOpen(false)}
                  whileHover={{ scale: 1.1, backgroundColor: "#f1f5f9" }}
                  whileTap={{ scale: 0.92 }}
                  className="rounded-full border border-border p-2 text-muted-foreground">
                  <X className="h-4 w-4" />
                </motion.button>
              </div>
              <EnquiryForm submitState={popupSubmit} setSubmitState={setPopupSubmit}
                onSuccess={() => setIsEnrollOpen(false)} whatsappLink={whatsappLink} email={instituteEmail} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROFILE POPUP */}
      <AnimatePresence>
        {isProfileOpen && (
          <motion.div {...backdropProps}
            className={`${modalProps} bg-slate-950/60`}
            onClick={(e) => e.target === e.currentTarget && setIsProfileOpen(false)}>
            <motion.div {...sheetSlide} className={`${sheetProps} sm:max-w-xl`}>
              <div className="mb-5 flex items-start justify-between gap-3">
                <div>
                  <Eyebrow label="Our Profile" />
                  <h3 className="mt-2 text-lg font-black sm:text-xl">Vulli Narayana Institute</h3>
                </div>
                <motion.button type="button" onClick={() => setIsProfileOpen(false)}
                  whileHover={{ scale: 1.1, backgroundColor: "#f1f5f9" }}
                  whileTap={{ scale: 0.92 }}
                  className="rounded-full border border-border p-2 text-muted-foreground">
                  <X className="h-4 w-4" />
                </motion.button>
              </div>
              <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-start">
                <motion.img src="/ceo.jpg" alt="Vulli Narayana Institute"
                  initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.12, duration: 0.4 }}
                  className="mx-auto h-36 w-36 rounded-2xl object-cover object-top sm:mx-0 sm:h-44 sm:w-44" />
                <div>
                  <p className="text-sm leading-7 text-muted-foreground">
                    Vulli Narayana Institute is dedicated to building strong academic fundamentals and confident exam preparation for students in Tirupati.
                    The institute focuses on disciplined learning, personal attention, concept clarity and supportive mentoring for school academics,
                    Intermediate and competitive examinations.
                  </p>
                  <div className="mt-4 grid gap-2">
                    {instituteProfilePoints.map((point, i) => (
                      <motion.div key={point}
                        initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.07 }}
                        className="flex items-start gap-2 rounded-xl border border-border bg-slate-50 px-3 py-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-xs leading-5 text-muted-foreground">{point}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a href="https://www.instagram.com/narayanavulli?igsh=ZWY3ampqaGE0ZWl0" target="_blank" rel="noreferrer" className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700">Instagram</a>
                    <a href="https://youtube.com/@vullinarayanatuition?si=ZVXP2dTsRrPJaZUA" target="_blank" rel="noreferrer" className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700">YouTube</a>
                    <a href="https://x.com/VulliNarayana" target="_blank" rel="noreferrer" className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700">Twitter / X</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOCATION POPUP */}
      <AnimatePresence>
        {isLocationOpen && (
          <motion.div {...backdropProps}
            className={`${modalProps} bg-slate-950/60`}
            onClick={(e) => e.target === e.currentTarget && setIsLocationOpen(false)}>
            <motion.div {...sheetSlide} className={`${sheetProps} sm:max-w-md`}>
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <Eyebrow label="Location" />
                  <h3 className="mt-2 text-xl font-black">Visit Our Institute</h3>
                </div>
                <motion.button type="button" onClick={() => setIsLocationOpen(false)}
                  whileHover={{ scale: 1.1, backgroundColor: "#f1f5f9" }}
                  whileTap={{ scale: 0.92 }}
                  className="rounded-full border border-border p-2 text-muted-foreground">
                  <X className="h-4 w-4" />
                </motion.button>
              </div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                  <p className="text-sm leading-7 text-amber-950">{instituteAddress}</p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
                className="mt-5 flex flex-wrap gap-3">
                <motion.a href={mapsLink} target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20">Open in Maps</motion.a>
                <motion.a href={`tel:${institutePhone}`}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 rounded-2xl border border-border px-5 py-2.5 text-sm font-bold transition hover:border-primary hover:text-primary">
                  <Phone className="h-4 w-4" /> Call Institute
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COURSE DETAIL POPUP */}
      <AnimatePresence>
        {activeCourseCard && (
          <motion.div {...backdropProps}
            className={`${modalProps} bg-slate-950/60`}
            onClick={(e) => e.target === e.currentTarget && setActiveCourse(null)}>
            <motion.div {...sheetSlide} className={`${sheetProps} sm:max-w-2xl`}>
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 22 }}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <CourseIcon icon={activeCourseCard.icon} className="h-5 w-5" />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.14 }}>
                    <Eyebrow label="Course Details" />
                    <h3 className="mt-1 text-xl font-black">{activeCourseCard.title}</h3>
                  </motion.div>
                </div>
                <motion.button type="button" onClick={() => setActiveCourse(null)}
                  whileHover={{ scale: 1.1, backgroundColor: "#f1f5f9" }}
                  whileTap={{ scale: 0.92 }}
                  className="rounded-full border border-border p-2 text-muted-foreground">
                  <X className="h-4 w-4" />
                </motion.button>
              </div>
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
                className="text-sm leading-7 text-muted-foreground sm:text-[15px]">{activeCourseCard.overview}</motion.p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="rounded-2xl border border-border bg-slate-50 p-5">
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Course Structure</p>
                  <ul className="space-y-3">
                    {activeCourseCard.structure.map((point, i) => (
                      <motion.li key={point}
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.24 + i * 0.07 }}
                        className="flex items-start gap-2.5 text-sm leading-6 text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{point}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                  className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-700">Syllabus Type</p>
                  <p className="text-sm leading-7 text-amber-950">{activeCourseCard.syllabus}</p>
                </motion.div>
              </div>
              <motion.button
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                type="button" onClick={() => { setActiveCourse(null); setIsEnrollOpen(true); }}
                className="mt-6 w-full rounded-2xl bg-primary py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition">
                Enroll in {activeCourseCard.title}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
