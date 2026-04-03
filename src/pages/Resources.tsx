import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PathwayId, Resource, ResourceType } from '../types';
import { fetchAllResources } from '../lib/queries';
import { isSupabaseConfigured } from '../lib/supabase';
import DashboardNav from '../components/dashboard/DashboardNav';
import ResourceCard from '../components/resources/ResourceCard';
import FilterBar from '../components/resources/FilterBar';

const VALID_PATHWAYS: PathwayId[] = ['tech', 'business', 'creative', 'health', 'social'];

export default function Resources() {
  const [searchParams] = useSearchParams();
  const paramPathway = searchParams.get('pathway') as PathwayId | null;

  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);

  const [activePathway, setActivePathway] = useState<PathwayId | 'all'>(
    paramPathway && VALID_PATHWAYS.includes(paramPathway) ? paramPathway : 'all'
  );
  const [activeType, setActiveType] = useState<ResourceType | 'all'>('all');

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setError('supabase-not-configured');
      setLoading(false);
      return;
    }
    fetchAllResources()
      .then(setResources)
      .catch((err) => setError(err.message ?? 'Failed to load resources.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchPathway = activePathway === 'all' || r.pathway === activePathway;
      const matchType    = activeType === 'all'    || r.type === activeType;
      return matchPathway && matchType;
    });
  }, [resources, activePathway, activeType]);

  const firstName = localStorage.getItem('uhc_first_name') ?? '';

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh' }}>
      <DashboardNav firstName={firstName} showBack />
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          {(() => {
            const name = localStorage.getItem('uhc_first_name');
            return name ? `Your space, ${name}` : 'Your space';
          })()}
        </h1>
      </div>

      {/* Filters */}
      <div className="mb-10">
        <FilterBar
          activePathway={activePathway}
          activeType={activeType}
          onPathwayChange={setActivePathway}
          onTypeChange={setActiveType}
          count={filtered.length}
        />
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-2xl h-56 animate-pulse" />
          ))}
        </div>
      )}

      {/* Not configured */}
      {error === 'supabase-not-configured' && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-8 text-center">
          <p className="text-2xl mb-3">🔧</p>
          <p className="font-display font-bold text-gray-900 mb-2">Supabase not connected yet</p>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Add your <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">VITE_SUPABASE_URL</code> and{' '}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">VITE_SUPABASE_ANON_KEY</code> to your{' '}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">.env</code> file, then run the SQL seed to populate resources.
          </p>
        </div>
      )}

      {/* Error */}
      {error && error !== 'supabase-not-configured' && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl px-6 py-5 text-sm">
          <strong>Couldn't load resources:</strong> {error}
        </div>
      )}

      {/* Grid */}
      {!loading && !error && filtered.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🔍</p>
          <p className="font-display text-xl font-bold text-gray-900 mb-2">
            Nothing here yet for that combo.
          </p>
          <p className="text-gray-500">
            Try adjusting your filters — or tell us what's missing.
          </p>
          <button
            onClick={() => { setActivePathway('all'); setActiveType('all'); }}
            className="mt-6 text-sm font-semibold underline"
            style={{ color: '#6C5CE7' }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
    </div>
  );
}
