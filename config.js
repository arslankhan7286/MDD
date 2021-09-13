const config = {
    userAgent: 'aws-amplify-cli/2.0',
    version: '1.0',
    auth: {
        plugins: {
            awsCognitoAuthPlugin: {
                IdentityManager: {
                    Default: {},
                },
                CredentialsProvider: {
                    CognitoIdentity: {
                        Default: {
                            PoolId: 'us-east-1:90bf6957-273b-4697-b478-f0afc88ebe5f',
                            Region: 'us-east-1',
                        },
                    },
                },
                CognitoUserPool: {
                    Default: {
                        PoolId: 'us-east-1_q3YmoFL0h',
                        AppClientId: '493lea0ein6jm4m2qcg87es1n6',
                        Region: 'us-east-1',
                    },
                },
                Auth: {
                    Default: {
                        authenticationFlowType: 'USER_SRP_AUTH',
                    },
                },
            },
        },
    },
    api: {
        plugins: {
            awsAPIPlugin: {
                mddMapsRest: {
                    endpointType: 'REST',
                    endpoint: 'https://mzsdcsryd8.execute-api.us-east-1.amazonaws.com',
                    region: 'us-east-1',
                    authorizationType: 'AMAZON_COGNITO_USER_POOLS',
                },
            },
        },
    },
};
export default config;
