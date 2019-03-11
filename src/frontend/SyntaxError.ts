export class SyntaxError extends Error {
	constructor(public message: string, public offset: number, public width: number) {
		super('SyntaxError: ' + message)
	}
}
