import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"

import { MOUNTPOINT_ID } from "config"
import AppProvider from "Provider"

ReactDOM.render(
	<BrowserRouter>
		<AppProvider />
	</BrowserRouter>,
	document.getElementById(MOUNTPOINT_ID),
)