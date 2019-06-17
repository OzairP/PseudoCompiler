import { Production } from '../../transitions'
import { Block } from '../Block'
import { Kind, Node } from '../Node'
import { Parameter } from '../Parameter'
import { Type } from '../Type'
import { Expression } from './Expression'

export class FunctionExpression extends Expression<Kind.FunctionExpression> {
	constructor(
		start: number,
		width: number,
		public parameters: Array<Parameter>,
		public returnType: Type,
		public body: Block
	) {
		super(Kind.FunctionExpression, Production.FUNC_EXPR, start, width)
	}

	public visit(
		visitor: Partial<Record<Kind, {
			enter?(node: Node<Kind>, parent?: Node<Kind>): void
			exit?(node: Node<Kind>, parent?: Node<Kind>): void
		}>>,
		parent?: Node<Kind>
	): void {
		const { enter = () => {}, exit = () => {} } = visitor[Kind.FunctionExpression] || {}

		enter(this, parent)
		this.parameters.forEach(s => s.visit(visitor, this))
		this.returnType.visit(visitor, this)
		this.body.visit(visitor, this)
		exit(this, parent)
	}
}
