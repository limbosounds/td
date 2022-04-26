import { Coords2D } from "typings/canvas/Geometry"
import { Speed2D } from "typings/Physics"
import { IDrawable } from "typings/canvas/Draw"

import { FRAME_TIMING } from "consts/canvas"

import { unsafeRandomInt } from "utils/number"
import { FREE_FALL_ACC_PER_FRAME } from "consts/physics"
import { pixelizeSpeed } from "utils/physics"
import Color from "entities/canvas/Color"

export default
class SparkParticle
implements IDrawable {
	private frameMultiplier
		: number
		= FRAME_TIMING / this.lifetime

	private speed
		= {...this.initialSpeed}

	private position
		= {...this.initialPosition}

	private sizeReduction
		: number
		= this.size * this.frameMultiplier

	private color
		= new Color(this.colors.from.rgb)

	private colorDifference
		= this.colors.from.getColorDifference(this.colors.to)

	private colorChange
		= {
			r: this.colorDifference.r * this.frameMultiplier,
			g: this.colorDifference.g * this.frameMultiplier,
			b: this.colorDifference.b * this.frameMultiplier,
		}

	constructor(
		private readonly initialPosition: Coords2D,
		private readonly lifetime: number = 2000,
		private size: number = 10,
		private readonly initialSpeed: Speed2D = {
			vx: unsafeRandomInt(3, -3),
			vy: unsafeRandomInt(4, 6),
		},
		private readonly colors: {
			from: Color
			to: Color
		} = {
			from: new Color("#f00"),
			to: new Color("#ff0")
		},
	) {
		console.log(this.colorChange)
		console.log(this.colors.from.rgb)
		console.log(this.colors.to.rgb)
	}

	draw = (
		context: CanvasRenderingContext2D
	) => {
		if (this.size <= 0) // TODO destroy point
			return

		const halfSize = this.size / 2
		const { rgb } = this.color

		console.log(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`)

		context.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`
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

		this.color.addColor(this.colorChange)

		this.speed.vy -= FREE_FALL_ACC_PER_FRAME
	}
}