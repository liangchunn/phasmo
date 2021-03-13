import { Card } from 'react-bootstrap'
import {
  evidence,
  evidenceImage,
  EvidenceKey,
  GhostKeys,
} from '../../util/ghosts'
import GhostDescriptionPopup from '../GhostDescriptionPopup'

type HintPaneProps = {
  possibleLeftoverEvidence: EvidenceKey[]
  possibleGhosts: GhostKeys[]
}

export default function HintPane({
  possibleLeftoverEvidence,
  possibleGhosts,
}: HintPaneProps) {
  return (
    <>
      <Card className="mb-2">
        <Card.Header>Possible Remaining Evidence</Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-center flex-wrap">
            {possibleLeftoverEvidence.map((key) => (
              <div className="d-flex flex-column align-items-center mr-2">
                <img
                  src={evidenceImage[key]}
                  alt={evidence[key]}
                  width={48}
                  height={48}
                  className="pixelated"
                />
                <p className="font-weight-bold">{evidence[key]}</p>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Possible Ghosts</Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-center flex-wrap">
            {possibleGhosts.map((key) => (
              <GhostDescriptionPopup ghostKey={key} />
            ))}
          </div>
        </Card.Body>
      </Card>
    </>
  )
}
