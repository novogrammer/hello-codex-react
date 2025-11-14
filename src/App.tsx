import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import StatefulCounter from './components/StatefulCounter'
import SudokuSolver from './components/SudokuSolver'

function App() {
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

        <StatefulCounter />

        <SudokuSolver />

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
