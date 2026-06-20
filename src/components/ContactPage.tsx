/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Send, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  Twitter,
  Facebook,
  Linkedin,
  Sparkles,
  CheckCircle,
  Check
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS_DATA: FAQItem[] = [
  {
    question: "Is 'Best Education' completely free?",
    answer: "Yes, 100%! There are absolutely no hidden subscription costs, locked chapters, or distracting visual advertisements. Our mission is to promote high-interest, democratic education accessibility for every African child."
  },
  {
    question: "Which class levels does this syllabus cover?",
    answer: "We map learning tracks from Kindergarten (KG) basics up to Junior High School (JHS3) levels. Our curriculum structure aligns carefully with core classroom and standard competency standards."
  },
  {
    question: "Can I use 'Best Education' on smartphones or tablets?",
    answer: "Absolutely! The app utilizes a fully responsive, thumb-friendly design that looks pristine on laptops, tablets, and mobile devices."
  },
  {
    question: "Do our badges print or persist?",
    answer: "Yes! Badge achievements are stored safely in local memory so that when your student returns, their XP scores, learning streaks, and unlocked badges remain fully intact."
  },
  {
    question: "Can multiple children use the app?",
    answer: "Yes! Children can easily edit their name and class level from the Student Dashboard configurations anytime to access personalized lessons targeted to their grade level."
  }
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Sponsorship");
  const [msg, setMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setActiveFaqIdx((prev) => (prev === idx ? null : idx));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !msg) return;

    setSubmitted(true);
    setTimeout(() => {
      // Clear form states
      setName("");
      setEmail("");
      setMsg("");
    }, 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 rounded-3xl text-left">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2D6CDF] bg-[#2D6CDF]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Contact & FAQ Support Center
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#2C3E50] tracking-tight font-heading">
            We love to hear from Parents & Teachers
          </h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto mt-2 leading-relaxed">
            Have questions about syllabus updates, school partnerships, or feature suggestions? Drop us a line below!
          </p>
        </div>

        {/* Contact content split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Column: Form & Info */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/60 shadow-xs relative overflow-hidden">
              <div className="absolute right-0 top-0 -mr-6 -mt-6 w-24 h-24 bg-blue-100/30 rounded-full blur-xl pointer-events-none"></div>
              
              <h2 className="text-xl font-extrabold text-[#2C3E50] mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#2D6CDF]" /> Submit a Support Ticket
              </h2>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success_status"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-green-100 border border-green-200 rounded-2xl flex items-center justify-center text-3xl mx-auto">
                      🎉
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-slate-800 text-base">Message Sent Successfully!</h3>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto leading-normal">
                        Thank you! Your ticket was successfully dispatched. Our educational coordinator team will reply via email within 24 hours.
                      </p>
                    </div>
                    
                    <button
                      onClick={() => setSubmitted(false)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="contact_form"
                    onSubmit={handleFormSubmit}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">Student or Parent Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Kofi Mensah"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs font-semibold outline-none focus:ring-2 focus:ring-[#2D6CDF] focus:bg-white transition-all text-slate-700"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="parent@example.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs font-semibold outline-none focus:ring-2 focus:ring-[#2D6CDF] focus:bg-white transition-all text-slate-700"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">Support Category</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs font-semibold outline-none focus:ring-2 focus:ring-[#2D6CDF] text-slate-600"
                      >
                        <option value="Sponsorship">Sponsorship & Donations</option>
                        <option value="Curriculum">Syllabus / Curriculum Inquiry</option>
                        <option value="School Partnership">School/NGO Classroom Partnership</option>
                        <option value="Bug Report">Feedback / Technical Error Report</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">Your Message</label>
                      <textarea
                        required
                        rows={4}
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        placeholder="Detail your question or suggestion here..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs font-semibold outline-none focus:ring-2 focus:ring-[#2D6CDF] focus:bg-white transition-all text-slate-700 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#2D6CDF] hover:bg-[#1E54B8] text-white font-extrabold py-3.5 rounded-2xl text-xs transition-all shadow-md shadow-[#2D6CDF]/15 flex items-center justify-center gap-1.5 cursor-pointer transform hover:-translate-y-0.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message to Team</span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Offline Contact Details & social */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-4 border border-slate-200/60 shadow-xs flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block font-bold">EMAIL SUPPORT</span>
                  <span className="text-[11px] font-extrabold text-slate-800">support@best-edu.org</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-slate-200/60 shadow-xs flex items-center gap-3">
                <div className="p-2.5 bg-green-50 rounded-xl text-green-600">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block font-bold">TELEPHONE</span>
                  <span className="text-[11px] font-extrabold text-slate-800">+233 24 123 4567</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-slate-200/60 shadow-xs flex items-center gap-3">
                <div className="p-2.5 bg-purple-50 rounded-xl text-purple-600">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block font-bold">ACCRA OFFICE</span>
                  <span className="text-[11px] font-extrabold text-slate-800">East Legon, Ghana</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive FAQ Accordion */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-xs text-left">
              <h2 className="text-xl font-extrabold text-[#2C3E50] mb-5 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-500" /> Frequently Asked Questions
              </h2>

              <div className="space-y-3">
                {FAQS_DATA.map((faq, idx) => {
                  const isOpen = activeFaqIdx === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-slate-100 rounded-2xl overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-50 text-left transition-colors cursor-pointer"
                      >
                        <span className="text-xs font-bold text-slate-700 font-sans leading-snug">
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-slate-400 grow-0 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 grow-0 shrink-0" />
                        )}
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-white border-t border-slate-100 text-slate-500 text-xs leading-relaxed font-sans p-4"
                          >
                            {faq.answer}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Social Channels indicator */}
              <div className="mt-8 pt-5 border-t border-slate-100 text-center space-y-3.5">
                <span className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider block">Join our online community</span>
                <div className="flex justify-center gap-3">
                  <a href="#" className="p-2 bg-slate-50 hover:bg-sky-50 text-sky-500 rounded-xl transition-all border border-slate-100 shadow-3xs"><Twitter className="w-4 h-4" /></a>
                  <a href="#" className="p-2 bg-slate-50 hover:bg-blue-50 text-blue-600 rounded-xl transition-all border border-slate-100 shadow-3xs"><Facebook className="w-4 h-4" /></a>
                  <a href="#" className="p-2 bg-slate-50 hover:bg-indigo-50 text-indigo-600 rounded-xl transition-all border border-slate-100 shadow-3xs"><Linkedin className="w-4 h-4" /></a>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
