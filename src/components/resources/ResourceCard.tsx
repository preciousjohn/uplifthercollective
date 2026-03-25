import { Resource } from '../../types';
import { pathwayMap } from '../../data/pathways';

interface Props {
  resource: Resource;
}

const TYPE_LABELS: Record<string, string> = {
  program:    'Program',
  course:     'Course',
  mentorship: 'Mentorship',
  community:  'Community',
  guide:      'Guide',
};

export default function ResourceCard({ resource }: Props) {
  const pathway = pathwayMap[resource.pathway];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      {/* Top badges */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-full"
          style={{
            color: pathway?.color ?? '#6C5CE7',
            background: pathway?.color ? pathway.color + '18' : '#f3f0ff',
          }}
        >
          {pathway?.emoji} {pathway?.label ?? resource.pathway}
        </span>
        <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full capitalize">
          {TYPE_LABELS[resource.type] ?? resource.type}
        </span>
        <span className="ml-auto text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
          {resource.cost}
        </span>
      </div>

      {/* Title + description */}
      <h3 className="font-display font-bold text-gray-900 text-base mb-2 leading-snug">
        {resource.title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">
        {resource.description}
      </p>

      {/* Tags */}
      {resource.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {resource.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="text-xs bg-gray-50 text-gray-400 px-2 py-0.5 rounded-full border border-gray-100">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm font-semibold mt-auto hover:opacity-75 transition-opacity"
        style={{ color: pathway?.color ?? '#6C5CE7' }}
      >
        Visit {resource.title}
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
}
