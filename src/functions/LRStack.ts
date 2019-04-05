export class LRStack<T, E = number | T> {
	public readonly stack: Array<E> = []

	public push(value: E) {
		this.stack.push(value)
	}

	public pop(amount: number = 1): Array<E> {
		return this.stack.splice(this.stack.length - amount)
	}

	public last(): E {
		return this.stack[this.stack.length - 1]
	}

	public lastState(): number {
		// @ts-ignore
		return this.stack
			.slice()
			.reverse()
			.find(x => typeof x === 'number')
	}
}
