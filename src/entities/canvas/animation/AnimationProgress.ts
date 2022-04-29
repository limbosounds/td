import { FRAME_TIMING } from "consts/canvas"

export default
class AnimationProgress {
	private counter
		: number
		= 0

	constructor(
		/** animation duration im ms */
		readonly duration: number
	) {}

	/**
	 * Animation progress from 0 to 1
	 */
	get progress(): number {
		return this.counter / this.duration
	}

	/**
	 * Returns `true` if animation time exceeded
	 */
	get isFinished(): boolean {
		return this.counter >= this.duration
	}

	/**
	 * Call this function whenever your item draw function is called
	 * @returns `true` if frame was registered, `false` if animation is finished and frame was skipped
	 */
	registerFrame = (): boolean => {
		if (this.isFinished)
			return false

		this.counter += FRAME_TIMING
		return true
	}
}