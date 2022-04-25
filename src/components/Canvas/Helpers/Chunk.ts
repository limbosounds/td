import Drawer from "stores/Drawer"
import Window from "stores/Window"
import { ColorRGB } from "typings/canvas/Colors"
import { IDrawable } from "typings/canvas/Draw"

export default
class Chunk
implements IDrawable {
	static COLOR
		: ColorRGB
		= {
			r: 233,
			g: 30,
			b: 99,
		}

	constructor(
		private readonly iX: number,
		private readonly iY: number,
	) {}

	draw = (
		context: CanvasRenderingContext2D,
	) => {
		const { chunkSize } = Drawer
		const { w, h } = Window.aspectRatio
		const { r, g, b } = Chunk.COLOR
		context.fillStyle = `rgba(${r}, ${g}, ${b * this.iY / h}, ${this.iX / w})`
		context.fillRect(chunkSize * this.iX, chunkSize * this.iY, chunkSize, chunkSize)
	}
}