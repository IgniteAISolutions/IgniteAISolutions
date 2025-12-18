import React, { useState } from 'react';
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

  const handleStart = () => {
    setStep('lead-capture');
  };

  const handleLeadSubmit = (data: LeadData) => {
    setLeadData(data);
    setStep('quiz');
  };

  const handleQuizComplete = (answers: Record<string, number>) => {
    const result = calculateScores(answers);
    setScoreResult(result);
    setStep('results');
    
    // Here you would typically send data to a backend/CRM
    console.log('Lead:', leadData);
    console.log('Answers:', answers);
    console.log('Results:', result);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-ignite-navy p-1.5 rounded">
               <Flame className="h-6 w-6 text-ignite-orange fill-current" />
            </div>
            <span className="font-bold text-xl text-ignite-navy tracking-tight">Ignite AI Solutions</span>
          </div>
          <div className="text-sm text-gray-500 hidden sm:block">
            AI Readiness Scorecard
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {step === 'landing' && <LandingPage onStart={handleStart} />}
        {step === 'lead-capture' && <LeadForm onSubmit={handleLeadSubmit} />}
        {step === 'quiz' && <Quiz onComplete={handleQuizComplete} />}
        {step === 'results' && scoreResult && <Results score={scoreResult} />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Ignite AI Solutions Ltd. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;