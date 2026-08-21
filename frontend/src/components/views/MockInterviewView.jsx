import React, { useState, useEffect } from 'react';
import { 
  MessageSquareCode, 
  Sparkles, 
  Send, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft, 
  RefreshCw, 
  Mic, 
  Clock, 
  Flame,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { CircularGauge } from '../common/CircularGauge';
import { DEFAULT_CAREER_ROLES } from '../../data/mockData';

export const MockInterviewView = () => {
  const { 
    userName, 
    careerGoal, 
    setCareerGoal, 
    interviewQuestions, 
    currentQuestionIndex, 
    setCurrentQuestionIndex, 
    interviewAnswer, 
    setInterviewAnswer, 
    interviewEvaluation, 
    isEvaluatingAnswer, 
    isLoadingInterview, 
    loadInterviewQuestions, 
    submitInterviewAnswer 
  } = useApp();

  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    if (interviewQuestions.length === 0) {
      loadInterviewQuestions(userName, careerGoal);
    }
  }, [careerGoal]);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const currentQ = interviewQuestions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < interviewQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setInterviewAnswer("");
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setInterviewAnswer("");
    }
  };

  const handleLoadSampleAnswer = () => {
    if (!currentQ) return;
    if (currentQ.id === "q1") {
      setInterviewAnswer("WHERE filters individual rows before any GROUP BY operations are executed, while HAVING filters groups of rows based on aggregate conditions like COUNT, SUM, or AVG. For example, SELECT department, AVG(salary) FROM employees WHERE status = 'active' GROUP BY department HAVING AVG(salary) > 60000;");
    } else {
      setInterviewAnswer("In my previous project, I used Python and Pandas to clean dirty transaction logs. I identified missing entries with df.isnull().sum(), applied median imputation with fillna for continuous values, and handled string outliers using regex normalization.");
    }
  };

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A233A] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#38BDF8] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Mock Interview Simulator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Interview Question Generator & AI Evaluator
          </h1>
          <p className="text-sm text-[#94A3B8] mt-1">
            Real scenario questions generated for <span className="text-[#38BDF8] font-bold">{careerGoal}</span> with instant AI answer scoring.
          </p>
        </div>

        {/* Role Picker & Refresh */}
        <div className="flex items-center gap-3">
          <select
            value={careerGoal}
            onChange={(e) => setCareerGoal(e.target.value)}
            className="bg-[#121829] text-white text-xs font-bold py-2.5 px-3.5 rounded-xl border border-[#2F3E65] focus:outline-none focus:border-[#6366F1]"
          >
            {DEFAULT_CAREER_ROLES.map(role => (
              <option key={role.id} value={role.title}>{role.title}</option>
            ))}
          </select>
          <Button
            variant="secondary"
            icon={<RefreshCw className={`w-3.5 h-3.5 ${isLoadingInterview ? 'animate-spin' : ''}`} />}
            onClick={() => loadInterviewQuestions(userName, careerGoal)}
            disabled={isLoadingInterview}
          >
            Regenerate
          </Button>
        </div>
      </div>

      {currentQ ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Active Question & Answer Box */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Question Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#121829] border-2 border-[#6366F1] shadow-glow-purple space-y-5 relative">
              
              {/* Question Navigation Meta */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#6366F1] text-white font-bold text-xs">
                    Question {currentQuestionIndex + 1} of {interviewQuestions.length}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#1E293B] text-[#38BDF8] font-medium text-xs border border-[#2D3C61]">
                    {currentQ.category}
                  </span>
                </div>

                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#21163B] text-[#C084FC] border border-[#581C87]">
                  {currentQ.difficulty}
                </span>
              </div>

              {/* Question Prompt */}
              <h2 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                "{currentQ.question}"
              </h2>

              {/* Expected Keywords Preview */}
              <div className="space-y-2 pt-2 border-t border-[#1E293B]">
                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                  Target Evaluation Keywords:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentQ.expected_keywords.map((kw, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-md bg-[#090D16] text-[#94A3B8] text-[11px] border border-[#1E293B]">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Navigation pagination buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="text-xs text-[#94A3B8] hover:text-white disabled:opacity-30 flex items-center gap-1 font-semibold"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <button
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === interviewQuestions.length - 1}
                  className="text-xs text-[#38BDF8] hover:text-[#7DD3FC] disabled:opacity-30 flex items-center gap-1 font-semibold"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Answer Input Room */}
            <div className="p-6 rounded-3xl bg-[#121829] border border-[#1E293B] space-y-4 shadow-xl">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mic className={`w-4 h-4 ${isTimerRunning ? 'text-red-400 animate-pulse' : 'text-[#38BDF8]'}`} />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Your Response
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleLoadSampleAnswer}
                    className="text-xs text-[#38BDF8] hover:text-[#7DD3FC] font-semibold"
                  >
                    Load Sample Answer ⚡
                  </button>
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="flex items-center gap-1 text-xs text-[#94A3B8] bg-[#090D16] px-2.5 py-1 rounded-lg border border-[#1E293B]"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatTimer(timerSeconds)}</span>
                  </button>
                </div>
              </div>

              <div className="relative">
                <textarea
                  value={interviewAnswer}
                  onChange={(e) => setInterviewAnswer(e.target.value)}
                  placeholder="Type your structured answer here (e.g. explain definitions, real examples, performance trade-offs)..."
                  rows={6}
                  className="w-full p-4 bg-[#090D16] border border-[#222E4A] rounded-2xl text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#6366F1] resize-none leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="text-xs text-[#64748B]">
                  FastAPI: <span className="font-mono text-[#38BDF8]">POST /api/interview/evaluate</span>
                </div>
                <Button
                  variant="primary"
                  icon={<Send className="w-4 h-4" />}
                  onClick={() => submitInterviewAnswer(interviewAnswer)}
                  disabled={isEvaluatingAnswer || !interviewAnswer.trim()}
                >
                  {isEvaluatingAnswer ? 'Evaluating with AI...' : 'Submit for Evaluation →'}
                </Button>
              </div>

            </div>

          </div>

          {/* Right Column: Evaluation Results */}
          <div className="lg:col-span-5 space-y-6">
            
            {interviewEvaluation ? (
              <div className="space-y-5 animate-in fade-in duration-300">
                
                {/* Score & Gauge */}
                <div className="p-6 rounded-3xl bg-[#121829] border border-[#1E293B] flex items-center justify-between shadow-xl">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#A5B4FC] uppercase tracking-wider">
                      AI PERFORMANCE SCORE
                    </span>
                    <h3 className="text-2xl font-black text-white">
                      {interviewEvaluation.score >= 85 ? '🌟 Excellent' : interviewEvaluation.score >= 70 ? '👍 Good Effort' : '📈 Needs Revision'}
                    </h3>
                    <p className="text-xs text-[#94A3B8]">
                      Evaluated against senior {careerGoal} standards.
                    </p>
                  </div>

                  <CircularGauge
                    percentage={interviewEvaluation.score}
                    size={110}
                    strokeWidth={9}
                    title=""
                    subLabel={interviewEvaluation.score >= 80 ? "PASSED ✨" : "IMPROVE"}
                  />
                </div>

                {/* Keyword Analysis Chips */}
                <div className="p-5 rounded-2xl bg-[#121829] border border-[#1E293B] space-y-3">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    Keyword Breakdown
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className="text-[11px] text-[#34D399] font-bold mr-1">Matched:</span>
                      {interviewEvaluation.matched_keywords?.map((kw, i) => (
                        <span key={i} className="inline-flex items-center px-2 py-0.5 rounded bg-[#0E2720] text-[#34D399] text-[11px] border border-[#065F46]">
                          ✓ {kw}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 items-center pt-1">
                      <span className="text-[11px] text-[#C084FC] font-bold mr-1">Missing:</span>
                      {interviewEvaluation.missing_keywords?.map((kw, i) => (
                        <span key={i} className="inline-flex items-center px-2 py-0.5 rounded bg-[#21163B] text-[#C084FC] text-[11px] border border-[#581C87]">
                          + {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Strengths & Improvement */}
                <div className="p-6 rounded-3xl bg-[#121829] border border-[#1E293B] space-y-4">
                  
                  {/* Strengths */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#34D399] uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Strengths
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#CBD5E1]">
                      {interviewEvaluation.strengths?.map((s, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#34D399] font-bold">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Areas for Improvement */}
                  <div className="space-y-2 pt-3 border-t border-[#1E293B]">
                    <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Areas for Improvement
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#CBD5E1]">
                      {interviewEvaluation.areas_for_improvement?.map((s, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#F59E0B] font-bold">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* AI Feedback Note */}
                  {interviewEvaluation.feedback && (
                    <div className="p-3.5 rounded-xl bg-[#090D16] border border-[#1E293B] text-xs text-[#38BDF8] leading-relaxed">
                      <span className="font-bold text-white mr-1">AI Verdict:</span>
                      {interviewEvaluation.feedback}
                    </div>
                  )}

                </div>

              </div>
            ) : (
              <div className="h-full min-h-[350px] flex flex-col items-center justify-center text-center p-8 bg-[#121829]/40 border border-dashed border-[#1E293B] rounded-3xl space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#182138] text-[#6366F1] flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white">AI Evaluation Awaiting Answer</h4>
                <p className="text-xs text-[#94A3B8] max-w-xs">
                  Type your answer or click "Load Sample Answer" then hit Submit to get real-time score feedback.
                </p>
              </div>
            )}

          </div>

        </div>
      ) : (
        <div className="flex items-center justify-center p-12">
          <RefreshCw className="w-6 h-6 text-[#6366F1] animate-spin" />
        </div>
      )}

    </div>
  );
};
