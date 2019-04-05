import { Production } from '../../transitions'
import { Expression } from '../expression'
import { Identifier } from '../Identifier'
import { Kind } from '../Node'
import { Statement } from './Statement'
import { Type } from '../Type'

export class VariableDeclarationStatement extends Statement<Kind.VariableDeclarationStatement> {
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
}
