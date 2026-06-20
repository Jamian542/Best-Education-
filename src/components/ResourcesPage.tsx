/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileText, 
  Download, 
  Search, 
  Sparkles, 
  CheckCircle, 
  BookOpen, 
  Check, 
  Loader2, 
  ArrowRight,
  Eye,
  ChevronDown,
  X
} from "lucide-react";

interface Resource {
  id: string;
  title: string;
  category: "Worksheet" | "Practice Test" | "Study Guide" | "Past Exam";
  subject: "Mathematics" | "English" | "French" | "Science" | "General";
  grade: "KG" | "Primary" | "JHS" | "All";
  description: string;
  size: string;
  downloads: number;
  previewQuestions: string[];
}

const RESOURCES_DATA: Resource[] = [
  {
    id: "res_math_add",
    title: "Kindergarten Addition & Counting Worksheet",
    category: "Worksheet",
    subject: "Mathematics",
    grade: "KG",
    description: "Fun, trace-friendly sums with apples, stars, and cookie group graphics helper.",
    size: "1.2 MB",
    downloads: 1240,
    previewQuestions: [
      "1. Trace and count: 🍎 🍎 + 🍎 = ?",
      "2. Fill in the box: 5 + 3 = [ ]",
      "3. Smarty Owl has 4 stars, gets 2 more. Draw total stars!"
    ]
  },
  {
    id: "res_eng_verbs",
    title: "Primary 1-3 Nouns & Verbs Discovery Board",
    category: "Worksheet",
    subject: "English",
    grade: "Primary",
    description: "Coloring sheets and crossword puzzles to distinguish naming vs action verbs.",
    size: "820 KB",
    downloads: 980,
    previewQuestions: [
      "1. Underline the nouns: 'Ama runs quickly to school in Accra.'",
      "2. Match verb action to picture: [Jump] [Eat] [Sleep]",
      "3. Make a complete sentence about Kofi using verb: 'grow'."
    ]
  },
  {
    id: "res_science_solar",
    title: "Junior High School Planets Practice Exam",
    category: "Practice Test",
    subject: "Science",
    grade: "JHS",
    description: "Practice questions matching basic West African educational standard structures of celestial bodies.",
    size: "1.5 MB",
    downloads: 2310,
    previewQuestions: [
      "1. Which planet consists of 99.8% of the Solar System's total mass? (a) Earth (b) Jupiter (c) Saturn (d) Sun",
      "2. Describe three primary requirements that makes puppies living things compared to laptops.",
      "3. True/False: Neptune is the third closest planet to our Sun."
    ]
  },
  {
    id: "res_french_salute",
    title: "Les Salutations Comprehensive study guide",
    category: "Study Guide",
    subject: "French",
    grade: "All",
    description: "Vocabulary cards, key pronunciation audio transcripts, and helpful greetings phrases.",
    size: "2.1 MB",
    downloads: 1450,
    previewQuestions: [
      "Bonjour - Hello / Good morning",
      "Au revoir - Goodbye",
      "Comment ça va? - How are you?",
      "Ça va très bien - Doing very well"
    ]
  },
  {
    id: "res_math_jhs_geometry",
    title: "JHS Class Area & Perimeter Formula Guide",
    category: "Study Guide",
    subject: "Mathematics",
    grade: "JHS",
    description: "Beautiful cheat sheet containing shapes, drawings, and mathematical proofs for JHS Exams.",
    size: "940 KB",
    downloads: 1850,
    previewQuestions: [
      "1. Perimeter of Rectangle = 2 * (L + W)",
      "2. Area of Triangle = 1/2 * Base * Height",
      "3. Express 0.25 as a fraction in its simplest terms."
    ]
  },
  {
    id: "res_science_human_body",
    title: "Primary Human Respiratory Organ Walkthrough",
    category: "Worksheet",
    subject: "Science",
    grade: "Primary",
    description: "Label-the-diagram worksheet for tracing human lungs, oxygen exchange loops, and ribcage outlines.",
    size: "1.8 MB",
    downloads: 870,
    previewQuestions: [
      "1. Label the windpipe trachea on the diagram.",
      "2. Which gas do human lungs absorb during deep breathing cycles?",
      "3. List two standard tips to preserve respiratory health."
    ]
  }
];

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<"All" | "KG" | "Primary" | "JHS">("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [justDownloadedId, setJustDownloadedId] = useState<string | null>(null);
  const [activePreviewResource, setActivePreviewResource] = useState<Resource | null>(null);

  const categories = ["All", "Worksheet", "Practice Test", "Study Guide", "Past Exam"];

  const handleMockDownload = (resourceId: string) => {
    setDownloadingId(resourceId);
    setDownloadProgress(0);
    
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadingId(null);
          setJustDownloadedId(resourceId);
          setTimeout(() => setJustDownloadedId(null), 3000);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const filteredResources = RESOURCES_DATA.filter((res) => {
    const matchesSearch = 
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGrade = selectedGrade === "All" || res.grade === selectedGrade;
    const matchesCategory = selectedCategory === "All" || res.category === selectedCategory;

    return matchesSearch && matchesGrade && matchesCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-8 rounded-3xl">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Page Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2D6CDF] bg-[#2D6CDF]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
             Child Safe Resources Hub
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#2C3E50] tracking-tight font-heading">
            Syllabus Library & Downloadable Guides
          </h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto mt-2 leading-relaxed">
            Free high-quality PDF worksheets, practice examination questions, and study grids crafted to assist outstanding progress!
          </p>
        </div>

        {/* Search & Filtering Control Center bar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-xs mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search resources, topics, or subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] focus:bg-white transition-all"
              />
            </div>

            {/* Category selection Tabs */}
            <div className="md:col-span-4 flex gap-1 bg-slate-50 p-1 rounded-2xl overflow-x-auto">
              {["All", "KG", "Primary", "JHS"].map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGrade(g as any)}
                  className={`flex-1 text-[11px] font-bold py-2 px-3 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                    selectedGrade === g
                      ? "bg-[#2D6CDF] text-white shadow-xs"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
                  }`}
                >
                  {g === "All" ? "All Grades" : g === "KG" ? "KG" : g === "Primary" ? "Primary" : "JHS"}
                </button>
              ))}
            </div>

            {/* Category Dropdowns filters */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3 text-xs outline-none font-bold text-slate-600 focus:ring-2 focus:ring-[#2D6CDF]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === "All" ? "All File Types" : `${c}s`}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Resources Cards grids */}
        {filteredResources.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-slate-200/60 text-center space-y-4">
            <span className="text-4xl">📚</span>
            <h3 className="text-base font-extrabold text-slate-700">No resources matched your filters</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your search queries or selecting different grades.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((res) => {
              const isDownloading = downloadingId === res.id;
              const hasDownloaded = justDownloadedId === res.id;
              
              // Color tags based on subject
              const subjectColorMap = {
                Mathematics: "bg-blue-50 text-blue-600 border-blue-100",
                English: "bg-green-50 text-green-600 border-green-100",
                French: "bg-amber-50 text-amber-600 border-amber-100",
                Science: "bg-purple-50 text-purple-600 border-purple-100",
                General: "bg-slate-50 text-slate-600 border-slate-100"
              };

              return (
                <motion.div
                  key={res.id}
                  layoutId={res.id}
                  className="bg-white border border-slate-200/80 rounded-3xl p-5 hover:shadow-lg transition-shadow flex flex-col justify-between text-left group"
                >
                  <div className="space-y-4">
                    {/* Header: tags */}
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className={`text-[10px] font-extrabold border px-2.5 py-0.5 rounded-full ${subjectColorMap[res.subject]}`}>
                        {res.subject}
                      </span>
                      
                      <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-lg font-mono">
                        {res.category}
                      </span>
                    </div>

                    {/* Meta descriptive */}
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-sm group-hover:text-[#2D6CDF] transition-colors leading-tight">
                        {res.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-normal font-sans mt-1">
                        {res.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Metrics footer */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                    <button
                      onClick={() => setActivePreviewResource(res)}
                      className="text-slate-500 hover:text-slate-900 border border-slate-100 hover:bg-slate-50 p-2 rounded-xl transition-all text-xs flex items-center gap-1 cursor-pointer font-bold shrink-0"
                      title="Quick worksheet question preview"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    <div className="flex-1 flex justify-end">
                      {isDownloading ? (
                        <div className="flex items-center gap-2 bg-slate-50 border px-3 py-1.5 rounded-full w-full max-w-[130px]">
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#2D6CDF]" />
                          <div className="flex-1">
                            <div className="h-1 bg-[#2D6CDF]/20 rounded-full overflow-hidden">
                              <div className="h-full bg-[#2D6CDF] transition-all duration-100" style={{ width: `${downloadProgress}%` }}></div>
                            </div>
                            <span className="text-[8px] font-mono font-bold block text-[#2D6CDF] mt-0.5">{downloadProgress}%</span>
                          </div>
                        </div>
                      ) : hasDownloaded ? (
                        <span className="bg-green-100 border border-green-200 text-green-700 text-[10px] font-bold px-4 py-2 rounded-2xl flex items-center gap-1 animate-pulse">
                          <Check className="w-3.5 h-3.5" />
                          <span>PDF SAVED!</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => handleMockDownload(res.id)}
                          className="bg-[#2D6CDF]/5 hover:bg-[#2D6CDF] text-[#2D6CDF] hover:text-white font-extrabold text-[11px] px-4 py-2.5 rounded-2xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download PDF ({res.size})</span>
                        </button>
                      )}
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}

      </div>

      {/* Slide-over worksheet Preview drawer modal */}
      <AnimatePresence>
        {activePreviewResource && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl relative text-left"
            >
              <button 
                onClick={() => setActivePreviewResource(null)}
                className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-9 h-9 rounded-lg bg-[#2D6CDF]/10 flex items-center justify-center text-xl shrink-0">📄</span>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 block uppercase">WORKSHEET PREVIEW CONTENT</span>
                    <h3 className="font-extrabold text-sm text-slate-800 leading-tight">{activePreviewResource.title}</h3>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs space-y-3.5 border border-slate-800 shadow-inner">
                  <div className="flex justify-between text-[10px] text-green-400 border-b border-slate-800 pb-1.5">
                    <span>STATUS: LIVE SIMULATION VIEW</span>
                    <span>SIZE: {activePreviewResource.size}</span>
                  </div>
                  
                  {activePreviewResource.previewQuestions.map((q, i) => (
                    <p key={i} className="leading-relaxed whitespace-pre-wrap">{q}</p>
                  ))}

                  <div className="text-[10px] text-slate-400 italic text-center pt-2">
                    ... downloading the entire PDF will fetch all 25 exercises with official answers.
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const id = activePreviewResource.id;
                      setActivePreviewResource(null);
                      handleMockDownload(id);
                    }}
                    className="flex-1 bg-[#2D6CDF] hover:bg-[#1E54B8] text-white font-extrabold py-3.5 rounded-2xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-[#2D6CDF]/20"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Worksheet PDF File</span>
                  </button>
                  <button
                    onClick={() => setActivePreviewResource(null)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-3.5 rounded-2xl text-xs transition-colors cursor-pointer"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
