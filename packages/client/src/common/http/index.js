import axios from "axios";
import { LOCALHOST } from "../enviornments";

const getBaseUrl = (url) => `${LOCALHOST.development}${url}`;

export default {
    getAction: (url) => axios.get(getBaseUrl(url)).catch((err) => {}),
    postAction: (url, payload, headers = {}) =>
        axios.post(getBaseUrl(url), payload, headers).catch((err) => {}),
};
