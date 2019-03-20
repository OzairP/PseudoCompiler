import { Content, SyntaxKind } from '../NodeMeta'
import { Node } from '../NodeMeta'

export interface Identifier extends Node<SyntaxKind.Identifier>, Content {}
