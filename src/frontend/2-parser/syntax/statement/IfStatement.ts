import { Production } from '../../transitions'
import { Block } from '../Block'
import { Expression } from '../expression'
import { Kind } from '../Node'
import { ElseIfStatement } from './ElseIfStatement'
import { ElseStatement } from './ElseStatement'
import { Statement } from './Statement'

export class IfStatement extends Statement<Kind.IfStatement> {
	public elseIfStatements: Array<ElseIfStatement> = []

	public elseStatement?: ElseStatement

	constructor(start: number, width: number, public condition: Expression, public body: Block) {
		super(Kind.IfStatement, Production.IF_STMT, start, width)
	}

	public addElseIfStatement(statement: ElseIfStatement) {
		this.elseIfStatements.push(statement)
		this.width += statement.width
	}

	public setElseStatement(statement: ElseStatement) {
		this.elseStatement = statement
		this.width += statement.width
	}
}
