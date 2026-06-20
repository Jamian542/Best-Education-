/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, 
  Calculator, 
  BookOpen, 
  Languages, 
  Sparkles, 
  ClipboardCheck, 
  TrendingUp, 
  Settings, 
  Menu, 
  X, 
  Star, 
  Zap, 
  Trash2, 
  Volume2, 
  VolumeX, 
  Heart,
  User,
  Award,
  ChevronRight,
  Smile,
  AlertTriangle,
  CheckCircle,
  FolderDown,
  Newspaper,
  Mail,
  Users,
  Shield,
  Brain,
  Home
} from "lucide-react";

import { StudentProfile, ClassLevel, SubjectId, Topic } from "./types";
import { ALL_TOPICS } from "./data/learningContent";

// Components
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import MathSection from "./components/MathSection";
import SubjectSection from "./components/SubjectSection";
import QuizzesPage from "./components/QuizzesPage";
import ProgressPage from "./components/ProgressPage";
import AboutUs from "./components/AboutUs";
import QuizModal from "./components/QuizModal";
import ResourcesPage from "./components/ResourcesPage";
import BlogPage from "./components/BlogPage";
import ContactPage from "./components/ContactPage";
import ParentPortal from "./components/ParentPortal";
import TeacherPortal from "./components/TeacherPortal";
import AIPage from "./components/AIPage";
import CoursesPage from "./components/CoursesPage";
import AccountsManager from "./components/AccountsManager";

const LOCAL_STORAGE_ACTIVE_ID_KEY = "best_education_active_id_v3";
const LOCAL_STORAGE_PROFILES_KEY = "best_education_profiles_list_v3";

const DEFAULT_PROFILE: StudentProfile = {
  id: "default",
  name: "Guest Student",
  level: "Primary 4",
  avatar: "🎓",
  xp: 0,
  stars: 0,
  completedQuizzes: {},
  studyMinutes: 0,
  streakDays: 0,
  unlockedBadgeIds: []
};

