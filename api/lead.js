// Server-side Notion write for Scorecard leads (People + Opportunities).
// NOTION_TOKEN is a server-only Vercel env var. Never prefix it with VITE_,
// or Vite will bake it into the public bundle.

const NOTION_API_URL = 'https://api.notion.com/v1';
const NOTION_VERSION = '2022-06-28';
// NotionOS databases: People and Opportunities.
const PEOPLE_DB = process.env.NOTION_PEOPLE_DATABASE_ID || '74d2e458a6764d06b6061c518fec7bbb';
const OPPORTUNITIES_DB = process.env.NOTION_OPPORTUNITIES_DATABASE_ID || '51ed2991b8e847ae9a22999dae1d70f6';
const SOURCE = 'AI Readiness Scorecard';

const TURNOVER_LABELS = {
  '<1M': 'Under £1m',
  '1M-10M': '£1m to £10m',
  '10M-50M': '£10m to £50m',
  '50M+': '£50m+',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const text = (value, max = 200) => String(value ?? '').trim().slice(0, max);
const richText = (value, max) => ({ rich_text: [{ text: { content: text(value, max) } }] });
const plain = (prop) => (prop?.rich_text || []).map((part) => part.plain_text || '').join('');
const normalizeId = (id) => String(id).replace(/-/g, '');
const today = () => new Date().toISOString().slice(0, 10);
const inDays = (days) => new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);

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

// Reuse the person if they are already in People, otherwise add them.
async function findOrCreatePerson(token, lead, email, company) {
  const found = await notion(`/databases/${PEOPLE_DB}/query`, 'POST', token, {
    filter: { property: 'Email', email: { equals: email } },
    page_size: 1,
  });
  if (found.results?.length) {
    const person = found.results[0];
    await notion(`/pages/${person.id}`, 'PATCH', token, {
      properties: { 'Last Contact': { date: { start: today() } } },
    });
    return person.id;
  }
  const person = await notion('/pages', 'POST', token, {
    parent: { database_id: PEOPLE_DB },
    properties: {
      'Full Name': { title: [{ text: { content: text(`${text(lead.firstName)} ${text(lead.lastName)}`) || email } }] },
      Email: { email },
      Role: richText(lead.jobTitle),
      Notes: richText(`${company}. Added by the ${SOURCE}.`, 500),
      'Last Contact': { date: { start: today() } },
    },
  });
  return person.id;
}

async function createLead(token, lead, utm) {
  const email = text(lead.email).toLowerCase();
  const company = text(lead.companyName) || 'Company not given';
  const name = text(`${text(lead.firstName)} ${text(lead.lastName)}`);
  const personId = await findOrCreatePerson(token, lead, email, company);

  const utmLine = [utm?.source, utm?.medium, utm?.campaign].map((v) => text(v, 80)).filter(Boolean).join(' / ');
  const notes = [
    `Email: ${email}`,
    `Company: ${company}`,
    `Role: ${text(lead.jobTitle) || 'not given'}`,
    `Turnover: ${TURNOVER_LABELS[lead.turnover] || text(lead.turnover) || 'not given'}`,
    `GDPR consent given ${new Date().toISOString()}`,
    'Quiz started, not yet completed.',
  ].join('\n');

  const opportunity = await notion('/pages', 'POST', token, {
    parent: { database_id: OPPORTUNITIES_DB },
    properties: {
      'Opportunity Name': { title: [{ text: { content: text(`Scorecard: ${company} (${name || email})`) } }] },
      Stage: { select: { name: 'New' } },
      Owner: { select: { name: 'Chris' } },
      People: { relation: [{ id: personId }] },
      'Content Source': richText(utmLine ? `${SOURCE} (${utmLine})` : SOURCE),
      'Next Action': richText('Follow up on AI Readiness Scorecard result'),
      'Next Action Due': { date: { start: inDays(1) } },
      Notes: richText(notes, 1900),
    },
  });
  return opportunity.id;
}

async function addScore(token, pageId, email, score) {
  // Only update Scorecard opportunities, and only when the submitted email
  // matches the one recorded on the page.
  const page = await notion(`/pages/${encodeURIComponent(pageId)}`, 'GET', token);
  const parentId = page.parent?.database_id;
  const source = plain(page.properties?.['Content Source']);
  const notes = plain(page.properties?.Notes);
  const expected = `Email: ${text(email).toLowerCase()}\n`;
  if (!parentId || normalizeId(parentId) !== normalizeId(OPPORTUNITIES_DB)
      || !source.startsWith(SOURCE) || !notes.startsWith(expected)) {
    return false;
  }
  const percentage = Number(score.totalPercentage);
  const result = [
    `Score: ${Number.isFinite(percentage) ? Math.round(percentage) : '?'}%`,
    `Risk level: ${text(score.riskLevel, 60)}`,
    `Segment: ${text(score.segment, 60)}`,
    `Weakest dimension: ${text(score.weakestDimension, 60)}`,
  ].join('\n');
  await notion(`/pages/${encodeURIComponent(pageId)}`, 'PATCH', token, {
    properties: {
      Notes: richText(notes.replace('Quiz started, not yet completed.', `Quiz completed.\n${result}`), 1900),
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
