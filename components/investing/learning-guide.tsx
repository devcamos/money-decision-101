"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { guideSources, lessons } from "@/lib/investing/lessons";

function Practice({ question, lessonId }: { question: (typeof lessons)[number]["question"]; lessonId: string }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<number | null>(null);
  return (
    <section className="mt-8 rounded-2xl border border-border p-5 md:p-6" aria-label="Practice question">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Check your understanding</p>
      <fieldset disabled={submitted !== null}>
        <legend className="mb-4 text-lg font-medium">{question.prompt}</legend>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <label key={option} className="flex min-h-11 cursor-pointer items-start gap-3 rounded-xl border border-border bg-background p-3 has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary">
              <input type="radio" name={`practice-${lessonId}`} value={index} checked={selected === index} onChange={() => setSelected(index)} className="mt-1 h-4 w-4 shrink-0 accent-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring" />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button size="lg" disabled={selected === null || submitted !== null} onClick={() => setSubmitted(selected)}>Check answer</Button>
        {submitted !== null && <Button size="lg" variant="outline" onClick={() => { setSelected(null); setSubmitted(null); }}>Try again</Button>}
      </div>
      <div role="status" aria-live="polite" aria-atomic="true">
        {submitted !== null && <p className="mt-4 leading-relaxed"><strong>{submitted === question.correctIndex ? "Correct. " : "Not quite. "}</strong>{question.explanation}</p>}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">This is practice, not a readiness test. You can continue with any answer.</p>
    </section>
  );
}

export function LearningGuide() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const heading = useRef<HTMLHeadingElement>(null);
  const lesson = lessons[activeIndex];
  const isComplete = completed.includes(lesson.id);
  const chooseLesson = (index: number, moveFocus = true) => {
    setActiveIndex(index);
    if (moveFocus) requestAnimationFrame(() => heading.current?.focus());
  };
  const toggleComplete = () => setCompleted((previous) => previous.includes(lesson.id) ? previous.filter((id) => id !== lesson.id) : [...previous, lesson.id]);

  return (
    <section id="learning-guide" aria-labelledby="guide-title" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-20 md:px-6">
      <div className="mb-8 border-t border-border pt-8 md:flex md:items-end md:justify-between md:gap-8">
        <div>
          <h2 id="guide-title" className="font-serif text-3xl">Your guide</h2>
          <p className="mt-2 text-muted-foreground">Choose where to begin. Revisit any lesson whenever you like.</p>
        </div>
        <div className="mt-5 md:mt-0 md:w-64">
          <label htmlFor="lesson-progress" className="block text-sm font-medium">{completed.length} of {lessons.length} lessons completed</label>
          <progress id="lesson-progress" max={lessons.length} value={completed.length} className="mt-2 h-2 w-full overflow-hidden rounded-full accent-primary [&::-webkit-progress-bar]:bg-muted [&::-webkit-progress-value]:bg-primary [&::-moz-progress-bar]:bg-primary" />
          <p className="mt-1 text-xs text-muted-foreground">Progress lasts while this guide is open.</p>
        </div>
      </div>
      <div className="grid gap-7 md:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <nav aria-label="Lessons" className="hidden md:block">
          <ol className="space-y-2">
            {lessons.map((item, index) => (
              <li key={item.id}>
                <button type="button" aria-current={index === activeIndex ? "step" : undefined} onClick={() => chooseLesson(index)} className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left text-sm leading-relaxed focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${index === activeIndex ? "border-primary bg-card font-semibold" : "border-transparent hover:bg-card"}`}>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-xs" aria-hidden="true">{completed.includes(item.id) ? <Check className="h-3.5 w-3.5" /> : index + 1}</span>
                  <span>{item.title}{completed.includes(item.id) && <span className="sr-only"> — completed</span>}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
        <div className="md:hidden">
          <label htmlFor="lesson-choice" className="mb-2 block text-sm font-medium">Choose a lesson</label>
          <select id="lesson-choice" value={activeIndex} onChange={(event) => chooseLesson(Number(event.target.value), false)} className="min-h-12 w-full rounded-xl border border-border bg-background p-3 text-base focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
            {lessons.map((item, index) => <option key={item.id} value={index}>{index + 1}. {item.title}{completed.includes(item.id) ? " — completed" : ""}</option>)}
          </select>
        </div>
        <article className="min-w-0 rounded-3xl border border-border bg-card p-5 sm:p-8 lg:p-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Lesson {activeIndex + 1} of {lessons.length} · About {lesson.minutes} minutes</p>
          <h3 ref={heading} tabIndex={-1} className="scroll-mt-24 font-serif text-3xl leading-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring md:text-4xl">{lesson.title}</h3>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{lesson.description}</p>
          <div className="mt-6 space-y-4 leading-relaxed">{lesson.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <aside className="mt-6 rounded-xl border-l-4 border-primary bg-background p-5" aria-label="Example">
            <p className="font-medium">{lesson.example.title}</p><p className="mt-2 leading-relaxed">{lesson.example.body}</p>
          </aside>
          <h4 className="mt-7 font-semibold">Keep in mind</h4>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">{lesson.takeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}</ul>
          <Practice key={lesson.id} question={lesson.question} lessonId={lesson.id} />
          <section aria-label="Words in this lesson" className="mt-8">
            <h4 className="flex items-center gap-2 font-semibold"><BookOpen className="h-4 w-4" aria-hidden="true" />Words in this lesson</h4>
            <div className="mt-3 divide-y divide-border">{lesson.terms.map(({ term, definition }) => <details key={term} className="py-1"><summary className="cursor-pointer rounded px-1 py-3 font-medium focus-visible:outline-2 focus-visible:outline-ring">{term}</summary><p className="pb-4 pl-1 leading-relaxed text-muted-foreground">{definition}</p></details>)}</div>
          </section>
          <section aria-label="Lesson sources" className="mt-6 border-t border-border pt-5">
            <h4 className="text-sm font-semibold">Guidance and definitions for this lesson</h4>
            <ul className="mt-2 space-y-2 text-sm">{guideSources.filter((source) => lesson.sourceIds.includes(source.id)).map((source) => <li key={source.id}><a href={source.href} className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">{source.authority}: {source.title}</a></li>)}</ul>
          </section>
          <div className="mt-8 border-t border-border pt-6">
            <Button size="lg" variant={isComplete ? "outline" : "default"} onClick={toggleComplete} aria-pressed={isComplete} className="min-h-11">{isComplete && <Check className="mr-2 h-4 w-4" aria-hidden="true" />}{isComplete ? "Completed — mark incomplete" : "Mark lesson complete"}</Button>
            <div className="mt-4 flex flex-wrap justify-between gap-3">
              <Button size="lg" variant="ghost" disabled={activeIndex === 0} onClick={() => chooseLesson(activeIndex - 1)}><ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />Previous lesson</Button>
              <Button size="lg" variant="outline" onClick={() => chooseLesson(activeIndex === lessons.length - 1 ? 0 : activeIndex + 1)}>{activeIndex === lessons.length - 1 ? "Review lessons" : "Next lesson"}<ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Button>
            </div>
          </div>
          {completed.length === lessons.length && <p role="status" className="mt-6 rounded-xl border border-border bg-background p-4 leading-relaxed">You’ve marked all lessons complete. You can review any topic. Finishing this guide does not determine whether investing is suitable for you.</p>}
        </article>
      </div>
    </section>
  );
}
