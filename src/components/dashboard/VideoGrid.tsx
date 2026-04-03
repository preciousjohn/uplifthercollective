import { VideoResult } from '../../types';

interface Props {
  videos: VideoResult[];
}

export default function VideoGrid({ videos }: Props) {
  if (!videos.length) return null;

  return (
    <section style={{ marginBottom: '70px' }}>
      <h2
        style={{
          fontFamily: '"Bricolage Grotesque", sans-serif',
          fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
          fontWeight: 700,
          color: '#111',
          marginBottom: '1.25rem',
        }}
      >
        Watch and learn
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1rem',
        }}
      >
        {videos.slice(0, 6).map((v) => (
          <a
            key={v.videoId}
            href={`https://www.youtube.com/watch?v=${v.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#fff',
              border: '1.5px solid #E8E4E0',
              borderRadius: '14px',
              overflow: 'hidden',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.transform = 'translateY(-2px)';
              el.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = 'none';
            }}
          >
            {/* Thumbnail */}
            <div style={{ position: 'relative' }}>
              <img
                src={v.thumbnail}
                alt={v.title}
                style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }}
              />
              {/* Play overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0,0,0,0.2)',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.92)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    paddingLeft: '3px',
                  }}
                >
                  ▶
                </div>
              </div>
            </div>

            <div style={{ padding: '0.9rem' }}>
              <h3
                style={{
                  fontFamily: '"Bricolage Grotesque", sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: '#111',
                  margin: '0 0 0.3rem',
                  lineHeight: 1.35,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                } as React.CSSProperties}
              >
                {v.title}
              </h3>
              <p
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.75rem',
                  color: '#999',
                  margin: 0,
                }}
              >
                {v.channelTitle}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
