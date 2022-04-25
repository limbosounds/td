export const unsafeRandomInt = (
	maxInclusive: number
): number => {
	return Math.round(Math.random() * maxInclusive)
}