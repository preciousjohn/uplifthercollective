import { useEffect, useState } from 'react';

interface Props {
  topPathwayColor: string;
  onDone: () => void;
}

export default function TransitionScreen({ topPathwayColor, onDone }: Props) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1600);
    const doneTimer = setTimeout(() => onDone(), 2200);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0D0D0D',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        transition: 'opacity 0.6s ease',
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      {/* Pulsing dot */}
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: topPathwayColor,
          marginBottom: '2rem',
          animation: 'dashPulse 1.4s ease infinite',
        }}
      />
      <p
        style={{
          fontFamily: '"Bricolage Grotesque", sans-serif',
          fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
          fontWeight: 600,
          color: '#fff',
          letterSpacing: '-0.01em',
          animation: 'dashFadeUp 0.7s ease forwards',
          margin: 0,
        }}
      >
        Building your world...
      </p>
      <style>{`
        @keyframes dashPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        @keyframes dashFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
