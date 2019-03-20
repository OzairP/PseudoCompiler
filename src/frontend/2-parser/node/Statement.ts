import { Node, SyntaxKind } from '../NodeMeta'

export interface Statement<T extends SyntaxKind> extends Node<T> {}
