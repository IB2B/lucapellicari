'use client'

import { useRef, useEffect } from 'react'

interface AliceWaveformProps {
  audioLevel: number
  isSpeaking: boolean
  className?: string
}

export function AliceWaveform({ audioLevel, isSpeaking, className }: AliceWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const phaseRef = useRef(0)
  const smoothRef = useRef(0)
  const speakRef = useRef(0)
  const sizeRef = useRef({ w: 0, h: 0 })
  const propsRef = useRef({ audioLevel, isSpeaking })
  propsRef.current = { audioLevel, isSpeaking }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = canvas.clientWidth * dpr
      const h = canvas.clientHeight * dpr
      if (w > 0 && h > 0) { canvas.width = w; canvas.height = h; sizeRef.current = { w, h } }
    }
    updateSize()
    const obs = new ResizeObserver(updateSize)
    obs.observe(canvas)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

    function draw() {
      const canvas = canvasRef.current
      if (!canvas) { animRef.current = requestAnimationFrame(draw); return }
      const ctx = canvas.getContext('2d')
      if (!ctx) { animRef.current = requestAnimationFrame(draw); return }

      const { w, h } = sizeRef.current
      if (!w || !h) { animRef.current = requestAnimationFrame(draw); return }

      const { audioLevel: al, isSpeaking: sp } = propsRef.current
      const phase = phaseRef.current
      const midY = h / 2
      const dpr = window.devicePixelRatio || 1

      // Smooth audio — fast attack, slow release
      smoothRef.current += (al - smoothRef.current) * (al > smoothRef.current ? 0.22 : 0.06)
      // Smooth color transition
      speakRef.current += ((sp ? 1 : 0) - speakRef.current) * 0.07
      const audio = smoothRef.current
      const st = speakRef.current

      ctx.clearRect(0, 0, w, h)

      // Color blend: teal (listening) → coral (Alice speaking)
      const r = Math.round(lerp(107, 196, st))
      const g = Math.round(lerp(155, 149, st))
      const b = Math.round(lerp(174, 106, st))
      // Lighter accent
      const r2 = Math.round(lerp(143, 240, st))
      const g2 = Math.round(lerp(184, 200, st))
      const b2 = Math.round(lerp(199, 160, st))

      const amplitude = h * 0.4 * (0.05 + audio * 0.95)
      const steps = Math.min(Math.floor(w / 1.5), 350)

      const layers = [
        { freq: 2.0, amp: 1.0,  speed: 1.0,  width: 2.8, alpha: 0.9, offset: 0 },
        { freq: 3.4, amp: 0.55, speed: 1.4,  width: 2.0, alpha: 0.4, offset: 0.6 },
        { freq: 5.8, amp: 0.3,  speed: 0.7,  width: 1.3, alpha: 0.2, offset: 1.4 },
        { freq: 8.2, amp: 0.15, speed: 1.9,  width: 0.8, alpha: 0.1, offset: 2.5 },
      ]

      for (const layer of layers) {
        const layerAmp = amplitude * layer.amp
        const lp = phase * layer.speed + layer.offset
        const a = layer.alpha * (0.08 + audio * 0.92)

        // Compute wave points
        ctx.beginPath()
        for (let i = 0; i <= steps; i++) {
          const t = i / steps
          const x = t * w
          const taper = Math.sin(t * Math.PI) ** 0.65
          const y = midY - (
            Math.sin(t * Math.PI * layer.freq + lp) * 0.50 +
            Math.sin(t * Math.PI * (layer.freq * 1.7) + lp * 1.3 + 0.5) * 0.30 +
            Math.sin(t * Math.PI * (layer.freq * 2.9) - lp * 0.8 + 1.2) * 0.15 +
            Math.sin(t * Math.PI * (layer.freq * 4.1) + lp * 2.0 + 2.0) * 0.05
          ) * layerAmp * taper
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }

        // Stroke gradient — fades at edges, brighter center with accent color
        const grad = ctx.createLinearGradient(0, 0, w, 0)
        grad.addColorStop(0, `rgba(${r},${g},${b},0)`)
        grad.addColorStop(0.1, `rgba(${r},${g},${b},${a * 0.4})`)
        grad.addColorStop(0.35, `rgba(${r2},${g2},${b2},${a * 0.8})`)
        grad.addColorStop(0.5, `rgba(${r2},${g2},${b2},${a})`)
        grad.addColorStop(0.65, `rgba(${r2},${g2},${b2},${a * 0.8})`)
        grad.addColorStop(0.9, `rgba(${r},${g},${b},${a * 0.4})`)
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`)

        ctx.strokeStyle = grad
        ctx.lineWidth = layer.width * dpr * (0.7 + audio * 0.5)
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.stroke()
      }

      // Glow bloom on primary layer
      if (audio > 0.02) {
        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        ctx.beginPath()
        for (let i = 0; i <= steps; i++) {
          const t = i / steps
          const x = t * w
          const taper = Math.sin(t * Math.PI) ** 0.65
          const lp = phase + layers[0].offset
          const y = midY - (
            Math.sin(t * Math.PI * layers[0].freq + lp) * 0.50 +
            Math.sin(t * Math.PI * (layers[0].freq * 1.7) + lp * 1.3 + 0.5) * 0.30 +
            Math.sin(t * Math.PI * (layers[0].freq * 2.9) - lp * 0.8 + 1.2) * 0.15 +
            Math.sin(t * Math.PI * (layers[0].freq * 4.1) + lp * 2.0 + 2.0) * 0.05
          ) * amplitude * taper
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        const ga = audio * 0.14
        const glowG = ctx.createLinearGradient(0, 0, w, 0)
        glowG.addColorStop(0, `rgba(${r2},${g2},${b2},0)`)
        glowG.addColorStop(0.2, `rgba(${r2},${g2},${b2},${ga * 0.6})`)
        glowG.addColorStop(0.5, `rgba(${r2},${g2},${b2},${ga})`)
        glowG.addColorStop(0.8, `rgba(${r2},${g2},${b2},${ga * 0.6})`)
        glowG.addColorStop(1, `rgba(${r2},${g2},${b2},0)`)
        ctx.strokeStyle = glowG
        ctx.lineWidth = (7 + audio * 12) * dpr
        ctx.stroke()
        ctx.restore()
      }

      // Subtle idle baseline when silent
      if (audio < 0.03) {
        const fade = 1 - audio / 0.03
        ctx.beginPath()
        ctx.moveTo(w * 0.05, midY)
        ctx.lineTo(w * 0.95, midY)
        const idleG = ctx.createLinearGradient(w * 0.05, 0, w * 0.95, 0)
        idleG.addColorStop(0, `rgba(${r},${g},${b},0)`)
        idleG.addColorStop(0.3, `rgba(${r},${g},${b},${0.12 * fade})`)
        idleG.addColorStop(0.5, `rgba(${r},${g},${b},${0.18 * fade})`)
        idleG.addColorStop(0.7, `rgba(${r},${g},${b},${0.12 * fade})`)
        idleG.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.strokeStyle = idleG
        ctx.lineWidth = 1 * dpr
        ctx.stroke()
      }

      phaseRef.current += 0.02 + audio * 0.025
      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className || ''}`}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
