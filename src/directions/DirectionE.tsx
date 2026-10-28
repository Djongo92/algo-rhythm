import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Paperclip } from 'lucide-react';
import { CaseStudyReader, type ReaderTheme } from '../components/CaseStudyReader';
import { GrowthChart } from '../components/GrowthChart';
import { useSound } from '../lib/sound';
import { awards, caseStudies, draftCopy, flagship, images, press, services, social, type CaseStudy } from '../data/portfolio';

const PAPER = '#ece4d3';
const INK = '#2b241c';
const MUTED = 'rgba(43,36,28,0.65)';
const STAMP = '#9c1f1f';

const THEME: ReaderTheme = {
  bg: PAPER,
  fg: INK,
  muted: MUTED,
  accent: STAMP,
  headingClass: 'font-black',
};

function Reveal({ children, delay = 0, className = '', style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function Stamp({ children, rotate = -6 }: { children: React.ReactNode; rotate?: number }) {
  return (
    <span
      className="inline-block rounded-sm border-2 px-3 py-1 font-black text-xs uppercase tracking-widest"
      style={{ color: STAMP, borderColor: STAMP, transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}

function Polaroid({ src, caption, rotate = 0 }: { src: string; caption: string; rotate?: number }) {
  return (
    <div className="bg-white p-3 pb-10 shadow-md" style={{ transform: `rotate(${rotate}deg)` }}>
      <img src={src} alt={caption} className="photo-grade h-48 w-full object-cover" />
      <p className="mt-3 text-center font-typewriter text-xs" style={{ color: INK }}>{caption}</p>
    </div>
  );
}

export default function DirectionE() {
  const [readerWork, setReaderWork] = useState<CaseStudy | null>(null);
  const { playClick } = useSound();
  const openReader = (work: CaseStudy) => { playClick(); setReaderWork(work); };

  return (
    <div className="font-typewriter text-[#2b241c]" style={{ backgroundColor: PAPER }}>
      <div className="fixed bottom-4 left-4 z-[90] rounded-sm border-2 border-dashed px-3 py-1.5 text-[10px] uppercase tracking-wide" style={{ borderColor: INK, backgroundColor: `${PAPER}dd` }}>
        Staging draft — copy not final
      </div>

      {/* Cover */}
      <section className="flex min-h-screen flex-col justify-center px-6 pt-20 sm:px-16">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: MUTED }}>Studio File No. 001</p>
          <h1 className="mt-6 font-black text-[13vw] uppercase leading-[0.9] sm:text-[6.5vw]" style={{ color: INK }}>
            {draftCopy.kicker}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: INK }}>{draftCopy.subhead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Stamp rotate={-4}>Portfolio</Stamp>
            <Stamp rotate={3}>For Review</Stamp>
          </div>
        </Reveal>
      </section>

      {/* Subject profile */}
      <section className="border-y-2 border-dashed px-6 py-14 sm:px-16" style={{ borderColor: INK }}>
        <Reveal className="grid gap-10 lg:grid-cols-[0.5fr_1.5fr] lg:items-start">
          <Polaroid src={images.tisaPortrait} caption="Subject, on location." rotate={-2} />
          <div>
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: STAMP }}>Subject Profile</p>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex gap-3"><dt className="w-24 shrink-0" style={{ color: MUTED }}>Name</dt><dd>Tisa</dd></div>
              <div className="flex gap-3"><dt className="w-24 shrink-0" style={{ color: MUTED }}>Field</dt><dd>Music & cultural communications</dd></div>
              <div className="flex gap-3"><dt className="w-24 shrink-0" style={{ color: MUTED }}>Years active</dt><dd>2018 – present</dd></div>
              <div className="flex gap-3"><dt className="w-24 shrink-0" style={{ color: MUTED }}>Notable engagement</dt><dd>{flagship.subject}, {flagship.dateRange}</dd></div>
            </dl>
            <p className="mt-5 max-w-xl text-sm leading-relaxed" style={{ color: INK }}>{draftCopy.aboutBody}</p>
          </div>
        </Reveal>
      </section>

      {/* Case files */}
      <section className="px-6 py-14 sm:px-16">
        <Reveal className="mb-8 flex items-center gap-3">
          <Paperclip className="h-5 w-5" style={{ color: STAMP }} />
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: STAMP }}>Case Files</p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {caseStudies.map((work, i) => (
            <Reveal key={work.id} delay={i * 0.05}>
              <button
                onClick={() => openReader(work)}
                data-cursor="link"
                className="relative block w-full border-2 border-dashed p-5 text-left"
                style={{ borderColor: INK, backgroundColor: `${PAPER}` }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest" style={{ color: MUTED }}>Filed {work.dateRange}</p>
                    <p className="mt-1 font-black text-xl uppercase">{work.subject}</p>
                    <p className="mt-2 text-xs leading-relaxed" style={{ color: MUTED }}>{work.tag}</p>
                  </div>
                  {work.flagship && <Stamp rotate={8}>Flagship</Stamp>}
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Evidence board (gallery) */}
      <section className="border-y-2 border-dashed px-6 py-14 sm:px-16" style={{ borderColor: INK }}>
        <Reveal className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: STAMP }}>Evidence — {flagship.subject}</p>
        </Reveal>
        <div className="flex flex-wrap gap-6">
          {flagship.gallery.map((item, i) => (
            <Reveal key={item.src} delay={i * 0.05}>
              <Polaroid src={item.src} caption={item.caption} rotate={i % 2 === 0 ? -3 : 3} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stamped stats + growth */}
      <section className="grid gap-10 px-6 py-14 sm:px-16 lg:grid-cols-2">
        <div>
          <Reveal className="mb-6">
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: STAMP }}>Verified Figures</p>
          </Reveal>
          <div className="flex flex-wrap gap-4">
            {flagship.highlights.map((h, i) => (
              <Reveal key={h.label} delay={i * 0.04} className="rounded-sm border-2 px-4 py-3" style={{ borderColor: INK, transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 2}deg)` }}>
                <p className="font-black text-xl">{h.value}</p>
                <p className="text-[10px] uppercase tracking-wide" style={{ color: MUTED }}>{h.label}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-8 border-t-2 border-dashed pt-6" style={{ borderColor: INK }}>
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: STAMP }}>Commendations</p>
            <ul className="mt-3 space-y-1 text-sm">
              {awards.map(a => <li key={a.title}>— {a.issuer}, {a.title} ({a.date})</li>)}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="mb-6 text-xs uppercase tracking-[0.3em]" style={{ color: STAMP }}>Growth on File</p>
          <GrowthChart theme={{ fg: INK, muted: MUTED, track: 'rgba(43,36,28,0.12)', accent: STAMP }} headingClass="font-black" />
        </Reveal>
      </section>

      {/* Press clippings */}
      <section className="border-y-2 border-dashed px-6 py-14 sm:px-16" style={{ borderColor: INK }}>
        <Reveal className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: STAMP }}>Press Clippings</p>
        </Reveal>
        <div className="space-y-3">
          {press.map(item => (
            <div key={item.title} className="border-b pb-3 text-sm" style={{ borderColor: 'rgba(43,36,28,0.2)' }}>
              <p className="font-black uppercase">{item.title}</p>
              <p style={{ color: MUTED }}>{item.outlet} · {item.year} · {item.kind}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology (services) */}
      <section className="px-6 py-14 sm:px-16">
        <Reveal className="mb-6">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: STAMP }}>Services on Record</p>
        </Reveal>
        <div className="flex flex-wrap gap-3">
          {services.map(service => (
            <span key={service} className="rounded-sm border-2 px-4 py-2 text-sm uppercase tracking-wide" style={{ borderColor: INK }}>{service}</span>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 py-16 sm:px-16">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: STAMP }}>To Reach The Subject</p>
          <a href={`mailto:${social.email}`} data-cursor="link" className="mt-3 block font-black text-3xl uppercase sm:text-5xl">
            {social.email}
          </a>
        </Reveal>
      </section>

      <footer className="border-t-2 border-dashed px-6 py-8 text-[11px] sm:px-16" style={{ borderColor: INK, color: MUTED }}>
        © {new Date().getFullYear()} {draftCopy.kicker} — staging build, not yet public.
      </footer>

      <AnimatePresence>
        {readerWork && <CaseStudyReader work={readerWork} theme={THEME} onClose={() => setReaderWork(null)} />}
      </AnimatePresence>
    </div>
  );
}
