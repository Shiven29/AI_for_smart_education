import React from 'react';
import { BarChart2, CheckCircle2, XCircle, Sparkles, ArrowRight, Award, Clock, BookOpen, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CircularGauge } from '../common/CircularGauge';
import { Button } from '../common/Button';

export const PerformanceAnalysisView = () => {
  const { 
    quizQuestions, 
    userAnswers, 
    quizScore, 
    careerGoal,
    setActiveTab 
  } = useApp();

  const totalQuestions = quizQuestions.length;
  let correctCount = 0;
  quizQuestions.forEach(q => {
    if (userAnswers[q.id] === q.correctAnswer) correctCount += 1;
  });
  const scorePercent = quizScore || Math.round((correctCount / totalQuestions) * 100) || 75;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A233A] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#38BDF8] uppercase tracking-wider mb-1">
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Stage 8 · Performance Analysis</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Quiz Results & Competency Breakdown
          </h1>
          <p className="text-sm text-[#94A3B8] mt-1">
            Detailed evaluation of your SQL and data manipulation proficiency.
          </p>
        </div>

        <Button
          variant="primary"
          icon={<Sparkles className="w-4 h-4 text-white" />}
          onClick={() => setActiveTab('recommendations')}
        >
          View Smart Recommendations →
        </Button>
      </div>

      {/* Score Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Summary */}
        <div className="lg:col-span-8 p-7 rounded-3xl bg-[#121829] border border-[#1E293B] space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#A5B4FC] uppercase tracking-wider">
                CERTIFICATION EVALUATION
              </span>
              <h2 className="text-2xl font-black text-white">
                {scorePercent >= 75 ? "🎉 Assessment Cleared with Distinction!" : "👍 Solid Attempt - Review Recommended"}
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0E2720] text-[#34D399] border border-[#065F46]">
              {correctCount} of {totalQuestions} Correct
            </span>
          </div>

          {/* Topic Breakdown Progress */}
          <div className="space-y-3.5 pt-2">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-[#CBD5E1]">
                <span>WHERE vs HAVING Filtering Logic</span>
                <span className="text-[#34D399]">100% Accuracy</span>
              </div>
              <div className="w-full h-2 bg-[#090D16] rounded-full overflow-hidden">
                <div className="h-full w-full bg-[#10B981] rounded-full" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-[#CBD5E1]">
                <span>Relational Multi-Table JOINs</span>
                <span className="text-[#38BDF8]">100% Accuracy</span>
              </div>
              <div className="w-full h-2 bg-[#090D16] rounded-full overflow-hidden">
                <div className="h-full w-full bg-[#22D3EE] rounded-full" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-[#CBD5E1]">
                <span>Aggregations & Grouping Strategy</span>
                <span className="text-[#A855F7]">100% Accuracy</span>
              </div>
              <div className="w-full h-2 bg-[#090D16] rounded-full overflow-hidden">
                <div className="h-full w-full bg-[#A855F7] rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Score Gauge */}
        <div className="lg:col-span-4 flex justify-center">
          <CircularGauge
            percentage={scorePercent}
            size={160}
            strokeWidth={11}
            title="ASSESSMENT SCORE"
            subLabel="SKILL VERIFIED ✨"
          />
        </div>

      </div>

      {/* Question-by-Question Review */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-white uppercase tracking-wider">
          Question-by-Question Breakdown
        </h3>

        <div className="space-y-4">
          {quizQuestions.map((q, idx) => {
            const isCorrect = userAnswers[q.id] === q.correctAnswer;
            const userAnswerIndex = userAnswers[q.id];

            return (
              <div
                key={q.id}
                className={`p-6 rounded-3xl border space-y-4 ${
                  isCorrect
                    ? 'bg-[#121829] border-[#1E293B]'
                    : 'bg-[#1E1218] border-red-900/60'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-[#34D399] shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                    )}
                    <span className="text-xs font-bold text-white uppercase">
                      Question {idx + 1}: {q.topic}
                    </span>
                  </div>

                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    isCorrect
                      ? 'bg-[#0E2720] text-[#34D399] border border-[#065F46]'
                      : 'bg-red-950 text-red-400 border border-red-800'
                  }`}>
                    {isCorrect ? '+25 Pts' : '0 Pts'}
                  </span>
                </div>

                <p className="text-sm text-[#E2E8F0] font-medium pl-8">
                  {q.question}
                </p>

                <div className="pl-8 space-y-1 text-xs">
                  <p className="text-[#34D399]">
                    <span className="font-bold">Correct Answer:</span> {q.options[q.correctAnswer]}
                  </p>
                  <p className="text-[#94A3B8] pt-1 leading-relaxed">
                    <span className="font-semibold text-white">Explanation:</span> {q.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
