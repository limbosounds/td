import { Coords2D } from "typings/canvas/Geometry"
import { Speed2D } from "typings/Physics"
import { IDrawable } from "typings/canvas/Draw"

import { FRAME_TIMING } from "consts/canvas"

import { unsafeRandomInt } from "utils/number"
import { FREE_FALL_ACC_PER_FRAME } from "consts/physics"
import { pixelizeSpeed } from "utils/physics"

export default
class SparkParticle
implements IDrawable {
	private speed
		= {...this.initialSpeed}

	private position
		= {...this.initialPosition}

	private sizeReduction
		: number
		= this.size / this.lifetime * FRAME_TIMING

	constructor(
		private readonly initialPosition: Coords2D,
		private readonly lifetime: number = 2000,
		private size: number = 10,
		private readonly initialSpeed: Speed2D = {
			vx: unsafeRandomInt(3, -3),
			vy: unsafeRandomInt(4, 6),
		}
	) {

	}

	draw = (
		context: CanvasRenderingContext2D
	) => {
		if (this.size <= 0) // TODO destroy point
			return

		const halfSize = this.size / 2

		context.fillStyle = `rgba(255, 255, 0, 1)`
		context.fillRect(
			this.position.x - halfSize,
			this.position.y - halfSize,
			this.size,
			this.size,
		)

		const pixelSpeed = pixelizeSpeed(this.speed)

		this.size -= this.sizeReduction
		this.position.x += pixelSpeed.vx / 1000 * FRAME_TIMING
		this.position.y -= pixelSpeed.vy / 1000 * FRAME_TIMING

		this.speed.vy -= FREE_FALL_ACC_PER_FRAME
	}
}