import { useState } from 'react'

const defaultPuzzle = `
530070000
600195000
098000060
800060003
400803001
700020006
060000280
000419005
000080079
`

type Board = number[][]

const buildEmptyBoard = (): Board => Array.from({ length: 9 }, () => Array(9).fill(0))

const parsePuzzle = (raw: string): Board => {
  const digits = raw.replace(/[^0-9.]/g, '')
  if (digits.length !== 81) {
    throw new Error('81 文字の数字または "." を入力してください。')
  }
  const board = buildEmptyBoard()
  for (let i = 0; i < 81; i++) {
    const row = Math.floor(i / 9)
    const col = i % 9
    const value = digits[i] === '.' ? 0 : Number(digits[i])
    if (Number.isNaN(value) || value < 0 || value > 9) {
      throw new Error('無効な文字が含まれています。0-9 または "." のみ使用できます。')
    }
    board[row][col] = value
  }
  return board
}

const isValid = (board: Board, row: number, col: number, value: number) => {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === value || board[i][col] === value) {
      return false
    }
  }

  const boxRow = Math.floor(row / 3) * 3
  const boxCol = Math.floor(col / 3) * 3
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[boxRow + r][boxCol + c] === value) {
        return false
      }
    }
  }
  return true
}

const solveBoard = (board: Board, cell = 0): boolean => {
  if (cell === 81) {
    return true
  }
  const row = Math.floor(cell / 9)
  const col = cell % 9
  if (board[row][col] !== 0) {
    return solveBoard(board, cell + 1)
  }
  for (let value = 1; value <= 9; value++) {
    if (isValid(board, row, col, value)) {
      board[row][col] = value
      if (solveBoard(board, cell + 1)) {
        return true
      }
    }
  }
  board[row][col] = 0
  return false
}

const solveSudoku = (raw: string): Board => {
  const board = parsePuzzle(raw)
  if (!solveBoard(board)) {
    throw new Error('このパズルは解けませんでした。')
  }
  return board
}

const SudokuSolver = () => {
  const [puzzle, setPuzzle] = useState(defaultPuzzle.trim())
  const [solution, setSolution] = useState<Board | null>(null)
  const [error, setError] = useState<string | null>(null)

  return (
    <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-2xl shadow-cyan-900/40">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Sudoku</p>
        <h2 className="text-2xl font-semibold">数独リゾルバー</h2>
        <p className="text-sm text-slate-300">
          81 文字の数字と <code className="rounded bg-slate-900/60 px-2 py-1">.</code> で未入力マスを表現したパズルを貼り付け、「解く」を押してください。
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-slate-200">
          パズル入力
          <textarea
            className="min-h-[200px] rounded-2xl border border-white/10 bg-slate-950/60 p-4 font-mono text-sm text-white focus:border-cyan-400 focus:outline-none"
            value={puzzle}
            onChange={(event) => {
              setPuzzle(event.target.value)
              setSolution(null)
              setError(null)
            }}
          />
        </label>
        <div className="space-y-4">
          <button
            type="button"
            className="w-full rounded-full border border-cyan-300/60 bg-cyan-500/80 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-400"
            onClick={() => {
              try {
                const solved = solveSudoku(puzzle)
                setSolution(solved.map((row) => [...row]))
                setError(null)
              } catch (err) {
                setSolution(null)
                setError(err instanceof Error ? err.message : '不明なエラーが発生しました。')
              }
            }}
          >
            解く
          </button>
          {error ? (
            <p className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
              {error}
            </p>
          ) : solution ? (
            <div className="space-y-2">
              <p className="text-sm text-slate-300">解答</p>
              <div className="grid grid-cols-9 gap-1 text-center font-mono text-lg text-slate-900">
                {solution.flatMap((row, rowIndex) =>
                  row.map((value, colIndex) => (
                    <span
                      key={`${rowIndex}-${colIndex}`}
                      className="rounded border border-cyan-100 bg-cyan-50/90 py-1"
                    >
                      {value}
                    </span>
                  )),
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-400">解答がここに表示されます。</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default SudokuSolver
