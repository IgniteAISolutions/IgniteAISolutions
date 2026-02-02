import { LeadData, ScoreResult } from '../types';

const NOTION_API_URL = 'https://api.notion.com/v1';
const NOTION_VERSION = '2022-06-28';
const DATABASE_ID = 'e6af817ea8c040a49793df0a513311a6';

// Get Notion token from environment variable
// In production, this should be stored securely (e.g., Vercel/Netlify env vars)
const getNotionToken = (): string | undefined => {
  // Check both standard and Vite-specific env var names
  return import.meta.env?.VITE_NOTION_TOKEN || import.meta.env?.NOTION_TOKEN;
};

/**
 * Creates a new lead record in Notion database
 * Returns the Notion page ID for later updates
 */
export async function createNotionLead(
  leadData: LeadData,
  utmParams?: { source?: string; medium?: string; campaign?: string }
): Promise<string | null> {
  const token = getNotionToken();

  if (!token) {
    console.warn('Notion token not configured. Skipping Notion integration.');
    return null;
  }

  try {
    const response = await fetch(`${NOTION_API_URL}/pages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Notion-Version': NOTION_VERSION
      },
      body: JSON.stringify({
        parent: { database_id: DATABASE_ID },
        properties: {
          'Name': {
            title: [{ text: { content: `${leadData.firstName} ${leadData.lastName}` } }]
          },
          'Email': {
            email: leadData.email
          },
          'Company': {
            rich_text: [{ text: { content: leadData.companyName } }]
          },
          'Job Title': {
            rich_text: [{ text: { content: leadData.jobTitle } }]
          },
          'Turnover': {
            select: { name: leadData.turnover }
          },
          'Lead Source': {
            select: { name: leadData.leadSource || 'AI Readiness Scorecard' }
          },
          'UTM Source': {
            rich_text: [{ text: { content: utmParams?.source || '' } }]
          },
          'UTM Medium': {
            rich_text: [{ text: { content: utmParams?.medium || '' } }]
          },
          'UTM Campaign': {
            rich_text: [{ text: { content: utmParams?.campaign || '' } }]
          },
          'Timestamp': {
            date: { start: new Date().toISOString() }
          },
          'Status': {
            select: { name: 'Quiz Started' }
          }
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Notion API error:', error);
      return null;
    }

    const data = await response.json();
    console.log('Notion lead created:', data.id);
    return data.id;
  } catch (error) {
    console.error('Failed to create Notion lead:', error);
    return null;
  }
}

/**
 * Updates an existing Notion page with quiz results
 */
export async function updateNotionWithScore(
  pageId: string,
  scoreResult: ScoreResult
): Promise<boolean> {
  const token = getNotionToken();

  if (!token) {
    console.warn('Notion token not configured. Skipping score update.');
    return false;
  }

  try {
    const response = await fetch(`${NOTION_API_URL}/pages/${pageId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Notion-Version': NOTION_VERSION
      },
      body: JSON.stringify({
        properties: {
          'Score': {
            number: Math.round(scoreResult.totalPercentage)
          },
          'Risk Level': {
            select: { name: scoreResult.riskLevel }
          },
          'Weakest Dimension': {
            rich_text: [{ text: { content: scoreResult.weakestDimension } }]
          },
          'Segment': {
            select: { name: scoreResult.segment }
          },
          'Status': {
            select: { name: 'Quiz Completed' }
          }
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Notion update error:', error);
      return false;
    }

    console.log('Notion record updated with score');
    return true;
  } catch (error) {
    console.error('Failed to update Notion record:', error);
    return false;
  }
}

/**
 * Retry logic wrapper for API calls
 * Attempts up to 3 times with exponential backoff
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxAttempts = 3
): Promise<T | null> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) {
        console.error(`Failed after ${maxAttempts} attempts:`, error);
        return null;
      }
      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, attempt - 1) * 1000;
      console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  return null;
}
