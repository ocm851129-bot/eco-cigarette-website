import Nav from './components/Nav'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import ProblemSection from './components/ProblemSection'
import EarthSection from './components/EarthSection'
import CirculationSection from './components/CirculationSection'
import PointsSection from './components/PointsSection'
import JoinSection from './components/JoinSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

function App() {
  return (
    <div
      className="min-h-screen bg-white tracking-[-0.02em]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Nav />
      <HeroSection />
      <FeaturesSection />       {/* 브랜드 소개 */}
      <ProblemSection />        {/* 꽁초 문제 */}
      <EarthSection />          {/* 3D 지구 정화 */}
      <CirculationSection />    {/* 순환 시스템 */}
      <PointsSection />         {/* 포인트 환급 */}
      <JoinSection />           {/* 참여하기 */}
      <CTASection />
      <Footer />
    </div>
  )
}

export default App
