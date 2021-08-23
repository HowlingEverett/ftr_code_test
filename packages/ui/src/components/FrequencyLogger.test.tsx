import { render, screen } from "@testing-library/react"

import { ReportingTuples } from "frequency-generator"
import { FrequencyLogger } from "./FrequencyLogger"

describe("FrequencyLogger component", () => {
  test("should render a list of reporting tuples, in order", () => {
    const report: ReportingTuples = [
      [10, 7],
      [130, 5],
      [17, 2],
    ]
    render(<FrequencyLogger report={report} />)

    const reportedValues = screen.getAllByRole("listitem")
    expect(reportedValues).toHaveLength(3)
    reportedValues.forEach((reportedValue, index) => {
      const [reportNumber, reportFrequency] = report[index]
      expect(reportedValue).toHaveTextContent(
        `${reportNumber}:${reportFrequency}`
      )
    })
  })

  test("should render an empty list when no report is present", () => {
    render(<FrequencyLogger />)

    const reportedValues = screen.queryAllByRole("listitem")
    expect(reportedValues).toHaveLength(0)
  })
})
