/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calculator, 
  BookOpen, 
  Languages, 
  Sparkles, 
  User, 
  Trophy, 
  Star, 
  Zap, 
  Award, 
  ChevronRight, 
  Play, 
  TrendingUp, 
  Clock, 
  Calendar,
  Layers,
  Sparkle,
  Settings,
  X,
  Plus,
  HelpCircle,
  GraduationCap
} from "lucide-react";
import { StudentProfile, ClassLevel, SubjectId, Topic } from "../types";
import { SUBJECTS, BADGES, ALL_TOPICS } from "../data/learningContent";

interface DashboardProps {
  studentProfile: StudentProfile;
  onChangeProfile: (updated: Partial<StudentProfile>) => void;
  onNavigateToSubject: (subjectId: SubjectId) => void;
  onNavigateToTopic: (topic: Topic) => void;
}

export default function Dashboard({ studentProfile, onChangeProfile, onNavigateToSubject, onNavigateToTopic }: DashboardProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(studentProfile.name);
  const [tempLevel, setTempLevel] = useState<ClassLevel>(studentProfile.level);

  const levelsList: ClassLevel[] = [
    "KG",
    "Primary 1",
    "Primary 2",
    "Primary 3",
    "Primary 4",
    "Primary 5",
    "Primary 6",
    "JHS 1",
    "JHS 2",
    "JHS 3"
  ];

  const handleUpdateProfile = () => {
    onChangeProfile({
      name: tempName || studentProfile.name,
      level: tempLevel
    });
    setIsEditingName(false);
  };

  const getSubjectIconComponent = (subjectId: SubjectId) => {
    switch (subjectId) {
      case "math": return <Calculator className="w-6 h-6" />;
      case "english": return <BookOpen className="w-6 h-6" />;
      case "french": return <Languages className="w-6 h-6" />;
      case "science": return <Sparkles className="w-6 h-6" />;
      default: return <BookOpen className="w-6 h-6" />;
    }
  };

  // Determine continue learning shortcut topic
  const getContinueLearningTopic = (): Topic => {
    if (studentProfile.lastActiveTopicId) {
      const topic = ALL_TOPICS.find(t => t.id === studentProfile.lastActiveTopicId);
      if (topic) return topic;
    }
    // Fallback: first topic that matches student level
    const matches = ALL_TOPICS.filter(t => t.levels.includes(studentProfile.level));
    return matches.length > 0 ? matches[0] : ALL_TOPICS[0];
  };

  const continueTopic = getContinueLearningTopic();

  // Calculate generic subject complete score percentage based on sum of completed quizzes
  const getSubjectProgress = (subjectId: SubjectId) => {
    const subjectTopics = ALL_TOPICS.filter(t => t.subjectId === subjectId);
    let completedCount = 0;
    subjectTopics.forEach(t => {
      if (studentProfile.completedQuizzes[t.id] !== undefined) {
        completedCount++;
      }
    });
    if (subjectTopics.length === 0) return 0;
    return Math.round((completedCount / subjectTopics.length) * 100);
  };

  const currentLevelProgressPercent = Math.min(100, Math.round((studentProfile.xp % 300) / 3));

  const getCurrentLevelRank = () => {
    const levelNumber = Math.floor(studentProfile.xp / 300) + 1;
    return levelNumber;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Dashboard container grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 8 Columns: Profile, Subject Cards, Continue, Daily Challenge */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Student Profile Widget Row */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center md:items-start justify-between gap-6 relative overflow-hidden text-left"
          >
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-col md:flex-row items-center gap-5 relative z-10 w-full md:w-auto">
              <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl shadow-md border-2 border-white select-none shrink-0 text-white">
                👦
              </div>
              
              <div className="space-y-1.5 text-center md:text-left w-full">
                {isEditingName ? (
                  <div className="space-y-2 max-w-sm">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input 
                        type="text" 
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                        placeholder="Student name"
                      />
                      <select
                        value={tempLevel}
                        onChange={(e) => setTempLevel(e.target.value as ClassLevel)}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none"
                      >
                        {levelsList.map(lvl => (
                          <option key={lvl} value={lvl}>{lvl}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={handleUpdateProfile}
                        className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                      >
                        Save
                      </button>
                      <button 
                        onClick={() => setIsEditingName(false)}
                        className="bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                      <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 font-heading">
                        Welcome, {studentProfile.name}!
                      </h2>
                      <button 
                        onClick={() => setIsEditingName(true)}
                        className="p-1 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-all"
                        title="Edit name or grade level"
                      >
                        <Settings className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                      <span className="font-extrabold text-xs text-[#2D6CDF] bg-[#2D6CDF]/10 border border-[#2D6CDF]/20 px-3 py-0.5 rounded-full font-mono">
                        {studentProfile.level} Active
                      </span>
                      <span className="text-xs text-slate-400">• Rank Level {getCurrentLevelRank()}</span>
                    </div>
                  </div>
                )}

                {/* Rank indicator progress bar */}
                <div className="pt-2 max-w-sm w-full md:w-[260px]">
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold mb-1 font-mono">
                    <span>Rank Level {getCurrentLevelRank()} XP</span>
                    <span>{studentProfile.xp % 300} / 300 XP</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#2D6CDF] rounded-full transition-all duration-300"
                      style={{ width: `${currentLevelProgressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics (Stars, XP, Steak) */}
            <div className="flex items-center gap-3 shrink-0 bg-slate-50 p-4 border border-slate-100 rounded-2xl w-full md:w-auto justify-around">
              <div className="text-center px-2 font-sans">
                <div className="flex items-center gap-1 text-[#F1C40F] font-bold justify-center">
                  <Star className="w-4 h-4 fill-[#F1C40F]" />
                  <span className="text-base font-extrabold">{studentProfile.stars}</span>
                </div>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Stars</span>
              </div>
              <div className="h-6 w-px bg-slate-200"></div>
              
              <div className="text-center px-2 font-sans">
                <div className="flex items-center gap-1 text-[#2D6CDF] font-bold justify-center">
                  <Zap className="w-4 h-4 fill-[#2D6CDF]/30" />
                  <span className="text-base font-extrabold">{studentProfile.xp}</span>
                </div>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total XP</span>
              </div>
              <div className="h-6 w-px bg-slate-200"></div>

              <div className="text-center px-2 font-sans">
                <div className="flex items-center gap-1 text-rose-500 font-bold justify-center">
                  <Calendar className="w-4 h-4" />
                  <span className="text-base font-extrabold">{studentProfile.streakDays}d</span>
                </div>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Streak</span>
              </div>
            </div>
          </motion.div>

          {/* Continue Learning shortcuts */}
          <div className="bg-gradient-to-r from-[#F1C40F] to-[#E67E22] p-6 rounded-3xl text-slate-900 border border-[#F1C40F]/30 shadow-lg relative overflow-hidden text-left flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            <div className="absolute right-0 top-0 -mr-12 -mt-12 w-44 h-44 bg-white/15 rounded-full blur-2xl"></div>
            <div className="space-y-1 z-10">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#2C3E50] bg-white/35 px-2.5 py-0.5 rounded-full select-none inline-block">
                Continue Learning Track
              </span>
              <h3 className="text-lg md:text-xl font-black font-heading tracking-tight mt-1 text-[#2C3E50]">
                {continueTopic.name}
              </h3>
              <p className="text-xs text-[#2C3E50]/90 leading-normal font-sans max-w-md font-medium">
                Pick up immediately where you left off on {continueTopic.subjectId.toUpperCase()}: "{continueTopic.description}"
              </p>
            </div>
            
            <button 
              onClick={() => onNavigateToTopic(continueTopic)}
              className="bg-[#2C3E50] font-bold text-white px-5 py-3.5 rounded-xl border border-[#2C3E50] transition-all text-xs flex items-center gap-2 hover:bg-[#34495E] shrink-0 shadow-md transform hover:-translate-y-0.5"
            >
              Get Studying
              <ChevronRight className="w-4 h-4 text-[#F1C40F]" />
            </button>
          </div>

          {/* Subject Board Cards Grid */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 font-heading text-left flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-500" /> Study Subjects Program
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SUBJECTS.map((sub) => {
                const progressVal = getSubjectProgress(sub.id);
                const hasPractice = progressVal > 0;
                
                return (
                  <div
                    key={sub.id}
                    onClick={() => onNavigateToSubject(sub.id)}
                    className={`bg-white rounded-2xl p-5 border border-slate-100 shadow-xs hover:border-slate-300 transition-all cursor-pointer text-left flex flex-col justify-between`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-xl ${sub.bannerColor} text-white shadow-inner`}>
                          {getSubjectIconComponent(sub.id)}
                        </div>
                        <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-md font-mono">
                          {sub.id === "math" ? "9 Chapters" : sub.id === "french" ? "2 Chapters" : "2 Chapters"}
                        </span>
                      </div>
                      
                      <div>
                        <h4 className="font-extrabold text-base text-slate-800 font-heading mt-1">{sub.name}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-sans">{sub.description}</p>
                      </div>
                    </div>

                    {/* Progress slider bar or status indicator */}
                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <div className="flex justify-between text-[10px] text-slate-400 font-bold mb-1 font-mono">
                          <span>QUIZZES PASSED</span>
                          <span className={progressVal > 0 ? "text-green-600 font-extrabold" : "text-slate-400"}>
                            {progressVal}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${progressVal === 100 ? "bg-green-500" : "bg-blue-500"}`}
                            style={{ width: `${progressVal}%` }}
                          />
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-slate-400 grow-0 shrink-0" />
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right 4 Columns: Daily Challenge & Gamification Achievements Cabinet */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Daily Challenge Widget */}
          <div className="bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 shadow-md text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
            
            <div className="flex items-center gap-1.5 bg-blue-500/15 border border-blue-500/20 text-blue-400 font-semibold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full w-fit mb-3">
              <Sparkle className="w-3.5 h-3.5 animate-spin" /> Daily Challenge Widget
            </div>

            <h3 className="text-base font-extrabold font-heading text-white">The Solar System Challenge!</h3>
            <p className="text-xs text-slate-400 leading-normal font-sans mt-1 mb-4">
              Test your cosmic space knowledge by passing the Solar System chapter quiz correctly today!
            </p>

            <div className="p-3 bg-slate-800 rounded-2xl border border-slate-700/50 mb-4 flex items-center justify-between text-xs font-mono font-bold text-amber-300">
              <span className="flex items-center gap-1 text-slate-300 font-sans">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-300" /> Reward:
              </span>
              <span>+50 XP & Stars Booster</span>
            </div>

            <button 
              onClick={() => {
                const ssTopic = ALL_TOPICS.find(t => t.id === "solar_system");
                if (ssTopic) onNavigateToTopic(ssTopic);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1"
            >
              Start Daily Quest <Play className="w-3 h-3 fill-current" />
            </button>
          </div>

          {/* Achievements badge cabinet */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs text-left">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4.5 h-4.5 text-blue-500" /> Badges Cabinet
              </h3>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md font-mono">
                {studentProfile.unlockedBadgeIds.length} / {BADGES.length}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {BADGES.map((badge) => {
                const isUnlocked = studentProfile.unlockedBadgeIds.includes(badge.id);

                return (
                  <div
                    key={badge.id}
                    className={`p-3 rounded-2xl border text-center relative flex flex-col items-center justify-between transition-all group ${isUnlocked ? "bg-white border-slate-200/60 shadow-xs" : "bg-slate-50/50 border-slate-100 opacity-60"}`}
                  >
                    {/* Locked overlay lock icon */}
                    {!isUnlocked && (
                      <span className="absolute top-1.5 right-1.5 text-[10px] select-none" title="Badge currently locked. Complete requirement.">
                        🔒
                      </span>
                    )}

                    <span className="text-3xl mb-1 filter drop-shadow-xs select-none">
                      {badge.title === "First Steps" ? "👤" :
                       badge.title === "Quiz Explorer" ? "📋" :
                       badge.title === "Perfect Brainstar" ? "⭐" :
                       badge.title === "Math Prodigy" ? "🧮" :
                       badge.title === "Global Scholar" ? "🌐" : "🚀"}
                    </span>

                    <h4 className="font-extrabold text-[11px] text-slate-800 leading-tight mb-0.5">
                      {badge.title}
                    </h4>

                    <span className="text-[8px] text-slate-400 font-sans block max-w-[100px] leading-normal text-center h-[24px] overflow-hidden overflow-ellipsis line-clamp-2">
                      {isUnlocked ? badge.description : badge.requirement}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
