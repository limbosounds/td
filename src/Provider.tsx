import React from "react"
import { observer } from "mobx-react"
import { Route, Switch, Redirect } from "react-router-dom"

import "../typings/Console"

import App from "App"

export interface AppProviderProps {

}

export interface AppProviderState {

}

@observer
export default
class AppProvider
extends React.Component<AppProviderProps, AppProviderState> {
	render() {
		if (typeof window == "undefined")
			return null

		return <>
			<Switch>
				<Route
					path="/"
					component={App}
				/>
				<Redirect
					to="/"
				/>
			</Switch>
		</>
	}
}