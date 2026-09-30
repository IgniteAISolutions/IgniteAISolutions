// Server-side Notion write for Scorecard leads.
// NOTION_TOKEN is a server-only Vercel env var. Never prefix it with VITE_,
// or Vite will bake it into the public bundle.

const NOTION_API_URL = 'https://api.notion.com/v1';
const NOTION_VERSION = '2022-06-28';
// "Scorecard Leads" database in Notion (IgniteAI - Sharepoint).
const DATABASE_ID = process.env.NOTION_LEADS_DATABASE_ID || '009d40afeea844019aa3713dc6302d32';

const TURNOVER_LABELS = {
  '<1M': 'Under £1m',
  '1M-10M': '£1m - £10m',
  '10M-50M': '£10m - £50m',
  '50M+': '£50m+',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const text = (value, max = 200) => String(value ?? '').trim().slice(0, max);
const richText = (value) => ({ rich_text: [{ text: { content: text(value) } }] });
const select = (value) => ({ select: { name: text(value, 100).replace(/,/g, ' ') } });
const normalizeId = (id) => String(id).replace(/-/g, '');

async function notion(path, method, token, body) {
  const response = await fetch(`${NOTION_API_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Notion-Version': NOTION_VERSION,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`Notion ${method} ${path} failed: ${response.status} ${data.code || ''} ${data.message || ''}`);
  }
  return data;
}

async function createLead(token, lead, utm) {
  const page = await notion('/pages', 'POST', token, {
    parent: { database_id: DATABASE_ID },
    properties: {
      Name: { title: [{ text: { content: text(`${text(lead.firstName)} ${text(lead.lastName)}`) } }] },
      Email: { email: text(lead.email) },
      Company: richText(lead.companyName),
      'Job Title': richText(lead.jobTitle),
      Turnover: select(TURNOVER_LABELS[lead.turnover] || lead.turnover || 'Not given'),
      'Lead Source': select('AI Readiness Scorecard'),
      'GDPR Consent': { checkbox: lead.gdprConsent === true },
      'UTM Source': richText(utm?.source),
      'UTM Medium': richText(utm?.medium),
      'UTM Campaign': richText(utm?.campaign),
      Timestamp: { date: { start: new Date().toISOString() } },
      Status: select('Quiz Started'),
    },
  });
  return page.id;
}

async function addScore(token, pageId, email, score) {
  // Only update pages this function created: the page must sit in the leads
  // database and carry the same email the client submitted.
  const page = await notion(`/pages/${encodeURIComponent(pageId)}`, 'GET', token);
  const parentId = page.parent?.database_id;
  const pageEmail = page.properties?.Email?.email;
  if (!parentId || normalizeId(parentId) !== normalizeId(DATABASE_ID) || !pageEmail
      || pageEmail.toLowerCase() !== text(email).toLowerCase()) {
    return false;
  }
  const percentage = Number(score.totalPercentage);
  await notion(`/pages/${encodeURIComponent(pageId)}`, 'PATCH', token, {
    properties: {
      Score: { number: Number.isFinite(percentage) ? Math.round(percentage) : null },
      'Risk Level': select(score.riskLevel),
      Segment: select(score.segment),
      'Weakest Dimension': richText(score.weakestDimension),
      Status: select('Quiz Completed'),
    },
  });
  return true;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.NOTION_TOKEN;
  if (!token) {
    console.error('NOTION_TOKEN is not set. Scorecard lead was not saved.');
    return res.status(503).json({ error: 'Lead capture is not configured' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

    if (body.action === 'create') {
      const lead = body.lead || {};
      if (!EMAIL_RE.test(text(lead.email)) || lead.gdprConsent !== true) {
        return res.status(400).json({ error: 'A valid email and consent are required' });
      }
      const pageId = await createLead(token, lead, body.utm);
      return res.status(200).json({ pageId });
    }

    if (body.action === 'score') {
      if (!body.pageId || !body.email || !body.score) {
        return res.status(400).json({ error: 'pageId, email and score are required' });
      }
      const updated = await addScore(token, text(body.pageId, 64), body.email, body.score);
      return res.status(updated ? 200 : 404).json({ updated });
    }

    return res.status(400).json({ error: 'Unknown action' });
  } catch (error) {
    console.error(error);
    return res.status(502).json({ error: 'Could not save lead' });
  }
}
