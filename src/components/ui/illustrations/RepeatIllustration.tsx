export default function RepeatIllustration() {
  return (
    <div className="w-full h-full relative flex items-center justify-center bg-[#0a0f0d] overflow-hidden rounded-2xl group problem-card">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-green-500/10 blur-[50px] rounded-full mix-blend-screen" />

      {/* Dashed radar circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] aspect-square border-[1.5px] border-dashed border-white/5 rounded-full animate-flicker" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] aspect-square border-[1px] border-dashed border-white/10 rounded-full animate-flicker"
        style={{ animationDelay: "-1s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] aspect-square border-[1px] border-dashed border-white/5 rounded-full animate-flicker"
        style={{ animationDelay: "-2s" }}
      />

      {/* Orbit 1 */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] aspect-square animate-spin-normal"
        style={{ "--duration": "14s" } as React.CSSProperties}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 animate-spin-reverse"
          style={{ "--duration": "14s" } as React.CSSProperties}
        >
          <div
            className="w-full h-full rounded-full bg-gradient-to-b from-[#1DB954] to-[#005e19] shadow-[0_0_20px_rgba(29,185,84,0.5)] animate-pulse-glow"
            style={{ "--duration": "3s", "--delay": "0s" } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Orbit 2 */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] aspect-square animate-spin-normal"
        style={{ "--duration": "9s" } as React.CSSProperties}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 animate-spin-reverse"
          style={{ "--duration": "9s" } as React.CSSProperties}
        >
          <div
            className="w-full h-full rounded-full bg-gradient-to-b from-[#009311] to-[#002d0e] shadow-[0_0_15px_rgba(0,147,17,0.4)] animate-pulse-glow"
            style={{ "--duration": "2.5s", "--delay": "-1s" } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Orbit 3 (opposite direction) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] aspect-square animate-spin-reverse"
        style={{ "--duration": "20s" } as React.CSSProperties}
      >
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 animate-spin-normal"
          style={{ "--duration": "20s" } as React.CSSProperties}
        >
          <div
            className="w-full h-full rounded-full bg-gradient-to-b from-[#1DB954] to-[#009311] shadow-[0_0_15px_rgba(29,185,84,0.3)] animate-pulse-glow"
            style={{ "--duration": "4s", "--delay": "-2s" } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Orbit 4 */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] aspect-square animate-spin-normal"
        style={{ "--duration": "6s" } as React.CSSProperties}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 animate-spin-reverse"
          style={{ "--duration": "6s" } as React.CSSProperties}
        >
          <div
            className="w-full h-full rounded-full bg-gradient-to-b from-[#00c216] to-[#009311] shadow-[0_0_10px_rgba(0,194,22,0.4)] animate-pulse-glow"
            style={{ "--duration": "2s", "--delay": "-0.5s" } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Center Bobbing Button */}
      <div className="relative z-10 px-5 py-2 rounded-full border border-[#009311]/40 bg-gradient-to-b from-[#002d0e] to-[#001506] text-[#1DB954] text-xs font-semibold shadow-[0_0_20px_rgba(0,147,17,0.2)] animate-bob">
        Repeat
      </div>
    </div>
  );
}
