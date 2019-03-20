import { Content, Node, SyntaxKind } from '../NodeMeta'

type CommentKind = SyntaxKind.SingleLineComment | SyntaxKind.MultiLineComment
type CommentContentType<T extends CommentKind> = T extends SyntaxKind.SingleLineComment
	? string
	: T extends SyntaxKind.MultiLineComment
		? Array<string>
		: never

export interface Comment<T extends CommentKind> extends Node<T>, Content<CommentContentType<T>> {
}
