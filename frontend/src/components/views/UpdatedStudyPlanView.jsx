import React from 'react';
import { CalendarCheck, Check, Sparkles, ArrowRight, Download, Award, Compass, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CircularGauge } from '../common/CircularGauge';
import { Button } from '../common/Button';
import confetti from 'canvas-confetti';

export const UpdatedStudyPlanView = () => {
  const { 
    userName, 
    careerGoal, 
    masteredSkills, 
    updatedReadiness, 
    setActiveTab, 
    setSelectedProject, 
    careerAnalysis 
  } = useApp();

  const handleCelebrate = () => {
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
  };

  const project = careerAnalysis?.suggested_projects?.[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A233A] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#34D399] uppercase tracking-wider mb-1">
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Stage 10 · Updated Adaptive Study Plan</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Your Updated Learning Timeline
          </h1>
          <p className="text-sm text-[#94A3B8] mt-1">
            Recalculated milestones reflecting your verified SQL mastery.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            icon={<Download className="w-4 h-4" />}
            onClick={() => alert("Study Plan Schedule exported as PDF/Calendar!")}
          >
            Export Schedule
          </Button>
          <Button
            variant="primary"
            icon={<Compass className="w-4 h-4 text-white" />}
            onClick={() => setActiveTab('dashboard')}
          >
            Return to Dashboard
          </Button>
        </div>
      </div>

      {/* Updated Readiness Card */}
      <div className="p-7 sm:p-8 rounded-3xl bg-[#121829] border-2 border-[#6366F1] shadow-glow-purple flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-3 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0E2720] text-[#34D399] border border-[#065F46]">
              ✓ SQL FUNDAMENTALS VERIFIED
            </span>
          </div>

          <h2 className="text-3xl font-extrabold text-white">
            Placement Readiness Increased to 38%!
          </h2>

          <p className="text-sm text-[#CBD5E1] max-w-2xl leading-relaxed">
            By mastering and certifying in SQL, you have closed your highest-severity skill gap. You are now unlocked for intermediate portfolio projects and advanced statistical modeling.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 justify-center lg:justify-start">
            {masteredSkills.map((s, i) => (
              <span key={i} className="px-3 py-1 rounded-full text-xs font-bold bg-[#0E2720] text-[#34D399] border border-[#065F46] flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> {s}
              </span>
            ))}
          </div>
        </div>

        <div className="shrink-0 cursor-pointer" onClick={handleCelebrate} title="Click to celebrate progress!">
          <CircularGauge
            percentage={38}
            size={140}
            strokeWidth={10}
            title="UPDATED READINESS"
            subLabel="MILESTONE CLEARED 🚀"
          />
        </div>
      </div>

      {/* Updated Roadmap Timeline */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-white uppercase tracking-wider">
          Adaptive Timeline Schedule
        </h3>

        <div className="space-y-3">
          
          <div className="p-5 rounded-2xl bg-[#0E2720]/40 border border-[#065F46] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0E2720] text-[#34D399] flex items-center justify-center font-bold text-sm">
                ✓
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Module 1: Python & Spreadsheet Foundations</h4>
                <p className="text-xs text-[#94A3B8]">Completed · 100% Mastered</p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#34D399]">Completed</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0E2720]/40 border border-[#065F46] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0E2720] text-[#34D399] flex items-center justify-center font-bold text-sm">
                ✓
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Module 2: Master SQL Fundamentals & JOINs</h4>
                <p className="text-xs text-[#94A3B8]">Certified via Quiz · Assessment Cleared</p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#34D399]">Completed</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#182138] border-2 border-[#6366F1] shadow-glow-purple flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#6366F1] text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Module 3: Statistics & Exploratory Data Analysis</h4>
                <p className="text-xs text-[#38BDF8]">🔥 Unlocked · Next Target Module (Week 3-4)</p>
              </div>
            </div>
            <Button variant="purple" onClick={() => alert("Starting Module 3: Statistics & EDA!")}>
              Start Module 3 →
            </Button>
          </div>

          <div className="p-5 rounded-2xl bg-[#121829] border border-[#1E293B] flex items-center justify-between opacity-75">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1E293B] text-[#94A3B8] flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Module 4: Power BI & Business Storytelling</h4>
                <p className="text-xs text-[#94A3B8]">Upcoming (Week 5-6)</p>
              </div>
            </div>
            <span className="text-xs text-[#94A3B8]">Locked</span>
          </div>

        </div>
      </section>

      {/* Next Milestone Project Action */}
      {project && (
        <div className="p-6 rounded-3xl bg-[#121829] border border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
              RECOMMENDED PORTFOLIO MILESTONE
            </span>
            <h4 className="text-lg font-bold text-white">{project.title}</h4>
            <p className="text-xs text-[#94A3B8] max-w-xl">{project.description}</p>
          </div>
          <Button variant="primary" onClick={() => setSelectedProject(project)}>
            Explore Project Template →
          </Button>
        </div>
      )}

    </div>
  );
};
