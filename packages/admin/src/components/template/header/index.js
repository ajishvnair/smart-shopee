import React from "react";
import { Menu } from "antd";
import { withRouter } from "react-router-dom";
import "./menu-styles.scss";

export default withRouter(function (props) {
  const { history } = props;
  return (
    <>
      <Menu
        className="ufe-menu"
        theme="white"
        selectedKeys={["1"]}
        mode="horizontal"
      >
        <Menu.Item key="1" onClick={() => history.push("/")}>
          Orders
        </Menu.Item>
        <Menu.Item key="2" onClick={() => history.push("/category")}>
          Category
        </Menu.Item>
        <Menu.Item key="3" onClick={() => history.push("/location")}>
          Location
        </Menu.Item>
      </Menu>
    </>
  );
});
