/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Clock, 
  Tv,
  GraduationCap,
  Sliders,
  Settings2,
  Users,
  Heart,
  Smile,
  RefreshCw,
  SlidersHorizontal
} from "lucide-react";
import { Topic } from "../types";

// Dynamic Video slides / narration storyboard generator for ANY given topic
interface VideoScene {
  id: number;
  title: string;
  narratorText: string;
  visualTitle: string;
  visualSubtitle: string;
  visualCode: string; // large bold text/formula in the blackboard center
  explainPoints: string[];
  visualEmoji: string;
}

interface VideoTutorialPlayerProps {
  topic: Topic;
  globalAudioEnabled: boolean;
}

// Interactive custom classroom tutor characters with tailored synthesizer parameters!
interface TutorProfile {
  id: string;
  name: string;
  role: string;
  avatar: string;
  pitch: number;
  rate: number;
  genderPreference: 'female' | 'male' | 'none';
  customDescription: string;
  tagline: string;
  themeColor: string;
}

const TUTOR_PROFILES: TutorProfile[] = [
  {
    id: "smarty_owl",
    name: "Smarty Owl",
    role: "AI Classroom Mascot",
    avatar: "🦉",
    pitch: 1.25,
    rate: 1.05,
    genderPreference: 'none',
    customDescription: "High-pitched, enthusiastic, fast-paced educational owl guide.",
    tagline: "Whoo-whoo! Let's solve this together!",
    themeColor: "from-blue-500 to-[#2D6CDF]"
  },
  {
    id: "teacher_ama",
    name: "Teacher Ama",
    role: "Syllabus Headmistress",
    avatar: "👩‍🏫",
    pitch: 1.05,
    rate: 0.90,
    genderPreference: 'female',
    customDescription: "Closer to standard classroom teaching; warm, paced, and steady.",
    tagline: "Take your time, you are doing wonderfully!",
    themeColor: "from-emerald-500 to-green-600"
  },
  {
    id: "prof_arthur",
    name: "Prof. Arthur",
    role: "Senior Science Fellow",
    avatar: "👨‍🏫",
    pitch: 0.85,
    rate: 0.95,
    genderPreference: 'male',
    customDescription: "Authoritative, classical baritone tone for complex diagrams.",
    tagline: "Let us examine the precise details here.",
    themeColor: "from-indigo-500 to-purple-600"
  },
  {
    id: "kid_kofi",
    name: "Buddy Kofi",
    role: "Your Peer Study Companion",
    avatar: "👦",
    pitch: 1.35,
    rate: 1.15,
    genderPreference: 'none',
    customDescription: "Bright, fast voice that feels like learning with a school friend.",
    tagline: "Awesome work! This lesson is super fun!",
    themeColor: "from-amber-500 to-orange-600"
  }
];

