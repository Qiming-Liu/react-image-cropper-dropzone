import React, {useCallback, useState} from 'react'
import {useDropzone, Accept} from 'react-dropzone'
import {ReactImageCropperPopup} from './ReactImageCropperPopup'

export {Accept}

export interface ReactImageCropperDropzoneProps {
  children: React.ReactNode
  accept: Accept
  afterCut: (dataUrl: string) => void
  aspectRatio: number
  lockAspectRatio?: boolean
}

export const ReactImageCropperDropzone: React.FC<ReactImageCropperDropzoneProps> = ({
  children,
  accept,
  afterCut,
  aspectRatio,
  lockAspectRatio = true,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [image, setImage] = useState<string>('')

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    const reader = new FileReader()

    reader.onabort = () => console.log('[ReactImageCropperDropzone]: File reading was aborted')
    reader.onerror = () => console.log('[ReactImageCropperDropzone]: File reading has failed')
    reader.onload = () => {
      if (reader.result) {
        setImage(reader.result as string)
        setOpen(true)
      }
    }

    reader.readAsDataURL(acceptedFiles[0])
  }, [])

  const {getRootProps, getInputProps} = useDropzone({
    accept,
    maxFiles: 1,
    maxSize: 4000000,
    minSize: 0,
    onDrop,
  })

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {children}
      </div>
      <ReactImageCropperPopup
        open={open}
        DialogClose={() => {
          setOpen(false)
        }}
        img={image}
        afterCut={afterCut}
        aspectRatio={aspectRatio}
        lockAspectRatio={lockAspectRatio}
      />
    </>
  )
}
