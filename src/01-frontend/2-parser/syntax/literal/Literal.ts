import { Production } from '../../transitions'
import { Expression } from '../expression'
import { Kind, Value } from '../Node'

type LiteralKind = Kind.BooleanLiteral | Kind.StringLiteral | Kind.NumericLiteral | Kind.FloatLiteral

type LiteralContentType<T extends LiteralKind> = T extends Kind.BooleanLiteral
	? boolean
	: T extends Kind.StringLiteral
	? string
	: T extends Kind.NumericLiteral
	? number
	: T extends Kind.FloatLiteral
	? number
	: never

export abstract class Literal<T extends LiteralKind> extends Expression<T> implements Value<LiteralContentType<T>> {
	constructor(public kind: T, public start: number, public width: number, public value: LiteralContentType<T>) {
		super(kind, Production.EXPR, start, width)
	}
}
