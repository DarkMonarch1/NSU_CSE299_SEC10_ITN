const stats = [
  { value: "8k+", label: "Verified alumni" },
  { value: "500+", label: "Partner companies" },
  { value: "94%", label: "Trust-score safety" },
  { value: "24/7", label: "AI career guidance" },
];

const features = [
  {
    title: "Verified alumni profiles",
    body: "Create a rich, shareable profile with skills, certifications, achievements, and career intent.",
  },
  {
    title: "AI CV grooming",
    body: "Receive detailed resume feedback and benchmark your CV against target roles before you apply.",
  },
  {
    title: "Smart job matching",
    body: "Discover opportunities that match your profile, goals, and experience with intelligent ranking.",
  },
];

const steps = [
  "Create a trusted profile",
  "Get AI guidance and match score",
  "Connect with verified employers",
];

const opportunities = [
  { role: "Product Designer", company: "Axiata Digital", type: "Hybrid" },
  { role: "Data Analyst", company: "Pathao", type: "Remote" },
  { role: "Software Engineer", company: "North Star Labs", type: "On-site" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(52,211,153,0.16),_transparent_30%),linear-gradient(135deg,_#07111f_0%,_#0b1830_55%,_#122640_100%)] text-slate-100">
      <header className="mx-auto flex max-w-7xl flex-col px-6 py-6 lg:px-8">
        <nav className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
          <div className="text-lg font-semibold tracking-[0.25em] text-white">
            CAREERSETU
          </div>
          <div className="hidden gap-6 text-sm text-slate-300 md:flex">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#opportunities" className="transition hover:text-white">
              Opportunities
            </a>
            <a href="#join" className="transition hover:text-white">
              Join
            </a>
          </div>
        </nav>

        <section className="grid gap-10 px-2 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300">
              AI-powered alumni–industry bridge
            </div>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Build trust, grow careers, and hire smarter.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              CareerSetu connects NSU alumni, students, and employers through
              verified profiles, AI CV guidance, smart matching, and scam-safe
              opportunities.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#join"
                className="rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 px-5 py-3 font-semibold text-slate-950 transition hover:opacity-90"
              >
                Join as alumni
              </a>
              <a
                href="#features"
                className="rounded-full border border-white/15 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20"
              >
                Explore platform
              </a>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Live platform snapshot</p>
                <h2 className="text-xl font-semibold text-white">
                  Trusted career growth workspace
                </h2>
              </div>
              <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-medium text-emerald-300">
                Verified
              </div>
            </div>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-semibold text-cyan-300">
                    {index + 1}
                  </div>
                  <span className="text-sm text-slate-200">{step}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4">
              <p className="text-sm font-medium text-cyan-200">Trust score</p>
              <p className="mt-1 text-2xl font-semibold text-white">
                97 / 100 for this opportunity
              </p>
              <p className="mt-2 text-sm text-slate-300">
                AI-driven fraud detection and verified recruiter checks keep the
                network safe.
              </p>
            </div>
          </div>
        </section>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <section className="grid gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur"
            >
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
            </div>
          ))}
        </section>

        <section id="features" className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
                Core experience
              </p>
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                Designed for alumni, students, and employers
              </h2>
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-[24px] border border-white/10 bg-white/8 p-6 backdrop-blur"
              >
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {feature.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="opportunities" className="mt-16 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-8">
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-300">
              Why it matters
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              A trusted bridge for career growth in Bangladesh
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              CareerSetu solves the fragmented alumni network problem by bringing
              verified profiles, AI-guided career support, and scam-safe job
              discovery into one platform.
            </p>
            <div className="mt-6 space-y-3 text-sm text-slate-200">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                Verified recruiting workflow for NSU talent
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                AI recommendations tuned to each profile and goal
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                Career magazine and featured placement support
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-emerald-400/10 p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
                  Featured openings
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Opportunities ready to explore
                </h2>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {opportunities.map((item) => (
                <div
                  key={item.role}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4"
                >
                  <div>
                    <p className="font-semibold text-white">{item.role}</p>
                    <p className="text-sm text-slate-400">{item.company}</p>
                  </div>
                  <div className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-200">
                    {item.type}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="join" className="mt-16 rounded-[32px] border border-emerald-400/20 bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 p-8 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-emerald-300">
            Join the next wave
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            Ready to shape your next chapter?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            Sign up for CareerSetu and become part of a stronger alumni and
            hiring network built for growth, trust, and opportunity.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a
              href="#"
              className="rounded-full bg-white px-5 py-3 font-semibold text-slate-950 transition hover:opacity-90"
            >
              Get started
            </a>
            <a
              href="#"
              className="rounded-full border border-white/20 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Learn more
            </a>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-7xl px-6 pb-10 text-center text-sm text-slate-400 lg:px-8">
        CareerSetu — a trusted bridge between NSU alumni, students, and employers.
      </footer>
    </div>
  );
}
