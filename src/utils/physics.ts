import { Speed2D } from "typings/Physics"

import Drawer from "stores/Drawer"

export const CPStoPPS = (
	speed: Speed2D
): Speed2D => {
	return {
		vx: speed.vx * Drawer.chunkSize,
		vy: speed.vy * Drawer.chunkSize
	}
}

export const chunkToPixel = (
	valueInChunks: number
): number => {
	return valueInChunks * Drawer.chunkSize
}