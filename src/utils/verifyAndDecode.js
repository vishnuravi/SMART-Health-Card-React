import jose from 'node-jose';
import zlib from 'zlib';
import axios from 'axios';

async function verifyAndDecodeHealthCard(jws) {
    try {
        // Get the public key from the server
        const result = await axios.get(`${process.env.REACT_APP_FHIR_URI}/.well-known/jwks.json`);

        // Verify the payload's signature and retrieve the payload
        const keyStore = await jose.JWK.asKeyStore(result.data.keys);
        const verifiedJWS = await jose.JWS.createVerify(keyStore).verify(jws);

        // Decompress the payload
        const decompressedCard = zlib.inflateRawSync(verifiedJWS.payload);
        const card = JSON.parse(decompressedCard.toString());
        return card;
    } catch (error) {
        console.log(error);
    }
};

export default verifyAndDecodeHealthCard;