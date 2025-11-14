import { useState } from 'react'

const StatefulCounter = () => {
  const [count, setCount] = useState(0)

  return (
    <section className="rounded-3xl border border-white/5 bg-white/5 p-8 shadow-2xl shadow-violet-900/30">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-violet-300/70">インタラクティブデモ</p>
          <h2 className="text-2xl font-semibold">ステートフルカウンター</h2>
          <p className="text-sm text-slate-300">
            <code className="rounded bg-slate-900/60 px-2 py-1">src/components/StatefulCounter.tsx</code> を編集してこのセクションをカスタマイズし、Vite の HMR を体感してください。
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
      <div className="mt-8 text-center text-6xl font-bold tracking-tight text-violet-200">{count}</div>
    </section>
  )
}

export default StatefulCounter
