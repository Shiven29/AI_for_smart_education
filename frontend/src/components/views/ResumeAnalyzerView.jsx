import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  ArrowRight, 
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CircularGauge } from '../common/CircularGauge';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { SAMPLE_RESUME_TEXT, DEFAULT_CAREER_ROLES } from '../../data/mockData';

export const ResumeAnalyzerView = () => {
  const { 
    userName, 
    careerGoal, 
    setCareerGoal, 
    resumeText, 
    setResumeText, 
    resumeAnalysis, 
    isLoadingResume, 
    runResumeAnalysis,
    setActiveTab
  } = useApp();

  const [activeTab, setActiveSubTab] = useState('editor'); // 'editor' | 'results'
  const [copiedSample, setCopiedSample] = useState(false);

  const handleScan = async () => {
    await runResumeAnalysis(userName, careerGoal, resumeText);
    setActiveSubTab('results');
  };

  const handleLoadSample = () => {
    setResumeText(SAMPLE_RESUME_TEXT);
    setCopiedSample(true);
    setTimeout(() => setCopiedSample(false), 2000);
  };

  const atsScore = resumeAnalysis?.resume_match_percentage ?? 68;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A233A] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#38BDF8] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Resume Scanner & ATS Optimizer</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ATS Resume Match Analyzer
          </h1>
          <p className="text-sm text-[#94A3B8] mt-1">
            Test your resume against modern Applicant Tracking Systems (ATS) for your target role.
          </p>
        </div>

        {/* Target Role Selector */}
        <div className="flex items-center gap-2 bg-[#121829] border border-[#232F4B] p-2 rounded-2xl">
          <span className="text-xs font-semibold text-[#94A3B8] pl-2">Target Role:</span>
          <select
            value={careerGoal}
            onChange={(e) => setCareerGoal(e.target.value)}
            className="bg-[#090D16] text-white text-xs font-bold py-1.5 px-3 rounded-xl border border-[#2F3E65] focus:outline-none focus:border-[#6366F1]"
          >
            {DEFAULT_CAREER_ROLES.map(role => (
              <option key={role.id} value={role.title}>{role.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Resume Input Area */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#121829] border border-[#1E293B] rounded-3xl p-6 space-y-4 shadow-xl">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#38BDF8]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Paste Resume Content</h3>
              </div>
              <button
                onClick={handleLoadSample}
                className="text-xs text-[#38BDF8] hover:text-[#7DD3FC] font-semibold flex items-center gap-1"
              >
                {copiedSample ? <Check className="w-3 h-3 text-[#34D399]" /> : <Copy className="w-3 h-3" />}
                <span>Load Sample Student Resume</span>
              </button>
            </div>

            <div className="relative">
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your plain text resume here (Summary, Education, Skills, Projects, Experience)..."
                rows={16}
                className="w-full p-4 bg-[#090D16] border border-[#222E4A] rounded-2xl text-xs sm:text-sm text-[#E2E8F0] font-mono placeholder-[#64748B] focus:outline-none focus:border-[#6366F1] resize-none leading-relaxed"
              />
              <div className="absolute bottom-3 right-3 text-[11px] text-[#64748B]">
                {resumeText.trim().split(/\s+/).filter(Boolean).length} words
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-[#94A3B8]">
                FastAPI: <span className="font-mono text-[#38BDF8]">POST /api/resume/analyze</span>
              </div>
              <Button
                variant="primary"
                icon={<Sparkles className="w-4 h-4 text-white" />}
                onClick={handleScan}
                disabled={isLoadingResume || !resumeText.trim()}
              >
                {isLoadingResume ? 'Scanning Resume...' : 'Analyze with ATS →'}
              </Button>
            </div>

          </div>
        </div>

        {/* Right Column: ATS Score & Improvement Output */}
        <div className="lg:col-span-6 space-y-6">
          
          {resumeAnalysis ? (
            <div className="space-y-6">
              
              {/* Score Card */}
              <div className="p-6 rounded-3xl bg-[#121829] border border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="space-y-2 text-center sm:text-left">
                  <span className="text-xs font-bold text-[#A5B4FC] uppercase tracking-wider">
                    ATS MATCH SCORE
                  </span>
                  <h3 className="text-2xl font-extrabold text-white">
                    {atsScore >= 80 ? 'Highly Competitive' : atsScore >= 60 ? 'Strong Candidate' : 'Needs Optimization'}
                  </h3>
                  <p className="text-xs text-[#94A3B8] max-w-sm">
                    {resumeAnalysis.message || `Your profile has a ${atsScore}% keyword match with ${careerGoal} ATS filters.`}
                  </p>
                </div>

                <div className="shrink-0">
                  <CircularGauge
                    percentage={atsScore}
                    size={130}
                    strokeWidth={10}
                    title=""
                    subLabel={atsScore >= 75 ? "ATS READY 🎯" : "OPTIMIZE ⚡"}
                  />
                </div>
              </div>

              {/* Detected vs Missing Skills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Detected / Matched Skills */}
                <div className="p-5 rounded-2xl bg-[#121829] border border-[#1E293B] space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#34D399] uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Detected Key Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {resumeAnalysis.matched_required_skills?.map((s, i) => (
                      <Badge key={i} variant="matched">{s}</Badge>
                    ))}
                    {resumeAnalysis.detected_skills?.filter(s => !resumeAnalysis.matched_required_skills?.includes(s)).map((s, i) => (
                      <Badge key={i} variant="neutral">{s}</Badge>
                    ))}
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="p-5 rounded-2xl bg-[#121829] border-2 border-[#6366F1] space-y-3 shadow-glow-purple">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#C084FC] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Missing Target Keywords</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {resumeAnalysis.missing_skills?.map((s, i) => (
                      <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#21163B] text-[#C084FC] border border-[#581C87]">
                        + {s}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Suggestions */}
              <div className="p-6 rounded-3xl bg-[#121829] border border-[#1E293B] space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4 text-[#F59E0B]" />
                  <span>AI Improvement Suggestions</span>
                </div>

                <div className="space-y-2.5">
                  {resumeAnalysis.improvement_suggestions?.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#090D16] border border-[#1E293B] text-xs text-[#CBD5E1] leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-[#182138] border border-[#2E3C60] text-[#38BDF8] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-[#121829]/50 border border-dashed border-[#1E293B] rounded-3xl space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#182138] text-[#38BDF8] flex items-center justify-center shadow-inner">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">Ready for Instant Analysis</h3>
                <p className="text-xs text-[#94A3B8] max-w-sm">
                  Click "Load Sample Student Resume" and "Analyze with ATS" to see detailed match scores and missing keywords.
                </p>
              </div>
              <Button variant="primary" onClick={handleScan}>
                Scan Sample Resume Now
              </Button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
