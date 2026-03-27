'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
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
  const animFrameRef = useRef<number>(0)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isVisible && !hasInteracted) {
      const pingTimer = setTimeout(() => setShowPing(true), 500)
      const tooltipTimer = setTimeout(() => setShowTooltip(true), 800)
      const hideTooltip = setTimeout(() => {
        setShowTooltip(false)
        setShowPing(false)
      }, 6000)
      return () => {
        clearTimeout(pingTimer)
        clearTimeout(tooltipTimer)
        clearTimeout(hideTooltip)
      }
    }
  }, [isVisible, hasInteracted])

  useEffect(() => {
    if (status === 'connected' && !isOverlayOpen) {
      const poll = () => {
        setAudioLevel(Math.max(getInputVolume(), getOutputVolume()))
        animFrameRef.current = requestAnimationFrame(poll)
      }
      animFrameRef.current = requestAnimationFrame(poll)
      return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current) }
    } else {
      setAudioLevel(0)
    }
  }, [status, isOverlayOpen, getInputVolume, getOutputVolume])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    setMousePos({ x: (e.clientX - centerX) * 0.12, y: (e.clientY - centerY) * 0.12 })
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
                <motion.div
                  className="absolute inset-[-8px] rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(107,155,174,0.35) 0%, rgba(107,155,174,0) 70%)' }}
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 3.5, opacity: 0 }}
                  transition={{ duration: 1.8, ease: 'easeOut' }}
                />
                <motion.div
                  className="absolute inset-[-8px] rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(107,155,174,0.25) 0%, rgba(107,155,174,0) 70%)' }}
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 2.8, opacity: 0 }}
                  transition={{ duration: 1.8, ease: 'easeOut', delay: 0.3 }}
                />
              </>
            )}
          </AnimatePresence>

          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                className="absolute bottom-full right-0 mb-5 whitespace-nowrap"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="relative bg-white rounded-2xl px-5 py-3.5 shadow-lg border border-navy/5">
                  <p className="text-sm font-medium text-navy-dark leading-snug">
                    {ALICE_CONFIG.greeting}
                  </p>
                  <p className="text-[11px] text-navy/40 mt-0.5">Assistente AI vocale</p>
                  <div className="absolute -bottom-1.5 right-7 w-3 h-3 bg-white border-r border-b border-navy/5 rotate-45" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Orb button */}
          <motion.button
            ref={buttonRef}
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setMousePos({ x: 0, y: 0 }); setIsHovered(false) }}
            className="relative w-[72px] h-[72px] rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, x: mousePos.x, y: mousePos.y }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              scale: { type: 'spring', stiffness: 400, damping: 15 },
              opacity: { duration: 0.3 },
              x: { type: 'spring', stiffness: 150, damping: 15 },
              y: { type: 'spring', stiffness: 150, damping: 15 },
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            aria-label="Parla con Alice, assistente vocale AI"
          >
            {/* Outer glow ring */}
            <div className="absolute inset-[-4px] rounded-full bg-gradient-to-br from-teal/25 via-teal/10 to-coral/15 blur-[2px]" />
            <div className="absolute inset-[-2px] rounded-full bg-gradient-to-br from-white/30 to-white/5 backdrop-blur-sm" />

            {/* Canvas orb */}
            <div className="absolute inset-0 flex items-center justify-center rounded-full overflow-hidden">
              <AliceOrbVisualizer
                size={72}
                audioLevel={audioLevel}
                status={mappedStatus}
                isSpeaking={isSpeaking}
              />
            </div>

            {/* Center icon */}
            {status !== 'connected' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <MessageCircle size={26} className="text-white/80 drop-shadow-sm" strokeWidth={1.8} />
              </div>
            )}

            {/* Connected indicator */}
            {status === 'connected' && (
              <motion.div
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-400 border-[2.5px] border-white shadow-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              />
            )}
          </motion.button>

          {/* Hover label */}
          <AnimatePresence>
            {isHovered && !showTooltip && (
              <motion.div
                className="absolute bottom-full right-0 mb-3 whitespace-nowrap pointer-events-none"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
              >
                <span className="text-xs font-semibold text-navy-dark bg-white rounded-full px-4 py-2 shadow-md border border-navy/5">
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
