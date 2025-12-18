export enum Dimension {
  StrategyAlignment = 'Strategy Alignment',
  LeadershipBuyIn = 'Leadership Buy-In',
  CulturalReadiness = 'Cultural Readiness',
  DataFoundation = 'Data Foundation',
  SkillsCapability = 'Skills & Capability',
  GovernanceEthics = 'Governance & Ethics',
}

export interface Option {
  label: string;
  score: number;
}

export interface Question {
  id: string;
  dimension: Dimension;
  text: string;
  options: Option[];
}

export interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  jobTitle: string;
  turnover: string;
}

export interface ScoreResult {
  dimensionScores: Record<Dimension, number>; // Raw score (0-50)
  dimensionPercentages: Record<Dimension, number>; // Percentage (0-100)
  totalScore: number; // Max 300
  totalPercentage: number; // 0-100
  riskLevel: string;
  color: string;
}

export type Step = 'landing' | 'lead-capture' | 'quiz' | 'results';