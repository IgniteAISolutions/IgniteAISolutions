import React from 'react';
import { ScoreResult, Dimension } from '../types';
import { BENCHMARKS, RECOMMENDATIONS, SCORE_BANDS, CALENDLY_LINK } from '../constants';
import Button from './Button';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Download, CheckCircle, ChevronRight, Share2, Calendar, TrendingUp } from 'lucide-react';

interface ResultsProps {
  score: ScoreResult;
}

const Results: React.FC<ResultsProps> = ({ score }) => {
  const radarData = Object.keys(score.dimensionPercentages).map((key) => {
    const dim = key as Dimension;
    return {
      subject: dim,
      You: score.dimensionPercentages[dim],
      Benchmark: BENCHMARKS[dim],
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 print:p-0 animate-fade-in">
      
      {/* --- HEADER SECTION --- */}
      <div className="text-center mb-16 print:mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6">
          <CheckCircle className="w-3 h-3" /> Assessment Complete
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4">
          Your AI Readiness <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
            Strategic Profile
          </span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Here is the breakdown of where your organisation stands today, and the specific steps required to mature.
        </p>
      </div>

      {/* --- HERO DASHBOARD (Grid Layout) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 print:block">
        
        {/* LEFT COLUMN: THE SCORE (Span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6 print:mb-8">
          {/* Main Score Card */}
          <div className="glass-panel p-8 md:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden border-t-4 border-t-orange-500 h-full print:border text-black">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
            
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-4">Readiness Index</h3>
            
            <div className="relative mb-6">
              <span className="text-8xl md:text-9xl font-black text-white tracking-tighter print:text-black">
                {score.totalPercentage}
              </span>
              <span className="absolute top-4 -right-8 text-4xl text-orange-500 font-bold">%</span>
            </div>

            <div className="inline-block px-6 py-2 rounded-lg bg-white/5 border border-white/10 mb-8">
              <span className="text-xl font-bold text-white tracking-wide print:text-black">
                {score.riskLevel}
              </span>
            </div>

            <p className="text-gray-400 text-sm italic border-t border-white/10 pt-6 mt-2 print:text-black">
              "{bandInfo.description}"
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: THE CHART (Span 7) */}
        <div className="lg:col-span-7 print:break-inside-avoid">
          <div className="glass-panel p-6 h-full min-h-[500px] flex flex-col justify-between relative print:bg-white print:text-black">
             <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-white print:text-black flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" /> Dimension Analysis
                </h3>
                <span className="text-[10px] font-bold text-gray-500 bg-white/5 px-2 py-1 rounded">vs. UK SME Benchmark</span>
             </div>
             
             {/* Chart Container */}
             <div className="flex-grow w-full h-full relative">
                <ResponsiveContainer width="100%" height="100%" minHeight={400}>
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 700 }} 
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
                    <Radar
                      name="Benchmark"
                      dataKey="Benchmark"
                      stroke="#FFFFFF"
                      strokeWidth={1}
                      strokeDasharray="4 4"
                      fill="transparent"
                      fillOpacity={0.1}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </RadarChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>
      </div>

      <div className="page-break-before-always hidden print:block"></div>

      {/* --- PRIORITIES SECTION --- */}
      <div className="mb-20 print:mt-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/10">
          <div>
             <h2 className="text-3xl md:text-4xl font-black text-white mb-2 print:text-black">Strategic Priorities</h2>
             <p className="text-gray-400 print:text-black">Immediate focus areas for the next 90 days.</p>
          </div>
          <div className="mt-4 md:mt-0 text-right hidden md:block">
            <span className="text-orange-500 font-bold text-sm">3 High-Impact Actions Generated</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sortedDimensions.map(([dim, val], idx) => {
            const rec = RECOMMENDATIONS[dim];
            const gap = Math.max(0, BENCHMARKS[dim] - val);
            
            return (
              <div key={idx} className="glass-panel p-8 flex flex-col h-full border hover:border-orange-500/50 transition-all duration-300 group print:bg-white print:border-gray-200 print:text-black print:break-inside-avoid">
                {/* Header with Badge */}
                <div className="flex justify-between items-start mb-6">
                   <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest print:text-gray-600">{dim}</span>
                   {/* High Contrast Badge: Solid Orange, White Text */}
                   <span className="text-[10px] font-bold text-white bg-orange-600 px-3 py-1 rounded-full shadow-lg shadow-orange-900/20">
                     {gap > 0 ? `GAP: ${gap}%` : 'ON TRACK'}
                   </span>
                </div>

                <h4 className="font-bold text-xl text-white mb-4 group-hover:text-orange-400 transition-colors print:text-black">
                  {rec.title}
                </h4>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow print:text-gray-800">
                  {rec.text}
                </p>

                <div className="pt-6 border-t border-white/5 print:border-gray-200 mt-auto">
                   <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mb-2">Critical Question</p>
                   <p className="text-sm text-white italic font-medium print:text-black">"{rec.question}"</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- BOTTOM CTA (Hidden on Print) --- */}
      <div className="print:hidden">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-white/10 p-10 md:p-16 text-center">
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-orange-500/5 blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Turn Insight Into <span className="text-orange-500">Action.</span>
            </h2>
            <p className="text-lg text-gray-400 mb-10 leading-relaxed">
              Data is useful, but execution is what matters. Book your complimentary 15-minute Strategy Alignment session with Chris Duffy to map your tailored human-led AI roadmap.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
               <Button onClick={handleBookCall} className="text-lg px-8 py-4 shadow-xl shadow-orange-900/20">
                  <Calendar className="w-5 h-5 mr-2" /> Book Strategy Call
               </Button>
               <Button onClick={handleDownload} variant="secondary" className="text-lg px-8 py-4 bg-white/5 hover:bg-white/10 border-white/10">
                  <Download className="w-5 h-5 mr-2" /> Download PDF Report
               </Button>
            </div>
            
            <div className="mt-12 flex justify-center items-center gap-8 text-gray-500">
              <button onClick={() => window.location.reload()} className="flex items-center text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
                <ChevronRight className="w-4 h-4 mr-1" /> Restart
              </button>
              <button className="flex items-center text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
                <Share2 className="w-4 h-4 mr-2" /> Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- PRINT FOOTER --- */}
      <div className="hidden print:block text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-lg font-bold text-black">Ignite AI Solutions</p>
          <p className="text-sm text-gray-600 mt-1">Assessment generated on {new Date().toLocaleDateString()}</p>
      </div>

    </div>
  );
};

export default Results;
