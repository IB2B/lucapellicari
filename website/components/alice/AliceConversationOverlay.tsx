'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Mic, MicOff, PhoneOff, Volume2, VolumeX, Volume1,
  ThumbsUp, Loader2, Phone,
} from 'lucide-react'
import { useAliceContext } from './AliceProvider'
import { AliceOrbVisualizer } from './AliceOrbVisualizer'
import { AliceTranscript } from './AliceTranscript'
import { playSound } from './AliceSounds'

/* ─── Background wave canvas ─── */
function BackgroundWaves({ audioLevel, isAliceTalking, isUserTalking }: {
  audioLevel: number; isAliceTalking: boolean; isUserTalking: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const timeRef = useRef(0)
  const audioRef = useRef(audioLevel)
  const aliceRef = useRef(isAliceTalking)
  const userRef = useRef(isUserTalking)
  audioRef.current = audioLevel; aliceRef.current = isAliceTalking; userRef.current = isUserTalking

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    const draw = () => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const w = canvas.width; const h = canvas.height; const t = timeRef.current
      const audio = audioRef.current; const alice = aliceRef.current; const user = userRef.current
      ctx.clearRect(0, 0, w, h)
      const r = alice ? 196 : user ? 99 : 107
      const g = alice ? 149 : user ? 197 : 155
      const b = alice ? 106 : user ? 255 : 174
      const cfgs = [
        { y: 0.70, amp: 40 + audio * 65, freq: 1.3, sp: 0.7, al: 0.055 + audio * 0.055 },
        { y: 0.78, amp: 30 + audio * 45, freq: 2.0, sp: 1.1, al: 0.038 + audio * 0.038 },
        { y: 0.87, amp: 20 + audio * 28, freq: 2.9, sp: 0.55, al: 0.025 + audio * 0.025 },
      ]
      for (const c of cfgs) {
        const midY = h * c.y
        ctx.beginPath(); ctx.moveTo(0, h)
        for (let x = 0; x <= w; x += 2) {
          const nx = x / w
          const y = midY
            + Math.sin(nx * Math.PI * c.freq * 2 + t * c.sp) * c.amp
            + Math.sin(nx * Math.PI * c.freq * 3.8 - t * c.sp * 1.4 + 0.6) * c.amp * 0.38
          ctx.lineTo(x, y)
        }
        ctx.lineTo(w, h); ctx.closePath()
        const grad = ctx.createLinearGradient(0, midY - c.amp, 0, h)
        grad.addColorStop(0, `rgba(${r},${g},${b},${c.al})`); grad.addColorStop(1, `rgba(${r},${g},${b},0.005)`)
        ctx.fillStyle = grad; ctx.fill()
      }
      timeRef.current += 0.016
      animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

/* ─── Live Bars ─── */
function LiveBars({ audioLevel, color, count = 5 }: { audioLevel: number; color: string; count?: number }) {
  const [, setTick] = useState(0)
  const animRef = useRef<number>(0)
  useEffect(() => {
    let run = true
    const fn = () => { if (!run) return; setTick(t => t + 1); animRef.current = requestAnimationFrame(fn) }
    animRef.current = requestAnimationFrame(fn)
    return () => { run = false; cancelAnimationFrame(animRef.current) }
  }, [])
  return (
    <div className="flex items-center gap-[3px] h-5">
      {Array.from({ length: count }).map((_, i) => {
        const h = Math.max(3, (0.2 + audioLevel * 0.8) * 20 * (0.35 + Math.sin(Date.now() / 180 + i * 1.3) * 0.65))
        return <div key={i} className="w-[3px] rounded-full transition-all duration-75"
          style={{ backgroundColor: color, height: `${h}px`, opacity: 0.55 + audioLevel * 0.45 }} />
      })}
    </div>
  )
}

/* ─── Timer ─── */
function CallTimer({ startTime }: { startTime: number }) {
  const [, setTick] = useState(0)
  useEffect(() => { const id = setInterval(() => setTick(t => t + 1), 1000); return () => clearInterval(id) }, [])
  const s = Math.floor((Date.now() - startTime) / 1000)
  return (
    <span className="text-[11px] font-mono tabular-nums tracking-widest" style={{ color: 'rgba(250,247,242,0.3)' }}>
      {String(Math.floor(s / 60)).padStart(2, '0')}:{String(s % 60).padStart(2, '0')}
    </span>
  )
}

/* ─── Avatar Chip ─── */
function AvatarChip({ label, initial, isActive, isMuted, audioLevel, color, bars }: {
  label: string; initial: string; isActive: boolean; isMuted?: boolean; audioLevel: number; color: string; bars: string
}) {
  return (
    <motion.div className="flex flex-col items-center gap-2"
      animate={{ scale: isActive ? 1 : 0.93, opacity: isActive ? 1 : 0.45 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}>
      <div className="relative">
        <motion.div className="absolute inset-[-5px] rounded-full"
          style={{ background: isActive ? `conic-gradient(from 0deg, ${color}50, transparent 55%, ${color}50)` : 'transparent' }}
          animate={{ rotate: isActive ? 360 : 0 }}
          transition={{ rotate: { duration: 5, repeat: Infinity, ease: 'linear' } }} />
        <div className="relative w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center text-[12px] md:text-[13px] font-bold shadow-lg"
          style={{
            background: isActive ? `radial-gradient(circle at 35% 35%, ${color}55, ${color}20)` : 'rgba(255,255,255,0.05)',
            border: `2px solid ${isActive ? color + '60' : 'rgba(255,255,255,0.08)'}`,
            color: isActive ? color : 'rgba(250,247,242,0.35)',
          }}>
          {isMuted ? <MicOff size={14} /> : initial}
        </div>
        {isActive && (
          <motion.div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border-2 border-[#081018]"
            style={{ backgroundColor: color }}
            animate={{ scale: [1, 1.35, 1] }} transition={{ duration: 1.3, repeat: Infinity }} />
        )}
      </div>
      <div className="h-5 flex items-center">
        {isActive && audioLevel > 0.02
          ? <LiveBars audioLevel={audioLevel} color={bars} count={5} />
          : <span className="text-[10px] md:text-[11px] font-medium tracking-wider uppercase"
              style={{ color: isMuted ? '#f87171' : isActive ? color : 'rgba(250,247,242,0.28)' }}>
              {isMuted ? 'Muto' : label}
            </span>
        }
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════ */
/*                    Main Overlay Component                       */
/* ═══════════════════════════════════════════════════════════════ */
export function AliceConversationOverlay() {
  const {
    isOverlayOpen, closeAlice, status, isSpeaking, micMuted,
    transcript, currentAliceText, currentUserText,
    canSendFeedback, start, stop, resetSession, setVolume, safeSendFeedback, toggleMute,
    getInputVolume, getOutputVolume,
  } = useAliceContext()

  const [audioLevel, setAudioLevel] = useState(0)
  const [inputLevel, setInputLevel] = useState(0)
  const [outputLevel, setOutputLevel] = useState(0)
  const [volume, setVolumeLocal] = useState(1)
  const [hasStarted, setHasStarted] = useState(false)
  const [isStarting, setIsStarting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null)
  const [callStartTime, setCallStartTime] = useState(0)
  const animFrameRef = useRef<number>(0)
  const overlayRef = useRef<HTMLDivElement>(null)

  const pollAudio = useCallback(() => {
    if (!isOverlayOpen) return
    const iv = getInputVolume(); const ov = getOutputVolume()
    setInputLevel(iv); setOutputLevel(ov); setAudioLevel(Math.max(iv, ov))
    animFrameRef.current = requestAnimationFrame(pollAudio)
  }, [isOverlayOpen, getInputVolume, getOutputVolume])

  useEffect(() => {
    if (isOverlayOpen && status === 'connected') animFrameRef.current = requestAnimationFrame(pollAudio)
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current) }
  }, [isOverlayOpen, status, pollAudio])

  useEffect(() => {
    if (isOverlayOpen) { document.body.style.overflow = 'hidden'; overlayRef.current?.focus() }
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOverlayOpen])

  const handleClose = useCallback(async () => {
    playSound('close')
    if (status === 'connected') await stop()
    setHasStarted(false); setIsStarting(false)
    setAudioLevel(0); setInputLevel(0); setOutputLevel(0)
    setFeedbackMsg(null); setCallStartTime(0)
    resetSession(); closeAlice()
  }, [status, stop, resetSession, closeAlice])

  const handleCloseRef = useRef(handleClose)
  handleCloseRef.current = handleClose

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOverlayOpen) handleCloseRef.current() }
    window.addEventListener('keydown', fn); return () => window.removeEventListener('keydown', fn)
  }, [isOverlayOpen])

  const handleStart = useCallback(async () => {
    setError(null); setIsStarting(true); playSound('start')
    try {
      await start(); setHasStarted(true); setCallStartTime(Date.now())
    } catch (err: any) {
      setError(err?.name === 'NotAllowedError'
        ? 'Permesso microfono negato.' : err?.name === 'NotFoundError'
        ? 'Nessun microfono trovato.' : 'Errore di connessione.')
    } finally { setIsStarting(false) }
  }, [start])

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value); setVolumeLocal(v); setVolume({ volume: v })
  }, [setVolume])

  const handleToggleMute = useCallback(() => { playSound(micMuted ? 'unmute' : 'mute'); toggleMute() }, [micMuted, toggleMute])
  const handleFeedback = useCallback((like: boolean) => {
    playSound('click'); safeSendFeedback(like)
    setFeedbackMsg(like ? 'Grazie per il feedback!' : 'Grazie, miglioreremo!')
    setTimeout(() => setFeedbackMsg(null), 3000)
  }, [safeSendFeedback])

  const mappedStatus = !hasStarted || status === 'disconnected' ? 'idle' as const : status as 'idle' | 'connecting' | 'connected'
  const isConnected = hasStarted && status === 'connected'
  const isUserTalking = isConnected && !isSpeaking && !micMuted
  const isAliceTalking = isConnected && isSpeaking
  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2

  const aliceColor = '#C4956A'
  const userColor  = '#63C5FE'
  const aliceBars  = '#F0BE96'
  const userBars   = '#93DEFF'

  return (
    <AnimatePresence>
      {isOverlayOpen && (
        <motion.div ref={overlayRef}
          className="fixed inset-0 z-[60] flex flex-col"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          tabIndex={-1} role="dialog" aria-modal="true" aria-label="Conversazione con Alice">

          {/* Background */}
          <motion.div className="absolute inset-0"
            animate={{
              background: isAliceTalking
                ? 'linear-gradient(170deg,#0f1f2e 0%,#0b1620 50%,#070e16 100%)'
                : isUserTalking
                  ? 'linear-gradient(170deg,#0a1a1c 0%,#080f12 50%,#050b0e 100%)'
                  : 'linear-gradient(170deg,#0c1c2c 0%,#09141f 50%,#060c14 100%)',
            }}
            transition={{ duration: 1.4, ease: 'easeInOut' }} />

          {/* Glow blob */}
          <motion.div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
            animate={{
              opacity: isConnected ? 0.07 + audioLevel * 0.06 : 0.04,
              background: isAliceTalking ? 'radial-gradient(circle,#C4956A 0%,transparent 65%)'
                : isUserTalking ? 'radial-gradient(circle,#63C5FE 0%,transparent 65%)'
                  : 'radial-gradient(circle,#6B9BAE 0%,transparent 70%)',
              scale: 1 + audioLevel * 0.12,
            }}
            transition={{ duration: 1.6, ease: 'easeInOut' }} />

          <BackgroundWaves audioLevel={audioLevel} isAliceTalking={isAliceTalking} isUserTalking={isUserTalking} />

          {/* Feedback toast */}
          <AnimatePresence>
            {feedbackMsg && (
              <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-2.5 rounded-full backdrop-blur-xl"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                initial={{ opacity: 0, y: -14, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -14, scale: 0.92 }}>
                <span className="text-[13px] font-medium" style={{ color: 'rgba(250,247,242,0.85)' }}>{feedbackMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── TOP BAR ── */}
          <motion.header className="relative w-full flex items-center justify-between px-5 md:px-8 h-16 flex-shrink-0"
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
            <motion.button onClick={handleClose}
              className="w-10 h-10 flex items-center justify-center rounded-full transition-all"
              style={{ color: 'rgba(250,247,242,0.3)' }}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.06)', color: 'rgba(250,247,242,0.7)' }}
              whileTap={{ scale: 0.9 }} aria-label="Chiudi">
              <X size={18} strokeWidth={2.5} />
            </motion.button>

            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)' }}>
                <motion.span className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: isAliceTalking ? aliceColor : isConnected ? '#34d399' : isStarting ? '#fbbf24' : 'rgba(255,255,255,0.2)' }}
                  animate={isConnected ? { scale: [1, 1.5, 1], opacity: [1, 0.4, 1] } : isStarting ? { opacity: [1, 0.3, 1] } : {}}
                  transition={{ duration: 1.4, repeat: Infinity }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: 'rgba(250,247,242,0.55)' }}>
                  {isConnected ? 'In chiamata' : isStarting ? 'Connessione' : 'Alice AI'}
                </span>
              </div>
              {isConnected && callStartTime > 0 && <CallTimer startTime={callStartTime} />}
            </div>
            <div className="w-10" />
          </motion.header>

          {/* ── CENTER ── */}
          <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-6 relative">

            {/* Avatar row */}
            {isConnected && (
              <motion.div className="flex items-center gap-8 md:gap-12 mb-6 md:mb-10"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <AvatarChip label="Alice" initial="A" isActive={isAliceTalking} audioLevel={outputLevel} color={aliceColor} bars={aliceBars} />
                <AvatarChip label="Tu" initial="Tu" isActive={isUserTalking && inputLevel > 0.02}
                  isMuted={micMuted} audioLevel={inputLevel} color={userColor} bars={userBars} />
              </motion.div>
            )}

            {/* Main orb */}
            <motion.div className="relative"
              initial={{ opacity: 0, scale: 0.75 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 140, damping: 18 }}>
              {isConnected && (
                <>
                  {[[-24, 2.4, 0.25, 0.35], [-48, 3.2, 0.18, 0.18], [-72, 4.0, 0.1, 0.1]].map(([inset, dur, amp, opFactor], idx) => (
                    <motion.div key={idx}
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        inset: `${inset}px`,
                        border: `${idx === 0 ? 1.5 : idx === 1 ? 1 : 0.5}px solid ${isAliceTalking ? aliceColor + (idx === 0 ? '25' : idx === 1 ? '12' : '06') : userColor + (idx === 0 ? '20' : idx === 1 ? '10' : '06')}`,
                      }}
                      animate={{ scale: [1, 1 + (amp as number) + audioLevel * (amp as number), 1], opacity: [(opFactor as number) * 1.5, 0, (opFactor as number) * 1.5] }}
                      transition={{ duration: dur as number, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.6 }} />
                  ))}
                </>
              )}

              <button
                onClick={!hasStarted && !isStarting ? handleStart : undefined}
                className={`relative block ${!hasStarted && !isStarting ? 'cursor-pointer group' : 'cursor-default'}`}
                aria-label={!hasStarted ? 'Inizia conversazione' : 'Audio'}>
                <AliceOrbVisualizer size={190} audioLevel={audioLevel} status={mappedStatus} isSpeaking={isSpeaking}
                  className="w-[130px] h-[130px] md:w-[190px] md:h-[190px] transition-transform duration-300 group-hover:scale-105" />
                {!hasStarted && !isStarting && (
                  <motion.div className="absolute inset-0 flex items-center justify-center"
                    animate={{ opacity: [0.55, 1, 0.55] }} transition={{ duration: 3, repeat: Infinity }}>
                    <div className="w-13 h-13 md:w-16 md:h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(8px)', border: '1.5px solid rgba(255,255,255,0.1)' }}>
                      <Phone size={22} className="md:!w-[26px] md:!h-[26px]" strokeWidth={1.5} style={{ color: 'rgba(250,247,242,0.85)' }} />
                    </div>
                  </motion.div>
                )}
                {isStarting && (
                  <motion.div className="absolute inset-0 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="w-13 h-13 md:w-16 md:h-16 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)', border: '1.5px solid rgba(255,255,255,0.1)' }}>
                      <Loader2 size={22} className="md:!w-[26px] md:!h-[26px] animate-spin" strokeWidth={2} style={{ color: '#8FB8C7' }} />
                    </div>
                  </motion.div>
                )}
              </button>
            </motion.div>

            {/* Chat messages */}
            {isConnected && (
              <motion.div className="w-full mt-6 md:mt-8 flex-1 min-h-0 max-h-[30vh]"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
                <AliceTranscript
                  entries={transcript}
                  currentAliceText={currentAliceText}
                  currentUserText={currentUserText}
                  className="h-full"
                />
              </motion.div>
            )}

            {/* Status texts */}
            {!isConnected && !isStarting && !hasStarted && !error && (
              <motion.div className="mt-10 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
                <p className="font-serif italic text-base md:text-lg leading-relaxed" style={{ color: 'rgba(250,247,242,0.35)' }}>Parla con Alice</p>
                <p className="mt-1.5 md:mt-2 text-[11px] md:text-[12px] tracking-widest uppercase font-sans" style={{ color: 'rgba(250,247,242,0.15)' }}>La tua guida AI personale</p>
              </motion.div>
            )}
            {isStarting && !hasStarted && (
              <motion.p className="mt-6 text-[13px] font-medium font-sans" style={{ color: 'rgba(143,184,199,0.55)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Attendo il permesso del microfono...
              </motion.p>
            )}
            {!isConnected && hasStarted && (
              <motion.p className="mt-6 text-[13px] font-sans font-medium max-w-xs text-center px-4"
                style={{ color: error ? '#f87171' : 'rgba(250,247,242,0.35)' }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {error || (status === 'connecting' ? 'Connessione in corso...' : 'Conversazione terminata')}
              </motion.p>
            )}
            {!hasStarted && !isStarting && error && (
              <motion.button className="mt-3 text-[13px] font-sans underline underline-offset-2"
                style={{ color: 'rgba(143,184,199,0.5)' }} onClick={handleStart}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                whileHover={{ color: 'rgba(143,184,199,0.85)' }}>Riprova</motion.button>
            )}
          </div>

          {/* ── BOTTOM CONTROLS ── */}
          <motion.div className="relative w-full flex-shrink-0"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>

            <div
              className="max-w-md mx-auto px-6 pb-8 pt-6"
              style={{ paddingBottom: 'max(2rem,env(safe-area-inset-bottom,2rem))' }}
            >
              {/* Main action row */}
              <div className="flex items-center justify-center gap-3 md:gap-5">

                {/* Volume button */}
                {hasStarted && (
                  <motion.button
                    onClick={() => { playSound('click'); const v = volume === 0 ? 1 : 0; setVolume({ volume: v }); setVolumeLocal(v) }}
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1.5px solid rgba(255,255,255,0.07)',
                      color: volume === 0 ? 'rgba(248,113,113,0.7)' : 'rgba(250,247,242,0.35)',
                    }}
                    whileHover={{ scale: 1.08, backgroundColor: 'rgba(255,255,255,0.08)' }}
                    whileTap={{ scale: 0.92 }}
                    aria-label="Volume"
                  >
                    <VolumeIcon size={18} />
                  </motion.button>
                )}

                {/* Mic button */}
                {isConnected && (
                  <motion.button onClick={handleToggleMute} className="relative"
                    whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.92 }}
                    aria-label={micMuted ? 'Attiva microfono' : 'Disattiva microfono'}>
                    {!micMuted && (
                      <motion.div className="absolute inset-[-6px] rounded-full pointer-events-none"
                        style={{
                          background: `conic-gradient(from 0deg,${isUserTalking ? userColor + '40' : 'rgba(255,255,255,0.06)'},transparent 50%,${isUserTalking ? userColor + '40' : 'rgba(255,255,255,0.06)'})`,
                        }}
                        animate={{ rotate: 360, scale: [1, 1 + audioLevel * 0.12, 1] }}
                        transition={{ rotate: { duration: 5, repeat: Infinity, ease: 'linear' }, scale: { duration: 0.3 } }} />
                    )}
                    <div className="relative w-[58px] h-[58px] md:w-[68px] md:h-[68px] rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        background: micMuted
                          ? 'linear-gradient(145deg,rgba(239,68,68,0.2),rgba(220,38,38,0.08))'
                          : isUserTalking && inputLevel > 0.02
                            ? `linear-gradient(145deg,${userColor}35,${userColor}12)`
                            : 'linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))',
                        border: micMuted
                          ? '2px solid rgba(239,68,68,0.3)'
                          : isUserTalking && inputLevel > 0.02
                            ? `2px solid ${userColor}40`
                            : '2px solid rgba(255,255,255,0.08)',
                        boxShadow: micMuted
                          ? '0 0 40px rgba(239,68,68,0.12), inset 0 0 20px rgba(239,68,68,0.05)'
                          : isUserTalking && inputLevel > 0.02
                            ? `0 0 40px ${userColor}18, inset 0 0 20px ${userColor}08`
                            : '0 8px 32px rgba(0,0,0,0.3)',
                      }}>
                      {micMuted
                        ? <MicOff size={22} className="md:!w-[26px] md:!h-[26px]" style={{ color: '#f87171' }} strokeWidth={1.8} />
                        : <Mic size={22} className="md:!w-[26px] md:!h-[26px]" style={{ color: isUserTalking && inputLevel > 0.02 ? userColor : 'rgba(250,247,242,0.6)' }} strokeWidth={1.8} />
                      }
                      {!micMuted && inputLevel > 0.02 && (
                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 68 68">
                          <circle cx="34" cy="34" r="32" fill="none"
                            stroke={userColor + '45'} strokeWidth="2"
                            strokeDasharray={`${Math.min(inputLevel * 201, 201)} 201`} strokeLinecap="round" />
                        </svg>
                      )}
                    </div>
                  </motion.button>
                )}

                {/* End call */}
                {hasStarted && (
                  <motion.button onClick={handleClose}
                    className="w-12 h-12 flex items-center justify-center rounded-full transition-all"
                    style={{
                      background: 'rgba(239,68,68,0.1)',
                      border: '1.5px solid rgba(239,68,68,0.18)',
                      color: 'rgba(248,113,113,0.7)',
                    }}
                    whileHover={{ scale: 1.08, backgroundColor: 'rgba(239,68,68,0.2)', color: '#f87171' }}
                    whileTap={{ scale: 0.92 }} aria-label="Termina">
                    <PhoneOff size={20} strokeWidth={1.8} />
                  </motion.button>
                )}

                {/* Start CTA */}
                {!hasStarted && !isStarting && (
                  <motion.button onClick={handleStart}
                    className="flex items-center gap-2.5 px-7 py-3.5 md:px-10 md:py-4 rounded-full text-white text-[14px] md:text-[15px] font-semibold font-sans"
                    style={{
                      background: 'linear-gradient(135deg,#6B9BAE,#8FB8C7)',
                      boxShadow: '0 8px 40px rgba(107,155,174,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
                    }}
                    whileHover={{ scale: 1.04, boxShadow: '0 12px 48px rgba(107,155,174,0.45), inset 0 1px 0 rgba(255,255,255,0.2)' }}
                    whileTap={{ scale: 0.97 }}>
                    <Phone size={19} strokeWidth={1.8} /><span>Chiama Alice</span>
                  </motion.button>
                )}

                {/* Connecting */}
                {isStarting && !hasStarted && (
                  <div className="flex items-center gap-2.5 px-7 py-3.5 md:px-10 md:py-4 rounded-full text-[14px] md:text-[15px] font-semibold font-sans"
                    style={{ background: 'rgba(107,155,174,0.25)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(107,155,174,0.15)' }}>
                    <Loader2 size={19} strokeWidth={1.8} className="animate-spin" /><span>Connessione...</span>
                  </div>
                )}

                {/* Feedback */}
                {canSendFeedback && hasStarted && (
                  <motion.button onClick={() => handleFeedback(true)}
                    className="w-12 h-12 flex items-center justify-center rounded-full transition-all"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.07)', color: 'rgba(250,247,242,0.25)' }}
                    whileHover={{ scale: 1.08, color: '#34d399', backgroundColor: 'rgba(52,211,153,0.08)' }}
                    whileTap={{ scale: 0.88 }} aria-label="Feedback positivo" title="Utile">
                    <ThumbsUp size={17} />
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
