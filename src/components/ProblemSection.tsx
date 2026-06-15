import { useEffect, useRef } from 'react'

const MEGASTATS = [
  { num: '4,500억', unit: '개', desc: '매년 전 세계에서 버려지는 담배꽁초' },
  { num: '75',      unit: '%',  desc: '쓰레기통 없이 무단 투기되는 비율' },
  { num: '10',      unit: '년', desc: '필터 하나가 자연에서 분해되는 시간' },
  { num: '40',      unit: 'L',  desc: '꽁초 1개가 오염시키는 물의 양' },
]

const PROBLEMS = [
  { no: '01', emoji: '🌊', title: '수질 오염',      sub: '꽁초 1개 = 물 40리터 오염',      desc: '담배꽁초 필터에는 아세트알데히드, 니코틴, 카드뮴 등 70종 이상의 유해물질이 농축되어 있습니다. 빗물에 씻겨 하수구로 유입된 꽁초 하나는 물고기 한 마리를 죽일 만큼의 독성을 방출합니다.', color: 'border-blue-200', tagColor: 'bg-blue-50 text-blue-600', numColor: 'text-blue-100' },
  { no: '02', emoji: '🏔️', title: '토양·산림 오염', sub: '분해까지 최대 10년',              desc: '셀룰로오스 아세테이트 플라스틱으로 만들어진 필터는 자연에서 분해되지 않습니다. 토양에 스며든 독성물질은 식물 성장을 저해하고, 산불의 원인이 되며 야생동물이 먹이로 오인해 삼킵니다.', color: 'border-amber-200', tagColor: 'bg-amber-50 text-amber-700', numColor: 'text-amber-100' },
  { no: '03', emoji: '🐠', title: '해양 생태계 파괴', sub: '전 세계 해변 수거 쓰레기 1위',  desc: '매년 약 2억 개의 꽁초가 바다로 흘러듭니다. 분해 과정에서 나오는 미세플라스틱은 플랑크톤이 섭취하고, 먹이사슬을 타고 결국 우리가 먹는 물고기와 해산물에 축적됩니다.', color: 'border-cyan-200', tagColor: 'bg-cyan-50 text-cyan-700', numColor: 'text-cyan-100' },
  { no: '04', emoji: '🫁', title: '생활환경 오염',   sub: '쓰레기통 없이 버려지는 비율 75%', desc: '흡연자의 75%가 꽁초를 길가, 하수구, 창문 밖에 버립니다. 꽁초에서 스며나오는 독성 물질의 농도는 담배 연기보다 최대 3배 높은 수치를 기록합니다.', color: 'border-rose-200', tagColor: 'bg-rose-50 text-rose-600', numColor: 'text-rose-100' },
]

const JOURNEY = ['🚬 버려짐', '🌧️ 빗물', '🕳️ 하수구', '🏞️ 강·하천', '🌊 바다', '🐟 해양생물', '🍽️ 우리 식탁']

export default function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting)
          entry.target.querySelectorAll<HTMLElement>('.prob-card')
            .forEach((el, i) => setTimeout(() => el.classList.add('prob-visible'), i * 100))
      })
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="꽁초-문제" className="bg-gray-950 py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* 헤더 */}
        <div className="text-center mb-20">
          <span className="text-xs font-semibold tracking-[0.2em] text-emerald-400 uppercase">꽁초 문제</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
            왜 담배꽁초가<br />
            <span className="font-playfair italic font-normal text-emerald-300">문제인가요?</span>
          </h2>
          <p className="mt-5 text-gray-400 max-w-lg mx-auto text-sm leading-relaxed">
            담배꽁초는 전 세계에서 가장 많이 버려지는 쓰레기입니다.<br />작고 가벼워 보이지만, 그 피해는 상상을 초월합니다.
          </p>
        </div>

        {/* 핵심 수치 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {MEGASTATS.map(({ num, unit, desc }) => (
            <div key={num} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/8 hover:border-emerald-500/30 transition-all">
              <div className="flex items-end justify-center gap-1">
                <span className="text-4xl md:text-5xl font-black text-white tracking-tight">{num}</span>
                <span className="text-xl font-bold text-emerald-400 mb-1">{unit}</span>
              </div>
              <p className="mt-3 text-xs text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* 꽁초의 여정 */}
        <div className="mb-20 bg-white/4 border border-white/10 rounded-3xl p-8 md:p-12">
          <p className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase mb-6">꽁초 하나의 여정</p>
          <div className="flex flex-wrap items-center gap-3 md:gap-0">
            {JOURNEY.map((item, i) => (
              <div key={item} className="flex items-center gap-3">
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center text-2xl ${i >= 5 ? 'bg-rose-900/30 border-rose-500/20' : 'bg-gray-800'}`}>
                    {item.split(' ')[0]}
                  </div>
                  <span className="text-[10px] text-gray-400 text-center leading-tight max-w-[60px]">{item.split(' ').slice(1).join(' ')}</span>
                </div>
                {i < JOURNEY.length - 1 && (
                  <span className={`hidden md:block text-lg flex-shrink-0 ${i >= 4 ? 'text-red-500/50' : 'text-gray-600'}`}>→</span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-rose-400/80 leading-relaxed border-t border-white/5 pt-4">
            ⚠️ 꽁초 속 미세플라스틱은 먹이사슬을 타고 결국 우리 식탁 위 해산물에 축적됩니다.
          </p>
        </div>

        {/* 문제 카드 4개 */}
        <div ref={ref} className="grid md:grid-cols-2 gap-5">
          {PROBLEMS.map(({ no, emoji, title, sub, desc, color, tagColor, numColor }) => (
            <div key={no} className={`prob-card opacity-0 translate-y-6 relative bg-white/4 border ${color} rounded-2xl p-8 overflow-hidden hover:bg-white/7 group transition-all`}>
              <span className={`absolute top-4 right-6 text-8xl font-black select-none pointer-events-none ${numColor} opacity-60`}>{no}</span>
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-3xl">{emoji}</span>
                  <div>
                    <span className={`inline-block text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-2 ${tagColor}`}>{no}</span>
                    <h3 className="text-white font-bold text-xl leading-snug">{title}</h3>
                    <p className="text-emerald-400 text-sm font-semibold mt-1">{sub}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm mb-6">이 문제를 해결할 수 있는 가장 쉬운 방법이 있습니다.</p>
          <button className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-10 py-4 rounded-full transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-emerald-500/30 active:scale-95">
            에코시가렛으로 해결하기 →
          </button>
        </div>

      </div>
    </section>
  )
}
