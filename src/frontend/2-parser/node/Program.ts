import { SyntaxKind } from '../NodeMeta'
import { Node } from '../NodeMeta'

export interface Program extends Node<SyntaxKind.Program> {
	body: Array<Node<any>>
}
