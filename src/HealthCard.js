import { useEffect, useState } from 'react';
import FHIR from 'fhirclient';
import { Container, Card, ListGroup } from 'react-bootstrap';
import verifyAndDecodeHealthCard from './utils/verifyAndDecode';
import getHealthCard from './utils/getHealthCard';

const Home = () => {
    const [healthCard, setHealthCard] = useState();

    // fetch health card when FHIR client is ready
    useEffect(() => {
        FHIR.oauth2.ready().then(async (client) => {
            const newCard = await getHealthCard(client);
            const decodedCard = await verifyAndDecodeHealthCard(newCard);
            setHealthCard(decodedCard);
        });
    }, []);

    // get the patient's name from the card
    const extractName = (healthCard) => {
        const name = healthCard.vc.credentialSubject.fhirBundle.entry[0].resource.name[0];
        return name.given.join(" ") + " " + name.family;
    };

    // get an array of doses from the card
    const extractDoses = (healthCard) => {
        return healthCard.vc.credentialSubject.fhirBundle.entry.slice(1);
    };

    return (
        <Container className="mt-4">
            <Card className="shadow">
                <Card.Body>
                    <Card.Title><h2>COVID-19 Vaccination Record</h2></Card.Title>
                    <Card.Text>
                        {
                            healthCard ?
                                <div>
                                    <ListGroup>
                                    <ListGroup.Item><strong>Issuer:</strong> {healthCard.iss}</ListGroup.Item>
                                    <ListGroup.Item><strong>Patient Name:</strong> {extractName(healthCard)}</ListGroup.Item>
                                    <ListGroup.Item><p><strong>Doses Received:</strong></p>
                                    {
                                        extractDoses(healthCard).map((dose) => {
                                            return (
                                            <p>
                                                <i>Date</i>: {dose.resource.occurrenceDateTime} <br />
                                                <i>CVX Code</i>: {dose.resource.vaccineCode.coding[0].code} <br />
                                                <i>Location:</i> {dose.resource.performer[0].actor.display}
                                            </p>
                                            );
                                        })
                                    }
                                    </ListGroup.Item>
                                    </ListGroup>
                                </div>
                                :
                                <div>
                                    <h5>Loading data...</h5>
                                </div>
                        }
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Home;