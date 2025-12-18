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
        // Reset selection for the previous question if needed, 
        // or load it from answers to allow editing (simple reset for now)
        setSelectedOption(null); 
     }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <ProgressBar current={currentQuestionIndex + 1} total={QUESTIONS.length} />

      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 relative min-h-[400px] flex flex-col">
        <div className="mb-2 text-sm font-semibold text-ignite-orange uppercase tracking-wide">
          {currentQuestion.dimension}
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-8 leading-relaxed">
          {currentQuestion.text}
        </h2>

        <div className="space-y-3 flex-grow">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionSelect(option.score)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedOption === option.score
                  ? 'border-ignite-navy bg-blue-50 text-ignite-navy'
                  : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                    selectedOption === option.score ? 'border-ignite-navy' : 'border-gray-400'
                }`}>
                    {selectedOption === option.score && <div className="w-3 h-3 rounded-full bg-ignite-navy" />}
                </div>
                <span>{option.label}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center pt-6 border-t border-gray-100">
           <button 
             onClick={handleBack}
             disabled={currentQuestionIndex === 0}
             className={`flex items-center text-sm font-medium ${
                 currentQuestionIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-ignite-navy'
             }`}
           >
               <ArrowLeft className="w-4 h-4 mr-1" /> Back
           </button>
          <Button
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`${selectedOption === null ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLastQuestion ? 'See My Results' : 'Next Question'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;