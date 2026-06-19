/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Languages, 
  Sparkles, 
  CheckCircle, 
  ListTodo, 
  ChevronRight, 
  Smile, 
  Users, 
  Heart, 
  Activity, 
  GraduationCap,
  Globe,
  Play,
  Tv
} from "lucide-react";
import { Topic, SubjectId, DifficultyLevel, StudentProfile } from "../types";
import { ENGLISH_TOPICS, FRENCH_TOPICS, SCIENCE_TOPICS, SUBJECTS } from "../data/learningContent";
import VideoTutorialPlayer from "./VideoTutorialPlayer";

interface SubjectSectionProps {
  subjectId: "english" | "french" | "science";
  studentProfile: StudentProfile;
  onLaunchQuiz: (topic: Topic) => void;
  audioEnabled: boolean;
}

export default function SubjectSection({ subjectId, studentProfile, onLaunchQuiz, audioEnabled }: SubjectSectionProps) {
  // Translate profile levels KG-JHS into matching default filters
  const getProfileFilterCategory = (level: string): "all" | "kg" | "primary" | "jhs" => {
    if (["KG", "Primary 1", "Primary 2"].includes(level)) return "kg";
    if (["Primary 3", "Primary 4", "Primary 5", "Primary 6"].includes(level)) return "primary";
    if (["JHS 1", "JHS 2", "JHS 3"].includes(level)) return "jhs";
    return "all";
  };

  const [gradeFilter, setGradeFilter] = useState<"all" | "kg" | "primary" | "jhs">(
    getProfileFilterCategory(studentProfile.level)
  );
  
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>("Beginner");

  const activeSubject = SUBJECTS.find(s => s.id === subjectId) || SUBJECTS[1];

  const getFilterBtnColor = () => {
    switch (subjectId) {
      case "english": return "bg-green-600 text-white shadow-green-500/10";
      case "french": return "bg-amber-500 text-slate-900 shadow-amber-400/20";
      case "science": return "bg-purple-600 text-white shadow-purple-500/20";
      default: return "bg-indigo-600 text-white shadow-indigo-500/10";
    }
  };

  const getActiveTopicStyle = (isActive: boolean) => {
    if (!isActive) return "bg-white border-slate-100 hover:border-slate-300";
    switch (subjectId) {
      case "english": return "bg-green-50/40 border-green-300 ring-2 ring-green-100";
      case "french": return "bg-amber-50/40 border-amber-300 ring-2 ring-amber-100";
      case "science": return "bg-purple-50/40 border-purple-300 ring-2 ring-purple-100";
      default: return "bg-indigo-50/40 border-indigo-300 ring-2 ring-indigo-50";
    }
  };

  const getTopicIconProgressStyle = (isActive: boolean) => {
    if (isActive) {
      switch (subjectId) {
        case "english": return "bg-green-600 text-white";
        case "french": return "bg-amber-400 text-slate-900";
        case "science": return "bg-purple-600 text-white";
        default: return "bg-indigo-600 text-white";
      }
    }
    return "bg-slate-100 text-slate-600";
  };
  
  const getSubjectTopics = (): Topic[] => {
    if (subjectId === "english") return ENGLISH_TOPICS;
    if (subjectId === "french") return FRENCH_TOPICS;
    if (subjectId === "science") return SCIENCE_TOPICS;
    return [];
  };

  const rawTopics = getSubjectTopics();

  // Filter topics dynamically by the selected grade level range
  const getFilteredTopics = (): Topic[] => {
    return rawTopics.filter(topic => {
      if (gradeFilter === "all") return true;
      if (gradeFilter === "kg") {
        return topic.levels.includes("KG") || topic.levels.includes("Primary 1") || topic.levels.includes("Primary 2") || topic.levels.includes("Primary 3");
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
  const [selectedTopicId, setSelectedTopicId] = useState<string>("");

  // Guard activeTopic so it resolves beautifully
  const activeTopic = filteredTopics.find(t => t.id === selectedTopicId) || filteredTopics[0] || rawTopics[0];

  const getSubjectIcon = () => {
    switch (subjectId) {
      case "english": return <BookOpen className="w-8 h-8 text-white" />;
      case "french": return <Languages className="w-8 h-8 text-white" />;
      case "science": return <Sparkles className="w-8 h-8 text-white" />;
      default: return <BookOpen className="w-8 h-8 text-white" />;
    }
  };

  const renderVisualDecorations = () => {
    if (activeTopic.id === "french_greetings") {
      return (
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs text-center">
            <span className="text-3xl block">👋</span>
            <span className="font-bold text-slate-800 text-sm block mt-1">Bonjour!</span>
            <span className="text-[10px] text-slate-400 font-sans block">Hello / Good morning</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs text-center">
            <span className="text-3xl block">🤝</span>
            <span className="font-bold text-slate-800 text-sm block mt-1">Ça va?</span>
            <span className="text-[10px] text-slate-400 font-sans block">How are you?</span>
          </div>
        </div>
      );
    }

    if (activeTopic.id === "french_family") {
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
          <div className="bg-white p-3 rounded-xl border text-center">
            <span className="text-2xl">👨</span>
            <span className="text-xs font-bold block mt-1">Le père</span>
            <span className="text-[9px] text-slate-400">Father</span>
          </div>
          <div className="bg-white p-3 rounded-xl border text-center">
            <span className="text-2xl">👩</span>
            <span className="text-xs font-bold block mt-1">La mère</span>
            <span className="text-[9px] text-slate-400">Mother</span>
          </div>
          <div className="bg-white p-3 rounded-xl border text-center">
            <span className="text-2xl">👦</span>
            <span className="text-xs font-bold block mt-1">Le frère</span>
            <span className="text-[9px] text-slate-400">Brother</span>
          </div>
          <div className="bg-white p-3 rounded-xl border text-center">
            <span className="text-2xl">👧</span>
            <span className="text-xs font-bold block mt-1">La sœur</span>
            <span className="text-[9px] text-slate-400">Sister</span>
          </div>
        </div>
      );
    }

    if (activeTopic.id === "living_things") {
      return (
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs text-center">
            <span className="text-2xl block">🌱🦁🧍</span>
            <span className="font-extrabold text-green-600 text-xs block mt-2">LIVING THINGS</span>
            <p className="text-[10px] text-slate-400 font-sans leading-normal mt-1">
              Need air, water, and food. They grow bigger and breathe every day!
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs text-center">
            <span className="text-2xl block">🪨🪑✏️</span>
            <span className="font-extrabold text-slate-500 text-xs block mt-2">NON-LIVING THINGS</span>
            <p className="text-[10px] text-slate-400 font-sans leading-normal mt-1">
              Do not need food. They do not grow, walk, or breathe.
            </p>
          </div>
        </div>
      );
    }

    if (activeTopic.id === "solar_system") {
      return (
        <div className="relative p-6 bg-slate-900 rounded-3xl overflow-hidden flex flex-col items-center justify-center border border-slate-800 text-center">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl"></div>
          <div className="flex items-center gap-1.5 md:gap-3 flex-wrap justify-center py-4 z-10 text-white font-playful">
            <span className="text-xl">☀️</span>
            <span className="text-slate-400">➔</span>
            <span className="px-2 py-0.5 bg-slate-800 text-slate-300 text-xs rounded border border-slate-700">Mercury ☿</span>
            <span className="text-slate-400">➔</span>
            <span className="px-2 py-0.5 bg-slate-800 text-slate-300 text-xs rounded border border-slate-700">Venus ♀</span>
            <span className="text-slate-400">➔</span>
            <span className="px-2 py-0.5 bg-indigo-600 text-white text-xs rounded border border-indigo-500">Earth 🌍</span>
            <span className="text-slate-400">➔</span>
            <span className="px-2 py-0.5 bg-slate-800 text-slate-300 text-xs rounded border border-slate-700">Mars ♂</span>
          </div>
          <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-widest mt-1">
            Standard orbit sequence from center
          </span>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Subject Header Banner */}
      <div className={`bg-gradient-to-r ${activeSubject.bannerColor} text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg mb-8`}>
        <div className="flex items-center gap-4 text-left">
          <div className="p-4 bg-white/10 rounded-2xl border border-white/20 shadow-inner">
            {getSubjectIcon()}
          </div>
          <div>
            <span className="text-xs uppercase bg-white/15 px-3 py-1 rounded-full font-bold">Subject Section</span>
            <h1 className="text-2xl md:text-3xl font-extrabold font-heading mt-1">{activeSubject.name}</h1>
            <p className="text-sm text-white/90 font-sans mt-0.5">
              {activeSubject.description}
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2 bg-slate-900/10 px-4 py-2.5 rounded-2xl border border-white/10">
          <GraduationCap className="w-5 h-5 text-amber-300" />
          <div className="text-left font-sans">
            <span className="text-[9px] text-white/70 block font-semibold">ACADEMIC PROGRAM</span>
            <span className="text-xs font-bold font-sans">KG to JHS3 Standards</span>
          </div>
        </div>
      </div>

      {/* Main topic outline selectors and lesson reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column list of topics */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xs text-left">
            <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-2">My Grade Level</h3>
            <span className="px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold rounded-lg inline-block mb-3">
              {studentProfile.level} active
            </span>

            <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-2">Filter Syllabus Level</h3>
            {/* Class/Grade segment buttons matching SubjectSection themes */}
            <div className="grid grid-cols-2 gap-1.5 text-[10px] font-sans">
              <button 
                onClick={() => { setGradeFilter("all"); setSelectedTopicId(""); }}
                className={`p-2 rounded-xl font-bold transition-all ${gradeFilter === "all" ? `${getFilterBtnColor()} shadow-md` : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}
              >
                All Levels
              </button>
              <button 
                onClick={() => { setGradeFilter("kg"); setSelectedTopicId(""); }}
                className={`p-2 rounded-xl font-bold transition-all ${gradeFilter === "kg" ? `${getFilterBtnColor()} shadow-md` : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}
              >
                KG - Primary 2
              </button>
              <button 
                onClick={() => { setGradeFilter("primary"); setSelectedTopicId(""); }}
                className={`p-2 rounded-xl font-bold transition-all ${gradeFilter === "primary" ? `${getFilterBtnColor()} shadow-md` : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}
              >
                Primary 3 - 6
              </button>
              <button 
                onClick={() => { setGradeFilter("jhs"); setSelectedTopicId(""); }}
                className={`p-2 rounded-xl font-bold transition-all ${gradeFilter === "jhs" ? `${getFilterBtnColor()} shadow-md` : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}
              >
                JHS 1 - JHS 3
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {filteredTopics.length === 0 ? (
              <div className="p-6 bg-white rounded-2xl border text-center text-xs text-slate-400">
                No topics in this grade range. Try switching levels!
              </div>
            ) : (
              filteredTopics.map((topic) => {
                const isActive = topic.id === selectedTopicId || (!selectedTopicId && filteredTopics[0]?.id === topic.id);
                const hasScore = studentProfile.completedQuizzes[topic.id] !== undefined;
                const score = studentProfile.completedQuizzes[topic.id] || 0;

                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopicId(topic.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${getActiveTopicStyle(isActive)}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl shrink-0 ${getTopicIconProgressStyle(isActive)}`}>
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-800 leading-tight">{topic.name}</h4>
                        <span className="text-[10px] text-slate-400 font-mono mt-0.5 block uppercase">
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
              })
            )}
          </div>
        </div>

        {/* Right column detailed display area */}
        <div className="lg:col-span-8">
          {activeTopic ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTopic.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden text-left"
              >
                
                {/* Header overview banner */}
                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-100">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-xs font-bold uppercase text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                      Interactive Lessons
                    </span>
                    <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 rounded font-mono">
                      {activeTopic.levels[0]}
                    </span>
                  </div>

                  <h2 className="text-2xl font-extrabold text-slate-800 font-heading leading-tight mb-2">
                    {activeTopic.name}
                  </h2>
                  <p className="text-slate-500 text-xs md:text-sm font-sans leading-relaxed">
                    {activeTopic.description}
                  </p>
                </div>

                {/* Main lesson content */}
                <div className="p-6 md:p-8 space-y-6">

                  {/* Collapsible Video walkthrough player */}
                  <div className="bg-slate-50 border border-slate-100 rounded-3xl p-4 flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2.5 bg-rose-100 text-rose-600 rounded-xl shrink-0">
                          <Tv className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-slate-800 leading-none">Smarty Owl's Video Tutorial</h4>
                          <span className="text-[10px] text-slate-400 font-medium block mt-1">Simulated classroom visual whiteboard walkthrough • 1 min</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowVideo(!showVideo)}
                        className={`text-xs font-bold px-4 py-2 rounded-xl border cursor-pointer transition-all ${
                          showVideo 
                            ? "bg-slate-200 text-slate-700 border-slate-300 hover:bg-slate-300" 
                            : "bg-[#2D6CDF] text-white border-[#2D6CDF] hover:bg-[#1E54B8] shadow-md shadow-[#2D6CDF]/10"
                        }`}
                      >
                        {showVideo ? "Hide Video Lesson" : "🎬 Play Video Tutorial"}
                      </button>
                    </div>

                    {showVideo && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <VideoTutorialPlayer topic={activeTopic} globalAudioEnabled={audioEnabled} />
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Explanation card */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-indigo-500" /> Interactive Study Guide
                    </h3>
                    <div className="p-4 bg-indigo-50/15 border border-indigo-100/50 rounded-2xl">
                      <p className="text-slate-700 text-sm md:text-base leading-relaxed font-sans">
                        {activeTopic.lessonContent.explanation}
                      </p>
                    </div>
                  </div>

                  {/* Aesthetic visual assistance decorations if available */}
                  {renderVisualDecorations()}

                  {/* Bullet points summary */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                      <ListTodo className="w-4 h-4 text-green-500" /> Key Takeaways
                    </h3>
                    <ul className="text-slate-600 text-xs md:text-sm space-y-2.5 pl-2 font-sans">
                      {activeTopic.lessonContent.keyPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 leading-relaxed">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom section matching difficulty path controller */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-left">
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block font-mono">My Current Progress</span>
                      <span className="text-xs text-slate-500">
                        {studentProfile.completedQuizzes[activeTopic.id] !== undefined ? "Passed with " + studentProfile.completedQuizzes[activeTopic.id] + "% score" : "Not attempted yet"}
                      </span>
                    </div>

                    <button
                      onClick={() => onLaunchQuiz(activeTopic)}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-md transition-all text-sm cursor-pointer"
                    >
                      Answer Study Challenge Quiz
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="p-8 text-center text-slate-400">
              Please select a topic to begin studying.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
