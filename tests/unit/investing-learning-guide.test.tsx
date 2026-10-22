// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest"
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react"
import { LearningGuide } from "@/components/investing/learning-guide"
import { Section } from "@/components/investing/section"
import { lessons } from "@/lib/investing/lessons"

afterEach(cleanup)

const lessonHeading = () => screen.getByRole("heading", { level: 3 })

describe("LearningGuide", () => {
  it("starts on the first lesson with no progress", () => {
    render(<LearningGuide />)
    expect(lessonHeading().textContent).toBe(lessons[0].title)
    expect(screen.getByText(`0 of ${lessons.length} lessons completed`)).toBeTruthy()
    expect((screen.getByRole("button", { name: /Previous lesson/ }) as HTMLButtonElement).disabled).toBe(true)
  })

  it("checks a correct and a wrong answer, then lets you try again", () => {
    render(<LearningGuide />)
    const q = lessons[0].question
    const practice = screen.getByRole("region", { name: "Practice question" })
    fireEvent.click(within(practice).getByLabelText(q.options[q.correctIndex]))
    fireEvent.click(within(practice).getByRole("button", { name: "Check answer" }))
    expect(within(practice).getByText("Correct.")).toBeTruthy()
    fireEvent.click(within(practice).getByRole("button", { name: "Try again" }))
    const wrong = q.options.findIndex((_, i) => i !== q.correctIndex)
    fireEvent.click(within(practice).getByLabelText(q.options[wrong]))
    fireEvent.click(within(practice).getByRole("button", { name: "Check answer" }))
    expect(within(practice).getByText("Not quite.")).toBeTruthy()
  })

  it("marks lessons complete and incomplete, and finishes the guide", () => {
    render(<LearningGuide />)
    fireEvent.click(screen.getByRole("button", { name: "Mark lesson complete" }))
    expect(screen.getByText(`1 of ${lessons.length} lessons completed`)).toBeTruthy()
    fireEvent.click(screen.getByRole("button", { name: /Completed — mark incomplete/ }))
    expect(screen.getByText(`0 of ${lessons.length} lessons completed`)).toBeTruthy()
    for (let i = 0; i < lessons.length; i++) {
      fireEvent.click(screen.getByRole("button", { name: "Mark lesson complete" }))
      if (i < lessons.length - 1) fireEvent.click(screen.getByRole("button", { name: /Next lesson/ }))
    }
    expect(screen.getByText(/You’ve marked all lessons complete/)).toBeTruthy()
    fireEvent.click(screen.getByRole("button", { name: /Review lessons/ }))
    expect(lessonHeading().textContent).toBe(lessons[0].title)
  })

  it("navigates with the side list, previous button and mobile select", () => {
    render(<LearningGuide />)
    const nav = screen.getByRole("navigation", { name: "Lessons" })
    fireEvent.click(within(nav).getAllByRole("button")[1])
    expect(lessonHeading().textContent).toBe(lessons[1].title)
    fireEvent.click(screen.getByRole("button", { name: /Previous lesson/ }))
    expect(lessonHeading().textContent).toBe(lessons[0].title)
    fireEvent.change(screen.getByLabelText("Choose a lesson"), { target: { value: String(lessons.length - 1) } })
    expect(lessonHeading().textContent).toBe(lessons[lessons.length - 1].title)
  })
})

describe("Section", () => {
  it("renders title, subtitle and children in both variants", () => {
    const { rerender } = render(<Section id="s" title="T" subtitle="Sub">body</Section>)
    expect(screen.getByText("T")).toBeTruthy()
    expect(screen.getByText("Sub")).toBeTruthy()
    rerender(<Section title="T2" variant="alternate">body2</Section>)
    expect(screen.getByText("body2")).toBeTruthy()
  })
})
