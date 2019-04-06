import { Production } from '../../transitions'
import { Identifier } from '../Identifier'
import { Kind } from '../Node'
import { Expression } from './Expression'

export class CallExpression extends Expression<Kind.CallExpression> {
	constructor(start: number, width: number, public name: Identifier, public args: Array<Expression>) {
		super(Kind.CallExpression, Production.CALL_EXPR, start, width)
	}

	public addArgument(argument: Expression) {
		this.args.push(argument)
		this.width += argument.width
	}
}
