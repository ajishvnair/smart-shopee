import React, { useState } from "react";
import { Input, Icon, Button } from "react-native-elements";
import { View, StyleSheet } from "react-native";

import OtpVerificationScreen from "./validate-otp";

export default function () {
    // for mobile number
    const [mobileNo, setMobileNo] = useState("");
    // for error message
    const [mobileNoError, setMobileNoError] = useState(null);
    // for generate otp button loading
    const [loading, setLoading] = useState(false);
    // for setting status
    const [status, setStatus] = useState("inMobileVerification");

    const validateMobileNumber = () => {
        const phno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (mobileNo.match(phno)) {
            // alert("success");
            setLoading(true);
            setMobileNoError(null);
            setStatus("otpVerification");
        } else {
            setMobileNoError("Not a valid Phone number");
        }
    };

    return (
        <View style={styles.main}>
            <View style={styles.inputContainer}>
                {status === "inMobileVerification" && (
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
                {status === "otpVerification" && <OtpVerificationScreen />}
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
