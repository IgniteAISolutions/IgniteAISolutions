
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
    <div className="min-h-screen bg-charcoal flex flex-col font-sans text-white">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Glass Navigation */}
      <nav className="sticky top-0 z-50 bg-charcoal/80 backdrop-blur-lg border-b border-white/5 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setStep('landing')}>
            <div className="bg-ignite-orange p-1.5 rounded-lg shadow-[0_0_15px_rgba(237,137,54,0.3)]">
               <Flame className="h-6 w-6 text-white fill-current" />
            </div>
            <span className="font-extrabold text-xl tracking-tighter text-white">IGNITE AI</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Readiness Scorecard v1.2</span>
            <div className="h-4 w-px bg-white/10"></div>
            <a href="https://ignite-ai.co.uk" className="text-xs font-bold text-white hover:text-ignite-orange transition-colors uppercase tracking-widest">Back to Site</a>
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

      {/* Footer */}
      <footer className="border-t border-white/5 mt-20 py-16 bg-black/40 print:hidden relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 text-center md:text-left">
            <div>
               <div className="font-extrabold text-white tracking-widest text-lg mb-2">IGNITE AI SOLUTIONS</div>
               <p className="text-gray-500 text-xs max-w-xs leading-relaxed">
                 Helping UK SMEs navigate the human side of the AI revolution through strategy, culture, and capability.
               </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end space-y-4">
              <div className="flex space-x-8 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
              </div>
              <p className="text-[10px] text-gray-600 font-medium">
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
