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
import { Download, AlertTriangle, ChevronRight, Share2, Calendar } from 'lucide-react';

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
    <div className="max-w-6xl mx-auto px-4 py-16 print:py-0 print:px-0 animate-fade-in">
      <div className="glass-panel overflow-hidden print:bg-white print:text-black shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {/* Header */}
        <div className="bg-white/5 p-10 sm:p-20 text-center border-b border-white/10">
          <p className="text-orange-500 font-black uppercase tracking-[0.4em] text-xs mb-6">Strategic Maturity Audit</p>
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-white">Your AI Readiness Profile</h2>
        </div>

        <div className="p-8 sm:p-20">
          
          {/* Summary Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
            <div>
              <h3 className="text-xs font-bold text-muted uppercase tracking-[0.3em] mb-8">Performance Snapshot</h3>
              <div className="flex items-center space-x-10 mb-12">
                <div className={`text-8xl md:text-9xl font-black text-white`}>
                  {score.totalPercentage}<span className="text-orange-600">%</span>
                </div>
                <div className="h-24 w-px bg-white/10"></div>
                <div>
                   <div className={`text-4xl font-extrabold text-white mb-2`}>{score.riskLevel}</div>
                   <div className="text-muted text-sm font-bold uppercase tracking-widest">Readiness Index</div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-3xl p-10 border border-white/10 backdrop-blur-xl">
                <h4 className="font-bold text-white mb-6 flex items-center text-xl">
                  <AlertTriangle className="w-6 h-6 mr-4 text-orange-500" />
                  Executive Context
                </h4>
                <p className="text-secondary text-lg leading-relaxed mb-8 italic opacity-90">
                  "{bandInfo.description}"
                </p>
                <div className="text-sm font-black text-white flex items-center bg-orange-600/20 px-6 py-4 rounded-xl border border-orange-600/20">
                   <div className="w-3 h-3 bg-orange-500 rounded-full mr-4 shadow-[0_0_10px_#f97316]" />
                   PRIORITY ACTION: <span className="text-orange-500 ml-3 uppercase tracking-wider">{bandInfo.action}</span>
                </div>
              </div>
            </div>

            <div className="h-[500px] w-full glass-panel rounded-3xl p-6 border-white/5 print:bg-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 text-[10px] font-bold text-muted uppercase tracking-[0.2em]">Data Benchmark Tool v2.0</div>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 700 }} 
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Your Profile"
                    dataKey="You"
                    stroke="#F97316"
                    fill="#F97316"
                    fillOpacity={0.5}
                    strokeWidth={3}
                  />
                  <Radar
                    name="UK SME Benchmark"
                    dataKey="Benchmark"
                    stroke="#FFFFFF"
                    fill="#FFFFFF"
                    fillOpacity={0.05}
                    strokeWidth={1}
                    strokeDasharray="4 4"
                  />
                  <Legend verticalAlign="bottom" height={40} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="page-break-before-always print:mt-12"></div>

          {/* Priorities Section */}
          <div className="mb-24">
            <h3 className="text-3xl font-black text-white mb-12 pb-8 border-b border-white/10 uppercase tracking-tight">
              Strategic Priorities <span className="text-orange-600 ml-2">Next 90 Days</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {sortedDimensions.map(([dim, val], idx) => {
                const rec = RECOMMENDATIONS[dim];
                return (
                  <div key={idx} className="flex flex-col glass-panel p-8 border-white/10 hover:border-orange-500/50 transition-all group cursor-default">
                    <div className="flex justify-between items-center mb-8">
                       <span className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">{dim}</span>
                       <span className="text-[10px] font-black text-orange-500 bg-orange-600/10 px-4 py-1.5 rounded-full border border-orange-500/20">Gap: {Math.max(0, BENCHMARKS[dim] - val)}%</span>
                    </div>
                    <h4 className="font-bold text-2xl text-white mb-4 leading-tight group-hover:text-orange-500 transition-colors">{rec.title}</h4>
                    <p className="text-secondary text-sm mb-10 leading-relaxed flex-grow opacity-80">{rec.text}</p>
                    <div className="mt-auto pt-8 border-t border-white/10">
                        <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3">Critical Question:</p>
                        <p className="text-sm italic text-orange-400 font-medium">"{rec.question}"</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-white/5 to-transparent rounded-[40px] p-12 sm:p-24 text-center border border-white/10 shadow-3xl print:hidden relative overflow-hidden">
             <div className="absolute inset-0 bg-orange-600/5 pointer-events-none" />
             <div className="max-w-3xl mx-auto relative z-10">
               <h3 className="text-4xl md:text-5xl font-black mb-8 text-white leading-tight">Master the Human Side <br />of the AI Revolution.</h3>
               <p className="mb-14 text-secondary text-xl leading-relaxed opacity-90">
                   Book your complimentary 15-minute Strategy Alignment session with Chris Duffy to map your tailored human-led AI roadmap.
               </p>
               <div className="flex flex-col sm:flex-row justify-center gap-8">
                   <Button onClick={handleBookCall} className="text-xl px-12 py-5 shadow-[0_10px_30px_rgba(237,137,54,0.4)]">
                      <Calendar className="w-6 h-6 mr-3" />
                      Book Strategy Call
                   </Button>
                   <Button onClick={handleDownload} variant="secondary" className="text-xl px-12 py-5">
                      <Download className="w-6 h-6 mr-3" />
                      Download Audit PDF
                   </Button>
               </div>
               <p className="mt-12 text-[10px] font-black text-muted uppercase tracking-[0.5em]">
                 Exclusive to UK Business Leaders
               </p>
             </div>
          </div>

          {/* Print Footer */}
          <div className="hidden print:block text-center mt-20 pt-10 border-t border-gray-100">
              <p className="text-xl font-bold">Ignite AI Solutions</p>
              <p className="text-sm text-gray-500 mt-2">Helping UK SMEs Navigate the AI Revolution. ignite-ai.co.uk</p>
          </div>

        </div>
      </div>
      
      <div className="mt-16 text-center print:hidden flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-16">
          <button className="text-muted hover:text-white flex items-center text-xs font-black uppercase tracking-[0.3em] transition-all group">
             <Share2 className="w-4 h-4 mr-3 group-hover:scale-125 transition-transform" /> Share Results
          </button>
          <button onClick={() => window.location.reload()} className="text-muted hover:text-white flex items-center text-xs font-black uppercase tracking-[0.3em] transition-all group">
             Restart Audit <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
      </div>
    </div>
  );
};

export default Results;