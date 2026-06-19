/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Topic, Question } from "../types";

// Helper icon mapping: to display visually in counting widgets
export const VISUAL_ICONS = {
  apple: "🍎",
  star: "⭐",
  cookie: "🍪",
  balloon: "🎈",
  pencil: "✏️",
  book: "📖",
  globe: "🌍",
  leaf: "🍃",
};

export const SUBJECTS = [
  {
    id: "math" as const,
    name: "Mathematics",
    description: "Numbers, shapes, division, fractions, and solving real-world puzzles!",
    icon: "Calculator",
    color: "blue",
    bannerColor: "bg-blue-500",
    borderColor: "border-blue-200",
    accentColor: "text-blue-600",
  },
  {
    id: "english" as const,
    name: "English",
    description: "Grammar, expanding vocabulary, writing creative essays, and reading fun stories!",
    icon: "BookOpen",
    color: "green",
    bannerColor: "bg-green-500",
    borderColor: "border-green-200",
    accentColor: "text-green-600",
  },
  {
    id: "french" as const,
    name: "French",
    description: "Apprenez le français! Commencer par saluer, compter, et nommer la famille.",
    icon: "Languages",
    color: "yellow",
    bannerColor: "bg-amber-400",
    borderColor: "border-amber-200",
    accentColor: "text-amber-600",
  },
  {
    id: "science" as const,
    name: "Science",
    description: "Discover living organisms, trace the solar system, and understand forces!",
    icon: "Sparkles",
    color: "purple",
    bannerColor: "bg-purple-600",
    borderColor: "border-purple-200",
    accentColor: "text-purple-600",
  }
];

