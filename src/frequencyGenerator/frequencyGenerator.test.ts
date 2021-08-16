import range from "lodash/range"

import { FrequencyGenerator } from "./frequencyGenerator"

let frequencyGenerator: FrequencyGenerator

const appendXTimes = (generator: FrequencyGenerator, inputNumber: number, frequency: number) => {
	range(frequency).forEach(() => {
		generator.append(inputNumber)
	})
}

beforeEach(() => {
	frequencyGenerator = new FrequencyGenerator()
})

test("generator initialises with an empty reporting set", () => {
  expect(frequencyGenerator.report()).toBe("")
})

test("generator accepts number input", () => {
	frequencyGenerator.append(10)
	expect(frequencyGenerator.report()).toBe("10:1")
	
	frequencyGenerator.append(10)
	expect(frequencyGenerator.report()).toBe("10:2")
})

test("generator reports numbers in descending order of input frequency", () => {
	appendXTimes(frequencyGenerator, 10, 2)
	appendXTimes(frequencyGenerator, 3, 5)
	appendXTimes(frequencyGenerator, 15, 1)
	
	expect(frequencyGenerator.report()).toBe("3:5, 10:2, 15:1")
})
