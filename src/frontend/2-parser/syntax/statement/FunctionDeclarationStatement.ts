import { Production } from '../../transitions'
import { Block } from '../Block'
import { Identifier } from '../Identifier'
import { Kind } from '../Node'
import { Parameter } from '../Parameter'
import { Type } from '../Type'
import { Statement } from './Statement'

export class FunctionDeclarationStatement extends Statement<Kind.FunctionDeclarationStatement> {
	constructor(
		start: number,
		width: number,
		public identifier: Identifier,
		public parameters: Array<Parameter>,
		public returnType: Type,
		public body: Block
	) {
		super(Kind.FunctionDeclarationStatement, Production.FUNC_DEC_STMT, start, width)
	}
}
