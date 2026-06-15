import { Menu } from 'lucide-react'
import { useState } from 'react'

const NAV_ITEMS = [
  { label: '브랜드 소개', href: '#브랜드소개' },
  { label: '꽁초 문제',   href: '#꽁초-문제' },
  { label: '순환 시스템', href: '#순환시스템' },
  { label: '포인트 환급', href: '#포인트환급' },
  { label: '참여하기',    href: '#참여하기' },
]

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5">
      {/* 로고 */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">🚬</span>
        <div className="leading-none">
          <span className="block text-white font-bold text-lg tracking-tight">에코시가렛</span>
          <span className="block text-emerald-300 text-[10px] font-medium tracking-widest uppercase">EcoCigarette</span>
        </div>
      </div>

      {/* 센터 pill */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-2 py-2 items-center gap-1">
        {NAV_ITEMS.map(({ label, href }, i) => (
          <a
            key={label}
            href={href}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              i === 0 ? 'bg-white text-gray-900' : 'text-white/80 hover:bg-white/20 hover:text-white'
            }`}
          >
            {label}
          </a>
        ))}
      </div>

      {/* 우측 */}
      <div className="flex items-center gap-3">
        <button className="hidden md:block bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors">
          포인트 적립하기
        </button>
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMobileOpen(o => !o)}
          aria-label="메뉴"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10 p-4 flex flex-col gap-2">
          {NAV_ITEMS.map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setMobileOpen(false)}
              className="text-white/80 text-sm font-medium py-2 text-left hover:text-white transition-colors">
              {label}
            </a>
          ))}
          <button className="mt-2 bg-emerald-500 text-white text-sm font-semibold px-6 py-2.5 rounded-full">
            포인트 적립하기
          </button>
        </div>
      )}
    </nav>
  )
}
