import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface LoginErrorProps {
  onRetry: () => void;
}

const LoginError: React.FC<LoginErrorProps> = ({ onRetry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Decorative Background - Same as Login for consistency */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 text-center">
        
        <div className="text-8xl mb-6 select-none hover:scale-110 transition-transform cursor-default">
          🤭‍
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-3">
          这个手机号好像没在我们店里买过咖啡
        </h2>
        
        <p className="text-slate-500 mb-8 leading-relaxed">
          要不换一个手机号试试？
        </p>

        <button
          onClick={onRetry}
          className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg shadow-orange-200 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回</span>
        </button>

      </div>
    </div>
  );
};

export default LoginError;