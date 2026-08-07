import Link from "next/link";
import Image from "next/image";

// --- Types ---
interface Subject {
  name: string;
  slug: string;
  description: string;
  icon: (props: { className?: string }) => React.ReactNode;
}

// --- Lightweight SVG Icons ---
const Icons = {
  Book: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  Math: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.75 12h14.5M12 4.75v14.5M6 18l12-12" />
    </svg>
  ),
  Flask: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.594 15.12a2 2 0 00-1.022.547l-1 1A2 2 0 004 19.5h16a2 2 0 00.428-2.928l-1-1.144zM10 3v5.5M14 3v5.5" />
    </svg>
  ),
  Atom: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z" />
    </svg>
  ),
  Dna: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M8 5a8 8 0 018 8M8 11a8 8 0 008 8M6 8h12M6 16h12" />
    </svg>
  ),
  Graduation: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  TrendingUp: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 005.814-5.519l2.74-1.22m0 0l-5.94-2.28 2.127 6.42" />
    </svg>
  ),
  Building: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.5h-15V21" />
    </svg>
  ),
  Globe: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zM2.25 12h19.5M12 2.25a15.3 15.3 0 014 9.75 15.3 15.3 0 01-4 9.75 15.3 15.3 0 01-4-9.75 15.3 15.3 0 014-9.75z" />
    </svg>
  ),
  ArrowRight: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  ),
};

// --- Datasets ---
const naturalScienceSubjects: Subject[] = [
  { name: "English", slug: "english", description: "Grammar, comprehension, & vocabulary", icon: Icons.Book },
  { name: "Mathematics", slug: "math-natural", description: "Algebra, calculus, geometry, & trigonometry", icon: Icons.Math },
  { name: "Chemistry", slug: "chemistry", description: "Organic, inorganic, & physical chemistry", icon: Icons.Flask },
  { name: "Physics", slug: "physics", description: "Mechanics, thermodynamics, & modern physics", icon: Icons.Atom },
  { name: "Biology", slug: "biology", description: "Cellular biology, genetics, & human body", icon: Icons.Dna },
  { name: "SAT", slug: "sat-natural", description: "Digital SAT practice modules", icon: Icons.Graduation },
];

const socialScienceSubjects: Subject[] = [
  { name: "English", slug: "english-social", description: "Grammar, comprehension, & vocabulary", icon: Icons.Book },
  { name: "Mathematics", slug: "math-social", description: "General math, statistics, & logic", icon: Icons.Math },
  { name: "Economics", slug: "economics", description: "Micro/Macro economics & markets", icon: Icons.TrendingUp },
  { name: "History", slug: "history", description: "World & regional historical events", icon: Icons.Building },
  { name: "Geography", slug: "geography", description: "Physical, human, & economic geography", icon: Icons.Globe },
  { name: "SAT", slug: "sat-social", description: "Digital SAT practice modules", icon: Icons.Graduation },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-500 selection:text-white">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/90 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex justify-between items-center">
          
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-700 shadow-sm flex-shrink-0 bg-slate-900">
              <Image
                src="/logo.jpg"
                alt="SJS Exam Center Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              SJS EXAM CENTER
            </span>
          </div>

          {/* Stream Navigation */}
          <nav className="flex gap-6 text-sm font-medium text-slate-300">
            <a href="#natural-science" className="hover:text-blue-400 transition">
              Natural Science
            </a>
            <a href="#social-science" className="hover:text-indigo-400 transition">
              Social Science
            </a>
          </nav>
        </div>
      </header>

      {/* Main Hero & Subjects Section */}
      <main className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-blue-950/80 text-blue-400 mb-4 border border-blue-800">
            Saint Joseph exam portal
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-white leading-tight">
            2019 ESSLCE EXAM PREP
          </h1>
          <p className="text-base sm:text-lg text-slate-400">
            Select your academic stream below to begin taking structured practice exams.
          </p>
        </div>

        {/* --- Natural Science Stream --- */}
        <section id="natural-science" className="mb-16 scroll-mt-24">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-3 h-8 bg-blue-500 rounded-full" />
              <div>
                <h2 className="text-2xl font-bold text-white">Natural Science Stream</h2>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {naturalScienceSubjects.map((subject) => (
              <SubjectCard key={`nat-${subject.slug}`} subject={subject} accentColor="blue" />
            ))}
          </div>
        </section>

        {/* --- Social Science Stream --- */}
        <section id="social-science" className="mb-12 scroll-mt-24">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-3 h-8 bg-indigo-500 rounded-full" />
              <div>
                <h2 className="text-2xl font-bold text-white">Social Science Stream</h2>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {socialScienceSubjects.map((subject) => (
              <SubjectCard key={`soc-${subject.slug}`} subject={subject} accentColor="indigo" />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} SJS Exam Center.
      </footer>
    </div>
  );
}

// --- Reusable Subject Card Component ---
function SubjectCard({ subject, accentColor }: { subject: Subject; accentColor: "blue" | "indigo" }) {
  const Icon = subject.icon;
  const isBlue = accentColor === "blue";

  return (
    <Link
      href={`/practice/${subject.slug}`}
      className={`group relative p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between bg-slate-900 border-slate-800 hover:shadow-xl hover:shadow-black/40 ${
        isBlue ? "hover:border-blue-500" : "hover:border-indigo-500"
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
              isBlue
                ? "bg-blue-950/80 text-blue-400 group-hover:bg-blue-600 group-hover:text-white"
                : "bg-indigo-950/80 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white"
            }`}
          >
            <Icon className="w-6 h-6" />
          </div>
          <span
            className={`text-slate-500 transition-transform duration-200 group-hover:translate-x-1 ${
              isBlue ? "group-hover:text-blue-400" : "group-hover:text-indigo-400"
            }`}
          >
            <Icons.ArrowRight className="w-5 h-5" />
          </span>
        </div>

        <h3
          className={`text-xl font-bold text-white mb-1 transition-colors ${
            isBlue ? "group-hover:text-blue-400" : "group-hover:text-indigo-400"
          }`}
        >
          {subject.name}
        </h3>
        <p className="text-sm text-slate-400">{subject.description}</p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-slate-500">
        <span>Practice Questions</span>
        <span className="uppercase text-[10px] tracking-wider font-bold text-slate-400">Start Test</span>
      </div>
    </Link>
  );
}