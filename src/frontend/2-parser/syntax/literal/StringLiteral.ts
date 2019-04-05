import { Kind } from '../Node'
import { Literal } from './Literal'

export class StringLiteral extends Literal<Kind.StringLiteral> {
	constructor(public start: number, public width: number, public value: string) {
		super(Kind.StringLiteral, start, width, value)
	}
}
