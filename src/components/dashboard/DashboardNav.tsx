import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  firstName?: string;
  accentColor?: string;
  showBack?: boolean;
}

function CircleComingSoon({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(4px)',
        zIndex: 999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: '20px',
          padding: '2.5rem 2rem', textAlign: 'center',
          maxWidth: '320px', width: '90%',
        }}
      >
        <div style={{ fontSize: '3rem', animation: 'spinGlobe 3s linear infinite', display: 'inline-block', marginBottom: '1rem' }}>
          🌍
        </div>
        <h3 style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#111', margin: '0 0 0.5rem' }}>
          Coming soon
        </h3>
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.875rem', color: '#888', margin: '0 0 1.5rem', lineHeight: 1.6 }}>
          Your circle is where you connect with other girls on the same path. We're building it.
        </p>
        <button
          onClick={onClose}
          style={{
            fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '0.875rem',
            background: '#111', color: '#fff', border: 'none',
            padding: '0.6rem 1.5rem', borderRadius: '999px', cursor: 'pointer',
          }}
        >
          Got it
        </button>
      </div>
      <style>{`@keyframes spinGlobe { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function DashboardNav({ firstName, accentColor = '#6C5CE7', showBack = false }: Props) {
  const navigate = useNavigate();
  const [showCircle, setShowCircle] = useState(false);
  const initials = firstName ? firstName[0].toUpperCase() : '?';

  return (
    <>
      {showCircle && <CircleComingSoon onClose={() => setShowCircle(false)} />}

      <nav
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 5vw', height: '64px',
          background: '#fff', borderBottom: '1px solid #EEEBE7',
          position: 'sticky', top: 0, zIndex: 50,
        }}
      >
        {/* Left: back button (if shown) + avatar + name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              style={{
                fontFamily: '"DM Sans", sans-serif', fontWeight: 600,
                fontSize: '0.875rem', color: '#888', background: 'none',
                border: 'none', cursor: 'pointer', padding: '0.25rem 0',
                display: 'flex', alignItems: 'center', gap: '0.3rem',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#111')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#888')}
            >
              ← Back
            </button>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: '34px', height: '34px', borderRadius: '50%',
                background: accentColor, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontFamily: '"Bricolage Grotesque", sans-serif',
                fontWeight: 700, fontSize: '0.875rem', color: '#fff', flexShrink: 0,
              }}
            >
              {initials}
            </div>
            <span style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 600, fontSize: '0.95rem', color: '#111' }}>
              {firstName || 'Hey'}
            </span>
          </div>
        </div>

        {/* Right: Your circle */}
        <button
          onClick={() => setShowCircle(true)}
          style={{
            fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '0.875rem',
            color: accentColor, background: accentColor + '12',
            border: 'none', padding: '0.45rem 1rem', borderRadius: '999px',
            cursor: 'pointer', transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.75')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
        >
          Your circle
        </button>
      </nav>
    </>
  );
}
