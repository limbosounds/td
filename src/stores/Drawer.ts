import { computed, makeObservable, observable } from "mobx"
import { v4 as uuid } from "uuid"

import { IDrawable } from "typings/canvas/Draw"

import Window from "./Window"

class DrawerStore {
	private context
		: CanvasRenderingContext2D
	
	private frame
		: number

	@observable
	private elements
		: {
			id: string
			item: IDrawable
		}[]
		= []

	private draw = () => {
		if (!this.context)
			return

		this.context.clearRect(0, 0, Window.workspaceSize.w, Window.workspaceSize.h)

		this.elements.forEach(element => {
			element.item.draw(this.context!)
		})

		this.frame = requestAnimationFrame(this.draw)
	}

	constructor() {
		makeObservable(this)
	}

	@computed
	get chunkSize(): number {
		return Window.workspaceSize.w / Window.aspectRatio.w
	}

	init = (
		canvas: HTMLCanvasElement
	) => {
		const context = canvas.getContext("2d")
		if (!context) {
			// TODO logger
			console.no(`*Failed to get 2D context, lol?`)
			return
		}

		this.context = context
		this.draw()
	}

	halt = () => {
		cancelAnimationFrame(this.frame)
	}

	addElement = (
		item: IDrawable
	): string => {
		const id = uuid()
		this.elements.push({ id, item })
		return id
	}
}

export default new DrawerStore()