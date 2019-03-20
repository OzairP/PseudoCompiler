import { Content, SyntaxKind } from '../NodeMeta'
import { Expression } from './Expression'

type LiteralKind =
	| SyntaxKind.BooleanLiteral
	| SyntaxKind.StringLiteral
	| SyntaxKind.NumericLiteral
	| SyntaxKind.FloatLiteral

type LiteralContentType<T extends LiteralKind> = T extends SyntaxKind.BooleanLiteral
	? boolean
	: T extends SyntaxKind.StringLiteral
	? string
	: T extends SyntaxKind.NumericLiteral
	? number
	: T extends SyntaxKind.FloatLiteral
	? number
	: never

export interface Literal<T extends LiteralKind> extends Expression<T>, Content<LiteralContentType<T>> {}
