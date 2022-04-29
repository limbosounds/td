import { ColorRGB } from "typings/canvas/Colors"
import { EasingType } from "typings/canvas/Easing"
import { parseHex } from "utils/canvas/color"
import Transition from "./Transition"

export default
class ColorTransition {
	private safeFrom
		: ColorRGB
		= typeof this.from == "string"
			? parseHex(this.from)
			: { ...this.from }

	private safeTo
		: ColorRGB
		= typeof this.to == "string"
			? parseHex(this.to)
			: { ...this.to }

	private r
		= new Transition(this.safeFrom.r, this.safeTo.r, this.easing)

	private g
		= new Transition(this.safeFrom.g, this.safeTo.g, this.easing)

	private b
		= new Transition(this.safeFrom.b, this.safeTo.b, this.easing)

	constructor(
		private readonly from: ColorRGB | string,
		private readonly to: ColorRGB | string,
		private readonly easing: EasingType = "linear"
	) {}

	/**
	 * Get color for a specific animation progress state
	 */
	getColor = (
		/**
		 * Animation progress from 0 to 1
		 */
		progress: number
	): ColorRGB => {
		return {
			r: Math.round(this.r.getValue(progress)),
			g: Math.round(this.g.getValue(progress)),
			b: Math.round(this.b.getValue(progress)),
		}
	}
}