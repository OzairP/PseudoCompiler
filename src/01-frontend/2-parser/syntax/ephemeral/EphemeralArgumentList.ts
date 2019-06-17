import { Production } from '../../transitions'
import { Expression } from '../expression'
import { Kind, Node } from '../Node'

export class EphemeralArgumentList extends Node<Kind.ArgumentListEphemeral> {
	public args: Array<Expression> = []

	constructor(argument: Expression) {
		super(Kind.ArgumentListEphemeral, Production.ARGS, argument.start, argument.width)
		this.add(argument)
	}

	public add(argument: Expression) {
		this.args.push(argument)
		this.width += argument.width
	}

	public visit(
		_: Partial<Record<Kind, Record<'enter' | 'exit', (node: Node<Kind>, parent?: Node<Kind>) => void>>>,
		__?: Node<Kind>
	): void {}
}
