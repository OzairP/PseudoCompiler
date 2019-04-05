import { Production } from '../../transitions'
import { Kind, Node } from '../Node'

export type ExpressionKind =
	| Kind.Expression
	| Kind.FunctionExpression
	| Kind.AssignmentExpression
	| Kind.CallExpression
	| Kind.BinaryOperationExpression
	| Kind.BooleanLiteral
	| Kind.StringLiteral
	| Kind.NumericLiteral
	| Kind.FloatLiteral

export class Expression<K extends ExpressionKind = ExpressionKind> extends Node<K> {
	constructor(kind: K, token: Production, start: number, width: number, public parenthesized?: boolean) {
		super(kind, token, start, width)
	}

	public setParenthesized(value: boolean = true) {
		this.parenthesized = value
	}

	public setToken(value: Production) {
		this.token = value
	}
}
