import React, { useState } from 'react';
import { QUESTIONS } from '../utils/constants'; // Note: Ensure this import path is correct
import Button from './Button';
import ProgressBar from './ProgressBar';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface QuizProps {
  onComplete: (answers: Record<string, number>) => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentInfoIndex, setCurrentInfoIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const question = QUESTIONS[currentInfoIndex];
  const progress = ((currentInfoIndex + 1) / QUESTIONS.length) * 100;

  const handleOptionSelect = (score: number) => {
    setSlideDirection('right');
    const newAnswers = { ...answers, [question.id]: score };
    setAnswers(newAnswers);

    if (currentInfoIndex < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentInfoIndex(prev => prev + 1), 250); // Small delay for visual feedback
    } else {
      onComplete(newAnswers);
    }
  };

  const handleBack = () => {
    if (currentInfoIndex > 0) {
      setSlideDirection('left');
      setCurrentInfoIndex(prev => prev - 1);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12 flex flex-col min-h-[80vh]">
      
      {/* PROGRESS BAR */}
      <div className="mb-12">
        <div className="flex justify-between text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
          <span>Question {currentInfoIndex + 1} of {QUESTIONS.length}</span>
          <span>{question.dimension}</span>
        </div>
        <ProgressBar progress={progress} />
      </div>

      {/* QUESTION AREA */}
      <div key={currentInfoIndex} className="flex-grow flex flex-col justify-center animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-10 leading-tight">
          {question.text}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {question.options.map((option, idx) => {
            const isSelected = answers[question.id] === option.score;
            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(option.score)}
                className={`
                  w-full text-left p-6 md:p-8 rounded-xl border-2 transition-all duration-200 group relative overflow-hidden
                  ${isSelected 
                    ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20' 
                    : 'bg-white/5 border-white/10 text-gray-300 hover:border-orange-500/50 hover:bg-white/10'
                  }
                `}
              >
                <div className="flex items-center gap-6 relative z-10">
                  <div className={`
                    w-8 h-8 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors
                    ${isSelected ? 'border-white bg-white text-orange-500' : 'border-gray-500 text-transparent group-hover:border-orange-500'}
                  `}>
                    {isSelected && <div className="w-3 h-3 bg-current rounded-full" />}
                  </div>
                  <span className="text-lg md:text-xl font-medium">{option.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* NAVIGATION CONTROLS */}
      <div className="mt-12 flex justify-between items-center border-t border-white/10 pt-8">
        <button 
          onClick={handleBack}
          disabled={currentInfoIndex === 0}
          className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors ${currentInfoIndex === 0 ? 'text-gray-700 cursor-not-allowed' : 'text-gray-400 hover:text-white'}`}
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </button>
        
        <span className="text-gray-600 text-xs hidden md:block">
           Ignite AI Readiness Scorecard
        </span>
      </div>
    </div>
  );
};

export default Quiz;
