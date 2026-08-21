import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingView } from './components/views/LandingView';
import { CareerDiscoveryView } from './components/views/CareerDiscoveryView';
import { CareerBlueprintView } from './components/views/CareerBlueprintView';
import { ResumeAnalyzerView } from './components/views/ResumeAnalyzerView';
import { MockInterviewView } from './components/views/MockInterviewView';
import { DesignSystemView } from './components/views/DesignSystemView';
import { ProjectModal } from './components/modals/ProjectModal';
import { SettingsModal } from './components/modals/SettingsModal';

const AppContent = () => {
  const { activeTab } = useApp();

  const renderCurrentView = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingView />;
      case 'discovery':
        return <CareerDiscoveryView />;
      case 'blueprint':
        return <CareerBlueprintView />;
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
      <main className="flex-1">
        {renderCurrentView()}
      </main>
      <Footer />
      
      {/* Global Interactive Modals */}
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
