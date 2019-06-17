import * as Lang from '../../../../language'
import { Production } from '../../transitions'
import { BinaryOperationExpression, Expression } from '../expression'
import { Kind, Node } from '../Node'

export class EphemeralBinaryOperationExpressionTail extends Expression<Kind.BinaryOperationExpression> {
	constructor(start: number, width: number, public operator: Lang.Token.Operator, public rhs: Expression) {
		super(Kind.BinaryOperationExpression, Production.BIN_OP_EXPR_TAIL, start, width)
	}

	public attach(lhs: Expression): BinaryOperationExpression {
		return new BinaryOperationExpression(lhs.start, lhs.width + this.width, this.operator, lhs, this.rhs)
	}

	public visit(
		_: Partial<Record<Kind, Record<'enter' | 'exit', (node: Node<Kind>, parent?: Node<Kind>) => void>>>,
		__?: Node<Kind>
	): void {}
}
