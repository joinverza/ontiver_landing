import { Lock, Play, BookOpen, FileText } from 'lucide-react';

export default function FrictionIllustration() {
  return (
    <div className="w-full h-full relative flex flex-col items-center justify-between py-12 px-6 bg-[#0a0f0d] overflow-hidden rounded-2xl group">
      {/* Vertical connector line */}
      <div className="absolute top-12 bottom-20 w-[1px] bg-white/10 left-1/2 -translate-x-1/2 z-0 overflow-hidden">
        {/* Light beam */}
        <div className="w-full h-24 bg-gradient-to-b from-transparent via-white to-transparent animate-travel-beam" />
      </div>

      {/* Horizontal connector line */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-[1px] bg-white/10 z-0" />

      {/* Top Icon */}
      <div className="relative z-10 w-12 h-12 rounded-full bg-[#111a14] border border-[#009311]/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,147,17,0.15)]">
        <FileText size={18} className="text-[#009311]/80" />
      </div>

      {/* Center Lock with side icons */}
      <div className="relative z-10 w-full flex items-center justify-center gap-8 my-4">
        <div
          className="w-12 h-12 rounded-full bg-[#111] border border-white/5 flex items-center justify-center animate-pulse-glow"
          style={{ "--duration": "3s", "--delay": "0s" } as React.CSSProperties}
        >
          <Play size={18} className="text-white/60 ml-1" />
        </div>

        <div className="w-20 h-20 rounded-full bg-gradient-to-b from-[#009311] to-[#003d10] shadow-[0_0_30px_rgba(0,147,17,0.5)] flex items-center justify-center border-4 border-[#0a0f0d] z-10">
          <Lock
            size={28}
            className="text-white animate-spin-normal"
            style={{ "--duration": "4s" } as React.CSSProperties}
          />
        </div>

        <div
          className="w-12 h-12 rounded-full bg-[#111] border border-white/5 flex items-center justify-center animate-pulse-glow"
          style={{ "--duration": "3s", "--delay": "-1.5s" } as React.CSSProperties}
        >
          <BookOpen size={18} className="text-white/60" />
        </div>
      </div>

      {/* Bottom Input */}
      <div className="relative z-10 mt-auto w-40 h-10 rounded-xl border border-white/20 bg-gradient-to-b from-white/10 to-transparent flex items-center justify-center overflow-hidden">
         {/* Subtle inner glow for input */}
         <div className="absolute inset-0 bg-white/5 blur-md" />
         <div className="relative w-[85%] h-6 bg-gradient-to-b from-white to-[#f0f0f0] rounded flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)]">
           <span className="text-[11px] font-bold text-black tracking-wide">Ontiver</span>
         </div>
      </div>
    </div>
  );
}
