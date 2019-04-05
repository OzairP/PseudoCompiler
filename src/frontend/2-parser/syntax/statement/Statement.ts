import { Node, Kind } from '../Node'

type StatementKind =
	| Kind.VariableDeclarationStatement
	| Kind.IfStatement
	| Kind.ElseStatement
	| Kind.ElseIfStatement
	| Kind.ConditionalStatement
	| Kind.ReturnStatement
	| Kind.FunctionDeclarationStatement

export class Statement<K extends StatementKind = StatementKind> extends Node<K> {}
