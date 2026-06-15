import { useState, useEffect } from 'react'
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const LINKS = [
  { label: '브랜드 소개', href: '#브랜드소개' },
  { label: '꽁초 문제',   href: '#꽁초-문제' },
  { label: '순환 시스템', href: '#순환시스템' },
  { label: '수거함 지도', href: '#지도' },
  { label: '포인트 환급', href: '#포인트환급' },
  { label: '참여하기',    href: '#참여하기' },
]

interface Props { onLoginClick: () => void }

export default function Nav({ onLoginClick }: Props) {
  const { user, logout }        = useAuth()
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userMenu, setUserMenu] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  async function handleLogout() {
    await logout()
    toast.success('로그아웃됐습니다.')
    setUserMenu(false)
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[200] transition-all duration-500"
        style={{
          background:   scrolled ? 'rgba(5,10,6,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-[68px]">

          {/* 로고 */}
          <a href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-7 h-7 rounded-lg bg-emerald-400 flex items-center justify-center">
              <span className="text-[#030F05] text-xs font-black">E</span>
            </div>
            <div className="leading-none">
              <span className="block text-white font-bold text-[15px] tracking-tight">에코시가렛</span>
              <span className="block text-emerald-400 text-[9px] font-semibold tracking-[0.18em] uppercase">EcoCigarette</span>
            </div>
          </a>

          {/* 데스크탑 링크 */}
          <div className="hidden lg:flex items-center gap-1">
            {LINKS.map(({ label, href }) => (
              <a key={label} href={href}
                className="px-3 py-2 text-[13px] font-medium text-white/60 hover:text-white rounded-full transition-colors hover:bg-white/5">
                {label}
              </a>
            ))}
          </div>

          {/* 우측 */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button onClick={() => setUserMenu(m => !m)}
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-emerald-500/30 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                    <span className="text-[#030F05] text-[10px] font-black">
                      {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-white text-sm font-medium">{user.displayName || '사용자'}</span>
                  <ChevronDown size={14} className="text-white/40" />
                </button>

                {userMenu && (
                  <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-white/10 overflow-hidden"
                    style={{ background: '#0B140D' }}>
                    <div className="px-4 py-3 border-b border-white/8">
                      <p className="text-white text-sm font-semibold">{user.displayName}</p>
                      <p className="text-white/40 text-xs">{user.email}</p>
                    </div>
                    <a href="#포인트신청" onClick={() => setUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 text-sm transition-colors">
                      <User size={14} /> 포인트 신청
                    </a>
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-red-400/70 hover:text-red-400 hover:bg-red-500/5 text-sm transition-colors">
                      <LogOut size={14} /> 로그아웃
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={onLoginClick}
                className="hidden md:flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-[#030F05] text-[13px] font-bold px-5 py-2.5 rounded-full transition-all hover:scale-[1.02]">
                로그인 / 회원가입
              </button>
            )}

            <button className="lg:hidden w-9 h-9 flex items-center justify-center text-white/60 hover:text-white"
              onClick={() => setOpen(o => !o)}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* 모바일 드로어 */}
      {open && (
        <div className="fixed inset-0 z-[190] pt-[68px] flex flex-col px-5 py-8 gap-2"
          style={{ background: '#050A06' }}>
          {LINKS.map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setOpen(false)}
              className="py-4 text-lg font-semibold text-white border-b border-white/8">
              {label}
            </a>
          ))}
          {user ? (
            <button onClick={() => { handleLogout(); setOpen(false) }}
              className="mt-4 flex items-center gap-2 text-red-400 font-semibold py-3">
              <LogOut size={16} /> 로그아웃
            </button>
          ) : (
            <button onClick={() => { onLoginClick(); setOpen(false) }}
              className="mt-4 bg-emerald-500 text-[#030F05] font-bold px-6 py-3 rounded-full">
              로그인 / 회원가입
            </button>
          )}
        </div>
      )}
    </>
  )
}
