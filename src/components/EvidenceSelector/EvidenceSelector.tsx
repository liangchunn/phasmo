import {
  allEvidenceKeys,
  evidence,
  evidenceImage,
  EvidenceKey,
} from '../../util/ghosts'
import EvidenceButton from './EvidenceButton'

type EvidenceSelectorProps = {
  selectedEvidence: EvidenceKey[]
  onEvidenceToggle: (e: EvidenceKey) => void
  possibleLeftoverEvidence: EvidenceKey[]
}

export default function EvidenceSelector({
  selectedEvidence,
  onEvidenceToggle,
  possibleLeftoverEvidence,
}: EvidenceSelectorProps) {
  return (
    <div className="mb-2">
      {allEvidenceKeys.map((evidenceKey) => (
        <EvidenceButton
          key={evidenceKey}
          imgSrc={evidenceImage[evidenceKey]}
          label={evidence[evidenceKey]}
          onClick={onEvidenceToggle}
          value={evidenceKey}
          disabled={
            !selectedEvidence.includes(evidenceKey) &&
            !possibleLeftoverEvidence.includes(evidenceKey)
          }
          isSelected={selectedEvidence.includes(evidenceKey)}
        />
      ))}
    </div>
  )
}
