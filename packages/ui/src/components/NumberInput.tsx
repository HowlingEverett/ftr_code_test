import { ChangeEvent, useState } from "react"
import { parseInt } from "lodash"
import classNames from "classnames"

type NumberInputProps = {
  onNumberInput: (n: number) => void
  isRunning: boolean
}

export const NumberInput = ({ onNumberInput, isRunning }: NumberInputProps) => {
  const [inputValue, setInputValue] = useState<string>("")
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    setInputValue(value)
  }
  const onButtonClick = () => {
    onNumberInput(parseInt(inputValue) || 0)
    setInputValue("")
  }
  return (
    <div
      className={classNames("input-group", "number-input-group", {
        active: isRunning,
      })}
    >
      <label htmlFor="number-input" className="label number-input-label">
        Enter a number to count
      </label>
      <input
        type="number"
        id="number-input"
        name="number-input"
        value={inputValue}
        onChange={onChange}
        disabled={!isRunning}
        className="input text number-input"
      />
      <button
        type="button"
        onClick={onButtonClick}
        disabled={!isRunning || inputValue.length === 0}
        className="button number-input-button"
      >
        Count
      </button>
    </div>
  )
}
