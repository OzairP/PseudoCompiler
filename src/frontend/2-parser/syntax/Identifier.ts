import { Production } from '../transitions'
import { Kind, Node } from './Node'

export class Identifier extends Node<Kind.Identifier> {
	constructor(public start: number, public width: number, public name: string) {
		super(Kind.Identifier, Production.IDEN, start, width)
	}
}
