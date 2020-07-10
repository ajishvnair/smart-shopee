import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import LoginImage from "../../../images/login.svg";
import "./login.scss";

export default function ({ setAuthenticated }) {
    const [showAlert, setShowAlert] = useState(false);
    const checkLogin = (value) => {
        if (
            value.username === "ajishvnair55@gmail.com" &&
            value.password === "aaa"
        ) {
            setAuthenticated(true);
            setShowAlert(false);
        } else {
            setShowAlert(true);
        }
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
