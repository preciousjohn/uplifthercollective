import { questions } from '../data/questions';
import { PathwayId, UserAnswers, PathwayScore } from '../types';

export function calculatePathwayScores(answers: UserAnswers): PathwayScore[] {
  const scores: Record<PathwayId, number> = {
    tech: 0,
    business: 0,
    creative: 0,
    health: 0,
    social: 0,
  };

  for (const question of questions) {
    const selectedLabel = answers[question.id];
    if (!selectedLabel) continue;
    const option = question.options.find((o) => o.label === selectedLabel);
    if (!option) continue;
    for (const pathway of option.pathways) {
      scores[pathway] += 1;
    }
  }

  return (Object.entries(scores) as [PathwayId, number][])
    .sort((a, b) => b[1] - a[1])
    .map(([id, score], index) => ({ id, score, rank: index + 1 }));
}
