import { Link } from 'react-router-dom';
import { RecommendationResult, Resource } from '../../types';
import { pathwayMap } from '../../data/pathways';

interface Props {
  result: RecommendationResult;
  resourceMap: Record<string, Resource>;
  onRetake: () => void;
}

export default function ResultsView({ result, resourceMap, onRetake }: Props) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <span
          className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4"
          style={{ background: '#f3f0ff', color: '#6C5CE7' }}
        >
          Your results
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Here's what we see.
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
          This isn't a personality test result. It's a starting point — built around what you actually said, not what an algorithm guessed.
        </p>
      </div>

      {/* Claude's personal message */}
      {result.message && (
        <div
          className="rounded-2xl p-6 mb-12 border"
          style={{ background: '#fafaf9', borderColor: '#e5e7eb' }}
        >
          <p className="text-gray-700 text-base leading-relaxed italic">"{result.message}"</p>
        </div>
      )}

      {/* Pathways */}
      <section className="mb-14">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Your pathways</h2>
        <div className="space-y-6">
          {result.pathways.map((pw) => {
            const meta = Object.values(pathwayMap).find((p) =>
              pw.headline.toLowerCase().includes(p.label.toLowerCase()) ||
              pw.id.includes(p.id)
            );
            return (
              <div
                key={pw.id}
                className="rounded-2xl border p-6 hover:shadow-md transition-shadow"
                style={{
                  borderColor: meta?.color ? meta.color + '40' : '#e5e7eb',
                  background: meta?.color ? meta.color + '08' : '#fafaf9',
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  {meta && <span className="text-2xl">{meta.emoji}</span>}
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full"
                    style={{
                      color: meta?.color ?? '#6C5CE7',
                      background: meta?.color ? meta.color + '20' : '#f3f0ff',
                    }}
                  >
                    #{pw.rank} Match
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-3 leading-snug">
                  {pw.headline}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{pw.explainer}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Resource recommendations */}
      {result.recommendations.length > 0 && (
        <section className="mb-14">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">
            Resources picked for you
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Not a generic list — each one was chosen based on what you said.
          </p>
          <div className="space-y-4">
            {result.recommendations.map((rec) => {
              const resource = resourceMap[rec.resource_id];
              if (!resource) return null;
              const pathway = pathwayMap[resource.pathway];
              return (
                <div
                  key={rec.resource_id}
                  className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{
                        color: pathway?.color ?? '#6C5CE7',
                        background: pathway?.color ? pathway.color + '20' : '#f3f0ff',
                      }}
                    >
                      {pathway?.emoji} {pathway?.label ?? resource.pathway}
                    </span>
                    <span className="text-xs text-gray-400 capitalize bg-gray-100 px-2.5 py-1 rounded-full">
                      {resource.type}
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                      {resource.cost}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-gray-900 mb-1">
                    {resource.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{resource.description}</p>

                  <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                        Why this is for you
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed">{rec.reason}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                        What to expect
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed">{rec.what_to_expect}</p>
                    </div>
                  </div>

                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-80"
                    style={{ color: pathway?.color ?? '#6C5CE7' }}
                  >
                    Visit {resource.title} →
                  </a>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
        <Link
          to="/resources"
          className="flex-1 text-center bg-gray-900 text-white font-semibold px-6 py-4 rounded-full hover:bg-gray-800 transition-colors"
        >
          Show me everything →
        </Link>
        <button
          onClick={onRetake}
          className="flex-1 text-center border-2 border-gray-200 text-gray-600 font-semibold px-6 py-4 rounded-full hover:border-gray-400 transition-colors"
        >
          That's not me — let me try again
        </button>
      </div>
    </div>
  );
}
