export const navLinks = [
  {
    label: "Courses",
    href: "#courses",
    children: [
      { label: "Medical (NEET)", href: "#" },
      { label: "Engineering (JEE)", href: "#" },
      { label: "Foundation (8-10)", href: "#" },
      { label: "Olympiad Prep", href: "#" },
    ],
  },
  {
    label: "Programs",
    href: "#features",
    children: [
      { label: "Classroom Program", href: "#" },
      { label: "Online Live", href: "#" },
      { label: "Hybrid Learning", href: "#" },
    ],
  },
  { label: "Results", href: "#stats" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const courses = [
  {
    id: 1,
    title: "NEET Preparation",
    category: "Medical",
    description: "Comprehensive coaching for medical entrance with expert faculty and proven methodology.",
    duration: "2 Years",
    students: "50,000+",
    icon: "Stethoscope",
    color: "primary",
  },
  {
    id: 2,
    title: "JEE Main & Advanced",
    category: "Engineering",
    description: "Master physics, chemistry, and mathematics with India's top engineering entrance coaching.",
    duration: "2 Years",
    students: "45,000+",
    icon: "Cpu",
    color: "accent-warm",
  },
  {
    id: 3,
    title: "Foundation (Class 8-10)",
    category: "Foundation",
    description: "Build strong fundamentals early with structured learning and competitive exam preparation.",
    duration: "1-3 Years",
    students: "30,000+",
    icon: "BookOpen",
    color: "primary",
  },
  {
    id: 4,
    title: "Olympiad Programs",
    category: "Olympiad",
    description: "Excel in national and international Olympiads with specialized training modules.",
    duration: "1 Year",
    students: "10,000+",
    icon: "Trophy",
    color: "accent-warm",
  },
  {
    id: 5,
    title: "Online Live Classes",
    category: "Online",
    description: "Interactive live sessions with doubt solving, recorded lectures, and performance tracking.",
    duration: "Flexible",
    students: "1,00,000+",
    icon: "Monitor",
    color: "primary",
  },
  {
    id: 6,
    title: "Crash Courses",
    category: "Short Term",
    description: "Intensive revision programs designed for last-minute exam preparation and quick scoring.",
    duration: "3-6 Months",
    students: "25,000+",
    icon: "Zap",
    color: "accent-warm",
  },
];

export const features = [
  {
    title: "Expert Faculty",
    description: "Learn from India's finest educators with decades of experience in competitive exam coaching.",
    icon: "GraduationCap",
  },
  {
    title: "Proven Results",
    description: "Consistently producing top rankers in NEET and JEE with an unmatched success rate.",
    icon: "Award",
  },
  {
    title: "Advanced Technology",
    description: "AI-powered learning platform with personalized study plans and real-time analytics.",
    icon: "Laptop",
  },
  {
    title: "Study Material",
    description: "Comprehensive and exam-focused study material crafted by subject matter experts.",
    icon: "FileText",
  },
  {
    title: "Test Series",
    description: "Regular mock tests and practice papers simulating real exam conditions.",
    icon: "ClipboardCheck",
  },
  {
    title: "Doubt Clearing",
    description: "Dedicated doubt-clearing sessions and one-on-one mentorship for every student.",
    icon: "MessageCircle",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    rank: "AIR 12 - NEET 2024",
    quote: "The structured approach and dedicated faculty helped me achieve my dream rank. The test series was invaluable for my preparation.",
    avatar: "PS",
  },
  {
    id: 2,
    name: "Rahul Verma",
    rank: "AIR 45 - JEE Advanced 2024",
    quote: "The problem-solving methodology taught here completely transformed my approach to competitive exams. Forever grateful!",
    avatar: "RV",
  },
  {
    id: 3,
    name: "Ananya Patel",
    rank: "AIR 8 - NEET 2024",
    quote: "From foundation classes to NEET preparation, the continuous guidance and mentorship made all the difference in my journey.",
    avatar: "AP",
  },
  {
    id: 4,
    name: "Karthik Iyer",
    rank: "AIR 23 - JEE Advanced 2024",
    quote: "The online live classes were just as effective as classroom sessions. The AI-powered learning tools gave me a real edge.",
    avatar: "KI",
  },
  {
    id: 5,
    name: "Meera Reddy",
    rank: "AIR 5 - NEET 2024",
    quote: "The personalized attention and regular doubt-clearing sessions ensured I never fell behind. Best decision of my academic life.",
    avatar: "MR",
  },
];

export const stats = [
  { label: "Students Enrolled", value: 2_50_000, suffix: "+", prefix: "" },
  { label: "Top 100 Rankers", value: 350, suffix: "+", prefix: "" },
  { label: "Expert Faculty", value: 6000, suffix: "+", prefix: "" },
  { label: "Centers Nationwide", value: 315, suffix: "+", prefix: "" },
];

export const footerLinks = {
  courses: [
    { label: "NEET Coaching", href: "#" },
    { label: "JEE Coaching", href: "#" },
    { label: "Foundation Courses", href: "#" },
    { label: "Olympiad Programs", href: "#" },
    { label: "Online Courses", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Our Results", href: "#" },
    { label: "Faculty", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
  ],
  support: [
    { label: "Contact Us", href: "#" },
    { label: "FAQs", href: "#" },
    { label: "Student Portal", href: "#" },
    { label: "Parent Portal", href: "#" },
    { label: "Grievance", href: "#" },
  ],
};

export const courseCategories = ["All", "Medical", "Engineering", "Foundation", "Olympiad", "Online", "Short Term"];
