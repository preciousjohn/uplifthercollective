import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function scrollToCircles() {
    setMenuOpen(false);
    const doScroll = () => {
      const el = document.getElementById('circles');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };
    if (pathname === '/') {
      doScroll();
    } else {
      navigate('/');
      setTimeout(doScroll, 300);
    }
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <img src="/logo nav.svg" alt="UpliftHer" style={{ height: '22px' }} />
        </Link>

        <nav className={`navbar-links${menuOpen ? ' open' : ''}`}>
          <Link
            to="/about"
            className={`navbar-link${pathname === '/about' ? ' active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <button
            className="navbar-link"
            onClick={scrollToCircles}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            Approach
          </button>
          <Link to="/discover" className="navbar-cta" onClick={() => setMenuOpen(false)}>
            Get started
          </Link>
        </nav>

        <button
          className={`navbar-burger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