export const MATH_TOPICS: Topic[] = [
  {
    id: "addition",
    subjectId: "math",
    levels: ["KG", "Primary 1", "Primary 2"],
    name: "Addition Basics",
    description: "Bringing sets together to find the total sum, using fun objects like apples and stars!",
    difficulty: "Beginner",
    icon: "PlusCircle",
    lessonContent: {
      explanation: "Addition means putting things together! When you have some toys and your friend gives you more, you add them to find out how many toys you have in total. We use the plus (+) sign.",
      keyPoints: [
        "Adding zero to any number keeps the number exactly the same! (e.g., 5 + 0 = 5)",
        "The order of numbers doesn't change the sum! 2 + 3 is exactly the same as 3 + 2.",
        "Count forward to add. If you have 3 and want to add 2, say: '4, 5!'"
      ],
      visualExample: {
        title: "Let's count delicious Red Apples!",
        description: "If you have 3 apples and your teacher gives you 2 more, how many do you have?",
        items: [
          { icon: "apple", count: 3, color: "text-red-500", label: "3 Apples" },
          { icon: "apple", count: 2, color: "text-red-400", label: "2 Apples" }
        ],
        equation: "3 + 2 = 5 Apples altogether!",
        steps: [
          "Start with 3 apples: 🍎 🍎 🍎",
          "Put in 2 more apples: 🍎 🍎",
          "Count them all together: 1, 2, 3, 4, 5!"
        ]
      }
    },
    quiz: [
      {
        id: "add_q1",
        questionText: "What is 3 + 4?",
        options: ["5", "6", "7", "8"],
        correctAnswer: "7",
        explanation: "If you start at 3 and count 4 steps forward (4, 5, 6, 7), you end up at 7!",
        visualAid: { type: "count", count: 7, icon: "apple", color: "text-red-500" }
      },
      {
        id: "add_q2",
        questionText: "Which equation represents having 4 stars and adding 2 more?",
        options: ["4 - 2 = 2", "4 + 2 = 6", "4 + 4 = 8", "4 + 3 = 7"],
        correctAnswer: "4 + 2 = 6",
        explanation: "Starting with 4 and adding (+) 2 gives a total of 6 stars.",
        visualAid: { type: "count", count: 6, icon: "star", color: "text-amber-400" }
      },
      {
        id: "add_q3",
        questionText: "What is 8 + 0?",
        options: ["0", "8", "80", "9"],
        correctAnswer: "8",
        explanation: "Adding zero changes nothing! Your set stays unchanged as 8.",
        visualAid: { type: "text", text: "8 + 0 = 8" }
      }
    ]
  },
  {
    id: "subtraction",
    subjectId: "math",
    levels: ["KG", "Primary 1", "Primary 2"],
    name: "Subtraction Fun",
    description: "Taking puzzle pieces or snacks away to see what remains inside our basket!",
    difficulty: "Beginner",
    icon: "MinusCircle",
    lessonContent: {
      explanation: "Subtraction is taking things away! When you share your cookies or blow out candles, you are subtracting. We use the minus (-) sign to represent subtraction.",
      keyPoints: [
        "Subtracting is like counting backwards.",
        "When you subtract a number from itself, the answer is always zero! (e.g., 4 - 4 = 0)",
        "The number you start with is always the largest in simple subtraction problems."
      ],
      visualExample: {
        title: "Yummy Star Cookies!",
        description: "You had 5 shiny cookies on a plate. You ate 2 of them! How many are left?",
        items: [
          { icon: "cookie", count: 5, color: "text-amber-600", label: "Had 5 cookies" },
          { icon: "cookie", count: 2, color: "text-gray-300", label: "Ate 2 cookies" }
        ],
        equation: "5 - 2 = 3 Delicious Cookies left!",
        steps: [
          "Lay out 5 cookies: 🍪 🍪 🍪 🍪 🍪",
          "Cross out or take away 2 cookies: ❌ ❌",
          "Count the leftover cookies: 1, 2, 3!"
        ]
      }
    },
    quiz: [
      {
        id: "sub_q1",
        questionText: "What is 5 - 3?",
        options: ["2", "3", "4", "8"],
        correctAnswer: "2",
        explanation: "If you have 5 cookies and take away 3, you have a remaining amount of 2.",
        visualAid: { type: "count", count: 2, icon: "cookie", color: "text-amber-700" }
      },
      {
        id: "sub_q2",
        questionText: "If you have 7 colorful balloons and 3 of them pop, how many balloons do you have left?",
        options: ["10", "3", "4", "5"],
        correctAnswer: "4",
        explanation: "Pop is subtraction! 7 - 3 equals 4.",
        visualAid: { type: "count", count: 4, icon: "balloon", color: "text-blue-400" }
      },
      {
        id: "sub_q3",
        questionText: "What is 6 - 6?",
        options: ["6", "1", "0", "12"],
        correctAnswer: "0",
        explanation: "Subtracting a number from itself leaves nothing behind, which is 0!",
        visualAid: { type: "equation", text: "6 - 6 = 0" }
      }
    ]
  },
  {
    id: "multiplication",
    subjectId: "math",
    levels: ["Primary 3", "Primary 4", "Primary 5"],
    name: "Multiplication Journeys",
    description: "Repeated addition in fast forward! Grouping items together into rows and blocks.",
    difficulty: "Intermediate",
    icon: "Grid",
    lessonContent: {
      explanation: "Multiplication is a fast way of doing addition! Instead of adding 3 + 3 + 3 + 3, you can just calculate '4 groups of 3', which is 4 × 3. The symbol is '×'.",
      keyPoints: [
        "Multiplication is repeated addition. 3 × 4 means 3 + 3 + 3 + 3.",
        "Any number times 0 is always 0! (e.g., 10 × 0 = 0)",
        "Any number times 1 is equal to itself! (e.g., 7 × 1 = 7)",
        "The Order Property: 2 × 5 is equivalent to 5 × 2."
      ],
      visualExample: {
        title: "Grid of School Books!",
        description: "Let's arrange our notebooks into three rows, with 4 notebooks in each row.",
        items: [
          { icon: "book", count: 4, color: "text-indigo-600", label: "Row 1" },
          { icon: "book", count: 4, color: "text-indigo-600", label: "Row 2" },
          { icon: "book", count: 4, color: "text-indigo-600", label: "Row 3" }
        ],
        equation: "3 rows × 4 books = 12 total books!",
        steps: [
          "Row 1: 📖 📖 📖 📖 (4)",
          "Row 2: 📖 📖 📖 📖 (4)",
          "Row 3: 📖 📖 📖 📖 (4)",
          "Combine: 4 + 4 + 4 = 12, which is 3 × 4!"
        ]
      }
    },
    quiz: [
      {
        id: "mul_q1",
        questionText: "What is 4 × 3?",
        options: ["7", "12", "16", "9"],
        correctAnswer: "12",
        explanation: "4 packages of 3 items equals 3 + 3 + 3 + 3 = 12.",
        visualAid: { type: "equation", text: "4 × 3 = 12" }
      },
      {
        id: "mul_q2",
        questionText: "What is 9 × 0?",
        options: ["9", "1", "0", "90"],
        correctAnswer: "0",
        explanation: "Multiplying any number by 0 immediately collapses the result to 0!",
        visualAid: { type: "text", text: "9 × 0 = 0" }
      },
      {
        id: "mul_q3",
        questionText: "If there are 5 bags of candies, and each bag contains 5 candies, what is the total number of candies?",
        options: ["10", "20", "25", "30"],
        correctAnswer: "25",
        explanation: "5 bags × 5 candies = 25 candies total.",
        visualAid: { type: "count", count: 25, icon: "cookie", color: "text-pink-400" }
      }
    ]
  },
  {
    id: "division",
    subjectId: "math",
    levels: ["Primary 3", "Primary 4", "Primary 5"],
    name: "Division Sharing",
    description: "Splitting a larger stack fairly among classmates, pieces of chocolate, or team members.",
    difficulty: "Intermediate",
    icon: "Divide",
    lessonContent: {
      explanation: "Division is sharing equally! When you have a box of cookies and want to distribute them to your friends so everyone gets the same number, that is division (÷).",
      keyPoints: [
        "Division is the opposite of multiplication.",
        "Dividing is like sorting a pack of cards into equal piles.",
        "The number you share is the 'dividend'. The number of piles is the 'divisor'. The amount per pile is the 'quotient'."
      ],
      visualExample: {
        title: "Sharing Apples Fairly!",
        description: "You have 12 fresh apples and 3 friendly classmates. How many apples does each friend receive?",
        items: [
          { icon: "apple", count: 12, color: "text-red-500", label: "12 apples to share" }
        ],
        equation: "12 apples ÷ 3 friends = 4 apples each!",
        steps: [
          "Give 1 apple to each friend: each has 1, 9 remaining.",
          "Give another: each has 2, 6 remaining.",
          "Keep going until all 12 apples are finished.",
          "Each friend will end up with exactly 4 apples!"
        ]
      }
    },
    quiz: [
      {
        id: "div_q1",
        questionText: "What is 15 ÷ 3?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "5",
        explanation: "Since 5 × 3 = 15, dividing 15 into 3 equal piles gives 5 per pile.",
        visualAid: { type: "equation", text: "15 ÷ 3 = 5" }
      },
      {
        id: "div_q2",
        questionText: "If 24 students are split into 4 equal teams for sports, how many students are in each team?",
        options: ["8", "6", "5", "10"],
        correctAnswer: "6",
        explanation: "24 divided by 4 equals 6. (Because 6 × 4 = 24).",
        visualAid: { type: "text", text: "24 ÷ 4 = 6 students" }
      }
    ]
  },
  {
    id: "fractions",
    subjectId: "math",
    levels: ["Primary 4", "Primary 5", "Primary 6"],
    name: "Fractions Explored",
    description: "Looking at parts of a whole, like slices of pizza or portions of a chocolate bar.",
    difficulty: "Intermediate",
    icon: "PieChart",
    lessonContent: {
      explanation: "A fraction is part of a whole! When a pizza is cut into equal slices, each slice is a fraction. An example is 1/2 or 3/4.",
      keyPoints: [
        "The top number is the NUMERATOR (how many parts we have).",
        "The bottom number is the DENOMINATOR (the total number of parts the whole is cut into).",
        "Equivalent fractions representation: 1/2 is equal to 2/4 and 4/8!"
      ],
      visualExample: {
        title: "Yummy Pizza Slices!",
        description: "A large round cheese pizza is cut into 4 equal slices. You eat 1 slice. What fraction did you eat?",
        items: null,
        equation: "You ate 1 slice out of 4 total, which is written as 1/4!",
        steps: [
          "Whole Pizza = 4/4 slices",
          "One slice = 1/4 of the pizza",
          "Leftover Pizza = 3/4 of the pizza"
        ]
      }
    },
    quiz: [
      {
        id: "frac_q1",
        questionText: "In the fraction 3/4, what is the numerator?",
        options: ["3", "4", "7", "1"],
        correctAnswer: "3",
        explanation: "The numerator is always the top number of the fraction, showing the number of parts we have.",
        visualAid: { type: "text", text: "3 is the numerator, 4 is the denominator" }
      },
      {
        id: "frac_q2",
        questionText: "Which fraction is equivalent to 1/2?",
        options: ["1/3", "2/4", "3/5", "2/5"],
        correctAnswer: "2/4",
        explanation: "If you cut a pizza in half, or into four slices and eat two, you ate the same amount!",
        visualAid: { type: "shapes", count: 2, icon: "cookie" }
      }
    ]
  },
  {
    id: "decimals",
    subjectId: "math",
    levels: ["Primary 5", "Primary 6", "JHS 1"],
    name: "Intro to Decimals",
    description: "Understanding values between whole numbers using place-value points.",
    difficulty: "Intermediate",
    icon: "Hash",
    lessonContent: {
      explanation: "Decimals are numbers that contain a decimal point! They represent numbers that are in-between whole integers, like money ($1.50) or measurements (2.5 meters).",
      keyPoints: [
        "The position to the right of the decimal point indicates tenths, then hundredths, and thousandths.",
        "0.1 is 1/10 (one-tenth).",
        "0.01 is 1/100 (one-hundredth).",
        "0.5 is exactly equal to one half (1/2)."
      ],
      visualExample: {
        title: "Place Values in Decimals!",
        description: "Let's lay out the parts of the number 4.25:",
        items: null,
        equation: "4.25 = 4 ones + 2 tenths + 5 hundredths",
        steps: [
          "4 stands for four whole ones.",
          "The '.' starts the decimal part.",
          "2 represents 2/10 (tenths).",
          "5 represents 5/100 (hundredths)."
        ]
      }
    },
    quiz: [
      {
        id: "dec_q1",
        questionText: "What is 0.3 + 0.4?",
        options: ["0.07", "0.7", "7.0", "0.12"],
        correctAnswer: "0.7",
        explanation: "Just like adding whole ones, 3 tenths plus 4 tenths equals 7 tenths, written as 0.7.",
        visualAid: { type: "equation", text: "0.3 + 0.4 = 0.7" }
      },
      {
        id: "dec_q2",
        questionText: "Express the fraction 1/2 as a decimal.",
        options: ["0.2", "0.12", "0.5", "0.05"],
        correctAnswer: "0.5",
        explanation: "1 divided by 2 is exactly 0.5. This is half of 1.0.",
        visualAid: { type: "text", text: "1/2 = 0.5" }
      }
    ]
  },
  {
    id: "perimeter",
    subjectId: "math",
    levels: ["Primary 6", "JHS 1", "JHS 2"],
    name: "Perimeter",
    description: "Measuring the length of the boundaries or borders of geometric shapes.",
    difficulty: "Advanced",
    icon: "Square",
    lessonContent: {
      explanation: "Perimeter is the total boundary distance around a 2D shape! Imagine running around the fence of a football field - the length of that fence is the perimeter.",
      keyPoints: [
        "To find the perimeter of any polygon, simply add up the lengths of all its outer sides!",
        "For a rectangle, the formula is: Perimeter = 2 × (Length + Width).",
        "For a square with side 's': Perimeter = 4 × s."
      ],
      visualExample: {
        title: "Perimeter of a rectangular Garden!",
        description: "Our garden is 6 meters long (Length) and 4 meters wide (Width). Let's trace it:",
        items: null,
        equation: "P = 6m + 4m + 6m + 4m = 20 meters!",
        steps: [
          "Top border is 6 meters.",
          "Right border is 4 meters.",
          "Bottom border is 6 meters.",
          "Left border is 4 meters.",
          "Add them up: 6 + 4 + 6 + 4 = 20 meters."
        ]
      }
    },
    quiz: [
      {
        id: "per_q1",
        questionText: "Find the perimeter of a square whose side is 5 cm.",
        options: ["10 cm", "20 cm", "25 cm", "15 cm"],
        correctAnswer: "20 cm",
        explanation: "A square has 4 equal sides. P = 4 × 5 cm = 20 cm.",
        visualAid: { type: "equation", text: "4 × 5 = 20 cm" }
      },
      {
        id: "per_q2",
        questionText: "A rectangle has a length of 8m and a width of 3m. What is its perimeter?",
        options: ["11 m", "22 m", "24 m", "16 m"],
        correctAnswer: "22 m",
        explanation: "P = 2 × (Length + Width) = 2 × (8 + 3) = 2 × 11 = 22 meters.",
        visualAid: { type: "text", text: "2 × (8 + 3) = 22" }
      }
    ]
  },
  {
    id: "area",
    subjectId: "math",
    levels: ["Primary 6", "JHS 1", "JHS 2", "JHS 3"],
    name: "Area Estimation & Form",
    description: "Calculating the space covered inside the boundaries of closed 2D structures.",
    difficulty: "Advanced",
    icon: "Layers",
    lessonContent: {
      explanation: "Area is the amount of flat space inside a shape! While perimeter measures the outer fence, Area measures the grass inside the garden. We express area in square units (like cm² or m²).",
      keyPoints: [
        "Area of a Rectangle = Length × Width.",
        "Area of a Square = Side × Side.",
        "Area of a Triangle = 1/2 × Base × Height.",
        "Area is calculated in grid square tiles."
      ],
      visualExample: {
        title: "Area of a bedroom floor!",
        description: "The room is 4 meters long (Length) and 3 meters wide (Width).",
        items: null,
        equation: "Area = 4m × 3m = 12 square meters (m²)",
        steps: [
          "Think of placing floor tiles that are 1m by 1m.",
          "You can fit 4 tiles in a row.",
          "You can lay down exactly 3 rows of tiles.",
          "Total tile count is 4 × 3 = 12 tiles."
        ]
      }
    },
    quiz: [
      {
        id: "area_q1",
        questionText: "What is the area of a rectangle with length 10 cm and width 6 cm?",
        options: ["16 cm²", "32 cm²", "60 cm²", "40 cm²"],
        correctAnswer: "60 cm²",
        explanation: "Area = Length × Width = 10 cm × 6 cm = 60 cm².",
        visualAid: { type: "equation", text: "10 × 6 = 60 cm²" }
      },
      {
        id: "area_q2",
        questionText: "If a square-shaped garden has a side length of 7 meters, what is its total area?",
        options: ["14 m²", "28 m²", "49 m²", "35 m²"],
        correctAnswer: "49 m²",
        explanation: "Area of square = side × side = 7m × 7m = 49 m².",
        visualAid: { type: "text", text: "7 × 7 = 49 m²" }
      }
    ]
  },
  {
    id: "probability",
    subjectId: "math",
    levels: ["JHS 2", "JHS 3"],
    name: "Probability",
    description: "Determining the mathematical likelihood of an event occurring or not occurring.",
    difficulty: "Advanced",
    icon: "TrendingUp",
    lessonContent: {
      explanation: "Probability is the measurement of how likely something is to happen! It is written as a fraction, decimal, or percentage between 0 (impossible) and 1 (absolutely certain).",
      keyPoints: [
        "Formula: Probability = (Number of Successful Outcomes) / (Total Number of Possible Outcomes).",
        "A regular coin toss has a probability of 1/2 (50%) for landing on Heads.",
        "The sum of all probabilities in an experiment is always 1."
      ],
      visualExample: {
        title: "Marbles in a Jar!",
        description: "Suppose you have a jar containing 3 Red marbles and 2 Blue marbles. You pick one without looking.",
        items: [
          { icon: "cookie", count: 3, color: "text-red-500", label: "3 Red Marbles" },
          { icon: "cookie", count: 2, color: "text-blue-500", label: "2 Blue Marbles" }
        ],
        equation: "Probability of picking Red = 3 Red / 5 Total = 3/5 (60%)",
        steps: [
          "Count successful outcomes: there are 3 red marbles.",
          "Count total possibilities: 3 red + 2 blue = 5 marbles.",
          "Divide: Successful / Total = 3/5."
        ]
      }
    },
    quiz: [
      {
        id: "prob_q1",
        questionText: "If you roll a standard six-sided die, what is the probability of rolling a 4?",
        options: ["1/2", "1/6", "1/4", "1/3"],
        correctAnswer: "1/6",
        explanation: "A die has 6 sides, and only 1 side shows '4'. Successful outcome = 1, Total possibilities = 6.",
        visualAid: { type: "text", text: "Outcome: [4] out of {1,2,3,4,5,6}" }
      },
      {
        id: "prob_q2",
        questionText: "A bag contains 4 yellow candy wrappers and 6 blue candy wrappers. If you pick one, what is the probability that it is blue?",
        options: ["6/10 (3/5)", "4/10 (2/5)", "1/2", "1/4"],
        correctAnswer: "6/10 (3/5)",
        explanation: "Total wrappers is 4 + 6 = 10. Blue wrappers is 6. Probability is 6/10, which reduces directly to 3/5.",
        visualAid: { type: "text", text: "6 / (4 + 6) = 6/10" }
      }
    ]
  }
];

