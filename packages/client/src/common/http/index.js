import axios from "axios";

const LOCALHOST = 'http://192.168.43.122:3001/';

const getBaseUrl = (url) => `${LOCALHOST}${url}`;

export default {
    getAction: (url) => axios.get(getBaseUrl(url)).catch((err) => { }),
    postAction: (url, payload) =>
        axios.post(getBaseUrl(url), payload).catch((err) => { }),
}