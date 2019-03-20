export enum SyntaxKind {
	Program,
	Statement,
	Expression,

	SingleLineComment,
	MultiLineComment,

	Identifier,
	BooleanLiteral,
	StringLiteral,
	NumericLiteral,
	FloatLiteral,

	VariableDeclaration,
	CallExpression,

	EndOfFile,
}

export interface Node<T extends SyntaxKind> {
	kind: T
	start: number
	width: number
}

export interface Content<T = any> {
	content: T
}
