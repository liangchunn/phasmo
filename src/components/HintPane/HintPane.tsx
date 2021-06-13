import {
  Text,
  Box,
  Flex,
  Wrap,
  WrapItem,
  Grid,
  Heading,
  Image,
} from '@chakra-ui/react'
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
      <Grid gap={2}>
        <Box>
          <Heading align="left" size="md">
            Possible Remaining Evidence
          </Heading>
        </Box>
        <Box>
          <Wrap justify="center">
            {possibleLeftoverEvidence.map((key) => (
              <WrapItem key={key}>
                <Flex direction="column" align="center">
                  <Image
                    src={evidenceImage[key]}
                    alt={evidence[key]}
                    htmlWidth={48}
                    htmlHeight={48}
                    sx={{ imageRendering: 'pixelated' }}
                  />
                  <Text size="md">{evidence[key]}</Text>
                </Flex>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </Grid>
      <Grid gap={2}>
        <Box>
          <Heading align="left" size="md">
            Possible Ghosts
          </Heading>
        </Box>
        <Box>
          <Wrap justify="center">
            {possibleGhosts.map((key) => (
              <WrapItem key={key}>
                <GhostDescriptionPopup ghostKey={key} />
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </Grid>
    </>
  )
}
