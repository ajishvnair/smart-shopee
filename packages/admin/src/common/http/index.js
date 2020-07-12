import axios from "axios";
import { API_URL } from "../../environments/Environments";
// import { storeAuthenticate } from './../authentication/storeAuthentication';

const getBaseUrl = (url) => API_URL + url;

export const httpProvider = {
    postAction: (url, payload) =>
        axios.post(getBaseUrl(url), payload).catch((err) => {}),
};

export const protectedHttpProvider = {
    postAction: (url, payload, header) =>
        axios.post(getBaseUrl(url), payload, header).catch((err) => {}),
};
