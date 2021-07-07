# SMART Health Cards React App

This is a SMART-on-FHIR application built with [React](https://reactjs.org/) that allows a user to log in with Patient Portal credentials and obtain a vaccination record in the form of a SMART Health Card from an electronic health record system's FHIR API. The application was built and tested with the [Cerner Millenium FHIR](https://fhir.cerner.com/) sandbox. It may be used as a template to build apps for verifying and decoding SMART Health Card vaccination records.

## Development Instructions

The following instructions are for developing with the Cerner development environment. However, you can use any FHIR API that supports the $health-cards-issue operation. 

You will first need to create an account and register a new SMART-on-FHIR app at https://code.cerner.com. You will need to enter the following options for the app configuration:

- SMART Launch URI: `http://localhost:3000/launch`
- Redirect URI: `http://localhost:3000/app`
- App Type: `Patient`
- Client Type: `Public`
- FHIR Spec: `r4`
- Authorized: `Yes`
- Scopes: Under *Patient Scopes*, choose `Patient` and `Immunization`.

Upon registering an app with the settings above you will be provided with a **Client Id** and FHIR API URL (see **FHIR Spec**). Copy the `.env.sample` file in the project directory to create a new `.env` file and set the environment variables in the file to these values. 

Then, in the project directory:

1. Install dependencies by running `npm install`.
2. Start the application in development mode by running `npm start`. 
3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
4. Login with the username and password of a Cerner sample patient.
