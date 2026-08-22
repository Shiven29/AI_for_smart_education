import React, { useState } from 'react';
import { 
  Sparkles, 
  Settings, 
  Radio, 
  Palette, 
  User, 
  LogOut, 
  LogIn, 
  UserPlus, 
  ChevronDown,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';

export const Navbar = () => {
  const { 
    activeTab, 
    setActiveTab, 
    userName, 
    collegeName,
    isAuthenticated,
    logoutUser,
    openAuthModal,
    setIsSettingsOpen, 
    apiConfig, 
    backendOnline 
  } = useApp();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const mainNav = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'ai-tutor', label: 'AI Tutor' },
    { id: 'quiz', label: 'Quizzes' },
    { id: 'resume', label: 'Resume ATS' },
    { id: 'interview', label: 'AI Interview' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1A233A] bg-[#090D16]/95 backdrop-blur-md">
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
          {mainNav.map(item => {
            const isActive = activeTab === item.id || 
              (item.id === 'dashboard' && ['dashboard', 'skill-gap', 'updated-plan'].includes(activeTab)) ||
              (item.id === 'quiz' && ['quiz', 'performance', 'recommendations'].includes(activeTab));
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

        {/* Right Tools & Authentication Actions */}
        <div className="flex items-center gap-3">
          
          {/* Design System button */}
          <button
            onClick={() => setActiveTab('design-system')}
            className={`hidden xl:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all ${
              activeTab === 'design-system' 
                ? 'bg-[#6366F1] text-white border-[#818CF8]' 
                : 'bg-[#121829] text-[#94A3B8] border-[#1E293B] hover:text-white'
            }`}
            title="View Figma Design System Foundation"
          >
            <Palette className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Design System</span>
          </button>

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

          {/* Authentication Section */}
          {isAuthenticated ? (
            <div className="relative">
              <div 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 pl-2 border-l border-[#1E293B] cursor-pointer group select-none"
              >
                <div className="w-8 h-8 rounded-xl bg-[#1E2640] border border-[#2F3E65] text-[#38BDF8] font-bold text-xs flex items-center justify-center shadow-inner group-hover:border-[#6366F1] transition-colors">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="hidden lg:flex flex-col items-start leading-none">
                  <span className="text-xs font-semibold text-[#E2E8F0] group-hover:text-[#38BDF8] transition-colors">
                    {userName}
                  </span>
                  <span className="text-[10px] text-[#64748B] mt-0.5">Student</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#64748B] hidden lg:block" />
              </div>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#121829] border border-[#243356] rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in duration-150">
                  <div className="px-3 py-2 border-b border-[#1E293B] mb-1">
                    <p className="text-xs font-bold text-white">{userName}</p>
                    <p className="text-[11px] text-[#94A3B8] truncate">{collegeName}</p>
                  </div>

                  <button
                    onClick={() => { setActiveTab('onboarding'); setProfileDropdownOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#CBD5E1] hover:text-white hover:bg-[#1A233A] rounded-xl transition-colors"
                  >
                    <GraduationCap className="w-4 h-4 text-[#38BDF8]" />
                    <span>Edit Student Profile</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('dashboard'); setProfileDropdownOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#CBD5E1] hover:text-white hover:bg-[#1A233A] rounded-xl transition-colors"
                  >
                    <User className="w-4 h-4 text-[#6366F1]" />
                    <span>Main Dashboard</span>
                  </button>

                  <button
                    onClick={() => { logoutUser(); setProfileDropdownOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-950/40 rounded-xl transition-colors mt-1 border-t border-[#1E293B]"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-2 border-l border-[#1E293B]">
              <button
                onClick={() => openAuthModal('signin')}
                className="px-3 py-1.5 text-xs font-semibold text-[#CBD5E1] hover:text-white hover:bg-[#121829] rounded-lg transition-colors"
              >
                Sign In
              </button>
              <Button
                variant="primary"
                onClick={() => openAuthModal('signup')}
                className="text-xs px-3.5 py-1.5"
              >
                Get Started
              </Button>
            </div>
          )}

        </div>

      </div>

      {/* Mobile Submenu Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-[#1A233A] bg-[#0C111C] px-2 py-1.5 overflow-x-auto text-xs">
        {mainNav.map(item => (
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
