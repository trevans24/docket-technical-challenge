/** @jest-environment jsdom */
import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import App from "./App"

describe("<App />", () => {
  test("renders the app", () => {
    render(<App />)
    const title = screen.getByText(/character count/i)
    expect(title).toBeInTheDocument()
  })
  test("updates character count when typing", async () => {
    render(<App />)
    const input = screen.getByPlaceholderText("Type Here")

    await userEvent.type(input, "Hello")

    expect(screen.getByText("Character Count: 5")).toBeInTheDocument()
    expect(input.value).toBe("Hello")
  })

  test("shows suggestions when typing a matching word", async () => {
    render(<App />)
    const input = screen.getByPlaceholderText("Type Here")

    await userEvent.type(input, "happy")

    expect(screen.getByText("Synonyms:")).toBeInTheDocument()
    expect(screen.getByText("joyful")).toBeInTheDocument()
    expect(screen.getByText("cheerful")).toBeInTheDocument()
    expect(screen.getByText("content")).toBeInTheDocument()
  })

  test("clicking a suggestion replaces the input text", async () => {
    render(<App />)
    const input = screen.getByPlaceholderText("Type Here")

    await userEvent.type(input, "happy")
    const suggestion = screen.getByText("joyful")

    fireEvent.click(suggestion)

    expect(input.value).toBe("joyful")
    expect(screen.queryByText("Synonyms:")).not.toBeInTheDocument()
  })

  test("clear button resets input and suggestions", async () => {
    render(<App />)
    const input = screen.getByPlaceholderText("Type Here")

    await userEvent.type(input, "sad")
    expect(screen.getByText("unhappy")).toBeInTheDocument()

    const clearButton = screen.getByLabelText("Clear the input")
    fireEvent.click(clearButton)

    expect(input.value).toBe("")
    expect(screen.queryByText("Synonyms:")).not.toBeInTheDocument()
  })

  test("does not show suggestions for non-matching words", async () => {
    render(<App />)
    const input = screen.getByPlaceholderText("Type Here")

    await userEvent.type(input, "randomword")

    expect(screen.queryByText("Synonyms:")).not.toBeInTheDocument()
  })

  test("full statement coverage??", async () => {
    render(<App />)
    const input = screen.getByPlaceholderText("Type Here")

    await userEvent.type(input, "sad")
    expect(screen.getByText("unhappy")).toBeInTheDocument()

    await userEvent.type(input, "{backspace}")
    await userEvent.type(input, "{backspace}")
    await userEvent.type(input, "{backspace}")

    expect(input.value).toBe("")
    expect(screen.queryByText("Synonyms:")).not.toBeInTheDocument()
  })
})
