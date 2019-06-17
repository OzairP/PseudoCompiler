import { Production } from '../../transitions'
import { Kind, Node } from '../Node'
import { Parameter } from '../Parameter'

export class EphemeralParameterList extends Node<Kind.ParameterListEphemeral> {
	public parameters: Array<Parameter> = []

	constructor(parameter: Parameter) {
		super(Kind.ParameterListEphemeral, Production.PARAMS, parameter.start, parameter.width)
		this.add(parameter)
	}

	public add(parameter: Parameter) {
		this.parameters.push(parameter)
	}

	public visit(
		_: Partial<Record<Kind, Record<'enter' | 'exit', (node: Node<Kind>, parent?: Node<Kind>) => void>>>,
		__?: Node<Kind>
	): void {}
}
