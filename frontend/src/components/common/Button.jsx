import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Button = ({ 
  children, 
  variant = 'primary', // 'primary' | 'secondary' | 'purple' | 'ghost' | 'cyan'
  icon = null,
  showArrow = false,
  className = '',
  disabled = false,
  onClick,
  ...props 
}) => {
  const getStyles = () => {
    switch (variant) {
      case 'primary':
        return 'btn-primary-gradient text-white shadow-glow-purple border border-indigo-400/20';
      case 'purple':
        return 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-md border border-purple-400/30';
      case 'secondary':
        return 'bg-[#151D30] hover:bg-[#1C2640] text-[#E2E8F0] border border-[#2A3550] hover:border-[#3E4E73]';
      case 'ghost':
        return 'bg-transparent hover:bg-[#1E293B]/40 text-[#94A3B8] hover:text-white border border-[#2A3550]';
      case 'cyan':
        return 'bg-[#06B6D4] hover:bg-[#0891B2] text-[#090D16] font-semibold shadow-glow-cyan';
      default:
        return 'bg-[#6366F1] text-white';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${getStyles()} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
      {showArrow && <ArrowRight className="ml-2 w-4 h-4 stroke-[2.5]" />}
    </button>
  );
};
