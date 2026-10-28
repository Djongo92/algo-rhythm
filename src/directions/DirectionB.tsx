import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { caseStudies, draftCopy, flagship, services, social } from '../data/portfolio';

const ACCENT = '#ff4b2b';

function Marquee({ text }: { text: string }) {
  return (
    <div className="overflow-hidden border-y-4 border-black bg-[var(--accent)] py-3" style={{ '--accent': ACCENT } as React.CSSProperties}>
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap font-grotesk text-sm font-bold uppercase tracking-wide text-black"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i}>{text} ★</span>
        ))}
      </motion.div>
    </div>
  );
}

function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <motion.a
      ref={ref}
      href={href}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 12 }}
      onMouseMove={e => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setPos({ x: (e.clientX - rect.left - rect.width / 2) * 0.35, y: (e.clientY - rect.top - rect.height / 2) * 0.35 });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      className="inline-flex items-center gap-3 rounded-full bg-black px-8 py-4 font-grotesk font-bold uppercase tracking-wide text-white"
    >
      {children}
      <ArrowUpRight className="h-5 w-5" />
    </motion.a>
  );
}

function CaseModal({ id, onClose }: { id: string; onClose: () => void }) {
  const work = caseStudies.find(c => c.id === id);
  if (!work) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[95] flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        onClick={e => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border-4 border-black bg-[#faf9f6] p-8 sm:rounded-3xl"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="font-grotesk text-xs font-bold uppercase tracking-wide text-black/50">{work.dateRange}</p>
            <h3 className="font-black text-4xl leading-none text-black">{work.subject}</h3>
          </div>
          <button onClick={onClose} className="rounded-full border-2 border-black p-2"><X className="h-5 w-5" /></button>
        </div>
        {work.highlights.length > 0 && (
          <div className="mb-6 grid grid-cols-3 gap-3">
            {work.highlights.map(h => (
              <div key={h.label} className="rounded-xl border-2 border-black p-3">
                <p className="font-black text-xl text-black">{h.value}</p>
                <p className="font-grotesk text-[10px] uppercase tracking-wide text-black/50">{h.label}</p>
              </div>
            ))}
          </div>
        )}
        <div className="space-y-3">
          {work.narrative.map((p, i) => (
            <p key={i} className="font-grotesk text-sm leading-relaxed text-black/80">{p}</p>
          ))}
        </div>
        {work.sections.length > 0 && (
          <div className="mt-6 space-y-4 border-t-2 border-black/10 pt-6">
            {work.sections.map(s => (
              <div key={s.heading}>
                <p className="font-grotesk text-xs font-bold uppercase tracking-wide" style={{ color: ACCENT }}>{s.heading}</p>
                <p className="mt-1 font-grotesk text-sm text-black/70">{s.body}</p>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function DirectionB() {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeCase, setActiveCase] = useState<string | null>(null);
  const tileColors = ['#111111', ACCENT, '#111111', ACCENT, '#111111'];

  return (
    <div className="bg-[#faf9f6] font-grotesk text-black selection:bg-[var(--accent)]" style={{ '--accent': ACCENT } as React.CSSProperties}>
      <div className="fixed bottom-4 left-4 z-[90] rounded-full border-2 border-black bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide">
        Staging draft — copy not final
      </div>

      {/* Hero */}
      <section className="flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-24 sm:px-14">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 font-grotesk text-sm font-bold uppercase tracking-[0.3em]"
          style={{ color: ACCENT }}
        >
          {draftCopy.kicker} Studio
        </motion.p>
        <h1 className="font-black leading-[0.92] tracking-tight">
          {['REAL GROWTH.', 'NO FLUFF.'].map((line, i) => (
            <motion.span
              key={line}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="block text-[14vw] sm:text-[7.5vw]"
            >
              {line}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 max-w-lg font-grotesk text-lg text-black/70"
        >
          {draftCopy.subhead}
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8">
          <MagneticButton href={`mailto:${social.email}`}>Start a project</MagneticButton>
        </motion.div>
      </section>

      <Marquee text={`${flagship.subject} • +64% REACH • 10X TIKTOK GROWTH • 2.5X INSTAGRAM`} />

      {/* Flagship stats */}
      <section className="px-6 py-20 sm:px-14">
        <p className="mb-8 font-grotesk text-xs font-bold uppercase tracking-wide text-black/50">
          Flagship — {flagship.subject} · {flagship.dateRange}
        </p>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {flagship.highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, scale: 0.7, rotate: -4 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ type: 'spring', stiffness: 200, damping: 14, delay: i * 0.05 }}
            >
              <p className="font-black text-5xl leading-none sm:text-6xl" style={{ color: i % 2 ? ACCENT : 'black' }}>{h.value}</p>
              <p className="mt-2 font-grotesk text-xs font-bold uppercase tracking-wide text-black/50">{h.label}</p>
            </motion.div>
          ))}
        </div>
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          onClick={() => setActiveCase(flagship.id)}
          className="mt-10 inline-flex items-center gap-2 border-b-2 border-black font-grotesk font-bold uppercase tracking-wide"
        >
          Read the full case study <ArrowUpRight className="h-4 w-4" />
        </motion.button>
      </section>

      {/* Portfolio rail */}
      <section className="border-y-4 border-black py-16">
        <p className="mb-6 px-6 font-grotesk text-xs font-bold uppercase tracking-wide text-black/50 sm:px-14">
          Selected work — drag or scroll →
        </p>
        <div
          ref={railRef}
          onWheel={e => {
            if (!railRef.current) return;
            railRef.current.scrollLeft += e.deltaY;
          }}
          className="flex gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:px-14 [&::-webkit-scrollbar]:hidden"
        >
          {caseStudies.map((work, i) => (
            <motion.button
              key={work.id}
              onClick={() => setActiveCase(work.id)}
              whileHover={{ scale: 0.98 }}
              className="flex h-64 w-56 shrink-0 flex-col justify-between rounded-2xl p-6 text-left sm:h-80 sm:w-72"
              style={{ backgroundColor: tileColors[i % tileColors.length], color: tileColors[i % tileColors.length] === ACCENT ? 'black' : 'white' }}
            >
              <p className="font-grotesk text-xs font-bold uppercase tracking-wide opacity-60">{work.dateRange}</p>
              <div>
                <p className="font-black text-2xl leading-tight sm:text-3xl">{work.subject}</p>
                <p className="mt-2 text-xs opacity-70">{work.tag}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Approach marquee list */}
      <section className="px-6 py-20 sm:px-14">
        <p className="mb-8 font-grotesk text-xs font-bold uppercase tracking-wide text-black/50">Approach</p>
        <div className="flex flex-wrap gap-3">
          {services.map(service => (
            <span key={service} className="rounded-full border-2 border-black px-6 py-3 font-black text-xl sm:text-2xl">
              {service}
            </span>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="px-6 py-20 sm:px-14">
        <div className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr]">
          <p className="font-black text-4xl">TISA</p>
          <p className="max-w-2xl font-grotesk text-lg leading-relaxed text-black/80">{draftCopy.aboutBody}</p>
        </div>
      </section>

      {/* Contact */}
      <section className="flex flex-col items-start gap-6 px-6 py-24 sm:px-14" style={{ backgroundColor: ACCENT }}>
        <motion.h2
          initial={{ opacity: 0, rotate: -2 }}
          whileInView={{ opacity: 1, rotate: -2 }}
          viewport={{ once: true }}
          className="font-black text-[16vw] leading-[0.85] text-black sm:text-[9vw]"
        >
          LET'S TALK
        </motion.h2>
        <MagneticButton href={`mailto:${social.email}`}>{social.email}</MagneticButton>
      </section>

      <footer className="px-6 py-8 font-grotesk text-xs text-black/50 sm:px-14">
        © {new Date().getFullYear()} Algo-Rhythm — staging build, not yet public.
      </footer>

      <AnimatePresence>
        {activeCase && <CaseModal id={activeCase} onClose={() => setActiveCase(null)} />}
      </AnimatePresence>
    </div>
  );
}
