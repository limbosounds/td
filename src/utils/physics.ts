import Drawer from "stores/Drawer"
import { Speed2D } from "typings/Physics"

export const pixelizeSpeed = (
	speed: Speed2D
): Speed2D => {
	return {
		vx: speed.vx * Drawer.chunkSize,
		vy: speed.vy * Drawer.chunkSize
	}
}