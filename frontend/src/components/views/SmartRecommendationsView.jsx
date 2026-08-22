import React from 'react';
import { Sparkles, ArrowRight, Zap, Target, BookOpen, ExternalLink, CalendarCheck, Lightbulb, Code2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';

export const SmartRecommendationsView = () => {
  const { careerGoal, setActiveTab } = useApp();

  const recommendations = [
    {
      priority: "CRITICAL",
      color: "red",
      icon: Zap,
      title: "Consolidate Multi-Table JOINs in Real Queries",
      desc: "You scored 100% in theoretical definitions. Cement this by writing 3 complex multi-table queries with window functions.",
      actionLabel: "Practice with AI Sandbox",
      targetTab: "ai-tutor"
    },
    {
      priority: "RECOMMENDED",
      color: "purple",
      icon: Target,
      title: "Start Building Portfolio Project 1 (Sales Dashboard)",
      desc: "Turn your SQL query knowledge into tangible proof of work by modeling star schemas in PostgreSQL and Power BI.",
      actionLabel: "View Project Blueprint",
      targetTab: "roadmap"
    },
    {
      priority: "NEXT STEP",
      color: "cyan",
      icon: BookOpen,
      title: "Unlock Module 3: Probability & Hypothesis Testing",
      desc: "Now that SQL is mastered, move to statistical significance and A/B testing methods expected in top analytics teams.",
      actionLabel: "Unlock Module 3",
      targetTab: "updated-plan"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A233A] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A855F7] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Stage 9 · Smart Recommendations</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            AI-Generated Action Items
          </h1>
          <p className="text-sm text-[#94A3B8] mt-1">
            Targeted advice calculated from your quiz performance and market benchmarks.
          </p>
        </div>

        <Button
          variant="primary"
          icon={<CalendarCheck className="w-4 h-4 text-white" />}
          onClick={() => setActiveTab('updated-plan')}
        >
          Apply to Updated Study Plan →
        </Button>
      </div>

      {/* Recommendations Cards */}
      <div className="space-y-4">
        {recommendations.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-[#121829] border border-[#1E293B] hover:border-[#6366F1] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#182138] border border-[#2B3B60] text-[#38BDF8] flex items-center justify-center text-xl shrink-0 shadow-inner">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#21163B] text-[#C084FC] border border-[#581C87]">
                      {item.priority}
                    </span>
                    <span className="text-xs text-[#64748B]">Personalized for {careerGoal}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <Button
                  variant="purple"
                  showArrow
                  onClick={() => setActiveTab(item.targetTab)}
                >
                  {item.actionLabel}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
