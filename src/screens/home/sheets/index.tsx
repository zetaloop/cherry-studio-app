import React from 'react'
import { FC } from 'react'

import { Model, ReasoningEffortOptions } from '@/types/assistant'
import { FileType } from '@/types/file'

import FileSheet from './FileSheet'
import MentionSheet from './MentionSheet'
import ThinkSheet from './ThinkSheet'

export enum SheetType {
  MENTION = 'mention',
  FILE = 'file',
  THINK = 'think',
  WEBSEARCH = 'websearch'
}

interface SheetViewProps {
  // 通用 sheet 控制
  activeSheet: SheetType | null
  setActiveSheet: (sheet: SheetType | null) => void

  // Mention sheet 相关
  mentions: Model[]
  setMentions: (mentions: Model[]) => void

  // File sheet 相关
  files: FileType[]
  setFiles: (files: FileType[]) => void

  // Think sheet 相关
  reasoningEffort: ReasoningEffortOptions | null
  setReasoningEffort: (options: ReasoningEffortOptions) => void
}

const SheetView: FC<SheetViewProps> = ({
  activeSheet,
  setActiveSheet,
  mentions,
  setMentions,
  files,
  setFiles,
  reasoningEffort,
  setReasoningEffort
}) => {
  return (
    <>
      <MentionSheet
        isOpen={activeSheet === SheetType.MENTION}
        setIsOpen={isOpen => setActiveSheet(isOpen ? SheetType.MENTION : null)}
        mentions={mentions}
        setMentions={setMentions}
      />

      <FileSheet
        isOpen={activeSheet === SheetType.FILE}
        setIsOpen={isOpen => setActiveSheet(isOpen ? SheetType.FILE : null)}
        files={files}
        setFiles={setFiles}
      />

      <ThinkSheet
        isOpen={activeSheet === SheetType.THINK}
        setIsOpen={isOpen => setActiveSheet(isOpen ? SheetType.THINK : null)}
        reasoningEffort={reasoningEffort}
        setReasoningEffort={setReasoningEffort}
      />
    </>
  )
}

export default SheetView
