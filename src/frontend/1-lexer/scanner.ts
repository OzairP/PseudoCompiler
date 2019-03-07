import { AdvancingIterator, makeAdvancingIterator } from '../../functions/decorator/makeAdvancingIterator'
import { makePeekingIterator, PeekingIterator } from '../../functions/decorator/makePeekingIterator'
import { makeTrackingIterator, TrackingIterator } from '../../functions/decorator/makeTrackingIterator'
import * as Lang from '../../language'
import { SyntaxError } from '../SyntaxError'

export type Lexeme = string

export function* scan(characterIterator: Iterator<string>): IterableIterator<Lexeme> {
	const characters: AdvancingIterator<string> &
		PeekingIterator<string> &
		TrackingIterator &
		Iterator<string> = makeAdvancingIterator(makePeekingIterator(makeTrackingIterator(characterIterator)))

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
			yield char + characters.advanceUntil(val => val === '\n').join('')
			continue
		}

		// Multiline comment
		if (char === '/' && characters.peek() === '*') {
			yield char +
				characters.advanceUntil((val, peek) => val === '*' && peek() === '/').join('') +
				characters.next().value +
				characters.next().value
			continue
		}

		// Punctuator
		if (Object.keys(Lang.Lexeme.PUNCTUATION).includes(char)) {
			yield char
			continue
		}

		// LTE and GTE operator
		if ((char === '<' || char === '>') && characters.peek() === '=') {
			yield char + characters.next().value
			continue
		}

		// Strict equality check
		if (char === '=' && characters.peek() === '=' && characters.peek(2) === '=') {
			yield char + characters.next().value + characters.next().value
			continue
		}

		// Loose equality check
		if (char === '=' && characters.peek() === '=') {
			yield char + characters.next().value
			continue
		}

		// Exponential operator
		if (char === '*' && characters.peek() === '*') {
			yield char + characters.next().value
			continue
		}

		// Operator
		if (
			Object.keys(Lang.Lexeme.OPERATOR)
				.filter(o => o.length === 1)
				.includes(char)
		) {
			yield char
			continue
		}

		// String literal
		if (char === '"') {
			yield char + characters.advanceUntil(val => val === '"').join('') + characters.next().value
			continue
		}

		// Number literal
		if (NUMBERS.includes(char)) {
			yield char + characters.advanceUntil(val => !NUMBERS.includes(val!) && val !== '.').join('')
			continue
		}

		// Word
		if (LETTERS.includes(char)) {
			yield char + characters.advanceUntil(val => !ALPHANUMERIC_UNDERSCORE.includes(val!)).join('')
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
