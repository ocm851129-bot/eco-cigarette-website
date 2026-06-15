import { Suspense } from 'react'
import EarthBackground from './EarthBackground'

export default function EarthSection() {
  return (
    <div className="relative overflow-hidden bg-[#020c06]" style={{ height: '100vh' }}>

      {/* 3D 지구 */}
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 rounded-full border border-emerald-500/20 animate-pulse" />
        </div>
      }>
        <EarthBackground />
      </Suspense>

      {/* 상단 페이드 */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-950 to-transparent pointer-events-none" />
      {/* 하단 페이드 */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0b0f0c] to-transparent pointer-events-none" />

      {/* 오버레이 텍스트 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-10">
        <span className="inline-block mb-5 text-[11px] font-semibold tracking-[0.22em] text-emerald-400 uppercase">
          에코시가렛이 만드는 변화
        </span>
        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">
          꽁초가 사라지면<br />
          <span className="font-playfair italic font-normal text-emerald-300">지구가 다시 숨쉽니다</span>
        </h2>
        <p className="mt-6 text-white/50 text-sm md:text-base max-w-lg leading-relaxed">
          오렌지색 점은 버려진 담배꽁초입니다.<br />
          지구 쪽으로 날아올수록 초록색으로 정화됩니다.
        </p>
        <div className="mt-10 flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-400" />
            <span className="text-xs text-white/50">버려진 꽁초</span>
          </div>
          <div className="w-16 h-px bg-gradient-to-r from-orange-400 to-emerald-400" />
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="text-xs text-white/50">정화된 자원</span>
          </div>
        </div>
      </div>

    </div>
  )
}
