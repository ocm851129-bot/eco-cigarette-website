const STORIES = [
  {
    label: '강·하수구',
    title: '하수구를 막는 건 낙엽이 아닙니다',
    desc: '도시 하수구 오염물질의 32%가 담배꽁초입니다. 비가 오면 그대로 강과 바다로 흘러 수생태계를 파괴합니다.',
    img: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800&q=80',
    badge: '수질 오염',
    badgeColor: 'bg-blue-600/80',
  },
  {
    label: '산·등산로',
    title: '산길마다 남겨진 꽁초의 무게',
    desc: '국내 등산로 1km당 평균 120개의 담배꽁초가 버려집니다. 산불의 주요 원인이며 야생동물이 먹이로 오인하기도 합니다.',
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    badge: '산림 오염',
    badgeColor: 'bg-green-700/80',
  },
  {
    label: '바다·해변',
    title: '모래사장 쓰레기 1위, 담배꽁초',
    desc: '전 세계 해변 클린업에서 매년 가장 많이 수거되는 쓰레기는 담배꽁초입니다. 필터의 미세플라스틱이 해양생물 체내에 축적됩니다.',
    img: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80',
    badge: '해양 오염',
    badgeColor: 'bg-cyan-600/80',
  },
]

export default function CoursesSection() {
  return (
    <section className="bg-gray-950 py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-14 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-[0.18em] text-emerald-400 uppercase">꽁초가 가는 곳</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              버려진 꽁초는<br />어디로 가나요?
            </h2>
          </div>
          <button className="self-start sm:self-auto border border-white/20 text-white/70 text-sm font-medium px-6 py-2.5 rounded-full hover:border-emerald-400/50 hover:text-emerald-300 transition-all">
            환경 오염 데이터 보기 →
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {STORIES.map(({ label, title, desc, img, badge, badgeColor }) => (
            <div key={title} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl h-60 mb-5">
                <img
                  src={img}
                  alt={title}
                  className="w-full h-full object-cover"
                  style={{ transform: 'scale(1)', transition: 'transform 0.7s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
                <span className={`absolute top-4 left-4 text-[10px] font-bold tracking-widest text-white px-3 py-1 rounded-full uppercase ${badgeColor} backdrop-blur-sm`}>
                  {badge}
                </span>
              </div>
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{label}</span>
              <h3 className="mt-1.5 text-white font-semibold text-lg leading-snug mb-2.5 group-hover:text-emerald-400 transition-colors">
                {title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
