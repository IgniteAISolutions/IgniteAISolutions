import React from 'react';
import { ScoreResult, Dimension } from '../types';
import { RECOMMENDATIONS, SCORE_BANDS, CALENDLY_LINK } from '../constants';
import Button from './Button';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { Download, CheckCircle, ChevronRight, Share2, Calendar, TrendingUp } from 'lucide-react';

interface ResultsProps {
  score: ScoreResult;
}

const Results: React.FC<ResultsProps> = ({ score }) => {
  // Only mapping 'You' data now to remove the fake benchmark
  const radarData = Object.keys(score.dimensionPercentages).map((key) => {
    const dim = key as Dimension;
    return {
      subject: dim,
      You: score.dimensionPercentages[dim],
      fullMark: 100,
    };
  });

  const sortedDimensions = (Object.entries(score.dimensionPercentages) as [Dimension, number][])
    .sort(([, a], [, b]) => a - b)
    .slice(0, 3);

  const bandInfo = SCORE_BANDS[score.riskLevel];

  const handleDownload = () => {
    window.print();
  };

  const handleBookCall = () => {
    window.open(CALENDLY_LINK, '_blank');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in print:p-0">
      
      {/* HEADER */}
      <div className="text-center mb-16 print:mb-8 print:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6 print:hidden">
          <CheckCircle className="w-3 h-3" /> Assessment Complete
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4 print:text-4xl">
          Your Strategic <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 print:text-black">
            Readiness Profile
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* SCORE CARD */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-panel p-8 md:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden border-t-4 border-t-orange-500 h-full">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-4">Readiness Index</h3>
            
            <div className="relative mb-6">
              <span className="text-8xl md:text-9xl font-black text-white tracking-tighter print:text-6xl">
                {score.totalPercentage}
              </span>
              <span className="absolute top-4 -right-8 text-4xl text-orange-500 font-bold">%</span>
            </div>

            <div className="inline-block px-6 py-2 rounded-lg bg-white/5 border border-white/10 mb-8 print:border-gray-300">
              <span className="text-xl font-bold text-white tracking-wide">
                {score.riskLevel}
              </span>
            </div>

            <p className="text-gray-400 text-sm italic border-t border-white/10 pt-6 mt-2">
              "{bandInfo.description}"
            </p>
          </div>
        </div>

        {/* CHART SECTION */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 h-full min-h-[500px] flex flex-col justify-between relative">
             <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" /> Dimension Analysis
                </h3>
             </div>
             
             {/* WEB CHART (Hidden on Print) */}
             <div className="flex-grow w-full h-full relative print:hidden">
                <ResponsiveContainer width="100%" height="100%" minHeight={400}>
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 700 }} 
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="Your Score"
                      dataKey="You"
                      stroke="#F97316"
                      strokeWidth={3}
                      fill="#F97316"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
             </div>

             {/* PRINT FALLBACK TABLE (Visible only on Print) */}
             <div className="hidden print:block w-full mt-4">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="py-2 text-sm font-bold text-black uppercase">Dimension</th>
                      <th className="py-2 text-sm font-bold text-black uppercase text-right">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {radarData.map((item, idx) => (
                      <tr key={idx} className="border-b border-gray-100">
                        <td className="py-2 text-sm text-black">{item.subject}</td>
                        <td className="py-2 text-sm font-bold text-black text-right">{item.You}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        </div>
      </div>

      <div className="page-break-before-always"></div>

      {/* PRIORITIES SECTION */}
      <div className="mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/10">
          <div>
             <h2 className="text-3xl md:text-4xl font-black text-white mb-2">Priority Actions</h2>
             <p className="text-gray-400">Your most critical gaps to address first.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sortedDimensions.map(([dim], idx) => {
            const rec = RECOMMENDATIONS[dim];
            
            return (
              <div key={idx} className="glass-panel p-8 flex flex-col h-full border hover:border-orange-500/50 transition-all duration-300 group">
                <div className="flex justify-between items-start mb-6">
                   <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{dim}</span>
                   <span className="text-[10px] font-bold text-white bg-orange-600 px-3 py-1 rounded-full">
                     PRIORITY #{idx + 1}
                   </span>
                </div>

                <h4 className="font-bold text-xl text-white mb-4 group-hover:text-orange-400 transition-colors">
                  {rec.title}
                </h4>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                  {rec.text}
                </p>

                <div className="pt-6 border-t border-white/5 mt-auto">
                   <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mb-2">Critical Question</p>
                   <p className="text-sm text-white italic font-medium">"{rec.question}"</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* WEB CTA (Hidden on Print) */}
      <div className="print:hidden relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-white/10 p-10 md:p-16 text-center">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Turn Insight Into <span className="text-orange-500">Action.</span>
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10">
               <Button onClick={handleBookCall} className="text-lg px-8 py-4 shadow-xl shadow-orange-900/20">
                  <Calendar className="w-5 h-5 mr-2" /> Book Strategy Call
               </Button>
               <Button onClick={handleDownload} variant="secondary" className="text-lg px-8 py-4 bg-white/5 hover:bg-white/10 border-white/10">
                  <Download className="w-5 h-5 mr-2" /> Download Report
               </Button>
            </div>
            
            <div className="mt-12 flex justify-center items-center gap-8 text-gray-500">
              <button onClick={() => window.location.reload()} className="flex items-center text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
                <ChevronRight className="w-4 h-4 mr-1" /> Restart
              </button>
            </div>
          </div>
      </div>

      {/* PRINT FOOTER */}
      <div className="hidden print:block text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-lg font-bold text-black">Ignite AI Solutions</p>
          <p className="text-sm text-gray-600 mt-1">Generated on {new Date().toLocaleDateString()}</p>
      </div>

    </div>
  );
};

export default Results;
