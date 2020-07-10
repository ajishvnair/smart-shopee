import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import AppRoute from "./common/route/AppRoute";
import Header from "./components/template/header";
import Login from "./components/authentication/login";

import "./App.css";
import "./App.scss";
import "antd/dist/antd.css";
import "./styles/index.scss";

function App() {
    const [authenticated, setAuthenticated] = useState(false);

    return (
        <div>
            {authenticated ? (
                <>
                    <Header />
                    <AppRoute />
                </>
            ) : (
                <div className="App">
                    <div className="login">
                        <div className="container">
                            <Login setAuthenticated={setAuthenticated} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default withRouter(App);
