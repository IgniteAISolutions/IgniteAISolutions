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
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
          The 70-85% AI Failure <br />Rate Is Real.
          <span className="block text-gradient mt-4">Where Do You Stand?</span>
        </h1>
        
        {/* The "Why" Hook */}
        <p className="text-xl md:text-2xl font-light text-white mb-6 italic opacity-90">
          "It's not the technology that fails—it's the organisation. Find out if yours is ready."
        </p>

        <p className="mt-6 max-w-2xl mx-auto text-lg text-secondary leading-relaxed">
          Take the 3-minute AI Readiness Scorecard and discover your organisation's strengths, blind spots, and priority actions.
        </p>
      </div>

      <div className="glass-panel overflow-hidden mb-16 p-8 sm:p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Item 1: Maturity Band */}
          <div className="flex flex-col items-center text-center group">
            <div className="bg-white/5 p-4 rounded-2xl mb-6 transition-transform group-hover:scale-110 duration-300">
              <BarChart3 className="h-10 w-10 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Maturity Band</h3>
            <p className="text-muted text-sm leading-relaxed">
              See exactly where you sit on the AI maturity curve.
            </p>
          </div>

          {/* Item 2: Readiness Score (UPDATED COPY) */}
          <div className="flex flex-col items-center text-center group">
            <div className="bg-white/5 p-4 rounded-2xl mb-6 transition-transform group-hover:scale-110 duration-300">
              <ShieldCheck className="h-10 w-10 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Readiness Score</h3>
            <p className="text-muted text-sm leading-relaxed">
              A clear score across the six dimensions that actually predict AI success.
            </p>
          </div>

          {/* Item 3: Strategic Priority */}
          <div className="flex flex-col items-center text-center group">
            <div className="bg-white/5 p-4 rounded-2xl mb-6 transition-transform group-hover:scale-110 duration-300">
              <Clock className="h-10 w-10 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Strategic Priority</h3>
            <p className="text-muted text-sm leading-relaxed">
              Identify the single most critical area to focus on first.
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
      
    </div>
  );
};

export default LandingPage;
