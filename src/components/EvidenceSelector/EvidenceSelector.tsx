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
  eliminatedEvidence: EvidenceKey[]
  isInEliminateMode: boolean
}

export default function EvidenceSelector({
  selectedEvidence,
  onEvidenceToggle,
  possibleLeftoverEvidence,
  eliminatedEvidence,
  isInEliminateMode,
}: EvidenceSelectorProps) {
  return (
    <div className="mb-2">
      {allEvidenceKeys.map((evidenceKey) => (
        <EvidenceButton
          key={evidenceKey}
          imgSrc={evidenceImage[evidenceKey]}
          label={evidence[evidenceKey]}
          onClick={onEvidenceToggle}
          isEliminated={eliminatedEvidence.includes(evidenceKey)}
          value={evidenceKey}
          disabled={
            (!selectedEvidence.includes(evidenceKey) &&
              !possibleLeftoverEvidence.includes(evidenceKey) &&
              !isInEliminateMode) ||
            (isInEliminateMode &&
              (selectedEvidence.includes(evidenceKey) ||
                ![...possibleLeftoverEvidence, ...eliminatedEvidence].includes(
                  evidenceKey
                )))
          }
          isSelected={selectedEvidence.includes(evidenceKey)}
        />
      ))}
    </div>
  )
}
