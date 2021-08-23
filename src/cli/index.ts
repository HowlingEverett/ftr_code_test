import inquirer from "inquirer"

import {
  frequencyReducer,
  FrequencyReducerState,
  FrequencyReducerActionType,
  reportingString,
  SET_REPORTING_FREQUENCY,
  SET_RUNNING,
  COUNT_NUMBER,
} from "../frequencyGenerator/frequencyReducer"
import { isFibonacci } from "../frequencyGenerator"
import { parseInt } from "lodash"

class FrequencyReportingCLI {
  state: FrequencyReducerState = {
    numberFrequencies: {},
    isRunning: false,
  }
  intervalId?: number
  firstNumber: boolean = true

  dispatch(action: FrequencyReducerActionType) {
    this.state = frequencyReducer(this.state, action)
    return this
  }

  interactivePrompt() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "reportingFrequency",
          message:
            "Please input the number of time in seconds between emitting numbers and their frequency",
        },
      ])
      .then((answers) => {
        const frequency = parseInt(answers.reportingFrequency)
        if (
          answers.reportingFrequency &&
          Number.isInteger(frequency) &&
          frequency > 0
        ) {
          this.dispatch({
            type: SET_REPORTING_FREQUENCY,
            frequency,
          })
          this.dispatch({
            type: SET_RUNNING,
            isRunning: true,
          })
          this.intervalId = setInterval(
            this.reportOnInterval,
            this.state.reportingFrequency
          )
          this.askForNumber()
        } else {
          console.error("Invalid frequency value.")
          this.interactivePrompt()
        }
      })
  }

  askForNumber() {
    const canonical = this.firstNumber ? "first" : "next"
    inquirer
      .prompt([
        {
          type: "input",
          name: "numberCount",
          message: `Please enter the ${canonical} number`,
        },
      ])
      .then(({ numberCount }) => {})
  }

  reportOnInterval() {
    console.log(reportingString(this.state))
  }

  reportFibonacci(n: number) {
    if (isFibonacci(n)) {
      console.log("FIB")
    }
  }
}

const interactivePrompt = (state: FrequencyReducerState) => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "reportingFrequency",
        message:
          "Please input the number of time in seconds between emitting numbers and their frequency",
      },
    ])
    .then((answers) => {
      const frequency = parseInt(answers.reportingFrequency)
      if (
        answers.reportingFrequency &&
        Number.isInteger(frequency) &&
        frequency > 0
      ) {
        state = frequencyReducer(state, {
          type: SET_REPORTING_FREQUENCY,
          frequency,
        })
        state = frequencyReducer(state, {
          type: SET_RUNNING,
          isRunning: true,
        })
        askForNumber(state)
      } else {
        console.error("Invalid frequency value.")
        interactivePrompt(state)
      }
    })
}

const askForNumber = (state: FrequencyReducerState) => {}
