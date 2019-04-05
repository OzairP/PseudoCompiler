import { makePeekingIterator } from '../../functions/decorator/makePeekingIterator'
import { LRStack } from '../../functions/LRStack'
import * as Lang from '../../language'
import { Token } from '../1-lexer'
import { SyntaxError } from '../SyntaxError'
import * as Syntax from './syntax'
import { Action, LR_TOKEN, Production, reduction, transitions } from './transitions'

type LRStackSymbol = Token | Token<Production> | Syntax.Node<Syntax.Kind>

export function parse(tokenIterator: Iterator<Token>): Syntax.Program {
	const tokens = makePeekingIterator<Token>(tokenIterator)
	const stack = new LRStack<LRStackSymbol>()
	// @ts-ignore
	const isSymbol: (x: LRStackSymbol | number) => x is LRStackSymbol = x => typeof x !== 'number'

	stack.push(0)

	do {
		// Last state (number)
		const state = stack.lastState()
		// Last element
		const lastEntry = stack.last()
		// Next token, if none exists $ signifies the end
		const { token: nextToken = '$' } = tokens.peek() || {}

		// If the last entry is a state then we use the next token to get the input column number
		// If not that means we reduced and haven't done a GOTO
		// so we get the input column number for our last token to get the GOTO
		const input = LR_TOKEN[isSymbol(lastEntry) ? lastEntry.token : nextToken]
		// Get the transition via the current state and input column
		const transition = transitions[state][input]

		console.log(JSON.stringify(stack.stack.filter<LRStackSymbol>(isSymbol)))

		// No such transition
		if (transition === null) {
			const { token, start, width } = tokens.next().value
			throw new SyntaxError(`Unexpected token ${token}`, start, width)
		}

		const [action, transitionNumber] = transition

		// Input has been accepted
		if (action === Action.ACCEPT) {
			break
		}

		if (action === Action.GOTO) {
			stack.push(transitionNumber)
			continue
		}

		if (action === Action.SHIFT) {
			stack.push(tokens.next().value)
			stack.push(transitionNumber)
			continue
		}

		if (action === Action.REDUCE) {
			// Get the reduced production number
			const [production, definition] = reduction[transitionNumber]
			// Pop 2x tokens where x is the number of tokens in the production derivation
			const poppedTokens = stack.pop(definition.length * 2).filter(isSymbol)
			// Sum the width from all the popped tokens, this is the new token width
			const lastPoppedToken = poppedTokens[poppedTokens.length - 1]
			const poppedWidth = lastPoppedToken.start + lastPoppedToken.width - poppedTokens[0].start

			stack.push(
				production in reducer
					? reducer[production as Production](poppedTokens, poppedWidth)
					: {
							token: production as Production,
							start: poppedTokens[0].start,
							width: poppedWidth,
					  }
			)
		}
	} while (true)

	// @ts-ignore
	return JSON.stringify(stack.stack[1], null, 2)
}

