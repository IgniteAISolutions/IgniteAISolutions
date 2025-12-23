import React from 'react';
import { ScoreResult, Dimension } from '../types';
// Make sure this points to utils
import { RECOMMENDATIONS, SCORE_BANDS, SEGMENT_MESSAGING, BOOKING_LINK } from '../utils/constants';
import Button from './Button';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
// Ensure Lucide icons are imported correctly
import { CheckCircle, Calendar, TrendingUp, Target, Zap, ArrowRight, Lightbulb } from 'lucide-react';

interface ResultsProps {
  score: ScoreResult;
}

const Results: React.FC<ResultsProps> = ({ score }) => {
  const radarData = Object.keys(score.dimensionPercentages).map((key) => {
    const dim = key as Dimension;
    return {
      subject: dim.replace('Leadership Gravity', 'Leadership')
                  .replace('Cultural Resilience', 'Culture')
                  .replace('Skill Visibility', 'Skills')
                  .replace('Champion Density', 'Champions')
                  .replace('Governance Confidence', 'Governance')
                  .replace('Capacity Direction', 'Direction'),
      fullName: dim,
      score: score.dimensionPercentages[dim],
      fullMark: 100,
    };
  });

  const bandInfo = SCORE_BANDS[score.riskLevel];
  const weakestRec = RECOMMENDATIONS[score.weakestDimension];
  const segmentInfo = SEGMENT_MESSAGING[score.segment];
  
  const weakestScore = score.dimensionPercentages[score.weakestDimension];
  const gap = 80 - weakestScore; 

  const handleBookCall = () => {
    window.open(BOOKING_LINK, '_blank');
  };

  const getScoreColour = (pct: number): string => {
    if (pct >= 66) return 'text-green-400';
    if (pct >= 46) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRiskColour = (level: string): string => {
    if (level === 'Strong' || level === 'Ready') return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (level === 'Building') return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-red-500/20 text-red-400 border-red-500/30';
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-16 animate-fade-in print:p-0">
      
      {/* HEADER - Increased sizes */}
      <div className="text-center mb-16 print:mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-bold uppercase tracking-widest mb-8 print:hidden">
          <CheckCircle className="w-4 h-4" /> Assessment Complete
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6 print:text-black">
          Your Human Capability Score
        </h1>
        <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto print:text-gray-600 leading-relaxed">
          {segmentInfo.headline}
        </p>
      </div>

      {/* SCORE + RISK LEVEL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        
        {/* SCORE CARD */}
        <div className="glass-panel p-10 flex flex-col items-center justify-center text-center border-t-4 border-t-orange-500 print:border-gray-300 min-h-[400px]">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Overall Score</h3>
          
          <div className="relative mb-6">
            <span className={`text-8xl md:text-9xl font-black tracking-tighter ${getScoreColour(score.totalPercentage)}`}>
              {score.totalPercentage}
            </span>
            <span className="absolute top-4 -right-8 text-3xl text-gray-500 font-bold">%</span>
          </div>

          <div className={`inline-block px-6 py-3 rounded-lg border mb-8 ${getRiskColour(score.riskLevel)} print:bg-white print:text-black print:border-black`}>
            <span className="text-lg font-bold uppercase tracking-wide">
              {score.riskLevel}
            </span>
          </div>

          <p className="text-gray-300 text-lg leading-relaxed print:text-gray-800 max-w-sm">
            {bandInfo.description}
          </p>
        </div>

        {/* RADAR CHART */}
        <div className="glass-panel p-8 flex flex-col print:bg-white min-h-[400px]">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-500" /> Dimension Breakdown
          </h3>
          
          <div className="flex-grow w-full min-h-[300px] print:hidden">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#94A3B8', fontSize: 13, fontWeight: 600 }} 
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Your Score"
                  dataKey="score"
                  stroke="#F97316"
                  strokeWidth={3}
                  fill="#F97316"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SEGMENT INSIGHT - Bigger text */}
      <div className="glass-panel p-10 mb-16 border-l-4 border-l-orange-500 print:border-gray-300">
        <div className="flex items-start gap-6">
            <Lightbulb className="w-8 h-8 text-orange-400 flex-shrink-0 mt-1" />
            <div>
                <h3 className="text-2xl font-bold text-white mb-4 print:text-black">Insight for your stage</h3>
                <p className="text-gray-300 text-lg leading-relaxed print:text-gray-800">
                  {segmentInfo.insight}
                </p>
            </div>
        </div>
      </div>

      {/* PRIORITY ACTION - Single Focus */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <Target className="w-8 h-8 text-orange-500" />
          <h2 className="text-3xl font-black text-white print:text-black">Your #1 Priority</h2>
        </div>
        
        <div className="glass-panel p-10 border border-orange-500/30 bg-orange-500/5 print:bg-white print:border-gray-300">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-sm font-bold text-orange-400 uppercase tracking-widest print:text-black">
                  {score.weakestDimension}
                </span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">
                  Gap: {gap > 0 ? `${gap} points to Ready` : 'Strong Area'}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 print:text-black">
                {weakestRec.title}
              </h3>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-8 print:text-gray-800">
                {weakestRec.text}
              </p>

              <div className="bg-white/5 rounded-xl p-6 mb-8 print:bg-gray-100">
                <p className="text-sm font-bold text-orange-500 uppercase tracking-wider mb-3">
                  The Question You Need to Answer
                </p>
                <p className="text-white text-xl font-medium italic print:text-black">
                  "{weakestRec.question}"
                </p>
              </div>

              <div className="bg-orange-500/10 rounded-xl p-6 border border-orange-500/20 print:bg-gray-100 print:border-gray-300">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-5 h-5 text-orange-400 print:text-black" />
                  <p className="text-sm font-bold text-orange-400 uppercase tracking-wider print:text-black">
                    Monday Action
                  </p>
                </div>
                <p className="text-gray-200 text-lg leading-relaxed print:text-black">
                  {weakestRec.mondayAction}
                </p>
              </div>
            </div>

            <div className="md:w-40 flex-shrink-0 flex md:flex-col items-center justify-center gap-2 text-center border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-8 print:border-gray-200">
              <div className={`text-6xl font-black ${getScoreColour(weakestScore)}`}>
                {weakestScore}%
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">
                Current Score
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEXT STEP - SPARK Positioning - Bigger Buttons */}
      <div className="glass-panel p-10 md:p-14 text-center border border-white/10 print:hidden">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
          This Assessment Covers the Human Side
        </h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
          {segmentInfo.sparkPosition}
        </p>
        
        <div className="bg-white/5 rounded-xl p-8 max-w-2xl mx-auto mb-10">
          <p className="text-sm text-gray-400 mb-3 uppercase tracking-wider font-bold">Recommended Next Step</p>
          <p className="text-white text-xl font-medium">
            {bandInfo.action}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {/* PRIMARY BUTTON (Orange) */}
          <Button onClick={handleBookCall} variant="primary" className="text-lg px-8 py-4">
            <Calendar className="w-5 h-5 mr-3" /> Book a 30-Minute Call
          </Button>

          {/* SECONDARY BUTTON (Now forced Orange to match request) */}
          <Button 
            onClick={() => window.location.reload()} 
            variant="primary" // Changed to primary to make it ORANGE as requested
            className="text-lg px-8 py-4 bg-orange-600 hover:bg-orange-700" // Slightly darker to distinguish, or remove this className to match exactly
          >
            <ArrowRight className="w-5 h-5 mr-3" /> Retake Assessment
          </Button>
        </div>
      </div>

      <div className="text-center mt-16 text-gray-500 text-sm hidden print:block">
        <p>Ignite AI Solutions Ltd • {new Date().toLocaleDateString('en-GB')}</p>
      </div>

    </div>
  );
};

export default Results;
