import { PeekingIterator } from './makePeekingIterator'

type PeekingPredicate<T> = (value: T | undefined, peek: PeekingIterator<T>['peek']) => boolean

export interface AdvancingIterator<T> {
	advanceUntil(predicate: PeekingPredicate<T>): Array<T>
}

export function makeAdvancingIterator<T, I extends Iterator<T> & PeekingIterator<T>>(
	iterator: I
): AdvancingIterator<T> & I {
	return {
		...iterator,

		advanceUntil(predicate: PeekingPredicate<T>): Array<T> {
			let result: T | undefined = iterator.peek.bind(this)()
			const buffer: Array<T> = []
			const peeker = (x: number = 1) => iterator.peek.bind(this)(x + 1)

			while (!predicate(result, peeker)) {
				buffer.push(iterator.next.bind(this)().value)
				result = iterator.peek.bind(this)()
			}

			return buffer
		},
	}
}
