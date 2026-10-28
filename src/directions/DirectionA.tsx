import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Mail } from 'lucide-react';
import { draftCopy, flagship, images, selectedWork, services, social } from '../data/portfolio';

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StatCard({ label, value, delay }: { label: string; value: string; delay: number }) {
  return (
    <Reveal delay={delay} className="border-t border-white/10 py-5">
      <p className="font-display text-3xl text-[#f2ead9] sm:text-4xl">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#a89c87]">{label}</p>
    </Reveal>
  );
}

export default function DirectionA() {
  const [openSection, setOpenSection] = useState<number | null>(0);
  const [activeSecondary, setActiveSecondary] = useState<string | null>(null);

  return (
    <div className="bg-[#0c0b09] font-sans text-[#f2ead9] selection:bg-[#d4a373] selection:text-[#0c0b09]">
      {/* Draft badge */}
      <div className="fixed bottom-4 left-4 z-[90] rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-[#a89c87] backdrop-blur-md">
        Staging draft — copy not final
      </div>

      {/* Hero: real photo, dark overlay */}
      <section className="relative flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-20 sm:px-14">
        <img src={images.philharmonicBassists} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09] via-[#0c0b09]/70 to-[#0c0b09]/20" />
        <div className="absolute inset-0 bg-[#0c0b09]/30" />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative mb-6 text-xs font-medium uppercase tracking-[0.3em] text-[#d4a373]"
        >
          {draftCopy.kicker} — Studio
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-4xl font-display text-[11vw] font-medium italic leading-[0.98] text-[#f2ead9] sm:text-[6vw]"
        >
          {draftCopy.headline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative mt-8 max-w-xl text-lg text-[#e4d9c4]"
        >
          {draftCopy.subhead}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="relative mt-10 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c9bda4]"
        >
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" /> Scroll
        </motion.div>
      </section>

      {/* Proposition */}
      <section className="border-t border-white/10 px-6 py-28 sm:px-14">
        <Reveal>
          <p className="max-w-3xl font-display text-2xl leading-snug text-[#e4d9c4] sm:text-4xl">
            Real audience growth for institutions that create the moments people remember — measured, published, repeatable.
          </p>
        </Reveal>
      </section>

      {/* Flagship case study */}
      <section className="border-t border-white/10 px-6 py-24 sm:px-14">
        <Reveal className="mb-12 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#d4a373]">Selected work · Flagship</p>
            <h2 className="mt-3 font-display text-5xl italic text-[#f2ead9] sm:text-7xl">{flagship.subject}</h2>
          </div>
          <p className="text-sm text-[#a89c87]">{flagship.dateRange} — {flagship.tag}</p>
        </Reveal>

        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            {flagship.narrative.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-lg leading-relaxed text-[#d7cbb4]">{p}</p>
              </Reveal>
            ))}

            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3">
              {flagship.highlights.map((h, i) => (
                <StatCard key={h.label} label={h.label} value={h.value} delay={i * 0.05} />
              ))}
            </div>
          </div>

          <Reveal delay={0.1}>
            <div className="divide-y divide-white/10 border border-white/10">
              {flagship.sections.map((section, i) => {
                const open = openSection === i;
                return (
                  <div key={section.heading}>
                    <button
                      onClick={() => setOpenSection(open ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="font-display text-lg text-[#f2ead9]">{section.heading}</span>
                      <span className={`font-display text-xl text-[#d4a373] transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-6 text-sm leading-relaxed text-[#a89c87]">{section.body}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Real photo gallery from the engagement */}
        <Reveal delay={0.1} className="mt-16">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#a89c87]">From the work</p>
          <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {flagship.gallery.map(item => (
              <figure key={item.src} className="w-64 shrink-0 sm:w-80">
                <img src={item.src} alt={item.caption} className="h-80 w-full rounded-sm object-cover sm:h-96" />
                <figcaption className="mt-2 text-xs text-[#a89c87]">{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Secondary work */}
      <section className="border-t border-white/10 px-6 py-24 sm:px-14">
        <Reveal className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#d4a373]">More work</p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {selectedWork.map((work, i) => (
            <Reveal key={work.id} delay={i * 0.06}>
              <button
                onClick={() => setActiveSecondary(activeSecondary === work.id ? null : work.id)}
                className={`relative block h-56 w-full overflow-hidden border text-left transition-colors ${activeSecondary === work.id ? 'border-[#d4a373]' : 'border-white/10 hover:border-white/30'}`}
              >
                {work.heroImage && (
                  <>
                    <img src={work.heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09] via-[#0c0b09]/50 to-transparent" />
                  </>
                )}
                <div className="relative flex h-full flex-col justify-end p-5">
                  <p className="font-display text-xl text-[#f2ead9]">{work.subject}</p>
                  <p className="mt-1 text-xs text-[#d4a373]">{work.dateRange}</p>
                  <p className="mt-2 text-xs leading-relaxed text-[#c9bda4]">{work.tag}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
        <AnimatePresence>
          {activeSecondary && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="mt-6 border-l-2 border-[#d4a373] pl-6">
                {selectedWork.find(w => w.id === activeSecondary)?.narrative.map((p, i) => (
                  <p key={i} className="max-w-2xl text-sm leading-relaxed text-[#c9bda4]">{p}</p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Approach */}
      <section className="border-t border-white/10 px-6 py-24 sm:px-14">
        <Reveal className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#d4a373]">Approach</p>
        </Reveal>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {services.map((service, i) => (
            <Reveal key={service} delay={i * 0.05}>
              <div className="flex items-baseline justify-between py-6">
                <span className="font-display text-3xl text-[#f2ead9] sm:text-5xl">{service}</span>
                <span className="font-display text-sm text-[#a89c87]">{String(i + 1).padStart(2, '0')}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="border-t border-white/10 px-6 py-24 sm:px-14">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal>
            <img src={images.tisaPortrait} alt="Tisa" className="aspect-[4/5] w-full rounded-sm object-cover" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs uppercase tracking-[0.2em] text-[#d4a373]">About</p>
            <h3 className="mt-3 font-display text-4xl italic text-[#f2ead9]">Tisa</h3>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#d7cbb4]">{draftCopy.aboutBody}</p>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-white/10 px-6 py-28 sm:px-14">
        <Reveal>
          <a href={`mailto:${social.email}`} className="group flex items-center gap-4 font-display text-5xl italic text-[#f2ead9] sm:text-7xl">
            Let's talk
            <ArrowUpRight className="h-10 w-10 text-[#d4a373] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
          <p className="mt-6 flex items-center gap-2 text-sm text-[#a89c87]">
            <Mail className="h-4 w-4" /> {social.email}
          </p>
        </Reveal>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-xs text-[#6f6552] sm:px-14">
        © {new Date().getFullYear()} Algo-Rhythm — staging build, not yet public.
      </footer>
    </div>
  );
}
