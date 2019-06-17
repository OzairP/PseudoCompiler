import * as Lang from '../../../../language'
import { Production } from '../../transitions'
import { Kind, Node } from '../Node'
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

	public visit(
		visitor: Partial<Record<Kind, {
			enter?(node: Node<Kind>, parent?: Node<Kind>): void
			exit?(node: Node<Kind>, parent?: Node<Kind>): void
		}>>,
		parent?: Node<Kind>
	): void {
		const { enter = () => {}, exit = () => {} } = visitor[Kind.BinaryOperationExpression] || {}

		enter(this, parent)
		this.lhs.visit(visitor, this)
		this.rhs.visit(visitor, this)
		exit(this, parent)
	}
}
