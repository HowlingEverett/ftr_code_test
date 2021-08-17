type Frequencies = Map<number, number>
type ReportingTuples = [number, number][]

export class FrequencyGenerator {
  frequencies: Frequencies

  constructor() {
    this.frequencies = new Map<number, number>()
  }

  append(number: number) {
    const existingFrequency = this.frequencies.get(number) || 0
    this.frequencies.set(number, existingFrequency + 1)
  }

  report(): ReportingTuples {
    const inputNumbers = Array.from(this.frequencies.entries())
    return inputNumbers
      .sort(([, aFrequency], [, bFrequency]) => {
        return bFrequency - aFrequency
      })
      .map(([inputNumber]: [number, number]) => {
        return [inputNumber, this.frequencies.get(inputNumber) || 0]
      })
  }

  toString(): string {
    return this.report()
      .map(([inputNumber, frequency]) => `${inputNumber}:${frequency}`)
      .join(", ")
  }
}
