import React, { useState } from 'react';
import { Vote, CheckCircle2, AlertCircle, Clock, FileCheck, Code, Play } from 'lucide-react';

export const VotingEligibilityCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'demo' | 'python'>('demo');
  const [birthDate, setBirthDate] = useState('2007-04-15');
  const [isCitizen, setIsCitizen] = useState(true);
  const [hasIdProof, setHasIdProof] = useState(true);
  const [isResident, setIsResident] = useState(true);

  // Age calculations
  const calculateAgeDetails = (dobStr: string) => {
    if (!dobStr) return { years: 0, months: 0, days: 0, isEligibleAge: false, daysRemaining: 0 };
    const dob = new Date(dobStr);
    const today = new Date(2026, 8, 22); // Current reference date

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const isEligibleAge = years >= 18;

    // Calculate approximate days remaining if under 18
    let daysRemaining = 0;
    if (!isEligibleAge) {
      const eighteenthBirthday = new Date(dob.getFullYear() + 18, dob.getMonth(), dob.getDate());
      const diffTime = eighteenthBirthday.getTime() - today.getTime();
      daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    }

    return { years, months, days, isEligibleAge, daysRemaining };
  };

  const ageData = calculateAgeDetails(birthDate);
  const isFullyEligible = ageData.isEligibleAge && isCitizen && isResident;

  const pythonSnippet = `# ====================================================
# Project: Eligibility Calculator for Voting Systems
# Author: Jeshwanth Sinha (1st Year B.Tech CSE)
# ====================================================
from datetime import datetime, date

def check_voting_eligibility(name, dob_str, is_citizen, is_resident):
    dob = datetime.strptime(dob_str, "%Y-%m-%d").date()
    today = date(2026, 9, 22)  # Reference date
    
    # Calculate age
    age_years = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
    
    # 18th Birthday date
    eighteenth_bday = date(dob.year + 18, dob.month, dob.day)
    days_left = (eighteenth_bday - today).days

    print(f"\\n--- VOTER ELIGIBILITY REPORT: {name.upper()} ---")
    print(f"Date of Birth:     {dob_str}")
    print(f"Calculated Age:    {age_years} years old")
    print(f"Citizenship:       {'Verified' if is_citizen else 'Non-Citizen'}")
    print(f"Residency:         {'Resident' if is_resident else 'Non-Resident'}")
    print("-" * 50)

    # Core rule verification
    if not is_citizen:
        print("[STATUS: INELIGIBLE] Only verified citizens are eligible to register to vote.")
        return False
    
    if not is_resident:
        print("[STATUS: INELIGIBLE] Must reside in the registered constituency.")
        return False

    if age_years >= 18:
        print("[STATUS: ELIGIBLE] You are 18+ and meet all civic requirements!")
        print("Next step: Proceed to Voter Portal with ID and Address Proof.")
        return True
    else:
        print(f"[STATUS: FUTURE VOTER] You are currently {age_years} years old.")
        print(f"You will become eligible in approx {days_left} days on {eighteenth_bday}.")
        return False

# Sample Execution
check_voting_eligibility(
    name="Jeshwanth Sinha",
    dob_str="2007-04-15",
    is_citizen=True,
    is_resident=True
)`;

  return (
    <div id="voting-calculator-card" className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-7 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <Vote className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">Eligibility Calculator for Voting Systems</h3>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Constitutional rule validator checking age milestone, citizenship & document preparedness.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center bg-slate-800/80 p-1 rounded-xl self-start sm:self-auto border border-slate-700/60">
          <button
            type="button"
            onClick={() => setActiveTab('demo')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'demo'
                ? 'bg-emerald-600 text-white shadow-sm'
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
                ? 'bg-emerald-600 text-white shadow-sm'
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
          {/* Main Status Banner */}
          <div
            className={`p-4 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
              isFullyEligible
                ? 'bg-emerald-950/40 border-emerald-800/70 text-emerald-200'
                : 'bg-amber-950/30 border-amber-800/60 text-amber-200'
            }`}
          >
            <div className="flex items-start gap-3">
              {isFullyEligible ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="font-bold text-base text-white">
                  {isFullyEligible
                    ? 'Eligible to Vote & Register'
                    : 'Currently Ineligible for Voter Registration'}
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  {isFullyEligible
                    ? `You are ${ageData.years} years, ${ageData.months} months, and ${ageData.days} days old with required civic credentials.`
                    : !ageData.isEligibleAge
                    ? `You are ${ageData.years} years old. Constitutional requirement requires a minimum age of 18.`
                    : 'Please review citizenship and local residency credentials below.'}
                </p>
              </div>
            </div>

            <div className="text-left md:text-right shrink-0">
              <span className="text-xs text-slate-400 block font-medium">Exact Age Calculated</span>
              <span className="text-lg font-bold text-white">
                {ageData.years} yrs, {ageData.months} mos
              </span>
            </div>
          </div>

          {/* Form Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800 space-y-3">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                1. Date of Birth (DOB)
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span>Try Quick Dates:</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setBirthDate('2006-03-10')}
                    className="text-emerald-400 hover:underline"
                  >
                    Age 20 (Eligible)
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setBirthDate('2009-11-20')}
                    className="text-amber-400 hover:underline"
                  >
                    Age 16 (Under 18)
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800 space-y-3">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                2. Legal Criteria Checklist
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isCitizen}
                    onChange={(e) => setIsCitizen(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-slate-900 border-slate-700"
                  />
                  <span>Citizen of Country (Legal Requirement)</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isResident}
                    onChange={(e) => setIsResident(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-slate-900 border-slate-700"
                  />
                  <span>Constituency Resident (Ordinary Resident)</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasIdProof}
                    onChange={(e) => setHasIdProof(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-slate-900 border-slate-700"
                  />
                  <span>Has Valid Government Identification Proof</span>
                </label>
              </div>
            </div>
          </div>

          {/* Under-18 Countdown or Document Guidance */}
          {!ageData.isEligibleAge ? (
            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-xs text-slate-300">
                <span className="font-semibold text-amber-300">Milestone Countdown: </span>
                You will reach constitutional age eligibility in approximately{' '}
                <strong className="text-white">{ageData.daysRemaining} days</strong>. You can pre-register during the annual electoral revision before turning 18!
              </div>
            </div>
          ) : (
            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
              <FileCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-xs text-slate-300">
                <span className="font-semibold text-emerald-300">Next Action: </span>
                Visit your national electoral portal (e.g., NVSP / Election Commission portal) to submit Form 6 for first-time voter ID card issuance.
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <pre className="bg-slate-950 p-4 rounded-xl text-xs text-emerald-300 font-mono overflow-x-auto border border-slate-800 leading-relaxed">
            <code>{pythonSnippet}</code>
          </pre>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Rule-based logic implemented using Python datetime module
            </span>
            <span className="text-slate-500">Built by Jeshwanth Sinha</span>
          </div>
        </div>
      )}
    </div>
  );
};
