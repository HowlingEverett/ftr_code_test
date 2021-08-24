import { ChangeEvent, useState } from "react"

type FrequencyInputProps = {
  onFrequencyInput: (newValue: number) => void
  isRunning: boolean
}

export const FrequencyInput = ({
  onFrequencyInput,
  isRunning = false,
}: FrequencyInputProps) => {
  const [value, setValue] = useState("")
  const [startDisabled, setStartDisabled] = useState(true)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: enteredValue },
    } = event
    const wholeValue = parseInt(enteredValue)
    setValue(String(wholeValue))
    setStartDisabled(!Number.isInteger(wholeValue))
  }
  const onStartClick = () => {
    onFrequencyInput(parseInt(value))
  }

  return (
    <div className="input-group frequency-input-group">
      <label htmlFor="frequency-input" className="label frequency-input-label">
        Enter a reporting frequency
      </label>
      <input
        name="frequency-input"
        id="frequency-input"
        type="number"
        value={value}
        onChange={onChange}
        disabled={isRunning}
        className="input frequency-input"
      />
      <button
        id="start-button"
        onClick={onStartClick}
        disabled={startDisabled}
        className="button number-input-button"
      >
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  )
}
