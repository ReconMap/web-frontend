import { ChakraProvider } from '@chakra-ui/react';
import { createStandaloneToast } from "@chakra-ui/toast";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import React from 'react';
import ReactDOM from 'react-dom/client';
import KeyCloakService from 'services/keycloak';
import ReconmapTheme from 'theme/index';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './styles/main.scss';

TimeAgo.addDefaultLocale(en);

const { ToastContainer } = createStandaloneToast();

const rootContainer = document.getElementById('root');
const appRoot = ReactDOM.createRoot(rootContainer);

const renderApp = () => {
    appRoot.render(<React.StrictMode>
        <ChakraProvider theme={ReconmapTheme}>
            <App />
            <ToastContainer />
        </ChakraProvider>
    </React.StrictMode>);
}

KeyCloakService.CallLogin(renderApp);

serviceWorker.unregister();
