import Image from "next/image";
import Link from "next/link";
import { AnimatedIn } from "@/src/components/animated-in";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Soft gradient ambience */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,theme(colors.indigo.500/15),transparent),radial-gradient(800px_400px_at_10%_20%,theme(colors.sky.400/12),transparent),radial-gradient(800px_400px_at_90%_30%,theme(colors.violet.400/10),transparent)]" />
        <div className="px-6 md:px-10 py-24">
          <div className="max-w-5xl mx-auto text-center">
            <AnimatedIn>
              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight bg-gradient-to-b from-indigo-500 to-violet-400 bg-clip-text text-transparent">
                ResumeIQ: AI-Powered Precision for Your Career Ascent.
              </h1>
            </AnimatedIn>
            <AnimatedIn delay={120}>
              <p className="mt-4 text-lg text-foreground/70">
                Transform job descriptions and experience into interview-winning resume bullet points, effortlessly.
              </p>
            </AnimatedIn>
            <AnimatedIn delay={240}>
              <div className="mt-8 flex items-center justify-center gap-3">
                <Link href="/sign-up" aria-label="Start Optimizing My Resume">
                  <Button className="h-11 px-6 bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-sm hover:opacity-95">
                    Start Optimizing My Resume
                  </Button>
                </Link>
                <Link
                  href="#learn-more"
                  className="h-11 inline-flex items-center justify-center rounded-md border px-6 hover:bg-foreground/5"
                >
                  Learn More
                </Link>
              </div>
            </AnimatedIn>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="learn-more" className="px-6 md:px-10 py-16">
        <div className="max-w-5xl mx-auto">
          <AnimatedIn>
            <h2 className="text-2xl md:text-3xl font-semibold">How it Works</h2>
          </AnimatedIn>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                title: 'Upload Your Resume',
                desc: 'Seamlessly upload your resume in PDF, DOCX, or TXT format.',
                icon: '/file.svg',
              },
              {
                step: '2',
                title: 'Paste Job Description',
                desc: 'Provide the target role’s JD for precise, contextual analysis.',
                icon: '/window.svg',
              },
              {
                step: '3',
                title: 'Get Actionable Insights',
                desc: 'Receive strengths, gaps, and rewrite suggestions, formatted in Markdown.',
                icon: '/globe.svg',
              },
            ].map((c, i) => (
              <AnimatedIn key={c.title} delay={i * 120}>
                <Card className="h-full border-indigo-200/40 bg-gradient-to-b from-indigo-50/40 to-transparent dark:from-indigo-400/5">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md border text-sm font-medium bg-white/60 dark:bg-white/10">
                        {c.step}
                      </div>
                      <CardTitle className="flex items-center gap-2">
                        <Image src={c.icon} width={20} height={20} alt="" aria-hidden className="opacity-80" />
                        {c.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/70">{c.desc}</p>
                  </CardContent>
                </Card>
              </AnimatedIn>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-5xl mx-auto">
          <AnimatedIn>
            <h2 className="text-2xl md:text-3xl font-semibold">Why ResumeIQ</h2>
          </AnimatedIn>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Job-Tailored Precision',
                desc: 'Aligns your experience to the JD for maximum relevance and clarity.',
                icon: '/file.svg',
              },
              {
                title: 'Quantifiable Impact',
                desc: 'Highlights metrics and outcomes to strengthen your achievements.',
                icon: '/window.svg',
              },
              {
                title: 'Save Hours, Not Minutes',
                desc: 'Skip manual rewrites—get targeted, high-quality suggestions instantly.',
                icon: '/globe.svg',
              },
              {
                title: 'Security & Privacy First',
                desc: 'Your documents are processed securely with best-practice safeguards.',
                icon: '/file.svg',
              },
            ].map((f, i) => (
              <AnimatedIn key={f.title} delay={i * 100}>
                <Card className="h-full transition-transform duration-300 hover:-translate-y-0.5 border-violet-200/40 bg-gradient-to-b from-violet-50/40 to-transparent dark:from-violet-400/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Image src={f.icon} width={20} height={20} alt="" aria-hidden className="opacity-80" />
                      {f.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/70">{f.desc}</p>
                  </CardContent>
                </Card>
              </AnimatedIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["ResumeIQ transformed my job search—my interviews doubled in two weeks.", "Clear, actionable guidance that helped me quantify my impact across roles."].map((q, i) => (
              <AnimatedIn key={i} delay={i * 120}>
                <Card className="bg-gradient-to-b from-sky-50/40 to-transparent dark:from-sky-400/5">
                  <CardContent>
                    <blockquote className="pt-6 text-sm text-foreground/80">“{q}”</blockquote>
                    <div className="mt-4 text-xs text-foreground/60">— Verified user</div>
                  </CardContent>
                </Card>
              </AnimatedIn>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedIn>
            <h2 className="text-2xl md:text-3xl font-semibold">Ready to Elevate Your Resume?</h2>
          </AnimatedIn>
          <AnimatedIn delay={120}>
            <Link href="/sign-up">
              <Button className="mt-6 h-11 px-6 bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-sm hover:opacity-95">
                Get Started with ResumeIQ
              </Button>
            </Link>
          </AnimatedIn>
        </div>
      </section>
    </main>
  );
}


