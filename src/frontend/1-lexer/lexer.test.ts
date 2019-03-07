import { readFileSync } from 'fs'
import { join } from 'path'
import { SyntaxError } from '../SyntaxError'
import { lex } from './lexer'

describe('tokenizer', () => {
	test('matches snapshot', () => {
		const code = readFileSync(join(process.cwd(), '/sample/example-01.pseudo')).toString()
		const tokens = Array.from(lex(code))

		expect(tokens).toMatchSnapshot()
	})

	test('throws error for unexpected character', () => {
		const code = `~`

		expect(() => Array.from(lex(code))).toThrow(SyntaxError)
	})
})
