import { Production } from '../transitions'
import { Identifier } from './Identifier'
import { Kind, Node } from './Node'
import { Type } from './Type'

export class Parameter extends Node<Kind.Parameter> {
	constructor(
		start: number,
		width: number,
		public immutable: boolean,
		public type: Type,
		public identifier: Identifier
	) {
		super(Kind.Parameter, immutable ? Production.IMMUT_PARAM : Production.MUT_PARAM, start, width)
	}

	public setMutable() {
		this.immutable = false
		this.token = Production.MUT_PARAM
	}

	public setImmutable() {
		this.immutable = true
		this.token = Production.IMMUT_PARAM
	}
}
