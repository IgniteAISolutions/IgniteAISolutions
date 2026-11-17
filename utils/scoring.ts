import { AreaId, Band, Context, ScoreResult } from '../types';
import {
  AREAS, AREA_ORDER, BANDS, BAND_ORDER, MAX_OPTION_SCORE, QUESTIONS, RULES_FLOOR, WORKING_FLOOR,
} from './constants';

export type Answers = Record<string, number>;

/**
 * How the score works.
 *
 * 1. Each of the 18 questions scores 0 to 3.
 * 2. An area score is the points earned in its three questions as a
 *    percentage of the nine available.
 * 3. The overall score is the plain average of the six area scores. No area
 *    carries extra weight, because we have no evidence that one matters more.
 * 4. The band comes from the overall score, with two caps so a high average
 *    cannot hide a missing foundation:
 *      - Working needs every area at 50 or more.
 *      - Rules and data below 25 holds the band at Trying it out.
 */
export function areaScores(answers: Answers): Record<AreaId, number> {
  const out = {} as Record<AreaId, number>;
  for (const area of AREA_ORDER) {
    const questions = QUESTIONS.filter((q) => q.area === area);
    const earned = questions.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
    out[area] = Math.round((earned / (questions.length * MAX_OPTION_SCORE)) * 100);
  }
  return out;
}

export function overallScore(scores: Record<AreaId, number>): number {
  const values = AREA_ORDER.map((a) => scores[a]);
  return Math.round(values.reduce((s, v) => s + v, 0) / values.length);
}

export function bandFor(score: number): Band {
  let band: Band = BANDS[0].band;
  for (const b of BANDS) if (score >= b.min) band = b.band;
  return band;
}

const lower = (a: Band, b: Band): Band => (BAND_ORDER.indexOf(a) <= BAND_ORDER.indexOf(b) ? a : b);

export function applyCaps(uncapped: Band, scores: Record<AreaId, number>): { band: Band; capReason: string | null } {
  let band = uncapped;
  let capReason: string | null = null;

  const belowFloor = AREA_ORDER.filter((a) => scores[a] < WORKING_FLOOR);
  if (band === 'Working' && belowFloor.length) {
    band = 'Building';
    capReason = `Working needs every area at ${WORKING_FLOOR} or more. ${belowFloor.map((a) => AREAS[a].name).join(' and ')} scored lower.`;
  }
  if (scores.rules < RULES_FLOOR && lower(band, 'Trying it out') !== band) {
    band = 'Trying it out';
    capReason = `Rules and data scored ${scores.rules}. Until people know what data stays out of AI tools, the rest is built on a risk.`;
  }
  return { band, capReason };
}

/** Weakest first. Equal scores keep the foundations-first order of AREA_ORDER. */
export function priorities(scores: Record<AreaId, number>): AreaId[] {
  return [...AREA_ORDER].sort((a, b) => scores[a] - scores[b] || AREA_ORDER.indexOf(a) - AREA_ORDER.indexOf(b));
}

export function strongestArea(scores: Record<AreaId, number>): AreaId {
  return [...AREA_ORDER].sort((a, b) => scores[b] - scores[a] || AREA_ORDER.indexOf(a) - AREA_ORDER.indexOf(b))[0];
}

export function calculateScores(answers: Answers, context: Context = {}): ScoreResult {
  const scores = areaScores(answers);
  const overall = overallScore(scores);
  const uncappedBand = bandFor(overall);
  const { band, capReason } = applyCaps(uncappedBand, scores);
  return {
    areaScores: scores,
    overall,
    uncappedBand,
    band,
    capReason,
    strongest: strongestArea(scores),
    priorities: priorities(scores),
    context,
  };
}
