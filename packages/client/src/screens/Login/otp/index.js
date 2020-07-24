import React, { useState, useRef } from "react";
import { Input, Icon, Button } from "react-native-elements";
import { View, StyleSheet, BackHandler } from "react-native";
import http from "../../../common/http";

import firebase from "firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../../../config";

import OtpVerificationScreen from "./validate-otp";

export default function ({ setStatus, mobileNo, setMobileNo }) {
    // for mobile number
    // const [mobileNo, setMobileNo] = useState("");
    // for error message
    const [mobileNoError, setMobileNoError] = useState(null);
    // for generate otp button loading
    const [loading, setLoading] = useState(false);
    // for setting status
    const [screen, setScreen] = useState("inMobileVerification");
    // for otp
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = React.useRef(null);
    // handling back action
    const backAction = () => {
        setStatus("home");
        return true;
    };

    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );

    const validateMobileNumber = async () => {
        const phno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (mobileNo.match(phno)) {
            setLoading(true);
            setMobileNoError(null);
            // check user already exist or not
            http.postAction("api/v1/user/checkMobileNo", { mobileNo })
                .then(async (res) => {
                    if (res.status === 200) {
                        try {
                            // sending otp
                            const phoneProvider = new firebase.auth.PhoneAuthProvider();
                            const verificationId = await phoneProvider.verifyPhoneNumber(
                                `+91${mobileNo}`,
                                recaptchaVerifier.current
                            );
                            setVerificationId(verificationId);
                            setScreen("otpVerification");
                        } catch (err) {
                            setMobileNoError("Unable to send OTP try again");
                            setLoading(false);
                        }
                    } else {
                        setMobileNoError("Mobile Number Already Exist");
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    setMobileNoError("Something went wrong try again");
                    setLoading(false);
                });
        } else {
            setMobileNoError("Not a valid Phone number");
            setLoading(false);
        }
    };

    return (
        <>
            <View style={styles.main}>
                <View style={styles.inputContainer}>
                    {screen === "inMobileVerification" && (
                        <>
                            <View style={styles.textInput}>
                                <Input
                                    label="Register with Mobile Number"
                                    labelStyle={{ color: "white" }}
                                    // placeholder="987656789"
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
                                    disabled={loading}
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
                        <OtpVerificationScreen
                            setStatus={setStatus}
                            verificationId={verificationId}
                        />
                    )}
                </View>
            </View>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />
        </>
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
