export const COUNT_NUMBER = "FrequencyReducer.COUNT_NUMBER"
export const SET_RUNNING = "FrequencyReducer.SET_RUNNING"
export const SET_REPORTING_FREQUENCY =
  "FrequencyReducer.SET_REPORTING_FREQUENCY"

type CountNumberActionType = "FrequencyReducer.COUNT_NUMBER"
type SetRunningActionType = "FrequencyReducer.SET_RUNNING"
type SetReportingFrequencyActionType =
  "FrequencyReducer.SET_REPORTING_FREQUENCY"

export type CountNumberAction = {
  type: CountNumberActionType
  numberToCount: number
}

export type SetRunningAction = {
  type: SetRunningActionType
  isRunning: boolean
}

export type SetReportingFrequencyAction = {
  type: SetReportingFrequencyActionType
  frequency: number
}

type FrequencyReducerActionType =
  | CountNumberAction
  | SetRunningAction
  | SetReportingFrequencyAction

export type FrequencyReducerState = {
  numberFrequencies: {
    [key: number]: number
  }
  isRunning: boolean
  reportingFrequency?: number
}

export type ReportingTuples = [number, number][]

const INITIAL_STATE = { numberFrequencies: {}, isRunning: false }

export const frequencyReducer = (
  state: FrequencyReducerState = INITIAL_STATE,
  action: FrequencyReducerActionType
): FrequencyReducerState => {
  switch (action.type) {
    case COUNT_NUMBER: {
      return {
        ...state,
        numberFrequencies: {
          ...state.numberFrequencies,
          [action.numberToCount]:
            (state.numberFrequencies[action.numberToCount] || 0) + 1,
        },
      }
    }
    case SET_RUNNING: {
      return { ...state, isRunning: action.isRunning }
    }
    case SET_REPORTING_FREQUENCY: {
      return { ...state, reportingFrequency: action.frequency }
    }
    default: {
      return state
    }
  }
}

export const reportingTuples = (
  state: FrequencyReducerState
): ReportingTuples => {
  const inputNumbers = Array.from(Object.entries(state.numberFrequencies))
  return inputNumbers
    .sort(([, aFrequency], [, bFrequency]) => {
      return bFrequency - aFrequency
    })
    .map(([inputNumber]: [string, number]) => {
      const n = Number(inputNumber)
      return [n, state.numberFrequencies[n] || 0]
    })
}

export const reportingString = (state: FrequencyReducerState): string => {
  return reportingTuples(state)
    .map(([inputNumber, frequency]) => `${inputNumber}:${frequency}`)
    .join(", ")
}
