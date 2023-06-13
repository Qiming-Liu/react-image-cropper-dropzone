import React, {FC, ReactNode, useEffect, useRef, useState} from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

const Modal: FC<ModalProps> = ({isOpen, onClose, title, children}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(isOpen)

  useEffect(() => {
    if (isOpen) {
      setShow(true)
    } else {
      setTimeout(() => setShow(false), 200) // Delay of 200ms to play the transition
    }
  }, [isOpen])

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen, onClose])

  if (!show) return null

  return (
    <div style={OVERLAY_STYLES}>
      <div ref={modalRef} style={{...MODAL_STYLES, opacity: isOpen ? 1 : 0}}>
        <h2>{title}</h2>
        {children}
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
  padding: '20px',
  borderRadius: '10px',
  maxWidth: '500px',
  margin: '0 auto',
  transition: 'opacity 0.2s ease-in-out', // Transition of 200ms
}

export default Modal
