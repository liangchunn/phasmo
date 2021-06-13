import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Image,
  HStack,
} from '@chakra-ui/react'
import { getGhostEvidenceImages, GhostKeys, ghosts } from '../../util/ghosts'
import GhostDescription from '../GhostDescription/GhostDescription'

type GhostDescriptionPopupProps = {
  ghostKey: GhostKeys
}

export default function GhostDescriptionPopup({
  ghostKey,
}: GhostDescriptionPopupProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button variant="outline" onClick={onOpen}>
        {ghosts[ghostKey]}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <Text>{ghosts[ghostKey]}</Text>
              {getGhostEvidenceImages(ghostKey).map(([evidence, src]) => (
                <Image
                  key={evidence}
                  src={src}
                  alt={`evidence ${evidence}`}
                  sx={{ imageRendering: 'pixelated' }}
                />
              ))}
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <GhostDescription ghostKey={ghostKey} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
