import { Production } from '../transitions'
import { Kind, Node } from './Node'

type TypeKind =
	| Kind.VoidType
	| Kind.BoolType
	| Kind.StringType
	| Kind.Int8Type
	| Kind.Int16Type
	| Kind.Int32Type
	| Kind.Int64Type
	| Kind.Int128Type
	| Kind.UInt8Type
	| Kind.UInt16Type
	| Kind.UInt32Type
	| Kind.UInt64Type
	| Kind.UInt128Type
	| Kind.Float32Type
	| Kind.Float64Type
	| Kind.FunctionType

export class Type<K extends TypeKind = TypeKind> extends Node<K> {
	constructor(public kind: K, public start: number, public width: number) {
		super(kind, Production.TYPE, start, width)
	}
}
