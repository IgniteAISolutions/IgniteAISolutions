import React from 'react';
import { ScoreResult, Dimension } from '../types';
// FIX: Point to ../utils/constants
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
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in print:p-0">
      
      {/* HEADER */}
      <div className="text-center mb-12 print:mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6 print:hidden">
          <CheckCircle className="w-3 h-3" /> Assessment Complete
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 print:text-black">
          Your Human Capability Score
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto print:text-gray-600">
          {segmentInfo.headline}
        </p>
      </div>

      {/* SCORE + RISK LEVEL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        
        {/* SCORE CARD */}
        <div className="glass-panel p-8 flex flex-col items-center justify-center text-center border-t-4 border-t-orange-500 print:border-gray-300">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Overall Score</h3>
          
          <div className="relative mb-4">
            <span className={`text-7xl md:text-8xl font-black tracking-tighter ${getScoreColour(score.totalPercentage)}`}>
              {score.totalPercentage}
            </span>
            <span className="absolute top-2 -right-6 text-2xl text-gray-500 font-bold">%</span>
          </div>

          <div className={`inline-block px-5 py-2 rounded-lg border mb-6 ${getRiskColour(score.riskLevel)} print:bg-white print:text-black print:border-black`}>
            <span className="text-sm font-bold uppercase tracking-wide">
              {score.riskLevel}
            </span>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed print:text-gray-800">
            {bandInfo.description}
          </p>
        </div>

        {/* RADAR CHART */}
        <div className="glass-panel p-6 flex flex-col print:bg-white">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-orange-500" /> Dimension Breakdown
          </h3>
          
          <div className="flex-grow w-full min-h-[300px] print:hidden">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }} 
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Your Score"
                  dataKey="score"
                  stroke="#F97316"
                  strokeWidth={2}
                  fill="#F97316"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* PRINT CHART FALLBACK */}
          <div className="hidden print:block mt-4">
              <table className="w-full text-left">
                  <thead>
                      <tr className="border-b border-gray-300">
                          <th className="py-2 text-black text-sm">Dimension</th>
                          <th className="py-2 text-black text-sm text-right">Score</th>
                      </tr>
                  </thead>
                  <tbody>
                      {radarData.map((d, i) => (
                          <tr key={i} className="border-b border-gray-100">
                              <td className="py-2 text-black text-sm">{d.fullName}</td>
                              <td className="py-2 text-black text-sm text-right font-bold">{d.score}%</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
        </div>
      </div>

      {/* SEGMENT INSIGHT */}
      <div className="glass-panel p-8 mb-12 border-l-4 border-l-orange-500 print:border-gray-300">
        <div className="flex items-start gap-4">
            <Lightbulb className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
            <div>
                <h3 className="text-xl font-bold text-white mb-2 print:text-black">Insight for your stage</h3>
                <p className="text-gray-300 leading-relaxed print:text-gray-800">
                  {segmentInfo.insight}
                </p>
            </div>
        </div>
      </div>

      {/* PRIORITY ACTION - Single Focus */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-black text-white print:text-black">Your #1 Priority</h2>
        </div>
        
        <div className="glass-panel p-8 border border-orange-500/30 bg-orange-500/5 print:bg-white print:border-gray-300">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-widest print:text-black">
                  {score.weakestDimension}
                </span>
                <span className="text-xs text-gray-500">•</span>
                <span className="text-xs text-gray-500">
                  Gap: {gap > 0 ? `${gap} points to Ready` : 'Strong Area'}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 print:text-black">
                {weakestRec.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-6 print:text-gray-800">
                {weakestRec.text}
              </p>

              <div className="bg-white/5 rounded-lg p-4 mb-6 print:bg-gray-100">
                <p className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-2">
                  The Question You Need to Answer
                </p>
                <p className="text-white font-medium italic print:text-black">
                  "{weakestRec.question}"
                </p>
              </div>

              <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20 print:bg-gray-100 print:border-gray-300">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-orange-400 print:text-black" />
                  <p className="text-xs font-bold text-orange-400 uppercase tracking-wider print:text-black">
                    Monday Action
                  </p>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed print:text-black">
                  {weakestRec.mondayAction}
                </p>
              </div>
            </div>

            <div className="md:w-32 flex-shrink-0 flex md:flex-col items-center justify-center gap-2 text-center border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-6 print:border-gray-200">
              <div className={`text-5xl font-black ${getScoreColour(weakestScore)}`}>
                {weakestScore}%
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">
                Current Score
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEXT STEP - SPARK Positioning */}
      <div className="glass-panel p-8 md:p-10 text-center border border-white/10 print:hidden">
        <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
          This Assessment Covers the Human Side
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-6 leading-relaxed">
          {segmentInfo.sparkPosition}
        </p>
        
        <div className="bg-white/5 rounded-lg p-6 max-w-xl mx-auto mb-8">
          <p className="text-sm text-gray-400 mb-2">Recommended Next Step:</p>
          <p className="text-white font-medium">
            {bandInfo.action}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={handleBookCall} className="text-base px-6 py-3">
            <Calendar className="w-4 h-4 mr-2" /> Book a 30-Minute Call
          </Button>
          <Button 
            onClick={() => window.location.reload()} 
            variant="secondary" 
            className="text-base px-6 py-3 bg-white/5 hover:bg-white/10 border-white/10"
          >
            <ArrowRight className="w-4 h-4 mr-2" /> Retake Assessment
          </Button>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center mt-12 text-gray-500 text-sm hidden print:block">
        <p>Ignite AI Solutions Ltd • {new Date().toLocaleDateString('en-GB')}</p>
      </div>

    </div>
  );
};

export default Results;
