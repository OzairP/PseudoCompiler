import { Production } from '../transitions'
import { Block } from './Block'
import { Kind, Node } from './Node'
import { Statement } from './statement'

export class Program extends Node<Kind.Program> {
	public statements: Array<Statement>
	public start: number
	public width: number

	constructor(block: Block) {
		super(Kind.Program, Production.PROGRAM, block.start, block.width)
		this.start = block.start
		this.width = block.width
		this.statements = block.statements
	}

	public visit(
		visitor: Partial<Record<Kind, {
			enter?(node: Node<Kind>, parent?: Node<Kind>): void
			exit?(node: Node<Kind>, parent?: Node<Kind>): void
		}>>,
		parent?: Node<Kind>
	): void {
		const { enter = () => {}, exit = () => {} } = visitor[Kind.Program] || {}

		enter(this, parent)
		this.statements.forEach(s => s.visit(visitor, this))
		exit(this, parent)
	}
}
