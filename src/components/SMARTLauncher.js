import { useEffect } from 'react';
import FHIR from 'fhirclient';

const SMARTLauncher = () => {
    
    useEffect(() => {
        FHIR.oauth2.authorize({
            clientId: process.env.REACT_APP_CLIENTID,
            scope: 'launch/patient online_access openid profile patient/Immunization.read patient/Patient.read',
            redirectUri: process.env.REACT_APP_REDIRECTURI
        })
    })
    
    return (
        <div>
            <h2>Loading...</h2>
        </div>
    )
}

export default SMARTLauncher;
