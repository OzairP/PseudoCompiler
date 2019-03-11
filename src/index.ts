import { readFileSync } from 'fs'
import { resolve } from 'path'
// import { createCodeFrame } from './functions/createCodeFrame'
// import { SyntaxError } from './frontend/SyntaxError'
import * as Lexer from './frontend/1-lexer'

const [entry] = process.argv.splice(2)
const path = resolve(process.cwd(), entry)
const file = readFileSync(path).toString()

const tokens = Lexer.lex(file)

for (const x of tokens) {
	console.log(x)
}

// console.log(createCodeFrame(file, path, new SyntaxError('Unexpected token let', 22, 3)))
