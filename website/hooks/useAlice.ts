// Type-only export — all logic lives in AliceProvider
export interface TranscriptEntry {
  role: 'user' | 'alice'
  text: string
  timestamp: number
  id: string
}
