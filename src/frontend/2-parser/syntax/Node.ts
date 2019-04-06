import { Token } from '../../1-lexer'
import { Production } from '../transitions'
import { ExpressionKind } from './expression'

export enum Kind {
	Program,
	Block,
	Expression,
	Identifier,
	Parameter,

	VariableDeclarationStatement,
	IfStatement,
	ElseStatement,
	ElseIfStatement,
	ConditionalStatement,
	ReturnStatement,
	FunctionDeclarationStatement,

	FunctionExpression,
	AssignmentExpression,
	CallExpression,
	BinaryOperationExpression,

	BooleanLiteral,
	StringLiteral,
	NumericLiteral,
	FloatLiteral,

	VoidType,
	BoolType,
	StringType,
	Int8Type,
	Int16Type,
	Int32Type,
	Int64Type,
	Int128Type,
	UInt8Type,
	UInt16Type,
	UInt32Type,
	UInt64Type,
	UInt128Type,
	Float32Type,
	Float64Type,
	FunctionType,

	ParameterListEphemeral,
	ArgumentListEphemeral,
}

export class Node<K extends Kind = Kind> implements Token<Production> {
	public content?: string

	constructor(public kind: K, public token: Production, public start: number, public width: number) {}
}

export interface Value<T = string> {
	value: T
}

export interface Assignment {
	name: Node<Kind.Identifier>
	assignment: Node<ExpressionKind>
}
