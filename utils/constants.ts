import { AreaId, Band, ContextQuestion, Question } from '../types';

export const SITE = 'https://www.igniteaisolutions.co.uk';
export const BOOKING_LINK = 'https://calendar.app.google/hGxdJJmx2T29Re4n6';

export const AREAS: Record<AreaId, { name: string; short: string; measures: string }> = {
  direction: { name: 'Direction', short: 'Direction', measures: 'Whether leadership uses AI, has said what it is for, and has put someone in charge.' },
  setup: { name: 'Tools and set-up', short: 'Set-up', measures: 'Which accounts people use, whether everyone starts from the same set-up, and what it can reach.' },
  skills: { name: 'Skills and habits', short: 'Skills', measures: 'How people learned, how many use AI each week, and whether what works gets shared.' },
  rules: { name: 'Rules and data', short: 'Rules', measures: 'Whether the rules are written down, people know what data stays out, and new tools are checked.' },
  work: { name: 'Work it is used on', short: 'Work', measures: 'Whether AI is used on named tasks, in a repeatable way, with a person checking the output.' },
  value: { name: 'Measuring value', short: 'Value', measures: 'Whether you have a baseline, track the result, and decide where saved time goes.' },
};

/** Display order, and the order used to break a tie between equal scores: foundations first. */
export const AREA_ORDER: AreaId[] = ['rules', 'direction', 'setup', 'skills', 'work', 'value'];

export const CONTEXT_QUESTIONS: ContextQuestion[] = [
  { id: 'teamSize', text: 'How many people work in the business?', options: ['1-2', '3-9', '10-49', '50-200', '200+'] },
  { id: 'mainTool', text: 'Which AI tool do your people mainly use?', options: ['Claude', 'Microsoft Copilot', 'ChatGPT', 'A mix', 'None yet'] },
];

export const TEAM_SIZE_LABELS: Record<string, string> = {
  '1-2': '1 or 2 people',
  '3-9': '3 to 9 people',
  '10-49': '10 to 49 people',
  '50-200': '50 to 200 people',
  '200+': 'More than 200 people',
};

/**
 * Eighteen scored questions, three for each area. Every question has four
 * options scored 0, 1, 2, 3, each describing something a person can observe,
 * so two people in the same business should give the same answer.
 */
