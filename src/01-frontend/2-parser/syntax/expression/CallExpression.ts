import { Production } from '../../transitions'
import { Identifier } from '../Identifier'
import { Kind, Node } from '../Node'
import { Expression } from './Expression'

export class CallExpression extends Expression<Kind.CallExpression> {
	constructor(start: number, width: number, public name: Identifier, public args: Array<Expression>) {
		super(Kind.CallExpression, Production.CALL_EXPR, start, width)
	}

	public visit(
		visitor: Partial<Record<Kind, {
			enter?(node: Node<Kind>, parent?: Node<Kind>): void
			exit?(node: Node<Kind>, parent?: Node<Kind>): void
		}>>,
		parent?: Node<Kind>
	): void {
		const { enter = () => {}, exit = () => {} } = visitor[Kind.CallExpression] || {}

		enter(this, parent)
		this.name.visit(visitor, this)
		this.args.forEach(s => s.visit(visitor, this))
		exit(this, parent)
	}
}
