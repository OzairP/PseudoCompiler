import { Production } from '../../transitions'
import { Block } from '../Block'
import { Kind } from '../Node'
import { Statement } from './Statement'

export class ElseStatement extends Statement<Kind.ElseStatement> {
	constructor(start: number, width: number, public body: Block) {
		super(Kind.ElseStatement, Production.ELSE_STMT, start, width)
	}
}
