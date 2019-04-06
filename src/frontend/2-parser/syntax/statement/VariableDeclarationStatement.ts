import { Production } from '../../transitions'
import { Expression } from '../expression'
import { Identifier } from '../Identifier'
import { Assignment, Kind } from '../Node'
import { Type } from '../Type'
import { Statement } from './Statement'

export class VariableDeclarationStatement extends Statement<Kind.VariableDeclarationStatement> implements Assignment {
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
