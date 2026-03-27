'use client'

import { useRef, useEffect } from 'react'

interface Particle {
  angle: number
  distance: number
  speed: number
  size: number
  opacity: number
  baseDistance: number
}

interface AliceOrbVisualizerProps {
  size: number
  audioLevel: number
  status: 'idle' | 'connecting' | 'connected' | 'disconnected'
  isSpeaking: boolean
  className?: string
}

const COLORS = {
  teal: { r: 107, g: 155, b: 174 },
  tealLight: { r: 143, g: 184, b: 199 },
  coral: { r: 196, g: 149, b: 106 },
  navy: { r: 61, g: 90, b: 115 },
  navyDark: { r: 44, g: 67, b: 86 },
  cream: { r: 250, g: 247, b: 242 },
}

function createParticles(count: number, baseRadius: number): Particle[] {
  return Array.from({ length: count }, () => ({
    angle: Math.random() * Math.PI * 2,
    distance: baseRadius * (0.9 + Math.random() * 0.4),
    speed: 0.003 + Math.random() * 0.008,
    size: 1 + Math.random() * 2,
    opacity: 0.3 + Math.random() * 0.5,
    baseDistance: baseRadius * (0.9 + Math.random() * 0.4),
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
      const baseRadius = w * 0.3
      const time = timeRef.current

      const isMobile = currentSize < 80
      const particleCount = isMobile ? 8 : 16
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

      const breathe = Math.sin(time * 1.5) * 0.04
      const audioDistortion = currentAudioLevel * 0.15
      const currentRadius = baseRadius * (1 + breathe + audioDistortion)

      const glowColor = currentIsSpeaking ? COLORS.coral : COLORS.teal
      for (let i = 3; i > 0; i--) {
        const glowRadius = currentRadius * (1 + i * 0.25 + currentAudioLevel * 0.1)
        const glowGrad = ctx.createRadialGradient(cx, cy, currentRadius * 0.8, cx, cy, glowRadius)
        glowGrad.addColorStop(0, `rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, ${0.08 + currentAudioLevel * 0.06})`)
        glowGrad.addColorStop(1, `rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, 0)`)
        ctx.beginPath()
        ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2)
        ctx.fillStyle = glowGrad
        ctx.fill()
      }

      const sphereGrad = ctx.createRadialGradient(
        cx - currentRadius * 0.2, cy - currentRadius * 0.2, 0, cx, cy, currentRadius
      )

      if (currentIsSpeaking) {
        sphereGrad.addColorStop(0, `rgba(${COLORS.coral.r}, ${COLORS.coral.g}, ${COLORS.coral.b}, 0.95)`)
        sphereGrad.addColorStop(0.5, `rgba(${COLORS.teal.r}, ${COLORS.teal.g}, ${COLORS.teal.b}, 0.7)`)
        sphereGrad.addColorStop(1, `rgba(${COLORS.navyDark.r}, ${COLORS.navyDark.g}, ${COLORS.navyDark.b}, 0.85)`)
      } else if (currentStatus === 'connected') {
        sphereGrad.addColorStop(0, `rgba(${COLORS.tealLight.r}, ${COLORS.tealLight.g}, ${COLORS.tealLight.b}, 0.95)`)
        sphereGrad.addColorStop(0.6, `rgba(${COLORS.teal.r}, ${COLORS.teal.g}, ${COLORS.teal.b}, 0.8)`)
        sphereGrad.addColorStop(1, `rgba(${COLORS.navyDark.r}, ${COLORS.navyDark.g}, ${COLORS.navyDark.b}, 0.85)`)
      } else if (currentStatus === 'connecting') {
        const pulse = Math.sin(time * 6) * 0.3 + 0.7
        sphereGrad.addColorStop(0, `rgba(${COLORS.teal.r}, ${COLORS.teal.g}, ${COLORS.teal.b}, ${pulse})`)
        sphereGrad.addColorStop(1, `rgba(${COLORS.navyDark.r}, ${COLORS.navyDark.g}, ${COLORS.navyDark.b}, 0.8)`)
      } else {
        sphereGrad.addColorStop(0, `rgba(${COLORS.teal.r}, ${COLORS.teal.g}, ${COLORS.teal.b}, 0.85)`)
        sphereGrad.addColorStop(0.7, `rgba(${COLORS.navy.r}, ${COLORS.navy.g}, ${COLORS.navy.b}, 0.7)`)
        sphereGrad.addColorStop(1, `rgba(${COLORS.navyDark.r}, ${COLORS.navyDark.g}, ${COLORS.navyDark.b}, 0.8)`)
      }

      ctx.beginPath()
      if (currentIsSpeaking && currentAudioLevel > 0.05) {
        const points = 64
        for (let i = 0; i <= points; i++) {
          const a = (i / points) * Math.PI * 2
          const distort = Math.sin(a * 4 + time * 3) * currentAudioLevel * baseRadius * 0.12
          const r = currentRadius + distort
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

      const highlightGrad = ctx.createRadialGradient(
        cx - currentRadius * 0.3, cy - currentRadius * 0.3, 0,
        cx - currentRadius * 0.1, cy - currentRadius * 0.1, currentRadius * 0.6
      )
      highlightGrad.addColorStop(0, `rgba(${COLORS.cream.r}, ${COLORS.cream.g}, ${COLORS.cream.b}, 0.15)`)
      highlightGrad.addColorStop(1, `rgba(${COLORS.cream.r}, ${COLORS.cream.g}, ${COLORS.cream.b}, 0)`)
      ctx.beginPath()
      ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2)
      ctx.fillStyle = highlightGrad
      ctx.fill()

      const particles = particlesRef.current
      const dpr = window.devicePixelRatio || 1
      const spreadFactor = 1 + currentAudioLevel * 0.5
      for (const p of particles) {
        p.angle += p.speed * (currentStatus === 'connecting' ? 3 : 1)
        const dist = p.baseDistance * spreadFactor + Math.sin(time * 2 + p.angle * 3) * baseRadius * 0.05
        const px = cx + Math.cos(p.angle) * dist
        const py = cy + Math.sin(p.angle) * dist
        const alpha = p.opacity * (0.6 + currentAudioLevel * 0.4)

        const pGrad = ctx.createRadialGradient(px, py, 0, px, py, p.size * dpr)
        const pc = currentIsSpeaking ? COLORS.coral : COLORS.tealLight
        pGrad.addColorStop(0, `rgba(${pc.r}, ${pc.g}, ${pc.b}, ${alpha})`)
        pGrad.addColorStop(1, `rgba(${pc.r}, ${pc.g}, ${pc.b}, 0)`)
        ctx.beginPath()
        ctx.arc(px, py, p.size * dpr, 0, Math.PI * 2)
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
