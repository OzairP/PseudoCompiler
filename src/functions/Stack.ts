export class Stack<T = any> {
	public readonly stack: Array<T> = []

	public push(value: T) {
		this.stack.push(value)
	}

	public pop(amount: number = 1): Array<T> {
		return this.stack.splice(this.stack.length - amount)
	}

	public last(): T | undefined {
		return this.stack.length > 0 ? this.stack[this.stack.length - 1] : undefined
	}

	public lastNumber(): number | undefined {
		return this.stack.reduceRight<number | undefined>((n, x) => (!n && typeof x === 'number' ? x : n), undefined)
	}
}
