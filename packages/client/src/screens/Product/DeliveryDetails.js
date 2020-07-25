import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, Image, Picker } from "react-native";
import styles from "./styles";

export default function ({ user }) {
    const [location, setLocation] = useState(null);

    const locations = useSelector((state) => state.locations || []);

    useEffect(() => {
        if (user) {
            setLocation(user.location);
        }
    }, []);
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
    const getTime = (id) => {
        const lo = locations.find((loc) => loc._id === id);
        return lo ? lo.deliveryTime : null;
    };
    return (
        <View style={styles.delivery}>
            <Text style={styles.deliveryHeading}>Delivery Details</Text>
            <View style={styles.divider}></View>

            <View style={styles.location}>
                <Image
                    style={styles.locationIcon}
                    source={require("../../../assets/icons/pin.png")}
                />
                {/* <Text style={styles.address}>{user.location} </Text> */}
                <Picker
                    // style={}
                    style={styles.address}
                    selectedValue={location}
                    onValueChange={(value) => setLocation(value)}
                >
                    {getLocations()}
                </Picker>
            </View>
            <Text style={styles.subText}>
                {`We will reach out you with in ${getTime(location)} hours`}
            </Text>
            <Text style={styles.subText}>
                Delivery time will vary depending on products in your cart
            </Text>
            <Text style={styles.subText}>
                For any queries contact our customer support
            </Text>
            <Text style={styles.subText}>+91 9988776655</Text>
        </View>
    );
}
