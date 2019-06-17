import {
	AssignmentExpression,
	BinaryOperationExpression,
	Block,
	CallExpression,
	FunctionDeclarationStatement,
	FunctionExpression,
	Identifier,
	IfStatement,
	Kind,
	Literal,
	Node,
	Parameter,
	Program,
	ReturnStatement,
	StringLiteral,
	VariableDeclarationStatement,
} from '../../01-frontend/2-parser/syntax'
import * as Lang from '../../language'

const ind = (level: number) => ''.padStart(level, '\t')

export function t(node: Node, i: number = 0): string {
	if (node instanceof Program) {
		return `"use strict";\nconst print = console.log;\n\n${node.statements.map(t).join('\n')}`
	} else if (node instanceof Block) {
		return node.statements.map(s => `${ind(i)}${t(s)};`).join('\n')
	} else if (node instanceof Identifier) {
		return node.name
	} else if (node instanceof StringLiteral) {
		return `"${node.value.replace(/\n/g, '\\n')}"`
	} else if (node instanceof Literal) {
		return node.value.toString()
	} else if (node instanceof Parameter) {
		return t(node.identifier)
	} else if (node instanceof BinaryOperationExpression) {
		return `${t(node.lhs)} ${transpileOperator(node.operator)} ${t(node.rhs)}`
	} else if (node instanceof AssignmentExpression) {
		return `${t(node.name)} = ${t(node.assignment)}`
	} else if (node instanceof CallExpression) {
		return `${t(node.name)}(${node.args.map(t).join(', ')})`
	} else if (node instanceof FunctionExpression) {
		return `(${node.parameters.map(t).join(', ')}) => {\n${t(node.body, i + 1)}\n}`
	} else if (node instanceof VariableDeclarationStatement) {
		return `${node.mutable ? 'let' : 'const'} ${t(node.name)} = ${t(node.assignment)};`
	} else if (node instanceof FunctionDeclarationStatement) {
		return `function ${t(node.name)} (${node.parameters.map(t).join(', ')}) {\n${t(node.body, i + 1)}\n};`
	} else if (node instanceof ReturnStatement) {
		return `return ${t(node.expression)};`
	} else if (node instanceof IfStatement) {
		return `if (${t(node.condition)}) {\n${t(node.body, i + 1)}\n}`
	}

	throw new Error(`Unhandled Syntax Kind, ${Kind[node.kind]}.\n${JSON.stringify(node)}`)
}

export function transpileOperator(operator: Lang.Token.Operator) {
	switch (operator) {
		case Lang.Token.Operator.STRICT_COMP:
			return '==='
		case Lang.Token.Operator.EQUALITY_COMP:
			return '=='
		case Lang.Token.Operator.LESS_THAN_EQL:
			return '<='
		case Lang.Token.Operator.GREATER_THAN_EQL:
			return '>='
		case Lang.Token.Operator.LESS_THAN:
			return '<'
		case Lang.Token.Operator.GREATER_THAN:
			return '>'
		case Lang.Token.Operator.EXPONENTIAL:
			return '**'
		case Lang.Token.Operator.ASSIGNMENT:
			return '='
		case Lang.Token.Operator.PLUS:
			return '+'
		case Lang.Token.Operator.MINUS:
			return '-'
		case Lang.Token.Operator.MULTIPLY:
			return '*'
		case Lang.Token.Operator.DIVIDE:
			return '/'
		case Lang.Token.Operator.MODULO:
			return '%'
		case Lang.Token.Operator.AND:
			return '&&'
		case Lang.Token.Operator.OR:
			return '||'
	}
}

export function codegen(ast: Program) {
	let code = t(ast)

	console.log(code)
}
