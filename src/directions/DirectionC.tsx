import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CaseStudyReader, type ReaderTheme } from '../components/CaseStudyReader';
import { GrowthChart } from '../components/GrowthChart';
import { useSound } from '../lib/sound';
import { draftCopy, flagship, images, selectedWork, services, social, type CaseStudy } from '../data/portfolio';

// Pulled from the real photography: CRESCENDO's red/teal, the Gala's purple,
// the India Tour henna's warm orange, the event's cold blue/green.
const PALETTE = ['#e8432f', '#1fb6a6', '#6c4fd9', '#ff8a3d', '#2f7de8', '#2fae7d'];

const THEME: ReaderTheme = {
  bg: '#ffffff',
  fg: '#15130f',
  muted: 'rgba(21,19,15,0.65)',
  accent: PALETTE[0],
  headingClass: 'font-vivid font-bold',
};

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type MosaicItem =
  | { type: 'photo'; src: string; caption: string; span?: string }
  | { type: 'quote'; heading: string; body: string; color: string; span?: string };

export default function DirectionC() {
  const [readerWork, setReaderWork] = useState<CaseStudy | null>(null);
  const { playClick } = useSound();
  const gallery = flagship.gallery;
  const sections = flagship.sections;

  const openReader = (work: CaseStudy) => {
    playClick();
    setReaderWork(work);
  };

  const mosaic: MosaicItem[] = [
    { type: 'photo', src: gallery[0]?.src, caption: gallery[0]?.caption ?? '', span: 'sm:col-span-2 sm:row-span-2' },
    { type: 'quote', heading: sections[0]?.heading ?? '', body: sections[0]?.body ?? '', color: PALETTE[0] },
    { type: 'photo', src: gallery[1]?.src, caption: gallery[1]?.caption ?? '' },
    { type: 'photo', src: gallery[2]?.src, caption: gallery[2]?.caption ?? '', span: 'sm:col-span-2' },
    { type: 'quote', heading: sections[1]?.heading ?? '', body: sections[1]?.body ?? '', color: PALETTE[1] },
    { type: 'photo', src: gallery[3]?.src, caption: gallery[3]?.caption ?? '' },
    { type: 'quote', heading: sections[2]?.heading ?? '', body: sections[2]?.body ?? '', color: PALETTE[2] },
    { type: 'photo', src: gallery[4]?.src, caption: gallery[4]?.caption ?? '', span: 'sm:col-span-2' },
    { type: 'quote', heading: sections[3]?.heading ?? '', body: sections[3]?.body ?? '', color: PALETTE[3] },
    { type: 'photo', src: gallery[5]?.src, caption: gallery[5]?.caption ?? '' },
  ].filter(item => item.type === 'quote' || item.src) as MosaicItem[];

  return (
    <div className="bg-white font-sans text-[#15130f] selection:bg-[#e8432f] selection:text-white">
      <div className="fixed bottom-4 left-4 z-[90] rounded-full border border-black/15 bg-white/80 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-black/50 backdrop-blur-md">
        Staging draft — copy not final
      </div>

      {/* Hero: full-bleed real photo */}
      <section className="relative flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-16 sm:px-14">
        <img src={images.heroEvent} alt="" className="photo-grade absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mb-4 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white"
          style={{ backgroundColor: PALETTE[0] }}
        >
          {draftCopy.kicker} Studio
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-3xl font-vivid text-[9vw] font-bold leading-[1.02] text-white sm:text-[4.2vw]"
        >
          {draftCopy.headline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="relative mt-6 max-w-xl text-lg text-white/85"
        >
          {draftCopy.subhead}
        </motion.p>
      </section>

      {/* Stat strip */}
      <section className="grid grid-cols-2 sm:grid-cols-6">
        {flagship.highlights.map((h, i) => (
          <div key={h.label} className="flex flex-col justify-center gap-1 px-5 py-8 text-white" style={{ backgroundColor: PALETTE[i % PALETTE.length] }}>
            <p className="font-vivid text-2xl font-bold leading-none sm:text-3xl">{h.value}</p>
            <p className="text-[10px] uppercase tracking-wide opacity-80">{h.label}</p>
          </div>
        ))}
      </section>

      {/* Flagship intro */}
      <section className="px-6 py-20 sm:px-14">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: PALETTE[0] }}>Flagship — {flagship.dateRange}</p>
            <h2 className="mt-2 font-vivid text-4xl font-bold sm:text-6xl">{flagship.subject}</h2>
          </div>
          <button
            onClick={() => openReader(flagship)}
            data-cursor="link"
            className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white"
            style={{ backgroundColor: PALETTE[0] }}
          >
            Open full case study <ArrowUpRight className="h-4 w-4" />
          </button>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-2">
          {flagship.narrative.map((p, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p className="text-base leading-relaxed text-black/75">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Photo + color mosaic — the real editorial spread */}
      <section className="px-6 pb-20 sm:px-14">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:auto-rows-[200px]">
          {mosaic.map((item, i) => (
            <Reveal key={i} delay={(i % 4) * 0.05} className={`relative overflow-hidden rounded-xl ${item.span ?? ''}`}>
              {item.type === 'photo' ? (
                <div className="group relative h-full min-h-[160px] w-full">
                  <img src={item.src} alt={item.caption} className="photo-grade h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="text-xs text-white">{item.caption}</p>
                  </div>
                </div>
              ) : (
                <div className="flex h-full min-h-[160px] flex-col justify-center p-5 text-white" style={{ backgroundColor: item.color }}>
                  <p className="font-vivid text-sm font-bold uppercase leading-tight">{item.heading}</p>
                  <p className="mt-2 text-xs leading-relaxed opacity-85">{item.body}</p>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {/* Real growth chart */}
      <section className="px-6 pb-20 sm:px-14">
        <Reveal className="mb-6">
          <p className="text-xs font-bold uppercase tracking-wide" style={{ color: PALETTE[4] }}>Growth, platform by platform</p>
        </Reveal>
        <div className="max-w-2xl">
          <GrowthChart theme={{ fg: '#15130f', muted: 'rgba(21,19,15,0.5)', track: 'rgba(21,19,15,0.08)', accent: PALETTE[4] }} headingClass="font-vivid font-bold" />
        </div>
      </section>

      {/* Secondary work */}
      <section className="px-6 py-20 sm:px-14">
        <Reveal className="mb-8">
          <p className="text-xs font-bold uppercase tracking-wide" style={{ color: PALETTE[2] }}>More work</p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {selectedWork.map((work, i) => (
            <Reveal key={work.id} delay={i * 0.05}>
              <button
                onClick={() => openReader(work)}
                data-cursor="link"
                className="block w-full overflow-hidden rounded-xl text-left transition-transform hover:-translate-y-1"
                style={{ backgroundColor: work.accent }}
              >
                {work.heroImage && <img src={work.heroImage} alt="" className="photo-grade h-32 w-full object-cover opacity-90" />}
                <div className="p-5 text-white">
                  <p className="font-vivid text-lg font-bold">{work.subject}</p>
                  <p className="mt-1 text-xs opacity-80">{work.dateRange}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="px-6 py-20 sm:px-14">
        <Reveal className="mb-8">
          <p className="text-xs font-bold uppercase tracking-wide" style={{ color: PALETTE[3] }}>Approach</p>
        </Reveal>
        <div className="grid grid-cols-2 gap-3">
          {services.map((service, i) => (
            <Reveal key={service} delay={i * 0.05}>
              <div className="flex aspect-[2/1] items-center justify-center rounded-xl p-4 text-center" style={{ backgroundColor: PALETTE[i % PALETTE.length] }}>
                <span className="font-vivid text-lg font-bold text-white sm:text-2xl">{service}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="px-6 py-20 sm:px-14">
        <div className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:items-center">
          <Reveal>
            <img src={images.tisaPortrait} alt="Tisa" className="photo-grade aspect-square w-full rounded-2xl object-cover" style={{ boxShadow: `8px 8px 0 ${PALETTE[1]}` }} />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: PALETTE[1] }}>About</p>
            <h3 className="mt-2 font-vivid text-3xl font-bold">Tisa</h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/75">{draftCopy.aboutBody}</p>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section className="flex flex-col items-start gap-6 px-6 py-24 text-white sm:px-14" style={{ backgroundColor: PALETTE[4] }}>
        <h2 className="font-vivid text-[12vw] font-bold leading-[0.95] sm:text-[6vw]">Let's talk</h2>
        <a href={`mailto:${social.email}`} data-cursor="link" className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold" style={{ color: PALETTE[4] }}>
          {social.email}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </section>

      <footer className="px-6 py-8 text-xs text-black/40 sm:px-14">
        © {new Date().getFullYear()} Algo-Rhythm — staging build, not yet public.
      </footer>

      <AnimatePresence>
        {readerWork && <CaseStudyReader work={readerWork} theme={THEME} onClose={() => setReaderWork(null)} />}
      </AnimatePresence>
    </div>
  );
}
