
import React, { useState } from 'react';
import { QUESTIONS } from '../constants';
import Button from './Button';
import ProgressBar from './ProgressBar';
import { ArrowLeft } from 'lucide-react';

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
    <div className="max-w-3xl mx-auto px-4 py-12">
      <ProgressBar current={currentQuestionIndex + 1} total={QUESTIONS.length} />

      <div className="glass-panel rounded-2xl shadow-2xl p-8 sm:p-12 relative min-h-[500px] flex flex-col border border-white/10">
        <div className="mb-4 text-xs font-bold text-ignite-orange uppercase tracking-[0.2em]">
          {currentQuestion.dimension}
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 leading-snug">
          {currentQuestion.text}
        </h2>

        <div className="space-y-4 flex-grow">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionSelect(option.score)}
              className={`w-full text-left p-5 rounded-xl border transition-all duration-300 ${
                selectedOption === option.score
                  ? 'border-ignite-orange bg-ignite-orange/10 text-white'
                  : 'border-white/10 hover:border-white/30 hover:bg-white/5 text-gray-400'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-4 transition-colors ${
                    selectedOption === option.score ? 'border-ignite-orange' : 'border-gray-600'
                }`}>
                    {selectedOption === option.score && <div className="w-3 h-3 rounded-full bg-ignite-orange shadow-[0_0_10px_rgba(237,137,54,0.5)]" />}
                </div>
                <span className="text-lg font-medium">{option.label}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 flex justify-between items-center pt-8 border-t border-white/10">
           <button 
             onClick={handleBack}
             disabled={currentQuestionIndex === 0}
             className={`flex items-center text-sm font-bold uppercase tracking-widest ${
                 currentQuestionIndex === 0 ? 'text-gray-700 cursor-not-allowed' : 'text-gray-400 hover:text-white transition-colors'
             }`}
           >
               <ArrowLeft className="w-5 h-5 mr-2" /> Back
           </button>
          <Button
            onClick={handleNext}
            disabled={selectedOption === null}
            className={selectedOption === null ? 'opacity-30 cursor-not-allowed' : ''}
          >
            {isLastQuestion ? 'Calculate Results' : 'Next Step'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
