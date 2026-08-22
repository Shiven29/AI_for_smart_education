import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_CAREER_ROLES, SAMPLE_RESUME_TEXT, MOCK_ANALYSIS_DATA } from '../data/mockData';
import { SQL_QUIZ_QUESTIONS, AI_TUTOR_LESSONS } from '../data/quizData';
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
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default to logged in as demo student
  const [currentUser, setCurrentUser] = useState({
    name: "Student",
    email: "student@university.edu",
    college: "National Institute of Technology",
    year: "3rd Year (Junior)",
    avatar: "S"
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'

  // Student Profile
  const [userName, setUserName] = useState("Student");
  const [collegeName, setCollegeName] = useState("National Institute of Technology");
  const [yearOfStudy, setYearOfStudy] = useState("3rd Year (Junior)");
  const [careerGoal, setCareerGoal] = useState("Data Analyst");
  const [selectedRoleObj, setSelectedRoleObj] = useState(DEFAULT_CAREER_ROLES[0]);
  const [currentSkills, setCurrentSkills] = useState(["Python", "Excel", "C Programming", "Digital Electronics"]);
  const [weeklyHours, setWeeklyHours] = useState("10-15 hrs/week");

  // 10-Stage Funnel Navigation:
  const [activeTab, setActiveTab] = useState('landing');
  const [onboardingStep, setOnboardingStep] = useState(1);

  // Career Analysis State (FastAPI POST /api/career/analyze)
  const [careerAnalysis, setCareerAnalysis] = useState(null);
  const [isLoadingCareer, setIsLoadingCareer] = useState(false);

  // Resume State (FastAPI POST /api/resume/analyze)
  const [resumeText, setResumeText] = useState(SAMPLE_RESUME_TEXT);
  const [resumeAnalysis, setResumeAnalysis] = useState(null);
  const [isLoadingResume, setIsLoadingResume] = useState(false);

  // Mock Interview State (FastAPI POST /api/interview/generate & /api/interview/evaluate)
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [interviewAnswer, setInterviewAnswer] = useState("");
  const [interviewEvaluation, setInterviewEvaluation] = useState(null);
  const [isLoadingInterview, setIsLoadingInterview] = useState(false);
  const [isEvaluatingAnswer, setIsEvaluatingAnswer] = useState(false);

  // AI Tutor & Learn Assistant State (Stage 6)
  const [tutorMessages, setTutorMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I am your AI Career Copilot. I noticed SQL is the top skill gap for your Data Analyst goal. Let's learn SQL filtering with WHERE vs HAVING. Would you like a simple explanation or a practical practice query?",
      time: "Just now"
    }
  ]);
  const [tutorInput, setTutorInput] = useState("");
  const [activeCodeSnippet, setActiveCodeSnippet] = useState(AI_TUTOR_LESSONS.sampleQueries[0].query);
  const [queryOutput, setQueryOutput] = useState(null);
  const [isExecutingQuery, setIsExecutingQuery] = useState(false);

  // Quiz State (Stage 7 & 8)
  const [quizQuestions] = useState(SQL_QUIZ_QUESTIONS);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizTimeSeconds, setQuizTimeSeconds] = useState(180);

  // Updated Study Plan State (Stage 10)
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);
  const [masteredSkills, setMasteredSkills] = useState(["Python", "Excel"]);
  const [updatedReadiness, setUpdatedReadiness] = useState(25);

  // Modals & Settings
  const [selectedProject, setSelectedProject] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiConfig, setApiConfigState] = useState(getApiConfig());
  const [backendOnline, setBackendOnline] = useState(false);

  // Initial Load
  useEffect(() => {
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

  // Auth Handlers
  const loginUser = ({ name, email, college }) => {
    const finalName = name || "Student";
    setUserName(finalName);
    if (college) setCollegeName(college);
    setCurrentUser({
      name: finalName,
      email: email || "student@university.edu",
      college: college || collegeName,
      year: yearOfStudy,
      avatar: finalName.charAt(0).toUpperCase()
    });
    setIsAuthenticated(true);
  };

  const loginWithOAuth = (provider) => {
    const oauthName = provider === 'GitHub' ? 'Dev Student' : provider === 'Google' ? 'Alex Rivera' : 'Campus Scholar';
    setUserName(oauthName);
    setCurrentUser({
      name: oauthName,
      email: `${oauthName.toLowerCase().replace(' ', '.')}@university.edu`,
      college: collegeName,
      year: yearOfStudy,
      avatar: oauthName.charAt(0).toUpperCase()
    });
    setIsAuthenticated(true);
  };

  const loginWithDemo = () => {
    setUserName("Student");
    setCurrentUser({
      name: "Student",
      email: "student@university.edu",
      college: "National Institute of Technology",
      year: "3rd Year (Junior)",
      avatar: "S"
    });
    setIsAuthenticated(true);
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const openAuthModal = (mode = 'signin') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
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
      if (hasCompletedQuiz) {
        setUpdatedReadiness(38);
      } else {
        setUpdatedReadiness(data.skill_match_percentage || 25);
      }
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

  // AI Tutor Actions
  const sendTutorMessage = (text) => {
    if (!text.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      time: "Just now"
    };
    setTutorMessages(prev => [...prev, newMsg]);
    setTutorInput("");

    setTimeout(() => {
      let replyText = "Great question! In SQL, always remember the execution pipeline: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT. This is why you cannot use column aliases created in SELECT inside the WHERE clause.";
      const lower = text.toLowerCase();
      if (lower.includes("join") || lower.includes("left")) {
        replyText = "Here is the key difference: INNER JOIN keeps only matching rows from both tables. LEFT JOIN keeps ALL rows from the left table, filling missing right-side values with NULLs.";
      } else if (lower.includes("having") || lower.includes("where")) {
        replyText = "Rule of thumb: Filter rows BEFORE grouping? Use WHERE. Filter groups AFTER calculating SUM/AVG/COUNT? Use HAVING.";
      } else if (lower.includes("practice") || lower.includes("code")) {
        replyText = "Try modifying the SQL Query editor on the left to add `WHERE country = 'USA'` and hit 'Run Query' to test output!";
      }

      setTutorMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: replyText,
        time: "Just now"
      }]);
    }, 600);
  };

  const executeCodeQuery = () => {
    setIsExecutingQuery(true);
    setTimeout(() => {
      setQueryOutput([
        { customer_name: "Acme Corp", country: "USA", total_orders: 14, total_spent: "$18,450" },
        { customer_name: "Global Tech", country: "UK", total_orders: 9, total_spent: "$12,200" },
        { customer_name: "Apex Logistics", country: "Canada", total_orders: 8, total_spent: "$9,800" },
        { customer_name: "Quantum Media", country: "USA", total_orders: 6, total_spent: "$6,750" }
      ]);
      setIsExecutingQuery(false);
    }, 500);
  };

  // Quiz Actions
  const handleSelectQuizOption = (questionId, optionIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const submitQuiz = () => {
    let correctCount = 0;
    quizQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });
    const calculatedScore = Math.round((correctCount / quizQuestions.length) * 100);
    setQuizScore(calculatedScore);
    setQuizSubmitted(true);
    setHasCompletedQuiz(true);
    setMasteredSkills(["Python", "Excel", "SQL (Fundamentals)"]);
    setUpdatedReadiness(38);
    setActiveTab('performance');
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
    isAuthenticated, currentUser,
    isAuthModalOpen, setIsAuthModalOpen,
    authMode, setAuthMode,
    loginUser, loginWithOAuth, loginWithDemo, logoutUser, openAuthModal,
    userName, setUserName,
    collegeName, setCollegeName,
    yearOfStudy, setYearOfStudy,
    careerGoal, setCareerGoal,
    selectedRoleObj, selectRole,
    currentSkills, setCurrentSkills, toggleSkill, addCustomSkill,
    weeklyHours, setWeeklyHours,
    activeTab, setActiveTab,
    onboardingStep, setOnboardingStep,
    careerAnalysis, isLoadingCareer, runCareerAnalysis,
    resumeText, setResumeText, resumeAnalysis, isLoadingResume, runResumeAnalysis,
    interviewQuestions, currentQuestionIndex, setCurrentQuestionIndex,
    interviewAnswer, setInterviewAnswer, interviewEvaluation, isEvaluatingAnswer,
    isLoadingInterview, loadInterviewQuestions, submitInterviewAnswer,
    tutorMessages, tutorInput, setTutorInput, sendTutorMessage,
    activeCodeSnippet, setActiveCodeSnippet, queryOutput, isExecutingQuery, executeCodeQuery,
    quizQuestions, currentQuizIndex, setCurrentQuizIndex, userAnswers, handleSelectQuizOption,
    quizSubmitted, quizScore, submitQuiz, quizTimeSeconds, setQuizTimeSeconds,
    hasCompletedQuiz, masteredSkills, updatedReadiness,
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
