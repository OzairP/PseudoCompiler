export class Stack<T> {
	protected stack: Array<T> = []

	public push(value: T) {
		this.stack.push(value)
	}

	public pop(amount: number = 1): Array<T> {
		return this.stack.splice(this.stack.length - amount - 1, amount)
	}

	public last(): T | undefined {
		return this.stack.length > 0 ? this.stack[this.stack.length - 1] : undefined
	}
}
