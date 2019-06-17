import { Production } from '../../transitions'
import { Block } from '../Block'
import { Identifier } from '../Identifier'
import { Kind, Node } from '../Node'
import { Parameter } from '../Parameter'
import { Type } from '../Type'
import { Statement } from './Statement'

export class FunctionDeclarationStatement extends Statement<Kind.FunctionDeclarationStatement> {
	constructor(
		start: number,
		width: number,
		public name: Identifier,
		public parameters: Array<Parameter>,
		public returnType: Type,
		public body: Block
	) {
		super(Kind.FunctionDeclarationStatement, Production.FUNC_DEC_STMT, start, width)
	}

	public visit(
		visitor: Partial<Record<Kind, {
			enter?(node: Node<Kind>, parent?: Node<Kind>): void
			exit?(node: Node<Kind>, parent?: Node<Kind>): void
		}>>,
		parent?: Node<Kind>
	): void {
		const { enter = () => {}, exit = () => {} } = visitor[Kind.FunctionDeclarationStatement] || {}

		enter(this, parent)
		this.name.visit(visitor, this)
		this.parameters.forEach(s => s.visit(visitor, this))
		this.returnType.visit(visitor, this)
		this.body.visit(visitor, this)
		exit(this, parent)
	}
}
