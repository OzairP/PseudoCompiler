import { Production } from '../../transitions'
import { Block } from '../Block'
import { Kind } from '../Node'
import { Parameter } from '../Parameter'
import { Type } from '../Type'
import { Expression } from './Expression'

export class FunctionExpression extends Expression<Kind.FunctionExpression> {
	constructor(
		start: number,
		width: number,
		public parameters: Array<Parameter>,
		public returnType: Type,
		public body: Block
	) {
		super(Kind.FunctionExpression, Production.FUNC_EXPR, start, width)
	}
}
