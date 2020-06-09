export enum Type {

	VOID,
	BOOL,
	STRING,

	// Flex int's are not a specific type, but are castable depending on their
	// context. For example "let a = 2;", 2 will be cast to i32
	// and in "let a: i64 = 2;", 2 will be cast to i64 without specifying
	FLEX_INT,
	INT8,
	INT16,
	INT32,
	INT64,
	INT128,

	UINT8,
	UINT16,
	UINT32,
	UINT64,
	UINT128,

	FLEX_FLOAT,
	FLOAT32,
	FLOAT64,

}
