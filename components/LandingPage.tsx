import React from 'react';
import { ArrowRight } from 'lucide-react';
import { AREAS, AREA_ORDER } from '../utils/constants';
import Button from './Button';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => (
  <div className="w-full max-w-4xl mx-auto px-5 sm:px-6 py-12 md:py-16">
    <div className="text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-orange-400 mb-4">Free, about four minutes</p>
      <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
        AI Readiness Scorecard
      </h1>
      <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-4 leading-relaxed">
        Where does your business stand with AI, and what should you do first?
      </p>
      <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        Twenty questions about what happens in your business today. You get a score out of 100,
        a score for each of six areas, and one thing to do this week for your two weakest.
      </p>
      <div className="flex justify-center">
        <Button onClick={onStart} className="text-lg px-10 py-4">
          Start the scorecard <ArrowRight className="ml-3 w-5 h-5" />
        </Button>
      </div>
      <p className="mt-5 text-sm text-gray-400">No sign-up needed to see your result.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-14">
      {AREA_ORDER.map((area) => (
        <div key={area} className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h2 className="text-lg font-bold text-white mb-1">{AREAS[area].name}</h2>
          <p className="text-gray-400 text-base leading-relaxed">{AREAS[area].measures}</p>
        </div>
      ))}
    </div>

    <div className="mt-12 text-gray-300 text-base leading-relaxed max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-white mb-3">How the score works</h2>
      <p className="mb-3">
        Each question has four answers, scored 0 to 3, and each describes something you can see in the
        business. Three questions make an area. Your overall score is the plain average of the six areas.
      </p>
      <p>
        Two rules stop a high average hiding a missing foundation. The top band needs every area at 50 or
        more. And if people do not know what data must stay out of AI tools, the band stops at
        Trying it out, whatever else is in place.
      </p>
    </div>
  </div>
);

export default LandingPage;
