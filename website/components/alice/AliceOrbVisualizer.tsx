'use client'

import { useRef, useEffect } from 'react'

interface Particle {
  angle: number
  distance: number
  speed: number
  size: number
  opacity: number
  baseDistance: number
  hue: number
}

interface AliceOrbVisualizerProps {
  size: number
  audioLevel: number
  status: 'idle' | 'connecting' | 'connected' | 'disconnected'
  isSpeaking: boolean
  className?: string
}

const COLORS = {
  teal:     { r: 107, g: 155, b: 174 },
  tealLight:{ r: 143, g: 184, b: 199 },
  coral:    { r: 196, g: 149, b: 106 },
  coralLight:{ r: 240, g: 190, b: 150 },
  navy:     { r: 61,  g: 90,  b: 115 },
  navyDark: { r: 44,  g: 67,  b: 86  },
  cream:    { r: 250, g: 247, b: 242 },
  sky:      { r: 99,  g: 197, b: 255 },
}

function createParticles(count: number, baseRadius: number): Particle[] {
  return Array.from({ length: count }, () => ({
    angle: Math.random() * Math.PI * 2,
    distance: baseRadius * (0.88 + Math.random() * 0.45),
    speed: 0.002 + Math.random() * 0.007,
    size: 0.8 + Math.random() * 2.5,
    opacity: 0.25 + Math.random() * 0.6,
    baseDistance: baseRadius * (0.88 + Math.random() * 0.45),
    hue: Math.random(),
  }))
}

