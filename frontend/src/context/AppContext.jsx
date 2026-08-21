import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_CAREER_ROLES, SAMPLE_RESUME_TEXT, MOCK_ANALYSIS_DATA } from '../data/mockData';
import { 
  analyzeCareerApi, 
  analyzeResumeApi, 
  generateInterviewQuestionsApi, 
  evaluateInterviewAnswerApi,
  getApiConfig,
  setApiConfig as saveApiConfig,
  pingBackend
} from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userName, setUserName] = useState("Student");
  const [careerGoal, setCareerGoal] = useState("Data Analyst");
  const [selectedRoleObj, setSelectedRoleObj] = useState(DEFAULT_CAREER_ROLES[0]);
  const [currentSkills, setCurrentSkills] = useState(["Python", "Excel", "C Programming", "Digital Electronics"]);
  
  // Active Navigation View: 'landing' | 'discovery' | 'blueprint' | 'resume' | 'interview' | 'design-system'
  const [activeTab, setActiveTab] = useState('landing');
  const [discoveryStep, setDiscoveryStep] = useState(1); // 1: Role, 2: Skills, 3: Generating

  // API State & Results
  const [careerAnalysis, setCareerAnalysis] = useState(null);
  const [isLoadingCareer, setIsLoadingCareer] = useState(false);

  const [resumeText, setResumeText] = useState(SAMPLE_RESUME_TEXT);
  const [resumeAnalysis, setResumeAnalysis] = useState(null);
  const [isLoadingResume, setIsLoadingResume] = useState(false);

  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [interviewAnswer, setInterviewAnswer] = useState("");
  const [interviewEvaluation, setInterviewEvaluation] = useState(null);
  const [isLoadingInterview, setIsLoadingInterview] = useState(false);
  const [isEvaluatingAnswer, setIsEvaluatingAnswer] = useState(false);

  // Modals
  const [selectedProject, setSelectedProject] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiConfig, setApiConfigState] = useState(getApiConfig());
  const [backendOnline, setBackendOnline] = useState(false);

  // Load initial analysis data so user has immediate rich experience
  useEffect(() => {
    // Initialize with default Data Analyst Blueprint matching Figma screenshot 4
    runCareerAnalysis("Student", "Data Analyst", ["Python", "Excel", "C Programming", "Digital Electronics"]);
    checkBackend();
  }, []);

  const checkBackend = async () => {
    const isOnline = await pingBackend(apiConfig.baseUrl);
    setBackendOnline(isOnline);
  };

  const updateApiSettings = (baseUrl, useMock) => {
    saveApiConfig(baseUrl, useMock);
    setApiConfigState({ baseUrl, useMock });
    checkBackend();
  };

  const runCareerAnalysis = async (name = userName, goal = careerGoal, skills = currentSkills) => {
    setIsLoadingCareer(true);
    try {
      const data = await analyzeCareerApi({
        name,
        career_goal: goal,
        current_skills: skills
      });
      setCareerAnalysis(data);
      return data;
    } catch (err) {
      console.error("Error in career analysis:", err);
    } finally {
      setIsLoadingCareer(false);
    }
  };

  const runResumeAnalysis = async (name = userName, goal = careerGoal, text = resumeText) => {
    setIsLoadingResume(true);
    try {
      const data = await analyzeResumeApi({
        name,
        career_goal: goal,
        resume_text: text
      });
      setResumeAnalysis(data);
      return data;
    } catch (err) {
      console.error("Error in resume analysis:", err);
    } finally {
      setIsLoadingResume(false);
    }
  };

  const loadInterviewQuestions = async (name = userName, goal = careerGoal) => {
    setIsLoadingInterview(true);
    try {
      const questions = await generateInterviewQuestionsApi({ name, career_goal: goal });
      setInterviewQuestions(questions);
      setCurrentQuestionIndex(0);
      setInterviewAnswer("");
      setInterviewEvaluation(null);
      return questions;
    } catch (err) {
      console.error("Error loading interview questions:", err);
    } finally {
      setIsLoadingInterview(false);
    }
  };

  const submitInterviewAnswer = async (answerText = interviewAnswer) => {
    if (!interviewQuestions.length) return;
    const currentQ = interviewQuestions[currentQuestionIndex];
    setIsEvaluatingAnswer(true);
    try {
      const evalData = await evaluateInterviewAnswerApi({
        career_goal: careerGoal,
        question: currentQ.question,
        expected_keywords: currentQ.expected_keywords,
        answer: answerText
      });
      setInterviewEvaluation(evalData);
      return evalData;
    } catch (err) {
      console.error("Error evaluating answer:", err);
    } finally {
      setIsEvaluatingAnswer(false);
    }
  };

  const selectRole = (role) => {
    setSelectedRoleObj(role);
    setCareerGoal(role.title);
  };

  const toggleSkill = (skill) => {
    if (currentSkills.includes(skill)) {
      setCurrentSkills(currentSkills.filter(s => s !== skill));
    } else {
      setCurrentSkills([...currentSkills, skill]);
    }
  };

  const addCustomSkill = (newSkill) => {
    if (newSkill.trim() && !currentSkills.includes(newSkill.trim())) {
      setCurrentSkills([...currentSkills, newSkill.trim()]);
    }
  };

  const value = {
    userName, setUserName,
    careerGoal, setCareerGoal,
    selectedRoleObj, selectRole,
    currentSkills, setCurrentSkills, toggleSkill, addCustomSkill,
    activeTab, setActiveTab,
    discoveryStep, setDiscoveryStep,
    careerAnalysis, isLoadingCareer, runCareerAnalysis,
    resumeText, setResumeText, resumeAnalysis, isLoadingResume, runResumeAnalysis,
    interviewQuestions, currentQuestionIndex, setCurrentQuestionIndex,
    interviewAnswer, setInterviewAnswer, interviewEvaluation, isEvaluatingAnswer,
    isLoadingInterview, loadInterviewQuestions, submitInterviewAnswer,
    selectedProject, setSelectedProject,
    isSettingsOpen, setIsSettingsOpen,
    apiConfig, updateApiSettings,
    backendOnline, checkBackend
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
