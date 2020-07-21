import React, { useState } from "react";
import { Input, Icon, Button } from "react-native-elements";
import { View, StyleSheet, BackHandler } from "react-native";

import OtpVerificationScreen from "./validate-otp";

export default function ({ setStatus }) {
    // for mobile number
    const [mobileNo, setMobileNo] = useState("");
    // for error message
    const [mobileNoError, setMobileNoError] = useState(null);
    // for generate otp button loading
    const [loading, setLoading] = useState(false);
    // for setting status
    const [screen, setScreen] = useState("inMobileVerification");
    // handling back action
    const backAction = () => {
        setStatus("home");
        return true;
    };

    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );

    const validateMobileNumber = () => {
        const phno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (mobileNo.match(phno)) {
            // alert("success");
            setLoading(true);
            setMobileNoError(null);
            setScreen("otpVerification");
        } else {
            setMobileNoError("Not a valid Phone number");
        }
    };

    return (
        <View style={styles.main}>
            <View style={styles.inputContainer}>
                {screen === "inMobileVerification" && (
                    <>
                        <View style={styles.textInput}>
                            <Input
                                label="Register with Mobile Number"
                                labelStyle={{ color: "white" }}
                                placeholder="987656789"
                                containerStyle={styles.input}
                                errorStyle={{ fontWeight: "bold" }}
                                keyboardType="numeric"
                                inputStyle={{
                                    fontSize: 20,
                                    color: "white",
                                    fontWeight: "bold",
                                }}
                                leftIcon={
                                    <Icon
                                        name="phone"
                                        type="font-awesome"
                                        color="white"
                                    />
                                }
                                // operations
                                onChangeText={(value) => setMobileNo(value)}
                                errorMessage={mobileNoError}
                                value={mobileNo}
                            />
                        </View>
                        <Button
                            buttonStyle={{
                                ...styles.button,
                                backgroundColor: "#FFA500",
                            }}
                            title="Generate OTP"
                            // operations
                            onPress={validateMobileNumber}
                            loading={loading}
                        />
                    </>
                )}
                {screen === "otpVerification" && (
                    <OtpVerificationScreen setStatus={setStatus} />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        height: "60%",
        alignItems: "center",
    },
    inputContainer: {
        backgroundColor: "rgba(52, 52, 52, 0.8)",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 15,
    },
    textInput: {
        marginHorizontal: 10,
    },
    input: {
        color: "white",
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "transparent",
    },
    button: {
        width: 200,
        backgroundColor: "white",
        height: 50,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
    },
});
