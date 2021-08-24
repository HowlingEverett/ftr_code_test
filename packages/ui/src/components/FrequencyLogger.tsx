import { ReportingTuples } from "frequency-generator"

type FrequencyLoggerProps = {
  reportingFrequency?: number
  report?: ReportingTuples
  isFibonacci?: boolean
}

export const FrequencyLogger = ({
  report,
  isFibonacci = false,
}: FrequencyLoggerProps) => {
  if (isFibonacci) {
    return (
      <div
        data-testid="frequency-logger"
        className="frequency-logger-container fibonacci-flash"
      >
        We've got fibonacci sign!
      </div>
    )
  }
  return (
    <div data-testid="frequency-logger" className="frequency-logger-container">
      {report && report.length > 0 && (
        <ol className="frequency-logger-list">
          {report?.map(([inputNumber, frequency]) => (
            <li key={inputNumber} className="frequency-logger-list-item">
              <span className="frequency-logger-item-number">
                {inputNumber}:
              </span>
              <span className="frequency-logger-item-frequency">
                {frequency}
              </span>
            </li>
          ))}
        </ol>
      )}

      {(!report || report.length === 0) && (
        <span className="no-input">No numbers recorded</span>
      )}
    </div>
  )
}
