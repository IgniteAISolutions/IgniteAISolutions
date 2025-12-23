// scoring.ts
import { Dimension, Segment, ScoreResult } from './types';
import { 
  QUESTIONS, 
  DIMENSION_WEIGHTS, 
  DIMENSION_PRIORITY,
  getScoreBand 
} from './constants';

// Answer format: Record<questionId, selectedOptionIndex>
type Answers = Record<string, number>;

/**
 * Calculate dimension scores from answers
 * Each dimension is normalised to 0-100 regardless of question count
 */
export function calculateDimensionScores(answers: Answers): Record<Dimension, number> {
  // Group questions by dimension
  const dimensionQuestions: Record<Dimension, typeof QUESTIONS> = {
    [Dimension.LeadershipGravity]: [],
    [Dimension.CulturalResilience]: [],
    [Dimension.SkillVisibility]: [],
    [Dimension.ChampionDensity]: [],
    [Dimension.GovernanceConfidence]: [],
    [Dimension.CapacityDirection]: [],
  };

  QUESTIONS.forEach(q => {
    dimensionQuestions[q.dimension].push(q);
  });

  // Calculate score for each dimension
  const dimensionScores: Record<Dimension, number> = {} as Record<Dimension, number>;

  for (const dimension of Object.values(Dimension)) {
    const questions = dimensionQuestions[dimension];
    
    if (questions.length === 0) {
      dimensionScores[dimension] = 0;
      continue;
    }

    // Sum the scores for this dimension
    let totalScore = 0;
    let maxPossible = 0;

    questions.forEach(q => {
      const answerIndex = answers[q.id];
      if (answerIndex !== undefined && q.options[answerIndex]) {
        totalScore += q.options[answerIndex].score;
      }
      // Max possible is the highest score option
      const maxOption = Math.max(...q.options.map(o => o.score));
      maxPossible += maxOption;
    });

    // Normalise to 0-100
    dimensionScores[dimension] = maxPossible > 0 
      ? Math.round((totalScore / maxPossible) * 100) 
      : 0;
  }

  return dimensionScores;
}

/**
 * Calculate weighted overall score
 */
export function calculateOverallScore(dimensionScores: Record<Dimension, number>): number {
  let weightedTotal = 0;
  let totalWeight = 0;

  for (const [dimension, weight] of Object.entries(DIMENSION_WEIGHTS)) {
    const score = dimensionScores[dimension as Dimension] || 0;
    weightedTotal += score * weight;
    totalWeight += weight;
  }

  return Math.round(weightedTotal / totalWeight);
}

/**
 * Get segment from Q6 answer
 */
export function getSegment(answers: Answers): Segment {
  const q6 = QUESTIONS.find(q => q.id === 'q6');
  if (!q6) return Segment.EXPLORING;

  const answerIndex = answers['q6'];
  if (answerIndex === undefined) return Segment.EXPLORING;

  const selectedOption = q6.options[answerIndex];
  return selectedOption?.segment || Segment.EXPLORING;
}

/**
 * Find strongest and weakest dimensions
 * Uses DIMENSION_PRIORITY for tie-breaking
 */
export function findExtremes(dimensionScores: Record<Dimension, number>): {
  strongest: Dimension;
  weakest: Dimension;
} {
  let strongest: Dimension = Dimension.LeadershipGravity;
  let weakest: Dimension = Dimension.LeadershipGravity;
  let highestScore = -1;
  let lowestScore = 101;

  // Use priority order for consistent tie-breaking
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

/**
 * Main scoring function - returns complete results
 */
export function calculateResults(answers: Answers): ScoreResult {
  const dimensionScores = calculateDimensionScores(answers);
  const overallScore = calculateOverallScore(dimensionScores);
  const segment = getSegment(answers);
  const { strongest, weakest } = findExtremes(dimensionScores);
  const riskLevel = getScoreBand(overallScore);

  return {
    totalPercentage: overallScore,
    dimensionScores,
    dimensionPercentages: dimensionScores, // Already normalised to 0-100
    riskLevel,
    segment,
    strongestDimension: strongest,
    weakestDimension: weakest,
  };
}

/**
 * Get gap between score and target (useful for UI)
 * Target is 80 (threshold for "Ready")
 */
export function calculateGaps(dimensionScores: Record<Dimension, number>): Record<Dimension, number> {
  const TARGET = 80;
  const gaps: Record<Dimension, number> = {} as Record<Dimension, number>;

  for (const dimension of Object.values(Dimension)) {
    gaps[dimension] = Math.max(0, TARGET - dimensionScores[dimension]);
  }

  return gaps;
}
