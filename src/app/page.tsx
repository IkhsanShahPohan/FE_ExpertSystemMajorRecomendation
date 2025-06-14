"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  GraduationCap,
  Brain,
  CheckCircle,
  Star,
  ArrowRight,
  BookOpen,
  Zap,
  Trophy,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Award,
  TrendingUp,
  Users,
  Building,
  HelpCircle,
} from "lucide-react";
import { RiasecModal } from "@/components/RiasecModal";
import { Badge } from "./components/Badge";
import { Alert } from "./components/Alert";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { CardHeader } from "./components/CardHeader";
import { CardTitle } from "./components/CardTitle";
import { CardDescription } from "./components/CardProps";
import { CardContent } from "./components/CardContent";
import { Progress } from "./components/Progress";

interface Question {
  id: number;
  question: string;
  dimension: string;
  type: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

interface RecommendationResponse {
  success: boolean;
  answered_questions: number;
  dominant_type: string;
  assessment_summary: {
    [key: string]: {
      name: string;
      score: number;
    };
  };
  riasec_scores: {
    [key: string]: number;
  };
  riasec_percentages: {
    [key: string]: number;
  };
  recommendations: Array<{
    major_code: string;
    major_name: string;
    faculty: string;
    description: string;
    riasec_pattern: string;
    compatibility_score: number;
    compatibility_percentage: number;
  }>;
}

const ExpertSystem = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<
    { question_id: number; score: number }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recommendationData, setRecommendationData] =
    useState<RecommendationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiConnected, setApiConnected] = useState(false);

  const API_BASE_URL = "http://localhost:5000/api";

  // Check API connection
  const checkApiConnection = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/majors`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setApiConnected(true);
        setError(null);
      } else {
        throw new Error("API not responding");
      }
    } catch (err) {
      setApiConnected(false);
      setError(
        "Cannot connect to Flask backend. Please make sure the Flask server is running on http://localhost:5000"
      );
    }
  };

  // Fetch questions from Flask API
  const fetchQuestions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/questions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }

      const data = await response.json();
      if (data.success && data.questions) {
        setQuestions(data.questions);
        setError(null);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError(
        "Failed to load questions. Please check if Flask server is running."
      );
    }
  };

  // Get recommendations from Flask API
  const getRecommendations = async (
    userAnswers: { question_id: number; score: number }[]
  ) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers: userAnswers }),
      });

      if (!response.ok) {
        throw new Error("Failed to get recommendations");
      }

      const data = await response.json();
      if (data.success && data.recommendations) {
        setRecommendationData(data);
        setShowResults(true);
        setError(null);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error getting recommendations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkApiConnection();
    fetchQuestions();
  }, []);

  const handleAnswer = (answerValue: string) => {
    const scoreValue = parseInt(answerValue);
    const newAnswer = {
      question_id: questions[currentStep].id,
      score: scoreValue,
    };
    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      getRecommendations(newAnswers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Remove the last answer
      setAnswers(answers.slice(0, -1));
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setRecommendationData(null);
    setShowResults(false);
    setLoading(false);
    setIsStarted(false);
    setError(null);
  };

  const startQuiz = () => {
    setIsStarted(true);
  };

  const progressPercentage =
    questions.length > 0 ? ((currentStep + 1) / questions.length) * 100 : 0;

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md w-full">
          <CardContent className="space-y-6">
            <div className="relative">
              <div className="w-16 h-16 mx-auto">
                <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
              </div>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-xl">
                Menganalisis Profil Anda
              </CardTitle>
              <CardDescription className="text-base">
                Sistem sedang memproses jawaban untuk menemukan jurusan yang
                tepat...
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Results Screen
  if (showResults && recommendationData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4">
        <div className="max-w-6xl mx-auto py-8">
          {/* Header */}
          <div className="text-center mb-8 space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div className="flex justify-center items-center gap-x-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative p-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-lg hover:shadow-purple-500/50 cursor-pointer"
                title="Pelajari tentang RIASEC"
              >
                <HelpCircle className="w-6 h-6 text-white group-hover:animate-pulse" />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-75" />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full" />
              </button>
              <h1 className="text-4xl font-bold text-white mb-2">
                Hasil Analisis RIASEC Anda
              </h1>
              <RiasecModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
            <p className="text-xl text-slate-300 italic">
              Perlu diingat, hasil ini bersifat sebagai rekomendasi awal dan
              belum tentu sepenuhnya akurat. Keputusan akhir tetap bergantung
              pada pertimbangan pribadi, minat, dan analisis lebih lanjut.
            </p>
          </div>

          {/* API Status */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <div className="ml-2">
                <strong>Peringatan:</strong> {error}
              </div>
            </Alert>
          )}

          {/* RIASEC Profile Summary */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-6 h-6 text-blue-400" />
                <span>Profil Kepribadian RIASEC Anda</span>
              </CardTitle>
              <CardDescription>
                Tipe dominan Anda:{" "}
                <span className="font-bold text-white">
                  {recommendationData.dominant_type} (
                  {
                    recommendationData.assessment_summary[
                      recommendationData.dominant_type
                    ]?.name
                  }
                  )
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(recommendationData.assessment_summary).map(
                  ([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-300">
                          {key} - {value.name}
                        </span>
                        <span className="text-sm font-bold text-white">
                          {value.score.toFixed(0)}%
                        </span>
                      </div>
                      <Progress value={value.score} />
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Award className="w-6 h-6 mr-2 text-yellow-400" />
              Rekomendasi Jurusan untuk Anda
            </h2>

            <div className="grid gap-6">
              {recommendationData.recommendations
                .slice(0, 10)
                .map((rec, index) => (
                  <Card
                    key={rec.major_code}
                    className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                              index === 0
                                ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                                : index === 1
                                ? "bg-gradient-to-r from-blue-500 to-purple-500"
                                : index === 2
                                ? "bg-gradient-to-r from-purple-500 to-pink-500"
                                : "bg-gradient-to-r from-gray-500 to-gray-600"
                            }`}
                          >
                            #{index + 1}
                          </div>
                          <div>
                            <CardTitle className="text-xl">
                              {rec.major_name}
                            </CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                              <Building className="w-4 h-4 text-slate-400" />
                              <span className="text-sm text-slate-300">
                                {rec.faculty}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <TrendingUp className="w-4 h-4 text-green-400" />
                              <span className="text-lg font-semibold text-green-400">
                                {rec.compatibility_percentage.toFixed(0)}%
                                Kesesuaian
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                Pola: {rec.riasec_pattern}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant={
                            index === 0
                              ? "success"
                              : index === 1
                              ? "warning"
                              : "secondary"
                          }
                        >
                          {index === 0
                            ? "Pilihan Utama"
                            : index === 1
                            ? "Pilihan Kedua"
                            : `Pilihan ${index + 1}`}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <CardDescription className="text-base mb-4 text-slate-200">
                        {rec.description}
                      </CardDescription>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">
                            Tingkat Kesesuaian
                          </span>
                          <span className="font-medium text-white">
                            {rec.compatibility_percentage.toFixed(1)}%
                          </span>
                        </div>
                        <Progress value={rec.compatibility_percentage} />

                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">
                            Kode Jurusan: {rec.major_code}
                          </span>
                          <span className="text-slate-400">
                            Skor: {rec.compatibility_score.toFixed(1)}/10
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {recommendationData.recommendations.length > 3 && (
              <div className="text-center mt-6">
                <p className="text-slate-300">
                  Menampilkan 10 dari{" "}
                  {recommendationData.recommendations.length}{" "}
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="text-center">
            <Button onClick={resetQuiz} variant="primary" size="lg">
              <ArrowRight className="w-4 h-4 mr-2" />
              Mulai Tes Ulang
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Welcome Screen
  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Expert System
            </h1>
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative p-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-lg hover:shadow-purple-500/50 cursor-pointer"
                title="Pelajari tentang RIASEC"
              >
                <HelpCircle className="w-6 h-6 text-white group-hover:animate-pulse" />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-75" />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full" />
              </button>
              <h2 className="text-2xl font-semibold text-slate-300">
                Tes RIASEC - Rekomendasi Jurusan Perguruan Tinggi
              </h2>
            </div>
          </div>
          <RiasecModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />

          <Card className="p-8 mb-8 max-w-2xl mx-auto">
            <CardContent className="space-y-6">
              <CardDescription className="text-lg text-slate-200 leading-relaxed">
                Temukan jurusan kuliah yang tepat untuk Anda! Sistem pakar ini
                menggunakan metode RIASEC (Realistic, Investigative, Artistic,
                Social, Enterprising, Conventional) untuk menganalisis minat dan
                kemampuan Anda melalui serangkaian pertanyaan untuk memberikan
                rekomendasi jurusan yang sesuai dengan profil kepribadian Anda.
              </CardDescription>

              {/* API Status Indicator */}
              <div className="flex items-center justify-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    apiConnected ? "bg-green-500" : "bg-red-500"
                  } animate-pulse`}
                ></div>
                <span className="text-sm text-slate-300">
                  {apiConnected ? "Connected" : "Not Connected"}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="text-center">
                  <Zap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-white mb-1">
                    Hasil Akurat
                  </h3>
                  <p className="text-sm text-slate-400">
                    Analisis berbasis RIASEC
                  </p>
                </div>
                <div className="text-center">
                  <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-white mb-1">
                    Rekomendasi Personal
                  </h3>
                  <p className="text-sm text-slate-400">
                    Sesuai kepribadian Anda
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive" className="mb-6 max-w-2xl mx-auto">
              <AlertCircle className="h-4 w-4" />
              <div className="ml-2 text-left">
                <strong>Pemberitahuan:</strong> {error}
              </div>
            </Alert>
          )}

          <Button
            onClick={startQuiz}
            variant="primary"
            size="xl"
            className="animate-pulse cursor-pointer"
            disabled={questions.length === 0}
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Mulai Tes RIASEC
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          {questions.length === 0 && (
            <p className="text-slate-400 mt-4 text-sm">
              Memuat pertanyaan dari server...
            </p>
          )}
        </div>
      </div>
    );
  }

  // Question Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-3xl mx-auto py-8">
        {/* Progress */}

        <Card className="p-6 mb-8">
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-lg">
                Pertanyaan {currentStep + 1} dari {questions.length}
              </CardTitle>
              <span className="text-lg font-semibold text-blue-400">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <Progress value={progressPercentage} />

            {/* Step indicators */}
            <div className="flex justify-between mt-4">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index < currentStep
                      ? "bg-green-500"
                      : index === currentStep
                      ? "bg-blue-500"
                      : "bg-slate-600"
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Question */}
        {questions[currentStep] && (
          <Card className="p-8">
            <CardHeader className="text-center pb-6">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-white">
                  {currentStep + 1}
                </span>
              </div>

              <CardTitle className="text-2xl leading-snug h-[4.5rem] flex items-center justify-center text-center px-2">
                <span className="line-clamp-2">
                  {questions[currentStep].question}
                </span>
              </CardTitle>

              <CardDescription className="text-sm mt-2">
                Dimensi: {questions[currentStep].dimension} | Pilih salah satu
                opsi di bawah
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-3 mb-6">
                {questions[currentStep].options.map((option) => (
                  <Button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    variant="outline"
                    className="w-full p-6 h-auto text-left hover:bg-blue-500/10 hover:border-blue-400 group transition-all duration-200 flex items-center justify-between"
                  >
                    {/* LEFT SIDE */}
                    <div className="flex items-center gap-4 w-full">
                      {/* Value di ujung kiri */}
                      <div className="w-8 h-8 min-w-[2rem] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {option.value}
                      </div>

                      {/* Label akan wrap jika panjang */}
                      <span className="text-base text-left">
                        {option.label}
                      </span>
                    </div>

                    {/* Chevron tetap di kanan */}
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                  </Button>
                ))}
              </div>

              {/* Back Button */}
              {currentStep > 0 && (
                <div className="flex justify-center">
                  <Button
                    onClick={handleBack}
                    variant="ghost"
                    size="lg"
                    className="text-slate-300 hover:text-white"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali ke Pertanyaan Sebelumnya
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ExpertSystem;
