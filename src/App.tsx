import { useEffect, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { Grain } from './components/Grain';
import { SmoothScroll } from './components/SmoothScroll';
import { SoundProvider } from './lib/sound';
import { SoundToggle } from './components/SoundToggle';
import DirectionA from './directions/DirectionA';
import DirectionB from './directions/DirectionB';
import DirectionC from './directions/DirectionC';
import DirectionD from './directions/DirectionD';

type View = 'a' | 'b' | 'c' | 'd';
const VIEWS: View[] = ['a', 'b', 'c', 'd'];

function readView(): View {
  if (typeof window === 'undefined') return 'a';
  const param = new URLSearchParams(window.location.search).get('v') as View | null;
  return param && VIEWS.includes(param) ? param : 'a';
}

const OPTIONS: { key: View; label: string }[] = [
  { key: 'a', label: 'Cinematic' },
  { key: 'b', label: 'Kinetic' },
  { key: 'c', label: 'Vivid' },
  { key: 'd', label: 'Benchmark' },
];

const DIRECTIONS: Record<View, React.ComponentType> = {
  a: DirectionA,
  b: DirectionB,
  c: DirectionC,
  d: DirectionD,
};

export default function App() {
  const [view, setView] = useState<View>(readView);
  const Active = DIRECTIONS[view];

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('v', view);
    window.history.replaceState({}, '', url);
    window.scrollTo({ top: 0 });
  }, [view]);

  return (
    <MotionConfig reducedMotion="user">
      <SoundProvider>
        <SmoothScroll>
          <Grain />
          <div className="fixed top-4 right-4 z-[100] flex items-center gap-2">
            <SoundToggle className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 backdrop-blur-md hover:text-white" />
            <div className="flex flex-wrap items-center gap-1 rounded-full border border-white/15 bg-black/40 p-1 text-xs font-medium backdrop-blur-md shadow-lg">
              {OPTIONS.map(option => (
                <button
                  key={option.key}
                  onClick={() => setView(option.key)}
                  className={`rounded-full px-3 py-1.5 transition-colors ${view === option.key ? 'bg-white text-black' : 'text-white/70 hover:text-white'}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Active />
            </motion.div>
          </AnimatePresence>
        </SmoothScroll>
      </SoundProvider>
    </MotionConfig>
  );
}
