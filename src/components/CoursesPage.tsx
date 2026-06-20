/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Calculator, 
  BookOpen, 
  Languages, 
  Sparkles, 
  Search, 
  ChevronRight, 
  GraduationCap, 
  Trophy,
  ArrowRight
} from "lucide-react";
import { SUBJECTS, ALL_TOPICS } from "../data/learningContent";
import { SubjectId, Topic } from "../types";

interface CoursesPageProps {
  onSelectTopic: (topic: Topic) => void;
  onSelectSubject: (subjectId: SubjectId) => void;
}

export default function CoursesPage({ onSelectTopic, onSelectSubject }: CoursesPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubjectFilter, setActiveSubjectFilter] = useState<"all" | SubjectId>("all");

  const getSubjectIconComponent = (subjectId: SubjectId) => {
    switch (subjectId) {
      case "math": return <Calculator className="w-5 h-5" />;
      case "english": return <BookOpen className="w-5 h-5" />;
      case "french": return <Languages className="w-5 h-5" />;
      case "science": return <Sparkles className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const filteredTopics = ALL_TOPICS.filter((topic) => {
    const matchesSearch = 
      topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = activeSubjectFilter === "all" || topic.subjectId === activeSubjectFilter;

    return matchesSearch && matchesSubject;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-8 rounded-3xl text-left">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2D6CDF] bg-[#2D6CDF]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
             Academic Subjects Catalog
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#2C3E50] tracking-tight font-heading">
            Browse Our Courses & Topics
          </h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto mt-2 leading-relaxed">
            Discover step-by-step interactive lessons and mock test quizzes mapping West African KG to Junior High School standards.
          </p>
        </div>

        {/* Search and Quick Subjects filters tab bar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-xs mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
            <input
              type="text"
              placeholder="Search chapters, operations, topics (e.g. addition, solar system, nouns)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs outline-none focus:ring-2 focus:ring-[#2D6CDF] focus:bg-white transition-all font-semibold text-slate-800"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={() => setActiveSubjectFilter("all")}
              className={`text-xs font-extrabold px-4 py-2.5 rounded-xl cursor-pointer transition-all ${
                activeSubjectFilter === "all"
                  ? "bg-[#2C3E50] text-white shadow-xs"
                  : "bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200"
              }`}
            >
              All Subjects
            </button>

            {SUBJECTS.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setActiveSubjectFilter(sub.id)}
                className={`text-xs font-extrabold px-4 py-2.5 rounded-xl cursor-pointer border flex items-center gap-1.5 transition-all ${
                  activeSubjectFilter === sub.id
                    ? `${sub.bannerColor} text-white ${sub.borderColor} shadow-xs`
                    : "bg-slate-100 border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-200"
                }`}
              >
                {getSubjectIconComponent(sub.id)}
                <span>{sub.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Subjects summary overview block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SUBJECTS.filter((s) => activeSubjectFilter === "all" || s.id === activeSubjectFilter).map((sub) => {
            const subTopics = filteredTopics.filter((t) => t.subjectId === sub.id);

            return (
              <div 
                key={sub.id} 
                className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-xs text-left hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-3 rounded-2xl ${sub.bannerColor} text-white shadow-sm`}>
                        {getSubjectIconComponent(sub.id)}
                      </div>
                      <div>
                        <h2 className="font-extrabold text-slate-800 text-base">{sub.name}</h2>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">KG ➔ JHS3 SYLLABUS</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectSubject(sub.id)}
                      className="text-xs font-bold text-[#2D6CDF] hover:underline cursor-pointer flex items-center gap-0.5"
                    >
                      Enter syllabus <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 mb-5 leading-normal max-w-md font-sans">
                    {sub.description}
                  </p>

                  {/* Chapters List */}
                  <div className="space-y-2.5">
                    {subTopics.length === 0 ? (
                      <p className="text-[11px] text-slate-400 italic">No topics matched current search query.</p>
                    ) : (
                      subTopics.map((topic) => (
                        <div
                          key={topic.id}
                          onClick={() => onSelectTopic(topic)}
                          className="p-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 hover:border-slate-300 rounded-2xl flex items-center justify-between cursor-pointer transition-all group"
                        >
                          <div className="space-y-1 max-w-[80%]">
                            <span className="font-extrabold text-slate-800 text-xs block leading-tight group-hover:text-[#2D6CDF] transition-colors">{topic.name}</span>
                            <span className="text-[9px] text-slate-400 leading-normal block max-w-md overflow-ellipsis overflow-hidden whitespace-nowrap">{topic.description}</span>
                          </div>

                          <span className="text-[9px] bg-slate-100 text-slate-500 font-extrabold px-2.5 py-1 rounded-lg">
                            {topic.difficulty}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                  <button
                    onClick={() => onSelectSubject(sub.id)}
                    className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold py-2.5 rounded-xl border transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Browse and Practice {sub.name} Lessons</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
