import { makeLookBackIterator } from '../../functions/decorator/makeLookBackIterator'
import * as Lang from '../../language'
import { Lexeme, Locatable } from './scanner'

export interface Token<K = Lang.Token.TokenKind> extends Locatable {
	token: K
	content?: string
}

export function* tokenize(lexemeStream: Iterator<Lexeme>): IterableIterator<Token> {
	const lexemes = makeLookBackIterator(lexemeStream)

	let result: IteratorResult<Lexeme> | undefined

	do {
		result = lexemes.next()

		if (result.done) {
			const { start = 0, width = 0 } = lexemes.last && lexemes.last ? lexemes.last.value : {}
			yield {
				token: Lang.Token.Symbolic.EOF,
				start: start + width,
				width: 0,
			}
			return
		}

		const { content, start, width } = result.value

		if (Lang.Lexeme.PUNCTUATION[content]) {
			yield { token: Lang.Lexeme.PUNCTUATION[content], start, width }
			continue
		}

		if (Lang.Lexeme.OPERATOR[content]) {
			yield { token: Lang.Lexeme.OPERATOR[content], start, width }
			continue
		}

		if (Lang.Lexeme.TYPE[content]) {
			yield { token: Lang.Lexeme.TYPE[content], start, width }
			continue
		}

		if (content === 'true') {
			yield { token: Lang.Token.Keyword.TRUE, start, width }
			continue
		}

		if (content === 'false') {
			yield { token: Lang.Token.Keyword.FALSE, start, width }
			continue
		}

		if (Lang.Lexeme.KEYWORD[content]) {
			yield { token: Lang.Lexeme.KEYWORD[content], start, width }
			continue
		}

		if (content.startsWith('"')) {
			yield { token: Lang.Token.Literal.STRING, start, width, content }
			continue
		}

		if (!isNaN(Number.parseFloat(content))) {
			yield {
				token: content.includes('.') ? Lang.Token.Literal.FLOAT : Lang.Token.Literal.NUMERIC,
				start,
				width,
				content,
			}
			continue
		}

		if (65 <= content.toUpperCase().charCodeAt(0) && content.toUpperCase().charCodeAt(0) <= 90) {
			yield { token: Lang.Token.Symbolic.IDENTIFIER, start, width, content }
		}
	} while (!result.done)
}
