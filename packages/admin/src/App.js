import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { storageEngine } from "./common/helper/commonMethods";
import { protectedHttpProvider } from "./common/http";
import AppRoute from "./common/route/AppRoute";
import Header from "./components/template/header";
import Login from "./components/authentication/login";

import "./App.css";
import "./App.scss";
import "antd/dist/antd.css";
import "./styles/index.scss";

function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const [authenticating, setAuthenticating] = useState(true);

    useEffect(() => {
        const token = storageEngine.get("accessToken");
        const headers = {
            Authorization: token,
        };
        if (token) {
            protectedHttpProvider
                .postAction("api/v1/admin/auth", {}, { headers })
                .then((res) => {
                    if (res.status !== 200) {
                        setAuthenticating(false);
                    } else {
                        setAuthenticated(true);
                    }
                })
                .catch((err) => {
                    setAuthenticating(false);
                });
        } else {
            setAuthenticating(false);
        }
    }, []);

    return (
        <div>
            {authenticated ? (
                <>
                    <Header />
                    <AppRoute />
                </>
            ) : (
                !authenticating && (
                    <div className="App">
                        <div className="login">
                            <div className="container">
                                <Login setAuthenticated={setAuthenticated} />
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default withRouter(App);
