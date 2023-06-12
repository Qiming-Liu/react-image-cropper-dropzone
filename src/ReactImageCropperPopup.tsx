import React, {useRef} from 'react'
import Modal from './Model'
import ReactImageCropper, {RefObject} from './ReactImageCropper'

interface ReactImageCropperPopupProps {
  open: boolean
  DialogClose: () => void
  img: string
  afterCut: (dataUrl: string) => void
  aspectRatio: number
  lockAspectRatio: boolean
}

const ReactImageCropperPopup: React.FC<ReactImageCropperPopupProps> = ({
  open,
  DialogClose,
  img,
  afterCut,
  aspectRatio,
  lockAspectRatio,
}) => {
  const ImageCropperRef = useRef<RefObject>(null)

  const handleSaveClick = () => {
    DialogClose()
    if (ImageCropperRef.current) {
      afterCut(ImageCropperRef.current.getCropData() as string)
    }
  }

  return (
    <Modal isOpen={open} onClose={DialogClose} contentLabel="Crop your picture">
      <ReactImageCropper aspectRatio={aspectRatio} src={img} lockAspectRatio={lockAspectRatio} ref={ImageCropperRef} />
      <button onClick={handleSaveClick}>Save</button>
    </Modal>
  )
}

export {ReactImageCropperPopup}
