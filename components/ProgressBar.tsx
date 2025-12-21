
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full mb-10">
      <div className="flex justify-between items-end mb-3">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Assessment Progress</span>
        <span className="text-sm font-bold text-white">{percentage}%</span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden border border-white/5">
        <div 
          className="bg-ignite-orange h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(237,137,54,0.4)]" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
