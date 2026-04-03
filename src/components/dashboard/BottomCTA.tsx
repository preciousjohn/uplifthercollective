import { Link } from 'react-router-dom';
import { PathwayId } from '../../types';
import { pathwayMap } from '../../data/pathways';

interface Props {
  onRetake: () => void;
  topPathways: PathwayId[];
}

export default function BottomCTA({ topPathways }: Props) {
  const topColor = pathwayMap[topPathways[0]]?.color ?? '#6C5CE7';

  return (
    <section
      style={{
        borderTop: '1.5px solid #E8E4E0',
        paddingTop: '3rem',
        paddingBottom: '5rem',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Link
        to="/resources"
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 600,
          fontSize: '1rem',
          background: topColor,
          color: '#fff',
          padding: '0.85rem 2.2rem',
          borderRadius: '999px',
          textDecoration: 'none',
          transition: 'opacity 0.2s ease',
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.85')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
      >
        Explore my World
      </Link>
    </section>
  );
}
