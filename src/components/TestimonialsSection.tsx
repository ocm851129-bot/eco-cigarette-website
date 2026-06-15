const IMPACTS = [
  { emoji: '🌊', title: '하수구·강 보호', desc: '꽁초 1개를 수거하면 40L의 수질 오염을 막을 수 있습니다. 1,000개면 수영장 절반의 물을 지킵니다.', stat: '40L 수질 보호/개' },
  { emoji: '🌿', title: '토양 오염 방지', desc: '땅에 버려진 꽁초는 토양에 카드뮴·납·비소를 방출합니다. 수거 하나하나가 토양 생태계를 살립니다.', stat: '70종 유해물질 차단' },
  { emoji: '🐠', title: '해양생물 보호', desc: '매년 바다로 유입되는 담배꽁초 2억 개. 물고기가 먹이로 오인해 삼키는 미세플라스틱을 줄입니다.', stat: '2억 개 → 바다 유입' },
  { emoji: '💚', title: '탄소 절감', desc: '수거된 꽁초를 재활용하면 소각·매립 대비 탄소 배출을 90% 줄일 수 있습니다.', stat: '탄소 90% 절감' },
  { emoji: '💰', title: '나에게 돌아오는 혜택', desc: '꽁초 50개 수거 시 약 500포인트 적립. 한 달 꾸준히 하면 편의점 상품권 한 장이 됩니다.', stat: '50개 = 500포인트' },
  { emoji: '🤝', title: '지역사회 변화', desc: '에코시가렛 수거함이 설치된 지역의 꽁초 투기율은 평균 67% 감소했습니다.', stat: '투기율 67% 감소' },
]

export default function TestimonialsSection() {
  return (
    <section className="bg-[#f6faf7] py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.18em] text-emerald-600 uppercase">꽁초 하나의 힘</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            한 개의 꽁초가<br />만드는 변화
          </h2>
          <p className="mt-4 text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
            작아 보이는 꽁초 하나지만, 수거할 때와 버릴 때의 차이는 생각보다 훨씬 큽니다.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {IMPACTS.map(({ emoji, title, desc, stat }) => (
            <div key={title} className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-50 transition-all hover:scale-[1.02] duration-300 cursor-default">
              <span className="text-4xl">{emoji}</span>
              <h3 className="mt-4 font-bold text-gray-900 text-lg">{title}</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{desc}</p>
              <div className="mt-5 inline-block text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full">
                {stat}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
