import { useState } from 'react';
import { questions } from '../data/questions';
import { UserAnswers, RecommendationResult, Resource } from '../types';
import { getPersonalizedGuidance } from '../lib/anthropic';
import { fetchAllResources } from '../lib/queries';
import { isSupabaseConfigured } from '../lib/supabase';
import ProgressBar from '../components/discovery/ProgressBar';
import QuestionCard from '../components/discovery/QuestionCard';
import LoadingState from '../components/discovery/LoadingState';
import ResultsView from '../components/discovery/ResultsView';

type Stage = 'quiz' | 'loading' | 'results';

export default function Discovery() {
  const [stage, setStage] = useState<Stage>('quiz');
  const [step, setStep]   = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [result, setResult]   = useState<RecommendationResult | null>(null);
  const [resourceMap, setResourceMap] = useState<Record<string, Resource>>({});
  const [error, setError] = useState<string | null>(null);

  const question = questions[step];
  const selected = answers[question.id] ?? null;
  const isLast   = step === questions.length - 1;

  function handleSelect(label: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: label }));
  }

  function handleBack() {
    if (step > 0) setStep((s) => s - 1);
  }

  async function handleNext() {
    if (!selected) return;

    if (!isLast) {
      setStep((s) => s + 1);
      return;
    }

    // Final step — call Anthropic
    if (!isSupabaseConfigured) {
      setError('Connect Supabase first: add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file and seed the resources table.');
      return;
    }

    setStage('loading');
    setError(null);

    try {
      const resources = await fetchAllResources();
      const map = Object.fromEntries(resources.map((r) => [r.id, r]));
      setResourceMap(map);

      const guidance = await getPersonalizedGuidance(answers, resources);
      setResult(guidance);
      setStage('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStage('quiz');
    }
  }

  function handleRetake() {
    setStage('quiz');
    setStep(0);
    setAnswers({});
    setResult(null);
    setError(null);
  }

  if (stage === 'loading') return <LoadingState />;

  if (stage === 'results' && result) {
    return (
      <ResultsView
        result={result}
        resourceMap={resourceMap}
        onRetake={handleRetake}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top gradient strip */}
      <div
        className="h-1.5 w-full"
        style={{ background: 'linear-gradient(90deg, #6C5CE7, #E17055, #FDCB6E)' }}
      />

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Progress */}
        <div className="mb-10">
          <ProgressBar current={step + 1} total={questions.length} />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-5 py-4 text-sm">
            <strong>Oops:</strong> {error}
          </div>
        )}

        {/* Question */}
        <div className="mb-10">
          <QuestionCard
            question={question}
            selected={selected}
            onSelect={handleSelect}
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className="text-sm font-medium text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Back
          </button>

          <button
            onClick={handleNext}
            disabled={!selected}
            className="bg-gray-900 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-base"
          >
            {isLast ? 'Show my results ✦' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}
