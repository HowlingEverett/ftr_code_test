import { ReportingTuples } from "../frequencyGenerator/"

type FrequencyLoggerProps = {
  report?: ReportingTuples
  isFibonacci: boolean
}

export const FrequencyLogger = ({
  report,
  isFibonacci = false,
}: FrequencyLoggerProps) => {
  if (isFibonacci) {
    return <div data-testid="frequency-logger">We've got fibonacci sign!</div>
  }
  return (
    <div data-testid="frequency-logger">
      {report && report.length > 0 && (
        <ol>
          {report?.map(([inputNumber, frequency]) => (
            <li key={inputNumber}>
              <span>{inputNumber}:</span>
              <span>{frequency}</span>
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
