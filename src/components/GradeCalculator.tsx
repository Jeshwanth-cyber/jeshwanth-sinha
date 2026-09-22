import React, { useState } from 'react';
import { Plus, Trash2, Calculator, CheckCircle2, Award, Code, Play } from 'lucide-react';
import { SubjectGrade } from '../types';

const defaultSubjects: SubjectGrade[] = [
  { id: '1', name: 'Programming in Python', marks: 88, credits: 4 },
  { id: '2', name: 'Data Structures Foundations', marks: 82, credits: 4 },
  { id: '3', name: 'Web Development Basics', marks: 91, credits: 3 },
  { id: '4', name: 'Engineering Mathematics I', marks: 76, credits: 4 },
  { id: '5', name: 'Generative AI Concepts', marks: 94, credits: 2 },
];

export const GradeCalculator: React.FC = () => {
  const [subjects, setSubjects] = useState<SubjectGrade[]>(defaultSubjects);
  const [activeTab, setActiveTab] = useState<'demo' | 'python'>('demo');
  const [newSubName, setNewSubName] = useState('');
  const [newSubMarks, setNewSubMarks] = useState('85');
  const [newSubCredits, setNewSubCredits] = useState('3');

  const addSubject = () => {
    if (!newSubName.trim()) return;
    const item: SubjectGrade = {
      id: Date.now().toString(),
      name: newSubName.trim(),
      marks: Math.min(100, Math.max(0, Number(newSubMarks) || 0)),
      credits: Math.min(6, Math.max(1, Number(newSubCredits) || 1)),
    };
    setSubjects([...subjects, item]);
    setNewSubName('');
  };

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const updateMarks = (id: string, marks: number) => {
    setSubjects(
      subjects.map((s) =>
        s.id === id ? { ...s, marks: Math.min(100, Math.max(0, marks)) } : s
      )
    );
  };

  // Grade Calculations
  const totalCredits = subjects.reduce((acc, s) => acc + s.credits, 0);
  const totalMarks = subjects.reduce((acc, s) => acc + s.marks, 0);
  const averagePercentage = subjects.length > 0 ? (totalMarks / subjects.length) : 0;

  // Grade Point per 100 marks (Standard 10-point Scale)
  const getGradePoint = (marks: number): number => {
    if (marks >= 90) return 10;
    if (marks >= 80) return 9;
    if (marks >= 70) return 8;
    if (marks >= 60) return 7;
    if (marks >= 50) return 6;
    if (marks >= 40) return 5;
    return 0;
  };

  const getLetterGrade = (marks: number): string => {
    if (marks >= 90) return 'O (Outstanding)';
    if (marks >= 80) return 'A+ (Excellent)';
    if (marks >= 70) return 'A (Very Good)';
    if (marks >= 60) return 'B+ (Good)';
    if (marks >= 50) return 'B (Above Average)';
    if (marks >= 40) return 'C (Pass)';
    return 'F (Fail)';
  };

  const weightedPoints = subjects.reduce(
    (acc, s) => acc + getGradePoint(s.marks) * s.credits,
    0
  );
  const sgpa = totalCredits > 0 ? (weightedPoints / totalCredits).toFixed(2) : '0.00';

  const pythonCodeSnippet = `# ============================================
# Project: Student Grade & CGPA Calculator
# Author: Jeshwanth Sinha (1st Year B.Tech CSE)
# ============================================

def calculate_grade_point(marks):
    if marks >= 90:
        return 10, "O (Outstanding)"
    elif marks >= 80:
        return 9, "A+ (Excellent)"
    elif marks >= 70:
        return 8, "A (Very Good)"
    elif marks >= 60:
        return 7, "B+ (Good)"
    elif marks >= 50:
        return 6, "B (Average)"
    elif marks >= 40:
        return 5, "C (Pass)"
    else:
        return 0, "F (Fail)"

def calculate_gpa(subjects):
    total_weighted_points = 0
    total_credits = 0
    total_marks = 0

    print("\\n--- ACADEMIC PERFORMANCE REPORT ---")
    for name, marks, credits in subjects:
        gp, letter = calculate_grade_point(marks)
        total_weighted_points += gp * credits
        total_credits += credits
        total_marks += marks
        print(f"{name:30} | Marks: {marks:3} | Grade: {letter} | Credits: {credits}")

    sgpa = round(total_weighted_points / total_credits, 2)
    avg_percentage = round(total_marks / len(subjects), 2)

    print("-" * 55)
    print(f"Overall Percentage: {avg_percentage}%")
    print(f"Calculated SGPA:    {sgpa} / 10.0")
    return sgpa, avg_percentage

# Sample Execution
subjects_data = [
    ("Programming in Python", 88, 4),
    ("Data Structures Foundations", 82, 4),
    ("Web Development Basics", 91, 3),
    ("Engineering Mathematics I", 76, 4),
    ("Generative AI Concepts", 94, 2)
]

calculate_gpa(subjects_data)`;

  return (
    <div id="grade-calculator-card" className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-7 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
              <Calculator className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">Student Grade & CGPA Calculator</h3>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Real-time semester SGPA and weighted credit grading engine developed by Jeshwanth Sinha.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center bg-slate-800/80 p-1 rounded-xl self-start sm:self-auto border border-slate-700/60">
          <button
            type="button"
            onClick={() => setActiveTab('demo')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'demo'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            Interactive Demo
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('python')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'python'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            Python Source
          </button>
        </div>
      </div>

      {activeTab === 'demo' ? (
        <div className="space-y-6">
          {/* Summary Metric Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-800/40 p-4 rounded-xl border border-slate-800">
            <div className="bg-slate-800/60 p-3 rounded-lg">
              <span className="text-xs font-medium text-slate-400">Semester SGPA</span>
              <div className="text-2xl font-bold text-indigo-400 mt-0.5">{sgpa} <span className="text-xs text-slate-500 font-normal">/ 10.0</span></div>
            </div>
            <div className="bg-slate-800/60 p-3 rounded-lg">
              <span className="text-xs font-medium text-slate-400">Average Score</span>
              <div className="text-2xl font-bold text-emerald-400 mt-0.5">{averagePercentage.toFixed(1)}%</div>
            </div>
            <div className="bg-slate-800/60 p-3 rounded-lg">
              <span className="text-xs font-medium text-slate-400">Total Credits</span>
              <div className="text-2xl font-bold text-amber-400 mt-0.5">{totalCredits}</div>
            </div>
            <div className="bg-slate-800/60 p-3 rounded-lg">
              <span className="text-xs font-medium text-slate-400">Academic Standing</span>
              <div className="text-sm font-semibold text-cyan-300 mt-1 flex items-center gap-1">
                <Award className="w-4 h-4 text-cyan-400" />
                {Number(sgpa) >= 8.5 ? 'First Class with Distinction' : Number(sgpa) >= 6.5 ? 'First Class' : 'Good Standing'}
              </div>
            </div>
          </div>

          {/* Subject Rows */}
          <div className="space-y-3">
            <div className="hidden sm:grid sm:grid-cols-12 text-xs font-semibold text-slate-400 px-3 py-1">
              <div className="col-span-6">Subject / Course Name</div>
              <div className="col-span-2 text-center">Credits</div>
              <div className="col-span-2 text-center">Marks (0-100)</div>
              <div className="col-span-2 text-right">Grade</div>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {subjects.map((sub) => (
                <div
                  key={sub.id}
                  className="grid grid-cols-1 sm:grid-cols-12 items-center gap-3 bg-slate-800/30 hover:bg-slate-800/60 p-3 rounded-xl border border-slate-800/70 transition-colors"
                >
                  <div className="col-span-6 flex items-center justify-between sm:justify-start gap-2">
                    <span className="text-sm font-medium text-slate-200">{sub.name}</span>
                    <button
                      type="button"
                      onClick={() => removeSubject(sub.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors sm:hidden p-1"
                      title="Remove Subject"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="col-span-2 flex items-center justify-between sm:justify-center">
                    <span className="text-xs text-slate-400 sm:hidden">Credits:</span>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-slate-700/60 text-slate-300 rounded-md">
                      {sub.credits} cr
                    </span>
                  </div>

                  <div className="col-span-2 flex items-center justify-between sm:justify-center gap-2">
                    <span className="text-xs text-slate-400 sm:hidden">Marks:</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={sub.marks}
                      onChange={(e) => updateMarks(sub.id, Number(e.target.value))}
                      className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-sm text-center font-bold text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="col-span-2 flex items-center justify-between sm:justify-end gap-2">
                    <span className="text-xs font-semibold text-indigo-300">
                      {getLetterGrade(sub.marks).split(' ')[0]}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeSubject(sub.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors hidden sm:block p-1"
                      title="Remove Subject"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Subject Row */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2 border-t border-slate-800">
            <input
              type="text"
              placeholder="Add subject (e.g. Computer Networks)..."
              value={newSubName}
              onChange={(e) => setNewSubName(e.target.value)}
              className="w-full sm:flex-1 bg-slate-900/80 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              onKeyDown={(e) => e.key === 'Enter' && addSubject()}
            />
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={newSubCredits}
                onChange={(e) => setNewSubCredits(e.target.value)}
                className="bg-slate-900/80 border border-slate-700 rounded-xl px-2.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="1">1 Cr</option>
                <option value="2">2 Cr</option>
                <option value="3">3 Cr</option>
                <option value="4">4 Cr</option>
                <option value="5">5 Cr</option>
              </select>
              <input
                type="number"
                min="0"
                max="100"
                value={newSubMarks}
                onChange={(e) => setNewSubMarks(e.target.value)}
                placeholder="Marks"
                className="w-20 bg-slate-900/80 border border-slate-700 rounded-xl px-2.5 py-2 text-sm text-center text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={addSubject}
                className="flex items-center justify-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-colors shrink-0 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <pre className="bg-slate-950 p-4 rounded-xl text-xs text-indigo-300 font-mono overflow-x-auto border border-slate-800 leading-relaxed">
            <code>{pythonCodeSnippet}</code>
          </pre>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Executable in Python 3.8+ / Google Colab / VS Code
            </span>
            <span className="text-slate-500">Built by Jeshwanth Sinha</span>
          </div>
        </div>
      )}
    </div>
  );
};
