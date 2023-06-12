import React, {FC, ReactNode} from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  contentLabel: string
  children: ReactNode
}

const Modal: FC<ModalProps> = ({isOpen, onClose, contentLabel, children}) => {
  if (!isOpen) return null

  return (
    <div style={OVERLAY_STYLES}>
      <div style={MODAL_STYLES}>
        <h2>{contentLabel}</h2>
        {children}
        <button onClick={onClose}>Close Modal</button>
      </div>
    </div>
  )
}

const OVERLAY_STYLES: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  display: 'grid',
  placeItems: 'center',
}

const MODAL_STYLES: React.CSSProperties = {
  backgroundColor: '#FFF',
  padding: '50px',
  borderRadius: '10px',
  maxWidth: '500px',
  margin: '0 auto',
}

export default Modal
