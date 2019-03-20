import * as Lang from '../../../language'
import { Node, SyntaxKind } from '../NodeMeta'
import { Expression } from './Expression'
import { Identifier } from './Identifier'

export interface VariableDeclaration extends Node<SyntaxKind.VariableDeclaration> {
	constant: boolean
	mutable: boolean
	type: Lang.Token.Type
	identifier: Identifier
	initializer: Expression<any>
}
