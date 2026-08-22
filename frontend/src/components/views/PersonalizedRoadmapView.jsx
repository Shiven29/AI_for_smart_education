import React from 'react';
import { Check, Sparkles, ArrowRight, Compass, Bot, Code2, FolderGit2, BookOpen, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';

export const PersonalizedRoadmapView = () => {
  const { 
    userName, 
    careerGoal, 
    careerAnalysis, 
    setSelectedProject, 
    setActiveTab, 
    hasCompletedQuiz 
  } = useApp();

  const projects = careerAnalysis?.suggested_projects ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A233A] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#38BDF8] uppercase tracking-wider mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Stage 5 · Personalized Roadmap</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Your Step-by-Step Learning Pathway
          </h1>
          <p className="text-sm text-[#94A3B8] mt-1">
            Customized milestone sequence for <span className="text-[#38BDF8] font-bold">{careerGoal}</span>.
          </p>
        </div>

        <Button
          variant="primary"
          icon={<Bot className="w-4 h-4 text-white" />}
          onClick={() => setActiveTab('ai-tutor')}
        >
          Learn Module 2 with AI →
        </Button>
      </div>

      {/* Horizontal Next Moves Stepper (Figma Screenshot 4) */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">
            YOUR NEXT MOVES
          </h3>
          <p className="text-xs text-[#94A3B8]">
            One step at a time. Here's the shortest path forward.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-2 items-center bg-[#0B101E] p-4 sm:p-6 rounded-3xl border border-[#1A233A]">
          {/* Step 1 */}
          <div className="p-4 rounded-2xl bg-[#121829] border border-[#1E293B] flex items-center justify-center gap-2 text-center text-xs font-semibold text-[#E2E8F0] shadow-sm">
            <Check className="w-4 h-4 text-[#34D399] shrink-0 stroke-[2.5]" />
            <span className="truncate">Python & Excel</span>
          </div>

          {/* Step 2 */}
          <div 
            onClick={() => setActiveTab('ai-tutor')}
            className="p-4 rounded-2xl bg-[#182138] border-2 border-[#6366F1] flex items-center justify-center gap-2 text-center text-xs font-bold text-white shadow-glow-purple animate-pulse-subtle cursor-pointer"
          >
            <span>🔥</span>
            <span className="truncate">SQL · NEXT</span>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-2xl bg-[#121829] border border-[#1E293B] flex items-center justify-center gap-2 text-center text-xs font-medium text-[#94A3B8]">
            <div className="w-2 h-2 rounded-full border border-[#64748B]" />
            <span className="truncate">Statistics</span>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-2xl bg-[#121829] border border-[#1E293B] flex items-center justify-center gap-2 text-center text-xs font-medium text-[#94A3B8]">
            <div className="w-2 h-2 rounded-full border border-[#64748B]" />
            <span className="truncate">Power BI</span>
          </div>

          {/* Step 5 */}
          <div className="p-4 rounded-2xl bg-[#121829] border border-[#1E293B] flex items-center justify-center gap-2 text-center text-xs font-bold text-[#E2E8F0]">
            <span>🎯</span>
            <span className="truncate">Career Ready</span>
          </div>
        </div>
      </section>

      {/* Detailed Module Timeline Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white uppercase tracking-wider">
          Learning Modules & Lessons
        </h3>

        <div className="space-y-4">
          
          {/* Module 1 */}
          <div className="p-6 rounded-3xl bg-[#121829] border border-[#1E293B] flex items-center justify-between opacity-85">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#0E2720] border border-[#065F46] text-[#34D399] flex items-center justify-center font-bold text-sm shrink-0">
                ✓
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#34D399] uppercase">Module 1 · Mastered</span>
                  <span className="text-xs text-[#64748B]">Prerequisites</span>
                </div>
                <h4 className="text-base font-bold text-white">Python Data Foundations & Spreadsheet Modeling</h4>
                <p className="text-xs text-[#94A3B8]">Core syntax, lists, dictionaries, pandas dataframes, and formula modeling.</p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#34D399] bg-[#0E2720] px-3 py-1 rounded-full border border-[#065F46]">Completed</span>
          </div>

          {/* Module 2: Active */}
          <div className="p-6 rounded-3xl bg-[#182138] border-2 border-[#6366F1] shadow-glow-purple flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#6366F1] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                2
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#38BDF8] uppercase">Module 2 · Current Focus</span>
                  <span className="text-xs text-[#A5B4FC]">🔥 2 Hours Est.</span>
                </div>
                <h4 className="text-base font-bold text-white">Master SQL Fundamentals & Joins</h4>
                <p className="text-xs text-[#CBD5E1]">Relational schemas, WHERE vs HAVING, multi-table JOINs, and aggregation queries.</p>
              </div>
            </div>
            <Button variant="purple" onClick={() => setActiveTab('ai-tutor')} showArrow>
              Learn with AI Tutor
            </Button>
          </div>

          {/* Module 3 */}
          <div className="p-6 rounded-3xl bg-[#121829] border border-[#1E293B] flex items-center justify-between opacity-75">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#1E293B] text-[#94A3B8] flex items-center justify-center font-bold text-sm shrink-0">
                3
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#94A3B8] uppercase">Module 3 · Upcoming</span>
                  <span className="text-xs text-[#64748B]">Next Milestone</span>
                </div>
                <h4 className="text-base font-bold text-white">Statistics & Exploratory Data Analysis</h4>
                <p className="text-xs text-[#94A3B8]">Hypothesis testing, distributions, correlation vs causation, and outlier detection.</p>
              </div>
            </div>
            <span className="text-xs text-[#94A3B8] bg-[#151D30] px-3 py-1 rounded-full border border-[#222E4A]">Locked</span>
          </div>

        </div>
      </div>

      {/* Suggested Portfolio Projects (Figma Screenshot 4) */}
      <section className="space-y-4 pt-4">
        <div>
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">
            BUILD YOUR PORTFOLIO
          </h3>
          <p className="text-xs text-[#94A3B8]">
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
                <div className="w-12 h-12 rounded-2xl bg-[#1A233A] border border-[#2D3C61] flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shadow-inner">
                  {project.icon}
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-lg font-bold text-white group-hover:text-[#38BDF8] transition-colors">{project.title}</h4>
                  <p className="text-xs text-[#94A3B8] font-medium">{project.practice}</p>
                </div>
                <div className="text-xs text-[#64748B]">{project.level}</div>
              </div>

              <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between text-xs text-[#38BDF8] font-semibold">
                <span>Explore Project →</span>
                <span className="text-[#64748B] text-[11px]">View code & deliverables</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
