import { Coords2D } from "typings/canvas/Geometry"
import { Speed2D } from "typings/Physics"
import { IDrawable } from "typings/canvas/Draw"
import { ColorRGB } from "typings/canvas/Colors"

import { FRAME_TIMING } from "consts/canvas"
import { FREE_FALL_ACC_PER_FRAME } from "consts/physics"

import { chunkToPixel, CPStoPPS } from "utils/physics"

import ColorTransition from "entities/canvas/animation/ColorTransition"
import AnimationProgress from "entities/canvas/animation/AnimationProgress"
import Transition from "entities/canvas/animation/Transition"

export interface SparkParticleAppearance {
	/**
	 * Spark lifetime in ms
	 */
	lifetime?: number
	/**
	 * Spark size in chunks
	 */
	size?: number
	/**
	 * Spark color at spawn time
	 */
	colorFrom?: ColorRGB | string,
	/**
	 * Spark color before it's gone
	 */
	colorTo?: ColorRGB | string,
}

export default
class SparkParticle
implements IDrawable {
	static defaultAppearance
		: Required<SparkParticleAppearance>
		= {
			lifetime: 2000,
			size: 0.1,
			colorFrom: "#f00",
			colorTo: "#ff0"
		}

	private speed
		= {...this.initialSpeed}

	private position
		= {...this.initialPosition}

	private animationProgress
		= new AnimationProgress(
			this.appearance?.lifetime || SparkParticle.defaultAppearance.lifetime
		)
		
	private sizeTransition
		= new Transition(
			chunkToPixel(this.appearance?.size || SparkParticle.defaultAppearance.size),
			0,
		)

	private colorTransition
		= new ColorTransition(
			this.appearance?.colorFrom || SparkParticle.defaultAppearance.colorFrom,
			this.appearance?.colorTo || SparkParticle.defaultAppearance.colorTo,
		)

	constructor(
		private readonly initialPosition: Coords2D,
		private readonly initialSpeed: Speed2D,
		private readonly appearance?: SparkParticleAppearance,
		private readonly onDestroy?: () => void
	) {}

	draw = (
		context: CanvasRenderingContext2D
	) => {
		if (this.animationProgress.isFinished) // TODO destroy point
			return this.onDestroy?.()

		const { progress } = this.animationProgress

		const size = this.sizeTransition.getValue(progress)
		const halfSize = size / 2

		const rgb = this.colorTransition.getColor(progress)

		context.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`
		context.fillRect(
			this.position.x - halfSize,
			this.position.y - halfSize,
			size,
			size,
		)

		this.animationProgress.registerFrame()

		const pixelSpeed = CPStoPPS(this.speed)

		this.position.x += pixelSpeed.vx / 1000 * FRAME_TIMING
		this.position.y -= pixelSpeed.vy / 1000 * FRAME_TIMING

		this.speed.vy -= FREE_FALL_ACC_PER_FRAME
	}
}