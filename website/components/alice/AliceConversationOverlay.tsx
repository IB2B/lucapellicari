'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Mic, MicOff, PhoneOff, Volume2, VolumeX, Volume1,
  ThumbsUp, ThumbsDown, Sparkles, Loader2, Phone,
} from 'lucide-react'
import { useAliceContext } from './AliceProvider'
import { AliceOrbVisualizer } from './AliceOrbVisualizer'
import { AliceWaveform } from './AliceWaveform'
import { playSound } from './AliceSounds'

/* ─── Live Bars ─── */
function LiveBars({ audioLevel, color, count = 5 }: { audioLevel: number; color: string; count?: number }) {
  const [, setTick] = useState(0)
  const animRef = useRef<number>(0)

  useEffect(() => {
    let running = true
    const animate = () => {
      if (!running) return
      setTick(t => t + 1)
      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)
    return () => { running = false; cancelAnimationFrame(animRef.current) }
  }, [])

  return (
    <div className="flex items-center gap-[3px] h-6">
      {Array.from({ length: count }).map((_, i) => {
        const base = 0.2 + audioLevel * 0.8
        const height = Math.max(4, base * 24 * (0.4 + Math.sin((Date.now() / 200 + i * 1.2)) * 0.6))
        return (
          <div
            key={i}
            className="w-[3px] rounded-full transition-all duration-100"
            style={{ backgroundColor: color, height: `${height}px`, opacity: 0.5 + audioLevel * 0.5 }}
          />
        )
      })}
    </div>
  )
}

/* ─── Timer ─── */
function CallTimer({ startTime }: { startTime: number }) {
  const [, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000)
    return () => clearInterval(id)
  }, [])
  const s = Math.floor((Date.now() - startTime) / 1000)
  const m = Math.floor(s / 60)
  const sec = s % 60
  return (
    <span className="text-[11px] font-mono text-cream/25 tabular-nums tracking-wider">
      {String(m).padStart(2, '0')}:{String(sec).padStart(2, '0')}
    </span>
  )
}

