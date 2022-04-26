import { ColorRGB } from "typings/canvas/Colors"

export default
class Color {
	static parseHex = (
		hex: string
	): ColorRGB => {
		const clearHex = hex.slice(1)

		const [ r, g, b ] = ((clearHex.length == 3
			? clearHex.split("").map(v => v.repeat(2)).join("")
			: clearHex
		).match(/.{2}/g) || ["00", "00", "00"]).map(hex => parseInt(hex, 16))

		return { r, g, b }
	}
	
	static isRGBValid = (
		color: ColorRGB
	): boolean => {
		return Object.keys(color).every(key => {
			return (color[key] | 0) == color[key]
				&& color[key] >= 0
				&& color[key] <= 255
		})
	}

	static isHexValid = (
		color: string
	): boolean => {
		if (!color.startsWith("#"))
			return false

		const clearHex = color.slice(1)
		if (!/[0-9a-f]+/gi.test(clearHex))
			return false

		if (clearHex.length != 3 && clearHex.length != 6)
			return false

		const rgb = Color.parseHex(color)
		return Color.isRGBValid(rgb)
	}

	private _rgb
		: ColorRGB

	constructor(
		color: ColorRGB | string
	) {
		if (typeof color == "string") {
			if (!Color.isHexValid(color))
				throw new Error(`Invalid hex color ${color}`)

			this._rgb = Color.parseHex(color)
		} else {
			if (!Color.isRGBValid(color))
				throw new Error(`Invalid RGB color ${JSON.stringify(color)}`)

			this._rgb = { ...color }
		}
	}

	get rgb(): ColorRGB {
		return {
			r: this._rgb.r | 0,
			g: this._rgb.g | 0,
			b: this._rgb.b | 0,
		}
	}

	get hex(): string {
		const { r, g, b } = this.rgb
		return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
	}

	addColor = (
		color: ColorRGB
	) => {
		this._rgb.r += color.r
		this._rgb.g += color.g
		this._rgb.b += color.b
	}

	getColorDifference = (
		from: Color
	): ColorRGB => {
		const { r: fR, g: fG, b: fB } = from.rgb
		const { r, g, b } = this.rgb
		return {
			r: fR - r,
			g: fG - g,
			b: fB - b,
		}
	}


}