import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import LeadForm from './components/LeadForm';
import Quiz from './components/Quiz';
import Results from './components/Results';
import { Step, LeadData, ScoreResult } from './types';
import { calculateScores } from './utils/scoring';

const App: React.FC = () => {
  const [step, setStep] = useState<Step>('landing');
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [utmParams, setUtmParams] = useState<{ source?: string; medium?: string; campaign?: string }>({});

  // Capture UTM parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      source: params.get('utm_source') || undefined,
      medium: params.get('utm_medium') || undefined,
      campaign: params.get('utm_campaign') || undefined,
    });
  }, []);

  const handleStart = () => {
    setStep('lead-capture');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLeadSubmit = (data: LeadData) => {
    const completeLead = {
      ...data,
      utm: utmParams
    };
    setLeadData(completeLead);
    setStep('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizComplete = (answers: Record<string, number>) => {
    const result = calculateScores(answers);
    setScoreResult(result);
    setStep('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    console.log('Lead Submission:', {
      lead: leadData,
      answers: answers,
      results: result
    });
  };

  return (
    <div className="min-h-screen bg-charcoal flex flex-col font-sans text-white selection:bg-orange-500/30">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-orange-600/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-5%] left-[-5%] w-[40vw] h-[40vw] bg-red-600/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Premium Glass Navigation */}
      <nav className="sticky top-0 z-50 glass-nav print:hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-24 flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-4 group cursor-pointer" onClick={() => setStep('landing')}>
            {/* Using Image from public folder */}
            <img 
              src="/spark-logo.png" 
              alt="Ignite AI" 
              className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tighter text-white leading-none">IGNITE AI</span>
              <span className="text-[9px] font-bold text-muted uppercase tracking-[0.4em] mt-1">Readiness Scorecard</span>
            </div>
          </div>
          
          {/* Right Side Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="https://igniteaisolutions.co.uk" 
              className="text-xs font-black text-white hover:text-orange-500 transition-all uppercase tracking-[0.2em] border border-white/20 px-6 py-3 rounded-full hover:bg-white/5"
            >
              Back to Main Website
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow relative z-10">
        {step === 'landing' && <LandingPage onStart={handleStart} />}
        {step === 'lead-capture' && <LeadForm onSubmit={handleLeadSubmit} />}
        {step === 'quiz' && <Quiz onComplete={handleQuizComplete} />}
        {step === 'results' && scoreResult && <Results score={scoreResult} />}
      </main>

      {/* Footer - Matching Main Website Style */}
      <footer className="border-t border-white/10 mt-32 py-16 bg-black/60 print:hidden relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 text-center">
            {/* Trust Badges - Text Placeholders (Replace with <img> tags if you have the files in /public) */}
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-10 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <span className="text-lg font-bold tracking-tight">FORBES</span>
                <span className="text-lg font-bold tracking-tight">BRITISH VETERAN OWNED</span>
                <span className="text-lg font-bold tracking-tight">ARMED FORCES COVENANT</span>
                <span className="text-lg font-bold tracking-tight">KASP</span>
                <span className="text-lg font-bold tracking-tight">IAOCAIO</span>
            </div>
            <p className="text-gray-600 text-sm font-medium tracking-wide">© {new Date().getFullYear()} Ignite AI Solutions Ltd. Built for UK Business.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
