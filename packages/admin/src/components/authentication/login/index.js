import React, { useState } from "react";
import { Form, Input, Button, Alert, notification } from "antd";
import { storageEngine } from "../../../common/helper/commonMethods";
import { httpProvider } from "../../../common/http";
import axios from "axios";
import LoginImage from "../../../images/login.svg";
import "./login.scss";

export default function ({ setAuthenticated }) {
    const [showAlert, setShowAlert] = useState(false);
    const [buttonLoader, setButtonLoader] = useState(false);
    const checkLogin = (value) => {
        setButtonLoader(true);
        setShowAlert(false);
        httpProvider
            .postAction("api/v1/admin/login", {
                ...value,
            })
            .then((res) => {
                if (res.status !== 200) {
                    setShowAlert(true);
                    setButtonLoader(false);
                } else {
                    const { accessToken } = res.data;
                    storageEngine.set("accessToken", accessToken);
                    setButtonLoader(false);
                    setAuthenticated(true);
                    setShowAlert(false);
                }
            })
            .catch((err) => {
                setButtonLoader(false);
                setShowAlert(true);
            });
        // if (
        //     value.username === "ajishvnair55@gmail.com" &&
        //     value.password === "aaa"
        // ) {
        //     setAuthenticated(true);
        //     setShowAlert(false);
        // } else {
        //     setShowAlert(true);
        // }
    };
    return (
        <div className="base-container">
            <div className="header">Login</div>
            <Form onFinish={checkLogin}>
                <div className="content">
                    <div className="image">
                        <img src={LoginImage} />
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: "Username is required",
                                    },
                                ]}
                                noStyle
                            >
                                <Input placeholder="Username" />
                            </Form.Item>
                        </div>
                        <div className="form-group">
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Password is required",
                                    },
                                ]}
                                noStyle
                            >
                                <Input type="password" placeholder="Password" />
                            </Form.Item>
                        </div>
                    </div>
                </div>
                {showAlert && (
                    <Alert type="error" message="Invalid credential" />
                )}
                <div className="footer">
                    <Button
                        loading={buttonLoader}
                        type="primary"
                        style={{ marginTop: "5px" }}
                        className="btn"
                        htmlType="submit"
                    >
                        Login
                    </Button>
                </div>
            </Form>
        </div>
    );
}
