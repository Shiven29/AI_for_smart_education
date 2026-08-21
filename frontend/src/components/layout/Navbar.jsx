import React from 'react';
import { Sparkles, Bell, Settings, Radio, CheckCircle2, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar = () => {
  const { activeTab, setActiveTab, userName, setIsSettingsOpen, apiConfig, backendOnline } = useApp();

  const navItems = [
    { id: 'landing', label: 'Overview' },
    { id: 'blueprint', label: 'Roadmap' },
    { id: 'resume', label: 'Resume ATS' },
    { id: 'interview', label: 'AI Interview' },
    { id: 'design-system', label: 'Design System' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1A233A] bg-[#090D16]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-2 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#6366F1] to-[#22D3EE] flex items-center justify-center shadow-glow-purple group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
            CareerOS
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#1E293B] text-[#38BDF8] border border-[#2A3550]">
              AI
            </span>
          </span>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map(item => {
            const isActive = activeTab === item.id || (item.id === 'blueprint' && activeTab === 'discovery');
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive 
                    ? 'text-white font-semibold' 
                    : 'text-[#94A3B8] hover:text-[#E2E8F0] hover:bg-[#121829]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#22D3EE] rounded-full shadow-glow-purple" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center gap-3">
          
          {/* Backend Status Pill */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className={`hidden sm:flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full border transition-all ${
              apiConfig.useMock 
                ? 'bg-[#151D30] text-[#94A3B8] border-[#2A3550] hover:border-[#6366F1]'
                : backendOnline
                  ? 'bg-[#0E2720] text-[#34D399] border-[#065F46]'
                  : 'bg-[#291E0F] text-[#FBBF24] border-[#78350F]'
            }`}
            title="Configure FastAPI Backend connection"
          >
            <Radio className={`w-3 h-3 ${apiConfig.useMock ? 'text-[#818CF8]' : backendOnline ? 'text-[#34D399] animate-pulse' : 'text-[#FBBF24]'}`} />
            <span>{apiConfig.useMock ? 'Mock Demo Mode' : backendOnline ? 'FastAPI Connected' : 'FastAPI Offline'}</span>
          </button>

          {/* Settings Trigger */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 rounded-xl text-[#94A3B8] hover:text-white bg-[#121829] hover:bg-[#1A233A] border border-[#1E293B] transition-colors"
            title="FastAPI Settings & Payloads"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button 
              className="p-2 rounded-xl text-[#94A3B8] hover:text-white bg-[#121829] hover:bg-[#1A233A] border border-[#1E293B] transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
            </button>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#38BDF8]" />
          </div>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#1E293B]">
            <div className="w-8 h-8 rounded-xl bg-[#1E2640] border border-[#2F3E65] text-[#38BDF8] font-bold text-xs flex items-center justify-center shadow-inner">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span className="hidden lg:inline text-xs font-semibold text-[#E2E8F0]">
              {userName}
            </span>
          </div>

        </div>

      </div>

      {/* Mobile Submenu Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-[#1A233A] bg-[#0C111C] px-2 py-1.5 overflow-x-auto text-xs">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeTab === item.id ? 'text-[#38BDF8] font-bold bg-[#1E293B]' : 'text-[#94A3B8]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
