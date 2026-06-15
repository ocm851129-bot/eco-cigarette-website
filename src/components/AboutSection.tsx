const STATS = [
  { num: '4,500억', label: '매년 전 세계에서 버려지는 담배꽁초 수' },
  { num: '40L', label: '꽁초 1개가 오염시키는 물의 양' },
  { num: '10년', label: '담배꽁초 필터가 분해되는 데 걸리는 시간' },
  { num: '32%', label: '도시 하수구 오염물질 중 담배꽁초 비율' },
]

const STEPS = [
  { num: '01', icon: '📱', title: '앱 설치', desc: '에코시가렛 앱을 다운로드하고 회원가입합니다.' },
  { num: '02', icon: '🚬', title: '꽁초 수거', desc: '거리, 공원, 하수구 주변의 담배꽁초를 줍습니다.' },
  { num: '03', icon: '📦', title: 'QR 스캔', desc: '가까운 에코시가렛 수거함을 찾아 QR을 스캔합니다.' },
  { num: '04', icon: '💰', title: '포인트 환급', desc: '수거량에 따라 포인트가 즉시 적립됩니다.' },
]

export default function AboutSection() {
  return (
    <>
      {/* 통계 섹션 */}
      <section className="bg-[#f6faf7] py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold tracking-[0.18em] text-emerald-600 uppercase">왜 에코시가렛인가</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                작은 꽁초 하나가<br />
                <span className="font-playfair italic font-normal text-emerald-700">강과 바다를 오염시킵니다</span>
              </h2>
              <p className="mt-6 text-gray-500 leading-relaxed">
                담배꽁초는 전 세계에서 가장 많이 버려지는 쓰레기입니다. 플라스틱 필터 속 유해물질이 수질을 오염시키고 생태계를 파괴합니다. 에코시가렛은 이 문제를 개인의 참여와 보상 시스템으로 해결합니다.
              </p>
              <p className="mt-4 text-gray-500 leading-relaxed">
                수거된 꽁초는 특수 가공을 거쳐 건축자재·섬유 원료로 재탄생합니다. 버리면 쓰레기, 모으면 자원입니다.
              </p>
              <div className="mt-8 flex gap-4 flex-wrap">
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-7 py-3.5 rounded-full transition-colors">
                  지금 참여하기
                </button>
                <button className="border border-gray-300 text-gray-700 text-sm font-medium px-7 py-3.5 rounded-full hover:border-emerald-400 hover:text-emerald-700 transition-colors">
                  리포트 보기
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map(({ num, label }) => (
                <div key={num} className="bg-white border border-gray-100 rounded-2xl p-7 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-50 transition-all">
                  <span className="block text-3xl font-bold text-emerald-600 tracking-tight">{num}</span>
                  <span className="block mt-2 text-sm text-gray-500 leading-snug">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 이용 방법 */}
      <section className="bg-white py-28 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-[0.18em] text-emerald-600 uppercase">이용 방법</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-16">
            4단계로 완성되는<br />담배꽁초 순환
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map(({ num, icon, title, desc }) => (
              <div key={num} className="relative">
                <div className="bg-[#f6faf7] rounded-2xl p-8 h-full hover:shadow-lg transition-shadow">
                  <span className="block text-4xl mb-4">{icon}</span>
                  <span className="block text-5xl font-black text-emerald-100 absolute top-6 right-6">{num}</span>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
                {num !== '04' && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 text-emerald-300 text-2xl z-10">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
