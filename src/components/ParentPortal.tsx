/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  MessageSquare, 
  Award, 
  Send, 
  Smile, 
  CheckCircle, 
  Clock, 
  ChevronRight,
  Sparkle
} from "lucide-react";
import { StudentProfile } from "../types";
import { SUBJECTS } from "../data/learningContent";

interface ParentPortalProps {
  studentProfile: StudentProfile;
}

interface Teacher {
  name: string;
  subject: string;
  avatar: string;
}

const TEACHERS: Teacher[] = [
  { name: "Grace Mensah", subject: "Mathematics Coordinator", avatar: "👩‍🏫" },
  { name: "Albert Osei", subject: "English & Writing Lead", avatar: "👨‍🏫" },
  { name: "Clarisse Dubois", subject: "French Language Specialist", avatar: "👩‍🌾" }
];

export default function ParentPortal({ studentProfile }: ParentPortalProps) {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher>(TEACHERS[0]);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<{ sender: "parent" | "teacher"; text: string; time: string }[]>([
    { sender: "teacher", text: "Hello! Kofi is showing great reasoning skills in Addition Quizzes. His speed is improving!", time: "09:12 AM" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Quick stats calculations
  const getCompletedLessonsCount = () => {
    return Object.keys(studentProfile.completedQuizzes).length;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg = message;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatLog((prev) => [...prev, { sender: "parent", text: userMsg, time: now }]);
    setMessage("");
    setIsTyping(true);

    // Simulate teacher reply after brief timeout
    setTimeout(() => {
      setIsTyping(false);
      setChatLog((prev) => [
        ...prev,
        { 
          sender: "teacher", 
          text: `Thank you for checking in on your child's progress! I am tracking their performance and will guide them through our secondary advanced syllabus chapters accordingly!`, 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }
      ]);
    }, 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 rounded-3xl text-left">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center lg:text-left mb-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-full inline-block mb-2">
               Parental Dashboard & Logs
            </span>
            <h1 className="text-3xl font-extrabold text-[#2C3E50] tracking-tight font-heading">
              Parent Portal
            </h1>
            <p className="text-slate-500 text-xs">
              Monitor, guide, and collaborate directly with teachers to secure {studentProfile.name}'s successful e-learning journey.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-3">
            <span className="text-3xl">👦</span>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">STUDENT IN VIEW</span>
              <span className="text-sm font-extrabold text-slate-800">{studentProfile.name}</span>
              <span className="text-[10px] block text-emerald-600 font-bold font-mono">{studentProfile.level} Class Track</span>
            </div>
          </div>
        </div>

        {/* Portal dashboard row of containers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (8 Columns): Analytics, Progress Reports, Attendance Log */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Simple Visual Stats Reports */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">📊</span>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase">Syllabus Progress</span>
                </div>
                <h3 className="text-2xl font-black text-slate-800">{getCompletedLessonsCount()} Chapters</h3>
                <p className="text-[10px] text-slate-400 leading-normal mt-1">Quiz modules attempted & completed successfully.</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <span className="p-2 bg-green-50 text-green-600 rounded-xl">🎯</span>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase">GPA Score Rank</span>
                </div>
                <h3 className="text-2xl font-black text-slate-800">Level {Math.floor(studentProfile.xp / 300) + 1}</h3>
                <p className="text-[10px] text-slate-400 leading-normal mt-1">Total points earned: {studentProfile.xp} XP / Stars: {studentProfile.stars}.</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <span className="p-2 bg-purple-50 text-purple-600 rounded-xl">📈</span>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase">Class Attendance</span>
                </div>
                <h3 className="text-2xl font-black text-emerald-600">98.4%</h3>
                <p className="text-[10px] text-slate-400 leading-normal mt-1">Present on 62 of 63 tracked curriculum days.</p>
              </div>
            </div>

            {/* Performance Analytics: Quiz score records */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-xs">
              <h2 className="text-lg font-extrabold text-[#2C3E50] mb-5 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" /> Syllabus Quiz Performance Analytics
              </h2>

              <div className="space-y-4">
                {SUBJECTS.map((sub) => {
                  let completedClassCount = 0;
                  let maxPercentScore = 0;

                  if (sub.id === "math") {
                    if (studentProfile.completedQuizzes["addition"]) { completedClassCount++; maxPercentScore = Math.max(maxPercentScore, studentProfile.completedQuizzes["addition"]); }
                    if (studentProfile.completedQuizzes["subtraction"]) { completedClassCount++; maxPercentScore = Math.max(maxPercentScore, studentProfile.completedQuizzes["subtraction"]); }
                    if (studentProfile.completedQuizzes["multiplication"]) { completedClassCount++; maxPercentScore = Math.max(maxPercentScore, studentProfile.completedQuizzes["multiplication"]); }
                  } else if (sub.id === "english") {
                    if (studentProfile.completedQuizzes["nouns_verbs"]) { completedClassCount++; maxPercentScore = Math.max(maxPercentScore, studentProfile.completedQuizzes["nouns_verbs"]); }
                  } else if (sub.id === "french") {
                    if (studentProfile.completedQuizzes["french_greetings"]) { completedClassCount++; maxPercentScore = Math.max(maxPercentScore, studentProfile.completedQuizzes["french_greetings"]); }
                  } else if (sub.id === "science") {
                    if (studentProfile.completedQuizzes["living_things"]) { completedClassCount++; maxPercentScore = Math.max(maxPercentScore, studentProfile.completedQuizzes["living_things"]); }
                    if (studentProfile.completedQuizzes["solar_system"]) { completedClassCount++; maxPercentScore = Math.max(maxPercentScore, studentProfile.completedQuizzes["solar_system"]); }
                  }

                  return (
                    <div key={sub.id} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold font-sans text-slate-700">
                        <span className="flex items-center gap-1.5">
                          <span className={`${sub.bannerColor} text-white w-2.5 h-2.5 rounded-full inline-block`}></span>
                          {sub.name} Quiz Record
                        </span>
                        <span className="text-slate-400 text-[10px] font-mono">
                          {completedClassCount ? `HIGH SCORE: ${maxPercentScore}%` : "No quizzes submitted yet"}
                        </span>
                      </div>

                      {/* Pure pure CSS visual bar comparison chart */}
                      <div className="h-4 w-full bg-slate-100 rounded-xl overflow-hidden relative">
                        <div 
                          className={`h-full ${sub.bannerColor} transition-all duration-500`}
                          style={{ width: `${completedClassCount ? Math.max(30, maxPercentScore) : 0}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Attendance tracking interactive calendar block */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-xs">
              <h2 className="text-lg font-extrabold text-[#2C3E50] mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-500" /> Lesson Activity Calendar Tracker
              </h2>
              <p className="text-xs text-slate-500 leading-normal mb-5">
                Displays active system calendar days. Green days indicate student logged in and scored XP. Blue days indicate excused weekend.
              </p>

              {/* Sample Month calendar display */}
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-sans">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                  <span key={day} className="text-slate-400 font-extrabold text-[10px] uppercase py-1">{day}</span>
                ))}
                
                {/* 28 empty spaces/days to represent monthly calendar layout */}
                {Array.from({ length: 28 }).map((_, idx) => {
                  const dayNum = idx + 1;
                  let colorClass = "bg-green-100 text-green-700 border-green-200 font-extrabold"; // Default: present
                  let label = "Present - Studied";

                  if (dayNum === 4 || dayNum === 18) {
                    colorClass = "bg-slate-50 border-slate-200 text-slate-300 font-medium";
                    label = "Unexcused Absence";
                  } else if ([6, 7, 13, 14, 20, 21, 27, 28].includes(dayNum)) {
                    colorClass = "bg-blue-50 border-blue-100 text-blue-500 font-semibold";
                    label = "Excused Weekend Recess";
                  }

                  return (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl border text-[11px] font-mono tracking-tight cursor-default relative group ${colorClass}`}
                      title={label}
                    >
                      {dayNum}
                      
                      {/* Hover Tooltip tooltip */}
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] py-1 px-2 rounded-md hidden group-hover:block whitespace-nowrap z-30 shadow-md">
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column (4 Columns): Direct Teacher Chat portal */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-3xl border border-slate-200/60 p-5 shadow-xs flex flex-col h-[520px] justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-1.5 border-b border-slate-100 pb-3">
                  <MessageSquare className="w-4.5 h-4.5 text-blue-500" /> Teacher Consultation
                </h3>

                {/* Teacher select list */}
                <span className="text-[10px] font-bold text-slate-400 block mb-2 uppercase.">CHOOSE TEACHER:</span>
                <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                  {TEACHERS.map((teacher) => (
                    <button
                      key={teacher.name}
                      onClick={() => {
                        setSelectedTeacher(teacher);
                        setChatLog([
                          { sender: "teacher", text: `Hello! I am ${teacher.name}, coordinating ${teacher.subject}. How can I assist with your child's weekly chapters?`, time: "09:00 AM" }
                        ]);
                      }}
                      className={`p-2 rounded-xl border text-left flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
                        selectedTeacher.name === teacher.name
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span className="text-xl">{teacher.avatar}</span>
                      <div>
                        <span className="text-[10px] font-extrabold block leading-tight">{teacher.name.split(" ")[0]}</span>
                        <span className="text-[8px] text-slate-400 block -mt-0.5">{teacher.name.split(" ")[1]}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Chat screen displays log */}
                <div className="h-[210px] overflow-y-auto bg-slate-50 border border-slate-200/80 p-3 rounded-2xl space-y-3 shadow-inner">
                  {chatLog.map((chat, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col max-w-[85%] ${
                        chat.sender === "parent" ? "ml-auto items-end" : "mr-auto items-start"
                      }`}
                    >
                      <div className={`p-2.5 rounded-2xl text-xs leading-normal ${
                        chat.sender === "parent"
                          ? "bg-[#2D6CDF] text-white rounded-tr-none"
                          : "bg-white text-slate-700 border border-slate-200 rounded-tl-none shadow-3xs"
                      }`}>
                        {chat.text}
                      </div>
                      <span className="text-[8px] text-slate-400 font-mono mt-0.5 px-1">{chat.time}</span>
                    </div>
                  ))}

                  {/* Typing simulated indicator */}
                  {isTyping && (
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 bg-white p-2 rounded-xl w-fit border shadow-3xs">
                      <span className="animate-bounce">●</span>
                      <span className="animate-bounce [animation-delay:0.2s]">●</span>
                      <span className="animate-bounce [animation-delay:0.4s]">●</span>
                      <span className="font-sans italic">{selectedTeacher.name} typing...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Message composer input */}
              <form onSubmit={handleSendMessage} className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Reply to ${selectedTeacher.name.split(" ")[0]}...`}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-[#2D6CDF] focus:bg-white text-slate-700"
                />
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white p-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
