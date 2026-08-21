import React from 'react';

export const CircularGauge = ({ 
  percentage = 25, 
  size = 140, 
  strokeWidth = 10,
  subLabel = "ON YOUR WAY 🚀",
  title = "CAREER READINESS"
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#121829] border border-[#1E293B] rounded-2xl relative">
      {title && (
        <span className="text-[11px] font-bold tracking-wider text-[#94A3B8] uppercase mb-3">
          {title}
        </span>
      )}
      
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1E293B"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Active Gradient Stroke */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#gauge-gradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22D3EE" />
              <stop offset="60%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Percentage Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-white tracking-tight">
            {percentage}%
          </span>
        </div>
      </div>

      {subLabel && (
        <div className="mt-3 text-xs font-semibold text-[#10B981] tracking-wide flex items-center gap-1">
          {subLabel}
        </div>
      )}
    </div>
  );
};
