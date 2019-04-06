import { readFileSync } from 'fs'
import { join } from 'path'
import { lex } from './lexer'

describe('tokenizer', () => {
	test('matches snapshot', () => {
		const code = readFileSync(join(process.cwd(), '/sample/example-01.pseudo')).toString()
		const tokens = Array.from(lex(code))

		expect(tokens).toMatchSnapshot()
	})

	test('throws error for unexpected character', () => {
		const code = `~`

		expect(() => Array.from(lex(code))).toThrow('Unexpected token')
	})

	test('EOF token location works with empty file', () => {
		const tokens = Array.from(lex(''))
		expect(tokens).toMatchObject([
			{
				token: 'eof_sym',
				start: 0,
				width: 0,
			},
		])
	})
})
