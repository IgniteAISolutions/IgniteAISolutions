import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import LeadForm from './components/LeadForm';
import Quiz from './components/Quiz';
import Results from './components/Results';
import { Step, LeadData, ScoreResult } from './types';
import { calculateScores } from './utils/scoring';
import { Flame } from 'lucide-react';

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
          <div className="flex items-center space-x-4 group cursor-pointer" onClick={() => setStep('landing')}>
            <div className="bg-orange-600 p-2 rounded-xl shadow-[0_0_30px_rgba(237,137,54,0.4)] group-hover:scale-110 transition-transform duration-300">
               <Flame className="h-7 w-7 text-white fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tighter text-white leading-none">IGNITE AI</span>
              <span className="text-[9px] font-bold text-muted uppercase tracking-[0.4em] mt-1">Readiness Scorecard</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            <span className="text-[10px] font-black text-muted uppercase tracking-[0.5em] opacity-50">Enterprise Edition v2.1</span>
            <div className="h-5 w-px bg-white/10"></div>
            <a href="https://ignite-ai.co.uk" className="text-xs font-black text-white hover:text-orange-500 transition-colors uppercase tracking-[0.2em]">Website</a>
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

      {/* High-Contrast Footer */}
      <footer className="border-t border-white/5 mt-32 py-20 bg-black/60 print:hidden relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-12 md:space-y-0">
            <div>
               <div className="font-black text-white tracking-[0.3em] text-xl mb-4">IGNITE AI SOLUTIONS</div>
               <p className="text-muted text-xs max-w-sm leading-relaxed font-medium">
                 Helping UK SMEs navigate the human side of the AI revolution through high-impact strategy, cultural transformation, and human capability building.
               </p>
            </div>
            
            <div className="flex flex-col items-start md:items-end space-y-6">
              <div className="flex flex-wrap gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-muted">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
                <a href="#" className="hover:text-white transition-colors">Accessibility</a>
              </div>
              <p className="text-[10px] text-muted/40 font-bold uppercase tracking-widest">
                © {new Date().getFullYear()} IGNITE AI SOLUTIONS LTD. ALL RIGHTS RESERVED.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;