// Content for other subjects to make them real and interactive in tabs
export const ENGLISH_TOPICS: Topic[] = [
  {
    id: "nouns_verbs",
    subjectId: "english",
    levels: ["KG", "Primary 1", "Primary 2", "Primary 3"],
    name: "Nouns & Verbs",
    description: "Distinguishing between naming words (nouns) and action words (verbs)!",
    difficulty: "Beginner",
    icon: "Smile",
    lessonContent: {
      explanation: "Nouns are naming words! They name people, places, animals, or things (e.g. Ama, Accra, lion, table). Verbs are action words! They show what a noun is doing (e.g., run, jump, read, write).",
      keyPoints: [
        "A Noun points to a Person, Place, or Thing.",
        "A Verb tells us what someone or something is DOING.",
        "Every complete sentence needs both a subject (noun) and a verb!"
      ],
      visualExample: {
        title: "The jumping frog!",
        description: "Let's identify the parts of our favorite story sentences.",
        items: null,
        equation: "Ghana (Noun) + grows (Verb) + cocoa.",
        steps: [
          "Example: 'Ama plays football.'",
          "Ama is a person, which is a NOUN.",
          "plays is the action, which is a VERB.",
          "football is a thing, which is a NOUN."
        ]
      }
    },
    quiz: [
      {
        id: "eng_q1",
        questionText: "Which word in this sentence is a verb? 'The fast dog chased the cat.'",
        options: ["dog", "fast", "chased", "cat"],
        correctAnswer: "chased",
        explanation: "Chased is an action, meaning it is the verb in this sentence.",
        visualAid: { type: "text", text: "Action word = chased" }
      },
      {
        id: "eng_q2",
        questionText: "Identify the noun representing a place in: 'Kofi resides in Accra.'",
        options: ["Kofi", "resides", "in", "Accra"],
        correctAnswer: "Accra",
        explanation: "Accra is the name of a city (location), hence it is a place noun.",
        visualAid: { type: "text", text: "Accra (Capital City)" }
      }
    ]
  },
  {
    id: "parts_of_speech",
    subjectId: "english",
    levels: ["Primary 4", "Primary 5", "Primary 6", "JHS 1", "JHS 2", "JHS 3"],
    name: "Parts of Speech: Adjectives & Adverbs",
    description: "Adding descriptors: Adjectives modify nouns, while Adverbs modify verbs!",
    difficulty: "Intermediate",
    icon: "Feather",
    lessonContent: {
      explanation: "Adjectives and Adverbs are like decoration words! Adjectives describe NOUNS (e.g. 'blue' ball, 'tall' tower). Adverbs describe action VERBS (e.g. run 'quickly', sleep 'quietly').",
      keyPoints: [
        "Adjectives answer: Which one? What kind? How many?",
        "Adverbs answer: How? When? Where? How often? (Many end in '-ly').",
        "They make our paragraphs descriptive and fun to read!"
      ],
      visualExample: {
        title: "Decorating a Simple Sentence",
        description: "Simple: 'The teacher spoke.' Descriptive: 'The kind teacher spoke softly.'",
        items: null,
        steps: [
          "'teacher' is the noun.",
          "'kind' is the ADJECTIVE describing the teacher.",
          "'spoke' is the verb.",
          "'softly' is the ADVERB stating how she spoke."
        ]
      }
    },
    quiz: [
      {
        id: "eng_q3",
        questionText: "In the phrase 'the golden sun shines brightly', which word is the ADVERB?",
        options: ["golden", "sun", "shines", "brightly"],
        correctAnswer: "brightly",
        explanation: "Brightly describes HOW the sun shines (verb), making it an adverb.",
        visualAid: { type: "text", text: "How does it shine? Brightly" }
      }
    ]
  }
];

