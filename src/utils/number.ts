export const unsafeRandomInt = (
	maxInclusive: number,
	minInclusive: number = 0,
): number => {
	const range = maxInclusive - minInclusive
	const absoluteValue = Math.round(Math.random() * range)
	return absoluteValue + minInclusive
}