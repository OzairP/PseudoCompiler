import { Production } from '../../transitions'
import { Expression } from '../expression'
import { Kind } from '../Node'
import { Statement } from './Statement'

export class ReturnStatement extends Statement<Kind.ReturnStatement> {
	constructor(start: number, width: number, public expression: Expression) {
		super(Kind.ReturnStatement, Production.RETURN_STMT, start, width)
	}
}
