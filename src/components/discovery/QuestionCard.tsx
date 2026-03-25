import { DiscoveryQuestion } from '../../types';

interface Props {
  question: DiscoveryQuestion;
  selected: string | null;
  onSelect: (label: string) => void;
}

export default function QuestionCard({ question, selected, onSelect }: Props) {
  return (
    <div className="w-full">
      {/* Question */}
      <div className="mb-8">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-snug">
          {question.question}
        </h2>
        <p className="text-gray-500 text-base">{question.subtext}</p>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {question.options.map((option) => {
          const isSelected = selected === option.label;
          return (
            <button
              key={option.label}
              onClick={() => onSelect(option.label)}
              className={`w-full text-left px-6 py-5 rounded-2xl border-2 text-base font-medium transition-all duration-150 ${
                isSelected
                  ? 'border-gray-900 bg-gray-900 text-white shadow-lg scale-[1.01]'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:shadow-sm hover:scale-[1.005]'
              }`}
            >
              <span className={`inline-block w-5 h-5 rounded-full border-2 mr-3 align-middle transition-colors ${
                isSelected ? 'border-white bg-white' : 'border-gray-300'
              }`} />
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
