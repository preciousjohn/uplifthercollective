import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Landing.css';

// ─── Design tokens ────────────────────────────────────────────────────────────
const CORAL      = '#FD8852';
const CREAM      = '#F2EDE6';
const DARK_BROWN = '#3C1B0C';
const WARM_GREY  = '#EAE3DA';

const h1 = (extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"Archivo Narrow", sans-serif',
  fontWeight: 800,
  lineHeight: 0.88,
  color: CORAL,
  margin: 0,
  ...extra,
});

const bodyText: React.CSSProperties = {
  fontFamily: '"Instrument Sans", sans-serif',
  fontSize: '0.88rem',
  lineHeight: 1.75,
  color: '#6B5A50',
};

const pill = (bg = DARK_BROWN): React.CSSProperties => ({
  display: 'inline-block',
  background: bg,
  color: '#F2EDE6',
  padding: '0.5rem 1.2rem',
  borderRadius: '999px',
  fontSize: '0.8rem',
  fontWeight: 600,
  textDecoration: 'none',
  fontFamily: '"Instrument Sans", sans-serif',
});

// ─── Data ─────────────────────────────────────────────────────────────────────
const CHARACTERS = [
  { label: 'Founder',      src: '/founder.svg' },
  { label: 'Board Leader', src: '/board.svg' },
  { label: 'Engineer',     src: '/engineer.svg' },
  { label: 'Filmmaker',    src: '/filmaker.svg' },
  { label: 'Researcher',   src: '/researcher.svg' },
];

const FEATURES = [
  {
    icon: '/icons/mdi_shape.svg',
    title: 'Discover',
    desc: 'We get to know you better. A reflection designed to surface what moves you and open doors .',
  },
  {
    icon: '/icons/gg_shape-hexagon.svg',
    title: 'AI Matching',
    desc: 'Personalised matching to tools, resources or funding opportunities. We take you a step ahead.',
  },
  {
    icon: '/icons/streamline_spiral-shape-solid.svg',
    title: 'Access',
    desc: "Expert guides, career roadmaps, toolkits built for girls interest in specific industries or roles",
  },
];

// Image filenames for the "Built for the ambitious" collage
const AMB = (name: string) => `/ambitious section/${name}`;

const COUNTRY_MAP: Record<string, string | null> = {
  India:   '/Countries/india.json',
  Rwanda:  '/Countries/rwanda.json',
  Nigeria: '/Countries/nigeria.json',
  Spain:   null,
};

