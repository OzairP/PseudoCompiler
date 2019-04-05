import { Node, Kind } from './Node'
import { Production } from '../transitions'
import { Block } from './Block'
import { Statement } from './statement'

export class Program extends Node<Kind.Program> {
	public statements: Array<Statement>
	public start: number
	public width: number

	constructor(block: Block) {
		super(Kind.Program, Production.PROGRAM, block.start, block.width)
		this.start = block.start
		this.width = block.width
		this.statements = block.statements
	}
}
