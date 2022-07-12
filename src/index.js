'use strict';

/** 
 * This sample generates a short lived client JWT for use on Stitch SSO's token
 * endpoint. To run this sample, please run npm install, and then 
 * `npm run generate-jwt -- $CLIENT_ID $PATH_TO_PEM_CERT` where $CLIENT_ID is the 
 *  client id that was provided to you, and $PATH_TO_PEM_CERT is a path to the 
 *  cert that was provided to you in the confidential client
 */

const fs = require('fs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto"); // used for generating the cryptographically unique JWT id


// if (process.argv.length < 4) {
//   console.error('Expected command line argument to contain first your client id and then the path to your PEM certificate');
//   return;
// }

// Client id is the second to last argument 
const clientId = process.argv[process.argv.length - 2];
// Assume filename comes last
const filename = process.argv[process.argv.length - 1];
const file = "../src/certificate.pem";
console.log('Generating private_key_jwt for certificate ', file);

const pemCert = fs.readFileSync(filename).toString('utf-8');

function getKeyId(cert) {
  const lines = cert.split('\n').filter(x => x.includes('localKeyID:'))[0];
  const result = lines.replace('localKeyID:', '').replace(/\W/g, '');
  return result;
}

const issuer = clientId;
const subject = clientId;
const audience = 'https://secure.stitch.money/connect/token';
const keyid = getKeyId(pemCert);
const jwtid = crypto.randomBytes(16).toString("hex");

const options = {
  keyid,
  jwtid,
  notBefore: "0",
  issuer,
  subject,
  audience,
  expiresIn: "60m", // For this example this value is set to 5 minutes, but for machine usage should generally be a lot shorter 
  algorithm: "RS256"
};

const token = jwt.sign({}, pemCert, options);
console.log(`Token:\n${token}`);

//sample.js

// function base64UrlEncode(byteArray) {
//   const charCodes = String.fromCharCode(...byteArray);
//   return btoa(charCodes)
//     .replace(/\+/g, "-")
//     .replace(/\//g, "_")
//     .replace(/=/g, "");
// }
// async function sha256(verifier) {
//   const msgBuffer = new TextEncoder("utf-8").encode(verifier);
//   hash the message
//   const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
//   return new Uint8Array(hashBuffer);
// }
// async function generateVerifierChallengePair() {
//   const randomBytes = crypto.getRandomValues(new Uint8Array(32));
//   const verifier = base64UrlEncode(randomBytes);
//   console.log("Verifier:", verifier);
//   const challenge = await sha256(verifier).then(base64UrlEncode);
//   console.log("Challenge:", challenge);
//   console.log('data', myjson);
 
//   buildAuthorizationUrl(client.id, challenge, client.redirectUrls[0], state, nonce, client.allowedScopes[0])
//   retrieveTokenUsingAuthorizationCode(clientId, client.redirectUrls[0], verifier, code, token)
//   return [verifier, challenge];
// }
// generateVerifierChallengePair();



// function base64UrlEncode(byteArray) {
//   const charCodes = String.fromCharCode(...byteArray);
//   return btoa(charCodes)
//     .replace(/\+/g, "-")
//     .replace(/\//g, "_")
//     .replace(/=/g, "");
// }
// function generateRandomStateOrNonce() {
//   const randomBytes = crypto.getRandomValues(new Uint8Array(32));
//   return base64UrlEncode(randomBytes);
// }
// const state = generateRandomStateOrNonce();
// console.log("State:", state);
// const nonce = generateRandomStateOrNonce();
// console.log("Nonce:", nonce);

// srruuu
// function buildAuthorizationUrl(
//   clientId,
//   challenge,
//   redirectUri,
//   state,
//   nonce,
//   scopes
// ) {
//   {Object.keys(Data).map((item, i) => (console.log(item+": "+i)))}
//   const search = {
//     client_id: clientId,
//     code_challenge: challenge,
//     code_challenge_method: "S256",
//     redirect_uri: redirectUri,
//     scope: scopes,
//     response_type: "code",
//     nonce: nonce,
//     state: state,
//   };
//   const searchString = Object.entries(search)
//     .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
//     .join("&");
//   console.log("searchString:", searchString);
//   return window.open(
//     "https://secure.stitch.money/connect/authorize?" + searchString
//   );
// }



// async

// async function retrieveTokenUsingAuthorizationCode(clientId, redirectUri, verifier, code, clientAssertion) {
//   const body = {
//       grant_type: 'authorization_code',
//       client_id: clientId,
//       code: code,
//       redirect_uri: redirectUri,
//       code_verifier: verifier,
//       client_assertion: clientAssertion,
//       client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer'
//   }
//   const bodyString = Object.entries(body).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&');
//   const response = await fetch('https://secure.stitch.money/connect/token', {
//       method: 'post',
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       body: bodyString,
//   });
//   const responseBody = await response.json();
//   console.log('Tokens: ',  responseBody);
//   return responseBody;