import React, { useState, useEffect } from 'react';
import { Coffee } from 'lucide-react';

interface LoadingReportProps {
  onFinish: () => void;
}

const LoadingReport: React.FC<LoadingReportProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 总时长设置为约 3.5 秒，给用户足够的阅读时间
    const duration = 3500;
    const intervalTime = 50;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      // 稍微停顿一下展示 100%
      const timeout = setTimeout(() => {
        onFinish();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, onFinish]);

  const getLoadingText = (p: number) => {
    if (p < 20) return "正在回收你喝完的咖啡杯...";
    if (p < 45) return "正在检查咖啡杯上的标签并统计...";
    if (p < 70) return "正在编译着色器.....";
    if (p < 90) return "正在计算...";
    return "即将完成...";
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden font-sans">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-[30%] -right-[10%] w-[60%] h-[60%] bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-[20%] left-[10%] w-[60%] h-[60%] bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content Area - Centered Icon */}
      <div className="flex-grow flex items-center justify-center z-10">
        <div className="relative">
             <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl shadow-orange-200 border-4 border-white animate-bounce relative z-10">
                <Coffee className="w-14 h-14 text-red-600" />
             </div>
             <div className="absolute top-0 left-0 w-full h-full bg-red-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
        </div>
      </div>

      {/* Bottom Loading Area */}
      <div className="z-10 w-full px-8 pb-20">
        <div className="text-center mb-6 h-8 flex items-end justify-center">
            <p className="text-slate-600 font-bold text-lg animate-pulse transition-all duration-300 tracking-wide">
                {getLoadingText(progress)}
            </p>
        </div>

        <div className="w-full bg-white rounded-full h-6 mb-3 overflow-hidden border border-slate-100 shadow-md p-1">
            <div 
                className="bg-gradient-to-r from-orange-400 to-red-500 h-full rounded-full transition-all duration-100 ease-linear relative overflow-hidden"
                style={{ width: `${progress}%` }}
            >
                <div className="absolute top-0 left-0 w-full h-full bg-white/30 animate-[shimmer_1s_infinite]"></div>
            </div>
        </div>

        <p className="text-center text-slate-400 font-black font-mono text-xl">
            {Math.round(progress)}%
        </p>
      </div>

      <style>{`
        @keyframes shimmer { 
            0% { transform: translateX(-100%); } 
            100% { transform: translateX(100%); } 
        }
      `}</style>
    </div>
  );
};

export default LoadingReport;