import { useEffect, useState } from 'react';
import DirectionA from './directions/DirectionA';
import DirectionB from './directions/DirectionB';

type View = 'a' | 'b';

function readView(): View {
  if (typeof window === 'undefined') return 'a';
  const param = new URLSearchParams(window.location.search).get('v');
  return param === 'b' ? 'b' : 'a';
}

export default function App() {
  const [view, setView] = useState<View>(readView);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('v', view);
    window.history.replaceState({}, '', url);
  }, [view]);

  return (
    <>
      <div className="fixed top-4 right-4 z-[100] flex items-center gap-1 rounded-full border border-white/15 bg-black/40 p-1 text-xs font-medium backdrop-blur-md shadow-lg">
        <button
          onClick={() => setView('a')}
          className={`rounded-full px-3 py-1.5 transition-colors ${view === 'a' ? 'bg-white text-black' : 'text-white/70 hover:text-white'}`}
        >
          Cinematic
        </button>
        <button
          onClick={() => setView('b')}
          className={`rounded-full px-3 py-1.5 transition-colors ${view === 'b' ? 'bg-white text-black' : 'text-white/70 hover:text-white'}`}
        >
          Kinetic
        </button>
      </div>
      {view === 'a' ? <DirectionA /> : <DirectionB />}
    </>
  );
}
