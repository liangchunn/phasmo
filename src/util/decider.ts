import { difference } from 'lodash'
import { allGhostsKeys, EvidenceKey, GhostKeys, ghostEvidence } from './ghosts'

export function narrowDecision(evidence: EvidenceKey[]) {
  const possibleGhosts: Set<GhostKeys> = new Set()
  const possibleLeftoverEvidence: Set<EvidenceKey> = new Set()
  for (const key of allGhostsKeys) {
    if (difference(evidence, ghostEvidence[key]).length === 0) {
      possibleGhosts.add(key)
      for (const leftoverEvidence of difference(ghostEvidence[key], evidence)) {
        possibleLeftoverEvidence.add(leftoverEvidence)
      }
    }
  }
  return {
    possibleGhosts,
    possibleLeftoverEvidence,
  }
}
