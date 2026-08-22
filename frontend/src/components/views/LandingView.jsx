import React from 'react';
import { Sparkles, ArrowRight, Compass, FileText, MessageSquareCode, CheckCircle2, ChevronRight, Zap, Target, BookOpen, Award, LogIn } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';

export const LandingView = () => {
  const { setActiveTab, openAuthModal, isAuthenticated } = useApp();

  const handleStartOnboarding = () => {
    setActiveTab('onboarding');
  };

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      
      {/* Background Radial Glow Overlays */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-[#6366F1]/15 to-[#22D3EE]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Hero Section (Figma Screenshot 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-16 pb-16 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & CTAs */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#182138] border border-[#2A3B5E] text-xs font-bold text-[#38BDF8] uppercase tracking-wider shadow-inner">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-Powered Student Career & Placement Platform</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
                Build a career path that actually makes{' '}
                <span className="text-gradient-cyan">
                  sense for you.
                </span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-[#94A3B8] max-w-2xl font-normal leading-relaxed pt-1">
                AI analyzes your current skills, generates a personalized roadmap, teaches concepts with an AI tutor, and tracks placement readiness.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="primary"
                icon={<Sparkles className="w-4 h-4 text-white" />}
                className="text-base px-8 py-3.5 shadow-glow-purple"
                onClick={handleStartOnboarding}
              >
                Get Started →
              </Button>

              {!isAuthenticated ? (
                <button
                  onClick={() => openAuthModal('signin')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-sm text-[#CBD5E1] hover:text-white bg-[#121829] hover:bg-[#1A233A] border border-[#2A3550] transition-colors group"
                >
                  <LogIn className="w-4 h-4 text-[#38BDF8]" />
                  <span>Sign In to Account</span>
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-sm text-[#CBD5E1] hover:text-white bg-[#121829] hover:bg-[#1A233A] border border-[#2A3550] transition-colors group"
                >
                  <div className="w-5 h-5 rounded-full border border-[#64748B] group-hover:border-[#38BDF8] flex items-center justify-center transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#64748B] group-hover:bg-[#38BDF8]" />
                  </div>
                  <span>Explore Main Dashboard</span>
                </button>
              )}
            </div>

            {/* Feature Bullets Footer (Figma Screenshot 2 bottom row) */}
            <div className="pt-8 border-t border-[#1A233A]/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <span className="text-[#38BDF8] text-sm">✦</span>
                <span>Personalized AI roadmap</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#6366F1] text-sm">⦿</span>
                <span>Skill gap analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#34D399] text-sm">↗</span>
                <span>Career-ready journey</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Floating Preview Card (Figma Screenshot 2) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="w-full max-w-md bg-[#111728]/95 border border-[#232F4B] rounded-3xl p-7 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden transition-transform duration-300 hover:scale-[1.01]">
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1A233A]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#38BDF8] tracking-wider uppercase">
                  <span>✦</span>
                  <span>AI ANALYSIS</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#10B981] bg-[#0E2720] border border-[#065F46] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  PROFILE ANALYZED
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="text-xs uppercase font-bold tracking-wider text-[#94A3B8]">
                  Career Match
                </div>
                <div className="text-6xl sm:text-7xl font-extrabold text-white tracking-tight">
                  72%
                </div>
                
                <div className="w-full h-2.5 bg-[#1E293B] rounded-full overflow-hidden">
                  <div className="h-full w-[72%] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full shadow-glow-purple" />
                </div>
              </div>

              <div className="space-y-1 mb-6">
                <div className="text-xs text-[#94A3B8]">
                  Strong alignment with
                </div>
                <div className="text-xl font-extrabold text-white tracking-wide">
                  DATA ANALYST
                </div>
              </div>

              <div 
                className="bg-[#182138] border border-[#28375A] rounded-2xl p-4 space-y-1.5 cursor-pointer hover:border-[#6366F1] transition-all group"
                onClick={() => setActiveTab('ai-tutor')}
              >
                <div className="text-[11px] font-extrabold tracking-wider text-[#94A3B8] uppercase">
                  NEXT BEST MOVE
                </div>
                <div className="text-sm font-bold text-white flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="text-base">🔥</span>
                    <span>Learn SQL fundamentals</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#38BDF8] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 10-Stage Career Funnel Pathway Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full space-y-6">
        <div className="text-center space-y-1">
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">
            Continuous Learning & Placement Journey
          </h3>
          <p className="text-xs text-[#94A3B8]">Follow our structured 10-stage AI-guided progression</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { step: "01", title: "Onboarding", desc: "Profile & Role", tab: "onboarding" },
            { step: "02", title: "Dashboard", desc: "Readiness Hub", tab: "dashboard" },
            { step: "03", title: "Skill Gap", desc: "Identify Gaps", tab: "skill-gap" },
            { step: "04", title: "Roadmap", desc: "Milestones", tab: "roadmap" },
            { step: "05", title: "AI Tutor", desc: "Learn Concepts", tab: "ai-tutor" },
            { step: "06", title: "Quizzes", desc: "Test Skills", tab: "quiz" },
            { step: "07", title: "Performance", desc: "Score Metrics", tab: "performance" },
            { step: "08", title: "Smart Tips", desc: "Targeted Advice", tab: "recommendations" },
            { step: "09", title: "Updated Plan", desc: "Adaptive Schedule", tab: "updated-plan" },
            { step: "10", title: "Placement Ready", desc: "Resume & Mock", tab: "resume" },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveTab(item.tab)}
              className="p-3.5 rounded-2xl bg-[#121829] border border-[#1E293B] hover:border-[#6366F1] cursor-pointer transition-all hover:-translate-y-1"
            >
              <div className="text-[11px] font-bold text-[#6366F1] font-mono mb-1">{item.step}</div>
              <div className="text-xs font-bold text-white">{item.title}</div>
              <div className="text-[11px] text-[#94A3B8]">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
