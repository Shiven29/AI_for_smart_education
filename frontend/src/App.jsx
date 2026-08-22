import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { JourneyBar } from './components/common/JourneyBar';
import { Footer } from './components/layout/Footer';

// 10-Stage Funnel Views
import { LandingView } from './components/views/LandingView';
import { StudentOnboardingView } from './components/views/StudentOnboardingView';
import { MainDashboardView } from './components/views/MainDashboardView';
import { SkillGapAnalysisView } from './components/views/SkillGapAnalysisView';
import { PersonalizedRoadmapView } from './components/views/PersonalizedRoadmapView';
import { AILearnAssistantView } from './components/views/AILearnAssistantView';
import { QuizView } from './components/views/QuizView';
import { PerformanceAnalysisView } from './components/views/PerformanceAnalysisView';
import { SmartRecommendationsView } from './components/views/SmartRecommendationsView';
import { UpdatedStudyPlanView } from './components/views/UpdatedStudyPlanView';

// Auxiliary Tools
import { ResumeAnalyzerView } from './components/views/ResumeAnalyzerView';
import { MockInterviewView } from './components/views/MockInterviewView';
import { DesignSystemView } from './components/views/DesignSystemView';

// Modals
import { ProjectModal } from './components/modals/ProjectModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { AuthModal } from './components/modals/AuthModal';

const AppContent = () => {
  const { activeTab } = useApp();

  const renderCurrentView = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingView />;
      case 'onboarding':
        return <StudentOnboardingView />;
      case 'dashboard':
        return <MainDashboardView />;
      case 'skill-gap':
        return <SkillGapAnalysisView />;
      case 'roadmap':
        return <PersonalizedRoadmapView />;
      case 'ai-tutor':
        return <AILearnAssistantView />;
      case 'quiz':
        return <QuizView />;
      case 'performance':
        return <PerformanceAnalysisView />;
      case 'recommendations':
        return <SmartRecommendationsView />;
      case 'updated-plan':
        return <UpdatedStudyPlanView />;
      case 'resume':
        return <ResumeAnalyzerView />;
      case 'interview':
        return <MockInterviewView />;
      case 'design-system':
        return <DesignSystemView />;
      default:
        return <LandingView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080C15] text-[#F8FAFC]">
      <Navbar />
      <JourneyBar />
      <main className="flex-1">
        {renderCurrentView()}
      </main>
      <Footer />
      
      {/* Global Interactive Modals */}
      <AuthModal />
      <ProjectModal />
      <SettingsModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
