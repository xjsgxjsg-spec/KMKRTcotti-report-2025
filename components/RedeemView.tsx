import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, Clock, Gift, ShieldCheck } from 'lucide-react';

interface RedeemViewProps {
  phone: string;
  rank: number;
  onBack: () => void;
}

const RedeemView: React.FC<RedeemViewProps> = ({ phone, rank, onBack }) => {
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [redeemTime, setRedeemTime] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(`redeemed_${phone}`);
    if (saved) {
      setIsRedeemed(true);
      setRedeemTime(saved);
    }
  }, [phone]);

  const getTier = (r: number) => {
    if (r <= 3) return { id: 1, name: "巅峰特等奖", color: "from-amber-500 to-yellow-600", detail: "包含：库迪随行杯 + 钥匙扣或挂饰任选一件" };
    if (r <= 10) return { id: 2, name: "卓越优胜奖", color: "from-slate-400 to-slate-600", detail: "包含：哪吒徽章+冰箱贴组合" };
    if (r <= 50) return { id: 3, name: "进取达人奖", color: "from-orange-400 to-orange-600", detail: "包含：历史联名周边冰箱贴或吧唧徽章任选一件" };
    return { id: 4, name: "门店回馈奖", color: "from-blue-400 to-blue-500", detail: "包含：历史联名贴纸任选一张" };
  };

  const tier = getTier(rank);

  const handleRedeem = () => {
    if (window.confirm('确定要核销该奖品吗？核销后不可撤回。')) {
      const now = new Date().toLocaleString();
      localStorage.setItem(`redeemed_${phone}`, now);
      setIsRedeemed(true);
      setRedeemTime(now);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className={`bg-gradient-to-r ${tier.color} p-8 text-white text-center relative`}>
          <ShieldCheck className="w-12 h-12 mx-auto mb-2 opacity-80" />
          <h1 className="text-2xl font-black">店员核销界面</h1>
          <p className="opacity-80 text-xs font-bold uppercase tracking-widest mt-1">Official Verification System</p>
        </div>

        <div className="p-8">
          <div className="space-y-6 mb-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <span className="text-slate-400 font-bold">用户手机号</span>
              <span className="text-slate-800 font-black text-lg">{phone}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <span className="text-slate-400 font-bold">年度总排名</span>
              <span className="text-red-600 font-black text-xl">No. {rank}</span>
            </div>
          </div>

          <div className={`p-6 rounded-2xl bg-gradient-to-br ${tier.color} text-white shadow-lg mb-8`}>
            <div className="flex items-center gap-3 mb-2">
              <Gift className="w-6 h-6" />
              <span className="font-black text-lg">{tier.name}</span>
            </div>
            <p className="text-sm opacity-90 font-medium leading-relaxed">{tier.detail}</p>
          </div>

          {isRedeemed ? (
            <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-6 text-center space-y-2">
              <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
              <p className="text-emerald-700 font-black text-lg">奖品已核销</p>
              <div className="flex items-center justify-center gap-2 text-emerald-600 text-xs font-bold">
                <Clock className="w-3 h-3" />
                核销时间：{redeemTime}
              </div>
            </div>
          ) : (
            <button 
              onClick={handleRedeem}
              className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-black active:scale-95 transition-all"
            >
              确认核销发放
            </button>
          )}

          <button 
            onClick={onBack}
            className="w-full mt-4 py-3 text-slate-400 font-bold flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> 返回首页
          </button>
        </div>
      </div>
      <p className="mt-8 text-slate-400 text-[10px] text-center px-10">
        核销记录仅保存在当前扫描设备中，如更换扫描设备可能导致核销记录不一致。
      </p>
    </div>
  );
};

export default RedeemView;
