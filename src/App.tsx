import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

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

function App() {
  const [count, setCount] = useState(0)
  const [puzzle, setPuzzle] = useState(defaultPuzzle.trim())
  const [solution, setSolution] = useState<Board | null>(null)
  const [error, setError] = useState<string | null>(null)
  const resources = [
    {
      title: 'Vite Docs',
      description: '即時 HMR を備えた開発者体験重視のツールチェーン。',
      link: 'https://vite.dev',
    },
    {
      title: 'React Docs',
      description: 'インタラクティブなアプリを構築するための宣言的な UI プリミティブ。',
      link: 'https://react.dev',
    },
    {
      title: 'Tailwind Docs',
      description: '表現力豊かなデザインシステムを提供するユーティリティファーストなスタイル。',
      link: 'https://tailwindcss.com',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-16 md:px-10">
        <header className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-6">
            <a
              href="https://vite.dev"
              target="_blank"
              rel="noreferrer"
              className="group rounded-full border border-white/10 bg-white/5 p-4 transition hover:border-violet-400/60 hover:bg-violet-400/10"
            >
              <img
                src={viteLogo}
                alt="Vite logo"
                className="h-16 w-16 transition group-hover:scale-105"
              />
            </a>
            <a
              href="https://react.dev"
              target="_blank"
              rel="noreferrer"
              className="group rounded-full border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/60 hover:bg-cyan-400/10"
            >
              <img
                src={reactLogo}
                alt="React logo"
                className="h-16 w-16 animate-spin"
              />
            </a>
          </div>
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-violet-300/70">
              Vite・React・Tailwind CSS
            </p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              次のアイデアをすぐ形にできるモダンなスターター
            </h1>
            <p className="text-base text-slate-300 md:text-lg">
              Tailwind CSS のセットアップが完了しました。React コンポーネントのまま、
              表現力のあるユーティリティクラスでインターフェースを組み立てましょう。
            </p>
          </div>
        </header>

        <section className="rounded-3xl border border-white/5 bg-white/5 p-8 shadow-2xl shadow-violet-900/30">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-violet-300/70">
                インタラクティブデモ
              </p>
              <h2 className="text-2xl font-semibold">ステートフルカウンター</h2>
              <p className="text-sm text-slate-300">
                <code className="rounded bg-slate-900/60 px-2 py-1">src/App.tsx</code> を
                編集してこのセクションをカスタマイズし、Vite の HMR を体感してください。
              </p>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-violet-300 hover:bg-violet-400/20 whitespace-nowrap"
                onClick={() => setCount((prev) => prev - 1)}
              >
                減らす
              </button>
              <button
                type="button"
                className="rounded-full border border-violet-300/60 bg-violet-500/80 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-400 whitespace-nowrap"
                onClick={() => setCount((prev) => prev + 1)}
              >
                増やす
              </button>
            </div>
          </div>
          <div className="mt-8 text-center text-6xl font-bold tracking-tight text-violet-200">
            {count}
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-2xl shadow-cyan-900/40">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Sudoku</p>
            <h2 className="text-2xl font-semibold">数独リゾルバー</h2>
            <p className="text-sm text-slate-300">
              81 文字の数字と <code className="rounded bg-slate-900/60 px-2 py-1">.</code>{' '}
              で未入力マスを表現したパズルを貼り付け、「解く」を押してください。
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

        <section className="grid gap-4 md:grid-cols-3">
          {resources.map((resource) => (
            <a
              key={resource.title}
              href={resource.link}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/10"
            >
              <h3 className="text-lg font-semibold">{resource.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{resource.description}</p>
            </a>
          ))}
        </section>
      </div>
    </main>
  )
}

export default App
