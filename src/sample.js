function base64UrlEncode(byteArray) {
  const charCodes = String.fromCharCode(...byteArray);
  return window.btoa(charCodes)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
}
async function sha256(verifier) {
  const msgBuffer = new TextEncoder('utf-8').encode(verifier);
  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  return new Uint8Array(hashBuffer);
}
async function generateVerifierChallengePair() {
const randomBytes = crypto.getRandomValues(new Uint8Array(32));
const verifier = base64UrlEncode(randomBytes);
console.log('Verifier:', verifier);
const challenge = await sha256(verifier).then(base64UrlEncode);
console.log('Challenge:', challenge)
buildAuthorizationUrl(client.id, challenge, client.redirectUrls[0], state, nonce, client.allowedScopes[0])
return [verifier, challenge];
}
generateVerifierChallengePair();


function base64UrlEncode(byteArray) {
  const charCodes = String.fromCharCode(...byteArray);
  return window.btoa(charCodes)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
}
function generateRandomStateOrNonce() {
const randomBytes = crypto.getRandomValues(new Uint8Array(32));
return base64UrlEncode(randomBytes);
}
const state = generateRandomStateOrNonce();
console.log('State:', state);
const nonce = generateRandomStateOrNonce();
console.log('Nonce:', nonce);

function buildAuthorizationUrl(clientId, challenge, redirectUri, state, nonce, scopes) {
const search = {
      client_id: clientId,
      code_challenge: challenge,
      code_challenge_method: 'S256',
      redirect_uri: redirectUri,
      scope: scopes.join(' '),
      response_type: 'code',
      nonce: nonce,
      state: state
};
const searchString = Object.entries(search).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&');
console.log('searchString:', searchString);
return `https://secure.stitch.money/connect/authorize?${searchString}`;
}

