// types.ts

export enum Dimension {
  LeadershipGravity = 'Leadership Gravity',
  CulturalResilience = 'Cultural Resilience',
  SkillVisibility = 'Skill Visibility',
  ChampionDensity = 'Champion Density',
  GovernanceConfidence = 'Governance Confidence',
  CapacityDirection = 'Capacity Direction',
}

// Segmentation based on Q6 answer
export enum Segment {
  UNSURE = 'UNSURE',
  EXPLORING = 'EXPLORING',
  EXPERIMENTING = 'EXPERIMENTING',
  PILOTING = 'PILOTING',
  SCALING = 'SCALING',
  EMBEDDED = 'EMBEDDED',
}

export interface QuestionOption {
  label: string;
  score: number;
  segment?: Segment; // Only used for Q6
}

export interface Question {
  id: string;
  dimension: Dimension;
  text: string;
  options: QuestionOption[];
  isSegmentQuestion?: boolean; // Flags Q6 for special handling
}

export interface ScoreResult {
  totalPercentage: number;
  dimensionScores: Record<Dimension, number>;
  dimensionPercentages: Record<Dimension, number>;
  riskLevel: string;
  segment: Segment;
  strongestDimension: Dimension;
  weakestDimension: Dimension;
}
