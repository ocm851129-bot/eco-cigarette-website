const TIERS = [
  { icon: '🌱', name: '새싹',   range: '0 – 999 P',      perks: ['꽁초 1개당 10포인트', '월 리포트 제공', '에코 뉴스레터'], color: 'border-gray-200 bg-gray-50', badge: 'bg-gray-100 text-gray-600', cta: false },
  { icon: '🌿', name: '새싹나무', range: '1,000 – 9,999 P', perks: ['꽁초 1개당 12포인트', '편의점 상품권 교환', '수거 도구 무료 제공', '랭킹 보드 참여'], color: 'border-emerald-200 bg-emerald-50', badge: 'bg-emerald-100 text-emerald-700', cta: false },
  { icon: '🌳', name: '숲',      range: '10,000 P 이상',    perks: ['꽁초 1개당 15포인트', '현금 환급 가능', '기부 전환 (세액공제)', '기업 파트너 할인', '에코 굿즈 패키지'], color: 'border-emerald-400 bg-gradient-to-b from-emerald-50 to-white shadow-xl shadow-emerald-100', badge: 'bg-emerald-500 text-white', cta: true },
]

const EXCHANGE = [
  { icon: '💵', title: '현금 환급',      desc: '1,000P = 1,000원\n계좌로 직접 입금', tag: '인기' },
  { icon: '🎁', title: '편의점 상품권', desc: 'CU·GS25·세븐일레븐\n500P부터 교환 가능', tag: '' },
  { icon: '❤️', title: '환경 단체 기부', desc: '그린피스·WWF·자연보호협회\n세액공제 영수증 발급', tag: '' },
  { icon: '🛒', title: '파트너 할인쿠폰', desc: '생활용품·식품·카페\n최대 30% 할인', tag: '' },
]

export default function PointsSection() {
  return (
    <section id="포인트환급" className="bg-white py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* 헤더 */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] text-emerald-600 uppercase">포인트 환급</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            환경을 살리면<br />
            <span className="font-playfair italic font-normal text-emerald-600">나에게도 돌아옵니다</span>
          </h2>
          <p className="mt-5 text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
            꽁초 1개를 수거할 때마다 포인트가 즉시 적립됩니다. 현금·상품권·기부로 자유롭게 전환하세요.
          </p>
        </div>

        {/* 포인트 하이라이트 */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-3xl p-8 md:p-12 mb-16 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="relative z-10">
            <p className="text-emerald-100 text-sm font-medium mb-3">꽁초 1개당 적립 포인트</p>
            <div className="flex items-center justify-center gap-4">
              <span className="text-7xl md:text-8xl font-black tracking-tight">10P</span>
              <div className="text-left">
                <p className="text-emerald-200 text-sm">~</p>
                <span className="text-4xl md:text-5xl font-black">15P</span>
                <p className="text-emerald-200 text-xs mt-1">등급에 따라 최대</p>
              </div>
            </div>
            <p className="mt-4 text-emerald-100 text-sm">
              꽁초 100개 = 1,000~1,500P ≈ <strong className="text-white">편의점 상품권 1장</strong>
            </p>
          </div>
        </div>

        {/* 등급 */}
        <div className="mb-16">
          <h3 className="text-center text-2xl font-bold text-gray-900 mb-8">멤버십 등급</h3>
          <div className="grid md:grid-cols-3 gap-5">
            {TIERS.map(({ icon, name, range, perks, color, badge, cta }) => (
              <div key={name} className={`rounded-2xl p-7 border-2 relative ${color} ${cta ? 'scale-[1.03]' : ''}`}>
                {cta && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">추천</div>}
                <div className="text-4xl mb-3">{icon}</div>
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-2 ${badge}`}>{name}</span>
                <p className="text-gray-500 text-sm font-medium mb-5">{range}</p>
                <ul className="space-y-2.5">
                  {perks.map(p => (
                    <li key={p} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 교환 방법 */}
        <div>
          <h3 className="text-center text-2xl font-bold text-gray-900 mb-8">포인트 교환 방법</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EXCHANGE.map(({ icon, title, desc, tag }) => (
              <div key={title} className="relative bg-gray-50 hover:bg-emerald-50 border border-gray-100 hover:border-emerald-200 rounded-2xl p-6 transition-all group">
                {tag && <span className="absolute top-4 right-4 text-[10px] font-bold bg-emerald-500 text-white px-2 py-0.5 rounded-full">{tag}</span>}
                <span className="text-3xl">{icon}</span>
                <h4 className="mt-3 font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">{title}</h4>
                <p className="mt-1.5 text-xs text-gray-500 leading-relaxed whitespace-pre-line">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 계산기 CTA */}
        <div className="mt-14 bg-gray-900 rounded-3xl p-8 md:p-10 text-center">
          <p className="text-gray-400 text-sm mb-2">한 달에 꽁초 200개를 수거하면</p>
          <p className="text-white text-3xl font-black mb-1">2,000 ~ 3,000 포인트</p>
          <p className="text-emerald-400 text-sm mb-7">= 현금 2,000~3,000원 또는 편의점 상품권 2~3장</p>
          <button className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-10 py-4 rounded-full transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-emerald-500/30 active:scale-95">
            지금 적립 시작하기 →
          </button>
        </div>

      </div>
    </section>
  )
}
