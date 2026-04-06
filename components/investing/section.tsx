import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "alternate";
}

export function Section({ 
  id, 
  title, 
  subtitle, 
  children, 
  className,
  variant = "default" 
}: SectionProps) {
  return (
    <section 
      id={id}
      className={cn(
        "py-16 md:py-24 px-4",
        variant === "alternate" && "bg-card",
        className
      )}
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-serif font-medium text-foreground mb-3">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground text-lg mb-8">{subtitle}</p>
        )}
        <div className="prose prose-neutral max-w-none">
          {children}
        </div>
      </div>
    </section>
  );
}
