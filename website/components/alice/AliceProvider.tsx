'use client'

import { createContext, useContext, useState, useCallback, useEffect, useRef, useMemo, type ReactNode } from 'react'
import { useConversation } from '@elevenlabs/react'
import { ALICE_CONFIG } from '@/lib/alice-config'
import type { TranscriptEntry } from '@/hooks/useAlice'

let providerMsgId = 0
function genId() { return `msg-${Date.now()}-${++providerMsgId}` }

interface AliceContextType {
  isOverlayOpen: boolean
  hasInteracted: boolean
  openAlice: () => void
  closeAlice: () => void
  markInteracted: () => void
  status: string
  isSpeaking: boolean
  isListening: boolean
  transcript: TranscriptEntry[]
  currentAliceText: string
  currentUserText: string
  canSendFeedback: boolean
  micMuted: boolean
  start: () => Promise<void>
  stop: () => Promise<void>
  resetSession: () => void
  setVolume: (opts: { volume: number }) => void
  safeSendFeedback: (like: boolean) => void
  toggleMute: () => void
  getInputVolume: () => number
  getOutputVolume: () => number
  getInputFrequencyData: () => Uint8Array | undefined
  getOutputFrequencyData: () => Uint8Array | undefined
}

const AliceContext = createContext<AliceContextType | null>(null)

export function useAliceContext() {
  const ctx = useContext(AliceContext)
  if (!ctx) throw new Error('useAliceContext must be used within AliceProvider')
  return ctx
}

export function AliceProvider({ children }: { children: ReactNode }) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(true)
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([])
  const [currentAliceText, setCurrentAliceText] = useState('')
  const [currentUserText, setCurrentUserText] = useState('')
  const [micMuted, setMicMuted] = useState(false)
  const sessionStartedRef = useRef(false)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const lastCommittedRef = useRef<{ role: string; text: string; time: number }>({ role: '', text: '', time: 0 })

  useEffect(() => {
    const stored = localStorage.getItem('alice-interacted')
    setHasInteracted(stored === 'true')
  }, [])

  const conversation = useConversation({
    onMessage: (message: any) => {
      const isAgent = message.role === 'agent' || message.source === 'ai'
      const isUser = message.role === 'user' || message.source === 'user'
      const text = (message.message || '').trim()
      if (!text) return

      if (isUser) {
        // Dedup: skip if same user text committed recently
        const lc = lastCommittedRef.current
        if (lc.role === 'user' && lc.text === text && Date.now() - lc.time < 8000) return
        lastCommittedRef.current = { role: 'user', text, time: Date.now() }
        setTranscript(t => [...t, { role: 'user', text, timestamp: Date.now(), id: genId() }])
        setCurrentUserText('')
      } else if (isAgent) {
        setCurrentAliceText(prev => prev + text)
      }
    },
    onModeChange: (mode: any) => {
      if (mode.mode === 'speaking') {
        setCurrentUserText('')
      } else if (mode.mode === 'listening') {
        setCurrentAliceText(prev => {
          const trimmed = prev.trim()
          if (trimmed) {
            // Dedup: skip if same alice text committed recently
            const lc = lastCommittedRef.current
            if (lc.role === 'alice' && lc.text === trimmed && Date.now() - lc.time < 8000) return ''
            lastCommittedRef.current = { role: 'alice', text: trimmed, time: Date.now() }
            setTranscript(t => [...t, { role: 'alice', text: trimmed, timestamp: Date.now(), id: genId() }])
          }
          return ''
        })
      }
    },
    onConnect: () => { sessionStartedRef.current = true },
    onDisconnect: () => { sessionStartedRef.current = false },
    onError: (error: any) => { console.error('Alice error:', error) },
  })

  const openAlice = useCallback(() => {
    setIsOverlayOpen(true)
    if (!hasInteracted) {
      setHasInteracted(true)
      localStorage.setItem('alice-interacted', 'true')
    }
  }, [hasInteracted])

  const closeAlice = useCallback(() => { setIsOverlayOpen(false) }, [])

  const markInteracted = useCallback(() => {
    setHasInteracted(true)
    localStorage.setItem('alice-interacted', 'true')
  }, [])

  const start = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaStreamRef.current = stream
    setMicMuted(false)
    await conversation.startSession({
      agentId: ALICE_CONFIG.agentId,
      connectionType: 'webrtc',
    })
  }, [conversation])

  const stop = useCallback(async () => {
    setCurrentUserText('')
    setCurrentAliceText(prev => {
      if (prev.trim()) {
        setTranscript(t => [...t, { role: 'alice', text: prev.trim(), timestamp: Date.now(), id: genId() }])
      }
      return ''
    })
    try { await conversation.endSession() } catch {}
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop())
      mediaStreamRef.current = null
    }
  }, [conversation])

  const resetSession = useCallback(() => {
    setTranscript([])
    setCurrentAliceText('')
    setCurrentUserText('')
    setMicMuted(false)
    lastCommittedRef.current = { role: '', text: '', time: 0 }
  }, [])

  const toggleMute = useCallback(() => {
    setMicMuted(prev => {
      const newMuted = !prev
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getAudioTracks().forEach(track => {
          track.enabled = !newMuted
        })
      }
      return newMuted
    })
  }, [])

  const safeSendFeedback = useCallback((like: boolean) => {
    try { if (conversation.canSendFeedback) conversation.sendFeedback(like) } catch {}
  }, [conversation])

  const getInputVolume = useCallback(() => { try { return conversation.getInputVolume() } catch { return 0 } }, [conversation])
  const getOutputVolume = useCallback(() => { try { return conversation.getOutputVolume() } catch { return 0 } }, [conversation])
  const getInputFrequencyData = useCallback(() => { try { return conversation.getInputByteFrequencyData() } catch { return undefined } }, [conversation])
  const getOutputFrequencyData = useCallback(() => { try { return conversation.getOutputByteFrequencyData() } catch { return undefined } }, [conversation])

  const contextValue = useMemo(() => ({
    isOverlayOpen, hasInteracted, openAlice, closeAlice, markInteracted,
    status: conversation.status,
    isSpeaking: conversation.isSpeaking,
    micMuted,
    isListening: conversation.status === 'connected' && !conversation.isSpeaking,
    transcript, currentAliceText, currentUserText,
    canSendFeedback: conversation.canSendFeedback,
    start, stop, resetSession,
    setVolume: conversation.setVolume,
    safeSendFeedback,
    toggleMute,
    getInputVolume, getOutputVolume, getInputFrequencyData, getOutputFrequencyData,
  }), [
    isOverlayOpen, hasInteracted, openAlice, closeAlice, markInteracted,
    conversation.status, conversation.isSpeaking, conversation.canSendFeedback, conversation.setVolume,
    micMuted, transcript, currentAliceText, currentUserText,
    start, stop, resetSession, safeSendFeedback, toggleMute,
    getInputVolume, getOutputVolume, getInputFrequencyData, getOutputFrequencyData,
  ])

  return (
    <AliceContext.Provider value={contextValue}>
      {children}
    </AliceContext.Provider>
  )
}