export const QUESTIONS: Question[] = [
  // Direction
  { id: 'd1', area: 'direction', text: 'Does the person who runs the business use AI in their own work?', options: [
    { label: 'No, or only to try it out', score: 0 },
    { label: 'Now and then, for odd jobs', score: 1 },
    { label: 'Most weeks, for real work', score: 2 },
    { label: 'Every week, and the team sees them do it', score: 3 },
  ] },
  { id: 'd2', area: 'direction', text: 'Have you said what you want AI to do for the business?', options: [
    { label: 'No, we have not discussed it', score: 0 },
    { label: 'We have talked about it and agreed nothing', score: 1 },
    { label: 'We have a goal, with no measure or date', score: 2 },
    { label: 'Yes, a written goal with a measure and a date', score: 3 },
  ] },
  { id: 'd3', area: 'direction', text: 'Who is responsible for how AI is used across the business?', options: [
    { label: 'Nobody', score: 0 },
    { label: 'Whoever is most interested, informally', score: 1 },
    { label: 'A named person, on top of their main job', score: 2 },
    { label: 'A named person with time set aside and the authority to decide', score: 3 },
  ] },
  // Tools and set-up
  { id: 's1', area: 'setup', text: 'Which accounts do your people use for AI at work?', options: [
    { label: 'We do not know', score: 0 },
    { label: 'Mostly personal or free accounts', score: 1 },
    { label: 'A mix of company and personal accounts', score: 2 },
    { label: 'Company accounts only, on a business plan', score: 3 },
  ] },
  { id: 's2', area: 'setup', text: 'Does everyone start from the same set-up, with your business context already in it?', options: [
    { label: 'No, each person starts from a blank chat', score: 0 },
    { label: 'A few people have built their own', score: 1 },
    { label: 'Some teams share a set-up', score: 2 },
    { label: 'Yes, one set-up for the business that everyone uses', score: 3 },
  ] },
  { id: 's3', area: 'setup', text: 'Can your AI tool work with the files and systems your team uses?', options: [
    { label: 'No, people copy and paste into a chat window', score: 0 },
    { label: 'Some people upload files by hand', score: 1 },
    { label: 'It is connected to some of our files or systems', score: 2 },
    { label: 'It is connected to what each team needs, with access controlled', score: 3 },
  ] },
  // Skills and habits
  { id: 'k1', area: 'skills', text: 'How have your people learned to use AI?', options: [
    { label: 'They have not', score: 0 },
    { label: 'Self-taught, from videos and trial and error', score: 1 },
    { label: 'Some have had general training', score: 2 },
    { label: 'Everyone has been trained on their own work', score: 3 },
  ] },
  { id: 'k2', area: 'skills', text: 'How many of your people use AI for real work in a typical week?', options: [
    { label: 'Almost nobody', score: 0 },
    { label: 'A few keen individuals', score: 1 },
    { label: 'About half', score: 2 },
    { label: 'Most people', score: 3 },
  ] },
  { id: 'k3', area: 'skills', text: 'When someone finds a good way to use AI, what happens next?', options: [
    { label: 'They keep it to themselves', score: 0 },
    { label: 'They might tell the person next to them', score: 1 },
    { label: 'It gets shared when someone asks', score: 2 },
    { label: 'It is written down and shared so others can use it', score: 3 },
  ] },
  // Rules and data
  { id: 'r1', area: 'rules', text: 'Do you have written rules for using AI at work?', options: [
    { label: 'No', score: 0 },
    { label: 'We have talked about it and written nothing', score: 1 },
    { label: 'Yes, but most people have not read them', score: 2 },
    { label: 'Yes, everyone has read them and they are reviewed', score: 3 },
  ] },
  { id: 'r2', area: 'rules', text: 'Would your people know what information must never go into an AI tool?', options: [
    { label: 'No, it has never come up', score: 0 },
    { label: 'They would guess', score: 1 },
    { label: 'Most would know, but it is not written down', score: 2 },
    { label: 'Yes, it is written down and everyone has been told', score: 3 },
  ] },
  { id: 'r3', area: 'rules', text: 'If someone wanted to start using a new AI tool, what would happen?', options: [
    { label: 'They would just start using it', score: 0 },
    { label: 'They might mention it to someone', score: 1 },
    { label: 'They would ask a manager, who would decide case by case', score: 2 },
    { label: 'A named person checks it against agreed rules first', score: 3 },
  ] },
  // Work it is used on
  { id: 'w1', area: 'work', text: 'Can you name the specific tasks AI is used for in your business?', options: [
    { label: 'No', score: 0 },
    { label: 'One or two, used by individuals', score: 1 },
    { label: 'Several, in some teams', score: 2 },
    { label: 'Yes, there is a list of tasks for each team', score: 3 },
  ] },
  { id: 'w2', area: 'work', text: 'How is AI used on those tasks?', options: [
    { label: 'One-off questions typed into a chat', score: 0 },
    { label: 'People reuse prompts they have saved', score: 1 },
    { label: 'Some tasks run the same way each time', score: 2 },
    { label: 'Regular tasks run the same way each time, whoever does them', score: 3 },
  ] },
  { id: 'w3', area: 'work', text: 'Who checks AI output before it goes to a customer or into a decision?', options: [
    { label: 'Nobody in particular', score: 0 },
    { label: 'Whoever produced it, if they remember', score: 1 },
    { label: 'The person who produced it, every time', score: 2 },
    { label: 'A named reviewer for each kind of work', score: 3 },
  ] },
  // Measuring value
  { id: 'v1', area: 'value', text: 'Do you know how long your key tasks took before AI?', options: [
    { label: 'No', score: 0 },
    { label: 'Rough guesses', score: 1 },
    { label: 'Measured for one or two tasks', score: 2 },
    { label: 'Measured for every task we use AI on', score: 3 },
  ] },
  { id: 'v2', area: 'value', text: 'Do you track what AI is saving or earning you?', options: [
    { label: 'No', score: 0 },
    { label: 'Stories and impressions only', score: 1 },
    { label: 'We track some tasks', score: 2 },
    { label: 'We report hours or money against a baseline', score: 3 },
  ] },
  { id: 'v3', area: 'value', text: 'When AI saves someone time, what happens to that time?', options: [
    { label: 'Nobody notices', score: 0 },
    { label: 'It fills up with more of the same work', score: 1 },
    { label: 'It is noticed, and nothing is planned for it', score: 2 },
    { label: 'We decide where it goes: more customers, better work or lower cost', score: 3 },
  ] },
];

