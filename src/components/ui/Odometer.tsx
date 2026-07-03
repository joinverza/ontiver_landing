import { useEffect, useRef, useState } from "react";
import ReactOdometer from "react-odometerjs";
import "../../styles/odometer.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface OdometerProps {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
}

export default function Odometer({
  value,
  decimals = 0,
  duration = 1800,
  className = "",
}: OdometerProps) {
  const [currentValue, setCurrentValue] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      onEnter: () => {
        setTimeout(() => setCurrentValue(value), 100);
      },
      onLeaveBack: () => setCurrentValue(0),
      onRefresh: (self) => {
        if (self.progress > 0) setCurrentValue(value);
      },
    });

    return () => trigger.kill();
  }, [value]);

  return (
    <span
      ref={containerRef}
      className={`inline-flex items-baseline [&_.odometer]:leading-none ${className}`}
    >
      <ReactOdometer
        value={currentValue}
        format={decimals > 0 ? "(,ddd).dd" : "(,ddd)"}
        duration={duration}
      />
    </span>
  );
}
