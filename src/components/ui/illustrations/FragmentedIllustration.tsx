export default function FragmentedIllustration() {
  return (
    <div className="w-full h-full relative flex items-center justify-center bg-[#0a0f0d] overflow-hidden rounded-2xl group">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-green-500/8 blur-[60px] rounded-full" />

      {/* Shield */}
      <div className="relative w-36 h-40 flex items-center justify-center">
        {/* Shield SVG */}
        <svg
          viewBox="0 0 120 140"
          className="w-full h-full drop-shadow-[0_0_20px_rgba(0,147,17,0.3)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shield body */}
          <path
            d="M60 10 L105 35 L105 80 C105 105 85 125 60 135 C35 125 15 105 15 80 L15 35 Z"
            fill="url(#shieldGrad)"
            stroke="#009311"
            strokeWidth="2"
            className="animate-pulse-glow"
            style={{ "--duration": "2.5s", "--delay": "0s" } as React.CSSProperties}
          />

          {/* Animated checkmark */}
          <path
            d="M42 70 L55 85 L80 55"
            fill="none"
            stroke="#1DB954"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="70"
            className="animate-checkmark-trace"
          />

          <defs>
            <linearGradient id="shieldGrad" x1="15" y1="10" x2="105" y2="135">
              <stop offset="0%" stopColor="#002d0e" />
              <stop offset="100%" stopColor="#001506" />
            </linearGradient>
          </defs>
        </svg>

        {/* Radar sweep overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] animate-radar-sweep origin-center pointer-events-none">
          <div
            className="absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left"
            style={{
              background:
                "conic-gradient(from 0deg at 0% 100%, transparent 0deg, rgba(0,147,17,0.3) 30deg, transparent 60deg)",
            }}
          />
        </div>

        {/* Outer glow ring */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] rounded-full border border-[#009311]/20 animate-pulse-glow"
          style={{ "--duration": "2.5s", "--delay": "-1s" } as React.CSSProperties}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] rounded-full border border-[#009311]/10 animate-pulse-glow"
          style={{ "--duration": "3s", "--delay": "-0.5s" } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
