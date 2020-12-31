import React, { ChangeEvent, useMemo, useState } from 'react'
import { Button, Card, CardDeck, Form, InputGroup } from 'react-bootstrap'
import GhostDescription from './components/GhostDescription'
import { narrowDecision } from './util/decider'
import {
  allEvidenceKeys,
  evidence,
  EvidenceKey,
  ghosts,
  ghostStrengths,
  ghostWeaknesses,
  ghostDescription,
  evidenceImage,
} from './util/ghosts'
import { setToArray } from './util/setToArray'
import StrengthImage from './images/strength.png'
import WeaknessImage from './images/weakness.png'

const NONE_OPTION = 'none'
type NoneOption = typeof NONE_OPTION

function App() {
  const [evidenceOne, setEvidenceOne] = useState<EvidenceKey | NoneOption>(
    NONE_OPTION
  )
  const [evidenceTwo, setEvidenceTwo] = useState<EvidenceKey | NoneOption>(
    NONE_OPTION
  )
  const [evidenceThree, setEvidenceThree] = useState<EvidenceKey | NoneOption>(
    NONE_OPTION
  )

  const clearAll = () => {
    setEvidenceOne(NONE_OPTION)
    setEvidenceTwo(NONE_OPTION)
    setEvidenceThree(NONE_OPTION)
  }

  const clearOne = () => {
    setEvidenceOne(NONE_OPTION)
  }

  const clearTwo = () => {
    setEvidenceTwo(NONE_OPTION)
  }

  const clearThree = () => {
    setEvidenceThree(NONE_OPTION)
  }

  const providedEvidence = useMemo(
    () =>
      [evidenceOne, evidenceTwo, evidenceThree].filter(
        (e) => e !== 'none'
      ) as EvidenceKey[],
    [evidenceOne, evidenceTwo, evidenceThree]
  )

  const hasEvidence = useMemo(
    () =>
      !![evidenceOne, evidenceTwo, evidenceThree].filter((e) => e !== 'none')
        .length,

    [evidenceOne, evidenceTwo, evidenceThree]
  )

  const { possibleLeftoverEvidence, possibleGhosts } = narrowDecision(
    providedEvidence
  )

  const possibleLeftoverEvidenceArray = useMemo(
    () => setToArray(possibleLeftoverEvidence),
    [possibleLeftoverEvidence]
  )

  const possibleGhostsArray = useMemo(() => setToArray(possibleGhosts), [
    possibleGhosts,
  ])

  const onChangeOne = (e: ChangeEvent<HTMLSelectElement>) => {
    setEvidenceOne(e.target.value as EvidenceKey)
  }

  const onChangeTwo = (e: ChangeEvent<HTMLSelectElement>) => {
    setEvidenceTwo(e.target.value as EvidenceKey)
  }

  const onChangeThree = (e: ChangeEvent<HTMLSelectElement>) => {
    setEvidenceThree(e.target.value as EvidenceKey)
  }

  return (
    <Card>
      <Card.Header as="h5">Phasmophobia Ghost Identifier</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>Evidence 1</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <img
                    src={evidenceImage[evidenceOne]}
                    style={{ imageRendering: 'pixelated' }}
                    alt={evidenceOne}
                  />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                as="select"
                custom
                onChange={onChangeOne}
                value={evidenceOne}
              >
                <option value="none">None</option>
                {allEvidenceKeys.map((e) => (
                  <option
                    value={e}
                    disabled={!possibleLeftoverEvidenceArray.includes(e)}
                  >
                    {evidence[e]}
                  </option>
                ))}
              </Form.Control>
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={clearOne}>
                  Clear
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>Evidence 2</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <img
                    src={evidenceImage[evidenceTwo]}
                    style={{ imageRendering: 'pixelated' }}
                    alt={evidenceTwo}
                  />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                as="select"
                custom
                onChange={onChangeTwo}
                value={evidenceTwo}
              >
                <option value="none">None</option>
                {allEvidenceKeys.map((e) => (
                  <option
                    value={e}
                    disabled={!possibleLeftoverEvidenceArray.includes(e)}
                  >
                    {evidence[e]}
                  </option>
                ))}
              </Form.Control>
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={clearTwo}>
                  Clear
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>Evidence 3</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <img
                    src={evidenceImage[evidenceThree]}
                    style={{ imageRendering: 'pixelated' }}
                    alt={evidenceThree}
                  />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                as="select"
                custom
                onChange={onChangeThree}
                value={evidenceThree}
              >
                <option value="none">None</option>
                {allEvidenceKeys.map((e) => (
                  <option
                    value={e}
                    disabled={!possibleLeftoverEvidenceArray.includes(e)}
                  >
                    {evidence[e]}
                  </option>
                ))}
              </Form.Control>
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={clearThree}>
                  Clear
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Form>
        {!hasEvidence && (
          <Card.Subtitle className="mb-2 mt-2 text-muted">
            Add existing evidence to discover the possible remaining evidence.
          </Card.Subtitle>
        )}
        {hasEvidence && (
          <>
            {!!possibleLeftoverEvidenceArray.length && (
              <Card className="mb-2">
                <Card.Header>Possible leftover evidence</Card.Header>
                <Card.Body>
                  <div className="d-flex justify-content-center flex-wrap">
                    {possibleLeftoverEvidenceArray.map((key) => (
                      <div className="d-flex flex-column align-items-center mr-2">
                        <img
                          src={evidenceImage[key]}
                          alt={evidence[key]}
                          style={{ imageRendering: 'pixelated' }}
                          width={48}
                          height={48}
                        />
                        <p className="font-weight-bold">{evidence[key]}</p>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            )}
            {possibleGhostsArray.length > 1 && (
              <Card>
                <Card.Header>Possible ghosts</Card.Header>
                <Card.Body>
                  <div className="d-flex justify-content-center flex-wrap">
                    {possibleGhostsArray.map((key) => (
                      <GhostDescription ghostKey={key} />
                    ))}
                  </div>
                </Card.Body>
              </Card>
            )}
          </>
        )}
        {possibleGhostsArray.length === 1 && (
          <>
            <Card.Title>
              The ghost is a{' '}
              <span className="font-weight-bold">
                {ghosts[possibleGhostsArray[0]]}
              </span>
            </Card.Title>
            <Card.Text>{ghostDescription[possibleGhostsArray[0]]}</Card.Text>
            <CardDeck>
              <Card border="danger">
                <Card.Header className="d-flex align-items-center">
                  <img
                    src={StrengthImage}
                    className="mr-2"
                    style={{ imageRendering: 'pixelated' }}
                    alt="Strength"
                  />
                  Strengths
                </Card.Header>
                <Card.Body>{ghostStrengths[possibleGhostsArray[0]]}</Card.Body>
              </Card>
              <Card border="success">
                <Card.Header className="d-flex align-items-center">
                  <img
                    src={WeaknessImage}
                    className="mr-2"
                    style={{ imageRendering: 'pixelated' }}
                    alt="Strength"
                  />
                  Weaknesses
                </Card.Header>
                <Card.Body>{ghostWeaknesses[possibleGhostsArray[0]]}</Card.Body>
              </Card>
            </CardDeck>
          </>
        )}
      </Card.Body>
      <Card.Footer className="justify-content-end">
        <Button onClick={clearAll} variant="danger">
          Clear All
        </Button>
      </Card.Footer>
    </Card>
  )
}

export default App
