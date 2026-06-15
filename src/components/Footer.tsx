export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white/40 py-14 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 pb-10 border-b border-white/10">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🚬</span>
              <div className="leading-none">
                <span className="block text-white font-bold text-lg tracking-tight">에코시가렛</span>
                <span className="block text-emerald-400 text-[10px] tracking-widest uppercase">EcoCigarette</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed">담배꽁초를 포인트로 환급하는 순환플랫폼. 버리면 쓰레기, 모으면 자원.</p>
            <p className="mt-3 text-xs">운영사: META ICT | metaict.kr</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            {[
              { title: '서비스', links: ['앱 다운로드', '수거함 찾기', '포인트 조회', '환급 신청'] },
              { title: '정보',   links: ['꽁초 오염 통계', '재활용 공정', '파트너 기업', '뉴스룸'] },
              { title: '고객지원', links: ['자주 묻는 질문', '1:1 문의', '수거함 제안', '기업 도입'] },
            ].map(({ title, links }) => (
              <div key={title}>
                <p className="text-white/70 font-semibold mb-3">{title}</p>
                <ul className="flex flex-col gap-2">
                  {links.map(l => <li key={l}><a href="#" className="hover:text-emerald-400 transition-colors">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <span>© {new Date().getFullYear()} META ICT · 에코시가렛. 담배꽁초 하나가 세상을 바꿉니다.</span>
          <div className="flex gap-5">
            {['개인정보처리방침', '이용약관', '사업자정보'].map(l => (
              <a key={l} href="#" className="hover:text-white/70 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