export default function App() {
  const [profiles, setProfiles] = useState<StudentProfile[]>([DEFAULT_PROFILE]);
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(DEFAULT_PROFILE);
  const [activeTab, setActiveTab] = useState<string>("home");
  const [activeQuizTopic, setActiveQuizTopic] = useState<Topic | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [accountsModalOpen, setAccountsModalOpen] = useState(false);
  
  // Custom temporary alert banner state for newly unlocked badges!
  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<string | null>(null);

  // Load profiles from local storage on mount
  useEffect(() => {
    try {
      const storedProfiles = localStorage.getItem(LOCAL_STORAGE_PROFILES_KEY);
      const activeId = localStorage.getItem(LOCAL_STORAGE_ACTIVE_ID_KEY);
      
      let parsedProfiles: StudentProfile[] = [DEFAULT_PROFILE];
      if (storedProfiles) {
        parsedProfiles = JSON.parse(storedProfiles);
        setProfiles(parsedProfiles);

        let activeProfile = parsedProfiles[0];
        if (activeId) {
          const found = parsedProfiles.find(p => (p.id || "default") === activeId);
          if (found) activeProfile = found;
        }
        setStudentProfile(activeProfile);
      } else {
        localStorage.setItem(LOCAL_STORAGE_PROFILES_KEY, JSON.stringify([DEFAULT_PROFILE]));
        setProfiles([DEFAULT_PROFILE]);
        setStudentProfile(DEFAULT_PROFILE);
        // Automatically prompt the student to sign up or switch accounts with a fresh clean state
        setAccountsModalOpen(true);
      }
    } catch (e) {
      console.error("Local storage not accessible:", e);
    }
  }, []);

  // Save profile helper
  const saveProfile = (newProfile: StudentProfile) => {
    setStudentProfile(newProfile);
    
    setProfiles((prevProfiles) => {
      const updated = prevProfiles.map(p => (p.id || "default") === (newProfile.id || "default") ? newProfile : p);
      if (!updated.some(p => (p.id || "default") === (newProfile.id || "default"))) {
        updated.push(newProfile);
      }
      try {
        localStorage.setItem(LOCAL_STORAGE_PROFILES_KEY, JSON.stringify(updated));
        localStorage.setItem(LOCAL_STORAGE_ACTIVE_ID_KEY, newProfile.id || "default");
      } catch (e) {
        console.warn("Could not save profiles list:", e);
      }
      return updated;
    });
  };

  const handleSelectProfileId = (profileId: string) => {
    const found = profiles.find(p => (p.id || "default") === profileId);
    if (found) {
      setStudentProfile(found);
      try {
        localStorage.setItem(LOCAL_STORAGE_ACTIVE_ID_KEY, profileId);
      } catch (e) {
        console.warn("Could not save active profile id:", e);
      }
    }
  };

  const handleCreateProfile = (newProfile: StudentProfile) => {
    setProfiles((prev) => {
      const updated = [...prev, newProfile];
      try {
        localStorage.setItem(LOCAL_STORAGE_PROFILES_KEY, JSON.stringify(updated));
        localStorage.setItem(LOCAL_STORAGE_ACTIVE_ID_KEY, newProfile.id || "default");
      } catch (e) {
        console.warn("Could not save new profile:", e);
      }
      return updated;
    });
    setStudentProfile(newProfile);
    setActiveTab("dashboard");
  };

  const handleProfileChange = (updatedFields: Partial<StudentProfile>) => {
    const next = { ...studentProfile, ...updatedFields };
    // Allocate award badge if they complete their registration profile
    if (!next.unlockedBadgeIds.includes("first_login")) {
      next.unlockedBadgeIds.push("first_login");
    }
    saveProfile(next);
  };

  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to delete all profiles, scores, and start fresh?")) {
      const resetList = [DEFAULT_PROFILE];
      setProfiles(resetList);
      setStudentProfile(DEFAULT_PROFILE);
      try {
        localStorage.setItem(LOCAL_STORAGE_PROFILES_KEY, JSON.stringify(resetList));
        localStorage.setItem(LOCAL_STORAGE_ACTIVE_ID_KEY, "default");
      } catch (e) {
        console.warn("Could not reset localStorage:", e);
      }
      setActiveTab("dashboard");
    }
  };

  // Launch quiz callback
  const handleLaunchQuiz = (topic: Topic) => {
    setActiveQuizTopic(topic);
    // Track last active topic
    const next = { ...studentProfile, lastActiveTopicId: topic.id };
    saveProfile(next);
  };

  // Callback once quiz modal finishes and rewards collected
  const handleQuizComplete = (scorePercentage: number, starsEarned: number, xpEarned: number) => {
    if (!activeQuizTopic) return;

    const topicId = activeQuizTopic.id;
    const currentMaxScore = studentProfile.completedQuizzes[topicId] || 0;
    
    // Setup next profile attributes
    const updatedQuizzes = { ...studentProfile.completedQuizzes };
    if (scorePercentage > currentMaxScore) {
      updatedQuizzes[topicId] = scorePercentage;
    }

    const nextBadges = [...studentProfile.unlockedBadgeIds];
    let showNotification: string | null = null;

    // 1. Check "first_quiz"
    if (!nextBadges.includes("first_quiz")) {
      nextBadges.push("first_quiz");
      showNotification = "Quiz Explorer Bagde unlocked!";
    }

    // 2. Check "perfect_score"
    if (scorePercentage === 100 && !nextBadges.includes("perfect_score")) {
      nextBadges.push("perfect_score");
      showNotification = "Perfect Brainstar Badge unlocked!";
    }

    // 3. Count math quizzes to assign "math_wizard"
    const mathTopicsPassedCount = Object.keys(updatedQuizzes).filter(
      id => ["addition", "subtraction", "multiplication", "division", "decimals", "fractions", "perimeter", "area", "probability"].includes(id)
    ).length;

    if (mathTopicsPassedCount >= 2 && !nextBadges.includes("math_wizard")) {
      nextBadges.push("math_wizard");
      showNotification = "Math Prodigy Badge unlocked!";
    }

    // 4. English or french check "multi_lingual"
    const isLangPassed = updatedQuizzes["nouns_verbs"] !== undefined || 
                         updatedQuizzes["parts_of_speech"] !== undefined ||
                         updatedQuizzes["french_greetings"] !== undefined ||
                         updatedQuizzes["french_family"] !== undefined;

    if (isLangPassed && !nextBadges.includes("multi_lingual")) {
      nextBadges.push("multi_lingual");
      showNotification = "Languages Scholar Badge unlocked!";
    }

    // 5. Science explorer check
    const isSciencePassed = updatedQuizzes["living_things"] !== undefined || 
                            updatedQuizzes["solar_system"] !== undefined;

    if (isSciencePassed && !nextBadges.includes("explorer")) {
      nextBadges.push("explorer");
      showNotification = "Cosmic Scientist Badge unlocked!";
    }

    const updatedProfile: StudentProfile = {
      ...studentProfile,
      xp: studentProfile.xp + xpEarned,
      stars: studentProfile.stars + coinsEarned(starsEarned),
      completedQuizzes: updatedQuizzes,
      unlockedBadgeIds: nextBadges
    };

    function coinsEarned(val: number) {
      return val;
    }

    saveProfile(updatedProfile);
    setActiveQuizTopic(null);

    if (showNotification) {
      setNewlyUnlockedBadge(showNotification);
      setTimeout(() => setNewlyUnlockedBadge(null), 5000);
    }
  };

  const handleStartLearningSubject = (subjectId: "math" | "english" | "french" | "science" | null) => {
    if (!subjectId) {
      setActiveTab("dashboard");
    } else {
      setActiveTab(subjectId);
    }
  };

  const pagesMap: { [key: string]: React.ReactNode } = {
    dashboard: (
      <Dashboard 
        studentProfile={studentProfile}
        onChangeProfile={handleProfileChange}
        onNavigateToSubject={(id) => setActiveTab(id)}
        onNavigateToTopic={handleLaunchQuiz}
      />
    ),
    math: (
      <MathSection 
        studentProfile={studentProfile}
        onLaunchQuiz={handleLaunchQuiz}
        audioEnabled={audioEnabled}
      />
    ),
    english: (
      <SubjectSection 
        subjectId="english"
        studentProfile={studentProfile}
        onLaunchQuiz={handleLaunchQuiz}
        audioEnabled={audioEnabled}
      />
    ),
    french: (
      <SubjectSection 
        subjectId="french"
        studentProfile={studentProfile}
        onLaunchQuiz={handleLaunchQuiz}
        audioEnabled={audioEnabled}
      />
    ),
    science: (
      <SubjectSection 
        subjectId="science"
        studentProfile={studentProfile}
        onLaunchQuiz={handleLaunchQuiz}
        audioEnabled={audioEnabled}
      />
    ),
    quizzes: (
      <QuizzesPage 
        studentProfile={studentProfile}
        onLaunchQuiz={handleLaunchQuiz}
      />
    ),
    progress: (
      <ProgressPage 
        studentProfile={studentProfile}
      />
    ),
    about: (
      <AboutUs />
    ),
    courses: (
      <CoursesPage 
        onSelectTopic={handleLaunchQuiz} 
        onSelectSubject={(id) => setActiveTab(id)} 
      />
    ),
    resources: (
      <ResourcesPage />
    ),
    blog: (
      <BlogPage />
    ),
    contact: (
      <ContactPage />
    ),
    parent: (
      <ParentPortal studentProfile={studentProfile} />
    ),
    teacher: (
      <TeacherPortal />
    ),
    ai: (
      <AIPage studentProfile={studentProfile} />
    )
  };

  const sidebarTabs = [
    { id: "dashboard", label: "Dashboard Hub", icon: User },
    { id: "ai", label: "AI Tutor Companion", icon: Brain },
    { id: "courses", label: "Courses Catalog", icon: GraduationCap },
    { id: "math", label: "Math Syllabus", icon: Calculator },
    { id: "english", label: "English Syllabus", icon: BookOpen },
    { id: "french", label: "French Syllabus", icon: Languages },
    { id: "science", label: "Science Syllabus", icon: Sparkles },
    { id: "quizzes", label: "All Quizzes", icon: ClipboardCheck },
    { id: "progress", label: "Analytics Progress", icon: TrendingUp },
    { id: "resources", label: "Study Resources", icon: FolderDown },
    { id: "blog", label: "Education Blog", icon: Newspaper },
    { id: "parent", label: "Parent Portal", icon: Users },
    { id: "teacher", label: "Teacher Portal", icon: Shield },
    { id: "contact", label: "Contact & FAQ", icon: Mail },
    { id: "about", label: "About Us Mission", icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-brand-light flex flex-col font-sans relative antialiased text-brand-dark">
      
      {/* Newly unlocked badge alert toast banner */}
      <AnimatePresence>
        {newlyUnlockedBadge && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 16, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#2C3E50] text-white rounded-2xl px-6 py-4 shadow-2xl border border-[#F1C40F] flex items-center gap-3.5 max-w-sm w-full font-sans"
          >
            <div className="w-10 h-10 bg-[#F1C40F] rounded-xl flex items-center justify-center text-xl shrink-0 select-none">
              🏆
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#F1C40F] block tracking-wider font-mono">BADGE EARNED!</span>
              <span className="text-xs font-bold text-slate-100">{newlyUnlockedBadge}</span>
            </div>
            <button 
              onClick={() => setNewlyUnlockedBadge(null)}
              className="ml-auto text-slate-400 hover:text-white p-1 hover:bg-white/10 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GLOBAL BANNER / TOP LEVEL NAVIGATION BAR */}
      <nav id="be-main-navbar" className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo / Title Anchor */}
          <button 
            onClick={() => { setActiveTab("home"); setMobileMenuOpen(false); }}
            className="flex items-center gap-2.5 group cursor-pointer text-left"
          >
            <span className="w-10 h-10 bg-[#2D6CDF] rounded-xl flex items-center justify-center text-white font-extrabold shadow-lg shadow-[#2D6CDF]/20 group-hover:scale-105 transition-transform font-heading">
              BE
            </span>
            <div>
              <span className="font-extrabold text-base text-[#2C3E50] tracking-tight block font-heading">
                Best Education
              </span>
              <span className="text-[10px] text-[#2D6CDF] font-sans block leading-none font-semibold uppercase tracking-wider">
                Learn Smarter
              </span>
            </div>
          </button>

          {/* Desktop controls: quick statistics context */}
          <div className="hidden lg:flex items-center gap-6">
            
            {/* Quick stats items */}
            {activeTab !== "home" && (
              <div className="flex items-center gap-4 bg-slate-50 border px-4 py-1.5 rounded-full text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-[#F1C40F] font-bold" title="Total Stars Collected">
                  <Star className="w-3.5 h-3.5 fill-[#F1C40F]" /> {studentProfile.stars} Stars
                </span>
                <span className="w-px h-3.5 bg-slate-200"></span>
                <span className="flex items-center gap-1.5 text-[#2D6CDF] font-bold" title="Accumulated student XP points">
                  <Zap className="w-3.5 h-3.5 fill-blue-300" /> {studentProfile.xp} XP
                </span>
                <span className="w-px h-3.5 bg-slate-200"></span>
                <span className="text-[#2D6CDF] font-bold uppercase text-[9px] font-mono">
                  {studentProfile.level} Active
                </span>
              </div>
            )}

            {/* Navigation links */}
            <div className="flex flex-wrap items-center gap-1">
              {[
                { id: "home", label: "Home" },
                { id: "dashboard", label: "Dashboard" },
                { id: "courses", label: "Courses" },
                { id: "quizzes", label: "Quizzes" },
                { id: "resources", label: "Resources" },
                { id: "blog", label: "Blog" },
                { id: "contact", label: "Contact Us" },
                { id: "about", label: "About Us" }
              ].map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button 
                    key={link.id}
                    onClick={() => setActiveTab(link.id)}
                    className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      isActive 
                        ? "bg-[#2D6CDF] text-white shadow-xs" 
                        : "text-slate-500 hover:text-[#2C3E50] hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            {/* Right side helper controllers: Profiles, Sound and profile reset */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAccountsModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2D6CDF]/10 hover:bg-[#2D6CDF]/20 text-[#2D6CDF] text-xs font-extrabold rounded-xl transition-all cursor-pointer border border-[#2D6CDF]/20"
                title="Profiles, Gmail and Outlook Account Switcher"
              >
                <span className="text-sm select-none">{studentProfile.avatar}</span>
                <span className="hidden xl:inline">{studentProfile.name.split(" ")[0]}</span>
                <span className="text-[9px] bg-[#2D6CDF]/15 px-1.5 py-0.5 rounded text-[#2D6CDF] font-mono font-bold uppercase">Portals</span>
              </button>

              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-600 cursor-pointer"
                title={audioEnabled ? "Mute interactive noises" : "Enable student narration noises"}
              >
                {audioEnabled ? <Volume2 className="w-4 h-4 text-[#2ECC71]" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              </button>
              
              <button
                onClick={handleResetProgress}
                className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition-all cursor-pointer"
                title="Restart curriculum and restore default profile values"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Mobile responsive hamburger selector */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-500 hover:text-slate-700"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </nav>

      {/* MOBILE RESPONSIVE DRAWER OVERLAY MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#2C3E50] border-b border-[#34495E] text-white lg:hidden overflow-hidden sticky top-16 z-20 shadow-md text-left"
          >
            <div className="p-4 space-y-4">
              
              {/* Quick stats list */}
              <div className="flex items-center justify-around bg-black/15 p-3 rounded-2xl border border-white/10 text-xs font-bold">
                <span className="flex items-center gap-1 text-[#F1C40F] font-sans font-bold">
                  <Star className="w-4 h-4 fill-[#F1C40F]" /> {studentProfile.stars} Stars
                </span>
                <span className="w-px h-4 bg-white/10"></span>
                <span className="flex items-center gap-1 text-sky-400 font-sans font-bold">
                  <Zap className="w-4 h-4 fill-sky-300" /> {studentProfile.xp} XP
                </span>
                <span className="w-px h-4 bg-white/10"></span>
                <span className="text-[#2ECC71] font-mono text-xs">{studentProfile.level}</span>
              </div>

              {/* Navigation links stack matching sidebars */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: "home", label: "Home", color: "bg-white/5 text-gray-300" },
                  { id: "dashboard", label: "Dashboard Hub", color: "bg-[#2D6CDF] text-white" },
                  { id: "ai", label: "AI Companion", color: "bg-purple-950/40 text-purple-200" },
                  { id: "courses", label: "Courses", color: "bg-green-950/40 text-green-200" },
                  { id: "math", label: "Math Syllabus", color: "bg-blue-950/40 text-blue-200" },
                  { id: "english", label: "English Syllabus", color: "bg-emerald-950/40 text-emerald-200" },
                  { id: "french", label: "French Syllabus", color: "bg-orange-950/40 text-orange-200" },
                  { id: "science", label: "Science Syllabus", color: "bg-amber-950/40 text-amber-200" },
                  { id: "quizzes", label: "All Quizzes", color: "bg-white/5 text-gray-300" },
                  { id: "progress", label: "Analytics Log", color: "bg-white/5 text-gray-300" },
                  { id: "resources", label: "Resources", color: "bg-white/5 text-gray-300" },
                  { id: "blog", label: "Syllabus Blog", color: "bg-white/5 text-gray-300" },
                  { id: "parent", label: "Parent Portal", color: "bg-white/5 text-gray-300" },
                  { id: "teacher", label: "Teacher Portal", color: "bg-white/5 text-gray-300" },
                  { id: "contact", label: "Contact Us", color: "bg-white/5 text-gray-300" },
                  { id: "about", label: "Our Mission", color: "bg-white/5 text-gray-300" }
                ].map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                      className={`p-2.5 font-bold rounded-xl text-center border border-white/5 ${
                        isActive ? "bg-[#2D6CDF] text-white" : item.color
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
                
                {/* Profiles & Accounts button inside mobile cabinet */}
                <button
                  onClick={() => { setAccountsModalOpen(true); setMobileMenuOpen(false); }}
                  className="p-2.5 font-bold rounded-xl text-center border bg-[#2D6CDF]/20 border-[#2D6CDF]/30 text-[#6ea3ff] hover:bg-[#2D6CDF]/35 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-white" /> Switch Accounts / Sign Up
                </button>

                {/* Reset button inside mobile cabinet */}
                <button
                  onClick={() => { handleResetProgress(); setMobileMenuOpen(false); }}
                  className="p-2.5 font-bold rounded-xl text-center border bg-red-950/40 border-red-900 text-red-400 hover:bg-red-900/50 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear Progress
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE ROUTING ROUTE VIEWER AND CONTAINER SEGMENT */}
      <div className="flex-1 w-full flex flex-col">
        {activeTab === "home" ? (
          /* full-bleed home template */
          <Homepage 
            onStartLearning={handleStartLearningSubject}
            onSelectLevelClick={() => setActiveTab("dashboard")}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        ) : (
          /* dashboard / internal navigation containing the responsive modern student sidebar layout */
          <div className="max-w-7xl mx-auto px-4 py-8 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Desktop persistent left sidebar drawer (strictly mapping 'Vibrant Palette' sidebar spec) */}
            <aside id="be-desktop-sidebar" className="hidden lg:block lg:col-span-3 space-y-5">
              
              <div className="bg-[#2C3E50] text-white rounded-3xl p-5 border border-[#34495E] shadow-sm space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="text-3xl select-none">👦</div>
                  <div>
                    <h4 className="font-extrabold text-sm text-white font-heading">
                      {studentProfile.name}
                    </h4>
                    <span className="text-[10px] text-gray-300 font-semibold block uppercase">
                      Class Level: {studentProfile.level}
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#34495E] pt-3 flex items-center justify-between text-xs font-semibold">
                  <span className="text-gray-300">Total Progress Stars:</span>
                  <span className="text-[#F1C40F] font-extrabold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#F1C40F]" /> {studentProfile.stars}
                  </span>
                </div>
              </div>

              {/* Sidebar navigation list */}
              <div className="bg-[#2C3E50] rounded-3xl p-4 border border-[#34495E] shadow-sm space-y-1 text-left">
                <span className="text-[9px] uppercase font-bold text-gray-400 block px-3 mb-2 font-mono">
                  Syllabus Operations
                </span>

                {sidebarTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left font-bold text-xs transition-colors ${isActive ? "bg-[#2D6CDF] text-white shadow-md shadow-[#2D6CDF]/20" : "text-gray-300 hover:text-white hover:bg-white/5"}`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Learning Buddy widget as specified in Vibrant Palette spec */}
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-left">
                <p className="text-[10px] text-gray-400 mb-2 uppercase font-extrabold tracking-widest font-mono">Learning Buddy</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F1C40F] border-2 border-white flex items-center justify-center text-xl shrink-0 select-none">
                    🦉
                  </div>
                  <div>
                    <span className="text-sm font-extrabold text-white leading-none block">Smarty Owl</span>
                    <span className="text-[9px] text-[#2ECC71] font-bold block mt-0.5">Level 12 • Pro</span>
                  </div>
                </div>
              </div>

              {/* Support safety notice */}
              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl text-left text-[11px] text-slate-300 leading-normal font-sans">
                <CheckCircle className="w-3.5 h-3.5 text-[#2ECC71] inline-block mr-1" />
                <strong>100% Safe Zone:</strong> Safe, ad-free learning browser setup.
              </div>
            </aside>

            {/* Dynamic internal page viewport block */}
            <main id="be-internal-content" className="lg:col-span-9 w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full"
                >
                  {pagesMap[activeTab] || pagesMap["dashboard"]}
                </motion.div>
              </AnimatePresence>
            </main>

          </div>
        )}
      </div>

      {/* FOOTER DIVISION */}
      <footer className="bg-white border-t border-slate-100 py-6 text-center text-xs text-slate-400 font-sans mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-indigo-600 text-white font-extrabold rounded flex items-center justify-center text-xs">
              BE
            </span>
            <span className="font-bold text-slate-700">Best Education App™</span>
          </div>
          <div>
            <span>Developed for West African KG ➔ JHS3 Students • 100% Free & Open-Source</span>
          </div>
          <div>
            <span>Built with React, Tailwind & Motion</span>
          </div>
        </div>
      </footer>

      {/* DYNAMIC GAME QUIZ POPUP MODAL OVERLAY */}
      <AnimatePresence>
        {activeQuizTopic && (
          <QuizModal 
            topic={activeQuizTopic}
            onClose={() => setActiveQuizTopic(null)}
            onComplete={handleQuizComplete}
          />
        )}
      </AnimatePresence>

      <AccountsManager 
        isOpen={accountsModalOpen}
        onClose={() => setAccountsModalOpen(false)}
        currentProfile={studentProfile}
        profiles={profiles}
        onSelectProfile={handleSelectProfileId}
        onCreateProfile={handleCreateProfile}
      />

    </div>
  );
}
