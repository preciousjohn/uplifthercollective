const CORAL = '#8B1A1A';

const FOUNDERS = [
  {
    name: 'Precious Inyang',
    role: 'Design Engineer',
    bio: 'Master of Design at UC Berkeley. With experience spanning AI, UX, product development, fintech innovation, and social impact, she focuses on building systems that expand access for young people and emerging markets.',
    img: '/theteam/precious.svg',
    linkedin: 'https://www.linkedin.com/in/preciousjohn/',
  },
  {
    name: 'Lucía Roa',
    role: 'Project Manager',
    bio: 'Background in business, leadership, and innovation. She holds a Bachelor\'s Degree in Leadership, Entrepreneurship and Innovation and has worked on projects in multicultural environments related to technology, and social impact',
    img: '/theteam/lucia.svg',
    linkedin: 'https://www.linkedin.com/in/luciaroa/',
  },
  {
    name: 'Isabelle Hung',
    role: 'Creative Designer',
    bio: 'Isabelle is a student studying Communication Design at Parsons School of Design in NYC',
    img: '/theteam/isa.svg',
    linkedin: 'https://www.linkedin.com/in/hungisabelle/',
  },
  {
    name: 'Anna Cheng',
    role: 'Operations & Analytics',
    bio: "Anna is a graduate from Georgetown University's McDonough School of Business who double majored in Operations & Analytics and Marketing. She is currently an Associate at PwC",
    img: '/theteam/ann.svg',
    linkedin: 'https://www.linkedin.com/in/annachengg/',
  },
];

export default function About() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh', padding: '80px 5vw 120px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Heading */}
        <h1
          style={{
            fontFamily: '"Archivo Narrow", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2.4rem, 7vw, 5rem)',
            color: CORAL,
            lineHeight: 1.05,
            margin: '0 0 1.5rem',
          }}
        >
          Meet our Founders
        </h1>

        {/* Body */}
        <p
          style={{
            fontFamily: '"Instrument Sans", sans-serif',
            fontSize: '18px',
            color: '#333',
            lineHeight: 1.7,
            maxWidth: '620px',
            margin: '0 0 5rem',
          }}
        >
          We're designers, builders, and problem-solvers who got tired of watching talent go unseen.
          We built UpliftHer because the resources exist but the bridge to them didn't, especially
          for girls/women in underserved communities.
        </p>

        {/* Founder grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2.5rem',
          }}
          className="founders-grid"
        >
          {FOUNDERS.map(({ name, role, bio, img, linkedin }) => (
            <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

              {/* Portrait SVG */}
              <img
                src={img}
                alt={name}
                style={{ width: '100%', maxWidth: '220px', height: 'auto', display: 'block', marginBottom: '1.25rem' }}
              />

              {/* Name */}
              <p
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)',
                  color: CORAL,
                  margin: '0 0 0.5rem',
                  fontStyle: 'italic',
                }}
              >
                {name}
              </p>

              {/* LinkedIn */}
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-block', marginBottom: '0.75rem', lineHeight: 1 }}
                aria-label={`${name} LinkedIn`}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="4" fill="#0A66C2"/>
                  <path d="M7.5 9.5H5V18H7.5V9.5Z" fill="white"/>
                  <circle cx="6.25" cy="6.75" r="1.5" fill="white"/>
                  <path d="M13 13.25C13 12.01 13.99 11 15.25 11C16.51 11 17.5 12.01 17.5 13.25V18H20V13.25C20 10.63 17.87 8.5 15.25 8.5C13.73 8.5 12.37 9.19 11.5 10.27V9.5H9V18H11.5V13.25H13Z" fill="white"/>
                </svg>
              </a>

              {/* Role */}
              <p
                style={{
                  fontFamily: '"Instrument Sans", sans-serif',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  color: '#111',
                  margin: '0 0 0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {role}
              </p>

              {/* Bio */}
              <p
                style={{
                  fontFamily: '"Instrument Sans", sans-serif',
                  fontSize: '0.82rem',
                  color: '#555',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .founders-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 520px) {
          .founders-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
