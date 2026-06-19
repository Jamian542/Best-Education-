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
  GraduationCap
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

export default function VideoTutorialPlayer({ topic, globalAudioEnabled }: VideoTutorialPlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeScene, setActiveScene] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0); // 0 to 100 within active scene
  const [playSpeed, setPlaySpeed] = useState<number>(1);
  const [localAudioMuted, setLocalAudioMuted] = useState<boolean>(!globalAudioEnabled);
  
  // Timer interval storage
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto synchronising local mute state if global audio state is changed
  useEffect(() => {
    setLocalAudioMuted(!globalAudioEnabled);
  }, [globalAudioEnabled]);

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
    
    if (localAudioMuted) return;

    const utterance = new SpeechSynthesisUtterance(text);
    // Setting suitable pitch and speed
    utterance.pitch = 1.1; // friendly educational tone
    utterance.rate = playSpeed * 1.05; // speed synchronization!
    
    window.speechSynthesis.speak(utterance);
  };

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

  return (
    <div id={`video-player-container-${topic.id}`} className="bg-[#1A252F] border border-[#2C3E50] rounded-3xl overflow-hidden shadow-xl mb-6 text-left relative max-w-4xl mx-auto">
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
      <div className="relative aspect-video bg-[#2C3E50]/90 p-6 flex flex-col justify-between overflow-hidden group select-none min-h-[280px] sm:min-h-[340px]">
        
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
        <div className="w-full flex justify-center z-10 pt-2">
          <div className="bg-black/80 px-4 py-2.5 rounded-2xl border border-white/10 max-w-xl text-center shadow-lg">
            <p className="text-xs text-[#2ECC71] font-mono uppercase font-bold tracking-widest block text-left text-[9px] mb-0.5">
              🔊 Speaker smarty owl narration:
            </p>
            <p className="text-xs text-gray-100 font-sans leading-normal line-clamp-2 md:line-clamp-none">
              {currentSceneObj.narratorText}
            </p>
          </div>
        </div>

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
              <span>{isPlaying ? "PAUSE walk" : "PLAY VIDEO WALKTHROUGH"}</span>
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
