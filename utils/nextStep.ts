import { ScoreResult } from '../types';
import { SITE } from './constants';

export interface NextStep {
  title: string;
  text: string;
  label: string;
  href: string;
}

/**
 * One suggested next step with Ignite AI, chosen from the weakest area, the
 * size of the business and the tool it mainly uses.
 */
export function nextStep(result: ScoreResult): NextStep {
  const weakest = result.priorities[0];
  const { teamSize, mainTool } = result.context;

  if (Object.values(result.areaScores).every((v) => v >= 75)) {
    return {
      title: 'Claude managed service',
      text: 'You have the foundations in place. The managed service keeps them that way: support, agreed response times and updates as your team and tools change.',
      label: 'See the managed service',
      href: `${SITE}/claude-managed-service`,
    };
  }

  if (weakest === 'rules') {
    return {
      title: 'AI governance',
      text: 'We write your AI Policy and AI Manifesto with you, screen for DPIAs, and build the rules into how your team uses AI.',
      label: 'See AI governance',
      href: `${SITE}/govern`,
    };
  }
  if (weakest === 'direction') {
    return {
      title: 'Leadership and AI Strategy Day',
      text: 'One day for boards and senior teams on deciding where AI fits in the business.',
      label: 'See the leadership day',
      href: `${SITE}/train/leadership-ai-training`,
    };
  }
  if (weakest === 'value') {
    return {
      title: 'SPARK Discovery',
      text: 'A readiness audit that sets your baseline: where the time goes now, what it costs and what a fix is worth.',
      label: 'See SPARK Discovery',
      href: `${SITE}/spark`,
    };
  }
  if (teamSize === '1-2') {
    return {
      title: 'Founders plugin',
      text: 'Claude set up around a business of one or two people, with two hours one to one with a trained practitioner.',
      label: 'See the Founders plugin',
      href: `${SITE}/claude-built-for-you`,
    };
  }
  if (mainTool === 'Microsoft Copilot') {
    return {
      title: 'Microsoft 365 Copilot training',
      text: 'One day for a team of up to 10, built from the tasks they bring, remote or on site.',
      label: 'See Copilot training',
      href: `${SITE}/train/copilot-training`,
    };
  }
  if (teamSize === '3-9') {
    return {
      title: 'Talk it through',
      text: 'For a team of your size the right start depends on how you work. Tell us what you scored and we will say what we would do first.',
      label: 'Speak to us',
      href: `${SITE}/contact`,
    };
  }
  return {
    title: 'Claude set-up and training for teams',
    text: 'One Claude set-up for the whole business, then every room of up to 10 trained on the work they already do.',
    label: 'See Claude training',
    href: `${SITE}/train`,
  };
}
