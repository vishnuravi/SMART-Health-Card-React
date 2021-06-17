import { useEffect, useState } from 'react';
import FHIR from 'fhirclient';
import { Container, Card } from 'react-bootstrap';
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
            <Card>
                <Card.Body>
                    <Card.Title><h1>COVID-19 Vaccination Record</h1></Card.Title>
                    <Card.Text>
                        {
                            healthCard ?
                                <div>
                                    <p><strong>Issuer:</strong> {healthCard.iss}</p>
                                    <p><strong>Name:</strong> {extractName(healthCard)}</p>
                                    <p><strong>Doses:</strong></p>
                                    {
                                        extractDoses(healthCard).map((dose) => {
                                            return (
                                            <p>
                                                <i>Date</i>: {dose.resource.occurrenceDateTime} <br />
                                                <i>CVX</i>: {dose.resource.vaccineCode.coding[0].code} <br />
                                                <i>Location:</i> {dose.resource.performer[0].actor.display}
                                            </p>
                                            );
                                        })
                                    }
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