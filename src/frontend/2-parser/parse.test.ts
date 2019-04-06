import * as Lexer from '../1-lexer'
import * as Parser from './index'
import { Program } from './syntax'

const ast = (literals: TemplateStringsArray, ...placeholders: Array<string>): Program =>
	Parser.parse(Lexer.lex(String.raw(literals, ...placeholders)))

describe('parser', () => {
	describe('expression', () => {
		test('identifier', () => {
			expect(ast`a;`).toMatchSnapshot()
		})

		describe('literals', () => {
			test('string literal', () => {
				expect(ast`"hello";`).toMatchSnapshot()
			})

			test('numeric literal', () => {
				expect(ast`1;`).toMatchSnapshot()
			})

			test('float literal', () => {
				expect(ast`1.0;`).toMatchSnapshot()
			})
		})

		test('parenthesized expression', () => {
			expect(ast`(1);`).toMatchSnapshot()
		})

		describe('binary operation', () => {
			test('binary add', () => {
				expect(ast`1 + 1;`).toMatchSnapshot()
			})

			test('binary subtract', () => {
				expect(ast`1 - 1;`).toMatchSnapshot()
			})

			test('binary multiply', () => {
				expect(ast`1 * 1;`).toMatchSnapshot()
			})

			test('binary divide', () => {
				expect(ast`1 / 1;`).toMatchSnapshot()
			})

			test('binary exponentiation', () => {
				expect(ast`1 ** 1;`).toMatchSnapshot()
			})

			test('binary modulo', () => {
				expect(ast`1 % 1;`).toMatchSnapshot()
			})

			test('binary strict compare', () => {
				expect(ast`1 === 1;`).toMatchSnapshot()
			})

			test('binary equality compare', () => {
				expect(ast`1 == 1;`).toMatchSnapshot()
			})

			test('binary less than equal', () => {
				expect(ast`1 <= 1;`).toMatchSnapshot()
			})

			test('binary greater than equal', () => {
				expect(ast`1 >= 1;`).toMatchSnapshot()
			})

			test('binary less than', () => {
				expect(ast`1 < 1;`).toMatchSnapshot()
			})

			test('binary greater than', () => {
				expect(ast`1 > 1;`).toMatchSnapshot()
			})

			test('binary AND', () => {
				expect(ast`1 && 1;`).toMatchSnapshot()
			})

			test('binary OR', () => {
				expect(ast`1 || 1;`).toMatchSnapshot()
			})

			test('complex binary expression', () => {
				expect(ast`1 - 1 * 5 + 1 % 3 + (2 * 3);`).toMatchSnapshot()
			})
		})
	})

	describe('statement', () => {
		describe('variable declaration', () => {
			test('immutable inferred', () => {
				expect(ast`let foo = 1;`).toMatchSnapshot()
			})

			test('mutable inferred', () => {
				expect(ast`let mut foo = 1;`).toMatchSnapshot()
			})

			test('immutable explicit', () => {
				expect(ast`let foo: i32 = 1;`).toMatchSnapshot()
			})

			test('mutable explicit', () => {
				expect(ast`let mut foo: i32 = 1;`).toMatchSnapshot()
			})
		})

		test('return', () => {
			expect(ast`return 1;`).toMatchSnapshot()
		})

		describe('conditional statement', () => {

			test('if', () => {
				expect(ast`if (0) { 0; }`).toMatchSnapshot()
			})

			test('if else', () => {
				expect(ast`
					if (0) { 0; }
					else { 0; }
				`).toMatchSnapshot()
			})

			test('if elif', () => {
				expect(ast`
					if (0) { 0; } 
					elif (0) { 0; }
				`).toMatchSnapshot()
			})

			test('if elif else', () => {
				expect(ast`
					if (0) { 0; } 
					elif (0) { 0; }
					else { 0; }
				`).toMatchSnapshot()
			})

			test('if elif elif else', () => {
				expect(ast`
					if (0) { 0; } 
					elif (0) { 0; }
					elif (0) { 0; }
					else { 0; }
				`).toMatchSnapshot()
			})

		})
	})
})
