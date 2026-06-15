import { useEffect, useRef } from 'react'

const FLOW = [
  { step: '01', icon: '🚬', title: '꽁초 수거',      desc: '거리, 공원, 하수구 주변의 담배꽁초를 직접 줍습니다. 전용 수거 도구와 파우치가 앱 주문으로 무료 제공됩니다.', color: 'border-orange-500/40 bg-orange-500/5', dot: 'bg-orange-400' },
  { step: '02', icon: '📦', title: 'QR 수거함 투입', desc: '전국에 설치된 에코시가렛 수거함을 앱으로 찾아 QR을 스캔합니다. 투입 즉시 무게를 측정해 포인트가 자동 적립됩니다.', color: 'border-yellow-500/40 bg-yellow-500/5', dot: 'bg-yellow-400' },
  { step: '03', icon: '🏭', title: '전문 가공 처리', desc: '수거된 꽁초는 파트너 재활용 센터로 이송됩니다. 유해물질은 특수 방법으로 분리·중화되고 필터는 세척 후 분쇄됩니다.', color: 'border-blue-500/40 bg-blue-500/5', dot: 'bg-blue-400' },
  { step: '04', icon: '♻️', title: '소재로 재탄생',  desc: '가공된 셀룰로오스 섬유는 건축 단열재, 플라스틱 복합재, 흡음재, 비료 등 다양한 산업 소재로 재활용됩니다.', color: 'border-emerald-500/40 bg-emerald-500/5', dot: 'bg-emerald-400' },
]

const OUTPUTS = [
  { icon: '🧱', name: '건축 단열재', desc: '꽁초 필터를 압축한 단열 패널' },
  { icon: '🧵', name: '복합 섬유재', desc: '의류·자동차 내장재 원료' },
  { icon: '🌱', name: '토양 개량제', desc: '중화 처리 후 농업용 비료' },
  { icon: '🔇', name: '흡음·방음재', desc: '건물 방음용 흡음 패널' },
]

export default function CirculationSection() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting)
          entry.target.querySelectorAll<HTMLElement>('.circ-item')
            .forEach((el, i) => setTimeout(() => el.classList.add('circ-visible'), i * 120))
      })
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="순환시스템" className="bg-[#0b0f0c] py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* 헤더 */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] text-emerald-400 uppercase">순환 시스템</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              버리면 쓰레기,<br />
              <span className="font-playfair italic font-normal text-emerald-300">모으면 자원이 됩니다</span>
            </h2>
          </div>
          <p className="max-w-sm text-gray-400 text-sm leading-relaxed lg:text-right">
            에코시가렛의 4단계 순환 시스템은 담배꽁초를 완전히 새로운 소재로 탈바꿈시킵니다.
          </p>
        </div>

        {/* 4단계 */}
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {FLOW.map(({ step, icon, title, desc, color, dot }) => (
            <div key={step} className={`circ-item opacity-0 translate-y-6 border rounded-2xl p-7 ${color}`}>
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-2 h-2 rounded-full ${dot}`} />
                <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">Step {step}</span>
              </div>
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* 재탄생 소재 */}
        <div className="border border-white/8 rounded-3xl p-8 md:p-10 bg-white/3 mb-8">
          <div className="mb-8">
            <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">꽁초의 재탄생</span>
            <h3 className="mt-2 text-2xl font-bold text-white">꽁초 10kg → 이렇게 바뀝니다</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {OUTPUTS.map(({ icon, name, desc }) => (
              <div key={name} className="bg-white/5 hover:bg-white/8 border border-white/8 hover:border-emerald-500/30 rounded-xl p-5 transition-all group">
                <span className="text-3xl">{icon}</span>
                <p className="mt-3 font-semibold text-white text-sm group-hover:text-emerald-300 transition-colors">{name}</p>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { num: '1,240', label: '전국 수거함 설치 수' },
            { num: '128만개', label: '누적 수거 꽁초' },
            { num: '23개', label: '파트너 지자체' },
          ].map(({ num, label }) => (
            <div key={label} className="text-center bg-white/4 border border-white/8 rounded-2xl py-7">
              <span className="block text-3xl md:text-4xl font-black text-emerald-400">{num}</span>
              <span className="block mt-2 text-xs text-gray-500">{label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
