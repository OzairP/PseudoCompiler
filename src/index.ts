import { readFileSync } from 'fs'
import { resolve } from 'path'
import * as Lexer from './frontend/1-lexer'
import * as Parser from './frontend/2-parser'
import { SyntaxError } from './frontend/SyntaxError'
import { createCodeFrame } from './functions/createCodeFrame'

const [entry] = process.argv.splice(2)
const path = resolve(process.cwd(), entry)
const file = readFileSync(path).toString()

try {
	const tokens = Lexer.lex(file)
	const ast = Parser.parse(tokens)

	console.log(ast)
} catch (e) {
	if (e instanceof SyntaxError) {
		console.error(createCodeFrame(file, path, e))
	}
	console.error(e)
}
