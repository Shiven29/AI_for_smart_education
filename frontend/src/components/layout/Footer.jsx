import React from 'react';
import { Sparkles, Terminal, Cpu, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer = () => {
  const { setActiveTab, setIsSettingsOpen } = useApp();

  return (
    <footer className="mt-20 border-t border-[#1A233A] bg-[#060910] text-[#94A3B8] text-xs py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#6366F1] to-[#22D3EE] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">CareerOS</span>
            </div>
            <p className="text-xs text-[#64748B] max-w-md">
              AI-Powered Student Career & Placement Platform built with React, Vite, and FastAPI. Precision skill gap analysis, ATS resume evaluation, and AI mock interviews.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[11px] text-[#38BDF8]">
              <span className="flex items-center gap-1">✦ Hackathon Ready</span>
              <span>•</span>
              <span className="flex items-center gap-1">⚡ FastAPI Powered</span>
              <span>•</span>
              <span className="flex items-center gap-1">🎯 ATS Compliant</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">Features</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('discovery')} className="hover:text-white transition-colors">
                  Career Roadmap & Skill Gap
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('resume')} className="hover:text-white transition-colors">
                  Resume ATS Scanner
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('interview')} className="hover:text-white transition-colors">
                  AI Mock Interview Room
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('design-system')} className="hover:text-white transition-colors">
                  CareerOS Design System
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">FastAPI Backend</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setIsSettingsOpen(true)} className="hover:text-white flex items-center gap-1 text-[#38BDF8]">
                  <span>API Settings & Endpoints</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li className="text-[11px] text-[#64748B]">POST /api/career/analyze</li>
              <li className="text-[11px] text-[#64748B]">POST /api/resume/analyze</li>
              <li className="text-[11px] text-[#64748B]">POST /api/interview/generate</li>
              <li className="text-[11px] text-[#64748B]">POST /api/interview/evaluate</li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-[#151E33] flex flex-col sm:flex-row items-center justify-between gap-4 text-[#64748B]">
          <div>© 2026 CareerOS AI. Hackathon Edition.</div>
          <div className="flex items-center gap-4">
            <span>Built for Students & Placement Cells</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
