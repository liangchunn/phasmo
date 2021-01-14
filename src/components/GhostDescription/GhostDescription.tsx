import { Card, CardDeck } from 'react-bootstrap'
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
    <>
      <Card.Text className="mb-2">{ghostDescription[ghostKey]}</Card.Text>
      <CardDeck>
        <Card border="danger">
          <Card.Header className="d-flex align-items-center">
            <img
              src={StrengthImage}
              className="pixelated mr-2"
              alt="Strength"
            />
            Strengths
          </Card.Header>
          <Card.Body>{ghostStrengths[ghostKey]}</Card.Body>
        </Card>
        <Card border="success">
          <Card.Header className="d-flex align-items-center">
            <img
              src={WeaknessImage}
              className="pixelated mr-2"
              alt="Strength"
            />
            Weaknesses
          </Card.Header>
          <Card.Body>{ghostWeaknesses[ghostKey]}</Card.Body>
        </Card>
      </CardDeck>
    </>
  )
}
