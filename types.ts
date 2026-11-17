export type AreaId = 'direction' | 'setup' | 'skills' | 'rules' | 'work' | 'value';

export type Band = 'Not started' | 'Trying it out' | 'Building' | 'Working';

export type TeamSize = '1-2' | '3-9' | '10-49' | '50-200' | '200+';
export type MainTool = 'Claude' | 'Microsoft Copilot' | 'ChatGPT' | 'A mix' | 'None yet';

export interface Option {
  label: string;
  /** 0 to 3 on every scored question. */
  score: number;
}

export interface Question {
  id: string;
  area: AreaId;
  text: string;
  options: Option[];
}

export interface ContextQuestion {
  id: 'teamSize' | 'mainTool';
  text: string;
  options: string[];
}

export interface Context {
  teamSize?: TeamSize;
  mainTool?: MainTool;
}

export interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  jobTitle: string;
  teamSize?: string;
  leadSource?: 'AI Readiness Scorecard' | 'Lead Magnet' | 'Survey' | 'Lead Response Crisis Form';
  gdprConsent: boolean;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
  };
}

export interface ScoreResult {
  /** 0 to 100 for each area. */
  areaScores: Record<AreaId, number>;
  /** Plain average of the six area scores, 0 to 100. */
  overall: number;
  /** The band the overall score would earn with no cap applied. */
  uncappedBand: Band;
  /** The band shown, after the caps in utils/scoring.ts. */
  band: Band;
  /** Why the band was capped, or null. */
  capReason: string | null;
  strongest: AreaId;
  /** Areas from weakest to strongest, foundations first on a tie. */
  priorities: AreaId[];
  context: Context;
}

export type Step = 'landing' | 'quiz' | 'details' | 'results';
