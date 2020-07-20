import React, { useState } from "react";
import AppContainer from "./src/navigations/AppNavigation";
import Login from "./src/screens/Login/LoginScreen";

// import "antd-mobile/dist/antd-mobile.css";

// import firebase from "firebase";
// import { firebaseConfig } from "./config";
// firebase.initializeApp(firebaseConfig);

export default function App() {
    const [authenticated, setAuthenticated] = useState(false);
    return authenticated ? (
        <AppContainer />
    ) : (
        <Login setAuthenticated={setAuthenticated} />
    );
}
