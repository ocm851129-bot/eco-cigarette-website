import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Stars, Trail, Float } from '@react-three/drei'
import * as THREE from 'three'

/* ── 정화 파티클: 오렌지(꽁초) → 에메랄드(자연) ── */
function PurifyParticles() {
  const count = 280
  const meshRef = useRef<THREE.Points>(null)

  const { positions, colors, lifes } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors    = new Float32Array(count * 3)
    const lifes     = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const r     = 2.2 + Math.random() * 3.5
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      lifes[i] = Math.random()
      // 오렌지
      colors[i * 3]     = 0.98
      colors[i * 3 + 1] = 0.57
      colors[i * 3 + 2] = 0.24
    }
    return { positions, colors, lifes }
  }, [])

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3))
    g.setAttribute('color',    new THREE.BufferAttribute(colors.slice(),    3))
    return g
  }, [positions, colors])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    const pos = geom.attributes.position as THREE.BufferAttribute
    const col = geom.attributes.color    as THREE.BufferAttribute

    for (let i = 0; i < count; i++) {
      lifes[i] = (lifes[i] + 0.0015) % 1
      const l = lifes[i]

      // 오렌지(0) → 에메랄드(1) 선형 보간
      col.setXYZ(i,
        0.98  + (0.20 - 0.98)  * l,
        0.57  + (0.83 - 0.57)  * l,
        0.24  + (0.60 - 0.24)  * l,
      )

      // 나선형으로 지구 쪽으로 이동
      const x = pos.getX(i)
      const y = pos.getY(i)
      const z = pos.getZ(i)
      const dist = Math.sqrt(x * x + y * y + z * z)
      if (dist > 1.6) {
        const speed = 0.003 * (1 + l)
        pos.setXYZ(i, x - x / dist * speed, y - y / dist * speed + Math.sin(t + i) * 0.003, z - z / dist * speed)
      } else {
        // 흡수됨 → 바깥에서 다시 시작
        const r     = 4.5 + Math.random() * 1.5
        const theta = Math.random() * Math.PI * 2
        const phi   = Math.acos(2 * Math.random() - 1)
        pos.setXYZ(i, r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi))
        lifes[i] = 0
      }
    }
    pos.needsUpdate = true
    col.needsUpdate = true
    meshRef.current.rotation.y = t * 0.03
  })

  return (
    <points ref={meshRef} geometry={geom}>
      <pointsMaterial size={0.045} vertexColors sizeAttenuation transparent opacity={0.85} />
    </points>
  )
}

/* ── 지구 본체 ── */
function Earth() {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.08
      meshRef.current.rotation.x = Math.sin(t * 0.05) * 0.05
    }
    if (glowRef.current) {
      glowRef.current.rotation.y = t * 0.04
      const scale = 1.08 + Math.sin(t * 0.6) * 0.015
      glowRef.current.scale.setScalar(scale)
    }
  })

  return (
    <group>
      {/* 대기권 글로우 */}
      <Sphere ref={glowRef} args={[1.55, 64, 64]}>
        <meshBasicMaterial
          color="#34d399"
          transparent
          opacity={0.045}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* 지구 본체 — 유기적으로 흔들리는 distort 재질 */}
      <Sphere ref={meshRef} args={[1.38, 128, 128]}>
        <MeshDistortMaterial
          color="#0d9488"
          emissive="#064e3b"
          emissiveIntensity={0.6}
          roughness={0.55}
          metalness={0.2}
          distort={0.22}
          speed={1.4}
          transparent
          opacity={0.88}
        />
      </Sphere>

      {/* 내부 코어 글로우 */}
      <Sphere args={[0.92, 32, 32]}>
        <meshBasicMaterial color="#6ee7b7" transparent opacity={0.06} />
      </Sphere>
    </group>
  )
}

/* ── 궤도 링 ── */
function OrbitRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.getElapsedTime() * speed
  })
  const geom = useMemo(() => new THREE.TorusGeometry(radius, 0.006, 8, 120), [radius])
  return (
    <mesh ref={ref} geometry={geom} rotation={[Math.PI / 2.5, 0.3, 0]}>
      <meshBasicMaterial color={color} transparent opacity={0.22} />
    </mesh>
  )
}

/* ── 비행 도트 (위성) ── */
function Satellite({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed
    if (ref.current) {
      ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 0.4) * 0.5, Math.sin(t) * radius)
    }
  })
  return (
    <Trail width={0.3} length={6} color={color} attenuation={(w) => w * w}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  )
}

/* ── 메인 씬 ── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[6, 4, 4]} intensity={3} color="#34d399" />
      <pointLight position={[-5, -3, -3]} intensity={1.2} color="#0ea5e9" />
      <pointLight position={[0, 0, 0]} intensity={0.8} color="#6ee7b7" />

      <Stars radius={60} depth={50} count={2000} factor={3} fade speed={0.5} />

      <Float speed={0.4} rotationIntensity={0.2} floatIntensity={0.3}>
        <Earth />
      </Float>

      <PurifyParticles />

      <OrbitRing radius={1.85} speed={0.12}  color="#34d399" />
      <OrbitRing radius={2.2}  speed={-0.08} color="#22d3ee" />
      <OrbitRing radius={2.6}  speed={0.05}  color="#6ee7b7" />

      <Satellite radius={2.0} speed={0.5}  color="#6ee7b7" />
      <Satellite radius={2.45} speed={-0.3} color="#67e8f9" />
    </>
  )
}

/* ── 컴포넌트 내보내기 ── */
export default function EarthBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
