'use client'

import { AliceProvider } from './AliceProvider'
import { AliceFloatingWidget } from './AliceFloatingWidget'
import { AliceConversationOverlay } from './AliceConversationOverlay'

export function AliceWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AliceProvider>
      {children}
      <AliceFloatingWidget />
      <AliceConversationOverlay />
    </AliceProvider>
  )
}
