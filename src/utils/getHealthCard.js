import axios from 'axios';

// uses an instance of fhirclient to get a health card from a FHIR API
async function getHealthCard(client) {
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
    try {
        const response = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_FHIR_URI}/Patient/${client.patient.id}/$health-cards-issue`,
            data: parameters,
            headers: {
                'Authorization': client.getAuthorizationHeader()
            }
        });
        const verifiableCredential = response.data.parameter.filter(parameter => parameter.name === "verifiableCredential")[0].valueString;
        return verifiableCredential;
    } catch (error) {
        console.log(error);
    }

};

export default getHealthCard;
