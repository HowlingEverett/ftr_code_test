import { ReportingTuples } from "../frequencyGenerator/"

type FrequencyLoggerProps = {
  report?: ReportingTuples
}

export const FrequencyLogger = ({ report }: FrequencyLoggerProps) => {
  return (
    <div>
      <ol>
        {report?.map(([inputNumber, frequency]) => (
          <li key={inputNumber}>
            <span>{inputNumber}:</span>
            <span>{frequency}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
