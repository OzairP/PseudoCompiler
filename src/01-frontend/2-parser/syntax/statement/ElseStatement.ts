import { Production } from '../../transitions'
import { Block } from '../Block'
import { Kind, Node } from '../Node'
import { Statement } from './Statement'

export class ElseStatement extends Statement<Kind.ElseStatement> {
	constructor(start: number, width: number, public body: Block) {
		super(Kind.ElseStatement, Production.ELSE_STMT, start, width)
	}

	public visit(
		visitor: Partial<Record<Kind, {
			enter?(node: Node<Kind>, parent?: Node<Kind>): void
			exit?(node: Node<Kind>, parent?: Node<Kind>): void
		}>>,
		parent?: Node<Kind>
	): void {
		const { enter = () => {}, exit = () => {} } = visitor[Kind.ElseStatement] || {}

		enter(this, parent)
		this.body.visit(visitor, parent)
		exit(this, parent)
	}
}
