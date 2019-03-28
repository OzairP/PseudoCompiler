export type TokenKind = Type | Keyword | Operator | Punctuation | Literal | Symbolic

export enum Type {
	VOID = 'void_type',
	BOOL = 'bool_type',
	STRING = 'string_type',

	INT8 = 'int8_type',
	INT16 = 'int16_type',
	INT32 = 'int32_type',
	INT64 = 'int64_type',
	INT128 = 'int128_type',

	UINT8 = 'uint8_type',
	UINT16 = 'uint16_type',
	UINT32 = 'uint32_type',
	UINT64 = 'uint64_type',
	UINT128 = 'uint128_type',

	FLOAT32 = 'float32_type',
	FLOAT64 = 'float64_type',
}

export enum Keyword {
	LET = 'let_kw',
	MUT = 'mut_kw',
	FUNC = 'func_kw',
	RETURN = 'return_kw',
	IF = 'if_kw',
	ELIF = 'elif_kw',
	ELSE = 'else_kw',
	TRUE = 'true_kw',
	FALSE = 'false_kw',
}

export enum Operator {
	STRICT_COMP = 'strict_cmp_op',
	EQUALITY_COMP = 'equality_cmp_op',
	LESS_THAN_EQL = 'less_than_eql_op',
	GREATER_THAN_EQL = 'greater_than_eql_op',
	LESS_THAN = 'less_than_op',
	GREATER_THAN = 'greater_than_op',
	EXPONENTIAL = 'exponentiation_op',
	ASSIGNMENT = 'assign_op',
	PLUS = 'plus_op',
	MINUS = 'minus_op',
	MULTIPLY = 'multiply_op',
	DIVIDE = 'divide_op',
	MODULO = 'modulo_op',
	AND = 'and_op',
	OR = 'or_op',
}

export enum Punctuation {
	SEMICOLON = 'semi_pnc',
	COLON = 'colon_pnc',
	COMMA = 'comma_pnc',
	OPEN_BRACE = 'o_brace_pnc',
	CLOSE_BRACE = 'c_brace_pnc',
	OPEN_PAREN = 'o_paren_pnc',
	CLOSE_PAREN = 'c_paren_pnc',
}

export enum Literal {
	STRING = 'string_lit',
	NUMERIC = 'numeric_lit',
	FLOAT = 'float_lit',
}

export enum Symbolic {
	IDENTIFIER = 'identifier_sym',
	EOF = 'eof_sym',
}
