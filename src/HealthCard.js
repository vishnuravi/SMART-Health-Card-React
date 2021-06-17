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

    return (
        <Container className="mt-4">
            <Card>
                <Card.Body>
                    <Card.Title>COVID-19 Vaccination Record</Card.Title>
                    <Card.Text>
                        {
                            healthCard ?
                                <div>
                                    <p><strong>Issuer:</strong> {healthCard.iss}</p>
                                </div>
                                :
                                <div>
                                    <h2>Loading data...</h2>
                                </div>
                        }
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Home;