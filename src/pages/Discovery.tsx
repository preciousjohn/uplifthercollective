import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';
import { UserAnswers } from '../types';
import { calculatePathwayScores } from '../lib/matching';
import { saveSignup } from '../lib/queries';
import ProgressBar from '../components/discovery/ProgressBar';
import QuestionCard from '../components/discovery/QuestionCard';

type Stage = 'intro' | 'quiz';

export default function Discovery() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>('intro');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});

  const question = questions[step];
  const selected = answers[question.id] ?? null;
  const isLast = step === questions.length - 1;

  function handleSelect(label: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: label }));
  }

  function handleBack() {
    if (step > 0) setStep((s) => s - 1);
    else setStage('intro');
  }

  function handleNext() {
    if (!selected) return;
    if (!isLast) {
      setStep((s) => s + 1);
      return;
    }
    const finalAnswers = { ...answers, [question.id]: selected };
    const topPathway = calculatePathwayScores(finalAnswers)[0]?.id;

    localStorage.setItem('uhc_first_name', firstName);

    // Fire-and-forget — save signup to Supabase without blocking navigation
    saveSignup({ firstName, lastName, email, topPathway });

    navigate('/dashboard', {
      state: { answers: finalAnswers, firstName, lastName, email },
    });
  }

  if (stage === 'intro') {
    const canContinue = firstName.trim() && lastName.trim() && email.trim();
    return (
      <div className="min-h-screen bg-white">
        <div
          className="h-1.5 w-full"
          style={{ background: 'linear-gradient(90deg, #6C5CE7, #E17055, #FDCB6E)' }}
        />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="mb-10">
            <h1
              style={{
                fontFamily: '"Bricolage Grotesque", sans-serif',
                fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
                fontWeight: 700,
                color: '#111',
                marginBottom: '0.5rem',
                lineHeight: 1.2,
              }}
            >
              Before we start
            </h1>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.95rem', color: '#777', margin: 0 }}>
              Tell us a bit about yourself — your results will be personalised to you.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', fontWeight: 600, color: '#444' }}>
                  First name
                </span>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Amara"
                  style={inputStyle}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', fontWeight: 600, color: '#444' }}>
                  Last name
                </span>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Osei"
                  style={inputStyle}
                />
              </label>
            </div>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', fontWeight: 600, color: '#444' }}>
                Email address
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={inputStyle}
              />
            </label>
          </div>

          <div className="flex items-center justify-end">
            <button
              onClick={() => setStage('quiz')}
              disabled={!canContinue}
              className="bg-gray-900 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-base"
            >
              Let's go →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div
        className="h-1.5 w-full"
        style={{ background: 'linear-gradient(90deg, #6C5CE7, #E17055, #FDCB6E)' }}
      />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-10">
          <ProgressBar current={step + 1} total={questions.length} />
        </div>
        <div className="mb-10">
          <QuestionCard question={question} selected={selected} onSelect={handleSelect} />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="text-sm font-medium text-gray-400 hover:text-gray-700 transition-colors"
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

const inputStyle: React.CSSProperties = {
  fontFamily: '"DM Sans", sans-serif',
  fontSize: '0.95rem',
  color: '#111',
  border: '1.5px solid #D8D3CE',
  borderRadius: '10px',
  padding: '0.7rem 0.9rem',
  outline: 'none',
  background: '#FAFAFA',
  width: '100%',
  boxSizing: 'border-box',
};
