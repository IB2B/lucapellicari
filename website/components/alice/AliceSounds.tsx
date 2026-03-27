'use client'

// Interactive sound effects — Web Audio API, no files needed
const audioCtxRef: { current: AudioContext | null } = { current: null }

function getCtx(): AudioContext {
  if (!audioCtxRef.current) audioCtxRef.current = new AudioContext()
  if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume()
  return audioCtxRef.current
}

export function playSound(type: 'open' | 'close' | 'start' | 'end' | 'click' | 'message' | 'mute' | 'unmute') {
  try {
    const ctx = getCtx()
    const now = ctx.currentTime

    if (type === 'open') {
      // Two-tone ascending chime
      const o1 = ctx.createOscillator()
      const o2 = ctx.createOscillator()
      const g = ctx.createGain()
      o1.connect(g); o2.connect(g); g.connect(ctx.destination)
      o1.type = 'sine'; o2.type = 'sine'
      o1.frequency.setValueAtTime(523, now) // C5
      o2.frequency.setValueAtTime(659, now + 0.08) // E5
      g.gain.setValueAtTime(0.1, now)
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.3)
      o1.start(now); o1.stop(now + 0.15)
      o2.start(now + 0.08); o2.stop(now + 0.3)
    }

    if (type === 'close' || type === 'end') {
      // Descending tone
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.connect(g); g.connect(ctx.destination)
      o.type = 'sine'
      o.frequency.setValueAtTime(523, now)
      o.frequency.exponentialRampToValueAtTime(330, now + 0.18)
      g.gain.setValueAtTime(0.08, now)
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.2)
      o.start(now); o.stop(now + 0.2)
    }

    if (type === 'start') {
      // Three-note ascending — like "ready"
      [440, 554, 659].forEach((freq, i) => {
        const o = ctx.createOscillator()
        const g = ctx.createGain()
        o.connect(g); g.connect(ctx.destination)
        o.type = 'sine'
        o.frequency.setValueAtTime(freq, now + i * 0.1)
        g.gain.setValueAtTime(0.08, now + i * 0.1)
        g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.15)
        o.start(now + i * 0.1); o.stop(now + i * 0.1 + 0.15)
      })
    }

    if (type === 'click') {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.connect(g); g.connect(ctx.destination)
      o.type = 'sine'
      o.frequency.setValueAtTime(1000, now)
      g.gain.setValueAtTime(0.04, now)
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.04)
      o.start(now); o.stop(now + 0.04)
    }

    if (type === 'message') {
      // Soft pop
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.connect(g); g.connect(ctx.destination)
      o.type = 'sine'
      o.frequency.setValueAtTime(600, now)
      o.frequency.exponentialRampToValueAtTime(800, now + 0.06)
      g.gain.setValueAtTime(0.06, now)
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.08)
      o.start(now); o.stop(now + 0.08)
    }

    if (type === 'mute') {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.connect(g); g.connect(ctx.destination)
      o.type = 'sine'
      o.frequency.setValueAtTime(500, now)
      o.frequency.exponentialRampToValueAtTime(350, now + 0.1)
      g.gain.setValueAtTime(0.05, now)
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.12)
      o.start(now); o.stop(now + 0.12)
    }

    if (type === 'unmute') {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.connect(g); g.connect(ctx.destination)
      o.type = 'sine'
      o.frequency.setValueAtTime(350, now)
      o.frequency.exponentialRampToValueAtTime(500, now + 0.1)
      g.gain.setValueAtTime(0.05, now)
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.12)
      o.start(now); o.stop(now + 0.12)
    }
  } catch {
    // Audio not available
  }
}
