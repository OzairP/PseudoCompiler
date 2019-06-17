import { Production } from '../transitions'
import { Kind, Node } from './Node'
import { Statement } from './statement'

export class Block extends Node<Kind.Block> {
	constructor(public start: number, public width: number, public statements: Array<Statement>) {
		super(Kind.Block, Production.BLOCK, start, width)
	}

	public add(statement: Statement) {
		this.statements.push(statement)
		this.width += statement.width
	}

	public visit(
		visitor: Partial<Record<Kind, {
			enter?(node: Node<Kind>, parent?: Node<Kind>): void
			exit?(node: Node<Kind>, parent?: Node<Kind>): void
		}>>,
		parent?: Node<Kind>
	): void {
		const { enter = () => {}, exit = () => {} } = visitor[Kind.Block] || {}

		enter(this, parent)
		this.statements.forEach(s => s.visit(visitor, this))
		exit(this, parent)
	}
}
