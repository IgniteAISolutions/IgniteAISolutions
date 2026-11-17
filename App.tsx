import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import LeadForm from './components/LeadForm';
import Quiz from './components/Quiz';
import Results from './components/Results';
import { Context, LeadData, ScoreResult, Step } from './types';
import { calculateScores } from './utils/scoring';
import { createNotionLead, updateNotionWithScore } from './utils/notion';
import { SITE, TEAM_SIZE_LABELS } from './utils/constants';

// The main site shows this app inside a frame on /assessment, which already
// has the site menu and footer around it.
const EMBEDDED = (() => {
  try { return window.self !== window.top; } catch { return true; }
})();

const NAV_LINKS = [
  { label: 'Claude training', href: `${SITE}/train` },
  { label: 'AI governance', href: `${SITE}/govern` },
  { label: 'Pricing', href: `${SITE}/pricing` },
  { label: 'Case studies', href: `${SITE}/case-studies` },
];

const App: React.FC = () => {
  const [step, setStep] = useState<Step>('landing');
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [utmParams, setUtmParams] = useState<{ source?: string; medium?: string; campaign?: string }>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      source: params.get('utm_source') || undefined,
      medium: params.get('utm_medium') || undefined,
      campaign: params.get('utm_campaign') || undefined,
    });
  }, []);

  const go = (next: Step) => {
    setStep(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizComplete = (answers: Record<string, number>, context: Context) => {
    setScoreResult(calculateScores(answers, context));
    go('details');
  };

  // Details are optional. The result shows whether or not the save works.
  const handleLeadSubmit = async (data: LeadData) => {
    if (!scoreResult) return;
    setSubmitting(true);
    try {
      const teamSize = scoreResult.context.teamSize ? TEAM_SIZE_LABELS[scoreResult.context.teamSize] : '';
      const pageId = await createNotionLead({ ...data, teamSize, utm: utmParams }, utmParams);
      if (pageId) await updateNotionWithScore(pageId, data.email, scoreResult);
    } catch (error) {
      console.error('Lead capture error:', error);
    }
    setSubmitting(false);
    go('results');
  };

  const restart = () => {
    setScoreResult(null);
    go('landing');
  };

  return (
    <div className="min-h-screen bg-charcoal flex flex-col font-sans text-white selection:bg-orange-500/30">
      {!EMBEDDED && (
        <nav className="sticky top-0 z-50 glass-nav print:hidden">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between gap-6">
            <a href={`${SITE}/`} aria-label="Ignite AI Solutions, home" className="flex-none">
              <img src="/ignite-logo-2026-navy.webp" alt="Ignite AI Solutions" width="600" height="600" className="h-16 w-auto object-contain" />
            </a>
            <div className="hidden md:flex items-center gap-7 text-sm font-medium">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="text-gray-300 hover:text-white transition-colors">{link.label}</a>
              ))}
            </div>
            <a href={`${SITE}/contact`} className="flex-none text-sm font-bold text-white bg-gradient-to-br from-[#F97316] to-[#e2530a] px-5 py-2.5 rounded-full">
              Speak to us
            </a>
          </div>
        </nav>
      )}

      <main className="flex-grow relative z-10">
        {step === 'landing' && <LandingPage onStart={() => go('quiz')} />}
        {step === 'quiz' && <Quiz onComplete={handleQuizComplete} />}
        {step === 'details' && <LeadForm onSubmit={handleLeadSubmit} onSkip={() => go('results')} submitting={submitting} />}
        {step === 'results' && scoreResult && <Results score={scoreResult} onRestart={restart} />}
      </main>

      {!EMBEDDED && (
        <footer className="border-t border-white/10 mt-16 py-10 bg-[#020d1f] print:hidden relative z-10">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 text-sm text-gray-400 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} Ignite AI Solutions Ltd. Company no. 16194166.
              66 Paul Street, London EC2A 4NA.
            </p>
            <p className="flex gap-5">
              <a href={`${SITE}/`} className="hover:text-white">Main site</a>
              <a href={`${SITE}/privacy`} className="hover:text-white">Privacy</a>
              <a href={`${SITE}/contact`} className="hover:text-white">Contact</a>
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
