const STEPS = [
  { no: '01', icon: '📱', title: '앱 다운로드',  desc: 'App Store 또는 Google Play에서 "에코시가렛" 앱을 설치합니다. 회원가입은 1분이면 완료됩니다.', color: 'bg-emerald-500' },
  { no: '02', icon: '📍', title: '수거함 찾기',  desc: '앱 지도에서 가장 가까운 에코시가렛 수거함을 찾습니다. 전국 1,240개 이상 설치되어 있습니다.', color: 'bg-teal-500' },
  { no: '03', icon: '🚬', title: '줍고 투입',    desc: '주변의 담배꽁초를 주워 수거함에 QR 스캔 후 투입합니다. 투입 즉시 포인트가 적립됩니다.', color: 'bg-cyan-500' },
  { no: '04', icon: '💰', title: '포인트 환급',  desc: '모인 포인트를 현금·상품권·기부로 전환합니다. 계좌 입금은 영업일 기준 1~2일 이내 처리됩니다.', color: 'bg-blue-500' },
]

const PARTNERS = [
  { type: '지자체',  icon: '🏛️', desc: '서울·부산·인천 등 23개 지방자치단체와 공식 협약' },
  { type: '편의점',  icon: '🏪', desc: 'CU, GS25, 세븐일레븐과 포인트 교환 파트너십' },
  { type: '기업',    icon: '🏢', desc: 'ESG 활동으로 에코시가렛을 도입한 기업 68개사' },
  { type: '환경단체', icon: '🌿', desc: '그린피스·WWF와 협력하는 기부 연계 프로그램' },
]

const FAQS = [
  { q: '꽁초를 얼마나 모아야 하나요?', a: '최소 수량 제한 없습니다. 한 개부터 바로 투입 가능하며 포인트가 즉시 적립됩니다.' },
  { q: '수거함이 없는 지역은 어떻게 하나요?', a: '앱에서 우편 수거 신청이 가능합니다. 전용 봉투를 받아 꽁초를 모은 뒤 우편으로 보내면 포인트가 적립됩니다.' },
  { q: '포인트 유효기간이 있나요?', a: '마지막 활동일로부터 24개월 이내 사용하면 됩니다. 꾸준히 활동하면 유효기간 걱정 없습니다.' },
  { q: '기업·단체도 참여할 수 있나요?', a: '가능합니다. ESG 활동으로 사내 수거함 설치와 임직원 참여 프로그램을 제공합니다. 문의하기로 연락 주세요.' },
]

export default function JoinSection() {
  return (
    <section id="참여하기" className="bg-[#f6faf7] py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* 헤더 */}
        <div className="text-center mb-20">
          <span className="text-xs font-semibold tracking-[0.2em] text-emerald-600 uppercase">참여하기</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            오늘부터 시작하는<br />
            <span className="font-playfair italic font-normal text-emerald-600">담배꽁초 순환 여정</span>
          </h2>
          <p className="mt-5 text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
            복잡한 절차 없이 앱 하나로 시작합니다. 지금 바로 내 주변 꽁초를 줍고 포인트를 받아보세요.
          </p>
        </div>

        {/* 4단계 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {STEPS.map(({ no, icon, title, desc, color }) => (
            <div key={no} className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-50 transition-all group">
              <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white font-black text-lg mb-5`}>{no}</div>
              <span className="text-3xl">{icon}</span>
              <h3 className="mt-3 font-bold text-gray-900 text-lg group-hover:text-emerald-700 transition-colors">{title}</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* 앱 다운로드 배너 */}
        <div className="bg-gray-900 rounded-3xl overflow-hidden mb-16">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex-1 p-10 md:p-14">
              <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">앱 다운로드</span>
              <h3 className="mt-3 text-3xl font-bold text-white leading-tight">지금 바로<br />에코시가렛 앱을<br />설치하세요</h3>
              <p className="mt-4 text-gray-400 text-sm leading-relaxed max-w-xs">iOS · Android 모두 지원합니다. 회원가입 완료 시 웰컴 포인트 500P를 즉시 지급합니다.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button className="flex items-center gap-2.5 bg-white text-gray-900 font-semibold px-5 py-3 rounded-xl hover:bg-gray-100 transition-colors text-sm"><span className="text-xl">🍎</span>App Store</button>
                <button className="flex items-center gap-2.5 bg-white text-gray-900 font-semibold px-5 py-3 rounded-xl hover:bg-gray-100 transition-colors text-sm"><span className="text-xl">▶️</span>Google Play</button>
              </div>
              <p className="mt-4 text-gray-600 text-xs">웰컴 포인트 500P 지급 · 가입 후 즉시 사용 가능</p>
            </div>
            {/* 앱 목업 */}
            <div className="lg:w-80 xl:w-96 w-full flex items-center justify-center p-8 bg-gradient-to-br from-emerald-900/40 to-gray-900">
              <div className="w-52 bg-gray-800 rounded-[2.5rem] p-3 border border-white/10 shadow-2xl">
                <div className="bg-gray-900 rounded-[2rem] overflow-hidden">
                  <div className="flex justify-between items-center px-5 pt-4 pb-2">
                    <span className="text-white text-[10px] font-medium">9:41</span>
                    <span className="text-white text-[10px]">●●●</span>
                  </div>
                  <div className="px-4 pb-6">
                    <div className="bg-emerald-500 rounded-2xl p-4 mb-3 text-center">
                      <p className="text-white text-[10px] font-bold">오늘의 적립 포인트</p>
                      <p className="text-white text-2xl font-black mt-1">+150P</p>
                      <p className="text-emerald-100 text-[9px]">꽁초 15개 수거 완료</p>
                    </div>
                    <div className="space-y-2">
                      {['🗺️  내 주변 수거함 찾기', '📊  누적 포인트: 2,430P', '♻️  환경 기여도 보기'].map(item => (
                        <div key={item} className="bg-gray-800 rounded-xl px-3 py-2.5 text-white text-[10px]">{item}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 파트너 */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">함께하는 파트너</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PARTNERS.map(({ type, icon, desc }) => (
              <div key={type} className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-emerald-200 transition-all">
                <span className="text-3xl">{icon}</span>
                <p className="mt-2 font-bold text-gray-900 text-sm">{type}</p>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">자주 묻는 질문</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-emerald-200 transition-all">
                <p className="font-bold text-gray-900 text-sm mb-2 flex items-start gap-2"><span className="text-emerald-500 flex-shrink-0">Q.</span>{q}</p>
                <p className="text-gray-500 text-sm leading-relaxed flex items-start gap-2"><span className="text-gray-300 flex-shrink-0">A.</span>{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 기업 도입 */}
        <div className="text-center bg-emerald-600 rounded-3xl p-10">
          <p className="text-emerald-100 text-sm mb-2">기업 ESG · 단체 도입 문의</p>
          <h3 className="text-2xl font-bold text-white mb-4">우리 회사에도 에코시가렛을 도입하고 싶다면?</h3>
          <p className="text-emerald-100 text-sm mb-7 max-w-md mx-auto leading-relaxed">사내 수거함 설치부터 임직원 참여 프로그램, ESG 리포트 발행까지 원스톱으로 지원합니다.</p>
          <button className="bg-white text-emerald-700 font-bold px-8 py-3.5 rounded-full hover:bg-emerald-50 transition-colors">기업 도입 문의하기 →</button>
        </div>

      </div>
    </section>
  )
}
