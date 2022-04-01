import { ChakraProvider } from '@chakra-ui/react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ReconmapTheme from 'theme/index';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './styles/main.scss';

TimeAgo.addDefaultLocale(en);

const rootContainer = document.getElementById('root');
const appRoot = ReactDOM.createRoot(rootContainer);
appRoot.render(<React.StrictMode>
    <ChakraProvider theme={ReconmapTheme}>
        <App />
    </ChakraProvider>
</React.StrictMode>);

serviceWorker.unregister();
