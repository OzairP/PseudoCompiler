export interface PeekingIterator<T> {
	iteration: number
	peek(distance?: number, value?: any): T | undefined
}

export function makePeekingIterator<T, I extends Iterator<T> = Iterator<T>>(iterator: I): PeekingIterator<T> & I {
	const buffer: Array<IteratorResult<T>> = []

	return {
		...iterator,

		iteration: -1,

		next(value?: any) {
			this.iteration++
			if (buffer.length === 0) {
				buffer.push(iterator.next(value))
			}
			return buffer.shift()!
		},

		peek(distance: number = 1, value?: any) {
			while (buffer.length < distance) {
				buffer.push(iterator.next(value))
			}
			return buffer[distance - 1].value
		},
	}
}
