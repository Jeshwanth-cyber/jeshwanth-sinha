import React, { useState } from 'react';
import { Copy, Check, Sparkles, Terminal, FileText, ArrowRight, ExternalLink } from 'lucide-react';
import { generateStructuredPrompt } from '../data/portfolioData';
import { PortfolioProfile } from '../types';

interface PromptGeneratorModalProps {
  profile: PortfolioProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const PromptGeneratorModal: React.FC<PromptGeneratorModalProps> = ({
  profile,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [activePromptVersion, setActivePromptVersion] = useState<'standard' | 'minimal' | 'fullstack'>('standard');

  if (!isOpen) return null;

  const basePrompt = generateStructuredPrompt(profile);

  const getActivePromptContent = () => {
    if (activePromptVersion === 'minimal') {
      return `Build a clean, high-performance personal portfolio single-page web app for ${profile.name}, a 1st Year B.Tech Computer Science student and Aspiring AI Engineer.

Details:
- Name: ${profile.name}
- Education: ${profile.year}, ${profile.degree} (${profile.department})
- Core Skills: Basic Python, Basic Web Development (HTML/CSS/JS/Tailwind), Basic Gen AI (Prompt Engineering & LLM foundations)
- Projects (Include working live calculators in UI):
  1. Student Grade Calculator (Semester SGPA, percentage, and credit weighting)
  2. Eligibility Calculator for Voting Systems (18+ age verification and civic checklist)
- Links: GitHub (${profile.githubUrl}), LinkedIn (${profile.linkedinUrl})
- UI: Modern tech dark-mode aesthetic with slate/indigo accents, responsive layout, and interactive code preview.`;
    }

    if (activePromptVersion === 'fullstack') {
      return `${basePrompt}

6. EXTENDED TECHNICAL SPECIFICATIONS FOR GOOGLE AI STUDIO:
- Use TypeScript with strict typings.
- Use Tailwind CSS for utility-first styling with zero separate CSS files.
- Include Lucide React icons for visual elegance.
- Implement tabbed code toggles showing Python logic vs React UI for both student projects.
- Make GitHub (${profile.githubUrl}) and LinkedIn (${profile.linkedinUrl}) links clickable with external link badges.`;
    }

    return basePrompt;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActivePromptContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">Google AI Studio Prompt Ready</h3>
              <p className="text-xs text-slate-400">
                Custom structured prompt tailored for {profile.name} to paste directly into AI Studio
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Prompt Variant Selector */}
        <div className="px-5 py-3 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 font-medium shrink-0">Preset Style:</span>
          <button
            type="button"
            onClick={() => setActivePromptVersion('standard')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activePromptVersion === 'standard'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            Standard Structured (Recommended)
          </button>
          <button
            type="button"
            onClick={() => setActivePromptVersion('fullstack')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activePromptVersion === 'fullstack'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            Technical Detailed
          </button>
          <button
            type="button"
            onClick={() => setActivePromptVersion('minimal')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activePromptVersion === 'minimal'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            Concise Summary
          </button>
        </div>

        {/* Modal Prompt Body */}
        <div className="p-5 overflow-y-auto flex-1 font-mono text-xs text-slate-300 bg-slate-950/40 space-y-3">
          <div className="flex items-center justify-between text-slate-400 text-xs font-sans pb-2 border-b border-slate-800/60">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-indigo-400" />
              Copy-ready prompt formatted for AI Studio & Gemini models
            </span>
            <span className="text-slate-500">GitHub: {profile.githubUrl}</span>
          </div>

          <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-indigo-100/90 selection:bg-indigo-600 selection:text-white">
            {getActivePromptContent()}
          </pre>
        </div>

        {/* Modal Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/95 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-400" />
            Includes GitHub, LinkedIn, 1st Year CSE status & both calculator specifications.
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopy}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Prompt for AI Studio
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
