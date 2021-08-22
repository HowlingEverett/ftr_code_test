import { ChangeEvent, useState } from "react"
import { parseInt } from "lodash"

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
  }
  return (
    <>
      <label htmlFor="number-input">Enter a number to count</label>
      <input
        type="number"
        id="number-input"
        name="number-input"
        value={inputValue}
        onChange={onChange}
        disabled={!isRunning}
      />
      <button type="button" onClick={onButtonClick}>
        Count
      </button>
    </>
  )
}
