'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic } from 'lucide-react'
import { useAliceContext } from './AliceProvider'
import { AliceOrbVisualizer } from './AliceOrbVisualizer'
import { ALICE_CONFIG } from '@/lib/alice-config'
import { playSound } from './AliceSounds'

export function AliceFloatingWidget() {
  const {
    isOverlayOpen, hasInteracted, openAlice, markInteracted,
    status, isSpeaking, getInputVolume, getOutputVolume,
  } = useAliceContext()

  const [showTooltip, setShowTooltip] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [showPing, setShowPing] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)
  const buttonRef = useRef<HTMLButtonElement>(null)


  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 2000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (isVisible && !hasInteracted) {
      const t1 = setTimeout(() => setShowPing(true), 500)
      const t2 = setTimeout(() => setShowTooltip(true), 900)
      const t3 = setTimeout(() => { setShowTooltip(false); setShowPing(false) }, 6500)
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    }
  }, [isVisible, hasInteracted])

  useEffect(() => {
    if (status === 'connected' && !isOverlayOpen) {
      const id = setInterval(() => {
        setAudioLevel(Math.max(getInputVolume(), getOutputVolume()))
      }, 150)
      return () => clearInterval(id)
    } else {
      setAudioLevel(0)
    }
  }, [status, isOverlayOpen, getInputVolume, getOutputVolume])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    setMousePos({ x: (e.clientX - (rect.left + rect.width / 2)) * 0.12, y: (e.clientY - (rect.top + rect.height / 2)) * 0.12 })
  }, [])

  const handleClick = useCallback(() => {
    playSound('open')
    if (!hasInteracted) markInteracted()
    setShowTooltip(false)
    openAlice()
  }, [hasInteracted, markInteracted, openAlice])

  if (isOverlayOpen) return null

  const mappedStatus = status === 'disconnected' ? 'idle' : (status as 'idle' | 'connecting' | 'connected')

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[45]"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          {/* Sonar ping */}
          <AnimatePresence>
            {showPing && (
              <>
                <motion.div className="absolute inset-[-8px] rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle,rgba(107,155,174,0.4) 0%,rgba(107,155,174,0) 70%)' }}
                  initial={{ scale: 1, opacity: 0.9 }}
                  animate={{ scale: 3.8, opacity: 0 }}
                  transition={{ duration: 2.2, ease: 'easeOut' }} />
                <motion.div className="absolute inset-[-8px] rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle,rgba(107,155,174,0.25) 0%,rgba(107,155,174,0) 70%)' }}
                  initial={{ scale: 1, opacity: 0.7 }}
                  animate={{ scale: 3.0, opacity: 0 }}
                  transition={{ duration: 2.2, ease: 'easeOut', delay: 0.35 }} />
              </>
            )}
          </AnimatePresence>

          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div className="absolute bottom-full right-0 mb-5 whitespace-nowrap"
                initial={{ opacity: 0, y: 10, scale: 0.93 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.93 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}>
                <div className="relative rounded-2xl px-5 py-3.5 shadow-xl"
                  style={{
                    background: 'rgba(12,28,44,0.92)',
                    border: '1px solid rgba(107,155,174,0.15)',
                    backdropFilter: 'blur(16px)',
                  }}>
                  <p className="text-sm font-medium leading-snug" style={{ color: 'rgba(250,247,242,0.9)' }}>
                    {ALICE_CONFIG.greeting}
                  </p>
                  <p className="text-[11px] mt-0.5" style={{ color: 'rgba(107,155,174,0.7)' }}>Assistente AI vocale</p>
                  {/* Caret */}
                  <div className="absolute -bottom-1.5 right-7 w-3 h-3 rotate-45"
                    style={{ background: 'rgba(12,28,44,0.92)', border: '1px solid rgba(107,155,174,0.15)', borderTop: 'none', borderLeft: 'none' }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main orb button */}
          <motion.button
            ref={buttonRef}
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setMousePos({ x: 0, y: 0 }); setIsHovered(false) }}
            className="relative w-[74px] h-[74px] rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B9BAE] focus-visible:ring-offset-2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, x: mousePos.x, y: mousePos.y }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              scale: { type: 'spring', stiffness: 380, damping: 16 },
              opacity: { duration: 0.3 },
              x: { type: 'spring', stiffness: 140, damping: 15 },
              y: { type: 'spring', stiffness: 140, damping: 15 },
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.93 }}
            aria-label="Parla con Alice, assistente vocale AI"
          >
            {/* Outer glow aura */}
            <motion.div
              className="absolute inset-[-6px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle,rgba(107,155,174,0.35) 0%,transparent 70%)' }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.7, 0.4, 0.7] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }} />

            {/* Glass rim */}
            <div className="absolute inset-[-2px] rounded-full pointer-events-none"
              style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.25),rgba(255,255,255,0.05))', backdropFilter: 'blur(2px)' }} />

            {/* Orb canvas */}
            <div className="absolute inset-0 flex items-center justify-center rounded-full overflow-hidden">
              <AliceOrbVisualizer size={74} audioLevel={audioLevel} status={mappedStatus} isSpeaking={isSpeaking} />
            </div>

            {/* Mic icon when idle */}
            {status !== 'connected' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Mic size={26} style={{ color: 'rgba(255,255,255,0.82)' }} strokeWidth={1.7} />
              </div>
            )}

            {/* Connected green dot */}
            {status === 'connected' && (
              <motion.div
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full border-[2.5px] border-white shadow-sm"
                style={{ background: '#34d399' }}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }} />
            )}
          </motion.button>

          {/* Hover label */}
          <AnimatePresence>
            {isHovered && !showTooltip && (
              <motion.div className="absolute bottom-full right-0 mb-3 whitespace-nowrap pointer-events-none"
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}>
                <span className="text-xs font-semibold px-4 py-2 rounded-full shadow-lg"
                  style={{
                    background: 'rgba(12,28,44,0.9)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(107,155,174,0.15)', color: 'rgba(250,247,242,0.9)',
                  }}>
                  Parla con Alice
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  )
}
