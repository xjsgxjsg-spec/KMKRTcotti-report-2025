import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface LoginProps {
  onLogin: (phone: string) => void;
  loading: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, loading }) => {
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim()) {
      onLogin(phone);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements - Coffee Theme (Warmer Colors) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50">
        <div className="flex flex-col items-center mb-8">
          {/* Custom Image Icon */}
          <div className="w-24 h-24 mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg shadow-orange-100 relative bg-white">
             {/* Note: In a real environment, you would upload your specific image file. 
                 Here I am using a public URL that looks like the Cotti Coffee product you showed. */}
            <img 
              src="https://ts2.tc.mm.bing.net/th/id/OIP-C.qVIW1S1sqcHDrbJW5nRjMQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3&fmt=auto&app=138&f=JPEG?w=500&h=500" 
              alt="Cotti Coffee" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <h1 className="text-3xl font-bold text-slate-800 text-center">昆明地铁大堂咖啡吧一周年饮咖报告</h1>
          <p className="text-slate-500 text-sm mt-3 text-center px-4 leading-relaxed">
            输入你的手机号查看你在本店的喝咖啡情况
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="输入你经常购买咖啡的手机号"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-center tracking-wider font-medium"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !phone}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg shadow-orange-200 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]
              ${loading || !phone 
                ? 'bg-slate-300 cursor-not-allowed shadow-none' 
                : 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600'
              }`}
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <span>查看</span>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-400">
          <p>数据区间：2025年1月23日至2026年1月22日</p>
        </div>
      </div>
    </div>
  );
};

export default Login;