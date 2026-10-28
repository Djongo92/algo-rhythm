import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CaseStudyReader, type ReaderTheme } from '../components/CaseStudyReader';
import { GrowthChart } from '../components/GrowthChart';
import { CountUpStat } from '../components/CountUpStat';
import { useSound } from '../lib/sound';
import { caseStudies, draftCopy, flagship, images, services, social, type CaseStudy } from '../data/portfolio';

const ACCENT = '#ff4b2b';

const THEME: ReaderTheme = {
  bg: '#faf9f6',
  fg: '#0a0a0a',
  muted: 'rgba(10,10,10,0.65)',
  accent: ACCENT,
  headingClass: 'font-black',
};

function Marquee({ text, direction = 'left', tone = 'accent' }: { text: string; direction?: 'left' | 'right'; tone?: 'accent' | 'dark' }) {
  const anim = direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'];
  const bg = tone === 'accent' ? ACCENT : '#000000';
  const fg = tone === 'accent' ? 'text-black' : 'text-white';
  return (
    <div className="overflow-hidden border-y-4 border-black py-3" style={{ backgroundColor: bg }}>
      <motion.div
        className={`flex w-max gap-10 whitespace-nowrap font-grotesk text-sm font-bold uppercase tracking-wide ${fg}`}
        animate={{ x: anim }}
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
      data-cursor="link"
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

/** A rail tile with cursor-following 3D tilt. */
function TiltTile({
  onClick,
  style,
  className,
  children,
  badge,
}: {
  onClick: () => void;
  style?: React.CSSProperties;
  className: string;
  children: React.ReactNode;
  badge?: React.ReactNode;
}) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 16 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 16 });

  return (
    <motion.button
      onClick={onClick}
      data-cursor="link"
      whileHover={{ scale: 0.98 }}
      onMouseMove={e => {
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        rotateY.set(px * 14);
        rotateX.set(py * -14);
      }}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      style={{ ...style, rotateX: springX, rotateY: springY, transformPerspective: 900 }}
      className={className}
    >
      {children}
      {badge}
    </motion.button>
  );
}

export default function DirectionB() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railX = useMotionValue(0);
  const [constraint, setConstraint] = useState(0);
  const [readerWork, setReaderWork] = useState<CaseStudy | null>(null);
  const { playClick } = useSound();

  const openReader = (work: CaseStudy) => {
    playClick();
    setReaderWork(work);
  };

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current || !trackRef.current) return;
      setConstraint(Math.min(0, containerRef.current.offsetWidth - trackRef.current.scrollWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <div className="bg-[#faf9f6] font-grotesk text-black selection:bg-[var(--accent)]" style={{ '--accent': ACCENT } as React.CSSProperties}>
      <div className="fixed bottom-4 left-4 z-[90] rounded-full border-2 border-black bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide">
        Staging draft — copy not final
      </div>

      {/* Hero */}
      <section className="grid min-h-screen grid-cols-1 overflow-hidden pt-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col justify-center px-6 sm:px-14">
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
                className="block text-[13vw] lg:text-[6vw]"
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
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative hidden min-h-[320px] overflow-hidden lg:block"
        >
          <img src={images.heroEvent} alt="" className="photo-grade absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ backgroundColor: ACCENT, mixBlendMode: 'color', opacity: 0.55 }} />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
      </section>

      <Marquee text={`${flagship.subject} • +64% REACH • 10X TIKTOK GROWTH • 2.5X INSTAGRAM`} direction="left" tone="accent" />
      <Marquee text={services.join(' • ')} direction="right" tone="dark" />

      {/* Flagship stats */}
      <section className="grid gap-10 px-6 py-20 sm:px-14 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
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
                <CountUpStat highlight={h} className="font-black text-5xl leading-none sm:text-6xl" style={{ color: i % 2 ? ACCENT : 'black' }} />
                <p className="mt-2 font-grotesk text-xs font-bold uppercase tracking-wide text-black/50">{h.label}</p>
              </motion.div>
            ))}
          </div>
          <button
            onClick={() => openReader(flagship)}
            data-cursor="link"
            className="mt-10 inline-flex items-center gap-2 border-b-2 border-black font-grotesk font-bold uppercase tracking-wide"
          >
            Read the full case study <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          src={images.babyConcertsScreenshot}
          alt="Real Instagram post: 166K likes, 52.6K shares"
          className="mx-auto h-auto w-40 rounded-2xl border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] sm:w-48"
        />
      </section>

      {/* Real growth chart */}
      <section className="border-t-4 border-black px-6 py-16 sm:px-14">
        <p className="mb-8 font-grotesk text-xs font-bold uppercase tracking-wide text-black/50">Platform by platform, May 2023 → Feb 2026</p>
        <div className="max-w-2xl">
          <GrowthChart theme={{ fg: '#0a0a0a', muted: 'rgba(10,10,10,0.5)', track: 'rgba(0,0,0,0.1)', accent: ACCENT }} headingClass="font-black" />
        </div>
      </section>

      {/* Portfolio rail — real drag momentum + wheel, 3D tilt on hover */}
      <section className="border-y-4 border-black py-16">
        <p className="mb-6 px-6 font-grotesk text-xs font-bold uppercase tracking-wide text-black/50 sm:px-14">
          Selected work — drag or scroll →
        </p>
        <div
          ref={containerRef}
          onWheel={e => {
            const next = railX.get() - e.deltaY;
            railX.set(Math.min(0, Math.max(constraint, next)));
          }}
          className="cursor-grab overflow-hidden px-6 sm:px-14 active:cursor-grabbing"
        >
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={{ left: constraint, right: 0 }}
            dragElastic={0.12}
            dragMomentum
            style={{ x: railX }}
            className="flex w-max gap-4 pb-2"
          >
            {caseStudies.map((work, i) => (
              <TiltTile
                key={work.id}
                onClick={() => openReader(work)}
                style={{ backgroundColor: work.heroImage ? undefined : work.accent }}
                className="relative flex h-64 w-56 shrink-0 flex-col justify-between overflow-hidden rounded-2xl p-6 text-left sm:h-80 sm:w-72"
                badge={
                  <>
                    <span className="absolute left-0 top-0 h-full w-full ring-1 ring-inset ring-white/10" />
                    {i === 0 && <span className="absolute right-3 top-3 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold uppercase text-black">Flagship</span>}
                  </>
                }
              >
                {work.heroImage && (
                  <>
                    <img src={work.heroImage} alt="" className="photo-grade absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0" style={{ backgroundColor: work.accent, mixBlendMode: 'color', opacity: 0.6 }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  </>
                )}
                <p className="relative font-grotesk text-xs font-bold uppercase tracking-wide text-white/80">{work.dateRange}</p>
                <div className="relative">
                  <p className="font-black text-2xl leading-tight text-white sm:text-3xl">{work.subject}</p>
                  <p className="mt-2 text-xs text-white/80">{work.tag}</p>
                </div>
              </TiltTile>
            ))}
          </motion.div>
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
      <section className="grid gap-8 px-6 py-20 sm:px-14 lg:grid-cols-[0.5fr_1fr_0.5fr] lg:items-center">
        <p className="font-black text-4xl">TISA</p>
        <p className="max-w-2xl font-grotesk text-lg leading-relaxed text-black/80">{draftCopy.aboutBody}</p>
        <img src={images.tisaPortrait} alt="Tisa" className="photo-grade aspect-square w-full rounded-2xl border-4 border-black object-cover" />
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
        {readerWork && <CaseStudyReader work={readerWork} theme={THEME} onClose={() => setReaderWork(null)} />}
      </AnimatePresence>
    </div>
  );
}
