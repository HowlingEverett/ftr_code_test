import inquirer from "inquirer"

import {
  frequencyReducer,
  FrequencyReducerState,
  FrequencyReducerActionType,
  reportingString,
  SET_REPORTING_FREQUENCY,
  SET_RUNNING,
  COUNT_NUMBER,
} from "frequency-generator/frequencyReducer"
import { isFibonacci } from "frequency-generator"
import { parseInt } from "lodash"

class FrequencyReportingCLI {
  state: FrequencyReducerState = {
    numberFrequencies: {},
    isRunning: false,
  }

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
            "Please input the number of time in seconds between " +
            "emitting numbers and their frequency",
        },
      ])
      .then(({ reportingFrequency }) => {
        const frequency = parseInt(reportingFrequency)
        if (Number.isInteger(frequency) && frequency > 0) {
          this.dispatch({
            type: SET_REPORTING_FREQUENCY,
            frequency,
          })
          this.dispatch({
            type: SET_RUNNING,
            isRunning: true,
          })
          setInterval(() => {
            this.reportOnInterval()
          }, frequency * 1000)
          this.askForNumber()
        } else {
          console.error("Invalid frequency value.")
          this.interactivePrompt()
        }
      })
  }

  askForNumber() {
    const isFirst = Object.keys(this.state.numberFrequencies).length === 0
    const canonical = isFirst ? "first" : "next"
    inquirer
      .prompt([
        {
          type: "input",
          name: "numberCount",
          message: `Please enter the ${canonical} number`,
        },
      ])
      .then(({ numberCount }) => {
        switch (numberCount.toLowerCase()) {
          case "quit": {
            this.reportOnInterval()
            console.log("Thanks for playing, see you later.")
            return process.exit(0)
          }
          case "halt": {
            this.dispatch({ type: SET_RUNNING, isRunning: false })
            console.log("timer halted")
            break
          }
          case "resume": {
            this.dispatch({ type: SET_RUNNING, isRunning: true })
            console.log("timer resumed")
            break
          }
          default: {
            const n = parseInt(numberCount)
            if (Number.isInteger(n)) {
              this.reportFibonacci(n)
              this.dispatch({ type: COUNT_NUMBER, numberToCount: n })
              break
            }
          }
        }
        this.askForNumber()
      })
  }

  reportOnInterval() {
    if (this.state.isRunning) {
      console.info(reportingString(this.state))
    }
  }
  reportFibonacci(n: number) {
    if (isFibonacci(n)) {
      console.log("FIB")
    }
  }
}

const cli = new FrequencyReportingCLI()
cli.interactivePrompt()
