import easings from "consts/easings"
import { EasingType } from "typings/canvas/Easing"

export default
class Transition {
	private diff
		: number
		= this.to - this.from

	constructor(
		private readonly from: number,
		private readonly to: number,
		private readonly easing: EasingType = "linear"
	) {}

	/**
	 * Get value for a specific animation progress state
	 */
	getValue = (
		/**
		 * Animation progress from 0 to 1
		 */
		progress: number
	): number => {
		return this.from + this.diff * easings[this.easing](progress)
	}
}