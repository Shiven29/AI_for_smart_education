import React, { useState } from 'react';
import { Sparkles, Check, Plus, X, ArrowRight, ArrowLeft, Laptop, BarChart3, Bot, ShieldCheck, Palette, Cloud, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DEFAULT_CAREER_ROLES, POPULAR_SKILLS } from '../../data/mockData';
import { Button } from '../common/Button';

export const CareerDiscoveryView = () => {
  const {
    careerGoal,
    selectedRoleObj,
    selectRole,
    currentSkills,
    toggleSkill,
    addCustomSkill,
    discoveryStep,
    setDiscoveryStep,
    runCareerAnalysis,
    setActiveTab,
    isLoadingCareer,
    userName,
    setUserName
  } = useApp();

  const [customSkillInput, setCustomSkillInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRoles = DEFAULT_CAREER_ROLES.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddCustomSkill = (e) => {
    e.preventDefault();
    if (customSkillInput.trim()) {
      addCustomSkill(customSkillInput.trim());
      setCustomSkillInput("");
    }
  };

  const handleProceedToSkills = () => {
    setDiscoveryStep(2);
  };

  const handleGenerateBlueprint = async () => {
    setDiscoveryStep(3);
    await runCareerAnalysis(userName, careerGoal, currentSkills);
    setActiveTab('blueprint');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      
      {/* Top Header Section (Figma Screenshot 3) */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#182138] border border-[#2B3B60] text-xs font-bold text-[#38BDF8] tracking-wider uppercase shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>AI-POWERED CAREER DISCOVERY</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          What do you want your future<br className="hidden sm:inline" /> to look like?
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
          Pick a career destination. CareerOS will analyze where you are today and show you what it takes to get there.
        </p>

        {/* AI Help Banner */}
        <div className="pt-1">
          <button 
            onClick={() => selectRole(DEFAULT_CAREER_ROLES[0])}
            className="inline-flex items-center gap-1.5 text-xs text-[#38BDF8] hover:text-[#7DD3FC] transition-colors font-medium group"
          >
            <span>✨ Not sure which path fits you? Let AI help me choose</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Main Step Content */}
      <div className="py-8 my-auto">
        
        {/* STEP 1: CAREER GOAL SELECTION (Figma Screenshot 3 Layout) */}
        {discoveryStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Big Highlighted Selected Path Card */}
            <div className="lg:col-span-5 flex">
              <div className="w-full bg-[#121829] border-2 border-[#6366F1] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-glow-purple relative overflow-hidden">
                
                <div className="space-y-6">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#A5B4FC] uppercase tracking-wider">
                      <span>✦</span>
                      <span>YOUR SELECTED PATH</span>
                    </div>
                    <span className="text-xs text-[#34D399] font-semibold flex items-center gap-1 bg-[#0E2720] border border-[#065F46] px-2.5 py-0.5 rounded-full">
                      <Check className="w-3 h-3" /> Selected
                    </span>
                  </div>

                  {/* Icon Box */}
                  <div className="w-16 h-16 rounded-2xl bg-[#1A233A] border border-[#2D3C61] flex items-center justify-center text-3xl shadow-inner">
                    {selectedRoleObj.icon}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                      {selectedRoleObj.title}
                    </h2>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">
                      {selectedRoleObj.description}
                    </p>
                  </div>

                  {/* Required Key Skills Pills */}
                  <div className="space-y-2 pt-2">
                    <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                      Core Target Competencies:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedRoleObj.skills.map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 rounded-full bg-[#182138] text-xs font-medium text-[#CBD5E1] border border-[#2B3B60]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Candidate Name Input */}
                <div className="pt-6 mt-6 border-t border-[#1E293B] space-y-2">
                  <label className="text-xs font-semibold text-[#94A3B8]">Your Name / Handle:</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Student"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#090D16] border border-[#232F4B] text-sm text-white focus:outline-none focus:border-[#6366F1]"
                  />
                </div>

              </div>
            </div>

            {/* Right Grid of Alternative Career Paths (Figma Screenshot 3 2x2 Grid) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DEFAULT_CAREER_ROLES.map((role) => {
                  const isSelected = selectedRoleObj.id === role.id;
                  return (
                    <div
                      key={role.id}
                      onClick={() => selectRole(role)}
                      className={`p-5 rounded-2xl cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#182138] border-2 border-[#6366F1] shadow-glow-purple'
                          : 'bg-[#121829] border border-[#1E293B] hover:border-[#38486D] hover:bg-[#151D30]'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-[#1A233A] border border-[#293754] flex items-center justify-center text-xl shrink-0">
                          {role.icon}
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-bold text-sm text-white">{role.title}</h3>
                          <p className="text-xs text-[#94A3B8] line-clamp-2">{role.description}</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#1E293B]/60 flex items-center justify-between text-xs">
                        <span className="text-[#64748B]">{role.stats}</span>
                        <span className={`font-semibold ${isSelected ? 'text-[#38BDF8]' : 'text-[#94A3B8]'}`}>
                          {isSelected ? '✓ Active' : 'Select →'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

        {/* STEP 2: YOUR CURRENT SKILLS SELECTION */}
        {discoveryStep === 2 && (
          <div className="max-w-4xl mx-auto bg-[#121829] border border-[#1E293B] rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  Step 2: What skills do you already know?
                </h2>
                <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
                  Select your current skills or add your own. CareerOS will compare these against the requirements for <span className="text-[#38BDF8] font-bold">{careerGoal}</span>.
                </p>
              </div>
              <Button variant="secondary" onClick={() => setDiscoveryStep(1)} icon={<ArrowLeft className="w-3.5 h-3.5" />}>
                Change Role
              </Button>
            </div>

            {/* Custom Skill Add Form */}
            <form onSubmit={handleAddCustomSkill} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={customSkillInput}
                  onChange={(e) => setCustomSkillInput(e.target.value)}
                  placeholder="Type a skill and press Enter (e.g. Python, SQL, C++, Figma)..."
                  className="w-full px-4 py-3 bg-[#0A0E1A] border border-[#232F4B] rounded-xl text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#6366F1]"
                />
              </div>
              <Button type="submit" variant="primary" icon={<Plus className="w-4 h-4" />}>
                Add Skill
              </Button>
            </form>

            {/* Selected Skills Chips */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] flex items-center justify-between">
                <span>Selected Skills ({currentSkills.length})</span>
                <span className="text-[11px] text-[#64748B] lowercase">click any to remove</span>
              </div>
              <div className="flex flex-wrap gap-2 p-4 bg-[#0A0E1A] border border-[#1E293B] rounded-2xl min-h-[70px] items-center">
                {currentSkills.length === 0 ? (
                  <span className="text-xs text-[#64748B]">No skills selected yet. Click from the suggestions below or type your own.</span>
                ) : (
                  currentSkills.map((skill, index) => (
                    <span
                      key={index}
                      onClick={() => toggleSkill(skill)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1A2540] text-xs font-medium text-[#38BDF8] border border-[#2D3C61] cursor-pointer hover:bg-[#25355C] transition-colors group"
                    >
                      <Check className="w-3 h-3 text-[#34D399]" />
                      <span>{skill}</span>
                      <X className="w-3 h-3 text-[#64748B] group-hover:text-red-400 ml-1" />
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Popular Skills Suggestion Grid */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                Quick Select Suggestions:
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SKILLS.map((skill, index) => {
                  const isSelected = currentSkills.includes(skill);
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        isSelected
                          ? 'bg-[#0E2720] text-[#34D399] border-[#065F46]'
                          : 'bg-[#121829] text-[#94A3B8] border-[#1E293B] hover:border-[#38486D] hover:text-white'
                      }`}
                    >
                      {isSelected ? `✓ ${skill}` : `+ ${skill}`}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Bottom CTA & Stepper (Figma Screenshot 3 bottom section) */}
      <div className="pt-6 border-t border-[#1A233A] space-y-6">
        
        {/* Main CTA Button */}
        <div className="flex flex-col items-center justify-center space-y-2">
          {discoveryStep === 1 ? (
            <Button
              variant="primary"
              icon={<Sparkles className="w-4 h-4 text-white" />}
              className="w-full sm:w-auto text-base px-10 py-3.5 shadow-glow-purple"
              onClick={handleProceedToSkills}
            >
              Build My Career Path →
            </Button>
          ) : (
            <Button
              variant="primary"
              icon={<Sparkles className="w-4 h-4 text-white" />}
              className="w-full sm:w-auto text-base px-10 py-3.5 shadow-glow-purple"
              onClick={handleGenerateBlueprint}
              disabled={isLoadingCareer}
            >
              {isLoadingCareer ? 'Analyzing with AI...' : 'Generate Career Blueprint →'}
            </Button>
          )}

          <p className="text-xs text-[#94A3B8]">
            {discoveryStep === 1 
              ? 'Next: Tell us what you already know' 
              : 'Next: AI analyzes skill gaps & builds roadmap'}
          </p>
        </div>

        {/* 3-Step Indicator (Matching Figma Screenshot 3 bottom navigation) */}
        <div className="max-w-xl mx-auto flex items-center justify-between pt-4">
          
          {/* Step 1 */}
          <div 
            onClick={() => setDiscoveryStep(1)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              discoveryStep >= 1 ? 'bg-[#6366F1] text-white shadow-glow-purple' : 'bg-[#1E293B] text-[#94A3B8]'
            }`}>
              1
            </div>
            <span className={`text-xs font-semibold ${discoveryStep === 1 ? 'text-white' : 'text-[#94A3B8]'}`}>
              Career Goal
            </span>
          </div>

          {/* Connector Line 1 */}
          <div className={`flex-1 h-[2px] mx-4 transition-colors ${
            discoveryStep >= 2 ? 'bg-[#6366F1]' : 'bg-[#1E293B]'
          }`} />

          {/* Step 2 */}
          <div 
            onClick={() => setDiscoveryStep(2)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              discoveryStep >= 2 ? 'bg-[#6366F1] text-white shadow-glow-purple' : 'bg-[#1E293B] text-[#94A3B8]'
            }`}>
              2
            </div>
            <span className={`text-xs font-semibold ${discoveryStep === 2 ? 'text-white' : 'text-[#94A3B8]'}`}>
              Your Skills
            </span>
          </div>

          {/* Connector Line 2 */}
          <div className={`flex-1 h-[2px] mx-4 transition-colors ${
            discoveryStep >= 3 ? 'bg-[#6366F1]' : 'bg-[#1E293B]'
          }`} />

          {/* Step 3 */}
          <div 
            onClick={() => setActiveTab('blueprint')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              discoveryStep >= 3 ? 'bg-[#6366F1] text-white shadow-glow-purple' : 'bg-[#1E293B] text-[#94A3B8]'
            }`}>
              3
            </div>
            <span className={`text-xs font-semibold ${discoveryStep === 3 ? 'text-white' : 'text-[#94A3B8]'}`}>
              AI Roadmap
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
