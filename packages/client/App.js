import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import http from "./src/common/http";
import AppContainer from "./src/navigations/AppNavigation";
import Login from "./src/screens/Login/LoginScreen";

// import "antd-mobile/dist/antd-mobile.css";

import firebase from "firebase";
import { firebaseConfig } from "./config";
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default function App() {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        // to get location
        http.getAction("api/v1/location/all/active")
            .then(async (res) => {
                const { locations } = res.data;
                await AsyncStorage.setItem(
                    "locations",
                    JSON.stringify([...locations])
                );
            })
            .catch((err) => {
                console.log("error");
            });
    }, []);
    return authenticated ? (
        <AppContainer />
    ) : (
        <Login setAuthenticated={setAuthenticated} />
    );
}
