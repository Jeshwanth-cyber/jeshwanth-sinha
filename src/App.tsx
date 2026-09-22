/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Copy,
  Check,
  Sparkles,
  Terminal,
  Code2,
  Cpu,
  GraduationCap,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Send,
  Layers,
  Award,
  CheckCircle,
  HelpCircle,
  FileCode,
  Layout,
  Flame,
} from 'lucide-react';
import { initialProfile, skillCategories, projectsList, generateStructuredPrompt } from './data/portfolioData';
import { GradeCalculator } from './components/GradeCalculator';
import { VotingEligibilityCalculator } from './components/VotingEligibilityCalculator';
import { PromptGeneratorModal } from './components/PromptGeneratorModal';

export default function App() {
  const [profile, setProfile] = useState(initialProfile);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [activeProjectTab, setActiveProjectTab] = useState<'grade' | 'voting'>('grade');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const fullPromptText = generateStructuredPrompt(profile);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(fullPromptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;
    setContactSent(true);
    setTimeout(() => {
      setContactSubject('');
      setContactMessage('');
      setContactSent(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-600 selection:text-white">
      {/* Top Notification / AI Studio Prompt Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-indigo-900/50 py-2.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-medium">
              Google AI Studio Custom Prompt Generated for <strong className="text-white">{profile.name}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="copy-quick-prompt-banner-btn"
              type="button"
              onClick={handleCopyPrompt}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-600/90 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors shadow-xs"
            >
              {copiedPrompt ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Prompt Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy AI Studio Prompt</span>
                </>
              )}
            </button>
            <button
              id="view-full-prompt-modal-btn"
              type="button"
              onClick={() => setIsPromptModalOpen(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700/60"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Inspect Prompt</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/20 text-base">
              JS
            </div>
            <div>
              <a href="#hero" className="font-bold text-base tracking-tight text-white hover:text-indigo-300 transition-colors">
                {profile.name}
              </a>
              <span className="hidden sm:inline-block ml-2 text-xs text-slate-400 font-mono">
                B.Tech CSE &apos;29
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-1 sm:gap-6 text-sm font-medium text-slate-300">
            <a href="#about" className="px-2.5 py-1.5 hover:text-white transition-colors">
              About
            </a>
            <a href="#skills" className="px-2.5 py-1.5 hover:text-white transition-colors">
              Skills
            </a>
            <a href="#projects" className="px-2.5 py-1.5 hover:text-white transition-colors">
              Projects
            </a>
            <a href="#prompt-generator" className="px-2.5 py-1.5 hover:text-white transition-colors hidden md:block">
              AI Prompt
            </a>
            <a href="#contact" className="px-2.5 py-1.5 hover:text-white transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              id="header-github-link"
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all hover:bg-slate-800"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              id="header-linkedin-link"
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all hover:bg-slate-800"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-12 pb-20 md:py-24 overflow-hidden border-b border-slate-800/60">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-indigo-300 font-medium mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span>1st Year Undergraduate • B.Tech Computer Science &amp; Engineering</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
              Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300">{profile.name}</span>.
              <br />
              <span className="text-slate-300 text-3xl sm:text-5xl font-bold">
                Aspiring AI Engineer.
              </span>
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl font-normal">
              Beginning my engineering journey in the <strong className="text-white">Department of Computer Science &amp; Engineering</strong>.
              Focused on core <strong className="text-indigo-300">Python programming</strong>, modern responsive <strong className="text-cyan-300">web development</strong>, and experimenting with <strong className="text-emerald-300">Generative AI systems</strong> to solve practical problems.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                id="hero-copy-prompt-btn"
                type="button"
                onClick={() => setIsPromptModalOpen(true)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/25 active:scale-98"
              >
                <Sparkles className="w-4 h-4" />
                Get Google AI Studio Prompt
              </button>

              <a
                id="hero-view-projects-btn"
                href="#projects"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold text-sm transition-colors"
              >
                <Code2 className="w-4 h-4 text-slate-400" />
                Explore Projects &amp; Live Demos
              </a>

              <a
                id="hero-github-cta"
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:text-white text-sm transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="text-xs font-mono">@Jeshwanth-cyber</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-12 pt-8 border-t border-slate-800/80">
              <div>
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">Academic Level</span>
                <span className="text-base font-bold text-white mt-1 block">1st Year B.Tech CSE</span>
              </div>
              <div>
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">Primary Stack</span>
                <span className="text-base font-bold text-indigo-300 mt-1 block">Python • Web Dev • Gen AI</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">Core Projects</span>
                <span className="text-base font-bold text-emerald-400 mt-1 block">2 Interactive Apps</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* About Section */}
        <section id="about" className="scroll-mt-20">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-3">
            <GraduationCap className="w-4 h-4" />
            Academic Foundations
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-8">
            Starting the AI Engineering Journey
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="text-xl font-bold text-white">Who I Am &amp; What Drives Me</h3>
              <p className="text-slate-300 leading-relaxed text-sm">
                I am a first-year Computer Science and Engineering student at the beginning of my professional technical career. My goal is to become an <strong className="text-indigo-300">AI Engineer</strong> who combines rigorous algorithmic foundations with practical software systems.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm">
                Rather than remaining purely theoretical, I believe in writing code early. I have built functional applications including a <strong className="text-white">Student Grade Calculator</strong> to automate weighted GPA analysis, and a legal <strong className="text-white">Voting Eligibility Calculator</strong> to help first-time college voters verify their constitutional rights.
              </p>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-semibold uppercase block">Academic Focus</span>
                  <div className="text-sm font-bold text-white mt-1">Computer Science &amp; Engineering</div>
                  <div className="text-xs text-slate-400 mt-0.5">Algorithms, Math, Architecture</div>
                </div>
                <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-semibold uppercase block">Career Destination</span>
                  <div className="text-sm font-bold text-indigo-300 mt-1">Artificial Intelligence Engineer</div>
                  <div className="text-xs text-slate-400 mt-0.5">Machine Learning &amp; Frontier LLM Systems</div>
                </div>
              </div>
            </div>

            {/* Quick Profile Summary Card */}
            <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-4">
                  Profile Snapshot
                </span>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-slate-400 text-xs">Name</span>
                    <span className="font-semibold text-white">{profile.name}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-slate-400 text-xs">Year</span>
                    <span className="font-semibold text-slate-200">{profile.year}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-slate-400 text-xs">Department</span>
                    <span className="font-semibold text-slate-200">CSE</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-slate-400 text-xs">GitHub</span>
                    <a
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-400 hover:underline flex items-center gap-1 font-mono"
                    >
                      Jeshwanth-cyber
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-xs">LinkedIn</span>
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      Jeshwanth Sinha
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-950/40 border border-indigo-900/60 rounded-xl p-3.5 text-xs text-indigo-200">
                <span className="font-bold block mb-1 text-indigo-300">Continuous Growth</span>
                Currently learning data structures in Python and creating hands-on Gemini API workflows.
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="scroll-mt-20">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3">
            <Cpu className="w-4 h-4" />
            Technical Competencies
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-3">
            Technologies &amp; Skill Set
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mb-8">
            Built upon real practice and foundational study during my 1st year B.Tech coursework.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillCategories.map((cat, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700/80 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg text-white">{cat.title}</h3>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      0{idx + 1}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="space-y-4">
                    {cat.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-semibold text-slate-200">{skill.name}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              skill.level === 'Intermediate'
                                ? 'bg-indigo-950 text-indigo-300 border border-indigo-800/50'
                                : skill.level === 'Learning'
                                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/50'
                                : 'bg-emerald-950 text-emerald-300 border border-emerald-800/50'
                            }`}
                          >
                            {skill.level}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-normal">
                          {skill.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Hands-on Code</span>
                  <span className="text-indigo-400 font-medium">Active Practice</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Projects with Live Working Engines */}
        <section id="projects" className="scroll-mt-20">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                <Code2 className="w-4 h-4" />
                Applied Engineering Work
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Featured Projects &amp; Live Simulators
              </h2>
              <p className="text-slate-400 text-sm max-w-2xl mt-1">
                Both projects are fully implemented below with real calculation engines and Python code snippets.
              </p>
            </div>

            {/* Project Switcher */}
            <div className="flex items-center bg-slate-900 p-1.5 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setActiveProjectTab('grade')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeProjectTab === 'grade'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                1. Grade Calculator
              </button>
              <button
                type="button"
                onClick={() => setActiveProjectTab('voting')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeProjectTab === 'voting'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                2. Voting Eligibility
              </button>
            </div>
          </div>

          {/* Active Project View */}
          <div className="space-y-6">
            {activeProjectTab === 'grade' ? (
              <div>
                <div className="mb-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-white text-sm">Project 1: Student Grade &amp; CGPA Calculator</span>
                    <p className="text-slate-400 mt-0.5">
                      Developed to solve credit-weighted GPA computation for university semesters. Built using Python logic &amp; modern interactive UI.
                    </p>
                  </div>
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-semibold shrink-0"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository on GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <GradeCalculator />
              </div>
            ) : (
              <div>
                <div className="mb-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-white text-sm">Project 2: Eligibility Calculator for Voting Systems</span>
                    <p className="text-slate-400 mt-0.5">
                      Civic evaluation tool computing exact age down to days, 18+ threshold check, and registration preparedness.
                    </p>
                  </div>
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold shrink-0"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository on GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <VotingEligibilityCalculator />
              </div>
            )}
          </div>
        </section>

        {/* Dedicated AI Studio Prompt Generator Card */}
        <section id="prompt-generator" className="scroll-mt-20">
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-800/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Sparkles className="w-64 h-64 text-indigo-400" />
            </div>

            <div className="relative max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Prompt Requested by User
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                Structured Prompt Ready for Google AI Studio
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Below is the exact, engineered prompt formulated for <strong className="text-white">Jeshwanth Sinha</strong>. It encodes your 1st-year student profile, B.Tech CSE background, Python and web skills, your two projects, and your official links into an optimal directive for Google AI Studio or Gemini models.
              </p>

              {/* Formatted Code Box */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-6 relative">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80 text-xs text-slate-400">
                  <div className="flex items-center gap-2 font-mono">
                    <Terminal className="w-4 h-4 text-indigo-400" />
                    <span>structured-ai-studio-prompt.txt</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">Includes @Jeshwanth-cyber &amp; LinkedIn</span>
                </div>

                <pre className="font-mono text-xs text-indigo-200/90 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto pr-2 selection:bg-indigo-600 selection:text-white">
                  {fullPromptText}
                </pre>
              </div>

              {/* Prompt Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  id="section-copy-prompt-btn"
                  type="button"
                  onClick={handleCopyPrompt}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg ${
                    copiedPrompt
                      ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                  }`}
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="w-4 h-4" />
                      Prompt Copied to Clipboard!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Prompt to Clipboard
                    </>
                  )}
                </button>

                <button
                  id="section-inspect-modal-btn"
                  type="button"
                  onClick={() => setIsPromptModalOpen(true)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-semibold transition-colors"
                >
                  <FileCode className="w-4 h-4 text-indigo-400" />
                  View Prompt Variations (Minimal &amp; Fullstack)
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Social Section */}
        <section id="contact" className="scroll-mt-20">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-3">
            <Mail className="w-4 h-4" />
            Connect &amp; Collaborate
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-4">
            Get In Touch
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mb-8">
            Whether for academic collaboration, open-source projects, or tech discussions, I welcome the connection.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Direct Channels */}
            <div className="space-y-4">
              <a
                id="contact-github-card"
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-800 text-white rounded-xl group-hover:bg-indigo-600 transition-colors">
                    <Github className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">GitHub Repository &amp; Code</span>
                    <strong className="text-base text-white font-mono group-hover:text-indigo-300 transition-colors">
                      github.com/Jeshwanth-cyber
                    </strong>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
              </a>

              <a
                id="contact-linkedin-card"
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-800 text-white rounded-xl group-hover:bg-cyan-600 transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Professional Network</span>
                    <strong className="text-base text-white group-hover:text-cyan-300 transition-colors">
                      linkedin.com/in/jeshwanth-sinha
                    </strong>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
              </a>

              <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center gap-4">
                <div className="p-3 bg-slate-800 text-indigo-400 rounded-xl">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Campus Affiliation</span>
                  <div className="text-sm font-semibold text-white">
                    Department of Computer Science &amp; Engineering
                  </div>
                  <div className="text-xs text-slate-400">Class of 2029 • 1st Year Undergraduate</div>
                </div>
              </div>
            </div>

            {/* Quick Interactive Note Box */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-7">
              <h3 className="text-lg font-bold text-white mb-2">Send a Message to Jeshwanth</h3>
              <p className="text-xs text-slate-400 mb-5">
                Leave a project feedback note, suggestion, or mentorship guidance.
              </p>

              {contactSent ? (
                <div className="p-6 bg-emerald-950/40 border border-emerald-800/80 rounded-xl text-center space-y-2">
                  <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="text-sm font-bold text-white">Message Dispatched!</h4>
                  <p className="text-xs text-emerald-200">
                    Thank you for reaching out to Jeshwanth Sinha. Your note has been logged locally.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Subject / Topic
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Python Project Collaboration, Study Group..."
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Your Message
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Write your note or question here..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      required
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-colors shadow-md shadow-indigo-600/20"
                  >
                    <Send className="w-4 h-4" />
                    Send Note
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">{profile.name}</span>
            <span>•</span>
            <span>1st Year B.Tech CSE</span>
            <span>•</span>
            <span className="text-slate-500">Aspiring AI Engineer</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub (Jeshwanth-cyber)
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <button
              type="button"
              onClick={() => setIsPromptModalOpen(true)}
              className="text-indigo-400 hover:underline"
            >
              AI Studio Prompt
            </button>
          </div>
        </div>
      </footer>

      {/* Structured Prompt Modal */}
      <PromptGeneratorModal
        profile={profile}
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
      />
    </div>
  );
}
