import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { submitPointRequest, getUserRequests } from '../firebase/firestore'
import { Loader2, CheckCircle, ClipboardList } from 'lucide-react'
import toast from 'react-hot-toast'

interface Props { onLoginRequired: () => void }

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  pending:   { label: '검토 중',   color: 'bg-yellow-500/20 text-yellow-400' },
  approved:  { label: '승인 완료', color: 'bg-emerald-500/20 text-emerald-400' },
  rejected:  { label: '반려',      color: 'bg-red-500/20 text-red-400' },
}

export default function PointForm({ onLoginRequired }: Props) {
  const { user } = useAuth()
  const [tab, setTab]       = useState<'form' | 'history'>('form')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<any[]>([])
  const [histLoading, setHistLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState({
    name: user?.displayName || '',
    phone: '', address: '', quantity: 1, note: '',
  })

  function change(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user) { onLoginRequired(); return }
    if (form.quantity < 1) { toast.error('수거 개수를 입력하세요.'); return }

    setLoading(true)
    try {
      await submitPointRequest({ ...form, quantity: Number(form.quantity), uid: user.uid })
      setSubmitted(true)
      toast.success('포인트 신청이 완료됐습니다! 1~2일 내 처리됩니다.')
    } catch {
      toast.error('신청 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  async function loadHistory() {
    if (!user) { onLoginRequired(); return }
    setTab('history')
    setHistLoading(true)
    try {
      const data = await getUserRequests(user.uid)
      setHistory(data)
    } finally {
      setHistLoading(false)
    }
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
  }

  return (
    <section id="포인트신청" className="py-28 px-6" style={{ background: '#050A06' }}>
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.2em] text-emerald-400 uppercase">포인트 적립 신청</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white leading-tight">
            꽁초를 모았다면<br />
            <span className="font-playfair italic font-normal text-emerald-300">포인트로 바꾸세요</span>
          </h2>
          {!user && (
            <p className="mt-4 text-white/40 text-sm">
              신청하려면{' '}
              <button onClick={onLoginRequired} className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                로그인
              </button>
              이 필요합니다
            </p>
          )}
        </div>

        {/* 탭 */}
        <div className="flex rounded-xl overflow-hidden border border-white/8 mb-8">
          {[
            { key: 'form',    label: '포인트 신청',   icon: <ClipboardList size={15} /> },
            { key: 'history', label: '신청 내역 확인', icon: <CheckCircle size={15} /> },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => t.key === 'history' ? loadHistory() : setTab('form')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-all ${
                tab === t.key ? 'bg-emerald-500 text-[#030F05]' : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* 신청 폼 */}
        {tab === 'form' && (
          submitted ? (
            <div className="text-center py-16 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
              <CheckCircle size={48} className="text-emerald-400 mx-auto mb-4" />
              <h3 className="text-white font-bold text-xl mb-2">신청 완료!</h3>
              <p className="text-white/50 text-sm mb-6">1~2 영업일 내에 포인트가 적립됩니다.</p>
              <button onClick={() => { setSubmitted(false); setForm({ name: user?.displayName || '', phone: '', address: '', quantity: 1, note: '' }) }}
                className="text-emerald-400 text-sm font-semibold hover:text-emerald-300 transition-colors">
                새 신청하기 →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl p-8 border border-white/8" style={{ background: '#0B140D' }}>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5 tracking-wider uppercase">이름 *</label>
                  <input name="name" value={form.name} onChange={change} required placeholder="홍길동"
                    className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#4ADE80'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5 tracking-wider uppercase">연락처 *</label>
                  <input name="phone" value={form.phone} onChange={change} required placeholder="010-0000-0000"
                    className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#4ADE80'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/50 mb-1.5 tracking-wider uppercase">수거 위치 *</label>
                <input name="address" value={form.address} onChange={change} required placeholder="서울 마포구 홍대입구역 3번 출구 앞"
                  className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#4ADE80'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/50 mb-1.5 tracking-wider uppercase">수거 개수 (개) *</label>
                <input name="quantity" type="number" min="1" value={form.quantity} onChange={change} required
                  className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#4ADE80'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                <p className="text-emerald-400 text-xs mt-1.5">예상 적립 포인트: {Number(form.quantity) * 10} ~ {Number(form.quantity) * 15}P</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/50 mb-1.5 tracking-wider uppercase">메모 (선택)</label>
                <textarea name="note" value={form.note} onChange={change} rows={3}
                  placeholder="수거 상황이나 특이사항을 적어주세요"
                  className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all resize-none"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#4ADE80'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>

              <button type="submit" disabled={loading || !user}
                className="w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                style={{ background: user ? '#4ADE80' : 'rgba(255,255,255,0.1)', color: user ? '#030F05' : 'rgba(255,255,255,0.3)' }}
                onClick={!user ? onLoginRequired : undefined}
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : '🎁'}
                {loading ? '신청 중...' : user ? '포인트 적립 신청하기' : '로그인 후 신청 가능'}
              </button>
            </form>
          )
        )}

        {/* 신청 내역 */}
        {tab === 'history' && (
          <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: '#0B140D' }}>
            {histLoading ? (
              <div className="py-16 text-center"><Loader2 size={24} className="text-emerald-400 animate-spin mx-auto" /></div>
            ) : history.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-white/40">아직 신청 내역이 없습니다.</p>
                <button onClick={() => setTab('form')} className="mt-3 text-emerald-400 text-sm font-semibold hover:text-emerald-300 transition-colors">
                  첫 신청하기 →
                </button>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {history.map((h: any) => (
                  <div key={h.id} className="p-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-white font-semibold text-sm">{h.address}</p>
                      <p className="text-white/40 text-xs mt-1">{h.quantity}개 · {h.phone}</p>
                      {h.note && <p className="text-white/30 text-xs mt-0.5">{h.note}</p>}
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_LABEL[h.status]?.color || 'bg-white/10 text-white/50'}`}>
                        {STATUS_LABEL[h.status]?.label || h.status}
                      </span>
                      <span className="text-emerald-400 font-bold text-sm">+{h.quantity * 10}P</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  )
}
