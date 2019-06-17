import { Production } from '../../transitions'
import { Expression } from '../expression'
import { Kind, Node } from '../Node'
import { Statement } from './Statement'

export class ReturnStatement extends Statement<Kind.ReturnStatement> {
	constructor(start: number, width: number, public expression: Expression) {
		super(Kind.ReturnStatement, Production.RETURN_STMT, start, width)
	}

	public visit(
		visitor: Partial<Record<Kind, {
			enter?(node: Node<Kind>, parent?: Node<Kind>): void
			exit?(node: Node<Kind>, parent?: Node<Kind>): void
		}>>,
		parent?: Node<Kind>
	): void {
		const { enter = () => {}, exit = () => {} } = visitor[Kind.ReturnStatement] || {}

		enter(this, parent)
		this.expression.visit(visitor, this)
		exit(this, parent)
	}
}
