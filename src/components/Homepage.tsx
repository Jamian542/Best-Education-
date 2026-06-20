/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { 
  Calculator, 
  BookOpen, 
  Languages, 
  Sparkles, 
  ArrowRight, 
  Trophy, 
  GraduationCap, 
  CheckCircle, 
  ArrowUpRight, 
  Smile,
  Shield,
  Star
} from "lucide-react";
import { SUBJECTS } from "../data/learningContent";

interface HomepageProps {
  onStartLearning: (subjectId: "math" | "english" | "french" | "science" | null) => void;
  onNavigate: (tab: string) => void;
  onSelectLevelClick: () => void;
}

export default function Homepage({ onStartLearning, onNavigate, onSelectLevelClick }: HomepageProps) {
  const features = [
    {
      title: "Interactive Syllabus",
      desc: "Designed specifically from Kindergarten basic operations to JHS3 core competencies.",
      icon: GraduationCap,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Self-Paced Quizzes",
      desc: "Instant feedback and visual aids guide children through common mistakes smoothly.",
      icon: Trophy,
      color: "bg-amber-100 text-amber-600"
    },
    {
      title: "Gamified Tracking",
      desc: "Earn XP, complete challenges, and collect beautiful printable virtual badges.",
      icon: Star,
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case "Calculator": return <Calculator className="w-8 h-8" />;
      case "BookOpen": return <BookOpen className="w-8 h-8" />;
      case "Languages": return <Languages className="w-8 h-8" />;
      case "Sparkles": return <Sparkles className="w-8 h-8" />;
      default: return <BookOpen className="w-8 h-8" />;
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-400/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 pt-12 pb-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 bg-[#2D6CDF]/10 border border-[#2D6CDF]/20 px-4 py-1.5 rounded-full text-[#2D6CDF] font-bold text-xs uppercase tracking-wider shadow-xs">
              <Sparkles className="w-4 h-4 text-[#F1C40F] animate-spin" /> E-Learning Reimagined
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#2C3E50] leading-tight">
              Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D6CDF] to-[#1E54B8]">Education</span>
            </h1>
            
            <p className="text-xl sm:text-2xl font-playful font-semibold text-[#2D6CDF]">
              Learn smarter, grow brighter
            </p>
            
            <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-xl font-sans">
              Welcome to the ultimate learning companion! Discover clean, delightful lessons and interactive challenges mapping Ghanaian Kindergarten to Junior High School standards.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button 
                onClick={onSelectLevelClick}
                className="group flex items-center justify-center gap-2 bg-[#2D6CDF] hover:bg-[#1E54B8] text-white font-extrabold px-8 py-4 rounded-2xl shadow-xl shadow-[#2D6CDF]/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => onNavigate("lessons")}
                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#2C3E50] font-bold px-8 py-4 rounded-2xl border border-slate-200 shadow-sm transition-all text-sm"
              >
                Browse Lessons
              </button>
            </div>

            {/* Quick stats / trust list */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-100 text-sm text-slate-500">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <CheckCircle className="w-4 h-4 text-green-500" /> Math, Science & Languages
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <CheckCircle className="w-4 h-4 text-green-500" /> Interactive Mock Quizzes
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <CheckCircle className="w-4 h-4 text-green-500" /> 100% Free & Child-Safe
              </span>
            </div>
          </motion.div>

          {/* Friendly visual illustration - animated with react code (no external image dependencies) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-[340px] md:max-w-md aspect-square bg-gradient-to-tr from-sky-400/20 to-indigo-400/20 rounded-[40px] p-6 flex items-center justify-center shadow-lg border border-white/50 overflow-hidden">
              {/* Spinning gear paths */}
              <div className="absolute top-10 right-10 w-20 h-20 border-4 border-dashed border-sky-400/30 rounded-full animate-spin [animation-duration:15s]" />
              <div className="absolute bottom-10 left-10 w-32 h-32 border-4 border-dashed border-indigo-400/20 rounded-full animate-spin [animation-duration:25s]" />
              
              {/* Main floating classroom blackboard mock card */}
              <div className="bg-slate-900 border border-slate-800 text-white p-6 rounded-3xl w-full max-w-[280px] md:max-w-[320px] shadow-2xl relative z-10 hover-bounce">
                
                {/* Visual badge top */}
                <div className="absolute -top-4 -right-4 bg-amber-400 text-slate-950 font-extrabold text-xs px-2.5 py-1 rounded-full border-2 border-white shadow-md flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" /> +100 XP
                </div>

                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="text-xs text-slate-400 font-mono ml-auto">best-education.app</span>
                </div>

                {/* Simulated interface with cute numbers */}
                <div className="space-y-4 font-playful text-left">
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-widest font-sans font-semibold">MATH QUEST 🧮</span>
                    <h3 className="text-xl font-bold text-white leading-tight">Addition Lesson</h3>
                  </div>

                  <div className="p-3 bg-slate-800 rounded-2xl relative border border-slate-700/50">
                    <p className="text-sm text-slate-200">If you have <span className="text-pink-400 font-bold">3 🍎</span> and your teacher gives you <span className="text-emerald-400 font-bold">2 🍎</span>, how many total?</p>
                    <div className="text-center font-bold text-lg mt-2 text-amber-300 font-mono tracking-wider bg-slate-900/60 py-1 rounded-xl">
                      3 + 2 = ?
                    </div>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-2 gap-2 font-sans font-bold text-xs text-slate-900">
                    <div className="bg-red-100 p-2 rounded-xl text-center border-b-2 border-red-300">4</div>
                    <div className="bg-emerald-100 p-2 rounded-xl text-center border-b-2 border-emerald-300 flex items-center justify-center gap-1">
                      5 <Smile className="w-3.5 h-3.5 text-emerald-600 fill-emerald-200" />
                    </div>
                  </div>
                </div>

                {/* Badge alert */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm">
                    🏆
                  </div>
                  <div className="text-[11px] leading-tight text-left">
                    <span className="text-slate-200 block font-bold font-sans">Achievement Achieved!</span>
                    <span className="text-slate-400">First Steps Badge unlocked</span>
                  </div>
                </div>
              </div>

              {/* Floating icons */}
              <div className="absolute -left-2 top-12 bg-white text-slate-800 shadow-lg p-3 rounded-2xl border border-slate-100 flex items-center gap-2">
                <span className="text-xl">📊</span>
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 block font-sans">KG ➔ JHS3</span>
                  <span className="text-xs font-bold font-sans">9 Topics</span>
                </div>
              </div>

              <div className="absolute -right-2 bottom-8 bg-white text-slate-800 shadow-lg p-3 rounded-xl border border-slate-100 flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-[11px] font-bold font-sans">No ads, fully safe</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* CORE SUBJECT PREVIEWS SECTION */}
      <div className="bg-slate-50 border-y border-slate-200/60 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/60 px-3.5 py-1.5 rounded-full mb-3 inline-block">Syllabus Overview</span>
          <h2 className="text-3xl font-extrabold text-slate-800 font-heading mb-3">Our Core Subjects</h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto mb-10">
            Click any card to explore step-by-step visual lessons and self-guided quizzes matching active classroom benchmarks.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUBJECTS.map((sub, idx) => {
              const bgAccent = sub.id === "math" ? "hover:border-blue-300 hover:bg-blue-50/20" :
                                sub.id === "english" ? "hover:border-green-300 hover:bg-green-50/20" :
                                sub.id === "french" ? "hover:border-amber-300 hover:bg-amber-50/20" :
                                "hover:border-purple-300 hover:bg-purple-50/20";
              const textAccent = sub.accentColor;
              const shadowClass = sub.id === "math" ? "shadow-blue-500/5 hover:shadow-blue-500/10" :
                                  sub.id === "english" ? "shadow-green-500/5 hover:shadow-green-500/10" :
                                  sub.id === "french" ? "shadow-amber-500/5 hover:shadow-amber-500/10" :
                                  "shadow-purple-500/5 hover:shadow-purple-500/10";

              return (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  onClick={() => onStartLearning(sub.id)}
                  className={`bg-white rounded-3xl p-6 text-left border ${sub.borderColor} ${bgAccent} ${shadowClass} shadow-md transition-all cursor-pointer flex flex-col justify-between`}
                >
                  <div>
                    <div className={`p-4 rounded-2xl w-fit ${sub.bannerColor} text-white mb-5 shadow-inner`}>
                      {getSubjectIcon(sub.icon)}
                    </div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">KG ➔ JHS3 SYLLABUS</span>
                    <h3 className="text-xl font-bold font-heading text-slate-800 mt-1 mb-2">{sub.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans mb-6">{sub.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:underline">
                      Explore Topics
                    </span>
                    <ArrowUpRight className={`w-4 h-4 ${textAccent}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CORE FEATURES EXPLANATION */}
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm"
            >
              <div className={`p-3.5 rounded-xl shrink-0 ${feat.color}`}>
                <feat.icon className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-base text-slate-800 font-heading mb-1">{feat.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* STUDENT SUCCESS STATISTICS SECTION */}
      <div className="bg-slate-900 text-white py-14 my-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-1"
            >
              <span className="text-3xl md:text-4xl font-extrabold text-amber-400 block font-mono">12,400+</span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Active Scholars</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-1"
            >
              <span className="text-3xl md:text-4xl font-extrabold text-[#2ECC71] block font-mono">95.4%</span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Grade Improvement</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-1"
            >
              <span className="text-3xl md:text-4xl font-extrabold text-sky-400 block font-mono">450K+</span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Quizzes Cleared</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-1"
            >
              <span className="text-3xl md:text-4xl font-extrabold text-pink-400 block font-mono">100% Free</span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Ad-Free & Safe</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS SECTION */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-green-600 bg-green-100/60 px-3.5 py-1.5 rounded-full mb-3 inline-block">
          Scholastic Testimonials
        </span>
        <h2 className="text-3xl font-extrabold text-slate-800 font-heading mb-3">Feedback from Parents & Students</h2>
        <p className="text-slate-500 text-sm max-w-xl mx-auto mb-10">
          Read real stories of children unlocking stars, crushing quizzes, and boosting school performance!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-xs text-left justify-between flex flex-col"
          >
            <div className="space-y-3">
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic font-sans">
                "My daughter Ama was struggling with her multiplication tables. After studying the JHS chapters and practicing quizzes here, she scored perfectly in her term exams!"
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3 border-t border-slate-50 pt-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-lg select-none">👩‍👦</div>
              <div>
                <h4 className="font-extrabold text-xs text-slate-800">Mrs. Abigail Boateng</h4>
                <p className="text-[10px] text-slate-400">Parent, Accra</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-xs text-left justify-between flex flex-col"
          >
            <div className="space-y-3">
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic font-sans">
                "I love earning badges like the Perfect Brainstar. Smarty Owl helps me solve tough fractions and geometry questions like a fun mobile game!"
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3 border-t border-slate-50 pt-4">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-lg select-none">👦</div>
              <div>
                <h4 className="font-extrabold text-xs text-slate-800">Eugene Asante</h4>
                <p className="text-[10px] text-slate-400">Primary 5 Scholar, Kumasi</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-xs text-left justify-between flex flex-col"
          >
            <div className="space-y-3">
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic font-sans">
                "The web-based lessons are visual, lightweight, and align exactly with state education goals. It's the ultimate learning tool for school students!"
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3 border-t border-slate-50 pt-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-lg select-none">👨‍🏫</div>
              <div>
                <h4 className="font-extrabold text-xs text-slate-800">Mr. Albert Kwaku</h4>
                <p className="text-[10px] text-slate-400">Primary Principal, Ho</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CALL TO ACTION FOR PARENTS & SCHOLARS */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <motion.div 
          className="bg-[#2C3E50] text-white rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden border border-[#34495E] shadow-xl"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading tracking-tight">Ready to boost your classroom grades?</h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Set your target grade level, study the interactive lessons, take standard practice quizzes, and level up with badges today!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button 
                onClick={onSelectLevelClick}
                className="bg-[#F1C40F] hover:bg-[#D4AC0D] text-slate-950 font-extrabold px-8 py-3.5 rounded-2xl shadow-xl shadow-[#F1C40F]/15 text-sm w-full sm:w-auto transition-all transform hover:-translate-y-0.5"
              >
                Launch Student Dashboard
              </button>
              <button 
                onClick={() => onNavigate("about")}
                className="bg-[#34495E] hover:bg-[#2C3E50] text-[#ECF0F1] hover:text-white border border-white/10 px-8 py-3.5 rounded-2xl text-sm w-full sm:w-auto transition-all"
              >
                Learn More About Us
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
