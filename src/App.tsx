import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Nav from './components/Nav'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import ProblemSection from './components/ProblemSection'
import EarthSection from './components/EarthSection'
import CirculationSection from './components/CirculationSection'
import MapSection from './components/MapSection'
import PointsSection from './components/PointsSection'
import PointForm from './components/PointForm'
import JoinSection from './components/JoinSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'

function AppInner() {
  const [showAuth, setShowAuth] = useState(false)

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Toaster position="top-right" toastOptions={{
        style: { background: '#0B140D', color: '#fff', border: '1px solid rgba(74,222,128,0.2)' },
      }} />

      <Nav onLoginClick={() => setShowAuth(true)} />

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

      <HeroSection />
      <FeaturesSection />
      <ProblemSection />
      <EarthSection />
      <CirculationSection />
      <MapSection />
      <PointsSection />
      <PointForm onLoginRequired={() => setShowAuth(true)} />
      <JoinSection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  )
}
