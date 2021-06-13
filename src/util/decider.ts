import { difference, without } from 'lodash'
import { EvidenceKey, GhostKeys, ghostEvidence } from './ghosts'

export function narrowDecision(
  ghostKeys: GhostKeys[],
  evidence: EvidenceKey[],
  eliminatedEvidence: EvidenceKey[] = []
) {
  const possibleGhosts: Set<GhostKeys> = new Set()
  const possibleLeftoverEvidence: Set<EvidenceKey> = new Set()
  for (const key of ghostKeys) {
    if (
      eliminatedEvidence.length &&
      ghostEvidence[key].some((e) => eliminatedEvidence.includes(e))
    ) {
      continue
    }
    if (difference(evidence, ghostEvidence[key]).length === 0) {
      possibleGhosts.add(key)
      for (const leftoverEvidence of difference(
        eliminatedEvidence.length
          ? without(ghostEvidence[key], ...eliminatedEvidence)
          : ghostEvidence[key],
        evidence
      )) {
        possibleLeftoverEvidence.add(leftoverEvidence)
      }
    }
  }
  return {
    possibleGhosts,
    possibleLeftoverEvidence,
  }
}
