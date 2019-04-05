import chalk from 'chalk'
import { SyntaxError } from '../frontend/SyntaxError'

const toStringWidth = (line: string) => line.length + 1

const toRunningSums = (num: number, ind: number, arr: Array<number>) =>
	arr.slice(0, ind).reduce((sum, n) => sum + n, 0) + num

const isBetweenLast = (val: number) => (num: number, ind: number, arr: Array<number>) =>
	arr[ind - 1] <= val && val <= num

const charOffsetToColumn = (offset: number, runningSum: number = 0) => offset - runningSum

const offsetToLineCol = (lines: Array<string>, charOffset: number) => {
	const runningLineWidth = lines.map(toStringWidth).map(toRunningSums)
	const line = runningLineWidth.findIndex(isBetweenLast(charOffset))
	const column = charOffsetToColumn(charOffset, runningLineWidth[line - 1])

	return { line, column }
}

const getElementRelative = (lines: Array<string>, origin: number, relative: number) => {
	if (relative >= 0) {
		return lines.slice(origin + 1, origin + relative + 1).map((line, ind) => ({
			line,
			lineNum: origin + (ind + 1),
		}))
	} else {
		const start = origin + relative
		return lines
			.slice(start >= 0 ? start : 0, origin)
			.reverse()
			.map((line, ind) => ({
				line,
				lineNum: origin - (ind + 1),
			}))
			.reverse()
	}
}

const frameLine = (padding: number) => ({ line, lineNum }: { line: string; lineNum: number }) =>
	chalk`{italic.gray ${lineNum.toString().padStart(padding)} |}   ${line}\n`

export function createCodeFrame(code: string, file: string, error: SyntaxError) {
	const lines = code.split('\n')
	const { line, column } = offsetToLineCol(lines, error.offset)
	const window = createCodeWindow(lines, line, column, error.width)
		.split('\n')
		.map(l => `\t${l}`)
		.join('\n')

	return chalk`
{bold.redBright ${error.name}}: ${error.message}
	— {greenBright ${file}:${line.toString()}:${column.toString()}}
${window}`
}

export function createCodeWindow(lines: Array<string>, line: number, column: number, width: number) {
	const distance = 2
	const linesAbove = getElementRelative(lines, line, distance * -1)
	const linesBelow = getElementRelative(lines, line, distance)

	const longestLineNumber = (linesBelow.length !== 0
		? linesBelow
		: linesAbove.length !== 0
		? linesAbove
		: [{ line: '', lineNum: 0 }]
	)
		.map(l => l.lineNum)
		.sort()
		.reverse()[0]
		.toString().length

	const framer = frameLine(longestLineNumber)

	const errorTickPad = ''.padStart(column)
	const errorTicks = ''.padStart(width, '^')
	const errorTick = framer({
		line: chalk`${errorTickPad}{bold.redBright ${errorTicks}}`,
		// @ts-ignore
		lineNum: '',
	})
	return (
		linesAbove.map(framer).join('') +
		framer({ line: lines[line], lineNum: line }) +
		errorTick +
		linesBelow.map(framer).join('')
	)
}
