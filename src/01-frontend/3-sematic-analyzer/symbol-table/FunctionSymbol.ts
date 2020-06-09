import { Kind, TypeKind } from '../../2-parser/syntax'
import { Symbol } from './Symbol'

export class FunctionSymbol extends Symbol {
	constructor (id: number, name: string, type: Kind.FunctionType, public returnType: TypeKind) {
		super(id, name, type)
	}
}
