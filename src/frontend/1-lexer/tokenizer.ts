import { makeTrackingIterator } from '../../functions/decorator/makeTrackingIterator'
import * as Lang from '../../language'
import { SyntaxError } from '../SyntaxError'
import { Lexeme } from './scanner'

export type Token = [Lang.Token.TokenKind, string?]

export function* tokenize(tokenStream: Iterator<Lexeme>): IterableIterator<Token> {
	const tokens = makeTrackingIterator(tokenStream)

	let result

	do {
		result = tokens.next()

		if (result.done) {
			break
		}

		const token = result.value

		if (token.startsWith('//')) {
			yield [Lang.Token.Comment.SINGLE_LINE, token]
			continue
		}

		if (token.startsWith('/*')) {
			yield [Lang.Token.Comment.MULTI_LINE, token]
			continue
		}

		if (Lang.Lexeme.PUNCTUATION[token]) {
			yield [Lang.Lexeme.PUNCTUATION[token]]
			continue
		}

		if (Lang.Lexeme.OPERATOR[token]) {
			yield [Lang.Lexeme.OPERATOR[token]]
			continue
		}

		if (Lang.Lexeme.TYPE[token]) {
			yield [Lang.Lexeme.TYPE[token]]
			continue
		}

		if (token === 'true') {
			yield [Lang.Token.Keyword.TRUE]
			continue
		}

		if (token === 'false') {
			yield [Lang.Token.Keyword.FALSE]
			continue
		}

		if (Lang.Lexeme.KEYWORD[token]) {
			yield [Lang.Lexeme.KEYWORD[token]]
			continue
		}

		if (token.startsWith('"')) {
			yield [Lang.Token.Literal.STRING, token]
			continue
		}

		if (!isNaN(Number.parseInt(token))) {
			yield [Lang.Token.Literal.NUMERIC, token]
			continue
		}

		if (65 <= token.toUpperCase().charCodeAt(0) && token.toUpperCase().charCodeAt(0) <= 90) {
			yield [Lang.Token.Symbolic.IDENTIFIER, token]
			continue
		}

		throw new SyntaxError(`Unexpected token ${token}`, tokens.iteration, token.length)
	} while (!result.done)

	yield [Lang.Token.Symbolic.EOF]
}
