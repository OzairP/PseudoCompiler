import { Production } from '../../transitions'
import { Identifier } from '../Identifier'
import { Assignment, Kind } from '../Node'
import { Expression } from './Expression'

export class AssignmentExpression extends Expression<Kind.AssignmentExpression> implements Assignment {
	constructor(start: number, width: number, public name: Identifier, public assignment: Expression) {
		super(Kind.AssignmentExpression, Production.ASSIGN_EXPR, start, width)
	}
}
