import { Production } from '../transitions'
import { Kind, Node } from './Node'

export class Identifier extends Node<Kind.Identifier> {
	constructor(public start: number, public width: number, public name: string) {
		super(Kind.Identifier, Production.IDEN, start, width)
	}

	public visit(
		visitor: Partial<Record<Kind, {
			enter?(node: Node<Kind>, parent?: Node<Kind>): void
			exit?(node: Node<Kind>, parent?: Node<Kind>): void
		}>>,
		parent?: Node<Kind>
	): void {
		const { enter = () => {}, exit = () => {} } = visitor[Kind.Identifier] || {}

		enter(this, parent)
		exit(this, parent)
	}
}
