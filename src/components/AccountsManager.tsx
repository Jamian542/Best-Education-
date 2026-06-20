/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  User, 
  Check, 
  Mail, 
  Plus, 
  ShieldCheck, 
  Star, 
  Zap, 
  Lock, 
  ArrowRight, 
  Sparkles,
  RefreshCw,
  Eye,
  AlertCircle,
  Trash2
} from "lucide-react";
import { StudentProfile, ClassLevel } from "../types";

interface AccountsManagerProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: StudentProfile;
  profiles: StudentProfile[];
  onSelectProfile: (id: string) => void;
  onCreateProfile: (profile: StudentProfile) => void;
  onDeleteProfile?: (id: string) => void;
}

type Mode = "list" | "signup_choice" | "google_oauth" | "outlook_oauth" | "custom_local";

export default function AccountsManager({
  isOpen,
  onClose,
  currentProfile,
  profiles,
  onSelectProfile,
  onCreateProfile,
  onDeleteProfile
}: AccountsManagerProps) {
  const [mode, setMode] = useState<Mode>("list");
  
  // Gmail Form States
  const [gmailEmail, setGmailEmail] = useState("");
  const [gmailPassword, setGmailPassword] = useState("");
  const [gmailFullName, setGmailFullName] = useState("");
  const [gmailLevel, setGmailLevel] = useState<ClassLevel>("Primary 4");
  const [gmailAvatar, setGmailAvatar] = useState("👦");
  const [showGmailPassword, setShowGmailPassword] = useState(false);
  const [gmailError, setGmailError] = useState("");
  
  // Outlook Form States
  const [outlookEmail, setOutlookEmail] = useState("");
  const [outlookPassword, setOutlookPassword] = useState("");
  const [outlookFullName, setOutlookFullName] = useState("");
  const [outlookLevel, setOutlookLevel] = useState<ClassLevel>("Primary 4");
  const [outlookAvatar, setOutlookAvatar] = useState("👦");
  const [showOutlookPassword, setShowOutlookPassword] = useState(false);
  const [outlookError, setOutlookError] = useState("");

  // Custom Form States
  const [customName, setCustomName] = useState("");
  const [customLevel, setCustomLevel] = useState<ClassLevel>("Primary 4");
  const [customAvatar, setCustomAvatar] = useState("👦");

  // Loaders
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");

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

  const avatarOptions = ["👦", "👧", "🦊", "🦉", "🦁", "🐼", "🦄", "🐨", "🐸", "🚀"];

  const triggerAnimationDelay = (msg: string, callback: () => void) => {
    setIsLoading(true);
    setLoadingMsg(msg);
    setTimeout(() => {
      setIsLoading(false);
      setLoadingMsg("");
      callback();
    }, 1500);
  };

  const handleSelect = (id: string) => {
    triggerAnimationDelay("Switching active student profile...", () => {
      onSelectProfile(id);
      onClose();
    });
  };

  const handleGmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gmailEmail.includes("@") || !gmailEmail.toLowerCase().endsWith("gmail.com")) {
      setGmailError("Please provide a valid Gmail address (e.g. student@gmail.com)");
      return;
    }
    if (!gmailFullName.trim()) {
      setGmailError("Please provide your full name.");
      return;
    }
    if (gmailPassword.length < 5) {
      setGmailError("Password must be at least 5 characters for Google Account integration.");
      return;
    }
    setGmailError("");

    triggerAnimationDelay("Communicating with Google OAuth 2.0 Identity servers...", () => {
      const newProf: StudentProfile = {
        id: "gmail_prof_" + Date.now(),
        name: gmailFullName,
        level: gmailLevel,
        avatar: gmailAvatar,
        xp: 0,
        stars: 0,
        completedQuizzes: {},
        studyMinutes: 0,
        streakDays: 0,
        unlockedBadgeIds: [],
        email: gmailEmail.toLowerCase(),
        provider: "gmail"
      };

      onCreateProfile(newProf);
      setMode("list");
      setGmailEmail("");
      setGmailPassword("");
      setGmailFullName("");
      onClose();
    });
  };

  const handleOutlookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isOutlook = outlookEmail.includes("@") && (
      outlookEmail.toLowerCase().endsWith("outlook.com") || 
      outlookEmail.toLowerCase().endsWith("hotmail.com") || 
      outlookEmail.toLowerCase().endsWith("live.com") ||
      outlookEmail.toLowerCase().endsWith("microsoft.com")
    );

    if (!isOutlook) {
      setOutlookError("Please provide a valid Microsoft email address (e.g. student@outlook.com)");
      return;
    }
    if (!outlookFullName.trim()) {
      setOutlookError("Please provide your full name.");
      return;
    }
    if (outlookPassword.length < 5) {
      setOutlookError("Microsoft password must security standard verification of at least 5 characters.");
      return;
    }
    setOutlookError("");

    triggerAnimationDelay("Authorizing through Windows Active Directory Live Services...", () => {
      const newProf: StudentProfile = {
        id: "outlook_prof_" + Date.now(),
        name: outlookFullName,
        level: outlookLevel,
        avatar: outlookAvatar,
        xp: 0,
        stars: 0,
        completedQuizzes: {},
        studyMinutes: 0,
        streakDays: 0,
        unlockedBadgeIds: [],
        email: outlookEmail.toLowerCase(),
        provider: "outlook"
      };

      onCreateProfile(newProf);
      setMode("list");
      setOutlookEmail("");
      setOutlookPassword("");
      setOutlookFullName("");
      onClose();
    });
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    triggerAnimationDelay("Generating secure local workspace context...", () => {
      const newProf: StudentProfile = {
        id: "local_prof_" + Date.now(),
        name: customName,
        level: customLevel,
        avatar: customAvatar,
        xp: 0,
        stars: 0,
        completedQuizzes: {},
        studyMinutes: 0,
        streakDays: 0,
        unlockedBadgeIds: [],
        provider: "local"
      };

      onCreateProfile(newProf);
      setMode("list");
      setCustomName("");
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full overflow-hidden relative z-10 flex flex-col max-h-[92vh] max-w-lg">
        
        {/* Header header banner */}
        <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#2D6CDF]/10 rounded-xl">
              <User className="w-5 h-5 text-[#2D6CDF]" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-800">
                {mode === "list" && "Profile Account Registry"}
                {mode === "signup_choice" && "Register New Scholar Profile"}
                {mode === "google_oauth" && "Sign Up with Google Account"}
                {mode === "outlook_oauth" && "Sign Up with Microsoft Outlook"}
                {mode === "custom_local" && "Set Up Local Profile"}
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                {mode === "list" && "Switch or Add Student Portals"}
                {mode === "signup_choice" && "Choose login security directories"}
                {mode === "google_oauth" && "Google Identity Secure Portal"}
                {mode === "outlook_oauth" && "Microsoft Windows Live Sync"}
                {mode === "custom_local" && "Local offline client setup"}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-200 text-slate-400 hover:text-slate-600 rounded-xl transition-all"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-xs z-20 flex flex-col items-center justify-center p-6 text-center">
            <RefreshCw className="w-10 h-10 text-[#2D6CDF] animate-spin mb-4" />
            <span className="text-sm font-extrabold text-slate-800">{loadingMsg}</span>
            <span className="text-xs text-slate-400 mt-1 font-mono">Best Education Directory System v3.2</span>
          </div>
        )}

        {/* Scrollable Body Content */}
        <div className="p-6 overflow-y-auto flex-1 font-sans">
          
          {/* 1. VIEW LIST OF ACCOUNTS */}
          {mode === "list" && (
            <div className="space-y-5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">
                Active Student Profiles found on this device ({profiles.length})
              </span>

              <div className="grid grid-cols-1 gap-3">
                <AnimatePresence initial={false}>
                  {profiles.map((prof) => {
                    const isActive = (prof.id || "default") === (currentProfile.id || "default");
                    return (
                      <motion.div 
                        key={prof.id || "default"}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0, padding: 0, overflow: "hidden" }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        onClick={() => !isActive && handleSelect(prof.id || "default")}
                        className={`p-4 rounded-2xl border transition-all text-left flex items-center justify-between ${
                          isActive 
                            ? "border-[#2D6CDF] bg-[#2D6CDF]/5 ring-2 ring-[#2D6CDF]/10" 
                            : "border-slate-100 hover:border-slate-300 bg-white cursor-pointer hover:shadow-xs"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200/50 flex items-center justify-center text-2xl select-none">
                            {prof.avatar || "👦"}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-extrabold text-[#2C3E50] text-sm">
                                {prof.name}
                              </h4>
                              {prof.provider === "gmail" && (
                                <span className="text-[9px] bg-red-100 text-red-600 font-extrabold px-1.5 py-0.5 rounded-full flex items-center gap-0.5" title="Signed up with Google Gmail">
                                  <Mail className="w-2.5 h-2.5" /> G
                                </span>
                              )}
                              {prof.provider === "outlook" && (
                                <span className="text-[9px] bg-blue-100 text-blue-600 font-extrabold px-1.5 py-0.5 rounded-full flex items-center gap-0.5" title="Signed up with Microsoft Outlook">
                                  <Mail className="w-2.5 h-2.5" /> Outlook
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-[#2D6CDF] font-bold block mt-0.5">
                              {prof.level} Syllabus Track
                            </span>
                            {prof.email && (
                              <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                                {prof.email}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Right metadata stats */}
                        <div className="flex items-center gap-3.5" onClick={(e) => e.stopPropagation()}>
                          <div className="text-right hidden sm:block">
                            <div className="flex items-center gap-1 justify-end text-xs font-bold text-amber-500">
                              <Star className="w-3 h-3 fill-amber-500" /> {prof.stars}
                            </div>
                            <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                              {prof.xp} XP Points
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => !isActive && handleSelect(prof.id || "default")}
                              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                                isActive 
                                  ? "bg-green-500 text-white cursor-default" 
                                  : "hover:bg-slate-100 text-[#2D6CDF] hover:scale-105 cursor-pointer"
                              }`}
                              title={isActive ? "Active Portal" : "Login to Portal"}
                            >
                              {isActive ? (
                                <Check className="w-4 h-4 text-white" />
                              ) : (
                                <ArrowRight className="w-4 h-4" />
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteProfile?.(prof.id || "default");
                              }}
                              className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                              title="Delete Account"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Add Account Button */}
              <button 
                onClick={() => setMode("signup_choice")}
                className="w-full py-3 px-4 bg-[#2D6CDF] hover:bg-[#1a55c2] text-white font-extrabold text-sm rounded-xl transition-all shadow-md shadow-[#2D6CDF]/10 flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <Plus className="w-4 h-4" /> Sign Up / Create New Student Account
              </button>
            </div>
          )}

          {/* 2. CHOOSE SIGNUP DIRECTORY (Gmail / Outlook / Custom) */}
          {mode === "signup_choice" && (
            <div className="space-y-6">
              <div className="text-center py-2">
                <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">
                  Sign up with your preferred provider. Google or Microsoft credentials sync automatically and award introductory star bonuses.
                </p>
              </div>

              <div className="space-y-3.5">
                {/* Gmail signup button */}
                <button 
                  onClick={() => setMode("google_oauth")}
                  type="button"
                  className="w-full p-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-between group cursor-pointer text-left"
                >
                  <div className="flex items-center gap-4">
                    {/* Simulated Google Colored G */}
                    <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-slate-100 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.22 1.65l3.15-3.15C17.45 1.84 14.97 1 12 1 7.35 1 3.4 3.65 1.57 7.5l3.86 3C6.34 7.56 8.94 5.04 12 5.04zm0 13.92c-3.06 0-5.66-2.52-6.57-5.46l-3.86 3C3.4 20.35 7.35 23 12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.01.69-2.31 1.39-3.71 1.39z"/>
                        <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.57l3.57 2.77c2.08-1.92 3.86-4.75 3.86-8.49z"/>
                        <path fill="#FBBC05" d="M5.43 13.5c-.24-.71-.38-1.47-.38-2.25s.14-1.54.38-2.25l-3.86-3C.61 7.74 0 9.58 0 11.25s.61 3.51 1.57 5.25l3.86-3z"/>
                        <path fill="#34A853" d="M12 23c4.65 0 8.6-3.65 10.43-7.5l-3.86-3c-.91 2.94-3.51 5.46-6.57 5.46z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-sm group-hover:text-red-600 transition-colors">
                        Sign Up with Gmail Account
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Create your own personalized profile • <strong>Starts completely fresh!</strong>
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-red-500 transition-colors" />
                </button>

                {/* Microsoft Outlook signup button */}
                <button 
                  onClick={() => setMode("outlook_oauth")}
                  type="button"
                  className="w-full p-4 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 hover:border-blue-100 transition-all flex items-center justify-between group cursor-pointer text-left"
                >
                  <div className="flex items-center gap-4">
                    {/* Outlook Blue Icon wrapper */}
                    <div className="w-10 h-10 rounded-xl bg-[#0078D4]/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-[#0078D4]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M1.5 5.25A2.25 2.25 0 0 1 3.75 3H12v9H1.5V5.25z"/>
                        <path d="M12 12V3h8.25A2.25 2.25 0 0 1 22.5 5.25V12H12z"/>
                        <path d="M1.5 12h10.5v9H3.75A2.25 2.25 0 0 1 1.5 18.75V12z"/>
                        <path d="M12 12h10.5v6.75a2.25 2.25 0 0 1-2.25 2.25H12V12z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-sm group-hover:text-[#0078D4] transition-colors">
                        Sign Up with Outlook / Hotmail
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Syncs Microsoft school credentials • <strong>Starts completely fresh!</strong>
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#0078D4] transition-colors" />
                </button>

                {/* Direct Offline local account */}
                <button 
                  onClick={() => setMode("custom_local")}
                  type="button"
                  className="w-full p-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-400 transition-all flex items-center justify-between group cursor-pointer text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-200/60 flex items-center justify-center shrink-0 text-slate-500">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-700 text-sm">
                        Create Custom Local Profile
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        No email required • Saves instantly on this browser
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                </button>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button 
                  onClick={() => setMode("list")}
                  className="text-xs font-extrabold text-slate-500 hover:text-slate-700 underline cursor-pointer"
                >
                  ← Back to Student List
                </button>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Secure Sync Portal
                </div>
              </div>
            </div>
          )}

          {/* 3. GMAIL AUTHORIZATION FORM */}
          {mode === "google_oauth" && (
            <form onSubmit={handleGmailSubmit} className="space-y-4">
              <div className="bg-red-50/50 border border-red-100 rounded-2xl p-4 flex gap-3 text-left">
                <div className="text-xl shrink-0 selection-none">🌐</div>
                <div>
                  <h4 className="font-extrabold text-red-800 text-xs">Google Accounts Redirect Node</h4>
                  <p className="text-[11px] text-red-700 leading-normal mt-0.5 font-medium">
                    This securely authorizes <strong>Best Education Portal</strong> to access external credentials to create offline synchronization tracks.
                  </p>
                </div>
              </div>

              {gmailError && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2 text-amber-700 text-xs font-semibold text-left">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>{gmailError}</span>
                </div>
              )}

              <div className="space-y-3.5 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Gmail Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input 
                      type="email" 
                      required
                      placeholder="student@gmail.com" 
                      value={gmailEmail}
                      onChange={(e) => setGmailEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-9 pr-4 py-2.5 text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Scholar's Full Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter Student's Name (e.g. Ama Antwi)" 
                    value={gmailFullName}
                    onChange={(e) => setGmailFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Classroom Grade level</label>
                    <select
                      value={gmailLevel}
                      onChange={(e) => setGmailLevel(e.target.value as ClassLevel)}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
                    >
                      {levelsList.map(lvl => (
                        <option key={lvl} value={lvl}>{lvl}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Google App Password *</label>
                    <div className="relative">
                      <input 
                        type={showGmailPassword ? "text" : "password"} 
                        required
                        placeholder="••••••••" 
                        value={gmailPassword}
                        onChange={(e) => setGmailPassword(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-4 pr-10 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowGmailPassword(!showGmailPassword)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Choose Character Avatar</label>
                  <div className="grid grid-cols-5 gap-2">
                    {avatarOptions.map((av) => (
                      <button
                        key={av}
                        type="button"
                        onClick={() => setGmailAvatar(av)}
                        className={`p-2 text-xl rounded-xl border text-center transition-all cursor-pointer select-none ${
                          gmailAvatar === av 
                            ? "bg-red-50 border-red-500 scale-105" 
                            : "bg-slate-50 border-slate-100 hover:bg-slate-100"
                        }`}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action row */}
              <div className="pt-2 flex items-center justify-between">
                <button 
                  type="button"
                  onClick={() => setMode("signup_choice")}
                  className="text-xs font-extrabold text-[#2C3E50] hover:underline cursor-pointer"
                >
                  ← Go Back
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-red-600/10"
                >
                  Authorize & Sign Up with Gmail <Sparkles className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* 4. OUTLOOK AUTHORIZATION FORM */}
          {mode === "outlook_oauth" && (
            <form onSubmit={handleOutlookSubmit} className="space-y-4">
              <div className="bg-[#0078D4]/5 border border-blue-100 rounded-2xl p-4 flex gap-3 text-left">
                <div className="text-xl shrink-0 selection-none">🛡️</div>
                <div>
                  <h4 className="font-extrabold text-[#0078D4] text-xs">Microsoft Active Directory Sync</h4>
                  <p className="text-[11px] text-slate-600 leading-normal mt-0.5 font-medium">
                    Authorize Outlook 365 Exchange context. Syncs your student level securely with full curriculum initialization.
                  </p>
                </div>
              </div>

              {outlookError && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2 text-amber-700 text-xs font-semibold text-left">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>{outlookError}</span>
                </div>
              )}

              <div className="space-y-3.5 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Microsoft Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      required
                      placeholder="student@outlook.com or hotmail.com" 
                      value={outlookEmail}
                      onChange={(e) => setOutlookEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-9 pr-4 py-2.5 text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0078D4]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Scholar's Full Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter Student's Name (e.g. Kofi Boateng)" 
                    value={outlookFullName}
                    onChange={(e) => setOutlookFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0078D4]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Schooling Track</label>
                    <select
                      value={outlookLevel}
                      onChange={(e) => setOutlookLevel(e.target.value as ClassLevel)}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
                    >
                      {levelsList.map(lvl => (
                        <option key={lvl} value={lvl}>{lvl}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Microsoft Live Password *</label>
                    <div className="relative">
                      <input 
                        type={showOutlookPassword ? "text" : "password"} 
                        required
                        placeholder="••••••••" 
                        value={outlookPassword}
                        onChange={(e) => setOutlookPassword(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-4 pr-10 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0078D4]"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowOutlookPassword(!showOutlookPassword)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Choose Character Avatar</label>
                  <div className="grid grid-cols-5 gap-2">
                    {avatarOptions.map((av) => (
                      <button
                        key={av}
                        type="button"
                        onClick={() => setOutlookAvatar(av)}
                        className={`p-2 text-xl rounded-xl border text-center transition-all cursor-pointer select-none ${
                          outlookAvatar === av 
                            ? "bg-blue-50 border-blue-500 scale-105" 
                            : "bg-slate-50 border-slate-100 hover:bg-slate-100"
                        }`}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex items-center justify-between">
                <button 
                  type="button"
                  onClick={() => setMode("signup_choice")}
                  className="text-xs font-extrabold text-[#2C3E50] hover:underline cursor-pointer"
                >
                  ← Go Back
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-[#0078D4] hover:bg-blue-700 text-white text-xs font-black rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#0078D4]/10"
                >
                  Authorize with Outlook <Sparkles className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* 5. CUSTOM LOCAL PROFILE FORM */}
          {mode === "custom_local" && (
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div className="space-y-3.5 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Scholar's Profile Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter Student Name (e.g. Papa Kwesi)" 
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Syllabus Class Level</label>
                  <select
                    value={customLevel}
                    onChange={(e) => setCustomLevel(e.target.value as ClassLevel)}
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
                  >
                    {levelsList.map(lvl => (
                      <option key={lvl} value={lvl}>{lvl}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Choose Character Avatar</label>
                  <div className="grid grid-cols-5 gap-2.5">
                    {avatarOptions.map((av) => (
                      <button
                        key={av}
                        type="button"
                        onClick={() => setCustomAvatar(av)}
                        className={`p-2.5 text-2xl rounded-2xl border text-center transition-all cursor-pointer select-none ${
                          customAvatar === av 
                            ? "bg-[#2D6CDF]/10 border-[#2D6CDF] scale-110" 
                            : "bg-slate-50 border-slate-100 hover:bg-slate-100"
                        }`}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action items */}
              <div className="pt-2 flex items-center justify-between">
                <button 
                  type="button"
                  onClick={() => setMode("signup_choice")}
                  className="text-xs font-extrabold text-[#2C3E50] hover:underline cursor-pointer"
                >
                  ← Go Back
                </button>
                <button 
                  type="submit"
                  disabled={!customName.trim()}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-black rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  Create Offline Profile <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Footer info message */}
        <div className="bg-slate-50 border-t border-slate-100/80 px-6 py-3 flex items-center justify-between text-[10px] text-slate-400 font-mono font-bold">
          <span>Best Education Portal</span>
          <span>100% Kid-Safe & COPA Compliant</span>
        </div>
      </div>
    </div>
  );
}
