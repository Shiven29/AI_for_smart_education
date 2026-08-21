import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, TrendingUp, Compass, FileText, MessageSquareCode, ShieldCheck, PlayCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';

export const LandingView = () => {
  const { setActiveTab, setDiscoveryStep } = useApp();

  const handleStartRoadmap = () => {
    setDiscoveryStep(1);
    setActiveTab('discovery');
  };

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      
      {/* Background Radial Glow Overlays */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#6366F1]/15 to-[#22D3EE]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-[#6366F1]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Hero Section (Figma Screenshot 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20 pb-16 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & CTAs */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
                Build a career path that actually makes{' '}
                <span className="text-gradient-cyan">
                  sense for you.
                </span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-[#94A3B8] max-w-2xl font-normal leading-relaxed pt-2">
                AI analyzes your current skills and shows what you need to learn to reach your dream career.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="primary"
                icon={<Sparkles className="w-4 h-4 text-white" />}
                className="text-base px-7 py-3.5 shadow-glow-purple"
                onClick={handleStartRoadmap}
              >
                Build My Roadmap
              </Button>

              <button
                onClick={() => setActiveTab('blueprint')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-sm text-[#CBD5E1] hover:text-white bg-[#121829] hover:bg-[#1A233A] border border-[#2A3550] transition-colors group"
              >
                <div className="w-5 h-5 rounded-full border border-[#64748B] group-hover:border-[#38BDF8] flex items-center justify-center transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#64748B] group-hover:bg-[#38BDF8]" />
                </div>
                <span>See How It Works</span>
              </button>
            </div>

            {/* Feature Bullets Footer (Figma Screenshot 2 bottom row) */}
            <div className="pt-10 border-t border-[#1A233A]/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-[#94A3B8]">
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
            
            {/* Ambient Background Disc behind Card */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#1E293B] to-[#121829] rounded-3xl blur-xl opacity-60 -z-10" />
            <div className="absolute -right-6 -bottom-6 w-56 h-56 rounded-full bg-[#1E2640]/50 -z-10" />
            
            {/* The Precision Floating Card */}
            <div className="w-full max-w-md bg-[#111728]/95 border border-[#232F4B] rounded-3xl p-7 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden transition-transform duration-300 hover:scale-[1.01]">
              
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1A233A]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#38BDF8] tracking-wider uppercase">
                  <span>✦</span>
                  <span>AI ANALYSIS</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#10B981] bg-[#0E2720] border border-[#065F46] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  PROFILE ANALYZED
                </div>
              </div>

              {/* Career Match Section */}
              <div className="space-y-4 mb-6">
                <div className="text-xs uppercase font-bold tracking-wider text-[#94A3B8]">
                  Career Match
                </div>
                <div className="text-6xl sm:text-7xl font-extrabold text-white tracking-tight">
                  72%
                </div>
                
                {/* Purple Progress Bar */}
                <div className="w-full h-2.5 bg-[#1E293B] rounded-full overflow-hidden">
                  <div className="h-full w-[72%] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full shadow-glow-purple" />
                </div>
              </div>

              {/* Role Alignment */}
              <div className="space-y-1 mb-6">
                <div className="text-xs text-[#94A3B8]">
                  Strong alignment with
                </div>
                <div className="text-xl font-extrabold text-white tracking-wide">
                  DATA ANALYST
                </div>
              </div>

              {/* Next Best Move Inner Box */}
              <div className="bg-[#182138] border border-[#28375A] rounded-2xl p-4 space-y-1.5 cursor-pointer hover:border-[#6366F1] transition-all group"
                   onClick={() => setActiveTab('blueprint')}>
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

      {/* Feature Showcase Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div 
            onClick={handleStartRoadmap}
            className="p-5 rounded-2xl bg-[#121829] border border-[#1E293B] hover:border-[#6366F1] cursor-pointer transition-all hover:-translate-y-1 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#21163B] text-[#C084FC] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">1. Skill Gap Roadmap</h3>
            <p className="text-xs text-[#94A3B8]">Map your current skills against market benchmarks and discover targeted next moves.</p>
          </div>

          <div 
            onClick={() => setActiveTab('resume')}
            className="p-5 rounded-2xl bg-[#121829] border border-[#1E293B] hover:border-[#38BDF8] cursor-pointer transition-all hover:-translate-y-1 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0F2830] text-[#38BDF8] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">2. ATS Resume Scanner</h3>
            <p className="text-xs text-[#94A3B8]">Get instant keyword match analysis, missing competencies, and ATS score optimization.</p>
          </div>

          <div 
            onClick={() => setActiveTab('interview')}
            className="p-5 rounded-2xl bg-[#121829] border border-[#1E293B] hover:border-[#34D399] cursor-pointer transition-all hover:-translate-y-1 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0E2720] text-[#34D399] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <MessageSquareCode className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">3. AI Mock Interview</h3>
            <p className="text-xs text-[#94A3B8]">Practice real role-specific questions and receive automated scoring with keyword evaluation.</p>
          </div>

        </div>
      </section>

    </div>
  );
};
