import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Custom cursor -- desktop-with-mouse only (checked via a media query, never
// forced on touch devices). Expands over anything tagged data-cursor="link".
export function Cursor() {
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 28, stiffness: 320, mass: 0.4 });
  const springY = useSpring(y, { damping: 28, stiffness: 320, mass: 0.4 });

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setActive(canHover);
    if (!canHover) return;
    document.body.classList.add('custom-cursor');
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      setHovering(!!(e.target as HTMLElement)?.closest('[data-cursor="link"]'));
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      document.body.classList.remove('custom-cursor');
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, [x, y]);

  if (!active) return null;

  return (
    <motion.div
      style={{ translateX: springX, translateY: springY }}
      className="pointer-events-none fixed left-0 top-0 z-[200] -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{ width: hovering ? 46 : 10, height: hovering ? 46 : 10, opacity: hovering ? 0.3 : 0.9 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="rounded-full bg-white mix-blend-difference"
      />
    </motion.div>
  );
}
