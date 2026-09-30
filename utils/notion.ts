import { LeadData, ScoreResult } from '../types';

// Leads are written to Notion by the server function in api/lead.js, so the
// Notion token never reaches the browser.
const LEAD_ENDPOINT = '/api/lead';

async function postLead(body: Record<string, unknown>): Promise<Response> {
  return fetch(LEAD_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

/**
 * Creates a new lead record in Notion via the server function.
 * Returns the Notion page ID for the later score update.
 */
export async function createNotionLead(
  leadData: LeadData,
  utmParams?: { source?: string; medium?: string; campaign?: string }
): Promise<string | null> {
  try {
    const response = await postLead({ action: 'create', lead: leadData, utm: utmParams });
    if (!response.ok) {
      console.error('Lead capture failed:', response.status);
      return null;
    }
    const data = await response.json();
    return data.pageId ?? null;
  } catch (error) {
    console.error('Failed to save lead:', error);
    return null;
  }
}

/**
 * Adds the quiz results to the lead's Notion record.
 */
export async function updateNotionWithScore(
  pageId: string,
  email: string,
  scoreResult: ScoreResult
): Promise<boolean> {
  try {
    const response = await postLead({
      action: 'score',
      pageId,
      email,
      score: {
        totalPercentage: scoreResult.totalPercentage,
        riskLevel: scoreResult.riskLevel,
        segment: scoreResult.segment,
        weakestDimension: scoreResult.weakestDimension,
      },
    });
    return response.ok;
  } catch (error) {
    console.error('Failed to update lead with score:', error);
    return false;
  }
}
