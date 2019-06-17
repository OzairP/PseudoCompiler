import { makeAdvancingIterator } from '../../functions/decorator/makeAdvancingIterator'
import { makePeekingIterator, PeekingIterator } from '../../functions/decorator/makePeekingIterator'
import * as Lang from '../../language'
import { SyntaxError } from '../SyntaxError'

export interface Locatable {
	start: number
	width: number
}

export interface Lexeme extends Locatable {
	content: string
}

export function* scan(characterIterator: Iterator<string>): IterableIterator<Lexeme> {
	const characters = makeAdvancingIterator<string, PeekingIterator<string> & Iterator<string>>(
		makePeekingIterator<string, Iterator<string>>(characterIterator)
	)

	let result

	do {
		result = characters.next()

		if (result.done) {
			return
		}

		const char = result.value

		// Ignore empty characters like spaces, tabs, newlines
		if (char.trim() === '') {
			continue
		}

		// Single line comment
		if (char === '/' && characters.peek() === '/') {
			characters.advanceUntil(val => val === '\n')
			continue
		}

		// Multiline comment
		if (char === '/' && characters.peek() === '*') {
			characters.advanceUntil((val, peek) => val === '*' && peek() === '/')
			characters.next()
			characters.next()
			continue
		}

		// Punctuator
		if (Object.keys(Lang.Lexeme.PUNCTUATION).includes(char)) {
			const start = characters.iteration
			const lexeme = char
			yield {
				content: lexeme,
				width: lexeme.length,
				start,
			}
			continue
		}

		// LTE and GTE operator
		if ((char === '<' || char === '>') && characters.peek() === '=') {
			const start = characters.iteration
			const lexeme = char + characters.next().value
			yield {
				content: lexeme,
				width: lexeme.length,
				start,
			}
			continue
		}

		// Strict equality check
		if (char === '=' && characters.peek() === '=' && characters.peek(2) === '=') {
			const start = characters.iteration
			const lexeme = char + characters.next().value + characters.next().value
			yield {
				content: lexeme,
				width: lexeme.length,
				start,
			}
			continue
		}

		// Loose equality check
		if (char === '=' && characters.peek() === '=') {
			const start = characters.iteration
			const lexeme = char + characters.next().value
			yield {
				content: lexeme,
				width: lexeme.length,
				start,
			}
			continue
		}

		// Exponential operator
		if (char === '*' && characters.peek() === '*') {
			const start = characters.iteration
			const lexeme = char + characters.next().value
			yield {
				content: lexeme,
				width: lexeme.length,
				start,
			}
			continue
		}

		// And operator
		if (char === '&' && characters.peek() === '&') {
			const start = characters.iteration
			const lexeme = char + characters.next().value
			yield {
				content: lexeme,
				width: lexeme.length,
				start,
			}
			continue
		}

		// Or operator
		if (char === '|' && characters.peek() === '|') {
			const start = characters.iteration
			const lexeme = char + characters.next().value
			yield {
				content: lexeme,
				width: lexeme.length,
				start,
			}
			continue
		}

		// Operator
		if (
			Object.keys(Lang.Lexeme.OPERATOR)
				.filter(o => o.length === 1)
				.includes(char)
		) {
			const start = characters.iteration
			const lexeme = char
			yield {
				content: lexeme,
				width: lexeme.length,
				start,
			}
			continue
		}

		// String literal
		if (char === '"') {
			const start = characters.iteration
			const lexeme = char + characters.advanceUntil(val => val === '"').join('') + characters.next().value
			yield {
				content: lexeme,
				width: lexeme.length,
				start,
			}
			continue
		}

		// Numeric/Float literal
		if (NUMBERS.includes(char)) {
			const start = characters.iteration
			const lexeme = char + characters.advanceUntil(val => !NUMBERS.includes(val!) && val !== '.').join('')
			yield {
				content: lexeme,
				width: lexeme.length,
				start,
			}
			continue
		}

		// Word
		if (LETTERS.includes(char)) {
			const start = characters.iteration
			const lexeme = char + characters.advanceUntil(val => !ALPHANUMERIC_UNDERSCORE.includes(val!)).join('')
			yield {
				content: lexeme,
				width: lexeme.length,
				start,
			}
			continue
		}

		throw new SyntaxError(`Unexpected token ${char}`, characters.iteration, 1)
	} while (!result.done)
}

const UPPER_LETTERS = [...Array(26)].map((_, i) => String.fromCharCode(i + 65))
const LOWER_LETTERS = [...Array(26)].map((_, i) => String.fromCharCode(i + 97))
const LETTERS = [...UPPER_LETTERS, ...LOWER_LETTERS]

const NUMBERS = [...Array(10)].map((_, i) => String.fromCharCode(i + 48))
const ALPHANUMERIC = [...LETTERS, ...NUMBERS]
const ALPHANUMERIC_UNDERSCORE = [...ALPHANUMERIC, '_']
