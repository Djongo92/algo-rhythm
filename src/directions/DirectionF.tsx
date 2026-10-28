import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Radio } from 'lucide-react';
import { CaseStudyReader, type ReaderTheme } from '../components/CaseStudyReader';
import { GrowthChart } from '../components/GrowthChart';
import { useSound } from '../lib/sound';
import { caseStudies, draftCopy, flagship, images, services, social, type CaseStudy } from '../data/portfolio';

const BG = '#1a1410';
const FG = '#f0e6d8';
const MUTED = 'rgba(240,230,216,0.62)';
const ON_AIR = '#d62828';

const THEME: ReaderTheme = {
  bg: BG,
  fg: FG,
  muted: MUTED,
  accent: ON_AIR,
  headingClass: 'font-bebas tracking-wide',
};

function Reveal({ children, delay = 0, className = '', style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function Waveform({ playing }: { playing: boolean }) {
  const bars = Array.from({ length: 56 }, (_, i) => i);
  return (
    <div className="flex h-16 items-end gap-[3px]">
      {bars.map(i => {
        const h = 16 + Math.abs(Math.sin(i * 0.7)) * 48;
        return (
          <motion.div
            key={i}
            className="w-[3px] rounded-full"
            style={{ backgroundColor: ON_AIR }}
            initial={{ height: 6 }}
            animate={playing ? { height: [6, h, 10, h * 0.6, 6] } : { height: 6 }}
            transition={{ duration: 1.8 + (i % 5) * 0.25, repeat: playing ? Infinity : 0, ease: 'easeInOut', delay: i * 0.03 }}
          />
        );
      })}
    </div>
  );
}

export default function DirectionF() {
  const [readerWork, setReaderWork] = useState<CaseStudy | null>(null);
  const { enabled, toggle, playClick } = useSound();
  const openReader = (work: CaseStudy) => { playClick(); setReaderWork(work); };

  return (
    <div className="font-sans" style={{ backgroundColor: BG, color: FG }}>
      <div className="fixed bottom-4 left-4 z-[90] rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] backdrop-blur-md" style={{ borderColor: 'rgba(240,230,216,0.2)', backgroundColor: 'rgba(0,0,0,0.4)', color: MUTED }}>
        Staging draft — copy not final
      </div>

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 sm:px-14">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(214,40,40,0.12),_transparent_55%)]" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em]"
          style={{ color: ON_AIR }}
        >
          <motion.span
            animate={{ opacity: enabled ? [1, 0.3, 1] : 0.4 }}
            transition={{ duration: 1.4, repeat: enabled ? Infinity : 0 }}
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: ON_AIR }}
          />
          {enabled ? 'On Air' : 'Off Air'}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-bebas text-[15vw] uppercase leading-[0.85] tracking-wide sm:text-[7vw]"
        >
          {draftCopy.kicker} FM
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-4 max-w-xl text-lg"
          style={{ color: MUTED }}
        >
          {draftCopy.subhead}
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={toggle}
            data-cursor="link"
            className="flex items-center gap-3 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wide"
            style={{ backgroundColor: ON_AIR, color: '#fff' }}
          >
            <Radio className="h-4 w-4" /> {enabled ? 'Turn off' : 'Tune in'}
          </button>
          <span className="font-bebas text-2xl tracking-wide" style={{ color: MUTED }}>100.0 FM</span>
        </motion.div>
        <div className="mt-10">
          <Waveform playing={enabled} />
        </div>
      </section>

      {/* Now playing: flagship */}
      <section className="border-t px-6 py-20 sm:px-14" style={{ borderColor: 'rgba(240,230,216,0.12)' }}>
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: ON_AIR }}>Now Playing — Ep. 01</p>
            <h2 className="mt-3 font-bebas text-5xl uppercase tracking-wide sm:text-7xl">{flagship.subject}</h2>
          </div>
          <button onClick={() => openReader(flagship)} data-cursor="link" className="flex items-center gap-2 border-b pb-1 text-sm" style={{ borderColor: ON_AIR, color: FG }}>
            Full segment <ArrowUpRight className="h-4 w-4" />
          </button>
        </Reveal>
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <img src={images.recordingStudio} alt="" className="photo-grade h-72 w-full object-cover sm:h-96" />
          </Reveal>
          <div>
            <div className="grid grid-cols-3 gap-4">
              {flagship.highlights.map((h, i) => (
                <Reveal key={h.label} delay={i * 0.05}>
                  <p className="font-bebas text-3xl tracking-wide" style={{ color: i % 2 ? ON_AIR : FG }}>{h.value}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wide" style={{ color: MUTED }}>{h.label}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1} className="mt-6 space-y-3">
              {flagship.narrative.slice(0, 2).map((p, i) => (
                <p key={i} className="text-sm leading-relaxed" style={{ color: MUTED }}>{p}</p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Growth as levels */}
      <section className="border-t px-6 py-16 sm:px-14" style={{ borderColor: 'rgba(240,230,216,0.12)' }}>
        <Reveal className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: ON_AIR }}>Signal Strength — Growth by Platform</p>
        </Reveal>
        <div className="max-w-2xl">
          <GrowthChart theme={{ fg: FG, muted: MUTED, track: 'rgba(240,230,216,0.12)', accent: ON_AIR }} headingClass="font-bebas tracking-wide" />
        </div>
      </section>

      {/* Episode list */}
      <section className="border-t px-6 py-20 sm:px-14" style={{ borderColor: 'rgba(240,230,216,0.12)' }}>
        <Reveal className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: ON_AIR }}>Playlist</p>
        </Reveal>
        <div className="divide-y" style={{ borderColor: 'rgba(240,230,216,0.12)' }}>
          {caseStudies.map((work, i) => (
            <Reveal key={work.id} delay={i * 0.04}>
              <button onClick={() => openReader(work)} data-cursor="link" className="flex w-full items-center gap-5 py-5 text-left">
                <span className="font-bebas text-2xl" style={{ color: MUTED }}>{String(i + 1).padStart(2, '0')}</span>
                <div className="flex-1">
                  <p className="font-bebas text-xl tracking-wide uppercase">{work.subject}</p>
                  <p className="text-xs" style={{ color: MUTED }}>{work.dateRange} — {work.tag}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0" style={{ color: ON_AIR }} />
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="border-t px-6 py-20 sm:px-14" style={{ borderColor: 'rgba(240,230,216,0.12)' }}>
        <Reveal className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: ON_AIR }}>On the Dial</p>
        </Reveal>
        <div className="flex flex-wrap gap-3">
          {services.map(service => (
            <span key={service} className="rounded-full border px-5 py-2.5 font-bebas text-lg tracking-wide" style={{ borderColor: 'rgba(240,230,216,0.25)' }}>
              {service}
            </span>
          ))}
        </div>
      </section>

      {/* Meet the host */}
      <section className="border-t px-6 py-20 sm:px-14" style={{ borderColor: 'rgba(240,230,216,0.12)' }}>
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <Reveal>
            <img src={images.interviewSession} alt="Tisa" className="photo-grade aspect-[4/5] w-full object-cover" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: ON_AIR }}>Meet the Host</p>
            <h3 className="mt-3 font-bebas text-4xl tracking-wide">TISA</h3>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed" style={{ color: MUTED }}>{draftCopy.aboutBody}</p>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t px-6 py-24 sm:px-14" style={{ borderColor: 'rgba(240,230,216,0.12)' }}>
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: ON_AIR }}>Book the show</p>
          <a href={`mailto:${social.email}`} data-cursor="link" className="mt-3 block font-bebas text-4xl tracking-wide sm:text-6xl">
            {social.email}
          </a>
        </Reveal>
      </section>

      <footer className="border-t px-6 py-8 text-xs sm:px-14" style={{ borderColor: 'rgba(240,230,216,0.12)', color: MUTED }}>
        © {new Date().getFullYear()} {draftCopy.kicker} FM — staging build, not yet public.
      </footer>

      <AnimatePresence>
        {readerWork && <CaseStudyReader work={readerWork} theme={THEME} onClose={() => setReaderWork(null)} />}
      </AnimatePresence>
    </div>
  );
}
