import { errorToast } from 'components/ui/toast';
import Configuration from '../Configuration';
import Auth from "./auth";

function resetSessionStorageAndRedirect() {
    Auth.removeSession();

    window.location = Configuration.getContextPath();
}

function secureApiFetch(url, init) {
    if ('undefined' === typeof (init)) {
        init = {};
    }
    const user = Auth.getLoggedInUser();

    const headers = user && user.access_token !== null ? { Authorization: 'Bearer ' + user.access_token } : {};
    const initWithAuth = init;
    if (initWithAuth.hasOwnProperty('headers')) {
        Object.assign(initWithAuth.headers, headers);
    } else {
        initWithAuth.headers = headers;
    }
    init.credentials = 'include';

    return fetch(Configuration.getDefaultApiUrl() + url, init)
        .then(resp => {
            if (resp.status === 401) {
                resetSessionStorageAndRedirect();
            }

            return resp;
        })
        .catch(err => {
            if (err.message.toLowerCase().indexOf('network') !== -1) {
                console.error(err.message);
                errorToast('Network error. Please check connectivity with the API.');
            }
            return Promise.reject(err);
        });
}

const downloadFromApi = url => {
    secureApiFetch(url, { method: 'GET' })
        .then(resp => {
            const contentDispositionHeader = resp.headers.get('Content-Disposition');
            const filenameRe = new RegExp(/filename="(.*)";/)
            const filename = filenameRe.exec(contentDispositionHeader)[1]
            return Promise.all([resp.blob(), filename]);
        })
        .then(values => {
            const blob = values[0];
            const filename = values[1];
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
        })
}

export { downloadFromApi };

export default secureApiFetch
