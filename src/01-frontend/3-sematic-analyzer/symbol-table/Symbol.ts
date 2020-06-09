import { TypeKind } from '../../2-parser/syntax'

export class Symbol {
	constructor(public id: number, public name: string, public type: TypeKind) {}
}

