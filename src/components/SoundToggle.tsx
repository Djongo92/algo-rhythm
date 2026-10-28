import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from '../lib/sound';

export function SoundToggle({ className = '' }: { className?: string }) {
  const { enabled, toggle } = useSound();
  return (
    <button
      onClick={toggle}
      data-cursor="link"
      aria-label={enabled ? 'Mute ambient sound' : 'Play ambient sound'}
      title={enabled ? 'Sound on' : 'Sound off'}
      className={className}
    >
      {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );
}
