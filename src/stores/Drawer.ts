import { action, computed, IObservableArray, makeObservable, observable } from "mobx"
import { v4 as uuid } from "uuid"

import { IDrawable } from "typings/canvas/Draw"

import Window from "./Window"
import { Coords2D } from "typings/canvas/Geometry"

class DrawerStore {
	private canvas
		: HTMLCanvasElement

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

	@computed
	get debug_elementsCount(): number {
		return this.elements.length
	}

	init = (
		canvas: HTMLCanvasElement
	) => {
		this.canvas = canvas

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

	@action
	addElement = (
		item: IDrawable
	): string => {
		const id = uuid()
		this.elements.push({ id, item })
		return id
	}

	@action
	removeElement = (
		id: string
	) => {
		const item = this.elements.find(el => el.id == id)
		if (item)
			(this.elements as IObservableArray).remove(item)
	}

	getCursorCoords = (
		clientX: number,
		clientY: number,	
	): Coords2D => {
		const box = this.canvas.getBoundingClientRect()
		return {
			x: clientX - box.left,
			y: clientY - box.top,
		}
	}
}

export default new DrawerStore()