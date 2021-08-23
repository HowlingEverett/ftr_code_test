import { isFibonacci } from './isFibonacci'

test("it should return true if input is a fibonacci number <= 1000", () => {
	expect(isFibonacci(8)).toBeTruthy()
	expect(isFibonacci(13)).toBeTruthy()
	expect(isFibonacci(144)).toBeTruthy()
	
	// F^16, last fibonacci number < 1000
	expect(isFibonacci(987)).toBeTruthy()
})

test("it should return false if input is not a fibonacci number", () => {
	expect(isFibonacci(9)).toBeFalsy()
	expect(isFibonacci(345)).toBeFalsy()
})
