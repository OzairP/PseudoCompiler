import { Kind } from '../Node'
import { Literal } from './Literal'

export class NumericLiteral extends Literal<Kind.NumericLiteral> {
	constructor(public start: number, public width: number, public value: number) {
		super(Kind.NumericLiteral, start, width, value)
	}
}
