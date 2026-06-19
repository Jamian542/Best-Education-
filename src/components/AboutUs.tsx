/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Mail, Github, Heart, Shield, Award, Users, Globe, ExternalLink, Sparkles } from "lucide-react";

export default function AboutUs() {
  const teamMembers = [
    {
      name: "Dr. Evelyn Lamptey",
      role: "Lead Curriculum Director",
      bio: "Over 15 years designing engaging primary and JHS education pathways.",
      avatar: "👩‍🏫",
      color: "border-blue-300 bg-blue-50"
    },
    {
      name: "Jude Lamptey",
      role: "Founder & Creative Technologist",
      bio: "Passionate about making education dynamic and gamifying STEM learning.",
      avatar: "👨‍💻",
      color: "border-green-300 bg-green-50"
    },
    {
      name: "Marie-Claire Dubois",
      role: "French Studies Coordinator",
      bio: "Specialist in early bilingual methodologies for young African kids.",
      avatar: "👩‍🎨",
      color: "border-amber-300 bg-amber-50"
    }
  ];

  const values = [
    {
      title: "Interactive Learning",
      description: "Visual, gamified concepts keep kids active rather than passive listeners.",
      icon: Sparkles,
      color: "text-amber-500 bg-amber-100"
    },
    {
      title: "No Student Left Behind",
      description: "Syllabus designed sequentially from Kindergarten basic counts to JHS3 advanced probability.",
      icon: Shield,
      color: "text-blue-500 bg-blue-100"
    },
    {
      title: "Safe & Encouraging",
      description: "Self-paced quizzes, star points, and virtual badges motivate rather than pressure.",
      icon: Award,
      color: "text-green-500 bg-green-100"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Vision & Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-r from-[#2D6CDF] via-[#1E54B8] to-[#123985] text-white rounded-3xl p-8 md:p-12 overflow-hidden shadow-xl mb-12 border border-[#2D6CDF]/20"
      >
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 bottom-0 -mb-16 w-48 h-48 bg-[#F1C40F]/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-white/10">
            <Heart className="w-3.5 h-3.5 text-amber-300 fill-amber-300" /> Shaping the Future of Learning
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 font-heading leading-tight">
            Best Education
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-6 font-playful font-medium">
            "Learn smarter, grow brighter"
          </p>
          <div className="p-4 bg-white/10 rounded-2xl border border-white/15 backdrop-blur-xs">
            <span className="font-bold text-amber-200 block text-sm uppercase tracking-wide mb-1">Our Core Mission</span>
            <p className="text-sm md:text-base text-gray-100 font-sans leading-relaxed">
              We empower West African students from Kindergarten to JHS3 to master their curriculum (Mathematics, English, French, and Science) through beautifully structured interactive digital tools. By replacing routine drills with gamified modules, we make studying a joyous daily adventure.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Vision statement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
        >
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl w-fit mb-4">
            <Globe className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold font-heading mb-4 text-slate-800">Our Vision</h2>
          <p className="text-slate-600 text-base leading-relaxed font-sans mb-4">
            Our vision is a future where quality, localized syllabus content is fully accessible directly in any browser for self-study, homework aid, or classroom illustration. We aim to inspire a lifelong passion for knowledge, curiosity, and critical thinking.
          </p>
          <p className="text-slate-600 text-base leading-relaxed font-sans font-medium text-indigo-700">
            We adapt directly to West African learning objectives, guaranteeing subjects matches school definitions while injecting premium interactive game loops.
          </p>
        </motion.div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold font-heading text-slate-800 px-2">What guides our platform?</h3>
          {values.map((v, idx) => (
            <motion.div 
              key={v.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100"
            >
              <div className={`p-3 rounded-xl ${v.color} shrink-0`}>
                <v.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 font-heading text-sm mb-1">{v.title}</h4>
                <p className="text-xs text-slate-500 leading-normal">{v.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team/Organization section */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-2 inline-block">Educators and Engineers</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 font-heading">
            Meet Our Passionate Team
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto text-sm mt-2">
            The brains coordinating the syllabus mapping, question databases, and playful game interfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-2xl border bg-white ${member.color} shadow-xs flex flex-col items-center text-center transition-all`}
            >
              <span className="text-5xl mb-4 filter drop-shadow-sm select-none">{member.avatar}</span>
              <h3 className="font-bold text-lg text-slate-800 font-heading">{member.name}</h3>
              <p className="text-xs font-semibold text-indigo-600 mb-3 uppercase tracking-wider">{member.role}</p>
              <p className="text-sm text-slate-600 leading-normal font-sans">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Safe child-friendly Contact Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-[#2C3E50] text-white rounded-3xl p-8 text-center relative overflow-hidden border border-[#34495E] shadow-xl"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="relative z-10 max-w-xl mx-auto">
          <Users className="w-10 h-10 text-[#F1C40F] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-2">Connect With Best Education</h2>
          <p className="text-slate-400 text-sm md:text-base mb-6">
            Parents, teachers, and school administrators: have feedback, recommendations, or custom syllabus requests? Reach out directly! We love collaborating.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a 
              href="mailto:judelampteyo@gmail.com"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-blue-500/20 transition-all text-sm w-full sm:w-auto justify-center"
            >
              <Mail className="w-4 h-4" /> Email Us: judelampteyo@gmail.com
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white px-5 py-2.5 rounded-full border border-slate-700 transition-all text-sm w-full sm:w-auto justify-center"
            >
              <Github className="w-4 h-4" /> Github Code <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex justify-center gap-4 text-xs text-slate-500 border-t border-slate-800 pt-6">
            <span>© 2026 Best Education. All rights reserved.</span>
            <span>•</span>
            <span className="text-amber-400">Learn smarter, grow brighter</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
