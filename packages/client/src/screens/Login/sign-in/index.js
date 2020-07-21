import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Icon, Button } from "react-native-elements";

export default function ({}) {
    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Input
                    inputComponent="TextInput"
                    label="Mobile Number"
                    labelStyle={{ color: "white" }}
                    inputStyle={{
                        fontSize: 20,
                        color: "white",
                        fontWeight: "bold",
                    }}
                    keyboardType="numeric"
                    leftIcon={
                        <Icon name="mobile" type="font-awesome" color="white" />
                    }
                />
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
                <Button title="Sign In" buttonStyle={styles.button} />
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