// @ts-ignore
const reducer: Record<Production, (nodes: Array<LRStackSymbol>, reductionWidth: number) => Token<Production>> = {
	[Production.PROGRAM]: function([node]): Syntax.Program {
		return new Syntax.Program(node as Syntax.Block)
	},

	[Production.BLOCK]: function([node0, node1], width): Syntax.Block {
		return new Syntax.Block(
			node0.start,
			width,
			// @ts-ignore
			node1 && node1 instanceof Syntax.Block ? [node0, ...node1.statements] : [node0]
		)
	},

	[Production.STMT]: function([node]): Syntax.Statement {
		node.token = Production.STMT
		return node as Syntax.Statement
	},

	[Production.IDEN]: function([identifier]): Syntax.Identifier {
		return new Syntax.Identifier(identifier.start, identifier.width, identifier.content!)
	},

	[Production.EXPR]: function([node]): Syntax.Expression {
		switch (node.token) {
			case Lang.Token.Literal.STRING:
				return new Syntax.StringLiteral(node.start, node.width, node.content!.slice(1, -1))
			case Lang.Token.Literal.NUMERIC:
				return new Syntax.NumericLiteral(node.start, node.width, Number.parseInt(node.content!))
			case Lang.Token.Literal.FLOAT:
				return new Syntax.FloatLiteral(node.start, node.width, Number.parseFloat(node.content!))
			case Production.PAREND_EXPR:
				;(node as Syntax.Expression).setParenthesized()
				break
			default:
				;(node as Syntax.Expression).setToken(Production.EXPR)
				break
		}

		return node as Syntax.Expression
	},

	[Production.TYPE]: function([typeKW]): Syntax.Type {
		switch (typeKW.token) {
			case Lang.Token.Type.VOID:
				return new Syntax.Type(Syntax.Kind.VoidType, typeKW.start, typeKW.width)
			case Lang.Token.Type.BOOL:
				return new Syntax.Type(Syntax.Kind.BoolType, typeKW.start, typeKW.width)
			case Lang.Token.Type.STRING:
				return new Syntax.Type(Syntax.Kind.StringType, typeKW.start, typeKW.width)
			case Lang.Token.Type.INT8:
				return new Syntax.Type(Syntax.Kind.Int8Type, typeKW.start, typeKW.width)
			case Lang.Token.Type.INT16:
				return new Syntax.Type(Syntax.Kind.Int16Type, typeKW.start, typeKW.width)
			case Lang.Token.Type.INT32:
				return new Syntax.Type(Syntax.Kind.Int32Type, typeKW.start, typeKW.width)
			case Lang.Token.Type.INT64:
				return new Syntax.Type(Syntax.Kind.Int64Type, typeKW.start, typeKW.width)
			case Lang.Token.Type.INT128:
				return new Syntax.Type(Syntax.Kind.Int128Type, typeKW.start, typeKW.width)
			case Lang.Token.Type.UINT8:
				return new Syntax.Type(Syntax.Kind.UInt8Type, typeKW.start, typeKW.width)
			case Lang.Token.Type.UINT16:
				return new Syntax.Type(Syntax.Kind.UInt16Type, typeKW.start, typeKW.width)
			case Lang.Token.Type.UINT32:
				return new Syntax.Type(Syntax.Kind.UInt32Type, typeKW.start, typeKW.width)
			case Lang.Token.Type.UINT64:
				return new Syntax.Type(Syntax.Kind.UInt64Type, typeKW.start, typeKW.width)
			case Lang.Token.Type.UINT128:
				return new Syntax.Type(Syntax.Kind.UInt128Type, typeKW.start, typeKW.width)
			case Lang.Token.Type.FLOAT32:
				return new Syntax.Type(Syntax.Kind.Float32Type, typeKW.start, typeKW.width)
			case Lang.Token.Type.FLOAT64:
				return new Syntax.Type(Syntax.Kind.Float64Type, typeKW.start, typeKW.width)
		}
		throw Error(`Expected node in Type reducer to be a type token but got ${JSON.stringify(typeKW)}`)
	},

	[Production.BIN_OP_EXPR]: function(nodes): Syntax.BinaryOperationExpression {
		return (nodes[1] as Syntax.BinaryOperationExpressionTail).attach(nodes[0] as Syntax.Expression)
	},

	[Production.BIN_OP_EXPR_TAIL]: function(nodes, width): Syntax.BinaryOperationExpressionTail {
		return new Syntax.BinaryOperationExpressionTail(
			nodes[0].start,
			width,
			nodes[0].token as Lang.Token.Operator,
			nodes[1] as Syntax.Expression
		)
	},

	[Production.VAR_DEC_STMT]: function(nodes, width): Syntax.VariableDeclarationStatement {
		const { start } = nodes[0]

		// Shift let keyword
		nodes.shift()
		// Shift mut keyword if it exists
		const isMutable = Boolean(nodes[0].token === Lang.Token.Keyword.MUT && nodes.shift())
		// @ts-ignore
		const identifier: Syntax.Identifier = nodes.shift()!
		// Shift colon and type if a colon exists, if not then there is no type declared
		// @ts-ignore
		const type: undefined | Syntax.Type =
			nodes[0].token === Lang.Token.Punctuation.COLON ? (nodes.shift(), nodes.shift()) : undefined
		// Shift assignment operator
		nodes.shift()
		// @ts-ignore
		const expression: Syntax.Expression = nodes.shift()!

		return new Syntax.VariableDeclarationStatement(start, width, isMutable, type, identifier, expression)
	},
}
