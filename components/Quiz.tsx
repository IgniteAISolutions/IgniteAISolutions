import React, { useState } from 'react';
import { AREAS, CONTEXT_QUESTIONS, QUESTIONS, TEAM_SIZE_LABELS } from '../utils/constants';
import { Context } from '../types';
import ProgressBar from './ProgressBar';
import { ArrowLeft } from 'lucide-react';

interface QuizProps {
  onComplete: (answers: Record<string, number>, context: Context) => void;
}

const TOTAL = CONTEXT_QUESTIONS.length + QUESTIONS.length;

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [context, setContext] = useState<Context>({});

  const isContext = index < CONTEXT_QUESTIONS.length;
  const contextQuestion = isContext ? CONTEXT_QUESTIONS[index] : null;
  const question = isContext ? null : QUESTIONS[index - CONTEXT_QUESTIONS.length];
  const progress = ((index + 1) / TOTAL) * 100;

  const advance = (nextAnswers: Record<string, number>, nextContext: Context) => {
    if (index < TOTAL - 1) {
      setTimeout(() => setIndex((i) => i + 1), 200);
    } else {
      onComplete(nextAnswers, nextContext);
    }
  };

  const chooseContext = (value: string) => {
    const next = { ...context, [contextQuestion!.id]: value } as Context;
    setContext(next);
    advance(answers, next);
  };

  const chooseScore = (score: number) => {
    const next = { ...answers, [question!.id]: score };
    setAnswers(next);
    advance(next, context);
  };

  const options = isContext
    ? contextQuestion!.options.map((value) => ({
        key: value,
        label: contextQuestion!.id === 'teamSize' ? TEAM_SIZE_LABELS[value] : value,
        selected: context[contextQuestion!.id] === value,
        onClick: () => chooseContext(value),
      }))
    : question!.options.map((option) => ({
        key: String(option.score),
        label: option.label,
        selected: answers[question!.id] === option.score,
        onClick: () => chooseScore(option.score),
      }));

  return (
    <div className="w-full max-w-3xl mx-auto px-5 sm:px-6 py-10 flex flex-col min-h-[70vh]">
      <div className="mb-10">
        <div className="flex justify-between text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
          <span>Question {index + 1} of {TOTAL}</span>
          <span>{isContext ? 'About you' : AREAS[question!.area].name}</span>
        </div>
        <ProgressBar progress={progress} />
      </div>

      <div key={index} className="flex-grow flex flex-col justify-center animate-fade-in">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-8 leading-snug">
          {isContext ? contextQuestion!.text : question!.text}
        </h2>

        <div className="grid grid-cols-1 gap-3" role="radiogroup">
          {options.map((option) => (
            <button
              key={option.key}
              type="button"
              role="radio"
              aria-checked={option.selected}
              onClick={option.onClick}
              className={`w-full text-left px-5 py-4 md:px-6 md:py-5 rounded-xl border-2 transition-all duration-150 ${
                option.selected
                  ? 'bg-orange-500 border-orange-500 text-white'
                  : 'bg-white/5 border-white/10 text-gray-200 hover:border-orange-500/60 hover:bg-white/10'
              }`}
            >
              <span className="text-base md:text-lg font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 border-t border-white/10 pt-6">
        <button
          type="button"
          onClick={() => index > 0 && setIndex((i) => i - 1)}
          disabled={index === 0}
          className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors ${
            index === 0 ? 'text-gray-700 cursor-not-allowed' : 'text-gray-400 hover:text-white'
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </button>
      </div>
    </div>
  );
};

export default Quiz;
