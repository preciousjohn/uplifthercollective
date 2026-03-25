import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: '#F2EDE6',
        borderBottom: '1px solid #E4DDD5',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 5vw',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img src="/logo nav.svg" alt="UpliftHer" style={{ height: '22px' }} />
        </Link>

        {/* Nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {[
            { label: 'About', href: '/#about' },
            { label: 'Approach', href: '/#approach' },
            { label: 'Resources', href: '/resources' },
          ].map(({ label, href }) => (
            <Link
              key={label}
              to={href}
              style={{
                fontSize: '0.82rem',
                fontWeight: 500,
                color: '#3A2A20',
                textDecoration: 'none',
                fontFamily: '"Instrument Sans", sans-serif',
                opacity: pathname === href ? 1 : 0.7,
              }}
            >
              {label}
            </Link>
          ))}

          <Link
            to="/discover"
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#F2EDE6',
              background: '#211008',
              padding: '0.45rem 1.1rem',
              borderRadius: '999px',
              textDecoration: 'none',
              fontFamily: '"Instrument Sans", sans-serif',
            }}
          >
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
}
