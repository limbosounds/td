import { action, computed, makeObservable, observable } from "mobx"

import { Size2D } from "typings/canvas/Geometry"

class WindowStore {
	@observable
	private screen
		: Size2D
		= {
			h: 0,
			w: 0,
		}

	@action
	private handleResize = () => {
		const { innerHeight, innerWidth } = window

		this.screen.h = innerHeight
		this.screen.w = innerWidth
	}

	constructor() {
		makeObservable(this)

		if (typeof window != "undefined") {
			window.addEventListener("resize", this.handleResize)
			this.handleResize()
		}
	}

	aspectRatio
		: Size2D
		= {
			w: 16,
			h: 9,
		}

	@computed
	get workspaceSize(): Size2D {
		const { w, h } = this.screen
		const { w: arw, h: arh } = this.aspectRatio
		const calculatedHeight = w * arh / arw
		const calculatedWidth = h * arw / arh
		if (calculatedHeight <= h)
			return {
				w,
				h: calculatedHeight
			}
		return {
			w: calculatedWidth,
			h,
		}
	}
}

export default new WindowStore()