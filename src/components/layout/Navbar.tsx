import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: 'About', href: '/#about' },
    { label: 'Approach', href: '/#approach' },
    { label: 'Resources', href: '/resources' },
  ];

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src="/logo nav.svg" alt="UpliftHer" style={{ height: '22px' }} />
        </Link>

        {/* Nav links (desktop always visible; mobile toggles via .open) */}
        <nav className={`navbar-links${menuOpen ? ' open' : ''}`}>
          {links.map(({ label, href }) => (
            <Link
              key={label}
              to={href}
              className={`navbar-link${pathname === href ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link to="/discover" className="navbar-cta" onClick={() => setMenuOpen(false)}>
            Get started
          </Link>
        </nav>

        {/* Hamburger button — hidden on desktop, visible on mobile via CSS */}
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
