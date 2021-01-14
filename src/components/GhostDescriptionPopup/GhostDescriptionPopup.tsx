import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { GhostKeys, ghosts } from '../../util/ghosts'
import GhostDescription from '../GhostDescription/GhostDescription'

type GhostDescriptionPopupProps = {
  ghostKey: GhostKeys
}

export default function GhostDescriptionPopup({
  ghostKey,
}: GhostDescriptionPopupProps) {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)
  return (
    <>
      <Button variant="outline-dark" onClick={handleOpen} className="mr-2 mb-2">
        {ghosts[ghostKey]}
      </Button>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{ghosts[ghostKey]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GhostDescription ghostKey={ghostKey} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
