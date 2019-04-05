import * as Lang from '../../../../language'
import { Production } from '../../transitions'
import { Kind } from '../Node'
import { Expression } from './Expression'

export class BinaryOperationExpression extends Expression<Kind.BinaryOperationExpression> {
	constructor(
		start: number,
		width: number,
		public operator: Lang.Token.Operator,
		public lhs: Expression,
		public rhs: Expression,
		public parenthesized?: boolean
	) {
		super(Kind.BinaryOperationExpression, Production.BIN_OP_EXPR, start, width)
	}
}
