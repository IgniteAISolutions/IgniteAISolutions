export enum Dimension {
  LeadershipGravity = 'Leadership Gravity',
  CulturalResilience = 'Cultural Resilience',
  SkillVisibility = 'Skill Visibility',
  ChampionDensity = 'Champion Density',
  GovernanceConfidence = 'Governance Confidence',
  CapacityDirection = 'Capacity Direction',
}

export enum Segment {
  UNSURE = 'Unsure',
  EXPLORING = 'Exploring',
  EXPERIMENTING = 'Experimenting',
  PILOTING = 'Piloting',
  SCALING = 'Scaling',
  EMBEDDED = 'Embedded',
}

export interface Option {
  label: string;
  score: number;
  segment?: Segment;
}

export interface Question {
  id: string;
  dimension: Dimension;
  text: string;
  options: Option[];
  isSegmentQuestion?: boolean;
}

export interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  jobTitle: string;
  turnover: string;
  leadSource?: 'AI Readiness Scorecard' | 'Lead Magnet' | 'Survey' | 'Lead Response Crisis Form';
  gdprConsent: boolean;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
  };
}

export interface ScoreResult {
  dimensionScores: Record<Dimension, number>;
  dimensionPercentages: Record<Dimension, number>;
  totalScore: number;
  totalPercentage: number;
  riskLevel: string;
  color?: string;
  segment: Segment; // Required now
  strongestDimension: Dimension; // Required for logic
  weakestDimension: Dimension;   // Required for Results.tsx
}

export type Step = 'landing' | 'lead-capture' | 'quiz' | 'results';
