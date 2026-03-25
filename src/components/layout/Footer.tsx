import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Footer only shows on non-landing pages (Landing has its own integrated footer)
export default function Footer() {
  const { pathname } = useLocation();
  if (pathname === '/') return null;

  return (
    <footer style={{ background: '#211008', padding: '3rem 5vw' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <img src="/upliftherlogo.svg" alt="UpliftHer" style={{ height: '20px', filter: 'brightness(0) invert(1) opacity(0.7)' }} />
        <nav style={{ display: 'flex', gap: '2rem' }}>
          {[['Home', '/'], ['Discover', '/discover'], ['Resources', '/resources']].map(([label, href]) => (
            <Link key={label} to={href} style={{ color: '#7A6050', fontSize: '0.8rem', textDecoration: 'none', fontFamily: '"Instrument Sans", sans-serif' }}>
              {label}
            </Link>
          ))}
        </nav>
        <span style={{ color: '#4A3028', fontSize: '0.72rem', fontFamily: '"Instrument Sans", sans-serif' }}>
          © 2026 UpliftCollective
        </span>
      </div>
    </footer>
  );
}
