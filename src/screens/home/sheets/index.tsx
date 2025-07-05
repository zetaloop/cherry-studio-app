import React from 'react'
import { FC } from 'react'

import { Model } from '@/types/assistant'

import MentionSheet from './MentionSheet'

interface SheetViewProps {
  isMentionSheetOpen: boolean
  setIsMentionSheetOpen: (isOpen: boolean) => void
  mentions: Model[]
  setMentions: (mentions: Model[]) => void
}

const SheetView: FC<SheetViewProps> = ({ isMentionSheetOpen, setIsMentionSheetOpen, mentions, setMentions }) => {
  return (
    <MentionSheet
      isMentionSheetOpen={isMentionSheetOpen}
      setIsMentionSheetOpen={setIsMentionSheetOpen}
      mentions={mentions}
      setMentions={setMentions}
    />
  )
}

export default SheetView
