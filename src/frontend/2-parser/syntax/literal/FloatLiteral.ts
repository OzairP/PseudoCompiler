import { Kind } from '../Node'
import { Literal } from './Literal'

export class FloatLiteral extends Literal<Kind.FloatLiteral> {
	constructor(public start: number, public width: number, public value: number) {
		super(Kind.FloatLiteral, start, width, value)
	}
}
