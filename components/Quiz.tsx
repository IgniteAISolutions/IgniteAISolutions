import React, { useState } from 'react';
import { QUESTIONS } from '../utils/constants';
import Button from './Button';
import ProgressBar from './ProgressBar';
import { ArrowLeft, ChevronRight } from 'lucide-react';

interface QuizProps {
  onComplete: (answers: Record<string, number>) => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === QUESTIONS.length - 1;

  const handleOptionSelect = (score: number) => {
    setSelectedOption(score);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswers = { ...answers, [currentQuestion.id]: selectedOption };
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (isLastQuestion) {
      onComplete(newAnswers);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };
  
  const handleBack = () => {
     if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(prev => prev - 1);
        setSelectedOption(null); 
     }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
      <ProgressBar current={currentQuestionIndex + 1} total={QUESTIONS.length} />

      <div className="glass-panel p-8 sm:p-12 relative min-h-[600px] flex flex-col">
        <div className="mb-6 inline-block bg-orange-600/10 text-orange-500 text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border border-orange-500/20">
          {currentQuestion.dimension}
        </div>
        
        <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-12 leading-tight">
          {currentQuestion.text}
        </h2>

        <div className="space-y-5 flex-grow">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === option.score;
            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(option.score)}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 group ${
                  isSelected
                    ? 'border-orange-500 bg-orange-600/10 text-white shadow-[0_0_20px_rgba(249,115,22,0.15)]'
                    : 'border-white/10 hover:border-white/30 hover:bg-white/5 text-secondary'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-5 transition-all duration-300 ${
                      isSelected ? 'border-orange-500 bg-orange-500' : 'border-white/20 group-hover:border-white/40'
                  }`}>
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />}
                  </div>
                  <span className={`text-lg font-semibold transition-colors ${isSelected ? 'text-white' : 'text-secondary'}`}>
                    {option.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-16 flex justify-between items-center pt-10 border-t border-white/10">
           <button 
             onClick={handleBack}
             disabled={currentQuestionIndex === 0}
             className={`flex items-center text-xs font-bold uppercase tracking-[0.2em] transition-all ${
                 currentQuestionIndex === 0 ? 'opacity-0 pointer-events-none' : 'text-muted hover:text-white'
             }`}
           >
               <ArrowLeft className="w-4 h-4 mr-2" /> Back
           </button>
          <Button
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`min-w-[180px] shadow-lg ${selectedOption === null ? 'opacity-30 cursor-not-allowed' : ''}`}
          >
            {isLastQuestion ? 'View Results' : 'Continue'} <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
