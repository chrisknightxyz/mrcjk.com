// Warm stone panel with slowly drifting peach, blue and green light.
export function GradientField({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative isolate overflow-hidden bg-stone shadow-edge ${className}`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="drift absolute -left-[10%] -top-[20%] h-[70%] w-[55%] rounded-full bg-[#ffc48c]/60 blur-3xl" />
        <div className="drift absolute -right-[10%] top-[0%] h-[65%] w-[50%] rounded-full bg-[#96beff]/55 blur-3xl [animation-delay:-6s]" />
        <div className="drift absolute bottom-[-30%] left-[30%] h-[70%] w-[50%] rounded-full bg-[#aae6c8]/55 blur-3xl [animation-delay:-12s]" />
      </div>
      {children}
    </div>
  );
}