export const FRENCH_TOPICS: Topic[] = [
  {
    id: "french_greetings",
    subjectId: "french",
    levels: ["KG", "Primary 1", "Primary 2", "Primary 3"],
    name: "French Greetings (Les Salutations)",
    description: "Learn how to say hello, ask 'how are you?', and say goodbye in French!",
    difficulty: "Beginner",
    icon: "Heart",
    lessonContent: {
      explanation: "French is an exciting language! Learning how to greet people is the perfect first step. Let's learn primary words like Bonjour (Hello/Good morning) and Au revoir (Goodbye).",
      keyPoints: [
        "Say 'Bonjour' in the morning and afternoon.",
        "Say 'Bonsoir' in the evening.",
        "Ask 'Comment ça va?' to inquire 'How are you?'",
        "Reply 'Ça va bien, merci!' for 'I am doing well, thank you!'"
      ],
      visualExample: {
        title: "A Friendly French Chat!",
        description: "Let's read this conversation between Kofi and Elsa:",
        items: null,
        equation: "Bonjour! 🤝 Comment ça va?",
        steps: [
          "Kofi: 'Bonjour, Elsa!' (Hello Elsa!)",
          "Elsa: 'Bonjour, Kofi! Comment ça va?' (Hello Kofi! How are you?)",
          "Kofi: 'Ça va très bien, merci! Et toi?' (Doing very well, thank you! And you?)",
          "Elsa: 'Ça va bien!' (I'm doing well!)"
        ]
      }
    },
    quiz: [
      {
        id: "fre_q1",
        questionText: "What does 'Bonjour' mean in English?",
        options: ["Goodbye", "Good night", "Hello / Good morning", "Thank you"],
        correctAnswer: "Hello / Good morning",
        explanation: "'Bonjour' is the standard French greeting for hello or morning greetings.",
        visualAid: { type: "text", text: "Bonjour = Good day / Hello" }
      },
      {
        id: "fre_q2",
        questionText: "How do you say 'Goodbye' in French?",
        options: ["Merci", "Au revoir", "Bonsoir", "S'il vous plaît"],
        correctAnswer: "Au revoir",
        explanation: "'Au revoir' translates literally to goodbye in English.",
        visualAid: { type: "text", text: "Au revoir 👋" }
      }
    ]
  },
  {
    id: "french_family",
    subjectId: "french",
    levels: ["Primary 4", "Primary 5", "Primary 6", "JHS 1", "JHS 2", "JHS 3"],
    name: "La Famille (The Family)",
    description: "Learn to name mother, father, brother, sister, and grandparents in French!",
    difficulty: "Intermediate",
    icon: "Users",
    lessonContent: {
      explanation: "Introducing your family is easy once you know their roles in French. Feminine nouns use 'la' or 'ma' (my), and masculine nouns use 'le' or 'mon' (my).",
      keyPoints: [
        "Le père = The father (Mon père = My father)",
        "La mère = The mother (Ma mère = My mother)",
        "Le frère = The brother",
        "La sœur = The sister"
      ],
      visualExample: {
        title: "Introducing your household",
        description: "Let's translate 'I love my family' -> 'J'aime ma famille.'",
        items: null,
        steps: [
          "My Father = Mon père",
          "My Mother = Ma mère",
          "My Sister = Ma sœur",
          "My Brother = Mon frère"
        ]
      }
    },
    quiz: [
      {
        id: "fre_q3",
        questionText: "Translate 'my brother' into French.",
        options: ["Mon frère", "Ma sœur", "Mon père", "La mère"],
        correctAnswer: "Mon frère",
        explanation: "'Frère' is brother and matches the masculine adjective 'mon'.",
        visualAid: { type: "text", text: "frère = brother" }
      }
    ]
  }
];

