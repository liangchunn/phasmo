import { useCallback, useMemo, useState } from 'react'
import {
  Box,
  Button,
  Spacer,
  Stack,
  Text,
  Flex,
  Grid,
  Divider,
  Heading,
} from '@chakra-ui/react'
import { narrowDecision } from './util/decider'
import { allGhostsKeys, EvidenceKey, ghosts } from './util/ghosts'
import { setToArray } from './util/setToArray'
import EvidenceSelector from './components/EvidenceSelector'
import HintPane from './components/HintPane'
import GhostDescription from './components/GhostDescription'
import Options from './components/Options'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { useLocalStorage } from './hooks/useLocalStorage'
import { FeatureToggleKey, FEATURE_TOGGLE } from './util/features'
import { without } from './util/array'
import { getIndefiniteArticle } from './util/grammar'

export default function App() {
  const [options, setOptions] = useLocalStorage<
    Record<FeatureToggleKey, boolean>
  >('options', FEATURE_TOGGLE)

  const [toggledEvidence, setEvidence] = useState<EvidenceKey[]>([])
  const [isInEliminateMode, setIsInEliminateMode] = useState(false)
  const [eliminatedEvidence, setEliminatedEvidence] = useState<EvidenceKey[]>(
    []
  )
  const [ghostKeys] = useState(allGhostsKeys)

  // FEATURE: disabled due to no effects neededd
  // const effectMap: Record<FeatureToggleKey, (val: boolean) => void> = useMemo(
  //   () => ({}),
  //   []
  // )

  // useEffect(() => {
  //   ;(Object.keys(options) as FeatureToggleKey[]).forEach((key) => {
  //     effectMap[key](options[key])
  //   })
  // }, [options, effectMap])

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
    const result = narrowDecision(
      ghostKeys,
      toggledEvidence,
      eliminatedEvidence
    )
    return {
      possibleLeftoverEvidence: setToArray(result.possibleLeftoverEvidence),
      possibleGhosts: setToArray(result.possibleGhosts),
    }
  }, [toggledEvidence, eliminatedEvidence, ghostKeys])

  const hasEvidence = useMemo(() => !!toggledEvidence.length, [toggledEvidence])

  const handleReset = useCallback(() => {
    setEvidence([])
    setIsInEliminateMode(false)
    setEliminatedEvidence([])
  }, [])

  return (
    <Grid gap={4}>
      <Box>
        <Flex align="center">
          <Heading size="md">
            👻🔎 <span className="version">v0.3.0</span>
          </Heading>
          <Spacer />
          <Stack spacing={2} direction="row" align="center">
            <ColorModeSwitcher />
            <Options options={options} setOptions={setOptions} />
            <Button onClick={handleReset} colorScheme="red">
              Reset
            </Button>
          </Stack>
        </Flex>
      </Box>
      <Grid gap={2}>
        <Flex align="center">
          <Heading size="md">Select Evidence</Heading>
          <Spacer />
          <Button
            onClick={handleEliminateToggle}
            variant={isInEliminateMode ? 'solid' : 'outline'}
            colorScheme={isInEliminateMode ? 'blue' : 'black'}
            size="sm"
          >
            {isInEliminateMode ? 'Eliminate Mode On' : 'Eliminate Mode Off'}
          </Button>
        </Flex>
        <Box>
          <EvidenceSelector
            onEvidenceToggle={handleEvidenceToggle}
            selectedEvidence={toggledEvidence}
            eliminatedEvidence={eliminatedEvidence}
            isInEliminateMode={isInEliminateMode}
            possibleLeftoverEvidence={possibleLeftoverEvidence}
          />
        </Box>
        <Box>
          {!hasEvidence && !isInEliminateMode && (
            <Text color="gray.500" size="md">
              Select existing evidence to narrow down remaining evidence
            </Text>
          )}
          {isInEliminateMode && (
            <Text color="gray.500" size="md">
              Eliminate evidence which are ruled-out by toggling
            </Text>
          )}
        </Box>
      </Grid>
      {hasEvidence && <Divider />}
      {hasEvidence && possibleGhosts.length !== 1 && (
        <HintPane
          possibleGhosts={possibleGhosts}
          possibleLeftoverEvidence={possibleLeftoverEvidence}
        />
      )}
      {possibleGhosts.length === 1 && (
        <Grid gap={2}>
          <Box>
            <Heading size="md">
              The ghost is {getIndefiniteArticle(ghosts[possibleGhosts[0]])}{' '}
              <span
                style={{ fontStyle: 'italic', textDecoration: 'underline' }}
              >
                {ghosts[possibleGhosts[0]]}
              </span>
            </Heading>
          </Box>
          <Box>
            <GhostDescription ghostKey={possibleGhosts[0]} />
          </Box>
        </Grid>
      )}
    </Grid>
  )
}
