import { Production } from '../../transitions'
import { Block } from '../Block'
import { Expression } from '../expression'
import { Kind } from '../Node'
import { Statement } from './Statement'

export class ElseIfStatement extends Statement<Kind.ElseIfStatement> {
	constructor(start: number, width: number, public condition: Expression, public body: Block) {
		super(Kind.ElseIfStatement, Production.ELIF_STMT, start, width)
	}
}
