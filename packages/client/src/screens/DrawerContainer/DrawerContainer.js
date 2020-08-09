import React from "react";
import { View, Text, Image } from "react-native";
import { useSelector } from "react-redux";
// import PropTypes from "prop-types";
import styles from "./styles";
import MenuButton from "../../components/MenuButton/MenuButton";

export default function ({ navigation }) {
    const user = useSelector((state) => state.user);
    return (
        <View style={styles.content}>
            <View style={styles.container}>
                <View style={styles.profile} elevation={5}>
                    <Image
                        style={styles.userIcon}
                        source={require("../../../assets/icons/Hello.gif")}
                    />
                    <Text style={styles.userName}>{user.userName}</Text>
                </View>
                <MenuButton
                    title="Home"
                    source={require("../../../assets/icons/home.png")}
                    onPress={() => {
                        navigation.navigate("Home");
                        navigation.closeDrawer();
                    }}
                />
                <MenuButton
                    title="Search"
                    source={require("../../../assets/icons/search.png")}
                    // onPress={() => {
                    //   navigation.navigate("Search");
                    //   navigation.closeDrawer();
                    // }}
                />
                <MenuButton
                    title="My profile"
                    source={require("../../../assets/icons/user.png")}
                    // onPress={() => {
                    //   navigation.navigate("Search");
                    //   navigation.closeDrawer();
                    // }}
                />
                <MenuButton
                    title="My cart"
                    source={require("../../../assets/icons/cart.png")}
                    onPress={() => {
                        navigation.navigate("Cart");
                        navigation.closeDrawer();
                    }}
                />
                <MenuButton
                    title="My orders"
                    source={require("../../../assets/icons/cart.png")}
                    onPress={() => {
                        navigation.navigate("Cart");
                        navigation.closeDrawer();
                    }}
                />
            </View>
        </View>
    );
}
