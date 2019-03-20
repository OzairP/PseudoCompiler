import * as Token from './token'

export const TYPE: Record<string, Token.Type> = {
	['void']: Token.Type.VOID,
	['bool']: Token.Type.BOOL,
	['string']: Token.Type.STRING,

	['i8']: Token.Type.INT8,
	['i16']: Token.Type.INT16,
	['i32']: Token.Type.INT32,
	['i64']: Token.Type.INT64,
	['i128']: Token.Type.INT128,

	['ui8']: Token.Type.UINT8,
	['ui16']: Token.Type.UINT16,
	['ui32']: Token.Type.UINT32,
	['ui64']: Token.Type.UINT64,
	['ui128']: Token.Type.UINT128,

	['f32']: Token.Type.FLOAT32,
	['f64']: Token.Type.FLOAT64,
}

export const KEYWORD: Record<string, Token.Keyword> = {
	['let']: Token.Keyword.LET,
	['mut']: Token.Keyword.MUT,
	['func']: Token.Keyword.FUNC,
	['return']: Token.Keyword.RETURN,
	['if']: Token.Keyword.IF,
	['elif']: Token.Keyword.ELIF,
	['else']: Token.Keyword.ELSE,
	['true']: Token.Keyword.TRUE,
	['false']: Token.Keyword.FALSE,
}

export const OPERATOR: Record<string, Token.Operator> = {
	['===']: Token.Operator.STRICT_COMP,
	['==']: Token.Operator.EQUALITY_COMP,
	['<=']: Token.Operator.LESS_THAN_EQL,
	['>=']: Token.Operator.GREATER_THAN_EQL,
	['<']: Token.Operator.LESS_THAN,
	['>']: Token.Operator.GREATER_THAN,
	['**']: Token.Operator.EXPONENTIAL,
	['=']: Token.Operator.ASSIGNMENT,
	['+']: Token.Operator.PLUS,
	['-']: Token.Operator.MINUS,
	['*']: Token.Operator.MULTIPLY,
	['/']: Token.Operator.DIVIDE,
	['%']: Token.Operator.MODULO,
	['&&']: Token.Operator.AND,
	['||']: Token.Operator.OR,
}

export const PUNCTUATION: Record<string, Token.Punctuation> = {
	[';']: Token.Punctuation.SEMICOLON,
	[':']: Token.Punctuation.COLON,
	[',']: Token.Punctuation.COMMA,
	['{']: Token.Punctuation.OPEN_BRACE,
	['}']: Token.Punctuation.CLOSE_BRACE,
	['(']: Token.Punctuation.OPEN_PAREN,
	[')']: Token.Punctuation.CLOSE_PAREN,
}
