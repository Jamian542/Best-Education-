/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Search, 
  Calendar, 
  Clock, 
  User, 
  ChevronRight, 
  ArrowLeft,
  Sparkles,
  Heart,
  Share2
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  role: string;
  date: string;
  readTime: string;
  category: "Study Tips" | "Mathematics" | "Parenting" | "Language Mastery";
  accent: string;
  pillColor: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "post_math_fun",
    title: "5 Simple Ways to make Math fun at home",
    excerpt: "Discover how normal household items like count-friendly cookies, star shapes, and toy cars can convert algebra anxiety into playful logic games.",
    content: "Mathematics doesn't have to be limited to silent blackboards or intimidating homework sheets! For younger scholars in Kindergarten to Primary 3, math behaves beautifully as a hands-on physical discovery block. \n\nHere are three practical steps parents can use tonight:\n\n1. Count your food! Before enjoying a plate of cookies or oranges, count them together. Try subtraction in fast forward: 'If you have 5 cookies and Ama eats 2, draw the remainder!'\n2. Leverage shape recognition during travel. Challenge your student: 'Let's identify the 4 corners of that street building sign - is it a rectangle or a perimeter square?'\n3. Turn multiplication into equal group grids. Try placing real items like crayons into 3 groups of 4 crayons each to visualize 3 × 4 = 12.\n\nDeveloping child-friendly math familiarity early triggers self-guided success that guarantees classroom excellence!",
    author: "Grace Mensah",
    role: "Lead Math Pedagogue",
    date: "June 18, 2026",
    readTime: "4 mins read",
    category: "Mathematics",
    accent: "text-blue-600",
    pillColor: "bg-blue-50 text-blue-600 border-blue-100"
  },
  {
    id: "post_active_reading",
    title: "Boosting English Reading Comprehension for JHS Students",
    excerpt: "Help your junior high school student identify main ideas, differentiate adjectives from adverbs, and grasp complex passage questions smoothly.",
    content: "As students advance to JHS1-JHS3 levels, West African education standards demand higher-tier literary analysis and comprehension. Many students struggle because they read text passively without active scanning tools.\n\nTo raise your child's comprehension scores, teach them the 'SQ3R' formula:\n\n- S - SURVEY: Scan headings, bold terms, and visual drawings before reading.\n- Q - QUESTION: Convert subheadings into active questions (e.g. 'What is the main physical property of water?').\n- R - READ: Read actively looking specifically to resolve those questions.\n- R - RECITE: Speak key highlights or main ideas out loud in simple, local sentences.\n- R - REVIEW: Quickly go over key points and summarize the author's core thesis.\n\nAdditionally, identifying grammar decorators like adjectives (the 'golden' sun) and adverbs (shines 'brightly') clarifies sentence syntax and empowers pristine exam performance.",
    author: "Albert Osei",
    role: "Senior Languages Consultant",
    date: "June 14, 2026",
    readTime: "5 mins read",
    category: "Study Tips",
    accent: "text-green-600",
    pillColor: "bg-green-50 text-green-600 border-green-100"
  },
  {
    id: "post_multilingual_children",
    title: "Why early French Greetings build strong neural blocks",
    excerpt: "Why learning French salutations like Bonjour, Comment ça va and La Famille early inspires creative cognitive flexible problem-solving in children.",
    content: "Science reveals that children's brains are uniquely adapted to absolute phonetic language absorption! Introducing a second language like French early (under age 10) structures flexible neurological channels that benefit analytical logic, creative writing, and spatial thinking.\n\nBy practicing simple French Greetings (Les Salutations) and familial names (La Famille), kids build secondary language schemas naturally without formal vocabulary drills. \n\nAt our 'Best Education' portal, we integrate audio visual pronunciation guides immediately into lesson blocks, ensuring children can listen, practice, and confidently pronounce French words correctly. A few moments of French roleplay every day with siblings goes a long way in cultivating a global, multilingual scholar!",
    author: "Clarisse Dubois",
    role: "French Curriculum Designer",
    date: "June 10, 2026",
    readTime: "3 mins read",
    category: "Language Mastery",
    accent: "text-amber-600",
    pillColor: "bg-amber-50 text-amber-600 border-amber-100"
  },
  {
    id: "post_screentime_learning",
    title: "Balancing screen time and child-focused gamification",
    excerpt: "A guide for parents on how to convert regular digital play into structured learning habits with badges, reward stars, and custom study plans.",
    content: "Children love interactive game loops! Instead of fighting digital screen time, wise parents redirect this digital energy into high-intent learning quests. \n\nBy rewarding educational accomplishments with virtual points, badges (like 'Perfect Brainstar' or 'Math Prodigy'), and public praise, we leverage dopamine pathways for child growth.\n\nOur system gamifies correct answers while removing visual distraction and public advertisement stress. This creates a child-safe cocoon where kids request lessons as a form of play, nurturing a lasting positive educational relationship.",
    author: "Michael Sowah",
    role: "Educational Psychologist",
    date: "June 05, 2026",
    readTime: "6 mins read",
    category: "Parenting",
    accent: "text-purple-600",
    pillColor: "bg-purple-50 text-purple-600 border-purple-100"
  }
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const categories = ["All", "Study Tips", "Mathematics", "Parenting", "Language Mastery"];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-8 rounded-3xl text-left">
      <div className="max-w-4xl mx-auto px-4">
        
        <AnimatePresence mode="wait">
          {!selectedPost ? (
            <motion.div
              key="post_list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="text-center md:text-left space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#2D6CDF] bg-[#2D6CDF]/10 px-3 py-1 rounded-full inline-block">
                  Scolastique Blog
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#2C3E50] tracking-tight font-heading">
                  School News & Expert Parenting Tips
                </h1>
                <p className="text-slate-500 text-xs md:text-sm">
                  Practical educational science, lesson guides, and supportive articles written by child pedagogues.
                </p>
              </div>

              {/* Filters bar */}
              <div className="bg-white p-4 border border-slate-200/60 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between shadow-xs">
                {/* Search */}
                <div className="relative w-full md:max-w-sm">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#2D6CDF] focus:bg-white transition-all font-medium text-slate-700"
                  />
                </div>

                {/* Categories tab pills */}
                <div className="flex gap-1 overflow-x-auto w-full md:w-auto p-1 bg-slate-50 rounded-xl">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-[10px] font-extrabold py-2 px-3.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-[#2C3E50] text-white"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Posts Grid List */}
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <motion.article
                    key={post.id}
                    layoutId={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border ${post.pillColor}`}>
                          {post.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1 font-mono">
                          <Calendar className="w-3 h-3" /> {post.date}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3" /> {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-lg md:text-xl font-extrabold text-[#2C3E50] tracking-tight group-hover:text-[#2D6CDF] transition-colors leading-tight">
                        {post.title}
                      </h3>

                      <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-sans">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5 text-xs text-slate-600">
                        <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-bold">
                          👤
                        </div>
                        <div>
                          <span className="font-extrabold text-slate-700 block text-[11px] leading-tight">{post.author}</span>
                          <span className="text-[9px] text-slate-400 block">{post.role}</span>
                        </div>
                      </div>

                      <span className="text-xs font-bold text-[#2D6CDF] flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                        Read Story <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </motion.article>
                ))}
              </div>

            </motion.div>
          ) : (
            <motion.div
              key="post_detail"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl border border-slate-200/60 p-6 md:p-8 space-y-6"
            >
              {/* Back CTA */}
              <button
                onClick={() => setSelectedPost(null)}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer bg-slate-50 hover:bg-slate-100 px-3.5 py-1.5 rounded-xl transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Blog List
              </button>

              {/* Title & Author header widget */}
              <div className="space-y-4 border-b border-slate-100 pb-5">
                <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${selectedPost.pillColor}`}>
                  {selectedPost.category}
                </span>

                <h1 className="text-2xl md:text-3xl font-extrabold text-[#2C3E50] tracking-tight leading-tight">
                  {selectedPost.title}
                </h1>

                <div className="flex flex-wrap items-center justify-between gap-4 text-slate-500 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-lg">
                      👩‍🏫
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-800 block text-xs leading-tight">{selectedPost.author}</span>
                      <span className="text-[10px] text-slate-400 block">{selectedPost.role}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 font-mono font-medium text-[10px] text-slate-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {selectedPost.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedPost.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Image alternative illustration placeholder banner */}
              <div className="h-44 md:h-56 bg-gradient-to-tr from-sky-100 to-indigo-100 border border-slate-100 rounded-2xl flex items-center justify-center p-6 text-center select-none relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 opacity-[0.03] pointer-events-none font-bold text-9xl text-slate-900">
                  SCHOLASTIC
                </div>
                <div className="space-y-1.5 max-w-sm relative z-10">
                  <Sparkles className="w-6 h-6 text-[#2D6CDF] animate-bounce mx-auto" />
                  <p className="font-heading font-extrabold text-sm md:text-base text-slate-700 leading-tight">
                    "{selectedPost.excerpt}"
                  </p>
                </div>
              </div>

              {/* Main article narrative body */}
              <div className="text-slate-600 text-xs md:text-sm leading-relaxed font-sans space-y-4 whitespace-pre-wrap">
                {selectedPost.content}
              </div>

              {/* Feedback and interactions bar */}
              <div className="border-t border-slate-100 pt-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-rose-600 px-3 py-1.5 border border-red-100 rounded-xl transition-all font-bold text-xs cursor-pointer">
                    <Heart className="w-3.5 h-3.5 fill-rose-600" />
                    <span>24 Love</span>
                  </button>
                  <button className="flex items-center gap-1 bg-slate-50 hover:bg-slate-100 text-slate-600 px-3 py-1.5 border border-slate-100 rounded-xl transition-all font-bold text-xs cursor-pointer">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>
                </div>

                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-xs font-bold text-[#2D6CDF] hover:underline"
                >
                  Return to Blog List
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
