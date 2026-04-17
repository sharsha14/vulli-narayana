import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Building2,
  FlaskConical,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Instagram,
  Landmark,
  Mail,
  MapPin,
  MessageCircle,
  NotebookText,
  Phone,
  Settings,
  Star,
  Trophy,
  UserRound,
  X,
  Youtube,
} from "lucide-react";
import {
  courseGroups,
  instituteAddress,
  instituteEmail,
  institutePhone,
  quickHighlights,
  serviceItems,
  supportPrograms,
  courseDetailCards,
  instituteProfilePoints,
} from "../lib/vulli-data";

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  const isDarkSection = eyebrow === "Admissions";

  return (
    <div>
      <p
        className={`text-sm font-semibold uppercase tracking-[0.25em] ${
          isDarkSection ? "text-amber-300" : "text-primary"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-3xl font-black sm:text-4xl ${
          isDarkSection ? "text-white" : ""
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 max-w-2xl text-base leading-8 ${
            isDarkSection ? "text-white/75" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default function VulliInstitutePage() {
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [activeCourse, setActiveCourse] = useState<string | null>(null);

  const whatsappLink = useMemo(
    () =>
      `https://wa.me/91${institutePhone}?text=${encodeURIComponent(
        "Hello, I want to know more about admissions at Vulli Narayana Institute.",
      )}`,
    [],
  );

  const mapsLink = useMemo(
    () => "https://maps.app.goo.gl/vYd5bGkuYHkAmzBQ7",
    [],
  );

  async function handleEnrollSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("idle");

    const formData = new FormData(event.currentTarget);

    try {
      formData.append("_subject", "New Admission Enquiry - Vulli Narayana Institute");
      formData.append("_template", "table");
      formData.append("_captcha", "false");

      const response = await fetch("https://formsubmit.co/ajax/04c90c872e629ef45a0d41f4478a3dbe", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Unable to send enquiry");
      }

      setSubmitState("success");
      event.currentTarget.reset();
    } catch {
      setSubmitState("error");
    }
  }

  const activeCourseCard =
    courseDetailCards.find((course) => course.title === activeCourse) ?? null;

  function CourseIcon({ icon }: { icon: string }) {
    const className = "h-6 w-6";

    switch (icon) {
      case "engineering":
        return <Settings className={className} />;
      case "class10":
        return <GraduationCap className={className} />;
      case "bridge":
        return <NotebookText className={className} />;
      case "olympiad":
        return <Trophy className={className} />;
      case "neetjee":
        return <FlaskConical className={className} />;
      case "eamcet":
        return <BookOpen className={className} />;
      case "civils":
        return <Landmark className={className} />;
      default:
        return <BookOpen className={className} />;
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/favicon.png"
              alt="Vulli Narayana Institute logo"
              className="h-10 w-10 rounded-2xl border border-border object-cover sm:h-12 sm:w-12"
            />
            <div>
              <p className="text-base font-black tracking-tight sm:text-lg">
                Vulli Narayana Institute
              </p>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Admissions Open for 2026-2027
              </p>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3 lg:items-end">
            <nav className="flex flex-wrap items-center gap-2 text-sm font-medium text-muted-foreground sm:gap-4">
              <a href="#courses" className="hover:text-primary">
                Courses
              </a>
              <a href="#services" className="hover:text-primary">
                Services
              </a>
              <a href="#admissions" className="hover:text-primary">
                Admissions
              </a>
              <a href="#contact" className="hover:text-primary">
                Contact
              </a>
              <button
                type="button"
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-left hover:border-primary hover:text-primary"
              >
                <img
                  src="/ceo.jpg"
                  alt="CEO of Vulli Narayana Institute"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="hidden sm:inline">Our Profile</span>
              </button>
              <button
                type="button"
                onClick={() => setIsLocationOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-amber-900 transition hover:-translate-y-0.5 hover:border-amber-400"
                aria-label="Open location details"
              >
                <MapPin className="h-4 w-4" />
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(254,215,170,0.65),_transparent_35%),linear-gradient(135deg,#fff8ef_0%,#fff_45%,#eef6ff_100%)]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                <Star className="h-4 w-4" />
                Admissions Open for 2026-2027
              </div>
              <h1 className="max-w-4xl text-3xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Personalized coaching for{" "}
                <span className="text-primary">
                  school, foundation and competitive exams
                </span>{" "}
                in Tirupati.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                Vulli Narayana Institute supports students from Class 1 to
                Intermediate with focused guidance for IIT, NEET, EAPCET, Olympiad,
                Polycet, spoken English and one-to-one teaching.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <button
                  type="button"
                  onClick={() => setIsEnrollOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:-translate-y-0.5"
                >
                  Enroll Now
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-3.5 text-base font-semibold hover:border-primary hover:text-primary"
                >
                  <MessageCircle className="h-4 w-4" />
                  Message on WhatsApp
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {quickHighlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-border bg-card/90 p-4 shadow-sm"
                  >
                    <p className="text-sm font-semibold leading-6">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="absolute -right-6 -top-6 h-36 w-36 rounded-full bg-amber-200/60 blur-3xl" />
              <img
                src="/hero-section.jpg"
                alt="Students at Vulli Narayana Institute"
              className="relative h-full min-h-[280px] w-full rounded-[2rem] border border-white/50 object-cover shadow-2xl shadow-slate-300/50 sm:min-h-[360px]"
              />
            </motion.div>
          </div>
        </section>

        <section className="border-y border-border bg-slate-950 py-5 text-white">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-4 text-center text-sm font-semibold uppercase tracking-[0.2em] sm:px-6">
            <span>Tirupati</span>
            <span className="text-amber-300">IIT / NEET Foundation</span>
            <span>Regular Tuitions</span>
            <span className="text-amber-300">One-to-One Teaching</span>
            <span>Spoken English</span>
          </div>
        </section>

        <section id="courses" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-8">
            <div className="space-y-6">
              <SectionTitle
                eyebrow="Courses Offered"
                title="Complete academic and competitive coaching under one institute"
                description="The institute covers school academics, intermediate preparation, foundation batches, competitive exams, spoken English and personalized teaching for every stage of a student's journey."
              />
              <img
                src="/course.jpg"
                alt="Courses offered at Vulli Narayana Institute"
                className="h-[260px] w-full rounded-[2rem] object-cover shadow-xl shadow-slate-200 sm:h-[320px] lg:h-[420px]"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 sm:gap-5">
              {courseGroups.map((group) => (
                <article
                  key={group.title}
                  className="rounded-[1.5rem] border border-border bg-card p-4 shadow-sm sm:rounded-[1.75rem] sm:p-6"
                >
                  <h3 className="text-lg font-bold text-primary">{group.title}</h3>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                  Course Details
                </p>
                <h3 className="mt-3 text-2xl font-black sm:text-3xl">
                  Click a course icon to view structure and syllabus
                </h3>
              </div>
            </div>

            <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4">
              {courseDetailCards.map((course, index) => (
                <motion.button
                  key={course.title}
                  type="button"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  onClick={() => setActiveCourse(course.title)}
                  className="min-w-[132px] rounded-[1.5rem] border border-border bg-card p-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-primary sm:min-w-[160px] sm:p-5"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:h-14 sm:w-14">
                      <CourseIcon icon={course.icon} />
                    </div>
                    <h4 className="mt-4 text-sm font-bold sm:text-base">{course.title}</h4>
                    <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Tap to view
                    </p>
                    <ChevronRight className="mt-3 h-4 w-4 text-muted-foreground" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="bg-slate-50 py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr] lg:gap-10">
              <div className="rounded-[2rem] bg-card p-5 shadow-sm sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                      Academic Support
                    </p>
                    <h2 className="text-3xl font-black">Programs that build strong basics</h2>
                  </div>
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {supportPrograms.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-border bg-slate-50 p-4"
                    >
                      <p className="text-sm font-medium leading-6">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] bg-slate-950 p-5 text-white shadow-sm sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white/10 p-3 text-amber-300">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
                      Our Services
                    </p>
                    <h2 className="text-3xl font-black">What students receive here</h2>
                  </div>
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {serviceItems.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <p className="text-sm font-medium leading-6 text-white/90">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-8">
            <img
              src="/our-students.jpg"
              alt="Students learning at Vulli Narayana Institute"
              className="h-[250px] w-full rounded-[2rem] object-cover shadow-xl shadow-slate-200 sm:h-[320px] lg:h-[420px]"
            />
            <div>
              <SectionTitle
                eyebrow="Student Focus"
                title="Flexible batches, bridge courses and one-to-one teaching"
                description="Students can join regular tuitions, short-term or long-term coaching, bridge batches for 10th and Intermediate, competitive foundations and language workshops in English, Hindi and Telugu."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-border bg-card p-4 shadow-sm sm:rounded-[1.75rem] sm:p-5">
                  <div className="flex items-center gap-3 text-primary">
                    <GraduationCap className="h-5 w-5" />
                    <p className="font-bold">Focused Learning</p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Foundation for NEET and IIT, school all-subject support and
                    spoken English from the same campus.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-border bg-card p-4 shadow-sm sm:rounded-[1.75rem] sm:p-5">
                  <div className="flex items-center gap-3 text-primary">
                    <Building2 className="h-5 w-5" />
                    <p className="font-bold">Comfortable Campus</p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    AC classrooms, mock tests, weekend examinations, mentor meetings
                    and paper explanations support continuous improvement.
                  </p>
                </div>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-primary/15 bg-primary/5 p-4 sm:rounded-[1.75rem] sm:p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                    Why Parents Choose Us
                  </p>
                  <ul className="mt-4 space-y-3">
                    {[
                      "Daily monitoring with regular tests",
                      "Special focus on weak students",
                      "Flexible support for school and competitive learning",
                    ].map((point) => (
                      <li key={point} className="flex gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-4 sm:rounded-[1.75rem] sm:p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
                    Batch Support
                  </p>
                  <ul className="mt-4 space-y-3">
                    {[
                      "Morning and evening batches",
                      "One-to-one teaching and revision support",
                      "Demo classes for new admissions",
                    ].map((point) => (
                      <li key={point} className="flex gap-3 text-sm text-amber-900">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-border bg-card p-4 shadow-sm">
                <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {[
                    "Foundation support for NEET and IIT",
                    "Bridge course guidance for 10th to Inter",
                    "Flexible batches for school and competitive exams",
                    "Language workshops and spoken English training",
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: index * 0.06 }}
                      className="min-w-[220px] rounded-2xl border border-border bg-slate-50 px-4 py-4 text-sm font-medium leading-6 text-foreground sm:min-w-[240px]"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="admissions"
          className="bg-[linear-gradient(135deg,#172554_0%,#1d4ed8_52%,#0f172a_100%)] py-16 text-white lg:py-20"
        >
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <SectionTitle
                eyebrow="Admissions"
                title="Admission is open for 2026-2027"
                description="Submit the enquiry form to capture the student details directly in this static website. You can also call, email or message directly for batch details and counseling."
              />
              <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/10 p-6">
                <p className="text-lg font-bold">Quick Contact</p>
                <div className="mt-4 space-y-3 text-sm text-white/85">
                  <a
                    href={`tel:${institutePhone}`}
                    className="flex items-center gap-3 hover:text-amber-300"
                  >
                    <Phone className="h-4 w-4" />
                    {institutePhone}
                  </a>
                  <a
                    href={`mailto:${instituteEmail}`}
                    className="flex items-center gap-3 hover:text-amber-300"
                  >
                    <Mail className="h-4 w-4" />
                    {instituteEmail}
                  </a>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{instituteAddress}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-5 text-slate-900 shadow-2xl shadow-slate-950/20 sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                    Enquiry Form
                  </p>
                  <h3 className="mt-2 text-2xl font-black">Capture student details</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEnrollOpen(true)}
                  className="rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-white"
                >
                  Open Popup Form
                </button>
              </div>

              <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleEnrollSubmit}>
                <label className="space-y-2">
                  <span className="text-sm font-medium">Student Name</span>
                  <input
                    name="studentName"
                    required
                    className="w-full rounded-2xl border border-border px-4 py-3 outline-none focus:border-primary"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium">Parent Name</span>
                  <input
                    name="parentName"
                    required
                    className="w-full rounded-2xl border border-border px-4 py-3 outline-none focus:border-primary"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium">Phone Number</span>
                  <input
                    name="phone"
                    required
                    className="w-full rounded-2xl border border-border px-4 py-3 outline-none focus:border-primary"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium">Class / Course</span>
                  <input
                    name="course"
                    required
                    className="w-full rounded-2xl border border-border px-4 py-3 outline-none focus:border-primary"
                  />
                </label>
                <label className="space-y-2 sm:col-span-2">
                  <span className="text-sm font-medium">Message</span>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full rounded-2xl border border-border px-4 py-3 outline-none focus:border-primary"
                    placeholder="Tell us which course or class you are interested in."
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Send Enquiry
                </button>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl border border-border px-5 py-3 font-semibold hover:border-primary hover:text-primary"
                >
                  Message on WhatsApp
                </a>
              </form>

              {submitState === "success" ? (
                <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                  We call you shortly.
                </p>
              ) : null}
              {submitState === "error" ? (
                <p className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                  We could not capture the enquiry right now. Please try again or
                  contact the institute directly.
                </p>
              ) : null}
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="flex items-center gap-3">
                <img
                  src="/favicon.png"
                  alt="Vulli Narayana Institute logo"
                  className="h-12 w-12 rounded-2xl border border-white/10 object-cover"
                />
                <div>
                  <p className="text-xl font-black">Vulli Narayana Institute</p>
                  <p className="text-sm text-white/60">Tirupati, Andhra Pradesh</p>
                </div>
              </div>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">
                Dedicated academic guidance for school students, Intermediate,
                IIT-JEE, NEET, EAPCET, Olympiad, Polycet, spoken English and
                one-to-one teaching.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://www.instagram.com/narayanavulli?igsh=ZWY3ampqaGE0ZWl0"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm hover:border-amber-300 hover:text-amber-300"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
                <a
                  href="https://youtube.com/@vullinarayanatuition?si=ZVXP2dTsRrPJaZUA"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm hover:border-amber-300 hover:text-amber-300"
                >
                  <Youtube className="h-4 w-4" />
                  YouTube
                </a>
                <a
                  href="https://x.com/VulliNarayana"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm hover:border-amber-300 hover:text-amber-300"
                >
                  <UserRound className="h-4 w-4" />
                  Twitter / X
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                  Contact
                </p>
                <div className="mt-4 space-y-3 text-sm text-white/80">
                  <a
                    href={`tel:${institutePhone}`}
                    className="flex items-center gap-3 hover:text-amber-300"
                  >
                    <Phone className="h-4 w-4" />
                    {institutePhone}
                  </a>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 hover:text-amber-300"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Chat
                  </a>
                  <a
                    href={`mailto:${instituteEmail}`}
                    className="flex items-center gap-3 hover:text-amber-300"
                  >
                    <Mail className="h-4 w-4" />
                    {instituteEmail}
                  </a>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                  Location
                </p>
                <div className="mt-4 flex items-start gap-3 text-sm leading-7 text-white/80">
                  <MapPin className="mt-1 h-4 w-4 shrink-0" />
                  <span>{instituteAddress}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 sm:right-4 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-xl shadow-green-500/30 transition hover:scale-105 sm:h-14 sm:w-14"
        >
          <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden="true">
            <path d="M19.11 17.39c-.27-.13-1.61-.79-1.86-.88-.25-.09-.43-.13-.61.13-.18.27-.7.88-.86 1.06-.16.18-.31.2-.58.07-.27-.13-1.12-.41-2.13-1.31-.79-.7-1.32-1.56-1.47-1.82-.16-.27-.02-.41.11-.54.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.27 0 1.34.97 2.64 1.11 2.82.13.18 1.91 2.91 4.63 4.08.65.28 1.16.45 1.56.58.66.21 1.26.18 1.74.11.53-.08 1.61-.66 1.84-1.3.23-.64.23-1.19.16-1.3-.07-.11-.25-.18-.52-.31Z" />
            <path d="M16.03 3.2c-7.1 0-12.86 5.73-12.86 12.8 0 2.26.59 4.47 1.71 6.41L3 29l6.8-1.77a12.87 12.87 0 0 0 6.23 1.59h.01c7.09 0 12.86-5.73 12.86-12.8 0-3.42-1.34-6.63-3.79-9.05A12.8 12.8 0 0 0 16.03 3.2Zm0 23.46h-.01a10.7 10.7 0 0 1-5.45-1.49l-.39-.23-4.04 1.05 1.08-3.93-.25-.4a10.58 10.58 0 0 1-1.64-5.65c0-5.88 4.81-10.66 10.72-10.66 2.86 0 5.55 1.11 7.57 3.11a10.56 10.56 0 0 1 3.14 7.55c0 5.88-4.81 10.65-10.72 10.65Z" />
          </svg>
        </a>
        <a
          href={`tel:${institutePhone}`}
          aria-label="Call Vulli Narayana Institute"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-600/30 transition hover:scale-105 sm:h-14 sm:w-14"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true">
            <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.07 21 3 13.93 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.58.11.35.03.74-.25 1.01l-2.2 2.2Z" />
          </svg>
        </a>
      </div>

      {isEnrollOpen ? (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/70 px-4 py-6 sm:flex sm:items-center sm:justify-center sm:py-8">
          <div className="mx-auto w-full max-w-2xl rounded-[2rem] bg-white p-5 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Enroll Now
                </p>
                <h3 className="mt-2 text-2xl font-black">Admission enquiry form</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Fill in the student details and we will call you shortly.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEnrollOpen(false)}
                className="rounded-full border border-border p-2 text-muted-foreground hover:text-foreground"
                aria-label="Close form"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleEnrollSubmit}>
              <label className="space-y-2">
                <span className="text-sm font-medium">Student Name</span>
                <input
                  name="studentName"
                  required
                  className="w-full rounded-2xl border border-border px-4 py-3 outline-none focus:border-primary"
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Parent Name</span>
                <input
                  name="parentName"
                  required
                  className="w-full rounded-2xl border border-border px-4 py-3 outline-none focus:border-primary"
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Phone Number</span>
                <input
                  name="phone"
                  required
                  className="w-full rounded-2xl border border-border px-4 py-3 outline-none focus:border-primary"
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Class / Course</span>
                <input
                  name="course"
                  required
                  className="w-full rounded-2xl border border-border px-4 py-3 outline-none focus:border-primary"
                />
              </label>
              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-medium">Message</span>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full rounded-2xl border border-border px-4 py-3 outline-none focus:border-primary"
                />
              </label>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Send Enquiry
              </button>
              <a
                href={`mailto:${instituteEmail}`}
                className="inline-flex items-center justify-center rounded-2xl border border-border px-5 py-3 font-semibold hover:border-primary hover:text-primary"
              >
                Email Directly
              </a>
            </form>

            {submitState === "success" ? (
              <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                We call you shortly.
              </p>
            ) : null}
            {submitState === "error" ? (
              <p className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                Capture failed right now. Please try again or contact the
                institute directly.
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      {isProfileOpen ? (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/75 px-4 py-6 sm:flex sm:items-center sm:justify-center sm:py-8">
          <div className="mx-auto w-full max-w-xl rounded-[1.75rem] bg-white p-4 shadow-2xl sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Our Profile
                </p>
                <h3 className="mt-1.5 text-lg font-black sm:text-xl">Our Profile</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsProfileOpen(false)}
                className="sticky right-0 top-0 shrink-0 rounded-full border border-border bg-white p-2 text-muted-foreground shadow-sm hover:text-foreground"
                aria-label="Close CEO profile"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-[0.52fr_1.48fr] md:items-start">
              <img
                src="/ceo.jpg"
                alt="CEO of Vulli Narayana Institute"
                className="mx-auto h-[150px] w-full max-w-[180px] rounded-[1.25rem] object-cover object-top sm:h-[190px] sm:max-w-[210px] md:mx-0 md:h-[220px] md:max-w-none"
              />
              <div className="flex h-full flex-col justify-start">
                <h4 className="text-lg font-black sm:text-xl">Vulli Narayana Institute</h4>
                <p className="mt-2.5 text-sm leading-6 text-muted-foreground">
                  Vulli Narayana Institute is dedicated to building strong
                  academic fundamentals and confident exam preparation for
                  students in Tirupati. The institute focuses on disciplined
                  learning, personal attention, concept clarity and supportive
                  mentoring for school academics, Intermediate and competitive
                  examinations.
                </p>
                <p className="mt-2.5 text-sm leading-6 text-muted-foreground">
                  Through regular classes, weekend examinations, spoken English,
                  one-to-one teaching and foundation programs, the goal is to
                  help every student grow with consistency and confidence.
                </p>
                <div className="mt-4 grid gap-2">
                  {instituteProfilePoints.map((point) => (
                    <div
                      key={point}
                      className="rounded-xl border border-border bg-slate-50 px-3 py-2 text-xs leading-5 text-muted-foreground"
                    >
                      {point}
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href="https://www.instagram.com/narayanavulli?igsh=ZWY3ampqaGE0ZWl0"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://youtube.com/@vullinarayanatuition?si=ZVXP2dTsRrPJaZUA"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700"
                  >
                    YouTube
                  </a>
                  <a
                    href="https://x.com/VulliNarayana"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700"
                  >
                    Twitter / X
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {isLocationOpen ? (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/75 px-4 py-6 sm:flex sm:items-center sm:justify-center sm:py-8">
          <div className="mx-auto w-full max-w-2xl rounded-[2rem] bg-white p-5 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Location
                </p>
                <h3 className="mt-2 text-2xl font-black">Visit Our Institute</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsLocationOpen(false)}
                className="rounded-full border border-border p-2 text-muted-foreground hover:text-foreground"
                aria-label="Close location details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 rounded-[1.75rem] border border-amber-200 bg-amber-50 p-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-amber-700" />
                <p className="text-base leading-8 text-amber-950">{instituteAddress}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={mapsLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 font-semibold text-white"
              >
                Open in Maps
              </a>
              <a
                href={`tel:${institutePhone}`}
                className="inline-flex items-center gap-2 rounded-2xl border border-border px-5 py-3 font-semibold hover:border-primary hover:text-primary"
              >
                Call Institute
              </a>
            </div>
          </div>
        </div>
      ) : null}

      {activeCourseCard ? (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/75 px-4 py-6 sm:flex sm:items-center sm:justify-center sm:py-8">
          <div className="mx-auto w-full max-w-3xl rounded-[2rem] bg-white p-5 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                  <CourseIcon icon={activeCourseCard.icon} />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                    Course Details
                  </p>
                  <h3 className="mt-2 text-2xl font-black">{activeCourseCard.title}</h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveCourse(null)}
                className="rounded-full border border-border p-2 text-muted-foreground hover:text-foreground"
                aria-label="Close course details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-6 text-base leading-8 text-muted-foreground">
              {activeCourseCard.overview}
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="rounded-[1.75rem] border border-border bg-slate-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  Course Structure
                </p>
                <ul className="mt-4 space-y-3">
                  {activeCourseCard.structure.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
                  Syllabus Type
                </p>
                <p className="mt-4 text-sm leading-7 text-amber-950">
                  {activeCourseCard.syllabus}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

