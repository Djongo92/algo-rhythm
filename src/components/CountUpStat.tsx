import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import type { Highlight } from '../data/portfolio';

function format(h: Highlight, value: number): string {
  const n = h.numeric!;
  const decimals = n.decimals ?? 0;
  const fixed = decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));
  const body = n.thousands ? Number(fixed).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : fixed;
  return `${n.prefix ?? ''}${body}${n.suffix ?? ''}`;
}

/**
 * Renders a highlight as an animated count-up when it carries a `numeric`
 * hint, falling back to the plain display string otherwise. Each highlight's
 * value string is too varied ("0 → 7,200", "4M+ views") to parse back into a
 * number reliably, so the data file supplies the numeric target directly.
 */
export function CountUpStat({ highlight, className = '', style }: { highlight: Highlight; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduceMotion = useReducedMotion();
  const n = highlight.numeric;
  const [display, setDisplay] = useState(() => (n ? format(highlight, 0) : highlight.value));

  useEffect(() => {
    if (!n || !inView) return;
    if (reduceMotion) {
      setDisplay(format(highlight, n.to));
      return;
    }
    const controls = animate(0, n.to, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: latest => setDisplay(format(highlight, latest)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, highlight, n]);

  return (
    <p ref={ref} className={className} style={style}>
      {display}
    </p>
  );
}
