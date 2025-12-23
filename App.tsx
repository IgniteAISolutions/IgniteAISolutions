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

    // --- GHL WEBHOOK INTEGRATION ---
    // FIX: Map the new specific fields (firstName, companyName) to the generic CRM fields
    const payload = {
      name: `${data.firstName} ${data.lastName}`, // Combine names for CRM
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      company: data.companyName, // Map companyName -> company
      role: data.jobTitle,       // Map jobTitle -> role
      turnover: data.turnover,
      source: 'AI Readiness Scorecard',
      ...utmParams
    };

    // Send to GoHighLevel
    fetch('https://services.leadconnectorhq.com/hooks/x9IxlQebO9PXRux0i04o/webhook-trigger/43cbab61-c625-4f3d-9b33-5c0ab84abf53', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(err => console.error('Webhook Error:', err));
    // -------------------------------

    setStep('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizComplete = (answers: Record<string, number>) => {
    // Calculate results using the new scoring logic
    const result = calculateScores(answers);
    setScoreResult(result);
    setStep('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-charcoal flex flex-col font-sans text-white selection:bg-orange-500/30">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-orange-600/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-5%] left-[-5%] w-[40vw] h-[40vw] bg-red-600/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-nav print:hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-24 flex items-center justify-between">
          
          <div className="flex items-center space-x-4 group cursor-pointer" onClick={() => setStep('landing')}>
            <img 
              src="/Ignite letterhead.png" 
              onError={(e) => { e.currentTarget.src = "/spark-logo.png"; }} 
              alt="Ignite AI Solutions" 
              className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
            />
          </div>
          
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

      {/* Footer */}
      <footer className="border-t border-white/10 mt-32 py-16 bg-black/60 print:hidden relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 text-center">
            <p className="text-gray-600 text-sm font-medium tracking-wide">
              © {new Date().getFullYear()} Ignite AI Solutions Ltd. Built for UK Business.
              <span className="mx-3 text-gray-700">|</span>
              <a href="https://igniteaisolutions.co.uk/privacy.html" target="_blank" rel="noreferrer" className="hover:text-orange-500 transition-colors">
                Privacy Policy
              </a>
            </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
