type Frequencies = Map<number, number>

export class FrequencyGenerator {
	frequencies: Frequencies

	constructor() {
		this.frequencies = new Map<number, number>()
	}

	append(number: number) {
		const existingFrequency = this.frequencies.get(number) || 0
		this.frequencies.set(number, existingFrequency + 1)
	}
	
	report(): string {
		const inputNumbers = Array.from(this.frequencies.entries())
		return inputNumbers
			.sort(([, aFrequency], [, bFrequency]) => {
				return bFrequency - aFrequency
			})
			.map(([inputNumber,]: [number, number]) => {
				return `${inputNumber}:${this.frequencies.get(inputNumber)}`
			})
			.join(", ")
	}
}
