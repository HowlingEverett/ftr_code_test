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
    <div>
      <label htmlFor="frequency-input">Enter a reporting frequency</label>
      <input
        name="frequency-input"
        id="frequency-input"
        type="number"
        value={value}
        onChange={onChange}
        disabled={isRunning}
      />
      <button id="start-button" onClick={onStartClick} disabled={startDisabled}>
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  )
}
