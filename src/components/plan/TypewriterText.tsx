import { useEffect, useState } from "react";

export default function TypewriterText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    setVisibleText("");
    const timers = Array.from(text).map((_, index) =>
      window.setTimeout(() => {
        setVisibleText(text.slice(0, index + 1));
      }, index * 40)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [text]);

  return <span className={className}>{visibleText}</span>;
}