export const MAX_OPTION_SCORE = 3;

/** Bands on the overall score. The ranges meet with no gaps. */
export const BANDS: { band: Band; min: number; description: string }[] = [
  { band: 'Not started', min: 0, description: 'AI is not yet part of how the business works. Nothing has to be undone, so the first steps are simple ones.' },
  { band: 'Trying it out', min: 25, description: 'Some people use AI, mostly on their own. Little of it is shared, agreed or measured yet.' },
  { band: 'Building', min: 50, description: 'The basics are in place in parts of the business. The work now is making them the same everywhere.' },
  { band: 'Working', min: 75, description: 'AI is part of how the business runs, with rules, training and measurement behind it.' },
];

export const BAND_ORDER: Band[] = ['Not started', 'Trying it out', 'Building', 'Working'];

/** Working needs every area at 50 or more. */
export const WORKING_FLOOR = 50;
/** Below this on Rules and data, the band stops at Trying it out. */
export const RULES_FLOOR = 25;

export interface Advice {
  finding: string;
  thisWeek: string;
  free: { label: string; href: string };
}

export const ADVICE: Record<AreaId, Advice> = {
  rules: {
    finding: 'People are using AI on business information without agreed rules. That is the gap that turns into a data problem.',
    thisWeek: 'Write down the information that must never go into an AI tool, and tell everyone. One page is enough to start.',
    free: { label: 'Free AI policy template', href: `${SITE}/resources/ai-governance/how-to-write-an-ai-policy#template` },
  },
  direction: {
    finding: 'Nobody has said what AI is for here or who owns it, so each person decides for themselves.',
    thisWeek: 'Pick one task of your own and do it with AI this week. Then tell the team what you tried and what happened.',
    free: { label: 'Free AI Manifesto template', href: `${SITE}/ai-manifesto` },
  },
  setup: {
    finding: 'People are working from different accounts and different starting points, so results vary and nothing is under your control.',
    thisWeek: 'List who uses which AI tool on which account. Move work off personal and free accounts.',
    free: { label: 'Which Claude plan to buy', href: `${SITE}/resources/claude/claude-in-the-uk` },
  },
  skills: {
    finding: 'Most people have had no training on their own work, so use depends on a few keen individuals.',
    thisWeek: 'Ask each person to bring one task they do every week. Spend an hour trying those tasks with AI together.',
    free: { label: 'How to train your team', href: `${SITE}/resources/claude/how-to-train-your-team-on-claude` },
  },
  work: {
    finding: 'AI is used for one-off questions more than for the tasks that repeat every week, which is where the hours are.',
    thisWeek: 'Pick one task that repeats every week and write down its steps. That is your first task to hand to AI.',
    free: { label: 'The 3-5-4 Method, free', href: `${SITE}/the-354-method` },
  },
  value: {
    finding: 'You have no baseline, so you cannot show what AI has saved or decide what to do with the time.',
    thisWeek: 'Time one task done the usual way before you change anything. That number is your baseline.',
    free: { label: 'How long before AI pays back', href: `${SITE}/resources/ai-roi/ai-roi-timeline` },
  },
};
