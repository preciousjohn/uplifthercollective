import { Link } from 'react-router-dom';
import { Resource, PathwayId } from '../../types';
import { pathwayMap } from '../../data/pathways';

interface Props {
  resources: Resource[];
  topPathways: PathwayId[];
}

export default function MatchedPrograms({ resources, topPathways }: Props) {
  const topColor = pathwayMap[topPathways[0]]?.color ?? '#6C5CE7';

  return (
    <section style={{ marginBottom: '70px' }}>
      <h2
        style={{
          fontFamily: '"Bricolage Grotesque", sans-serif',
          fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
          fontWeight: 700,
          color: '#111',
          marginBottom: '1.5rem',
          borderLeft: `4px solid ${topColor}`,
          paddingLeft: '0.875rem',
        }}
      >
        Programs picked for you
      </h2>

      {resources.length === 0 ? (
        <div
          style={{
            background: '#fff',
            border: '1.5px solid #E8E4E0',
            borderRadius: '14px',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <p style={{ fontFamily: '"DM Sans", sans-serif', color: '#888', marginBottom: '0.75rem' }}>
            We're adding resources for your pathway — check back soon.
          </p>
          <Link
            to="/resources"
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: topColor,
              textDecoration: 'none',
            }}
          >
            Browse all resources →
          </Link>
        </div>
      ) : (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1rem',
            }}
          >
            {resources.slice(0, 9).map((r) => {
              const pathway = pathwayMap[r.pathway];
              return (
                <div
                  key={r.id}
                  style={{
                    background: '#fff',
                    border: '1.5px solid #E8E4E0',
                    borderRadius: '14px',
                    padding: '1.4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem',
                    transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = 'translateY(-2px)';
                    el.style.borderColor = pathway?.color ?? topColor;
                    el.style.boxShadow = `0 6px 20px ${pathway?.color ?? topColor}20`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = 'translateY(0)';
                    el.style.borderColor = '#E8E4E0';
                    el.style.boxShadow = 'none';
                  }}
                >
                  {/* Tags row */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    <span
                      style={{
                        fontFamily: '"DM Sans", sans-serif',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: pathway?.color ?? topColor,
                        background: (pathway?.color ?? topColor) + '18',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '999px',
                      }}
                    >
                      {pathway?.emoji} {pathway?.label ?? r.pathway}
                    </span>
                    <span
                      style={{
                        fontFamily: '"DM Sans", sans-serif',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        color: '#00B894',
                        background: '#00B89418',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '999px',
                      }}
                    >
                      {r.cost}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: '"Bricolage Grotesque", sans-serif',
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: '#111',
                      margin: 0,
                    }}
                  >
                    {r.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '0.83rem',
                      color: '#666',
                      margin: 0,
                      lineHeight: 1.55,
                      flex: 1,
                    }}
                  >
                    {r.description}
                  </p>

                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: pathway?.color ?? topColor,
                      textDecoration: 'none',
                      marginTop: '0.25rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    Learn more ↗
                  </a>
                </div>
              );
            })}
          </div>

          {resources.length > 9 && (
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Link
                to={`/resources?pathway=${topPathways[0]}`}
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: topColor,
                  textDecoration: 'none',
                }}
              >
                See all resources →
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
}
