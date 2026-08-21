import React from 'react';
import { 
  Sparkles, 
  Flame, 
  Check, 
  ArrowRight, 
  AlertTriangle, 
  BarChart3, 
  ExternalLink, 
  RefreshCw,
  Award,
  BookOpen,
  FolderGit2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CircularGauge } from '../common/CircularGauge';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import confetti from 'canvas-confetti';

export const CareerBlueprintView = () => {
  const { 
    userName, 
    careerGoal, 
    careerAnalysis, 
    isLoadingCareer, 
    runCareerAnalysis, 
    currentSkills,
    setSelectedProject,
    setActiveTab,
    setDiscoveryStep
  } = useApp();

  const handleRefreshAnalysis = () => {
    runCareerAnalysis(userName, careerGoal, currentSkills);
  };

  const handleCelebrate = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Fallback defaults if analysis is loading
  const matchPercent = careerAnalysis?.skill_match_percentage ?? 25;
  const matched = careerAnalysis?.matched_skills ?? ["Python", "Excel"];
  const missing = careerAnalysis?.missing_skills ?? ["SQL", "Statistics", "Power BI"];
  const irrelevant = careerAnalysis?.irrelevant_skills ?? ["C Programming", "Digital Electronics"];
  const projects = careerAnalysis?.suggested_projects ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-in fade-in duration-300">
      
      {/* Top Header & Readiness Donut (Figma Screenshot 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#1A233A] pb-10">
        
        {/* Left Column: Greeting & Big Cyan Title */}
        <div className="lg:col-span-8 space-y-4">
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-wider text-[#A5B4FC] uppercase flex items-center gap-1.5">
              <span>YOUR PERSONAL CAREER BLUEPRINT</span>
              <span>✨</span>
            </span>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
              Hey, {userName || "Student"} 👋
            </h1>
            <p className="text-sm text-[#94A3B8]">
              Your AI career blueprint is ready.
            </p>
          </div>

          {/* Giant Cyan Role Title */}
          <div className="pt-2">
            <h2 className="text-4xl sm:text-6xl font-black text-gradient-cyan tracking-tight uppercase">
              {careerGoal}
            </h2>
            <p className="text-sm text-[#94A3B8] max-w-xl mt-2 leading-relaxed">
              Your AI has analyzed your current skills and mapped your journey forward.
            </p>
          </div>

          {/* Quick Edit Skills Button */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => {
                setDiscoveryStep(2);
                setActiveTab('discovery');
              }}
              className="text-xs text-[#38BDF8] hover:text-[#7DD3FC] flex items-center gap-1 font-semibold"
            >
              <span>Modify skills or target role</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

        </div>

        {/* Right Column: Career Readiness Donut Gauge */}
        <div className="lg:col-span-4 flex justify-start lg:justify-end">
          <div className="w-full max-w-xs cursor-pointer" onClick={handleCelebrate} title="Click to celebrate progress!">
            <CircularGauge
              percentage={matchPercent}
              size={150}
              strokeWidth={11}
              title="CAREER READINESS"
              subLabel="ON YOUR WAY 🚀"
            />
          </div>
        </div>

      </div>

      {/* Highlight Banner: AI CAREER INSIGHT (Figma Screenshot 4) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#121829] border border-[#2A3550] relative overflow-hidden shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI CAREER INSIGHT</span>
            </div>

            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Based on your current profile, your highest-impact next step is:
            </p>

            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                <span>🔥</span>
                <span>MASTER {missing[0] ? missing[0].toUpperCase() : 'SQL'}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#94A3B8]">
                {missing[0] || 'SQL'} is one of the core skills missing from your {careerGoal} profile.
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <Button
              variant="purple"
              showArrow
              className="text-sm font-semibold px-6 py-3 shadow-lg"
              onClick={() => {
                alert(`Starting module: Master ${missing[0] || 'SQL'}!`);
              }}
            >
              Start with {missing[0] || 'SQL'}
            </Button>
          </div>

        </div>
      </div>

      {/* SECTION 1: YOUR SKILL MAP (Figma Screenshot 4 3-Column Grid) */}
      <section className="space-y-4">
        
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            YOUR SKILL MAP
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            Here's how your current knowledge aligns with your career goal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1: Strengths / What You Already Have */}
          <div className="p-6 rounded-3xl bg-[#121829] border border-[#1E293B] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#34D399] uppercase tracking-wider">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>WHAT YOU ALREADY HAVE</span>
              </div>

              <h4 className="text-lg font-bold text-white">Your current strengths</h4>

              <div className="flex flex-wrap gap-2 pt-1">
                {matched.map((skill, index) => (
                  <Badge key={index} variant="matched">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="text-xs text-[#64748B] pt-4 border-t border-[#1E293B]">
              You're off to a great start.
            </div>
          </div>

          {/* Card 2: Gaps / What To Learn Next (PURPLE HIGHLIGHTED BORDER) */}
          <div className="p-6 rounded-3xl bg-[#121829] border-2 border-[#6366F1] shadow-glow-purple flex flex-col justify-between space-y-6 relative">
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#C084FC] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>WHAT TO LEARN NEXT</span>
              </div>

              <h4 className="text-lg font-bold text-white">Your biggest skill gaps</h4>

              <div className="flex flex-wrap gap-2 pt-1">
                {missing.map((skill, index) => (
                  <span
                    key={index}
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ${
                      index === 0
                        ? 'bg-[#21163B] text-[#C084FC] border-[#581C87] shadow-sm font-semibold'
                        : 'bg-[#151D30] text-[#CBD5E1] border-[#25324D]'
                    }`}
                  >
                    {index === 0 && <span className="mr-1">🔥</span>}
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#1E293B]">
              <button 
                onClick={() => {
                  const el = document.getElementById('roadmap-timeline');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs text-[#38BDF8] hover:text-[#7DD3FC] font-semibold flex items-center gap-1 group"
              >
                <span>View Full Roadmap</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 3: Other Skills / Outside Scope */}
          <div className="p-6 rounded-3xl bg-[#121829] border border-[#1E293B] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#F59E0B] uppercase tracking-wider">
                <span>⚡</span>
                <span>YOUR OTHER SKILLS</span>
              </div>

              <h4 className="text-lg font-bold text-white">Useful knowledge outside</h4>

              <div className="flex flex-wrap gap-2 pt-1">
                {irrelevant.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#251D10] text-[#FBBF24] border border-[#693108]"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 mr-1 text-[#F59E0B]" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-xs text-[#64748B] pt-4 border-t border-[#1E293B]">
              These may not be core for this target.
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: YOUR NEXT MOVES (Figma Screenshot 4 Horizontal Stepper) */}
      <section id="roadmap-timeline" className="space-y-4 pt-4">
        
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            YOUR NEXT MOVES
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            One step at a time. Here's the shortest path forward.
          </p>
        </div>

        {/* Horizontal Pipeline Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-2 items-center bg-[#0B101E] p-4 sm:p-6 rounded-3xl border border-[#1A233A]">
          
          {/* Step 1: Completed */}
          <div className="p-4 rounded-2xl bg-[#121829] border border-[#1E293B] flex items-center justify-center gap-2 text-center text-xs font-semibold text-[#E2E8F0] shadow-sm">
            <Check className="w-4 h-4 text-[#34D399] shrink-0 stroke-[2.5]" />
            <span className="truncate">Python & Excel</span>
          </div>

          {/* Step 2: NEXT (Active Purple Highlight) */}
          <div className="p-4 rounded-2xl bg-[#182138] border-2 border-[#6366F1] flex items-center justify-center gap-2 text-center text-xs font-bold text-white shadow-glow-purple animate-pulse-subtle">
            <span>🔥</span>
            <span className="truncate">SQL · NEXT</span>
          </div>

          {/* Step 3: Upcoming */}
          <div className="p-4 rounded-2xl bg-[#121829] border border-[#1E293B] flex items-center justify-center gap-2 text-center text-xs font-medium text-[#94A3B8]">
            <div className="w-2 h-2 rounded-full border border-[#64748B]" />
            <span className="truncate">Statistics</span>
          </div>

          {/* Step 4: Upcoming */}
          <div className="p-4 rounded-2xl bg-[#121829] border border-[#1E293B] flex items-center justify-center gap-2 text-center text-xs font-medium text-[#94A3B8]">
            <div className="w-2 h-2 rounded-full border border-[#64748B]" />
            <span className="truncate">Power BI</span>
          </div>

          {/* Step 5: Target */}
          <div className="p-4 rounded-2xl bg-[#121829] border border-[#1E293B] flex items-center justify-center gap-2 text-center text-xs font-bold text-[#E2E8F0]">
            <span>🎯</span>
            <span className="truncate">Career Ready</span>
          </div>

        </div>

      </section>

      {/* SECTION 3: BUILD YOUR PORTFOLIO (Figma Screenshot 4 Suggested Projects) */}
      <section className="space-y-4 pt-4">
        
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            BUILD YOUR PORTFOLIO
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            Suggested projects to turn your learning into proof of work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="p-6 rounded-3xl bg-[#121829] border border-[#1E293B] hover:border-[#6366F1] cursor-pointer transition-all duration-200 hover:-translate-y-1 group flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Project Icon */}
                <div className="w-12 h-12 rounded-2xl bg-[#1A233A] border border-[#2D3C61] flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shadow-inner">
                  {project.icon}
                </div>

                {/* Project Title & Practice description */}
                <div className="space-y-1.5">
                  <h4 className="text-lg font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-xs text-[#94A3B8] font-medium">
                    {project.practice}
                  </p>
                </div>

                <div className="text-xs text-[#64748B]">
                  {project.level}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between text-xs text-[#38BDF8] font-semibold">
                <span>Explore Project →</span>
                <span className="text-[#64748B] text-[11px]">View code & guide</span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Extra Action Bar */}
      <div className="pt-6 border-t border-[#1A233A] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            icon={<RefreshCw className={`w-3.5 h-3.5 ${isLoadingCareer ? 'animate-spin' : ''}`} />}
            onClick={handleRefreshAnalysis}
            disabled={isLoadingCareer}
          >
            Re-run Analysis
          </Button>
          <Button
            variant="secondary"
            onClick={() => setActiveTab('resume')}
          >
            Scan Resume with ATS →
          </Button>
        </div>

        <Button
          variant="primary"
          icon={<Sparkles className="w-4 h-4 text-white" />}
          onClick={() => setActiveTab('interview')}
        >
          Practice Mock Interview for {careerGoal} →
        </Button>
      </div>

    </div>
  );
};
