export const VerifyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    {/* Shield outline */}
    <path className="icon-stroke icon-base" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    {/* Checkmark */}
    <path className="icon-stroke icon-checkmark" d="M9 12l2 2 4-4" />
  </svg>
);

export const ScreenIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    {/* Screen outline */}
    <rect className="icon-stroke icon-base" x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <path className="icon-stroke icon-base" d="M8 21h8" />
    <path className="icon-stroke icon-base" d="M12 17v4" />
    {/* Loading spinner group to rotate */}
    <g className="icon-spinner" style={{ transformOrigin: "12px 10px" }}>
      <path className="icon-stroke" d="M12 7v2" />
      <path className="icon-stroke" d="M12 11v2" />
      <path className="icon-stroke" d="M9 10h2" />
      <path className="icon-stroke" d="M13 10h2" />
    </g>
  </svg>
);

export const StoreProofIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    {/* Floppy outline */}
    <path className="icon-stroke icon-base" d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <path className="icon-stroke icon-base" d="M17 21v-8H7v8" />
    <path className="icon-stroke icon-base" d="M7 3v5h8" />
    {/* Shimmer line inside the floppy */}
    <path className="icon-shimmer" d="M4 14L14 4" stroke="currentColor" strokeWidth="0.5" opacity="0.3" style={{ transform: "translateX(-20px)" }} />
  </svg>
);

export const ConsentShareIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    {/* Circle outline */}
    <circle className="icon-stroke icon-base" cx="12" cy="12" r="10" />
    {/* Paper plane group to bob */}
    <g className="icon-plane">
      <path className="icon-stroke" d="M22 2L11 13" />
      <path className="icon-stroke" d="M22 2l-7 20-4-9-9-4 20-7z" />
    </g>
  </svg>
);

export const ReuseIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    {/* Recycling arrows group to rotate */}
    <g className="icon-arrows" style={{ transformOrigin: "12px 12px" }}>
      <path className="icon-stroke" d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path className="icon-stroke" d="M3 3v5h5" />
    </g>
  </svg>
);
