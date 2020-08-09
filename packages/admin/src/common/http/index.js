import axios from "axios";
import { API_URL } from "../../environments/Environments";
import { storageEngine } from "../helper/commonMethods";

const getBaseUrl = (url) => API_URL + url;

const getHeader = () => {
    const token = storageEngine.get("accessToken");
    const headers = {
        Authorization: token,
    };
    return { headers };
};

export const httpProvider = {
    postAction: (url, payload) =>
        axios.post(getBaseUrl(url), payload).catch((err) => {}),
    getAction: (url) => axios.get(getBaseUrl(url)).catch((err) => {}),
};

export const protectedHttpProvider = {
    postAction: (url, payload) =>
        axios.post(getBaseUrl(url), payload, getHeader()).catch((err) => {}),
    getAction: (url, payload) =>
        axios.post(getBaseUrl(url), payload, getHeader()).catch((err) => {}),
};
