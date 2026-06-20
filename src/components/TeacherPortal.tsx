/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, 
  PlusCircle, 
  Users, 
  Trash2, 
  CheckCircle, 
  ListCheck, 
  BookOpen, 
  Calculator, 
  Upload, 
  Loader2, 
  Award,
  Sparkles
} from "lucide-react";
import { SubjectId, DifficultyLevel, ClassLevel } from "../types";

interface ClassroomStudent {
  id: string;
  name: string;
  level: string;
  gradeScore: number;
  completedQuizzes: number;
  attendanceDays: number;
}

const INITIAL_ROSTER: ClassroomStudent[] = [
  { id: "st_1", name: "Ama Boateng", level: "Primary 4", gradeScore: 92, completedQuizzes: 4, attendanceDays: 61 },
  { id: "st_2", name: "Kofi Appiah", level: "Primary 4", gradeScore: 84, completedQuizzes: 3, attendanceDays: 59 },
  { id: "st_3", name: "Kwame Asante", level: "Primary 5", gradeScore: 78, completedQuizzes: 2, attendanceDays: 56 },
  { id: "st_4", name: "Elsa Osei", level: "Primary 4", gradeScore: 96, completedQuizzes: 5, attendanceDays: 63 }
];

export default function TeacherPortal() {
  const [roster, setRoster] = useState<ClassroomStudent[]>(INITIAL_ROSTER);
  const [newLessonSubject, setNewLessonSubject] = useState<SubjectId>("math");
  const [newLessonName, setNewLessonName] = useState("");
  const [newLessonDesc, setNewLessonDesc] = useState("");
  const [newLessonDifficulty, setNewLessonDifficulty] = useState<DifficultyLevel>("Beginner");
  
  const [assignmentSubject, setAssignmentSubject] = useState<SubjectId>("science");
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentDeadline, setAssignmentDeadline] = useState("");

  const [loadingAction, setLoadingAction] = useState<"lesson" | "assignment" | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Grading states
  const [gradingStudentId, setGradingStudentId] = useState<string | null>(null);
  const [tempGrade, setTempGrade] = useState<number>(100);

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonName || !newLessonDesc) return;

    setLoadingAction("lesson");
    setStatusMessage(null);

    setTimeout(() => {
      setLoadingAction(null);
      setStatusMessage(`SUCCESS: New Lesson "${newLessonName}" was successfully deployed to the active student syllabus!`);
      setNewLessonName("");
      setNewLessonDesc("");
      setTimeout(() => setStatusMessage(null), 5000);
    }, 1500);
  };

  const handleUploadAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignmentTitle || !assignmentDeadline) return;

    setLoadingAction("assignment");
    setStatusMessage(null);

    setTimeout(() => {
      setLoadingAction(null);
      setStatusMessage(`SUCCESS: Course Assignment "${assignmentTitle}" was successfully uploaded with deadline ${assignmentDeadline}!`);
      setAssignmentTitle("");
      setAssignmentDeadline("");
      setTimeout(() => setStatusMessage(null), 5000);
    }, 1500);
  };

  const handleUpdateGradeSubmit = (studentId: string) => {
    setRoster(prev => prev.map(s => s.id === studentId ? { ...s, gradeScore: Math.min(100, Math.max(0, tempGrade)) } : s));
    setGradingStudentId(null);
  };

  // Average calculation
  const classGradeAverage = Math.round(roster.reduce((sum, s) => sum + s.gradeScore, 0) / roster.length);

  return (
    <div className="bg-slate-50 min-h-screen py-8 rounded-3xl text-left">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center lg:text-left mb-8">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 rounded-full inline-block mb-2">
            Multi-User Classroom console
          </span>
          <h1 className="text-3xl font-extrabold text-[#2C3E50] tracking-tight font-heading">
            Teacher Portal
          </h1>
          <p className="text-slate-500 text-xs">
            Manage your digital school classrooms. Build dynamic custom lessons, design mock-graded assignments, and track active student profiles.
          </p>
        </div>

        {/* Global Success / Action Toast notification banner */}
        {statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`p-4 rounded-2xl mb-6 text-xs font-bold border flex items-center gap-2 ${
              statusMessage.includes("SUCCESS") 
                ? "bg-green-50 border-green-200 text-green-700" 
                : "bg-blue-50 border-blue-200 text-blue-700"
            }`}
          >
            <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
            <span>{statusMessage}</span>
          </motion.div>
        )}

        {/* Classroom Summary Metrics widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs">
            <span className="text-xs text-slate-400 block font-bold mb-1 uppercase">Students Managed</span>
            <span className="text-2xl font-black text-slate-800">{roster.length} Accounts</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs">
            <span className="text-xs text-slate-400 block font-bold mb-1 uppercase">Classroom GPA Average</span>
            <span className="text-2xl font-black text-[#2D6CDF]">{classGradeAverage}% Avg</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs">
            <span className="text-xs text-slate-400 block font-bold mb-1 uppercase">Active Assignments</span>
            <span className="text-2xl font-black text-[#E67E22]">3 Tasks</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs">
            <span className="text-xs text-slate-400 block font-bold mb-1 uppercase font-mono">Academic Term</span>
            <span className="text-2xl font-black text-green-600">2026 - Term 1</span>
          </div>
        </div>

        {/* Main split dashboard section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block (7 Columns): Lesson creator & assignment upload forms */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Deploy Lesson Form */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/60 shadow-xs relative">
              <h2 className="text-lg font-extrabold text-[#2C3E50] mb-5 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-indigo-600" /> Create & Deploy New Lesson
              </h2>

              <form onSubmit={handleCreateLesson} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">Subject Track</label>
                    <select
                      value={newLessonSubject}
                      onChange={(e) => setNewLessonSubject(e.target.value as SubjectId)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-500 text-slate-600"
                    >
                      <option value="math">Mathematics</option>
                      <option value="english">English</option>
                      <option value="french">French</option>
                      <option value="science">Science</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">Difficulty Level</label>
                    <select
                      value={newLessonDifficulty}
                      onChange={(e) => setNewLessonDifficulty(e.target.value as DifficultyLevel)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-500 text-slate-600"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">Chapter or Topic Title</label>
                  <input
                    type="text"
                    required
                    value={newLessonName}
                    onChange={(e) => setNewLessonName(e.target.value)}
                    placeholder="e.g. Area & Perimeter of Triangles"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-700"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">Lesson Narrative / Explanations</label>
                  <textarea
                    required
                    rows={4}
                    value={newLessonDesc}
                    onChange={(e) => setNewLessonDesc(e.target.value)}
                    placeholder="Provide simple child-friendly explanations, key summaries, or equations..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-700 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loadingAction === "lesson"}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3.5 rounded-2xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {loadingAction === "lesson" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Deploying and building syllabus...</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-4 h-4" />
                      <span>Publish Lesson Live to School Classroom</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Deploy Assignments Form */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-xs">
              <h2 className="text-lg font-extrabold text-[#2C3E50] mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-orange-500" /> Upload Course Assignments
              </h2>

              <form onSubmit={handleUploadAssignment} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">Subject</label>
                    <select
                      value={assignmentSubject}
                      onChange={(e) => setAssignmentSubject(e.target.value as SubjectId)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-orange-500 text-slate-600"
                    >
                      <option value="math">Mathematics</option>
                      <option value="science">Science</option>
                      <option value="english">English</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">Submission Deadline</label>
                    <input
                      type="date"
                      required
                      value={assignmentDeadline}
                      onChange={(e) => setAssignmentDeadline(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-orange-500 text-slate-600"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">Assignment Name & Tasks</label>
                  <input
                    type="text"
                    required
                    value={assignmentTitle}
                    onChange={(e) => setAssignmentTitle(e.target.value)}
                    placeholder="e.g. French Salutations Pronunciation Audio Upload"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-slate-700"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loadingAction === "assignment"}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-3 rounded-2xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {loadingAction === "assignment" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  <span>Publish Assignment Sheet</span>
                </button>
              </form>
            </div>

          </div>

          {/* Right Block (5 Columns): Grade student work & Monitor student progress */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-xs">
              <h2 className="text-lg font-extrabold text-[#2C3E50] mb-5 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#2D6CDF]" /> Classroom Roster & Performance
              </h2>

              <div className="space-y-4">
                {roster.map((student) => {
                  const isGrading = gradingStudentId === student.id;

                  return (
                    <div
                      key={student.id}
                      className="p-4 border border-slate-100 rounded-2xl space-y-3 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold font-sans">👦</span>
                          <div>
                            <span className="font-extrabold text-slate-800 text-xs block leading-tight">{student.name}</span>
                            <span className="text-[9px] text-slate-400 block font-bold">{student.level} • {student.attendanceDays} days present</span>
                          </div>
                        </div>

                        {/* Interactive dynamic GPA Score pill badge */}
                        <div className="text-right">
                          <span className="text-[8px] text-slate-400 block uppercase font-mono">GPA GRADE</span>
                          <span className={`text-xs font-black font-mono ${
                            student.gradeScore >= 90 ? "text-green-600" : student.gradeScore >= 80 ? "text-blue-600" : "text-amber-500"
                          }`}>
                            {student.gradeScore}%
                          </span>
                        </div>
                      </div>

                      {/* Display grading controls */}
                      {isGrading ? (
                        <div className="bg-slate-50 p-2.5 rounded-xl flex items-center gap-2 border">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={tempGrade}
                            onChange={(e) => setTempGrade(parseInt(e.target.value) || 0)}
                            className="bg-white border rounded px-2 py-1 text-xs font-mono font-bold text-slate-800 w-16"
                          />
                          <button
                            onClick={() => handleUpdateGradeSubmit(student.id)}
                            className="bg-green-600 hover:bg-green-700 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-all"
                          >
                            Save Grade
                          </button>
                          <button
                            onClick={() => setGradingStudentId(null)}
                            className="text-[10px] font-bold text-slate-400 hover:text-slate-600 px-1"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center bg-slate-50/50 p-2.5 rounded-xl text-[10px] text-slate-500 font-sans border border-slate-100">
                          <span>Quizzes submitted: <b className="text-slate-800">{student.completedQuizzes}</b></span>
                          <button
                            onClick={() => {
                              setGradingStudentId(student.id);
                              setTempGrade(student.gradeScore);
                            }}
                            className="text-[#2D6CDF] hover:underline font-extrabold text-[10px] cursor-pointer"
                          >
                            Update Class Grade
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Classroom analytics review info */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-slate-500 text-[10px] font-sans leading-relaxed">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Classroom progress details sync automatically. Direct grade revisions emit immediate browser notifications to parents.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
