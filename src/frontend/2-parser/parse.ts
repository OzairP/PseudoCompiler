import { Token } from '../1-lexer'
import { Program } from './node'
import { SyntaxKind } from './NodeMeta'

export function parse (tokenIterator: Iterator<Token>): Program {
	const tokens = tokenIterator
	let result: IteratorResult<Token> | undefined

	do {
		result = tokens.next()

		if (result.done) {
			break
		}

		// @ts-ignore
		const [token, location] = result.value



	} while (!result.done)

	return {
		kind: SyntaxKind.Program,
		start: 0,
		width: 0,
		body: []
	}
}
