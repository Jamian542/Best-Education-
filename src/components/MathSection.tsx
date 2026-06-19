/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calculator, 
  BookOpen, 
  Play, 
  HelpCircle, 
  ArrowRight, 
  Bookmark, 
  CheckCircle, 
  Award, 
  Star, 
  GraduationCap, 
  ListTodo,
  Sparkles,
  Layers,
  ChevronRight,
  TrendingUp,
  MinusCircle,
  PlusCircle,
  PieChart,
  Hash,
  Square,
  Divide
} from "lucide-react";
import { Topic, ClassLevel, DifficultyLevel, StudentProfile } from "../types";
import { MATH_TOPICS, VISUAL_ICONS } from "../data/learningContent";

interface MathSectionProps {
  studentProfile: StudentProfile;
  onLaunchQuiz: (topic: Topic) => void;
}

export default function MathSection({ studentProfile, onLaunchQuiz }: MathSectionProps) {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(MATH_TOPICS[0].id);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>("Beginner");
  const [gradeFilter, setGradeFilter] = useState<"all" | "kg" | "primary" | "jhs">("all");

  const activeTopic = MATH_TOPICS.find(t => t.id === selectedTopicId) || MATH_TOPICS[0];

  const getTopicIcon = (iconName: string, color: string) => {
    let baseColor = "text-blue-500 bg-blue-100";
    if (color === "red") baseColor = "text-red-500 bg-red-100";
    if (color === "amber") baseColor = "text-amber-500 bg-amber-100";
    if (color === "green") baseColor = "text-green-500 bg-green-100";

    switch (iconName) {
      case "PlusCircle": return <PlusCircle className="w-5 h-5" />;
      case "MinusCircle": return <MinusCircle className="w-5 h-5" />;
      case "Grid": return <Layers className="w-5 h-5" />;
      case "Divide": return <Divide className="w-5 h-5" />;
      case "PieChart": return <PieChart className="w-5 h-5" />;
      case "Hash": return <Hash className="w-5 h-5" />;
      case "Square": return <Square className="w-5 h-5" />;
      case "Layers": return <Layers className="w-5 h-5" />;
      case "TrendingUp": return <TrendingUp className="w-5 h-5" />;
      default: return <Calculator className="w-5 h-5" />;
    }
  };

  // Filter topics based on selected category segment tab
  const getFilteredTopics = () => {
    return MATH_TOPICS.filter(topic => {
      if (gradeFilter === "all") return true;
      if (gradeFilter === "kg") {
        return topic.levels.includes("KG") || topic.levels.includes("Primary 1") || topic.levels.includes("Primary 2");
      }
      if (gradeFilter === "primary") {
        return topic.levels.includes("Primary 3") || topic.levels.includes("Primary 4") || topic.levels.includes("Primary 5") || topic.levels.includes("Primary 6");
      }
      if (gradeFilter === "jhs") {
        return topic.levels.includes("JHS 1") || topic.levels.includes("JHS 2") || topic.levels.includes("JHS 3");
      }
      return true;
    });
  };

  const filteredTopics = getFilteredTopics();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Subject Header Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg mb-8">
        <div className="flex items-center gap-4 text-left">
          <div className="p-4 bg-white/10 rounded-2xl border border-white/20 shadow-inner">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <div>
            <span className="text-xs uppercase bg-white/15 px-3 py-1 rounded-full font-bold">Subject Section</span>
            <h1 className="text-2xl md:text-3xl font-extrabold font-heading mt-1">Mathematics Curriculum</h1>
            <p className="text-sm text-blue-100 font-sans mt-1">
              Fun layouts that take you from simple visual counting to formulas for perimeter, area, and probability theory.
            </p>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2 bg-slate-900/10 px-4 py-2.5 rounded-2xl border border-white/10">
          <GraduationCap className="w-5 h-5 text-amber-300" />
          <div className="text-left">
            <span className="text-[10px] text-blue-200 block font-semibold">TARGET GROUP</span>
            <span className="text-xs font-bold font-sans">Kindergarten to JHS3</span>
          </div>
        </div>
      </div>

      {/* Grid Layout containing list scrollbar on left, active lesson detailed preview on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Topic filter and list selector */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xs text-left">
            <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider mb-3">Filter Grade Level</h3>
            
            {/* Segmented Button Group */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button 
                onClick={() => setGradeFilter("all")}
                className={`p-2.5 rounded-xl font-bold transition-all ${gradeFilter === "all" ? "bg-blue-600 text-white shadow-md shadow-blue-500/10" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}
              >
                All Levels
              </button>
              <button 
                onClick={() => setGradeFilter("kg")}
                className={`p-2.5 rounded-xl font-bold transition-all ${gradeFilter === "kg" ? "bg-blue-600 text-white shadow-md shadow-blue-500/10" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}
              >
                KG - Primary 2
              </button>
              <button 
                onClick={() => setGradeFilter("primary")}
                className={`p-2.5 rounded-xl font-bold transition-all ${gradeFilter === "primary" ? "bg-blue-600 text-white shadow-md shadow-blue-500/10" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}
              >
                Primary 3 - 6
              </button>
              <button 
                onClick={() => setGradeFilter("jhs")}
                className={`p-2.5 rounded-xl font-bold transition-all ${gradeFilter === "jhs" ? "bg-blue-600 text-white shadow-md shadow-blue-500/10" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}
              >
                JHS 1 - JHS 3
              </button>
            </div>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredTopics.map((topic) => {
              const isActive = topic.id === selectedTopicId;
              const hasScore = studentProfile.completedQuizzes[topic.id] !== undefined;
              const score = studentProfile.completedQuizzes[topic.id] || 0;

              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${isActive ? "bg-blue-50/50 border-blue-300 ring-2 ring-blue-100" : "bg-white border-slate-100 hover:border-slate-300"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl shrink-0 ${isActive ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-600"}`}>
                      {getTopicIcon(topic.icon, "blue")}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800 leading-tight">{topic.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono block mt-0.5 uppercase">
                        {topic.levels[0]} • {topic.difficulty}
                      </span>
                    </div>
                  </div>

                  {hasScore ? (
                    <div className="bg-green-100 border border-green-200 text-green-700 px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 shrink-0 font-mono">
                      <CheckCircle className="w-3 h-3 text-green-600" /> {score}%
                    </div>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Detailed Lesson Card and Visual Explanation */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTopic.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden text-left"
            >
              
              {/* Card Header */}
              <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-100">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-bold uppercase text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    Syllabus Topic Chapter
                  </span>
                  <div className="flex gap-1">
                    {activeTopic.levels.map(lvl => (
                      <span key={lvl} className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2.5 py-0.5 rounded-md font-mono">
                        {lvl}
                      </span>
                    ))}
                  </div>
                </div>

                <h2 className="text-2xl font-extrabold text-slate-800 font-heading mb-2">
                  {activeTopic.name}
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xl font-sans">
                  {activeTopic.description}
                </p>
              </div>

              {/* Lesson Card Explanation Body */}
              <div className="p-6 md:p-8 space-y-6">
                
                {/* 1. Explanatory Statement */}
                <div className="space-y-2">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500" /> Concept Explanation
                  </h3>
                  <div className="p-4 bg-blue-50/20 border border-blue-100/50 rounded-2xl relative">
                    <p className="text-slate-700 text-sm md:text-base leading-relaxed font-sans">
                      {activeTopic.lessonContent.explanation}
                    </p>
                  </div>
                </div>

                {/* 2. Visual Examples Section */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" /> Visual Example Diagram
                  </h3>

                  <div className="bg-slate-50 border border-slate-200/50 p-5 rounded-3xl relative space-y-4">
                    <div className="text-xs">
                      <span className="font-extrabold text-indigo-700 uppercase tracking-wider block mb-1">
                        {activeTopic.lessonContent.visualExample?.title || "Step-by-step Sandbox"}
                      </span>
                      <p className="text-slate-500 text-xs">
                        {activeTopic.lessonContent.visualExample?.description}
                      </p>
                    </div>

                    {/* Rendering the dynamic visual object columns if defined (mainly addition/subtraction) */}
                    {activeTopic.lessonContent.visualExample?.items && (
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-4 bg-white rounded-2xl border border-slate-100">
                        {activeTopic.lessonContent.visualExample.items.map((item, idx) => {
                          const emoji = VISUAL_ICONS[item.icon as keyof typeof VISUAL_ICONS] || "⭐";
                          return (
                            <div key={idx} className="flex items-center gap-4">
                              {idx > 0 && (
                                <span className="text-2xl font-black text-slate-400 select-none">
                                  {activeTopic.id === "addition" ? "+" : "-"}
                                </span>
                              )}
                              <div className="text-center">
                                <div className="flex gap-1.5 justify-center flex-wrap max-w-[160px] p-2 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                  {Array.from({ length: item.count }).map((_, i) => (
                                    <span key={i} className="text-xl filter drop-shadow-sm leading-none">
                                      {emoji}
                                    </span>
                                  ))}
                                </div>
                                <span className="text-[10px] font-bold text-slate-500 block mt-1.5 uppercase font-mono">
                                  {item.label}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Perimeter visual outline rendering */}
                    {activeTopic.id === "perimeter" && (
                      <div className="flex justify-center py-6 bg-white rounded-2xl border border-slate-100">
                        <div className="relative w-44 h-28 border-4 border-indigo-600 bg-indigo-50/40 rounded-lg flex flex-col items-center justify-center shadow-inner">
                          <span className="absolute -top-6 font-mono font-bold text-xs text-indigo-700">6 meters (Length)</span>
                          <span className="absolute -right-16 font-mono font-bold text-xs text-indigo-700">4 m (Width)</span>
                          <span className="absolute -bottom-6 font-mono font-bold text-xs text-indigo-700">6 meters</span>
                          <span className="absolute -left-16 font-mono font-bold text-xs text-indigo-700">4 m</span>
                          <span className="text-xs font-semibold text-indigo-600 block px-2 py-0.5 bg-white border rounded">Rectangle</span>
                        </div>
                      </div>
                    )}

                    {/* Area grid rendering */}
                    {activeTopic.id === "area" && (
                      <div className="flex justify-center py-4 bg-white rounded-2xl border border-slate-100">
                        <div className="grid grid-cols-4 gap-1 p-2 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="w-10 h-10 bg-blue-500 text-white font-mono text-xs font-bold flex items-center justify-center rounded border border-blue-400 select-none shadow-xs">
                              {i + 1}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Probability marbles count rendering */}
                    {activeTopic.id === "probability" && (
                      <div className="flex justify-center py-6 bg-white rounded-2xl border border-slate-100">
                        <div className="w-32 h-32 rounded-b-full rounded-t-lg border-4 border-slate-400 bg-slate-100 p-4 flex flex-wrap gap-2 items-end justify-center relative shadow-inner">
                          <div className="absolute top-1 text-[10px] bg-slate-200 px-2 rounded-full font-bold">MARBLE JAR</div>
                          <span className="w-6 h-6 rounded-full bg-red-500 shadow animate-pulse"></span>
                          <span className="w-6 h-6 rounded-full bg-blue-500 shadow"></span>
                          <span className="w-6 h-6 rounded-full bg-red-500 shadow"></span>
                          <span className="w-6 h-6 rounded-full bg-blue-500 shadow"></span>
                          <span className="w-6 h-6 rounded-full bg-red-500 shadow"></span>
                        </div>
                      </div>
                    )}

                    <div className="p-3 bg-indigo-950 text-indigo-100 text-center rounded-2xl font-mono font-bold text-sm">
                      {activeTopic.lessonContent.visualExample?.equation || "Dynamic Formulas Enabled"}
                    </div>

                    {activeTopic.lessonContent.visualExample?.steps && (
                      <ol className="text-xs text-slate-600 space-y-1.5 list-decimal list-inside font-sans pl-2 leading-relaxed">
                        {activeTopic.lessonContent.visualExample.steps.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    )}
                  </div>
                </div>

                {/* 3. Bullet Points Summary */}
                <div className="space-y-2">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <ListTodo className="w-4 h-4 text-green-500" /> Key Lesson Points
                  </h3>
                  <ul className="text-slate-600 text-xs md:text-sm space-y-2 pl-4">
                    {activeTopic.lessonContent.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed font-sans">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4. Select Difficulty Levels for Quizzes */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block font-mono">Difficulty Level Selector</span>
                    <div className="flex gap-2 mt-1">
                      {["Beginner", "Intermediate", "Advanced"].map((level) => {
                        const isSel = selectedDifficulty === level;
                        return (
                          <button
                            key={level}
                            onClick={() => setSelectedDifficulty(level as DifficultyLevel)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${isSel ? "bg-amber-400 text-slate-900 shadow-md shadow-amber-400/10" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}
                          >
                            {level}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Practice Quiz launch button */}
                  <button
                    onClick={() => onLaunchQuiz(activeTopic)}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold px-6 py-4 rounded-2xl shadow-lg shadow-blue-500/10 hover:shadow-xl transition-all cursor-pointer text-sm sm:w-auto"
                  >
                    Practice Topic Quiz Now
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
