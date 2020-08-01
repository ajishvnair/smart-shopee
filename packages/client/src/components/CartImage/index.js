import React from "react";
import { TouchableOpacity, Image, Text } from "react-native";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styles from "./styles";

const MenuImage = ({ onPress }) => {
    const cart = useSelector((state) => state.cart);
    return (
        <TouchableOpacity
            style={styles.headerButtonContainer}
            onPress={onPress}
        >
            <Text>{cart.length}</Text>
            <Image
                style={styles.headerButtonImage}
                source={require("../../../assets/icons/cart.png")}
            />
        </TouchableOpacity>
    );
};

MenuImage.propTypes = {
    onPress: PropTypes.func,
};

export default MenuImage;
