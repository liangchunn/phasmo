import { Wrap, WrapItem } from '@chakra-ui/react'
import { DataType } from '../../util/data'
import { getEvidenceImage } from '../../util/images'
import EvidenceButton from './EvidenceButton'

type EvidenceSelectorProps = {
  data: DataType
  selectedEvidence: string[]
  onEvidenceToggle: (e: string) => void
  possibleLeftoverEvidence: string[]
  eliminatedEvidence: string[]
  isInEliminateMode: boolean
}

export default function EvidenceSelector({
  data,
  selectedEvidence,
  onEvidenceToggle,
  possibleLeftoverEvidence,
  eliminatedEvidence,
  isInEliminateMode,
}: EvidenceSelectorProps) {
  const { evidence } = data
  const allEvidenceKeys = Object.keys(evidence)

  return (
    <Wrap spacing={2}>
      {allEvidenceKeys.map((evidenceKey) => (
        <WrapItem key={evidenceKey}>
          <EvidenceButton
            imgSrc={getEvidenceImage(evidenceKey)}
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
                  ![
                    ...possibleLeftoverEvidence,
                    ...eliminatedEvidence,
                  ].includes(evidenceKey)))
            }
            isSelected={
              selectedEvidence.includes(evidenceKey) && !isInEliminateMode
            }
          />
        </WrapItem>
      ))}
    </Wrap>
  )
}
