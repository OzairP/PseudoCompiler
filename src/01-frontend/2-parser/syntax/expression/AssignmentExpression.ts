import { Production } from '../../transitions'
import { Identifier } from '../Identifier'
import { Assignment, Kind, Node } from '../Node'
import { Expression } from './Expression'

export class AssignmentExpression extends Expression<Kind.AssignmentExpression> implements Assignment {
	constructor(start: number, width: number, public name: Identifier, public assignment: Expression) {
		super(Kind.AssignmentExpression, Production.ASSIGN_EXPR, start, width)
	}

	public visit(
		visitor: Partial<Record<Kind, {
			enter?(node: Node<Kind>, parent?: Node<Kind>): void
			exit?(node: Node<Kind>, parent?: Node<Kind>): void
		}>>,
		parent?: Node<Kind>
	): void {
		const { enter = () => {}, exit = () => {} } = visitor[Kind.AssignmentExpression] || {}

		enter(this, parent)
		this.name.visit(visitor, this)
		this.assignment.visit(visitor, this)
		exit(this, parent)
	}
}
