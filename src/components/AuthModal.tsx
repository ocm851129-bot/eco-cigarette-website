import { useState } from 'react'
import { X, Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { signInWithKakao } from '../firebase/kakaoAuth'
import toast from 'react-hot-toast'

interface Props { onClose: () => void }

export default function AuthModal({ onClose }: Props) {
  const { login, signup } = useAuth()
  const [mode, setMode]         = useState<'login' | 'signup'>('login')
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [pw, setPw]             = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [kakaoLoading, setKakaoLoading] = useState(false)

  async function handleKakaoLogin() {
    setKakaoLoading(true)
    try {
      await signInWithKakao()
      toast.success('카카오로 로그인됐습니다! 🎉')
      onClose()
    } catch (err: any) {
      toast.error('카카오 로그인에 실패했습니다.')
      console.error(err)
    } finally {
      setKakaoLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      if (mode === 'login') {
        await login(email, pw)
        toast.success('로그인됐습니다!')
      } else {
        if (!name.trim()) { toast.error('이름을 입력해주세요.'); return }
        await signup(email, pw, name)
        toast.success('회원가입이 완료됐습니다! 🎉')
      }
      onClose()
    } catch (err: any) {
      const msg: Record<string, string> = {
        'auth/user-not-found':      '등록되지 않은 이메일입니다.',
        'auth/wrong-password':      '비밀번호가 올바르지 않습니다.',
        'auth/email-already-in-use':'이미 사용 중인 이메일입니다.',
        'auth/weak-password':       '비밀번호는 6자 이상이어야 합니다.',
        'auth/invalid-email':       '이메일 형식이 올바르지 않습니다.',
        'auth/invalid-credential':  '이메일 또는 비밀번호를 확인해주세요.',
      }
      toast.error(msg[err.code] || '오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl p-8 relative"
        style={{ background: '#0B140D', border: '1px solid rgba(255,255,255,0.08)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* 닫기 */}
        <button onClick={onClose} className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors">
          <X size={20} />
        </button>

        {/* 로고 */}
        <div className="text-center mb-8">
          <span className="text-3xl">🚬</span>
          <h2 className="text-white font-bold text-xl mt-2">
            {mode === 'login' ? '로그인' : '회원가입'}
          </h2>
          <p className="text-white/40 text-sm mt-1">에코시가렛과 함께 지구를 지켜요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-1.5 tracking-wider uppercase">이름</label>
              <input
                type="text" value={name} onChange={e => setName(e.target.value)}
                placeholder="홍길동" required
                className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                onFocus={e => e.target.style.borderColor = '#4ADE80'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-white/50 mb-1.5 tracking-wider uppercase">이메일</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="hello@example.com" required
              className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              onFocus={e => e.target.style.borderColor = '#4ADE80'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/50 mb-1.5 tracking-wider uppercase">비밀번호</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'} value={pw} onChange={e => setPw(e.target.value)}
                placeholder="6자 이상 입력" required minLength={6}
                className="w-full px-4 py-3 pr-12 rounded-xl text-white text-sm outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                onFocus={e => e.target.style.borderColor = '#4ADE80'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
              <button type="button" onClick={() => setShowPw(s => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all mt-6"
            style={{ background: '#4ADE80', color: '#030F05' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#6EE7A0')}
            onMouseLeave={e => (e.currentTarget.style.background = '#4ADE80')}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : null}
            {loading ? '처리 중...' : mode === 'login' ? '로그인' : '회원가입'}
          </button>
        </form>

        {/* 구분선 */}
        <div className="flex items-center gap-3 mt-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/30 text-xs">또는</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* 카카오 로그인 버튼 */}
        <button
          type="button"
          onClick={handleKakaoLogin}
          disabled={kakaoLoading}
          className="w-full mt-4 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all"
          style={{ background: '#FEE500', color: '#191919' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#F5DC00')}
          onMouseLeave={e => (e.currentTarget.style.background = '#FEE500')}
        >
          {kakaoLoading ? (
            <Loader2 size={18} className="animate-spin" style={{ color: '#191919' }} />
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path fillRule="evenodd" clipRule="evenodd"
                d="M9 0.5C4.03 0.5 0 3.73 0 7.72c0 2.56 1.71 4.82 4.3 6.11L3.22 17.1a.37.37 0 0 0 .54.42l4.09-2.71c.38.05.77.07 1.15.07 4.97 0 9-3.23 9-7.22S13.97.5 9 .5z"
                fill="#191919"
              />
            </svg>
          )}
          {kakaoLoading ? '로그인 중...' : '카카오로 계속하기'}
        </button>

        <p className="text-center text-white/40 text-sm mt-5">
          {mode === 'login' ? '아직 계정이 없으신가요?' : '이미 계정이 있으신가요?'}
          {' '}
          <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors">
            {mode === 'login' ? '회원가입' : '로그인'}
          </button>
        </p>
      </div>
    </div>
  )
}
