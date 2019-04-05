import { Token } from '../../1-lexer'
import { Production } from '../transitions'

export enum Kind {
	Program,
	Block,
	Expression,
	Identifier,
	VariableDeclarationStatement,
	IfStatement,
	ElseStatement,
	ElseIfStatement,
	ConditionalStatement,
	ReturnStatement,
	FunctionDeclarationStatement,
	FunctionExpression,
	Paramater,
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
}

export class Node<K extends Kind> implements Token<Production> {
	public content?: string

	constructor(public kind: K, public token: Production, public start: number, public width: number) {}
}

export interface Value<T = string> {
	value: T
}
