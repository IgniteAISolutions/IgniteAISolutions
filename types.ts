
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
  riskLevel: 'Foundation' | 'Developing' | 'Established' | 'Advanced' | 'Leading';
  color: string;
}

export type Step = 'landing' | 'lead-capture' | 'quiz' | 'results';
