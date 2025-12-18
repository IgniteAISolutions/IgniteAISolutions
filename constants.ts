import { Dimension, Question } from './types';

export const QUESTIONS: Question[] = [
  // DIMENSION 1: STRATEGY ALIGNMENT
  {
    id: 'q1',
    dimension: Dimension.StrategyAlignment,
    text: "How clearly defined are your organisation's AI objectives?",
    options: [
      { label: 'We have no specific AI objectives yet', score: 0 },
      { label: 'We have vague intentions like "explore AI" or "improve efficiency"', score: 5 },
      { label: 'We have defined AI goals but they\'re not linked to business KPIs', score: 10 },
      { label: 'We have AI objectives tied directly to measurable business outcomes', score: 15 },
    ],
  },
  {
    id: 'q2',
    dimension: Dimension.StrategyAlignment,
    text: 'When your leadership team discusses AI, the conversation typically focuses on:',
    options: [
      { label: 'Technology features and capabilities', score: 0 },
      { label: 'Cost savings and headcount reduction', score: 5 },
      { label: 'Keeping up with competitors', score: 10 },
      { label: 'Solving specific business problems and creating value', score: 20 },
    ],
  },
  {
    id: 'q3',
    dimension: Dimension.StrategyAlignment,
    text: 'If asked "What business problem will AI solve in the next 90 days?", your team would:',
    options: [
      { label: 'Struggle to answer specifically', score: 0 },
      { label: 'Name several possibilities but no clear priority', score: 5 },
      { label: 'Identify one area but without clear success metrics', score: 10 },
      { label: 'Name a specific problem with defined success criteria', score: 15 },
    ],
  },

  // DIMENSION 2: LEADERSHIP BUY-IN
  {
    id: 'q4',
    dimension: Dimension.LeadershipBuyIn,
    text: 'Who is currently responsible for AI initiatives in your organisation?',
    options: [
      { label: 'No one specifically - it\'s ad hoc', score: 0 },
      { label: 'IT department or a technical team', score: 5 },
      { label: 'A middle manager with other responsibilities', score: 10 },
      { label: 'A senior leader with budget authority and board visibility', score: 25 },
    ],
  },
  {
    id: 'q5',
    dimension: Dimension.LeadershipBuyIn,
    text: 'How would you describe your leadership team\'s engagement with AI?',
    options: [
      { label: 'Passive - they delegate it entirely to others', score: 0 },
      { label: 'Reactive - they respond when AI topics arise', score: 5 },
      { label: 'Interested - they attend briefings and ask questions', score: 10 },
      { label: 'Active - they champion AI, allocate resources, and remove blockers', score: 25 },
    ],
  },

  // DIMENSION 3: CULTURAL READINESS
  {
    id: 'q6',
    dimension: Dimension.CulturalReadiness,
    text: 'How would you describe the general attitude toward AI among your workforce?',
    options: [
      { label: 'Fearful - concerned about job losses and change', score: 0 },
      { label: 'Sceptical - "we\'ve seen initiatives come and go"', score: 5 },
      { label: 'Neutral - open but waiting to see proof', score: 15 },
      { label: 'Enthusiastic - actively looking for ways to use AI', score: 20 },
    ],
  },
  {
    id: 'q7',
    dimension: Dimension.CulturalReadiness,
    text: 'When new technology or processes are introduced, your organisation typically:',
    options: [
      { label: 'Experiences significant resistance and slow adoption', score: 0 },
      { label: 'Has pockets of adoption but inconsistent uptake', score: 5 },
      { label: 'Achieves reasonable adoption with some effort', score: 10 },
      { label: 'Embraces change quickly with early adopters leading the way', score: 15 },
    ],
  },
  {
    id: 'q8',
    dimension: Dimension.CulturalReadiness,
    text: 'Do you know who your potential AI "champions" are - the enthusiasts who would advocate for and support AI adoption?',
    options: [
      { label: 'No, we haven\'t identified anyone', score: 0 },
      { label: 'We have a vague sense but nothing formal', score: 5 },
      { label: 'We know a few names but haven\'t engaged them', score: 10 },
      { label: 'Yes, we\'ve identified champions and they\'re already involved', score: 15 },
    ],
  },

  // DIMENSION 4: DATA FOUNDATION
  {
    id: 'q9',
    dimension: Dimension.DataFoundation,
    text: 'How would you describe your organisation\'s data situation?',
    options: [
      { label: 'Data is scattered across many systems and hard to access', score: 0 },
      { label: 'We have data but it\'s siloed and inconsistent', score: 10 },
      { label: 'Most data is accessible but quality varies', score: 20 },
      { label: 'Our data is centralised, clean, and readily accessible', score: 25 },
    ],
  },
  {
    id: 'q10',
    dimension: Dimension.DataFoundation,
    text: 'If you needed to pull customer, operational, or financial data for an AI project, how long would it take?',
    options: [
      { label: 'Weeks - it would require significant manual effort', score: 0 },
      { label: 'Days - we\'d need to combine multiple sources', score: 10 },
      { label: 'Hours - we can access most data but may need some preparation', score: 20 },
      { label: 'Minutes - our data is well-organised and query-ready', score: 25 },
    ],
  },

  // DIMENSION 5: SKILLS & CAPABILITY
  {
    id: 'q11',
    dimension: Dimension.SkillsCapability,
    text: 'What is the current level of AI literacy across your workforce?',
    options: [
      { label: 'Very low - most staff couldn\'t explain what AI does', score: 0 },
      { label: 'Basic - awareness exists but no practical skills', score: 10 },
      { label: 'Moderate - some staff use AI tools independently', score: 20 },
      { label: 'Strong - many staff actively experiment with AI applications', score: 25 },
    ],
  },
  {
    id: 'q12',
    dimension: Dimension.SkillsCapability,
    text: 'Do you have staff who could be trained to build and manage AI solutions internally?',
    options: [
      { label: 'No - we lack technically-minded staff', score: 0 },
      { label: 'Possibly - but they\'re fully committed to other work', score: 10 },
      { label: 'Yes - we have people who could develop these skills', score: 20 },
      { label: 'Yes - we already have staff experimenting with AI tools', score: 25 },
    ],
  },

  // DIMENSION 6: GOVERNANCE & ETHICS
  {
    id: 'q13',
    dimension: Dimension.GovernanceEthics,
    text: 'Does your organisation have any AI usage policies or guidelines?',
    options: [
      { label: 'No - we haven\'t addressed this yet', score: 0 },
      { label: 'Informal guidance exists but nothing documented', score: 5 },
      { label: 'We have basic policies but they need development', score: 10 },
      { label: 'We have comprehensive AI governance documentation', score: 15 },
    ],
  },
  {
    id: 'q14',
    dimension: Dimension.GovernanceEthics,
    text: 'How clear is your organisation on what AI should and shouldn\'t do autonomously?',
    options: [
      { label: 'Not clear at all - we haven\'t considered this', score: 0 },
      { label: 'We have general concerns but no defined boundaries', score: 5 },
      { label: 'We have some understanding but it\'s not formalised', score: 10 },
      { label: 'We have clear human-in-the-loop requirements documented', score: 20 },
    ],
  },
  {
    id: 'q15',
    dimension: Dimension.GovernanceEthics,
    text: 'If an AI tool made a mistake that affected a customer, how confident are you in your ability to identify and correct it?',
    options: [
      { label: 'Not confident - we\'d struggle to trace the issue', score: 0 },
      { label: 'Somewhat confident - we could probably find it eventually', score: 5 },
      { label: 'Fairly confident - we have some oversight processes', score: 10 },
      { label: 'Very confident - we have clear audit trails and escalation paths', score: 15 },
    ],
  },
];

