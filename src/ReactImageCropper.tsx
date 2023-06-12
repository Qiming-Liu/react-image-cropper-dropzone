import React, {Ref, useRef, useState, useImperativeHandle, forwardRef} from 'react'
import ReactCropper, {ReactCropperElement} from 'react-cropper'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

export interface RefObject {
  getCropData: () => string
}

type ReactImageCropperProps = {
  aspectRatio: number
  lockAspectRatio: boolean
  src: string
}

const ReactImageCropper = forwardRef((props: ReactImageCropperProps, ref: Ref<RefObject>) => {
  const {aspectRatio, lockAspectRatio, src} = props
  const cropperRef = useRef<ReactCropperElement>(null)
  const [cropper, setCropper] = useState<Cropper>()

  useImperativeHandle(ref, () => ({
    getCropData: () => {
      if (typeof cropper !== 'undefined') {
        return cropper.getCroppedCanvas().toDataURL() as string
      }
      return ''
    },
  }))

  return lockAspectRatio ? (
    <ReactCropper
      src={src}
      style={{height: 400, width: '100%'}}
      initialAspectRatio={aspectRatio}
      aspectRatio={aspectRatio}
      background
      autoCropArea={1}
      guides
      ref={cropperRef}
      scalable={false}
      movable={false}
      zoomable={false}
      zoomOnTouch={false}
      onInitialized={(instance) => {
        setCropper(instance)
      }}
    />
  ) : (
    <ReactCropper
      src={src}
      style={{height: 400, width: '100%'}}
      background
      autoCropArea={1}
      guides
      ref={cropperRef}
      scalable={false}
      movable={false}
      zoomable={false}
      zoomOnTouch={false}
      onInitialized={(instance: React.SetStateAction<Cropper | undefined>) => {
        setCropper(instance)
      }}
    />
  )
})

ReactImageCropper.displayName = 'ImgCropper'

export default ReactImageCropper
