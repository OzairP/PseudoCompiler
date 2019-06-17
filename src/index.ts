import { readFileSync } from 'fs'
import { resolve } from 'path'
import * as Lexer from './01-frontend/1-lexer'
import * as Parser from './01-frontend/2-parser'
// import { SyntaxError } from './01-frontend/SyntaxError'
import { codegen } from './02-backend/01-codegen/javascript'
// import { createCodeFrame } from './functions/createCodeFrame'

const [entry] = process.argv.splice(2)
const path = resolve(process.cwd(), entry)
const file = readFileSync(path).toString()

try {
	// const tokens = Lexer.lex(`
	// let foo = "hello";
	// let mut bar = 1 + 4;
	// `)
	const tokens = Lexer.lex(file)
	const ast = Parser.parse(tokens)
	console.log(JSON.stringify(ast, null, 2))
	codegen(ast)
} catch (e) {
	// if (e instanceof SyntaxError) {
		// console.error(createCodeFrame(file, path, e))
	// }
	console.error(e)
}
