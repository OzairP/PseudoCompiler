import { scan } from './scanner'
import { tokenize } from './tokenizer'

export function lex(code: string) {
	return tokenize(scan(code[Symbol.iterator]()))
}
