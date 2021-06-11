import React, { FormEvent, useState } from 'react'
import { useCallback } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import {
  ALL_FEATURE_TOGGLES,
  FeatureToggleKey,
  FEATURE_TOGGLE_NAME,
} from '../../util/features'

type OptionsProps = {
  featureHandlerMap: Record<FeatureToggleKey, (enable: boolean) => void>
}

const Options: React.FC<OptionsProps> = ({ featureHandlerMap }) => {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  // TODO: handle this better
  const handleValueChange = useCallback(
    (featureKey: FeatureToggleKey) => (event: FormEvent<HTMLInputElement>) => {
      featureHandlerMap[featureKey](event.currentTarget.checked)
    },
    [featureHandlerMap]
  )
  return (
    <>
      <Button variant="outline-dark" onClick={handleOpen}>
        Options
      </Button>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            Options
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {ALL_FEATURE_TOGGLES.map((key) => {
              return (
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label={FEATURE_TOGGLE_NAME[key]}
                    onChange={handleValueChange(key)}
                  />
                </Form.Group>
              )
            })}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Options
