import { useEffect, useRef, useState } from 'react'
import { MapPin, Navigation, Search } from 'lucide-react'
import { getBoxes } from '../firebase/firestore'

interface Box {
  id: string
  name: string
  address: string
  lat: number
  lng: number
  type: string
}

// 샘플 수거함 데이터 (Firestore에 데이터 없을 때 사용)
const SAMPLE_BOXES: Box[] = [
  { id: '1', name: '마포구청 앞 수거함',    address: '서울 마포구 월드컵로 212',      lat: 37.5663, lng: 126.9022, type: '일반' },
  { id: '2', name: '홍대입구역 수거함',     address: '서울 마포구 양화로 188',        lat: 37.5577, lng: 126.9247, type: '대형' },
  { id: '3', name: '합정역 수거함',         address: '서울 마포구 합정동 367-4',      lat: 37.5497, lng: 126.9139, type: '일반' },
  { id: '4', name: '여의도 한강공원 수거함', address: '서울 영등포구 여의도동 85',     lat: 37.5281, lng: 126.9339, type: '대형' },
  { id: '5', name: '강남역 수거함',         address: '서울 강남구 강남대로 396',      lat: 37.4979, lng: 127.0276, type: '일반' },
  { id: '6', name: '홍익대 앞 수거함',      address: '서울 마포구 와우산로 94',       lat: 37.5547, lng: 126.9230, type: '소형' },
]

declare global {
  interface Window { kakao: any }
}

export default function MapSection() {
  const mapRef   = useRef<HTMLDivElement>(null)
  const [boxes, setBoxes]       = useState<Box[]>(SAMPLE_BOXES)
  const [selected, setSelected] = useState<Box | null>(null)
  const [search, setSearch]     = useState('')
  const [mapLoaded, setMapLoaded] = useState(false)
  const kakaoKey = import.meta.env.VITE_KAKAO_MAP_KEY

  // Firestore에서 수거함 로드
  useEffect(() => {
    getBoxes().then(data => {
      if (data.length > 0) setBoxes(data as Box[])
    }).catch(() => {})
  }, [])

  // 카카오맵 SDK 로드
  useEffect(() => {
    if (!kakaoKey || kakaoKey === '여기에_카카오맵_API_키_입력') {
      setMapLoaded(false)
      return
    }
    if (window.kakao?.maps) { setMapLoaded(true); return }

    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`
    script.onload = () => {
      window.kakao.maps.load(() => setMapLoaded(true))
    }
    document.head.appendChild(script)
  }, [kakaoKey])

  // 지도 렌더링
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return

    const center = new window.kakao.maps.LatLng(37.5563, 126.9723)
    const map = new window.kakao.maps.Map(mapRef.current, { center, level: 8 })

    const imageSrc  = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'
    const imageSize = new window.kakao.maps.Size(24, 35)
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize)

    boxes.forEach(box => {
      const pos    = new window.kakao.maps.LatLng(box.lat, box.lng)
      const marker = new window.kakao.maps.Marker({ position: pos, map, image: markerImage })
      window.kakao.maps.event.addListener(marker, 'click', () => setSelected(box))
    })
  }, [mapLoaded, boxes])

  const filtered = boxes.filter(b =>
    b.name.includes(search) || b.address.includes(search)
  )

  return (
    <section id="지도" className="py-28 px-6" style={{ background: '#0B140D' }}>
      <div className="max-w-6xl mx-auto">

        {/* 헤더 */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] text-emerald-400 uppercase">수거함 지도</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white leading-tight">
              내 주변 에코시가렛<br />
              <span className="font-playfair italic font-normal text-emerald-300">수거함을 찾아보세요</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm">전국 {boxes.length}개 수거함 운영 중</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* 사이드: 검색 + 목록 */}
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="지역명 또는 주소 검색"
                className="w-full pl-10 pr-4 py-3 rounded-xl text-white text-sm outline-none"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>

            <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
              {filtered.map(box => (
                <button
                  key={box.id}
                  onClick={() => setSelected(box)}
                  className={`w-full text-left p-4 rounded-xl transition-all border ${
                    selected?.id === box.id
                      ? 'border-emerald-500/50 bg-emerald-500/10'
                      : 'border-white/5 bg-white/3 hover:bg-white/6'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className={`mt-0.5 flex-shrink-0 ${selected?.id === box.id ? 'text-emerald-400' : 'text-white/30'}`} />
                    <div>
                      <p className="text-white font-semibold text-sm">{box.name}</p>
                      <p className="text-white/40 text-xs mt-0.5">{box.address}</p>
                      <span className={`inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        box.type === '대형' ? 'bg-emerald-500/20 text-emerald-400' :
                        box.type === '소형' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-white/10 text-white/50'
                      }`}>{box.type}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 지도 영역 */}
          <div className="lg:col-span-2">
            {!mapLoaded ? (
              /* 카카오 키 없을 때 대체 UI */
              <div className="rounded-2xl overflow-hidden border border-white/8 h-[480px] flex flex-col items-center justify-center gap-4"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="text-5xl">🗺️</div>
                <div className="text-center">
                  <p className="text-white font-semibold">카카오맵 API 키가 필요합니다</p>
                  <p className="text-white/40 text-sm mt-2 max-w-xs">
                    <a href="https://developers.kakao.com" target="_blank" rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline">developers.kakao.com</a>에서
                    앱 등록 후 .env 파일에 키를 입력하면 지도가 활성화됩니다.
                  </p>
                </div>
                {/* 임시 목록 표시 */}
                <div className="grid grid-cols-2 gap-3 mt-4 px-6 w-full max-w-md">
                  {SAMPLE_BOXES.slice(0, 4).map(b => (
                    <div key={b.id} className="p-3 rounded-xl border border-white/8 bg-white/3 text-center">
                      <p className="text-white text-xs font-semibold">{b.name}</p>
                      <p className="text-white/40 text-[10px] mt-1">{b.type} 수거함</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden border border-white/8 h-[480px] relative">
                <div ref={mapRef} className="w-full h-full" />
                {selected && (
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl p-4 flex items-start gap-3"
                    style={{ background: 'rgba(11,20,13,0.95)', border: '1px solid rgba(74,222,128,0.3)', backdropFilter: 'blur(10px)' }}>
                    <MapPin size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-white font-bold text-sm">{selected.name}</p>
                      <p className="text-white/50 text-xs mt-0.5">{selected.address}</p>
                    </div>
                    <a
                      href={`https://map.kakao.com/link/to/${selected.name},${selected.lat},${selected.lng}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold hover:text-emerald-300 transition-colors"
                    >
                      <Navigation size={14} /> 길찾기
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
