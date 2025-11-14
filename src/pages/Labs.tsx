import { Helmet } from 'react-helmet-async'

const highlights = [
  {
    title: 'UI パターンライブラリ',
    body: 'Tailwind のユーティリティを活用して、再利用可能なカード・セクション・フォームの断片をここで試作しています。',
  },
  {
    title: '即席プロトタイプ',
    body: 'React コンポーネントをホットリロードで差し替えながら UX の流れを確認できます。',
  },
  {
    title: 'データ検証',
    body: 'ブラウザ上で実装できる軽量なアルゴリズムやビジュアライゼーションをテストするスペースです。',
  },
]

const LabsPage = () => (
  <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100">
    <Helmet>
      <title>hello-codex | プロトタイピングラボ</title>
      <meta name="description" content="UI コンポーネントやアルゴリズムを試作するラボページ。" />
    </Helmet>
    <div className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-16 md:px-10">
      <header className="space-y-4 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">Labs</p>
        <h1 className="text-4xl font-semibold">プロトタイピングラボ</h1>
        <p className="text-base text-slate-300 md:text-lg">
          新しいUIやアルゴリズムを安全に試すスペースです。興味のあるトピックを選んで実験を追加してください。
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {highlights.map((item) => (
          <article
            key={item.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-cyan-900/40"
          >
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8">
        <h2 className="text-2xl font-semibold">小さな TODO</h2>
        <ul className="space-y-2 text-sm text-slate-200">
          <li>・アニメーションガイドを追加</li>
          <li>・デザインシステムのトークンを整理</li>
          <li>・アルゴリズム可視化のサンプルを作成</li>
        </ul>
      </section>
    </div>
  </main>
)

export default LabsPage
