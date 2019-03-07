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
