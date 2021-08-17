import { render, screen, fireEvent } from "@testing-library/react"
import { useState } from "react"

import { FrequencyInput } from "./FrequencyInput"

describe("FrequencyInput component", () => {
  test("should report the input frequency on click of the start button", () => {
    render(<Subject />)
    const frequencyInput = screen.getByLabelText("Enter a reporting frequency")
    const startButton = screen.getByRole("button")
    const outputElement = screen.getByText(/Selected frequency/)

    fireEvent.change(frequencyInput, { target: { value: "10" } })
    fireEvent.click(startButton)

    expect(outputElement).toHaveTextContent("Selected frequency: 10 seconds")
  })

  test("should disable the start button unless there is a valid frequency", () => {
    render(<Subject />)
    const frequencyInput = screen.getByLabelText("Enter a reporting frequency")
    const startButton = screen.getByRole("button")

    expect(startButton).toHaveAttribute("disabled")

    fireEvent.change(frequencyInput, { target: { value: "invalid number" } })
    expect(startButton).toHaveAttribute("disabled")

    fireEvent.change(frequencyInput, { target: { value: "20" } })
    expect(startButton).not.toHaveAttribute("disabled")
  })

  test("should disable the input if reporting is running", () => {
    render(<Subject isRunning={true} />)
    const frequencyInput = screen.getByLabelText("Enter a reporting frequency")

    expect(frequencyInput).toHaveAttribute("disabled")
  })

  test("should show a Pause button if reporting is running", () => {
    render(<Subject isRunning={true} />)
    const startButton = screen.getByRole("button")

    expect(startButton).toHaveTextContent("Pause")
  })
})

type SubjectProps = {
  isRunning?: boolean
}

const Subject = ({ isRunning = false }: SubjectProps) => {
  const [frequency, setFrequency] = useState<number>()
  const mockOnFrequencyInput = (newValue: number) => {
    setFrequency(newValue)
  }

  return (
    <>
      <div id="test-output">Selected frequency: {frequency} seconds</div>
      <FrequencyInput
        onFrequencyInput={mockOnFrequencyInput}
        isRunning={isRunning}
      />
    </>
  )
}
