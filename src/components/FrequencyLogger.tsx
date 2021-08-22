import { ReportingTuples } from "../frequencyGenerator/"

type FrequencyLoggerProps = {
  report?: ReportingTuples
}

export const FrequencyLogger = ({ report }: FrequencyLoggerProps) => {
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
