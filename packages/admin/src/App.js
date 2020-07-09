import React from "react";
import { withRouter } from "react-router-dom";
import AppRoute from "./common/route/AppRoute";
import Header from "./components/template/header";

import "./App.css";
import "antd/dist/antd.css";
import "./styles/index.scss";

function App() {
  return (
    <div>
      <Header />
      <AppRoute />
    </div>
  );
}

export default withRouter(App);
