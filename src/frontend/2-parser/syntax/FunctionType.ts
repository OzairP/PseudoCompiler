import { Production } from '../transitions'
import { Kind, Node } from './Node'
import { Parameter } from './Parameter'
import { Type } from './Type'

export class FunctionType extends Node<Kind.FunctionType> {
	constructor(start: number, width: number, public parameters: Array<Parameter>, public returnType: Type) {
		super(Kind.FunctionType, Production.TYPE, start, width)
	}
}
