import React from 'react';
import { 
  Home, 
  UserCheck, 
  LayoutDashboard, 
  GitCompare, 
  Compass, 
  Bot, 
  HelpCircle, 
  BarChart2, 
  Sparkles, 
  CalendarCheck,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const JourneyBar = () => {
  const { activeTab, setActiveTab } = useApp();

  const stages = [
    { id: 'landing', label: '1. Landing', icon: Home },
    { id: 'onboarding', label: '2. Onboarding', icon: UserCheck },
    { id: 'dashboard', label: '3. Dashboard', icon: LayoutDashboard },
    { id: 'skill-gap', label: '4. Skill Gap', icon: GitCompare },
    { id: 'roadmap', label: '5. Roadmap', icon: Compass },
    { id: 'ai-tutor', label: '6. AI Tutor', icon: Bot },
    { id: 'quiz', label: '7. Quizzes', icon: HelpCircle },
    { id: 'performance', label: '8. Performance', icon: BarChart2 },
    { id: 'recommendations', label: '9. Smart Tips', icon: Sparkles },
    { id: 'updated-plan', label: '10. Updated Plan', icon: CalendarCheck },
  ];

  // Check if current active tab is part of the 10-stage funnel
  const currentStageIndex = stages.findIndex(s => s.id === activeTab);
  if (currentStageIndex === -1 && ['resume', 'interview', 'design-system'].includes(activeTab)) {
    // Show compact return banner if in tool views
    return (
      <div className="bg-[#0C111C] border-b border-[#1A233A] py-2 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <span className="text-[#94A3B8]">
            Viewing Auxiliary Tool: <span className="text-white font-bold uppercase">{activeTab}</span>
          </span>
          <button
            onClick={() => setActiveTab('dashboard')}
            className="text-[#38BDF8] hover:text-[#7DD3FC] font-semibold flex items-center gap-1"
          >
            <span>Return to Learning Journey Dashboard →</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#070B14] border-b border-[#151E33] py-2.5 px-4 overflow-x-auto shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center justify-between min-w-[900px] gap-1">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = activeTab === stage.id;
          const isPassed = currentStageIndex > idx;

          return (
            <React.Fragment key={stage.id}>
              <button
                onClick={() => setActiveTab(stage.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#1E293B] text-[#38BDF8] border border-[#6366F1] shadow-glow-purple scale-105'
                    : isPassed
                      ? 'text-[#34D399] hover:text-white hover:bg-[#121829]'
                      : 'text-[#64748B] hover:text-[#94A3B8] hover:bg-[#121829]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#38BDF8]' : isPassed ? 'text-[#34D399]' : 'text-[#64748B]'}`} />
                <span>{stage.label}</span>
              </button>

              {idx < stages.length - 1 && (
                <ChevronRight className="w-3 h-3 text-[#1E293B] shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
