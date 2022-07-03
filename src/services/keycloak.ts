import Keycloak from "keycloak-js";

const keycloakConfig = {
    url: 'http://localhost:8080',
    realm: 'reconmap',
    clientId: 'web-client'
};

const keycloakInstance = new Keycloak(keycloakConfig);

const Login = (onAuthenticatedCallback: Function) => {

    keycloakInstance
        .init({
            onLoad: 'login-required'
        })
        .then((authenticated) => {
            if (authenticated)
                onAuthenticatedCallback();
        })
        .catch(err => {
            console.dir(err);
            console.log(`keycloak init exception: ${err}`);
        });
};

const Username = () => keycloakInstance.tokenParsed?.preferred_username;

const KeyCloakService = {
    CallLogin: Login,
    GetUsername: Username,
    Logout: keycloakInstance.logout,
    IsAuthenticated: keycloakInstance.authenticated,
    GetInstance: () => keycloakInstance,
    GetProfileUrl: () => keycloakInstance.createAccountUrl()
};

export default KeyCloakService;
