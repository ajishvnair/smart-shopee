import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import Home from "../home";
import Otp from "../otp";
import Register from "../register";

export default function () {
    const [status, setStatus] = useState("home");

    const getContent = () => {
        switch (status) {
            case "home":
                return <Home setStatus={setStatus} />;
            case "otp":
                return <Otp setStatus={setStatus} />;
            case "register":
                return <Register setStatus={setStatus} />;
        }
    };
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "flex-end",
            }}
        >
            <View style={{ ...StyleSheet.absoluteFill }}>
                <Image
                    source={require("../../../../assets/bg.jpg")}
                    style={{
                        flex: 1,
                        height: null,
                        width: null,
                    }}
                />
            </View>
            {getContent()}
        </View>
    );
}
