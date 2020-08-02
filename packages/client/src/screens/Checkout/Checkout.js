import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ScrollView, Text, StyleSheet, Picker } from "react-native";
import { Input, Divider, CheckBox, Button } from "react-native-elements";

export default function () {
    // redux data
    const user = useSelector((state) => state.user);
    const allLocations = useSelector((state) => state.locations);
    // local state
    const [name, setName] = useState({ value: "", error: null });
    const [mobileNo, setmobileNo] = useState({ value: "", error: null });
    const [location, setLocation] = useState({ value: "", error: null });
    const [address, setAddress] = useState({ value: "", error: null });

    useEffect(() => {
        setName({ value: user.userName, error: null });
        setmobileNo({ value: user.mobileNo, error: null });
        // const loc = allLocations.find((l) => l._id === user.location);
        setLocation({ value: user.location, error: null });
        setAddress({ value: user.address, error: null });
    }, []);
    // list all locations
    const getLocations = () => {
        const pickerItems = allLocations.map((loc) => (
            <Picker.Item label={loc.location} value={loc._id} key={loc._id} />
        ));
        return pickerItems;
    };
    // get delivery charge
    const getDeliveryCharge = () => {
        // const loc = allLocations.find((lo) => lo._id === location.value);
        // return loc.deliveryCharge;
    };
    return (
        <>
            <ScrollView style={styles.container}>
                <Input label="Name" value={name.value} />
                <Input
                    label="Phone Number"
                    keyboardType="numeric"
                    value={mobileNo.value}
                />
                <Input label="Address" value={address.value} />
                <Input
                    label="Select Location"
                    disabled
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
                <Text style={styles.delivery}>
                    Delivery Charge ₹ {getDeliveryCharge()}
                </Text>
                <Text style={styles.title}>Payment Methods</Text>
                <Divider />
                <CheckBox
                    // center
                    title="Cash on delivery"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={true}
                />
            </ScrollView>
            <Button buttonStyle={styles.btn} title="CONFIRM ORDER" />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        height: "90%",
    },
    btn: {
        bottom: 0,
        height: 50,
        backgroundColor: "#eec248",
    },
    title: {
        margin: 10,
        fontWeight: "bold",
    },
    delivery: {
        fontWeight: "bold",
        marginHorizontal: 10,
        alignSelf: "flex-end",
    },
});
