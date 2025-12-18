import React from 'react';
import { ScoreResult, Dimension } from '../types';
import { BENCHMARKS, RECOMMENDATIONS } from '../constants';
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
import { Download, Phone, CheckCircle, AlertTriangle } from 'lucide-react';

interface ResultsProps {
  score: ScoreResult;
}

const Results: React.FC<ResultsProps> = ({ score }) => {
  // Prepare data for Radar Chart
  const radarData = Object.keys(score.dimensionPercentages).map((key) => {
    const dim = key as Dimension;
    return {
      subject: dim,
      You: score.dimensionPercentages[dim],
      Benchmark: BENCHMARKS[dim],
      fullMark: 100,
    };
  });

  // Identify top 3 priorities (lowest scores)
  const sortedDimensions = (Object.entries(score.dimensionPercentages) as [Dimension, number][])
    .sort(([, a], [, b]) => a - b)
    .slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header Section */}
        <div className="bg-ignite-navy text-white p-8 sm:p-12 text-center">
          <h2 className="text-3xl font-bold mb-2">Your AI Readiness Report</h2>
          <p className="text-blue-200">Based on your responses across 6 key dimensions</p>
        </div>

        <div className="p-8 sm:p-12">
          
          {/* Top Section: Score & Gauge */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="text-center lg:text-left">
              <h3 className="text-lg font-semibold text-gray-500 uppercase tracking-wider mb-2">Overall Score</h3>
              <div className="flex items-baseline justify-center lg:justify-start">
                <span className={`text-6xl font-extrabold ${score.color}`}>{score.totalPercentage}%</span>
                <span className="text-gray-400 text-xl ml-2">/ 100%</span>
              </div>
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mt-4 ${
                  score.color.replace('text-', 'bg-').replace('600', '100').replace('500', '100')
              } ${score.color}`}>
                  Risk Level: {score.riskLevel}
              </div>
              <p className="mt-6 text-gray-600 leading-relaxed">
                 Your organisation is in the <strong>{score.riskLevel}</strong> phase. 
                 {score.totalPercentage < 40 
                    ? " Immediate action is recommended to build a solid foundation before scaling AI initiatives." 
                    : " You have some strengths to leverage, but significant gaps may hinder scalable ROI."}
              </p>
            </div>

            <div className="h-80 w-full relative">
               <h3 className="text-center text-sm font-semibold text-gray-500 mb-2">Readiness Profile vs UK SME Benchmark</h3>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#4b5563', fontSize: 10 }} 
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="You"
                    dataKey="You"
                    stroke="#1a365d"
                    fill="#1a365d"
                    fillOpacity={0.5}
                  />
                  <Radar
                    name="Benchmark"
                    dataKey="Benchmark"
                    stroke="#ed8936"
                    fill="#ed8936"
                    fillOpacity={0.3}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <hr className="border-gray-100 my-12" />

          {/* Priority Areas */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-ignite-navy mb-8 flex items-center">
              <AlertTriangle className="mr-3 text-ignite-orange" />
              Your Top 3 Priority Areas
            </h3>
            
            <div className="space-y-6">
              {sortedDimensions.map(([dim, val], idx) => {
                const rec = RECOMMENDATIONS[dim];
                return (
                  <div key={idx} className="bg-gray-50 rounded-lg p-6 border-l-4 border-ignite-orange">
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="font-bold text-lg text-gray-900">{dim}</h4>
                       <span className="text-sm font-semibold bg-white px-2 py-1 rounded text-gray-600 border border-gray-200">
                           Score: {val}%
                       </span>
                    </div>
                    <p className="font-medium text-ignite-navy mb-2">{rec.title}</p>
                    <p className="text-gray-600 mb-4 text-sm">{rec.text}</p>
                    <div className="bg-white p-3 rounded border border-blue-100 text-sm text-blue-800 italic">
                        <span className="font-bold not-italic text-blue-900">Ask your team:</span> "{rec.question}"
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-900 rounded-xl p-8 text-white text-center">
             <h3 className="text-2xl font-bold mb-4">Take Action on Your Results</h3>
             <p className="mb-8 text-blue-100 max-w-2xl mx-auto">
                 Don't let these insights go to waste. Book a free 15-minute strategy call to discuss your lowest scoring dimension and how to fix it.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <Button variant="secondary" className="flex items-center justify-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Book Strategy Call
                 </Button>
                 <Button variant="outline" className="flex items-center justify-center bg-transparent border-white text-white hover:bg-blue-800 hover:text-white">
                    <Download className="w-5 h-5 mr-2" />
                    Download Full Report
                 </Button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Results;