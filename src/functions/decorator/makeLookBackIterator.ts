export interface LookBackIterator<T> {
	last?: IteratorResult<T>
	current?: IteratorResult<T>
}

export function makeLookBackIterator<I extends Iterator<any>, T = I extends Iterator<infer T> ? T : any>(
	iterator: I
): I & LookBackIterator<T> {
	return {
		...iterator,

		last: undefined,
		current: undefined,

		next(value?: any) {
			// Clone current value
			this.last = this.current ? { ...this.current } : undefined
			this.current = iterator.next(value)

			return this.current
		},
	}
}
