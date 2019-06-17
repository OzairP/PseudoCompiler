import { Production } from '../../transitions'
import { Expression } from '../expression'
import { Identifier } from '../Identifier'
import { Assignment, Kind, Node } from '../Node'
import { Type } from '../Type'
import { Statement } from './Statement'

export class VariableDeclarationStatement extends Statement<Kind.VariableDeclarationStatement> implements Assignment {
	constructor(
		start: number,
		width: number,
		public mutable: boolean,
		public type: Type | undefined,
		public name: Identifier,
		public assignment: Expression
	) {
		super(Kind.VariableDeclarationStatement, Production.VAR_DEC_STMT, start, width)
	}

	public visit(
		visitor: Partial<Record<Kind, {
			enter?(node: Node<Kind>, parent?: Node<Kind>): void
			exit?(node: Node<Kind>, parent?: Node<Kind>): void
		}>>,
		parent?: Node<Kind>
	): void {
		const { enter = () => {}, exit = () => {} } = visitor[Kind.VariableDeclarationStatement] || {}

		enter(this, parent)
		this.type && this.type.visit(visitor, this)
		this.name.visit(visitor, this)
		this.assignment.visit(visitor, this)
		exit(this, parent)
	}
}
