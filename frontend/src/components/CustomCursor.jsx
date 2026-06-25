import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);

    const handleMouseOver = (e) => {
      if (e.target.closest("a, button, input, textarea, .cursor-hover")) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      setTrail((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.12,
        y: prev.y + (pos.y - prev.y) * 0.12,
      }));

      requestAnimationFrame(animate);
    };

    animate();
  }, [pos]);

  return (
    <>
      <div
        className={`cursor-dot ${hovering ? "cursor-dot-hover" : ""}`}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
        }}
      />

      <div
        className={`cursor-ring ${hovering ? "cursor-ring-hover" : ""}`}
        style={{
          transform: `translate(${trail.x}px, ${trail.y}px)`,
        }}
      />
    </>
  );
}
