import { Suspense, lazy } from 'react'

const EarthBackground = lazy(() => import('./EarthBackground'))

interface Props { children: React.ReactNode }

export default function EarthWrapper({ children }: Props) {
  return (
    <div className="relative">
      {/* 어두운 베이스 배경 */}
      <div className="absolute inset-0 bg-[#030f07]" />

      {/* 3D 지구 캔버스 — 고정 중앙 */}
      <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <Suspense fallback={null}>
          <EarthBackground />
        </Suspense>
        {/* 상하 페이드 */}
        <div className="absolute inset-x-0 top-0    h-32 bg-gradient-to-b from-[#030f07] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030f07] to-transparent" />
      </div>

      {/* 콘텐츠: 지구 위에 float */}
      <div className="relative" style={{ zIndex: 1, marginTop: '-100vh' }}>
        {children}
      </div>
    </div>
  )
}
