import React from 'react';
import { Check, Sparkles, AlertTriangle, Flame } from 'lucide-react';

export const Badge = ({ 
  children, 
  variant = 'neutral', // 'matched' | 'missing' | 'warning' | 'outlined' | 'neutral' | 'active'
  icon = true,
  className = '',
  onClick
}) => {
  const getStyles = () => {
    switch (variant) {
      case 'matched':
      case 'success':
        return 'bg-[#0E2720] text-[#34D399] border-[#065F46] hover:border-[#10B981]';
      case 'missing':
      case 'purple':
        return 'bg-[#21163B] text-[#C084FC] border-[#581C87] hover:border-[#A855F7]';
      case 'warning':
      case 'irrelevant':
        return 'bg-[#291E0F] text-[#FBBF24] border-[#78350F] hover:border-[#F59E0B]';
      case 'outlined':
        return 'bg-transparent text-[#A5B4FC] border-[#6366F1] hover:bg-[#6366F1]/10';
      case 'active':
        return 'bg-[#6366F1] text-white border-[#818CF8] shadow-sm';
      default:
        return 'bg-[#151D30] text-[#94A3B8] border-[#222E4A] hover:border-[#38486D]';
    }
  };

  const renderIcon = () => {
    if (!icon) return null;
    if (variant === 'matched' || variant === 'success') {
      return <Check className="w-3.5 h-3.5 mr-1.5 stroke-[2.5]" />;
    }
    if (variant === 'missing' || variant === 'purple') {
      return <Sparkles className="w-3.5 h-3.5 mr-1.5 stroke-[2.5]" />;
    }
    if (variant === 'warning' || variant === 'irrelevant') {
      return <AlertTriangle className="w-3.5 h-3.5 mr-1.5 stroke-[2.5]" />;
    }
    return null;
  };

  return (
    <span 
      onClick={onClick}
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${onClick ? 'cursor-pointer' : ''} ${getStyles()} ${className}`}
    >
      {renderIcon()}
      {children}
    </span>
  );
};
