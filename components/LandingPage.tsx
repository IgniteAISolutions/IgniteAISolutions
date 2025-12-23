import React from 'react';
import Button from './Button';
import { ArrowRight, BarChart3, ShieldCheck, Target } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-[80vh] animate-fade-in text-center">
      
      {/* HEADER SECTION */}
      <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 leading-tight">
        The 70–85% AI Failure <br className="hidden md:block" />
        Rate Is Real. <br />
        <span className="text-orange-500">Where Do You Stand?</span>
      </h1>
      
      <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-12 leading-relaxed">
        "It's not the technology that fails—it's the organisation. Find out if yours is ready."
        <span className="block mt-4 text-lg text-gray-400 font-normal">
          Take the 3-minute AI Readiness Scorecard and discover your organisation's strengths, blind spots, and priority actions.
        </span>
      </p>

      {/* FEATURE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-16">
        {[
          { 
            icon: BarChart3, 
            title: "Maturity Band", 
            desc: "See exactly where you sit on the AI maturity curve." 
          },
          { 
            icon: ShieldCheck, 
            title: "Readiness Score", 
            desc: "A clear score across the six dimensions that actually predict AI success." 
          },
          { 
            icon: Target, 
            title: "Strategic Priority", 
            desc: "Identify the single most critical area to focus on first." 
          }
        ].map((feature, idx) => (
          <div key={idx} className="glass-panel p-8 flex flex-col items-center hover:bg-white/5 transition-colors duration-300">
            <div className="bg-orange-500/10 p-4 rounded-full mb-6">
              <feature.icon className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

      {/* CTA BUTTON */}
      <Button 
        onClick={onStart} 
        className="text-xl px-12 py-5 shadow-2xl shadow-orange-500/20 hover:scale-105 transition-transform duration-300"
      >
        Find Out Your Score <ArrowRight className="ml-3 w-6 h-6" />
      </Button>

      {/* FOOTER TEXT */}
      <div className="mt-12 flex items-center gap-6 text-xs font-bold text-gray-600 uppercase tracking-widest">
        <span>No Credit Card Required</span>
        <span>•</span>
        <span>Takes 3 Minutes</span>
        <span>•</span>
        <span>GDPR Compliant</span>
      </div>
    </div>
  );
};

export default LandingPage;
