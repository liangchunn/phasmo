import { SimpleGrid, Box, Text, HStack, Image, Grid } from '@chakra-ui/react'
import StrengthImage from '../../images/strength.png'
import WeaknessImage from '../../images/weakness.png'
import {
  ghostDescription,
  GhostKeys,
  ghostStrengths,
  ghostWeaknesses,
} from '../../util/ghosts'

type GhostDescriptionProps = {
  ghostKey: GhostKeys
}

export default function GhostDescription({ ghostKey }: GhostDescriptionProps) {
  return (
    <Grid gap={4}>
      <Text>{ghostDescription[ghostKey]}</Text>
      <SimpleGrid columns={2} spacing={4}>
        <Box>
          <HStack>
            <Text fontWeight="bold">Strengths</Text>
            <Image
              src={StrengthImage}
              sx={{ imageRendering: 'pixelated' }}
              alt="Strength"
            />
          </HStack>
          <Text align="left">{ghostStrengths[ghostKey]}</Text>
        </Box>
        <Box>
          <HStack>
            <Text fontWeight="bold">Weaknesses</Text>
            <Image
              src={WeaknessImage}
              sx={{ imageRendering: 'pixelated' }}
              alt="Weaknesses"
            />
          </HStack>
          <Text align="left">{ghostWeaknesses[ghostKey]}</Text>
        </Box>
      </SimpleGrid>
    </Grid>
  )
}
