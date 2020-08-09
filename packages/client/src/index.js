import React, { useState, useEffect } from "react";
// import { AsyncStorage } from "react-native";
import http from "./common/http";
import AppContainer from "./navigations/AppNavigation";
import Login from "./screens/Login/LoginScreen";

import { Provider } from "react-redux";
import { store } from "./state/store";
import { useDispatch } from "react-redux";
import { setLocations } from "./state/actions/locations";
// import "antd-mobile/dist/antd-mobile.css";

import firebase from "firebase";
import { firebaseConfig } from "../config";
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default function App() {
    const [authenticated, setAuthenticated] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        // to get location
        http.getAction("api/v1/location/all/active")
            .then(async (res) => {
                if (res.status !== 400) {
                    const { locations } = res.data;
                    dispatch(setLocations(locations));
                }
            })
            .catch((err) => {
                console.log("error");
            });
    }, [dispatch]);
    return (
        <Provider store={store}>
            <>
                {authenticated ? (
                    <AppContainer setAuthenticated={setAuthenticated} />
                ) : (
                    <Login setAuthenticated={setAuthenticated} />
                )}
            </>
        </Provider>
    );
}
