import { EasingType } from "typings/canvas/Easing"

const easings: {
	[key in EasingType]: (
		progress: number
	) => number
} = {
	linear: x => x
}

export default easings