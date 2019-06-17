import { Kind, Node } from '../Node'
import { Literal } from './Literal'

export class NumericLiteral extends Literal<Kind.NumericLiteral> {
	constructor(public start: number, public width: number, public value: number) {
		super(Kind.NumericLiteral, start, width, value)
	}

	public visit(
		visitor: Partial<Record<Kind, {
			enter?(node: Node<Kind>, parent?: Node<Kind>): void
			exit?(node: Node<Kind>, parent?: Node<Kind>): void
		}>>,
		parent?: Node<Kind>
	): void {
		const { enter = () => {}, exit = () => {} } = visitor[Kind.NumericLiteral] || {}

		enter(this, parent)
		exit(this, parent)
	}
}
