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

  const handleEvidenceToggle = useCallback(
    (e: EvidenceKey) => {
      if (toggledEvidence.includes(e)) {
        setEvidence(without(toggledEvidence, e))
      } else {
        setEvidence([...toggledEvidence, e])
      }
    },
    [toggledEvidence]
  )

  const { possibleLeftoverEvidence, possibleGhosts } = useMemo(() => {
    const result = narrowDecision(toggledEvidence)
    return {
      possibleLeftoverEvidence: setToArray(result.possibleLeftoverEvidence),
      possibleGhosts: setToArray(result.possibleGhosts),
    }
  }, [toggledEvidence])

  const hasEvidence = useMemo(() => !!toggledEvidence.length, [toggledEvidence])

  const handleReset = useCallback(() => {
    setEvidence([])
  }, [])

  return (
    <Card>
      <Card.Header as="h5">Phasmophobia Ghost Identifier 👻</Card.Header>
      <Card.Body>
        <EvidenceSelector
          onEvidenceToggle={handleEvidenceToggle}
          selectedEvidence={toggledEvidence}
          possibleLeftoverEvidence={possibleLeftoverEvidence}
        />
        {!hasEvidence && (
          <Card.Subtitle className="mb-2 mt-2 text-muted">
            Select existing evidence to discover the possible remaining
            evidence.
          </Card.Subtitle>
        )}
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
      <Card.Footer className="justify-content-end">
        <Button onClick={handleReset} variant="danger">
          Reset
        </Button>
      </Card.Footer>
    </Card>
  )
}
