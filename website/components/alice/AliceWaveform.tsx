'use client'

import { useRef, useEffect } from 'react'

interface AliceWaveformProps {
  audioLevel: number
  isSpeaking: boolean
  className?: string
  variant?: 'inline' | 'wide'
}

export function AliceWaveform({ audioLevel, isSpeaking, className }: AliceWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const phaseRef = useRef(0)
  const smoothLevel = useRef(0)
  const canvasSizeRef = useRef({ w: 0, h: 0 })
  const audioLevelRef = useRef(audioLevel)
  const isSpeakingRef = useRef(isSpeaking)

  audioLevelRef.current = audioLevel
  isSpeakingRef.current = isSpeaking

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = canvas.clientWidth * dpr
      const h = canvas.clientHeight * dpr
      if (w > 0 && h > 0) {
        canvas.width = w
        canvas.height = h
        canvasSizeRef.current = { w, h }
      }
    }
    updateSize()
    const observer = new ResizeObserver(updateSize)
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    function draw() {
      const canvas = canvasRef.current
      if (!canvas) { animRef.current = requestAnimationFrame(draw); return }
      const ctx = canvas.getContext('2d')
      if (!ctx) { animRef.current = requestAnimationFrame(draw); return }

      const { w, h } = canvasSizeRef.current
      if (w === 0 || h === 0) { animRef.current = requestAnimationFrame(draw); return }

      ctx.clearRect(0, 0, w, h)

      const midY = h / 2
      const phase = phaseRef.current
      const currentAudioLevel = audioLevelRef.current
      const currentIsSpeaking = isSpeakingRef.current

      smoothLevel.current += (currentAudioLevel - smoothLevel.current) * 0.15
      const audio = smoothLevel.current

      const r = currentIsSpeaking ? 196 : 107
      const g = currentIsSpeaking ? 149 : 155
      const b = currentIsSpeaking ? 106 : 174

      const amplitude = h * 0.35 * (0.1 + audio * 0.9)
      const steps = Math.min(w, 200)

      const layers = [
        { freq: 2.5, amp: 1.0, speed: 1.0, width: 2.5, alpha: 0.9, offset: 0 },
        { freq: 4.2, amp: 0.5, speed: 1.4, width: 1.8, alpha: 0.4, offset: 0.5 },
        { freq: 6.8, amp: 0.3, speed: 0.8, width: 1.2, alpha: 0.2, offset: 1.2 },
      ]

      for (const layer of layers) {
        const layerAmp = amplitude * layer.amp
        const layerPhase = phase * layer.speed + layer.offset

        ctx.beginPath()
        for (let i = 0; i <= steps; i++) {
          const t = i / steps
          const x = t * w
          const taper = Math.sin(t * Math.PI) ** 0.7
          const y = midY - (
            Math.sin(t * Math.PI * layer.freq + layerPhase) * 0.55 +
            Math.sin(t * Math.PI * (layer.freq * 1.7) + layerPhase * 1.4 + 0.5) * 0.28 +
            Math.sin(t * Math.PI * (layer.freq * 2.9) - layerPhase * 0.8 + 1.2) * 0.17
          ) * layerAmp * taper
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }

        const grad = ctx.createLinearGradient(0, 0, w, 0)
        const a = layer.alpha * (0.15 + audio * 0.85)
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`)
        grad.addColorStop(0.15, `rgba(${r}, ${g}, ${b}, ${a * 0.6})`)
        grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${a})`)
        grad.addColorStop(0.85, `rgba(${r}, ${g}, ${b}, ${a * 0.6})`)
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
        ctx.strokeStyle = grad
        const dpr = window.devicePixelRatio || 1
        ctx.lineWidth = layer.width * dpr * (0.8 + audio * 0.4)
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.stroke()
      }

      if (audio > 0.03) {
        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        ctx.beginPath()
        for (let i = 0; i <= steps; i++) {
          const t = i / steps
          const x = t * w
          const taper = Math.sin(t * Math.PI) ** 0.7
          const y = midY - (
            Math.sin(t * Math.PI * 2.5 + phase) * 0.55 +
            Math.sin(t * Math.PI * 4.2 + phase * 1.4 + 0.5) * 0.28 +
            Math.sin(t * Math.PI * 6.8 - phase * 0.8 + 1.2) * 0.17
          ) * amplitude * taper
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        const dpr = window.devicePixelRatio || 1
        const ga = audio * 0.12
        const glowGrad = ctx.createLinearGradient(0, 0, w, 0)
        glowGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`)
        glowGrad.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${ga})`)
        glowGrad.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${ga})`)
        glowGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
        ctx.strokeStyle = glowGrad
        ctx.lineWidth = (6 + audio * 8) * dpr
        ctx.stroke()
        ctx.restore()
      }

      phaseRef.current += 0.025 + audio * 0.02
      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className || ''}`}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
