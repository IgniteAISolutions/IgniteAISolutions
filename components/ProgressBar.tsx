import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden border border-white/5">
      <div 
        className="h-full bg-gradient-to-r from-orange-600 to-orange-400 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(249,115,22,0.5)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