export const SCIENCE_TOPICS: Topic[] = [
  {
    id: "living_things",
    subjectId: "science",
    levels: ["KG", "Primary 1", "Primary 2", "Primary 3"],
    name: "Living & Non-Living Things",
    description: "Trace what makes animals and trees alive compared to school tables and stones!",
    difficulty: "Beginner",
    icon: "Sparkles",
    lessonContent: {
      explanation: "Science is the study of everything around us! Living things are alive: they breathe, grow, eat, move, and reproduce. Non-living things do not breathe or grow.",
      keyPoints: [
        "Living things require energy, water, and food to survive.",
        "Examples of living things: Lions, Mango trees, birds, and you!",
        "Examples of non-living things: Chairs, pencils, laptops, rocks, and bottles."
      ],
      visualExample: {
        title: "Is it alive?",
        description: "Let's compare a puppy with a toy car.",
        items: [
          { icon: "leaf", count: 1, color: "text-green-500", label: "Puppy (Breathes, eats, grows)" },
          { icon: "globe", count: 1, color: "text-blue-500", label: "Toy Car (No food, doesn't grow)" }
        ],
        steps: [
          "Can it move on its own? Yes (Puppy), No (Toy car).",
          "Does it grow bigger over time? Yes (Puppy), No (Toy car).",
          "Therefore, the puppy is a LIVING THING and the toy car is NON-LIVING."
        ]
      }
    },
    quiz: [
      {
        id: "sci_q1",
        questionText: "Which of the following is a living thing?",
        options: ["A stone", "A school bag", "A banana tree", "A plastic ruler"],
        correctAnswer: "A banana tree",
        explanation: "Plants are living things! They grow, absorb nutrients, and produce fruit.",
        visualAid: { type: "count", count: 1, icon: "leaf", color: "text-green-600" }
      },
      {
        id: "sci_q2",
        questionText: "What is a major characteristic of all living things?",
        options: ["They are made of metal", "They can grow", "They always shine in the dark", "They never change"],
        correctAnswer: "They can grow",
        explanation: "Growth is a core characteristics of living cells.",
        visualAid: { type: "text", text: "Growth & Reproduction" }
      }
    ]
  },
  {
    id: "solar_system",
    subjectId: "science",
    levels: ["Primary 4", "Primary 5", "Primary 6", "JHS 1", "JHS 2", "JHS 3"],
    name: "The Solar System",
    description: "Journey into cosmos: trace the 8 planets orbiting our beautiful, hot burning Sun!",
    difficulty: "Intermediate",
    icon: "Globe",
    lessonContent: {
      explanation: "Our solar system has been running for billions of years! It consists of the Sun (a star) at the center, orbited by 8 distinct rocky or gaseous planets, moons, and asteroids.",
      keyPoints: [
        "The Sun contains 99.8% of all the mass in the entire Solar System!",
        "The 8 planets in order: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.",
        "Jupiter is the largest planet, while Earth is the only known planet hosting life!"
      ],
      visualExample: {
        title: "Planetary Positions!",
        description: "Let's list the planets starting closest to the Sun:",
        items: null,
        equation: "Sun ☀️ ➔ Mercury ☿ ➔ Venus ♀ ➔ Earth 🌍 ➔ Mars ♂",
        steps: [
          "Mercury: Nearest and super hot.",
          "Venus: Covered reference greenhouse gas clouds.",
          "Earth: Our home! Covered in water and air.",
          "Mars: The red rocky dry planet."
        ]
      }
    },
    quiz: [
      {
        id: "sci_q3",
        questionText: "Which is the largest planet in our solar system?",
        options: ["Mars", "Earth", "Jupiter", "Saturn"],
        correctAnswer: "Jupiter",
        explanation: "Jupiter is so massive that it could contain all the other planets combined inside it!",
        visualAid: { type: "text", text: "Jupiter (The gas giant)" }
      }
    ]
  }
];

