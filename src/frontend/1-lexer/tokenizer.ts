import { makeLookBackIterator } from '../../functions/decorator/makeLookBackIterator'
import * as Lang from '../../language'
import { Lexeme, Location } from './scanner'

export type Token = [Lang.Token.TokenKind, Location, string?]

export function * tokenize (lexemeStream: Iterator<Lexeme>): IterableIterator<Token> {
	const lexemes = makeLookBackIterator(lexemeStream)

	let result: IteratorResult<Lexeme> | undefined

	do {
		result = lexemes.next()

		if (result.done) {
			const [, [start, end]] = lexemes.last && lexemes.last ? lexemes.last.value : [undefined, [0, 0]]
			yield [Lang.Token.Symbolic.EOF, [start + end, 0]]
			return
		}

		const [lexeme, location] = result.value

		if (lexeme.startsWith('//')) {
			yield [Lang.Token.Comment.SINGLE, location, lexeme]
			continue
		}

		if (lexeme.startsWith('/*')) {
			yield [Lang.Token.Comment.MULTI, location, lexeme]
			continue
		}

		if (Lang.Lexeme.PUNCTUATION[lexeme]) {
			yield [Lang.Lexeme.PUNCTUATION[lexeme], location]
			continue
		}

		if (Lang.Lexeme.OPERATOR[lexeme]) {
			yield [Lang.Lexeme.OPERATOR[lexeme], location]
			continue
		}

		if (Lang.Lexeme.TYPE[lexeme]) {
			yield [Lang.Lexeme.TYPE[lexeme], location]
			continue
		}

		if (lexeme === 'true') {
			yield [Lang.Token.Keyword.TRUE, location]
			continue
		}

		if (lexeme === 'false') {
			yield [Lang.Token.Keyword.FALSE, location]
			continue
		}

		if (Lang.Lexeme.KEYWORD[lexeme]) {
			yield [Lang.Lexeme.KEYWORD[lexeme], location]
			continue
		}

		if (lexeme.startsWith('"')) {
			yield [Lang.Token.Literal.STRING, location, lexeme]
			continue
		}

		if (!isNaN(Number.parseFloat(lexeme))) {
			if (lexeme.includes('.')) {
				yield [Lang.Token.Literal.FLOAT, location, lexeme]
			} else {
				yield [Lang.Token.Literal.NUMERIC, location, lexeme]
			}
			continue
		}

		if (65 <= lexeme.toUpperCase().charCodeAt(0) && lexeme.toUpperCase().charCodeAt(0) <= 90) {
			yield [Lang.Token.Symbolic.IDENTIFIER, location, lexeme]
			continue
		}
	} while (!result.done)
}
