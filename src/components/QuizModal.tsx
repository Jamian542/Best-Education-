/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  Trophy, 
  Star, 
  Zap, 
  ChevronRight, 
  HelpCircle,
  Activity,
  Smile,
  RefreshCw,
  Award
} from "lucide-react";
import { Topic, Question } from "../types";
import { VISUAL_ICONS } from "../data/learningContent";

interface QuizModalProps {
  topic: Topic;
  onClose: () => void;
  onComplete: (scorePercentage: number, starsEarned: number, xpEarned: number) => void;
}

export default function QuizModal({ topic, onClose, onComplete }: QuizModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubscribedAnswer, setHasSubscribedAnswer] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const questions: Question[] = topic.quiz;
  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectOption = (option: string) => {
    if (hasSubscribedAnswer) return;
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || hasSubscribedAnswer) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    if (isCorrect) {
      setCorrectAnswersCount(prev => prev + 1);
    }
    setHasSubscribedAnswer(true);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setHasSubscribedAnswer(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleFinishQuiz = () => {
    const rawScore = correctAnswersCount / questions.length;
    const scorePercentage = Math.round(rawScore * 100);
    const xpEarned = correctAnswersCount * 25 + (scorePercentage === 100 ? 50 : 0);
    const starsEarned = Math.ceil(correctAnswersCount * 1.5) + (scorePercentage === 100 ? 2 : 0);

    onComplete(scorePercentage, starsEarned, xpEarned);
  };

  const renderVisualAid = () => {
    const aid = currentQuestion.visualAid;
    if (!aid) return null;

    if (aid.type === "count" && aid.count && aid.icon) {
      const emoji = VISUAL_ICONS[aid.icon as keyof typeof VISUAL_ICONS] || "⭐";
      return (
        <div className="flex flex-wrap items-center justify-center gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          {Array.from({ length: aid.count }).map((_, i) => (
            <motion.span 
              key={i} 
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}
              className={`text-2xl ${aid.color || "text-amber-500"}`}
            >
              {emoji}
            </motion.span>
          ))}
          <span className="text-xs text-slate-400 font-bold block w-full text-center mt-1 font-mono">
            Count: {aid.count} items
          </span>
        </div>
      );
    }

    if (aid.type === "equation" && aid.text) {
      return (
        <div className="p-4 bg-indigo-900/5 text-center rounded-2xl border border-indigo-100 font-mono text-lg font-bold text-indigo-700">
          {aid.text}
        </div>
      );
    }

    if (aid.type === "shapes") {
      return (
        <div className="flex justify-center gap-4 py-4">
          <div className="w-16 h-16 rounded-full border-4 border-indigo-600 bg-indigo-50 flex items-center justify-center font-bold text-indigo-700">1/2</div>
          <div className="w-16 h-16 rounded-2xl border-4 border-amber-500 bg-amber-50 flex items-center justify-center font-bold text-amber-700">2/4</div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]"
      >
        {/* Header indicator */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">
              Quiz: {topic.name}
            </span>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-200 rounded-full transition-all text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!showSummary ? (
          /* ACTIVE QUESTIONS INTERFACE */
          <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-6">
            
            {/* Progress status bar */}
            <div>
              <div className="flex justify-between items-center text-xs text-slate-400 font-bold mb-1.5 font-mono">
                <span>QUESTION {currentQuestionIndex + 1} OF {questions.length}</span>
                <span className="text-blue-600">{Math.round(((currentQuestionIndex) / questions.length) * 100)}% COMPLETE</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-300 rounded-full"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="text-left space-y-4">
              <h2 className="text-lg md:text-xl font-bold font-heading text-slate-800 leading-snug">
                {currentQuestion.questionText}
              </h2>

              {/* Render dynamic graphic support widget */}
              {renderVisualAid()}
            </div>

            {/* Multi Choice Options List */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const getOptionStyling = () => {
                  if (hasSubscribedAnswer) {
                    if (option === currentQuestion.correctAnswer) {
                      return "bg-green-50 border-green-300 text-green-800 ring-2 ring-green-100";
                    }
                    if (option === selectedOption) {
                      return "bg-red-50 border-red-300 text-red-800 ring-2 ring-red-100";
                    }
                    return "bg-white border-slate-100 text-slate-400 opacity-60";
                  }
                  
                  if (option === selectedOption) {
                    return "bg-blue-50 border-blue-400 text-blue-700 ring-4 ring-blue-100";
                  }
                  return "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300";
                };

                const optionLetter = String.fromCharCode(65 + idx); // A, B, C, D

                return (
                  <button
                    key={option}
                    onClick={() => handleSelectOption(option)}
                    disabled={hasSubscribedAnswer}
                    className={`w-full flex items-center p-4 rounded-2xl border text-left font-bold transition-all ${getOptionStyling()} font-sans relative overflow-hidden`}
                  >
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-mono border mr-4 shrink-0 font-extrabold ${selectedOption === option ? "bg-amber-400 border-amber-300 text-slate-900" : "bg-slate-50 border-slate-200 text-slate-500"}`}>
                      {optionLetter}
                    </span>
                    <span className="text-sm md:text-base">{option}</span>
                    
                    {/* Tick / Cross decorator */}
                    {hasSubscribedAnswer && option === currentQuestion.correctAnswer && (
                      <span className="ml-auto bg-green-500 text-white p-1 rounded-full shrink-0">
                        <CheckCircle className="w-4 h-4 fill-green-500 text-white" />
                      </span>
                    )}
                    {hasSubscribedAnswer && option === selectedOption && option !== currentQuestion.correctAnswer && (
                      <span className="ml-auto bg-red-400 text-white p-1 rounded-full shrink-0">
                        <AlertCircle className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanations block on submitted answers */}
            <AnimatePresence>
              {hasSubscribedAnswer && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={`p-4 rounded-2xl border text-left text-xs text-slate-700 flex gap-3 ${selectedOption === currentQuestion.correctAnswer ? "bg-green-50 border-green-200" : "bg-red-50/50 border-red-200"}`}
                >
                  <HelpCircle className={`w-5 h-5 shrink-0 ${selectedOption === currentQuestion.correctAnswer ? "text-green-600" : "text-red-500"}`} />
                  <div>
                    <h4 className="font-bold mb-1 uppercase tracking-wider text-[10px]">
                      {selectedOption === currentQuestion.correctAnswer ? "Super Job! Correct answer" : "Nice Attempt! Explanation:"}
                    </h4>
                    <p className="leading-relaxed font-sans">{currentQuestion.explanation}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Interactive flow controller buttons */}
            <div className="pt-2">
              {!hasSubscribedAnswer ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedOption}
                  className={`w-full py-3.5 rounded-2xl font-extrabold shadow-md transition-all flex items-center justify-center gap-2 ${selectedOption ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/10 cursor-pointer" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
                >
                  Confirm Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-2xl font-extrabold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {currentQuestionIndex < questions.length - 1 ? (
                    <>
                      Next Question
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      See My Score Report
                      <Trophy className="w-4 h-4 text-amber-300" />
                    </>
                  )}
                </button>
              )}
            </div>

          </div>
        ) : (
          /* CELEBRATORY SCORE REPORT INTERFACE */
          <div className="p-8 text-center space-y-6 overflow-y-auto flex-1">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 10 }}
              className="w-24 h-24 bg-gradient-to-tr from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-amber-400/20"
            >
              <Trophy className="w-12 h-12 text-slate-950" />
            </motion.div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                Syllabus Chapter Passed
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 font-heading">
                Outstanding effort!
              </h2>
              <p className="text-slate-500 text-sm font-sans max-w-sm mx-auto">
                You've successfully addressed the evaluation quiz on <span className="font-semibold text-slate-700">{topic.name}</span>.
              </p>
            </div>

            {/* Score circle */}
            <div className="inline-block bg-slate-50 border border-slate-100 rounded-2xl px-8 py-5 text-center">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block font-mono">My Score</span>
              <span className="text-4xl font-extrabold text-slate-800 font-heading">
                {correctAnswersCount} / {questions.length}
              </span>
              <span className="text-xs text-green-600 block font-bold font-sans mt-1">
                ({Math.round((correctAnswersCount / questions.length) * 100)}% Correct)
              </span>
            </div>

            {/* Rewards visual layout */}
            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                </div>
                <div className="text-left font-sans">
                  <span className="text-xs text-amber-800 font-semibold block">Stars Earned</span>
                  <span className="text-lg font-bold text-amber-950">+{Math.ceil(correctAnswersCount * 1.5) + (Math.round((correctAnswersCount/questions.length)*100) === 100 ? 2 : 0)} ⭐</span>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-500 fill-blue-400" />
                </div>
                <div className="text-left font-sans">
                  <span className="text-xs text-blue-800 font-semibold block">XP Added</span>
                  <span className="text-lg font-bold text-blue-950">+{correctAnswersCount * 25 + (Math.round((correctAnswersCount/questions.length)*100) === 100 ? 50 : 0)} XP</span>
                </div>
              </div>
            </div>

            {/* Encouraging copy based on score */}
            <div className="text-xs text-slate-400 border-t border-slate-100 pt-5 flex items-center justify-center gap-1.5 font-sans">
              <Award className="w-4 h-4 text-emerald-500" /> 
              {correctAnswersCount === questions.length ? "Perfect Score! You are a Math Wizard!" : "Practice makes perfect! Take lessons to get a full star rating."}
            </div>

            <button
              onClick={handleFinishQuiz}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold py-3.5 rounded-2xl shadow-xl shadow-blue-500/20 text-sm transition-all flex items-center justify-center gap-2"
            >
              Collect Rewards & Exit
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
