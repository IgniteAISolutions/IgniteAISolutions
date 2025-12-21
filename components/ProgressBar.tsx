import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full mb-12">
      <div className="flex justify-between items-end mb-4">
        <span className="text-[10px] font-bold text-muted uppercase tracking-[0.4em]">Section Progress</span>
        <span className="text-sm font-black text-white">{percentage}%</span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/5">
        <div 
          className="progress-bar-fill h-full rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;