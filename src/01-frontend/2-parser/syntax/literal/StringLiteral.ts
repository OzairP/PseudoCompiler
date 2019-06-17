import { Kind, Node } from '../Node'
import { Literal } from './Literal'

export class StringLiteral extends Literal<Kind.StringLiteral> {
	constructor(public start: number, public width: number, public value: string) {
		super(Kind.StringLiteral, start, width, value)
	}

	public visit(
		visitor: Partial<Record<Kind, {
			enter?(node: Node<Kind>, parent?: Node<Kind>): void
			exit?(node: Node<Kind>, parent?: Node<Kind>): void
		}>>,
		parent?: Node<Kind>
	): void {
		const { enter = () => {}, exit = () => {} } = visitor[Kind.StringLiteral] || {}

		enter(this, parent)
		exit(this, parent)
	}
}
