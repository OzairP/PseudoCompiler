import { Node, Kind } from './Node'
import { Production } from '../transitions'
import { Statement } from './statement'

export class Block extends Node<Kind.Block> {
	constructor(public start: number, public width: number, public statements: Array<Statement>) {
		super(Kind.Block, Production.BLOCK, start, width)
	}
}
