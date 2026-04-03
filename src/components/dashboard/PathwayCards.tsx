import { PathwayScore } from '../../types';
import { pathwayMap } from '../../data/pathways';

const RANK_LABELS = ['Top match', 'Strong match', 'Worth exploring'];

const DESCRIPTIONS: Record<string, string> = {
  tech:     'Software, AI, data, cybersecurity, and building the future',
  business: 'Leadership, startups, finance, marketing, and making things happen',
  creative: 'Design, film, writing, music, and storytelling',
  health:   'Medicine, biotech, research, public health, and saving lives',
  social:   'Nonprofits, law, education, advocacy, and changing systems',
};

interface Props {
  rankedPathways: PathwayScore[];
  firstName?: string;
}

export default function PathwayCards({ rankedPathways, firstName }: Props) {
  const top3 = rankedPathways.slice(0, 3);
  if (!top3.length) return null;

  const topColor = pathwayMap[top3[0].id]?.color ?? '#6C5CE7';

  return (
    <section style={{ marginBottom: '70px' }}>
      <p
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '0.8rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: topColor,
          marginBottom: '0.6rem',
        }}
      >
        Your results
      </p>
      <h2
        style={{
          fontFamily: '"Bricolage Grotesque", sans-serif',
          fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
          fontWeight: 700,
          color: '#111',
          marginBottom: '2.5rem',
          lineHeight: 1.15,
        }}
      >
        Hey {firstName ? firstName : 'there'}, here's what we found.
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {top3.map((ps, i) => {
          const pathway = pathwayMap[ps.id];
          if (!pathway) return null;
          const isTop = i === 0;

          return (
            <div
              key={ps.id}
              style={{
                border: `2px solid ${isTop ? pathway.color : pathway.color + '40'}`,
                borderRadius: '16px',
                padding: isTop ? '2rem' : '1.4rem 1.6rem',
                background: isTop ? pathway.color + '0A' : '#fff',
                display: 'flex',
                alignItems: isTop ? 'flex-start' : 'center',
                flexDirection: isTop ? 'column' : 'row',
                gap: '1rem',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 24px ${pathway.color}25`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              }}
            >
              {/* Badge */}
              <span
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: pathway.color,
                  background: pathway.color + '18',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '999px',
                  flexShrink: 0,
                }}
              >
                {RANK_LABELS[i]}
              </span>

              {isTop ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem' }}>
                    <span style={{ fontSize: '2rem' }}>{pathway.emoji}</span>
                    <h3
                      style={{
                        fontFamily: '"Bricolage Grotesque", sans-serif',
                        fontSize: '1.6rem',
                        fontWeight: 700,
                        color: '#111',
                        margin: 0,
                      }}
                    >
                      {pathway.label}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '0.95rem',
                      color: '#555',
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {DESCRIPTIONS[ps.id]}
                  </p>
                </>
              ) : (
                <>
                  <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{pathway.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        fontFamily: '"Bricolage Grotesque", sans-serif',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: '#111',
                        margin: '0 0 0.2rem',
                      }}
                    >
                      {pathway.label}
                    </h3>
                    <p
                      style={{
                        fontFamily: '"DM Sans", sans-serif',
                        fontSize: '0.85rem',
                        color: '#777',
                        margin: 0,
                      }}
                    >
                      {DESCRIPTIONS[ps.id]}
                    </p>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
