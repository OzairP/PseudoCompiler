# Pseudo Lang

## Aspects

### Comments

```
// Comment

/*
	Multi
	line
*/
```

### Primitive Data Types

-   `string`
-   `bool`

#### Numeric Types

Integer

| Length  | Signed | Unsigned |
| ------- | ------ | -------- |
| 8-bit   | `i8`   | `ui8`    |
| 16-bit  | `i16`  | `ui16`   |
| 32-bit  | `i32`  | `ui32`   |
| 64-bit  | `i64`  | `ui64`   |
| 128-bit | `i128` | `ui128`  |

Float

| Length | Signed |
| ------ | ------ |
| 32-bit | `f32`  |
| 64-bit | `f64`  |

### Variable Assignment

```
let bar = true; // invariant, inferred
let mut foo = "bar"; // variable, inferred

let bar: bool = true;  // invariant, explicit
let mut foo: string = "bar"; // variable, explicit
```

### Functions

```
// Function declaration
func sum (i32 a, i32 b): i32 {
	return a + b;
}

// Anonymous function
let sum = func (i32 a, i32 b): i32 {
	return a + b
}

// Accepting mutable parameters
func increment (mut i32 a): void {
	a = a + 1
}
```

## Grammar

### Production Rules

#### Terminal Symbol

These types are defined in `/src/language/token.ts`.
| Suffix | Token Type |
| ------ | ---------- |
| `_TYPE` | Data type keyword |
| `_KW` | Keyword |
| `_OP` | Operator |
| `_PNC` | Punctuation |
| `_LIT` | Literal |
| `_CMT` | Comment |
| `_SYM` | Symbol/Symbolic |

#### Non-Terminal Symbol

| Suffix | Meaning     | Description                                    |
| ------ | ----------- | ---------------------------------------------- |
| `STMT` | Statement   | Language constructs + expressions              |
| `EXPR` | Expression  | One or many set of evaluations                 |
| `DEC`  | Declaration | Declaration of a symbol (variables, functions) |

#### Production Rules

