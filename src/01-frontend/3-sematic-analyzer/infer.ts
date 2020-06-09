// import { AssignmentExpression, CallExpression, FunctionExpression, Kind, Node } from '../2-parser/syntax'
// import { Type } from './Type'
// import { TypeInferredNode } from './TypeInferredNode'
//
// export function infer (node: Node) {
//
// 	switch (node.kind) {
//
// 		case Kind.FunctionExpression:
// 			return infer((node as FunctionExpression).returnType)
// 		case Kind.AssignmentExpression:
// 			return infer((node as AssignmentExpression).assignment)
// 		case Kind.CallExpression:
// 			return infer((node as CallExpression).)
//
// 		case Kind.BooleanLiteral:
// 			return new TypeInferredNode(Type.BOOL, node)
// 		case Kind.StringLiteral:
// 			return new TypeInferredNode(Type.STRING, node)
// 		case Kind.NumericLiteral:
// 			return new TypeInferredNode(Type.FLEX_INT, node)
// 		case Kind.FloatLiteral:
// 			return new TypeInferredNode(Type.FLEX_FLOAT, node)
//
// 	}
//
// }
