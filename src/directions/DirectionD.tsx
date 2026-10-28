import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CaseStudyReader, type ReaderTheme } from '../components/CaseStudyReader';
import { GrowthChart } from '../components/GrowthChart';
import { useSound } from '../lib/sound';
import { awards, draftCopy, flagship, images, selectedWork, services, social, type CaseStudy } from '../data/portfolio';

const INK = '#141414';
const MUTED = 'rgba(20,20,20,0.6)';
const ACCENT = '#8f1d1d';
const PAPER = '#f7f5f0';
const RULE = 'rgba(20,20,20,0.14)';

const THEME: ReaderTheme = {
  bg: PAPER,
  fg: INK,
  muted: MUTED,
  accent: ACCENT,
  headingClass: 'font-serif-editorial font-semibold',
};

function Reveal({ children, delay = 0, className = '', style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default function DirectionD() {
  const [readerWork, setReaderWork] = useState<CaseStudy | null>(null);
  const { playClick } = useSound();
  const openReader = (work: CaseStudy) => { playClick(); setReaderWork(work); };
  const today = new Date();

  return (
    <div className="font-sans text-[#141414]" style={{ backgroundColor: PAPER }}>
      <div className="fixed bottom-4 left-4 z-[90] rounded-sm border px-3 py-1.5 font-mono-data text-[10px] uppercase tracking-wide" style={{ borderColor: RULE, backgroundColor: `${PAPER}dd`, color: MUTED }}>
        Staging draft — copy not final
      </div>

      {/* Masthead */}
      <header className="border-b px-6 pb-4 pt-24 sm:px-14" style={{ borderColor: INK }}>
        <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono-data text-[11px] uppercase tracking-widest" style={{ color: MUTED }}>
          <span>{draftCopy.kicker} — Field Report</span>
          <span>{today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} Edition</span>
        </div>
      </header>

      {/* Headline */}
      <section className="border-b px-6 py-14 sm:px-14" style={{ borderColor: RULE }}>
        <Reveal>
          <p className="font-mono-data text-xs uppercase tracking-widest" style={{ color: ACCENT }}>Market Communications — Belgrade Philharmonic</p>
          <h1 className="mt-4 max-w-4xl font-serif-editorial text-4xl font-semibold leading-tight sm:text-6xl">
            {draftCopy.headline}
          </h1>
          <p className="mt-5 max-w-2xl font-serif-editorial text-xl leading-relaxed" style={{ color: MUTED }}>
            {draftCopy.subhead}
          </p>
          <p className="mt-6 font-mono-data text-xs" style={{ color: MUTED }}>By Tisa — Founder, {draftCopy.kicker} Studio</p>
        </Reveal>
      </section>

      {/* Lede number */}
      <section className="grid grid-cols-1 border-b sm:grid-cols-3" style={{ borderColor: RULE }}>
        {flagship.highlights.slice(0, 3).map((h, i) => (
          <div key={h.label} className="border-b px-6 py-10 sm:border-b-0 sm:border-r last:border-r-0 sm:px-10" style={{ borderColor: RULE }}>
            <p className="font-serif-editorial text-5xl font-semibold sm:text-6xl" style={{ color: i === 0 ? ACCENT : INK }}>{h.value}</p>
            <p className="mt-2 font-mono-data text-xs uppercase tracking-wide" style={{ color: MUTED }}>{h.label}</p>
          </div>
        ))}
      </section>

      {/* Field photo */}
      <section className="border-b px-6 py-14 sm:px-14" style={{ borderColor: RULE }}>
        <Reveal>
          <img src={images.philharmonicBassists} alt="" className="photo-grade h-[50vh] w-full object-cover sm:h-[60vh]" />
          <p className="mt-3 font-serif-editorial text-sm italic" style={{ color: MUTED }}>
            Belgrade Philharmonic performance, Kolarac Great Hall. The engagement ran from 2023 through 2026.
          </p>
        </Reveal>
      </section>

      {/* The data */}
      <section className="grid gap-12 border-b px-6 py-16 sm:px-14 lg:grid-cols-[1.1fr_0.9fr]" style={{ borderColor: RULE }}>
        <div>
          <Reveal>
            <p className="font-mono-data text-xs uppercase tracking-widest" style={{ color: ACCENT }}>The Data</p>
            <h2 className="mt-3 font-serif-editorial text-3xl font-semibold sm:text-4xl">Follower growth, platform by platform</h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <GrowthChart theme={{ fg: INK, muted: MUTED, track: RULE, accent: ACCENT }} headingClass="font-serif-editorial font-semibold" />
          </Reveal>
          <p className="mt-6 font-mono-data text-[11px]" style={{ color: MUTED }}>
            Source: internal platform analytics, May 2023 – February 2026. Figures as reported by the client's own account dashboards.
          </p>
        </div>
        <div>
          <Reveal delay={0.05}>
            <p className="font-mono-data text-xs uppercase tracking-widest" style={{ color: ACCENT }}>The Narrative</p>
            <div className="mt-4 space-y-4">
              {flagship.narrative.map((p, i) => (
                <p key={i} className="font-serif-editorial text-base leading-relaxed" style={{ color: INK }}>
                  {i === 0 && <span className="float-left mr-2 font-serif-editorial text-6xl font-semibold leading-[0.8]" style={{ color: ACCENT }}>{p[0]}</span>}
                  {i === 0 ? p.slice(1) : p}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 border-t pt-6" style={{ borderColor: RULE }}>
            <p className="font-mono-data text-xs uppercase tracking-widest" style={{ color: ACCENT }}>Recognition</p>
            <ul className="mt-3 space-y-2">
              {awards.map(a => (
                <li key={a.title} className="font-serif-editorial text-sm" style={{ color: INK }}>
                  <strong>{a.issuer}</strong> — {a.title} <span style={{ color: MUTED }}>({a.date})</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <button
            onClick={() => openReader(flagship)}
            data-cursor="link"
            className="mt-8 flex items-center gap-2 font-mono-data text-xs font-medium uppercase tracking-wide"
            style={{ color: ACCENT }}
          >
            Read the full report <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      {/* Related reports */}
      <section className="border-b px-6 py-14 sm:px-14" style={{ borderColor: RULE }}>
        <Reveal className="mb-6">
          <p className="font-mono-data text-xs uppercase tracking-widest" style={{ color: ACCENT }}>Related Reports</p>
        </Reveal>
        <div className="divide-y" style={{ borderColor: RULE }}>
          {[flagship, ...selectedWork].map((work, i) => (
            <Reveal key={work.id} delay={i * 0.04}>
              <button onClick={() => openReader(work)} data-cursor="link" className="flex w-full items-center justify-between gap-4 py-5 text-left">
                <div>
                  <p className="font-serif-editorial text-lg font-semibold">{work.subject}</p>
                  <p className="font-mono-data text-xs" style={{ color: MUTED }}>{work.dateRange} — {work.tag}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Methodology (services) */}
      <section className="border-b px-6 py-14 sm:px-14" style={{ borderColor: RULE }}>
        <Reveal className="mb-6">
          <p className="font-mono-data text-xs uppercase tracking-widest" style={{ color: ACCENT }}>Methodology</p>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service} delay={i * 0.05}>
              <p className="font-mono-data text-xs" style={{ color: MUTED }}>{String(i + 1).padStart(2, '0')}</p>
              <p className="mt-1 font-serif-editorial text-lg font-semibold">{service}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Correspondent bio */}
      <section className="grid gap-8 border-b px-6 py-14 sm:px-14 lg:grid-cols-[0.5fr_1.5fr]" style={{ borderColor: RULE }}>
        <Reveal>
          <img src={images.tisaPortrait} alt="Tisa" className="photo-grade aspect-[4/5] w-full object-cover grayscale" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-mono-data text-xs uppercase tracking-widest" style={{ color: ACCENT }}>The Correspondent</p>
          <h3 className="mt-2 font-serif-editorial text-2xl font-semibold">Tisa</h3>
          <p className="mt-4 max-w-2xl font-serif-editorial text-base leading-relaxed" style={{ color: INK }}>{draftCopy.aboutBody}</p>
        </Reveal>
      </section>

      {/* Contact */}
      <section className="px-6 py-16 sm:px-14">
        <Reveal>
          <p className="font-mono-data text-xs uppercase tracking-widest" style={{ color: ACCENT }}>Get in touch</p>
          <a href={`mailto:${social.email}`} data-cursor="link" className="mt-3 block font-serif-editorial text-3xl font-semibold sm:text-5xl">
            {social.email}
          </a>
        </Reveal>
      </section>

      <footer className="border-t px-6 py-8 font-mono-data text-[11px] sm:px-14" style={{ borderColor: RULE, color: MUTED }}>
        © {today.getFullYear()} {draftCopy.kicker} — staging build, not yet public.
      </footer>

      <AnimatePresence>
        {readerWork && <CaseStudyReader work={readerWork} theme={THEME} onClose={() => setReaderWork(null)} />}
      </AnimatePresence>
    </div>
  );
}
