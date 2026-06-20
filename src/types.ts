/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Levels available for students from Kindergarten to JHS3
export type ClassLevel = 
  | "KG" 
  | "Primary 1" 
  | "Primary 2" 
  | "Primary 3" 
  | "Primary 4" 
  | "Primary 5" 
  | "Primary 6" 
  | "JHS 1" 
  | "JHS 2" 
  | "JHS 3";

export type SubjectId = "math" | "english" | "french" | "science";

export interface Subject {
  id: SubjectId;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind class color e.g., 'blue', 'green', etc.
  bannerColor: string; // Tailwind bg class
  borderColor: string;
  accentColor: string;
}

export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Topic {
  id: string; // e.g. "addition", "subtraction", "multiplication", "decimals"
  subjectId: SubjectId;
  levels: ClassLevel[]; // which classes this topic applies to
  name: string;
  description: string;
  difficulty: DifficultyLevel;
  icon: string;
  lessonContent: {
    explanation: string;
    keyPoints: string[];
    visualExample: {
      title: string;
      description: string;
      items: { icon: string; count: number; color: string; label: string }[] | null;
      equation?: string;
      steps?: string[];
    };
  };
  quiz: Question[];
}

export interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  visualAid?: {
    type: "count" | "equation" | "shapes" | "translation" | "choice" | "text";
    count?: number;
    icon?: string;
    color?: string;
    text?: string;
  };
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  color: string;
  requirement: string;
  isUnlocked: boolean;
}

export interface StudentProfile {
  id?: string;
  name: string;
  level: ClassLevel;
  avatar: string; // Icon or preset
  xp: number;
  stars: number;
  completedQuizzes: { [topicId: string]: number }; // topicId -> max score percentage
  studyMinutes: number;
  streakDays: number;
  unlockedBadgeIds: string[];
  lastActiveTopicId?: string;
  email?: string;
  provider?: "local" | "gmail" | "outlook";
}
