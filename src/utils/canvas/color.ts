import { ColorRGB } from "typings/canvas/Colors"

/**
 * Returns difference between R, G and B parts of two colors
 * @returns `ColorRGB` contains difference information. Note that this value may not be a valid RGB color.
 */
export const getColorDifference = (
	from: ColorRGB,
	to: ColorRGB,
): ColorRGB => {
	return {
		r: to.r - from.r,
		g: to.g - from.g,
		b: to.b - from.b,
	}
}

export const parseHex = (
	hex: string
): ColorRGB => {
	const clearHex = hex.slice(1)

	const [ r, g, b ] = ((clearHex.length == 3
		? clearHex.split("").map(v => v.repeat(2)).join("")
		: clearHex
	).match(/.{2}/g) || ["00", "00", "00"]).map(hex => parseInt(hex, 16))

	return { r, g, b }
}

export const isRGBValid = (
	color: ColorRGB
): boolean => {
	return Object.keys(color).every(key => {
		return (color[key] | 0) == color[key]
			&& color[key] >= 0
			&& color[key] <= 255
	})
}

export const isHexValid = (
	color: string
): boolean => {
	if (!color.startsWith("#"))
		return false

	const clearHex = color.slice(1)
	if (!/[0-9a-f]+/gi.test(clearHex))
		return false

	if (clearHex.length != 3 && clearHex.length != 6)
		return false

	const rgb = parseHex(color)
	return isRGBValid(rgb)
}