import axios from "axios";
import { LOCALHOST } from "../../environments/Environments";
import { storageEngine } from "../helper/commonMethods";

const getBaseUrl = (url) => url;

const getHeader = () => {
    const token = storageEngine.get("accessToken");

    const headers = {
        Authorization: token,
    };
    return { headers };
};

export const httpProvider = {
    postAction: (url, payload) =>
        axios.post(getBaseUrl(url), payload, getHeader()).catch((err) => {}),
    getAction: (url) =>
        axios.get(getBaseUrl(url), getHeader()).catch((err) => {}),
};

export const protectedHttpProvider = {
    postAction: (url, payload) =>
        axios.post(getBaseUrl(url), payload, getHeader()).catch((err) => {}),
    getAction: (url, payload) =>
        axios.post(getBaseUrl(url), payload, getHeader()).catch((err) => {}),
};
