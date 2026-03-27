'use client'

import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User } from 'lucide-react'
import type { TranscriptEntry } from '@/hooks/useAlice'

interface AliceTranscriptProps {
  entries: TranscriptEntry[]
  currentAliceText?: string
  currentUserText?: string
  className?: string
}

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
}

function AliceAvatar() {
  return (
    <div className="flex-shrink-0 w-9 h-9 rounded-full relative">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal via-teal-light to-coral/40 opacity-40 blur-[4px]" />
      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#1a3345] to-[#0f2030] border border-teal/25 flex items-center justify-center">
        <span className="text-[12px] font-bold bg-gradient-to-br from-teal-light to-teal bg-clip-text text-transparent font-sans leading-none">A</span>
      </div>
    </div>
  )
}

function UserAvatar() {
  return (
    <div className="flex-shrink-0 w-9 h-9 rounded-full relative">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-coral to-coral/30 opacity-25 blur-[3px]" />
      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#2a2018] to-[#1a1410] border border-coral/20 flex items-center justify-center">
        <User size={14} className="text-coral/70" />
      </div>
    </div>
  )
}

function MessageBubble({ entry }: { entry: TranscriptEntry }) {
  const isAlice = entry.role === 'alice'

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-start gap-3 ${isAlice ? '' : 'flex-row-reverse'}`}
    >
      {isAlice ? <AliceAvatar /> : <UserAvatar />}

      <div className={`max-w-[85%] min-w-0 ${isAlice ? '' : 'flex flex-col items-end'}`}>
        <span className={`block text-[10px] font-semibold uppercase tracking-[0.1em] mb-1.5 px-1 ${
          isAlice ? 'text-teal/40' : 'text-coral/40'
        }`}>
          {isAlice ? 'Alice' : 'Tu'}
        </span>

        <div className={`px-5 py-3.5 ${
          isAlice
            ? 'bg-white/[0.05] border border-white/[0.07] rounded-2xl rounded-tl-sm backdrop-blur-[2px]'
            : 'bg-coral/[0.07] border border-coral/[0.12] rounded-2xl rounded-tr-sm'
        }`}>
          <p className={`leading-[1.75] ${
            isAlice
              ? 'font-serif text-cream/90 text-[15.5px]'
              : 'font-sans text-cream/80 text-[15px]'
          }`}>
            {entry.text}
          </p>
        </div>

        <span className={`block mt-1.5 text-[10px] tracking-wide text-cream/15 px-1.5 ${isAlice ? '' : 'text-right'}`}>
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
      style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.04) transparent' }}
    >
      <div className="space-y-5 pb-4">
        <AnimatePresence mode="popLayout">
          {entries.map((entry) => (
            <MessageBubble key={entry.id} entry={entry} />
          ))}

          {/* Live user speech preview */}
          {currentUserText && currentUserText.trim() && (
            <motion.div
              key="current-user"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 flex-row-reverse"
            >
              <UserAvatar />
              <div className="max-w-[85%] flex flex-col items-end">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.1em] mb-1.5 px-1 text-coral/40">
                  Tu
                </span>
                <div className="bg-coral/[0.05] border border-coral/[0.08] rounded-2xl rounded-tr-sm px-5 py-3.5">
                  <p className="font-sans text-cream/60 text-[15px] leading-[1.75] italic">
                    {currentUserText}
                    <motion.span
                      className="inline-block w-[2px] h-[14px] bg-coral/40 ml-0.5 align-middle rounded-full"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                    />
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Live Alice speech preview */}
          {currentAliceText && currentAliceText.trim() && (
            <motion.div
              key="current-alice"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3"
            >
              <AliceAvatar />
              <div className="max-w-[85%]">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.1em] mb-1.5 px-1 text-teal/40">
                  Alice
                </span>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-2xl rounded-tl-sm backdrop-blur-[2px] px-5 py-3.5">
                  <p className="font-serif text-cream/90 text-[15.5px] leading-[1.75]">
                    {currentAliceText}
                    <motion.span
                      className="inline-block w-[2px] h-[16px] bg-teal/60 ml-0.5 align-middle rounded-full"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                    />
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
