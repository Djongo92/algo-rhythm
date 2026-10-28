import { motion } from 'framer-motion';
import { followerGrowth, followerGrowthTotal } from '../data/portfolio';

type Theme = {
  fg: string;
  muted: string;
  track: string;
  accent: string;
};

/** Real platform-by-platform follower growth, animated in on scroll. */
export function GrowthChart({ theme, headingClass = '' }: { theme: Theme; headingClass?: string }) {
  const max = Math.max(...followerGrowth.map(r => r.end));
  return (
    <div className="space-y-5">
      {followerGrowth.map((row, i) => (
        <div key={row.platform}>
          <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-x-3 text-xs">
            <span className="font-medium" style={{ color: theme.fg }}>{row.platform}</span>
            <span style={{ color: theme.muted }}>
              {row.start.toLocaleString()} → {row.end.toLocaleString()}{' '}
              <strong style={{ color: theme.accent }}>{row.changeLabel}</strong>
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: theme.track }}>
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: theme.accent }}
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.max(2, (row.end / max) * 100)}%` }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      ))}
      <div className="mt-3 border-t pt-5" style={{ borderColor: theme.track }}>
        <p className="text-xs uppercase tracking-wide" style={{ color: theme.muted }}>Total across all platforms</p>
        <p className={`mt-1 text-3xl sm:text-4xl ${headingClass}`} style={{ color: theme.fg }}>
          {followerGrowthTotal.start.toLocaleString()} → {followerGrowthTotal.end.toLocaleString()}
          <span className="ml-3 text-lg" style={{ color: theme.accent }}>{followerGrowthTotal.changeLabel}</span>
        </p>
      </div>
    </div>
  );
}
