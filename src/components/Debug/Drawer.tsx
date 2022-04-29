import React from "react"
import { observer } from "mobx-react"

import "styles/components/debug/drawer"
import Drawer from "stores/Drawer"

export interface DrawerDebugProps {
	
}

export interface DrawerDebugState {
	left: number
}

@observer
export default
class DrawerDebug
extends React.Component<DrawerDebugProps, DrawerDebugState> {
	state
		: DrawerDebugState
		= {
			left: 0
		}

	handleResize = () => {
		const box = (window["canvas-wrapper"] as HTMLElement | undefined)?.querySelector("canvas")?.getBoundingClientRect()
		if (box && this.state.left != box.left)
			this.setState({
				left: box.left
			})
	}

	componentDidMount() {
		window.addEventListener("resize", this.handleResize)
		this.handleResize()
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.handleResize)
	}

	render() {
		return <>
			<div
				className="c-drawer-debug"
				style={this.state}
			>
				Rendering elements: {Drawer.debug_elementsCount}
			</div>
		</>
	}
}