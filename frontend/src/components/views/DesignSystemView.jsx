import React from 'react';
import { Sparkles, ArrowRight, Check, AlertTriangle, BarChart3, Layers } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const DesignSystemView = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-in fade-in duration-300">
      
      {/* Design System Header (Figma Screenshot 1 Top) */}
      <div className="space-y-1 border-b border-[#1A233A] pb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
          DESIGN SYSTEM
        </h1>
        <p className="text-sm text-[#94A3B8] font-medium">
          CareerOS AI UI Foundation
        </p>
      </div>

      {/* 01. TYPOGRAPHY (Figma Screenshot 1) */}
      <section className="space-y-6">
        <div className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
          01. TYPOGRAPHY
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Build your future with clarity.
          </h2>

          <div className="flex flex-wrap items-baseline gap-8 text-xl font-bold">
            <span className="text-2xl font-bold text-white">Your Career Roadmap</span>
            <span className="text-xl font-semibold text-[#CBD5E1]">Skill Analysis</span>
            <span className="text-lg font-medium text-[#94A3B8]">AI Career Insight</span>
          </div>

          <div className="space-y-1 text-sm text-[#94A3B8]">
            <p>Build a personalized roadmap based on your skills.</p>
            <p className="text-xs text-[#64748B]">4–6 weeks · Beginner</p>
          </div>
        </div>
      </section>

      {/* 02. BUTTONS (Figma Screenshot 1) */}
      <section className="space-y-6">
        <div className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
          02. BUTTONS
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary" icon={<Sparkles className="w-4 h-4 text-white" />} showArrow>
            Build My Roadmap
          </Button>

          <Button variant="secondary">
            Explore Roadmap
          </Button>

          <Button variant="purple" showArrow>
            Start Learning
          </Button>
        </div>
      </section>

      {/* 03. NAVIGATION (Figma Screenshot 1) */}
      <section className="space-y-6">
        <div className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
          03. NAVIGATION
        </div>

        <div className="flex items-center gap-6 text-sm font-medium text-[#94A3B8] border-b border-[#1A233A] pb-3 max-w-xl">
          <span className="hover:text-white cursor-pointer transition-colors">Overview</span>
          
          <div className="relative text-white font-bold cursor-pointer">
            <span>Roadmap</span>
            <span className="absolute -bottom-3 left-0 right-0 h-[2.5px] bg-[#6366F1] rounded-full shadow-glow-purple" />
          </div>

          <span className="hover:text-white cursor-pointer transition-colors">Projects</span>
          <span className="hover:text-white cursor-pointer transition-colors">AI Copilot</span>
        </div>
      </section>

      {/* 04. CARDS & 05. TAGS & STATUS (Figma Screenshot 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* 04. CARDS */}
        <section className="lg:col-span-8 space-y-6">
          <div className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
            04. CARDS
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Standard Card */}
            <div className="p-6 rounded-2xl bg-[#121829] border border-[#1E293B] flex flex-col justify-between min-h-[140px]">
              <h4 className="font-bold text-sm text-white">Standard Card</h4>
              <p className="text-xs text-[#94A3B8]">Reusable surface</p>
            </div>

            {/* AI Insight Card */}
            <div className="p-6 rounded-2xl bg-[#121829] border-2 border-[#6366F1] shadow-glow-purple flex flex-col justify-between min-h-[140px]">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#38BDF8] uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>AI INSIGHT</span>
              </div>
              <h4 className="font-extrabold text-base text-white">Learn SQL next.</h4>
            </div>

            {/* Career Role Card */}
            <div className="p-6 rounded-2xl bg-[#121829] border border-[#1E293B] flex flex-col justify-between min-h-[140px]">
              <div className="w-8 h-8 rounded-lg bg-[#1A233A] border border-[#2D3C61] flex items-center justify-center text-lg">
                📊
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Data Analyst</h4>
                <p className="text-xs text-[#94A3B8]">Explore insights</p>
              </div>
            </div>

          </div>
        </section>

        {/* 05. TAGS & STATUS */}
        <section className="lg:col-span-4 space-y-6">
          <div className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
            05. TAGS & STATUS
          </div>

          <div className="grid grid-cols-2 gap-3">
            
            {/* Matched */}
            <div className="flex items-center">
              <Badge variant="matched">Python</Badge>
            </div>

            {/* Missing */}
            <div className="flex items-center">
              <Badge variant="purple">SQL</Badge>
            </div>

            {/* Warning */}
            <div className="flex items-center">
              <Badge variant="warning">C Programming</Badge>
            </div>

            {/* Outlined */}
            <div className="flex items-center">
              <span className="px-3 py-1 rounded-full text-xs font-bold border border-[#6366F1] text-[#A5B4FC] uppercase tracking-wider">
                DATA ANALYST
              </span>
            </div>

          </div>
        </section>

      </div>

    </div>
  );
};