```
PROGRAM → BLOCK EOF_SYM
BLOCK → STMT STMT
BLOCK → BLOCK STMT
STMT → EXPR | COND_STMT | VAR_DEC_STMT
EXPR → IDEN | LITERAL | BIN_OP_EXPR | RETURN_EXPR | CALL_EXPR | FUNC_EXPR

COMMENT → SINGLE_COMMENT | MULTI_COMMENT
IDEN → IDEN_SYM
LITERAL → STRING_LIT | NUMERIC_LIT | FLOAT_LIT | TRUE_KW | FALSE_KW
TYPE → VOID_TYPE | BOOL_TYPE | STRING_TYPE | INT_TYPE | INT8_TYPE | INT16_TYPE
        | INT32_TYPE | INT64_TYPE | INT128_TYPE | UINT8_TYPE | UINT16_TYPE | UINT32_TYPE
        | UINT64_TYPE | UINT128_TYPE | FLOAT32_TYPE | FLOAT64_TYPE

## === Binary Op Expression ===
## EXPR + EXPR
BIN_OP_EXPR → EXPR PLUS_OP EXPR
## EXPR - EXPR
BIN_OP_EXPR → EXPR MINUS_OP EXPR
## EXPR * EXPR
BIN_OP_EXPR → EXPR MULTIPLY_OP EXPR
## EXPR / EXPR
BIN_OP_EXPR → EXPR DIVIDE_OP EXPR
## EXPR ** EXPR
BIN_OP_EXPR → EXPR EXPONENTIATION EXPR
## EXPR % EXPR
BIN_OP_EXPR → EXPR MODULO_OP EXPR
## EXPR === EXPR
BIN_OP_EXPR → EXPR STRICT_CMP_OP EXPR
## EXPR == EXPR
BIN_OP_EXPR → EXPR EQUALITY_CMP_OP EXPR
## EXPR <= EXPR
BIN_OP_EXPR → EXPR LESS_THAN_EQL_OP EXPR
## EXPR >= EXPR
BIN_OP_EXPR → EXPR GREATER_THAN_EQL_OP EXPR
## EXPR < EXPR
BIN_OP_EXPR → EXPR LESS_THAN_OP EXPR
## EXPR > EXPR
BIN_OP_EXPR → EXPR GREATER_THAN_OP EXPR

## === Return Expression ===
RETURN_EXPR → RETURN_KW EXPR

## === Call Expression ===
## IDEN()
CALL_EXPR → IDEN O_PAREN_PNC C_PAREN_PNC SEMI_PNC
## IDEN(EXPR)
CALL_EXPR → IDEN O_PAREN_PNC EXPR C_PAREN_PNC SEMI_PNC
## IDEN(EXPR, EXPR)
CALL_EXPR → IDEN O_PAREN_PNC ARGS C_PAREN_PNC SEMI_PNC

ARGS → EXPR ARG_TAIL
ARGS → ARGS ARG_TAIL
ARG_TAIL → COMMA_PNC EXPR

## === Conditional Statement ===
## if (EXPR) { BLOCK }
IF_STMT → IF_KW O_PAREN_PNC BIN_OP_EXPR C_PAREN_PNC O_BRACE_PNC BLOCK C_BRACE_PNC
## else { BLOCK }
ELSE_STMT → ELSE_KW O_BRACE_PNC BLOCK C_BRACE_PNC
## elif (EXPR) { BLOCK }
ELIF_STMT → ELIF_KW O_PAREN_PNC BIN_OP_EXPR C_PAREN_PNC O_BRACE_PNC BLOCK C_BRACE_PNC

IF_STMT → IF_STMT ELIF_STMT
COND_STMT → IF_STMT ELSE_STMT

## === Variable Declaration Statement ===
## let IDEN = EXPR;
VAR_DEC_STMT → LET_KW IDEN ASSIGN_OP EXPR SEMI_PNC
## let mut IDEN = EXPR;
VAR_DEC_STMT → LET_KW MUT_KW IDEN ASSIGN_OP EXPR SEMI_PNC
## let IDEN: TYPE = EXPR;
VAR_DEC_STMT → LET_KW IDEN COLON_PNC TYPE ASSIGN_OP EXPR SEMI_PNC
## let mut IDEN: TYPE = EXPR;
VAR_DEC_STMT → LET_KW MUT_KW IDEN COLON_PNC TYPE ASSIGN_OP EXPR SEMI_PNC

## === Function Declaration Statement & Function Expression ===
## func IDEN (): TYPE { BLOCK }
FUNC_DEC_STMT → FUNC_KW IDEN O_PAREN_PNC C_PAREN_PNC COLON_PNC O_BRACE_PNC BLOCK C_BRACE_PNC
## func IDEN (PARAMS): TYPE { BLOCK }
FUNC_DEC_STMT → FUNC_KW IDEN O_PAREN_PNC PARAMS C_PAREN_PNC COLON_PNC O_BRACE_PNC BLOCK C_BRACE_PNC
## func (): TYPE { BLOCK }
FUNC_EXPR → FUNC_KW O_PAREN_PNC C_PAREN_PNC COLON_PNC O_BRACE_PNC BLOCK C_BRACE_PNC
## func (PARAMS): TYPE { BLOCK }
FUNC_EXPR → FUNC_KW O_PAREN_PNC PARAMS C_PAREN_PNC COLON_PNC O_BRACE_PNC BLOCK C_BRACE_PNC

PARAMS → PARAM PARAM_TAIL
PARAMS → PARAMS PARAM_TAIL
PARAM → IMMUT_PARAM | MUT_PARAM
IMMUT_PARAM → TYPE IDEN
MUT_PARAM → MUT_KW IMMUT_PARAM
PARAM_TAIL → COMMA_PNC PARAM
```
