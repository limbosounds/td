import React from "react"
import { observer } from "mobx-react"
import { RouteComponentProps } from "react-router-dom"

import "styles/main"

import Window from "stores/Window"
import Drawer from "stores/Drawer"
import Chunk from "components/Canvas/Helpers/Chunk"
import { unsafeRandomInt } from "utils/number"
import SparkParticle from "components/Canvas/Particles/Spark"

export interface AppProps
extends RouteComponentProps {

}

export interface AppState {

}

@observer
export default
class App
extends React.Component<AppProps, AppState> {
	private canvas?
		: HTMLCanvasElement

	componentDidMount() {
		if (this.canvas) {
			Drawer.init(this.canvas) 
			// ;[...Array(Window.aspectRatio.w)].forEach((_, x) => {
			// 	[...Array(Window.aspectRatio.h)].forEach((_, y) => {
			// 		Drawer.addElement(new Chunk(x, y))
			// 	})
			// })
		}

		document.addEventListener("keydown", this.handleKeyDown)
		document.addEventListener("click", this.handleClick)
	}

	handleClick = (
		event: MouseEvent,
	) => {
		const { clientX, clientY } = event
		Drawer.addElement(
			new SparkParticle(Drawer.getCursorCoords(clientX, clientY))
		)
	}

	handleKeyDown = (
		event: KeyboardEvent
	) => {
		if (event.key == "Enter")
			Chunk.COLOR = {
				r: unsafeRandomInt(255),
				g: unsafeRandomInt(255),
				b: unsafeRandomInt(255),
			}
	}

	render() {
		const { h: height, w: width } = Window.workspaceSize
		return <>
			<div id="canvas-wrapper">
				<canvas
					ref={r => this.canvas = r!}
					style={{ width, height }}
					width={width}
					height={height}
				/>
			</div>
		</>
	}
}