export function AliceConversationOverlay() {
  const {
    isOverlayOpen, closeAlice,
    status, isSpeaking, micMuted,
    canSendFeedback, start, stop, resetSession, setVolume, safeSendFeedback,
    toggleMute,
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

  // Audio polling
  const pollAudio = useCallback(() => {
    if (!isOverlayOpen) return
    const inVol = getInputVolume()
    const outVol = getOutputVolume()
    setInputLevel(inVol)
    setOutputLevel(outVol)
    setAudioLevel(Math.max(inVol, outVol))
    animFrameRef.current = requestAnimationFrame(pollAudio)
  }, [isOverlayOpen, getInputVolume, getOutputVolume])

  useEffect(() => {
    if (isOverlayOpen && status === 'connected') {
      animFrameRef.current = requestAnimationFrame(pollAudio)
    }
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current) }
  }, [isOverlayOpen, status, pollAudio])

  useEffect(() => {
    if (isOverlayOpen) {
      document.body.style.overflow = 'hidden'
      overlayRef.current?.focus()
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOverlayOpen])

  const handleClose = useCallback(async () => {
    playSound('close')
    if (status === 'connected') await stop()
    setHasStarted(false)
    setIsStarting(false)
    setAudioLevel(0)
    setInputLevel(0)
    setOutputLevel(0)
    setFeedbackMsg(null)
    setCallStartTime(0)
    resetSession()
    closeAlice()
  }, [status, stop, resetSession, closeAlice])

  const handleCloseRef = useRef(handleClose)
  handleCloseRef.current = handleClose

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOverlayOpen) handleCloseRef.current()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOverlayOpen])

  const handleStart = useCallback(async () => {
    setError(null)
    setIsStarting(true)
    playSound('start')
    try {
      await start()
      setHasStarted(true)
      setCallStartTime(Date.now())
    } catch (err: any) {
      const msg = err?.name === 'NotAllowedError'
        ? 'Permesso microfono negato. Consenti l\'accesso nelle impostazioni del browser.'
        : err?.name === 'NotFoundError'
          ? 'Nessun microfono trovato. Collega un microfono e riprova.'
          : 'Errore di connessione. Controlla la tua rete e riprova.'
      setError(msg)
    } finally {
      setIsStarting(false)
    }
  }, [start])

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value)
    setVolumeLocal(v)
    setVolume({ volume: v })
  }, [setVolume])

  const handleToggleMute = useCallback(() => {
    playSound(micMuted ? 'unmute' : 'mute')
    toggleMute()
  }, [micMuted, toggleMute])

  const handleFeedback = useCallback((like: boolean) => {
    playSound('click')
    safeSendFeedback(like)
    setFeedbackMsg(like ? 'Grazie per il feedback!' : 'Grazie, miglioreremo!')
    setTimeout(() => setFeedbackMsg(null), 3000)
  }, [safeSendFeedback])

  const mappedStatus = (() => {
    if (!hasStarted) return 'idle' as const
    if (status === 'disconnected') return 'idle' as const
    return status as 'idle' | 'connecting' | 'connected'
  })()

  const isConnected = hasStarted && status === 'connected'
  const isUserTalking = isConnected && !isSpeaking && !micMuted
  const isAliceTalking = isConnected && isSpeaking

  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2

  return (
    <AnimatePresence>
      {isOverlayOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="Conversazione con Alice"
        >
          {/* === BG === */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: isAliceTalking
                ? 'linear-gradient(160deg, #0e1f30 0%, #0c1825 40%, #08101a 100%)'
                : isUserTalking
                  ? 'linear-gradient(160deg, #16120c 0%, #120f0a 40%, #0c0a08 100%)'
                  : 'linear-gradient(160deg, #0d1e2d 0%, #0a1520 40%, #081018 100%)',
            }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            animate={{
              opacity: isConnected ? 0.08 + audioLevel * 0.04 : 0.03,
              background: isAliceTalking
                ? 'radial-gradient(circle, #C4956A 0%, transparent 60%)'
                : isUserTalking
                  ? 'radial-gradient(circle, #6B9BAE 0%, transparent 60%)'
                  : 'radial-gradient(circle, #6B9BAE 0%, transparent 70%)',
              scale: 1 + audioLevel * 0.1,
            }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />

          {/* Feedback toast */}
          <AnimatePresence>
            {feedbackMsg && (
              <motion.div
                className="absolute top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-2.5 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-xl"
                initial={{ opacity: 0, y: -12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.95 }}
              >
                <span className="text-[13px] font-medium text-cream/80 font-sans">{feedbackMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── TOP BAR ── */}
          <motion.header
            className="relative w-full flex items-center justify-between px-5 md:px-8 h-16 flex-shrink-0"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <motion.button
              onClick={handleClose}
              className="w-10 h-10 flex items-center justify-center rounded-full text-cream/25 hover:text-cream/60 hover:bg-white/[0.05] transition-all"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Chiudi"
            >
              <X size={18} strokeWidth={2} />
            </motion.button>

            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] backdrop-blur-sm">
                <motion.span
                  className={`w-[7px] h-[7px] rounded-full ${
                    isAliceTalking ? 'bg-coral' : isConnected ? 'bg-emerald-400' : isStarting ? 'bg-amber-400' : 'bg-white/20'
                  }`}
                  animate={isConnected ? { scale: [1, 1.4, 1], opacity: [1, 0.5, 1] } : isStarting ? { opacity: [1, 0.3, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/50 font-sans">
                  {isConnected ? 'In chiamata' : isStarting ? 'Connessione' : 'Alice AI'}
                </span>
              </div>
              {isConnected && callStartTime > 0 && <CallTimer startTime={callStartTime} />}
            </div>

            <div className="w-10" />
          </motion.header>

          {/* ── CENTER — Orb + Status ── */}
          <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-6 relative">
            {/* Orb */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.12, type: 'spring', stiffness: 160, damping: 20 }}
            >
              {/* Pulsing rings */}
              {isConnected && (
                <>
                  <motion.div
                    className="absolute inset-[-20px] rounded-full pointer-events-none"
                    style={{ border: `1.5px solid ${isAliceTalking ? 'rgba(196,149,106,0.12)' : 'rgba(107,155,174,0.12)'}` }}
                    animate={{ scale: [1, 1.2 + audioLevel * 0.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute inset-[-40px] rounded-full pointer-events-none"
                    style={{ border: `1px solid ${isAliceTalking ? 'rgba(196,149,106,0.06)' : 'rgba(107,155,174,0.06)'}` }}
                    animate={{ scale: [1, 1.15 + audioLevel * 0.15, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  />
                  <motion.div
                    className="absolute inset-[-60px] rounded-full pointer-events-none"
                    style={{ border: `0.5px solid ${isAliceTalking ? 'rgba(196,149,106,0.03)' : 'rgba(107,155,174,0.03)'}` }}
                    animate={{ scale: [1, 1.08 + audioLevel * 0.08, 1], opacity: [0.2, 0, 0.2] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  />
                </>
              )}

              <button
                onClick={!hasStarted && !isStarting ? handleStart : undefined}
                className={`relative block ${!hasStarted && !isStarting ? 'cursor-pointer group' : 'cursor-default'}`}
                aria-label={!hasStarted ? 'Inizia conversazione' : 'Visualizzatore audio'}
              >
                <AliceOrbVisualizer
                  size={180}
                  audioLevel={audioLevel}
                  status={mappedStatus}
                  isSpeaking={isSpeaking}
                  className="w-[160px] h-[160px] md:w-[180px] md:h-[180px] transition-transform duration-300 group-hover:scale-105"
                />

                {/* Pre-start state */}
                {!hasStarted && !isStarting && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <div className="w-16 h-16 rounded-full bg-white/[0.06] backdrop-blur-md flex items-center justify-center border border-white/[0.08] group-hover:bg-white/[0.1] transition-colors">
                      <Phone className="text-white/80" size={26} strokeWidth={1.5} />
                    </div>
                  </motion.div>
                )}

                {/* Loading */}
                {isStarting && (
                  <motion.div className="absolute inset-0 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="w-16 h-16 rounded-full bg-white/[0.06] backdrop-blur-md flex items-center justify-center border border-white/[0.08]">
                      <Loader2 className="text-teal-light animate-spin" size={26} strokeWidth={2} />
                    </div>
                  </motion.div>
                )}
              </button>
            </motion.div>

            {/* Voice line visualizer */}
            {isConnected && (
              <motion.div
                className="w-full mt-8 md:mt-10"
                initial={{ opacity: 0, scaleX: 0.3 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="h-[56px] md:h-[68px] relative">
                  <AliceWaveform audioLevel={audioLevel} isSpeaking={isSpeaking} variant="wide" className="w-full h-full" />
                  <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a1520] to-transparent pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0a1520] to-transparent pointer-events-none" />
                </div>
              </motion.div>
            )}

            {/* Speaker indicators */}
            {isConnected && (
              <motion.div
                className="mt-6 flex items-center gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <div className={`flex items-center gap-2.5 px-4 py-2 rounded-full transition-all duration-400 ${
                  isAliceTalking ? 'bg-coral/10 border border-coral/20 shadow-lg shadow-coral/5' : 'bg-white/[0.02] border border-white/[0.04]'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    isAliceTalking ? 'bg-coral/25 text-coral' : 'bg-white/[0.06] text-cream/30'
                  }`}>A</div>
                  {isAliceTalking ? (
                    <LiveBars audioLevel={outputLevel} color="#C4956A" count={4} />
                  ) : (
                    <span className="text-[12px] text-cream/25 font-sans">Alice</span>
                  )}
                </div>

                <div className="w-6 flex justify-center">
                  <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                    isAliceTalking ? 'bg-coral/20' : isUserTalking && inputLevel > 0.02 ? 'bg-teal/20' : 'bg-white/[0.06]'
                  }`} />
                </div>

                <div className={`flex items-center gap-2.5 px-4 py-2 rounded-full transition-all duration-400 ${
                  isUserTalking && inputLevel > 0.02
                    ? 'bg-teal/10 border border-teal/20 shadow-lg shadow-teal/5'
                    : micMuted ? 'bg-red-500/[0.05] border border-red-500/10' : 'bg-white/[0.02] border border-white/[0.04]'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    micMuted ? 'bg-red-500/15 text-red-400'
                      : isUserTalking && inputLevel > 0.02 ? 'bg-teal/25 text-teal-light' : 'bg-white/[0.06] text-cream/30'
                  }`}>
                    {micMuted ? <MicOff size={11} /> : 'Tu'}
                  </div>
                  {micMuted ? (
                    <span className="text-[12px] text-red-400/60 font-sans">Muto</span>
                  ) : isUserTalking && inputLevel > 0.02 ? (
                    <LiveBars audioLevel={inputLevel} color="#6B9BAE" count={4} />
                  ) : (
                    <span className="text-[12px] text-cream/25 font-sans">Tu</span>
                  )}
                </div>
              </motion.div>
            )}

            {/* Status text */}
            {!isConnected && !isStarting && !hasStarted && !error && (
              <motion.div className="mt-8 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <p className="font-serif text-cream/30 text-[17px] italic leading-relaxed">
                  Parla con Alice
                </p>
                <p className="mt-2 text-[12px] text-cream/15 font-sans tracking-wide">
                  La tua guida AI personale
                </p>
              </motion.div>
            )}

            {isStarting && !hasStarted && (
              <motion.p className="mt-6 text-[13px] text-teal-light/50 font-sans font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Attendo il permesso del microfono...
              </motion.p>
            )}

            {!isConnected && hasStarted && (
              <motion.p
                className={`mt-6 text-[13px] font-sans font-medium max-w-xs text-center px-4 ${error ? 'text-red-400' : 'text-cream/35'}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              >
                {error || (status === 'connecting' ? 'Connessione in corso...' : 'Conversazione terminata')}
              </motion.p>
            )}

            {!hasStarted && !isStarting && error && (
              <motion.button
                className="mt-3 text-[13px] text-teal-light/50 font-sans underline underline-offset-2 hover:text-teal-light/80 transition-colors"
                onClick={handleStart}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              >
                Riprova
              </motion.button>
            )}
          </div>

          {/* ── BOTTOM CONTROLS ── */}
          <motion.div
            className="relative w-full flex-shrink-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="max-w-xl mx-auto px-6">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
            </div>

            <div
              className="max-w-xl mx-auto px-6 md:px-10 py-6"
              style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom, 1.5rem))' }}
            >
              <div className="flex items-center justify-between">

                {/* LEFT — Volume */}
                <div className="flex items-center gap-2.5 w-[120px]">
                  {hasStarted && (
                    <>
                      <button
                        onClick={() => { playSound('click'); const v = volume === 0 ? 1 : 0; setVolume({ volume: v }); setVolumeLocal(v) }}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-cream/20 hover:text-cream/40 transition-colors flex-shrink-0"
                        aria-label={volume === 0 ? 'Attiva audio' : 'Disattiva audio'}
                      >
                        <VolumeIcon size={16} />
                      </button>
                      <div className="relative w-full h-5 flex items-center">
                        <div className="absolute left-0 h-1 rounded-full bg-white/[0.06] w-full" />
                        <div className="absolute left-0 h-1 rounded-full bg-teal/50" style={{ width: `${volume * 100}%` }} />
                        <input
                          type="range" min="0" max="1" step="0.05" value={volume}
                          onChange={handleVolumeChange}
                          className="absolute w-full h-1 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:shadow-teal/30 [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10"
                          aria-label="Volume"
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* CENTER — Mic + End */}
                <div className="flex items-center gap-5">
                  {isConnected && (
                    <motion.button
                      onClick={handleToggleMute}
                      className="relative"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.93 }}
                      aria-label={micMuted ? 'Attiva microfono' : 'Disattiva microfono'}
                    >
                      {!micMuted && (
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{
                            margin: '-4px',
                            background: `conic-gradient(from 0deg, ${
                              isUserTalking ? 'rgba(107,155,174,0.25)' : 'rgba(196,149,106,0.15)'
                            }, transparent 60%, ${
                              isUserTalking ? 'rgba(107,155,174,0.25)' : 'rgba(196,149,106,0.15)'
                            })`,
                          }}
                          animate={{ rotate: 360, scale: [1, 1 + audioLevel * 0.12, 1] }}
                          transition={{ rotate: { duration: 4, repeat: Infinity, ease: 'linear' }, scale: { duration: 0.3 } }}
                        />
                      )}

                      <div className={`relative w-[60px] h-[60px] rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
                        micMuted
                          ? 'bg-gradient-to-br from-red-500/20 to-red-600/10 border-2 border-red-500/25 shadow-red-500/10'
                          : isUserTalking && inputLevel > 0.02
                            ? 'bg-gradient-to-br from-teal/25 to-teal/10 border-2 border-teal/25 shadow-teal/10'
                            : 'bg-gradient-to-br from-white/[0.07] to-white/[0.02] border-2 border-white/[0.07] shadow-white/5'
                      }`}>
                        {micMuted ? (
                          <MicOff size={22} className="text-red-400" strokeWidth={2} />
                        ) : (
                          <Mic size={22} className={`transition-colors duration-300 ${
                            isUserTalking && inputLevel > 0.02 ? 'text-teal-light' : 'text-cream/60'
                          }`} strokeWidth={2} />
                        )}

                        {!micMuted && inputLevel > 0.02 && (
                          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 60 60">
                            <circle cx="30" cy="30" r="28" fill="none"
                              stroke="rgba(107,155,174,0.35)" strokeWidth="2"
                              strokeDasharray={`${Math.min(inputLevel * 176, 176)} 176`}
                              strokeLinecap="round" />
                          </svg>
                        )}
                      </div>
                    </motion.button>
                  )}

                  {hasStarted && (
                    <motion.button
                      onClick={handleClose}
                      className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-red-500/10 border border-red-500/15 text-red-400/70 hover:bg-red-500/20 hover:text-red-400 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.93 }}
                      aria-label="Termina"
                    >
                      <PhoneOff size={20} strokeWidth={2} />
                    </motion.button>
                  )}

                  {!hasStarted && !isStarting && (
                    <motion.button
                      onClick={handleStart}
                      className="flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-teal to-teal-light text-white text-[15px] font-semibold font-sans shadow-lg shadow-teal/20 hover:shadow-xl hover:shadow-teal/30 transition-all"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Phone size={18} strokeWidth={2} />
                      <span>Chiama Alice</span>
                    </motion.button>
                  )}

                  {isStarting && !hasStarted && (
                    <div className="flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-teal/50 to-teal-light/50 text-white/60 text-[15px] font-semibold font-sans">
                      <Loader2 size={18} strokeWidth={2} className="animate-spin" />
                      <span>Connessione...</span>
                    </div>
                  )}
                </div>

                {/* RIGHT — Feedback */}
                <div className="flex items-center gap-1.5 w-[120px] justify-end">
                  {canSendFeedback && hasStarted && (
                    <>
                      <motion.button
                        onClick={() => handleFeedback(true)}
                        className="w-9 h-9 flex items-center justify-center rounded-full text-cream/20 hover:text-emerald-400 hover:bg-emerald-400/[0.06] transition-all"
                        whileTap={{ scale: 0.88 }}
                        aria-label="Feedback positivo"
                        title="La risposta è stata utile"
                      >
                        <ThumbsUp size={15} />
                      </motion.button>
                      <motion.button
                        onClick={() => handleFeedback(false)}
                        className="w-9 h-9 flex items-center justify-center rounded-full text-cream/20 hover:text-red-400 hover:bg-red-400/[0.06] transition-all"
                        whileTap={{ scale: 0.88 }}
                        aria-label="Feedback negativo"
                        title="La risposta non è stata utile"
                      >
                        <ThumbsDown size={15} />
                      </motion.button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
