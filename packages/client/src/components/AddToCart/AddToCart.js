import React from "react";
import { TouchableHighlight, Image, Text, View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

export default function ({ available, addTo }) {
    return (
        <View style={styles.mainContainer}>
            <TouchableHighlight
                underlayColor="rgba(73,182,77,1,0.9)"
                onPress={() => addTo()}
            >
                <View style={styles.container}>
                    <Image
                        style={styles.infoPhoto}
                        source={require("../../../assets/icons/white-cart.png")}
                    />
                    <Text style={styles.text}>
                        {available ? `ADD TO CART` : `GO TO CART`}
                    </Text>
                </View>
            </TouchableHighlight>
        </View>
    );
}

// AddToCart.propTypes = {
//     onPress: PropTypes.func,
//     source: PropTypes.number,
//     title: PropTypes.string,
// };
