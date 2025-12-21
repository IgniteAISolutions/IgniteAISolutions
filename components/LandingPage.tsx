import React from 'react';
import Button from './Button';
import { ShieldCheck, BarChart3, Clock, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-8">
          The 70-85% AI Failure <br />Rate Is Real.
          <span className="block text-gradient mt-4">Where Do You Stand?</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-secondary leading-relaxed">
          Take the 3-minute AI Readiness Scorecard and discover your organisation's strengths, blind spots, and priority actions.
        </p>
      </div>

      <div className="glass-panel overflow-hidden mb-16 p-8 sm:p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="flex flex-col items-center text-center group">
            <div className="bg-white/5 p-4 rounded-2xl mb-6 transition-transform group-hover:scale-110 duration-300">
              <BarChart3 className="h-10 w-10 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Get Your Score</h3>
            <p className="text-muted text-sm leading-relaxed">
              Instantly see your readiness score (0-100) and risk profile.
            </p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="bg-white/5 p-4 rounded-2xl mb-6 transition-transform group-hover:scale-110 duration-300">
              <ShieldCheck className="h-10 w-10 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Benchmark Data</h3>
            <p className="text-muted text-sm leading-relaxed">
              Compare your maturity against UK SME averages.
            </p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="bg-white/5 p-4 rounded-2xl mb-6 transition-transform group-hover:scale-110 duration-300">
              <Clock className="h-10 w-10 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Actionable Plan</h3>
            <p className="text-muted text-sm leading-relaxed">
              Receive specific recommendations for your top priority areas.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button onClick={onStart} className="text-xl px-12 py-5 shadow-2xl">
            Find Out Your Score <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-[10px] font-bold text-muted uppercase tracking-[0.2em]">
            <span>No credit card required</span>
            <span className="w-1 h-1 rounded-full bg-white/20 self-center"></span>
            <span>Takes 3 minutes</span>
            <span className="w-1 h-1 rounded-full bg-white/20 self-center"></span>
            <span>GDPR Compliant</span>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs font-bold text-muted mb-10 uppercase tracking-[0.4em]">Featured & Trusted By</p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
           <span className="text-2xl font-black italic tracking-tighter">FORBES</span>
           <span className="text-2xl font-bold tracking-tight">BCG</span>
           <span className="text-2xl font-black italic">MIT SLOAN</span>
           <span className="text-2xl font-bold">ANTHROPIC</span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;