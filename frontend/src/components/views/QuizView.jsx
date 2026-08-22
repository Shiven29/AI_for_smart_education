import React, { useState, useEffect } from 'react';
import { HelpCircle, Clock, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, Send, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';

export const QuizView = () => {
  const { 
    quizQuestions, 
    currentQuizIndex, 
    setCurrentQuizIndex, 
    userAnswers, 
    handleSelectQuizOption, 
    submitQuiz,
    setActiveTab
  } = useApp();

  const [timeLeft, setTimeLeft] = useState(180);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const currentQ = quizQuestions[currentQuizIndex];
  const totalQuestions = quizQuestions.length;
  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-300">
      
      {/* Quiz Top Status Bar */}
      <div className="p-6 rounded-3xl bg-[#121829] border border-[#1E293B] flex items-center justify-between shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F59E0B] uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Stage 7 · Skill Assessment Quiz</span>
          </div>
          <h2 className="text-xl font-extrabold text-white">
            SQL & Data Analytics Certification Quiz
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#090D16] border border-[#232F4B] text-xs font-mono font-bold text-[#38BDF8]">
            <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{formatTimer(timeLeft)}</span>
          </div>

          <span className="text-xs font-bold text-[#94A3B8]">
            {answeredCount} / {totalQuestions} Answered
          </span>
        </div>
      </div>

      {/* Question Card */}
      <div className="p-7 sm:p-8 rounded-3xl bg-[#121829] border-2 border-[#6366F1] shadow-glow-purple space-y-6">
        
        {/* Question Header */}
        <div className="flex items-center justify-between border-b border-[#1E293B] pb-4">
          <span className="px-3 py-1 rounded-full bg-[#6366F1] text-white text-xs font-bold">
            Question {currentQuizIndex + 1} of {totalQuestions}
          </span>
          <span className="text-xs font-medium text-[#38BDF8] bg-[#182138] px-3 py-1 rounded-full border border-[#2A3B5E]">
            {currentQ.topic}
          </span>
        </div>

        {/* Prompt */}
        <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
          {currentQ.question}
        </h3>

        {/* Code Snippet if applicable */}
        {currentQ.code && (
          <pre className="p-4 rounded-xl bg-[#090D16] border border-[#1E293B] font-mono text-xs text-[#38BDF8] overflow-x-auto">
            <code>{currentQ.code}</code>
          </pre>
        )}

        {/* Options */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((option, idx) => {
            const isSelected = userAnswers[currentQ.id] === idx;
            return (
              <div
                key={idx}
                onClick={() => handleSelectQuizOption(currentQ.id, idx)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between text-xs sm:text-sm ${
                  isSelected
                    ? 'bg-[#182138] border-[#6366F1] text-white shadow-glow-purple ring-1 ring-[#6366F1]'
                    : 'bg-[#090D16] border-[#1E293B] text-[#CBD5E1] hover:border-[#38486D] hover:bg-[#121829]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                    isSelected ? 'bg-[#6366F1] text-white' : 'bg-[#1E293B] text-[#94A3B8]'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>

                {isSelected && <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />}
              </div>
            );
          })}
        </div>

        {/* Bottom Quiz Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-[#1E293B]">
          <Button
            variant="secondary"
            icon={<ArrowLeft className="w-3.5 h-3.5" />}
            onClick={() => setCurrentQuizIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuizIndex === 0}
          >
            Previous
          </Button>

          {currentQuizIndex < totalQuestions - 1 ? (
            <Button
              variant="primary"
              onClick={() => setCurrentQuizIndex(prev => prev + 1)}
              showArrow
            >
              Next Question
            </Button>
          ) : (
            <Button
              variant="primary"
              icon={<Send className="w-4 h-4 text-white" />}
              onClick={submitQuiz}
            >
              Submit Quiz & View Analysis →
            </Button>
          )}
        </div>

      </div>

    </div>
  );
};
