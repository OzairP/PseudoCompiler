import { Node } from '../2-parser/syntax'
import { Type } from './Type'

export class TypeInferredNode {

	constructor(public type: Type, public node: Node) {}

}
