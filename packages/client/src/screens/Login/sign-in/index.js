import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    BackHandler,
    AsyncStorage,
} from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { useDispatch } from "react-redux";
import { setUser } from "../../../state/actions/user";
import { initCart } from "../../../state/actions/cart";
import http from "../../../common/http";

export default function ({ setStatus, setAuthenticated }) {
    //
    const dispatch = useDispatch();

    const [mobileNo, setMobileNo] = useState({ value: "", error: null });
    const [password, setPassword] = useState({ password: "", error: null });
    const [loading, setLoading] = useState(false);
    const backAction = () => {
        setStatus("home");
        return true;
    };

    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );

    const verifyUser = () => {
        setLoading(true);
        const payload = {
            mobileNo: mobileNo.value,
            password: password.value,
        };
        http.postAction("api/v1/user/login", { ...payload })
            .then(async (res) => {
                if (res.status === 200) {
                    const { accessToken, user, cart } = res.data;
                    await AsyncStorage.setItem("accessToken", accessToken);
                    dispatch(setUser(user));
                    if (cart) {
                        dispatch(initCart(cart));
                    }
                    setAuthenticated(true);
                }
            })
            .catch((err) => {
                setPassword({ ...password, error: "Invalid credentials" });
                setLoading(false);
            });
    };

    const handleLogin = () => {
        const phno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!mobileNo.value.match(phno)) {
            setMobileNo({ ...mobileNo, error: "Invalid mobile number" });
        } else if ((password.value || "").length < 6) {
            setMobileNo({ ...mobileNo, error: null });
            setPassword({ ...password, error: "Incorrect Password" });
        } else {
            setPassword({ ...password, error: null });
            setMobileNo({ ...mobileNo, error: null });
            verifyUser();
        }
    };
    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Input
                    inputComponent="TextInput"
                    label="Mobile Number"
                    labelStyle={{ color: "white" }}
                    errorStyle={{ fontWeight: "bold" }}
                    inputStyle={{
                        fontSize: 20,
                        color: "white",
                        fontWeight: "bold",
                    }}
                    keyboardType="numeric"
                    leftIcon={
                        <Icon name="mobile" type="font-awesome" color="white" />
                    }
                    // operations
                    onChangeText={(value) =>
                        setMobileNo({ ...mobileNo, value })
                    }
                    errorMessage={mobileNo.error}
                    disabled={loading}
                />
                <Input
                    secureTextEntry={true}
                    multiline={false}
                    // passwordRules={true}
                    label="Password"
                    labelStyle={{ color: "white" }}
                    errorStyle={{ fontWeight: "bold" }}
                    inputStyle={{
                        fontSize: 20,
                        color: "white",
                        fontWeight: "bold",
                    }}
                    leftIcon={
                        <Icon
                            name="unlock-alt"
                            type="font-awesome"
                            color="white"
                        />
                    }
                    // operations
                    onChangeText={(value) =>
                        setPassword({ value, error: null })
                    }
                    errorMessage={password.error}
                    disabled={loading}
                />
                <Button
                    title="Sign In"
                    onPress={handleLogin}
                    buttonStyle={styles.button}
                    loading={loading}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        height: "70%",
        alignItems: "center",
        marginHorizontal: 20,
    },
    container: {
        backgroundColor: "rgba(52, 52, 52, 0.8)",
        width: "100%",
        borderRadius: 15,
        paddingVertical: 15,
        alignItems: "center",
    },
    button: {
        width: 200,
        backgroundColor: "white",
        height: 50,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
        backgroundColor: "#FFA500",
    },
});
