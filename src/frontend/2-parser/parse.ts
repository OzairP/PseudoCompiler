import { makePeekingIterator } from '../../functions/decorator/makePeekingIterator'
import { Stack } from '../../functions/Stack'
import { Token } from '../1-lexer'
import { Program } from './node'
import { SyntaxKind } from './NodeMeta'
import { transitions, input, Action, reduction } from './transitions'
import { SyntaxError } from '../SyntaxError'

export function parse(tokenIterator: Iterator<Token>): Program {
	const tokens = makePeekingIterator<Token>(tokenIterator)
	const stack = new Stack<number | Token>()

	stack.push(0)

	do {
		const state = stack.lastNumber()!
		const [la = '$'] = (Array.isArray(stack.last()!) ? (stack.last() as Token)! : tokens.peek()) || []
		const inp = input[la as keyof typeof input]
		const transition = transitions[state][inp]

		// @ts-ignore
		console.log(JSON.stringify(stack.stack.filter(x => typeof x !== 'number').map(x => x[0])))

		if (transition === null) {
			const [token, location] = tokens.next().value
			throw new SyntaxError(`Unexpected token ${token}`, ...location)

		}

		const [action, transitionNumber] = transition

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
			const production = reduction[transitionNumber]
			const poppedTokens = stack
				.pop(production[1].length * 2)
				// @ts-ignore
				.filter<Token>(x => typeof x !== 'number')
			const poppedWidth = poppedTokens.reduce((sum: number, [, [, width]]: Token) => sum + width, 0)

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
