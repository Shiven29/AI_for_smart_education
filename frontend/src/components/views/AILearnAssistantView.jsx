import React from 'react';
import { Bot, Send, Sparkles, Play, Code2, Check, BookOpen, ArrowRight, HelpCircle, Terminal } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { AI_TUTOR_LESSONS } from '../../data/quizData';

export const AILearnAssistantView = () => {
  const { 
    userName, 
    careerGoal, 
    tutorMessages, 
    tutorInput, 
    setTutorInput, 
    sendTutorMessage,
    activeCodeSnippet, 
    setActiveCodeSnippet, 
    queryOutput, 
    isExecutingQuery, 
    executeCodeQuery,
    setActiveTab 
  } = useApp();

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendTutorMessage(tutorInput);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A233A] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#34D399] uppercase tracking-wider mb-1">
            <Bot className="w-3.5 h-3.5" />
            <span>Stage 6 · Learn with AI Assistant</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {AI_TUTOR_LESSONS.title}
          </h1>
          <p className="text-sm text-[#94A3B8] mt-1">
            Interactive AI Copilot tutor for mastering SQL concepts and queries.
          </p>
        </div>

        <Button
          variant="primary"
          icon={<HelpCircle className="w-4 h-4 text-white" />}
          onClick={() => setActiveTab('quiz')}
        >
          Take Module Quiz →
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Lesson Concepts & Code Playground */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Key Concepts Cards */}
          <div className="p-6 rounded-3xl bg-[#121829] border border-[#1E293B] space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Core Concepts</span>
              </span>
              <span className="text-xs text-[#94A3B8]">{AI_TUTOR_LESSONS.estimatedTime}</span>
            </div>

            <div className="space-y-3">
              {AI_TUTOR_LESSONS.keyConcepts.map((concept, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-[#090D16] border border-[#1A233A] space-y-1">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#182138] text-[#38BDF8] flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    {concept.title}
                  </h4>
                  <p className="text-xs text-[#94A3B8] pl-6 leading-relaxed">
                    {concept.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive SQL Playground */}
          <div className="p-6 rounded-3xl bg-[#121829] border border-[#1E293B] space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#6366F1]" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Interactive SQL Sandbox
                </h3>
              </div>
              <Button
                variant="primary"
                icon={<Play className={`w-3.5 h-3.5 ${isExecutingQuery ? 'animate-spin' : ''}`} />}
                onClick={executeCodeQuery}
                disabled={isExecutingQuery}
                className="py-1.5 px-3 text-xs"
              >
                {isExecutingQuery ? 'Running...' : 'Run Query'}
              </Button>
            </div>

            <textarea
              value={activeCodeSnippet}
              onChange={(e) => setActiveCodeSnippet(e.target.value)}
              rows={8}
              className="w-full p-4 bg-[#090D16] border border-[#222E4A] rounded-2xl font-mono text-xs text-[#38BDF8] focus:outline-none focus:border-[#6366F1] resize-none"
            />

            {/* Output Table Simulation */}
            {queryOutput && (
              <div className="space-y-2 animate-in fade-in duration-200">
                <div className="text-[11px] font-bold text-[#34D399] uppercase flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Query Output (4 rows returned)</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-[#1E293B] bg-[#090D16]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#121829] text-[#94A3B8] border-b border-[#1E293B]">
                      <tr>
                        <th className="py-2 px-3">customer_name</th>
                        <th className="py-2 px-3">country</th>
                        <th className="py-2 px-3">total_orders</th>
                        <th className="py-2 px-3">total_spent</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E293B]/50 text-[#CBD5E1]">
                      {queryOutput.map((row, i) => (
                        <tr key={i}>
                          <td className="py-2 px-3 font-semibold text-white">{row.customer_name}</td>
                          <td className="py-2 px-3">{row.country}</td>
                          <td className="py-2 px-3">{row.total_orders}</td>
                          <td className="py-2 px-3 text-[#34D399] font-mono">{row.total_spent}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Interactive AI Tutor Chat */}
        <div className="lg:col-span-5 flex flex-col h-[600px] bg-[#121829] border border-[#1E293B] rounded-3xl p-5 shadow-2xl justify-between">
          
          <div className="pb-3 border-b border-[#1E293B] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#21163B] text-[#C084FC] flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">AI Career Copilot Tutor</h3>
                <span className="text-[10px] text-[#34D399] flex items-center gap-1">● Online & Ready</span>
              </div>
            </div>

            <button
              onClick={() => sendTutorMessage("Explain WHERE vs HAVING in 2 sentences")}
              className="text-[11px] text-[#38BDF8] hover:underline"
            >
              Ask Quick Question
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1">
            {tutorMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#6366F1] text-white rounded-br-none shadow-md'
                      : 'bg-[#182138] text-[#CBD5E1] border border-[#28375A] rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-[#64748B] mt-1 px-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Preset Prompts */}
          <div className="flex flex-wrap gap-1.5 pb-2">
            {[
              "Explain SQL execution order",
              "When to use LEFT JOIN?",
              "Give me a challenge query"
            ].map((prompt, i) => (
              <button
                key={i}
                onClick={() => sendTutorMessage(prompt)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-[#182138] text-[#94A3B8] hover:text-[#38BDF8] border border-[#25324D] hover:border-[#6366F1] transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-[#1E293B]">
            <input
              type="text"
              value={tutorInput}
              onChange={(e) => setTutorInput(e.target.value)}
              placeholder="Ask your AI tutor anything about SQL..."
              className="flex-1 px-3.5 py-2.5 bg-[#090D16] border border-[#232F4B] rounded-xl text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#6366F1]"
            />
            <Button type="submit" variant="primary" icon={<Send className="w-3.5 h-3.5" />} className="px-3.5">
              Send
            </Button>
          </form>

        </div>

      </div>

    </div>
  );
};
