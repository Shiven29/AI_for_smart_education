import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, Code2, Sparkles, FolderGit2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';

export const ProjectModal = () => {
  const { selectedProject, setSelectedProject } = useApp();
  const [copied, setCopied] = useState(false);

  if (!selectedProject) return null;

  const handleCopyCode = () => {
    if (selectedProject.starterCodeSnippet) {
      navigator.clipboard.writeText(selectedProject.starterCodeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#121829] border border-[#2A3550] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        
        {/* Header */}
        <div className="sticky top-0 bg-[#121829]/95 backdrop-blur-md px-6 py-4 border-b border-[#1E293B] flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{selectedProject.icon || '📊'}</span>
            <div>
              <h3 className="text-lg font-bold text-white">{selectedProject.title}</h3>
              <p className="text-xs text-[#38BDF8] font-medium">{selectedProject.practice}</p>
            </div>
          </div>
          <button 
            onClick={() => setSelectedProject(null)}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1E293B] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Description */}
          <div>
            <h4 className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider mb-2">Overview</h4>
            <p className="text-sm text-[#CBD5E1] leading-relaxed">
              {selectedProject.description}
            </p>
          </div>

          {/* Level & Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#1E293B] text-[#A5B4FC] border border-[#2D3C61]">
              Level: {selectedProject.level}
            </span>
            {selectedProject.tags && selectedProject.tags.map((tag, i) => (
              <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-md bg-[#151D30] text-[#38BDF8] border border-[#222E4A]">
                {tag}
              </span>
            ))}
          </div>

          {/* Deliverables Checklist */}
          {selectedProject.deliverables && (
            <div>
              <h4 className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider mb-3">Milestones & Deliverables</h4>
              <div className="space-y-2 bg-[#0C111C] p-4 rounded-xl border border-[#1A233A]">
                {selectedProject.deliverables.map((item, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-xs text-[#E2E8F0]">
                    <div className="w-4 h-4 rounded-full bg-[#0E2720] border border-[#065F46] text-[#34D399] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Starter Code Snippet */}
          {selectedProject.starterCodeSnippet && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-[#6366F1]" />
                  Starter Implementation
                </h4>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-xs text-[#38BDF8] hover:text-[#7DD3FC] transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-[#34D399]" />
                      <span className="text-[#34D399]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-[#090D16] border border-[#1A233A] font-mono text-xs text-[#38BDF8] overflow-x-auto">
                <code>{selectedProject.starterCodeSnippet}</code>
              </pre>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1E293B]">
            <Button
              variant="secondary"
              onClick={() => setSelectedProject(null)}
            >
              Close
            </Button>
            <Button
              variant="primary"
              icon={<FolderGit2 className="w-4 h-4" />}
              onClick={() => {
                alert(`Starting ${selectedProject.title}! Code template loaded.`);
                setSelectedProject(null);
              }}
            >
              Start Project
            </Button>
          </div>

        </div>

      </div>
    </div>
  );
};
