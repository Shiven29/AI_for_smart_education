import React from 'react';
import { 
  Sparkles, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  GitCompare, 
  Bot, 
  HelpCircle, 
  BarChart2, 
  FileText, 
  MessageSquareCode, 
  CalendarCheck, 
  Award, 
  TrendingUp, 
  Clock,
  BookOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CircularGauge } from '../common/CircularGauge';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const MainDashboardView = () => {
  const { 
    userName, 
    collegeName, 
    careerGoal, 
    careerAnalysis, 
    setActiveTab, 
    hasCompletedQuiz, 
    updatedReadiness,
    quizScore
  } = useApp();

  const readinessVal = hasCompletedQuiz ? 38 : (careerAnalysis?.skill_match_percentage ?? 25);
  const matchedSkills = careerAnalysis?.matched_skills ?? ["Python", "Excel"];
  const missingSkills = careerAnalysis?.missing_skills ?? ["SQL", "Statistics", "Power BI"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in duration-300">
      
      {/* Top Welcome Hero Banner */}
      <div className="p-7 sm:p-8 rounded-3xl bg-[#121829] border border-[#1E293B] flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#6366F1]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="space-y-3 max-w-2xl text-center lg:text-left">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#182138] text-[#38BDF8] border border-[#2B3B60] uppercase tracking-wider">
              {collegeName || "Student Dashboard"}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#21163B] text-[#C084FC] border border-[#581C87] uppercase tracking-wider">
              Target: {careerGoal}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Welcome back, {userName || "Student"} 👋
          </h1>

          <p className="text-sm text-[#94A3B8] leading-relaxed">
            Your personalized AI career dashboard is updated. Follow your study roadmap, complete modules with your AI Copilot tutor, and verify skills with quizzes.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <Button
              variant="primary"
              icon={<Bot className="w-4 h-4 text-white" />}
              onClick={() => setActiveTab('ai-tutor')}
            >
              Continue Learning with AI →
            </Button>
            <Button
              variant="secondary"
              icon={<Compass className="w-4 h-4" />}
              onClick={() => setActiveTab('roadmap')}
            >
              View Full Roadmap
            </Button>
          </div>
        </div>

        {/* Readiness Gauge */}
        <div className="shrink-0 flex flex-col items-center">
          <CircularGauge
            percentage={readinessVal}
            size={140}
            strokeWidth={10}
            title="PLACEMENT READINESS"
            subLabel={hasCompletedQuiz ? "PROGRESSING 🚀" : "ON YOUR WAY 🎯"}
          />
        </div>

      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-[#121829] border border-[#1E293B] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#94A3B8] uppercase font-bold">
            <span>Skills Matched</span>
            <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
          </div>
          <div className="text-2xl font-black text-white">{matchedSkills.length} of 6</div>
          <div className="text-[11px] text-[#34D399] font-medium">✓ Python, Excel active</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#121829] border border-[#1E293B] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#94A3B8] uppercase font-bold">
            <span>Critical Gaps</span>
            <Flame className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <div className="text-2xl font-black text-white">{missingSkills.length} remaining</div>
          <div className="text-[11px] text-[#F59E0B] font-medium">Top gap: {missingSkills[0] || 'SQL'}</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#121829] border border-[#1E293B] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#94A3B8] uppercase font-bold">
            <span>Study Streak</span>
            <TrendingUp className="w-4 h-4 text-[#38BDF8]" />
          </div>
          <div className="text-2xl font-black text-white">4 Days</div>
          <div className="text-[11px] text-[#38BDF8] font-medium">⚡ On track this week</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#121829] border border-[#1E293B] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#94A3B8] uppercase font-bold">
            <span>Quiz Status</span>
            <Award className="w-4 h-4 text-[#C084FC]" />
          </div>
          <div className="text-2xl font-black text-white">
            {hasCompletedQuiz ? `${quizScore}% Passed` : '1 Pending'}
          </div>
          <div className="text-[11px] text-[#C084FC] font-medium">
            {hasCompletedQuiz ? '✓ Module 2 Certified' : 'SQL Module Quiz'}
          </div>
        </div>

      </div>

      {/* Next Best Move Hero Action Card (Figma Screenshot 4 / 2 highlight) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#121829] border-2 border-[#6366F1] shadow-glow-purple flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>RECOMMENDED NEXT MOVE</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <span>🔥</span>
            <span>Master SQL Fundamentals & Joins</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl">
            SQL is the primary missing requirement for your {careerGoal} profile. Complete the interactive AI lesson and take the skill quiz to boost your readiness score.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="purple"
            showArrow
            onClick={() => setActiveTab('ai-tutor')}
          >
            Start Lesson with AI
          </Button>
          <Button
            variant="secondary"
            onClick={() => setActiveTab('quiz')}
          >
            Take Quiz Directly
          </Button>
        </div>
      </div>

      {/* 10-Stage Quick Navigation Hub */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">
            Career Journey Quick Access
          </h3>
          <span className="text-xs text-[#94A3B8]">Click any module to jump</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div 
            onClick={() => setActiveTab('skill-gap')}
            className="p-5 rounded-2xl bg-[#121829] border border-[#1E293B] hover:border-[#38BDF8] cursor-pointer transition-all hover:-translate-y-1 group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#0F2830] text-[#38BDF8] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <GitCompare className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-white mb-1">4. Career & Skill Gap Analysis</h4>
            <p className="text-xs text-[#94A3B8]">View the 3-card breakdown of strengths, missing competencies, and transferable knowledge.</p>
          </div>

          <div 
            onClick={() => setActiveTab('roadmap')}
            className="p-5 rounded-2xl bg-[#121829] border border-[#1E293B] hover:border-[#6366F1] cursor-pointer transition-all hover:-translate-y-1 group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#21163B] text-[#C084FC] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Compass className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-white mb-1">5. Personalized Roadmap</h4>
            <p className="text-xs text-[#94A3B8]">Explore horizontal milestone timeline and suggested portfolio projects with starter code.</p>
          </div>

          <div 
            onClick={() => setActiveTab('ai-tutor')}
            className="p-5 rounded-2xl bg-[#121829] border border-[#1E293B] hover:border-[#34D399] cursor-pointer transition-all hover:-translate-y-1 group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#0E2720] text-[#34D399] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Bot className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-white mb-1">6. Learn with AI Assistant</h4>
            <p className="text-xs text-[#94A3B8]">Interactive SQL concepts, query cheatsheets, live code runner, and AI tutor chat.</p>
          </div>

          <div 
            onClick={() => setActiveTab('quiz')}
            className="p-5 rounded-2xl bg-[#121829] border border-[#1E293B] hover:border-[#F59E0B] cursor-pointer transition-all hover:-translate-y-1 group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#291E0F] text-[#F59E0B] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-white mb-1">7. Skill Quizzes</h4>
            <p className="text-xs text-[#94A3B8]">Timed scenario-based assessments to validate and certify your newly acquired skills.</p>
          </div>

          <div 
            onClick={() => setActiveTab('performance')}
            className="p-5 rounded-2xl bg-[#121829] border border-[#1E293B] hover:border-[#38BDF8] cursor-pointer transition-all hover:-translate-y-1 group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#151D30] text-[#38BDF8] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <BarChart2 className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-white mb-1">8. Performance Analysis</h4>
            <p className="text-xs text-[#94A3B8]">Accuracy breakdown by sub-topic, question review, and competency matrix.</p>
          </div>

          <div 
            onClick={() => setActiveTab('updated-plan')}
            className="p-5 rounded-2xl bg-[#121829] border border-[#1E293B] hover:border-[#6366F1] cursor-pointer transition-all hover:-translate-y-1 group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#21163B] text-[#C084FC] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <CalendarCheck className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-white mb-1">10. Updated Study Plan</h4>
            <p className="text-xs text-[#94A3B8]">Dynamic recalculated placement timeline with newly unlocked milestones.</p>
          </div>

        </div>
      </div>

    </div>
  );
};
