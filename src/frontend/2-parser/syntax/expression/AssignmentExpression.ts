import { Production } from '../../transitions'
import { Identifier } from '../Identifier'
import { Kind } from '../Node'
import { Expression } from './Expression'

export class AssignmentExpression extends Expression<Kind.AssignmentExpression> {
	constructor(start: number, width: number, public identifier: Identifier, public assignment: Expression) {
		super(Kind.AssignmentExpression, Production.ASSIGN_EXPR, start, width)
	}
}
