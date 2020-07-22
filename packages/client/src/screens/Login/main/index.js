import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Image,
    BackHandler,
    AsyncStorage,
} from "react-native";
import http from "../../../common/http";

import HomeScreen from "../home";
import OtpScreen from "../otp";
import RegisterScreen from "../register";
import SignInScreen from "../sign-in";

export default function ({ setAuthenticated }) {
    const [status, setStatus] = useState("");
    const [mobileNo, setMobileNo] = useState("");

    const authenticateUser = async () => {
        const token = await AsyncStorage.getItem("accessToken");
        const headers = {
            Authorization: token,
        };
        http.postAction("api/v1/user/auth", {}, { headers })
            .then((res) => {
                //setAuthenticated(true);
            })
            .catch((err) => {
                setStatus("home");
            });
    };

    useEffect(() => {
        authenticateUser();
    }, []);

    const backAction = () => {
        BackHandler.exitApp();
        return true;
    };

    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );

    const getContent = () => {
        switch (status) {
            case "home":
                return <HomeScreen setStatus={setStatus} />;
            case "otp":
                return (
                    <OtpScreen
                        setStatus={setStatus}
                        mobileNo={mobileNo}
                        setMobileNo={setMobileNo}
                    />
                );
            case "register":
                return (
                    <RegisterScreen
                        setStatus={setStatus}
                        mobileNo={mobileNo}
                        setAuthenticated={setAuthenticated}
                    />
                );
            case "signIn":
                return (
                    <SignInScreen
                        setStatus={setStatus}
                        setAuthenticated={setAuthenticated}
                    />
                );
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
