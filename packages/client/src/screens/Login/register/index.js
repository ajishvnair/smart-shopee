import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Picker,
    BackHandler,
    AsyncStorage,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../state/actions/user";
import { Input, Icon, Button } from "react-native-elements";
import http from "../../../common/http";

export default function ({ setStatus, mobileNo, setAuthenticated }) {
    const dispatch = useDispatch();
    // store locations
    // const [locations, setLocations] = useState([]);
    const [name, setName] = useState({ value: "", error: null });
    const [address, setAddress] = useState({ value: "", error: null });
    const [location, setLocation] = useState({ value: "", error: null });
    const [password, setPassword] = useState({ value: "", error: null });
    const [loading, setLoading] = useState(false);

    const locations = useSelector((state) => state.locations || []);

    // const getLocation = async () => {
    //     // const item = await AsyncStorage.getItem("locations");
    //     // setLocations(JSON.parse(item));
    //     // console.log(JSON.parse(item));
    // };

    const getLocations = () => {
        const pickerItems = locations.map((location) => (
            <Picker.Item
                label={location.location}
                value={location._id}
                key={location._id}
            />
        ));
        return pickerItems;
    };

    const registerUser = () => {
        setLoading(true);
        const payload = {
            mobileNo,
            userName: name.value,
            address: address.value,
            location: location.value,
            password: password.value,
        };
        http.postAction("api/v1/user/register", { ...payload }).then(
            async (res) => {
                if (res.status === 200) {
                    const { accessToken, user } = res.data;
                    await AsyncStorage.setItem("accessToken", accessToken);
                    dispatch(setUser(user));
                    setAuthenticated(true);
                }
            }
        );
    };

    useEffect(() => {
        if (locations.length > 0) {
            setLocation({ value: locations[0]._id, error: null });
        }
    }, [locations]);
    // for handling back button
    const backAction = () => {
        setStatus("home");
        return true;
    };
    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );

    const submitAction = () => {
        if (name.value === "") {
            setName({ ...name, error: "Please enter name" });
        } else if ((address.value || "").length < 5) {
            setAddress({
                ...address,
                error: "Address must contain 6 characters",
            });
            setName({ ...name, error: null });
        } else if ((password.value || "").length < 6) {
            setPassword({
                ...password,
                error: "Password must contain 6 characters",
            });
            setName({ ...name, error: null });
            setAddress({
                ...address,
                error: null,
            });
        } else {
            setName({ ...name, error: null });
            setAddress({
                ...address,
                error: null,
            });
            setPassword({
                ...password,
                error: null,
            });
            registerUser();
        }
    };
    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Input
                    label="Enter Name"
                    labelStyle={{ color: "white" }}
                    style={styles.input}
                    inputStyle={{
                        fontSize: 20,
                        color: "white",
                        fontWeight: "bold",
                    }}
                    errorStyle={{ fontWeight: "bold" }}
                    leftIcon={
                        <Icon name="user" type="font-awesome" color="white" />
                    }
                    // operations
                    value={name.value}
                    errorMessage={name.error}
                    onChangeText={(value) => setName({ ...name, value })}
                    disabled={loading}
                />
                <Input
                    label="Enter Address"
                    labelStyle={{ color: "white" }}
                    style={styles.input}
                    inputStyle={{
                        fontSize: 20,
                        color: "white",
                        fontWeight: "bold",
                    }}
                    leftIcon={
                        <Icon
                            name="address-card"
                            type="font-awesome"
                            color="white"
                        />
                    }
                    // operations
                    value={address.value}
                    errorMessage={address.error}
                    onChangeText={(value) => setAddress({ ...address, value })}
                    disabled={loading}
                />
                <Input
                    label="Select Location"
                    disabled
                    labelStyle={{ color: "white" }}
                    containerStyle={{ height: 15 }}
                />
                <Picker
                    style={styles.picker}
                    selectedValue={location.value}
                    onValueChange={(value) =>
                        setLocation({ ...location, value })
                    }
                >
                    {getLocations()}
                </Picker>
                <Input
                    secureTextEntry={true}
                    multiline={false}
                    // passwordRules={true}
                    label="Password"
                    labelStyle={{ color: "white" }}
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
                    value={password.value}
                    errorMessage={password.error}
                    onChangeText={(value) => {
                        setPassword({ ...password, value });
                        if (value.length < 6) {
                            setPassword({
                                value,
                                error: "Password must contains 6 characters",
                            });
                        } else {
                            setPassword({ value, error: null });
                        }
                    }}
                    disabled={loading}
                />
                <Button
                    title="Continue"
                    onPress={submitAction}
                    buttonStyle={styles.button}
                    loading={loading}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        height: "100%",
        alignItems: "center",
        marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        // position: "fixed",
    },
    container: {
        padding: 5,
        paddingVertical: 5,
        backgroundColor: "rgba(52, 52, 52, 0.8)",
        width: "100%",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {},
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
    picker: {
        color: "white",
        fontWeight: "bold",
        width: "100%",
        marginLeft: 10,
    },
});
