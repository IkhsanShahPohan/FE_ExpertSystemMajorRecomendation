import React, { useState, useEffect, JSX } from 'react';
import { Brain, Lightbulb, Palette, Users, TrendingUp, FileText, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface RiasecInfo {
  name: string;
  description: string;
}

interface AssessmentSummary {
  [key: string]: {
    name: string;
    score: number;
  };
}

interface RecommendationData {
  dominant_type: string;
  assessment_summary: AssessmentSummary;
}

interface RiasecInfoSectionProps {
  recommendationData: RecommendationData | null;
}

const RiasecInfoSection: React.FC<RiasecInfoSectionProps> = ({ recommendationData }) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [riasecInfo, setRiasecInfo] = useState<Record<string, RiasecInfo> | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Simulated API data (replace with actual fetch from your endpoint)
  useEffect(() => {
    // Simulate API call
    const fetchRiasecInfo = async () => {
      // Replace this with actual API call to /api/riasec-info
      const mockData = {
        "R": {
          "name": "Realistic",
          "description": "Suka bekerja terutama dengan tangan, membuat, memperbaiki, merakit atau membangun sesuatu, menggunakan dan mengoperasikan alat atau mesin, serta seringkali bekerja di luar ruangan."
        },
        "I": {
          "name": "Investigative", 
          "description": "Suka menemukan dan meneliti ide, mengamati, menyelidiki, bereksperimen, mengajukan pertanyaan, dan menyelesaikan masalah."
        },
        "A": {
          "name": "Artistic",
          "description": "Suka menggunakan kata-kata, seni, musik atau drama untuk berkomunikasi, melakukan, atau mengekspresikan diri, membuat dan merancang sesuatu."
        },
        "S": {
          "name": "Social",
          "description": "Suka mengajar, melatih dan memberi informasi, membantu, mengobati, menyembuhkan dan melayani dan menyapa, peduli dengan kesejahteraan diri dan kesejahteraan orang lain."
        },
        "E": {
          "name": "Enterprising",
          "description": "Suka bertemu dengan orang, memimpin, berbicara dan mempengaruhi orang lain, mendorong orang lain, bekerja dalam bisnis."
        },
        "C": {
          "name": "Conventional",
          "description": "Suka bekerja di dalam ruangan dan pada tugas-tugas yang melibatkan pengorganisasian dan akurasi, mengikuti prosedur, bekerja dengan data atau angka, pekerjaan perencanaan dan acara."
        }
      };
      
      setRiasecInfo(mockData);
      setTimeout(() => setIsVisible(true), 300);
    };

    fetchRiasecInfo();
  }, []);

  const getIcon = (type: string) => {
    const iconMap: Record<string, JSX.Element> = {
      'R': <FileText className="w-6 h-6" />,
      'I': <Lightbulb className="w-6 h-6" />,
      'A': <Palette className="w-6 h-6" />,
      'S': <Users className="w-6 h-6" />,
      'E': <TrendingUp className="w-6 h-6" />,
      'C': <Brain className="w-6 h-6" />
    };
    return iconMap[type] || <Brain className="w-6 h-6" />;
  };

  const getGradient = (type: string, index: number): string => {
    const gradients = [
      'from-rose-500 via-pink-500 to-purple-600',
      'from-blue-500 via-cyan-500 to-teal-500',
      'from-purple-500 via-violet-500 to-indigo-600',
      'from-emerald-500 via-green-500 to-teal-600',
      'from-orange-500 via-amber-500 to-yellow-500',
      'from-slate-500 via-gray-500 to-zinc-600'
    ];
    return gradients[index % gradients.length];
  };

  const getScoreForType = (type: string): number => {
    return recommendationData?.assessment_summary?.[type]?.score || 0;
  };

  const getDominantType = (): string => {
    return recommendationData?.dominant_type || '';
  };

  if (!riasecInfo) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className={`mb-12 transition-all duration-1000 transform ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}>
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mb-6 shadow-2xl animate-pulse">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Memahami Dimensi RIASEC
        </h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Teori RIASEC membagi kepribadian menjadi 6 dimensi yang membantu menentukan preferensi karir dan lingkungan kerja yang ideal untuk Anda
        </p>
      </div>

      {/* RIASEC Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {riasecInfo && Object.entries(riasecInfo).map(([type, info], index) => {
          const isExpanded = expandedCard === type;
          const isDominant = getDominantType() === type;
          const score = getScoreForType(type);
          
          return (
            <div
              key={type}
              className={`group relative overflow-hidden rounded-2xl backdrop-blur-xl border transition-all duration-700 transform hover:scale-105 ${
                isDominant 
                  ? 'border-yellow-400/50 bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-orange-500/10 shadow-2xl shadow-yellow-500/20' 
                  : 'border-white/10 bg-gradient-to-br from-white/5 via-white/2 to-transparent hover:border-white/20'
              } ${isExpanded ? 'md:col-span-2 lg:col-span-1' : ''}`}
              style={{
                animationDelay: `${index * 150}ms`,
                animation: isVisible ? 'slideInUp 0.8s ease-out forwards' : 'none'
              } as React.CSSProperties}
            >
              {/* Animated Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(type, index)} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Dominant Badge */}
              {isDominant && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce">
                    DOMINAN
                  </div>
                </div>
              )}

              {/* Card Content */}
              <div className="relative p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getGradient(type, index)} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      <div className="text-white transform group-hover:scale-110 transition-transform duration-300">
                        {getIcon(type)}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-2xl font-bold text-white">{type}</h3>
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
                      </div>
                      <p className="text-lg font-semibold bg-gradient-to-r from-slate-300 to-slate-100 bg-clip-text text-transparent">
                        {info.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Score Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-400">Skor Anda</span>
                    <span className="text-lg font-bold text-white">{score.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${getGradient(type, index)} rounded-full transition-all duration-1000 ease-out shadow-lg`}
                      style={{ 
                        width: `${score}%`,
                        animation: isVisible ? `fillProgress 1.5s ease-out ${index * 200}ms forwards` : 'none',
                        transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'left'
                      }}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="flex-1">
                  <p className={`text-slate-300 leading-relaxed transition-all duration-500 ${
                    isExpanded ? 'max-h-none' : 'max-h-20 overflow-hidden'
                  }`}>
                    {info.description}
                  </p>
                  
                  {info.description.length > 100 && (
                    <button
                      onClick={() => setExpandedCard(isExpanded ? null : type)}
                      className="mt-3 flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm font-medium group/btn"
                    >
                      <span>{isExpanded ? 'Tutup' : 'Baca Selengkapnya'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 group-hover/btn:transform group-hover/btn:-translate-y-1 transition-transform duration-200" />
                      ) : (
                        <ChevronDown className="w-4 h-4 group-hover/btn:transform group-hover/btn:translate-y-1 transition-transform duration-200" />
                      )}
                    </button>
                  )}
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-400/50 group-hover:to-purple-400/50 transition-all duration-300 pointer-events-none" />
              </div>

              {/* Floating Particles Effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-1 h-1 bg-white/30 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${20 + i * 20}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: '2s'
                    } as React.CSSProperties}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Insight */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
          <Brain className="w-5 h-5 text-blue-400" />
          <span className="text-slate-300">
            Tipe dominan Anda: <span className="font-bold text-white">{getDominantType()} - {riasecInfo[getDominantType()]?.name}</span>
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fillProgress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  );
};

export default RiasecInfoSection;