import { useEffect, useRef } from 'react'

const VALUES = [
  { icon: '♻️', title: '순환(Circulation)', desc: '버려진 것을 자원으로 되돌립니다. 꽁초의 마지막이 아닌 새로운 시작을 설계합니다.', color: 'border-emerald-200 bg-emerald-50', tag: 'text-emerald-600 bg-emerald-100' },
  { icon: '🎁', title: '보상(Reward)',       desc: '선한 행동에는 실질적인 보상이 따릅니다. 환경을 살리는 동시에 나도 이득을 얻습니다.', color: 'border-amber-200 bg-amber-50',   tag: 'text-amber-700 bg-amber-100' },
  { icon: '🤝', title: '연결(Connection)',   desc: '개인, 기업, 지자체가 하나의 플랫폼 위에서 연결됩니다. 혼자가 아닌 함께 만드는 변화입니다.', color: 'border-blue-200 bg-blue-50', tag: 'text-blue-700 bg-blue-100' },
  { icon: '🌍', title: '임팩트(Impact)',     desc: '측정 가능한 환경 임팩트를 추구합니다. 수거된 꽁초 수, 정화된 물의 양을 실시간으로 공개합니다.', color: 'border-violet-200 bg-violet-50', tag: 'text-violet-700 bg-violet-100' },
]

const HISTORY = [
  { year: '2021', title: '문제 발견', desc: '창업자가 서울 도심 하수구에서 수백 개의 담배꽁초를 발견하며 에코시가렛 아이디어를 구상' },
  { year: '2022', title: '플랫폼 개발', desc: '앱·수거함·포인트 시스템 프로토타입 개발. 서울 마포구 시범 운영 시작' },
  { year: '2023', title: '서비스 정식 출시', desc: '에코시가렛 앱 정식 론칭. 수거함 300개 설치. 첫 해 수거 꽁초 30만 개 달성' },
  { year: '2024', title: '전국 확대', desc: '전국 1,240개 수거함 운영. 23개 지자체 협약. 누적 수거 128만 개 돌파' },
  { year: '2025+', title: '글로벌 도전', desc: '일본·동남아 파트너십 협의 중. 국내 담배꽁초 무단투기율 50% 감소 목표' },
]

export default function FeaturesSection() {
  const valRef  = useRef<HTMLDivElement>(null)
  const histRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const makeObs = (selector: string) => new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting)
          entry.target.querySelectorAll<HTMLElement>(selector)
            .forEach((el, i) => setTimeout(() => el.classList.add('brand-visible'), i * 100))
      })
    }, { threshold: 0.1 })

    const o1 = makeObs('.val-card')
    const o2 = makeObs('.hist-item')
    if (valRef.current)  o1.observe(valRef.current)
    if (histRef.current) o2.observe(histRef.current)
    return () => { o1.disconnect(); o2.disconnect() }
  }, [])

  return (
    <section id="브랜드소개">

      {/* 브랜드 스토리 */}
      <div className="relative overflow-hidden bg-gray-950 py-28 px-6">
        <div className="absolute inset-0 bg-center bg-cover opacity-15"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/60 via-gray-950/40 to-gray-950/80" />

        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] text-emerald-400 uppercase">브랜드 스토리</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              하수구 속 꽁초 하나에서<br />
              <span className="font-playfair italic font-normal text-emerald-300">시작된 이야기</span>
            </h2>
            <div className="mt-8 space-y-5 text-gray-300 text-sm leading-relaxed">
              <p>2021년, 에코시가렛 창업자는 서울 마포구 골목 하수구에서 수백 개의 담배꽁초를 발견했습니다. 빗물에 씻겨 강으로 흘러가는 그 모습에서 하나의 질문이 생겼습니다.</p>
              <p className="text-white font-medium border-l-2 border-emerald-400 pl-4 py-1">
                "왜 사람들은 꽁초를 길에 버릴까? 버리는 것보다 모으는 것이 이득이 되면?"
              </p>
              <p>그렇게 에코시가렛이 탄생했습니다. 꽁초를 수거하면 포인트를 주고, 수거된 꽁초는 새로운 소재로 탄생시키는 <span className="text-white font-medium">담배꽁초 순환플랫폼</span>입니다.</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white/5 border border-emerald-500/30 rounded-2xl p-8 backdrop-blur-sm">
              <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">Mission</span>
              <p className="mt-3 text-white text-xl font-bold leading-snug">담배꽁초를 자원으로 바꾸는<br />순환 경제 플랫폼을 만든다</p>
              <p className="mt-3 text-gray-400 text-sm leading-relaxed">개인의 작은 행동이 환경 임팩트로 연결되는 시스템을 구축합니다.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Vision</span>
              <p className="mt-3 text-white text-xl font-bold leading-snug">2030년까지 국내 담배꽁초<br />무단투기율 50% 감소</p>
              <p className="mt-3 text-gray-400 text-sm leading-relaxed">수거함 1만 개, 참여 회원 100만 명, 아시아 5개국 확장을 목표합니다.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 핵심 가치 */}
      <div ref={valRef} className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-[0.2em] text-emerald-600 uppercase">핵심 가치</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">에코시가렛이 믿는 것들</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ icon, title, desc, color, tag }) => (
              <div key={title} className={`val-card opacity-0 translate-y-6 border-2 rounded-2xl p-7 ${color}`}>
                <span className="text-4xl">{icon}</span>
                <span className={`inline-block mt-4 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full ${tag}`}>
                  {title.split('(')[1]?.replace(')', '')}
                </span>
                <h3 className="mt-2 font-bold text-gray-900 text-lg">{title.split('(')[0]}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 히스토리 */}
      <div ref={histRef} className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-[0.2em] text-emerald-600 uppercase">브랜드 히스토리</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">꽁초 하나의 여정, 그리고 우리의 여정</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-300 via-emerald-500 to-emerald-200 -translate-x-1/2" />
            <div className="space-y-10">
              {HISTORY.map(({ year, title, desc }, i) => (
                <div key={year} className={`hist-item opacity-0 translate-y-4 relative flex gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-emerald-200 hover:shadow-lg transition-all inline-block w-full">
                      <span className="text-xs font-black text-emerald-600 tracking-widest">{year}</span>
                      <h3 className="mt-1 font-bold text-gray-900 text-lg">{title}</h3>
                      <p className="mt-2 text-sm text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-[22px] md:left-1/2 md:-translate-x-1/2 top-6">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-md" />
                  </div>
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 임팩트 배너 */}
      <div className="bg-emerald-600 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: '128만', unit: '개', label: '누적 수거 꽁초' },
            { num: '3,200', unit: '명', label: '활성 참여 회원' },
            { num: '23',    unit: '개', label: '협약 지자체' },
            { num: '5.1만', unit: 'L',  label: '보호된 수질' },
          ].map(({ num, unit, label }) => (
            <div key={label}>
              <div className="flex items-end justify-center gap-1">
                <span className="text-4xl md:text-5xl font-black text-white tracking-tight">{num}</span>
                <span className="text-xl font-bold text-emerald-200 mb-1">{unit}</span>
              </div>
              <p className="mt-2 text-emerald-100 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