export const ALL_TOPICS: Topic[] = [
  ...MATH_TOPICS,
  ...ENGLISH_TOPICS,
  ...FRENCH_TOPICS,
  ...SCIENCE_TOPICS
];

// Helper to filter topics based on Subject and optional class levels
export function getTopicsForSubject(subjectId: string, level?: string): Topic[] {
  let list = ALL_TOPICS.filter(t => t.subjectId === subjectId);
  if (level) {
    list = list.filter(t => t.levels.includes(level as any));
  }
  return list;
}

export const BADGES: { id: string; title: string; description: string; icon: string; color: string; requirement: string }[] = [
  {
    id: "first_login",
    title: "First Steps",
    description: "Welcome to learning! Logged in and set your profile level.",
    icon: "User",
    color: "bg-blue-100 text-blue-600 border-blue-200",
    requirement: "Set up your student profile and save."
  },
  {
    id: "first_quiz",
    title: "Quiz Explorer",
    description: "Bravely submitted your very first educational topic quiz.",
    icon: "ClipboardCheck",
    color: "bg-green-100 text-green-600 border-green-200",
    requirement: "Complete any topic quiz with any score."
  },
  {
    id: "perfect_score",
    title: "Perfect Brainstar",
    description: "Achieved a shiny 100% score on any interactive subject quiz!",
    icon: "Star",
    color: "bg-amber-100 text-amber-600 border-amber-200",
    requirement: "Answer all questions correctly in a quiz."
  },
  {
    id: "math_wizard",
    title: "Math Prodigy",
    description: "Demonstrated advanced problem solving inside the math section.",
    icon: "Calculator",
    color: "bg-indigo-100 text-indigo-600 border-indigo-200",
    requirement: "Complete a total of 2 Math Quizzes."
  },
  {
    id: "multi_lingual",
    title: "Global Scholar",
    description: "Practiced French vocabulary and English grammar blocks.",
    icon: "Languages",
    color: "bg-purple-100 text-purple-600 border-purple-200",
    requirement: "Pass at least one French or English quiz."
  },
  {
    id: "explorer",
    title: "Cosmic Scientist",
    description: "Unlocked mysteries about plants and solar planets.",
    icon: "Orbit",
    color: "bg-rose-100 text-rose-600 border-rose-200",
    requirement: "Practice the Solar System or Living Things science lessons."
  }
];
