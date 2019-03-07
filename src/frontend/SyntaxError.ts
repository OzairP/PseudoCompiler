export class SyntaxError extends Error {
	constructor(public message: string, public start: number, public width: number) {
		super('SyntaxError: ' + message)
	}
}
