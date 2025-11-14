import { Link, NavLink, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import LabsPage from './pages/Labs'

const navItems = [
  { path: '/', label: 'ホーム' },
  { path: '/labs', label: 'ラボ' },
]

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-full px-4 py-2 text-sm font-semibold transition',
    isActive
      ? 'bg-white/20 text-white shadow-inner shadow-black/20'
      : 'text-slate-400 hover:text-white hover:bg-white/5',
  ].join(' ')

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 md:px-10">
        <nav className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm shadow-lg shadow-slate-900/50 md:flex-row md:items-center md:justify-between">
          <Link to="/" className="text-lg font-semibold text-white">
            hello-codex
          </Link>
          <div className="flex flex-wrap gap-3">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={navLinkClasses} end={item.path === '/'}>
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/labs" element={<LabsPage />} />
      </Routes>
    </div>
  )
}

export default App
