import React from "react";
import { View, Text, StyleSheet, Picker } from "react-native";
import { Input, Icon, Button } from "react-native-elements";

export default function () {
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
                    leftIcon={
                        <Icon name="user" type="font-awesome" color="white" />
                    }
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
                />
                <Input
                    label="Select Location"
                    disabled
                    labelStyle={{ color: "white" }}
                    containerStyle={{ height: 15 }}
                />
                <Picker style={styles.picker}>
                    <Picker.Item label="Parathodu 686512" value="java" />
                    <Picker.Item label="Pullimudu 686512" value="js" />
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
                />
                <Button title="Continue" buttonStyle={styles.button} />
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
