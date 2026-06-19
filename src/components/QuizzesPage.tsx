/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Trophy, 
  Search, 
  Filter, 
  ChevronRight, 
  CheckCircle, 
  ClipboardCheck, 
  Calculator, 
  BookOpen, 
  Languages, 
  Sparkles,
  HelpCircle
} from "lucide-react";
import { Topic, SubjectId, StudentProfile } from "../types";
import { ALL_TOPICS } from "../data/learningContent";

interface QuizzesPageProps {
  studentProfile: StudentProfile;
  onLaunchQuiz: (topic: Topic) => void;
}

export default function QuizzesPage({ studentProfile, onLaunchQuiz }: QuizzesPageProps) {
  const [activeSubjectFilter, setActiveSubjectFilter] = useState<SubjectId | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getSubjectIcon = (subId: SubjectId) => {
    switch (subId) {
      case "math": return <Calculator className="w-5 h-5 text-blue-600" />;
      case "english": return <BookOpen className="w-5 h-5 text-green-600" />;
      case "french": return <Languages className="w-5 h-5 text-amber-600" />;
      case "science": return <Sparkles className="w-5 h-5 text-purple-600" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const getSubjectBadgeColor = (subId: SubjectId) => {
    switch (subId) {
      case "math": return "bg-blue-50 text-blue-700 border-blue-100";
      case "english": return "bg-green-50 text-green-700 border-green-100";
      case "french": return "bg-amber-50 text-amber-700 border-amber-100";
      case "science": return "bg-purple-50 text-purple-700 border-purple-100";
    }
  };

  const filteredQuizzes = ALL_TOPICS.filter((topic) => {
    const matchesSubject = activeSubjectFilter === "all" || topic.subjectId === activeSubjectFilter;
    const matchesSearch = topic.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          topic.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md mb-8">
        <div className="flex items-center gap-4 text-left">
          <div className="p-4 bg-white/10 rounded-2xl border border-white/20 shadow-inner shrink-0">
            <ClipboardCheck className="w-8 h-8 text-white" />
          </div>
          <div>
            <span className="text-xs uppercase bg-white/15 px-3 py-1 rounded-full font-bold">Practice Panel</span>
            <h1 className="text-2xl md:text-3xl font-extrabold font-heading mt-1">Interactive Topic Quizzes</h1>
            <p className="text-sm text-purple-100 font-sans mt-0.5">
              Test your knowledge instantly across any available JHS, primary, or KG chapter topic and collect stars!
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search matching quiz topics..."
            className="w-full bg-slate-50 border border-slate-200/60 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
          />
        </div>

        {/* Filters buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setActiveSubjectFilter("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeSubjectFilter === "all" ? "bg-slate-900 text-white shadow-md shadow-slate-950/20" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}
          >
            All Subjects
          </button>
          <button
            onClick={() => setActiveSubjectFilter("math")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeSubjectFilter === "math" ? "bg-blue-600 text-white shadow-md shadow-blue-500/10" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}
          >
            Mathematics
          </button>
          <button
            onClick={() => setActiveSubjectFilter("english")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeSubjectFilter === "english" ? "bg-green-600 text-white shadow-md shadow-green-500/10" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}
          >
            English
          </button>
          <button
            onClick={() => setActiveSubjectFilter("french")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeSubjectFilter === "french" ? "bg-amber-400 text-slate-900 shadow-md shadow-amber-400/10" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}
          >
            French
          </button>
          <button
            onClick={() => setActiveSubjectFilter("science")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeSubjectFilter === "science" ? "bg-purple-600 text-white shadow-md shadow-purple-500/10" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}
          >
            Science
          </button>
        </div>
      </div>

      {/* Quizzes List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        {filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((topic) => {
            const quizScore = studentProfile.completedQuizzes[topic.id];
            const isCompleted = quizScore !== undefined;

            return (
              <div 
                key={topic.id}
                className="bg-white rounded-3xl border border-slate-100 shadow-xs p-6 flex flex-col justify-between hover:border-slate-300 transition-all hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-0.5 border text-[10px] font-bold rounded-lg ${getSubjectBadgeColor(topic.subjectId)} uppercase font-mono`}>
                      {topic.subjectId}
                    </span>
                    <span className="text-[10px] bg-slate-100 font-mono text-slate-500 font-bold px-2 py-0.5 rounded-md">
                      {topic.quiz.length} Questions
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-800 text-sm md:text-base leading-snug mb-1">
                    {topic.name} Quiz
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-sans mb-6">
                    {topic.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                  {isCompleted ? (
                    <div className="flex items-center gap-1.5 text-green-600 font-extrabold text-xs font-mono">
                      <CheckCircle className="w-4 h-4" /> Passed: {quizScore}%
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-sans">Not yet tested</span>
                  )}

                  <button
                    onClick={() => onLaunchQuiz(topic)}
                    className="flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl border border-slate-900 transition-all shadow-xs"
                  >
                    Start Quiz
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-12 text-center bg-slate-50 border border-dashed rounded-3xl border-slate-200 text-slate-400">
            <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <span className="text-sm font-bold block">No matching topic quizzes found</span>
            <span className="text-xs text-slate-400">Try checking different combinations or clear search.</span>
          </div>
        )}
      </div>
    </div>
  );
}
