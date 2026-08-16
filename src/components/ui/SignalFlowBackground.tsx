import { useRef, useEffect } from "react";

type Point = {
  x: number;
  y: number;
};

export default function SignalFlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;

    const updateSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = canvas.width = parent.clientWidth;
      h = canvas.height = parent.clientHeight;
    };

    updateSize();

    // Create a network of nodes
    const cols = Math.max(5, Math.floor(w / 100)); // Dynamic columns
    const rows = Math.max(5, Math.floor(h / 100)); // Dynamic rows
    const nodes: Point[] = [];

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        nodes.push({
          x: (i / (cols - 1)) * w + (Math.random() - 0.5) * 50,
          y: (j / (rows - 1)) * h + (Math.random() - 0.5) * 50,
        });
      }
    }

    // Connect nodes
    const lines: { p1: Point; p2: Point }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < 180) {
          lines.push({ p1: nodes[i], p2: nodes[j] });
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw faint base network
      ctx.strokeStyle = "rgba(0, 147, 17, 0.15)";
      ctx.lineWidth = 1;
      lines.forEach((l) => {
        ctx.beginPath();
        ctx.moveTo(l.p1.x, l.p1.y);
        ctx.lineTo(l.p2.x, l.p2.y);
        ctx.stroke();
      });
    };

    draw(); // Draw once initially

    let resizeTimer: number | undefined;
    const handleResize = () => {
      if (resizeTimer !== undefined) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        updateSize();
        // We need to re-generate nodes and lines if we resize
        // For simplicity, let's just trigger a re-render or let it stretch
        draw();
      }, 200);
    };
    
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimer !== undefined) window.clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
