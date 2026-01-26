import React, { useState } from 'react';
import { CustomerData } from '../types';
import { 
  LogOut, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  Trophy, 
  Calendar, 
  Coffee, 
  Heart, 
  Crown, 
  Compass, 
  Award, 
  Zap, 
  TrendingUp, 
  CupSoda,
  GlassWater,
  Milk,
  IceCream
} from 'lucide-react';
import { 
  BarChart, Bar, Cell, ResponsiveContainer, XAxis, Tooltip,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

interface DashboardProps {
  data: CustomerData;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, onLogout }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const ACTUAL_TOTAL_SLIDES = 7; 
  const slideIndex = currentSlide + 1;

  const animBase = "opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]";

  const nextSlide = () => {
    if (currentSlide < ACTUAL_TOTAL_SLIDES - 1) {
      setCurrentSlide(curr => curr + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(curr => curr - 1);
      window.scrollTo(0, 0);
    }
  };

  const restart = () => {
    setCurrentSlide(0);
    window.scrollTo(0, 0);
  };

  // Helper to format date: YYYY年MM月DD日 HH:MM
  const formatChineseDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      const hh = String(date.getHours()).padStart(2, '0');
      const mm = String(date.getMinutes()).padStart(2, '0');
      return `${y}年${m}月${d}日 ${hh}:${mm}`;
    } catch (e) {
      return dateStr;
    }
  };

  const Header = () => (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-3xl mx-auto px-4 h-16 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow-md shadow-red-200">
            <Coffee className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-slate-800">Cotti Coffee Report</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
             <span className="text-xs font-medium text-slate-500 block">Page {slideIndex} of {ACTUAL_TOTAL_SLIDES}</span>
          </div>
          <button onClick={onLogout} className="text-slate-400 hover:text-red-600 transition-colors p-2">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="h-1 w-full bg-slate-100">
        <div 
          className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-500 ease-out"
          style={{ width: `${(slideIndex / ACTUAL_TOTAL_SLIDES) * 100}%` }}
        />
      </div>
    </header>
  );

  const renderWelcomeSlide = () => (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-orange-50/50 to-slate-50">
      <div className="max-w-md w-full">
        <h1 className={`${animBase} text-3xl font-bold text-slate-800 mb-2`} style={{ animationDelay: '0.2s' }}>欢迎光临！</h1>
        <h2 className={`${animBase} text-xl text-slate-600 mb-8`} style={{ animationDelay: '0.8s' }}>很高兴为你总结这一年的饮咖时光</h2>
        <p className={`${animBase} text-xl text-slate-400 italic mb-8`} style={{ animationDelay: '1.4s' }}>我记得很清楚，你在</p>
        <div className={`${animBase} w-full mb-4`} style={{ animationDelay: '2s' }}>
           <div className="bg-white border border-orange-100 rounded-2xl p-4 shadow-lg shadow-orange-100/50 flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 flex-shrink-0"><Calendar /></div>
              <div className="text-left"><p className="text-lg font-bold text-slate-800">{formatChineseDate(data.firstOrderDate)}</p></div>
           </div>
        </div>
        <p className={`${animBase} text-xl text-slate-400 text-sm mb-4`} style={{ animationDelay: '2.6s' }}>点了一杯</p>
        <div className={`${animBase} w-full mb-10`} style={{ animationDelay: '3.2s' }}>
           <div className="bg-white border border-red-100 rounded-2xl p-4 shadow-lg shadow-red-100/50 flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 flex-shrink-0"><Coffee /></div>
              <div className="text-left"><p className="text-xl font-bold text-slate-800">{data.firstOrderItem}</p></div>
           </div>
        </div>
        <p className={`${animBase} text-lg text-slate-700 font-medium`} style={{ animationDelay: '4s' }}>感谢你从这里开始，与我们同行。</p>
      </div>
    </div>
  );

  const renderMonthlySlide = () => {
    const months = ['25/01','02','03','04','05','06','07','08','09','10','11','12','26/01'];
    const chartData = data.monthlyCounts.map((val, idx) => ({ name: months[idx], value: val }));
    const maxVal = Math.max(...data.monthlyCounts);
    const maxIdx = data.monthlyCounts.indexOf(maxVal);

    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-50/50 to-slate-50">
        <div className="max-w-md w-full">
           <h2 className={`${animBase} text-center text-xl text-slate-600 mb-2`} style={{ animationDelay: '0.2s' }}>这一年过得很快啊</h2>
           <h1 className={`${animBase} text-center text-3xl font-bold text-slate-800 mb-8`} style={{ animationDelay: '0.8s' }}>你留下的咖啡足迹</h1>
           <div className={`${animBase} h-64 w-full bg-white rounded-2xl p-4 shadow-lg border border-blue-50 mb-8`} style={{ animationDelay: '1.4s' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '12px', border: 'none'}} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={index === maxIdx ? '#3b82f6' : '#bfdbfe'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
           </div>
           <div className={`${animBase} text-center space-y-2`} style={{ animationDelay: '2s' }}>
             <p className="text-slate-500">这一年，你最离不开咖啡的月份是 <span className="font-bold text-slate-800">{months[maxIdx]}</span></p>
             <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold">
               <TrendingUp className="w-4 h-4" /> 单月最高 {maxVal} 杯
             </div>
           </div>
        </div>
      </div>
    );
  };

  const renderTotalCupsSlide = () => (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-emerald-50/50 to-slate-50">
      <div className="max-w-md w-full">
        <h1 className={`${animBase} text-3xl font-bold text-slate-800 mb-10`} style={{ animationDelay: '0.2s' }}>这一年的分量</h1>
        <div className={`${animBase} relative py-10`} style={{ animationDelay: '0.8s' }}>
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-200 rounded-full blur-3xl opacity-30"></div>
           <span className="text-8xl font-black text-emerald-600 drop-shadow-sm relative z-10">{data.totalCups}</span>
           <span className="text-2xl font-bold text-emerald-800 ml-2 relative z-10">杯</span>
        </div>
        <div className={`${animBase} bg-white p-6 rounded-3xl shadow-xl border border-emerald-100 mx-4`} style={{ animationDelay: '1.4s' }}>
           <p className="text-slate-400 text-sm uppercase tracking-widest mb-2 font-bold">全店排名荣誉</p>
           <div className="flex flex-col items-center gap-3">
             <div className="flex items-center gap-3">
               <Trophy className="w-10 h-10 text-yellow-500 fill-yellow-500 animate-bounce" />
               <p className="text-4xl font-black text-slate-800">No. {data.totalCupsRank}</p>
             </div>
             {data.totalCupsTitle && (
               <div className="mt-2 px-6 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white rounded-full text-lg font-black shadow-lg shadow-yellow-100">
                 {data.totalCupsTitle}
               </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );

  const renderFavoriteSlide = () => {
    const progress = Math.min(100, (data.favoriteItemCount / data.topUserCount) * 100);
    const gap = data.topUserCount - data.favoriteItemCount;
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-pink-50/50 to-slate-50">
        <div className="max-w-md w-full">
          <h1 className={`${animBase} text-3xl font-black text-pink-600 mb-10`} style={{ animationDelay: '0.2s' }}>你的年度最爱饮品</h1>
          <div className={`${animBase} mb-8`} style={{ animationDelay: '0.8s' }}>
            <div className="w-44 h-44 bg-white rounded-full mx-auto flex items-center justify-center shadow-2xl shadow-pink-200 border-8 border-pink-50 relative">
               <Heart className="w-20 h-20 text-pink-500 fill-pink-500 animate-pulse" />
               <div className="absolute -bottom-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white px-6 py-1.5 rounded-full text-lg font-black shadow-lg">
                 {data.favoriteItemCount} 杯
               </div>
            </div>
          </div>
          <h3 className={`${animBase} text-2xl font-black text-slate-800 mb-8`} style={{ animationDelay: '1.4s' }}>{data.favoriteItem}</h3>
          <div className={`${animBase} bg-white rounded-3xl p-6 border border-pink-100 shadow-xl shadow-pink-50/50 mx-4`} style={{ animationDelay: '2s' }}>
             <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-left border-r border-pink-50 pr-4">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">该饮品全店排名</p>
                  <div className="flex items-baseline gap-1">
                    <p className="text-xs font-bold text-slate-400">第</p>
                    <p className="text-3xl font-black text-pink-600">{data.favoriteItemRank}</p>
                    <p className="text-xs font-bold text-slate-400">位</p>
                  </div>
                </div>
                <div className="text-right pl-4">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">榜一冠军纪录</p>
                  <div className="flex items-baseline justify-end gap-1">
                    <p className="text-3xl font-black text-slate-800">{data.topUserCount}</p>
                    <p className="text-xs font-bold text-slate-400">杯</p>
                  </div>
                </div>
             </div>
             <div className="w-full mb-6">
                <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-200 mb-2">
                   <div className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-1000 ease-out relative" style={{ width: `${progress}%` }}>
                     <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                   </div>
                </div>
                <p className="text-xs font-bold text-pink-600 text-right">距离登顶还要再喝 {gap} 杯</p>
             </div>
             <p className="text-sm text-slate-500 leading-relaxed font-medium pt-4 border-t border-slate-50">
                它贡献了你年度总杯数的 <span className="text-rose-500 font-black">{data.preferenceDepth}</span>。
             </p>
          </div>
        </div>
      </div>
    );
  };

  const renderCategorySlide = () => {
    const counts = data.categoryCounts;
    const values = Object.values(counts) as number[];
    const maxVal = Math.max(...values, 1);

    const radarData = [
      { subject: '经典咖啡', A: counts.classicCoffee, full: maxVal },
      { subject: '风味奶咖', A: counts.flavorLatte, full: maxVal },
      { subject: '元气果咖', A: counts.fruitCoffee, full: maxVal },
      { subject: '无咖特调', A: counts.caffeineFree, full: maxVal },
      { subject: '鲜萃奶茶', A: counts.milkTea, full: maxVal },
      { subject: '清爽果茶', A: counts.fruitTea, full: maxVal },
    ];

    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 bg-gradient-to-b from-indigo-50/50 to-slate-50 overflow-hidden">
        <div className="max-w-md w-full text-center">
           <h1 className={`${animBase} text-3xl font-bold text-slate-800 mb-4`} style={{ animationDelay: '0.2s' }}>你的口味 DNA</h1>
           <p className={`${animBase} text-sm text-slate-500 mb-8`} style={{ animationDelay: '0.6s' }}>(以你的最高偏好为基准)</p>
           <div className={`${animBase} h-[380px] w-full bg-white/40 backdrop-blur-sm rounded-full relative mb-8 flex items-center justify-center`} style={{ animationDelay: '1s' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#cbd5e1" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12, fontWeight: 800 }} />
                  <PolarRadiusAxis domain={[0, maxVal]} axisLine={false} tick={false} />
                  <Radar name="杯数" dataKey="A" stroke="#4f46e5" strokeWidth={3} fill="#6366f1" fillOpacity={0.6} />
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', fontWeight: 'bold'}}
                    formatter={(value: any) => [`${value} 杯`, '消费数量']}
                  />
                </RadarChart>
              </ResponsiveContainer>
           </div>
           <p className={`${animBase} text-xs text-slate-400`} style={{ animationDelay: '1.4s' }}>提示：雷达中心至边缘代表 0 到 {maxVal} 杯</p>
        </div>
      </div>
    );
  };

  const renderExplorationSlide = () => {
    const medalIcons = [Coffee, CupSoda, GlassWater, Milk, IceCream];
    const hasTitles = data.itemTitles && data.itemTitles.length > 0;

    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 bg-gradient-to-b from-purple-50/50 to-slate-50">
        <div className="max-w-md w-full">
          <h1 className={`${animBase} text-center text-3xl font-black text-purple-600 mb-8`} style={{ animationDelay: '0.2s' }}>永不止步的探索精神</h1>
          <div className={`${animBase} bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-purple-100 shadow-xl mb-6 space-y-4 text-center`} style={{ animationDelay: '0.8s' }}>
            <p className="text-sm font-bold text-slate-500">本店在这一年间推出了 91 种商品，你喝过其中 <span className="text-purple-600">{data.distinctItemsCount}</span> 种</p>
            <div className="h-px bg-purple-50 w-full"></div>
            <div className="flex justify-around items-center py-2">
               <div className="flex flex-col items-center">
                  <Compass className="w-8 h-8 text-purple-500 mb-2" />
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">探索深度</p>
                  <p className="text-xl font-black text-slate-800">{data.explorationProgress}</p>
               </div>
               <div className="flex flex-col items-center">
                  <Award className="w-8 h-8 text-amber-500 mb-2" />
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">探索排名</p>
                  <p className="text-xl font-black text-slate-800">No. {data.explorationRank}</p>
               </div>
            </div>
          </div>
          {data.explorationTitle && (
            <div className={`${animBase} bg-gradient-to-br from-purple-600 to-fuchsia-600 p-6 rounded-3xl shadow-xl text-white mb-8 text-center relative overflow-hidden`} style={{ animationDelay: '1.4s' }}>
               <h2 className="text-2xl font-black">{data.explorationTitle}</h2>
            </div>
          )}
          
          {hasTitles && (
            <>
              <p className={`${animBase} text-center text-slate-500 font-bold text-sm mb-4`} style={{ animationDelay: '1.8s' }}>
                在探索过程中，你获得了以下单品王者勋章
              </p>
              <div className={`${animBase} space-y-3`} style={{ animationDelay: '2.2s' }}>
                {data.itemTitles.map((item, idx) => {
                  const [title, count] = item.split('_');
                  const IconComponent = medalIcons[idx % medalIcons.length];
                  return (
                    <div key={idx} className="bg-white border border-purple-50 p-4 rounded-2xl flex items-center justify-between shadow-sm transform hover:scale-105 transition-transform">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600"><IconComponent className="w-5 h-5" /></div>
                        <span className="text-slate-800 font-black text-sm">{title}</span>
                      </div>
                      <span className="text-purple-600 font-black text-sm">{count}</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderSummarySlide = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const redeemUrl = `${baseUrl}?redeem=${data.phoneNumber}&rank=${data.totalCupsRank}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(redeemUrl)}&bgcolor=ffffff&color=000000&margin=15`;

    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-red-50/50 to-slate-50">
        <div className="max-w-md w-full">
          <h1 className={`${animBase} text-3xl font-black text-slate-800 mb-8`} style={{ animationDelay: '0.2s' }}>年度荣誉墙</h1>
          
          <div className={`${animBase} space-y-3 mb-6`} style={{ animationDelay: '0.6s' }}>
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600"><Heart className="w-5 h-5"/></div>
                 <span className="text-slate-500 font-bold text-sm">年度最爱饮品</span>
              </div>
              <span className="text-lg font-black text-pink-600 truncate max-w-[140px]">{data.favoriteItem}</span>
            </div>
            
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600"><Coffee className="w-5 h-5"/></div>
                 <span className="text-slate-500 font-bold text-sm">年度总杯数</span>
              </div>
              <span className="text-2xl font-black text-emerald-600">{data.totalCups} 杯</span>
            </div>
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600"><Trophy className="w-5 h-5"/></div>
                 <span className="text-slate-500 font-bold text-sm">全店排名</span>
              </div>
              <span className="text-2xl font-black text-amber-600">No. {data.totalCupsRank}</span>
            </div>
          </div>

          <div className={`${animBase} flex flex-wrap justify-center gap-2 mb-8`} style={{ animationDelay: '1.2s' }}>
             {data.totalCupsTitle && (
               <div className="px-4 py-1.5 bg-amber-500 text-white rounded-full text-xs font-black shadow-md flex items-center gap-1.5">
                 <Crown className="w-3.5 h-3.5" /> {data.totalCupsTitle}
               </div>
             )}
             {data.explorationTitle && (
               <div className="px-4 py-1.5 bg-purple-600 text-white rounded-full text-xs font-black shadow-md flex items-center gap-1.5">
                 <Compass className="w-3.5 h-3.5" /> {data.explorationTitle}
               </div>
             )}
             {data.itemTitles.map((t, i) => (
               <div key={i} className="px-4 py-1.5 bg-blue-500 text-white rounded-full text-xs font-black shadow-md flex items-center gap-1.5">
                 <Zap className="w-3.5 h-3.5" /> {t.split('_')[0]}
               </div>
             ))}
          </div>

          <div className={`${animBase} bg-white p-6 rounded-3xl border-2 border-dashed border-red-200 mb-8 relative shadow-xl`} style={{ animationDelay: '2s' }}>
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-0.5 rounded-full text-xs font-black uppercase tracking-widest">礼品核销码</div>
             <div className="w-48 h-48 mx-auto rounded-2xl mb-4 bg-white flex items-center justify-center border border-slate-100 p-2 overflow-hidden shadow-inner">
               <img src={qrUrl} alt="QR Code" className="w-full h-full object-contain" />
             </div>
             <p className="text-xs text-slate-400 font-bold mb-2">UID: {data.phoneNumber}</p>
             <p className="text-sm text-slate-500 font-bold leading-relaxed">请出示给店员领取你的年度奖品，小小心意</p>
          </div>

          <p className={`${animBase} text-slate-600 font-bold mb-8 text-sm`} style={{ animationDelay: '2.2s' }}>
            欢迎再次光临，我们已为你准备好下一杯惊喜！
          </p>

          <button onClick={restart} className={`${animBase} w-full py-5 bg-white border-2 border-slate-100 text-slate-500 font-black rounded-3xl flex items-center justify-center gap-3 shadow-sm`} style={{ animationDelay: '2.4s' }}>
            <RotateCcw className="w-6 h-6" />再看一遍
          </button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch(currentSlide) {
      case 0: return renderWelcomeSlide();
      case 1: return renderMonthlySlide(); 
      case 2: return renderTotalCupsSlide(); 
      case 3: return renderFavoriteSlide(); 
      case 4: return renderCategorySlide();
      case 5: return renderExplorationSlide();
      case 6: return renderSummarySlide();
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      `}</style>
      <Header />
      <main className="flex-grow max-w-3xl mx-auto w-full pb-32 overflow-x-hidden">
        <div key={currentSlide}>{renderContent()}</div>
      </main>
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-lg border-t border-slate-100 p-6 safe-area-bottom z-40">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button onClick={prevSlide} disabled={currentSlide === 0} className={`p-4 rounded-2xl transition-all ${currentSlide === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-2.5">
            {Array.from({ length: ACTUAL_TOTAL_SLIDES }).map((_, idx) => (
              <div key={idx} className={`h-2.5 rounded-full transition-all duration-500 ${idx === currentSlide ? 'bg-red-600 w-8' : 'bg-slate-200 w-2.5'}`} />
            ))}
          </div>
          {currentSlide < ACTUAL_TOTAL_SLIDES - 1 ? (
            <button onClick={nextSlide} className="px-8 py-4 bg-red-600 text-white rounded-2xl shadow-xl flex items-center gap-2 font-black">
              下页<ChevronRight className="w-6 h-6" />
            </button>
          ) : <div className="w-16"></div>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;