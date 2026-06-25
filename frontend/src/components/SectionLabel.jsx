export default function SectionLabel({ children }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium"
      style={{ color: "var(--muted-foreground)" }}
    >
      <span
        className="size-1.5 rounded-full"
        style={{
          backgroundColor: "var(--electric)",
          boxShadow: "0 0 10px var(--electric)",
        }}
      />
      {children}
    </div>
  );
}

export function GlowOrbs() {
  return (
    <>
      <div
        className="pointer-events-none absolute -top-40 -left-40 size-[34rem] rounded-full blur-[120px] animate-float-slow"
        style={{ backgroundColor: "rgba(109,158,247,0.2)" }}
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-40 size-[28rem] rounded-full blur-[120px] animate-float-slow"
        style={{
          backgroundColor: "rgba(160,108,245,0.25)",
          animationDelay: "-3s",
        }}
      />
    </>
  );
}
