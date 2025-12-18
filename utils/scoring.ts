import { Dimension, Question, ScoreResult } from '../types';
import { QUESTIONS } from '../constants';

export const calculateScores = (answers: Record<string, number>): ScoreResult => {
  const dimensionScores: Record<Dimension, number> = {
    [Dimension.StrategyAlignment]: 0,
    [Dimension.LeadershipBuyIn]: 0,
    [Dimension.CulturalReadiness]: 0,
    [Dimension.DataFoundation]: 0,
    [Dimension.SkillsCapability]: 0,
    [Dimension.GovernanceEthics]: 0,
  };

  // 1. Sum raw scores
  Object.entries(answers).forEach(([questionId, score]) => {
    const question = QUESTIONS.find((q) => q.id === questionId);
    if (question) {
      dimensionScores[question.dimension] += score;
    }
  });

  // 2. Convert to percentages
  // Each dimension has a max score of 50 based on the question set provided.
  const MAX_DIMENSION_SCORE = 50;
  
  const dimensionPercentages: Record<Dimension, number> = {
    [Dimension.StrategyAlignment]: 0,
    [Dimension.LeadershipBuyIn]: 0,
    [Dimension.CulturalReadiness]: 0,
    [Dimension.DataFoundation]: 0,
    [Dimension.SkillsCapability]: 0,
    [Dimension.GovernanceEthics]: 0,
  };

  let totalScore = 0;

  Object.entries(dimensionScores).forEach(([key, value]) => {
    const dimension = key as Dimension;
    dimensionPercentages[dimension] = Math.round((value / MAX_DIMENSION_SCORE) * 100);
    totalScore += value;
  });

  // 3. Overall Percentage
  const MAX_TOTAL_SCORE = 300;
  const totalPercentage = Math.round((totalScore / MAX_TOTAL_SCORE) * 100);

  // 4. Determine Risk Level
  let riskLevel = 'Foundation';
  let color = 'text-red-600'; // Default red

  if (totalPercentage <= 25) {
    riskLevel = 'Foundation';
    color = 'text-red-600';
  } else if (totalPercentage <= 50) {
    riskLevel = 'Developing';
    color = 'text-orange-500';
  } else if (totalPercentage <= 70) {
    riskLevel = 'Established';
    color = 'text-yellow-500';
  } else if (totalPercentage <= 85) {
    riskLevel = 'Advanced';
    color = 'text-green-500';
  } else {
    riskLevel = 'Leading';
    color = 'text-green-600';
  }

  return {
    dimensionScores,
    dimensionPercentages,
    totalScore,
    totalPercentage,
    riskLevel,
    color,
  };
};