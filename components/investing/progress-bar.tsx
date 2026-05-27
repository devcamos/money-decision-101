"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "what-is-investing", label: "What" },
  { id: "why-it-matters", label: "Why" },
  { id: "core-principles", label: "Principles" },
  { id: "quick-tools", label: "Tools" },
  { id: "resources", label: "Resources" },
];

export function ProgressBar() {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.5;
      setIsVisible(window.scrollY > heroHeight);

      const sectionElements = sections.map((s) =>
        document.getElementById(s.id)
      );

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-3xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className={`flex-1 text-xs font-medium py-2 px-3 rounded-full transition-colors ${
                index <= activeSection
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
        <div className="mt-2 h-1 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((activeSection + 1) / sections.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
