import { KeycloakConfig } from "keycloak-js";

const Configuration = {

    isSecureTransportEnabled: (): string => window.env.REACT_APP_SECURE_TRANSPORT_ENABLED,

    getDefaultApiUrl: (): string => window.env.REACT_APP_DEFAULT_API_URL,

    getNotificationsServiceHostPort: (): string => window.env.REACT_APP_NOTIFICATIONS_SERVICE_HOST_PORT,

    getAgentServiceHostPort: (): number => window.env.REACT_APP_AGENT_SERVICE_HOST_PORT,

    getContextPath: (): string => window.env.REACT_APP_CONTEXT_PATH || '/',

    getLogoUrl: (): string => window.env.REACT_APP_LOGO_URL || '/logo-name.png',

    getKeycloakConfig: (): KeycloakConfig => window.env.REACT_APP_KEYCLOAK_CONFIG || {
        url: 'http://localhost:8080',
        realm: 'reconmap',
        clientId: 'web-client'
    }
};

export default Configuration;
