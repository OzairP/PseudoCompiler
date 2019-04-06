// import { readFileSync } from 'fs'
// import { resolve } from 'path'
import * as Lexer from './frontend/1-lexer'
import * as Parser from './frontend/2-parser'

// const [entry] = process.argv.splice(2)
// const path = resolve(process.cwd(), entry)
// const file = readFileSync(path).toString()

// const tokens = Lexer.lex(file)
const tokens = Lexer.lex(`
let a = func ((i32 a, i32 b): i32 a): i32 {
	0;
};
`)
// console.log(Array.from(tokens).map(({ token }) => token).join(' '))
const ast = Parser.parse(tokens)

console.log(ast)