export const BENCHMARKS = {
  [Dimension.StrategyAlignment]: 38,
  [Dimension.LeadershipBuyIn]: 45,
  [Dimension.CulturalReadiness]: 42,
  [Dimension.DataFoundation]: 35,
  [Dimension.SkillsCapability]: 33,
  [Dimension.GovernanceEthics]: 28,
  Overall: 37,
};

export const RECOMMENDATIONS: Record<Dimension, { title: string; text: string; question: string }> = {
  [Dimension.StrategyAlignment]: {
    title: 'Priority: Connect AI to Business Outcomes',
    text: 'Your AI initiatives risk becoming expensive experiments without clear business impact. Before investing in any AI tools, define the specific problems you\'re solving and how you\'ll measure success.',
    question: 'What business metric will improve, by how much, in what timeframe?',
  },
  [Dimension.LeadershipBuyIn]: {
    title: 'Priority: Secure Executive Sponsorship',
    text: 'AI transformation without active leadership support has a 70% failure rate. You need a senior sponsor with budget authority who will champion the initiative and remove blockers.',
    question: 'Who will fight for this project when you\'re not in the room?',
  },
  [Dimension.CulturalReadiness]: {
    title: 'Priority: Address Workforce Concerns',
    text: 'Your team\'s attitudes toward AI could derail even well-planned initiatives. Understanding and addressing fears (especially around job security) is essential before implementation.',
    question: 'What concerns do your people have, and how will you address them?',
  },
  [Dimension.DataFoundation]: {
    title: 'Priority: Get Your Data House in Order',
    text: 'AI is only as good as the data it learns from. Scattered, inconsistent, or inaccessible data will limit what\'s possible and increase project risk.',
    question: 'Can you access the data you need within hours, not weeks?',
  },
  [Dimension.SkillsCapability]: {
    title: 'Priority: Build Internal AI Capability',
    text: 'Relying entirely on external expertise creates dependency and limits sustainable adoption. Identifying and developing internal champions is essential for long-term success.',
    question: 'Who are your potential AI champions and how will you develop them?',
  },
  [Dimension.GovernanceEthics]: {
    title: 'Priority: Establish Clear AI Guardrails',
    text: 'Without clear governance, you risk compliance issues, reputational damage, and the spread of uncontrolled "shadow AI" across your organisation.',
    question: 'What can AI do autonomously, and where must humans stay in the loop?',
  },
};