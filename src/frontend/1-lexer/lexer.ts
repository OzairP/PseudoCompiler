import { scan } from './scanner'
import { Token, tokenize } from './tokenizer'

export function* lex(code: string): IterableIterator<Token> {
	yield* tokenize(scan(code[Symbol.iterator]()))
}
