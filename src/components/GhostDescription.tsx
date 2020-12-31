import { useState } from 'react'
import { Button, Card, CardDeck, Modal } from 'react-bootstrap'
import {
  ghostDescription,
  GhostKeys,
  ghosts,
  ghostStrengths,
  ghostWeaknesses,
} from '../util/ghosts'
import StrengthImage from '../images/strength.png'
import WeaknessImage from '../images/weakness.png'

type GhostDescriptionProps = {
  ghostKey: GhostKeys
}

export default function GhostDescription({ ghostKey }: GhostDescriptionProps) {
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
          <p className="mb-2">{ghostDescription[ghostKey]}</p>
          <CardDeck>
            <Card border="danger">
              <Card.Header className="d-flex align-items-center">
                <img
                  src={StrengthImage}
                  className="mr-2"
                  style={{ imageRendering: 'pixelated' }}
                  alt="Strength"
                />
                Strengths
              </Card.Header>
              <Card.Body>{ghostStrengths[ghostKey]}</Card.Body>
            </Card>
            <Card border="success">
              <Card.Header className="d-flex align-items-center">
                {' '}
                <img
                  src={WeaknessImage}
                  className="mr-2"
                  style={{ imageRendering: 'pixelated' }}
                  alt="Strength"
                />
                Weaknesses
              </Card.Header>
              <Card.Body>{ghostWeaknesses[ghostKey]}</Card.Body>
            </Card>
          </CardDeck>
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
