import { Production } from '../../transitions'
import { Block } from '../Block'
import { Expression } from '../expression'
import { Kind, Node } from '../Node'
import { Statement } from './Statement'

export class ElseIfStatement extends Statement<Kind.ElseIfStatement> {
	constructor(start: number, width: number, public condition: Expression, public body: Block) {
		super(Kind.ElseIfStatement, Production.ELIF_STMT, start, width)
	}

	public visit(
		visitor: Partial<Record<Kind, {
			enter?(node: Node<Kind>, parent?: Node<Kind>): void
			exit?(node: Node<Kind>, parent?: Node<Kind>): void
		}>>,
		parent?: Node<Kind>
	): void {
		const { enter = () => {}, exit = () => {} } = visitor[Kind.ElseIfStatement] || {}

		enter(this, parent)
		this.condition.visit(visitor, this)
		this.body.visit(visitor, this)
		exit(this, parent)
	}
}
