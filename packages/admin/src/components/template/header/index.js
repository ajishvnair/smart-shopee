import React, { useCallback } from "react";
import { Menu } from "antd";
import { withRouter } from "react-router-dom";
import "./menu-styles.scss";

export default withRouter(function (props) {
  const { history, location } = props;
  const getSelectedMenu = useCallback((pathName) => {
    const paths = pathName.split("/");
    const path = paths.filter((a) => a !== "").length
      ? paths.filter((a) => a !== "")[0]
      : null;
    switch (path) {
      case "orders":
        return ["1"];
      case "category":
        return ["2"];
      case "location":
        return ["3"];
      default:
        return ["1"];
    }
  }, []);
  return (
    <>
      <Menu
        className="menu"
        theme="white"
        selectedKeys={getSelectedMenu(location.pathname)}
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
