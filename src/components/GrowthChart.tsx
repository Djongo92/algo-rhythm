import { useState } from 'react';
import { motion } from 'framer-motion';
import { followerGrowth, followerGrowthTotal } from '../data/portfolio';

type Theme = {
  fg: string;
  muted: string;
  track: string;
  accent: string;
};

function percentChange(start: number, end: number): number {
  return start === 0 ? Infinity : ((end - start) / start) * 100;
}

/** Real platform-by-platform follower growth, animated in on scroll. */
export function GrowthChart({ theme, headingClass = '', interactive = false }: { theme: Theme; headingClass?: string; interactive?: boolean }) {
  const [mode, setMode] = useState<'absolute' | 'percent'>('absolute');
  const [hovered, setHovered] = useState<string | null>(null);

  const maxAbsolute = Math.max(...followerGrowth.map(r => r.end));
  const finiteChanges = followerGrowth.map(r => percentChange(r.start, r.end)).filter(Number.isFinite);
  const maxPercent = Math.max(...finiteChanges);

  const widthFor = (row: (typeof followerGrowth)[number]) => {
    if (mode === 'absolute') return Math.max(2, (row.end / maxAbsolute) * 100);
    const change = percentChange(row.start, row.end);
    return Number.isFinite(change) ? Math.max(2, (change / maxPercent) * 100) : 100;
  };

  return (
    <div className="space-y-5">
      {interactive && (
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-wide" style={{ color: theme.muted }}>
          <span>View:</span>
          {(['absolute', 'percent'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="rounded-full border px-2.5 py-1 transition-colors"
              style={{
                borderColor: mode === m ? theme.accent : theme.track,
                color: mode === m ? theme.accent : theme.muted,
              }}
            >
              {m === 'absolute' ? 'Followers' : '% change'}
            </button>
          ))}
        </div>
      )}
      {followerGrowth.map((row, i) => {
        const dimmed = interactive && hovered !== null && hovered !== row.platform;
        return (
          <div
            key={row.platform}
            onMouseEnter={() => interactive && setHovered(row.platform)}
            onMouseLeave={() => interactive && setHovered(null)}
            className="transition-opacity duration-200"
            style={{ opacity: dimmed ? 0.35 : 1 }}
          >
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
                whileInView={{ width: `${widthFor(row)}%` }}
                animate={{ width: `${widthFor(row)}%` }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        );
      })}
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
