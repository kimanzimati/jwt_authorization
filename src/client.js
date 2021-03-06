var client =  {
    "id": "test-2ea37e78-3102-4547-9299-c53ded95da18",
    "name": "Virtual Pay International Test",
    "secrets": [
        {
            "id": "2c8b1a40-2429-4971-886b-cb93d32be3aa",
            "expiry": "2024-03-07T08:37:44.000Z"
        }
    ],
    "environment": "test",
    "url": "https://localhost:3000/return",
    "allowedScopes": [
        "openid",
        "openid",
        "accounts",
        "balances",
        "transactions",
        "accountholders",
        "client_imageupload",
        "client_paymentrequest",
        "paymentinitiationrequest",
        "client_paymentauthorizationrequest"
    ],
    "redirectUrls": [
        "https://uat.evirtualpay.com/stitch/",
        "http://localhost:8080/return",
        "https://localhost:8080/return",
        "https://localhost:8000/return",
        "http://localhost:3000/return"
    ],
    "userInteractionRedirectUrls": [
        "https://localhost:3000/return",
        "http://localhost:3000/return",
        "https://localhost:8080/return",
        "http://localhost:8080/return",
        "https://uat.evirtualpay.com/stitch/"
    ],
    "countryCodes": [
        "ZA"
    ],
    "absoluteRefreshTokenLifetime": 1,
    "accessTokenLifetime": 3600,
    "allowedGrantTypes": [
        "authorization_code",
        "client_credentials"
    ],
    "authorizationCodeLifetime": 300,
    "identityTokenLifetime": 300,
    "refreshTokenUsage": 1,
    "slidingRefreshTokenLifetime": 5184000
}