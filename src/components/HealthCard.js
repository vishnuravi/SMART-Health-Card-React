import { useEffect, useState } from 'react';
import axios from 'axios';
import FHIR from 'fhirclient';

const Home = () => {
    const [healthCard, setHealthCard] = useState();

    const getHealthCard = (client) => {

        // define the type of health card to retrieve (in this case we will retrieve a COVID-19 vaccine card)
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
            setHealthCard(verifiableCredential);
        }).catch((error) => {
            console.log(error);
        });

    }

    useEffect(() => {
        FHIR.oauth2.ready().then((client) => {
            getHealthCard(client);
        });
    }, []);


    return (
        <div>
            <h1>SMART Health Card - JWS</h1>
            <p>{healthCard}</p>
        </div>
    )
}

export default Home;