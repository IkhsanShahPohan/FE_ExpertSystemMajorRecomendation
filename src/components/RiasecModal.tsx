import React, { useState } from "react";
import {
  GraduationCap,
  HelpCircle,
  X,
  Users,
  Wrench,
  BookOpen,
  Briefcase,
  Palette,
  Heart,
} from "lucide-react";

type RiasecModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const RiasecModal: React.FC<RiasecModalProps> = ({
  isOpen,
  onClose,
}) => {
  const riasecTypes = [
    {
      letter: "R",
      name: "Realistic",
      icon: Wrench,
      color: "from-red-500 to-orange-500",
      description:
        "Suka bekerja dengan tangan, alat, mesin, dan aktivitas fisik",
      examples: "Insinyur, Mekanik, Arsitek, Petani",
    },
    {
      letter: "I",
      name: "Investigative",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
      description:
        "Suka menganalisis, meneliti, dan memecahkan masalah kompleks",
      examples: "Ilmuwan, Peneliti, Dokter, Programmer",
    },
    {
      letter: "A",
      name: "Artistic",
      icon: Palette,
      color: "from-purple-500 to-pink-500",
      description: "Suka berkreasi, berekspresi, dan menciptakan karya seni",
      examples: "Desainer, Musisi, Penulis, Aktor",
    },
    {
      letter: "S",
      name: "Social",
      icon: Heart,
      color: "from-green-500 to-emerald-500",
      description:
        "Suka membantu, mengajar, dan berinteraksi dengan orang lain",
      examples: "Guru, Konselor, Perawat, Pekerja Sosial",
    },
    {
      letter: "E",
      name: "Enterprising",
      icon: Briefcase,
      color: "from-yellow-500 to-orange-500",
      description: "Suka memimpin, mempengaruhi, dan berbisnis",
      examples: "Pengusaha, Manajer, Lawyer, Politisi",
    },
    {
      letter: "C",
      name: "Conventional",
      icon: Users,
      color: "from-indigo-500 to-blue-500",
      description:
        "Suka bekerja dengan data, detail, dan prosedur yang terstruktur",
      examples: "Akuntan, Administrasi, Pustakawan, Analis",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur effect */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border border-purple-500/30 shadow-2xl transform transition-all duration-700 ease-out animate-modalSlideIn">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl animate-spin-slow" />
        </div>

        {/* Header */}
        <div className="relative p-8 border-b border-purple-500/30">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group"
          >
            <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
          </button>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4 animate-bounce-gentle">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-2 animate-fadeInUp">
              Apa itu RIASEC?
            </h2>
            <p className="text-lg text-slate-300 animate-fadeInUp delay-200">
              Model kepribadian karir yang membantu menentukan minat dan bakat
              Anda
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-8 overflow-y-auto max-h-[60vh]">
          <div className="mb-8 text-center animate-fadeInUp delay-300">
            <p className="text-slate-200 text-lg leading-relaxed">
              RIASEC adalah teori yang dikembangkan oleh psikolog{" "}
              <span className="text-purple-400 font-semibold">
                John Holland{" "}
              </span>
              untuk mengkategorikan kepribadian dan lingkungan kerja ke dalam
              enam tipe utama.
            </p>
          </div>

          {/* RIASEC Types Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {riasecTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <div
                  key={type.letter}
                  className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fadeInUp"
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-r ${type.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span
                          className={`text-2xl font-bold bg-gradient-to-r ${type.color} bg-clip-text text-transparent`}
                        >
                          {type.letter}
                        </span>
                        <h3 className="text-xl font-bold text-white">
                          {type.name}
                        </h3>
                      </div>
                      <p className="text-slate-300 mb-3 leading-relaxed">
                        {type.description}
                      </p>
                      <div className="text-sm">
                        <span className="text-purple-400 font-semibold">
                          Contoh Profesi:{" "}
                        </span>
                        <span className="text-slate-400">{type.examples}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Info */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 animate-fadeInUp delay-1000">
            <h4 className="text-xl font-bold text-white mb-3">
              💡 Bagaimana Cara Kerjanya?
            </h4>
            <p className="text-slate-200 leading-relaxed">
              Tes RIASEC akan mengukur tingkat minat Anda terhadap masing-masing
              kategori. Hasil tes berupa kode 3 huruf (seperti RIA atau SEC)
              yang menunjukkan 3 tipe dominan Anda. Berdasarkan kode ini, sistem
              akan merekomendasikan jurusan perguruan tinggi yang paling sesuai!
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-gentle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        .animate-modalSlideIn {
          animation: modalSlideIn 0.5s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out both;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};
