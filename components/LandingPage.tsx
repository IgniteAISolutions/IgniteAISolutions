import React from 'react';
import Button from './Button';
import { ShieldCheck, BarChart3, Clock, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-ignite-navy sm:text-5xl sm:tracking-tight lg:text-6xl">
          85% of AI Projects Fail.
          <span className="block text-ignite-orange mt-2">Where Does Your Organisation Stand?</span>
        </h1>
        <p className="mt-5 max-w-2xl mx-auto text-xl text-gray-500">
          Take the 3-minute AI Readiness Scorecard and discover your organisation's strengths, blind spots, and priority actions – benchmarked against 4,200+ UK SMEs.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 border border-gray-100">
        <div className="p-8 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-50 p-3 rounded-full mb-4">
                <BarChart3 className="h-8 w-8 text-ignite-navy" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Get Your Score</h3>
              <p className="mt-2 text-sm text-gray-500">
                Instantly see your readiness score (0-100) and risk profile.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-50 p-3 rounded-full mb-4">
                <ShieldCheck className="h-8 w-8 text-ignite-navy" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Benchmark Data</h3>
              <p className="mt-2 text-sm text-gray-500">
                Compare your maturity against UK SME averages.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-50 p-3 rounded-full mb-4">
                <Clock className="h-8 w-8 text-ignite-navy" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Actionable Plan</h3>
              <p className="mt-2 text-sm text-gray-500">
                Receive specific recommendations for your top 3 priority areas.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button onClick={onStart} size="lg" className="text-lg px-10 py-4 w-full sm:w-auto">
              Get My Readiness Score <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="mt-4 text-sm text-gray-400">
              No credit card required • Takes 3 minutes • GDPR Compliant
            </p>
          </div>
        </div>
      </div>

      <div className="text-center border-t border-gray-200 pt-8">
        <p className="text-sm text-gray-500 mb-4">Trusted by leaders at</p>
        <div className="flex justify-center space-x-8 opacity-50 grayscale">
          {/* Placeholder for logos - simulated with text for this demo */}
          <span className="font-bold text-xl text-gray-400">TechCorp</span>
          <span className="font-bold text-xl text-gray-400">FinGroup</span>
          <span className="font-bold text-xl text-gray-400">ManuFact</span>
          <span className="font-bold text-xl text-gray-400">RetailCo</span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;