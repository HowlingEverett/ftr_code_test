import { useReducer, useState } from "react"
import useInterval from "react-useinterval"

import "./App.css"

import { FrequencyInput } from "./components/FrequencyInput"
import { NumberInput } from "./components/NumberInput"
import { FrequencyLogger } from "./components/FrequencyLogger"
import {
  frequencyReducer,
  FrequencyReducerState,
  reportingTuples,
  SET_REPORTING_FREQUENCY,
  SET_RUNNING,
  COUNT_NUMBER,
} from "./frequencyGenerator/frequencyReducer"

const INITIAL_STATE: FrequencyReducerState = {
  numberFrequencies: {},
  isRunning: false,
}

function App() {
  const [state, dispatch] = useReducer(frequencyReducer, INITIAL_STATE)
  const [countBuffer, setCountBuffer] = useState<number[]>([])
  const { isRunning, reportingFrequency = 0 } = state

  const flushCount = () => {
    // Flush the count buffer into the store on reportingFrequency interval
    countBuffer.forEach((n) => {
      dispatch({ type: COUNT_NUMBER, numberToCount: n })
    })
    setCountBuffer([])
  }

  useInterval(flushCount, isRunning ? reportingFrequency * 1000 : null)

  const onFrequencyInput = (frequency: number) => {
    if (isRunning) {
      dispatch({ type: SET_RUNNING, isRunning: false })
    } else {
      dispatch({ type: SET_REPORTING_FREQUENCY, frequency })
      dispatch({ type: SET_RUNNING, isRunning: true })
    }
  }
  const onNumberInput = (n: number) => {
    // In order to simulate 'only update the UI on a set frequncy, we buffer
    // input counting instead of writing them directly to the store
    setCountBuffer([...countBuffer, n])
  }

  return (
    <div className="App">
      <div className="App-content">
        <FrequencyInput
          onFrequencyInput={onFrequencyInput}
          isRunning={isRunning}
        />

        <NumberInput onNumberInput={onNumberInput} isRunning={isRunning} />

        {isRunning && (
          <div className="reporting-frequency">
            Reporting frequency: {reportingFrequency} seconds
          </div>
        )}

        <FrequencyLogger report={reportingTuples(state)} />
      </div>
    </div>
  )
}

export default App
