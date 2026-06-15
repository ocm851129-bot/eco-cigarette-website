import { useEffect, useRef, useState } from 'react'
import RevealLayer from './RevealLayer'

const BG_IMAGE_1 = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=95'
const BG_IMAGE_2 = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=95'

export default function HeroSection() {
  const mouseRef  = useRef({ x: -999, y: -999 })
  const smoothRef = useRef({ x: -999, y: -999 })
  const rafRef    = useRef<number>(0)
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    const tick = () => {
      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.08
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.08
      setCursorPos({ x: smoothRef.current.x, y: smoothRef.current.y })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section className="relative w-full overflow-hidden bg-black" style={{ height: '100dvh' }}>

      {/* 베이스 이미지 */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom"
        style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
      />

      {/* 다층 오버레이 */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-black/40 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-black/40 to-transparent" />
        <div className="absolute inset-0 opacity-20" style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(16,185,129,0.15) 0%, transparent 70%)'
        }} />
      </div>

      {/* 커서 스포트라이트 */}
      <RevealLayer image={BG_IMAGE_2} cursorX={cursorPos.x} cursorY={cursorPos.y} />

      {/* 헤딩 */}
      <div className="absolute top-[12%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none z-50">
        <div
          className="hero-anim hero-fade inline-flex items-center gap-2 mb-7 px-4 py-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 backdrop-blur-sm"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-semibold tracking-[0.2em] text-emerald-300 uppercase">
            담배꽁초 순환플랫폼 · EcoCigarette
          </span>
        </div>

        <h1 className="text-white leading-[0.9]">
          <span
            className="block font-playfair italic font-normal hero-anim hero-reveal"
            style={{ fontSize: 'clamp(42px, 7.5vw, 90px)', letterSpacing: '-0.03em', animationDelay: '0.25s', textShadow: '0 2px 40px rgba(0,0,0,0.5)' }}
          >
            담배꽁초 하나가
          </span>
          <span
            className="block font-extrabold hero-anim hero-reveal"
            style={{ fontSize: 'clamp(42px, 7.5vw, 90px)', letterSpacing: '-0.06em', animationDelay: '0.42s', textShadow: '0 2px 40px rgba(0,0,0,0.5)' }}
          >
            세상을 바꿉니다.
          </span>
        </h1>

        <p className="hero-anim hero-fade mt-6 text-white/60 text-sm sm:text-base max-w-md leading-relaxed"
          style={{ animationDelay: '0.6s' }}>
          커서를 움직여 꽁초들이 돌아간 자연을 확인하세요
        </p>
      </div>

      {/* 좌하단 */}
      <div
        className="hidden sm:block absolute bottom-16 left-10 md:left-14 max-w-[260px] z-50 hero-anim hero-fade"
        style={{ animationDelay: '0.7s' }}
      >
        <div className="w-8 h-px bg-emerald-400/60 mb-4" />
        <p className="text-sm text-white/65 leading-relaxed">
          매년 4,500억 개의 담배꽁초가 하수구와 강, 바다로 흘러갑니다. 에코시가렛이 그 흐름을 바꿉니다.
        </p>
      </div>

      {/* 우하단 CTA */}
      <div
        className="absolute bottom-12 sm:bottom-20 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] flex flex-col items-start gap-4 z-50 hero-anim hero-fade"
        style={{ animationDelay: '0.85s' }}
      >
        <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
          꽁초를 수거하면 포인트로 즉시 환급됩니다.
        </p>
        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <button className="bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-bold px-7 py-3.5 rounded-full transition-all hover:scale-[1.04] active:scale-95 hover:shadow-xl hover:shadow-emerald-500/40 whitespace-nowrap">
            포인트 적립 시작하기 →
          </button>
          <button className="text-white/50 hover:text-white/80 text-xs text-center sm:text-left transition-colors">
            수거함 위치 찾기
          </button>
        </div>
      </div>

      {/* 스크롤 힌트 */}
      <div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1.5 hero-anim hero-fade"
        style={{ animationDelay: '1.2s' }}
      >
        <span className="text-white/30 text-[9px] tracking-[0.25em] uppercase">Scroll</span>
        <div className="w-px h-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent"
            style={{ animation: 'scrollLine 1.8s ease-in-out infinite' }} />
        </div>
      </div>

    </section>
  )
}
