import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { CaseStudy } from '../data/portfolio';

export type ReaderTheme = {
  bg: string;
  fg: string;
  muted: string;
  accent: string;
  headingClass: string;
};

/** Full-screen "chapter" a case study opens into, themed per direction. */
export function CaseStudyReader({ work, theme, onClose }: { work: CaseStudy; theme: ReaderTheme; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[120] overflow-y-auto"
      style={{ backgroundColor: theme.bg, color: theme.fg }}
    >
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        onClick={onClose}
        data-cursor="link"
        className="fixed right-5 top-5 z-10 flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide backdrop-blur-md sm:right-8 sm:top-8"
        style={{ borderColor: `${theme.fg}33`, color: theme.fg, backgroundColor: `${theme.bg}cc` }}
      >
        <X className="h-3.5 w-3.5" /> Close
      </motion.button>

      {work.heroImage && (
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[50vh] w-full overflow-hidden sm:h-[68vh]"
        >
          <img src={work.heroImage} alt="" className="photo-grade h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${theme.bg}, transparent 55%)` }} />
        </motion.div>
      )}

      <div className="mx-auto max-w-3xl px-6 pb-28 pt-12 sm:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs font-bold uppercase tracking-[0.2em]"
          style={{ color: theme.accent }}
        >
          {work.dateRange} — {work.tag}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className={`mt-3 text-4xl sm:text-6xl ${theme.headingClass}`}
        >
          {work.subject}
        </motion.h1>

        {work.highlights.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3"
          >
            {work.highlights.map(h => (
              <div key={h.label}>
                <p className={`text-2xl ${theme.headingClass}`}>{h.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wide" style={{ color: theme.muted }}>{h.label}</p>
              </div>
            ))}
          </motion.div>
        )}

        <div className="mt-10 space-y-5">
          {work.narrative.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed" style={{ color: theme.muted }}>{p}</p>
          ))}
        </div>

        {work.sections.length > 0 && (
          <div className="mt-12 space-y-8 border-t pt-10" style={{ borderColor: `${theme.fg}1a` }}>
            {work.sections.map(s => (
              <div key={s.heading}>
                <h3 className={`text-xl ${theme.headingClass}`}>{s.heading}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: theme.muted }}>{s.body}</p>
              </div>
            ))}
          </div>
        )}

        {work.gallery.length > 0 && (
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {work.gallery.map(item => (
              <figure key={item.src}>
                <img src={item.src} alt={item.caption} className="photo-grade aspect-[4/5] w-full rounded-sm object-cover" />
                <figcaption className="mt-2 text-xs" style={{ color: theme.muted }}>{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