export default function Landing() {
  const [selectedCountry, setSelectedCountry] = useState('India');
  return (
    <div style={{ background: CREAM, overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════════════
          1. HERO — huge headline with image between lines
      ══════════════════════════════════════════════════ */}
      <section style={{ background: CREAM, padding: '2.5rem 5vw 0' }}>

        {/* Giant headline — line 1 */}
        <h1
          style={h1({ fontSize: 'clamp(80px, 15vw, 220px)', textAlign: 'center', position: 'relative', zIndex: 1 })}
        >
          Give her a
        </h1>

        {/* Hero image sits between the two headline lines */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '-3vw 0 -6vw',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <img
            src="/heroimg.png"
            alt="UpliftHer community"
            style={{
              width: 'clamp(260px, 50%, 780px)',
              height: 'auto',
              objectFit: 'cover',
              display: 'block',
              borderRadius: '6px',
            }}
          />
        </div>

        {/* Giant headline — line 2 */}
        <h1
          style={h1({ fontSize: 'clamp(80px, 15vw, 260px)', textAlign: 'center', position: 'relative', zIndex: 3 })}
        >
          shot
        </h1>

        {/* ── Two-column body copy ─────────────────────────────── */}
        <div
          className="hero-copy"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(2rem, 5vw, 5rem)',
            alignItems: 'start',
            padding: '6rem 0 8rem',
            marginTop: '2.5rem',
          }}
        >
          <p
            style={{
              fontFamily: '"Instrument Serif", serif',
              fontSize: 'clamp(17px, 1.6vw, 26px)',
              lineHeight: 1.35,
              color: '#2A1A12',
              margin: 0,
            }}
          >
            The future of work is changing and in most part of the world, young women still
            don't have the resources or guidance for this global shift.
          </p>

          <div>
            <p style={{ ...bodyText, marginBottom: '1.5rem' }}>
              7 in 10 of the most requested skills in today's job market are durable skills: the ability
              to learn fast, solve complex problems, collaborate across cultures, communicate ideas etc.
              But most girls in underserved communities are not prepared for this future. We built
              AI-powered tools that match each girl to the career pathways and resources to explore and
              find what's next for her with limitless possibilities.
            </p>
            <Link to="/discover" style={pill()}>Get started</Link>
          </div>
        </div>

        {/* ── Character illustrations ──────────────────────────── */}
        <div
          className="char-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '0',
          }}
        >
          {CHARACTERS.map(({ label, src }, i) => (
            <div
              key={label}
              style={{
                padding: '2rem 1rem 1.5rem',
                borderLeft: i > 0 ? '1px solid #DDD5CA' : 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <p style={{ fontSize: '18px', color: '#7A6A60', marginBottom: '0.75rem', marginTop: 0, fontWeight: 500, letterSpacing: '0.02em' }}>
                {label}
              </p>
              <img
                src={src}
                alt={label}
                style={{ width: '100%', maxWidth: '180px', height: '380px', objectFit: 'contain', display: 'block' }}
              />
            </div>
          ))}
        </div>

        {/* ── Supported by ────────────────────────────────────── */}
        <div
          style={{

            padding: '4.5rem 0 4.5rem',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B0A090', marginBottom: '2rem' }}>
            Supported by
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3.5rem', flexWrap: 'wrap' }}>
            <img src="/womendior.svg" alt="Women@Dior" style={{ height: '32px'}} />
            <img src="/unesco.svg" alt="UNESCO" style={{ height: '32px'}} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. FEATURES — dark brown section
      ══════════════════════════════════════════════════ */}
      <section className="features-section" style={{ background: DARK_BROWN, padding: '120px 5vw' }}>
        <div
          className="features-grid"
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
          }}
        >
          {FEATURES.map(({ icon, title, desc }) => (
            <div key={title} style={{ textAlign: 'center' }}>
              <img
                src={icon}
                alt={title}
                style={{ width: '80px', height: '80px', margin: '0 auto 1.25rem' }}
              />
              <h3
                style={{
                  fontFamily: '"Archivo Narrow", sans-serif',
                  fontSize: '26px',
                  fontWeight: 700,
                  color: '#FFDBBB',
                  marginBottom: '0.75rem',
                }}
              >
                {title}
              </h3>
              <p style={{ ...bodyText, color: '#FFDBBB', fontSize: '16px' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. GLOBAL COMMUNITY
      ══════════════════════════════════════════════════ */}
      <section style={{ background: '#E9F1F7', padding: '6rem 5vw' }}>
        <div
          className="community-grid"
          style={{
            maxWidth: '1800px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(2rem, 5vw, 5rem)',
            alignItems: 'center',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: '"Instrument Serif", serif',
                fontSize: 'clamp(20px, 2.4vw, 38px)',
                lineHeight: 1.3,
                marginBottom: '2.5rem',
              }}
            >
              We, young people, have the world in our hands. With the right mindset and access,
              a global community where girls in Kigali and girls in Birmingham are working on
              the same project, sharpening the same skills, holding each other accountable
            </p>
            <Link to="/discover" style={pill()}>Get started</Link>
          </div>

          <div
            style={{
              borderRadius: '12px',
              overflow: 'hidden',
              height: 'clamp(280px, 32vw, 500px)',
            }}
          >
            <img
              src="/teens.png"
              alt="Girls collaborating"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. COMMUNICATION QUOTE
      ══════════════════════════════════════════════════ */}
      <section
        style={{
          background: CREAM,
          padding: '6rem 5vw',
          borderTop: '1px solid #DDD5CA',
          borderBottom: '1px solid #DDD5CA',
        }}
      >
        <p
          style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: 'clamp(22px, 3.2vw, 52px)',
            lineHeight: 1.2,
            color: '#1A1A1A',
            maxWidth: '820px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          Your ideas are only worth as much as how well you can communicate them. We make sure
          every girl can.
        </p>
      </section>

      {/* ══════════════════════════════════════════════════
          5. CIRCLES & TOOLS
      ══════════════════════════════════════════════════ */}
      <section style={{ background: CREAM, padding: '0 5vw' }}>
        <div>

          {/* Circles row */}
          <div
            className="circles-row"
            style={{
              display: 'grid',
              gridTemplateColumns: '400px 1fr',
              gap: '8rem',
              padding: '3.5rem 0',
              borderBottom: '1px solid #DDD5CA',
              alignItems: 'start',
            }}
          >
            <h3
              style={{
                fontFamily: '"Archivo Narrow", sans-serif',
                fontSize: '44px',
                fontWeight: 700,
                color: '#3C1B0C',
                margin: 0,
                paddingTop: '3px',
              }}
            >
              Circles
            </h3>
            <div>
              <p
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  fontSize: '32px',
                  lineHeight: 1.4,
                  color: '#3C1B0C',
                  marginBottom: '0.75rem',
                }}
              >
                The rooms she was never invited into? We're building new ones
              </p>
              <p style={{ ...bodyText, fontSize: '16px' }}>
                Peer circles that connect them across countries to work on real projects, sharpen
                real skills, and hold each other accountable. Advisory circles that put youth voices
                in front of global companies making decisions about their future.
              </p>
            </div>
          </div>

          {/* Tools row */}
          <div
            className="tools-row"
            style={{
              display: 'grid',
              gridTemplateColumns: '400px 1fr',
              gap: '8rem',
              padding: '3.5rem 0',
              alignItems: 'start',
            }}
          >
            <h3
              style={{
                fontFamily: '"Archivo Narrow", sans-serif',
                fontSize: '44px',
                fontWeight: 700,
                color: '#3C1B0C',
                margin: 0,
                paddingTop: '3px',
              }}
            >
              Tools
            </h3>
            <div>
              <p
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  fontSize: '32px',
                  lineHeight: 1.4,
                  color: '#3C1B0C',
                  marginBottom: '0.75rem',
                }}
              >
                There are numerous resources online. We give girls access to the ones specifically
                for her current stage &amp; goals
              </p>
              <p style={{ ...bodyText, fontSize: '16px' }}>
                AI-powered matching that connects each girl to career pathways. While we also
                connect them to skill-building tracks, global programs, and advisory boards that
                connect young people inside global companies to shape decision making, office
                culture, and strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6. BUILT FOR THE AMBITIOUS — photo/text collage
      ══════════════════════════════════════════════════ */}
      <section className="ambitious-section" style={{ background: CREAM, gap: '3px', display: 'flex', flexDirection: 'column', padding: '120px'}}>
        {/* Row 1 */}
        <div className="ambitious-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '3px' }}>
          <img src={AMB('Rectangle 11.png')} alt="" style={imgCell()} />
          <div style={textCell()}>
            <span style={bigWord(DARK_BROWN)}>Built</span>
          </div>
          <img src={AMB('Rectangle 12.png')} alt="" style={imgCell()} />
          <img src={AMB('Rectangle 13.png')} alt="" style={imgCell()} />
        </div>

        {/* Row 2 */}
        <div className="ambitious-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '3px' }}>
          <img src={AMB('rec001.png')} alt="" style={imgCell()} />
          <img src={AMB('rec002.png')} alt="" style={imgCell()} />
          <div style={textCell()}>
            <span style={bigWord(DARK_BROWN)}>for</span>
          </div>
          <img src={AMB('Rectangle 20.png')} alt="" style={imgCell()} />
        </div>

        {/* Row 3 */}
        <div className="ambitious-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '3px' }}>
          <img src={AMB('Rectangle 23-1.png')} alt="" style={imgCell()} />
          <div style={textCell()}>
            <span style={bigWord(DARK_BROWN)}>the</span>
          </div>
          <img src={AMB('Rectangle 22.png')} alt="" style={imgCell()} />
          <img src={AMB('Rectangle 22-1.png')} alt="" style={imgCell()} />
        </div>

        {/* Row 4 */}
        <div className="ambitious-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '3px' }}>
          <img src={AMB('Rectangle 23.png')} alt="" style={imgCell()} />
          <img src={AMB('Rectangle 25.png')} alt="" style={imgCell()} />
          <div style={textCell()}>
            <span style={bigWord(DARK_BROWN)}>ambitious</span>
          </div>
          <img src={AMB('Rectangle 26.png')} alt="" style={imgCell()} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          7. WORLD / GLOBAL SECTION
      ══════════════════════════════════════════════════ */}
      <section style={{ background: '#0E3626', overflow: 'hidden' }}>
        <div className="world-grid" style={{ display: 'grid', gridTemplateColumns: '40% 35% 25%', minHeight: '520px', alignItems: 'center' }}>

          {/* Left — headline + body */}
          <div className="world-left" style={{ padding: '5rem 4rem 5rem 5vw' }}>
            <h2
              style={{
                fontFamily: '"Instrument Serif", serif',
                fontSize: 'clamp(26px, 3.2vw, 52px)',
                fontWeight: 400,
                color: '#FFDBBB',
                lineHeight: 1.2,
                marginBottom: '1.5rem',
              }}
            >
              Before we can change the world, we need to have each other's backs first.
            </h2>
            <p style={{ fontFamily: '"Instrument Sans", sans-serif', fontSize: '16px', lineHeight: 1.7, color: '#FFDBBB', opacity: 0.7, margin: 0 }}>
              We do this by supporting girls in underserved communities by building leadership,
              creating opportunities and organising of multiracial, working-class communities
              through deep and sustained funding
            </p>
          </div>

          {/* Center — line-art map (single selected country, large) */}
          <div className="world-map" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '640px', padding: '0' }}>
            {COUNTRY_MAP[selectedCountry] && (
              <CountryMap
                src={COUNTRY_MAP[selectedCountry]!}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            )}
          </div>

          {/* Right — country index */}
          <div className="world-countries" style={{ padding: '5rem 5vw 5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <div className="world-countries-inner" style={{ position: 'relative' }}>
              {/* Vertical line */}
              <div className="world-countries-line" style={{ position: 'absolute', right: '-20px', top: 0, bottom: 0, width: '1px', background: '#FFDBBB', opacity: 0.50 }} />
              <div className="world-countries-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {['India', 'Rwanda', 'Nigeria', 'Spain'].map((country) => {
                  const active = country === selectedCountry;
                  return (
                    <div
                      key={country}
                      onClick={() => setSelectedCountry(country)}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem', cursor: 'pointer' }}
                    >
                      <span
                        style={{
                          fontFamily: '"Instrument Serif", serif',
                          fontSize: active ? 'clamp(22px, 2.4vw, 36px)' : 'clamp(16px, 1.8vw, 26px)',
                          color: '#FFDBBB',
                          opacity: active ? 1 : 0.45,
                          lineHeight: 1,
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {country}
                      </span>
                      {/* Tick */}
                      <div style={{ width: '16px', height: '1px', background: '#FFDBBB', opacity: active ? 0.8 : 0.3, flexShrink: 0 }} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ══════════════════════════════════════════════════
          8. FOOTER
      ══════════════════════════════════════════════════ */}
      <footer style={{ background: CREAM, paddingTop: '5rem', position: 'relative', overflow: 'hidden' }}>
        {/* Top row nav */}
        <div
          className="footer-nav"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            alignItems: 'center',
            padding: '0 5vw 4rem',
          }}
        >
          <span style={{ fontFamily: '"Archivo Narrow", sans-serif', fontSize: '16px', color: DARK_BROWN }}>
            © {new Date().getFullYear()}
          </span>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.6rem' }}>
            {['Home', 'About', 'Approach'].map((label, i) => (
              <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Link to={i === 0 ? '/' : `/#${label.toLowerCase()}`} style={{ fontFamily: '"Archivo Narrow", sans-serif', fontSize: '16px', fontWeight: 400, color: DARK_BROWN, textDecoration: 'none' }}>
                  {label}
                </Link>
                {i < 2 && <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#8B6A50', display: 'inline-block' }} />}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <img src="/logo nav.svg" alt="UpliftHer" style={{ height: '28px' }} />
          </div>
        </div>

        {/* Decorative shapes — tops only, cropped by overflow hidden */}
        <div className="footer-shapes" style={{ display: 'flex', alignItems: 'flex-start', height: '120px', overflow: 'hidden' }}>
          {/* Shape 1 — rounded-top rectangle */}
          <div style={{
            flex: '0 0 38%',
            height: '260px',
            background: '#FD8852',
            borderRadius: '100px 100px 0 0',
            flexShrink: 0,
          }} />
          {/* Shape 2 — dark rectangle */}
          <div style={{
            flex: '0 0 28%',
            height: '240px',
            background: '#3C1B0C',
            borderRadius: '10px 10px 0 0',
            flexShrink: 0,
          }} />
          {/* Shape 3 — circle: large enough that curvature fills width, negative margin closes gap */}
          <div style={{
            flex: '0 0 calc(34% + 40px)',
            marginLeft: '-40px',
            height: '34vw',
            background: '#FF663D',
            borderRadius: '50%',
            flexShrink: 0,
          }} />
        </div>
      </footer>
    </div>
  );
}

// ─── World section map component ─────────────────────────────────────────────
type PathData = { d: string; stroke: string; strokeWidth: string };
type CountryJson = { viewBox: string; paths: PathData[] };

function CountryMap({ src, style }: { src: string; style?: React.CSSProperties }) {
  const [data, setData] = useState<CountryJson | null>(null);
  useEffect(() => { fetch(src).then(r => r.json()).then(setData); }, [src]);
  if (!data) return null;
  return (
    <svg viewBox={data.viewBox} style={{ fill: 'none', overflow: 'visible', ...style }}>
      {data.paths.map((p, i) => (
        <path key={i} d={p.d} stroke="#FFDBBB" strokeWidth="1.2" fill="none" />
      ))}
    </svg>
  );
}

// ─── Helpers for the ambitious collage ───────────────────────────────────────
function imgCell(): React.CSSProperties {
  return {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    display: 'block',
    borderRadius: '10px',
  };
}

function textCell(bg = 'transparent'): React.CSSProperties {
  return {
    background: bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '160px',
    padding: '1rem',
    borderRadius: '10px',
  };
}

function bigWord(color: string): React.CSSProperties {
  return {
    fontFamily: '"Archivo Narrow", sans-serif',
    fontWeight: 800,
    fontSize: 'clamp(44px, 8vw, 130px)',
    color,
    lineHeight: 0.9,
    letterSpacing: '-0.01em',
  };
}
