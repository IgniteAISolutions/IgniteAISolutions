import React from 'react';
import { AreaId, ScoreResult } from '../types';
import { ADVICE, AREAS, AREA_ORDER, BANDS, BOOKING_LINK } from '../utils/constants';
import { nextStep } from '../utils/nextStep';
import Button from './Button';

interface ResultsProps {
  score: ScoreResult;
  onRestart: () => void;
}

const barColour = (value: number): string => {
  if (value >= 75) return 'bg-green-500';
  if (value >= 50) return 'bg-yellow-400';
  if (value >= 25) return 'bg-orange-500';
  return 'bg-red-500';
};

const AreaBar: React.FC<{ area: AreaId; value: number }> = ({ area, value }) => (
  <div>
    <div className="flex justify-between items-baseline mb-1">
      <span className="text-base font-semibold text-white print:text-black">{AREAS[area].name}</span>
      <span className="text-base font-bold text-white tabular-nums print:text-black">{value}</span>
    </div>
    <div
      className="h-3 rounded-full bg-white/10 overflow-hidden print:border print:border-gray-400"
      role="img" aria-label={`${AREAS[area].name}: ${value} out of 100`}
    >
      <div className={`h-full rounded-full ${barColour(value)}`} style={{ width: `${Math.max(value, 2)}%` }} />
    </div>
    <p className="text-sm text-gray-400 mt-1 print:text-gray-700">{AREAS[area].measures}</p>
  </div>
);

const Results: React.FC<ResultsProps> = ({ score, onRestart }) => {
  const bandInfo = BANDS.find((b) => b.band === score.band)!;
  const gaps = score.priorities.filter((a) => score.areaScores[a] < 75).slice(0, 2);
  const step = nextStep(score);

  return (
    <div className="w-full max-w-4xl mx-auto px-5 sm:px-6 py-10 animate-fade-in print:p-0">
      <div className="text-center mb-10">
        <p className="text-sm font-bold uppercase tracking-widest text-orange-400 mb-3 print:text-black">Your AI Readiness Scorecard</p>
        <div className="flex items-end justify-center gap-2">
          <span className="text-7xl md:text-8xl font-black text-white tabular-nums print:text-black">{score.overall}</span>
          <span className="text-2xl text-gray-400 font-bold mb-3">out of 100</span>
        </div>
        <p className="inline-block mt-4 px-5 py-2 rounded-lg border border-orange-500/40 bg-orange-500/10 text-orange-300 text-lg font-bold print:text-black print:border-black">
          {score.band}
        </p>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mt-5 leading-relaxed print:text-black">{bandInfo.description}</p>
        {score.capReason && (
          <p className="text-gray-300 text-base max-w-2xl mx-auto mt-4 leading-relaxed border border-white/15 rounded-lg px-4 py-3 print:text-black">
            <strong className="text-white print:text-black">Why not {score.uncappedBand}?</strong> {score.capReason}
          </p>
        )}
      </div>

      <section className="glass-panel p-6 md:p-8 mb-8" aria-label="Scores by area">
        <h2 className="text-xl font-extrabold text-white mb-6 print:text-black">Your six areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
          {AREA_ORDER.map((area) => <AreaBar key={area} area={area} value={score.areaScores[area]} />)}
        </div>
        <p className="text-sm text-gray-400 mt-6 print:text-gray-700">
          {score.areaScores[score.strongest] > score.areaScores[score.priorities[0]] && (
            <>Strongest area: <strong className="text-white print:text-black">{AREAS[score.strongest].name}</strong>. </>
          )}
          Each area is three questions, scored 0 to 3. The overall score is the plain average of the six.
        </p>
      </section>

      {gaps.length > 0 && (
        <section className="mb-8" aria-label="What to do first">
          <h2 className="text-2xl font-extrabold text-white mb-5 print:text-black">What to do first</h2>
          <div className="grid grid-cols-1 gap-5">
            {gaps.map((area, i) => (
              <div key={area} className="glass-panel p-6 md:p-8 border-l-4 border-l-orange-500">
                <p className="text-sm font-bold uppercase tracking-widest text-orange-400 mb-2 print:text-black">
                  {i === 0 ? 'First' : 'Then'}: {AREAS[area].name} ({score.areaScores[area]})
                </p>
                <p className="text-gray-200 text-lg leading-relaxed mb-4 print:text-black">{ADVICE[area].finding}</p>
                <p className="text-white text-lg leading-relaxed print:text-black">
                  <strong>This week:</strong> {ADVICE[area].thisWeek}
                </p>
                <a href={ADVICE[area].free.href} target="_blank" rel="noreferrer" className="inline-block mt-4 text-orange-400 font-semibold underline hover:text-orange-300 print:text-black">
                  {ADVICE[area].free.label} →
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="glass-panel p-6 md:p-10 text-center print:hidden" aria-label="Next step">
        <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">If you want help</p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">{step.title}</h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-7 leading-relaxed">{step.text}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={() => window.open(step.href, '_blank')} className="text-base px-7 py-4">{step.label}</Button>
          <Button onClick={() => window.open(BOOKING_LINK, '_blank')} variant="secondary" className="text-base px-7 py-4">Book a 30-minute call</Button>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-7 text-sm font-semibold">
          <button type="button" onClick={() => window.print()} className="text-gray-300 underline hover:text-white">Print or save as PDF</button>
          <button type="button" onClick={onRestart} className="text-gray-300 underline hover:text-white">Take it again</button>
        </div>
      </section>

      <p className="text-center mt-10 text-gray-500 text-sm hidden print:block">
        Ignite AI Solutions Ltd, {new Date().toLocaleDateString('en-GB')}. scorecard.igniteaisolutions.co.uk
      </p>
    </div>
  );
};

export default Results;
