// constants.ts
import { Dimension, Segment, Question } from './types';

export const CALENDLY_LINK = 'https://calendar.app.google/hGxdJJmx2T29Re4n6';

// Dimension weights for overall score calculation
export const DIMENSION_WEIGHTS: Record<Dimension, number> = {
  [Dimension.LeadershipGravity]: 0.20,
  [Dimension.CulturalResilience]: 0.20,
  [Dimension.SkillVisibility]: 0.15,
  [Dimension.ChampionDensity]: 0.15,
  [Dimension.GovernanceConfidence]: 0.15,
  [Dimension.CapacityDirection]: 0.15,
};

export const QUESTIONS: Question[] = [
  // ═══════════════════════════════════════════════════════════════
  // DIMENSION 1: LEADERSHIP GRAVITY (2 questions, 20% weight)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'q1',
    dimension: Dimension.LeadershipGravity,
    text: "Have you personally changed how you do something because AI showed you a better way?",
    options: [
      { label: "No - haven't got round to trying AI properly yet", score: 0 },
      { label: "Tried it but nothing stuck - went back to my usual way", score: 15 },
      { label: "I use it occasionally but haven't fundamentally changed anything", score: 40 },
      { label: "Yes - I've changed at least one significant workflow or decision process", score: 75 },
      { label: "Absolutely - it's changed how I think about problems, not just how I do tasks", score: 100 },
    ],
  },
  {
    id: 'q2',
    dimension: Dimension.LeadershipGravity,
    text: "If you told your team next week that AI was going to be a priority, what would their gut reaction be?",
    options: [
      { label: '"Here we go again - another thing that\'ll fizzle out"', score: 0 },
      { label: '"That\'s IT\'s problem, not mine"', score: 20 },
      { label: '"Interesting, but I\'ll believe it when I see it"', score: 50 },
      { label: '"Makes sense - we\'ve been heading this way"', score: 80 },
      { label: '"About time - some of us are already using it"', score: 100 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // DIMENSION 2: CULTURAL RESILIENCE (2 questions, 20% weight)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'q3',
    dimension: Dimension.CulturalResilience,
    text: "Think about the last time you introduced new software or changed how something major worked. How did it go?",
    options: [
      { label: "Painful - lots of resistance, some people never really adopted it", score: 0 },
      { label: "Got there eventually, but it took much longer than it should", score: 25 },
      { label: "Mixed - some embraced it, others are still grumbling", score: 50 },
      { label: "Pretty smooth - most people got on board within a few weeks", score: 80 },
      { label: "Well, actually - people were asking for it before we rolled it out", score: 100 },
    ],
  },
  {
    id: 'q4',
    dimension: Dimension.CulturalResilience,
    text: "When someone in your business finds a quicker or better way of doing something, what usually happens?",
    options: [
      { label: "They keep it to themselves - efficiency just means more work lands on your desk", score: 0 },
      { label: "They might tell a colleague, but it goes no further", score: 20 },
      { label: "They'd share it if asked, but there's no system for capturing it", score: 45 },
      { label: "They'd share what they found AND explain how they worked out it actually works", score: 80 },
      { label: "We actively look for these improvements and make sure they spread", score: 100 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // DIMENSION 3: SKILL VISIBILITY (2 questions, 15% weight)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'q5',
    dimension: Dimension.SkillVisibility,
    text: "Think about the people who always figure out new tech first - the ones others go to when they're stuck. How many could you name right now?",
    options: [
      { label: "Honestly? None come to mind", score: 0 },
      { label: "Maybe one or two", score: 25 },
      { label: "A handful - I know who they are", score: 55 },
      { label: "Quite a few - they're dotted around the business", score: 80 },
      { label: "We've identified them and they're already helping lead on this", score: 100 },
    ],
  },
  {
    id: 'q6',
    dimension: Dimension.SkillVisibility,
    text: "How would you describe where your business is with AI right now?",
    isSegmentQuestion: true,
    options: [
      { label: "Honestly not sure AI applies to our type of business", score: 0, segment: Segment.UNSURE },
      { label: "Haven't really started - still working out if it's relevant to us", score: 20, segment: Segment.EXPLORING },
      { label: "A few individuals are having a play but nothing organised", score: 40, segment: Segment.EXPERIMENTING },
      { label: "We're trying some things but not sure what's actually working", score: 60, segment: Segment.PILOTING },
      { label: "We've got some early wins but they're not spreading", score: 80, segment: Segment.SCALING },
      { label: "It's starting to become part of how we do things", score: 100, segment: Segment.EMBEDDED },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // DIMENSION 4: CHAMPION DENSITY (2 questions, 15% weight)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'q7',
    dimension: Dimension.ChampionDensity,
    text: "Roughly how many people in your business are reaching for AI tools when they hit a problem it could help with - it's becoming instinctive for them?",
    options: [
      { label: "None that I'm aware of", score: 0 },
      { label: "One or two individuals working alone", score: 20 },
      { label: "A small group - three or four people", score: 45 },
      { label: "It's spreading - people across multiple teams now", score: 75 },
      { label: "Becoming normal - hard to count", score: 100 },
    ],
  },
  {
    id: 'q8',
    dimension: Dimension.ChampionDensity,
    text: "If someone found a genuinely useful way to use AI in their job, how would that knowledge spread?",
    options: [
      { label: "It probably wouldn't - people work in silos here", score: 0 },
      { label: "Word of mouth, but it's hit and miss", score: 25 },
      { label: "They'd share it, but there's no proper way to capture it", score: 50 },
      { label: "We have channels for this, though they're not always used", score: 75 },
      { label: "We actively encourage sharing and people get recognised for it", score: 100 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // DIMENSION 5: GOVERNANCE CONFIDENCE (2 questions, 15% weight)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'q9',
    dimension: Dimension.GovernanceConfidence,
    text: "If someone wanted to use AI on client work or sensitive information, would they know what's allowed?",
    options: [
      { label: "No idea - we've not really talked about it", score: 0 },
      { label: "They'd probably just do it and hope for the best", score: 15 },
      { label: "They'd ask around but likely get different answers", score: 40 },
      { label: "We have guidance, though not everyone knows about it", score: 70 },
      { label: "Clear rules, clearly communicated, regularly checked", score: 100 },
    ],
  },
  {
    id: 'q10',
    dimension: Dimension.GovernanceConfidence,
    text: "What's your current situation with AI policies and guidelines?",
    options: [
      { label: "We don't have any", score: 0 },
      { label: "We encourage people to experiment but haven't set any boundaries", score: 20 },
      { label: "We've got something written down but most people haven't seen it", score: 45 },
      { label: "Policies exist and are communicated, but not really enforced", score: 70 },
      { label: "Clear policies, well known, and we actually manage them", score: 100 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // DIMENSION 6: CAPACITY DIRECTION (1 question, 15% weight)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'q11',
    dimension: Dimension.CapacityDirection,
    text: "When someone finds a way to do their job faster - through AI or anything else - what typically happens to the time they've saved?",
    options: [
      { label: "No one notices - the time just disappears into the day", score: 0 },
      { label: "They get a bit of breathing room, but it fills back up", score: 20 },
      { label: "They end up doing more of the same work", score: 40 },
      { label: "It's noticed but there's no system to redirect it", score: 60 },
      { label: "We actively think about how to use freed-up time for higher-value work", score: 100 },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════
// SCORE BANDS
// ═══════════════════════════════════════════════════════════════
export const SCORE_BANDS: Record<string, { range: [number, number]; description: string; action: string }> = {
  'High Risk': {
    range: [0, 25],
    description: "Significant human capability gaps will likely cause AI initiatives to fail. The foundation isn't there yet.",
    action: "Focus on one thing: get leadership visibly using AI themselves before asking anyone else to change.",
  },
  'At Risk': {
    range: [26, 45],
    description: "Foundation gaps need addressing before AI can succeed. You may see pockets of experimentation but they won't scale.",
    action: "Address your weakest dimension first. Trying to progress on AI without fixing this will waste time and money.",
  },
  'Building': {
    range: [46, 65],
    description: "Some foundations are in place but key gaps remain. You're past the starting line but not yet ready for serious investment.",
    action: "You're close. Focus on turning individual experiments into shared practices before scaling further.",
  },
  'Ready': {
    range: [66, 80],
    description: "Good human foundations for AI success. Your organisation can absorb change and has the right conditions for AI to stick.",
    action: "You're ready for structured implementation. The risk now is moving too slowly while competitors catch up.",
  },
  'Strong': {
    range: [81, 100],
    description: "Excellent human capability foundation. AI initiatives here have a high probability of delivering lasting value.",
    action: "Focus on compound growth - ensuring productivity gains translate into business outcomes, not just efficiency.",
  },
};

// Helper function to get band from score
export const getScoreBand = (score: number): string => {
  for (const [band, config] of Object.entries(SCORE_BANDS)) {
    if (score >= config.range[0] && score <= config.range[1]) {
      return band;
    }
  }
  return 'Building'; // Default fallback
};

// ═══════════════════════════════════════════════════════════════
// RECOMMENDATIONS BY DIMENSION (Monday Actions)
// ═══════════════════════════════════════════════════════════════
export const RECOMMENDATIONS: Record<Dimension, { title: string; text: string; question: string; mondayAction: string }> = {
  [Dimension.LeadershipGravity]: {
    title: 'Leadership Must Lead',
    text: "Conor Grennan's research shows AI adoption requires behavioural change, not just tool access. Leaders who change their own thinking model the transformation for others.",
    question: 'Have you personally changed a decision or workflow based on AI insight?',
    mondayAction: "This week, use an AI tool for ONE real work task - not a test. Then tell your team what you tried and what you learned. Leadership visibility is the single biggest predictor of AI adoption.",
  },
  [Dimension.CulturalResilience]: {
    title: 'Your Culture Predicts Your Future',
    text: "Past change behaviour is the strongest predictor of AI adoption. WEF research shows human adaptability declined 5%+ during recent disruptions.",
    question: 'How did your last major technology change actually go?',
    mondayAction: "Ask three people in your business: 'If you found a faster way to do your job, would you share it?' Their honest answers will tell you whether your culture is ready for AI.",
  },
  [Dimension.SkillVisibility]: {
    title: 'Know Your People',
    text: "28% of companies can't identify their most valued human capabilities (WEF). You can't build an AI-capable organisation if you don't know who your natural champions are.",
    question: 'Can you name the 3-5 people most likely to figure out AI first?',
    mondayAction: "Make a list of the 3-5 people most likely to figure out new technology first. These are your potential AI champions. If you can't name them, that's your first problem to solve.",
  },
  [Dimension.ChampionDensity]: {
    title: 'Champions Drive Scale',
    text: "WRITER research shows champions from middle management achieve 3.5× faster scaling. McKinsey found high performers are 3× more likely to have active executive champions.",
    question: 'How many people instinctively reach for AI when they hit a problem?',
    mondayAction: "Find ONE person already experimenting with AI and ask them to show you what they've discovered. Then ask: 'Who else should see this?' Start building the knowledge-sharing habit.",
  },
  [Dimension.GovernanceConfidence]: {
    title: 'Clear Boundaries Enable Action',
    text: "Allie K. Miller's research: 61% of organisations encourage AI experimentation but only 44% have governance. Unclear boundaries create shadow AI and paralysis.",
    question: 'Would your team know what they can and can\'t use AI for?',
    mondayAction: "Write down ONE clear boundary: what's definitely NOT okay to put into AI tools. Share it with your team. Clear boundaries enable experimentation - ambiguity kills it.",
  },
  [Dimension.CapacityDirection]: {
    title: 'Productivity Must Compound',
    text: "BCG found 74% of AI investments deliver no material value. Often because productivity gains evaporate into busywork rather than compound into growth.",
    question: 'When AI saves someone an hour, what happens to that hour?',
    mondayAction: "Pick one person who's gotten faster at their job recently. Ask them: 'What are you doing with the time you've saved?' Their answer tells you whether productivity is compounding or evaporating.",
  },
};

// ═══════════════════════════════════════════════════════════════
// SEGMENT-SPECIFIC MESSAGING (for results emails)
// ═══════════════════════════════════════════════════════════════
export const SEGMENT_MESSAGING: Record<Segment, { headline: string; insight: string; sparkPosition: string }> = {
  [Segment.UNSURE]: {
    headline: "You're asking the right question",
    insight: "Most businesses rush into AI without asking 'does this even apply to us?' That's smarter than it sounds - 74% of AI investments deliver no material value (BCG).",
    sparkPosition: "SPARK maps opportunities against your specific operations - not generic use cases. We'll identify where AI could actually make a difference for your type of business.",
  },
  [Segment.EXPLORING]: {
    headline: "You're at the exploration stage",
    insight: "You know AI is coming but haven't started. That's exactly the right place to be thoughtful. The danger is 'analysis paralysis' - waiting so long that competitors move first.",
    sparkPosition: "SPARK identifies high-impact, low-risk starting points specific to your business. You'll know exactly where to begin - not just that you should 'try AI'.",
  },
  [Segment.EXPERIMENTING]: {
    headline: "You've got people experimenting",
    insight: "Individual experiments rarely become organisational capability. Conor Grennan found that when you give people AI use cases, they don't go find their own - the knowledge stays siloed.",
    sparkPosition: "SPARK helps businesses at your stage identify which experiments are worth scaling and which are dead ends - before you invest in the wrong ones.",
  },
  [Segment.PILOTING]: {
    headline: "You're in pilot mode",
    insight: "Sol Rashidi calls this 'proof-of-concept purgatory' - and it's where most AI initiatives die. Of her 200 deployments, only 48 made it to production AND stayed there.",
    sparkPosition: "SPARK helps businesses at your stage identify which pilot to double down on and which to kill - based on what's actually likely to scale.",
  },
  [Segment.SCALING]: {
    headline: "You've got wins that aren't spreading",
    insight: "The most frustrating place to be - you can SEE the value but can't scale it. Research shows champions from middle management achieve 3.5× faster scaling than top-down mandates.",
    sparkPosition: "SPARK helps businesses at your stage identify the specific human factors blocking scale - and the interventions that will unlock them.",
  },
  [Segment.EMBEDDED]: {
    headline: "AI is becoming embedded",
    insight: "You're ahead of most. But what separates 'good' from 'compounding' results is what happens to the time AI saves. Does it translate to business outcomes or evaporate into busywork?",
    sparkPosition: "SPARK helps mature AI adopters identify the specific blockers preventing compound returns - and the interventions that unlock them.",
  },
};

// ═══════════════════════════════════════════════════════════════
// DIMENSION PRIORITY ORDER (for tie-breaking weakest dimension)
// ═══════════════════════════════════════════════════════════════
export const DIMENSION_PRIORITY: Dimension[] = [
  Dimension.LeadershipGravity,
  Dimension.CulturalResilience,
  Dimension.GovernanceConfidence,
  Dimension.SkillVisibility,
  Dimension.ChampionDensity,
  Dimension.CapacityDirection,
];
