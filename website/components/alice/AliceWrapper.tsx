'use client'

import { memo } from 'react'
import { AliceProvider } from './AliceProvider'
import { AliceFloatingWidget } from './AliceFloatingWidget'
import { AliceConversationOverlay } from './AliceConversationOverlay'

// Prevent children from re-rendering when Alice context changes
const StableChildren = memo(function StableChildren({ children }: { children: React.ReactNode }) {
  return <>{children}</>
})

export function AliceWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AliceProvider>
      <StableChildren>{children}</StableChildren>
      <AliceFloatingWidget />
      <AliceConversationOverlay />
    </AliceProvider>
  )
}
