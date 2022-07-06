window.env = {
    REACT_APP_SECURE_TRANSPORT_ENABLED: false,

    // Reconmap API's URL including protocol and port but not trailing slash
    REACT_APP_DEFAULT_API_URL: 'http://localhost:5510',

    // hostname:port for the Reconmap's notifications service
    REACT_APP_NOTIFICATIONS_SERVICE_HOST_PORT: 'localhost:5520',

    // hostname:port for the Reconmap's agent service
    REACT_APP_AGENT_SERVICE_HOST_PORT: 'localhost:5520',

    REACT_APP_LOGO_URL: 'logo-name.png',

    // Web application context path e.g. / (for http://localhost:5500) or /reconmap (for http://localhost:5500/reconmap)
    // REACT_APP_CONTEXT_PATH: '/reconmap'

    REACT_APP_KEYCLOAK_CONFIG: {
        url: 'http://localhost:8080',
        realm: 'reconmap',
        clientId: 'web-client'
    }
};
