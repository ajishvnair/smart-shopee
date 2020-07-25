import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Image,
    BackHandler,
    AsyncStorage,
    ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import { setUser } from "../../../state/actions/user";
import http from "../../../common/http";
import HomeScreen from "../home";
import OtpScreen from "../otp";
import RegisterScreen from "../register";
import SignInScreen from "../sign-in";

export default function ({ setAuthenticated }) {
    const dispatch = useDispatch();

    const [status, setStatus] = useState("");
    const [mobileNo, setMobileNo] = useState("");

    const authenticateUser = async () => {
        const token = await AsyncStorage.getItem("accessToken");
        const headers = {
            Authorization: token,
        };
        http.postAction("api/v1/user/auth", {}, { headers })
            .then((res) => {
                if (res.status !== 400) {
                    const { user } = res.data;
                    dispatch(setUser(user));
                    // setAuthenticated(true);
                    setStatus("home");
                } else {
                    setStatus("home");
                }
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
            {status === "" && (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
    },
});
