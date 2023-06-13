import React, {useRef} from 'react'
import Modal from './Model'
import ReactImageCropper, {RefObject} from './ReactImageCropper'

interface ReactImageCropperPopupProps {
  open: boolean
  onClose: () => void
  img: string
  afterCrop: (dataUrl: string) => void
  title: string
  lockAspectRatio: boolean
  aspectRatio: number
}

const ReactImageCropperPopup: React.FC<ReactImageCropperPopupProps> = ({
  open,
  onClose,
  img,
  afterCrop,
  title,
  lockAspectRatio,
  aspectRatio,
}) => {
  const ImageCropperRef = useRef<RefObject>(null)

  const handleSaveClick = () => {
    onClose()
    if (ImageCropperRef.current) {
      afterCrop(ImageCropperRef.current.getCropData() as string)
    }
  }

  return (
    <Modal isOpen={open} onClose={onClose} title={title}>
      <ReactImageCropper aspectRatio={aspectRatio} src={img} lockAspectRatio={lockAspectRatio} ref={ImageCropperRef} />
      <button style={BUTTON_STYLES} onClick={handleSaveClick}>
        Save
      </button>
    </Modal>
  )
}

const BUTTON_STYLES: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  backgroundColor: 'transparent',
  border: 0,
  cursor: 'pointer',
  textDecoration: 'none',
  fontWeight: 600,
  fontFamily:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  fontSize: '0.875rem',
  lineHeight: '1.75',
  minWidth: 64,
  borderRadius: 8,
  transition:
    'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, boxShadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, borderColor 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  textTransform: 'none',
  padding: '9px 16px',
}

export {ReactImageCropperPopup}