export default function VideoTutorialPlayer({ topic, globalAudioEnabled }: VideoTutorialPlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeScene, setActiveScene] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0); // 0 to 100 within active scene
  const [playSpeed, setPlaySpeed] = useState<number>(1);
  const [localAudioMuted, setLocalAudioMuted] = useState<boolean>(!globalAudioEnabled);
  
  // High quality voice synthesis customizations
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>("");
  const [selectedTutorId, setSelectedTutorId] = useState<string>("smarty_owl");
  
  // Custom manual slider overrides
  const [userPitch, setUserPitch] = useState<number>(1.25);
  const [userRate, setUserRate] = useState<number>(1.05);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [showVoiceCustomizer, setShowVoiceCustomizer] = useState<boolean>(false);
  
  // Timer interval storage
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto synchronising local mute state if global audio state is changed
  useEffect(() => {
    setLocalAudioMuted(!globalAudioEnabled);
  }, [globalAudioEnabled]);

  // Load operating system / browser Speech Synthesis voices dynamically
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const loadBrowserVoices = () => {
        const allVoices = window.speechSynthesis.getVoices();
        // Look for English (en) and French (fr) language packs
        const filtered = allVoices.filter(v => v.lang.startsWith("en") || v.lang.startsWith("fr"));
        setVoices(filtered);

        // Pre-select the highest quality English voice if currently empty
        if (filtered.length > 0) {
          const preferredDefault = filtered.find(v => 
            v.name.toLowerCase().includes("google us english") ||
            v.name.toLowerCase().includes("natural") ||
            v.name.toLowerCase().includes("premium") ||
            v.name.toLowerCase().includes("samantha") || 
            v.name.toLowerCase().includes("zira")
          ) || filtered[0];
          
          setSelectedVoiceURI(preferredDefault.voiceURI);
        }
      };

      loadBrowserVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadBrowserVoices;
      }
    }
  }, []);

  // Update voice preset inputs whenever the child chooses a different Tutor Profile
  useEffect(() => {
    const tutorObj = TUTOR_PROFILES.find(p => p.id === selectedTutorId);
    if (tutorObj) {
      setUserPitch(tutorObj.pitch);
      setUserRate(tutorObj.rate);

      // Auto-assign matching OS voice if available
      if (voices.length > 0) {
        const matchingVoice = voices.find(v => {
          const nameLower = v.name.toLowerCase();
          if (tutorObj.genderPreference === "female") {
            return nameLower.includes("female") || nameLower.includes("samantha") || nameLower.includes("zira") || nameLower.includes("karen");
          }
          if (tutorObj.genderPreference === "male") {
            return nameLower.includes("male") || nameLower.includes("david") || nameLower.includes("daniel") || nameLower.includes("guy");
          }
          return false;
        });
        if (matchingVoice) {
          setSelectedVoiceURI(matchingVoice.voiceURI);
        }
      }
    }
  }, [selectedTutorId, voices]);

  // Generate 4 highly educational storyboard scenes tailored specifically to the selected topic's data!
  const getStoryboard = (t: Topic): VideoScene[] => {
    const isMath = t.subjectId === "math";
    const isEnglish = t.subjectId === "english";
    const isFrench = t.subjectId === "french";
    const iconMap: Record<string, string> = {
      math: "🔢",
      english: "📖",
      french: "🇫🇷",
      science: "🔬"
    };
    const defaultEmoji = iconMap[t.subjectId] || "🦉";

    return [
      {
        id: 0,
        title: "Introduction",
        narratorText: `Hello future scholar! Welcome to our standard school lesson on ${t.name}. In this tutorial, we will learn about ${t.description.replace('!', '')}. Get comfortable, and let's absorb this together!`,
        visualTitle: `Chapter Intro: ${t.name}`,
        visualSubtitle: `${t.subjectId.toUpperCase()} • CLASS LEVEL RANGE: ${t.levels.join(", ")}`,
        visualCode: t.name,
        explainPoints: [
          `Subject Area: ${isMath ? 'Mathematics' : isEnglish ? 'English Core' : isFrench ? 'French (Salutations)' : 'Natural Science'}`,
          `Study difficulty target: ${t.difficulty} standards`,
          "Narration speed: Adaptive"
        ],
        visualEmoji: defaultEmoji
      },
      {
        id: 1,
        title: "The Main Concept",
        narratorText: `${t.lessonContent.explanation} Remember that studying this gives us critical thinking skills to solve problems naturally every single day.`,
        visualTitle: "Core Study Principles",
        visualSubtitle: "Understanding the foundations",
        visualCode: "💡 CORE LESSON",
        explainPoints: t.lessonContent.keyPoints.slice(0, 2),
        visualEmoji: "💡"
      },
      {
        id: 2,
        title: "Syllabus Example",
        narratorText: `${t.lessonContent.visualExample?.title || "Let's review a realistic example"}! ${t.lessonContent.visualExample?.description || "Here is a step by step example problem to master."}`,
        visualTitle: t.lessonContent.visualExample?.title || "Classroom Demonstration",
        visualSubtitle: "Dynamic Equation walkthrough",
        visualCode: t.lessonContent.visualExample?.equation || "📝 Example Problem",
        explainPoints: t.lessonContent.visualExample?.steps?.slice(0, 3) || [
          "Follow the visual layouts",
          "Break complex queries down into smaller counts",
          "Focus on the relationships"
        ],
        visualEmoji: "📝"
      },
      {
        id: 3,
        title: "Quick Review Tip",
        narratorText: `For our expert lesson strategy: always remember: ${t.lessonContent.keyPoints[2] || t.lessonContent.keyPoints[0]}. You are now completely prepared to ace this study test and earn some stars!`,
        visualTitle: "Smarty Owl Exam Strategy",
        visualSubtitle: "Summary of important formulas",
        visualCode: "🏆 PRACTICE PERFECT",
        explainPoints: [
          t.lessonContent.keyPoints[2] || "Review instructions frequently",
          "Double check your homework calculations",
          "Attempt the Study Challenge below!"
        ],
        visualEmoji: "👑"
      }
    ];
  };

  const scenes = getStoryboard(topic);
  const currentSceneObj = scenes[activeScene];

  // Narration playback handle using standard browser speechSynthesis
  const speakSceneNarration = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    
    // Stop any standing speech first to prevent double overlaps
    window.speechSynthesis.cancel();
    
    if (localAudioMuted) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Apply voice tone customizations (pitch, velocity, and selected Hardware Voice)
    utterance.pitch = userPitch;
    // Base pitch modified with user select & speed scale multiplier
    utterance.rate = userRate * playSpeed;
    
    // Assign chosen hardware system voice if custom selected
    if (selectedVoiceURI) {
      const matchV = voices.find(v => v.voiceURI === selectedVoiceURI);
      if (matchV) {
        utterance.voice = matchV;
      }
    }

    // Connect event logs to drive active status animations (soundwave bouncing equalizer)
    utterance.onstart = () => {
      setIsSpeaking(true);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
    // Fallback assert speaking status
    setIsSpeaking(true);
  };

  // Immediate narration update on live parameter adjustments while active
  useEffect(() => {
    if (isPlaying) {
      speakSceneNarration(currentSceneObj.narratorText);
    } else {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    }
  }, [selectedTutorId, selectedVoiceURI, userPitch, userRate]);

  // Playback timer controls
  useEffect(() => {
    if (isPlaying) {
      // Speak the narration of active scene when starting/changing scenes
      speakSceneNarration(currentSceneObj.narratorText);

      // Scene duration: 12 seconds standard base, scales with speed setting
      const sceneDurationMs = 12000;
      const stepMs = 100;
      const progressIncrement = (100 / (sceneDurationMs / stepMs)) * playSpeed;

      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            // Check if there is a next scene
            if (activeScene < scenes.length - 1) {
              setActiveScene((s) => s + 1);
              return 0; // reset progress
            } else {
              // End of video reached
              setIsPlaying(false);
              setIsSpeaking(false);
              return 100;
            }
          }
          return Math.min(100, prev + progressIncrement);
        });
      }, stepMs);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setIsSpeaking(false);
      // Stop speaking when paused
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, activeScene, playSpeed, localAudioMuted, topic.id]);

  // Clean up window TTS on unmounting
  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // When selected topic changes, reset the playhead completely
  useEffect(() => {
    setIsPlaying(false);
    setIsSpeaking(false);
    setActiveScene(0);
    setProgress(0);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, [topic.id]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setProgress(0);
    setActiveScene(0);
    setIsPlaying(true);
  };

  const selectScene = (idx: number) => {
    setActiveScene(idx);
    setProgress(0);
    // Auto play when clicked
    setIsPlaying(true);
  };

  const handleNextScene = () => {
    if (activeScene < scenes.length - 1) {
      setActiveScene(activeScene + 1);
      setProgress(0);
    }
  };

  const handlePrevScene = () => {
    if (activeScene > 0) {
      setActiveScene(activeScene - 1);
      setProgress(0);
    }
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    
    // Divide the percentage across the scenes list
    const totalScenes = scenes.length;
    const targetSceneFloat = percentage * totalScenes;
    const targetSceneIdx = Math.min(totalScenes - 1, Math.floor(targetSceneFloat));
    const sceneProgressOffset = (targetSceneFloat - targetSceneIdx) * 100;

    setActiveScene(targetSceneIdx);
    setProgress(sceneProgressOffset);
    if (isPlaying) {
      speakSceneNarration(scenes[targetSceneIdx].narratorText);
    }
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 1.75];
    const currentIndex = speeds.indexOf(playSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaySpeed(speeds[nextIndex]);
  };

  // Resolve tutor active information
  const activeTutor = TUTOR_PROFILES.find(p => p.id === selectedTutorId) || TUTOR_PROFILES[0];

  return (
    <div id={`video-player-container-${topic.id}`} className="bg-[#1A252F] border border-[#2C3E50] rounded-3xl overflow-hidden shadow-xl mb-6 text-left relative max-w-4xl mx-auto">
      
      {/* Dynamic inline equalizer CSS classes injection */}
      <style>{`
        @keyframes customTutorWave {
          0% { transform: scaleY(0.1); }
          100% { transform: scaleY(1); }
        }
      `}</style>

      {/* Top Banner indicating interactive smart class video walkthrough style */}
      <div className="bg-[#2D6CDF] px-4 py-2.5 flex items-center justify-between text-white text-xs font-bold font-sans">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded bg-white/20 flex items-center justify-center text-xs animate-pulse">📺</span>
          <span>SMARTY OWL CLASSROOM VIDEO TUTORIAL</span>
        </div>
        <div className="flex items-center gap-2 bg-black/15 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wide">
          <GraduationCap className="w-3.5 h-3.5 text-[#F1C40F]" />
          <span>GHANA GRADE STD: {topic.levels[0]}</span>
        </div>
      </div>

      {/* Main Classroom blackboard sandbox screen */}
      <div className="relative aspect-video bg-[#2C3E50]/90 p-5 flex flex-col justify-between overflow-hidden group select-none min-h-[290px] sm:min-h-[350px]">
        
        {/* Chalk/Grid pattern layer representing school blackboard */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        
        {/* Header HUD: scene info */}
        <div className="flex items-start justify-between z-10 w-full">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#F1C40F] tracking-widest font-mono block">
              TOPIC WALKTHROUGH • SCENE {activeScene + 1}/4
            </span>
            <h4 className="text-sm font-black text-white mix-blend-difference">
              {currentSceneObj.visualTitle}
            </h4>
          </div>

          <div className="flex gap-1.5">
            {scenes.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => selectScene(idx)}
                className={`w-7 py-1 text-[10px] font-bold rounded-md font-mono transition-all ${idx === activeScene ? "bg-[#F1C40F] text-slate-900 shadow-md transform scale-105" : "bg-black/30 text-white/50 hover:bg-black/45"}`}
                title={`Jump to ${s.title}`}
              >
                S{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Center Sandbox: Animated whiteboard showing concepts visual aids */}
        <div className="flex-1 flex flex-col items-center justify-center py-4 z-10 text-center space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScene}
              initial={{ opacity: 0, scale: 0.95, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -5 }}
              transition={{ duration: 0.25 }}
              className="space-y-3 max-w-md w-full"
            >
              {/* Massive flying emoji and code representation */}
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl sm:text-5xl animate-bounce filter drop-shadow-md select-none">
                  {currentSceneObj.visualEmoji}
                </span>
                <span className="text-2xl sm:text-3xl font-black font-heading text-[#ECF0F1] block bg-black/25 px-4 py-1.5 rounded-2xl border border-white/5 tracking-tight">
                  {currentSceneObj.visualCode}
                </span>
              </div>

              {/* Sub-explanation details bullets */}
              <div className="space-y-1 bg-black/15 p-3 rounded-2xl border border-white/5 inline-block text-left w-full">
                {currentSceneObj.explainPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                    <Sparkles className="w-3.5 h-3.5 text-[#F1C40F] shrink-0 mt-0.5" />
                    <span className="font-sans font-medium leading-tight">{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Overlay captions at the bottom representing narrator verbal dialogue */}
        <div className="w-full flex flex-col md:flex-row items-center gap-3 justify-between z-10 pt-2 bg-black/45 p-3 rounded-2xl border border-white/5">
          
          {/* Active presenter avatar details */}
          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
            <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${activeTutor.themeColor} flex items-center justify-center text-lg shadow-inner relative`}>
              <span>{activeTutor.avatar}</span>
              {/* Animated active beacon pulse */}
              {isSpeaking && isPlaying && (
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#2ECC71] rounded-full border border-white animate-ping"></span>
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-[#ECF0F1] leading-none mb-0.5">{activeTutor.name}</p>
              <p className="text-[9px] font-mono font-medium text-gray-300 tracking-wide uppercase">{activeTutor.role}</p>
            </div>
          </div>

          {/* Dialogue speech captions */}
          <div className="flex-1 text-center md:text-left min-w-0">
            <p className="text-[11px] text-gray-100 font-sans leading-relaxed line-clamp-3 md:line-clamp-none italic font-medium">
              "{currentSceneObj.narratorText}"
            </p>
          </div>

          {/* Equalizer Visualizer */}
          <div className="flex items-center gap-1.5 shrink-0 bg-black/35 px-2.5 py-1.5 rounded-xl border border-white/5">
            <div className="flex items-end gap-[2px] h-3.5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((bar) => {
                const uniqueHeight = [6, 14, 10, 16, 8, 12, 15, 7][bar - 1];
                return (
                  <div
                    key={bar}
                    className="w-[3px] bg-[#2ECC71] rounded-full origin-bottom"
                    style={{
                      height: `${uniqueHeight}px`,
                      animation: isSpeaking && isPlaying ? "customTutorWave 0.5s ease-in-out infinite alternate" : "none",
                      animationDelay: `${bar * 0.08}s`,
                      transform: isSpeaking && isPlaying ? "scaleY(1)" : "scaleY(0.2)",
                    }}
                  />
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* TUTOR SELECTION DECK & PRESET CUSTOMISER */}
      <div className="bg-[#243342] border-t border-[#2C3E50] p-4 font-sans text-slate-100">
        
        {/* Segmented title & Customiser toggle */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#F1C40F]" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Select Your Classroom Tutor Teacher:
            </span>
          </div>

          <button
            onClick={() => setShowVoiceCustomizer(!showVoiceCustomizer)}
            className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
              showVoiceCustomizer 
                ? "bg-[#2D6CDF] border-[#2D6CDF] text-white" 
                : "bg-black/20 border-white/10 text-gray-300 hover:bg-black/30"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{showVoiceCustomizer ? "Hide Settings" : "Tweak Voice Detail"}</span>
          </button>
        </div>

        {/* Tutor selection buttons grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {TUTOR_PROFILES.map((profile) => {
            const isSelected = profile.id === selectedTutorId;
            return (
              <button
                key={profile.id}
                onClick={() => setSelectedTutorId(profile.id)}
                className={`p-3 rounded-2xl text-left transition-all border outline-none text-xs flex items-center gap-2.5 cursor-pointer group hover:scale-[1.01] ${
                  isSelected 
                    ? "bg-[#1E2E3E] border-[#2D6CDF] ring-2 ring-[#2D6CDF]/30" 
                    : "bg-black/20 border-transparent hover:border-white/10 hover:bg-black/25"
                }`}
              >
                <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${profile.themeColor} flex items-center justify-center text-lg shadow-inner group-hover:rotate-12 transition-transform`}>
                  {profile.avatar}
                </div>
                <div className="min-w-0">
                  <h5 className="font-extrabold text-white leading-tight flex items-center gap-1">
                    {profile.name}
                    {isSelected && <span className="w-1.5 h-1.5 bg-[#2ECC71] rounded-full"></span>}
                  </h5>
                  <p className="text-[10px] text-gray-400 font-mono truncate">{profile.role}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Real-time description note */}
        <div className="p-2.5 bg-black/15 rounded-xl text-[11px] text-gray-300 border border-white/5 flex items-center gap-2 mb-1">
          <span className="font-bold text-[#F1C40F]">🎤 Current Quote:</span>
          <span>"{activeTutor.tagline}"</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-400 italic font-mono text-[10px]">{activeTutor.customDescription}</span>
        </div>

        {/* Collapsible fine tuning voice synthesizer cockpit controls */}
        <AnimatePresence>
          {showVoiceCustomizer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-4 bg-black/15 p-4 rounded-2xl">
                
                {/* OS Installed Voice Pack selector dropdown */}
                <div className="space-y-1.5 md:col-span-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-300 block">
                    Device Native Engine Voice:
                  </label>
                  {voices.length === 0 ? (
                    <div className="text-[10px] text-red-300 p-2 bg-red-950/20 rounded-lg border border-red-900/10 font-mono leading-tight">
                      No voices discovered. Using system default voice standard.
                    </div>
                  ) : (
                    <select
                      value={selectedVoiceURI}
                      onChange={(e) => setSelectedVoiceURI(e.target.value)}
                      className="w-full bg-[#1A252F] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none font-mono focus:border-[#2D6CDF]"
                    >
                      {voices.map((v) => (
                        <option key={v.voiceURI} value={v.voiceURI} className="bg-slate-900 text-white">
                          {v.name} ({v.lang.toUpperCase()})
                        </option>
                      ))}
                    </select>
                  )}
                  <p className="text-[9px] text-gray-400 font-medium">
                    Choosing different native voices gives you high-definition pronunciations!
                  </p>
                </div>

                {/* Voice Pitch slider */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-slate-300">
                    <span>Voice Tone (Pitch):</span>
                    <span className="font-mono text-[#F1C40F]">{userPitch.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.05"
                    value={userPitch}
                    onChange={(e) => setUserPitch(parseFloat(e.target.value))}
                    className="w-full accent-[#2D6CDF] bg-black/40 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[8px] text-gray-400 font-mono">
                    <span>DEEP BARITONE (0.5)</span>
                    <span>CHILD OWL (2.0)</span>
                  </div>
                </div>

                {/* Tutor Base Speed Rate slider */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-slate-300">
                    <span>Tutor Speech Speed:</span>
                    <span className="font-mono text-[#2ECC71]">{userRate.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.05"
                    value={userRate}
                    onChange={(e) => setUserRate(parseFloat(e.target.value))}
                    className="w-full accent-[#2ECC71] bg-black/40 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[8px] text-gray-400 font-mono">
                    <span>SLOW (0.5)</span>
                    <span>RAPID WALK (2.0)</span>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Video timeline player controller metrics bar */}
      <div className="bg-[#2C3E50] border-t border-[#34495E] p-4 text-white font-sans">
        
        {/* Timeline Slider Track */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-mono text-gray-300">
            {`0:${String(activeScene * 15 + Math.floor(progress * 0.15)).padStart(2, "0")}`}
          </span>

          <div 
            onClick={handleTimelineClick}
            className="flex-1 h-3 bg-black/40 rounded-full overflow-hidden relative cursor-pointer group"
          >
            {/* Visual dividing notches for scenes */}
            <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white/20 z-10"></div>
            <div className="absolute left-2/4 top-0 bottom-0 w-px bg-white/20 z-10"></div>
            <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white/20 z-10"></div>

            {/* Filled player status timeline bar */}
            <div 
              className="h-full bg-gradient-to-r from-[#2D6CDF] to-[#2ECC71] rounded-full transition-all duration-100 relative"
              style={{ width: `${((activeScene * 100 + progress) / 4)}%` }}
            >
              {/* Glow thumb on hover */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#2ECC71] shadow-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>

          <span className="text-[10px] font-mono text-gray-300">1:00</span>
        </div>

        {/* Video buttons hud */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Main Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevScene}
              disabled={activeScene === 0}
              className="p-2 bg-black/20 hover:bg-black/35 rounded-xl border border-white/5 transition-colors disabled:opacity-30 disabled:pointer-events-none"
              title="Previous scene"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              className={`px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${isPlaying ? "bg-[#E67E22] hover:bg-[#D35400] text-white" : "bg-[#2ECC71] hover:bg-[#27AE60] text-white"}`}
              title={isPlaying ? "Pause walkthrough tutorial" : "Play vocal walkthrough tutorial"}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isPlaying ? "PAUSE WALKTHROUGH" : "PLAY VIDEO TUTORIAL"}</span>
            </button>
            
            <button
              onClick={handleNextScene}
              disabled={activeScene === scenes.length - 1}
              className="p-2 bg-black/20 hover:bg-black/35 rounded-xl border border-white/5 transition-colors disabled:opacity-30 disabled:pointer-events-none"
              title="Next scene"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleRestart}
              className="p-2 bg-black/20 hover:bg-black/35 rounded-xl border border-white/5 text-gray-300 hover:text-white transition-colors"
              title="Reset parameters to scene 1 intro"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Configuration tools */}
          <div className="flex items-center gap-4 text-xs font-bold leading-none">
            {/* Speed controller */}
            <button
              onClick={cycleSpeed}
              className="px-3 py-2 bg-black/20 hover:bg-black/35 rounded-xl border border-white/5 font-mono text-[10px] text-gray-200 transition-colors"
              title="Toggle fast narration speech compression"
            >
              SPEED: {playSpeed}x
            </button>

            {/* In-player local volume mute toggler */}
            <button
              onClick={() => setLocalAudioMuted(!localAudioMuted)}
              className="p-2.5 bg-black/20 hover:bg-black/35 rounded-xl border border-white/5 transition-colors text-gray-300 hover:text-white"
              title={localAudioMuted ? "Unmute vocal synthesizer narrations" : "Mute synthesizer voice"}
            >
              {localAudioMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#2ECC71]" />}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
