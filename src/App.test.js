/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import App from "./App"

test("renders learn react link", () => {
  render(<App />)
  const title = screen.getByText(/character count/i)
  expect(title).toBeInTheDocument()
})
