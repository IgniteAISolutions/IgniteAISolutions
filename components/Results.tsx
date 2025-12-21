
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
import { Download, Phone, AlertTriangle, ChevronRight, Share2, Calendar } from 'lucide-react';

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
    <div className="max-w-6xl mx-auto px-4 py-16 print:py-0 print:px-0">
      <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 print:bg-white print:text-black shadow-2xl">
        
        {/* Header */}
        <div className="bg-white/5 p-10 sm:p-16 text-center border-b border-white/10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">Your AI Readiness Profile</h2>
          <p className="text-ignite-orange font-bold uppercase tracking-[0.3em] text-sm">Strategic Maturity Assessment</p>
        </div>

        <div className="p-10 sm:p-16">
          
          {/* Summary Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-20">
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-6">Maturity Benchmarking</h3>
              <div className="flex items-center space-x-6 mb-10">
                <div className={`text-8xl font-black ${score.color}`}>{score.totalPercentage}%</div>
                <div className="h-20 w-px bg-white/10"></div>
                <div>
                   <div className={`text-3xl font-bold ${score.color} mb-1`}>{score.riskLevel}</div>
                   <div className="text-gray-500 text-sm font-medium">Readiness Index</div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-md">
                <h4 className="font-bold text-white mb-4 flex items-center text-lg">
                  <AlertTriangle className="w-5 h-5 mr-3 text-ignite-orange" />
                  Maturity Context
                </h4>
                <p className="text-gray-400 text-base leading-relaxed mb-6 italic">
                  "{bandInfo.description}"
                </p>
                <div className="text-sm font-bold text-white flex items-center">
                   <div className="w-2 h-2 bg-ignite-orange rounded-full mr-3"></div>
                   PRIORITY ACTION: <span className="text-ignite-orange ml-2">{bandInfo.action}</span>
                </div>
              </div>
            </div>

            <div className="h-[450px] w-full glass-panel rounded-2xl p-4 border-white/5 print:bg-white">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }} 
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Your Profile"
                    dataKey="You"
                    stroke="#ed8936"
                    fill="#ed8936"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="UK SME Average"
                    dataKey="Benchmark"
                    stroke="#ffffff"
                    fill="#ffffff"
                    fillOpacity={0.1}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="page-break-before-always print:mt-12"></div>

          {/* Priorities Section */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-white mb-10 pb-6 border-b border-white/10">
              Immediate Growth Opportunities
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sortedDimensions.map(([dim, val], idx) => {
                const rec = RECOMMENDATIONS[dim];
                return (
                  <div key={idx} className="flex flex-col bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all group">
                    <div className="flex justify-between items-center mb-6">
                       <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{dim}</span>
                       <span className="text-[10px] font-bold text-ignite-orange bg-ignite-orange/10 px-3 py-1 rounded-full border border-ignite-orange/20">Gap: {Math.max(0, BENCHMARKS[dim] - val)}%</span>
                    </div>
                    <h4 className="font-bold text-xl text-white mb-3 leading-tight group-hover:text-ignite-orange transition-colors">{rec.title}</h4>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed flex-grow">{rec.text}</p>
                    <div className="mt-auto pt-6 border-t border-white/5">
                        <p className="text-[10px] font-bold text-gray-500 uppercase mb-2">Strategic Question:</p>
                        <p className="text-sm italic text-ignite-orange">"{rec.question}"</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-ignite-navy/50 to-charcoal rounded-3xl p-10 sm:p-16 text-center border border-ignite-orange/30 shadow-2xl print:hidden">
             <div className="max-w-3xl mx-auto">
               <h3 className="text-4xl font-bold mb-6 text-white leading-tight">Your Next 90 Days <br />Start with a Strategy Call.</h3>
               <p className="mb-12 text-gray-400 text-lg leading-relaxed">
                   Book a complimentary 15-minute Strategy Alignment session with Chris Duffy to discuss these findings and map out a human-led AI roadmap.
               </p>
               <div className="flex flex-col sm:flex-row justify-center gap-6">
                   <Button onClick={handleBookCall} className="flex items-center justify-center text-lg px-10 py-5">
                      <Calendar className="w-5 h-5 mr-3" />
                      Book Strategy Call
                   </Button>
                   <Button onClick={handleDownload} variant="outline" className="flex items-center justify-center text-lg px-10 py-5">
                      <Download className="w-5 h-5 mr-3" />
                      Download Full Report
                   </Button>
               </div>
               <p className="mt-10 text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">
                 Exclusive to UK SME Leaders
               </p>
             </div>
          </div>

          {/* Print Footer */}
          <div className="hidden print:block text-center mt-20 pt-10 border-t border-gray-100">
              <p className="text-lg font-bold text-ignite-navy">Ignite AI Solutions</p>
              <p className="text-sm text-gray-500 mt-2">Helping UK SMEs Navigate the AI Revolution. www.ignite-ai.co.uk</p>
          </div>

        </div>
      </div>
      
      <div className="mt-12 text-center print:hidden flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-12">
          <button className="text-gray-500 hover:text-white flex items-center text-xs font-bold uppercase tracking-widest transition-colors">
             <Share2 className="w-4 h-4 mr-2" /> Share Performance
          </button>
          <button onClick={() => window.location.reload()} className="text-gray-500 hover:text-white flex items-center text-xs font-bold uppercase tracking-widest transition-colors">
             Retake Assessment <ChevronRight className="w-4 h-4 ml-1" />
          </button>
      </div>
    </div>
  );
};

export default Results;
