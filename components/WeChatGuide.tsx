import React, { useEffect, useState } from 'react';
import { ExternalLink, X } from 'lucide-react';

const WeChatGuide: React.FC = () => {
  const [isWeChat, setIsWeChat] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // 检测是否在微信浏览器中
    const ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i)) {
      setIsWeChat(true);
    }
  }, []);

  if (!isWeChat || !visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-sm flex flex-col items-center px-8 pt-12 text-white animate-in fade-in duration-300">
      {/* Top Right Arrow */}
      <div className="absolute top-4 right-6 flex flex-col items-end animate-bounce">
        <img 
            src="https://img.icons8.com/ios-filled/100/ffffff/curved-arrow.png" 
            alt="arrow" 
            className="w-16 h-16 opacity-80 transform -rotate-90"
            style={{ filter: 'invert(1)' }}
        />
      </div>

      <div className="mt-20 text-center space-y-6 max-w-sm">
        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
            <ExternalLink className="w-10 h-10 text-orange-400" />
        </div>
        
        <h2 className="text-2xl font-bold tracking-wide">
          为了更好的体验
        </h2>
        
        <div className="space-y-2 text-lg text-slate-300 font-medium">
          <p>请点击右上角的 <span className="text-white font-bold text-xl px-1">···</span></p>
          <p>选择 <span className="text-orange-400 font-bold border-b-2 border-orange-400">在浏览器打开</span></p>
        </div>

        <div className="pt-8 text-sm text-slate-500">
          <p>微信可能会屏蔽部分酷炫动画特效</p>
          <p>建议使用系统自带浏览器观看年度报告</p>
        </div>
      </div>

      {/* Dismiss Button (Optional) */}
      <button 
        onClick={() => setVisible(false)}
        className="mt-auto mb-12 py-3 px-8 rounded-full border border-white/20 text-slate-400 text-sm hover:bg-white/10 transition-colors"
      >
        我坚持在微信看
      </button>
    </div>
  );
};

export default WeChatGuide;