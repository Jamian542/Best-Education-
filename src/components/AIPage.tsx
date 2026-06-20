/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  MessageSquare, 
  HelpCircle, 
  BookOpen, 
  Calendar, 
  Send, 
  GraduationCap, 
  CheckCircle, 
  Star, 
  Zap, 
  Check, 
  Brain, 
  TrendingUp, 
  FileText,
  Clock,
  ArrowRight,
  Loader2
} from "lucide-react";
import { StudentProfile, SubjectId } from "../types";

interface AIPageProps {
  studentProfile: StudentProfile;
}

export default function AIPage({ studentProfile }: AIPageProps) {
  const [activeSubTab, setActiveSubTab] = useState<"tutor" | "helper" | "qgen" | "planner" | "essay">("tutor");
  
  // AI Tutor / Chatbot state
  const [tutorMessage, setTutorMessage] = useState("");
  const [tutorChat, setTutorChat] = useState<{ sender: "user" | "ai"; text: string }[]>([
    { sender: "ai", text: `Hello ${studentProfile.name}! I am your Best Education AI Tutor 🦉. Ask me any study question from Addition up to Solar system, and I will explain it with fun examples!` }
  ]);
  const [tutorLoading, setTutorLoading] = useState(false);

  // Homework Helper state
  const [homeworkInput, setHomeworkInput] = useState("");
  const [homeworkStatus, setHomeworkStatus] = useState<string | null>(null);
  
  // Question Generator state
  const [qgenSubject, setQgenSubject] = useState<SubjectId>("math");
  const [generatedQuestion, setGeneratedQuestion] = useState<{ q: string; opt: string[]; ans: string; exp: string } | null>(null);
  const [qgenLoading, setQgenLoading] = useState(false);
  const [selectedUserAnswer, setSelectedUserAnswer] = useState<string | null>(null);

  // Study Planner state
  const [dailyMinutes, setDailyMinutes] = useState(30);
  const [plannerGoal, setPlannerGoal] = useState("");
  const [generatedPlan, setGeneratedPlan] = useState<{ day: string; task: string; duration: number }[] | null>(null);

  // Essay feedback state
  const [essayContent, setEssayContent] = useState("");
  const [essayReport, setEssayReport] = useState<{ score: string; grammar: string; vocabulary: string; suggestion: string } | null>(null);
  const [essayLoading, setEssayLoading] = useState(false);

  // Math study suggestions recommendations based on Class Level
  const getPersonalizedRecommendations = () => {
    const isKG = ["KG", "Primary 1", "Primary 2"].includes(studentProfile.level);
    if (isKG) {
      return [
        { title: "Visual Counter Quest", desc: "Interactive objects and shapes help you count addition steps up to 10 easily.", subject: "math" },
        { title: "English: Letters & Sounds", desc: "Learn how to match primary spelling sounds with fun animal letters.", subject: "english" }
      ];
    } else {
      return [
        { title: "JHS Cosmical Solar Planets", desc: "Trace sizes of orbits and analyze hot gas masses comparison.", subject: "science" },
        { title: "French Greetings dialogue simulation", desc: "Speak and select friendly salutations correctly during roleplays.", subject: "french" }
      ];
    }
  };

  const currentLevelRecommendations = getPersonalizedRecommendations();

  // AI Actions Mock simulations
  const handleTutorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorMessage.trim()) return;

    const query = tutorMessage;
    setTutorChat((prev) => [...prev, { sender: "user", text: query }]);
    setTutorMessage("");
    setTutorLoading(true);

    setTimeout(() => {
      setTutorLoading(false);
      let reply = "That's a very intelligent inquiry! Let me break it down step-by-step: \n\n1. In e-learning, practicing consistent chapter repetitions boosts your brain memory. \n2. Try testing your knowledge using our practice Quizzes.\n3. Keep earning Star badges for total mastery!";
      
      const lq = query.toLowerCase();
      if (lq.includes("add") || lq.includes("+")) {
        reply = "Addition is just bringing sets of things together! Imagine you have 3 juicy 🍎 apples, and I give you 2 more 🍎 🍎. You group them all in one basket and count: 1, 2, 3, 4, 5! So, 3 + 2 = 5! Isn't that super simple?";
      } else if (lq.includes("planet") || lq.includes("solar") || lq.includes("earth")) {
        reply = "Our Solar System is a cosmic neighborhood! At the center sits our Sun ☀️. Orbiting around it are 8 different planets. Mercury is closest, Venus is hottest, Earth is where we live, Mars is rocky and red, and Jupiter is the giant leader!";
      } else if (lq.includes("french") || lq.includes("greeting")) {
        reply = "Greetings are super friendly! In French, to say 'Hello' or 'Good Day', we declare 'Bonjour' (sounds like bon-zhoor!). To inquire 'How are you?', ask 'Comment ça va?'. Keep practicing with our French tab!";
      }

      setTutorChat((prev) => [...prev, { sender: "ai", text: reply }]);
    }, 1500);
  };

  const handleHomeworkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!homeworkInput.trim()) return;

    setHomeworkStatus("Analyzing and structuring solution steps...");
    setTimeout(() => {
      setHomeworkStatus(`Homework Helper Analysis:
• Goal: Understand and solve "${homeworkInput}"
• Recommendation: Start by identifying the primary factors (e.g. key words, noun parts, numeric variables).
• Step 1: Write down what you have (the starting set or sentence structure).
• Step 2: Use inverse operation tests (e.g., if checking division, test with multiplication: if 15 ÷ 3 = ?, check what times 3 is 15 -> 5!).
• Step 3: Write out your complete concluding sentence clearly. Great job!`);
    }, 1200);
  };

  const handleGenerateQuestion = () => {
    setQgenLoading(true);
    setGeneratedQuestion(null);
    setSelectedUserAnswer(null);

    setTimeout(() => {
      setQgenLoading(false);
      if (qgenSubject === "math") {
        setGeneratedQuestion({
          q: "Ama had 6 candy stars. Kwame took 2 away. How many candy stars does Ama have remaining?",
          opt: ["3 stars", "4 stars", "8 stars", "6 stars"],
          ans: "4 stars",
          exp: "Subtraction fun! Take 2 away from 6 to get 4 stars remaining. (6 - 2 = 4)"
        });
      } else if (qgenSubject === "science") {
        setGeneratedQuestion({
          q: "Which characteristic makes a puppy a living thing, unlike a metal laptop?",
          opt: ["It is heavy", "It can grow and breathe", "It can shine in the dark", "It can roll on wheels"],
          ans: "It can grow and breathe",
          exp: "Living things consume food, breathe oxygen, and grow over time, whereas non-living items do not!"
        });
      } else {
        setGeneratedQuestion({
          q: "How do you reply 'I am doing well, thank you!' in French?",
          opt: ["Bonjour!", "Ça va bien, merci!", "Au revoir", "Mon père"],
          ans: "Ça va bien, merci!",
          exp: "'Ça va bien' means doing well, and 'merci' is thank you!"
        });
      }
    }, 1200);
  };

  const handleGeneratePlan = (e: React.FormEvent) => {
    e.preventDefault();
    const plan = [
      { day: "Monday - Day 1", task: `Learn ${studentProfile.level} basic lesson introductions.`, duration: dailyMinutes },
      { day: "Tuesday - Day 2", task: "Solve the basic Quiz and analyze custom browser explanations.", duration: dailyMinutes },
      { day: "Wednesday - Day 3", task: "Review visual counting matrices or spelling rules.", duration: dailyMinutes },
      { day: "Thursday - Day 4", task: "Test advanced difficulty topics with parents.", duration: dailyMinutes },
      { day: "Friday - Day 5", task: "Log in, claim streak XP, and collect unlocked badges!", duration: dailyMinutes }
    ];
    setGeneratedPlan(plan);
  };

  const handleEvaluateEssay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!essayContent.trim()) return;

    setEssayLoading(true);
    setEssayReport(null);

    setTimeout(() => {
      setEssayLoading(false);
      
      const length = essayContent.split(" ").length;
      let scoreGroup = "90 / 100 (Excellent work)";
      let grammarRemarks = "Wonderful sentence alignment! Verb tense agreements are consistent and complete.";
      let vocabRemarks = "Integrated high-value adjectives beautifully (e.g. golden, bright).";
      let suggestionBox = "Consider inserting transitional descriptors like 'Furthermore' or 'Consequently' to level up paragraphs.";

      if (length < 10) {
        scoreGroup = "60 / 100 (Keep writing)";
        grammarRemarks = "Sentence is quite short. Try expanding Nouns and Verbs.";
        vocabRemarks = "Basic word selection. Add descriptive adjectives.";
        suggestionBox = "Practice writing at least 3 sentences describing Ama's school day.";
      }

      setEssayReport({
        score: scoreGroup,
        grammar: grammarRemarks,
        vocabulary: vocabRemarks,
        suggestion: suggestionBox
      });
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 rounded-3xl text-left">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center lg:text-left mb-8 flex flex-col lg:flex-row justify-between items-center gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#2D6CDF] bg-[#2D6CDF]/10 px-3.5 py-1.5 rounded-full inline-block mb-3.5 flex items-center gap-1.5 w-fit">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" /> AI Tutor companion
            </span>
            <h1 className="text-3xl font-extrabold text-[#2C3E50] tracking-tight font-heading">
              Best Education AI Hub
            </h1>
            <p className="text-slate-500 text-xs">
              Syllabus homework assistant, custom educational planners, question generators, and real-time smart evaluations.
            </p>
          </div>

          {/* Quick recommendations panel indicator */}
          <div className="bg-blue-600 text-white px-5 py-3 rounded-2xl flex items-center gap-3 shadow-md border border-blue-500">
            <span className="text-2xl animate-pulse">🦉</span>
            <div className="text-xs">
              <span className="font-bold block">Smarty Owl Recommends:</span>
              <span className="text-[10px] text-blue-200">Practice quizzes matching class {studentProfile.level}!</span>
            </div>
          </div>
        </div>

        {/* AI Portal Sub-Navigation Tabs */}
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200/80 shadow-3xs overflow-x-auto mb-8 whitespace-nowrap">
          <button
            onClick={() => setActiveSubTab("tutor")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold cursor-pointer transition-all ${
              activeSubTab === "tutor" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <MessageSquare className="w-4 h-4 text-[#F1C40F]" />
            <span>AI Tutor Chatbot</span>
          </button>

          <button
            onClick={() => setActiveSubTab("helper")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold cursor-pointer transition-all ${
              activeSubTab === "helper" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Brain className="w-4 h-4 text-purple-500" />
            <span>Homework Helper</span>
          </button>

          <button
            onClick={() => setActiveSubTab("qgen")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold cursor-pointer transition-all ${
              activeSubTab === "qgen" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <HelpCircle className="w-4 h-4 text-green-500" />
            <span>Question Generator</span>
          </button>

          <button
            onClick={() => setActiveSubTab("planner")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold cursor-pointer transition-all ${
              activeSubTab === "planner" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Calendar className="w-4 h-4 text-blue-500" />
            <span>Digital Study Planner</span>
          </button>

          <button
            onClick={() => setActiveSubTab("essay")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold cursor-pointer transition-all ${
              activeSubTab === "essay" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <FileText className="w-4 h-4 text-rose-500" />
            <span>Essay Feedback</span>
          </button>
        </div>

        {/* Major split structural blocks: Left forms / Right recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block (8 Columns): Active Sub-Tab View */}
          <div className="lg:col-span-8">
            
            <AnimatePresence mode="wait">
              
              {/* TUTOR CHATBOT */}
              {activeSubTab === "tutor" && (
                <motion.div
                  key="ai_tutor"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="bg-white rounded-3xl border border-slate-200/60 shadow-xs p-6 space-y-4"
                >
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <span className="text-2xl">🦉</span>
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-800">Ask Smarty Owl anything!</h3>
                      <p className="text-[10px] text-slate-400">Type queries like "Explain addition" or "Tell me about the Sun"</p>
                    </div>
                  </div>

                  {/* Chat screen displays log */}
                  <div className="h-[280px] overflow-y-auto bg-slate-50 border border-slate-200/80 p-4 rounded-2xl space-y-4 shadow-inner">
                    {tutorChat.map((chat, idx) => (
                      <div
                        key={idx}
                        className={`flex gap-3 max-w-[85%] ${
                          chat.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-lg shadow-sm border bg-white select-none">
                          {chat.sender === "user" ? "👤" : "🦉"}
                        </div>
                        <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                          chat.sender === "user"
                            ? "bg-[#2D6CDF] text-white rounded-tr-none"
                            : "bg-white text-slate-700 border border-slate-200 rounded-tl-none whitespace-pre-wrap shadow-3xs"
                        }`}>
                          {chat.text}
                        </div>
                      </div>
                    ))}

                    {/* Chat loading state helper */}
                    {tutorLoading && (
                      <div className="flex gap-2 bg-white px-3 py-2 border rounded-xl w-fit text-slate-400 text-[10px] animate-pulse">
                        <span className="animate-spin">🌀</span> Smarty Owl is writing explanations for you...
                      </div>
                    )}
                  </div>

                  {/* Input form */}
                  <form onSubmit={handleTutorSubmit} className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={tutorMessage}
                      onChange={(e) => setTutorMessage(e.target.value)}
                      placeholder="e.g. What is 5 + 3? or Why is Mars a red planet?"
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-[#2D6CDF] focus:bg-white text-slate-800"
                    />
                    <button
                      type="submit"
                      className="bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-2xl cursor-pointer transition-all shadow-md shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </motion.div>
              )}

              {/* HOMEWORK HELPER */}
              {activeSubTab === "helper" && (
                <motion.div
                  key="ai_helper"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="bg-white rounded-3xl border border-slate-200/60 shadow-xs p-6 space-y-5"
                >
                  <div className="space-y-1">
                    <h2 className="text-lg font-extrabold text-[#2C3E50]">Homework Guide Helper</h2>
                    <p className="text-xs text-slate-400">Copy paste any complex worksheet or textbook study challenge to get step-by-step reasoning layouts.</p>
                  </div>

                  <form onSubmit={handleHomeworkSubmit} className="space-y-4">
                    <textarea
                      required
                      rows={3}
                      value={homeworkInput}
                      onChange={(e) => setHomeworkInput(e.target.value)}
                      placeholder="e.g. Kofi is split 15 apples into 3 equal bags. Explain how many apples reside in each bag?"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-[#2D6CDF] focus:bg-white transition-all text-slate-700 resize-none"
                    />
                    <button
                      type="submit"
                      className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold py-3 rounded-xl text-xs transition-colors cursor-pointer w-full flex items-center justify-center gap-1"
                    >
                      <span>Analyze challenging question</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>

                  {homeworkStatus && (
                    <motion.div
                      initial={{ scale: 0.98, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-4 bg-purple-50/50 border border-purple-100 rounded-2xl font-mono text-xs text-slate-700 space-y-2 whitespace-pre-wrap"
                    >
                      {homeworkStatus}
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* QUESTION GENERATOR */}
              {activeSubTab === "qgen" && (
                <motion.div
                  key="ai_qgen"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="bg-white rounded-3xl border border-slate-200/60 shadow-xs p-6 space-y-5"
                >
                  <div className="space-y-1">
                    <h2 className="text-lg font-extrabold text-[#2C3E50]">Self-Guided mock test generator</h2>
                    <p className="text-xs text-slate-400">Select any active track subject and generate unique educational challenge questions instantly!</p>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Target Subject Category</label>
                      <select
                        value={qgenSubject}
                        onChange={(e) => setQgenSubject(e.target.value as SubjectId)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-green-500 text-slate-600"
                      >
                        <option value="math">Mathematics Tasks</option>
                        <option value="science">Science Units</option>
                        <option value="french">French salutations</option>
                      </select>
                    </div>

                    <button
                      onClick={handleGenerateQuestion}
                      disabled={qgenLoading}
                      className="bg-green-600 hover:bg-green-700 text-white font-extrabold px-6 rounded-xl text-xs transition-all cursor-pointer self-end md:h-[40px] flex items-center justify-center gap-1 shadow-sm disabled:opacity-40"
                    >
                      {qgenLoading ? "Generating..." : "Generate mock Question"}
                    </button>
                  </div>

                  {generatedQuestion && (
                    <motion.div
                      initial={{ scale: 0.98, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs space-y-4"
                    >
                      <div className="space-y-1 border-b border-slate-200 pb-3">
                        <span className="text-[9px] uppercase font-bold text-[#F1C40F] bg-slate-900 px-2 py-0.5 rounded-full inline-block font-mono">QUIZZES GENERATED QUESTION</span>
                        <h4 className="font-extrabold text-slate-800 text-sm mt-1">{generatedQuestion.q}</h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {generatedQuestion.opt.map((opt) => {
                          const isCorrect = opt === generatedQuestion.ans;
                          const isSelected = selectedUserAnswer === opt;
                          
                          let btnStyle = "bg-white border-slate-200 hover:border-slate-400";
                          if (selectedUserAnswer) {
                            if (isCorrect) btnStyle = "bg-green-100 border-green-300 text-green-800 font-extrabold";
                            else if (isSelected) btnStyle = "bg-red-100 border-red-300 text-red-800";
                          }

                          return (
                            <button
                              key={opt}
                              disabled={selectedUserAnswer !== null}
                              onClick={() => setSelectedUserAnswer(opt)}
                              className={`p-3 rounded-xl border text-left text-xs transition-all ${btnStyle}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {selectedUserAnswer && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="bg-green-50 border border-green-100 p-3.5 rounded-xl font-sans"
                        >
                          <span className="font-extrabold text-green-700 block">Explanation:</span>
                          <p className="text-slate-600 mt-0.5">{generatedQuestion.exp}</p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                </motion.div>
              )}

              {/* STUDY PLANNER */}
              {activeSubTab === "planner" && (
                <motion.div
                  key="ai_planner"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="bg-white rounded-3xl border border-slate-200/60 shadow-xs p-6 space-y-5"
                >
                  <div className="space-y-1">
                    <h2 className="text-lg font-extrabold text-[#2C3E50]">Self-Paced study schedule constructor</h2>
                    <p className="text-xs text-slate-400">Design an automated calendar study block to ensure balanced, stress-free curriculum mastery.</p>
                  </div>

                  <form onSubmit={handleGeneratePlan} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-extrabold text-slate-400 uppercase block">Daily study times</label>
                        <select
                          value={dailyMinutes}
                          onChange={(e) => setDailyMinutes(parseInt(e.target.value))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold outline-none focus:ring-2 text-slate-600"
                        >
                          <option value="15">15 minutes / day</option>
                          <option value="30">30 minutes / day</option>
                          <option value="60">60 minutes / day</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-[10px] font-extrabold text-slate-400 uppercase block">Weekly objective goal</label>
                        <input
                          type="text"
                          required
                          value={plannerGoal}
                          placeholder="e.g. Improve multiplication speeds or practice basic French words"
                          onChange={(e) => setPlannerGoal(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-800"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3 rounded-xl text-xs transition-colors cursor-pointer w-full flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Calendar className="w-4 h-4" /> Assemble weekly Study schedule
                    </button>
                  </form>

                  {generatedPlan && (
                    <motion.div
                      initial={{ scale: 0.98, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="space-y-2 border border-slate-200 rounded-2xl overflow-hidden shadow-3xs"
                    >
                      <div className="bg-slate-950 text-white p-3 text-xs font-extrabold flex justify-between">
                        <span>GOAL: {plannerGoal.toUpperCase()}</span>
                        <span className="text-blue-400 font-mono">5 DAYS BLOCK</span>
                      </div>
                      
                      <div className="divide-y divide-slate-100 bg-white">
                        {generatedPlan.map((d) => (
                          <div key={d.day} className="p-3 text-xs flex justify-between items-center bg-slate-50/20">
                            <div>
                              <span className="font-extrabold text-slate-800 block text-[11px] leading-tight">{d.day}</span>
                              <span className="text-slate-500 font-sans">{d.task}</span>
                            </div>
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md font-mono shrink-0">
                              {d.duration} mins
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                </motion.div>
              )}

              {/* ESSAY FEEDBACK */}
              {activeSubTab === "essay" && (
                <motion.div
                  key="ai_essay"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="bg-white rounded-3xl border border-slate-200/60 shadow-xs p-6 space-y-5"
                >
                  <div className="space-y-1">
                    <h2 className="text-lg font-extrabold text-[#2C3E50]">Creative Writer Feedback assistant</h2>
                    <p className="text-xs text-slate-400">Copy paste spelling assignments or essay drafts to get child-friendly vocabulary improvements with grading scores.</p>
                  </div>

                  <form onSubmit={handleEvaluateEssay} className="space-y-4">
                    <textarea
                      required
                      rows={4}
                      value={essayContent}
                      onChange={(e) => setEssayContent(e.target.value)}
                      placeholder="e.g. Ama is a kind girl. She resides inside Accra with her parents. Yesterday she plays football nicely with friends..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all text-slate-700 resize-none"
                    />
                    
                    <button
                      type="submit"
                      disabled={essayLoading}
                      className="w-full bg-rose-500 hover:bg-rose-600 text-white font-extrabold py-3.5 rounded-2xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-rose-500/10"
                    >
                      {essayLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Evaluating text components...</span>
                        </>
                      ) : (
                        <>
                          <FileText className="w-4 h-4" />
                          <span>Evaluate draft & grammar spelling</span>
                        </>
                      )}
                    </button>
                  </form>

                  {essayReport && (
                    <motion.div
                      initial={{ scale: 0.98, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-5 border border-slate-200 rounded-2xl bg-slate-50/50 space-y-4 text-xs font-sans text-slate-700"
                    >
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-extrabold text-slate-800 text-sm">Evaluation Report:</span>
                        <span className="bg-rose-100 text-rose-700 px-3.5 py-1 rounded-full font-black font-mono text-[10px]">
                          {essayReport.score}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block font-mono">GRAMMAR REVIEW</span>
                          <p className="text-slate-600 leading-normal">{essayReport.grammar}</p>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block font-mono">VOCABULARY DECORATIONS</span>
                          <p className="text-slate-600 leading-normal">{essayReport.vocabulary}</p>
                        </div>
                      </div>

                      <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl leading-normal text-slate-600">
                        <span className="font-black text-rose-700 block">Smart suggestion to level up:</span>
                        <p className="mt-0.5">{essayReport.suggestion}</p>
                      </div>
                    </motion.div>
                  )}

                </motion.div>
              )}

            </AnimatePresence>

          </div>

          {/* Right Block (4 Columns): Personalized Recommendations */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-3xl p-5 border border-slate-200/60 shadow-xs">
              <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-1.5 border-b border-white pb-3">
                <TrendingUp className="w-4.5 h-4.5 text-[#2D6CDF]" /> Personalized Next Steps
              </h3>

              <div className="space-y-4">
                {currentLevelRecommendations.map((rec) => (
                  <div
                    key={rec.title}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 text-[9px] font-extrabold text-slate-400 tracking-wider uppercase font-mono">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span> Recommend Track
                    </div>

                    <h4 className="font-black text-slate-800 text-xs leading-snug">{rec.title}</h4>
                    <p className="text-[10px] text-slate-500 leading-normal font-sans">{rec.desc}</p>
                  </div>
                ))}
              </div>

              {/* Smart stats widget summary */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-sans">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Study minutes tracked:</span>
                <span className="font-black text-[#2D6CDF] font-mono">{studentProfile.studyMinutes}m</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
