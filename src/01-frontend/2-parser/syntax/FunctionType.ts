import { Production } from '../transitions'
import { Kind, Node } from './Node'
import { Parameter } from './Parameter'
import { Type } from './Type'

export class FunctionType extends Node<Kind.FunctionType> {
	constructor(start: number, width: number, public parameters: Array<Parameter>, public returnType: Type) {
		super(Kind.FunctionType, Production.TYPE, start, width)
	}

	public visit(
		visitor: Partial<Record<Kind, {
			enter?(node: Node<Kind>, parent?: Node<Kind>): void
			exit?(node: Node<Kind>, parent?: Node<Kind>): void
		}>>,
		parent?: Node<Kind>
	): void {
		const { enter = () => {}, exit = () => {} } = visitor[Kind.FunctionType] || {}

		enter(this, parent)
		this.parameters.forEach(s => s.visit(visitor, this))
		this.returnType.visit(visitor, this)
		exit(this, parent)
	}
}
