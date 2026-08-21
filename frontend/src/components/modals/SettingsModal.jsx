import React, { useState } from 'react';
import { X, Server, CheckCircle2, AlertCircle, RefreshCw, Terminal, Layers, Play } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';

export const SettingsModal = () => {
  const { 
    isSettingsOpen, 
    setIsSettingsOpen, 
    apiConfig, 
    updateApiSettings, 
    backendOnline, 
    checkBackend 
  } = useApp();

  const [baseUrlInput, setBaseUrlInput] = useState(apiConfig.baseUrl);
  const [useMockInput, setUseMockInput] = useState(apiConfig.useMock);
  const [isTesting, setIsTesting] = useState(false);
  const [activeTab, setActiveTab] = useState('config'); // 'config' | 'endpoints'

  if (!isSettingsOpen) return null;

  const handleSave = () => {
    updateApiSettings(baseUrlInput, useMockInput);
    setIsSettingsOpen(false);
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    await checkBackend();
    setTimeout(() => setIsTesting(false), 500);
  };

  const endpoints = [
    {
      method: "POST",
      path: "/api/career/analyze",
      name: "Career Roadmap & Skill Gap",
      sampleBody: JSON.stringify({
        name: "Student",
        career_goal: "Data Analyst",
        current_skills: ["Python", "Excel", "SQL"]
      }, null, 2)
    },
    {
      method: "POST",
      path: "/api/resume/analyze",
      name: "Resume Analyzer & ATS Score",
      sampleBody: JSON.stringify({
        name: "Student",
        career_goal: "Data Analyst",
        resume_text: "Python, Excel, SQL, Pandas data cleaning..."
      }, null, 2)
    },
    {
      method: "POST",
      path: "/api/interview/generate",
      name: "Mock Interview Questions",
      sampleBody: JSON.stringify({
        name: "Student",
        career_goal: "Data Analyst"
      }, null, 2)
    },
    {
      method: "POST",
      path: "/api/interview/evaluate",
      name: "Interview Answer Evaluation",
      sampleBody: JSON.stringify({
        career_goal: "Data Analyst",
        question: "Difference between WHERE and HAVING?",
        expected_keywords: ["WHERE", "HAVING", "GROUP BY"],
        answer: "WHERE filters rows before GROUP BY while HAVING filters aggregated results..."
      }, null, 2)
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#121829] border border-[#2A3550] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1E293B] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1E2640] border border-[#2F3E65] flex items-center justify-center text-[#38BDF8]">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">FastAPI Backend Hub</h3>
              <p className="text-xs text-[#94A3B8]">Configure live backend integration or instant mock presentation mode</p>
            </div>
          </div>
          <button 
            onClick={() => setIsSettingsOpen(false)}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1E293B] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Subtabs */}
        <div className="flex border-b border-[#1E293B] bg-[#0C111C] px-6">
          <button
            onClick={() => setActiveTab('config')}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'config' ? 'border-[#6366F1] text-white' : 'border-transparent text-[#94A3B8] hover:text-white'
            }`}
          >
            Connection Settings
          </button>
          <button
            onClick={() => setActiveTab('endpoints')}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'endpoints' ? 'border-[#6366F1] text-white' : 'border-transparent text-[#94A3B8] hover:text-white'
            }`}
          >
            FastAPI API Contracts & Schemas
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 flex-1">
          
          {activeTab === 'config' && (
            <>
              {/* Mode Selector */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                  Operational Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div 
                    onClick={() => setUseMockInput(true)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      useMockInput 
                        ? 'bg-[#192238] border-[#6366F1] shadow-glow-purple ring-1 ring-[#6366F1]' 
                        : 'bg-[#0E1424] border-[#1E293B] hover:border-[#2D3C61]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-sm text-white flex items-center gap-1.5">
                        🧪 Mock Demo Mode
                      </span>
                      {useMockInput && <CheckCircle2 className="w-4 h-4 text-[#34D399]" />}
                    </div>
                    <p className="text-xs text-[#94A3B8]">
                      Ideal for hackathon presentation and offline testing. Instant responses with zero dependencies.
                    </p>
                  </div>

                  <div 
                    onClick={() => setUseMockInput(false)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      !useMockInput 
                        ? 'bg-[#192238] border-[#6366F1] shadow-glow-purple ring-1 ring-[#6366F1]' 
                        : 'bg-[#0E1424] border-[#1E293B] hover:border-[#2D3C61]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-sm text-white flex items-center gap-1.5">
                        ⚡ Live FastAPI Mode
                      </span>
                      {!useMockInput && <CheckCircle2 className="w-4 h-4 text-[#34D399]" />}
                    </div>
                    <p className="text-xs text-[#94A3B8]">
                      Connects directly to your running FastAPI server endpoints at the specified URL.
                    </p>
                  </div>
                </div>
              </div>

              {/* FastAPI Base URL input */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                  FastAPI Server URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={baseUrlInput}
                    onChange={(e) => setBaseUrlInput(e.target.value)}
                    placeholder="http://127.0.0.1:8000"
                    className="flex-1 px-3.5 py-2.5 bg-[#0A0E1A] border border-[#232F4B] rounded-xl text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#6366F1]"
                  />
                  <Button
                    variant="secondary"
                    onClick={handleTestConnection}
                    disabled={isTesting}
                    icon={<RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />}
                  >
                    Ping Server
                  </Button>
                </div>
                
                {/* Status Indicator */}
                <div className="flex items-center gap-2 pt-1 text-xs">
                  <span className="text-[#94A3B8]">Live Server Status:</span>
                  {backendOnline ? (
                    <span className="text-[#34D399] flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Online & Reachable
                    </span>
                  ) : (
                    <span className="text-[#F59E0B] flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" /> No response from {baseUrlInput} (Graceful simulation active)
                    </span>
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === 'endpoints' && (
            <div className="space-y-4">
              <p className="text-xs text-[#94A3B8]">
                CareerOS is fully pre-wired to hit these 4 exact FastAPI routes:
              </p>
              
              <div className="space-y-3">
                {endpoints.map((ep, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#090D16] border border-[#1E293B] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#1E293B] text-[#38BDF8]">
                          {ep.method}
                        </span>
                        <span className="font-mono text-xs text-white font-semibold">{ep.path}</span>
                      </div>
                      <span className="text-xs text-[#94A3B8]">{ep.name}</span>
                    </div>
                    <pre className="p-2.5 rounded-lg bg-[#05080E] font-mono text-[11px] text-[#A5B4FC] overflow-x-auto">
                      <code>{ep.sampleBody}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#1E293B] bg-[#0E1424] flex items-center justify-end gap-3">
          <Button variant="secondary" onClick={() => setIsSettingsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save & Apply
          </Button>
        </div>

      </div>
    </div>
  );
};
