export default function CTASection() {
  return (
    <section
      className="relative py-32 px-6 overflow-hidden"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=85)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/92 via-gray-950/85 to-black/90" />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <span className="text-xs font-semibold tracking-[0.18em] text-emerald-400 uppercase">지금 시작하세요</span>
        <h2 className="mt-4 text-4xl md:text-6xl font-bold text-white leading-[1.05] tracking-tight">
          담배꽁초 하나가<br />
          <span className="font-playfair italic font-normal text-emerald-300">세상을 바꿉니다</span>
        </h2>
        <p className="mt-6 text-white/60 text-base leading-relaxed max-w-xl mx-auto">
          오늘 길에서 꽁초 하나를 집는 것. 그것이 강을 살리고 바다를 지키고 당신의 도시를 더 깨끗하게 만드는 첫 걸음입니다.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <button className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-emerald-500/30 active:scale-95">앱 다운로드 · 무료 시작</button>
          <button className="border border-white/20 text-white/80 font-medium px-8 py-4 rounded-full hover:border-emerald-400/50 hover:text-emerald-300 transition-all">수거함 위치 찾기 →</button>
        </div>
        <div className="mt-14 grid grid-cols-3 gap-6 max-w-xl mx-auto">
          {[
            { num: '128만개', label: '누적 수거 꽁초' },
            { num: '5.1만L',  label: '보호된 수질' },
            { num: '3,200명', label: '참여 회원' },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <span className="block text-2xl sm:text-3xl font-bold text-emerald-400">{num}</span>
              <span className="block mt-1 text-xs text-white/50">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
