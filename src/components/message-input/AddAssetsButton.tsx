import { BottomSheetModal } from '@gorhom/bottom-sheet'
import React, { useRef } from 'react'
import { Button } from 'tamagui'

import { FileType } from '@/types/file'

import { AssetsIcon } from '../icons/AssetsIcon'
import FileSheet from '../sheets/FileSheet'

interface AddAssetsButtonProps {
  files: FileType[]
  setFiles: (files: FileType[]) => void
}

export const AddAssetsButton: React.FC<AddAssetsButtonProps> = ({ files, setFiles }) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const handlePress = () => {
    bottomSheetModalRef.current?.present()
  }

  return (
    <>
      <Button chromeless size={24} icon={<AssetsIcon size={24} />} onPress={handlePress} />

      <FileSheet ref={bottomSheetModalRef} files={files} setFiles={setFiles} />
    </>
  )
}
