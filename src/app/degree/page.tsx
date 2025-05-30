"use client";

import React, {
  useState,
  useEffect,
  ReactNode,
  ButtonHTMLAttributes,
  HTMLAttributes,
} from "react";
import {
  ChevronRight,
  GraduationCap,
  Brain,
  CheckCircle,
  Star,
  ArrowRight,
  Sparkles,
  BookOpen,
  Zap,
  Trophy,
  Crown,
  Gem,
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  type: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

type Variant = "primary" | "secondary" | "option";

interface Recommendation {
  major: string;
  description: string;
  score: number;
  match_percentage: number;
}

// Floating Particles Component
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        >
          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 animate-ping"></div>
        </div>
      ))}
    </div>
  );
};

// Animated Background
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/50 via-transparent to-purple-900/50"></div>

      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>
  );
};

// Luxury Card Component
const LuxuryCard = ({
  children,
  className = "",
  ...props
}: {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`relative group ${className}`} {...props}>
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 animate-pulse"></div>

      {/* Main Card */}
      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
        {/* Inner Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-2xl"></div>
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
};

// Premium Button Component
const PremiumButton = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  ...props
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700",
    secondary:
      "bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-white/20",
    option:
      "bg-gradient-to-r from-white/5 to-white/10 hover:from-white/15 hover:to-white/20 border border-white/20 hover:border-purple-400/50",
  };

  return (
    <button
      onClick={onClick}
      className={`relative group overflow-hidden ${variants[variant]} text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${className}`}
      {...props}
    >
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-3">
        {children}
      </div>
    </button>
  );
};

// Animated Counter
const AnimatedCounter = ({
  value,
  duration = 2000,
}: {
  value: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span>{count}</span>;
};

const ExpertSystem = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  // Simulated API calls
  const fetchQuestions = async () => {
    const mockQuestions: Question[] = [
      {
        id: 1,
        question: "Apakah kamu dari jurusan IPA atau IPS?",
        type: "choice",
        options: [
          { value: "ipa", label: "IPA (Ilmu Pengetahuan Alam)" },
          { value: "ips", label: "IPS (Ilmu Pengetahuan Sosial)" },
        ],
      },
      {
        id: 2,
        question: "Apakah kamu suka berhitung dan matematika?",
        type: "choice",
        options: [
          { value: "suka_berhitung", label: "Ya, saya suka" },
          { value: "tidak_suka_berhitung", label: "Tidak terlalu suka" },
        ],
      },
      {
        id: 3,
        question: "Bagaimana dengan teknologi dan komputer?",
        type: "choice",
        options: [
          { value: "suka_teknologi", label: "Sangat tertarik" },
          { value: "biasa_teknologi", label: "Biasa saja" },
        ],
      },
      {
        id: 4,
        question: "Apakah kamu suka biologi dan kesehatan?",
        type: "choice",
        options: [
          { value: "suka_biologi", label: "Ya, saya tertarik" },
          { value: "tidak_suka_biologi", label: "Tidak terlalu" },
        ],
      },
      {
        id: 5,
        question: "Bagaimana dengan aktivitas sosial dan organisasi?",
        type: "choice",
        options: [
          { value: "suka_organisasi", label: "Suka berorganisasi" },
          {
            value: "tidak_suka_organisasi",
            label: "Lebih suka bekerja sendiri",
          },
        ],
      },
    ];
    setQuestions(mockQuestions);
  };

  const getRecommendations = async (userAnswers: string[]) => {
    setLoading(true);
    setTimeout(() => {
      const mockRecommendations: Recommendation[] = [
        {
          major: "Teknik Informatika",
          description: "Cocok untuk yang suka coding, logika, dan teknologi",
          score: 95.5,
          match_percentage: 95,
        },
        {
          major: "Manajemen",
          description: "Cocok untuk yang suka organisasi dan bisnis",
          score: 87.3,
          match_percentage: 87,
        },
        {
          major: "Psikologi",
          description: "Cocok untuk yang suka memahami perilaku manusia",
          score: 78.1,
          match_percentage: 78,
        },
      ];
      setRecommendations(mockRecommendations);
      setLoading(false);
      setShowResults(true);
    }, 3000);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      getRecommendations(newAnswers);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setRecommendations([]);
    setShowResults(false);
    setLoading(false);
    setIsStarted(false);
  };

  const startQuiz = () => {
    setIsStarted(true);
  };

  const progressPercentage = ((currentStep + 1) / questions.length) * 100;

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        <FloatingParticles />

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <LuxuryCard className="p-12 text-center max-w-lg mx-4">
            <div className="relative mb-8">
              {/* Rotating Rings */}
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full animate-spin"></div>
                <div
                  className="absolute inset-2 border-4 border-pink-500/50 rounded-full animate-spin"
                  style={{
                    animationDirection: "reverse",
                    animationDuration: "3s",
                  }}
                ></div>
                <div
                  className="absolute inset-4 border-4 border-blue-500/70 rounded-full animate-spin"
                  style={{ animationDuration: "2s" }}
                ></div>

                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Analyzing Your Profile
            </h3>
            <p className="text-white/80 text-lg mb-6">
              Our AI system is processing your answers to find the perfect major
              for you...
            </p>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.3}s` }}
                ></div>
              ))}
            </div>
          </LuxuryCard>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        <FloatingParticles />

        <div className="relative z-10 py-12 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full mb-8 relative">
                <Crown className="w-12 h-12 text-white" />
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full blur opacity-60 animate-pulse"></div>
              </div>

              <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-6">
                Your Perfect Match
              </h1>
              <p className="text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                Based on our advanced AI analysis, here are your personalized
                university major recommendations
              </p>
            </div>

            {/* Results Grid */}
            <div className="grid gap-8 mb-12">
              {recommendations.map((rec, index) => (
                <LuxuryCard
                  key={index}
                  className="group hover:scale-105 transition-all duration-500"
                >
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center relative ${
                            index === 0
                              ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                              : index === 1
                              ? "bg-gradient-to-r from-blue-400 to-purple-500"
                              : "bg-gradient-to-r from-purple-400 to-pink-500"
                          }`}
                        >
                          {index === 0 ? (
                            <Trophy className="w-8 h-8 text-white" />
                          ) : index === 1 ? (
                            <Star className="w-8 h-8 text-white" />
                          ) : (
                            <Gem className="w-8 h-8 text-white" />
                          )}

                          {/* Pulse Effect */}
                          <div
                            className={`absolute -inset-1 rounded-full blur opacity-60 animate-pulse ${
                              index === 0
                                ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                                : index === 1
                                ? "bg-gradient-to-r from-blue-400 to-purple-500"
                                : "bg-gradient-to-r from-purple-400 to-pink-500"
                            }`}
                          ></div>
                        </div>

                        <div>
                          <h3 className="text-3xl font-bold text-white mb-2">
                            {rec.major}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span
                              className={`text-2xl font-bold ${
                                index === 0
                                  ? "text-yellow-400"
                                  : index === 1
                                  ? "text-blue-400"
                                  : "text-purple-400"
                              }`}
                            >
                              <AnimatedCounter value={rec.match_percentage} />%
                            </span>
                            <span className="text-white/60">Perfect Match</span>
                            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                          </div>
                        </div>
                      </div>

                      <div
                        className={`px-6 py-3 rounded-full text-sm font-bold border-2 ${
                          index === 0
                            ? "bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border-yellow-400/50 text-yellow-400"
                            : index === 1
                            ? "bg-gradient-to-r from-blue-400/20 to-purple-500/20 border-blue-400/50 text-blue-400"
                            : "bg-gradient-to-r from-purple-400/20 to-pink-500/20 border-purple-400/50 text-purple-400"
                        }`}
                      >
                        {index === 0
                          ? "🏆 TOP CHOICE"
                          : index === 1
                          ? "⭐ EXCELLENT"
                          : "💎 GREAT FIT"}
                      </div>
                    </div>

                    <p className="text-white/80 text-xl mb-6 leading-relaxed">
                      {rec.description}
                    </p>

                    {/* Enhanced Progress Bar */}
                    <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-white/70 text-lg">
                          Compatibility Score
                        </span>
                        <span
                          className={`text-2xl font-bold ${
                            index === 0
                              ? "text-yellow-400"
                              : index === 1
                              ? "text-blue-400"
                              : "text-purple-400"
                          }`}
                        >
                          <AnimatedCounter value={rec.match_percentage} />%
                        </span>
                      </div>

                      <div className="relative w-full bg-white/10 rounded-full h-4 overflow-hidden">
                        <div
                          className={`h-4 rounded-full transition-all duration-2000 relative overflow-hidden ${
                            index === 0
                              ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                              : index === 1
                              ? "bg-gradient-to-r from-blue-400 to-purple-500"
                              : "bg-gradient-to-r from-purple-400 to-pink-500"
                          }`}
                          style={{ width: `${rec.match_percentage}%` }}
                        >
                          {/* Shine Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </LuxuryCard>
              ))}
            </div>

            {/* Action Button */}
            <div className="text-center">
              <PremiumButton onClick={resetQuiz} className="text-xl py-6 px-12">
                <Zap className="w-6 h-6" />
                Start New Analysis
                <ArrowRight className="w-6 h-6" />
              </PremiumButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isStarted) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        <FloatingParticles />

        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full mb-8 relative">
                <GraduationCap className="w-16 h-16 text-white" />
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-60 animate-pulse"></div>
              </div>

              <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
                AI Expert System
              </h1>
              <h2 className="text-4xl font-semibold text-white/90 mb-8">
                University Major Recommendation
              </h2>
            </div>

            <LuxuryCard className="p-12 mb-12 max-w-3xl mx-auto">
              <p className="text-2xl text-white/80 mb-8 leading-relaxed">
                Discover your perfect university major with our advanced
                AI-powered recommendation system. Answer a few questions and let
                our intelligent algorithm analyze your interests, skills, and
                personality to suggest the ideal academic path for your future
                success.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    AI-Powered
                  </h3>
                  <p className="text-white/70">
                    Advanced algorithms analyze your responses
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Fast & Accurate
                  </h3>
                  <p className="text-white/70">
                    Get precise recommendations in minutes
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Personalized
                  </h3>
                  <p className="text-white/70">
                    Tailored specifically to your profile
                  </p>
                </div>
              </div>
            </LuxuryCard>

            <PremiumButton onClick={startQuiz} className="text-2xl py-6 px-12">
              <BookOpen className="w-8 h-8" />
              Begin Your Journey
              <ArrowRight className="w-8 h-8" />
            </PremiumButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <FloatingParticles />

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Enhanced Progress Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4">
                Question {currentStep + 1} of {questions.length}
              </h2>
              <p className="text-xl text-white/70">
                Let's discover your perfect academic path
              </p>
            </div>

            <LuxuryCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-white/80 text-lg font-semibold">
                  Progress
                </span>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {Math.round(progressPercentage)}%
                </span>
              </div>

              <div className="relative w-full bg-white/10 rounded-full h-6 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 h-6 rounded-full transition-all duration-1000 relative overflow-hidden"
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="flex justify-between mt-4">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index <= currentStep
                        ? "bg-gradient-to-r from-purple-500 to-pink-500"
                        : "bg-white/20"
                    }`}
                  ></div>
                ))}
              </div>
            </LuxuryCard>
          </div>

          {/* Question Card */}
          {questions[currentStep] && (
            <LuxuryCard className="p-10">
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-white">
                    {currentStep + 1}
                  </span>
                </div>

                <h3 className="text-4xl font-bold text-white mb-6 leading-relaxed">
                  {questions[currentStep].question}
                </h3>
              </div>

              <div className="space-y-6">
                {questions[currentStep].options.map((option, index) => (
                  <PremiumButton
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    variant="option"
                    className="w-full text-left justify-between py-6 px-8 text-xl group"
                  >
                    <span className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      {option.label}
                    </span>
                    <ChevronRight className="w-6 h-6 text-purple-400 group-hover:text-white transition-colors" />
                  </PremiumButton>
                ))}
              </div>
            </LuxuryCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpertSystem;
