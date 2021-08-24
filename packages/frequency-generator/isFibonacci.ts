export const isFibonacci = (n: number) => {

  // Using the simple implementation of Binet's formula here
  // For the 'letter' of the spec, a simpler implementation might simple be
  // [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987].includes(n)
  return perfectSquare(5 * n * n + 4) || perfectSquare(5 * n * n - 4)
}

const perfectSquare = (n: number): boolean => {

  // Naive defence against really large numbers, a better solution would use
  // BigInt but the spec here only cares about numbers < 1000.
  if (n >= Number.MAX_SAFE_INTEGER) {
    return false
  }
  const squareInt = Math.floor(Math.sqrt(n))

  // We're a perfect square if Math.floor on the square root
  // has performed a no-op, essentially.
  return squareInt * squareInt === n
}
