import React, { useState } from 'react';
import { Sparkles, Check, Plus, X, ArrowRight, ArrowLeft, GraduationCap, Building2, Clock, BookOpen, Target } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DEFAULT_CAREER_ROLES, POPULAR_SKILLS } from '../../data/mockData';
import { Button } from '../common/Button';

export const StudentOnboardingView = () => {
  const {
    userName, setUserName,
    collegeName, setCollegeName,
    yearOfStudy, setYearOfStudy,
    careerGoal,
    selectedRoleObj, selectRole,
    currentSkills, toggleSkill, addCustomSkill,
    weeklyHours, setWeeklyHours,
    onboardingStep, setOnboardingStep,
    runCareerAnalysis,
    setActiveTab,
    isLoadingCareer
  } = useApp();

  const [customSkillInput, setCustomSkillInput] = useState("");

  const handleAddCustomSkill = (e) => {
    e.preventDefault();
    if (customSkillInput.trim()) {
      addCustomSkill(customSkillInput.trim());
      setCustomSkillInput("");
    }
  };

  const handleCompleteOnboarding = async () => {
    await runCareerAnalysis(userName, careerGoal, currentSkills);
    setActiveTab('dashboard');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[calc(100vh-4rem)] flex flex-col justify-between animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#182138] border border-[#2B3B60] text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Stage 2 · Student Onboarding</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Let's personalize your CareerOS journey
        </h1>
        <p className="text-sm text-[#94A3B8]">
          Tell us about your background, career aspirations, and current skillset.
        </p>
      </div>

      {/* Onboarding Wizard Steps */}
      <div className="py-8 my-auto">
        
        {/* STEP 1: PROFILE & CAREER GOAL */}
        {onboardingStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
            
            {/* Student Info Card */}
            <div className="lg:col-span-5 bg-[#121829] border border-[#1E293B] rounded-3xl p-6 sm:p-7 space-y-5 shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4" />
                  <span>Student Profile</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#94A3B8]">Full Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Student Name"
                    className="w-full px-3.5 py-2.5 bg-[#090D16] border border-[#232F4B] rounded-xl text-sm text-white focus:outline-none focus:border-[#6366F1]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#94A3B8]">College / University</label>
                  <input
                    type="text"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="Institute Name"
                    className="w-full px-3.5 py-2.5 bg-[#090D16] border border-[#232F4B] rounded-xl text-sm text-white focus:outline-none focus:border-[#6366F1]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#94A3B8]">Current Year of Study</label>
                  <select
                    value={yearOfStudy}
                    onChange={(e) => setYearOfStudy(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#090D16] border border-[#232F4B] rounded-xl text-sm text-white focus:outline-none focus:border-[#6366F1]"
                  >
                    <option value="1st Year (Freshman)">1st Year (Freshman)</option>
                    <option value="2nd Year (Sophomore)">2nd Year (Sophomore)</option>
                    <option value="3rd Year (Junior)">3rd Year (Junior)</option>
                    <option value="4th Year (Senior)">4th Year (Senior)</option>
                    <option value="Graduate / Alum">Graduate / Masters / Alum</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1E293B] text-xs text-[#64748B]">
                Selected Destination: <span className="text-[#38BDF8] font-bold">{careerGoal}</span>
              </div>
            </div>

            {/* Career Destination Selector (Figma Screenshot 3 cards) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#A5B4FC] uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="w-4 h-4" />
                  <span>Choose Target Career Role</span>
                </span>
                <span className="text-xs text-[#34D399] font-medium">Figma Design System</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {DEFAULT_CAREER_ROLES.map((role) => {
                  const isSelected = selectedRoleObj.id === role.id;
                  return (
                    <div
                      key={role.id}
                      onClick={() => selectRole(role)}
                      className={`p-4.5 rounded-2xl cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#182138] border-2 border-[#6366F1] shadow-glow-purple ring-1 ring-[#6366F1]'
                          : 'bg-[#121829] border border-[#1E293B] hover:border-[#38486D] hover:bg-[#151D30]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#1A233A] border border-[#293754] flex items-center justify-center text-xl shrink-0">
                          {role.icon}
                        </div>
                        <div className="space-y-0.5">
                          <h3 className="font-bold text-sm text-white">{role.title}</h3>
                          <p className="text-xs text-[#94A3B8] line-clamp-2">{role.description}</p>
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-[#1E293B]/60 flex items-center justify-between text-xs">
                        <span className="text-[#64748B]">{role.stats}</span>
                        <span className={`font-semibold ${isSelected ? 'text-[#38BDF8]' : 'text-[#94A3B8]'}`}>
                          {isSelected ? '✓ Selected' : 'Select'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* STEP 2: CURRENT SKILLS SELECTION */}
        {onboardingStep === 2 && (
          <div className="max-w-4xl mx-auto bg-[#121829] border border-[#1E293B] rounded-3xl p-6 sm:p-8 space-y-7 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-4">
              <div>
                <h2 className="text-xl font-extrabold text-white">What skills do you currently possess?</h2>
                <p className="text-xs text-[#94A3B8] mt-0.5">CareerOS will benchmark these against <span className="text-[#38BDF8] font-bold">{careerGoal}</span>.</p>
              </div>
              <Button variant="secondary" onClick={() => setOnboardingStep(1)} icon={<ArrowLeft className="w-3.5 h-3.5" />}>
                Back
              </Button>
            </div>

            {/* Custom Skill Input */}
            <form onSubmit={handleAddCustomSkill} className="flex gap-2">
              <input
                type="text"
                value={customSkillInput}
                onChange={(e) => setCustomSkillInput(e.target.value)}
                placeholder="Type any skill (e.g. Python, SQL, C++, Java, Figma) and press Add..."
                className="flex-1 px-4 py-2.5 bg-[#0A0E1A] border border-[#232F4B] rounded-xl text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#6366F1]"
              />
              <Button type="submit" variant="primary" icon={<Plus className="w-4 h-4" />}>
                Add Skill
              </Button>
            </form>

            {/* Selected Skills */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                Your Current Skills ({currentSkills.length})
              </div>
              <div className="flex flex-wrap gap-2 p-4 bg-[#0A0E1A] border border-[#1E293B] rounded-2xl min-h-[60px] items-center">
                {currentSkills.map((skill, index) => (
                  <span
                    key={index}
                    onClick={() => toggleSkill(skill)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1A2540] text-xs font-medium text-[#38BDF8] border border-[#2D3C61] cursor-pointer hover:bg-[#25355C] transition-colors"
                  >
                    <Check className="w-3 h-3 text-[#34D399]" />
                    <span>{skill}</span>
                    <X className="w-3 h-3 text-[#64748B] hover:text-red-400 ml-1" />
                  </span>
                ))}
              </div>
            </div>

            {/* Suggested Skills */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                Popular Suggestions:
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

        {/* STEP 3: LEARNING PREFERENCES */}
        {onboardingStep === 3 && (
          <div className="max-w-2xl mx-auto bg-[#121829] border border-[#1E293B] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-[#1E293B] pb-4">
              <h2 className="text-xl font-extrabold text-white">How much time can you commit weekly?</h2>
              <p className="text-xs text-[#94A3B8] mt-0.5">AI will pace your learning roadmap accordingly.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {['5-8 hrs/week (Casual)', '10-15 hrs/week (Recommended)', '20+ hrs/week (Intensive)'].map((pace, i) => (
                <div
                  key={i}
                  onClick={() => setWeeklyHours(pace)}
                  className={`p-4 rounded-2xl border cursor-pointer text-center space-y-1 transition-all ${
                    weeklyHours === pace 
                      ? 'bg-[#182138] border-[#6366F1] shadow-glow-purple' 
                      : 'bg-[#0A0E1A] border-[#1E293B] hover:border-[#2D3C61]'
                  }`}
                >
                  <Clock className="w-5 h-5 mx-auto text-[#38BDF8]" />
                  <div className="text-xs font-bold text-white pt-1">{pace}</div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-[#090D16] border border-[#1E293B] space-y-2 text-xs text-[#94A3B8]">
              <div className="text-white font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Ready for Analysis:</span>
              </div>
              <p>Student: <span className="text-white font-semibold">{userName}</span> ({collegeName})</p>
              <p>Target: <span className="text-[#38BDF8] font-semibold">{careerGoal}</span></p>
              <p>Skills: <span className="text-[#34D399] font-semibold">{currentSkills.join(', ')}</span></p>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Actions & Stepper */}
      <div className="pt-6 border-t border-[#1A233A] flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Stepper indicators */}
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className={`px-3 py-1 rounded-full ${onboardingStep === 1 ? 'bg-[#6366F1] text-white' : 'bg-[#1E293B] text-[#94A3B8]'}`}>
            1. Profile & Role
          </span>
          <span className="text-[#1E293B]">→</span>
          <span className={`px-3 py-1 rounded-full ${onboardingStep === 2 ? 'bg-[#6366F1] text-white' : 'bg-[#1E293B] text-[#94A3B8]'}`}>
            2. Skills
          </span>
          <span className="text-[#1E293B]">→</span>
          <span className={`px-3 py-1 rounded-full ${onboardingStep === 3 ? 'bg-[#6366F1] text-white' : 'bg-[#1E293B] text-[#94A3B8]'}`}>
            3. Commitment
          </span>
        </div>

        {/* Next / Submit buttons */}
        <div className="flex items-center gap-3">
          {onboardingStep > 1 && (
            <Button variant="secondary" onClick={() => setOnboardingStep(onboardingStep - 1)}>
              Back
            </Button>
          )}

          {onboardingStep < 3 ? (
            <Button variant="primary" onClick={() => setOnboardingStep(onboardingStep + 1)} showArrow>
              Continue to Step {onboardingStep + 1}
            </Button>
          ) : (
            <Button 
              variant="primary" 
              icon={<Sparkles className="w-4 h-4 text-white" />}
              onClick={handleCompleteOnboarding}
              disabled={isLoadingCareer}
            >
              {isLoadingCareer ? 'Analyzing Career Blueprint...' : 'Enter Main Dashboard →'}
            </Button>
          )}
        </div>

      </div>

    </div>
  );
};
