import { useEffect, useState } from 'react';
import axios from 'axios';
import FHIR from 'fhirclient';
import jose from 'node-jose';
import zlib from 'zlib';
import { Container } from 'react-bootstrap';

const Home = () => {
    const [healthCard, setHealthCard] = useState();

    const getHealthCard = (client) => {
        // define the type of health card to retrieve
        const parameters = {
            "resourceType": "Parameters",
            "parameter": [
                {
                    "name": "credentialType",
                    "valueUri": "https://smarthealth.cards#health-card"
                },
                {
                    "name": "credentialType",
                    "valueUri": "https://smarthealth.cards#immunization"
                },
                {
                    "name": "credentialType",
                    "valueUri": "https://smarthealth.cards#covid19"
                }
            ]
        };

        // request the card from the FHIR server
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_FHIR_URI}/Patient/${client.patient.id}/$health-cards-issue`,
            data: parameters,
            headers: {
                'Authorization': client.getAuthorizationHeader()
            }
        }).then((response) => {
            const verifiableCredential = response.data.parameter.filter(o => o.name === "verifiableCredential")[0].valueString;
            verifyAndDecodeHealthCard(verifiableCredential);
        }).catch((error) => {
            console.log(error);
        });

    }

    const verifyAndDecodeHealthCard = async (jws) => {
        try {
            // Get the public key from the server
            const result = await axios.get(`${process.env.REACT_APP_FHIR_URI}/.well-known/jwks.json`);

            // Verify the payload's signature and retrieve the payload
            const keyStore = await jose.JWK.asKeyStore(result.data.keys);
            const verifiedJWS = await jose.JWS.createVerify(keyStore).verify(jws);

            // Decompress the payload
            let decodedCard;
            zlib.inflateRaw(verifiedJWS.payload, (error, decompressedResult) => {
                if (error) {
                    console.log(error);
                } else {
                    decodedCard = decompressedResult.toString('utf8');
                    setHealthCard(decodedCard);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        FHIR.oauth2.ready().then((client) => {
            getHealthCard(client);
        });
    }, []);

    return (
        <Container className="text-center mt-2">
            <h1>SMART Health Card</h1>
            <br />
            <h3>Decoded JWS</h3>
            <p>{healthCard}</p>
        </Container>
    )
}

export default Home;