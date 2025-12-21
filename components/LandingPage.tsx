
import React from 'react';
import Button from './Button';
import { ShieldCheck, BarChart3, Clock, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 sm:px-6 lg:px-8 relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px] -z-10 opacity-30"></div>
      
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-8">
          The 70-85% AI Failure <br />Rate Is Real.
          <span className="block text-gradient mt-4">Where Do You Stand?</span>
        </h1>
        <p className="mt-5 max-w-2xl mx-auto text-xl text-gray-400 leading-relaxed">
          Take the 3-minute AI Readiness Scorecard and discover your organisation's strengths, blind spots, and priority actions.
        </p>
      </div>

      <div className="glass-panel rounded-2xl shadow-2xl overflow-hidden mb-16 border border-white/10">
        <div className="p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            <div className="flex flex-col items-center text-center">
              <div className="bg-ignite-orange/10 p-4 rounded-xl mb-5">
                <BarChart3 className="h-8 w-8 text-ignite-orange" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Get Your Score</h3>
              <p className="text-sm text-gray-400">
                Instantly see your readiness score (0-100) and risk profile.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-ignite-orange/10 p-4 rounded-xl mb-5">
                <ShieldCheck className="h-8 w-8 text-ignite-orange" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Benchmark Data</h3>
              <p className="text-sm text-gray-400">
                Compare your maturity against UK SME averages.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-ignite-orange/10 p-4 rounded-xl mb-5">
                <Clock className="h-8 w-8 text-ignite-orange" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Actionable Plan</h3>
              <p className="text-sm text-gray-400">
                Receive specific recommendations for your top priority areas.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button onClick={onStart} className="text-lg px-12 py-5 w-full sm:w-auto">
              Find Out Your Score <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="mt-6 text-xs text-gray-500 uppercase tracking-widest">
              No credit card required • Takes 3 minutes • GDPR Compliant
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs font-bold text-gray-600 mb-8 uppercase tracking-widest">Featured & Trusted By</p>
        <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale contrast-125">
           <div className="h-8 flex items-center font-black text-xl text-white">FORBES</div>
           <div className="h-8 flex items-center font-black text-xl text-white">BCG</div>
           <div className="h-8 flex items-center font-black text-xl text-white">MIT SLOAN</div>
           <div className="h-8 flex items-center font-black text-xl text-white">ANTHROPIC</div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
