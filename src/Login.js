import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const Login =  () => {
    return (
        <Container className="text-center mt-3">
            <h1>SMART Health Card</h1>
            <Button href={`/launch?iss=${process.env.REACT_APP_FHIR_URI}&aud=`} className="m-2">Login with Cerner</Button>            
        </Container>
    )
};

export default Login;
