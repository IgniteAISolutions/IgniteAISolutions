import { Dimension, Segment, ScoreResult } from '../types';
import { 
  QUESTIONS, 
  DIMENSION_WEIGHTS, 
  DIMENSION_PRIORITY,
  SCORE_BANDS 
} from './constants';

type Answers = Record<string, number>;

// --- THIS FUNCTION WAS MISSING ---
const getScoreBand = (score: number): string => {
  for (const [band, config] of Object.entries(SCORE_BANDS)) {
    if (score >= config.range[0] && score <= config.range[1]) {
      return band;
    }
  }
  return 'Building'; 
};
// ---------------------------------

export function calculateDimensionScores(answers: Answers): Record<Dimension, number> {
  const dimensionScores: Record<Dimension, number> = {} as Record<Dimension, number>;
  Object.values(Dimension).forEach(d => dimensionScores[d] = 0);

  const dimensionQuestions: Record<Dimension, typeof QUESTIONS> = {
    [Dimension.LeadershipGravity]: [],
    [Dimension.CulturalResilience]: [],
    [Dimension.SkillVisibility]: [],
    [Dimension.ChampionDensity]: [],
    [Dimension.GovernanceConfidence]: [],
    [Dimension.CapacityDirection]: [],
  };

  QUESTIONS.forEach(q => dimensionQuestions[q.dimension].push(q));

  for (const dimension of Object.values(Dimension)) {
    const questions = dimensionQuestions[dimension];
    if (questions.length === 0) continue;

    let totalScore = 0;
    let maxPossible = 0;

    questions.forEach(q => {
      const answerScore = answers[q.id] || 0;
      totalScore += answerScore;
      const maxOption = Math.max(...q.options.map(o => o.score));
      maxPossible += maxOption;
    });

    dimensionScores[dimension] = maxPossible > 0 
      ? Math.round((totalScore / maxPossible) * 100) 
      : 0;
  }
  return dimensionScores;
}

export function calculateOverallScore(dimensionScores: Record<Dimension, number>): number {
  let weightedTotal = 0;
  let totalWeight = 0;

  for (const [dimension, weight] of Object.entries(DIMENSION_WEIGHTS)) {
    const score = dimensionScores[dimension as Dimension] || 0;
    weightedTotal += score * weight;
    totalWeight += weight;
  }
  return totalWeight > 0 ? Math.round(weightedTotal / totalWeight) : 0;
}

export function getSegment(answers: Answers): Segment {
  const q6 = QUESTIONS.find(q => q.id === 'q6');
  if (!q6) return Segment.EXPLORING;
  const score = answers['q6'];
  const selectedOption = q6.options.find(o => o.score === score);
  return selectedOption?.segment || Segment.EXPLORING;
}

export function findExtremes(dimensionScores: Record<Dimension, number>): {
  strongest: Dimension;
  weakest: Dimension;
} {
  let strongest: Dimension = DIMENSION_PRIORITY[0];
  let weakest: Dimension = DIMENSION_PRIORITY[0];
  let highestScore = -1;
  let lowestScore = 101;

  for (const dimension of DIMENSION_PRIORITY) {
    const score = dimensionScores[dimension];
    if (score > highestScore) {
      highestScore = score;
      strongest = dimension;
    }
    if (score < lowestScore) {
      lowestScore = score;
      weakest = dimension;
    }
  }
  return { strongest, weakest };
}

export function calculateScores(answers: Answers): ScoreResult {
  const dimensionScores = calculateDimensionScores(answers);
  const overallScore = calculateOverallScore(dimensionScores);
  const segment = getSegment(answers);
  const { strongest, weakest } = findExtremes(dimensionScores);
  
  // This line was failing because the function didn't exist
  const riskLevel = getScoreBand(overallScore); 

  return {
    totalPercentage: overallScore,
    totalScore: overallScore,
    dimensionScores,
    dimensionPercentages: dimensionScores,
    riskLevel,
    segment,
    strongestDimension: strongest,
    weakestDimension: weakest,
    color: overallScore >= 80 ? '#10B981' : '#F97316'
  };
}
