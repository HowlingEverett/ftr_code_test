import { fireEvent, render, screen, act } from "@testing-library/react"
import App from "./App"

describe("Frequency Counter web application", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers()
    })
    jest.useRealTimers()
  })

  test("renders the UI initially with frequency input active", () => {
    render(<App />)

    const frequencyInput = screen.getByLabelText("Enter a reporting frequency")
    expect(frequencyInput).toBeInTheDocument()
    expect(frequencyInput).not.toHaveAttribute("disabled")
  })

  test("renders the UI initially with the number input disabled", () => {
    render(<App />)

    const numberInput = screen.getByLabelText("Enter a number to count")
    expect(numberInput).toBeInTheDocument()
    expect(numberInput).toHaveAttribute("disabled")
  })

  test("renders the test logger with a no inputs message", () => {
    render(<App />)

    const frequencyLogger = screen.getByTestId("frequency-logger")
    expect(frequencyLogger).toBeInTheDocument()
    expect(frequencyLogger).toHaveTextContent("No numbers recorded")
  })

  test("accepts a valid frequency value and starts the application", () => {
    render(<App />)

    const frequencyInput = screen.getByLabelText("Enter a reporting frequency")
    const startButton = screen.getByText("Start")

    fireEvent.change(frequencyInput, { target: { value: "10" } })
    fireEvent.click(startButton)

    const frequencyReportLabel = screen.getByTestId("reporting-frequency")
    expect(frequencyReportLabel).toBeInTheDocument()
    expect(frequencyReportLabel).toHaveTextContent(
      "Reporting frequency: 10 seconds"
    )

    expect(frequencyInput).toHaveAttribute("disabled")
    expect(startButton).toHaveTextContent("Pause")
    const numberInput = screen.getByLabelText("Enter a number to count")
    expect(numberInput).not.toHaveAttribute("disabled")
  })

  test("updates input counts while timer is running", () => {
    render(<App />)

    const frequencyInput = screen.getByLabelText("Enter a reporting frequency")
    const startButton = screen.getByText("Start")
    const numberInput = screen.getByLabelText("Enter a number to count")
    const countButton = screen.getByText("Count")
    const reportLog = screen.getByTestId("frequency-logger")

    // Set a reporting frequency of 10 seconds, and kick off the reporter
    fireEvent.change(frequencyInput, { target: { value: "10" } })
    fireEvent.click(startButton)

    // Count some numbers
    fireEvent.change(numberInput, { target: { value: "12" } })
    fireEvent.click(countButton)
    fireEvent.change(numberInput, { target: { value: "6" } })
    fireEvent.click(countButton)
    fireEvent.change(numberInput, { target: { value: "6" } })
    fireEvent.click(countButton)

    act(() => {
      jest.advanceTimersByTime(10001)
    })

    expect(reportedText(reportLog)).toEqual(["6:2", "12:1"])

    // Count again
    fireEvent.change(numberInput, { target: { value: "6" } })
    fireEvent.click(countButton)

    expect(reportedText(reportLog)).toEqual(["6:2", "12:1"])

    act(() => {
      jest.advanceTimersByTime(10001)
    })

    expect(reportedText(reportLog)).toEqual(["6:3", "12:1"])
  })

  test("reports when a counted number is a fibonacci number", () => {
    render(<App />)

    const frequencyInput = screen.getByLabelText("Enter a reporting frequency")
    const startButton = screen.getByText("Start")
    const numberInput = screen.getByLabelText("Enter a number to count")
    const countButton = screen.getByText("Count")
    const reportLog = screen.getByTestId("frequency-logger")

    fireEvent.change(frequencyInput, { target: { value: "10" } })
    fireEvent.click(startButton)

    // Enter a fibonacci number and hit count
    fireEvent.change(numberInput, { target: { value: "3" } })
    fireEvent.click(countButton)

    expect(reportLog).toHaveTextContent("We've got fibonacci sign!")

    act(() => {
      jest.advanceTimersByTime(10001)
    })

    // After the next reporting flush, report should go back to displaying
    // counts
    expect(reportedText(reportLog)).toEqual(["3:1"])
  })
})

const reportedText = (reportLog: HTMLElement): string[] => {
  return Array.from(reportLog.getElementsByTagName("li")).map((listElement) => {
    return listElement.textContent || ""
  })
}
