import React from 'react';
import { Check, Sparkles, AlertTriangle, ArrowRight, GitCompare, TrendingUp, ShieldAlert, BarChart3 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export const SkillGapAnalysisView = () => {
  const { 
    userName, 
    careerGoal, 
    careerAnalysis, 
    setActiveTab 
  } = useApp();

  const matched = careerAnalysis?.matched_skills ?? ["Python", "Excel"];
  const missing = careerAnalysis?.missing_skills ?? ["SQL", "Statistics", "Power BI"];
  const irrelevant = careerAnalysis?.irrelevant_skills ?? ["C Programming", "Digital Electronics"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A233A] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#38BDF8] uppercase tracking-wider mb-1">
            <GitCompare className="w-3.5 h-3.5" />
            <span>Stage 4 · Skill Gap Analysis</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skill Gap & Competency Breakdown
          </h1>
          <p className="text-sm text-[#94A3B8] mt-1">
            Comparing your profile against top market requirements for <span className="text-[#38BDF8] font-bold">{careerGoal}</span>.
          </p>
        </div>

        <Button
          variant="primary"
          icon={<ArrowRight className="w-4 h-4 text-white" />}
          onClick={() => setActiveTab('roadmap')}
        >
          View Roadmap →
        </Button>
      </div>

      {/* 3-Card Skill Map (Figma Screenshot 4) */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-extrabold text-white tracking-tight uppercase">
            YOUR SKILL MAP
          </h3>
          <p className="text-xs text-[#94A3B8]">
            Here's how your current knowledge aligns with your career goal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1: What You Already Have */}
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

          {/* Card 2: What To Learn Next (Purple Highlighted Border) */}
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
                onClick={() => setActiveTab('ai-tutor')}
                className="text-xs text-[#38BDF8] hover:text-[#7DD3FC] font-semibold flex items-center gap-1 group"
              >
                <span>Learn Top Gap ({missing[0] || 'SQL'}) with AI</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 3: Other Skills */}
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

      {/* Gap Severity & Market Demand Table */}
      <section className="p-6 rounded-3xl bg-[#121829] border border-[#1E293B] space-y-4">
        <h3 className="text-base font-bold text-white uppercase tracking-wider">
          Market Demand & Gap Priority Matrix
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#1E293B] text-[#94A3B8] uppercase font-bold">
              <tr>
                <th className="py-3 px-4">Skill Domain</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4">Priority Severity</th>
                <th className="py-3 px-4">Recruiter Frequency</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A233A] text-[#CBD5E1]">
              <tr>
                <td className="py-3.5 px-4 font-bold text-white">SQL & Relational DBs</td>
                <td className="py-3.5 px-4"><span className="text-[#C084FC]">Missing (Gap)</span></td>
                <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded bg-red-950/60 text-red-400 border border-red-800 text-[11px] font-bold">CRITICAL</span></td>
                <td className="py-3.5 px-4">94% of Job Postings</td>
                <td className="py-3.5 px-4">
                  <button onClick={() => setActiveTab('ai-tutor')} className="text-[#38BDF8] hover:underline font-semibold">Start AI Lesson →</button>
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-white">Python Data Manipulation</td>
                <td className="py-3.5 px-4"><span className="text-[#34D399]">Matched ✓</span></td>
                <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded bg-green-950/60 text-green-400 border border-green-800 text-[11px] font-bold">MASTERED</span></td>
                <td className="py-3.5 px-4">88% of Job Postings</td>
                <td className="py-3.5 px-4"><span className="text-[#64748B]">Ready</span></td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-white">Power BI / Tableau Storytelling</td>
                <td className="py-3.5 px-4"><span className="text-[#C084FC]">Missing (Gap)</span></td>
                <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-400 border border-amber-800 text-[11px] font-bold">HIGH</span></td>
                <td className="py-3.5 px-4">76% of Job Postings</td>
                <td className="py-3.5 px-4">
                  <button onClick={() => setActiveTab('roadmap')} className="text-[#38BDF8] hover:underline font-semibold">Roadmap Step 4</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};
