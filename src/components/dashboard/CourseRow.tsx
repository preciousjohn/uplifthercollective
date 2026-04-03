import { CourseResult } from '../../types';

interface Props {
  courses: CourseResult[];
}

export default function CourseRow({ courses }: Props) {
  if (!courses.length) return null;

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
        Courses you can start right now
      </h2>

      {/* Horizontal scroll container */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          overflowX: 'auto',
          paddingBottom: '0.75rem',
          scrollbarWidth: 'none',
        }}
      >
        <style>{`.course-scroll::-webkit-scrollbar { display: none; }`}</style>
        {courses.map((course) => (
          <a
            key={course.id}
            href={`https://www.coursera.org/learn/${course.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: '0 0 240px',
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
            {course.photoUrl ? (
              <img
                src={course.photoUrl}
                alt={course.name}
                style={{ width: '100%', height: '130px', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '130px',
                  background: 'linear-gradient(135deg, #6C5CE720, #E1705520)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                }}
              >
                📚
              </div>
            )}

            <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <span
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: '#00B894',
                  background: '#00B89418',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '999px',
                  alignSelf: 'flex-start',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Free on Coursera
              </span>
              <h3
                style={{
                  fontFamily: '"Bricolage Grotesque", sans-serif',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: '#111',
                  margin: 0,
                  lineHeight: 1.3,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                } as React.CSSProperties}
              >
                {course.name}
              </h3>
              {course.description && (
                <p
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '0.78rem',
                    color: '#777',
                    margin: 0,
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  } as React.CSSProperties}
                >
                  {course.description}
                </p>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
