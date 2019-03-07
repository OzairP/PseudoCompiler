export interface TrackingIterator {
	iteration: number
}

export function makeTrackingIterator<T, I extends Iterator<T>>(iterator: I): I & TrackingIterator {
	return {
		...iterator,

		iteration: 0,

		next(value?: any) {
			this.iteration++
			return iterator.next(value)
		},
	}
}
