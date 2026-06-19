/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  Trophy, 
  Star, 
  Zap, 
  Calendar, 
  TrendingUp, 
  CheckCircle,
  HelpCircle,
  FileCheck,
  ChevronRight,
  Calculator,
  BookOpen,
  Languages,
  Sparkles
} from "lucide-react";
import { StudentProfile, SubjectId, Topic } from "../types";
import { ALL_TOPICS, SUBJECTS } from "../data/learningContent";

interface ProgressPageProps {
  studentProfile: StudentProfile;
}

export default function ProgressPage({ studentProfile }: ProgressPageProps) {
  
  const getSubjectProgressInfo = (subjectId: SubjectId) => {
    const topicsOfSubject = ALL_TOPICS.filter(t => t.subjectId === subjectId);
    let passedCount = 0;
    let totalScoreSum = 0;

    topicsOfSubject.forEach(t => {
      const score = studentProfile.completedQuizzes[t.id];
      if (score !== undefined) {
        passedCount++;
        totalScoreSum += score;
      }
    });

    const averageCorrect = passedCount > 0 ? Math.round(totalScoreSum / passedCount) : 0;
    const progressPercentage = topicsOfSubject.length > 0 ? Math.round((passedCount / topicsOfSubject.length) * 100) : 0;

    return {
      passedCount,
      totalCount: topicsOfSubject.length,
      averageCorrect,
      progressPercentage
    };
  };

  const mathInfo = getSubjectProgressInfo("math");
  const engInfo = getSubjectProgressInfo("english");
  const freInfo = getSubjectProgressInfo("french");
  const sciInfo = getSubjectProgressInfo("science");

  // Sum total passed quizzes
  const totalPassedCount = mathInfo.passedCount + engInfo.passedCount + freInfo.passedCount + sciInfo.passedCount;
  
  // Calculate average score across all passed tests
  const totalPassedScoreSum = ALL_TOPICS.reduce((acc, t) => {
    const score = studentProfile.completedQuizzes[t.id];
    return score !== undefined ? acc + score : acc;
  }, 0);
  const averageAllQuizzes = totalPassedCount > 0 ? Math.round(totalPassedScoreSum / totalPassedCount) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Banner Title */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg mb-8">
        <div className="flex items-center gap-4 text-left">
          <div className="p-4 bg-white/10 rounded-2xl border border-white/20 shadow-inner shrink-0">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div>
            <span className="text-xs uppercase bg-white/15 px-3 py-1 rounded-full font-bold">Progress Hub</span>
            <h1 className="text-2xl md:text-3xl font-extrabold font-heading mt-1">My Performance Chart</h1>
            <p className="text-sm text-emerald-100 font-sans mt-0.5">
              Visualize your grade records, curriculum tracking, and test statistics instantly!
            </p>
          </div>
        </div>
      </div>

      {/* Global metrics grid metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs text-left">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block font-mono">Total XP gained</span>
          <div className="flex items-center gap-1.5 mt-1 font-sans">
            <Zap className="w-5 h-5 text-blue-500 fill-blue-100" />
            <span className="text-xl md:text-2xl font-black text-slate-800">{studentProfile.xp}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-sans block mt-1">Multiplier Active (+25 XP per test)</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs text-left">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block font-mono">Stars Collected</span>
          <div className="flex items-center gap-1.5 mt-1 font-sans">
            <Star className="w-5 h-5 text-amber-500 fill-amber-300" />
            <span className="text-xl md:text-2xl font-black text-slate-800">{studentProfile.stars}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-sans block mt-1">Collected from topic checklists</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs text-left">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block font-mono">Quizzes Passed</span>
          <div className="flex items-center gap-1.5 mt-1 font-sans">
            <FileCheck className="w-5 h-5 text-green-500" />
            <span className="text-xl md:text-2xl font-black text-slate-800">
              {totalPassedCount} <span className="text-xs text-slate-400 font-sans font-normal">/ {ALL_TOPICS.length}</span>
            </span>
          </div>
          <span className="text-[10px] text-green-600 font-semibold block mt-1">
            {Math.round((totalPassedCount / ALL_TOPICS.length) * 100)}% Syllabus complete
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs text-left">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block font-mono">Average Accuracy</span>
          <div className="flex items-center gap-1.5 mt-1 font-sans">
            <Trophy className="w-5 h-5 text-purple-600" />
            <span className="text-xl md:text-2xl font-black text-slate-800">
              {averageAllQuizzes}%
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-sans block mt-1">Score percentage average</span>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: horizontal subject progress bars */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-xs text-left space-y-6">
          <h3 className="font-bold text-base text-slate-800 font-heading border-b border-slate-100 pb-3 flex items-center gap-2">
            Subject Grade Trackers
          </h3>

          <div className="space-y-6">
            
            {/* Mathematics tracker */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2 text-slate-700 font-bold font-sans">
                  <Calculator className="w-4 h-4 text-blue-500" /> Mathematics
                </div>
                <span className="font-bold text-blue-600 font-mono">
                  {mathInfo.passedCount} / {mathInfo.totalCount} Quizzes ({mathInfo.progressPercentage}%)
                </span>
              </div>
              <div className="h-4 w-full bg-slate-50 border rounded-xl overflow-hidden p-0.5">
                <div 
                  className="h-full bg-blue-500 rounded-lg transition-all duration-300"
                  style={{ width: `${mathInfo.progressPercentage}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 font-sans block">
                Average Score: <strong className="text-slate-600">{mathInfo.averageCorrect}%</strong> for answered chapters.
              </span>
            </div>

            {/* English tracker */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2 text-slate-700 font-bold font-sans">
                  <BookOpen className="w-4 h-4 text-green-500" /> English Language
                </div>
                <span className="font-bold text-green-600 font-mono">
                  {engInfo.passedCount} / {engInfo.totalCount} Quizzes ({engInfo.progressPercentage}%)
                </span>
              </div>
              <div className="h-4 w-full bg-slate-50 border rounded-xl overflow-hidden p-0.5">
                <div 
                  className="h-full bg-green-500 rounded-lg transition-all duration-300"
                  style={{ width: `${engInfo.progressPercentage}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 font-sans block">
                Average Score: <strong className="text-slate-600">{engInfo.averageCorrect}%</strong> for answered chapters.
              </span>
            </div>

            {/* French tracker */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2 text-slate-700 font-bold font-sans">
                  <Languages className="w-4 h-4 text-amber-500" /> French (Français)
                </div>
                <span className="font-bold text-amber-600 font-mono">
                  {freInfo.passedCount} / {freInfo.totalCount} Quizzes ({freInfo.progressPercentage}%)
                </span>
              </div>
              <div className="h-4 w-full bg-slate-50 border rounded-xl overflow-hidden p-0.5">
                <div 
                  className="h-full bg-amber-400 rounded-lg transition-all duration-300"
                  style={{ width: `${freInfo.progressPercentage}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 font-sans block">
                Average Score: <strong className="text-slate-600">{freInfo.averageCorrect}%</strong> for answered chapters.
              </span>
            </div>

            {/* Science tracker */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2 text-slate-700 font-bold font-sans">
                  <Sparkles className="w-4 h-4 text-purple-500" /> Science Studies
                </div>
                <span className="font-bold text-purple-600 font-mono">
                  {sciInfo.passedCount} / {sciInfo.totalCount} Quizzes ({sciInfo.progressPercentage}%)
                </span>
              </div>
              <div className="h-4 w-full bg-slate-50 border rounded-xl overflow-hidden p-0.5">
                <div 
                  className="h-full bg-purple-500 rounded-lg transition-all duration-300"
                  style={{ width: `${sciInfo.progressPercentage}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 font-sans block">
                Average Score: <strong className="text-slate-600">{sciInfo.averageCorrect}%</strong> for answered chapters.
              </span>
            </div>

          </div>
        </div>

        {/* Right Side: Chapter report card detail */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-100 shadow-xs text-left space-y-4">
          <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3">
            Score Card Milestones
          </h3>

          <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
            {ALL_TOPICS.map(topic => {
              const score = studentProfile.completedQuizzes[topic.id];
              const isPassed = score !== undefined;

              return (
                <div 
                  key={topic.id}
                  className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border"
                >
                  <div className="text-left">
                    <span className="font-extrabold text-xs text-slate-700 block leading-tight">{topic.name}</span>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block font-mono mt-0.5">{topic.subjectId} • {topic.difficulty}</span>
                  </div>

                  {isPassed ? (
                    <div className="bg-emerald-100 border border-emerald-200 text-emerald-700 px-3 py-1 rounded-xl text-xs font-black font-mono">
                      {score}%
                    </div>
                  ) : (
                    <span className="text-[10px] bg-slate-100 text-slate-400 px-2.5 py-1 rounded-xl font-bold font-sans select-none">
                      Locked
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
