import { useCallback, useEffect, useMemo, useState } from 'react'
import { narrowDecision } from './util/decider'
import { allGhostsKeys, EvidenceKey, ghosts } from './util/ghosts'
import { setToArray } from './util/setToArray'
import EvidenceSelector from './components/EvidenceSelector'
import { without } from 'lodash'
import HintPane from './components/HintPane'
import GhostDescription from './components/GhostDescription'
import Options from './components/Options'
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
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { useLocalStorage } from './hooks/useLocalStorage'
import { FeatureToggleKey } from './util/features'

export default function App() {
  const [options, setOptions] = useLocalStorage<
    Record<FeatureToggleKey, boolean>
  >('options', {
    ENABLE_BETA_HANTU_AND_YOKAI: false,
  })

  const [toggledEvidence, setEvidence] = useState<EvidenceKey[]>([])
  const [isInEliminateMode, setIsInEliminateMode] = useState(false)
  const [eliminatedEvidence, setEliminatedEvidence] = useState<EvidenceKey[]>(
    []
  )
  const [ghostKeys, setGhostKeys] = useState(allGhostsKeys)

  const handleYokaiAndHantuToggle = useCallback(
    (enable: boolean) => {
      if (enable) {
        setGhostKeys(allGhostsKeys)
      } else {
        setGhostKeys(
          allGhostsKeys.filter((k) => k !== 'yokai' && k !== 'hantu')
        )
      }
    },
    [setGhostKeys]
  )

  const effectMap: Record<FeatureToggleKey, (val: boolean) => void> = useMemo(
    () => ({
      ENABLE_BETA_HANTU_AND_YOKAI: handleYokaiAndHantuToggle,
    }),
    [handleYokaiAndHantuToggle]
  )

  useEffect(() => {
    ;(Object.keys(options) as FeatureToggleKey[]).forEach((key) => {
      effectMap[key](options[key])
    })
  }, [options, effectMap])

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
          <Heading size="md">👻🔎</Heading>
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
              The ghost is a{' '}
              <span style={{ fontStyle: 'italic' }}>
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
