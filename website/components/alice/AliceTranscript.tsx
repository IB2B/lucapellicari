'use client'

import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { TranscriptEntry } from '@/hooks/useAlice'

interface AliceTranscriptProps {
  entries: TranscriptEntry[]
  currentAliceText?: string
  currentUserText?: string
  className?: string
}

const aliceColor = '#C4956A'
const userColor = '#63C5FE'

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
}

function MessageBubble({ entry }: { entry: TranscriptEntry }) {
  const isAlice = entry.role === 'alice'
  const color = isAlice ? aliceColor : userColor

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-start gap-2.5 ${isAlice ? '' : 'flex-row-reverse'}`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
        style={{
          background: `${color}18`,
          border: `1.5px solid ${color}30`,
          color: color,
        }}>
        {isAlice ? 'A' : 'Tu'}
      </div>

      {/* Bubble */}
      <div className={`max-w-[80%] min-w-0 ${isAlice ? '' : 'flex flex-col items-end'}`}>
        <div className="px-3.5 py-2.5 rounded-2xl"
          style={{
            background: isAlice ? 'rgba(255,255,255,0.04)' : `${userColor}0A`,
            border: `1px solid ${isAlice ? 'rgba(255,255,255,0.06)' : userColor + '15'}`,
            borderTopLeftRadius: isAlice ? '4px' : undefined,
            borderTopRightRadius: isAlice ? undefined : '4px',
          }}>
          <p className="text-[14px] leading-[1.7]"
            style={{ color: 'rgba(250,247,242,0.82)', fontFamily: isAlice ? 'var(--font-serif)' : 'var(--font-sans)' }}>
            {entry.text}
          </p>
        </div>
        <span className={`block mt-1 text-[9px] px-1 ${isAlice ? '' : 'text-right'}`}
          style={{ color: 'rgba(250,247,242,0.15)' }}>
          {formatTime(entry.timestamp)}
        </span>
      </div>
    </motion.div>
  )
}

export function AliceTranscript({ entries, currentAliceText, currentUserText, className }: AliceTranscriptProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [entries, currentAliceText, currentUserText])

  const hasContent = entries.length > 0 || (currentAliceText && currentAliceText.trim()) || (currentUserText && currentUserText.trim())
  if (!hasContent) return null

  return (
    <div
      ref={scrollRef}
      className={`overflow-y-auto ${className || ''}`}
      style={{ scrollbarWidth: 'none' }}
    >
      <div className="space-y-3 px-1">
        <AnimatePresence mode="popLayout">
          {entries.map((entry) => (
            <MessageBubble key={entry.id} entry={entry} />
          ))}

          {/* Live user speech */}
          {currentUserText && currentUserText.trim() && (
            <motion.div key="current-user" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2.5 flex-row-reverse">
              <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                style={{ background: `${userColor}18`, border: `1.5px solid ${userColor}30`, color: userColor }}>
                Tu
              </div>
              <div className="max-w-[80%] flex flex-col items-end">
                <div className="px-3.5 py-2.5 rounded-2xl"
                  style={{ background: `${userColor}08`, border: `1px solid ${userColor}12`, borderTopRightRadius: '4px' }}>
                  <p className="text-[14px] leading-[1.7] italic" style={{ color: 'rgba(250,247,242,0.55)', fontFamily: 'var(--font-sans)' }}>
                    {currentUserText}
                    <motion.span className="inline-block w-[2px] h-[13px] ml-0.5 align-middle rounded-full"
                      style={{ background: `${userColor}50` }}
                      animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }} />
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Live Alice speech */}
          {currentAliceText && currentAliceText.trim() && (
            <motion.div key="current-alice" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2.5">
              <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                style={{ background: `${aliceColor}18`, border: `1.5px solid ${aliceColor}30`, color: aliceColor }}>
                A
              </div>
              <div className="max-w-[80%]">
                <div className="px-3.5 py-2.5 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderTopLeftRadius: '4px' }}>
                  <p className="text-[14px] leading-[1.7]" style={{ color: 'rgba(250,247,242,0.82)', fontFamily: 'var(--font-serif)' }}>
                    {currentAliceText}
                    <motion.span className="inline-block w-[2px] h-[14px] ml-0.5 align-middle rounded-full"
                      style={{ background: `${aliceColor}70` }}
                      animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }} />
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
