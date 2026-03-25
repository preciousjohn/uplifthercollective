import { PathwayId, ResourceType } from '../../types';
import { pathways } from '../../data/pathways';

const TYPES: { id: ResourceType; label: string }[] = [
  { id: 'program',    label: 'Program' },
  { id: 'course',     label: 'Course' },
  { id: 'mentorship', label: 'Mentorship' },
  { id: 'community',  label: 'Community' },
  { id: 'guide',      label: 'Guide' },
];

interface Props {
  activePathway: PathwayId | 'all';
  activeType: ResourceType | 'all';
  onPathwayChange: (v: PathwayId | 'all') => void;
  onTypeChange: (v: ResourceType | 'all') => void;
  count: number;
}

export default function FilterBar({ activePathway, activeType, onPathwayChange, onTypeChange, count }: Props) {
  return (
    <div className="space-y-4">
      {/* Pathway filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onPathwayChange('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
            activePathway === 'all'
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
          }`}
        >
          All
        </button>
        {pathways.map((p) => {
          const active = activePathway === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onPathwayChange(p.id)}
              className="px-4 py-2 rounded-full text-sm font-medium border-2 transition-all"
              style={
                active
                  ? { background: p.color, color: '#fff', borderColor: p.color }
                  : { background: '#fff', color: '#374151', borderColor: '#e5e7eb' }
              }
            >
              {p.emoji} {p.label}
            </button>
          );
        })}
      </div>

      {/* Type filter */}
      <div className="flex flex-wrap gap-2 items-center">
        <button
          onClick={() => onTypeChange('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            activeType === 'all'
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
          }`}
        >
          All types
        </button>
        {TYPES.map(({ id, label }) => {
          const active = activeType === id;
          return (
            <button
              key={id}
              onClick={() => onTypeChange(id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                active
                  ? 'bg-gray-800 text-white border-gray-800'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
              }`}
            >
              {label}
            </button>
          );
        })}

        <span className="ml-auto text-xs text-gray-400 font-medium">
          {count} result{count !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
}
