import { Node, SyntaxKind } from '../NodeMeta'

export interface Expression<T extends SyntaxKind> extends Node<T> {}
