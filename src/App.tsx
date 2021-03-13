import React, { useCallback, useMemo, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { narrowDecision } from './util/decider'
import { EvidenceKey, ghosts } from './util/ghosts'
import { setToArray } from './util/setToArray'
import EvidenceSelector from './components/EvidenceSelector'
import { without } from 'lodash'
import HintPane from './components/HintPane'
import GhostDescription from './components/GhostDescription'

export default function App() {
  const [toggledEvidence, setEvidence] = useState<EvidenceKey[]>([])
  const [isInEliminateMode, setIsInEliminateMode] = useState(false)
  const [eliminatedEvidence, setEliminatedEvidence] = useState<EvidenceKey[]>(
    []
  )

  const handleEvidenceToggle = useCallback(
    (e: EvidenceKey) => {
      if (isInEliminateMode) {
        if (eliminatedEvidence.includes(e)) {
          setEliminatedEvidence(without(eliminatedEvidence, e))
        } else {
          setEliminatedEvidence([...eliminatedEvidence, e])
        }
      } else {
        if (toggledEvidence.includes(e)) {
          setEvidence(without(toggledEvidence, e))
        } else {
          setEvidence([...toggledEvidence, e])
        }
      }
    },
    [toggledEvidence, eliminatedEvidence, isInEliminateMode]
  )

  const handleEliminateToggle = () => {
    setIsInEliminateMode(!isInEliminateMode)
  }

  const { possibleLeftoverEvidence, possibleGhosts } = useMemo(() => {
    const result = narrowDecision(toggledEvidence, eliminatedEvidence)
    return {
      possibleLeftoverEvidence: setToArray(result.possibleLeftoverEvidence),
      possibleGhosts: setToArray(result.possibleGhosts),
    }
  }, [toggledEvidence, eliminatedEvidence])

  const hasEvidence = useMemo(() => !!toggledEvidence.length, [toggledEvidence])

  const handleReset = useCallback(() => {
    setEvidence([])
    setIsInEliminateMode(false)
    setEliminatedEvidence([])
  }, [])

  return (
    <Card>
      <Card.Header className="d-flex align-items-center justify-content-between">
        <h5 className="mb-0">Phasmophobia Ghost Identifier 👻</h5>
        <Button onClick={handleReset} variant="danger">
          Reset
        </Button>
      </Card.Header>
      <Card.Body>
        <Card className="mb-4">
          <Card.Header className="d-flex align-items-center justify-content-between">
            <span>Select Evidence</span>
            <Button
              onClick={handleEliminateToggle}
              variant={isInEliminateMode ? 'primary' : 'outline-secondary'}
              size="sm"
            >
              {isInEliminateMode ? 'Eliminate Mode On' : 'Eliminate Mode Off'}
            </Button>
          </Card.Header>
          <Card.Body>
            <EvidenceSelector
              onEvidenceToggle={handleEvidenceToggle}
              selectedEvidence={toggledEvidence}
              eliminatedEvidence={eliminatedEvidence}
              isInEliminateMode={isInEliminateMode}
              possibleLeftoverEvidence={possibleLeftoverEvidence}
            />
            {!hasEvidence && !isInEliminateMode && (
              <Card.Subtitle className="mb-2 mt-2 text-muted">
                Select existing evidence to discover the possible remaining
                evidence.
              </Card.Subtitle>
            )}
            {isInEliminateMode && (
              <Card.Subtitle className="mb-2 mt-2 text-muted">
                Eliminate evidence by toggling evidence that are singled-out.
              </Card.Subtitle>
            )}
          </Card.Body>
        </Card>
        {hasEvidence && possibleGhosts.length !== 1 && (
          <HintPane
            possibleGhosts={possibleGhosts}
            possibleLeftoverEvidence={possibleLeftoverEvidence}
          />
        )}
        {possibleGhosts.length === 1 && (
          <>
            <Card.Title>
              The ghost is a{' '}
              <span className="font-weight-bold">
                {ghosts[possibleGhosts[0]]}
              </span>
            </Card.Title>
            <GhostDescription ghostKey={possibleGhosts[0]} />
          </>
        )}
      </Card.Body>
      {/* <Card.Footer className="justify-content-end">
        <Button onClick={handleReset} variant="danger">
          Reset
        </Button>
      </Card.Footer> */}
    </Card>
  )
}
