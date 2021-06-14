const Login =  () => {
    return (
        <div>
            <h1>SMART Health Card</h1>
            <a href={`/launch?iss=${process.env.REACT_APP_FHIR_URI}&aud=`}>Login</a>            
        </div>
    )
};

export default Login;