export function AliceOrbVisualizer({ size, audioLevel, status, isSpeaking, className }: AliceOrbVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const timeRef = useRef(0)
  const prefersReducedMotion = useRef(false)
  const canvasSizeRef = useRef({ w: 0, h: 0 })
  const audioLevelRef = useRef(audioLevel)
  const statusRef = useRef(status)
  const isSpeakingRef = useRef(isSpeaking)
  const sizeRef = useRef(size)

  audioLevelRef.current = audioLevel
  statusRef.current = status
  isSpeakingRef.current = isSpeaking
  sizeRef.current = size

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const w = size * dpr
    const h = size * dpr
    canvas.width = w
    canvas.height = h
    canvasSizeRef.current = { w, h }
  }, [size])

  useEffect(() => {
    function draw() {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const currentSize = sizeRef.current
      const currentAudioLevel = audioLevelRef.current
      const currentStatus = statusRef.current
      const currentIsSpeaking = isSpeakingRef.current
      const { w, h } = canvasSizeRef.current
      if (w === 0 || h === 0) return

      const cx = w / 2
      const cy = h / 2
      const baseRadius = w * 0.32
      const time = timeRef.current

      const isMobile = currentSize < 80
      const particleCount = isMobile ? 10 : 22
      if (particlesRef.current.length !== particleCount) {
        particlesRef.current = createParticles(particleCount, baseRadius)
      }

      ctx.clearRect(0, 0, w, h)

      if (prefersReducedMotion.current) {
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseRadius)
        if (currentIsSpeaking) {
          grad.addColorStop(0, `rgba(${COLORS.coral.r}, ${COLORS.coral.g}, ${COLORS.coral.b}, 0.9)`)
          grad.addColorStop(1, `rgba(${COLORS.navyDark.r}, ${COLORS.navyDark.g}, ${COLORS.navyDark.b}, 0.6)`)
        } else {
          grad.addColorStop(0, `rgba(${COLORS.teal.r}, ${COLORS.teal.g}, ${COLORS.teal.b}, 0.9)`)
          grad.addColorStop(1, `rgba(${COLORS.navyDark.r}, ${COLORS.navyDark.g}, ${COLORS.navyDark.b}, 0.6)`)
        }
        ctx.beginPath()
        ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
        animFrameRef.current = requestAnimationFrame(draw)
        return
      }

      // Breathing + audio reactivity
      const breathe = Math.sin(time * 1.4) * 0.035
      const audioDistortion = currentAudioLevel * 0.18
      const currentRadius = baseRadius * (1 + breathe + audioDistortion)

      // Choose color theme
      const glowColor = currentIsSpeaking ? COLORS.coralLight : COLORS.tealLight
      const baseColor = currentIsSpeaking ? COLORS.coral : COLORS.teal

      // ── Outer multi-ring glow ──
      for (let i = 4; i > 0; i--) {
        const glowRadius = currentRadius * (1 + i * 0.22 + currentAudioLevel * 0.12)
        const glowGrad = ctx.createRadialGradient(cx, cy, currentRadius * 0.75, cx, cy, glowRadius)
        const alpha = (0.06 + currentAudioLevel * 0.08) / i
        glowGrad.addColorStop(0, `rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, ${alpha})`)
        glowGrad.addColorStop(1, `rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, 0)`)
        ctx.beginPath()
        ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2)
        ctx.fillStyle = glowGrad
        ctx.fill()
      }

      // ── Neon ring border ──
      const ringOpacity = 0.25 + currentAudioLevel * 0.4
      const ringGrad = ctx.createRadialGradient(cx, cy, currentRadius * 0.9, cx, cy, currentRadius * 1.05)
      ringGrad.addColorStop(0, `rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, ${ringOpacity})`)
      ringGrad.addColorStop(0.6, `rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, ${ringOpacity * 0.3})`)
      ringGrad.addColorStop(1, `rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, 0)`)
      ctx.beginPath()
      ctx.arc(cx, cy, currentRadius * 1.02, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, ${ringOpacity})`
      ctx.lineWidth = 1.5 * (window.devicePixelRatio || 1)
      ctx.stroke()

      // ── Sphere body ──
      const sphereGrad = ctx.createRadialGradient(
        cx - currentRadius * 0.22, cy - currentRadius * 0.22, 0, cx, cy, currentRadius
      )

      if (currentIsSpeaking) {
        sphereGrad.addColorStop(0, `rgba(${COLORS.coralLight.r}, ${COLORS.coralLight.g}, ${COLORS.coralLight.b}, 0.98)`)
        sphereGrad.addColorStop(0.4, `rgba(${COLORS.coral.r}, ${COLORS.coral.g}, ${COLORS.coral.b}, 0.82)`)
        sphereGrad.addColorStop(0.75, `rgba(${COLORS.teal.r}, ${COLORS.teal.g}, ${COLORS.teal.b}, 0.55)`)
        sphereGrad.addColorStop(1, `rgba(${COLORS.navyDark.r}, ${COLORS.navyDark.g}, ${COLORS.navyDark.b}, 0.9)`)
      } else if (currentStatus === 'connected') {
        sphereGrad.addColorStop(0, `rgba(${COLORS.tealLight.r}, ${COLORS.tealLight.g}, ${COLORS.tealLight.b}, 0.98)`)
        sphereGrad.addColorStop(0.45, `rgba(${COLORS.teal.r}, ${COLORS.teal.g}, ${COLORS.teal.b}, 0.82)`)
        sphereGrad.addColorStop(0.8, `rgba(${COLORS.navy.r}, ${COLORS.navy.g}, ${COLORS.navy.b}, 0.6)`)
        sphereGrad.addColorStop(1, `rgba(${COLORS.navyDark.r}, ${COLORS.navyDark.g}, ${COLORS.navyDark.b}, 0.9)`)
      } else if (currentStatus === 'connecting') {
        const pulse = Math.sin(time * 6) * 0.25 + 0.75
        sphereGrad.addColorStop(0, `rgba(${COLORS.tealLight.r}, ${COLORS.tealLight.g}, ${COLORS.tealLight.b}, ${pulse})`)
        sphereGrad.addColorStop(0.7, `rgba(${COLORS.navy.r}, ${COLORS.navy.g}, ${COLORS.navy.b}, 0.6)`)
        sphereGrad.addColorStop(1, `rgba(${COLORS.navyDark.r}, ${COLORS.navyDark.g}, ${COLORS.navyDark.b}, 0.85)`)
      } else {
        // idle — subtle shimmer
        const shimmer = Math.sin(time * 0.8) * 0.05 + 0.82
        sphereGrad.addColorStop(0, `rgba(${COLORS.teal.r}, ${COLORS.teal.g}, ${COLORS.teal.b}, ${shimmer})`)
        sphereGrad.addColorStop(0.6, `rgba(${COLORS.navy.r}, ${COLORS.navy.g}, ${COLORS.navy.b}, 0.65)`)
        sphereGrad.addColorStop(1, `rgba(${COLORS.navyDark.r}, ${COLORS.navyDark.g}, ${COLORS.navyDark.b}, 0.85)`)
      }

      // Morphing blob when speaking and audio active
      ctx.beginPath()
      if (currentIsSpeaking && currentAudioLevel > 0.04) {
        const points = 80
        for (let i = 0; i <= points; i++) {
          const a = (i / points) * Math.PI * 2
          const d1 = Math.sin(a * 4 + time * 3.5) * currentAudioLevel * baseRadius * 0.10
          const d2 = Math.sin(a * 7 - time * 2.1) * currentAudioLevel * baseRadius * 0.05
          const r = currentRadius + d1 + d2
          const x = cx + Math.cos(a) * r
          const y = cy + Math.sin(a) * r
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
      } else {
        ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2)
      }
      ctx.fillStyle = sphereGrad
      ctx.fill()

      // ── Inner shimmer highlight ──
      const highlightGrad = ctx.createRadialGradient(
        cx - currentRadius * 0.28, cy - currentRadius * 0.28, 0,
        cx - currentRadius * 0.08, cy - currentRadius * 0.08, currentRadius * 0.65
      )
      const hlAlpha = 0.20 + Math.sin(time * 1.8) * 0.06
      highlightGrad.addColorStop(0, `rgba(${COLORS.cream.r}, ${COLORS.cream.g}, ${COLORS.cream.b}, ${hlAlpha})`)
      highlightGrad.addColorStop(0.5, `rgba(${COLORS.cream.r}, ${COLORS.cream.g}, ${COLORS.cream.b}, ${hlAlpha * 0.3})`)
      highlightGrad.addColorStop(1, `rgba(${COLORS.cream.r}, ${COLORS.cream.g}, ${COLORS.cream.b}, 0)`)
      ctx.beginPath()
      ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2)
      ctx.fillStyle = highlightGrad
      ctx.fill()

      // ── Orbiting particles ──
      const particles = particlesRef.current
      const dpr = window.devicePixelRatio || 1
      const spreadFactor = 1 + currentAudioLevel * 0.65
      for (const p of particles) {
        p.angle += p.speed * (currentStatus === 'connecting' ? 3.5 : 1)
        const dist = p.baseDistance * spreadFactor + Math.sin(time * 1.8 + p.angle * 2.5) * baseRadius * 0.06
        const px = cx + Math.cos(p.angle) * dist
        const py = cy + Math.sin(p.angle) * dist
        const alpha = p.opacity * (0.55 + currentAudioLevel * 0.45)

        const pc = currentIsSpeaking
          ? (p.hue > 0.5 ? COLORS.coralLight : COLORS.coral)
          : (p.hue > 0.5 ? COLORS.tealLight : COLORS.sky)

        const pSize = p.size * dpr * (1 + currentAudioLevel * 0.5)
        const pGrad = ctx.createRadialGradient(px, py, 0, px, py, pSize)
        pGrad.addColorStop(0, `rgba(${pc.r}, ${pc.g}, ${pc.b}, ${alpha})`)
        pGrad.addColorStop(1, `rgba(${pc.r}, ${pc.g}, ${pc.b}, 0)`)
        ctx.beginPath()
        ctx.arc(px, py, pSize, 0, Math.PI * 2)
        ctx.fillStyle = pGrad
        ctx.fill()
      }

      timeRef.current += 0.016
      animFrameRef.current = requestAnimationFrame(draw)
    }

    animFrameRef.current = requestAnimationFrame(draw)
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: size, height: size, willChange: 'transform' }}
    />
  )
}
