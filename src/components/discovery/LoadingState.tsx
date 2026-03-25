import { useEffect, useState } from 'react';

const MESSAGES = [
  'Reading your answers…',
  'Finding what fits you…',
  'Building your recommendations…',
  'Almost there…',
];

export default function LoadingState() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      {/* Animated blobs */}
      <div className="relative w-24 h-24 mb-8">
        <div
          className="absolute inset-0 rounded-full animate-ping opacity-20"
          style={{ background: '#6C5CE7' }}
        />
        <div
          className="absolute inset-2 rounded-full animate-pulse"
          style={{ background: 'linear-gradient(135deg, #6C5CE7, #E17055)' }}
        />
        <span className="absolute inset-0 flex items-center justify-center text-3xl">✦</span>
      </div>

      <p
        key={msgIndex}
        className="font-display text-xl font-semibold text-gray-900 transition-all animate-pulse"
      >
        {MESSAGES[msgIndex]}
      </p>
      <p className="text-gray-400 text-sm mt-2">
        The AI is reading everything you said
      </p>
    </div>
  );
}
