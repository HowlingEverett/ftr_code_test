import {
  frequencyReducer,
  FrequencyReducerState,
  SET_REPORTING_FREQUENCY,
  SET_RUNNING,
  COUNT_NUMBER,
  SetReportingFrequencyAction,
  CountNumberAction,
  SetRunningAction,
} from "./frequencyReducer"

test("should enable/disable the running state on SET_RUNNING", () => {
  const beforeState: FrequencyReducerState = {
    numberFrequencies: {},
    isRunning: false,
  }
  const action: SetRunningAction = {
    type: SET_RUNNING,
    isRunning: true,
  }
  const expectedState = {
    numberFrequencies: {},
    isRunning: true,
  }
  expect(frequencyReducer(beforeState, action)).toEqual(expectedState)
})

test("should set reportingFrequency on SET_REPORTING_FREQUENCY", () => {
  const beforeState: FrequencyReducerState = {
    numberFrequencies: {},
    isRunning: false,
  }
  const action: SetReportingFrequencyAction = {
    type: SET_REPORTING_FREQUENCY,
    frequency: 3,
  }
  const expectedState = {
    numberFrequencies: {},
    isRunning: false,
    reportingFrequency: 3,
  }
  expect(frequencyReducer(beforeState, action)).toEqual(expectedState)
})

test("should increment counts on COUNT_NUMBER", () => {
  const beforeState: FrequencyReducerState = {
    numberFrequencies: {},
    isRunning: true,
    reportingFrequency: 3,
  }
  const action: CountNumberAction = {
    type: COUNT_NUMBER,
    numberToCount: 8,
  }

  let state = frequencyReducer(beforeState, action)
  expect(state).toEqual({
    numberFrequencies: { 8: 1 },
    isRunning: true,
    reportingFrequency: 3,
  })

  // Count "8" again
  state = frequencyReducer(state, action)

  expect(state).toEqual({
    numberFrequencies: { 8: 2 },
    isRunning: true,
    reportingFrequency: 3,
  })

  // Count something else
  action.numberToCount = 3
  state = frequencyReducer(state, action)

  expect(state).toEqual({
    numberFrequencies: { 8: 2, 3: 1 },
    isRunning: true,
    reportingFrequency: 3,
  })
})
