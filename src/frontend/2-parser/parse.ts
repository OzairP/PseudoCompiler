import { makePeekingIterator } from '../../functions/decorator/makePeekingIterator'
import { LRStack } from '../../functions/LRStack'
import { Token } from '../1-lexer'
import { Program } from './node'
import { SyntaxKind } from './NodeMeta'
import { transitions, Action, reduction, LR_TOKEN } from './transitions'
import { SyntaxError } from '../SyntaxError'

export function parse(tokenIterator: Iterator<Token>): Program {
	const tokens = makePeekingIterator<Token>(tokenIterator)
	// @ts-ignore
	const isToken: (x) => x is Token = x => Array.isArray(x)
	const stack = new LRStack<Token | Token<LR_TOKEN>>(isToken)

	stack.push(0)

	do {
		// Last state (number)
		const state = stack.lastState()
		// Last element
		const lastEntry = stack.last()
		// Next token, if none exists $ signifies the end
		const [nextToken = '$'] = tokens.peek() || []

		// If the last entry is a token that means we reduced and haven't done a GOTO
		// so we get the input column number for our last token to get the GOTO
		// If not, we use the next token to get the input column number
		const input = LR_TOKEN[isToken(lastEntry) ? lastEntry[0] : nextToken]
		// Get the transition via the current state and input column
		const transition = transitions[state][input]

		console.log(JSON.stringify(stack.stack))

		// No such transition
		if (transition === null) {
			const [token, location] = tokens.next().value
			throw new SyntaxError(`Unexpected token ${token}`, ...location)
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
			const production = reduction[transitionNumber]
			// Pop 2x tokens where x is the number of tokens in the production derivation
			const poppedTokens = stack.pop(production[1].length * 2).filter(isToken)
			// Sum the width from all the popped tokens, this is the new token width
			const poppedWidth = poppedTokens[poppedTokens.length - 1][1].reduce((a, b) => a + b) - poppedTokens[0][1][0]

			stack.push([production[0], [poppedTokens[0][1][0], poppedWidth]] as Token)
			continue
		}
	} while (true)

	return {
		kind: SyntaxKind.Program,
		start: 0,
		width: 0,
		body: [],
	}
}
