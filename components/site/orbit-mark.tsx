export function OrbitMark({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none aspect-square ${className}`} aria-hidden="true">
      <div className="relative h-full w-full">
        <div className="absolute inset-0 rounded-full border border-primary/10" />
        <div className="absolute inset-[12%] rounded-full border border-primary/10" />
        <div className="absolute inset-[25%] rounded-full border border-primary/10" />
        <div className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-primary/10" />
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-primary/10" />
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-chart-1/60" />
      </div>
    </div>
  )
}
