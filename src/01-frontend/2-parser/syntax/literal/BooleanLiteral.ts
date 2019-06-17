import { Kind, Node } from '../Node'
import { Literal } from './Literal'

export class BooleanLiteral extends Literal<Kind.BooleanLiteral> {
	constructor(public start: number, public width: number, public value: boolean) {
		super(Kind.BooleanLiteral, start, width, value)
	}

	public visit(
		visitor: Partial<Record<Kind, {
			enter?(node: Node<Kind>, parent?: Node<Kind>): void
			exit?(node: Node<Kind>, parent?: Node<Kind>): void
		}>>,
		parent?: Node<Kind>
	): void {
		const { enter = () => {}, exit = () => {} } = visitor[Kind.BooleanLiteral] || {}

		enter(this, parent)
		exit(this, parent)
	}
}
